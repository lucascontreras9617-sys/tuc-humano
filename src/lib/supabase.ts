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
    name: 'Remera Oversize de Resistencia | Tuc-Humano',
    slug: 'remera-oversize-de-lucha',
    price: 30000.00,
    old_price: 40000.00,
    description: 'Remera oversize de algodón pesado. Auténtico diseño tucumano de resistencia. Vestí memoria e identidad popular con la calidad de Tuc-Humano.',
    image_url: '/images/parte de frente de la remera.webp',
    image_back_url: '/images/parte de atras de la remeras.webp',
    stock_s: 10, stock_m: 15, stock_l: 15, stock_xl: 10, stock_unico: 0,
    has_sizes: true, active: true
  },
  {
    id: 'prod-2',
    name: 'Libro Los Siete Pecados Argentinos de Grabois | Tuc-Humano',
    slug: 'siete-pecados-argentinos-grabois',
    price: 28900.00,
    old_price: null,
    description: 'Leé a Juan Grabois en Los Siete Pecados Argentinos. Ensayo político y social. Encontrá libros y el mejor diseño tucumano en Tuc-Humano.',
    image_url: '/images/libro_los_siete_pecados_capitales.webp',
    image_back_url: null,
    stock_s: 0, stock_m: 0, stock_l: 0, stock_xl: 0, stock_unico: 20,
    has_sizes: false, active: true
  },
  {
    id: 'prod-3',
    name: 'Libro Argentina Humana de Juan Grabois | Tuc-Humano',
    slug: 'argentina-humana-grabois',
    price: 44599.00,
    old_price: null,
    description: 'Descubrí Argentina Humana de Juan Grabois. Herramientas para la acción política. Apoyá la cultura y el diseño tucumano comprando en Tuc-Humano.',
    image_url: '/images/libro_argentina_humana.webp',
    image_back_url: null,
    stock_s: 0, stock_m: 0, stock_l: 0, stock_xl: 0, stock_unico: 15,
    has_sizes: false, active: true
  },
  {
    id: 'prod-4',
    name: 'Pin Metálico Argentina Humana | Accesorios Tuc-Humano',
    slug: 'pin-argentina-humana-ah',
    price: 8000.00,
    old_price: 12000.00,
    description: 'Pin metálico esmaltado Argentina Humana. Llevá la militancia con vos. Accesorios de diseño tucumano exclusivos, encontralos en Tuc-Humano.',
    image_url: '/images/pin_argentina_humana.webp',
    image_back_url: null,
    stock_s: 0, stock_m: 0, stock_l: 0, stock_xl: 0, stock_unico: 50,
    has_sizes: false, active: true
  },
  {
    id: 'prod-5',
    name: 'Arito de Alpaca Pañuelo de la Memoria | Tuc-Humano',
    slug: 'aritos-alpaca-con-pasador-de-plata',
    price: 15000.00,
    old_price: null,
    description: 'Arito de alpaca pañuelo de Madres y Abuelas. Símbolo de memoria y auténtico diseño tucumano. Llevá tu identidad con orgullo en Tuc-Humano.',
    image_url: '/images/aritosplaza.webp',
    image_back_url: null,
    stock_s: 0, stock_m: 0, stock_l: 0, stock_xl: 0, stock_unico: 60,
    has_sizes: false, active: true
  }
];
