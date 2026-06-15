import 'dotenv/config';
import { createClient } from '@supabase/supabase-js';

const supabaseUrl = process.env.PUBLIC_SUPABASE_URL;
const supabaseKey = process.env.SUPABASE_SERVICE_ROLE_KEY;

if (!supabaseUrl || !supabaseKey) {
  console.error('Missing Supabase credentials in .env');
  process.exit(1);
}

const supabase = createClient(supabaseUrl, supabaseKey);

async function insertRemeraAH() {
  console.log('Inserting Remera Argentina Humana...');

  const product = {
    name: 'Remera Oversize Argentina Humana',
    slug: 'remera-argentina-humana',
    price: 35000.00,
    old_price: null,
    description: 'Remera oversize de algodón pesado premium "Argentina Humana" con la frase "El coraje se contagia". Confeccionada con algodón de alta densidad, garantiza durabilidad y una caída perfecta. IMPORTANTE: El talle oversize es amplio. Esta remera se encuentra en PREVENTA.',
    image_url: '/images/remera-ah-blanca.png',
    image_back_url: null,
    stock_s: 20,
    stock_m: 20,
    stock_l: 20,
    stock_xl: 20,
    stock_unico: 0,
    has_sizes: true,
    active: true,
    color_variants: [
      { name: 'Blanco', image_url: '/images/remera-ah-blanca.png' },
      { name: 'Negro', image_url: '/images/remera-ah-negra.png', image_back_url: '/images/remera-ah-negra-espalda.png' }
    ]
  };

  const { data, error } = await supabase
    .from('products')
    .insert([product])
    .select();

  if (error) {
    console.error('❌ Error inserting product:', error);
  } else {
    console.log('✅ Product inserted successfully:', data[0].slug);
  }
}

insertRemeraAH();
