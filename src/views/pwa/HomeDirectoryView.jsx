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
  ArrowUpRight
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
  
  const searchContainerRef = useRef(null);
  const directorySectionRef = useRef(null);

  // Close search suggestions on outside click
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

  const handleNewsletterSubmit = (e) => {
    e.preventDefault();
    if (!newsletterEmail.trim()) return;
    setNewsletterSuccess(true);
    setTimeout(() => {
      setNewsletterSuccess(false);
      setNewsletterEmail('');
    }, 4000);
  };

  return (
    <div className="flex-1 flex flex-col w-full pb-24 md:pb-16 animate-in fade-in bg-[#f8fafc] text-slate-900 selection:bg-amber-500 selection:text-slate-950">
      
      {/* ======================================================== */}
      {/* 1. HERO SECTION (UI/UX Pro Max: Obsidian Backdrop + Amber/Cyan Glows) */}
      {/* ======================================================== */}
      <section className="relative overflow-hidden bg-gradient-to-b from-[#090d16] via-[#0f172a] to-[#090d16] text-white pt-14 sm:pt-20 pb-20 px-4 sm:px-6 lg:px-8">
        
        {/* Dynamic Multi-Layer Ambient Lights */}
        <div className="absolute inset-0 pointer-events-none overflow-hidden">
          <div className="absolute -top-32 left-1/3 w-[36rem] h-[36rem] rounded-full bg-amber-500/10 blur-[120px] animate-pulse"></div>
          <div className="absolute top-1/2 -right-24 w-96 h-96 rounded-full bg-teal-500/10 blur-[100px]"></div>
          <div className="absolute bottom-0 -left-20 w-80 h-80 rounded-full bg-indigo-500/10 blur-[90px]"></div>
          
          {/* Subtle Topography Vector */}
          <svg 
            className="absolute bottom-0 left-0 right-0 w-full h-28 sm:h-40 opacity-15 text-teal-600 pointer-events-none" 
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

        <div className="relative z-10 max-w-5xl mx-auto space-y-7 text-center">
          
          {/* Micro-Pill Tag */}
          <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-white/5 hover:bg-white/10 text-amber-400 border border-white/10 text-xs font-black backdrop-blur-md transition-all shadow-inner">
            <Sparkles className="w-3.5 h-3.5 text-amber-400 animate-spin" style={{ animationDuration: '8s' }} />
            <span>PORTAL & GUÍA COMERCIAL DE SIERRAS CHICAS 2026</span>
          </div>

          {/* High-Impact Display Heading */}
          <div className="space-y-3 max-w-4xl mx-auto">
            <h1 className="text-3xl sm:text-5xl lg:text-6xl font-black tracking-tight leading-[1.12] text-white">
              Sierras Chicas Digital puede <span className="text-transparent bg-clip-text bg-gradient-to-r from-amber-300 via-amber-400 to-amber-200">ayudarte a tomar una decisión inteligente.</span>
            </h1>
            <p className="text-sm sm:text-base text-slate-300 max-w-2xl mx-auto leading-relaxed">
              Encontrá comercios verificados, gastronomía artesanal, prestadores profesionales y cabañas en todo el valle sin intermediarios.
            </p>
          </div>

          {/* Dual Search Floating Capsule */}
          <div ref={searchContainerRef} className="relative max-w-3xl mx-auto pt-2">
            <div className="bg-white/95 backdrop-blur-xl rounded-[2rem] p-2.5 shadow-2xl shadow-black/40 flex flex-col sm:flex-row items-center gap-2 border border-white/40 ring-4 ring-white/5">
              
              {/* Search Query Field */}
              <div className="flex items-center gap-2.5 w-full sm:flex-1 px-4 py-2">
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
                  className="w-full bg-transparent text-xs sm:text-sm text-slate-900 placeholder:text-slate-400 focus:outline-none font-semibold"
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
              <div className="hidden sm:block w-px h-8 bg-slate-200/80"></div>

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
                className="w-full sm:w-auto bg-gradient-to-r from-amber-500 to-amber-400 hover:from-amber-400 hover:to-amber-300 text-slate-950 font-black px-7 py-3.5 rounded-[1.5rem] text-xs sm:text-sm flex items-center justify-center gap-2 shadow-lg shadow-amber-500/30 transition-transform active:scale-95 shrink-0"
              >
                <Search className="w-4 h-4 text-slate-950" />
                <span>Buscar</span>
              </button>
            </div>

            {/* Interactive Taxonomy Autocomplete Dropdown */}
            {isSearchFocused && matchingTaxonomy.length > 0 && (
              <div className="absolute top-full left-0 right-0 mt-3 bg-white rounded-3xl shadow-2xl p-4 z-50 animate-in fade-in space-y-2 max-h-80 overflow-y-auto text-left border border-slate-100">
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
                      className="w-full text-left px-3.5 py-2.5 rounded-2xl hover:bg-amber-50/60 flex items-center justify-between text-xs text-slate-800 transition-colors group"
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

          {/* Quick-Access Pills */}
          <div className="flex flex-wrap items-center justify-center gap-2 pt-1 text-xs">
            <span className="text-slate-400 font-medium">Accesos Rápidos:</span>
            {['Cabañas con Pileta', 'Pizzerías', 'Electricistas', 'Masa Madre', 'Pet Friendly', 'Turismo'].map((term, i) => (
              <button
                key={i}
                type="button"
                onClick={() => { setSearchQuery(term); scrollToDirectory(); }}
                className="px-3 py-1 rounded-full bg-white/5 hover:bg-white/15 text-slate-200 text-xs font-medium border border-white/10 backdrop-blur-sm transition-all active:scale-95"
              >
                {term}
              </button>
            ))}
          </div>

        </div>
      </section>

      {/* ======================================================== */}
      {/* 2. METRICS & TRUST PROOF STRIP */}
      {/* ======================================================== */}
      <section className="relative -mt-6 z-20 max-w-6xl mx-auto px-4 sm:px-6 w-full">
        <div className="bg-white rounded-[2rem] p-6 sm:p-7 shadow-xl shadow-slate-900/5 flex flex-col md:flex-row items-center justify-between gap-6 border border-slate-100">
          
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-6 sm:gap-10 w-full md:w-auto text-center sm:text-left">
            <div>
              <div className="text-3xl font-black text-slate-900 tracking-tight">+350</div>
              <p className="text-xs text-slate-500 font-semibold mt-0.5">Comercios Registrados</p>
            </div>

            <div>
              <div className="text-3xl font-black text-slate-900 tracking-tight">7 Ciudades</div>
              <p className="text-xs text-slate-500 font-semibold mt-0.5">Corredor Serrano</p>
            </div>

            <div>
              <div className="text-3xl font-black text-slate-900 tracking-tight">+15.000</div>
              <p className="text-xs text-slate-500 font-semibold mt-0.5">Consultas Mensuales</p>
            </div>

            <div>
              <div className="text-3xl font-black text-emerald-600 tracking-tight">0% Comisión</div>
              <p className="text-xs text-slate-500 font-semibold mt-0.5">Trato 100% Directo</p>
            </div>
          </div>

          {/* Sello de Calidad */}
          <div className="flex items-center gap-3 bg-amber-500/10 px-5 py-3 rounded-2xl shrink-0">
            <Award className="w-8 h-8 text-amber-600 shrink-0" />
            <div>
              <span className="text-xs font-black text-slate-900 block">Red Verificada 2026</span>
              <span className="text-[11px] text-slate-600 font-medium">Directorio Oficial de las Sierras</span>
            </div>
          </div>

        </div>
      </section>

      {/* ======================================================== */}
      {/* 3. VALUE PROPOSITION SECTION (Bento Style) */}
      {/* ======================================================== */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16 sm:py-20">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 items-center">
          
          {/* Visual Showcase Card */}
          <div className="lg:col-span-5 relative">
            <div className="relative rounded-[2.5rem] overflow-hidden shadow-2xl bg-slate-900 aspect-[4/5] max-w-md mx-auto group">
              <img
                src="https://images.unsplash.com/photo-1556740738-b6a63e27c4df?w=800&auto=format&fit=crop&q=80"
                alt="Comercio local en Sierras Chicas"
                className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-slate-950/80 via-slate-950/20 to-transparent"></div>
              
              {/* Floating Badge */}
              <div className="absolute bottom-6 left-6 right-6 bg-white/95 backdrop-blur-md p-4 rounded-2xl shadow-xl flex items-center gap-3.5">
                <div className="w-12 h-12 rounded-xl bg-amber-500 text-slate-950 flex items-center justify-center font-black text-xl shrink-0">
                  <Store className="w-6 h-6" />
                </div>
                <div>
                  <span className="text-xs font-black text-slate-900 block">Comercio 100% Local</span>
                  <span className="text-[11px] text-slate-600">Impulsamos la economía regional del valle</span>
                </div>
              </div>
            </div>
          </div>

          {/* Proposition Bullets */}
          <div className="lg:col-span-7 space-y-6">
            <div className="space-y-2">
              <span className="text-xs font-black text-amber-600 uppercase tracking-wider block">
                ECOSISTEMA REGIONAL CONECTADO
              </span>
              <h2 className="text-2xl sm:text-4xl font-black text-slate-900 tracking-tight leading-tight">
                Obtén la mejor experiencia comercial y de servicios con Sierras Chicas Digital.
              </h2>
            </div>

            <p className="text-sm text-slate-600 leading-relaxed">
              Diseñado exclusivamente para conectar vecinos y turistas con los comercios de barrio, artesanos, cabañas y profesionales del corredor.
            </p>

            <ul className="space-y-3.5 text-xs sm:text-sm text-slate-700">
              <li className="flex items-start gap-3">
                <div className="p-1 rounded-full bg-emerald-100 text-emerald-700 shrink-0 mt-0.5">
                  <Check className="w-3.5 h-3.5" />
                </div>
                <span><strong>Trato y pedidos directos por WhatsApp</strong>: Hablá en tiempo real con el dueño del local sin intermediarios ni sobreprecios.</span>
              </li>
              <li className="flex items-start gap-3">
                <div className="p-1 rounded-full bg-emerald-100 text-emerald-700 shrink-0 mt-0.5">
                  <Check className="w-3.5 h-3.5" />
                </div>
                <span><strong>Filtros por localidad del valle</strong>: Localizá opciones exactas en Río Ceballos, Unquillo, Mendiolaza, Villa Allende y más.</span>
              </li>
              <li className="flex items-start gap-3">
                <div className="p-1 rounded-full bg-emerald-100 text-emerald-700 shrink-0 mt-0.5">
                  <Check className="w-3.5 h-3.5" />
                </div>
                <span><strong>Góndola y cartas actualizadas</strong>: Precios y stock sincronizados en vivo.</span>
              </li>
            </ul>

            {/* 3 Metric Pills */}
            <div className="grid grid-cols-3 gap-4 pt-4 border-t border-slate-200">
              <div className="bg-slate-100/70 p-3.5 rounded-2xl text-center">
                <div className="text-xl sm:text-2xl font-black text-slate-900">24/7</div>
                <div className="text-[11px] text-slate-500 font-semibold">Catálogo Online</div>
              </div>
              <div className="bg-slate-100/70 p-3.5 rounded-2xl text-center">
                <div className="text-xl sm:text-2xl font-black text-slate-900">100%</div>
                <div className="text-[11px] text-slate-500 font-semibold">Sin Recargo</div>
              </div>
              <div className="bg-slate-100/70 p-3.5 rounded-2xl text-center">
                <div className="text-xl sm:text-2xl font-black text-slate-900">0%</div>
                <div className="text-[11px] text-slate-500 font-semibold">Comisiones</div>
              </div>
            </div>

            <div className="pt-2">
              <Link
                to="/panel/perfil"
                className="inline-flex items-center gap-2 px-7 py-3.5 rounded-2xl bg-slate-900 hover:bg-slate-800 text-white font-black text-xs sm:text-sm shadow-xl shadow-slate-950/20 transition-all active:scale-95"
              >
                <span>Sumar mi Comercio al Directorio</span>
                <ArrowRight className="w-4 h-4 text-amber-400" />
              </Link>
            </div>

          </div>

        </div>
      </section>

      {/* ======================================================== */}
      {/* 4. FEATURED LISTINGS SECTION (4-Column Modern Cards) */}
      {/* ======================================================== */}
      <section ref={directorySectionRef} className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10 space-y-7 w-full">
        
        {/* Header with Mode Filter & Switcher */}
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 pb-4 border-b border-slate-200">
          <div>
            <span className="text-xs font-black text-amber-600 uppercase tracking-wider block">
              CATÁLOGO REGIONAL
            </span>
            <h2 className="text-2xl sm:text-3xl font-black text-slate-900 tracking-tight">
              Anuncios & Comercios Destacados
            </h2>
            <p className="text-xs text-slate-500 mt-0.5">
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
          <div className="flex flex-wrap items-center gap-2 p-3.5 bg-amber-50 rounded-2xl animate-in fade-in">
            <span className="text-xs font-bold text-amber-900">Filtros aplicados:</span>
            {selectedCategory !== 'all' && (
              <span className="inline-flex items-center gap-1 px-3 py-1 rounded-full bg-white text-xs font-bold text-slate-800 shadow-xs">
                Rubro: {categories.find(c => c.slug === selectedCategory)?.name}
                <button type="button" onClick={() => setSelectedCategory('all')} className="hover:text-rose-600 ml-1">×</button>
              </span>
            )}
            {selectedSubcategory !== 'all' && (
              <span className="inline-flex items-center gap-1 px-3 py-1 rounded-full bg-white text-xs font-bold text-slate-800 shadow-xs">
                Subcategoría: {selectedSubcategory}
                <button type="button" onClick={() => setSelectedSubcategory('all')} className="hover:text-rose-600 ml-1">×</button>
              </span>
            )}
            {selectedLocation !== 'all' && (
              <span className="inline-flex items-center gap-1 px-3 py-1 rounded-full bg-white text-xs font-bold text-slate-800 shadow-xs">
                Localidad: {locations.find(l => l.slug === selectedLocation)?.name}
                <button type="button" onClick={() => setSelectedLocation('all')} className="hover:text-rose-600 ml-1">×</button>
              </span>
            )}
            <button
              type="button"
              onClick={() => { setSelectedCategory('all'); setSelectedSubcategory('all'); setSelectedLocation('all'); setSearchQuery(''); }}
              className="text-xs text-amber-800 font-bold underline ml-auto"
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
            <p className="text-xs text-slate-500 max-w-sm mx-auto">
              Probá cambiando los términos de búsqueda o eliminando los filtros activos.
            </p>
            <button
              type="button"
              onClick={() => { setSearchQuery(''); setSelectedCategory('all'); setSelectedLocation('all'); setSelectedSubcategory('all'); setFilterMode('all'); }}
              className="px-4 py-2 rounded-xl bg-slate-900 text-white text-xs font-bold shadow-sm"
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
                  className="group bg-white rounded-3xl overflow-hidden shadow-sm hover:shadow-2xl transition-all duration-300 flex flex-col justify-between border border-slate-100/80"
                >
                  <div>
                    {/* Cover & Badges */}
                    <div className="relative h-44 w-full overflow-hidden bg-slate-900">
                      <img
                        src={biz.coverUrl || 'https://images.unsplash.com/photo-1555396273-367ea4eb4db5?w=600&auto=format&fit=crop&q=80'}
                        alt={biz.name}
                        className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                      />
                      <div className="absolute inset-0 bg-gradient-to-t from-slate-950/80 via-transparent to-transparent"></div>

                      {/* Favorite Button */}
                      <button
                        type="button"
                        onClick={() => toggleFavorite(biz.id)}
                        className={`absolute top-3 right-3 w-8 h-8 rounded-full backdrop-blur-md flex items-center justify-center transition-all ${
                          isFav ? 'bg-rose-500 text-white' : 'bg-black/40 text-white hover:bg-black/60'
                        }`}
                        title="Guardar favorito"
                      >
                        <Heart className={`w-3.5 h-3.5 ${isFav ? 'fill-white' : ''}`} />
                      </button>

                      {/* Mode Badge */}
                      <div className="absolute top-3 left-3">
                        <span className={`px-2.5 py-1 rounded-full text-[9px] font-black uppercase tracking-wider backdrop-blur-md text-white ${
                          isNotice ? 'bg-indigo-700/90' : isService ? 'bg-amber-600/90' : 'bg-teal-700/90'
                        }`}>
                          {isNotice ? 'Aviso' : isService ? 'Servicio' : 'Tienda'}
                        </span>
                      </div>

                      {/* Location in Cover */}
                      <div className="absolute bottom-3 left-3 text-white flex items-center gap-1 text-xs font-semibold drop-shadow">
                        <MapPin className="w-3.5 h-3.5 text-emerald-400" />
                        <span>{biz.locationName || biz.location}</span>
                      </div>
                    </div>

                    {/* Card Body */}
                    <div className="p-5 space-y-2.5">
                      <div className="flex items-center justify-between text-xs">
                        <span className="font-black text-amber-700">{biz.categoryName || biz.category}</span>
                        <div className="flex items-center gap-1 text-amber-500 font-bold">
                          <Star className="w-3.5 h-3.5 fill-amber-500" />
                          <span>{biz.rating || 5.0}</span>
                        </div>
                      </div>

                      <h3 className="font-extrabold text-base text-slate-900 leading-snug group-hover:text-amber-600 transition-colors line-clamp-1">
                        {biz.name}
                      </h3>

                      <p className="text-xs text-slate-500 line-clamp-2 leading-relaxed">
                        {biz.tagline || biz.description}
                      </p>

                      {/* Tags */}
                      {biz.tags && biz.tags.length > 0 && (
                        <div className="flex flex-wrap gap-1 pt-1">
                          {biz.tags.slice(0, 2).map((tag, idx) => (
                            <span
                              key={idx}
                              className="px-2 py-0.5 rounded-md bg-slate-100 text-[10px] font-bold text-slate-600"
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
                  className="bg-white p-4 sm:p-5 rounded-3xl shadow-sm hover:shadow-md transition-all flex flex-col sm:flex-row sm:items-center justify-between gap-4 border border-slate-100/80"
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
                        <span className={`px-2 py-0.5 rounded-full text-[9px] font-extrabold uppercase ${
                          isNotice ? 'bg-indigo-50 text-indigo-700' : isService ? 'bg-amber-50 text-amber-700' : 'bg-teal-50 text-teal-700'
                        }`}>
                          {isNotice ? 'Aviso' : isService ? 'Servicio' : 'Tienda'}
                        </span>
                        <span className="text-xs font-bold text-amber-700">{biz.categoryName || biz.category}</span>
                        <span className="text-slate-300 text-xs">·</span>
                        <span className="text-xs text-slate-500 flex items-center gap-1 font-medium">
                          <MapPin className="w-3 h-3 text-emerald-600" />
                          {biz.locationName || biz.location}
                        </span>
                      </div>

                      <h3 className="font-black text-sm sm:text-base text-slate-900">
                        {biz.name}
                      </h3>

                      <p className="text-xs text-slate-500 line-clamp-1">
                        {biz.tagline || biz.description}
                      </p>
                    </div>
                  </div>

                  <div className="flex items-center justify-between sm:justify-end gap-3 pt-2 sm:pt-0 border-t sm:border-t-0 border-slate-100 shrink-0">
                    <div className="flex items-center gap-1 text-amber-500 font-bold text-xs">
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
      {/* 5. MULTI-COLUMN CATEGORY DIRECTORY (2-Column Bento Cards) */}
      {/* ======================================================== */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-14 space-y-8 w-full">
        <div className="text-center space-y-2 max-w-2xl mx-auto">
          <span className="text-xs font-black text-amber-600 uppercase tracking-wider block">
            EXPLORA LA GUÍA COMERCIAL COMPLETA
          </span>
          <h2 className="text-2xl sm:text-4xl font-black text-slate-900 tracking-tight">
            Elegí la categoría del producto o servicio que buscás
          </h2>
          <p className="text-xs sm:text-sm text-slate-500 leading-relaxed">
            Accedé directamente a las subcategorías especializadas para encontrar el prestador que necesitás en tu localidad.
          </p>
        </div>

        {/* 2-Column Grid */}
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
                    {cat.emoji || '📁'}
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
      {/* 6. PUBLIC SAAS PLANS & MERCADO PAGO */}
      {/* ======================================================== */}
      <section id="planes-saas" className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16 space-y-8 w-full border-t border-slate-200">
        <div className="text-center space-y-2 max-w-2xl mx-auto">
          <span className="inline-flex items-center gap-1.5 px-3.5 py-1 rounded-full bg-indigo-50 text-indigo-700 text-xs font-black">
            <Zap className="w-3.5 h-3.5 text-indigo-600" />
            <span>Suscripción Mensual SaaS para Comercios</span>
          </span>
          <h2 className="text-2xl sm:text-4xl font-black text-slate-900 tracking-tight">
            Planes Comerciales para el Valle de Sierras Chicas
          </h2>
          <p className="text-xs sm:text-sm text-slate-500 leading-relaxed">
            Elegí el plan adecuado para tu negocio. Activación inmediata con suscripción segura por Mercado Pago.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 max-w-6xl mx-auto">
          {plans.map(plan => (
            <div
              key={plan.id}
              className={`p-7 rounded-[2rem] flex flex-col justify-between space-y-5 transition-all shadow-sm ${
                plan.isFeatured
                  ? 'bg-gradient-to-b from-slate-950 via-indigo-950 to-slate-950 text-white shadow-2xl shadow-indigo-950/40 ring-2 ring-indigo-500/40'
                  : 'bg-white text-slate-900 border border-slate-100'
              }`}
            >
              <div className="space-y-4">
                <div className="flex items-center justify-between">
                  <span className={`px-2.5 py-0.5 rounded-full text-[10px] font-black uppercase ${
                    plan.isFeatured ? 'bg-indigo-600 text-white' : 'bg-slate-100 text-slate-600'
                  }`}>
                    {plan.slug}
                  </span>
                  {plan.isFeatured && (
                    <span className="px-2.5 py-0.5 rounded-full bg-amber-400 text-amber-950 text-[10px] font-black uppercase">
                      Más Popular
                    </span>
                  )}
                </div>

                <div>
                  <h3 className="text-xl font-black">{plan.name}</h3>
                  <p className="text-xs opacity-70 mt-1">
                    Ideal para {plan.id === 'plan-inicial' ? 'profesionales y avisos simples' : plan.id === 'plan-pro' ? 'comercios y gastronomía con pedidos' : 'cadenas y marcas líderes'}.
                  </p>
                </div>

                <div className="flex items-baseline gap-1 py-1">
                  <span className="text-3xl font-black tracking-tight">
                    ${plan.priceArs.toLocaleString('es-AR')}
                  </span>
                  <span className="text-xs opacity-70">/ mes</span>
                </div>

                <div className="pt-3 border-t border-slate-200/40">
                  <span className="text-[10px] font-black uppercase tracking-wider opacity-70">Incluye:</span>
                  <ul className="space-y-2.5 text-xs pt-2">
                    {plan.features.map((feat, i) => (
                      <li key={i} className="flex items-start gap-2">
                        <CheckCircle2 className={`w-4 h-4 shrink-0 mt-0.5 ${plan.isFeatured ? 'text-indigo-400' : 'text-emerald-600'}`} />
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
                className={`w-full py-3.5 rounded-2xl font-black text-xs flex items-center justify-center gap-2 transition-all shadow-md active:scale-95 ${
                  plan.isFeatured
                    ? 'bg-amber-500 hover:bg-amber-400 text-slate-950 shadow-amber-950/40'
                    : 'bg-slate-900 hover:bg-slate-800 text-white'
                }`}
              >
                <CreditCard className="w-4 h-4" />
                <span>Contratar con Mercado Pago</span>
                <ExternalLink className="w-3.5 h-3.5 ml-0.5 opacity-80" />
              </a>
            </div>
          ))}
        </div>
      </section>

      {/* ======================================================== */}
      {/* 7. PRE-FOOTER NEWSLETTER & REGISTRATION BANNER */}
      {/* ======================================================== */}
      <section className="relative overflow-hidden bg-gradient-to-r from-slate-950 via-slate-900 to-slate-950 text-white py-16 px-4 sm:px-6 lg:px-8">
        <div className="max-w-4xl mx-auto text-center space-y-5">
          <h2 className="text-2xl sm:text-4xl font-black text-white tracking-tight">
            Registrate para recibir las últimas actualizaciones y novedades del valle.
          </h2>
          <p className="text-xs sm:text-sm text-slate-300 max-w-xl mx-auto">
            Recibí promociones exclusivas de comercios de Sierras Chicas o sumá tu emprendimiento a la red.
          </p>

          <form onSubmit={handleNewsletterSubmit} className="max-w-md mx-auto flex flex-col sm:flex-row gap-2 pt-2">
            <input
              type="email"
              required
              value={newsletterEmail}
              onChange={e => setNewsletterEmail(e.target.value)}
              placeholder="Ingresá tu correo electrónico..."
              className="flex-1 px-4 py-3.5 rounded-2xl bg-white text-slate-900 text-xs placeholder:text-slate-400 focus:outline-none font-semibold"
            />
            <button
              type="submit"
              className="bg-amber-500 hover:bg-amber-400 text-slate-950 font-black px-7 py-3.5 rounded-2xl text-xs flex items-center justify-center gap-2 shadow-lg transition-transform active:scale-95 shrink-0"
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
