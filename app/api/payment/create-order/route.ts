import { NextResponse } from 'next/server';
import { createClient } from '@supabase/supabase-js';

const supabase = createClient(process.env.NEXT_PUBLIC_SUPABASE_URL!, process.env.SUPABASE_SERVICE_ROLE_KEY!);

export async function POST(req: Request) {
  try {
    const { amount, testId, userId, customerEmail, customerName } = await req.json();

    const isProduction = process.env.NEXT_PUBLIC_CASHFREE_ENV === 'PRODUCTION';
    const baseUrl = isProduction ? 'https://api.cashfree.com/pg/orders' : 'https://sandbox.cashfree.com/pg/orders';

    const cfResponse = await fetch(baseUrl, {
      method: 'POST',
      headers: {
        'x-client-id': process.env.CASHFREE_APP_ID!,
        'x-client-secret': process.env.CASHFREE_SECRET_KEY!,
        'x-api-version': '2023-08-01',
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({
        order_amount: amount,
        order_currency: "INR",
        customer_details: {
          customer_id: userId,
          customer_name: customerName,
          customer_email: customerEmail,
          customer_phone: "9999999999"
        },
        order_meta: {
          return_url: `${req.headers.get('origin')}/test/${testId}` // No tokens in URL
        }
      })
    });

    const data = await cfResponse.json();

    // Persist order to Supabase for verification later
    await supabase.from('orders').insert({
      cf_order_id: data.order_id,
      user_id: userId,
      test_id: testId,
      amount: amount,
      payment_session_id: data.payment_session_id,
      status: 'PENDING'
    });

    return NextResponse.json({ payment_session_id: data.payment_session_id });
  } catch (error) {
    return NextResponse.json({ error: 'Order Creation Failed' }, { status: 500 });
  }
}
