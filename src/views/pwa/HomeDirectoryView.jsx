import React, { useState, useRef, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useApp } from '../../context/AppContext';
import Hero9Section from '../../components/layout/Hero9Section';
import { 
  Search, 
  MapPin, 
  Star, 
  ArrowRight, 
  CheckCircle2, 
  Heart, 
  Sparkles, 
  Store, 
  Clock, 
  LayoutGrid, 
  List, 
  Tag, 
  ExternalLink, 
  CreditCard,
  Zap,
  SlidersHorizontal,
  ChevronRight,
  ChevronLeft,
  X,
  ShieldCheck,
  PhoneCall,
  Smartphone,
  TrendingUp,
  Award,
  Compass,
  Check,
  Layers,
  ArrowUpRight,
  Building2,
  Utensils,
  Wrench,
  Stethoscope,
  Palmtree,
  ShoppingBag,
  Car,
  Flame,
  Radio,
  Sliders,
  DollarSign,
  MessageCircle,
  Eye,
  CheckCheck,
  HelpCircle,
  Users,
  Send,
  Download,
  Instagram,
  BadgePercent,
  RefreshCw,
  ShoppingBag as StoreIcon
} from 'lucide-react';

export default function HomeDirectoryView() {
  const { 
    businesses, 
    categories, 
    locations, 
    plans, 
    products,
    settings,
    sponsoredBanners,
    selectedLocation, 
    setSelectedLocation, 
    selectedCategory, 
    setSelectedCategory, 
    selectedSubcategory, 
    setSelectedSubcategory, 
    searchQuery, 
    setSearchQuery, 
    favorites, 
    toggleFavorite,
    setIsPwaModalOpen
  } = useApp();

  const navigate = useNavigate();
  const [filterMode, setFilterMode] = useState('all'); // 'all', 'aviso', 'tienda', 'servicios'
  const [viewMode, setViewMode] = useState('grid'); // 'grid' | 'list'
  const [isSearchFocused, setIsSearchFocused] = useState(false);
  const [newsletterEmail, setNewsletterEmail] = useState('');
  const [newsletterSuccess, setNewsletterSuccess] = useState(false);
  
  // Interactive Merchant Growth Simulator State
  const [simulatorGoal, setSimulatorGoal] = useState('pro'); // 'inicial', 'pro', 'full'

  // Interactive Circular Category Selector State
  const [activeCategoryIndex, setActiveCategoryIndex] = useState(0);

  // Sponsored Carousel State
  const [activeBannerIndex, setActiveBannerIndex] = useState(0);

  // FAQ open index state
  const [openFaqIndex, setOpenFaqIndex] = useState(null);

  const searchContainerRef = useRef(null);
  const directorySectionRef = useRef(null);

  // Auto cycle sponsored banners
  useEffect(() => {
    if (!sponsoredBanners || sponsoredBanners.length === 0) return;
    const interval = setInterval(() => {
      setActiveBannerIndex(prev => (prev + 1) % sponsoredBanners.length);
    }, 5500);
    return () => clearInterval(interval);
  }, [sponsoredBanners]);

  // Close suggestions on outside click
  useEffect(() => {
    function handleClickOutside(event) {
      if (searchContainerRef.current && !searchContainerRef.current.contains(event.target)) {
        setIsSearchFocused(false);
      }
    }
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  // Build unified taxonomy suggestions list (Rubros, Categorías, Subcategorías)
  const allTaxonomyItems = categories.flatMap(cat => [
    { type: 'rubro', label: cat.name, emoji: cat.emoji || '📁', catSlug: cat.slug, sub: null },
    ...(cat.subcategories || []).map(sub => ({
      type: 'subcategoria',
      label: sub,
      emoji: '↳',
      catSlug: cat.slug,
      sub: sub,
      parentName: cat.name
    }))
  ]);

  // Filter taxonomy suggestions based on user search term
  const matchingTaxonomy = searchQuery.trim()
    ? allTaxonomyItems.filter(item => 
        item.label.toLowerCase().includes(searchQuery.toLowerCase()) ||
        (item.parentName && item.parentName.toLowerCase().includes(searchQuery.toLowerCase()))
      )
    : [];

  // Filter businesses for featured section
  const filteredBusinesses = businesses.filter(biz => {
    if (searchQuery.trim()) {
      const q = searchQuery.toLowerCase();
      const matchName = biz.name?.toLowerCase().includes(q);
      const matchDesc = biz.description?.toLowerCase().includes(q);
      const matchTag = biz.tagline?.toLowerCase().includes(q);
      const matchLoc = (biz.locationName || biz.location)?.toLowerCase().includes(q);
      const matchCat = (biz.categoryName || biz.category)?.toLowerCase().includes(q);
      const matchSub = (biz.subcategory || '')?.toLowerCase().includes(q);
      const matchTags = (biz.tags || []).some(t => t.toLowerCase().includes(q));

      const bizProducts = products.filter(p => p.businessId === biz.id);
      const matchProduct = bizProducts.some(p => 
        p.name.toLowerCase().includes(q) || 
        (p.categoryName && p.categoryName.toLowerCase().includes(q)) ||
        (p.tags && p.tags.some(t => t.toLowerCase().includes(q)))
      );

      if (!matchName && !matchDesc && !matchTag && !matchLoc && !matchCat && !matchSub && !matchTags && !matchProduct) {
        return false;
      }
    }

    if (selectedLocation !== 'all') {
      const loc = locations.find(l => l.slug === selectedLocation);
      if (loc && biz.locationId !== loc.id && (biz.locationName || biz.location)?.toLowerCase() !== loc.name.toLowerCase()) {
        return false;
      }
    }

    if (selectedCategory !== 'all') {
      const cat = categories.find(c => c.slug === selectedCategory);
      if (cat && biz.categoryId !== cat.id && (biz.categoryName || biz.category)?.toLowerCase() !== cat.name.toLowerCase()) {
        return false;
      }
    }

    if (selectedSubcategory !== 'all') {
      if (biz.subcategory !== selectedSubcategory && !(biz.tags || []).includes(selectedSubcategory)) {
        return false;
      }
    }

    if (filterMode !== 'all' && biz.businessMode !== filterMode) {
      return false;
    }

    return true;
  });

  const scrollToDirectory = () => {
    navigate('/explorar');
  };

  const handleSelectTaxonomyItem = (item) => {
    if (item.type === 'rubro') {
      navigate(`/explorar?cat=${item.catSlug}`);
    } else if (item.type === 'subcategoria') {
      navigate(`/explorar?cat=${item.catSlug}&sub=${encodeURIComponent(item.sub)}`);
    }
    setIsSearchFocused(false);
  };

  const handleCategoryCardClick = (catSlug) => {
    navigate(`/explorar?cat=${catSlug}`);
  };

  const handleSubcategoryClick = (catSlug, subName) => {
    navigate(`/explorar?cat=${catSlug}&sub=${encodeURIComponent(subName)}`);
  };

  const handleSelectLocation = (locSlug) => {
    navigate(`/localidad/${locSlug}`);
  };

  const handleNewsletterSubmit = (e) => {
    e.preventDefault();
    if (!newsletterEmail.trim()) return;
    setNewsletterSuccess(true);
    setTimeout(() => {
      setNewsletterSuccess(false);
      setNewsletterEmail('');
    }, 4000);
  };

  // Flash Ticker Highlights
  const flashHighlights = [
    { text: '🥐 Masa Madre & Croissants recién horneados', city: 'Unquillo', cat: 'gastronomia' },
    { text: '⚡ Electricista Matriculado ERSeP 24hs', city: 'Villa Allende', cat: 'construccion-hogar' },
    { text: '🌲 Cabañas con pileta climatizada y vista panorámica', city: 'Río Ceballos', cat: 'turismo-alojamiento' },
    { text: '🍕 Pizzería napolitana a la piedra', city: 'Mendiolaza', cat: 'gastronomia' },
    { text: '🐾 Atención veterinaria y farmacia de guardia', city: 'Salsipuedes', cat: 'salud-bienestar' },
    { text: '🍺 Cerveza artesanal serrana y picadas', city: 'Agua de Oro', cat: 'gastronomia' },
    { text: '🛠️ Taller mecánico integral e inyección electrónica', city: 'La Calera', cat: 'automotor' }
  ];

  // Simulator levels from settings or defaults
  const simulatorLevels = settings?.simulatorLevels || [
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

  // FAQ questions list
  const faqs = [
    {
      q: '¿Cómo publico mi comercio o servicio profesional en el portal?',
      a: 'Podés registrarte desde el botón "Mi Panel" o "Soy Comercio". Elegís tu plan (Básico, Pro o VIP), completás tus datos comerciales, fotos, horarios y números de WhatsApp, y tu ficha quedará activa de inmediato en el directorio.'
    },
    {
      q: '¿Tiene algún costo para vecinos y turistas explorar el directorio?',
      a: '¡Ninguno! Para vecinos y turistas la plataforma es 100% gratuita y sin comisiones intermediarias. El contacto y la compra con los comercios es directo por WhatsApp o en mostrador.'
    },
    {
      q: '¿Cómo funciona la tienda online con carrito y checkout por WhatsApp?',
      a: 'Los comercios con Plan Pro o VIP disponen de una tienda virtual. El cliente agrega productos a su carrito, selecciona entrega a domicilio o retiro, y el sistema genera automáticamente el ticket listo para enviar por WhatsApp al número oficial del comercio.'
    },
    {
      q: '¿Puedo cobrar por Mercado Pago o coordinar fletes personalizados?',
      a: 'Sí. El comercio puede fijar zonas de delivery con tarifas diferenciadas y enviar links de cobro directo de Mercado Pago o datos de transferencia bancaria desde el panel de comandas POS.'
    }
  ];

  // Mock Instagram Feed Posts
  const instagramPosts = [
    {
      id: 'ig-1',
      imageUrl: 'https://images.unsplash.com/photo-1507525428034-b723cf961d3e?w=500&auto=format&fit=crop&q=80',
      caption: 'Atardecer mágico en las cumbres de Río Ceballos 🌄 #SierrasChicas',
      likes: 342,
      comments: 28,
      link: 'https://instagram.com'
    },
    {
      id: 'ig-2',
      imageUrl: 'https://images.unsplash.com/photo-1555396273-367ea4eb4db5?w=500&auto=format&fit=crop&q=80',
      caption: 'Ruta gastronómica serrana: café de especialidad y masa madre en Unquillo 🥐☕',
      likes: 512,
      comments: 45,
      link: 'https://instagram.com'
    },
    {
      id: 'ig-3',
      imageUrl: 'https://images.unsplash.com/photo-1510312305653-8ed496efae75?w=500&auto=format&fit=crop&q=80',
      caption: 'Escapadas de fin de semana: cabañas y turismo en todo el corredor 🏡',
      likes: 289,
      comments: 19,
      link: 'https://instagram.com'
    },
    {
      id: 'ig-4',
      imageUrl: 'https://images.unsplash.com/photo-1587049352846-4a222e784d38?w=500&auto=format&fit=crop&q=80',
      caption: 'Productores locales: miel del monte y delicias artesanales de nuestra tierra 🍯',
      likes: 420,
      comments: 31,
      link: 'https://instagram.com'
    }
  ];

  const currentBanner = sponsoredBanners && sponsoredBanners.length > 0
    ? sponsoredBanners[activeBannerIndex]
    : null;

  const currentActiveCategory = categories[activeCategoryIndex] || categories[0];

  return (
    <div className="flex-1 flex flex-col w-full pb-0 animate-in fade-in bg-[#f8fafc] text-slate-900 selection:bg-amber-500 selection:text-slate-950 font-sans">
      
      {/* ======================================================== */}
      {/* 1. HERO 9 SECTION (DRONE FOOTAGE & CLARIFYING OVERLAY)   */}
      {/* ======================================================== */}
      <Hero9Section
        searchQuery={searchQuery}
        setSearchQuery={setSearchQuery}
        selectedLocation={selectedLocation}
        setSelectedLocation={setSelectedLocation}
        locations={locations}
        categories={categories}
        businesses={businesses}
        scrollToDirectory={scrollToDirectory}
        matchingTaxonomy={matchingTaxonomy}
        isSearchFocused={isSearchFocused}
        setIsSearchFocused={setIsSearchFocused}
        handleSelectTaxonomyItem={handleSelectTaxonomyItem}
        searchContainerRef={searchContainerRef}
        onCategoryQuickSelect={handleCategoryCardClick}
      />

      {/* ======================================================== */}
      {/* 2. GÓNDOLA EN VIVO FLASH TICKER                          */}
      {/* ======================================================== */}
      <section className="relative -mt-6 z-30 overflow-hidden bg-gradient-to-r from-amber-500 via-amber-400 to-amber-500 text-slate-950 py-3 shadow-xl">
        <div className="flex items-center">
          <div className="bg-slate-950 text-amber-400 px-4 py-1.5 rounded-r-2xl font-black text-xs flex items-center gap-2 shrink-0 z-10 shadow-md">
            <Radio className="w-3.5 h-3.5 text-rose-500 animate-pulse" />
            <span className="uppercase tracking-wider">Góndola en Vivo</span>
          </div>

          <div className="overflow-hidden whitespace-nowrap flex-1 ml-4">
            <div className="hf-marquee-track flex items-center gap-8 text-xs font-black">
              {[...flashHighlights, ...flashHighlights].map((item, idx) => (
                <button
                  key={idx}
                  type="button"
                  onClick={() => {
                    navigate(`/explorar?cat=${item.cat}`);
                  }}
                  className="inline-flex items-center gap-2 hover:underline opacity-90 hover:opacity-100 transition-opacity"
                >
                  <span>{item.text}</span>
                  <span className="px-2 py-0.5 rounded-full bg-slate-950/15 text-[10px]">📍 {item.city}</span>
                  <span className="opacity-40">·</span>
                </button>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* ======================================================== */}
      {/* 3. RADAR SERRANO · CORREDOR RUTA E-53                     */}
      {/* ======================================================== */}
      <section id="radar-serrano" className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-8 pb-4 w-full">
        <div className="bg-gradient-to-br from-slate-900 via-[#0e172a] to-slate-950 rounded-[2.5rem] p-6 sm:p-10 text-white shadow-2xl relative overflow-hidden border border-slate-800">
          
          <div className="absolute inset-0 bg-[radial-gradient(#38bdf8_1px,transparent_1px)] [background-size:24px_24px] opacity-10 pointer-events-none"></div>

          <div className="relative z-10 flex flex-col lg:flex-row items-center justify-between gap-8">
            
            <div className="space-y-3 text-center lg:text-left max-w-lg">
              <div className="inline-flex items-center gap-2 px-3.5 py-1 rounded-full bg-teal-500/10 text-teal-400 text-xs font-black border border-teal-500/20">
                <Compass className="w-3.5 h-3.5" />
                <span>RADAR SERRANO · CORREDOR RUTA E-53</span>
              </div>
              <h2 className="text-2xl sm:text-3xl font-black tracking-tight text-white">
                Páginas y Comercios por Localidad
              </h2>
              <p className="text-xs sm:text-sm text-slate-300 leading-relaxed font-medium">
                Cada ciudad tiene su página dedicada con catálogo de comercios y espacios publicitarios exclusivos.
              </p>
            </div>

            {/* Interactive Radar City Nodes */}
            <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 w-full lg:w-auto">
              {locations.map(loc => {
                const isActive = selectedLocation === loc.slug;
                const bizCount = businesses.filter(b => b.locationId === loc.id || (b.locationName || b.location)?.toLowerCase() === loc.name.toLowerCase()).length;

                return (
                  <button
                    key={loc.id}
                    type="button"
                    onClick={() => handleSelectLocation(loc.slug)}
                    className="relative p-4 rounded-2xl text-left transition-all duration-300 border flex flex-col justify-between group overflow-hidden bg-white/5 hover:bg-white/15 text-white border-white/10 hover:border-amber-400/50 backdrop-blur-md hover:scale-105"
                  >
                    <div className="flex items-center justify-between w-full">
                      <span className="text-lg">🏔️</span>
                      <span className="text-[10px] text-amber-400 font-black uppercase">Ver Página</span>
                    </div>

                    <div className="pt-3">
                      <h4 className="font-black text-sm leading-tight text-white group-hover:text-amber-300 transition-colors">
                        {loc.name}
                      </h4>
                      <span className="text-[11px] font-bold block mt-0.5 text-slate-400">
                        {bizCount} registrados
                      </span>
                    </div>
                  </button>
                );
              })}
            </div>

          </div>

        </div>
      </section>

      {/* ======================================================== */}
      {/* 4. SPONSORED CAROUSEL BANNER (VITRINA COMERCIAL)         */}
      {/* ======================================================== */}
      {currentBanner && (
        <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6 w-full space-y-3">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-2">
              <Sparkles className="w-4 h-4 text-amber-500" />
              <h2 className="text-xs sm:text-sm font-black text-slate-800 uppercase tracking-wider">
                Vitrina Comercial & Marcas Destacadas del Corredor
              </h2>
            </div>
            <span className="text-xs text-slate-400 font-semibold">Pauta Oficial</span>
          </div>

          <div className="relative rounded-[2.5rem] overflow-hidden bg-slate-950 border border-slate-800 shadow-xl">
            <div className="relative h-64 sm:h-80 w-full overflow-hidden">
              <img
                src={currentBanner.imageUrl}
                alt={currentBanner.title}
                className="w-full h-full object-cover object-center opacity-70 transform transition-transform duration-1000 scale-105"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-slate-950 via-slate-950/60 to-transparent"></div>
              <div className="absolute inset-0 bg-gradient-to-r from-slate-950 via-slate-950/40 to-transparent"></div>

              {/* Content Overlay */}
              <div className="absolute inset-0 p-6 sm:p-10 flex flex-col justify-between text-white z-10">
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-2">
                    <span className="px-3 py-1 rounded-full bg-amber-500 text-slate-950 text-xs font-black uppercase tracking-wider shadow-md">
                      ⭐ {currentBanner.badge}
                    </span>
                    <span className="px-3 py-1 rounded-full bg-white/20 backdrop-blur-md text-white text-xs font-bold">
                      📍 {currentBanner.location}
                    </span>
                  </div>

                  {/* Carousel Controls */}
                  <div className="flex items-center gap-1.5 bg-black/40 backdrop-blur-md p-1 rounded-full border border-white/10">
                    <button
                      type="button"
                      onClick={() => setActiveBannerIndex(prev => (prev - 1 + sponsoredBanners.length) % sponsoredBanners.length)}
                      className="p-1.5 rounded-full hover:bg-white/20 text-white transition-colors"
                      title="Anterior"
                    >
                      <ChevronLeft className="w-4 h-4" />
                    </button>
                    <span className="text-[11px] font-bold px-1 text-slate-300">
                      {activeBannerIndex + 1}/{sponsoredBanners.length}
                    </span>
                    <button
                      type="button"
                      onClick={() => setActiveBannerIndex(prev => (prev + 1) % sponsoredBanners.length)}
                      className="p-1.5 rounded-full hover:bg-white/20 text-white transition-colors"
                      title="Siguiente"
                    >
                      <ChevronRight className="w-4 h-4" />
                    </button>
                  </div>
                </div>

                <div className="space-y-2 max-w-xl">
                  <span className="text-amber-400 font-bold text-xs uppercase tracking-wider block">
                    {currentBanner.tag}
                  </span>
                  <h3 className="text-xl sm:text-3xl font-black tracking-tight text-white drop-shadow-md">
                    {currentBanner.title}
                  </h3>
                  <p className="text-xs sm:text-sm text-slate-200 font-medium line-clamp-2">
                    {currentBanner.subtitle}
                  </p>
                  
                  <div className="pt-2 flex items-center gap-3">
                    <Link
                      to={currentBanner.link}
                      className="px-6 py-2.5 rounded-xl bg-amber-500 hover:bg-amber-400 text-slate-950 font-black text-xs inline-flex items-center gap-1.5 shadow-md transition-all active:scale-95"
                    >
                      <span>{currentBanner.ctaText}</span>
                      <ArrowRight className="w-3.5 h-3.5" />
                    </Link>
                    <a
                      href="#planes-saas"
                      className="text-xs text-slate-400 hover:text-white underline font-semibold"
                    >
                      Pautá tu comercio aquí
                    </a>
                  </div>
                </div>
              </div>
            </div>

          </div>
        </section>
      )}

      {/* ======================================================== */}
      {/* 5. PWA PROMO CARD (TITLE & SUBTEXT COMPLETED)             */}
      {/* ======================================================== */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4 w-full">
        <div className="bg-gradient-to-r from-[#0d1e2c] via-[#0b2838] to-[#0d1e2c] rounded-[2.5rem] p-6 sm:p-8 text-white shadow-xl border border-teal-800/40 flex flex-col md:flex-row items-center justify-between gap-6 relative overflow-hidden">
          <div className="space-y-2 max-w-xl text-center md:text-left z-10">
            <span className="text-[10px] font-black uppercase tracking-widest text-teal-400 bg-teal-950/60 px-2.5 py-1 rounded-md border border-teal-700/40">
              TECNOLOGÍA PWA
            </span>
            <h3 className="text-xl sm:text-2xl font-black text-white">
              La Guía PWA que va con vos
            </h3>
            <p className="text-xs text-slate-300 leading-relaxed font-medium">
              Llevá todo el comercio serrano en tu bolsillo: instalala al instante en tu celular, accedé rápido y consultá negocios sin gastar tus datos móviles.
            </p>
          </div>

          <div className="flex items-center gap-3 z-10 shrink-0">
            <button
              type="button"
              onClick={() => setIsPwaModalOpen(true)}
              className="px-6 py-3 rounded-2xl bg-teal-500 hover:bg-teal-400 text-slate-950 font-black text-xs flex items-center gap-2 shadow-lg shadow-teal-900/40 transition-transform active:scale-95"
            >
              <Smartphone className="w-4 h-4" />
              <span>Instalar Gratis</span>
            </button>
          </div>
        </div>
      </section>

      {/* ======================================================== */}
      {/* 6. FEATURED LISTINGS SECTION (ANUNCIOS & TIENDAS)        */}
      {/* ======================================================== */}
      <section ref={directorySectionRef} id="catalogo-directorio" className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 space-y-6 w-full">
        
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 pb-4 border-b border-slate-200">
          <div>
            <span className="text-xs font-black text-amber-600 uppercase tracking-widest block">
              CATÁLOGO REGIONAL
            </span>
            <h2 className="text-2xl sm:text-3xl font-black text-slate-900 tracking-tight">
              Anuncios & Tiendas Destacadas
            </h2>
            <p className="text-xs text-slate-500 mt-0.5 font-medium">
              Comercios, profesionales y propuestas gastronómicas verificadas con atención directa en el corredor.
            </p>
          </div>

          <div className="flex items-center gap-3">
            <Link
              to="/explorar"
              className="px-5 py-2.5 rounded-2xl bg-slate-900 hover:bg-emerald-800 text-white font-black text-xs flex items-center gap-2 shadow-sm transition-all"
            >
              <Search className="w-3.5 h-3.5 text-amber-400" />
              <span>Ver Buscador Completo ({businesses.length})</span>
              <ArrowRight className="w-3.5 h-3.5" />
            </Link>
          </div>
        </div>

        {/* 4-Column Responsive Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {filteredBusinesses.slice(0, 8).map(biz => {
            const isFav = favorites.includes(biz.id);
            const isNotice = biz.businessMode === 'aviso' || biz.businessMode === 'catalogo';
            const isService = biz.businessMode === 'servicios';
            const targetUrl = isNotice ? `/aviso/${biz.slug}` : isService ? `/comercio/${biz.slug}` : `/tienda/${biz.slug}`;
            const ctaLabel = isNotice ? 'Ver Ficha & Contacto' : isService ? 'Pedir Presupuesto' : 'Ver Carta & Pedir';

            return (
              <div
                key={biz.id}
                className={`group bg-white rounded-3xl overflow-hidden border transition-all duration-300 hover:shadow-xl flex flex-col justify-between ${
                  biz.isFeatured ? 'border-amber-400 ring-2 ring-amber-400/20 shadow-md' : 'border-slate-200'
                }`}
              >
                <div className="relative h-44 w-full overflow-hidden bg-slate-100">
                  <img
                    src={biz.coverUrl || 'https://images.unsplash.com/photo-1555396273-367ea4eb4db5?w=600'}
                    alt={biz.name}
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent"></div>

                  {biz.isFeatured && (
                    <span className="absolute top-3 left-3 px-2.5 py-1 rounded-full bg-amber-400 text-amber-950 text-[10px] font-black uppercase tracking-wider shadow-sm flex items-center gap-1">
                      <Sparkles className="w-3 h-3" />
                      Destacado
                    </span>
                  )}

                  <button
                    type="button"
                    onClick={() => toggleFavorite(biz.id)}
                    className={`absolute top-3 right-3 p-2 rounded-xl backdrop-blur-md transition-colors ${
                      isFav ? 'bg-rose-500 text-white' : 'bg-black/40 text-white hover:bg-black/60'
                    }`}
                  >
                    <Star className={`w-3.5 h-3.5 ${isFav ? 'fill-current' : ''}`} />
                  </button>

                  <div className="absolute bottom-3 left-3 right-3 flex items-center justify-between text-white">
                    <span className="text-[11px] font-bold bg-black/40 backdrop-blur-md px-2 py-0.5 rounded-md">
                      📍 {biz.locationName || biz.location}
                    </span>
                    <div className="flex items-center gap-1 bg-amber-500/90 text-slate-950 px-2 py-0.5 rounded-md text-[11px] font-black">
                      <Star className="w-3 h-3 fill-current" />
                      <span>{biz.rating}</span>
                    </div>
                  </div>
                </div>

                <div className="p-4 sm:p-5 flex-1 flex flex-col justify-between space-y-3">
                  <div className="space-y-1">
                    <div className="flex items-center justify-between">
                      <span className="text-[10px] font-black uppercase tracking-wider text-emerald-800 bg-emerald-50 px-2 py-0.5 rounded-md">
                        {biz.categoryName || biz.category}
                      </span>
                      {biz.isVerified && (
                        <span className="text-[10px] font-bold text-teal-700 flex items-center gap-0.5" title="Verificado">
                          <CheckCircle2 className="w-3 h-3 text-teal-600" />
                          Verificado
                        </span>
                      )}
                    </div>

                    <h3 className="font-black text-sm text-slate-900 group-hover:text-emerald-800 transition-colors line-clamp-1 pt-1">
                      {biz.name}
                    </h3>
                    <p className="text-xs text-slate-500 line-clamp-2 leading-relaxed font-medium">
                      {biz.description || biz.tagline}
                    </p>
                  </div>

                  <div className="space-y-2 pt-2 border-t border-slate-100">
                    <Link
                      to={targetUrl}
                      className="w-full py-2.5 px-3 rounded-xl bg-slate-900 hover:bg-emerald-700 text-white font-bold text-xs flex items-center justify-center gap-1.5 transition-colors shadow-xs"
                    >
                      <span>{ctaLabel}</span>
                      <ArrowRight className="w-3.5 h-3.5" />
                    </Link>
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      </section>

      {/* ======================================================== */}
      {/* 7. INTERACTIVE CATEGORY & SUBCATEGORY SELECTOR (WHEEL/PANEL) */}
      {/* ======================================================== */}
      <section id="categorias-guia" className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 space-y-8 w-full border-t border-slate-200">
        <div className="text-center space-y-2 max-w-2xl mx-auto">
          <span className="text-xs font-black text-amber-600 uppercase tracking-widest block">
            EXPLORA POR RUBRO & SUBCATEGORÍA
          </span>
          <h2 className="text-2xl sm:text-4xl font-black text-slate-900 tracking-tight">
            Elegí la categoría del producto o servicio
          </h2>
          <p className="text-xs sm:text-sm text-slate-500 leading-relaxed font-medium">
            Seleccioná una categoría para desplegar al instante todas sus especialidades sin scroll interminable en mobile.
          </p>
        </div>

        {/* Interactive Dynamic Category Container */}
        <div className="bg-white rounded-[2.5rem] p-6 sm:p-8 shadow-xl border border-slate-200 grid grid-cols-1 lg:grid-cols-12 gap-6">
          
          {/* Category Selector List (Left Column / Top on Mobile) */}
          <div className="lg:col-span-5 space-y-2">
            <span className="text-[11px] font-black text-slate-400 uppercase tracking-wider block px-2 pb-1">
              Rubros Principales:
            </span>
            <div className="space-y-1.5">
              {categories.map((cat, idx) => {
                const isSelected = activeCategoryIndex === idx;
                return (
                  <button
                    key={cat.id}
                    type="button"
                    onClick={() => setActiveCategoryIndex(idx)}
                    className={`w-full text-left p-3.5 rounded-2xl flex items-center justify-between transition-all duration-200 ${
                      isSelected
                        ? 'bg-gradient-to-r from-emerald-800 to-teal-700 text-white shadow-md shadow-emerald-900/20 scale-[1.02]'
                        : 'bg-slate-50 hover:bg-slate-100 text-slate-800 border border-slate-100'
                    }`}
                  >
                    <div className="flex items-center gap-3">
                      <span className="text-2xl">{cat.emoji || '📁'}</span>
                      <div>
                        <h4 className="font-black text-sm">{cat.name}</h4>
                        <span className={`text-[10px] block ${isSelected ? 'text-emerald-200 font-medium' : 'text-slate-400'}`}>
                          {(cat.subcategories || []).length} especialidades
                        </span>
                      </div>
                    </div>
                    <ChevronRight className={`w-4 h-4 transition-transform ${isSelected ? 'translate-x-1 text-amber-400' : 'text-slate-400'}`} />
                  </button>
                );
              })}
            </div>
          </div>

          {/* Subcategories & Direct Action Panel (Right Column) */}
          <div className="lg:col-span-7 bg-slate-50 rounded-3xl p-6 border border-slate-200/80 flex flex-col justify-between space-y-6">
            <div className="space-y-4">
              <div className="flex items-center justify-between pb-3 border-b border-slate-200">
                <div className="flex items-center gap-2.5">
                  <span className="text-3xl">{currentActiveCategory.emoji || '📁'}</span>
                  <div>
                    <h3 className="font-black text-lg text-slate-900">{currentActiveCategory.name}</h3>
                    <span className="text-xs text-slate-500 font-medium">Subcategorías especializadas en el corredor</span>
                  </div>
                </div>

                <Link
                  to={`/explorar?cat=${currentActiveCategory.slug}`}
                  className="px-4 py-2 rounded-xl bg-amber-500 hover:bg-amber-400 text-slate-950 font-black text-xs flex items-center gap-1.5 shadow-sm transition-all active:scale-95"
                >
                  <span>Ver Rubro Completo</span>
                  <ArrowRight className="w-3.5 h-3.5" />
                </Link>
              </div>

              {/* Subcategories Pills Grid */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-2.5 pt-2">
                {(currentActiveCategory.subcategories || []).map((sub, idx) => (
                  <button
                    key={idx}
                    type="button"
                    onClick={() => handleSubcategoryClick(currentActiveCategory.slug, sub)}
                    className="text-left p-3 rounded-2xl bg-white hover:bg-emerald-50 border border-slate-200 hover:border-emerald-300 text-slate-800 hover:text-emerald-950 text-xs font-bold transition-all flex items-center justify-between group shadow-2xs"
                  >
                    <span className="group-hover:translate-x-0.5 transition-transform">{sub}</span>
                    <ArrowRight className="w-3.5 h-3.5 text-slate-300 group-hover:text-emerald-700 transition-colors" />
                  </button>
                ))}
              </div>
            </div>

            <div className="p-4 rounded-2xl bg-emerald-100/60 border border-emerald-200 flex items-center justify-between">
              <div className="flex items-center gap-2 text-xs font-bold text-emerald-950">
                <Sparkles className="w-4 h-4 text-emerald-700 shrink-0" />
                <span>¿Ofrecés servicios en este rubro?</span>
              </div>
              <Link
                to="/login"
                className="px-4 py-1.5 rounded-xl bg-emerald-800 text-white font-bold text-xs hover:bg-emerald-900 transition-colors"
              >
                Publicar Ahora
              </Link>
            </div>

          </div>

        </div>
      </section>

      {/* ======================================================== */}
      {/* 8. BENEFICIOS DE VALOR COMERCIAL (REDISEÑO CON ROI CLARO) */}
      {/* ======================================================== */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-14 w-full">
        <div className="bg-gradient-to-br from-slate-900 via-indigo-950 to-slate-950 rounded-[2.5rem] p-6 sm:p-10 text-white shadow-2xl space-y-10 border border-indigo-900/40 relative overflow-hidden">
          
          <div className="text-center space-y-3 max-w-2xl mx-auto">
            <span className="text-xs font-black text-amber-400 uppercase tracking-widest block">
              PROPUESTA DE VALOR PARA COMERCIOS
            </span>
            <h2 className="text-2xl sm:text-4xl font-black text-white tracking-tight">
              ¿Por qué sumar tu comercio a Sierras Chicas Digital?
            </h2>
            <p className="text-xs sm:text-sm text-slate-300 font-medium">
              Tecnología diseñada para multiplicar tus ventas directas en el corredor, sin intermediarios ni costos ocultos.
            </p>
          </div>

          {/* 4 Clear High-Impact Benefits Grid */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            
            <div className="bg-white/5 backdrop-blur-md p-6 rounded-3xl border border-white/10 space-y-3 hover:border-amber-400/40 transition-colors">
              <div className="w-12 h-12 rounded-2xl bg-amber-500/20 text-amber-400 flex items-center justify-center font-black text-xl">
                <BadgePercent className="w-6 h-6" />
              </div>
              <h3 className="font-black text-base text-white">0% Comisiones por Venta</h3>
              <p className="text-xs text-slate-300 leading-relaxed font-medium">
                Cobrás el 100% de tus ventas. Los pedidos llegan directo a tu WhatsApp o se pagan con tu propio link de Mercado Pago.
              </p>
            </div>

            <div className="bg-white/5 backdrop-blur-md p-6 rounded-3xl border border-white/10 space-y-3 hover:border-amber-400/40 transition-colors">
              <div className="w-12 h-12 rounded-2xl bg-teal-500/20 text-teal-400 flex items-center justify-center font-black text-xl">
                <RefreshCw className="w-6 h-6" />
              </div>
              <h3 className="font-black text-base text-white">Góndola & Precios al Instante</h3>
              <p className="text-xs text-slate-300 leading-relaxed font-medium">
                Modificá precios, stock y promociones en segundos desde tu celular, sin depender de diseñadores ni programadores.
              </p>
            </div>

            <div className="bg-white/5 backdrop-blur-md p-6 rounded-3xl border border-white/10 space-y-3 hover:border-amber-400/40 transition-colors">
              <div className="w-12 h-12 rounded-2xl bg-emerald-500/20 text-emerald-400 flex items-center justify-center font-black text-xl">
                <MapPin className="w-6 h-6" />
              </div>
              <h3 className="font-black text-base text-white">Presencia Geolocalizada</h3>
              <p className="text-xs text-slate-300 leading-relaxed font-medium">
                Aparecé destacado en tu ciudad y en todo el corredor ante vecinos y turistas que buscan activamente lo que ofrecés.
              </p>
            </div>

            <div className="bg-white/5 backdrop-blur-md p-6 rounded-3xl border border-white/10 space-y-3 hover:border-amber-400/40 transition-colors">
              <div className="w-12 h-12 rounded-2xl bg-indigo-500/20 text-indigo-400 flex items-center justify-center font-black text-xl">
                <StoreIcon className="w-6 h-6" />
              </div>
              <h3 className="font-black text-base text-white">Comandas POS & Delivery</h3>
              <p className="text-xs text-slate-300 leading-relaxed font-medium">
                Panel de mostrador en vivo para organizar pedidos pendientes, en preparación y listos con cálculo de flete por zona.
              </p>
            </div>

          </div>

          <div className="text-center pt-4">
            <a
              href="#planes-saas"
              className="inline-flex items-center gap-2 px-8 py-4 rounded-2xl bg-gradient-to-r from-amber-500 to-amber-400 hover:from-amber-400 hover:to-amber-300 text-slate-950 font-black text-xs sm:text-sm shadow-xl shadow-amber-500/30 transition-transform active:scale-95"
            >
              <span>Ver Planes Comerciales Disponibles</span>
              <ArrowRight className="w-4 h-4" />
            </a>
          </div>

        </div>
      </section>

      {/* ======================================================== */}
      {/* 9. SECCIÓN PLANES (TITLE & SUBTEXT COMPLETED)             */}
      {/* ======================================================== */}
      <section id="planes-saas" className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-14 space-y-10 w-full border-t border-slate-200">
        
        <div className="text-center space-y-2 max-w-2xl mx-auto">
          <span className="text-xs font-black text-amber-600 uppercase tracking-widest block">
            PLANES COMERCIALES A TU MEDIDA
          </span>
          <h2 className="text-2xl sm:text-4xl font-black text-slate-900 tracking-tight">
            Elegí la presencia digital perfecta para tu negocio
          </h2>
          <p className="text-xs sm:text-sm text-slate-500 leading-relaxed font-medium">
            Potenciá tus ventas y visibilidad con herramientas adaptadas a tu etapa de crecimiento en todo el corredor.
          </p>
        </div>

        {/* Public SaaS Plans Pricing Grid */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 max-w-6xl mx-auto">
          {plans.map(plan => {
            const isFeatured = plan.isFeatured || plan.id === 'plan-2';

            return (
              <div
                key={plan.id}
                className={`p-7 rounded-[2rem] flex flex-col justify-between space-y-5 transition-all duration-300 shadow-sm hover:shadow-2xl ${
                  isFeatured
                    ? 'bg-gradient-to-b from-slate-950 via-indigo-950 to-slate-950 text-white shadow-2xl shadow-indigo-950/40 ring-2 ring-indigo-500/50 scale-[1.02]'
                    : 'bg-white text-slate-900 border border-slate-200'
                }`}
              >
                <div className="space-y-4">
                  <div className="flex items-center justify-between">
                    <span className={`px-2.5 py-0.5 rounded-full text-[10px] font-black uppercase ${
                      isFeatured ? 'bg-indigo-600 text-white' : 'bg-slate-100 text-slate-600'
                    }`}>
                      {plan.slug}
                    </span>
                    {isFeatured && (
                      <span className="px-2.5 py-0.5 rounded-full bg-amber-400 text-amber-950 text-[10px] font-black uppercase">
                        Más Recomendado
                      </span>
                    )}
                  </div>

                  <div>
                    <h3 className="text-xl font-black">{plan.name}</h3>
                    <p className="text-xs opacity-75 mt-1 font-medium">
                      {plan.description}
                    </p>
                  </div>

                  <div className="flex items-baseline gap-1 py-1">
                    <span className="text-3xl font-black tracking-tight">
                      ${plan.priceArs.toLocaleString('es-AR')}
                    </span>
                    <span className="text-xs opacity-75">/ mes</span>
                  </div>

                  <div className="pt-3 border-t border-slate-200/30">
                    <span className="text-[10px] font-black uppercase tracking-wider opacity-75">Funciones incluidas:</span>
                    <ul className="space-y-2.5 text-xs pt-2 font-medium">
                      {(plan.features || []).map((feat, i) => (
                        <li key={i} className="flex items-start gap-2">
                          <CheckCircle2 className={`w-4 h-4 shrink-0 mt-0.5 ${isFeatured ? 'text-indigo-400' : 'text-emerald-600'}`} />
                          <span className="leading-snug">{feat}</span>
                        </li>
                      ))}
                    </ul>
                  </div>
                </div>

                <a
                  href={plan.mpCheckoutUrl || plan.checkoutUrl || 'https://mpago.la/sierras-chicas-saas'}
                  target="_blank"
                  rel="noopener noreferrer"
                  className={`w-full py-3.5 rounded-2xl font-black text-xs flex items-center justify-center gap-2 transition-all shadow-md active:scale-95 hf-shimmer-btn ${
                    isFeatured
                      ? 'bg-amber-500 hover:bg-amber-400 text-slate-950 shadow-amber-950/40'
                      : 'bg-slate-900 hover:bg-slate-800 text-white'
                  }`}
                >
                  <CreditCard className="w-4 h-4" />
                  <span>Contratar Plan</span>
                  <ExternalLink className="w-3.5 h-3.5 ml-0.5 opacity-80" />
                </a>
              </div>
            );
          })}
        </div>
      </section>

      {/* ======================================================== */}
      {/* 10. INSTAGRAM FEED DE SIERRAS CHICAS (DESKTOP & MOBILE)  */}
      {/* ======================================================== */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 w-full space-y-6">
        <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3">
          <div className="space-y-1">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-pink-50 text-pink-700 text-xs font-black border border-pink-200">
              <Instagram className="w-3.5 h-3.5" />
              <span>@SIERRASCHICASDIGITAL</span>
            </div>
            <h2 className="text-xl sm:text-3xl font-black text-slate-900">
              Comunidad en Instagram
            </h2>
            <p className="text-xs text-slate-500 font-medium">
              Seguinos en nuestras redes y descubrí los mejores rincones y propuestas del corredor.
            </p>
          </div>

          <a
            href="https://instagram.com"
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-2 px-5 py-2.5 rounded-2xl bg-gradient-to-r from-pink-600 via-rose-500 to-amber-500 text-white text-xs font-black shadow-md shadow-pink-600/20 hover:opacity-95 transition-all"
          >
            <Instagram className="w-4 h-4" />
            <span>Seguir en Instagram</span>
          </a>
        </div>

        {/* 4-Item Instagram Feed Grid */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
          {instagramPosts.map(post => (
            <a
              key={post.id}
              href={post.link}
              target="_blank"
              rel="noopener noreferrer"
              className="group relative rounded-3xl overflow-hidden bg-slate-900 aspect-square shadow-sm hover:shadow-xl transition-all border border-slate-200"
            >
              <img
                src={post.imageUrl}
                alt={post.caption}
                className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity p-4 flex flex-col justify-between text-white">
                <div className="flex items-center justify-end">
                  <Instagram className="w-4 h-4 text-pink-400" />
                </div>
                <div className="space-y-1">
                  <p className="text-[11px] font-bold line-clamp-2 leading-snug">{post.caption}</p>
                  <div className="flex items-center gap-3 text-[10px] text-pink-300 font-bold">
                    <span>❤️ {post.likes}</span>
                    <span>💬 {post.comments}</span>
                  </div>
                </div>
              </div>
            </a>
          ))}
        </div>
      </section>

      {/* ======================================================== */}
      {/* 11. SECCIÓN CONÓCENOS (REDISEÑADA & ACTUALIZADA)         */}
      {/* ======================================================== */}
      <section id="nosotros" className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 w-full">
        <div className="bg-white rounded-[2.5rem] p-6 sm:p-10 border border-slate-200 shadow-xl space-y-8">
          <div className="flex flex-col lg:flex-row items-center justify-between gap-8">
            <div className="space-y-4 max-w-2xl">
              <span className="text-xs font-black text-emerald-800 uppercase tracking-widest block">
                CONOCENOS
              </span>
              <h2 className="text-2xl sm:text-4xl font-black text-slate-900 tracking-tight">
                El motor digital del corredor de Sierras Chicas
              </h2>
              <p className="text-xs sm:text-sm text-slate-600 leading-relaxed font-medium">
                <strong>Sierras Chicas Digital</strong> es la plataforma regional creada para conectar a vecinos, turistas, comerciantes y profesionales matriculados en un solo lugar (desde La Calera hasta La Granja).
              </p>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 pt-2">
                <div className="p-4 rounded-2xl bg-emerald-50/70 border border-emerald-100 space-y-1.5">
                  <h4 className="font-black text-sm text-emerald-950 flex items-center gap-2">
                    <span>🏔️</span> Comercio de Cercanía
                  </h4>
                  <p className="text-xs text-emerald-900/80">
                    Fomentamos el consumo local, eliminando intermediarios y conectando clientes con locales en tiempo real.
                  </p>
                </div>
                <div className="p-4 rounded-2xl bg-amber-50/70 border border-amber-100 space-y-1.5">
                  <h4 className="font-black text-sm text-amber-950 flex items-center gap-2">
                    <span>⚡</span> Tecnología PWA & POS
                  </h4>
                  <p className="text-xs text-amber-900/80">
                    Herramientas ágiles para comandas en mostrador, carritos para WhatsApp y pagos inmediatos.
                  </p>
                </div>
              </div>
            </div>

            <div className="w-full lg:w-96 rounded-3xl overflow-hidden shadow-2xl border border-slate-100 bg-slate-900 shrink-0">
              <img
                src="https://images.unsplash.com/photo-1506744038136-46273834b3fb?w=800&auto=format&fit=crop&q=80"
                alt="Paisaje Sierras Chicas"
                className="w-full h-72 object-cover"
              />
            </div>
          </div>
        </div>
      </section>

      {/* ======================================================== */}
      {/* 12. PREGUNTAS FRECUENTES                                 */}
      {/* ======================================================== */}
      <section id="preguntas" className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-12 space-y-6 w-full">
        <div className="text-center space-y-2">
          <span className="text-xs font-black text-amber-600 uppercase tracking-widest block">
            DUDAS FRECUENTES
          </span>
          <h2 className="text-2xl sm:text-3xl font-black text-slate-900 tracking-tight">
            Preguntas Frecuentes
          </h2>
          <p className="text-xs text-slate-500 font-medium">
            Todo lo que necesitás saber sobre el uso del directorio y la publicación de comercios.
          </p>
        </div>

        <div className="space-y-3 pt-2">
          {faqs.map((faq, idx) => {
            const isOpen = openFaqIndex === idx;
            return (
              <div
                key={idx}
                className="bg-white rounded-2xl border border-slate-200 overflow-hidden shadow-xs transition-all"
              >
                <button
                  type="button"
                  onClick={() => setOpenFaqIndex(isOpen ? null : idx)}
                  className="w-full text-left p-4 sm:p-5 flex items-center justify-between gap-3 text-xs sm:text-sm font-black text-slate-900 hover:bg-slate-50"
                >
                  <span>{faq.q}</span>
                  <ChevronRight className={`w-4 h-4 text-slate-400 shrink-0 transition-transform ${isOpen ? 'rotate-90 text-amber-600' : ''}`} />
                </button>
                {isOpen && (
                  <div className="px-4 sm:px-5 pb-5 text-xs text-slate-600 leading-relaxed font-medium animate-in fade-in border-t border-slate-100 pt-3">
                    {faq.a}
                  </div>
                )}
              </div>
            );
          })}
        </div>
      </section>

      {/* ======================================================== */}
      {/* 13. SECCIÓN CONTACTO                                     */}
      {/* ======================================================== */}
      <section id="contacto" className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 w-full">
        <div className="bg-gradient-to-br from-slate-900 via-slate-950 to-slate-900 text-white rounded-[2.5rem] p-6 sm:p-10 border border-slate-800 shadow-2xl flex flex-col lg:flex-row items-center justify-between gap-8">
          <div className="space-y-3 max-w-xl text-center lg:text-left">
            <span className="text-xs font-black text-emerald-400 uppercase tracking-widest block">
              CANAL OFICIAL
            </span>
            <h2 className="text-2xl sm:text-4xl font-black text-white tracking-tight">
              ¿Querés comunicarte con nuestro equipo?
            </h2>
            <p className="text-xs sm:text-sm text-slate-300 font-medium leading-relaxed">
              Escribinos para sumar tu municipio, asociar tu cámara comercial o consultar por pauta destacada en el portal.
            </p>
          </div>

          <div className="flex flex-col sm:flex-row items-center gap-3 w-full lg:w-auto shrink-0">
            <a
              href={`https://wa.me/${(settings?.supportWhatsApp || '5493543000000').replace(/[^0-9]/g, '')}?text=${encodeURIComponent('Hola Sierras Chicas Digital, quiero contactarme.')}`}
              target="_blank"
              rel="noopener noreferrer"
              className="w-full sm:w-auto px-8 py-3.5 rounded-2xl bg-emerald-600 hover:bg-emerald-500 text-white font-black text-xs flex items-center justify-center gap-2 shadow-lg shadow-emerald-900/30 transition-transform active:scale-95"
            >
              <MessageCircle className="w-4 h-4" />
              <span>Contactar por WhatsApp</span>
            </a>
            <Link
              to="/login"
              className="w-full sm:w-auto px-6 py-3.5 rounded-2xl bg-white/10 hover:bg-white/20 text-white font-bold text-xs flex items-center justify-center gap-2 border border-white/10 backdrop-blur-md"
            >
              <Store className="w-4 h-4 text-amber-400" />
              <span>Acceso Comercios</span>
            </Link>
          </div>
        </div>
      </section>

      {/* ======================================================== */}
      {/* 14. PRE-FOOTER NEWSLETTER                                */}
      {/* ======================================================== */}
      <section className="relative overflow-hidden bg-gradient-to-r from-slate-950 via-slate-900 to-slate-950 text-white pt-12 pb-12 px-4 sm:px-6 lg:px-8 border-t border-slate-800">
        <div className="max-w-4xl mx-auto text-center space-y-5">
          <h2 className="text-2xl sm:text-4xl font-black text-white tracking-tight">
            Registrate para recibir las últimas novedades y promociones del corredor.
          </h2>
          <p className="text-xs sm:text-sm text-slate-300 max-w-xl mx-auto font-medium">
            Recibí promociones exclusivas de comercios de Sierras Chicas o sumá tu emprendimiento a la red oficial.
          </p>

          <form onSubmit={handleNewsletterSubmit} className="max-w-md mx-auto flex flex-col sm:flex-row gap-2 pt-2">
            <input
              type="email"
              required
              value={newsletterEmail}
              onChange={e => setNewsletterEmail(e.target.value)}
              placeholder="Ingresá tu correo electrónico..."
              className="flex-1 px-4 py-3.5 rounded-2xl bg-white text-slate-900 text-xs placeholder:text-slate-400 focus:outline-none font-bold"
            />
            <button
              type="submit"
              className="bg-amber-500 hover:bg-amber-400 text-slate-950 font-black px-7 py-3.5 rounded-2xl text-xs flex items-center justify-center gap-2 shadow-lg transition-transform active:scale-95 shrink-0 hf-shimmer-btn"
            >
              <span>{newsletterSuccess ? '¡Registrado!' : 'Suscribirme'}</span>
              <ArrowRight className="w-4 h-4" />
            </button>
          </form>

          {newsletterSuccess && (
            <p className="text-xs text-emerald-400 font-bold animate-in fade-in">
              ✓ ¡Gracias por sumarte a la comunidad de Sierras Chicas Digital!
            </p>
          )}
        </div>
      </section>

    </div>
  );
}
