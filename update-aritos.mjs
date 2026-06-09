import { createClient } from '@supabase/supabase-js';

const supabase = createClient(
  'https://jenbskrxpktziiajrbpt.supabase.co',
  'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImplbmJza3J4cGt0emlpYWpyYnB0Iiwicm9sZSI6InNlcnZpY2Vfcm9sZSIsImlhdCI6MTc3NzYwODY1NCwiZXhwIjoyMDkzMTg0NjU0fQ.cvqdFqTGQFAF9vpUSjc8wff1CzApjQA2vNwK7eF7LW8'
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
