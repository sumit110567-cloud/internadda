import { NextResponse } from 'next/server'
import { createClient } from '@supabase/supabase-js'
import { cookies } from 'next/headers'
import { createServerClient } from '@supabase/ssr'

// Admin client for database operations (Bypass RLS)
const supabaseAdmin = createClient(
  process.env.NEXT_PUBLIC_SUPABASE_URL!,
  process.env.SUPABASE_SERVICE_ROLE_KEY!
)

export async function POST(req: Request) {
  try {
    const cookieStore = await cookies()
    const supabaseAuth = createServerClient(
      process.env.NEXT_PUBLIC_SUPABASE_URL!,
      process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!,
      {
        cookies: {
          get(name: string) { return cookieStore.get(name)?.value },
        },
      }
    )

    const { data: { user }, error: authError } = await supabaseAuth.auth.getUser()
    if (authError || !user) return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })

    const body = await req.json()
    const { amount, testId, customerEmail, customerName } = body

    const isProduction = process.env.NEXT_PUBLIC_CASHFREE_ENV === 'PRODUCTION'
    const baseUrl = isProduction ? 'https://api.cashfree.com/pg/orders' : 'https://sandbox.cashfree.com/pg/orders'

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
          customer_name: customerName || user.user_metadata?.full_name || 'Student',
          customer_email: customerEmail || user.email,
          customer_phone: '9999999999',
        },
        order_meta: {
          return_url: `${req.headers.get('origin')}/test/${testId}`,
        },
      }),
    })

    const data = await cfResponse.json()
    if (!cfResponse.ok) throw new Error(data.message || 'Cashfree Failed')

    // Insert using Admin Client to ensure success
    const { error: dbError } = await supabaseAdmin.from('orders').insert({
      cf_order_id: data.order_id,
      user_id: user.id,
      test_id: String(testId),
      amount: parseFloat(amount),
      payment_session_id: data.payment_session_id,
      status: 'PENDING',
    })

    if (dbError) throw dbError

    return NextResponse.json({ payment_session_id: data.payment_session_id })
  } catch (error: any) {
    return NextResponse.json({ error: error.message }, { status: 500 })
  }
}
