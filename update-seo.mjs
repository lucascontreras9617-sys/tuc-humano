import 'dotenv/config';
import { createClient } from '@supabase/supabase-js';

const supabase = createClient(
  process.env.PUBLIC_SUPABASE_URL,
  process.env.SUPABASE_SERVICE_ROLE_KEY
);

const seoUpdates = [
  {
    id: 'prod-1',
    name: 'Remera Oversize de Resistencia | Tuc-Humano',
    description: 'Remera oversize de algodón pesado. Auténtico diseño tucumano de resistencia. Vestí memoria e identidad popular con la calidad de Tuc-Humano.'
  },
  {
    id: 'prod-2',
    name: 'Libro Los Siete Pecados Argentinos de Grabois | Tuc-Humano',
    description: 'Leé a Juan Grabois en Los Siete Pecados Argentinos. Ensayo político y social. Encontrá libros y el mejor diseño tucumano en Tuc-Humano.'
  },
  {
    id: 'prod-3',
    name: 'Libro Argentina Humana de Juan Grabois | Tuc-Humano',
    description: 'Descubrí Argentina Humana de Juan Grabois. Herramientas para la acción política. Apoyá la cultura y el diseño tucumano comprando en Tuc-Humano.'
  },
  {
    id: 'prod-4',
    name: 'Pin Metálico Argentina Humana | Accesorios Tuc-Humano',
    description: 'Pin metálico esmaltado Argentina Humana. Llevá la militancia con vos. Accesorios de diseño tucumano exclusivos, encontralos en Tuc-Humano.'
  },
  {
    id: 'prod-5',
    name: 'Arito de Alpaca Pañuelo de la Memoria | Tuc-Humano',
    description: 'Arito de alpaca pañuelo de Madres y Abuelas. Símbolo de memoria y auténtico diseño tucumano. Llevá tu identidad con orgullo en Tuc-Humano.'
  }
];

async function updateSEO() {
  console.log('Iniciando actualización SEO en Supabase...');
  
  for (const product of seoUpdates) {
    console.log(`Actualizando ${product.id}...`);
    const { error } = await supabase
      .from('products')
      .update({ name: product.name, description: product.description })
      .eq('id', product.id);
      
    if (error) {
      console.error(`❌ Error actualizando ${product.id}:`, error);
    } else {
      console.log(`✅ ${product.id} actualizado con éxito!`);
    }
  }
  
  console.log('Proceso de actualización SEO completado.');
}

updateSEO();
