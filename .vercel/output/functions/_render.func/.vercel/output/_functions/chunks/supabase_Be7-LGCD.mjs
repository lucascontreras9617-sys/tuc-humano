import { createClient } from '@supabase/supabase-js';

const supabaseUrl = "https://jenbskrxpktziiajrbpt.supabase.co";
const supabaseAnonKey = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImplbmJza3J4cGt0emlpYWpyYnB0Iiwicm9sZSI6ImFub24iLCJpYXQiOjE3Nzc2MDg2NTQsImV4cCI6MjA5MzE4NDY1NH0.zNnuua5wh6H7-H9XlCCdK5-IEi2GRa9yo7KRsoo7T0Y";
const supabase = createClient(
  supabaseUrl,
  supabaseAnonKey
);
async function getProducts() {
  const { data, error } = await supabase.from("products").select("*").eq("active", true).order("created_at", { ascending: true });
  if (error) {
    console.error("Error fetching products:", error);
    return [];
  }
  return data || [];
}
async function getProductBySlug(slug) {
  const { data, error } = await supabase.from("products").select("*").eq("slug", slug).eq("active", true).single();
  if (error) {
    console.error("Error fetching product:", error);
    return null;
  }
  return data;
}
const FALLBACK_PRODUCTS = [
  {
    id: "prod-1",
    name: "Remera oversize de lucha",
    slug: "remera-oversize-de-lucha",
    price: 27500,
    old_price: 35e3,
    description: "Remera oversize de algodón premium con estampado artístico del escudo tucumano. Una declaración de identidad, de lucha y de amor por Tucumán. Hecha con algodón de primera calidad, suave, duradera y con un ajuste cómodo que abraza todos los cuerpos.",
    image_url: "/images/parte de frente de la remera.jpg",
    image_back_url: "/images/parte de atras de la remeras.jpg",
    stock_s: 10,
    stock_m: 15,
    stock_l: 15,
    stock_xl: 10,
    stock_unico: 0,
    has_sizes: true,
    active: true
  },
  {
    id: "prod-2",
    name: "Los Siete Pecados Argentinos - Juan Grabois",
    slug: "siete-pecados-argentinos-grabois",
    price: 15e3,
    old_price: 2e4,
    description: "Ensayo político donde Juan Grabois analiza las problemáticas estructurales de la Argentina y propone caminos orientados a la justicia social y el bien común.",
    image_url: "/images/libro_los_siete_pecados_capitales.jpg",
    image_back_url: null,
    stock_s: 0,
    stock_m: 0,
    stock_l: 0,
    stock_xl: 0,
    stock_unico: 20,
    has_sizes: false,
    active: true
  },
  {
    id: "prod-3",
    name: "Argentina Humana - Juan Grabois",
    slug: "argentina-humana-grabois",
    price: 35e3,
    old_price: 4e4,
    description: "Obra fundamental que expone la visión de una Argentina desde la dignidad, con desarrollo humano integral y protagonismo de los movimientos populares.",
    image_url: "/images/libro_argentina_humana.jpg",
    image_back_url: null,
    stock_s: 0,
    stock_m: 0,
    stock_l: 0,
    stock_xl: 0,
    stock_unico: 15,
    has_sizes: false,
    active: true
  },
  {
    id: "prod-4",
    name: "Pin Argentina Humana (AH)",
    slug: "pin-argentina-humana-ah",
    price: 8e3,
    old_price: 12e3,
    description: "Pin metálico esmaltado de máxima calidad. Llevá la militancia y tus valores siempre con vos. Perfecto para la mochila, campera o morral.",
    image_url: "/images/pin_argentina_humana.jpg",
    image_back_url: null,
    stock_s: 0,
    stock_m: 0,
    stock_l: 0,
    stock_xl: 0,
    stock_unico: 50,
    has_sizes: false,
    active: true
  }
];

export { FALLBACK_PRODUCTS as F, getProductBySlug as a, getProducts as g };
