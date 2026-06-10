import 'dotenv/config';
import { createClient } from '@supabase/supabase-js';

const supabase = createClient(
  process.env.PUBLIC_SUPABASE_URL,
  process.env.SUPABASE_SERVICE_ROLE_KEY
);

const desc = 'Arito con forma del pañuelo característico de las Abuelas y Madres de Plaza de Mayo, símbolo de identidad y lucha por la memoria. Elaborados artesanalmente por orfebres tucumanos en metal de alpaca pulido, con pasador de plata.';

async function updateAritos() {
  console.log('Updating prod-5...');
  let res = await supabase.from('products').update({ 
    name: 'arito de alpaca con pasador de plata',
    slug: 'aritos-alpaca-con-pasador-de-plata',
    description: desc 
  }).eq('id', 'prod-5');
  if (res.error) console.error(res.error);
  else console.log('✅ prod-5 updated!');
}

updateAritos();
