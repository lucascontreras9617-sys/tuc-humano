import { createClient } from '@supabase/supabase-js';

const supabase = createClient(
  'https://jenbskrxpktziiajrbpt.supabase.co',
  'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImplbmJza3J4cGt0emlpYWpyYnB0Iiwicm9sZSI6InNlcnZpY2Vfcm9sZSIsImlhdCI6MTc3NzYwODY1NCwiZXhwIjoyMDkzMTg0NjU0fQ.cvqdFqTGQFAF9vpUSjc8wff1CzApjQA2vNwK7eF7LW8'
);

// First, let's see what's currently in Supabase
const { data: products, error } = await supabase.from('products').select('id, name, slug, image_url, image_back_url');

if (error) {
  console.error('Error fetching products:', error);
  process.exit(1);
}

console.log('=== Current Supabase image URLs ===');
products.forEach(p => {
  console.log(`\n[${p.id}] ${p.name}`);
  console.log(`  image_url:      ${p.image_url}`);
  console.log(`  image_back_url: ${p.image_back_url || '(none)'}`);
});

// Update image URLs from .jpg to .webp
const updates = [
  {
    id: 'prod-1',
    image_url: '/images/parte de frente de la remera.webp',
    image_back_url: '/images/parte de atras de la remeras.webp'
  },
  {
    id: 'prod-2',
    image_url: '/images/libro_los_siete_pecados_capitales.webp',
    image_back_url: null
  },
  {
    id: 'prod-3',
    image_url: '/images/libro_argentina_humana.webp',
    image_back_url: null
  },
  {
    id: 'prod-4',
    image_url: '/images/pin_argentina_humana.webp',
    image_back_url: null
  }
];

console.log('\n=== Updating image URLs to .webp ===');

for (const upd of updates) {
  const { error: updateError } = await supabase
    .from('products')
    .update({ image_url: upd.image_url, image_back_url: upd.image_back_url })
    .eq('id', upd.id);

  if (updateError) {
    console.error(`❌ Error updating ${upd.id}:`, updateError);
  } else {
    console.log(`✅ ${upd.id} → ${upd.image_url}`);
  }
}

// Verify
const { data: updated } = await supabase.from('products').select('id, name, image_url, image_back_url');
console.log('\n=== Verification (after update) ===');
updated.forEach(p => {
  console.log(`[${p.id}] ${p.name}`);
  console.log(`  image_url:      ${p.image_url}`);
  console.log(`  image_back_url: ${p.image_back_url || '(none)'}`);
});
