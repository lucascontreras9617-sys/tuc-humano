import 'cookie';
import 'kleur/colors';
import { N as NOOP_MIDDLEWARE_FN } from './chunks/astro-designed-error-pages_BRnP9YIM.mjs';
import 'es-module-lexer';
import { g as decodeKey } from './chunks/astro/server_CrRun70o.mjs';
import 'clsx';

function sanitizeParams(params) {
  return Object.fromEntries(
    Object.entries(params).map(([key, value]) => {
      if (typeof value === "string") {
        return [key, value.normalize().replace(/#/g, "%23").replace(/\?/g, "%3F")];
      }
      return [key, value];
    })
  );
}
function getParameter(part, params) {
  if (part.spread) {
    return params[part.content.slice(3)] || "";
  }
  if (part.dynamic) {
    if (!params[part.content]) {
      throw new TypeError(`Missing parameter: ${part.content}`);
    }
    return params[part.content];
  }
  return part.content.normalize().replace(/\?/g, "%3F").replace(/#/g, "%23").replace(/%5B/g, "[").replace(/%5D/g, "]");
}
function getSegment(segment, params) {
  const segmentPath = segment.map((part) => getParameter(part, params)).join("");
  return segmentPath ? "/" + segmentPath : "";
}
function getRouteGenerator(segments, addTrailingSlash) {
  return (params) => {
    const sanitizedParams = sanitizeParams(params);
    let trailing = "";
    if (addTrailingSlash === "always" && segments.length) {
      trailing = "/";
    }
    const path = segments.map((segment) => getSegment(segment, sanitizedParams)).join("") + trailing;
    return path || "/";
  };
}

function deserializeRouteData(rawRouteData) {
  return {
    route: rawRouteData.route,
    type: rawRouteData.type,
    pattern: new RegExp(rawRouteData.pattern),
    params: rawRouteData.params,
    component: rawRouteData.component,
    generate: getRouteGenerator(rawRouteData.segments, rawRouteData._meta.trailingSlash),
    pathname: rawRouteData.pathname || void 0,
    segments: rawRouteData.segments,
    prerender: rawRouteData.prerender,
    redirect: rawRouteData.redirect,
    redirectRoute: rawRouteData.redirectRoute ? deserializeRouteData(rawRouteData.redirectRoute) : void 0,
    fallbackRoutes: rawRouteData.fallbackRoutes.map((fallback) => {
      return deserializeRouteData(fallback);
    }),
    isIndex: rawRouteData.isIndex
  };
}

function deserializeManifest(serializedManifest) {
  const routes = [];
  for (const serializedRoute of serializedManifest.routes) {
    routes.push({
      ...serializedRoute,
      routeData: deserializeRouteData(serializedRoute.routeData)
    });
    const route = serializedRoute;
    route.routeData = deserializeRouteData(serializedRoute.routeData);
  }
  const assets = new Set(serializedManifest.assets);
  const componentMetadata = new Map(serializedManifest.componentMetadata);
  const inlinedScripts = new Map(serializedManifest.inlinedScripts);
  const clientDirectives = new Map(serializedManifest.clientDirectives);
  const serverIslandNameMap = new Map(serializedManifest.serverIslandNameMap);
  const key = decodeKey(serializedManifest.key);
  return {
    // in case user middleware exists, this no-op middleware will be reassigned (see plugin-ssr.ts)
    middleware() {
      return { onRequest: NOOP_MIDDLEWARE_FN };
    },
    ...serializedManifest,
    assets,
    componentMetadata,
    inlinedScripts,
    clientDirectives,
    routes,
    serverIslandNameMap,
    key
  };
}

const manifest = deserializeManifest({"hrefRoot":"file:///home/lucas/Escritorio/pagina%20remeras/","adapterName":"@astrojs/vercel/serverless","routes":[{"file":"","links":[],"scripts":[],"styles":[],"routeData":{"type":"endpoint","isIndex":false,"route":"/_image","pattern":"^\\/_image$","segments":[[{"content":"_image","dynamic":false,"spread":false}]],"params":[],"component":"node_modules/astro/dist/assets/endpoint/generic.js","pathname":"/_image","prerender":false,"fallbackRoutes":[],"_meta":{"trailingSlash":"ignore"}}},{"file":"","links":[],"scripts":[],"styles":[],"routeData":{"route":"/api/create-preference","isIndex":false,"type":"endpoint","pattern":"^\\/api\\/create-preference\\/?$","segments":[[{"content":"api","dynamic":false,"spread":false}],[{"content":"create-preference","dynamic":false,"spread":false}]],"params":[],"component":"src/pages/api/create-preference.ts","pathname":"/api/create-preference","prerender":false,"fallbackRoutes":[],"_meta":{"trailingSlash":"ignore"}}},{"file":"","links":[],"scripts":[],"styles":[],"routeData":{"route":"/api/shipping-calculator","isIndex":false,"type":"endpoint","pattern":"^\\/api\\/shipping-calculator\\/?$","segments":[[{"content":"api","dynamic":false,"spread":false}],[{"content":"shipping-calculator","dynamic":false,"spread":false}]],"params":[],"component":"src/pages/api/shipping-calculator.ts","pathname":"/api/shipping-calculator","prerender":false,"fallbackRoutes":[],"_meta":{"trailingSlash":"ignore"}}},{"file":"","links":[],"scripts":[],"styles":[],"routeData":{"route":"/api/update-stock","isIndex":false,"type":"endpoint","pattern":"^\\/api\\/update-stock\\/?$","segments":[[{"content":"api","dynamic":false,"spread":false}],[{"content":"update-stock","dynamic":false,"spread":false}]],"params":[],"component":"src/pages/api/update-stock.ts","pathname":"/api/update-stock","prerender":false,"fallbackRoutes":[],"_meta":{"trailingSlash":"ignore"}}},{"file":"","links":[],"scripts":[{"type":"external","value":"/_astro/hoisted.BsrVhgLs.js"}],"styles":[{"type":"external","src":"/_astro/failure.FrU52-gw.css"}],"routeData":{"route":"/checkout/failure","isIndex":false,"type":"page","pattern":"^\\/checkout\\/failure\\/?$","segments":[[{"content":"checkout","dynamic":false,"spread":false}],[{"content":"failure","dynamic":false,"spread":false}]],"params":[],"component":"src/pages/checkout/failure.astro","pathname":"/checkout/failure","prerender":false,"fallbackRoutes":[],"_meta":{"trailingSlash":"ignore"}}},{"file":"","links":[],"scripts":[{"type":"external","value":"/_astro/hoisted.BsrVhgLs.js"}],"styles":[{"type":"external","src":"/_astro/failure.FrU52-gw.css"}],"routeData":{"route":"/checkout/pending","isIndex":false,"type":"page","pattern":"^\\/checkout\\/pending\\/?$","segments":[[{"content":"checkout","dynamic":false,"spread":false}],[{"content":"pending","dynamic":false,"spread":false}]],"params":[],"component":"src/pages/checkout/pending.astro","pathname":"/checkout/pending","prerender":false,"fallbackRoutes":[],"_meta":{"trailingSlash":"ignore"}}},{"file":"","links":[],"scripts":[{"type":"external","value":"/_astro/hoisted.DyaQgbzA.js"}],"styles":[{"type":"external","src":"/_astro/failure.FrU52-gw.css"}],"routeData":{"route":"/checkout/success","isIndex":false,"type":"page","pattern":"^\\/checkout\\/success\\/?$","segments":[[{"content":"checkout","dynamic":false,"spread":false}],[{"content":"success","dynamic":false,"spread":false}]],"params":[],"component":"src/pages/checkout/success.astro","pathname":"/checkout/success","prerender":false,"fallbackRoutes":[],"_meta":{"trailingSlash":"ignore"}}},{"file":"","links":[],"scripts":[{"type":"external","value":"/_astro/hoisted.DiDI00NJ.js"}],"styles":[{"type":"external","src":"/_astro/failure.FrU52-gw.css"}],"routeData":{"route":"/producto/[slug]","isIndex":false,"type":"page","pattern":"^\\/producto\\/([^/]+?)\\/?$","segments":[[{"content":"producto","dynamic":false,"spread":false}],[{"content":"slug","dynamic":true,"spread":false}]],"params":["slug"],"component":"src/pages/producto/[slug].astro","prerender":false,"fallbackRoutes":[],"_meta":{"trailingSlash":"ignore"}}},{"file":"","links":[],"scripts":[{"type":"external","value":"/_astro/hoisted.DgIxRaFg.js"}],"styles":[{"type":"external","src":"/_astro/failure.FrU52-gw.css"}],"routeData":{"route":"/tienda","isIndex":false,"type":"page","pattern":"^\\/tienda\\/?$","segments":[[{"content":"tienda","dynamic":false,"spread":false}]],"params":[],"component":"src/pages/tienda.astro","pathname":"/tienda","prerender":false,"fallbackRoutes":[],"_meta":{"trailingSlash":"ignore"}}},{"file":"","links":[],"scripts":[{"type":"external","value":"/_astro/hoisted.BCdTUF3C.js"}],"styles":[{"type":"external","src":"/_astro/failure.FrU52-gw.css"},{"type":"inline","content":".hero-slide[data-astro-cid-r6qggs4k].active{opacity:1;z-index:10}.hero-slide[data-astro-cid-r6qggs4k] img[data-astro-cid-r6qggs4k]{transform:scale(1)!important;transition:none!important}#hero-slider[data-astro-cid-r6qggs4k]:after{content:\"\";position:absolute;inset:0;opacity:.1;pointer-events:none;z-index:15;background-image:url(\"data:image/svg+xml,%3Csvg viewBox='0 0 200 200' xmlns='http://www.w3.org/2000/svg'%3%3Cfilter id='noiseFilter'%3%3CfeTurbulence type='fractalNoise' baseFrequency='0.65' numOctaves='3' stitchTiles='stitch'/%3%3C/filter%3%3Crect width='100%25' height='100%25' filter='url(%23noiseFilter)'/%3%3C/svg%3\")}\n"}],"routeData":{"route":"/","isIndex":true,"type":"page","pattern":"^\\/$","segments":[],"params":[],"component":"src/pages/index.astro","pathname":"/","prerender":false,"fallbackRoutes":[],"_meta":{"trailingSlash":"ignore"}}}],"base":"/","trailingSlash":"ignore","compressHTML":true,"componentMetadata":[["/home/lucas/Escritorio/pagina remeras/src/pages/checkout/failure.astro",{"propagation":"none","containsHead":true}],["/home/lucas/Escritorio/pagina remeras/src/pages/checkout/pending.astro",{"propagation":"none","containsHead":true}],["/home/lucas/Escritorio/pagina remeras/src/pages/checkout/success.astro",{"propagation":"none","containsHead":true}],["/home/lucas/Escritorio/pagina remeras/src/pages/index.astro",{"propagation":"none","containsHead":true}],["/home/lucas/Escritorio/pagina remeras/src/pages/producto/[slug].astro",{"propagation":"none","containsHead":true}],["/home/lucas/Escritorio/pagina remeras/src/pages/tienda.astro",{"propagation":"none","containsHead":true}]],"renderers":[],"clientDirectives":[["idle","(()=>{var l=(o,t)=>{let i=async()=>{await(await o())()},e=typeof t.value==\"object\"?t.value:void 0,s={timeout:e==null?void 0:e.timeout};\"requestIdleCallback\"in window?window.requestIdleCallback(i,s):setTimeout(i,s.timeout||200)};(self.Astro||(self.Astro={})).idle=l;window.dispatchEvent(new Event(\"astro:idle\"));})();"],["load","(()=>{var e=async t=>{await(await t())()};(self.Astro||(self.Astro={})).load=e;window.dispatchEvent(new Event(\"astro:load\"));})();"],["media","(()=>{var s=(i,t)=>{let a=async()=>{await(await i())()};if(t.value){let e=matchMedia(t.value);e.matches?a():e.addEventListener(\"change\",a,{once:!0})}};(self.Astro||(self.Astro={})).media=s;window.dispatchEvent(new Event(\"astro:media\"));})();"],["only","(()=>{var e=async t=>{await(await t())()};(self.Astro||(self.Astro={})).only=e;window.dispatchEvent(new Event(\"astro:only\"));})();"],["visible","(()=>{var l=(s,i,o)=>{let r=async()=>{await(await s())()},t=typeof i.value==\"object\"?i.value:void 0,c={rootMargin:t==null?void 0:t.rootMargin},n=new IntersectionObserver(e=>{for(let a of e)if(a.isIntersecting){n.disconnect(),r();break}},c);for(let e of o.children)n.observe(e)};(self.Astro||(self.Astro={})).visible=l;window.dispatchEvent(new Event(\"astro:visible\"));})();"]],"entryModules":{"\u0000@astrojs-ssr-adapter":"_@astrojs-ssr-adapter.mjs","\u0000noop-middleware":"_noop-middleware.mjs","\u0000@astrojs-ssr-virtual-entry":"entry.mjs","\u0000@astro-renderers":"renderers.mjs","\u0000@astro-page:src/pages/api/create-preference@_@ts":"pages/api/create-preference.astro.mjs","\u0000@astro-page:src/pages/api/update-stock@_@ts":"pages/api/update-stock.astro.mjs","\u0000@astro-page:src/pages/checkout/failure@_@astro":"pages/checkout/failure.astro.mjs","\u0000@astro-page:src/pages/checkout/pending@_@astro":"pages/checkout/pending.astro.mjs","\u0000@astro-page:src/pages/checkout/success@_@astro":"pages/checkout/success.astro.mjs","\u0000@astro-page:src/pages/tienda@_@astro":"pages/tienda.astro.mjs","\u0000@astro-page:src/pages/api/shipping-calculator@_@ts":"pages/api/shipping-calculator.astro.mjs","\u0000@astro-page:src/pages/producto/[slug]@_@astro":"pages/producto/_slug_.astro.mjs","\u0000@astro-page:src/pages/index@_@astro":"pages/index.astro.mjs","\u0000@astro-page:node_modules/astro/dist/assets/endpoint/generic@_@js":"pages/_image.astro.mjs","/home/lucas/Escritorio/pagina remeras/node_modules/astro/dist/env/setup.js":"chunks/astro/env-setup_Cr6XTFvb.mjs","\u0000@astrojs-manifest":"manifest_D2Prmay-.mjs","/astro/hoisted.js?q=0":"_astro/hoisted.DyaQgbzA.js","/astro/hoisted.js?q=1":"_astro/hoisted.BCdTUF3C.js","/astro/hoisted.js?q=3":"_astro/hoisted.DiDI00NJ.js","/astro/hoisted.js?q=2":"_astro/hoisted.DgIxRaFg.js","/astro/hoisted.js?q=4":"_astro/hoisted.BsrVhgLs.js","astro:scripts/before-hydration.js":""},"inlinedScripts":[],"assets":["/_astro/space-grotesk-vietnamese-wght-normal.D0rl6rjA.woff2","/_astro/space-grotesk-latin-ext-wght-normal.D9tNdqV9.woff2","/_astro/space-grotesk-latin-wght-normal.BhU9QXUp.woff2","/_astro/inter-cyrillic-ext-wght-normal.BOeWTOD4.woff2","/_astro/inter-cyrillic-wght-normal.DqGufNeO.woff2","/_astro/inter-greek-ext-wght-normal.DlzME5K_.woff2","/_astro/inter-vietnamese-wght-normal.CBcvBZtf.woff2","/_astro/inter-greek-wght-normal.CkhJZR-_.woff2","/_astro/anton-vietnamese-400-normal.CkBxLiRJ.woff2","/_astro/inter-latin-ext-wght-normal.DO1Apj_S.woff2","/_astro/anton-latin-ext-400-normal.SyiqE2Jt.woff2","/_astro/inter-latin-wght-normal.Dx4kXJAl.woff2","/_astro/anton-latin-400-normal.Byf51wtH.woff2","/_astro/anton-vietnamese-400-normal.2FfR1wHA.woff","/_astro/anton-latin-400-normal.AUNGEG_V.woff","/_astro/anton-latin-ext-400-normal.BMODBQc6.woff","/_astro/failure.FrU52-gw.css","/favicon.ico","/favicon.svg","/_astro/hoisted.BCdTUF3C.js","/_astro/hoisted.BsrVhgLs.js","/_astro/hoisted.DgIxRaFg.js","/_astro/hoisted.DiDI00NJ.js","/_astro/hoisted.DyaQgbzA.js","/images/Mercado_Pago.svg.png","/images/enviado.png","/images/foto 1.jpeg","/images/foto 2.jpeg","/images/foto dedo en v.webp","/images/foto_portada_slide_lateral.jpg","/images/libro_argentina_humana.jpg","/images/libro_los_siete_pecados_capitales.jpg","/images/logo_y_marca_de_la_pagina.png","/images/parte de atras de la remeras.jpg","/images/parte de frente de la remera.jpg","/images/pin_argentina_humana.jpg","/images/whatsapp.png"],"buildFormat":"directory","checkOrigin":false,"serverIslandNameMap":[],"key":"dCLWmoQnMNlgw5KxhtijJf2dBfwydz/m98gCP1zyrEY=","experimentalEnvGetSecretEnabled":false});

export { manifest };
