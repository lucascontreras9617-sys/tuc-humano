import 'dotenv/config';
import { createClient } from '@supabase/supabase-js';

const supabase = createClient(
  process.env.PUBLIC_SUPABASE_URL,
  process.env.SUPABASE_SERVICE_ROLE_KEY
);

async function updatePrecios() {
  // Los Siete Pecados Argentinos: $15.000 -> $28.900
  console.log('Updating prod-2 (Siete Pecados)...');
  let res = await supabase.from('products').update({ price: 28900, old_price: null }).eq('id', 'prod-2');
  if (res.error) console.error(res.error);
  else console.log('✅ prod-2 updated! $15.000 -> $28.900');

  // Argentina Humana: $35.000 -> $44.599
  console.log('Updating prod-3 (Argentina Humana)...');
  res = await supabase.from('products').update({ price: 44599, old_price: null }).eq('id', 'prod-3');
  if (res.error) console.error(res.error);
  else console.log('✅ prod-3 updated! $35.000 -> $44.599');
}

updatePrecios();
