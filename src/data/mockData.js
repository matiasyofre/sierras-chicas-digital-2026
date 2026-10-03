export const INITIAL_LOCATIONS = [
  { id: 'loc-1', name: 'Río Ceballos', slug: 'rio-ceballos', postal_code: '5111' },
  { id: 'loc-2', name: 'Unquillo', slug: 'unquillo', postal_code: '5109' },
  { id: 'loc-3', name: 'Mendiolaza', slug: 'mendiolaza', postal_code: '5107' },
  { id: 'loc-4', name: 'Villa Allende', slug: 'villa-allende', postal_code: '5105' },
  { id: 'loc-5', name: 'Salsipuedes', slug: 'salsipuedes', postal_code: '5113' },
  { id: 'loc-6', name: 'La Granja / Agua de Oro', slug: 'la-granja-agua-de-oro', postal_code: '5115' },
  { id: 'loc-7', name: 'La Calera', slug: 'la-calera', postal_code: '5151' }
];

export const INITIAL_CATEGORIES = [
  { 
    id: 'cat-1', 
    name: 'Gastronomía', 
    slug: 'gastronomia', 
    icon: 'restaurant', 
    emoji: '🍕', 
    color: '#e11d48',
    subcategories: ['Cafeterías & Pastelería', 'Pizzerías & Empanadas', 'Cervecerías & Bares', 'Restaurantes Serranos', 'Heladerías']
  },
  { 
    id: 'cat-2', 
    name: 'Cabañas & Alojamiento', 
    slug: 'alojamiento', 
    icon: 'holiday_village', 
    emoji: '🏡', 
    color: '#0284c7',
    subcategories: ['Cabañas con Pileta', 'Posadas & Hosterías', 'Casas de Campo', 'Camping & Glamping']
  },
  { 
    id: 'cat-3', 
    name: 'Servicios Profesionales', 
    slug: 'servicios-profesionales', 
    icon: 'handyman', 
    emoji: '🔧', 
    color: '#d97706',
    subcategories: ['Electricistas Matriculados', 'Gasistas & Plomería', 'Informática & Redes', 'Construcción & Pintura', 'Jardinería & Piletas']
  },
  { 
    id: 'cat-4', 
    name: 'Salud & Bienestar', 
    slug: 'salud-bienestar', 
    icon: 'spa', 
    emoji: '🩺', 
    color: '#10b981',
    subcategories: ['Farmacias', 'Consultorios & Odontología', 'Centros de Estética', 'Yoga & Terapias Holísticas']
  },
  { 
    id: 'cat-5', 
    name: 'Comercios & Almacenes', 
    slug: 'comercios-almacenes', 
    icon: 'storefront', 
    emoji: '🛍️', 
    color: '#8b5cf6',
    subcategories: ['Ferreterías & Corralones', 'Dietéticas & Orgánicos', 'Indumentaria & Calzado', 'Verdulerías & Carnicerías', 'Librerías & Regalerías']
  },
  { 
    id: 'cat-6', 
    name: 'Turismo & Excursiones', 
    slug: 'turismo-excursiones', 
    icon: 'hiking', 
    emoji: '🎒', 
    color: '#059669',
    subcategories: ['Trekking & Senderismo', 'Cabalgatas Guiadas', 'Artesanías Serranas', 'Alquiler de Bicis']
  }
];

