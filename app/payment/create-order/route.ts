import { NextResponse } from 'next/server';
import { createClient } from '@supabase/supabase-js';

// Initialize Supabase with Service Role Key to allow backend order creation
const supabase = createClient(
  process.env.NEXT_PUBLIC_SUPABASE_URL!,
  process.env.SUPABASE_SERVICE_ROLE_KEY!
);

export async function POST(req: Request) {
  try {
    const body = await req.json();
    const { amount, customerId, customerName, customerEmail, internshipId } = body;

    const isProduction = process.env.NEXT_PUBLIC_CASHFREE_ENV === 'PRODUCTION';
    const baseUrl = isProduction 
      ? 'https://api.cashfree.com/pg/orders' 
      : 'https://sandbox.cashfree.com/pg/orders';

    const response = await fetch(baseUrl, {
      method: 'POST',
      headers: {
        'x-client-id': process.env.NEXT_PUBLIC_CASHFREE_APP_ID!,
        'x-client-secret': process.env.CASHFREE_SECRET_KEY!,
        'x-api-version': '2023-08-01',
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({
        order_amount: amount,
        order_currency: "INR",
        customer_details: {
          customer_id: customerId || `cust_${Date.now()}`,
          customer_name: customerName || "Student",
          customer_email: customerEmail,
          customer_phone: "9999999999" 
        },
        order_meta: {
          // CLEAN REDIRECT: Tokens removed. Access will be verified via database status.
          return_url: `${req.headers.get('origin')}/test/${internshipId || '1'}`
        }
      })
    });

    const data = await response.json();
    if (!response.ok) return NextResponse.json({ error: data.message || 'Order Failed' }, { status: response.status });

    // CRITICAL: Store the order in Supabase so the webhook can update it later
    const { error: dbError } = await supabase.from('orders').insert({
      cf_order_id: data.order_id,
      user_id: customerId,
      test_id: internshipId || '1',
      amount: amount,
      status: 'PENDING',
      payment_session_id: data.payment_session_id
    });

    if (dbError) {
      console.error('Database Error:', dbError);
      return NextResponse.json({ error: 'Failed to initialize order in database' }, { status: 500 });
    }

    return NextResponse.json({ payment_session_id: data.payment_session_id });
  } catch (error) {
    console.error('Order Creation Error:', error);
    return NextResponse.json({ error: 'Internal Server Error' }, { status: 500 });
  }
}
