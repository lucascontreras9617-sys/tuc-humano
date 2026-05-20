import type { APIRoute } from 'astro';
import { calcularEnvio, calcularEnvioPorProvincia, getProvinciaPorCP, type CalcCartItem } from '../../lib/shippingCalculator';

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

  // Cuando la provincia viene del selector de localidades, la usamos directamente
  // ya que la combinación provincia-localidad-CP es confiable.
  // Solo derivamos del CP si no se envió provincia.
  const provinciaFinal = provincia || getProvinciaPorCP(cp_destino);
  
  if (!provinciaFinal) {
    return jsonResponse({ error: `No se pudo determinar la provincia para el CP ${cp_destino}.` }, 400);
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

  // Usar provincia directamente si está disponible (del selector de localidades)
  const res = provinciaFinal
    ? calcularEnvioPorProvincia(calcItems, provinciaFinal)
    : calcularEnvio(calcItems, cp_destino);

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
