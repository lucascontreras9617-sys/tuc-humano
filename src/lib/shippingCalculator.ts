// src/lib/shippingCalculator.ts
// Tarifas Andreani cotizadas abril 2026 desde Tucumán (CP 4000)
// Fuente: pymes.andreani.com/cotizador — sujeto a modificaciones

export type ZonaAndreani = 'A' | 'B' | 'C' | 'C2';

// Tarifas por zona para dos tramos de peso de referencia
// [sucursal, domicilio]
interface TarifaZona { suc: number; dom: number; }
interface TarifaTramo { zona: ZonaAndreani; p800: TarifaZona; p1500: TarifaZona; }

const TARIFAS: TarifaTramo[] = [
  { zona: 'A',  p800: { suc: 19610, dom: 22236 }, p1500: { suc: 19730, dom: 22356 } },
  { zona: 'B',  p800: { suc: 24142, dom: 26436 }, p1500: { suc: 24262, dom: 26556 } },
  { zona: 'C',  p800: { suc: 29429, dom: 31684 }, p1500: { suc: 29549, dom: 31804 } },
  { zona: 'C2', p800: { suc: 29429, dom: 30362 }, p1500: { suc: 29549, dom: 30482 } },
];

// Mapa CP → Zona (rangos por provincia)
// Origen: Tucumán. Ajustar si cambia el CP de origen.
export function getZonaAndreani(cpDestino: string): ZonaAndreani {
  const cp = parseInt(cpDestino);
  if (isNaN(cp)) return 'B';

  // ZONA A — provincias cercanas
  // Tucumán (origen = Zona A por ser local)
  if (cp >= 4000 && cp <= 4399) return 'A';
  // Jujuy
  if (cp >= 4600 && cp <= 4699) return 'A';
  // Salta
  if (cp >= 4400 && cp <= 4599) return 'A';
  // Catamarca
  if (cp >= 4700 && cp <= 4799) return 'A';
  // La Rioja
  if (cp >= 5300 && cp <= 5399) return 'A';
  // Santiago del Estero
  if (cp >= 4200 && cp <= 4299) return 'A';
  // Chaco
  if (cp >= 3500 && cp <= 3699) return 'A';
  // Córdoba
  if (cp >= 5000 && cp <= 5299) return 'A';
  // Buenos Aires provincia
  if ((cp >= 1700 && cp <= 1999) || (cp >= 6000 && cp <= 8199)) return 'A';
  // CABA
  if (cp >= 1000 && cp <= 1499) return 'A';
  // Entre Ríos
  if (cp >= 3100 && cp <= 3299) return 'A';

  // ZONA C2 — Río Negro (antes que Zona C para evitar solapamiento)
  if (cp >= 8300 && cp <= 8499) return 'C2';

  // ZONA C — Patagonia extrema
  // Neuquén está en Zona B pero limita con Río Negro
  // Chubut (evaluar antes de Santa Cruz para evitar solapamiento 9000-9099)
  if (cp >= 8500 && cp <= 8899) return 'C';
  if (cp >= 9000 && cp <= 9099) return 'C';
  // Santa Cruz (9100-9299, ya que 9000-9099 es Chubut)
  if (cp >= 9100 && cp <= 9299) return 'C';
  // Tierra del Fuego
  if (cp >= 9400 && cp <= 9499) return 'C';

  // ZONA B — resto
  // Santa Fe
  if (cp >= 2000 && cp <= 3099) return 'B';
  // Mendoza
  if (cp >= 5500 && cp <= 5599) return 'B';
  // San Juan
  if (cp >= 5400 && cp <= 5499) return 'B';
  // San Luis
  if (cp >= 5700 && cp <= 5799) return 'B';
  // La Pampa
  if (cp >= 6300 && cp <= 6399) return 'B';
  // Neuquén
  if (cp >= 8300 && cp <= 8399) return 'B';
  // Formosa
  if (cp >= 3600 && cp <= 3799) return 'B';
  // Corrientes (evaluar antes de Misiones para evitar solapamiento 3400-3499)
  if (cp >= 3400 && cp <= 3499) return 'B';
  // Misiones (3300-3399, ya que 3400-3499 es Corrientes)
  if (cp >= 3300 && cp <= 3399) return 'B';

  return 'B'; // valor conservador para CP no reconocidos
}

