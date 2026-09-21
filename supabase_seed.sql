-- ==========================================================
-- SIERRAS CHICAS DIGITAL - SEED DATA (DATOS INICIALES)
-- ==========================================================

-- 1. LOCALIDADES DE SIERRAS CHICAS
INSERT INTO locations (id, name, slug, postal_code, latitude, longitude) VALUES
('11111111-1111-1111-1111-111111111101', 'Río Ceballos', 'rio-ceballos', '5111', -31.1714, -64.3161),
('11111111-1111-1111-1111-111111111102', 'Unquillo', 'unquillo', '5109', -31.2333, -64.3167),
('11111111-1111-1111-1111-111111111103', 'Mendiolaza', 'mendiolaza', '5107', -31.2667, -64.3000),
('11111111-1111-1111-1111-111111111104', 'Villa Allende', 'villa-allende', '5105', -31.2944, -64.2961),
('11111111-1111-1111-1111-111111111105', 'Salsipuedes', 'salsipuedes', '5113', -31.1350, -64.2950),
('11111111-1111-1111-1111-111111111106', 'La Granja / Agua de Oro', 'la-granja-agua-de-oro', '5115', -31.0833, -64.2667),
('11111111-1111-1111-1111-111111111107', 'La Calera', 'la-calera', '5151', -31.3439, -64.3353)
ON CONFLICT (slug) DO NOTHING;

-- 2. CATEGORÍAS
INSERT INTO categories (id, name, slug, icon, emoji, color_hex, sort_order) VALUES
('22222222-2222-2222-2222-222222222201', 'Gastronomía', 'gastronomia', 'restaurant', '🍕', '#e11d48', 1),
('22222222-2222-2222-2222-222222222202', 'Cabañas & Alojamiento', 'alojamiento', 'holiday_village', '🏡', '#0284c7', 2),
('22222222-2222-2222-2222-222222222203', 'Servicios Profesionales', 'servicios-profesionales', 'handyman', '🔧', '#d97706', 3),
('22222222-2222-2222-2222-222222222204', 'Salud & Bienestar', 'salud-bienestar', 'spa', '🩺', '#10b981', 4),
('22222222-2222-2222-2222-222222222205', 'Comercios & Almacenes', 'comercios-almacenes', 'storefront', '🛍️', '#8b5cf6', 5),
('22222222-2222-2222-2222-222222222206', 'Turismo & Excursiones', 'turismo-excursiones', 'hiking', '🎒', '#059669', 6)
ON CONFLICT (slug) DO NOTHING;

-- 3. PLANES SAAS
INSERT INTO plans (id, name, slug, price_ars, billing_period, max_products, is_featured) VALUES
('33333333-3333-3333-3333-333333333301', 'Comercio Básico', 'basico', 9900.00, 'monthly', 20, false),
('33333333-3333-3333-3333-333333333302', 'Negocio Pro & POS', 'pro', 19900.00, 'monthly', 150, true),
('33333333-3333-3333-3333-333333333303', 'Valle Destacado VIP', 'vip', 34900.00, 'monthly', 500, false)
ON CONFLICT (slug) DO NOTHING;

