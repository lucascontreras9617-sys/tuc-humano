import 'dotenv/config';
import { createClient } from '@supabase/supabase-js';
const supabase = createClient(
  process.env.PUBLIC_SUPABASE_URL,
  process.env.SUPABASE_SERVICE_ROLE_KEY
);
async function test() {
  const { data, error } = await supabase.from('products').select('*');
  console.log(data);
}
test();
