import { renderers } from './renderers.mjs';
import { c as createExports } from './chunks/entrypoint_DXqvhmNL.mjs';
import { manifest } from './manifest_D2Prmay-.mjs';

const _page0 = () => import('./pages/_image.astro.mjs');
const _page1 = () => import('./pages/api/create-preference.astro.mjs');
const _page2 = () => import('./pages/api/shipping-calculator.astro.mjs');
const _page3 = () => import('./pages/api/update-stock.astro.mjs');
const _page4 = () => import('./pages/checkout/failure.astro.mjs');
const _page5 = () => import('./pages/checkout/pending.astro.mjs');
const _page6 = () => import('./pages/checkout/success.astro.mjs');
const _page7 = () => import('./pages/producto/_slug_.astro.mjs');
const _page8 = () => import('./pages/tienda.astro.mjs');
const _page9 = () => import('./pages/index.astro.mjs');

const pageMap = new Map([
    ["node_modules/astro/dist/assets/endpoint/generic.js", _page0],
    ["src/pages/api/create-preference.ts", _page1],
    ["src/pages/api/shipping-calculator.ts", _page2],
    ["src/pages/api/update-stock.ts", _page3],
    ["src/pages/checkout/failure.astro", _page4],
    ["src/pages/checkout/pending.astro", _page5],
    ["src/pages/checkout/success.astro", _page6],
    ["src/pages/producto/[slug].astro", _page7],
    ["src/pages/tienda.astro", _page8],
    ["src/pages/index.astro", _page9]
]);
const serverIslandMap = new Map();
const _manifest = Object.assign(manifest, {
    pageMap,
    serverIslandMap,
    renderers,
    middleware: () => import('./_noop-middleware.mjs')
});
const _args = {
    "middlewareSecret": "f06d1906-18ca-4fc5-b4c6-97e3624b34bd",
    "skewProtection": false
};
const _exports = createExports(_manifest, _args);
const __astrojsSsrVirtualEntry = _exports.default;

export { __astrojsSsrVirtualEntry as default, pageMap };