export const INITIAL_TAGS = [
  { id: 'tag-1', label: 'Pet Friendly', emoji: '🐾', color: 'bg-emerald-100 text-emerald-800 border-emerald-300' },
  { id: 'tag-2', label: 'WiFi 5G', emoji: '📶', color: 'bg-blue-100 text-blue-800 border-blue-300' },
  { id: 'tag-3', label: 'Masa Madre', emoji: '🥖', color: 'bg-amber-100 text-amber-800 border-amber-300' },
  { id: 'tag-4', label: 'Urgencias 24hs', emoji: '🚨', color: 'bg-rose-100 text-rose-800 border-rose-300' },
  { id: 'tag-5', label: 'Matriculado ERSeP', emoji: '📜', color: 'bg-indigo-100 text-indigo-800 border-indigo-300' },
  { id: 'tag-6', label: 'Sin TACC / Apto Celíaco', emoji: '🌾', color: 'bg-teal-100 text-teal-800 border-teal-300' },
  { id: 'tag-7', label: 'Descuento Efectivo', emoji: '💵', color: 'bg-emerald-100 text-emerald-800 border-emerald-300' },
  { id: 'tag-8', label: 'Envíos sin Cargo', emoji: '🛵', color: 'bg-purple-100 text-purple-800 border-purple-300' }
];

export const INITIAL_SIMULATOR_LEVELS = [
  {
    id: 'inicial',
    levelTag: 'NIVEL 1: PRESENCIA BÁSICA',
    title: 'Profesionales & Avisos',
    description: 'Aparición en el directorio, SEO local y botón directo a WhatsApp.',
    planRef: 'plan-1'
  },
  {
    id: 'pro',
    levelTag: 'NIVEL 2: COMERCIO ACTIVO (RECOMENDADO)',
    title: 'Góndola & Pedidos Online',
    description: 'Carta/catálogo digital con carrito de compras, comandas POS y pedidos por WhatsApp.',
    planRef: 'plan-2'
  },
  {
    id: 'full',
    levelTag: 'NIVEL 3: MÁXIMA TRACCIÓN',
    title: 'Multi-Sucursal & Banner Destacado',
    description: 'Posicionamiento VIP prioritario en búsquedas, pauta en carrusel y asesoría.',
    planRef: 'plan-3'
  }
];

export const INITIAL_SPONSORED_BANNERS = [
  {
    id: 'ban-1',
    title: 'Café de las Sierras · Brunch & Pastelería',
    subtitle: 'Vení a disfrutar de café de especialidad y masas madre en Río Ceballos.',
    badge: 'Pauta Destacada',
    tag: 'Gastronomía Serrana',
    imageUrl: 'https://images.unsplash.com/photo-1501339847302-ac426a4a7cbb?w=1200&auto=format&fit=crop&q=80',
    link: '/tienda/cafe-de-las-sierras',
    ctaText: 'Ver Tienda Online',
    merchantName: 'Café de las Sierras',
    location: 'Río Ceballos'
  },
  {
    id: 'ban-2',
    title: 'Cabañas El Remanso Serrano',
    subtitle: 'Escapadas de fin de semana con piscina climatizada y vista panorámica.',
    badge: 'Espacio Exclusivo VIP',
    tag: 'Turismo & Relax',
    imageUrl: 'https://images.unsplash.com/photo-1542314831-068cd1dbfeeb?w=1200&auto=format&fit=crop&q=80',
    link: '/comercio/cabanas-el-remanso',
    ctaText: 'Consultar Fechas & Tarifas',
    merchantName: 'Cabañas El Remanso',
    location: 'Salsipuedes'
  },
  {
    id: 'ban-3',
    title: 'Electro Sierras · Instalaciones Matriculadas',
    subtitle: 'Urgencias 24hs, instalación de energía solar y protocolos ERSeP.',
    badge: 'Profesional Verificado',
    tag: 'Servicios Técnicos',
    imageUrl: 'https://images.unsplash.com/photo-1581092160607-ee22621dd758?w=1200&auto=format&fit=crop&q=80',
    link: '/comercio/electro-sierras-electricista',
    ctaText: 'Pedir Presupuesto WhatsApp',
    merchantName: 'Electro Sierras',
    location: 'Unquillo'
  }
];

