import React, { useState, useRef, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { useApp } from '../../context/AppContext';
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
  CheckCheck
} from 'lucide-react';

export default function HomeDirectoryView() {
  const { 
    businesses, 
    categories, 
    locations, 
    plans, 
    products,
    selectedLocation, 
    setSelectedLocation,
    selectedCategory, 
    setSelectedCategory,
    selectedSubcategory, 
    setSelectedSubcategory,
    searchQuery, 
    setSearchQuery,
    favorites, 
    toggleFavorite 
  } = useApp();

  const [filterMode, setFilterMode] = useState('all'); // 'all', 'aviso', 'tienda', 'servicios'
  const [viewMode, setViewMode] = useState('grid'); // 'grid' | 'list'
  const [isSearchFocused, setIsSearchFocused] = useState(false);
  const [newsletterEmail, setNewsletterEmail] = useState('');
  const [newsletterSuccess, setNewsletterSuccess] = useState(false);
  
  // Interactive Merchant ROI Simulator State
  const [simulatorGoal, setSimulatorGoal] = useState('pro'); // 'inicial', 'pro', 'full'
  const [activeRadarCity, setActiveRadarCity] = useState(null);

  const searchContainerRef = useRef(null);
  const directorySectionRef = useRef(null);

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

  // Live Flash Ticker Highlights
  const flashHighlights = [
    { text: '🥐 Masa Madre & Croissants recién horneados', city: 'Unquillo', cat: 'gastronomia' },
    { text: '⚡ Electricista Matriculado ERSeP 24hs', city: 'Villa Allende', cat: 'construccion-hogar' },
    { text: '🌲 Cabañas con pileta climatizada y vista panorámica', city: 'Río Ceballos', cat: 'turismo-alojamiento' },
    { text: '🍕 Pizzería napolitana a la piedra', city: 'Mendiolaza', cat: 'gastronomia' },
    { text: '🐾 Atención veterinaria y farmacia de guardia', city: 'Salsipuedes', cat: 'salud-bienestar' },
    { text: '🍺 Cerveza artesanal serrana y picadas', city: 'Agua de Oro', cat: 'gastronomia' },
    { text: '🛠️ Taller mecánico integral e inyección electrónica', city: 'La Calera', cat: 'automotor' }
  ];

  return (
    <div className="flex-1 flex flex-col w-full pb-24 md:pb-16 animate-in fade-in bg-[#f8fafc] text-slate-900 selection:bg-amber-500 selection:text-slate-950 font-sans">
      
      {/* ======================================================== */}
      {/* 1. HERO SECTION WITH HYPERFRAMES KINETIC FLOATING LAYER */}
      {/* ======================================================== */}
      <section className="relative overflow-hidden bg-gradient-to-b from-[#050811] via-[#091122] to-[#060a12] text-white pt-16 sm:pt-24 pb-28 px-4 sm:px-6 lg:px-8">
        
        {/* Dynamic Multi-Layer Ambient Lights & Topography Mesh */}
        <div className="absolute inset-0 pointer-events-none overflow-hidden">
          <div className="absolute -top-32 left-1/2 -translate-x-1/2 w-[46rem] h-[46rem] rounded-full bg-amber-500/15 blur-[150px] hf-glow-pulse"></div>
          <div className="absolute top-1/3 -right-24 w-[30rem] h-[30rem] rounded-full bg-teal-500/15 blur-[130px]"></div>
          <div className="absolute bottom-0 -left-20 w-96 h-96 rounded-full bg-indigo-500/15 blur-[110px]"></div>
          
          {/* Subtle Grid Matrix */}
          <div 
            className="absolute inset-0 opacity-[0.03] pointer-events-none" 
            style={{ backgroundImage: 'radial-gradient(circle at 1px 1px, white 1px, transparent 0)', backgroundSize: '32px 32px' }}
          ></div>

          {/* Mountain Topography Waves */}
          <svg 
            className="absolute bottom-0 left-0 right-0 w-full h-36 sm:h-48 opacity-20 text-teal-400 pointer-events-none" 
            viewBox="0 0 1440 320" 
            fill="none" 
            xmlns="http://www.w3.org/2000/svg"
          >
            <path 
              fill="currentColor" 
              d="M0,224L48,208C96,192,192,160,288,165.3C384,171,480,213,576,218.7C672,224,768,192,864,165.3C960,139,1056,117,1152,122.7C1248,128,1344,160,1392,176L1440,192L1440,320L1392,320C1344,320,1248,320,1152,320C1056,320,960,320,864,320C768,320,672,320,576,320C480,320,384,320,288,320C192,320,96,320,48,320L0,320Z"
            />
          </svg>
        </div>

        {/* HyperFrames Floating 3D Motion Micro-Widgets (Hidden on very small screens, responsive on desktop) */}
        <div className="hidden lg:block absolute inset-0 pointer-events-none max-w-7xl mx-auto z-10">
          
          {/* Floating Widget 1: Direct WhatsApp Chat */}
          <div className="absolute top-24 left-6 hf-float-slow bg-white/10 backdrop-blur-xl border border-white/20 p-4 rounded-3xl shadow-2xl max-w-xs text-left">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-2xl bg-emerald-500 text-white flex items-center justify-center shadow-lg shadow-emerald-500/30">
                <MessageCircle className="w-5 h-5" />
              </div>
              <div>
                <div className="flex items-center gap-1.5 text-xs font-black text-white">
                  <span>Trato Directo 1 a 1</span>
                  <span className="w-2 h-2 rounded-full bg-emerald-400 animate-ping"></span>
                </div>
                <p className="text-[11px] text-slate-300 font-medium">Sin comisiones ni intermediarios</p>
              </div>
            </div>
          </div>

          {/* Floating Widget 2: ERSeP Verified Badge */}
          <div className="absolute top-36 right-8 hf-float-reverse bg-white/10 backdrop-blur-xl border border-white/20 p-4 rounded-3xl shadow-2xl max-w-xs text-left">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-2xl bg-amber-500 text-slate-950 flex items-center justify-center shadow-lg shadow-amber-500/30">
                <ShieldCheck className="w-5 h-5" />
              </div>
              <div>
                <div className="text-xs font-black text-white">Prestadores Verificados</div>
                <div className="flex items-center gap-1 text-[11px] text-amber-300 font-bold">
                  <Star className="w-3 h-3 fill-amber-300" />
                  <span>4.9 / 5.0 en Sierras Chicas</span>
                </div>
              </div>
            </div>
          </div>

        </div>

        {/* Hero Content */}
        <div className="relative z-20 max-w-4xl mx-auto space-y-7 text-center">
          
          {/* Live Regional Beacon Pill */}
          <div className="inline-flex items-center gap-2.5 px-5 py-2 rounded-full bg-white/10 hover:bg-white/15 text-amber-300 border border-white/15 text-xs font-black backdrop-blur-md transition-all shadow-inner hf-badge-glow">
            <span className="flex h-2.5 w-2.5 relative">
              <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75"></span>
              <span className="relative inline-flex rounded-full h-2.5 w-2.5 bg-emerald-500"></span>
            </span>
            <span className="tracking-wider">PORTAL & GUÍA COMERCIAL DE SIERRAS CHICAS 2026</span>
          </div>

          {/* High-Impact Editorial Heading */}
          <div className="space-y-4">
            <h1 className="text-3xl sm:text-5xl lg:text-6xl font-black tracking-tight leading-[1.12] text-white">
              Sierras Chicas Digital puede <br className="hidden sm:inline" />
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-amber-300 via-amber-400 to-emerald-300">
                ayudarte a tomar una decisión inteligente.
              </span>
            </h1>
            <p className="text-sm sm:text-base text-slate-300 max-w-2xl mx-auto leading-relaxed font-medium">
              Conectamos a vecinos y turistas con los comercios de cercanía, cabañas, artesanos y servicios matriculados en todo el corredor serrano.
            </p>
          </div>

          {/* Dual Search Floating Capsule with Shimmer Accent */}
          <div ref={searchContainerRef} className="relative max-w-3xl mx-auto pt-2">
            <div className="bg-white/95 backdrop-blur-2xl rounded-[2.2rem] p-2.5 shadow-2xl shadow-black/70 flex flex-col sm:flex-row items-center gap-2 border border-white/60 ring-4 ring-white/10 transition-all focus-within:ring-amber-400/50">
              
              {/* Search Query Field */}
              <div className="flex items-center gap-3 w-full sm:flex-1 px-4 py-2">
                <Search className="w-5 h-5 text-slate-400 shrink-0" />
                <input
                  type="text"
                  value={searchQuery}
                  onFocus={() => setIsSearchFocused(true)}
                  onChange={e => {
                    setSearchQuery(e.target.value);
                    setIsSearchFocused(true);
                  }}
                  placeholder="¿Qué estás buscando? (Ej: Panadería, Electricista, Cabaña...)"
                  className="w-full bg-transparent text-xs sm:text-sm text-slate-900 placeholder:text-slate-400 focus:outline-none font-bold"
                />
                {searchQuery && (
                  <button
                    type="button"
                    onClick={() => setSearchQuery('')}
                    className="text-slate-400 hover:text-slate-600 p-1"
                  >
                    <X className="w-4 h-4" />
                  </button>
                )}
              </div>

              {/* Divider */}
              <div className="hidden sm:block w-px h-8 bg-slate-200"></div>

              {/* Locality Field */}
              <div className="flex items-center gap-2 w-full sm:w-60 px-4 py-2">
                <MapPin className="w-4 h-4 text-emerald-600 shrink-0" />
                <select
                  value={selectedLocation}
                  onChange={e => setSelectedLocation(e.target.value)}
                  className="w-full bg-transparent text-xs sm:text-sm text-slate-800 font-bold focus:outline-none cursor-pointer"
                >
                  <option value="all">Todas las Localidades</option>
                  {locations.map(loc => (
                    <option key={loc.id} value={loc.slug}>{loc.name}</option>
                  ))}
                </select>
              </div>

              {/* Action Button */}
              <button
                type="button"
                onClick={scrollToDirectory}
                className="w-full sm:w-auto bg-gradient-to-r from-amber-500 via-amber-400 to-amber-300 hover:from-amber-400 hover:to-amber-200 text-slate-950 font-black px-8 py-3.5 rounded-[1.6rem] text-xs sm:text-sm flex items-center justify-center gap-2 shadow-lg shadow-amber-500/40 transition-all duration-200 active:scale-95 shrink-0 hf-shimmer-btn"
              >
                <Search className="w-4 h-4 text-slate-950" />
                <span>Explorar</span>
              </button>
            </div>

            {/* Interactive Taxonomy Autocomplete Dropdown */}
            {isSearchFocused && matchingTaxonomy.length > 0 && (
              <div className="absolute top-full left-0 right-0 mt-3 bg-white rounded-3xl shadow-2xl p-4 z-50 animate-in fade-in space-y-2 max-h-80 overflow-y-auto text-left border border-slate-100 ring-1 ring-slate-900/5">
                <div className="flex items-center justify-between pb-2 border-b border-slate-100">
                  <span className="text-[11px] font-black text-slate-400 uppercase tracking-wider">
                    Sugerencias de Rubros & Subcategorías:
                  </span>
                  <span className="text-[11px] text-amber-600 font-bold">
                    {matchingTaxonomy.length} encontradas
                  </span>
                </div>

                <div className="space-y-1">
                  {matchingTaxonomy.map((item, idx) => (
                    <button
                      key={idx}
                      type="button"
                      onClick={() => handleSelectTaxonomyItem(item)}
                      className="w-full text-left px-3.5 py-2.5 rounded-2xl hover:bg-amber-50/70 flex items-center justify-between text-xs text-slate-800 transition-colors group"
                    >
                      <div className="flex items-center gap-2.5">
                        <span className="text-base">{item.emoji}</span>
                        <div>
                          <span className="font-bold text-slate-900 group-hover:text-amber-600">{item.label}</span>
                          {item.parentName && (
                            <span className="text-[11px] text-slate-400 ml-2">en {item.parentName}</span>
                          )}
                        </div>
                      </div>
                      <span className="text-[10px] font-black px-2.5 py-1 rounded-full bg-slate-100 text-slate-600 group-hover:bg-amber-500 group-hover:text-slate-950 transition-colors">
                        {item.type === 'rubro' ? 'Rubro' : 'Subcategoría'}
                      </span>
                    </button>
                  ))}
                </div>
              </div>
            )}
          </div>

          {/* Quick-Access Search Tags */}
          <div className="flex flex-wrap items-center justify-center gap-2 pt-1 text-xs">
            <span className="text-slate-400 font-semibold flex items-center gap-1">
              <Flame className="w-3.5 h-3.5 text-amber-400" />
              <span>Populares:</span>
            </span>
            {['Cabañas con Pileta', 'Panaderías', 'Electricistas ERSeP', 'Pizzerías', 'Pet Friendly'].map((term, i) => (
              <button
                key={i}
                type="button"
                onClick={() => { setSearchQuery(term); scrollToDirectory(); }}
                className="px-3 py-1 rounded-full bg-white/10 hover:bg-white/20 text-slate-200 text-xs font-semibold border border-white/10 backdrop-blur-sm transition-all active:scale-95"
              >
                {term}
              </button>
            ))}
          </div>

        </div>
      </section>

      {/* ======================================================== */}
      {/* 2. NOVELTY COMPONENT: HYPERFRAMES LIVE FLASH TICKER */}
      {/* ======================================================== */}
      <section className="relative -mt-6 z-30 overflow-hidden bg-amber-500 text-slate-950 py-3 shadow-xl">
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
      {/* 3. NOVELTY COMPONENT: RADAR SERRANO & LOCALITY CONSTELLATION */}
      {/* ======================================================== */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-14 pb-8 w-full">
        <div className="bg-gradient-to-br from-slate-900 via-[#0e172a] to-slate-950 rounded-[2.5rem] p-6 sm:p-10 text-white shadow-2xl relative overflow-hidden border border-slate-800">
          
          {/* Ambient Background Grid */}
          <div className="absolute inset-0 bg-[radial-gradient(#38bdf8_1px,transparent_1px)] [background-size:24px_24px] opacity-10 pointer-events-none"></div>

          <div className="relative z-10 flex flex-col lg:flex-row items-center justify-between gap-8">
            
            {/* Title & Info */}
            <div className="space-y-3 text-center lg:text-left max-w-lg">
              <div className="inline-flex items-center gap-2 px-3.5 py-1 rounded-full bg-teal-500/10 text-teal-400 text-xs font-black border border-teal-500/20">
                <Compass className="w-3.5 h-3.5" />
                <span>RADAR SERRANO · CORREDOR RUTA E-53 & E-57</span>
              </div>
              <h2 className="text-2xl sm:text-3xl font-black tracking-tight text-white">
                Explorá el valle ciudad por ciudad
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
      {/* 4. METRICS & TRUST PROOF STRIP */}
      {/* ======================================================== */}
      <section className="max-w-6xl mx-auto px-4 sm:px-6 w-full py-4">
        <div className="bg-white rounded-[2.5rem] p-6 sm:p-8 shadow-xl shadow-slate-900/5 flex flex-col md:flex-row items-center justify-between gap-6 border border-slate-100">
          
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-6 sm:gap-10 w-full md:w-auto text-center sm:text-left">
            <div>
              <div className="text-3xl sm:text-4xl font-black text-slate-900 tracking-tight">+350</div>
              <p className="text-xs text-slate-500 font-bold mt-1">Comercios Verificados</p>
            </div>

            <div>
              <div className="text-3xl sm:text-4xl font-black text-slate-900 tracking-tight">7 Ciudades</div>
              <p className="text-xs text-slate-500 font-bold mt-1">Corredor Conectado</p>
            </div>

            <div>
              <div className="text-3xl sm:text-4xl font-black text-slate-900 tracking-tight">+15.000</div>
              <p className="text-xs text-slate-500 font-bold mt-1">Búsquedas Mensuales</p>
            </div>

            <div>
              <div className="text-3xl sm:text-4xl font-black text-emerald-600 tracking-tight">0% Comisión</div>
              <p className="text-xs text-slate-500 font-bold mt-1">Contacto 100% Directo</p>
            </div>
          </div>

          {/* Sello de Garantía Regional */}
          <div className="flex items-center gap-3.5 bg-gradient-to-br from-amber-500/15 to-amber-500/5 border border-amber-500/20 px-5 py-3.5 rounded-2xl shrink-0">
            <Award className="w-9 h-9 text-amber-600 shrink-0" />
            <div>
              <span className="text-xs font-black text-slate-900 block">Red Verificada 2026</span>
              <span className="text-[11px] text-slate-600 font-medium">Directorio Oficial de Sierras Chicas</span>
            </div>
          </div>

        </div>
      </section>

      {/* ======================================================== */}
      {/* 5. FEATURED LISTINGS SECTION (4-Column Modern Responsive Grid) */}
      {/* ======================================================== */}
      <section ref={directorySectionRef} className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10 space-y-7 w-full">
        
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
          /* 4-Column Responsive Grid with Smooth Elevation Physics */
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
      {/* 6. MULTI-COLUMN CATEGORY DIRECTORY (2-Column Bento Cards) */}
      {/* ======================================================== */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-14 space-y-8 w-full">
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
      {/* 7. NOVELTY COMPONENT: MERCHANT GROWTH SIMULATOR & SAAS PLANS */}
      {/* ======================================================== */}
      <section id="planes-saas" className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16 space-y-10 w-full border-t border-slate-200">
        
        {/* Interactive Growth Simulator Header */}
        <div className="bg-gradient-to-br from-indigo-950 via-slate-900 to-indigo-950 text-white rounded-[2.5rem] p-6 sm:p-10 shadow-2xl space-y-8 border border-indigo-900/40 relative overflow-hidden">
          
          <div className="absolute -top-24 -right-24 w-80 h-80 rounded-full bg-amber-500/10 blur-[100px] pointer-events-none"></div>

          <div className="max-w-3xl space-y-3">
            <div className="inline-flex items-center gap-2 px-3.5 py-1 rounded-full bg-amber-400/10 text-amber-300 text-xs font-black border border-amber-400/20">
              <Sparkles className="w-3.5 h-3.5" />
              <span>SIMULADOR DE IMPACTO COMERCIAL 2026</span>
            </div>
            <h2 className="text-2xl sm:text-4xl font-black tracking-tight text-white">
              ¿Cuánto querés hacer crecer tu negocio este mes?
            </h2>
            <p className="text-xs sm:text-sm text-slate-300 font-medium">
              Elegí tu objetivo y descubrí la herramienta de venta directa por WhatsApp que mejor se adapta a tu emprendimiento:
            </p>
          </div>

          {/* Simulator Toggle Pills */}
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 pt-2">
            <button
              type="button"
              onClick={() => setSimulatorGoal('inicial')}
              className={`p-4 rounded-2xl text-left border transition-all duration-300 ${
                simulatorGoal === 'inicial'
                  ? 'bg-amber-500 text-slate-950 border-amber-300 shadow-lg shadow-amber-500/30 scale-[1.02]'
                  : 'bg-white/5 hover:bg-white/10 text-white border-white/10'
              }`}
            >
              <div className="text-xs font-black uppercase tracking-wider">Nivel 1: Presencia Básica</div>
              <div className="text-base font-black mt-1">Profesionales & Avisos</div>
              <p className={`text-[11px] mt-1 ${simulatorGoal === 'inicial' ? 'text-slate-900 font-bold' : 'text-slate-400'}`}>
                Aparición en el directorio, SEO y botón WhatsApp directo.
              </p>
            </button>

            <button
              type="button"
              onClick={() => setSimulatorGoal('pro')}
              className={`p-4 rounded-2xl text-left border transition-all duration-300 ${
                simulatorGoal === 'pro'
                  ? 'bg-amber-500 text-slate-950 border-amber-300 shadow-lg shadow-amber-500/30 scale-[1.02]'
                  : 'bg-white/5 hover:bg-white/10 text-white border-white/10'
              }`}
            >
              <div className="text-xs font-black uppercase tracking-wider">Nivel 2: Comercio Activo (Recomendado)</div>
              <div className="text-base font-black mt-1">Góndola & Pedidos Online</div>
              <p className={`text-[11px] mt-1 ${simulatorGoal === 'pro' ? 'text-slate-900 font-bold' : 'text-slate-400'}`}>
                Carta/catálogo digital con carrito de compras y pedidos a WhatsApp.
              </p>
            </button>

            <button
              type="button"
              onClick={() => setSimulatorGoal('full')}
              className={`p-4 rounded-2xl text-left border transition-all duration-300 ${
                simulatorGoal === 'full'
                  ? 'bg-amber-500 text-slate-950 border-amber-300 shadow-lg shadow-amber-500/30 scale-[1.02]'
                  : 'bg-white/5 hover:bg-white/10 text-white border-white/10'
              }`}
            >
              <div className="text-xs font-black uppercase tracking-wider">Nivel 3: Máxima Tracción</div>
              <div className="text-base font-black mt-1">Multi-Sucursal & Banner Destacado</div>
              <p className={`text-[11px] mt-1 ${simulatorGoal === 'full' ? 'text-slate-900 font-bold' : 'text-slate-400'}`}>
                Posicionamiento premium en el Hero y campañas destacadas.
              </p>
            </button>
          </div>

        </div>

        {/* Public SaaS Plans Pricing Grid */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 max-w-6xl mx-auto">
          {plans.map(plan => {
            const isMatch = (simulatorGoal === 'inicial' && plan.id === 'plan-inicial') ||
                            (simulatorGoal === 'pro' && plan.id === 'plan-pro') ||
                            (simulatorGoal === 'full' && plan.id === 'plan-full');

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
                      Ideal para {plan.id === 'plan-inicial' ? 'profesionales y avisos simples' : plan.id === 'plan-pro' ? 'comercios y gastronomía con pedidos' : 'cadenas y marcas líderes'}.
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
                  href={plan.mpCheckoutUrl || 'https://mpago.la/sierras-chicas-saas'}
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
      {/* 8. PRE-FOOTER NEWSLETTER & REGISTRATION BANNER */}
      {/* ======================================================== */}
      <section className="relative overflow-hidden bg-gradient-to-r from-slate-950 via-slate-900 to-slate-950 text-white py-16 px-4 sm:px-6 lg:px-8">
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

