/* empty css                                      */
import { c as createComponent, m as maybeRenderHead, d as addAttribute, r as renderTemplate, f as renderComponent, F as Fragment, e as createAstro } from '../../chunks/astro/server_CrRun70o.mjs';
import 'kleur/colors';
import { $ as $$Layout } from '../../chunks/Layout_KVOzTch5.mjs';
import { a as getProductBySlug } from '../../chunks/supabase_Be7-LGCD.mjs';
export { renderers } from '../../renderers.mjs';

const $$Astro$1 = createAstro();
const $$ProductDetail = createComponent(($$result, $$props, $$slots) => {
  const Astro2 = $$result.createAstro($$Astro$1, $$props, $$slots);
  Astro2.self = $$ProductDetail;
  const { product } = Astro2.props;
  const formatPrice = (p) => new Intl.NumberFormat("es-AR", {
    style: "currency",
    currency: "ARS",
    minimumFractionDigits: 0
  }).format(p);
  const formatted = formatPrice(product.price);
  const formattedOld = product.old_price ? formatPrice(product.old_price) : null;
  const discountPercent = product.old_price ? Math.round((product.old_price - product.price) / product.old_price * 100) : 0;
  const sizes = product.has_sizes ? [
    { label: "S", stock: product.stock_s },
    { label: "M", stock: product.stock_m },
    { label: "L", stock: product.stock_l },
    { label: "XL", stock: product.stock_xl }
  ] : [];
  const hasStock = product.has_sizes ? product.stock_s > 0 || product.stock_m > 0 || product.stock_l > 0 || product.stock_xl > 0 : product.stock_unico > 0;
  return renderTemplate`${maybeRenderHead()}<div class="grid grid-cols-1 lg:grid-cols-2 gap-10 lg:gap-16 items-start"> <div id="product-ctx"${addAttribute(JSON.stringify(product), "data-product")} class="hidden"></div> <!-- Gallery --> <div class="space-y-3"> <div class="relative aspect-[3/4] rounded-2xl overflow-hidden bg-gray-50 group"> <img id="main-product-img"${addAttribute(product.image_url || "/images/parte de frente de la remera.jpg", "src")}${addAttribute(product.name, "alt")} class="w-full h-full object-cover object-center transition-opacity duration-300"> ${discountPercent > 0 && renderTemplate`<div class="absolute top-4 left-4 z-10"> <span class="bg-red-500 text-white text-sm font-bold px-4 py-2 rounded-full shadow-lg">
-${discountPercent}% OFF
</span> </div>`} </div> <!-- Thumbnails --> ${product.image_back_url && renderTemplate`<div class="flex gap-3"> <button class="thumb-btn flex-1 aspect-[3/4] rounded-xl overflow-hidden border-2 border-celeste-500"${addAttribute(product.image_url || "/images/parte de frente de la remera.jpg", "data-src")}> <img${addAttribute(product.image_url || "/images/parte de frente de la remera.jpg", "src")} alt="Frente" class="w-full h-full object-cover"> </button> <button class="thumb-btn flex-1 aspect-[3/4] rounded-xl overflow-hidden border-2 border-transparent hover:border-celeste-300 transition-colors"${addAttribute(product.image_back_url, "data-src")}> <img${addAttribute(product.image_back_url, "src")} alt="Espalda" class="w-full h-full object-cover"> </button> </div>`} </div> <!-- Info --> <div class="space-y-6 lg:sticky lg:top-24"> <div> ${product.has_sizes && renderTemplate`<span class="inline-block bg-celeste-100 text-celeste-700 text-xs font-bold px-3 py-1 rounded-full mb-3 uppercase tracking-wider">
Remera Oversize
</span>`} <h1 class="text-3xl font-bold text-gray-900 leading-tight">${product.name}</h1> <div class="flex items-center gap-4 mt-3"> <p class="text-4xl font-black text-celeste-500">${formatted}</p> ${formattedOld && renderTemplate`<p class="text-xl text-gray-400 line-through decoration-red-400/50">${formattedOld}</p>`} </div> <p class="text-gray-400 text-sm mt-1">+ costo de envío (calcular en el carrito)</p> </div> <!-- Description --> <p class="text-gray-600 leading-relaxed text-sm border-l-4 border-celeste-200 pl-4"> ${product.description} </p> ${hasStock ? renderTemplate`${renderComponent($$result, "Fragment", Fragment, {}, { "default": ($$result2) => renderTemplate`  ${product.has_sizes ? renderTemplate`<div> <div class="flex items-center justify-between mb-3"> <p class="font-semibold text-gray-900 text-sm">Elegí tu talle</p> <span id="size-error" class="text-red-400 text-xs hidden">Seleccioná un talle</span> </div> <div class="flex gap-3"> ${sizes.map(({ label, stock }) => renderTemplate`<button${addAttribute("size-btn " + (stock === 0 ? "out-of-stock" : ""), "class")}${addAttribute(label, "data-size")}${addAttribute(stock, "data-stock")}${addAttribute(stock === 0, "disabled")}${addAttribute(stock === 0 ? "Sin stock" : "Stock: " + stock, "title")}> ${label} </button>`)} </div> <p id="stock-indicator" class="text-xs text-gray-400 mt-2"></p> </div>` : renderTemplate`<div> <span class="inline-block bg-gray-100 text-gray-600 text-sm px-4 py-2 rounded-lg font-medium border border-gray-200">
Talle/Tamaño Único
</span> <p id="stock-indicator" class="text-xs text-gray-400 mt-2"> ${product.stock_unico <= 5 && product.stock_unico > 0 ? "\u26A0\uFE0F \xDAltimas " + product.stock_unico + " unidades" : "Stock disponible"} </p> </div>`} <div> <p class="font-semibold text-gray-900 text-sm mb-3">Cantidad</p> <div class="flex items-center gap-4"> <button id="qty-dec" class="w-10 h-10 rounded-full border-2 border-gray-200 flex items-center justify-center text-gray-500 hover:border-celeste-500 hover:text-celeste-500 transition-colors font-bold text-lg">−</button> <span id="qty-display" class="text-lg font-bold w-8 text-center text-gray-900">1</span> <button id="qty-inc" class="w-10 h-10 rounded-full border-2 border-gray-200 flex items-center justify-center text-gray-500 hover:border-celeste-500 hover:text-celeste-500 transition-colors font-bold text-lg">+</button> </div> </div>  <div class="flex flex-col gap-3 pt-2"> <button id="add-to-cart-btn" class="btn-primary w-full py-4 text-base"> <svg xmlns="http://www.w3.org/2000/svg" class="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor"> <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M16 11V7a4 4 0 00-8 0v4M5 9h14l1 12H4L5 9z"></path> </svg>
Agregar al carrito
</button> <button id="buy-now-btn" class="btn-outline w-full py-4 text-base">
Comprar ahora
</button> </div> ` })}` : renderTemplate`<div class="bg-gray-50 border border-gray-200 rounded-xl p-6 text-center mt-6"> <p class="text-gray-900 font-bold text-lg mb-2">Producto sin stock</p> <p class="text-gray-500 text-sm mb-4">Dejanos tu email y te avisamos cuando vuelva a ingresar.</p> <div class="flex gap-2"> <input type="email" placeholder="Tu email..." class="flex-1 rounded-lg border-gray-300 shadow-sm focus:border-celeste-500 focus:ring-celeste-500"> <button class="bg-gray-900 text-white px-4 py-2 rounded-lg text-sm font-semibold hover:bg-gray-800 transition-colors">Avisarme</button> </div> </div>`} <!-- Features --> ${product.has_sizes ? renderTemplate`<div class="grid grid-cols-2 gap-3 pt-4 border-t border-gray-100"> <div class="flex items-center gap-2 text-sm text-gray-500"><span class="text-celeste-500">✓</span> Algodón premium</div> <div class="flex items-center gap-2 text-sm text-gray-500"><span class="text-celeste-500">✓</span> Fit oversize</div> <div class="flex items-center gap-2 text-sm text-gray-500"><span class="text-celeste-500">✓</span> Diseño único</div> <div class="flex items-center gap-2 text-sm text-gray-500"><span class="text-celeste-500">✓</span> Todos los cuerpos</div> </div>` : renderTemplate`<div class="grid grid-cols-2 gap-3 pt-4 border-t border-gray-100"> <div class="flex items-center gap-2 text-sm text-gray-500"><span class="text-celeste-500">✓</span> Calidad garantizada</div> <div class="flex items-center gap-2 text-sm text-gray-500"><span class="text-celeste-500">✓</span> Envíos a todo el país</div> </div>`} </div> </div> `;
}, "/home/lucas/Escritorio/pagina remeras/src/components/ProductDetail.astro", void 0);