// Mapa exacto para validación de CP con la UI
export function getProvinciaPorCP(cpDestino: string): string | null {
  const cp = parseInt(cpDestino);
  if (isNaN(cp)) return null;

  if (cp >= 1000 && cp <= 1499) return 'Ciudad Autónoma de Buenos Aires';
  if ((cp >= 1700 && cp <= 1999) || (cp >= 6000 && cp <= 8199)) return 'Buenos Aires';
  if (cp >= 2000 && cp <= 3099) return 'Santa Fe';
  if (cp >= 3100 && cp <= 3299) return 'Entre Ríos';
  // Corrientes antes de Misiones para evitar solapamiento
  if (cp >= 3400 && cp <= 3499) return 'Corrientes';
  if (cp >= 3300 && cp <= 3399) return 'Misiones';
  if (cp >= 3500 && cp <= 3599) return 'Chaco';
  if (cp >= 3600 && cp <= 3799) return 'Formosa';
  if (cp >= 4000 && cp <= 4199) return 'Tucumán';
  if (cp >= 4200 && cp <= 4299) return 'Santiago del Estero';
  if (cp >= 4400 && cp <= 4599) return 'Salta';
  if (cp >= 4600 && cp <= 4699) return 'Jujuy';
  if (cp >= 4700 && cp <= 4799) return 'Catamarca';
  if (cp >= 5000 && cp <= 5299) return 'Córdoba';
  if (cp >= 5300 && cp <= 5399) return 'La Rioja';
  if (cp >= 5400 && cp <= 5499) return 'San Juan';
  if (cp >= 5500 && cp <= 5599) return 'Mendoza';
  if (cp >= 5700 && cp <= 5799) return 'San Luis';
  if (cp >= 6300 && cp <= 6399) return 'La Pampa';
  // Neuquén antes de Río Negro para evitar solapamiento
  if (cp >= 8300 && cp <= 8399) return 'Neuquén';
  if (cp >= 8400 && cp <= 8499) return 'Río Negro';
  if (cp >= 8500 && cp <= 8899) return 'Chubut';
  // Chubut 9000-9099 antes de Santa Cruz
  if (cp >= 9000 && cp <= 9099) return 'Chubut';
  if (cp >= 9100 && cp <= 9299) return 'Santa Cruz';
  if (cp >= 9400 && cp <= 9499) return 'Tierra del Fuego';

  return null;
}

// Interpolación lineal entre 800g y 1500g
// Para pesos fuera del rango se extrapola
function interpolarTarifa(
  pesoKg: number,
  zona: ZonaAndreani,
  modalidad: 'dom' | 'suc'
): number {
  const t = TARIFAS.find(x => x.zona === zona)!;
  const p800 = t.p800[modalidad];
  const p1500 = t.p1500[modalidad];
  // Interpolación/extrapolación lineal
  const ratio = (pesoKg - 0.8) / (1.5 - 0.8);
  const valor = p800 + ratio * (p1500 - p800);
  return Math.round(valor);
}

// --- Interfaces del carrito ---
export interface CalcCartItem {
  nombre: string;
  cantidad: number;
  pesoUnitario: number;   // kg
  largoUnitario: number;  // cm
  anchoUnitario: number;  // cm
  altoUnitario: number;   // cm
}

export interface ShippingResult {
  zona: ZonaAndreani;
  pesoReal: number;
  pesoVolumetrico: number;
  pesoFacturado: number;
  precioSucursal: number;
  precioDomicilio: number;
  valido: boolean;
  mensaje?: string;
}

export function calcularEnvio(
  items: CalcCartItem[],
  cpDestino: string
): ShippingResult {
  if (!cpDestino || cpDestino.length < 4) {
    return { zona: 'B', pesoReal: 0, pesoVolumetrico: 0, pesoFacturado: 0,
      precioSucursal: 0, precioDomicilio: 0, valido: false,
      mensaje: 'Ingresá tu código postal' };
  }

  // Peso real total
  const pesoReal = items.reduce(
    (acc, item) => acc + item.pesoUnitario * item.cantidad, 0
  );

  // Dimensiones del paquete final
  let largo = 0, ancho = 0, alto = 0;
  for (const item of items) {
    largo = Math.max(largo, item.largoUnitario);
    ancho = Math.max(ancho, item.anchoUnitario);
    alto += item.altoUnitario * item.cantidad;
  }

  // Andreani usa divisor 4000 para peso volumétrico
  const pesoVolumetrico = (largo * ancho * alto) / 4000;
  const pesoFacturado = Math.max(pesoReal, pesoVolumetrico);
  const zona = getZonaAndreani(cpDestino);

  let precioSucursal = interpolarTarifa(pesoFacturado, zona, 'suc');
  let precioDomicilio = interpolarTarifa(pesoFacturado, zona, 'dom');

  // EXCEPCIÓN TUCUMÁN (Tarifa Local Especial)
  // Si el destino es Tucumán (CP 4000-4199), aplicamos tarifa fija preferencial
  const cpNum = parseInt(cpDestino);
  if (cpNum >= 4000 && cpNum <= 4199) {
    precioSucursal = 11385.17;
    precioDomicilio = 17120.21;
  }

  return {
    zona, pesoReal, pesoVolumetrico, pesoFacturado,
    precioSucursal, precioDomicilio, valido: true
  };
}
