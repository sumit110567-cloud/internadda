import { NextResponse } from 'next/server';
import { createClient } from '@supabase/supabase-js';
import crypto from 'crypto';

// Initialize Admin Client
const supabaseAdmin = createClient(
  process.env.NEXT_PUBLIC_SUPABASE_URL!,
  process.env.SUPABASE_SERVICE_ROLE_KEY!,
  {
    auth: {
      autoRefreshToken: false,
      persistSession: false
    }
  }
);

export async function POST(req: Request) {
  try {
    const rawBody = await req.text();
    const payload = JSON.parse(rawBody);

    // DEBUG: Log incoming webhook
    console.log('Webhook Received:', payload.type, 'Order ID:', payload.data?.order?.order_id);

    // 1. Verify Cashfree Signature
    const ts = req.headers.get('x-webhook-timestamp');
    const signature = req.headers.get('x-webhook-signature');
    const secretKey = process.env.CASHFREE_SECRET_KEY!;

    const signatureData = ts + rawBody;
    const expectedSignature = crypto
      .createHmac('sha256', secretKey)
      .update(signatureData)
      .digest('base64');

    if (signature !== expectedSignature) {
      console.error('Webhook Signature Mismatch');
      return NextResponse.json({ error: 'Invalid signature' }, { status: 401 });
    }

    // 2. Handle Payment Event
    const eventType = payload.type;
    const orderData = payload.data.order;
    const paymentData = payload.data.payment;

    if (
      (eventType === 'PAYMENT_SUCCESS_WEBHOOK' || eventType === 'PAYMENT_CHARGES_WEBHOOK') &&
      paymentData.payment_status === 'SUCCESS'
    ) {
      const orderId = orderData.order_id;

      // 3. Update Database to PAID
      // Ensure 'cf_order_id' is the column where you store Cashfree Order ID
      const { error, data } = await supabaseAdmin
        .from('orders')
        .update({ 
          status: 'PAID',
          updated_at: new Date().toISOString()
        })
        .eq('cf_order_id', orderId)
        .select();

      if (error) {
        console.error('Database Update Error:', error.message);
        return NextResponse.json({ error: 'DB Update Failed' }, { status: 500 });
      }

      if (!data || data.length === 0) {
        console.warn(`No matching order found for ID: ${orderId}`);
      } else {
        console.log(`Order ${orderId} updated to PAID.`);
      }
    }

    return NextResponse.json({ status: 'ok' }, { status: 200 });

  } catch (error) {
    console.error('Webhook Crash:', error);
    return NextResponse.json({ error: 'Internal Server Error' }, { status: 500 });
  }
}
