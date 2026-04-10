import { NextResponse } from 'next/server';
import { createClient } from '@supabase/supabase-js';
import crypto from 'crypto';

const supabaseAdmin = createClient(
  process.env.NEXT_PUBLIC_SUPABASE_URL!,
  process.env.SUPABASE_SERVICE_ROLE_KEY!
);

export async function POST(req: Request) {
  try {
    const rawBody = await req.text();
    const payload = JSON.parse(rawBody);
    
    // Get headers for signature verification
    const ts = req.headers.get('x-webhook-timestamp');
    const signature = req.headers.get('x-webhook-signature');
    const secretKey = process.env.CASHFREE_SECRET_KEY!;

    // Manual signature verification (standard for Cashfree)
    const signatureData = ts + rawBody;
    const expectedSignature = crypto
      .createHmac('sha256', secretKey)
      .update(signatureData)
      .digest('base64');

    if (signature !== expectedSignature) {
      console.error('Webhook Signature Mismatch');
      return NextResponse.json({ error: 'Invalid signature' }, { status: 401 });
    }

    const { data: orderData } = payload;

    // Check for success
    if (payload.type === 'PAYMENT_SUCCESS_WEBHOOK' || orderData?.order_status === 'PAID') {
      const cashfreeOrderId = orderData.order_id;

      // Update the database
      const { data, error } = await supabaseAdmin
        .from('orders')
        .update({ 
          status: 'PAID',
          updated_at: new Date().toISOString()
        })
        .eq('cf_order_id', cashfreeOrderId)
        .select();

      if (error) {
        console.error('Database Update Error:', error.message);
        return NextResponse.json({ error: 'DB Update Failed' }, { status: 500 });
      }

      console.log(`Success: Order ${cashfreeOrderId} set to PAID`);
    }

    return NextResponse.json({ status: 'ok' }, { status: 200 });
  } catch (error) {
    console.error('Webhook processing failed:', error);
    return NextResponse.json({ error: 'Internal Server Error' }, { status: 500 });
  }
}
