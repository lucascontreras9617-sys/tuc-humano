import 'dotenv/config';
import { createClient } from '@supabase/supabase-js';
const supabase = createClient(
  process.env.PUBLIC_SUPABASE_URL,
  process.env.SUPABASE_SERVICE_ROLE_KEY
);
async function insert() {
  const { data, error } = await supabase.from('products').insert([{
    id: 'prod-5',
    name: 'arito de alpaca con pasador de plata',
    slug: 'aritos-alpaca-con-pasador-de-plata',
    price: 15000.00,
    old_price: null,
    description: 'Arito con forma del pañuelo característico de las Abuelas y Madres de Plaza de Mayo, símbolo de identidad y lucha por la memoria. Elaborados artesanalmente por orfebres tucumanos en metal de alpaca pulido, con pasador de plata.',
    image_url: '/images/aritosplaza.webp',
    image_back_url: null,
    stock_s: 0,
    stock_m: 0,
    stock_l: 0,
    stock_xl: 0,
    stock_unico: 60,
    has_sizes: false,
    active: true
  }]);
  console.log(error || '✅ Inserted prod-5');
}
insert();
