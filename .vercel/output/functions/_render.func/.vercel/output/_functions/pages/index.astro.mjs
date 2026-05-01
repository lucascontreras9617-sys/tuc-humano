/* empty css                                   */
import { c as createComponent, m as maybeRenderHead, d as addAttribute, r as renderTemplate, e as createAstro, f as renderComponent } from '../chunks/astro/server_CrRun70o.mjs';
import 'kleur/colors';
import { $ as $$Layout } from '../chunks/Layout_KVOzTch5.mjs';
import 'clsx';
/* empty css                                 */
import { $ as $$ProductCard } from '../chunks/ProductCard_DbIsv_G2.mjs';
import { g as getProducts, F as FALLBACK_PRODUCTS } from '../chunks/supabase_Be7-LGCD.mjs';
export { renderers } from '../renderers.mjs';

const $$HeroSlider = createComponent(($$result, $$props, $$slots) => {
  const slides = [
    { url: "/images/foto_portada_slide_lateral.jpg", title: "RESISTENCIA URBANA" },
    { url: "/images/foto dedo en v.webp", title: "RESISTENCIA Y CULTURA" }
  ];
  return renderTemplate`${maybeRenderHead()}<section class="relative h-[90vh] w-full overflow-hidden bg-black border-b-8 border-black" data-astro-cid-r6qggs4k> <div id="hero-slider" class="absolute inset-0 h-full w-full" data-astro-cid-r6qggs4k> ${slides.map((slide, index) => renderTemplate`<div${addAttribute(`hero-slide absolute inset-0 h-full w-full opacity-0 transition-opacity duration-[2000ms] ease-in-out ${index === 0 ? "active" : ""}`, "class")}${addAttribute(index, "data-index")} data-astro-cid-r6qggs4k> <img${addAttribute(slide.url, "src")}${addAttribute(slide.title, "alt")} class="h-full w-full object-cover" data-astro-cid-r6qggs4k> </div>`)} </div> <!-- Controles Brutalistas --> <div class="absolute bottom-10 left-1/2 -translate-x-1/2 z-30 flex gap-4" data-astro-cid-r6qggs4k> ${slides.map((_, i) => renderTemplate`<button${addAttribute(`w-12 h-2 border-2 border-black/50 transition-all duration-300 shadow-sm slider-dot ${i === 0 ? "bg-white" : "bg-transparent"}`, "class")}${addAttribute(i, "data-index")}${addAttribute(`Ir a slide ${i + 1}`, "aria-label")} data-astro-cid-r6qggs4k></button>`)} </div> </section>  `;
}, "/home/lucas/Escritorio/pagina remeras/src/components/HeroSlider.astro", void 0);

const $$Astro = createAstro();
const $$LookbookGallery = createComponent(($$result, $$props, $$slots) => {
  const Astro2 = $$result.createAstro($$Astro, $$props, $$slots);
  Astro2.self = $$LookbookGallery;
  const defaultImages = [
    { src: "/images/lookbook-1.jpg", alt: "TUC-HUMANO lookbook - frente y espalda" },
    { src: "/images/lookbook-2.jpg", alt: "TUC-HUMANO lookbook - campa\xF1a urbana" },
    { src: "/images/lookbook-3.jpg", alt: "TUC-HUMANO lookbook" },
    { src: "/images/lookbook-4.jpg", alt: "TUC-HUMANO lookbook" }
  ];
  const { images = defaultImages } = Astro2.props;
  return renderTemplate`${maybeRenderHead()}<section id="lookbook" class="py-20 bg-gray-950"> <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8"> <!-- Header --> <div class="text-center mb-12"> <span class="inline-block bg-celeste-500/20 text-celeste-400 text-xs font-bold px-4 py-2 rounded-full uppercase tracking-widest mb-4">
Lookbook
</span> <h2 class="text-4xl md:text-5xl font-black text-white">
La remera en acción
</h2> <p class="text-gray-400 mt-3 text-lg max-w-xl mx-auto">
Identidad, calle y actitud. Así se ve TUC-HUMANO puesto.
</p> </div> <!-- Masonry Grid --> <div class="columns-2 md:columns-3 lg:columns-4 gap-4 space-y-4"> ${images.map((img, i) => renderTemplate`<div class="lookbook-item break-inside-avoid rounded-2xl overflow-hidden cursor-pointer group relative"${addAttribute(`animation-delay: ${i * 100}ms`, "style")}> <img${addAttribute(img.src, "src")}${addAttribute(img.alt, "alt")} loading="lazy" class="w-full object-cover transition-transform duration-500 group-hover:scale-105" onerror="this.parentElement.style.display='none'"> <div class="absolute inset-0 bg-black/0 group-hover:bg-black/20 transition-colors duration-300 flex items-end p-4"> <span class="text-white text-sm font-medium opacity-0 group-hover:opacity-100 transition-opacity duration-300">
TUC-HUMANO ✦
</span> </div> </div>`)} </div> <!-- CTA --> <div class="text-center mt-12"> <a href="/tienda" class="btn-primary inline-flex">
Conseguí la tuya
<svg xmlns="http://www.w3.org/2000/svg" class="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor"> <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M17 8l4 4m0 0l-4 4m4-4H3"></path> </svg> </a> </div> </div> </section>`;
}, "/home/lucas/Escritorio/pagina remeras/src/components/LookbookGallery.astro", void 0);

