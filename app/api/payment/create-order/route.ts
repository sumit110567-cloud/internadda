import { NextResponse } from 'next/server'
import { createClient } from '@supabase/supabase-js'

// Admin client (NO SESSION LOGIC)
const supabaseAdmin = createClient(
  process.env.NEXT_PUBLIC_SUPABASE_URL!,
  process.env.SUPABASE_SERVICE_ROLE_KEY!,
  {
    auth: {
      autoRefreshToken: false,
      persistSession: false
    }
  }
)

export async function POST(req: Request) {
  try {
    // 🔥 1. Get Authorization header
    const authHeader = req.headers.get('authorization')

    if (!authHeader || !authHeader.startsWith('Bearer ')) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })
    }

    const token = authHeader.replace('Bearer ', '')

    // 🔥 2. Verify JWT manually
    const { data: { user }, error: authError } =
      await supabaseAdmin.auth.getUser(token)

    if (authError || !user) {
      return NextResponse.json({ error: 'Invalid token' }, { status: 401 })
    }

    const body = await req.json()
    const { amount, testId, customerEmail, customerName } = body

    if (!testId || !amount) {
      return NextResponse.json(
        { error: 'Missing required fields' },
        { status: 400 }
      )
    }

    const isProduction =
      process.env.NEXT_PUBLIC_CASHFREE_ENV === 'PRODUCTION'

    const baseUrl = isProduction
      ? 'https://api.cashfree.com/pg/orders'
      : 'https://sandbox.cashfree.com/pg/orders'

    const cfResponse = await fetch(baseUrl, {
      method: 'POST',
      headers: {
        'x-client-id': process.env.NEXT_PUBLIC_CASHFREE_APP_ID!,
        'x-client-secret': process.env.CASHFREE_SECRET_KEY!,
        'x-api-version': '2023-08-01',
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({
        order_amount: parseFloat(amount),
        order_currency: 'INR',
        customer_details: {
          customer_id: user.id,
          customer_name:
            customerName ||
            user.user_metadata?.full_name ||
            'Student',
          customer_email:
            customerEmail ||
            user.email ||
            'no-email@internadda.com',
          customer_phone: '9999999999'
        },
        order_meta: {
          return_url: `${req.headers.get('origin')}/test/${testId}`
        }
      })
    })

    const data = await cfResponse.json()

    if (!cfResponse.ok) {
      return NextResponse.json(
        { error: data.message || 'Cashfree Order Failed' },
        { status: 400 }
      )
    }

    const { error: dbError } = await supabaseAdmin
      .from('orders')
      .insert({
        cf_order_id: data.order_id,
        user_id: user.id,
        test_id: String(testId),
        amount: parseFloat(amount),
        payment_session_id: data.payment_session_id,
        status: 'PENDING'
      })

    if (dbError) {
      return NextResponse.json(
        { error: dbError.message },
        { status: 500 }
      )
    }

    return NextResponse.json({
      payment_session_id: data.payment_session_id
    })

  } catch (error) {
    console.error('Create Order Crash:', error)
    return NextResponse.json(
      { error: 'Internal Server Error' },
      { status: 500 }
    )
  }
}
