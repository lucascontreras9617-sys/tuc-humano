import { createClient } from '@supabase/supabase-js';

const supabaseUrl = import.meta.env.PUBLIC_SUPABASE_URL;
const supabaseAnonKey = import.meta.env.PUBLIC_SUPABASE_ANON_KEY;

if (!supabaseUrl || !supabaseAnonKey) {
  console.warn('⚠️ Supabase credentials not set. Add them to .env');
}

export const supabase = createClient(
  supabaseUrl || 'https://placeholder.supabase.co',
  supabaseAnonKey || 'placeholder'
);

// Types
export interface Product {
  id: string;
  name: string;
  slug: string;
  price: number;
  old_price: number | null;
  description: string;
  image_url: string;
  image_back_url: string | null;
  stock_s: number;
  stock_m: number;
  stock_l: number;
  stock_xl: number;
  stock_unico: number;
  has_sizes: boolean;
  active: boolean;
}

export interface Order {
  id: string;
  mp_preference_id: string;
  mp_payment_id: string;
  status: 'pending' | 'approved' | 'rejected' | 'cancelled';
  total: number;
  shipping_cost: number;
  items: CartItem[];
  buyer_email: string;
  buyer_name: string;
  buyer_phone: string;
  shipping_address: string;
  shipping_postal_code: string;
}

export interface CartItem {
  productId: string;
  name: string;
  size: 'S' | 'M' | 'L' | 'XL' | 'UNICO';
  price: number;
  quantity: number;
  image: string;
}

export async function getProducts(): Promise<Product[]> {
  const { data, error } = await supabase
    .from('products')
    .select('*')
    .eq('active', true);

  if (error) {
    console.error('Error fetching products:', error);
    return [];
  }
  return data || [];
}

export async function getProductBySlug(slug: string): Promise<Product | null> {
  const { data, error } = await supabase
    .from('products')
    .select('*')
    .eq('slug', slug)
    .eq('active', true)
    .single();

  if (error) {
    console.error('Error fetching product:', error);
    return null;
  }
  return data;
}

export async function getProductStock(productId: string) {
  const { data, error } = await supabase
    .from('products')
    .select('stock_s, stock_m, stock_l, stock_xl, stock_unico, has_sizes')
    .eq('id', productId)
    .single();

  if (error) return null;
  return data;
}

// Fallback manual data for when Supabase is not configured yet
export const FALLBACK_PRODUCTS: Product[] = [
  {
    id: 'prod-1',
    name: 'Remera oversize de lucha',
    slug: 'remera-oversize-de-lucha',
    price: 27500.00,
    old_price: 35000.00,
    description: 'Remera oversize unisex de algodón pesado. Calidad que se siente desde el primer toque.<br/><br/>Confeccionada con algodón de alto gramaje: suave, amplia, con un ajuste que abraza todo tipo de cuerpos. Hecha para durar lavado tras lavado, sin perder forma ni color.<br/><br/>Su espalda habla por sí sola. Un collage de figuras, símbolos y consignas que forman parte de nuestra historia y nuestra identidad: El escudo, las luchas, los rostros que nos representan.<br/><br/>Vestirla es memoria. Es pertenencia. Es decir quiénes somos.',
    image_url: '/images/parte de frente de la remera.webp',
    image_back_url: '/images/parte de atras de la remeras.webp',
    stock_s: 10, stock_m: 15, stock_l: 15, stock_xl: 10, stock_unico: 0,
    has_sizes: true, active: true
  },
  {
    id: 'prod-2',
    name: 'Los Siete Pecados Argentinos - Juan Grabois',
    slug: 'siete-pecados-argentinos-grabois',
    price: 15000.00,
    old_price: 20000.00,
    description: 'Ensayo político donde Juan Grabois analiza las problemáticas estructurales de la Argentina y propone caminos orientados a la justicia social y el bien común.',
    image_url: '/images/libro_los_siete_pecados_capitales.webp',
    image_back_url: null,
    stock_s: 0, stock_m: 0, stock_l: 0, stock_xl: 0, stock_unico: 20,
    has_sizes: false, active: true
  },
  {
    id: 'prod-3',
    name: 'Argentina Humana - Juan Grabois',
    slug: 'argentina-humana-grabois',
    price: 35000.00,
    old_price: 40000.00,
    description: "En 'Argentina humana', Juan Grabois nos invita a explorar una visión transformadora de la justicia social en el siglo XXI. A través de un enfoque contracultural, el autor desafía las estructuras políticas y sociales tradicionales, proponiendo un modelo más inclusivo y humano para la sociedad argentina. Grabois, conocido por su activismo y compromiso con los derechos humanos, ofrece un análisis profundo y crítico de las desigualdades actuales, mientras presenta soluciones prácticas y esperanzadoras. Este ensayo se convierte en un llamado a la acción para construir un futuro más justo y equitativo, donde la dignidad y el bienestar de cada individuo sean el centro de las políticas públicas.",
    image_url: '/images/libro_argentina_humana.webp',
    image_back_url: null,
    stock_s: 0, stock_m: 0, stock_l: 0, stock_xl: 0, stock_unico: 15,
    has_sizes: false, active: true
  },
  {
    id: 'prod-4',
    name: 'Pin Argentina Humana (AH)',
    slug: 'pin-argentina-humana-ah',
    price: 8000.00,
    old_price: 12000.00,
    description: 'Pin metálico esmaltado de máxima calidad. Llevá la militancia y tus valores siempre con vos. Perfecto para la mochila, campera o morral.',
    image_url: '/images/pin_argentina_humana.webp',
    image_back_url: null,
    stock_s: 0, stock_m: 0, stock_l: 0, stock_xl: 0, stock_unico: 50,
    has_sizes: false, active: true
  }
];
