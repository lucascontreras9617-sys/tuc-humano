-- ============================================
-- TUC-HUMANO - Schema Supabase
-- Ejecutar en el SQL Editor de Supabase
-- ============================================

-- Extensión para UUID
CREATE EXTENSION IF NOT EXISTS "uuid-ossp";

-- ============================================
-- TABLA: products
-- ============================================
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
  active      BOOLEAN DEFAULT true,
  created_at  TIMESTAMPTZ DEFAULT NOW(),
  updated_at  TIMESTAMPTZ DEFAULT NOW()
);

-- ============================================
-- TABLA: orders
-- ============================================
CREATE TABLE IF NOT EXISTS orders (
  id                UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  mp_preference_id  TEXT,
  mp_payment_id     TEXT,
  mp_status         TEXT,
  status            TEXT DEFAULT 'pending' CHECK (status IN ('pending','approved','rejected','cancelled')),
  total             NUMERIC(10,2),
  shipping_cost     NUMERIC(10,2) DEFAULT 0,
  items             JSONB NOT NULL,
  buyer_email       TEXT,
  buyer_name        TEXT,
  buyer_phone       TEXT,
  shipping_address  TEXT,
  shipping_postal_code TEXT,
  created_at        TIMESTAMPTZ DEFAULT NOW(),
  updated_at        TIMESTAMPTZ DEFAULT NOW()
);

-- ============================================
-- FUNCIÓN: actualizar updated_at automáticamente
-- ============================================
CREATE OR REPLACE FUNCTION update_updated_at_column()
RETURNS TRIGGER AS $$
BEGIN
  NEW.updated_at = NOW();
  RETURN NEW;
END;
$$ language 'plpgsql';

CREATE TRIGGER update_products_updated_at
  BEFORE UPDATE ON products
  FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();

CREATE TRIGGER update_orders_updated_at
  BEFORE UPDATE ON orders
  FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();

-- ============================================
-- ROW LEVEL SECURITY (RLS)
-- ============================================
ALTER TABLE products ENABLE ROW LEVEL SECURITY;
ALTER TABLE orders ENABLE ROW LEVEL SECURITY;

-- Productos: lectura pública (anon puede ver productos activos)
CREATE POLICY "Public can read active products"
  ON products FOR SELECT
  USING (active = true);

-- Órdenes: solo el service_role puede leer/escribir (desde el backend)
CREATE POLICY "Service role manages orders"
  ON orders FOR ALL
  USING (auth.role() = 'service_role');

-- ============================================
-- DATOS INICIALES - Productos TUC-HUMANO
-- ============================================
INSERT INTO products (name, slug, price, old_price, description, image_url, image_back_url, stock_s, stock_m, stock_l, stock_xl, stock_unico, has_sizes) VALUES
(
  'Remera oversize de lucha',
  'remera-oversize-de-lucha',
  27500.00,
  35000.00,
  'Remera oversize de algodón premium con estampado artístico del escudo tucumano. Una declaración de identidad, de lucha y de amor por Tucumán. Hecha con algodón de primera calidad, suave, duradera y con un ajuste cómodo que abraza todos los cuerpos.',
  '/images/remera-frente.jpg',
  '/images/remera-espalda.jpg',
  10, 15, 15, 10,
  0,
  true
),
(
  'Los Siete Pecados Argentinos - Juan Grabois',
  'siete-pecados-argentinos-grabois',
  15000.00,
  20000.00,
  'Ensayo político donde Juan Grabois analiza las problemáticas estructurales de la Argentina y propone caminos orientados a la justicia social y el bien común.',
  '/images/libro_grabois_pecados.jpg',
  NULL,
  0, 0, 0, 0,
  20,
  false
),
(
  'Argentina Humana - Juan Grabois',
  'argentina-humana-grabois',
  35000.00,
  40000.00,
  'Obra fundamental que expone la visión de una Argentina desde la dignidad, con desarrollo humano integral y protagonismo de los movimientos populares.',
  '/images/libro_grabois_argentina.jpg',
  NULL,
  0, 0, 0, 0,
  15,
  false
),
(
  'Pin Argentina Humana (AH)',
  'pin-argentina-humana-ah',
  8000.00,
  12000.00,
  'Pin metálico esmaltado de máxima calidad. Llevá la militancia y tus valores siempre con vos. Perfecto para la mochila, campera o morral.',
  '/images/pin_argentina_humana.jpg',
  NULL,
  0, 0, 0, 0,
  50,
  false
);

-- Ver los datos insertados
SELECT * FROM products;
