import 'dotenv/config';
import { createClient } from '@supabase/supabase-js';

const supabase = createClient(
  process.env.PUBLIC_SUPABASE_URL,
  process.env.SUPABASE_SERVICE_ROLE_KEY
);

async function updateRemera() {
  console.log('Updating prod-1...');
  let res = await supabase.from('products').update({ name: 'Remera oversize de resistencia' }).eq('id', 'prod-1');
  if (res.error) console.error(res.error);
  else console.log('✅ prod-1 updated!');
}

updateRemera();
