import React, { useState, useRef, useEffect } from 'react';
import { Link } from 'react-router-dom';
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
  Download
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

  const [filterMode, setFilterMode] = useState('all'); // 'all', 'aviso', 'tienda', 'servicios'
  const [viewMode, setViewMode] = useState('grid'); // 'grid' | 'list'
  const [isSearchFocused, setIsSearchFocused] = useState(false);
  const [newsletterEmail, setNewsletterEmail] = useState('');
  const [newsletterSuccess, setNewsletterSuccess] = useState(false);
  
  // Interactive Merchant Growth Simulator State
  const [simulatorGoal, setSimulatorGoal] = useState('pro'); // 'inicial', 'pro', 'full'
  const [activeRadarCity, setActiveRadarCity] = useState(null);

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

  // Filter businesses with multi-level taxonomy, products, tags, and locations
  const filteredBusinesses = businesses.filter(biz => {
    // Search query matching
    if (searchQuery.trim()) {
      const q = searchQuery.toLowerCase();
      
      const matchName = biz.name?.toLowerCase().includes(q);
      const matchDesc = biz.description?.toLowerCase().includes(q);
      const matchTag = biz.tagline?.toLowerCase().includes(q);
      const matchLoc = (biz.locationName || biz.location)?.toLowerCase().includes(q);
      const matchCat = (biz.categoryName || biz.category)?.toLowerCase().includes(q);
      const matchSub = (biz.subcategory || '')?.toLowerCase().includes(q);
      const matchTags = (biz.tags || []).some(t => t.toLowerCase().includes(q));

      // Match in products sold by this business
      const bizProducts = products.filter(p => p.businessId === biz.id);
      const matchProduct = bizProducts.some(p => 
        p.name.toLowerCase().includes(q) || 
        (p.categoryName && p.categoryName.toLowerCase().includes(q)) ||
        (p.tags && p.tags.some(t => t.toLowerCase().includes(q)))
      );

      // Match if the query matches the parent category of this business
      const catObj = categories.find(c => c.id === biz.categoryId || c.name === biz.categoryName);
      const matchCatSubs = catObj?.subcategories?.some(s => s.toLowerCase().includes(q));

      if (!matchName && !matchDesc && !matchTag && !matchLoc && !matchCat && !matchSub && !matchTags && !matchProduct && !matchCatSubs) {
        return false;
      }
    }

    // Location filter
    if (selectedLocation !== 'all') {
      const loc = locations.find(l => l.slug === selectedLocation);
      if (loc && biz.locationId !== loc.id && (biz.locationName || biz.location)?.toLowerCase() !== loc.name.toLowerCase()) {
        return false;
      }
    }

    // Category filter
    if (selectedCategory !== 'all') {
      const cat = categories.find(c => c.slug === selectedCategory);
      if (cat && biz.categoryId !== cat.id && (biz.categoryName || biz.category)?.toLowerCase() !== cat.name.toLowerCase()) {
        return false;
      }
    }

    // Subcategory filter
    if (selectedSubcategory !== 'all') {
      if (biz.subcategory !== selectedSubcategory && !(biz.tags || []).includes(selectedSubcategory)) {
        return false;
      }
    }

    // Business mode filter
    if (filterMode !== 'all' && biz.businessMode !== filterMode) {
      return false;
    }

    return true;
  });

  const storesCount = businesses.filter(b => b.businessMode === 'tienda').length;

  const scrollToDirectory = () => {
    if (directorySectionRef.current) {
      directorySectionRef.current.scrollIntoView({ behavior: 'smooth' });
    }
  };

  const handleSelectTaxonomyItem = (item) => {
    if (item.type === 'rubro') {
      setSelectedCategory(item.catSlug);
      setSelectedSubcategory('all');
      setSearchQuery('');
    } else if (item.type === 'subcategoria') {
      setSelectedCategory(item.catSlug);
      setSelectedSubcategory(item.sub);
      setSearchQuery('');
    }
    setIsSearchFocused(false);
    scrollToDirectory();
  };

  const handleCategoryCardClick = (catSlug) => {
    setSelectedCategory(catSlug);
    setSelectedSubcategory('all');
    scrollToDirectory();
  };

  const handleSubcategoryClick = (catSlug, subName) => {
    setSelectedCategory(catSlug);
    setSelectedSubcategory(subName);
    scrollToDirectory();
  };

  const handleSelectLocation = (locSlug) => {
    setSelectedLocation(locSlug);
    setActiveRadarCity(locSlug);
    scrollToDirectory();
  };

  const handleFilterStoresOnly = () => {
    setFilterMode('tienda');
    setSelectedCategory('all');
    setSelectedSubcategory('all');
    scrollToDirectory();
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

  // Map category icons helper
  const getCategoryIcon = (slug) => {
    switch(slug) {
      case 'gastronomia': return <Utensils className="w-6 h-6 text-amber-500" />;
      case 'construccion-hogar': return <Wrench className="w-6 h-6 text-indigo-500" />;
      case 'salud-bienestar': return <Stethoscope className="w-6 h-6 text-emerald-500" />;
      case 'turismo-alojamiento': return <Palmtree className="w-6 h-6 text-teal-500" />;
      case 'comercios-tiendas': return <ShoppingBag className="w-6 h-6 text-rose-500" />;
      case 'automotor': return <Car className="w-6 h-6 text-cyan-500" />;
      default: return <Building2 className="w-6 h-6 text-amber-500" />;
    }
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

  const currentBanner = sponsoredBanners && sponsoredBanners.length > 0
    ? sponsoredBanners[activeBannerIndex]
    : null;

  return (
    <div className="flex-1 flex flex-col w-full pb-0 animate-in fade-in bg-[#f8fafc] text-slate-900 selection:bg-amber-500 selection:text-slate-950 font-sans">
      
      {/* ======================================================== */}
      {/* 1. HERO 9 SECTION (REACT BITS PRO - SIERRAS CHICAS)     */}
      {/* ======================================================== */}
      <Hero9Section
        searchQuery={searchQuery}
        setSearchQuery={setSearchQuery}
        selectedLocation={selectedLocation}
        setSelectedLocation={setSelectedLocation}
        locations={locations}
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
                    setSearchQuery(item.cat);
                    setSelectedLocation(locations.find(l => l.name.toLowerCase() === item.city.toLowerCase())?.slug || 'all');
                    scrollToDirectory();
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
      {/* 3. NOVELTY SECTION: "VER TIENDAS ONLINE" (PAGE 1 REQUIREMENT) */}
      {/* ======================================================== */}
      <section id="tiendas-destacadas" className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-10 pb-4 w-full">
        <div className="relative overflow-hidden rounded-[2.5rem] bg-gradient-to-r from-emerald-900 via-teal-900 to-slate-950 text-white p-6 sm:p-8 shadow-2xl border border-emerald-700/40">
          
          {/* Ambient Glow */}
          <div className="absolute top-0 right-0 w-96 h-96 bg-emerald-500/20 rounded-full blur-3xl pointer-events-none"></div>
          <div className="absolute -bottom-10 left-1/3 w-64 h-64 bg-amber-500/15 rounded-full blur-2xl pointer-events-none"></div>

          <div className="relative z-10 flex flex-col lg:flex-row items-center justify-between gap-6">
            <div className="space-y-2.5 text-center lg:text-left max-w-2xl">
              <div className="inline-flex items-center gap-2 px-3.5 py-1 rounded-full bg-emerald-500/20 text-emerald-300 text-xs font-black border border-emerald-400/30">
                <ShoppingBag className="w-3.5 h-3.5" />
                <span>VENTA DIRECTA & GÓNDOLA VIRTUAL</span>
              </div>
              <h2 className="text-2xl sm:text-3xl lg:text-4xl font-black text-white tracking-tight leading-tight">
                ¿Buscás comprar online directo? Explorá todas las Tiendas con Carrito del Valle
              </h2>
              <p className="text-xs sm:text-sm text-emerald-100/90 font-medium leading-relaxed">
                Entrá a las cartas gastronómicas y catálogos de almacenes con precios actualizados, delivery por zona y checkout inmediato a WhatsApp.
              </p>
            </div>

            <div className="flex flex-col sm:flex-row items-center gap-3 w-full lg:w-auto shrink-0">
              <button
                type="button"
                onClick={handleFilterStoresOnly}
                className="w-full sm:w-auto px-8 py-4 rounded-2xl bg-gradient-to-r from-amber-400 via-amber-300 to-amber-400 hover:from-amber-300 hover:to-amber-200 text-slate-950 font-black text-xs sm:text-sm shadow-xl shadow-amber-500/30 flex items-center justify-center gap-2.5 transition-all transform hover:scale-105 active:scale-95 hf-shimmer-btn"
              >
                <ShoppingBag className="w-4 h-4 text-slate-950" />
                <span>Ver Tiendas Online ({storesCount})</span>
                <ArrowRight className="w-4 h-4" />
              </button>
            </div>
          </div>

        </div>
      </section>

      {/* ======================================================== */}
      {/* 4. RADAR SERRANO · CORREDOR RUTA E-53 (PAGE 1 REQUIREMENT) */}
      {/* ======================================================== */}
      <section id="radar-serrano" className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-6 pb-8 w-full">
        <div className="bg-gradient-to-br from-slate-900 via-[#0e172a] to-slate-950 rounded-[2.5rem] p-6 sm:p-10 text-white shadow-2xl relative overflow-hidden border border-slate-800">
          
          {/* Ambient Background Grid */}
          <div className="absolute inset-0 bg-[radial-gradient(#38bdf8_1px,transparent_1px)] [background-size:24px_24px] opacity-10 pointer-events-none"></div>

          <div className="relative z-10 flex flex-col lg:flex-row items-center justify-between gap-8">
            
            {/* Title & Info */}
            <div className="space-y-3 text-center lg:text-left max-w-lg">
              <div className="inline-flex items-center gap-2 px-3.5 py-1 rounded-full bg-teal-500/10 text-teal-400 text-xs font-black border border-teal-500/20">
                <Compass className="w-3.5 h-3.5" />
                <span>RADAR SERRANO · CORREDOR RUTA E-53</span>
              </div>
              <h2 className="text-2xl sm:text-3xl font-black tracking-tight text-white">
                Explorá ciudad por ciudad
              </h2>
              <p className="text-xs sm:text-sm text-slate-300 leading-relaxed font-medium">
                Seleccioná una localidad para activar el radar y filtrar al instante todos los comercios, prestadores y cartas gastronómicas disponibles.
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
                    className={`relative p-4 rounded-2xl text-left transition-all duration-300 border flex flex-col justify-between group overflow-hidden ${
                      isActive
                        ? 'bg-gradient-to-br from-amber-500 to-amber-600 text-slate-950 border-amber-300 shadow-xl shadow-amber-500/30 scale-105'
                        : 'bg-white/5 hover:bg-white/10 text-white border-white/10 hover:border-white/20 backdrop-blur-md'
                    }`}
                  >
                    {/* Animated Pulsing Radar Beacon */}
                    <div className="flex items-center justify-between w-full">
                      <span className="text-lg">🏔️</span>
                      <span className="relative flex h-3 w-3">
                        {isActive && <span className="hf-radar-ripple absolute inline-flex h-full w-full rounded-full bg-slate-950 opacity-75"></span>}
                        <span className={`relative inline-flex rounded-full h-3 w-3 ${isActive ? 'bg-slate-950' : 'bg-emerald-400'}`}></span>
                      </span>
                    </div>

                    <div className="pt-3">
                      <h4 className={`font-black text-sm leading-tight ${isActive ? 'text-slate-950' : 'text-white'}`}>
                        {loc.name}
                      </h4>
                      <span className={`text-[11px] font-bold block mt-0.5 ${isActive ? 'text-slate-900' : 'text-slate-400'}`}>
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
      {/* 5. SPONSORED CAROUSEL BANNER (PAGE 1 REQUIREMENT)        */}
      {/* ======================================================== */}
      {currentBanner && (
        <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4 w-full">
          <div className="relative rounded-[2.5rem] overflow-hidden bg-slate-950 border border-slate-800 shadow-xl">
            
            {/* Background Cover Image with Rich Gradient */}
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
      {/* 6. PWA PROMO CARD (PAGE 2 REQUIREMENT - "QUEDA COMO ESTA") */}
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
              Instalá nuestra App en tu celular y consultá los comercios incluso sin conexión de datos en todo Sierras Chicas.
            </p>
          </div>

          <div className="flex items-center gap-3 z-10">
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
      {/* 7. FEATURED LISTINGS SECTION (CATÁLOGO REGIONAL)         */}
      {/* ======================================================== */}
      <section ref={directorySectionRef} id="catalogo-directorio" className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10 space-y-7 w-full">
        
        {/* Header with Mode Filter & Switcher */}
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 pb-4 border-b border-slate-200">
          <div>
            <span className="text-xs font-black text-amber-600 uppercase tracking-widest block">
              CATÁLOGO REGIONAL
            </span>
            <h2 className="text-2xl sm:text-3xl font-black text-slate-900 tracking-tight">
              Anuncios & Comercios Destacados
            </h2>
            <p className="text-xs text-slate-500 mt-0.5 font-medium">
              Mostrando {filteredBusinesses.length} comercios y prestadores disponibles
            </p>
          </div>

          <div className="flex flex-wrap items-center gap-3">
            {/* Mode Pills */}
            <div className="flex items-center gap-1 bg-slate-200/80 p-1.5 rounded-2xl overflow-x-auto no-scrollbar">
              <button
                type="button"
                onClick={() => { setFilterMode('all'); setSelectedCategory('all'); setSelectedSubcategory('all'); }}
                className={`px-3.5 py-1.5 rounded-xl text-xs font-bold transition-all ${
                  filterMode === 'all' && selectedCategory === 'all' ? 'bg-white text-slate-900 shadow-sm' : 'text-slate-600 hover:text-slate-900'
                }`}
              >
                Todos
              </button>
              <button
                type="button"
                onClick={() => setFilterMode('tienda')}
                className={`px-3.5 py-1.5 rounded-xl text-xs font-bold transition-all ${
                  filterMode === 'tienda' ? 'bg-white text-slate-900 shadow-sm' : 'text-slate-600 hover:text-slate-900'
                }`}
              >
                🛍️ Tiendas
              </button>
              <button
                type="button"
                onClick={() => setFilterMode('servicios')}
                className={`px-3.5 py-1.5 rounded-xl text-xs font-bold transition-all ${
                  filterMode === 'servicios' ? 'bg-white text-slate-900 shadow-sm' : 'text-slate-600 hover:text-slate-900'
                }`}
              >
                🔧 Servicios
              </button>
              <button
                type="button"
                onClick={() => setFilterMode('aviso')}
                className={`px-3.5 py-1.5 rounded-xl text-xs font-bold transition-all ${
                  filterMode === 'aviso' ? 'bg-white text-slate-900 shadow-sm' : 'text-slate-600 hover:text-slate-900'
                }`}
              >
                📢 Avisos
              </button>
            </div>

            {/* Grid / List Switcher */}
            <div className="flex items-center gap-1 bg-slate-200/80 p-1.5 rounded-2xl">
              <button
                type="button"
                onClick={() => setViewMode('grid')}
                className={`p-1.5 rounded-xl transition-colors ${
                  viewMode === 'grid' ? 'bg-white text-slate-900 shadow-sm' : 'text-slate-500 hover:text-slate-900'
                }`}
                title="Vista Cuadrícula"
              >
                <LayoutGrid className="w-4 h-4" />
              </button>
              <button
                type="button"
                onClick={() => setViewMode('list')}
                className={`p-1.5 rounded-xl transition-colors ${
                  viewMode === 'list' ? 'bg-white text-slate-900 shadow-sm' : 'text-slate-500 hover:text-slate-900'
                }`}
                title="Vista Lista"
              >
                <List className="w-4 h-4" />
              </button>
            </div>
          </div>
        </div>

        {/* Selected Filter Tags */}
        {(selectedCategory !== 'all' || selectedSubcategory !== 'all' || selectedLocation !== 'all') && (
          <div className="flex flex-wrap items-center gap-2 p-3.5 bg-amber-50/80 rounded-2xl animate-in fade-in border border-amber-100">
            <span className="text-xs font-bold text-amber-900">Filtros activos:</span>
            {selectedCategory !== 'all' && (
              <span className="inline-flex items-center gap-1 px-3 py-1 rounded-full bg-white text-xs font-bold text-slate-800 shadow-xs border border-amber-200/60">
                Rubro: {categories.find(c => c.slug === selectedCategory)?.name}
                <button type="button" onClick={() => setSelectedCategory('all')} className="hover:text-rose-600 ml-1 font-black">×</button>
              </span>
            )}
            {selectedSubcategory !== 'all' && (
              <span className="inline-flex items-center gap-1 px-3 py-1 rounded-full bg-white text-xs font-bold text-slate-800 shadow-xs border border-amber-200/60">
                Subcategoría: {selectedSubcategory}
                <button type="button" onClick={() => setSelectedSubcategory('all')} className="hover:text-rose-600 ml-1 font-black">×</button>
              </span>
            )}
            {selectedLocation !== 'all' && (
              <span className="inline-flex items-center gap-1 px-3 py-1 rounded-full bg-white text-xs font-bold text-slate-800 shadow-xs border border-amber-200/60">
                Localidad: {locations.find(l => l.slug === selectedLocation)?.name}
                <button type="button" onClick={() => setSelectedLocation('all')} className="hover:text-rose-600 ml-1 font-black">×</button>
              </span>
            )}
            <button
              type="button"
              onClick={() => { setSelectedCategory('all'); setSelectedSubcategory('all'); setSelectedLocation('all'); setSearchQuery(''); }}
              className="text-xs text-amber-800 font-bold underline ml-auto hover:text-amber-950"
            >
              Limpiar todo
            </button>
          </div>
        )}

        {/* Listings Content */}
        {filteredBusinesses.length === 0 ? (
          <div className="py-16 text-center bg-white rounded-3xl p-8 space-y-3 shadow-sm border border-slate-100">
            <Store className="w-12 h-12 text-slate-300 mx-auto" />
            <h4 className="font-extrabold text-base text-slate-900">No se encontraron comercios</h4>
            <p className="text-xs text-slate-500 max-w-sm mx-auto font-medium">
              Probá cambiando los términos de búsqueda o seleccionando otra localidad en el radar.
            </p>
            <button
              type="button"
              onClick={() => { setSearchQuery(''); setSelectedCategory('all'); setSelectedLocation('all'); setSelectedSubcategory('all'); setFilterMode('all'); }}
              className="px-4 py-2 rounded-xl bg-slate-900 text-white text-xs font-bold shadow-sm hover:bg-slate-800"
            >
              Restablecer filtros
            </button>
          </div>
        ) : viewMode === 'grid' ? (
          /* 4-Column Responsive Grid */
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {filteredBusinesses.map(biz => {
              const isFav = favorites.includes(biz.id);
              const isNotice = biz.businessMode === 'aviso' || biz.businessMode === 'catalogo';
              const isService = biz.businessMode === 'servicios';
              const targetUrl = isNotice ? `/aviso/${biz.slug}` : isService ? `/comercio/${biz.slug}` : `/tienda/${biz.slug}`;
              const ctaLabel = isNotice ? 'Ver Ficha & Contacto' : isService ? 'Pedir Presupuesto' : 'Ver Carta & Pedir';

              return (
                <div
                  key={biz.id}
                  className="group bg-white rounded-[2rem] overflow-hidden shadow-sm hover:shadow-2xl hover:-translate-y-2 transition-all duration-300 flex flex-col justify-between border border-slate-100/90"
                >
                  <div>
                    {/* Cover & Badges */}
                    <div className="relative h-44 w-full overflow-hidden bg-slate-900">
                      <img
                        src={biz.coverUrl || 'https://images.unsplash.com/photo-1555396273-367ea4eb4db5?w=600&auto=format&fit=crop&q=80'}
                        alt={biz.name}
                        className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700"
                      />
                      <div className="absolute inset-0 bg-gradient-to-t from-slate-950/90 via-transparent to-transparent"></div>

                      {/* Favorite Button */}
                      <button
                        type="button"
                        onClick={() => toggleFavorite(biz.id)}
                        className={`absolute top-3 right-3 w-8 h-8 rounded-full backdrop-blur-md flex items-center justify-center transition-all ${
                          isFav ? 'bg-rose-500 text-white scale-110' : 'bg-black/40 text-white hover:bg-black/60'
                        }`}
                        title="Guardar favorito"
                      >
                        <Heart className={`w-3.5 h-3.5 ${isFav ? 'fill-white' : ''}`} />
                      </button>

                      {/* Mode Badge */}
                      <div className="absolute top-3 left-3">
                        <span className={`px-2.5 py-1 rounded-full text-[9px] font-black uppercase tracking-wider backdrop-blur-md text-white shadow-sm ${
                          isNotice ? 'bg-indigo-600/90' : isService ? 'bg-amber-600/90' : 'bg-teal-600/90'
                        }`}>
                          {isNotice ? 'Aviso' : isService ? 'Servicio' : 'Tienda'}
                        </span>
                      </div>

                      {/* Location in Cover */}
                      <div className="absolute bottom-3 left-3 text-white flex items-center gap-1 text-xs font-bold drop-shadow">
                        <MapPin className="w-3.5 h-3.5 text-emerald-400" />
                        <span>{biz.locationName || biz.location}</span>
                      </div>
                    </div>

                    {/* Card Body */}
                    <div className="p-5 space-y-2.5">
                      <div className="flex items-center justify-between text-xs">
                        <span className="font-black text-amber-700">{biz.categoryName || biz.category}</span>
                        <div className="flex items-center gap-1 text-amber-500 font-black">
                          <Star className="w-3.5 h-3.5 fill-amber-500" />
                          <span>{biz.rating || 5.0}</span>
                        </div>
                      </div>

                      <h3 className="font-black text-base text-slate-900 leading-snug group-hover:text-amber-600 transition-colors line-clamp-1">
                        {biz.name}
                      </h3>

                      <p className="text-xs text-slate-500 line-clamp-2 leading-relaxed font-medium">
                        {biz.tagline || biz.description}
                      </p>

                      {/* Tags */}
                      {biz.tags && biz.tags.length > 0 && (
                        <div className="flex flex-wrap gap-1 pt-1">
                          {biz.tags.slice(0, 2).map((tag, idx) => (
                            <span
                              key={idx}
                              className="px-2.5 py-0.5 rounded-lg bg-slate-100 text-[10px] font-bold text-slate-600"
                            >
                              {tag}
                            </span>
                          ))}
                        </div>
                      )}
                    </div>
                  </div>

                  {/* Footer Action */}
                  <div className="p-5 pt-0">
                    <Link
                      to={targetUrl}
                      className="w-full py-2.5 rounded-xl bg-slate-100 hover:bg-amber-500 hover:text-slate-950 text-slate-800 text-xs font-black flex items-center justify-center gap-1.5 transition-all group-hover:bg-amber-500 group-hover:text-slate-950"
                    >
                      <span>{ctaLabel}</span>
                      <ArrowRight className="w-3.5 h-3.5" />
                    </Link>
                  </div>
                </div>
              );
            })}
          </div>
        ) : (
          /* COMPACT LIST VIEW */
          <div className="space-y-3">
            {filteredBusinesses.map(biz => {
              const isFav = favorites.includes(biz.id);
              const isNotice = biz.businessMode === 'aviso' || biz.businessMode === 'catalogo';
              const isService = biz.businessMode === 'servicios';
              const targetUrl = isNotice ? `/aviso/${biz.slug}` : isService ? `/comercio/${biz.slug}` : `/tienda/${biz.slug}`;
              const ctaLabel = isNotice ? 'Ver Ficha & Contacto' : isService ? 'Pedir Presupuesto' : 'Ver Carta & Pedir';

              return (
                <div
                  key={biz.id}
                  className="bg-white p-4 sm:p-5 rounded-3xl shadow-sm hover:shadow-md transition-all flex flex-col sm:flex-row sm:items-center justify-between gap-4 border border-slate-100/90"
                >
                  <div className="flex items-center gap-4">
                    <div className="w-16 h-16 sm:w-20 sm:h-20 rounded-2xl overflow-hidden bg-slate-900 shrink-0">
                      <img
                        src={biz.coverUrl || 'https://images.unsplash.com/photo-1555396273-367ea4eb4db5?w=600&auto=format&fit=crop&q=80'}
                        alt={biz.name}
                        className="w-full h-full object-cover"
                      />
                    </div>

                    <div className="space-y-1">
                      <div className="flex items-center gap-2">
                        <span className={`px-2 py-0.5 rounded-full text-[9px] font-black uppercase ${
                          isNotice ? 'bg-indigo-50 text-indigo-700' : isService ? 'bg-amber-50 text-amber-700' : 'bg-teal-50 text-teal-700'
                        }`}>
                          {isNotice ? 'Aviso' : isService ? 'Servicio' : 'Tienda'}
                        </span>
                        <span className="text-xs font-bold text-amber-700">{biz.categoryName || biz.category}</span>
                        <span className="text-slate-300 text-xs">·</span>
                        <span className="text-xs text-slate-500 flex items-center gap-1 font-bold">
                          <MapPin className="w-3 h-3 text-emerald-600" />
                          {biz.locationName || biz.location}
                        </span>
                      </div>

                      <h3 className="font-black text-sm sm:text-base text-slate-900">
                        {biz.name}
                      </h3>

                      <p className="text-xs text-slate-500 line-clamp-1 font-medium">
                        {biz.tagline || biz.description}
                      </p>
                    </div>
                  </div>

                  <div className="flex items-center justify-between sm:justify-end gap-3 pt-2 sm:pt-0 border-t sm:border-t-0 border-slate-100 shrink-0">
                    <div className="flex items-center gap-1 text-amber-500 font-black text-xs">
                      <Star className="w-3.5 h-3.5 fill-amber-500" />
                      <span>{biz.rating || 5.0}</span>
                    </div>

                    <Link
                      to={targetUrl}
                      className="px-5 py-2.5 rounded-xl bg-slate-900 hover:bg-slate-800 text-white text-xs font-black flex items-center gap-1.5 shadow-sm transition-all"
                    >
                      <span>{ctaLabel}</span>
                      <ArrowRight className="w-3.5 h-3.5" />
                    </Link>
                  </div>
                </div>
              );
            })}
          </div>
        )}
      </section>

      {/* ======================================================== */}
      {/* 8. MULTI-COLUMN CATEGORY DIRECTORY (2-Column Bento Cards) */}
      {/* ======================================================== */}
      <section id="categorias-guia" className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-14 space-y-8 w-full">
        <div className="text-center space-y-2 max-w-2xl mx-auto">
          <span className="text-xs font-black text-amber-600 uppercase tracking-widest block">
            EXPLORA LA GUÍA COMERCIAL COMPLETA
          </span>
          <h2 className="text-2xl sm:text-4xl font-black text-slate-900 tracking-tight">
            Elegí la categoría del producto o servicio que buscás
          </h2>
          <p className="text-xs sm:text-sm text-slate-500 leading-relaxed font-medium">
            Accedé directamente a las subcategorías especializadas para encontrar el prestador que necesitás en tu localidad.
          </p>
        </div>

        {/* 2-Column Bento Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {categories.map(cat => (
            <div
              key={cat.id}
              className="bg-white rounded-[2rem] p-6 shadow-sm hover:shadow-xl transition-all duration-300 flex flex-col sm:flex-row gap-6 border border-slate-100"
            >
              {/* Category Header */}
              <div className="sm:w-44 flex flex-col justify-between space-y-4 pb-4 sm:pb-0 sm:pr-4 border-b sm:border-b-0 sm:border-r border-slate-100">
                <div className="space-y-2">
                  <div className="w-14 h-14 rounded-2xl bg-amber-500/10 text-2xl flex items-center justify-center shadow-xs">
                    {cat.emoji || getCategoryIcon(cat.slug)}
                  </div>
                  <h3 className="font-black text-base text-slate-900 leading-tight">
                    {cat.name}
                  </h3>
                  <span className="text-[11px] font-bold text-slate-400 block">
                    {(cat.subcategories || []).length} especialidades
                  </span>
                </div>

                <button
                  type="button"
                  onClick={() => handleCategoryCardClick(cat.slug)}
                  className="px-4 py-2 rounded-xl bg-slate-100 hover:bg-amber-500 hover:text-slate-950 text-slate-800 text-xs font-black flex items-center justify-center gap-1.5 transition-colors"
                >
                  <span>Ver Rubro</span>
                  <ArrowRight className="w-3.5 h-3.5" />
                </button>
              </div>

              {/* Subcategories List */}
              <div className="flex-1 space-y-1 divide-y divide-slate-100">
                {(cat.subcategories || []).map((sub, idx) => (
                  <button
                    key={idx}
                    type="button"
                    onClick={() => handleSubcategoryClick(cat.slug, sub)}
                    className="w-full text-left py-2.5 px-2 rounded-xl hover:bg-slate-50 flex items-center justify-between text-xs text-slate-700 hover:text-slate-950 font-semibold transition-colors group"
                  >
                    <span className="group-hover:translate-x-1 transition-transform">{sub}</span>
                    <ChevronRight className="w-4 h-4 text-slate-300 group-hover:text-amber-600 transition-colors" />
                  </button>
                ))}
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* ======================================================== */}
      {/* 9. MERCHANT GROWTH SIMULATOR & SAAS PLANS (PAGE 3 & 4)    */}
      {/* ======================================================== */}
      <section id="planes-saas" className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16 space-y-10 w-full border-t border-slate-200">
        
        {/* Interactive Growth Simulator Header (Updated Title & Configurable Levels) */}
        <div className="bg-gradient-to-br from-indigo-950 via-slate-900 to-indigo-950 text-white rounded-[2.5rem] p-6 sm:p-10 shadow-2xl space-y-8 border border-indigo-900/40 relative overflow-hidden">
          
          <div className="absolute -top-24 -right-24 w-80 h-80 rounded-full bg-amber-500/10 blur-[100px] pointer-events-none"></div>

          <div className="max-w-3xl space-y-3">
            <h2 className="text-2xl sm:text-4xl font-black tracking-tight text-white">
              ¿Cuánto querés hacer crecer tu negocio?
            </h2>
            <p className="text-xs sm:text-sm text-slate-300 font-medium">
              Elegí tu objetivo y descubrí la herramienta de venta directa por WhatsApp que mejor se adapta a tu emprendimiento:
            </p>
          </div>

          {/* Simulator Toggle Pills (Rendered dynamically from configurable levels) */}
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 pt-2">
            {simulatorLevels.map((lvl) => {
              const isSelected = simulatorGoal === lvl.id;
              return (
                <button
                  key={lvl.id}
                  type="button"
                  onClick={() => setSimulatorGoal(lvl.id)}
                  className={`p-4 rounded-2xl text-left border transition-all duration-300 ${
                    isSelected
                      ? 'bg-amber-500 text-slate-950 border-amber-300 shadow-lg shadow-amber-500/30 scale-[1.02]'
                      : 'bg-white/5 hover:bg-white/10 text-white border-white/10'
                  }`}
                >
                  <div className="text-xs font-black uppercase tracking-wider">{lvl.levelTag}</div>
                  <div className="text-base font-black mt-1">{lvl.title}</div>
                  <p className={`text-[11px] mt-1 ${isSelected ? 'text-slate-900 font-bold' : 'text-slate-400'}`}>
                    {lvl.description}
                  </p>
                </button>
              );
            })}
          </div>

        </div>

        {/* Public SaaS Plans Pricing Grid (Configured from SaaS Admin) */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 max-w-6xl mx-auto">
          {plans.map(plan => {
            const isMatch = (simulatorGoal === 'inicial' && (plan.id === 'plan-1' || plan.id === 'plan-inicial')) ||
                            (simulatorGoal === 'pro' && (plan.id === 'plan-2' || plan.id === 'plan-pro')) ||
                            (simulatorGoal === 'full' && (plan.id === 'plan-3' || plan.id === 'plan-full' || plan.id === 'plan-vip'));

            return (
              <div
                key={plan.id}
                className={`p-7 rounded-[2rem] flex flex-col justify-between space-y-5 transition-all duration-300 shadow-sm hover:shadow-2xl ${
                  plan.isFeatured || isMatch
                    ? 'bg-gradient-to-b from-slate-950 via-indigo-950 to-slate-950 text-white shadow-2xl shadow-indigo-950/40 ring-2 ring-indigo-500/50 scale-[1.02]'
                    : 'bg-white text-slate-900 border border-slate-100'
                }`}
              >
                <div className="space-y-4">
                  <div className="flex items-center justify-between">
                    <span className={`px-2.5 py-0.5 rounded-full text-[10px] font-black uppercase ${
                      plan.isFeatured || isMatch ? 'bg-indigo-600 text-white' : 'bg-slate-100 text-slate-600'
                    }`}>
                      {plan.slug}
                    </span>
                    {(plan.isFeatured || isMatch) && (
                      <span className="px-2.5 py-0.5 rounded-full bg-amber-400 text-amber-950 text-[10px] font-black uppercase">
                        {isMatch ? '⭐ Tu Elección' : 'Más Popular'}
                      </span>
                    )}
                  </div>

                  <div>
                    <h3 className="text-xl font-black">{plan.name}</h3>
                    <p className="text-xs opacity-75 mt-1 font-medium">
                      {plan.description || (plan.id === 'plan-1' ? 'Ideal para profesionales y avisos simples' : plan.id === 'plan-2' ? 'Ideal para comercios y gastronomía con pedidos' : 'Ideal para marcas consolidadas y cadenas')}.
                    </p>
                  </div>

                  <div className="flex items-baseline gap-1 py-1">
                    <span className="text-3xl font-black tracking-tight">
                      ${plan.priceArs.toLocaleString('es-AR')}
                    </span>
                    <span className="text-xs opacity-75">/ mes</span>
                  </div>

                  <div className="pt-3 border-t border-slate-200/30">
                    <span className="text-[10px] font-black uppercase tracking-wider opacity-75">Incluye:</span>
                    <ul className="space-y-2.5 text-xs pt-2 font-medium">
                      {plan.features.map((feat, i) => (
                        <li key={i} className="flex items-start gap-2">
                          <CheckCircle2 className={`w-4 h-4 shrink-0 mt-0.5 ${(plan.isFeatured || isMatch) ? 'text-indigo-400' : 'text-emerald-600'}`} />
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
                    plan.isFeatured || isMatch
                      ? 'bg-amber-500 hover:bg-amber-400 text-slate-950 shadow-amber-950/40'
                      : 'bg-slate-900 hover:bg-slate-800 text-white'
                  }`}
                >
                  <CreditCard className="w-4 h-4" />
                  <span>Contratar con Mercado Pago</span>
                  <ExternalLink className="w-3.5 h-3.5 ml-0.5 opacity-80" />
                </a>
              </div>
            );
          })}
        </div>
      </section>

      {/* ======================================================== */}
      {/* 10. SECCIÓN NOSOTROS (PAGE 1 REQUIREMENT)                 */}
      {/* ======================================================== */}
      <section id="nosotros" className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-14 w-full">
        <div className="bg-white rounded-[2.5rem] p-6 sm:p-10 border border-slate-100 shadow-xl space-y-8">
          <div className="flex flex-col lg:flex-row items-center justify-between gap-8">
            <div className="space-y-4 max-w-2xl">
              <span className="text-xs font-black text-emerald-800 uppercase tracking-widest block">
                CONOCENOS
              </span>
              <h2 className="text-2xl sm:text-4xl font-black text-slate-900 tracking-tight">
                El corazón digital del valle de Sierras Chicas
              </h2>
              <p className="text-xs sm:text-sm text-slate-600 leading-relaxed font-medium">
                <strong>Sierras Chicas Digital</strong> nació con el propósito de conectar de manera directa y moderna a vecinos, turistas, comerciantes y prestadores de servicios de todo el corredor serrano (desde La Calera hasta La Granja).
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
      {/* 11. PREGUNTAS FRECUENTES (PAGE 1 REQUIREMENT)            */}
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
      {/* 12. SECCIÓN CONTACTO (PAGE 1 & 5 REQUIREMENT)            */}
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
              href={`https://wa.me/${(settings?.supportWhatsApp || '5493543123456').replace(/[^0-9]/g, '')}?text=${encodeURIComponent('Hola Sierras Chicas Digital, quiero contactarme.')}`}
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
      {/* 13. PRE-FOOTER NEWSLETTER (PAGE 4: NO EXTRA BLANK SPACE) */}
      {/* ======================================================== */}
      <section className="relative overflow-hidden bg-gradient-to-r from-slate-950 via-slate-900 to-slate-950 text-white pt-12 pb-12 px-4 sm:px-6 lg:px-8 border-t border-slate-800">
        <div className="max-w-4xl mx-auto text-center space-y-5">
          <h2 className="text-2xl sm:text-4xl font-black text-white tracking-tight">
            Registrate para recibir las últimas novedades y promociones del valle.
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
