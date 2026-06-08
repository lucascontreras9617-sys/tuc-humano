import { createClient } from '@supabase/supabase-js';
const supabaseUrl = 'https://jenbskrxpktziiajrbpt.supabase.co';
const supabaseAnonKey = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImplbmJza3J4cGt0emlpYWpyYnB0Iiwicm9sZSI6ImFub24iLCJpYXQiOjE3Nzc2MDg2NTQsImV4cCI6MjA5MzE4NDY1NH0.zNnuua5wh6H7-H9XlCCdK5-IEi2GRa9yo7KRsoo7T0Y';
const supabase = createClient(supabaseUrl, supabaseAnonKey);

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
