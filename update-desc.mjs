import { createClient } from '@supabase/supabase-js';

const supabase = createClient(
  'https://jenbskrxpktziiajrbpt.supabase.co',
  'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImplbmJza3J4cGt0emlpYWpyYnB0Iiwicm9sZSI6InNlcnZpY2Vfcm9sZSIsImlhdCI6MTc3NzYwODY1NCwiZXhwIjoyMDkzMTg0NjU0fQ.cvqdFqTGQFAF9vpUSjc8wff1CzApjQA2vNwK7eF7LW8'
);

const desc2 = 'Escrito por Juan Grabois y publicado por Paidós, es una novela que entrelaza la ficción con el ensayo político y teológico. Narra, a ritmo acelerado, una historia de ángeles caídos y demonios instalados en la cultura de consumo y el poder económico de Buenos Aires.';
const desc3 = 'Frustración e incertidumbre se expresan en una creciente insatisfacción con la democracia y un cuestionamiento del papel del Estado, canalizados con éxito por las nuevas derechas. A partir de la premisa de que otra Argentina es posible, Juan Grabois propone sublimar la bronca, amasar la esperanza y recuperar el gobierno. El autor despliega una caja de herramientas conceptuales, describe cuál es el paradigma humanista en política y nos invita a imaginar esa otra Argentina con la mente despierta, los pies en la tierra y todos a la mesa, tomando nota de nuestras muchas fortalezas como sociedad. El propósito de este libro es detallar las formas concretas de ejecución que permitan la realización efectiva en el presente de los principios políticos que a lo largo de la historia han ido cimentándose en la conciencia colectiva. Se reafirma también la vigencia de los sueños e ideales del movimiento nacional-popular, planteando al mismo tiempo una profunda actualización teórica, táctica y estratégica para su concreción. No aventura una revolución ni una reforma, sino "compartir un proyecto simple que, por su propia simplicidad, en un mundo de anárquica injusticia, es de una radicalidad contracultural que molesta a los que prefieren la comodidad política e intelectual de la deshumanización paulatina. No queremos, ni más ni menos, que una Argentina humana."';

async function updateBooks() {
  console.log('Updating prod-2...');
  let res = await supabase.from('products').update({ description: desc2 }).eq('id', 'prod-2');
  if (res.error) console.error(res.error);
  else console.log('✅ prod-2 updated!');

  console.log('Updating prod-3...');
  res = await supabase.from('products').update({ description: desc3 }).eq('id', 'prod-3');
  if (res.error) console.error(res.error);
  else console.log('✅ prod-3 updated!');
}

updateBooks();
