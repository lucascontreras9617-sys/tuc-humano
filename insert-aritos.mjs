import { createClient } from '@supabase/supabase-js';
const supabase = createClient(
  'https://jenbskrxpktziiajrbpt.supabase.co',
  'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImplbmJza3J4cGt0emlpYWpyYnB0Iiwicm9sZSI6InNlcnZpY2Vfcm9sZSIsImlhdCI6MTc3NzYwODY1NCwiZXhwIjoyMDkzMTg0NjU0fQ.cvqdFqTGQFAF9vpUSjc8wff1CzApjQA2vNwK7eF7LW8'
);
async function insert() {
  const { data, error } = await supabase.from('products').insert([{
    id: 'prod-5',
    name: 'aritos de alpaca con pasador de plata',
    slug: 'aritos-alpaca-con-pasador-de-plata',
    price: 15000.00,
    old_price: null,
    description: 'arito<br/>Realizados a mano por Óscar, orfebre tucumano del barrio ciudadela.<br/>En material Alpaca con pasador de Plata.',
    image_url: '/images/aritosplaza.webp',
    image_back_url: null,
    stock_s: 0,
    stock_m: 0,
    stock_l: 0,
    stock_xl: 0,
    stock_unico: 60,
    has_sizes: false,
    active: true
  }]);
  console.log(error || '✅ Inserted prod-5');
}
insert();
