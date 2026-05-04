import { createClient } from '@supabase/supabase-js';

const supabase = createClient(
  'https://jenbskrxpktziiajrbpt.supabase.co',
  'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImplbmJza3J4cGt0emlpYWpyYnB0Iiwicm9sZSI6InNlcnZpY2Vfcm9sZSIsImlhdCI6MTc3NzYwODY1NCwiZXhwIjoyMDkzMTg0NjU0fQ.cvqdFqTGQFAF9vpUSjc8wff1CzApjQA2vNwK7eF7LW8'
);

const newDesc = `Remera oversize unisex de algodón pesado. Calidad que se siente desde el primer toque.<br/><br/>Confeccionada con algodón de alto gramaje: suave, amplia, con un ajuste que abraza todo tipo de cuerpos. Hecha para durar lavado tras lavado, sin perder forma ni color.<br/><br/>Su espalda habla por sí sola. Un collage de figuras, símbolos y consignas que forman parte de nuestra historia y nuestra identidad: El escudo, las luchas, los rostros que nos representan.<br/><br/>Vestirla es memoria. Es pertenencia. Es decir quiénes somos.`;

async function updateDescription() {
  console.log('Updating description for prod-1...');
  const { error } = await supabase
    .from('products')
    .update({ description: newDesc })
    .eq('id', 'prod-1');

  if (error) {
    console.error('❌ Error updating description:', error);
  } else {
    console.log('✅ Description updated successfully!');
  }
}

updateDescription();
