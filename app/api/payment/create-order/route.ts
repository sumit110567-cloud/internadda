import { createServerClient } from '@supabase/ssr'
import { cookies } from 'next/headers'
import { NextResponse } from 'next/server'
import { createClient } from '@supabase/supabase-js'

// ✅ Admin client (disable auth session handling)
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
    const cookieStore = cookies()

    // ✅ FIXED: Proper cookie adapter (get + set + remove)
    const supabaseAuth = createServerClient(
      process.env.NEXT_PUBLIC_SUPABASE_URL!,
      process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!,
      {
        cookies: {
          get(name: string) {
            return cookieStore.get(name)?.value
          },
          set(name: string, value: string, options: any) {
            cookieStore.set({ name, value, ...options })
          },
          remove(name: string, options: any) {
            cookieStore.set({ name, value: '', ...options })
          }
        }
      }
    )

    // ✅ Safe auth verification
    const { data: { user }, error: authError } =
      await supabaseAuth.auth.getUser()

    if (authError || !user) {
      console.error('Auth verification failed:', authError)
      return NextResponse.json(
        { error: 'Authentication Failed' },
        { status: 401 }
      )
    }

    const body = await req.json()
    const { amount, testId, userId, customerEmail, customerName } = body

    if (user.id !== userId) {
      return NextResponse.json(
        { error: 'Unauthorized: User ID mismatch' },
        { status: 403 }
      )
    }

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
      console.error('Cashfree API Error:', data)
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
      console.error('Supabase DB Insert Error:', dbError)
      return NextResponse.json(
        {
          error: 'Failed to initialize order in database',
          details: dbError.message
        },
        { status: 500 }
      )
    }

    return NextResponse.json({
      payment_session_id: data.payment_session_id
    })

  } catch (error: any) {
    console.error(
      'Unexpected Crash in create-order route:',
      error
    )
    return NextResponse.json(
      { error: 'Internal Server Error' },
      { status: 500 }
    )
  }
}
