// src/lib/shippingCalculator.ts
// Tarifas PAQ.AR cotizadas mayo 2026 desde Tucumán (CP 4000)
// Fuente: consultas PAQ.AR — 18/05/2026

// Tarifas por provincia: [expresoSuc, clasicoSuc, expresoDom, clasicoDom]
interface TarifaProvincia {
  expresoSuc: number;
  clasicoSuc: number;
  expresoDom: number;
  clasicoDom: number;
}

const TARIFAS_PAQAR: Record<string, TarifaProvincia> = {
  'Buenos Aires':                    { expresoSuc: 12876, clasicoSuc: 7025, expresoDom: 18770, clasicoDom: 10240 },
  'Ciudad Autónoma de Buenos Aires': { expresoSuc: 12876, clasicoSuc: 7025, expresoDom: 18770, clasicoDom: 10240 },
  'Catamarca':                       { expresoSuc: 8865,  clasicoSuc: 6447, expresoDom: 12886, clasicoDom: 9371 },
  'Chaco':                           { expresoSuc: 12876, clasicoSuc: 7025, expresoDom: 18770, clasicoDom: 10240 },
  'Chubut':                          { expresoSuc: 17360, clasicoSuc: 7574, expresoDom: 24809, clasicoDom: 10827 },
  'Córdoba':                         { expresoSuc: 8865,  clasicoSuc: 6447, expresoDom: 12886, clasicoDom: 9371 },
  'Corrientes':                      { expresoSuc: 12876, clasicoSuc: 7025, expresoDom: 18770, clasicoDom: 10240 },
  'Entre Ríos':                      { expresoSuc: 12876, clasicoSuc: 7025, expresoDom: 18770, clasicoDom: 10240 },
  'Formosa':                         { expresoSuc: 12876, clasicoSuc: 7025, expresoDom: 18770, clasicoDom: 10240 },
  'Jujuy':                           { expresoSuc: 8865,  clasicoSuc: 6447, expresoDom: 12886, clasicoDom: 9371 },
  'La Pampa':                        { expresoSuc: 12876, clasicoSuc: 7025, expresoDom: 18770, clasicoDom: 10240 },
  'La Rioja':                        { expresoSuc: 8865,  clasicoSuc: 6447, expresoDom: 12886, clasicoDom: 9371 },
  'Mendoza':                         { expresoSuc: 12876, clasicoSuc: 7025, expresoDom: 18770, clasicoDom: 10240 },
  'Misiones':                        { expresoSuc: 12876, clasicoSuc: 7025, expresoDom: 18770, clasicoDom: 10240 },
  'Neuquén':                         { expresoSuc: 17360, clasicoSuc: 7574, expresoDom: 24809, clasicoDom: 10827 },
  'Río Negro':                       { expresoSuc: 17360, clasicoSuc: 7574, expresoDom: 24809, clasicoDom: 10827 },
  'Salta':                           { expresoSuc: 8865,  clasicoSuc: 6447, expresoDom: 12886, clasicoDom: 9371 },
  'San Juan':                        { expresoSuc: 12876, clasicoSuc: 7025, expresoDom: 18770, clasicoDom: 10240 },
  'San Luis':                        { expresoSuc: 12876, clasicoSuc: 7025, expresoDom: 18770, clasicoDom: 10240 },
  'Santa Cruz':                      { expresoSuc: 17360, clasicoSuc: 7574, expresoDom: 24809, clasicoDom: 10827 },
  'Santa Fe':                        { expresoSuc: 12876, clasicoSuc: 7025, expresoDom: 18770, clasicoDom: 10240 },
  'Santiago del Estero':             { expresoSuc: 8865,  clasicoSuc: 6447, expresoDom: 12886, clasicoDom: 9371 },
  'Tierra del Fuego':                { expresoSuc: 17360, clasicoSuc: 7574, expresoDom: 24809, clasicoDom: 10827 },
  'Tucumán':                         { expresoSuc: 5205,  clasicoSuc: 4730, expresoDom: 9163,  clasicoDom: 8329 },
};

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
  provincia: string;
  expresoSucursal: number;
  clasicoSucursal: number;
  expresoDomicilio: number;
  clasicoDomicilio: number;
  valido: boolean;
  mensaje?: string;
}

export function calcularEnvio(
  items: CalcCartItem[],
  cpDestino: string
): ShippingResult {
  const emptyResult: ShippingResult = {
    provincia: '', expresoSucursal: 0, clasicoSucursal: 0,
    expresoDomicilio: 0, clasicoDomicilio: 0, valido: false,
  };

  if (!cpDestino || cpDestino.length < 4) {
    return { ...emptyResult, mensaje: 'Ingresá tu código postal' };
  }

  const provincia = getProvinciaPorCP(cpDestino);
  if (!provincia) {
    return { ...emptyResult, mensaje: 'Código postal no reconocido' };
  }

  const tarifa = TARIFAS_PAQAR[provincia];
  if (!tarifa) {
    return { ...emptyResult, mensaje: `No hay tarifas para ${provincia}` };
  }

  return {
    provincia,
    expresoSucursal: tarifa.expresoSuc,
    clasicoSucursal: tarifa.clasicoSuc,
    expresoDomicilio: tarifa.expresoDom,
    clasicoDomicilio: tarifa.clasicoDom,
    valido: true,
  };
}
