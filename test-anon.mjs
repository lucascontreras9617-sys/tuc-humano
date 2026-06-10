import 'dotenv/config';
import { createClient } from '@supabase/supabase-js';

const supabase = createClient(
  process.env.PUBLIC_SUPABASE_URL,
  process.env.PUBLIC_SUPABASE_ANON_KEY
);

async function test() {
  console.log('Testing Supabase Anon connection...');
  const { data, error } = await supabase.from('products').select('*').limit(1);
  if (error) {
    console.error('❌ Connection failed:', error.message);
  } else {
    console.log('✅ Connection successful! Rows fetched:', data.length);
  }
}
test();
