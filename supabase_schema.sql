-- ==========================================================
-- SIERRAS CHICAS DIGITAL - SUPABASE DATABASE SCHEMA
-- ==========================================================

-- Habilitar extensión UUID
CREATE EXTENSION IF NOT EXISTS "uuid-ossp";

-- 1. LOCALIDADES DE SIERRAS CHICAS
CREATE TABLE IF NOT EXISTS locations (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    name VARCHAR(100) NOT NULL UNIQUE,
    slug VARCHAR(100) NOT NULL UNIQUE,
    postal_code VARCHAR(20),
    latitude NUMERIC(10, 8),
    longitude NUMERIC(11, 8),
    is_active BOOLEAN DEFAULT TRUE,
    created_at TIMESTAMPTZ DEFAULT NOW()
);

-- 2. CATEGORÍAS & RUBROS
CREATE TABLE IF NOT EXISTS categories (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    name VARCHAR(100) NOT NULL,
    slug VARCHAR(100) NOT NULL UNIQUE,
    icon VARCHAR(50) DEFAULT 'category',
    emoji VARCHAR(10) DEFAULT '✨',
    color_hex VARCHAR(20) DEFAULT '#00685f',
    sort_order INT DEFAULT 0,
    is_active BOOLEAN DEFAULT TRUE,
    created_at TIMESTAMPTZ DEFAULT NOW()
);

CREATE TABLE IF NOT EXISTS subcategories (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    category_id UUID NOT NULL REFERENCES categories(id) ON DELETE CASCADE,
    name VARCHAR(100) NOT NULL,
    slug VARCHAR(100) NOT NULL UNIQUE,
    sort_order INT DEFAULT 0,
    is_active BOOLEAN DEFAULT TRUE,
    created_at TIMESTAMPTZ DEFAULT NOW()
);

-- 3. PLANES SAAS
CREATE TABLE IF NOT EXISTS plans (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    name VARCHAR(100) NOT NULL,
    slug VARCHAR(50) NOT NULL UNIQUE,
    price_ars NUMERIC(12, 2) NOT NULL DEFAULT 0.00,
    billing_period VARCHAR(20) DEFAULT 'monthly', -- 'monthly', 'annual'
    features JSONB DEFAULT '[]'::JSONB,
    max_products INT DEFAULT 50,
    is_featured BOOLEAN DEFAULT FALSE,
    is_active BOOLEAN DEFAULT TRUE,
    created_at TIMESTAMPTZ DEFAULT NOW()
);

-- 4. COMERCIOS & PRESTADORES
CREATE TABLE IF NOT EXISTS businesses (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    user_id UUID, -- Opcional link con auth.users
    name VARCHAR(200) NOT NULL,
    slug VARCHAR(200) NOT NULL UNIQUE,
    tagline VARCHAR(255),
    description TEXT,
    category_id UUID REFERENCES categories(id) ON DELETE SET NULL,
    subcategory_id UUID REFERENCES subcategories(id) ON DELETE SET NULL,
    location_id UUID REFERENCES locations(id) ON DELETE SET NULL,
    address VARCHAR(255),
    phone VARCHAR(50),
    whatsapp VARCHAR(50) NOT NULL,
    email VARCHAR(150),
    instagram VARCHAR(100),
    facebook VARCHAR(100),
    website VARCHAR(255),
    opening_hours VARCHAR(255) DEFAULT 'Lun a Sáb 09:00 - 20:00',
    business_mode VARCHAR(30) DEFAULT 'tienda', -- 'tienda', 'servicios', 'catalogo'
    logo_url TEXT,
    cover_url TEXT,
    is_open BOOLEAN DEFAULT TRUE,
    is_verified BOOLEAN DEFAULT TRUE,
    is_featured BOOLEAN DEFAULT FALSE,
    status VARCHAR(30) DEFAULT 'active', -- 'active', 'pending', 'suspended'
    plan_id UUID REFERENCES plans(id) ON DELETE SET NULL,
    latitude NUMERIC(10, 8),
    longitude NUMERIC(11, 8),
    created_at TIMESTAMPTZ DEFAULT NOW(),
    updated_at TIMESTAMPTZ DEFAULT NOW()
);