-- 4. COMERCIOS INICIALES
INSERT INTO businesses (
    id, name, slug, tagline, description, category_id, location_id,
    address, phone, whatsapp, email, opening_hours, business_mode,
    logo_url, cover_url, is_open, is_verified, is_featured, status, plan_id
) VALUES
(
    '44444444-4444-4444-4444-444444444401',
    'Café de las Sierras & Bakery',
    'cafe-de-las-sierras',
    'Cafetería de especialidad, pastelería artesanal y brunch serrano.',
    'El mejor café de especialidad de Río Ceballos. Elaboramos panes de masa madre y pastelería fresca todos los días en un entorno natural único.',
    '22222222-2222-2222-2222-222222222201',
    '11111111-1111-1111-1111-111111111101',
    'Av. San Martín 4520, Río Ceballos',
    '+5493543123456',
    '+5493543123456',
    'contacto@cafesierras.com.ar',
    'Mar a Dom 08:30 - 20:30',
    'tienda',
    'https://images.unsplash.com/photo-1554118811-1e0d58224f24?w=200&auto=format&fit=crop&q=80',
    'https://images.unsplash.com/photo-1501339847302-ac426a4a7cbb?w=1200&auto=format&fit=crop&q=80',
    true, true, true, 'active',
    '33333333-3333-3333-3333-333333333302'
),
(
    '44444444-4444-4444-4444-444444444402',
    'Electro Sierras · Instalaciones & Redes',
    'electro-sierras-electricista',
    'Electricista matriculado ERSeP, energía solar y tableros trifásicos.',
    'Servicio técnico eléctrico profesional para hogares, cabañas e industrias en todo el corredor de Sierras Chicas. Urgencias 24hs.',
    '22222222-2222-2222-2222-222222222203',
    '11111111-1111-1111-1111-111111111102',
    'Av. San Martín 1800, Unquillo',
    '+5493517654321',
    '+5493517654321',
    'electrosierras@gmail.com',
    'Lun a Sáb 08:00 - 19:00 (Guardias 24hs)',
    'servicios',
    'https://images.unsplash.com/photo-1621905251189-08b45d6a269e?w=200&auto=format&fit=crop&q=80',
    'https://images.unsplash.com/photo-1581092160607-ee22621dd758?w=1200&auto=format&fit=crop&q=80',
    true, true, true, 'active',
    '33333333-3333-3333-3333-333333333301'
),
(
    '44444444-4444-4444-4444-444444444403',
    'Pizzería La Quebrada Artesanal',
    'la-quebrada-pizzeria',
    'Pizzas a la leña, empanadas criollas y cerveza tirada artesanal.',
    'Pizzas elaboradas con masa de fermentación lenta de 48hs e ingredientes de productores locales de Córdoba.',
    '22222222-2222-2222-2222-222222222201',
    '11111111-1111-1111-1111-111111111101',
    'Ruta E-53 Km 22, Río Ceballos',
    '+5493543987654',
    '+5493543987654',
    'pedidos@laquebrada.com',
    'Mié a Dom 19:30 - 00:30',
    'tienda',
    'https://images.unsplash.com/photo-1513104890138-7c749659a591?w=200&auto=format&fit=crop&q=80',
    'https://images.unsplash.com/photo-1574071318508-1cdbab80d002?w=1200&auto=format&fit=crop&q=80',
    true, true, false, 'active',
    '33333333-3333-3333-3333-333333333302'
),
(
    '44444444-4444-4444-4444-444444444404',
    'Cabañas El Remanso Serrano',
    'cabanas-el-remanso',
    'Descanso premium con vista panorámica, piscina y bajada al río.',
    'Cabañas totalmente equipadas para 2 a 6 personas con deck privado, asador individual y desayuno serrano incluido.',
    '22222222-2222-2222-2222-222222222202',
    '11111111-1111-1111-1111-111111111105',
    'Camino del Dique 340, Salsipuedes',
    '+5493514433221',
    '+5493514433221',
    'reservas@elremansoserrano.com',
    'Atención 24hs',
    'servicios',
    'https://images.unsplash.com/photo-1587061949409-02df41d5e562?w=200&auto=format&fit=crop&q=80',
    'https://images.unsplash.com/photo-1542314831-068cd1dbfeeb?w=1200&auto=format&fit=crop&q=80',
    true, true, true, 'active',
    '33333333-3333-3333-3333-333333333303'
),
(
    '44444444-4444-4444-4444-444444444405',
    'Ferretería & Corralón Sierras',
    'ferreteria-corralon-sierras',
    'Materiales de construcción, electricidad, plomería y herramientas.',
    'Todo para tu hogar y obra en Mendiolaza y Villa Allende. Envíos en el día en todo el valle.',
    '22222222-2222-2222-2222-222222222205',
    '11111111-1111-1111-1111-111111111103',
    'Av. Tissera 2100, Mendiolaza',
    '+5493518899001',
    '+5493518899001',
    'ventas@ferreteriasierras.com',
    'Lun a Sáb 08:00 - 18:30',
    'catalogo',
    'https://images.unsplash.com/photo-1581783342308-f792dbdd27c5?w=200&auto=format&fit=crop&q=80',
    'https://images.unsplash.com/photo-1504917599217-d4dc5ebe6122?w=1200&auto=format&fit=crop&q=80',
    true, true, false, 'active',
    '33333333-3333-3333-3333-333333333301'
)
ON CONFLICT (slug) DO NOTHING;

