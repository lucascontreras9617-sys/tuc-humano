/* empty css                                      */
import { c as createComponent, f as renderComponent, r as renderTemplate, e as createAstro, m as maybeRenderHead, d as addAttribute } from '../../chunks/astro/server_CrRun70o.mjs';
import 'kleur/colors';
import { $ as $$Layout } from '../../chunks/Layout_KVOzTch5.mjs';
export { renderers } from '../../renderers.mjs';

const $$Astro = createAstro();
const $$Pending = createComponent(($$result, $$props, $$slots) => {
  const Astro2 = $$result.createAstro($$Astro, $$props, $$slots);
  Astro2.self = $$Pending;
  const { searchParams } = Astro2.url;
  const paymentId = searchParams.get("payment_id") || "";
  searchParams.get("status") || "";
  searchParams.get("preference_id") || "";
  return renderTemplate`${renderComponent($$result, "Layout", $$Layout, { "title": "Pago pendiente | TUC-HUMANO", "description": "Tu pago está en proceso. Te avisaremos cuando se confirme.", "noindex": true }, { "default": ($$result2) => renderTemplate` ${maybeRenderHead()}<div class="min-h-[80vh] flex items-center justify-center px-4 py-16"> <div class="max-w-md w-full text-center space-y-6 animate-slide-up"> <div class="w-24 h-24 rounded-full bg-yellow-100 flex items-center justify-center mx-auto"> <svg class="w-12 h-12 text-yellow-500" fill="none" viewBox="0 0 24 24" stroke="currentColor"> <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2.5" d="M12 8v4l3 3"></path> </svg> </div> <div> <h1 class="text-3xl font-black text-gray-900">Pago en proceso</h1> <p class="text-gray-500 mt-3 leading-relaxed">
Mercado Pago está procesando tu pago. En breve te notificaremos el resultado final.
</p> </div> ${paymentId && renderTemplate`<div class="bg-gray-50 rounded-xl p-4 text-sm"> <p class="text-gray-400">Número de pago</p> <p class="font-mono font-bold text-gray-700 mt-1">${paymentId}</p> </div>`} <div class="bg-celeste-50 rounded-xl p-5 text-left space-y-3"> <p class="font-semibold text-celeste-700">Qué puede pasar ahora</p> <ul class="space-y-2 text-sm text-gray-600"> <li>• Si el pago se aprueba, te redirigiremos a la página de confirmación.</li> <li>• Si se cancela o rechaza, volverás a la página de pago fallido.</li> <li>• Si necesitas ayuda, escribinos por WhatsApp.</li> </ul> </div> <div class="flex flex-col sm:flex-row gap-3"> <a href="/tienda" class="btn-outline flex-1">Volver a la tienda</a> <a${addAttribute(`https://wa.me/${"5493812311060"}?text=${encodeURIComponent("Hola! Estoy con un pago pendiente en TUC-HUMANO y necesito ayuda. Pago ID: " + paymentId)}`, "href")} target="_blank" class="btn-primary flex-1">
Consultar por WhatsApp
</a> </div> </div> </div> ` })}`;
}, "/home/lucas/Escritorio/pagina remeras/src/pages/checkout/pending.astro", void 0);
const $$file = "/home/lucas/Escritorio/pagina remeras/src/pages/checkout/pending.astro";
const $$url = "/checkout/pending";

const _page = /*#__PURE__*/Object.freeze(/*#__PURE__*/Object.defineProperty({
  __proto__: null,
  default: $$Pending,
  file: $$file,
  url: $$url
}, Symbol.toStringTag, { value: 'Module' }));

const page = () => _page;

export { page };
