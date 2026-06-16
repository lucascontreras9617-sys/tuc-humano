-- ============================================
-- SCRIPT DE ACTUALIZACIÓN DE SUPABASE
-- ============================================
-- Copiá y pegá todo este código en el "SQL Editor" de tu panel de Supabase 
-- y hacé click en el botón "Run" (ejecutar).

-- 0. Crear las tablas si por alguna razón no existen en esta base de datos
CREATE EXTENSION IF NOT EXISTS "uuid-ossp";

CREATE TABLE IF NOT EXISTS products (
  id          UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  name        TEXT NOT NULL,
  slug        TEXT UNIQUE NOT NULL,
  price       NUMERIC(10,2) NOT NULL,
  old_price   NUMERIC(10,2),
  description TEXT,
  image_url   TEXT,
  image_back_url TEXT,
  stock_s     INT DEFAULT 0 CHECK (stock_s >= 0),
  stock_m     INT DEFAULT 0 CHECK (stock_m >= 0),
  stock_l     INT DEFAULT 0 CHECK (stock_l >= 0),
  stock_xl    INT DEFAULT 0 CHECK (stock_xl >= 0),
  stock_unico INT DEFAULT 0 CHECK (stock_unico >= 0),
  has_sizes   BOOLEAN DEFAULT true,
  color_variants JSONB,
  active      BOOLEAN DEFAULT true,
  created_at  TIMESTAMPTZ DEFAULT NOW(),
  updated_at  TIMESTAMPTZ DEFAULT NOW()
);

-- 1. Agregar la columna para la galería de imágenes si no existe
ALTER TABLE products ADD COLUMN IF NOT EXISTS gallery_images JSONB;

-- 2. Actualizar o insertar los productos con la información más reciente
INSERT INTO products (
  name, slug, price, old_price, description, 
  image_url, image_back_url, gallery_images, 
  stock_s, stock_m, stock_l, stock_xl, stock_unico, 
  has_sizes, active, color_variants
)
VALUES
(
  'Remera Oversize de Resistencia | Tuc-Humano',
  'remera-oversize-de-lucha',
  30000.00,
  40000.00,
  'Remera oversize con alta densidad de algodon premium. Diseño propio realizado por nuestra militancia, contiene en su espalda referentes e idolos con los que compartimos valores e ideales comunes y asi como el sueño de una argentina más humana, solidaria y justa.',
  '/images/remera-tuc-humano-frente.jpeg',
  '/images/remera-tuc-humano-espalda.jpeg',
  '[
    "/images/remera-tuc-humano-frente.jpeg",
    "/images/remera-tuc-humano-espalda.jpeg",
    "/images/remera-tuc-humano-espalda2.jpg",
    "/images/etiqueta-remera-tuc-humano.jpeg"
  ]'::jsonb,
  10, 15, 15, 10, 0,
  true,
  true,
  NULL
),
(
  'Libro Los Siete Pecados Argentinos de Grabois | Tuc-Humano',
  'siete-pecados-argentinos-grabois',
  28900.00,
  NULL,
  'Leé a Juan Grabois en Los Siete Pecados Argentinos. Ensayo político y social. Encontrá libros y el mejor diseño tucumano en Tuc-Humano.',
  '/images/libro_los_siete_pecados_capitales.webp',
  NULL,
  NULL,
  0, 0, 0, 0, 20,
  false,
  true,
  NULL
),
(
  'Libro Argentina Humana de Juan Grabois | Tuc-Humano',
  'argentina-humana-grabois',
  44599.00,
  NULL,
  'Descubrí Argentina Humana de Juan Grabois. Herramientas para la acción política. Apoyá la cultura y el diseño tucumano comprando en Tuc-Humano.',
  '/images/libro_argentina_humana.webp',
  NULL,
  NULL,
  0, 0, 0, 0, 15,
  false,
  true,
  NULL
),
(
  'Pin Metálico Argentina Humana | Accesorios Tuc-Humano',
  'pin-argentina-humana-ah',
  8000.00,
  12000.00,
  'Pin metálico esmaltado Argentina Humana. Llevá la militancia con vos. Accesorios de diseño tucumano exclusivos, encontralos en Tuc-Humano.',
  '/images/pin_argentina_humana.webp',
  NULL,
  NULL,
  0, 0, 0, 0, 50,
  false,
  true,
  NULL
),
(
  'Arito de Alpaca Pañuelo de la Memoria | Tuc-Humano',
  'aritos-alpaca-con-pasador-de-plata',
  15000.00,
  NULL,
  'Aritos "Memoria"\n\nSímbolo de una lucha histórica, estos aritos presentan el emblemático pañuelo de Madres y Abuelas de Plaza de Mayo en alpaca con pasador de plata. Una pieza de diseño con profunda identidad, forjada a mano por el orfebre tucumano Oscar de barrio Ciudadela, que combina destreza técnica con un mensaje de compromiso inquebrantable con la lucha por la memoria e identidad.',
  '/images/aritosplaza.webp',
  NULL,
  NULL,
  0, 0, 0, 0, 60,
  false,
  true,
  NULL
),
(
  'Remera Oversize Argentina Humana | Tuc-Humano',
  'remera-argentina-humana',
  25000.00,
  NULL,
  'Remera oversize de algodón pesado premium "Argentina Humana" con la frase "El coraje se contagia". Confeccionada con algodón de alta densidad, garantiza durabilidad y una caída perfecta. IMPORTANTE: El talle oversize es amplio. Esta remera se encuentra en PREVENTA.',
  '/images/portada4.png',
  '/images/remera-ah-negra.png',
  NULL,
  20, 20, 20, 20, 0,
  true,
  true,
  '[
    {
      "name": "Blanco", 
      "image_url": "/images/portada4.png"
    }, 
    {
      "name": "Negro", 
      "image_url": "/images/remera-ah-negra.png", 
      "image_back_url": "/images/remera-ah-negra-espalda.png"
    }
  ]'::jsonb
)
ON CONFLICT (slug) DO UPDATE SET
  name = EXCLUDED.name,
  price = EXCLUDED.price,
  old_price = EXCLUDED.old_price,
  description = EXCLUDED.description,
  image_url = EXCLUDED.image_url,
  image_back_url = EXCLUDED.image_back_url,
  gallery_images = EXCLUDED.gallery_images,
  stock_s = EXCLUDED.stock_s,
  stock_m = EXCLUDED.stock_m,
  stock_l = EXCLUDED.stock_l,
  stock_xl = EXCLUDED.stock_xl,
  stock_unico = EXCLUDED.stock_unico,
  has_sizes = EXCLUDED.has_sizes,
  active = EXCLUDED.active,
  color_variants = EXCLUDED.color_variants;

-- 3. Limpiar la caché del esquema de Supabase para que reconozca los cambios
NOTIFY pgrst, 'reload schema';
