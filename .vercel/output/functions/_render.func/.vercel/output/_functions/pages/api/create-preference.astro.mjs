import { m as mpPreference } from '../../chunks/mercadopago_byBFhwhs.mjs';
export { renderers } from '../../renderers.mjs';

const POST = async ({ request }) => {
  const siteUrl = "http://localhost:4321".trim();
  let body;
  try {
    body = await request.json();
  } catch {
    return new Response(
      JSON.stringify({ error: "Invalid request body" }),
      { status: 400, headers: { "Content-Type": "application/json" } }
    );
  }
  const { items = [], shipping_cost = 0, buyer_info = {} } = body;
  if (!items.length) {
    return new Response(
      JSON.stringify({ error: "No items in cart" }),
      { status: 400, headers: { "Content-Type": "application/json" } }
    );
  }
  try {
    const preferenceClient = mpPreference;
    const mpItems = items.map((item) => ({
      id: `${item.productId}-${item.size}`,
      title: `${item.name} - Talle ${item.size}`,
      quantity: item.quantity,
      unit_price: item.price,
      currency_id: "ARS",
      category_id: "fashion",
      picture_url: item.image?.startsWith("/") ? `${siteUrl}${item.image}` : item.image
    }));
    if (shipping_cost > 0) {
      mpItems.push({
        id: "envio",
        title: `Envío: ${buyer_info.metodo_envio || "Costo de envío (Andreani)"}`,
        quantity: 1,
        unit_price: shipping_cost,
        currency_id: "ARS",
        category_id: "services"
      });
    }
    const preference = await preferenceClient.create({
      body: {
        items: mpItems,
        back_urls: {
          success: `${siteUrl}/checkout/success`,
          failure: `${siteUrl}/checkout/failure`,
          pending: `${siteUrl}/checkout/pending`
        },
        auto_return: siteUrl.includes("localhost") ? void 0 : "approved",
        notification_url: siteUrl.includes("localhost") ? void 0 : `${siteUrl}/api/update-stock`,
        payment_methods: {
          excluded_payment_types: [],
          installments: 6
        },
        statement_descriptor: "TUC-HUMANO",
        binary_mode: false,
        expires: false,
        metadata: {
          buyer_info
        },
        payer: buyer_info.email ? {
          name: buyer_info.name || "",
          email: buyer_info.email
        } : void 0
      }
    });
    return new Response(
      JSON.stringify({
        id: preference.id,
        init_point: preference.init_point,
        sandbox_init_point: preference.sandbox_init_point
      }),
      { status: 200, headers: { "Content-Type": "application/json" } }
    );
  } catch (error) {
    console.error("Mercado Pago error:", error);
    return new Response(
      JSON.stringify({ error: "Error creating payment preference", detail: error?.message }),
      { status: 500, headers: { "Content-Type": "application/json" } }
    );
  }
};
const GET = async () => {
  return new Response(
    JSON.stringify({ ok: true, message: "Use POST to create a preference" }),
    { status: 200, headers: { "Content-Type": "application/json" } }
  );
};

const _page = /*#__PURE__*/Object.freeze(/*#__PURE__*/Object.defineProperty({
  __proto__: null,
  GET,
  POST
}, Symbol.toStringTag, { value: 'Module' }));

const page = () => _page;

export { page };
