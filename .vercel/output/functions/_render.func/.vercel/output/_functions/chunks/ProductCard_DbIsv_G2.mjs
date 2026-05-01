import { c as createComponent, m as maybeRenderHead, d as addAttribute, r as renderTemplate, e as createAstro } from './astro/server_CrRun70o.mjs';
import 'kleur/colors';
import 'clsx';

const $$Astro = createAstro();
const $$ProductCard = createComponent(($$result, $$props, $$slots) => {
  const Astro2 = $$result.createAstro($$Astro, $$props, $$slots);
  Astro2.self = $$ProductCard;
  const { id, name, slug, price, old_price, image_url, image_back_url, stock_s = 0, stock_m = 0, stock_l = 0, stock_xl = 0, stock_unico = 0, has_sizes = true } = Astro2.props;
  const hasStock = has_sizes ? stock_s > 0 || stock_m > 0 || stock_l > 0 || stock_xl > 0 : stock_unico > 0;
  const formatPrice = (p) => new Intl.NumberFormat("es-AR", {
    style: "currency",
    currency: "ARS",
    minimumFractionDigits: 0
  }).format(p);
  const formatted = formatPrice(price);
  const formattedOld = old_price ? formatPrice(old_price) : null;
  const discountPercent = old_price ? Math.round((old_price - price) / old_price * 100) : 0;
  return renderTemplate`${maybeRenderHead()}<article class="product-card group"${addAttribute(id, "data-product-id")}> <a${addAttribute(`/producto/${slug}`, "href")} class="block"> <!-- Image --> <div class="relative aspect-[3/4] overflow-hidden bg-black border-b-4 border-black"> <!-- Foto Principal --> <img${addAttribute(image_url, "src")}${addAttribute(name, "alt")}${addAttribute(`absolute inset-0 w-full h-full object-cover transition-opacity duration-500 ${image_back_url ? "group-hover:opacity-0" : ""}`, "class")} loading="lazy"> <!-- Foto Secundaria (Solo si existe) --> ${image_back_url && renderTemplate`<img${addAttribute(image_back_url, "src")}${addAttribute(`${name} - Vista alternativa`, "alt")} class="absolute inset-0 w-full h-full object-cover opacity-0 transition-opacity duration-500 group-hover:opacity-100" loading="lazy">`} ${!hasStock && renderTemplate`<div class="absolute inset-0 bg-white/70 flex items-center justify-center"> <span class="bg-gray-900 text-white text-xs font-semibold px-4 py-2 rounded-full">Sin stock</span> </div>`} <!-- Badges --> <div class="absolute top-3 left-3 flex flex-col gap-2"> ${has_sizes && renderTemplate`<span class="bg-celeste-500 text-white text-xs font-bold px-3 py-1 rounded-full shadow-sm">
OVERSIZE
</span>`} ${discountPercent > 0 && renderTemplate`<span class="bg-red-500 text-white text-xs font-bold px-3 py-1 rounded-full shadow-sm w-fit">
-${discountPercent}%
</span>`} </div> </div> <!-- Info --> <div class="p-4"> <h3 class="font-semibold text-gray-900 text-sm leading-tight mb-1">${name}</h3> <div class="flex items-center gap-2 mt-1"> <p class="text-celeste-600 font-bold text-lg">${formatted}</p> ${formattedOld && renderTemplate`<p class="text-gray-400 text-sm line-through">${formattedOld}</p>`} </div> </div> </a> <!-- Quick Add (shows on hover) --> ${hasStock && renderTemplate`<div class="px-4 pb-4 flex flex-col gap-2 relative z-20" onclick="event.preventDefault();"> ${has_sizes && renderTemplate`<select class="quick-add-size w-full text-sm border border-gray-200 rounded-lg py-2 px-3 focus:ring-celeste-500 focus:border-celeste-500 bg-white text-gray-900 cursor-pointer"> <option value="">Elegí tu talle</option> ${stock_s && stock_s > 0 ? renderTemplate`<option value="S">Talle S</option>` : null} ${stock_m && stock_m > 0 ? renderTemplate`<option value="M">Talle M</option>` : null} ${stock_l && stock_l > 0 ? renderTemplate`<option value="L">Talle L</option>` : null} ${stock_xl && stock_xl > 0 ? renderTemplate`<option value="XL">Talle XL</option>` : null} </select>`} <div class="flex gap-2"> <a${addAttribute(`/producto/${slug}`, "href")} class="btn-outline flex-1 text-xs py-2 px-0 text-center" onclick="window.location.href=this.href;">
Detalles
</a> <button class="btn-primary flex-1 text-xs py-2 px-0 add-to-cart-quick"${addAttribute(JSON.stringify({ id, name, price, image_url, has_sizes }), "data-product")}>
Sumar
</button> </div> <p class="quick-add-error text-red-500 text-xs hidden text-center mt-1">⚠️ Seleccioná un talle</p> </div>`} </article> `;
}, "/home/lucas/Escritorio/pagina remeras/src/components/ProductCard.astro", void 0);

export { $$ProductCard as $ };
