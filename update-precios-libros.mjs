import { createClient } from '@supabase/supabase-js';

const supabase = createClient(
  'https://jenbskrxpktziiajrbpt.supabase.co',
  'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImplbmJza3J4cGt0emlpYWpyYnB0Iiwicm9sZSI6InNlcnZpY2Vfcm9sZSIsImlhdCI6MTc3NzYwODY1NCwiZXhwIjoyMDkzMTg0NjU0fQ.cvqdFqTGQFAF9vpUSjc8wff1CzApjQA2vNwK7eF7LW8'
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
