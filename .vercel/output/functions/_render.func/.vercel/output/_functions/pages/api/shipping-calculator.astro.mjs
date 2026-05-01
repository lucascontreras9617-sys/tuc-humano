export { renderers } from '../../renderers.mjs';

const TARIFAS = [
  { zona: "A", p800: { suc: 19610, dom: 22236 }, p1500: { suc: 19730, dom: 22356 } },
  { zona: "B", p800: { suc: 24142, dom: 26436 }, p1500: { suc: 24262, dom: 26556 } },
  { zona: "C", p800: { suc: 29429, dom: 31684 }, p1500: { suc: 29549, dom: 31804 } },
  { zona: "C2", p800: { suc: 29429, dom: 30362 }, p1500: { suc: 29549, dom: 30482 } }
];
function getZonaAndreani(cpDestino) {
  const cp = parseInt(cpDestino);
  if (isNaN(cp)) return "B";
  if (cp >= 4e3 && cp <= 4399) return "A";
  if (cp >= 4600 && cp <= 4699) return "A";
  if (cp >= 4400 && cp <= 4599) return "A";
  if (cp >= 4700 && cp <= 4799) return "A";
  if (cp >= 5300 && cp <= 5399) return "A";
  if (cp >= 4200 && cp <= 4299) return "A";
  if (cp >= 3500 && cp <= 3699) return "A";
  if (cp >= 5e3 && cp <= 5299) return "A";
  if (cp >= 1700 && cp <= 1999 || cp >= 6e3 && cp <= 8199) return "A";
  if (cp >= 1e3 && cp <= 1499) return "A";
  if (cp >= 3100 && cp <= 3299) return "A";
  if (cp >= 8300 && cp <= 8499) return "C2";
  if (cp >= 9e3 && cp <= 9299) return "C";
  if (cp >= 9e3 && cp <= 9099) return "C";
  if (cp >= 8500 && cp <= 8899) return "C";
  if (cp >= 9400 && cp <= 9499) return "C";
  if (cp >= 2e3 && cp <= 3099) return "B";
  if (cp >= 5500 && cp <= 5599) return "B";
  if (cp >= 5400 && cp <= 5499) return "B";
  if (cp >= 5700 && cp <= 5799) return "B";
  if (cp >= 6300 && cp <= 6399) return "B";
  if (cp >= 8300 && cp <= 8399) return "B";
  if (cp >= 3600 && cp <= 3799) return "B";
  if (cp >= 3300 && cp <= 3499) return "B";
  if (cp >= 3400 && cp <= 3499) return "B";
  return "B";
}
function getProvinciaPorCP(cpDestino) {
  const cp = parseInt(cpDestino);
  if (isNaN(cp)) return null;
  if (cp >= 1e3 && cp <= 1499) return "Ciudad Autónoma de Buenos Aires";
  if (cp >= 1700 && cp <= 1999 || cp >= 6e3 && cp <= 8199) return "Buenos Aires";
  if (cp >= 2e3 && cp <= 3099) return "Santa Fe";
  if (cp >= 3100 && cp <= 3299) return "Entre Ríos";
  if (cp >= 3300 && cp <= 3499) return "Misiones";
  if (cp >= 3400 && cp <= 3499) return "Corrientes";
  if (cp >= 3500 && cp <= 3699) return "Chaco";
  if (cp >= 3600 && cp <= 3799) return "Formosa";
  if (cp >= 4e3 && cp <= 4199) return "Tucumán";
  if (cp >= 4200 && cp <= 4299) return "Santiago del Estero";
  if (cp >= 4400 && cp <= 4599) return "Salta";
  if (cp >= 4600 && cp <= 4699) return "Jujuy";
  if (cp >= 4700 && cp <= 4799) return "Catamarca";
  if (cp >= 5e3 && cp <= 5299) return "Córdoba";
  if (cp >= 5300 && cp <= 5399) return "La Rioja";
  if (cp >= 5400 && cp <= 5499) return "San Juan";
  if (cp >= 5500 && cp <= 5599) return "Mendoza";
  if (cp >= 5700 && cp <= 5799) return "San Luis";
  if (cp >= 6300 && cp <= 6399) return "La Pampa";
  if (cp >= 8300 && cp <= 8399) return "Neuquén";
  if (cp >= 8300 && cp <= 8499) return "Río Negro";
  if (cp >= 8500 && cp <= 8899) return "Chubut";
  if (cp >= 9e3 && cp <= 9099) return "Chubut";
  if (cp >= 9e3 && cp <= 9299) return "Santa Cruz";
  if (cp >= 9400 && cp <= 9499) return "Tierra del Fuego";
  return null;
}
function interpolarTarifa(pesoKg, zona, modalidad) {
  const t = TARIFAS.find((x) => x.zona === zona);
  const p800 = t.p800[modalidad];
  const p1500 = t.p1500[modalidad];
  const ratio = (pesoKg - 0.8) / (1.5 - 0.8);
  const valor = p800 + ratio * (p1500 - p800);
  return Math.round(valor);
}
function calcularEnvio(items, cpDestino) {
  if (!cpDestino || cpDestino.length < 4) {
    return {
      zona: "B",
      pesoReal: 0,
      pesoVolumetrico: 0,
      pesoFacturado: 0,
      precioSucursal: 0,
      precioDomicilio: 0,
      valido: false,
      mensaje: "Ingresá tu código postal"
    };
  }
  const pesoReal = items.reduce(
    (acc, item) => acc + item.pesoUnitario * item.cantidad,
    0
  );
  let largo = 0, ancho = 0, alto = 0;
  for (const item of items) {
    largo = Math.max(largo, item.largoUnitario);
    ancho = Math.max(ancho, item.anchoUnitario);
    alto += item.altoUnitario * item.cantidad;
  }
  const pesoVolumetrico = largo * ancho * alto / 4e3;
  const pesoFacturado = Math.max(pesoReal, pesoVolumetrico);
  const zona = getZonaAndreani(cpDestino);
  let precioSucursal = interpolarTarifa(pesoFacturado, zona, "suc");
  let precioDomicilio = interpolarTarifa(pesoFacturado, zona, "dom");
  const cpNum = parseInt(cpDestino);
  if (cpNum >= 4e3 && cpNum <= 4199) {
    precioSucursal = 11385.17;
    precioDomicilio = 17120.21;
  }
  return {
    zona,
    pesoReal,
    pesoVolumetrico,
    pesoFacturado,
    precioSucursal,
    precioDomicilio,
    valido: true
  };
}

