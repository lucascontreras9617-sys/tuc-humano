import { createClient } from '@supabase/supabase-js';
import { a as mpPayment } from '../../chunks/mercadopago_byBFhwhs.mjs';
export { renderers } from '../../renderers.mjs';

const POST = async ({ request }) => {
  const supabaseUrl = "https://jenbskrxpktziiajrbpt.supabase.co";
  const supabaseKey = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImplbmJza3J4cGt0emlpYWpyYnB0Iiwicm9sZSI6InNlcnZpY2Vfcm9sZSIsImlhdCI6MTc3NzYwODY1NCwiZXhwIjoyMDkzMTg0NjU0fQ.cvqdFqTGQFAF9vpUSjc8wff1CzApjQA2vNwK7eF7LW8";
  let body;
  try {
    body = await request.json();
  } catch {
    return jsonResponse({ error: "Invalid body" }, 400);
  }
  const { type, data } = body;
  if (type !== "payment" || !data?.id) {
    return jsonResponse({ ok: true, skipped: true });
  }
  const paymentId = String(data.id);
  try {
    const payment = await mpPayment.get({ id: paymentId });
    if (payment.status !== "approved") {
      return jsonResponse({ ok: true, status: payment.status });
    }
    const supabase = createClient(supabaseUrl, supabaseKey);
    const { data: existing } = await supabase.from("orders").select("id").eq("mp_payment_id", paymentId).single();
    if (existing) {
      return jsonResponse({ ok: true, duplicate: true });
    }
    const items = payment.additional_info?.items || [];
    const metadata = payment.metadata || {};
    const buyerInfo = metadata.buyer_info || {};
    let fullShippingAddress = "";
    if (buyerInfo.calle) {
      fullShippingAddress = `${buyerInfo.calle} ${buyerInfo.numero}`;
      if (buyerInfo.depto) fullShippingAddress += `, Piso/Depto: ${buyerInfo.depto}`;
      fullShippingAddress += ` — Loc: ${buyerInfo.localidad}, Prov: ${buyerInfo.provincia}`;
      if (buyerInfo.aclaraciones) fullShippingAddress += ` | Aclaraciones: ${buyerInfo.aclaraciones}`;
      if (buyerInfo.metodo_envio) fullShippingAddress += ` | Método de entrega: ${buyerInfo.metodo_envio}`;
    }
    const { error: orderError } = await supabase.from("orders").insert({
      mp_preference_id: payment.order?.id?.toString(),
      mp_payment_id: paymentId,
      mp_status: payment.status,
      status: "approved",
      total: payment.transaction_amount,
      items,
      buyer_email: buyerInfo.email || payment.payer?.email,
      buyer_name: buyerInfo.name || `${payment.payer?.first_name || ""} ${payment.payer?.last_name || ""}`.trim(),
      buyer_phone: buyerInfo.phone || null,
      shipping_address: fullShippingAddress || null,
      shipping_postal_code: buyerInfo.cp || null
    });
    if (orderError) console.error("Order save error:", orderError);
    for (const item of items) {
      const parts = String(item.id || "").split("-");
      const size = parts[parts.length - 1]?.toUpperCase();
      const productId = parts.slice(0, -1).join("-");
      if (!productId || !size || size === "ENVIO") continue;
      let col = "";
      if (size === "UNICO") {
        col = "stock_unico";
      } else {
        col = `stock_${size.toLowerCase()}`;
      }
      const { data: prod } = await supabase.from("products").select(col).eq("id", productId).single();
      if (prod) {
        const currentStock = prod[col] || 0;
        const newStock = Math.max(0, currentStock - (item.quantity || 1));
        await supabase.from("products").update({ [col]: newStock }).eq("id", productId);
      }
    }
    return jsonResponse({ ok: true, message: "Order saved and stock updated" });
  } catch (error) {
    console.error("Webhook error:", error);
    return jsonResponse({ error: "Internal error", detail: error?.message }, 500);
  }
};
function jsonResponse(data, status = 200) {
  return new Response(JSON.stringify(data), {
    status,
    headers: { "Content-Type": "application/json" }
  });
}

const _page = /*#__PURE__*/Object.freeze(/*#__PURE__*/Object.defineProperty({
  __proto__: null,
  POST
}, Symbol.toStringTag, { value: 'Module' }));

const page = () => _page;

export { page };