export const INITIAL_SETTINGS = {
  platformName: 'Sierras Chicas Digital',
  tagline: 'Directorio y Ecosistema Comercial de las Sierras Chicas de Córdoba',
  supportWhatsApp: '5493543123456',
  supportWhatsapp: '5493543123456',
  supportEmail: 'contacto@sierraschicasdigital.com',
  maintenanceMode: false,
  allowNewRegistrations: true,
  mercadoPagoPublicKey: 'APP_USR-789012-TEST-KEY',
  mercadoPagoAccessToken: 'APP_USR-123456-SEC-TOKEN',
  commissionPercentage: 0,
  currency: 'ARS',
  totalSiteVisits: 14250,
  simulatorLevels: INITIAL_SIMULATOR_LEVELS
};

export const INITIAL_BUSINESSES = [
  {
    id: 'biz-1',
    name: 'Café de las Sierras & Bakery',
    slug: 'cafe-de-las-sierras',
    tagline: 'Cafetería de especialidad, pastelería artesanal y brunch serrano.',
    description: 'El mejor café de especialidad de Río Ceballos. Elaboramos panes de masa madre y pastelería fresca todos los días en un entorno natural único.',
    categoryId: 'cat-1',
    categoryName: 'Gastronomía',
    subcategory: 'Cafeterías & Pastelería',
    locationId: 'loc-1',
    locationName: 'Río Ceballos',
    address: 'Av. San Martín 4520, Río Ceballos',
    phone: '+5493543123456',
    whatsapp: '5493543123456',
    email: 'contacto@cafesierras.com.ar',
    instagram: '@cafesierras.cba',
    openingHours: 'Mar a Dom 08:30 - 20:30',
    businessMode: 'tienda', // tienda, servicios, aviso
    logoUrl: 'https://images.unsplash.com/photo-1554118811-1e0d58224f24?w=200&auto=format&fit=crop&q=80',
    coverUrl: 'https://images.unsplash.com/photo-1501339847302-ac426a4a7cbb?w=1200&auto=format&fit=crop&q=80',
    gallery: [
      'https://images.unsplash.com/photo-1501339847302-ac426a4a7cbb?w=800&auto=format&fit=crop&q=80',
      'https://images.unsplash.com/photo-1554118811-1e0d58224f24?w=800&auto=format&fit=crop&q=80',
      'https://images.unsplash.com/photo-1509042239860-f550ce710b93?w=800&auto=format&fit=crop&q=80'
    ],
    videoUrl: 'https://www.youtube.com/watch?v=dQw4w9WgXcQ',
    tags: ['Pet Friendly', 'WiFi 5G', 'Masa Madre'],
    deliveryZones: [
      { id: 'dz-1', name: 'Centro y Casco Urbano (Río Ceballos)', fee: 1200 },
      { id: 'dz-2', name: 'Barrios Altos / Los Quebrachitos / Dique', fee: 2000 },
      { id: 'dz-3', name: 'Localidades Vecinas (Unquillo / Salsipuedes)', fee: 3200 }
    ],
    visitsCount: 1420,
    isOpen: true,
    isVerified: true,
    isFeatured: true,
    rating: 4.9,
    reviewCount: 128,
    status: 'active',
    planId: 'plan-2',
    planName: 'Negocio Pro & POS',
    priceArs: 19900
  },
  {
    id: 'biz-2',
    name: 'Electro Sierras · Instalaciones & Redes',
    slug: 'electro-sierras-electricista',
    tagline: 'Electricista matriculado ERSeP, energía solar y tableros trifásicos.',
    description: 'Servicio técnico eléctrico profesional para hogares, cabañas e industrias en todo el corredor de Sierras Chicas. Urgencias 24hs.',
    categoryId: 'cat-3',
    categoryName: 'Servicios Profesionales',
    locationId: 'loc-2',
    locationName: 'Unquillo',
    address: 'Av. San Martín 1800, Unquillo',
    phone: '+5493517654321',
    whatsapp: '5493517654321',
    email: 'electrosierras@gmail.com',
    instagram: '@electrosierras.cba',
    openingHours: 'Lun a Sáb 08:00 - 19:00 (Guardias 24hs)',
    businessMode: 'servicios',
    logoUrl: 'https://images.unsplash.com/photo-1621905251189-08b45d6a269e?w=200&auto=format&fit=crop&q=80',
    coverUrl: 'https://images.unsplash.com/photo-1581092160607-ee22621dd758?w=1200&auto=format&fit=crop&q=80',
    gallery: [
      'https://images.unsplash.com/photo-1581092160607-ee22621dd758?w=800&auto=format&fit=crop&q=80',
      'https://images.unsplash.com/photo-1621905251189-08b45d6a269e?w=800&auto=format&fit=crop&q=80'
    ],
    videoUrl: '',
    tags: ['Matriculado ERSeP', 'Urgencias 24hs', 'Descuento Efectivo'],
    deliveryZones: [
      { id: 'dz-1', name: 'Visita Técnica Zona Unquillo / Mendiolaza', fee: 2500 },
      { id: 'dz-2', name: 'Visita Técnica Todo Sierras Chicas', fee: 4000 }
    ],
    isOpen: true,
    isVerified: true,
    isFeatured: true,
    rating: 5.0,
    reviewCount: 64,
    status: 'active',
    planId: 'plan-1',
    planName: 'Comercio Básico',
    priceArs: 9900
  },
  {
    id: 'biz-3',
    name: 'Pizzería La Quebrada Artesanal',
    slug: 'la-quebrada-pizzeria',
    tagline: 'Pizzas a la leña, empanadas criollas y cerveza tirada artesanal.',
    description: 'Pizzas elaboradas con masa de fermentación lenta de 48hs e ingredientes de productores locales de Córdoba.',
    categoryId: 'cat-1',
    categoryName: 'Gastronomía',
    locationId: 'loc-1',
    locationName: 'Río Ceballos',
    address: 'Ruta E-53 Km 22, Río Ceballos',
    phone: '+5493543987654',
    whatsapp: '5493543987654',
    email: 'pedidos@laquebrada.com',
    instagram: '@laquebrada.pizza',
    openingHours: 'Mié a Dom 19:30 - 00:30',
    businessMode: 'tienda',
    logoUrl: 'https://images.unsplash.com/photo-1513104890138-7c749659a591?w=200&auto=format&fit=crop&q=80',
    coverUrl: 'https://images.unsplash.com/photo-1574071318508-1cdbab80d002?w=1200&auto=format&fit=crop&q=80',
    gallery: [
      'https://images.unsplash.com/photo-1574071318508-1cdbab80d002?w=800&auto=format&fit=crop&q=80'
    ],
    tags: ['Masa Madre', 'Envíos sin Cargo'],
    deliveryZones: [
      { id: 'dz-1', name: 'Radio Urbano Río Ceballos', fee: 1000 },
      { id: 'dz-2', name: 'Zona Dique / Salsipuedes', fee: 2200 }
    ],
    isOpen: true,
    isVerified: true,
    isFeatured: false,
    rating: 4.8,
    reviewCount: 92,
    status: 'active',
    planId: 'plan-2',
    planName: 'Negocio Pro & POS',
    priceArs: 19900
  },
  {
    id: 'biz-4',
    name: 'Cabañas El Remanso Serrano',
    slug: 'cabanas-el-remanso',
    tagline: 'Descanso premium con vista panorámica, piscina y bajada al río.',
    description: 'Cabañas totalmente equipadas para 2 a 6 personas con deck privado, asador individual y desayuno serrano incluido.',
    categoryId: 'cat-2',
    categoryName: 'Cabañas & Alojamiento',
    locationId: 'loc-5',
    locationName: 'Salsipuedes',
    address: 'Camino del Dique 340, Salsipuedes',
    phone: '+5493514433221',
    whatsapp: '5493514433221',
    email: 'reservas@elremansoserrano.com',
    instagram: '@elremanso.salsipuedes',
    openingHours: 'Atención y Recepción 24hs',
    businessMode: 'servicios',
    logoUrl: 'https://images.unsplash.com/photo-1587061949409-02df41d5e562?w=200&auto=format&fit=crop&q=80',
    coverUrl: 'https://images.unsplash.com/photo-1542314831-068cd1dbfeeb?w=1200&auto=format&fit=crop&q=80',
    gallery: [
      'https://images.unsplash.com/photo-1542314831-068cd1dbfeeb?w=800&auto=format&fit=crop&q=80',
      'https://images.unsplash.com/photo-1587061949409-02df41d5e562?w=800&auto=format&fit=crop&q=80'
    ],
    tags: ['Pet Friendly', 'WiFi 5G'],
    deliveryZones: [],
    isOpen: true,
    isVerified: true,
    isFeatured: true,
    rating: 4.9,
    reviewCount: 215,
    status: 'active',
    planId: 'plan-3',
    planName: 'Valle Destacado VIP',
    priceArs: 34900
  },
  {
    id: 'biz-5',
    name: 'Ferretería & Corralón Sierras',
    slug: 'ferreteria-corralon-sierras',
    tagline: 'Materiales de construcción, electricidad, plomería y herramientas.',
    description: 'Todo para tu hogar y obra en Mendiolaza y Villa Allende. Envíos en el día en todo el corredor de Sierras Chicas.',
    categoryId: 'cat-5',
    categoryName: 'Comercios & Almacenes',
    locationId: 'loc-3',
    locationName: 'Mendiolaza',
    address: 'Av. Tissera 2100, Mendiolaza',
    phone: '+5493518899001',
    whatsapp: '5493518899001',
    email: 'ventas@ferreteriasierras.com',
    instagram: '@ferreteria.sierras',
    openingHours: 'Lun a Sáb 08:00 - 18:30',
    businessMode: 'aviso',
    logoUrl: 'https://images.unsplash.com/photo-1581783342308-f792dbdd27c5?w=200&auto=format&fit=crop&q=80',
    coverUrl: 'https://images.unsplash.com/photo-1504917599217-d4dc5ebe6122?w=1200&auto=format&fit=crop&q=80',
    gallery: [
      'https://images.unsplash.com/photo-1504917599217-d4dc5ebe6122?w=800&auto=format&fit=crop&q=80'
    ],
    tags: ['Descuento Efectivo'],
    deliveryZones: [
      { id: 'dz-1', name: 'Flete Materiales Mendiolaza / Villa Allende', fee: 3500 },
      { id: 'dz-2', name: 'Flete Sierras Chicas Extendido', fee: 6000 }
    ],
    isOpen: true,
    isVerified: true,
    isFeatured: false,
    rating: 4.7,
    reviewCount: 45,
    status: 'active',
    planId: 'plan-1',
    planName: 'Comercio Básico',
    priceArs: 9900
  },
  {
    id: 'biz-6',
    name: 'HyFact Software & Instalaciones',
    slug: 'hyfact-software-instalaciones',
    tagline: 'Software de gestión, cableado estructurado y soporte informático en Sierras Chicas.',
    description: 'Soluciones integrales de software comercial, redes y soporte técnico para locales, cabañas y profesionales del valle. Atención personalizada y presupuestos sin cargo.',
    categoryId: 'cat-3',
    categoryName: 'Servicios Profesionales',
    locationId: 'loc-1',
    locationName: 'Río Ceballos',
    address: 'Av. San Martín 3200, Río Ceballos',
    phone: '+5493543456789',
    whatsapp: '5493543456789',
    email: 'contacto@hyfact.com.ar',
    instagram: '@hyfact.software',
    openingHours: 'Lun a Vie 08:30 - 18:00',
    businessMode: 'aviso',
    logoUrl: 'https://images.unsplash.com/photo-1551288049-bebda4e38f71?w=200&auto=format&fit=crop&q=80',
    coverUrl: 'https://images.unsplash.com/photo-1581092160607-ee22621dd758?w=1200&auto=format&fit=crop&q=80',
    gallery: [
      'https://images.unsplash.com/photo-1581092160607-ee22621dd758?w=800&auto=format&fit=crop&q=80'
    ],
    tags: ['Urgencias 24hs'],
    deliveryZones: [],
    isOpen: true,
    isVerified: true,
    isFeatured: true,
    rating: 4.9,
    reviewCount: 18,
    status: 'active',
    planId: 'plan-1',
    planName: 'Comercio Básico',
    priceArs: 9900
  }
];