const POST = async ({ request }) => {
  let body;
  try {
    body = await request.json();
  } catch {
    return jsonResponse({ error: "Invalid body" }, 400);
  }
  const { cp_destino, provincia, items = [] } = body;
  if (!cp_destino || cp_destino.length < 4) {
    return jsonResponse({ error: "Código postal inválido." }, 400);
  }
  const provinciaReal = getProvinciaPorCP(cp_destino);
  if (!provinciaReal) {
    return jsonResponse({ error: `El Código Postal ${cp_destino} es inválido o no existe en Argentina.` }, 400);
  }
  if (provincia) {
    if (provincia !== provinciaReal) {
      const isNeuquenSur = parseInt(cp_destino) >= 8300 && parseInt(cp_destino) <= 8499 && (provincia === "Neuquén" || provincia === "Río Negro");
      if (!isNeuquenSur) {
        return jsonResponse({ error: `El CP ${cp_destino} no pertenece a ${provincia}. Seleccioná la provincia correcta (${provinciaReal}).` }, 400);
      }
    }
  }
  if (!items.length) {
    return jsonResponse({ error: "No hay productos para calcular el envío" }, 400);
  }
  const calcItems = items.map((item) => {
    const isLibro = item.name.toLowerCase().includes("libro") || item.name.toLowerCase().includes("grabois");
    return {
      nombre: item.name,
      cantidad: item.quantity,
      pesoUnitario: isLibro ? 0.5 : 0.35,
      largoUnitario: isLibro ? 22 : 30,
      anchoUnitario: isLibro ? 15 : 25,
      altoUnitario: isLibro ? 3 : 3
    };
  });
  const res = calcularEnvio(calcItems, cp_destino);
  if (!res.valido) {
    return jsonResponse({ error: res.mensaje || "Error al calcular tarifa" }, 400);
  }
  const options = [];
  options.push({
    nombre: "A Domicilio (Andreani Estándar)",
    precio: res.precioDomicilio,
    dias: `Aprox. $${res.precioDomicilio} (Zona ${res.zona})`
  });
  options.push({
    nombre: "Retiro en Sucursal (Andreani)",
    precio: res.precioSucursal,
    dias: `Aprox. $${res.precioSucursal}`
  });
  return jsonResponse({ options });
};
function jsonResponse(data, status = 200) {
  return new Response(JSON.stringify(data), {
    status,
    headers: {
      "Content-Type": "application/json",
      "Cache-Control": "no-store"
    }
  });
}

const _page = /*#__PURE__*/Object.freeze(/*#__PURE__*/Object.defineProperty({
  __proto__: null,
  POST
}, Symbol.toStringTag, { value: 'Module' }));

const page = () => _page;

export { page };