const $$Astro = createAstro();
const $$slug = createComponent(async ($$result, $$props, $$slots) => {
  const Astro2 = $$result.createAstro($$Astro, $$props, $$slots);
  Astro2.self = $$slug;
  const { slug } = Astro2.params;
  const placeholderProduct = {
    id: "placeholder-id",
    name: "Remera Oversize TUC-HUMANO",
    slug: "remera-oversize-tuc-humano",
    price: 27500,
    old_price: 35e3,
    description: "Remera oversize de algod\xF3n premium con estampado art\xEDstico del escudo tucumano. Una declaraci\xF3n de identidad, de lucha y de amor por Tucum\xE1n. Hecha con algod\xF3n de primera calidad, suave, duradera y con un ajuste c\xF3modo que abraza todos los cuerpos.",
    image_url: "/images/parte de frente de la remera.jpg",
    image_back_url: "/images/parte de atras de la remeras.jpg",
    stock_s: 10,
    stock_m: 15,
    stock_l: 15,
    stock_xl: 10,
    stock_unico: 0,
    has_sizes: true,
    active: true
  };
  let product = null;
  try {
    if (slug) {
      product = await getProductBySlug(slug);
    }
  } catch (e) {
  }
  if (!product) {
    product = placeholderProduct;
  }
  return renderTemplate`${renderComponent($$result, "Layout", $$Layout, { "title": `${product.name} | TUC-HUMANO`, "description": product.description, "image": product.image_url }, { "default": async ($$result2) => renderTemplate` ${maybeRenderHead()}<div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12"> <!-- Breadcrumb --> <nav class="flex items-center gap-2 text-sm text-gray-400 mb-8"> <a href="/" class="hover:text-celeste-500 transition-colors">Inicio</a> <span>›</span> <a href="/tienda" class="hover:text-celeste-500 transition-colors">Tienda</a> <span>›</span> <span class="text-gray-700 font-medium truncate max-w-xs">${product.name}</span> </nav> ${renderComponent($$result2, "ProductDetail", $$ProductDetail, { "product": product })} <!-- Extra info accordion --> <div class="mt-16 border-t border-gray-100 pt-12"> <div class="grid grid-cols-1 md:grid-cols-3 gap-8"> <div class="text-center p-6 bg-gray-50 rounded-2xl"> <span class="text-3xl">📏</span> <h3 class="font-bold text-gray-900 mt-3 mb-2">Guía de talles</h3> <p class="text-gray-500 text-sm">Fit oversize. Si dudás entre 2 talles, te recomendamos el más chico para un look más ceñido o el más grande para el look clásico oversize.</p> </div> <div class="text-center p-6 bg-gray-50 rounded-2xl"> <span class="text-3xl">🧺</span> <h3 class="font-bold text-gray-900 mt-3 mb-2">Cuidado del producto</h3> <p class="text-gray-500 text-sm">Lavado a máquina a 30°C. No usar secadora. Planchar del revés a temperatura media para preservar el estampado.</p> </div> <div class="text-center p-6 bg-gray-50 rounded-2xl"> <span class="text-3xl">📦</span> <h3 class="font-bold text-gray-900 mt-3 mb-2">Envíos</h3> <p class="text-gray-500 text-sm">Envíos a todo el país vía Correo Argentino. El costo se calcula con tu código postal en el carrito. Tiempo estimado: 3 a 7 días hábiles.</p> </div> </div> </div> </div> ` })}`;
}, "/home/lucas/Escritorio/pagina remeras/src/pages/producto/[slug].astro", void 0);

const $$file = "/home/lucas/Escritorio/pagina remeras/src/pages/producto/[slug].astro";
const $$url = "/producto/[slug]";

const _page = /*#__PURE__*/Object.freeze(/*#__PURE__*/Object.defineProperty({
  __proto__: null,
  default: $$slug,
  file: $$file,
  url: $$url
}, Symbol.toStringTag, { value: 'Module' }));

const page = () => _page;

export { page };
