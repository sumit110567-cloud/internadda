import { NextResponse } from 'next/server';
import { createClient } from '@supabase/supabase-js';
import crypto from 'crypto';

// 1. Initialize Admin Client (Bypasses RLS to ensure status updates work)
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

    // DEBUG: Log incoming webhook type and IDs for troubleshooting
    console.log('--- Webhook Processing Started ---');
    console.log('Event Type:', payload.type);
    console.log('Cashfree Order ID:', payload.data?.order?.order_id);

    // 2. Verify Cashfree Signature
    const ts = req.headers.get('x-webhook-timestamp');
    const signature = req.headers.get('x-webhook-signature');
    const secretKey = process.env.CASHFREE_SECRET_KEY!;

    const signatureData = ts + rawBody;
    const expectedSignature = crypto
      .createHmac('sha256', secretKey)
      .update(signatureData)
      .digest('base64');

    if (signature !== expectedSignature) {
      console.error('CRITICAL: Webhook Signature Mismatch.');
      return NextResponse.json({ error: 'Invalid signature' }, { status: 401 });
    }

    // 3. Handle Successful Payment
    const eventType = payload.type;
    const orderData = payload.data.order;
    const paymentData = payload.data.payment;

    // Check for both direct success and charges success events
    const isSuccess = (
      (eventType === 'PAYMENT_SUCCESS_WEBHOOK' || eventType === 'PAYMENT_CHARGES_WEBHOOK') &&
      paymentData.payment_status === 'SUCCESS'
    );

    if (isSuccess) {
      const cashfreeOrderId = orderData.order_id;

      // 4. Update Database to PAID
      // This matches the 'cf_order_id' column in your orders table
      const { error, data } = await supabaseAdmin
        .from('orders')
        .update({ 
          status: 'PAID',
          updated_at: new Date().toISOString()
        })
        .eq('cf_order_id', cashfreeOrderId)
        .select();

      if (error) {
        console.error('DATABASE ERROR:', error.message);
        return NextResponse.json({ error: 'DB Update Failed' }, { status: 500 });
      }

      if (!data || data.length === 0) {
        // This warning usually means the 'cf_order_id' in Supabase doesn't match the one from Cashfree
        console.warn(`WARNING: No matching order found in DB for cf_order_id: ${cashfreeOrderId}`);
      } else {
        console.log(`SUCCESS: Order ${cashfreeOrderId} updated to PAID for User: ${data[0].user_id}`);
      }
    } else {
      console.log(`INFO: Event ${eventType} received, but payment status was: ${paymentData?.payment_status}`);
    }

    console.log('--- Webhook Processing Finished ---');
    return NextResponse.json({ status: 'ok' }, { status: 200 });

  } catch (error) {
    console.error('WEBHOOK CRASH:', error);
    return NextResponse.json({ error: 'Internal Server Error' }, { status: 500 });
  }
}
