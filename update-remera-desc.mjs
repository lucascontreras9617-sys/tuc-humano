import 'dotenv/config';
import { createClient } from '@supabase/supabase-js';

const supabase = createClient(
  process.env.PUBLIC_SUPABASE_URL,
  process.env.SUPABASE_SERVICE_ROLE_KEY
);

const newDesc = 'Remera diseñada por la militancia de Patria Grande Tucumán. Su estampa reúne figuras, símbolos e hitos que forman parte de la memoria colectiva y de las luchas populares de nuestro pueblo. Cada elemento del diseño representa valores e ideales vinculados a la justicia social, la solidaridad, la organización comunitaria y la construcción de una Argentina más humana e inclusiva.<br/><br/>Una prenda que expresa identidad, compromiso y la convicción de que otro país es posible.';

async function update() {
  console.log('Updating prod-1...');
  const res = await supabase.from('products').update({ description: newDesc }).eq('id', 'prod-1');
  if (res.error) console.error(res.error);
  else console.log('✅ prod-1 updated!');
}

update();