-- 5. CATÁLOGO DE PRODUCTOS / SERVICIOS
CREATE TABLE IF NOT EXISTS products (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    business_id UUID NOT NULL REFERENCES businesses(id) ON DELETE CASCADE,
    name VARCHAR(200) NOT NULL,
    description TEXT,
    category_name VARCHAR(100) DEFAULT 'General',
    price NUMERIC(12, 2) NOT NULL DEFAULT 0.00,
    compare_at_price NUMERIC(12, 2),
    stock INT DEFAULT 100,
    in_stock BOOLEAN DEFAULT TRUE,
    sku VARCHAR(100),
    image_url TEXT,
    is_active BOOLEAN DEFAULT TRUE,
    sort_order INT DEFAULT 0,
    created_at TIMESTAMPTZ DEFAULT NOW(),
    updated_at TIMESTAMPTZ DEFAULT NOW()
);

-- 6. PEDIDOS & COMANDAS POS (KANBAN)
CREATE TABLE IF NOT EXISTS orders (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    business_id UUID NOT NULL REFERENCES businesses(id) ON DELETE CASCADE,
    order_number VARCHAR(50) NOT NULL,
    customer_name VARCHAR(150) NOT NULL,
    customer_phone VARCHAR(50) NOT NULL,
    customer_address VARCHAR(255),
    customer_notes TEXT,
    delivery_method VARCHAR(50) DEFAULT 'delivery', -- 'delivery', 'takeaway', 'dine_in'
    table_number VARCHAR(20),
    payment_method VARCHAR(50) DEFAULT 'efectivo', -- 'efectivo', 'mercadopago', 'transferencia'
    status VARCHAR(50) DEFAULT 'pending', -- 'pending', 'preparing', 'ready', 'delivered', 'cancelled'
    subtotal NUMERIC(12, 2) NOT NULL DEFAULT 0.00,
    delivery_fee NUMERIC(12, 2) DEFAULT 0.00,
    total NUMERIC(12, 2) NOT NULL DEFAULT 0.00,
    created_at TIMESTAMPTZ DEFAULT NOW(),
    updated_at TIMESTAMPTZ DEFAULT NOW()
);

CREATE TABLE IF NOT EXISTS order_items (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    order_id UUID NOT NULL REFERENCES orders(id) ON DELETE CASCADE,
    product_id UUID REFERENCES products(id) ON DELETE SET NULL,
    product_name VARCHAR(200) NOT NULL,
    quantity INT NOT NULL DEFAULT 1,
    unit_price NUMERIC(12, 2) NOT NULL,
    total_price NUMERIC(12, 2) NOT NULL,
    notes TEXT,
    created_at TIMESTAMPTZ DEFAULT NOW()
);

-- 7. SOLICITUDES DE PRESUPUESTO / SERVICIOS
CREATE TABLE IF NOT EXISTS quotes (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    business_id UUID NOT NULL REFERENCES businesses(id) ON DELETE CASCADE,
    client_name VARCHAR(150) NOT NULL,
    client_phone VARCHAR(50) NOT NULL,
    client_location VARCHAR(100),
    service_required VARCHAR(200),
    message TEXT NOT NULL,
    status VARCHAR(50) DEFAULT 'new', -- 'new', 'contacted', 'closed'
    created_at TIMESTAMPTZ DEFAULT NOW()
);

-- 8. SUSCRIPCIONES SAAS
CREATE TABLE IF NOT EXISTS subscriptions (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    business_id UUID NOT NULL REFERENCES businesses(id) ON DELETE CASCADE,
    plan_id UUID NOT NULL REFERENCES plans(id),
    status VARCHAR(50) DEFAULT 'active', -- 'active', 'past_due', 'canceled'
    current_period_start TIMESTAMPTZ DEFAULT NOW(),
    current_period_end TIMESTAMPTZ DEFAULT (NOW() + INTERVAL '1 month'),
    amount NUMERIC(12, 2) NOT NULL,
    created_at TIMESTAMPTZ DEFAULT NOW()
);

