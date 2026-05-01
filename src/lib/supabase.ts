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
    .eq('active', true)
    .order('created_at', { ascending: true });

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
    description: 'Remera oversize de algodón premium con estampado artístico del escudo tucumano. Una declaración de identidad, de lucha y de amor por Tucumán. Hecha con algodón de primera calidad, suave, duradera y con un ajuste cómodo que abraza todos los cuerpos.',
    image_url: '/images/parte de frente de la remera.jpg',
    image_back_url: '/images/parte de atras de la remeras.jpg',
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
    image_url: '/images/libro_los_siete_pecados_capitales.jpg',
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
    description: 'Obra fundamental que expone la visión de una Argentina desde la dignidad, con desarrollo humano integral y protagonismo de los movimientos populares.',
    image_url: '/images/libro_argentina_humana.jpg',
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
    image_url: '/images/pin_argentina_humana.jpg',
    image_back_url: null,
    stock_s: 0, stock_m: 0, stock_l: 0, stock_xl: 0, stock_unico: 50,
    has_sizes: false, active: true
  }
];