-- 5. CATÁLOGO DE PRODUCTOS (CAFÉ DE LAS SIERRAS)
INSERT INTO products (id, business_id, name, description, category_name, price, compare_at_price, stock, in_stock, is_active, sort_order) VALUES
('55555555-5555-5555-5555-555555555501', '44444444-4444-4444-4444-444444444401', 'Flat White Doble Shot', 'Doble espresso con leche vaporizada sedosa y arte latte.', 'Cafetería', 3200.00, 3500.00, 50, true, true, 1),
('55555555-5555-5555-5555-555555555502', '44444444-4444-4444-4444-444444444401', 'Croissant de Almendras', 'Hojaldre artesanal relleno de crema frangipane y almendras tostadas.', 'Pastelería', 3800.00, NULL, 30, true, true, 2),
('55555555-5555-5555-5555-555555555503', '44444444-4444-4444-4444-444444444401', 'Tostón Avocado & Huevo Poché', 'Pan de masa madre con palta fresca, semillas y huevo de campo.', 'Brunch & Salado', 6500.00, 7200.00, 25, true, true, 3),
('55555555-5555-5555-5555-555555555504', '44444444-4444-4444-4444-444444444401', 'Cheesecake Frutos Rojos', 'Clásico cheesecake estilo NY con salsa artesanal de moras de las sierras.', 'Pastelería', 4900.00, NULL, 15, true, true, 4),
('55555555-5555-5555-5555-555555555505', '44444444-4444-4444-4444-444444444401', 'Limonada Serrano & Menta', 'Limonada natural con jengibre fresco y menta de nuestra huerta.', 'Bebidas Frías', 2800.00, NULL, 40, true, true, 5)
ON CONFLICT DO NOTHING;

-- 6. PEDIDOS DE EJEMPLO PARA COMANDAS POS
INSERT INTO orders (id, business_id, order_number, customer_name, customer_phone, customer_address, delivery_method, payment_method, status, subtotal, delivery_fee, total) VALUES
('66666666-6666-6666-6666-666666666601', '44444444-4444-4444-4444-444444444401', 'ORD-1082', 'Sofía Martínez', '+5493516554433', 'Los Aromos 240, Río Ceballos', 'delivery', 'mercadopago', 'pending', 10300.00, 1200.00, 11500.00),
('66666666-6666-6666-6666-666666666602', '44444444-4444-4444-4444-444444444401', 'ORD-1081', 'Gonzalo Romero', '+5493543887766', 'Mesa 4 (Salón)', 'dine_in', 'efectivo', 'preparing', 7000.00, 0.00, 7000.00),
('66666666-6666-6666-6666-666666666603', '44444444-4444-4444-4444-444444444401', 'ORD-1080', 'Lucía Pereyra', '+5493512233445', 'Retira por local', 'takeaway', 'transferencia', 'ready', 4900.00, 0.00, 4900.00),
('66666666-6666-6666-6666-666666666604', '44444444-4444-4444-4444-444444444401', 'ORD-1079', 'Esteban Morales', '+5493519988776', 'Av. San Martín 1200', 'delivery', 'mercadopago', 'delivered', 14200.00, 1200.00, 15400.00)
ON CONFLICT DO NOTHING;

INSERT INTO order_items (order_id, product_name, quantity, unit_price, total_price) VALUES
('66666666-6666-6666-6666-666666666601', 'Flat White Doble Shot', 2, 3200.00, 6400.00),
('66666666-6666-6666-6666-666666666601', 'Croissant de Almendras', 1, 3900.00, 3900.00),
('66666666-6666-6666-6666-666666666602', 'Tostón Avocado & Huevo Poché', 1, 6500.00, 6500.00),
('66666666-6666-6666-6666-666666666603', 'Cheesecake Frutos Rojos', 1, 4900.00, 4900.00)
ON CONFLICT DO NOTHING;

-- 7. CONFIGURACIÓN INICIAL
INSERT INTO platform_settings (id, platform_name, tagline, contact_whatsapp) VALUES
('default', 'Sierras Chicas Digital', 'El portal y directorio comercial de Sierras Chicas', '+5493512345678')
ON CONFLICT (id) DO NOTHING;