export const INITIAL_PRODUCTS = [
  // Café de las Sierras
  {
    id: 'prod-1',
    businessId: 'biz-1',
    name: 'Flat White Doble Shot',
    description: 'Doble espresso con leche vaporizada sedosa y arte latte.',
    categoryName: 'Cafetería de Especialidad',
    price: 3200,
    compareAtPrice: 3500,
    stock: 50,
    inStock: true,
    isActive: true,
    imageUrl: 'https://images.unsplash.com/photo-1577968897966-3d4325b36b61?w=400&auto=format&fit=crop&q=80'
  },
  {
    id: 'prod-2',
    businessId: 'biz-1',
    name: 'Croissant de Almendras',
    description: 'Hojaldre artesanal relleno de crema frangipane y almendras tostadas.',
    categoryName: 'Pastelería Artesanal',
    price: 3900,
    compareAtPrice: null,
    stock: 30,
    inStock: true,
    isActive: true,
    imageUrl: 'https://images.unsplash.com/photo-1555507036-ab1f4038808a?w=400&auto=format&fit=crop&q=80'
  },
  {
    id: 'prod-3',
    businessId: 'biz-1',
    name: 'Tostón Avocado & Huevo Poché',
    description: 'Pan de masa madre con palta fresca, semillas y huevo de campo.',
    categoryName: 'Brunch & Salado',
    price: 6500,
    compareAtPrice: 7200,
    stock: 25,
    inStock: true,
    isActive: true,
    imageUrl: 'https://images.unsplash.com/photo-1525351484163-7529414344d8?w=400&auto=format&fit=crop&q=80'
  },
  {
    id: 'prod-4',
    businessId: 'biz-1',
    name: 'Cheesecake Frutos Rojos',
    description: 'Clásico cheesecake estilo NY con salsa artesanal de moras de las sierras.',
    categoryName: 'Pastelería Artesanal',
    price: 4900,
    compareAtPrice: null,
    stock: 15,
    inStock: true,
    isActive: true,
    imageUrl: 'https://images.unsplash.com/photo-1533134242443-d4fd215305ad?w=400&auto=format&fit=crop&q=80'
  },
  {
    id: 'prod-5',
    businessId: 'biz-1',
    name: 'Limonada Serrano & Menta',
    description: 'Limonada natural con jengibre fresco y menta de nuestra huerta.',
    categoryName: 'Bebidas Frías',
    price: 2800,
    compareAtPrice: null,
    stock: 40,
    inStock: true,
    isActive: true,
    imageUrl: 'https://images.unsplash.com/photo-1513558161293-cdaf765ed2fd?w=400&auto=format&fit=crop&q=80'
  },
  // Electro Sierras (Servicios)
  {
    id: 'prod-6',
    businessId: 'biz-2',
    name: 'Certificación Eléctrica ERSeP / Apto Eléctrico',
    description: 'Inspección técnica, medición de puesta a tierra y firma de protocolo oficial ERSeP.',
    categoryName: 'Certificaciones',
    price: 45000,
    compareAtPrice: null,
    stock: 99,
    inStock: true,
    isActive: true,
    imageUrl: 'https://images.unsplash.com/photo-1621905251189-08b45d6a269e?w=400&auto=format&fit=crop&q=80'
  },
  {
    id: 'prod-7',
    businessId: 'biz-2',
    name: 'Instalación de Tablero Seccional & Disyuntor',
    description: 'Montaje de térmicas normalizadas, disyuntor diferencial y peines de conexión.',
    categoryName: 'Instalaciones',
    price: 35000,
    compareAtPrice: null,
    stock: 99,
    inStock: true,
    isActive: true,
    imageUrl: 'https://images.unsplash.com/photo-1581092160607-ee22621dd758?w=400&auto=format&fit=crop&q=80'
  }
];

