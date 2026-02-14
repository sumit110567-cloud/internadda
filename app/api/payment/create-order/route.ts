import { NextResponse } from 'next/server'
import { createClient } from '@/lib/supabase-server'

export async function POST(req: Request) {
  try {
    // 1. Initialize the Server Client
    const supabase = createClient()

    // 2. Get user from session cookies (Automatic verification)
    const {
      data: { user },
      error: authError,
    } = await supabase.auth.getUser()

    if (authError || !user) {
      console.error('Auth Error:', authError?.message)
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })
    }

    const body = await req.json()
    const { amount, testId, customerEmail, customerName } = body

    if (!testId || !amount) {
      return NextResponse.json(
        { error: 'Missing required fields' },
        { status: 400 }
      )
    }

    // 3. Cashfree API Configuration
    const isProduction = process.env.NEXT_PUBLIC_CASHFREE_ENV === 'PRODUCTION'
    const baseUrl = isProduction
      ? 'https://api.cashfree.com/pg/orders'
      : 'https://sandbox.cashfree.com/pg/orders'

    const cfResponse = await fetch(baseUrl, {
      method: 'POST',
      headers: {
        'x-client-id': process.env.NEXT_PUBLIC_CASHFREE_APP_ID!,
        'x-client-secret': process.env.CASHFREE_SECRET_KEY!,
        'x-api-version': '2023-08-01',
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        order_amount: parseFloat(amount),
        order_currency: 'INR',
        customer_details: {
          customer_id: user.id,
          customer_name:
            customerName || user.user_metadata?.full_name || 'Student',
          customer_email: customerEmail || user.email || 'no-email@internadda.com',
          customer_phone: '9999999999',
        },
        order_meta: {
          return_url: `${req.headers.get('origin')}/test/${testId}`,
        },
      }),
    })

    const data = await cfResponse.json()

    if (!cfResponse.ok) {
      return NextResponse.json(
        { error: data.message || 'Cashfree Order Failed' },
        { status: 400 }
      )
    }

    // 4. Insert order into DB using the authenticated session
    const { error: dbError } = await supabase.from('orders').insert({
      cf_order_id: data.order_id,
      user_id: user.id,
      test_id: String(testId),
      amount: parseFloat(amount),
      payment_session_id: data.payment_session_id,
      status: 'PENDING',
    })

    if (dbError) {
      console.error('Database Error:', dbError.message)
      return NextResponse.json({ error: dbError.message }, { status: 500 })
    }

    return NextResponse.json({
      payment_session_id: data.payment_session_id,
    })
  } catch (error) {
    console.error('Create Order Crash:', error)
    return NextResponse.json(
      { error: 'Internal Server Error' },
      { status: 500 }
    )
  }
}
