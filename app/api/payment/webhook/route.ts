import { NextResponse } from 'next/server';
import { createClient } from '@supabase/supabase-js';
import { Cashfree } from 'cashfree-pg';

const supabaseAdmin = createClient(
  process.env.NEXT_PUBLIC_SUPABASE_URL!,
  process.env.SUPABASE_SERVICE_ROLE_KEY!
);

Cashfree.XClientId = process.env.CASHFREE_APP_ID!;
Cashfree.XClientSecret = process.env.CASHFREE_SECRET_KEY!;
Cashfree.XEnvironment = Cashfree.Environment.PRODUCTION;

export async function POST(req: Request) {
  try {
    const rawBody = await req.text();
    const signature = req.headers.get('x-webhook-signature');

    if (!signature) {
      return NextResponse.json({ error: 'No signature' }, { status: 400 });
    }

    const verifyResponse = Cashfree.PGWebhookVerify(rawBody, req.headers.get('x-webhook-timestamp')!, signature);

    if (!verifyResponse) {
      return NextResponse.json({ error: 'Invalid signature' }, { status: 400 });
    }

    const payload = JSON.parse(rawBody);
    const { data: orderData } = payload;

    if (orderData.order_status === 'PAID') {
      const cashfreeOrderId = orderData.order_id;

      const { data: order, error: fetchError } = await supabaseAdmin
        .from('orders')
        .select('*')
        .eq('cf_order_id', cashfreeOrderId)
        .single();

      if (fetchError || !order) {
        console.error('Order not found:', cashfreeOrderId);
        return NextResponse.json({ error: 'Order not found' }, { status: 404 });
      }

      const { error: updateError } = await supabaseAdmin
        .from('orders')
        .update({ 
          status: 'PAID',
          updated_at: new Date().toISOString()
        })
        .eq('cf_order_id', cashfreeOrderId);

      if (updateError) {
        throw updateError;
      }

      return NextResponse.json({ status: 'success' });
    }

    return NextResponse.json({ status: 'ignored' });
  } catch (error: any) {
    console.error('Webhook error:', error);
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}
