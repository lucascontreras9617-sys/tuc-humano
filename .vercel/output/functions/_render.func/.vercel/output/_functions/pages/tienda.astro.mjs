/* empty css                                   */
import { c as createComponent, f as renderComponent, r as renderTemplate, m as maybeRenderHead } from '../chunks/astro/server_CrRun70o.mjs';
import 'kleur/colors';
import { $ as $$Layout } from '../chunks/Layout_KVOzTch5.mjs';
import { $ as $$ProductCard } from '../chunks/ProductCard_DbIsv_G2.mjs';
import { g as getProducts, F as FALLBACK_PRODUCTS } from '../chunks/supabase_Be7-LGCD.mjs';
export { renderers } from '../renderers.mjs';

const $$Tienda = createComponent(async ($$result, $$props, $$slots) => {
  let products = [];
  try {
    products = await getProducts();
    if (!products || products.length === 0) {
      products = FALLBACK_PRODUCTS;
    }
  } catch (e) {
    products = FALLBACK_PRODUCTS;
  }
  return renderTemplate`${renderComponent($$result, "Layout", $$Layout, { "title": "Tienda | TUC-HUMANO \u2014 Remeras Oversize", "description": "Explor\xE1 nuestra colecci\xF3n de remeras oversize con dise\xF1o art\xEDstico tucumano. Stock real, talles S a XL." }, { "default": async ($$result2) => renderTemplate` ${maybeRenderHead()}<div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16"> <!-- Page Header --> <div class="text-center mb-12"> <span class="inline-block bg-celeste-50 text-celeste-600 text-xs font-bold px-4 py-2 rounded-full uppercase tracking-widest mb-4">
Colección
</span> <h1 class="section-title">Nuestra tienda</h1> <p class="section-subtitle mt-3 max-w-lg mx-auto">
Remeras oversize con diseño propio, conciencia social y algodón premium. Nacidas en Tucumán.
</p> </div> <div class="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6"> ${products.map((p) => renderTemplate`${renderComponent($$result2, "ProductCard", $$ProductCard, { "id": p.id, "name": p.name, "slug": p.slug, "price": p.price, "old_price": p.old_price, "image_url": p.image_url, "stock_s": p.stock_s, "stock_m": p.stock_m, "stock_l": p.stock_l, "stock_xl": p.stock_xl, "stock_unico": p.stock_unico, "has_sizes": p.has_sizes })}`)} </div> ${products.length === 0 && renderTemplate`<div class="text-center mt-8"> <div class="inline-flex items-center gap-2 bg-yellow-50 border border-yellow-200 text-yellow-700 text-sm px-6 py-3 rounded-full"> <svg class="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor"> <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"></path> </svg>
Configurá Supabase en <code class="font-mono bg-yellow-100 px-1 rounded">.env</code> para ver los productos reales
</div> </div>`} </div> ` })}`;
}, "/home/lucas/Escritorio/pagina remeras/src/pages/tienda.astro", void 0);

const $$file = "/home/lucas/Escritorio/pagina remeras/src/pages/tienda.astro";
const $$url = "/tienda";

const _page = /*#__PURE__*/Object.freeze(/*#__PURE__*/Object.defineProperty({
  __proto__: null,
  default: $$Tienda,
  file: $$file,
  url: $$url
}, Symbol.toStringTag, { value: 'Module' }));

const page = () => _page;

export { page };