-- 9. CONFIGURACIÓN GENERAL DE PLATAFORMA
CREATE TABLE IF NOT EXISTS platform_settings (
    id VARCHAR(50) PRIMARY KEY DEFAULT 'default',
    platform_name VARCHAR(150) DEFAULT 'Sierras Chicas Digital',
    tagline VARCHAR(255) DEFAULT 'El directorio y marketplace del valle de Sierras Chicas',
    contact_phone VARCHAR(50) DEFAULT '+5493512345678',
    contact_whatsapp VARCHAR(50) DEFAULT '+5493512345678',
    contact_email VARCHAR(150) DEFAULT 'hola@sierraschicasdigital.com',
    hero_title VARCHAR(255) DEFAULT 'Encontrá lo que buscas cerca tuyo.',
    hero_subtitle TEXT DEFAULT 'Los mejores comercios, alojamientos, servicios y gastronomía en toda la región de Sierras Chicas al instante. Directo y sin comisiones.',
    featured_banner_active BOOLEAN DEFAULT TRUE,
    featured_banner_text VARCHAR(255) DEFAULT '¡Sumá tu negocio gratis hoy mismo y comenzá a vender por WhatsApp!',
    pwa_theme_color VARCHAR(20) DEFAULT '#00685f',
    updated_at TIMESTAMPTZ DEFAULT NOW()
);

-- ==========================================================
-- ÍNDICES PARA OPTIMIZAR RENDIMIENTO
-- ==========================================================
CREATE INDEX IF NOT EXISTS idx_businesses_location ON businesses(location_id);
CREATE INDEX IF NOT EXISTS idx_businesses_category ON businesses(category_id);
CREATE INDEX IF NOT EXISTS idx_businesses_status ON businesses(status);
CREATE INDEX IF NOT EXISTS idx_businesses_slug ON businesses(slug);
CREATE INDEX IF NOT EXISTS idx_products_business ON products(business_id);
CREATE INDEX IF NOT EXISTS idx_orders_business ON orders(business_id);
CREATE INDEX IF NOT EXISTS idx_orders_status ON orders(status);

-- ==========================================================
-- POLÍTICAS ROW LEVEL SECURITY (RLS)
-- ==========================================================
ALTER TABLE locations ENABLE ROW LEVEL SECURITY;
ALTER TABLE categories ENABLE ROW LEVEL SECURITY;
ALTER TABLE subcategories ENABLE ROW LEVEL SECURITY;
ALTER TABLE plans ENABLE ROW LEVEL SECURITY;
ALTER TABLE businesses ENABLE ROW LEVEL SECURITY;
ALTER TABLE products ENABLE ROW LEVEL SECURITY;
ALTER TABLE orders ENABLE ROW LEVEL SECURITY;
ALTER TABLE order_items ENABLE ROW LEVEL SECURITY;
ALTER TABLE quotes ENABLE ROW LEVEL SECURITY;
ALTER TABLE subscriptions ENABLE ROW LEVEL SECURITY;
ALTER TABLE platform_settings ENABLE ROW LEVEL SECURITY;

-- Políticas públicas de lectura para el PWA
CREATE POLICY "Public locations read access" ON locations FOR SELECT USING (true);
CREATE POLICY "Public categories read access" ON categories FOR SELECT USING (true);
CREATE POLICY "Public subcategories read access" ON subcategories FOR SELECT USING (true);
CREATE POLICY "Public plans read access" ON plans FOR SELECT USING (true);
CREATE POLICY "Public businesses read access" ON businesses FOR SELECT USING (status = 'active');
CREATE POLICY "Public products read access" ON products FOR SELECT USING (is_active = true);
CREATE POLICY "Public platform_settings read access" ON platform_settings FOR SELECT USING (true);

-- Permitir creación pública de pedidos y cotizaciones desde el PWA
CREATE POLICY "Public insert orders" ON orders FOR INSERT WITH CHECK (true);
CREATE POLICY "Public insert order_items" ON order_items FOR INSERT WITH CHECK (true);
CREATE POLICY "Public insert quotes" ON quotes FOR INSERT WITH CHECK (true);

-- Acceso completo para usuarios autenticados / administradores
CREATE POLICY "Authenticated businesses full access" ON businesses FOR ALL TO authenticated USING (true);
CREATE POLICY "Authenticated products full access" ON products FOR ALL TO authenticated USING (true);
CREATE POLICY "Authenticated orders full access" ON orders FOR ALL TO authenticated USING (true);
CREATE POLICY "Authenticated order_items full access" ON order_items FOR ALL TO authenticated USING (true);
CREATE POLICY "Authenticated settings full access" ON platform_settings FOR ALL TO authenticated USING (true);
