import type { APIRoute } from 'astro';
import { calcularEnvio, getProvinciaPorCP, type CalcCartItem } from '../../lib/shippingCalculator';

export const prerender = false;

export const POST: APIRoute = async ({ request }) => {
  let body;
  try {
    body = await request.json();
  } catch {
    return jsonResponse({ error: 'Invalid body' }, 400);
  }

  const { cp_destino, provincia, items = [] } = body;

  if (!cp_destino || cp_destino.length < 4) {
    return jsonResponse({ error: 'Código postal inválido.' }, 400);
  }

  // Validación cruzada de Código Postal vs Provincia
  const provinciaReal = getProvinciaPorCP(cp_destino);
  
  if (!provinciaReal) {
    return jsonResponse({ error: `El Código Postal ${cp_destino} es inválido o no existe en Argentina.` }, 400);
  }

  if (provincia) {
    if (provincia !== provinciaReal) {
        // Excepción por fronteras difusas Neuquén/Río Negro (8300)
        const isNeuquenSur = parseInt(cp_destino) >= 8300 && parseInt(cp_destino) <= 8499 && (provincia === 'Neuquén' || provincia === 'Río Negro');
        if (!isNeuquenSur) {
          return jsonResponse({ error: `El CP ${cp_destino} no pertenece a ${provincia}. Seleccioná la provincia correcta (${provinciaReal}).` }, 400);
        }
    }
  }

  if (!items.length) {
    return jsonResponse({ error: 'No hay productos para calcular el envío' }, 400);
  }

  // Map frontend items to CalcCartItem (inyectando dimensiones artificiales)
  const calcItems: CalcCartItem[] = items.map((item: any) => {
    const isLibro = item.name.toLowerCase().includes('libro') || item.name.toLowerCase().includes('grabois');
    return {
      nombre: item.name,
      cantidad: item.quantity,
      pesoUnitario: isLibro ? 0.50 : 0.35,
      largoUnitario: isLibro ? 22 : 30,
      anchoUnitario: isLibro ? 15 : 25,
      altoUnitario: isLibro ? 3 : 3,
    };
  });

  const res = calcularEnvio(calcItems, cp_destino);

  if (!res.valido) {
    return jsonResponse({ error: res.mensaje || 'Error al calcular tarifa' }, 400);
  }

  const options = [
    {
      nombre: `Clásico a Domicilio (PAQ.AR · 2-5 días)`,
      precio: res.clasicoDomicilio,
      dias: '2-5 días hábiles'
    },
    {
      nombre: `Clásico a Sucursal (PAQ.AR · 2-5 días)`,
      precio: res.clasicoSucursal,
      dias: '2-5 días hábiles'
    },
    {
      nombre: `Expreso a Domicilio (PAQ.AR · 1-3 días)`,
      precio: res.expresoDomicilio,
      dias: '1-3 días hábiles'
    },
    {
      nombre: `Expreso a Sucursal (PAQ.AR · 1-3 días)`,
      precio: res.expresoSucursal,
      dias: '1-3 días hábiles'
    },
  ];

  return jsonResponse({ options });
};

function jsonResponse(data: object, status = 200) {
  return new Response(JSON.stringify(data), {
    status,
    headers: {
      'Content-Type': 'application/json',
      'Cache-Control': 'no-store',
    },
  });
}
