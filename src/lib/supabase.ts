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
  color_variants?: { name: string, image_url: string, image_back_url?: string }[] | null;
  gallery_images?: string[] | null;
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
  color?: string;
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
    return FALLBACK_PRODUCTS;
  }
  
  const dbProducts = data || [];
  
  // Merge fallback products that are not in the DB to ensure new products show up 
  // even if the user hasn't successfully updated their database schema yet.
  const merged = dbProducts.map(dbProd => {
    const fallback = FALLBACK_PRODUCTS.find(p => p.slug === dbProd.slug);
    if (fallback) {
      // Overwrite images with local fallback since DB doesn't have gallery_images column yet
      return { ...dbProd, image_url: fallback.image_url, image_back_url: fallback.image_back_url, gallery_images: fallback.gallery_images };
    }
    return dbProd;
  });
  
  for (const fallbackProd of FALLBACK_PRODUCTS) {
    if (!merged.find(p => p.slug === fallbackProd.slug)) {
      merged.push(fallbackProd);
    }
  }

  return merged;
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
    return FALLBACK_PRODUCTS.find(p => p.slug === slug) || null;
  }
  
  const fallback = FALLBACK_PRODUCTS.find(p => p.slug === slug);
  if (fallback) {
    return { ...data, image_url: fallback.image_url, image_back_url: fallback.image_back_url, gallery_images: fallback.gallery_images };
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
    image_url: '/images/remera-tuc-humano-frente.jpeg',
    image_back_url: '/images/remera-tuc-humano-espalda.jpeg',
    gallery_images: [
      '/images/remera-tuc-humano-frente.jpeg',
      '/images/remera-tuc-humano-espalda.jpeg',
      '/images/etiqueta-remera-tuc-humano.jpeg'
    ],
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
    description: 'Aritos "Memoria"\n\nSímbolo de una lucha histórica, estos aritos presentan el emblemático pañuelo de Madres y Abuelas de Plaza de Mayo en alpaca con pasador de plata. Una pieza de diseño con profunda identidad, forjada a mano por el orfebre tucumano Oscar de barrio Ciudadela, que combina destreza técnica con un mensaje de compromiso inquebrantable con la lucha por la memoria e identidad.',
    image_url: '/images/aritosplaza.webp',
    image_back_url: null,
    stock_s: 0, stock_m: 0, stock_l: 0, stock_xl: 0, stock_unico: 60,
    has_sizes: false, active: true
  },
  {
    id: 'prod-6',
    name: 'Remera Oversize Argentina Humana | Tuc-Humano',
    slug: 'remera-argentina-humana',
    price: 25000.00,
    old_price: 32000.00,
    description: 'Remera oversize de algodón pesado premium "Argentina Humana" con la frase "El coraje se contagia". Confeccionada con algodón de alta densidad, garantiza durabilidad y una caída perfecta. IMPORTANTE: El talle oversize es amplio. Esta remera se encuentra en PREVENTA.',
    image_url: '/images/remera-argentina-humana-blanca3.png',
    image_back_url: '/images/remera-ah-negra.png',
    stock_s: 20, stock_m: 20, stock_l: 20, stock_xl: 20, stock_unico: 0,
    has_sizes: true, active: true,
    color_variants: [
      { name: 'Blanco', image_url: '/images/remera-argentina-humana-blanca3.png' },
      { name: 'Negro', image_url: '/images/remera-ah-negra.png', image_back_url: '/images/remera-ah-negra-espalda.png' }
    ]
  }
];
