import { createClient } from '@supabase/supabase-js';

const supabase = createClient(
  'https://jenbskrxpktziiajrbpt.supabase.co',
  'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImplbmJza3J4cGt0emlpYWpyYnB0Iiwicm9sZSI6InNlcnZpY2Vfcm9sZSIsImlhdCI6MTc3NzYwODY1NCwiZXhwIjoyMDkzMTg0NjU0fQ.cvqdFqTGQFAF9vpUSjc8wff1CzApjQA2vNwK7eF7LW8'
);

async function updateRemera() {
  console.log('Updating prod-1...');
  let res = await supabase.from('products').update({ name: 'Remera oversize de resistencia' }).eq('id', 'prod-1');
  if (res.error) console.error(res.error);
  else console.log('✅ prod-1 updated!');
}

updateRemera();