const $$Index = createComponent(async ($$result, $$props, $$slots) => {
  let featuredProducts = [];
  try {
    featuredProducts = await getProducts();
    if (!featuredProducts || featuredProducts.length === 0) {
      featuredProducts = FALLBACK_PRODUCTS;
    }
  } catch (e) {
    featuredProducts = FALLBACK_PRODUCTS;
  }
  featuredProducts[0] || null;
  const remeras = featuredProducts.filter((p) => p.has_sizes);
  const librosYOtros = featuredProducts.filter((p) => !p.has_sizes);
  return renderTemplate`${renderComponent($$result, "Layout", $$Layout, { "title": "TUC-HUMANO | Remeras Oversize desde Tucum\xE1n", "description": "Remeras oversize con dise\xF1o art\xEDstico y conciencia social. Nacidas en Tucum\xE1n, para quienes caminan cada lucha con identidad y estilo." }, { "default": async ($$result2) => renderTemplate`  ${renderComponent($$result2, "HeroSlider", $$HeroSlider, {})}  ${maybeRenderHead()}<section id="valores" class="py-24 bg-white"> <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8"> <div class="max-w-4xl mx-auto text-center"> <div class="space-y-8"> <span class="inline-block bg-celeste-50 text-celeste-600 text-xs font-bold px-6 py-2 rounded-full uppercase tracking-widest">
Nuestros valores
</span> <h2 class="section-title !-rotate-0">
Más que una remera:<br> <span class="text-celeste-500 underline decoration-8 underline-offset-[12px]">una bandera</span> </h2> <div class="grid grid-cols-2 lg:grid-cols-4 gap-6 pt-8"> ${[
    { title: "Algod\xF3n premium", desc: "Suave, resistente y confortable" },
    { title: "Arte propio", desc: "Dise\xF1os \xFAnicos con mensaje" },
    { title: "Fit oversize", desc: "Para todos los cuerpos" },
    { title: "Militante", desc: "Cada remera es una bandera" }
  ].map((item) => renderTemplate`<div class="bg-gray-50 rounded-2xl p-6 hover:bg-celeste-50 transition-all duration-300 border border-gray-100 shadow-sm hover:shadow-md hover:-translate-y-1"> <p class="font-display uppercase tracking-tight text-gray-900 text-xl leading-tight">${item.title}</p> <p class="text-gray-500 text-xs mt-2 leading-relaxed">${item.desc}</p> </div>`)} </div> </div> </div> </div> </section>  <section class="py-12 bg-gray-50 border-y-8 border-black"> <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8"> <div class="mb-8"> <h2 class="section-title">Nuestras Remeras</h2> <div class="mt-8 bg-black text-white p-6 md:p-12 border-l-[16px] border-celeste-500 shadow-[20px_20px_0px_0px_rgba(0,174,239,0.25)] reveal-text"> <div class="space-y-12"> <p class="text-2xl md:text-4xl font-display uppercase tracking-[-0.04em] leading-[0.9] italic">
Nuestras remeras oversize no son solo prendas, son una declaración de identidad y valores. Hechas con algodón de primera calidad, combinan suavidad, durabilidad y un ajuste cómodo que abraza todos los cuerpos, acompañándote con estilo y confort día tras día.
</p> <div class="h-1 w-32 bg-celeste-500 mb-8"></div> <p class="text-xl md:text-3xl font-display uppercase tracking-[-0.02em] leading-tight italic text-gray-400">
Cada diseño es una pieza artística repleta de significado. Rinde homenaje a los grandes símbolos de <span class="text-celeste-400">la lucha popular</span> y a quienes soñaron —y siguen soñando— con una <span class="text-celeste-500 underline decoration-4 underline-offset-8">¡Argentina más justa, libre y soberana!</span> </p> </div> </div> <!-- Galería Dúo (Equilibrio Brutalista) --> <div class="mt-8 grid grid-cols-1 md:grid-cols-2 gap-4 reveal-text-delay"> <!-- Frente --> <div class="group aspect-[4/5] overflow-hidden border-8 border-black shadow-lg bg-black"> <img src="/images/parte de frente de la remera.jpg" class="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700" alt="Vista Frontal"> <div class="absolute bottom-4 left-4 bg-celeste-500 text-white px-4 py-1 font-display text-xs uppercase -rotate-2">Identidad</div> </div> <!-- Espalda --> <div class="group aspect-[4/5] overflow-hidden border-8 border-black shadow-lg bg-black"> <img src="/images/parte de atras de la remeras.jpg" class="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700" alt="Vista Dorsal"> <div class="absolute bottom-4 right-4 bg-celeste-500 text-white px-4 py-1 font-display text-xs uppercase rotate-2">Resistencia</div> </div> </div> </div> <div class="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6"> ${remeras.map((p) => renderTemplate`${renderComponent($$result2, "ProductCard", $$ProductCard, { "id": p.id, "name": p.name, "slug": p.slug, "price": p.price, "old_price": p.old_price, "image_url": p.image_url, "image_back_url": p.image_back_url, "stock_s": p.stock_s, "stock_m": p.stock_m, "stock_l": p.stock_l, "stock_xl": p.stock_xl, "stock_unico": p.stock_unico, "has_sizes": p.has_sizes })}`)} </div> </div> </section>  ${librosYOtros.length > 0 && renderTemplate`<section class="py-20 bg-white"> <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8"> <div class="mb-12 text-right"> <h2 class="section-title">Libros y Cultura</h2> <p class="text-lg text-gray-800 font-sans font-semibold max-w-2xl border-r-4 border-black pr-4 my-6 ml-auto">
Herramientas para el pensamiento crítico y la acción popular.
</p> </div> <div class="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 justify-end"> ${librosYOtros.map((p) => renderTemplate`${renderComponent($$result2, "ProductCard", $$ProductCard, { "id": p.id, "name": p.name, "slug": p.slug, "price": p.price, "old_price": p.old_price, "image_url": p.image_url, "image_back_url": p.image_back_url, "stock_s": p.stock_s, "stock_m": p.stock_m, "stock_l": p.stock_l, "stock_xl": p.stock_xl, "stock_unico": p.stock_unico, "has_sizes": p.has_sizes })}`)} </div> </div> </section>`} ${renderComponent($$result2, "LookbookGallery", $$LookbookGallery, { "images": [
    { src: "/images/parte de frente de la remera.jpg", alt: "TUC-HUMANO campa\xF1a - frente" },
    { src: "/images/parte de atras de la remeras.jpg", alt: "TUC-HUMANO campa\xF1a - espalda" },
    { src: "/images/foto 1.jpeg", alt: "TUC-HUMANO - detalle" },
    { src: "/images/foto 2.jpeg", alt: "TUC-HUMANO - estilo" }
  ] })}  <section class="py-16 bg-celeste-500"> <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8"> <div class="grid grid-cols-1 md:grid-cols-3 gap-8 text-white text-center"> <!-- Envío --> <div class="flex flex-col items-center gap-6 group"> <div class="h-20 w-auto flex items-center justify-center p-2"> <img src="/images/enviado.png" alt="Envío" class="h-full w-auto object-contain brightness-0 invert group-hover:brightness-100 group-hover:invert-0 transition-all duration-300"> </div> <div class="text-center"> <p class="font-display text-2xl uppercase tracking-tighter leading-none mb-2">Envíos Nacionales</p> <p class="text-celeste-100 text-xs font-technical uppercase tracking-widest opacity-80">Logística Andreani</p> </div> </div> <!-- Pago --> <div class="flex flex-col items-center gap-6 group"> <div class="h-20 w-auto flex items-center justify-center p-2"> <img src="/images/Mercado_Pago.svg.png" alt="Mercado Pago" class="h-full w-auto object-contain brightness-0 invert group-hover:brightness-100 group-hover:invert-0 transition-all duration-300"> </div> <div class="text-center"> <p class="font-display text-2xl uppercase tracking-tighter leading-none mb-2">Pago Garantizado</p> <p class="text-celeste-100 text-xs font-technical uppercase tracking-widest opacity-80">Mercado Pago Protegido</p> </div> </div> <!-- WhatsApp --> <div class="flex flex-col items-center gap-6 group"> <div class="h-20 w-auto flex items-center justify-center p-2"> <img src="/images/whatsapp.png" alt="WhatsApp" class="h-full w-auto object-contain brightness-0 invert group-hover:brightness-100 group-hover:invert-0 transition-all duration-300"> </div> <div class="text-center"> <p class="font-display text-2xl uppercase tracking-tighter leading-none mb-2">Consultas Directas</p> <p class="text-celeste-100 text-xs font-technical uppercase tracking-widest opacity-80">WhatsApp 24/7</p> </div> </div> </div> </div> </section> ` })}`;
}, "/home/lucas/Escritorio/pagina remeras/src/pages/index.astro", void 0);

const $$file = "/home/lucas/Escritorio/pagina remeras/src/pages/index.astro";
const $$url = "";

const _page = /*#__PURE__*/Object.freeze(/*#__PURE__*/Object.defineProperty({
  __proto__: null,
  default: $$Index,
  file: $$file,
  url: $$url
}, Symbol.toStringTag, { value: 'Module' }));

const page = () => _page;

export { page };
