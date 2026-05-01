import type { APIRoute } from 'astro';
import { createClient } from '@supabase/supabase-js';
import { MercadoPagoConfig, Payment } from 'mercadopago';

// Mercado Pago webhook — updates stock and saves order on payment approval
export const POST: APIRoute = async ({ request }) => {
  const mpToken = import.meta.env.MERCADOPAGO_ACCESS_TOKEN;
  const supabaseUrl = import.meta.env.PUBLIC_SUPABASE_URL;
  const supabaseKey = import.meta.env.SUPABASE_SERVICE_ROLE_KEY;

  if (!mpToken || !supabaseUrl || !supabaseKey) {
    return jsonResponse({ error: 'Server not configured' }, 500);
  }

  let body: any;
  try {
    body = await request.json();
  } catch {
    return jsonResponse({ error: 'Invalid body' }, 400);
  }

  // MP sends webhooks with topic=payment and id=payment_id
  const { type, data } = body;
  if (type !== 'payment' || !data?.id) {
    return jsonResponse({ ok: true, skipped: true });
  }

  const paymentId = String(data.id);

  try {
    const client = new MercadoPagoConfig({ accessToken: mpToken });
    const paymentClient = new Payment(client);
    const payment = await paymentClient.get({ id: paymentId });

    if (payment.status !== 'approved') {
      return jsonResponse({ ok: true, status: payment.status });
    }

    // Supabase with service role key (bypasses RLS)
    const supabase = createClient(supabaseUrl, supabaseKey);

    // Check we haven't processed this payment before
    const { data: existing } = await supabase
      .from('orders')
      .select('id')
      .eq('mp_payment_id', paymentId)
      .single();

    if (existing) {
      return jsonResponse({ ok: true, duplicate: true });
    }

    // Extract items from MP additional_info
    const items = payment.additional_info?.items || [];

    // Extract custom metadata injected at preference creation
    const metadata = payment.metadata || {};
    const buyerInfo = metadata.buyer_info || {};

    let fullShippingAddress = '';
    if (buyerInfo.calle) {
        fullShippingAddress = `${buyerInfo.calle} ${buyerInfo.numero}`;
        if (buyerInfo.depto) fullShippingAddress += `, Piso/Depto: ${buyerInfo.depto}`;
        fullShippingAddress += ` — Loc: ${buyerInfo.localidad}, Prov: ${buyerInfo.provincia}`;
        if (buyerInfo.aclaraciones) fullShippingAddress += ` | Aclaraciones: ${buyerInfo.aclaraciones}`;
        if (buyerInfo.metodo_envio) fullShippingAddress += ` | Método de entrega: ${buyerInfo.metodo_envio}`;
    }

    // Save order
    const { error: orderError } = await supabase.from('orders').insert({
      mp_preference_id: payment.order?.id?.toString(),
      mp_payment_id: paymentId,
      mp_status: payment.status,
      status: 'approved',
      total: payment.transaction_amount,
      items: items,
      buyer_email: buyerInfo.email || payment.payer?.email,
      buyer_name: buyerInfo.name || `${payment.payer?.first_name || ''} ${payment.payer?.last_name || ''}`.trim(),
      buyer_phone: buyerInfo.phone || null,
      shipping_address: fullShippingAddress || null,
      shipping_postal_code: buyerInfo.cp || null,
    });

    if (orderError) console.error('Order save error:', orderError);

    // Update stock for each item
    for (const item of items) {
      const parts = String(item.id || '').split('-');
      const size = parts[parts.length - 1]?.toUpperCase();
      const productId = parts.slice(0, -1).join('-');

      if (!productId || !size || size === 'ENVIO') continue;

      let col = '';
      if (size === 'UNICO') {
          col = 'stock_unico';
      } else {
          col = `stock_${size.toLowerCase()}`;
      }

      // Get current stock
      const { data: prod } = await supabase
        .from('products')
        .select(col)
        .eq('id', productId)
        .single();

      if (prod) {
        const currentStock = (prod as any)[col] || 0;
        const newStock = Math.max(0, currentStock - (item.quantity || 1));
        await supabase
          .from('products')
          .update({ [col]: newStock })
          .eq('id', productId);
      }
    }

    return jsonResponse({ ok: true, message: 'Order saved and stock updated' });

  } catch (error: any) {
    console.error('Webhook error:', error);
    return jsonResponse({ error: 'Internal error', detail: error?.message }, 500);
  }
};

function jsonResponse(data: object, status = 200) {
  return new Response(JSON.stringify(data), {
    status,
    headers: { 'Content-Type': 'application/json' },
  });
}