export const INITIAL_ORDERS = [
  {
    id: 'ord-1082',
    orderNumber: '#1082',
    businessId: 'biz-1',
    customerName: 'Sofía Martínez',
    customerPhone: '+5493516554433',
    customerAddress: 'Los Aromos 240, Río Ceballos',
    customerNotes: 'Coordinamos envío por WhatsApp, consultar costo a barrio Los Quebrachitos',
    deliveryMethod: 'delivery',
    paymentMethod: 'Mercado Pago',
    paymentStatus: 'pending', // pending, link_sent, paid, cash_on_delivery, transfer_verified
    paymentLink: null,
    status: 'pending', // pending, preparing, ready, delivered
    timeAgo: 'Hace 4 min',
    items: [
      { name: 'Flat White Doble Shot', qty: 2, price: 3200 },
      { name: 'Croissant de Almendras', qty: 1, price: 3900 }
    ],
    subtotal: 10300,
    deliveryFee: 1500,
    total: 11800
  },
  {
    id: 'ord-1081',
    orderNumber: '#1081',
    businessId: 'biz-1',
    customerName: 'Gonzalo Romero',
    customerPhone: '+5493543887766',
    customerAddress: 'San Martín 450, Unquillo',
    customerNotes: 'Paga en efectivo al cadete en mano',
    deliveryMethod: 'delivery',
    paymentMethod: 'Efectivo',
    paymentStatus: 'cash_on_delivery',
    paymentLink: null,
    status: 'preparing',
    timeAgo: 'Hace 14 min',
    items: [
      { name: 'Tostón Avocado & Huevo Poché', qty: 1, price: 6500 },
      { name: 'Limonada Serrano & Menta', qty: 1, price: 2800 }
    ],
    subtotal: 9300,
    deliveryFee: 1200,
    total: 10500
  },
  {
    id: 'ord-1080',
    orderNumber: '#1080',
    businessId: 'biz-1',
    customerName: 'Lucía Pereyra',
    customerPhone: '+5493512233445',
    customerAddress: 'Retira por mostrador / local',
    customerNotes: 'Paso a buscarlo en 15 min, comprobante enviado',
    deliveryMethod: 'takeaway',
    paymentMethod: 'Transferencia',
    paymentStatus: 'paid',
    paymentLink: null,
    status: 'ready',
    timeAgo: 'Hace 28 min',
    items: [
      { name: 'Cheesecake Frutos Rojos', qty: 1, price: 4900 }
    ],
    subtotal: 4900,
    deliveryFee: 0,
    total: 4900
  },
  {
    id: 'ord-1079',
    orderNumber: '#1079',
    businessId: 'biz-1',
    customerName: 'Esteban Morales',
    customerPhone: '+5493519988776',
    customerAddress: 'Av. Goycoechea 1400, Villa Allende',
    customerNotes: 'Entregado con éxito',
    deliveryMethod: 'delivery',
    paymentMethod: 'Mercado Pago',
    paymentStatus: 'paid',
    paymentLink: 'https://mpago.la/sierras-1079-demo',
    status: 'delivered',
    timeAgo: 'Hace 45 min',
    items: [
      { name: 'Flat White Doble Shot', qty: 2, price: 3200 },
      { name: 'Tostón Avocado', qty: 1, price: 6500 }
    ],
    subtotal: 12900,
    deliveryFee: 1800,
    total: 14700
  }
];

