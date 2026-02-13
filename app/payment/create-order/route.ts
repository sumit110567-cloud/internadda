import { createServerClient } from '@supabase/ssr'
import { cookies } from 'next/headers'
import { NextResponse } from 'next/server'
import { createClient } from '@supabase/supabase-js'

// Admin client for database operations
const supabaseAdmin = createClient(
  process.env.NEXT_PUBLIC_SUPABASE_URL!,
  process.env.SUPABASE_SERVICE_ROLE_KEY!
)

export async function POST(req: Request) {
  try {
    // 🔥 FIX: Await cookies properly for Next.js 15+
    const cookieStore = await cookies();
    
    const supabaseAuth = createServerClient(
      process.env.NEXT_PUBLIC_SUPABASE_URL!,
      process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!,
      {
        cookies: {
          get(name: string) {
            return cookieStore.get(name)?.value
          },
        },
      }
    )

    // Verify identity
    const { data: { user }, error: authError } = await supabaseAuth.auth.getUser()

    if (authError || !user) {
      return NextResponse.json({ error: 'Authentication Failed' }, { status: 401 })
    }

    const body = await req.json()
    const { amount, testId, userId, customerName, customerEmail } = body

    // Security check
    if (user.id !== userId) {
      return NextResponse.json({ error: 'Unauthorized user mismatch' }, { status: 403 })
    }

    // Create Cashfree Order
    const isProduction = process.env.NEXT_PUBLIC_CASHFREE_ENV === 'PRODUCTION'
    const baseUrl = isProduction 
      ? 'https://api.cashfree.com/pg/orders' 
      : 'https://sandbox.cashfree.com/pg/orders'

    const cfResponse = await fetch(baseUrl, {
      method: 'POST',
      headers: {
        'x-client-id': process.env.CASHFREE_APP_ID!,
        'x-client-secret': process.env.CASHFREE_SECRET_KEY!,
        'x-api-version': '2023-08-01',
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({
        order_amount: parseFloat(amount),
        order_currency: "INR",
        customer_details: {
          customer_id: user.id,
          customer_name: customerName || "Student",
          customer_email: customerEmail || user.email,
          customer_phone: "9999999999" 
        },
        order_meta: {
          return_url: `${req.headers.get('origin')}/test/${testId}`
        }
      })
    })

    const data = await cfResponse.json()
    if (!cfResponse.ok) throw new Error(data.message || 'Cashfree Order Failed')

    // Persist to Supabase
    const { error: dbError } = await supabaseAdmin.from('orders').insert({
      cf_order_id: data.order_id,
      user_id: user.id,
      test_id: String(testId),
      amount: parseFloat(amount),
      payment_session_id: data.payment_session_id,
      status: 'PENDING'
    })

    if (dbError) throw dbError

    return NextResponse.json({ payment_session_id: data.payment_session_id })

  } catch (error: any) {
    console.error('SERVER CRASH:', error.message)
    return NextResponse.json({ error: error.message || 'Internal Server Error' }, { status: 500 })
  }
}
