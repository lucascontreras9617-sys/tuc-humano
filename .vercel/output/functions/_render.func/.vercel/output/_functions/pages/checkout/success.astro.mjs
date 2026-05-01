/* empty css                                      */
import { c as createComponent, f as renderComponent, r as renderTemplate, e as createAstro, m as maybeRenderHead, d as addAttribute } from '../../chunks/astro/server_CrRun70o.mjs';
import 'kleur/colors';
import { $ as $$Layout } from '../../chunks/Layout_KVOzTch5.mjs';
export { renderers } from '../../renderers.mjs';

const $$Astro = createAstro();
const $$Success = createComponent(($$result, $$props, $$slots) => {
  const Astro2 = $$result.createAstro($$Astro, $$props, $$slots);
  Astro2.self = $$Success;
  const { searchParams } = Astro2.url;
  const paymentId = searchParams.get("payment_id") || "";
  searchParams.get("status") || "";
  searchParams.get("preference_id") || "";
  return renderTemplate`${renderComponent($$result, "Layout", $$Layout, { "title": "¡Pago exitoso! | TUC-HUMANO", "description": "Gracias por tu compra en TUC-HUMANO", "noindex": true }, { "default": ($$result2) => renderTemplate` ${maybeRenderHead()}<div class="min-h-[80vh] flex items-center justify-center px-4 py-16"> <div class="max-w-md w-full text-center space-y-6 animate-slide-up"> <!-- Checkmark animation --> <div class="w-24 h-24 rounded-full bg-green-100 flex items-center justify-center mx-auto"> <svg class="w-12 h-12 text-green-500" fill="none" viewBox="0 0 24 24" stroke="currentColor"> <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2.5" d="M5 13l4 4L19 7"></path> </svg> </div> <div> <h1 class="text-3xl font-black text-gray-900">¡Gracias por tu compra!</h1> <p class="text-gray-500 mt-3 leading-relaxed">
Tu pedido fue procesado exitosamente. Te llegará un email de confirmación con los detalles del envío.
</p> </div> ${paymentId && renderTemplate`<div class="bg-gray-50 rounded-xl p-4 text-sm"> <p class="text-gray-400">Número de pago</p> <p class="font-mono font-bold text-gray-700 mt-1">${paymentId}</p> </div>`} <div class="bg-celeste-50 rounded-xl p-5 text-left space-y-3"> <p class="font-semibold text-celeste-700">¿Qué sigue?</p> <ul class="space-y-2 text-sm text-gray-600"> <li class="flex items-start gap-2"> <span class="text-celeste-500 mt-0.5">📧</span>
Te enviamos un email con la confirmación
</li> <li class="flex items-start gap-2"> <span class="text-celeste-500 mt-0.5">📦</span>
Preparamos tu pedido y lo enviamos por Correo Argentino
</li> <li class="flex items-start gap-2"> <span class="text-celeste-500 mt-0.5">💬</span>
Ante cualquier consulta, escribinos por WhatsApp
</li> </ul> </div> <div class="flex flex-col sm:flex-row gap-3"> <a href="/tienda" class="btn-outline flex-1">
Seguir comprando
</a> <a${addAttribute(`https://wa.me/${"5493812311060"}?text=${encodeURIComponent("Hola! Acabo de realizar una compra en TUC-HUMANO. Mi número de pago es: " + paymentId)}`, "href")} target="_blank" class="btn-primary flex-1">
Consultar por WhatsApp
</a> </div> </div> </div> ` })} `;
}, "/home/lucas/Escritorio/pagina remeras/src/pages/checkout/success.astro", void 0);
const $$file = "/home/lucas/Escritorio/pagina remeras/src/pages/checkout/success.astro";
const $$url = "/checkout/success";

const _page = /*#__PURE__*/Object.freeze(/*#__PURE__*/Object.defineProperty({
  __proto__: null,
  default: $$Success,
  file: $$file,
  url: $$url
}, Symbol.toStringTag, { value: 'Module' }));

const page = () => _page;

export { page };