export const INITIAL_PLANS = [
  {
    id: 'plan-1',
    name: 'Comercio Básico',
    slug: 'basico',
    priceArs: 9900,
    billingPeriod: 'mensual',
    description: 'Presencia institucional y contacto directo en el directorio serrano.',
    maxProducts: 20,
    maxPhotos: 3,
    maxVideos: 1,
    allowFeatured: false,
    allowTags: true,
    allowGondolaLive: false,
    allowBannerAds: false,
    allowDeliveryZones: false,
    allowInstagram: true,
    allowVerifiedBadge: true,
    allowQuoteRequests: true,
    allowStoreCart: false,
    allowPosKanban: false,
    allowPaymentLinks: false,
    mpCheckoutUrl: 'https://mpago.la/sierras-basico-9900',
    checkoutUrl: 'https://mpago.la/sierras-basico-9900',
    features: [
      'Publicar aviso publicitario en el directorio',
      'Panel para gestionar y actualizar el aviso',
      'Botón de contacto directo por WhatsApp y llamada',
      'Hasta 3 fotos en la galería y 1 video',
      'Hasta 20 productos / servicios de referencia',
      'Acceso a Instagram y datos del comercio',
      'Presencia en búsquedas locales de Sierras Chicas'
    ],
    activeMerchants: 48
  },
  {
    id: 'plan-2',
    name: 'Negocio Pro & POS',
    slug: 'pro',
    priceArs: 19900,
    billingPeriod: 'mensual',
    isFeatured: true,
    description: 'Catálogo interactivo con pedidos automáticos, delivery y gestión de comandas en vivo.',
    maxProducts: 150,
    maxPhotos: 10,
    maxVideos: 3,
    allowFeatured: true,
    allowTags: true,
    allowGondolaLive: true,
    allowBannerAds: false,
    allowDeliveryZones: true,
    allowInstagram: true,
    allowVerifiedBadge: true,
    allowQuoteRequests: true,
    allowStoreCart: true,
    allowPosKanban: true,
    allowPaymentLinks: true,
    mpCheckoutUrl: 'https://mpago.la/sierras-pro-19900',
    checkoutUrl: 'https://mpago.la/sierras-pro-19900',
    features: [
      'Todo lo del plan Básico',
      'Publicar tienda virtual interactiva con carrito',
      'Checkout con ticket automático a WhatsApp',
      'Góndola de edición rápida de precios y stock',
      'Tablero POS / Kanban en vivo para comandas',
      'Establecer zonas de precios para delivery',
      'Generación de links de pago Mercado Pago',
      'Banner góndola en vivo incluido',
      'Hasta 10 fotos y 3 videos en alta resolución',
      'Hasta 150 productos activos'
    ],
    activeMerchants: 84
  },
  {
    id: 'plan-3',
    name: 'Valle Destacado VIP',
    slug: 'vip',
    priceArs: 34900,
    billingPeriod: 'mensual',
    description: 'Máxima exposición con posición prioritaria, pauta en carrusel y soporte integral.',
    maxProducts: 500,
    maxPhotos: 30,
    maxVideos: 10,
    allowFeatured: true,
    allowTags: true,
    allowGondolaLive: true,
    allowBannerAds: true,
    allowDeliveryZones: true,
    allowInstagram: true,
    allowVerifiedBadge: true,
    allowQuoteRequests: true,
    allowStoreCart: true,
    allowPosKanban: true,
    allowPaymentLinks: true,
    mpCheckoutUrl: 'https://mpago.la/sierras-vip-34900',
    checkoutUrl: 'https://mpago.la/sierras-vip-34900',
    features: [
      'Todo lo del plan Negocio Pro',
      'Banner publicitario en carrusel de la landing',
      'Posición destacada #1 en búsquedas y categorías',
      'Badge VIP dorado y sello verificado premium',
      'Fotos y videos ampliados (hasta 30 fotos / 10 videos)',
      'Hasta 500 productos en catálogo online',
      'Múltiples sucursales y números de WhatsApp',
      'Soporte prioritario 24/7 y asesoría de visibilidad'
    ],
    activeMerchants: 22
  }
];

