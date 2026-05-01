/* empty css                                      */
import { c as createComponent, f as renderComponent, r as renderTemplate, m as maybeRenderHead, d as addAttribute } from '../../chunks/astro/server_CrRun70o.mjs';
import 'kleur/colors';
import { $ as $$Layout } from '../../chunks/Layout_KVOzTch5.mjs';
export { renderers } from '../../renderers.mjs';

const $$Failure = createComponent(($$result, $$props, $$slots) => {
  return renderTemplate`${renderComponent($$result, "Layout", $$Layout, { "title": "Pago no completado | TUC-HUMANO", "description": "Hubo un problema con tu pago", "noindex": true }, { "default": ($$result2) => renderTemplate` ${maybeRenderHead()}<div class="min-h-[80vh] flex items-center justify-center px-4 py-16"> <div class="max-w-md w-full text-center space-y-6 animate-slide-up"> <div class="w-24 h-24 rounded-full bg-red-100 flex items-center justify-center mx-auto"> <svg class="w-12 h-12 text-red-400" fill="none" viewBox="0 0 24 24" stroke="currentColor"> <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M6 18L18 6M6 6l12 12"></path> </svg> </div> <div> <h1 class="text-3xl font-black text-gray-900">El pago no se completó</h1> <p class="text-gray-500 mt-3 leading-relaxed">
No te preocupes, no se realizó ningún cargo. Podés volver al carrito e intentarlo de nuevo.
</p> </div> <div class="bg-yellow-50 rounded-xl p-5 text-left"> <p class="font-semibold text-yellow-700 mb-2">¿Qué puede haber pasado?</p> <ul class="space-y-1 text-sm text-yellow-600"> <li>• El pago fue cancelado o rechazado</li> <li>• Límite de tarjeta o fondos insuficientes</li> <li>• Timeout en la sesión de pago</li> </ul> </div> <div class="flex flex-col sm:flex-row gap-3"> <a href="/tienda" class="btn-outline flex-1">
Volver a la tienda
</a> <a${addAttribute(`https://wa.me/${"5493812311060"}?text=${encodeURIComponent("Hola! Tuve un problema para pagar en TUC-HUMANO, ¿me pueden ayudar?")}`, "href")} target="_blank" class="btn-primary flex-1">
Pedir ayuda por WhatsApp
</a> </div> </div> </div> ` })}`;
}, "/home/lucas/Escritorio/pagina remeras/src/pages/checkout/failure.astro", void 0);
const $$file = "/home/lucas/Escritorio/pagina remeras/src/pages/checkout/failure.astro";
const $$url = "/checkout/failure";

const _page = /*#__PURE__*/Object.freeze(/*#__PURE__*/Object.defineProperty({
  __proto__: null,
  default: $$Failure,
  file: $$file,
  url: $$url
}, Symbol.toStringTag, { value: 'Module' }));

const page = () => _page;

export { page };
