import { createClient } from '@supabase/supabase-js';

const supabase = createClient(
  'https://jenbskrxpktziiajrbpt.supabase.co',
  'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImplbmJza3J4cGt0emlpYWpyYnB0Iiwicm9sZSI6InNlcnZpY2Vfcm9sZSIsImlhdCI6MTc3NzYwODY1NCwiZXhwIjoyMDkzMTg0NjU0fQ.cvqdFqTGQFAF9vpUSjc8wff1CzApjQA2vNwK7eF7LW8'
);

const desc = 'Arito "Pañuelo de la Memoria" – Alpaca y Plata<br/><br/>Una pieza de joyería de autor que trasciende lo estético para convertirse en un símbolo de identidad y lucha. Este arito, moldeado con la emblemática forma del pañuelo de las Abuelas de Plaza de Mayo, fue realizado a mano por Óscar, orfebre tucumano del barrio Ciudadela.<br/><br/>Está confeccionado en alpaca con un delicado acabado artesanal, y cuenta con pasador de plata para garantizar su durabilidad y un uso cómodo (hipoalergénico).<br/><br/>Una pieza para llevar la memoria a flor de piel, hecha con conciencia y orgullo local.';

async function updateAritos() {
  console.log('Updating prod-5...');
  let res = await supabase.from('products').update({ 
    name: 'aritos de alpaca con pasador de plata',
    slug: 'aritos-alpaca-con-pasador-de-plata',
    description: desc 
  }).eq('id', 'prod-5');
  if (res.error) console.error(res.error);
  else console.log('✅ prod-5 updated!');
}

updateAritos();
