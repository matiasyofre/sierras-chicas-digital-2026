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
  Compass
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
    <div className="flex-1 flex flex-col w-full pb-24 md:pb-16 animate-in fade-in bg-[#f8fafc]">
      
      {/* ======================================================== */}
      {/* 1. HERO SECTION (Reference Structure: Deep Blue + Dual Search Box) */}
      {/* ======================================================== */}
      <section className="relative overflow-hidden bg-gradient-to-b from-[#0f172a] via-[#1e293b] to-[#0f172a] text-white pt-12 sm:pt-16 pb-16 px-4 sm:px-6 lg:px-8 border-b border-slate-800">
        
        {/* Background Image / Ambient Lighting */}
        <div className="absolute inset-0 pointer-events-none overflow-hidden opacity-30">
          <img
            src="https://images.unsplash.com/photo-1506744038136-46273834b3fb?w=1600&auto=format&fit=crop&q=80"
            alt="Valle de Sierras Chicas"
            className="w-full h-full object-cover mix-blend-overlay"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-[#0f172a] via-[#0f172a]/70 to-transparent"></div>
        </div>

        <div className="relative z-10 max-w-5xl mx-auto space-y-6 text-center">
          
          {/* Badge */}
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-white/10 text-amber-400 border border-white/10 text-xs font-black backdrop-blur-md shadow-inner">
            <Sparkles className="w-4 h-4 text-amber-400" />
            <span>DIRECTORIO & RED COMERCIAL DE SIERRAS CHICAS</span>
          </div>

          {/* Hero Main Headline (Matching reference style: "Listovo puede ayudarte a tomar una decisión inteligente") */}
          <h1 className="text-3xl sm:text-5xl lg:text-6xl font-black tracking-tight leading-tight max-w-4xl mx-auto">
            Sierras Chicas Digital puede <span className="text-amber-400">ayudarte a tomar una decisión inteligente.</span>
          </h1>
          <p className="text-sm sm:text-base text-slate-300 max-w-2xl mx-auto leading-relaxed">
            Encontrá comercios verificados, gastronomía artesanal, prestadores profesionales y cabañas en todo el valle.
          </p>

          {/* Dual Search Box (Matching reference style: [¿Qué buscas?] [Localidad] [Buscar Button]) */}
          <div ref={searchContainerRef} className="relative max-w-3xl mx-auto pt-2">
            <div className="bg-white rounded-2xl sm:rounded-full p-2 sm:p-2.5 shadow-2xl flex flex-col sm:flex-row items-center gap-2 border border-slate-200">
              
              {/* Input 1: Search Query */}
              <div className="flex items-center gap-2 w-full sm:flex-1 px-3 py-1.5">
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
                  className="w-full bg-transparent text-xs sm:text-sm text-slate-900 placeholder:text-slate-400 focus:outline-none font-medium"
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

              {/* Separator on desktop */}
              <div className="hidden sm:block w-px h-8 bg-slate-200"></div>

              {/* Input 2: Locality Selector */}
              <div className="flex items-center gap-2 w-full sm:w-56 px-3 py-1.5">
                <MapPin className="w-4 h-4 text-emerald-600 shrink-0" />
                <select
                  value={selectedLocation}
                  onChange={e => setSelectedLocation(e.target.value)}
                  className="w-full bg-transparent text-xs sm:text-sm text-slate-800 font-semibold focus:outline-none cursor-pointer"
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
                className="w-full sm:w-auto bg-amber-500 hover:bg-amber-400 text-slate-950 font-black px-6 sm:px-8 py-3 rounded-xl sm:rounded-full text-xs sm:text-sm flex items-center justify-center gap-2 shadow-lg shadow-amber-500/30 transition-transform active:scale-95 shrink-0"
              >
                <Search className="w-4 h-4 text-slate-950" />
                <span>Buscar</span>
              </button>
            </div>

            {/* Interactive Taxonomy Search Dropdown */}
            {isSearchFocused && matchingTaxonomy.length > 0 && (
              <div className="absolute top-full left-0 right-0 mt-2 bg-white rounded-2xl border border-slate-200 shadow-2xl p-3 z-50 animate-in fade-in space-y-2 max-h-72 overflow-y-auto text-left">
                <div className="flex items-center justify-between pb-1 border-b border-slate-100">
                  <span className="text-[11px] font-bold text-slate-400 uppercase tracking-wider">
                    Rubros & Subcategorías sugeridas:
                  </span>
                  <span className="text-[10px] text-amber-600 font-bold">
                    {matchingTaxonomy.length} encontradas
                  </span>
                </div>

                <div className="space-y-1">
                  {matchingTaxonomy.map((item, idx) => (
                    <button
                      key={idx}
                      type="button"
                      onClick={() => handleSelectTaxonomyItem(item)}
                      className="w-full text-left px-3 py-2 rounded-xl hover:bg-slate-100 flex items-center justify-between text-xs text-slate-800 transition-colors group"
                    >
                      <div className="flex items-center gap-2">
                        <span className="text-sm">{item.emoji}</span>
                        <div>
                          <span className="font-bold text-slate-900 group-hover:text-amber-600">{item.label}</span>
                          {item.parentName && (
                            <span className="text-[10px] text-slate-400 ml-2">en {item.parentName}</span>
                          )}
                        </div>
                      </div>
                      <span className="text-[10px] font-bold px-2 py-0.5 rounded-full bg-slate-100 text-slate-600 group-hover:bg-amber-500 group-hover:text-slate-950 transition-colors">
                        {item.type === 'rubro' ? 'Rubro' : 'Subcategoría'}
                      </span>
                    </button>
                  ))}
                </div>
              </div>
            )}
          </div>

          {/* Popular Search Tags below Search Box (Matching reference template) */}
          <div className="flex flex-wrap items-center justify-center gap-2 pt-2 text-xs">
            <span className="text-slate-400 font-medium">Búsquedas Populares:</span>
            {['Cabañas con Pileta', 'Pizzerías', 'Electricistas', 'Masa Madre', 'Pet Friendly', 'Turismo'].map((term, i) => (
              <button
                key={i}
                type="button"
                onClick={() => { setSearchQuery(term); scrollToDirectory(); }}
                className="px-2.5 py-0.5 rounded-full bg-white/10 hover:bg-white/20 text-slate-200 text-[11px] border border-white/10 transition-colors"
              >
                {term}
              </button>
            ))}
          </div>

        </div>
      </section>

      {/* ======================================================== */}
      {/* 2. METRICS & TRUST STRIP (Matching reference "15,0+M / Más de 700 mil / Más de 150 mil") */}
      {/* ======================================================== */}
      <section className="bg-white border-b border-slate-200 py-6 px-4 sm:px-6 lg:px-8 shadow-sm">
        <div className="max-w-7xl mx-auto flex flex-col md:flex-row items-center justify-between gap-6">
          
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-6 sm:gap-10 w-full md:w-auto">
            <div>
              <div className="text-2xl sm:text-3xl font-black text-slate-900 tracking-tight">+350</div>
              <p className="text-xs text-slate-500 font-semibold mt-0.5">Comercios & Prestadores</p>
            </div>

            <div>
              <div className="text-2xl sm:text-3xl font-black text-slate-900 tracking-tight">7 Ciudades</div>
              <p className="text-xs text-slate-500 font-semibold mt-0.5">Corredor Serrano</p>
            </div>

            <div>
              <div className="text-2xl sm:text-3xl font-black text-slate-900 tracking-tight">+15.000</div>
              <p className="text-xs text-slate-500 font-semibold mt-0.5">Consultas Mensuales</p>
            </div>

            <div>
              <div className="text-2xl sm:text-3xl font-black text-emerald-600 tracking-tight">0% Comisión</div>
              <p className="text-xs text-slate-500 font-semibold mt-0.5">Trato 100% Directo</p>
            </div>
          </div>

          {/* Seal / Badge on right (Matching reference gold badge "Más de 150 mil...") */}
          <div className="flex items-center gap-3 bg-amber-50 border border-amber-200 px-4 py-2.5 rounded-2xl self-center md:self-auto">
            <Award className="w-7 h-7 text-amber-600 shrink-0" />
            <div>
              <span className="text-xs font-extrabold text-amber-950 block">Red Verificada 2026</span>
              <span className="text-[11px] text-amber-800">Directorio Oficial Sierras Chicas</span>
            </div>
          </div>

        </div>
      </section>

      {/* ======================================================== */}
      {/* 3. VALUE PROPOSITION SPLIT SECTION (Matching reference "Obtén la mejor experiencia de anuncios...") */}
      {/* ======================================================== */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 sm:py-16">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 items-center">
          
          {/* Left Column: Visual Showcase */}
          <div className="lg:col-span-5 relative">
            <div className="relative rounded-3xl overflow-hidden shadow-2xl bg-slate-900 aspect-[4/5] max-w-md mx-auto">
              <img
                src="https://images.unsplash.com/photo-1556740738-b6a63e27c4df?w=800&auto=format&fit=crop&q=80"
                alt="Comercio local en Sierras Chicas"
                className="w-full h-full object-cover"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent"></div>
              
              {/* Floating Badge Card inside image */}
              <div className="absolute bottom-6 left-6 right-6 bg-white/95 backdrop-blur-md p-4 rounded-2xl shadow-xl border border-white/20 flex items-center gap-3.5">
                <div className="w-12 h-12 rounded-xl bg-amber-500 text-slate-950 flex items-center justify-center font-black text-xl shrink-0">
                  <Store className="w-6 h-6" />
                </div>
                <div>
                  <span className="text-xs font-black text-slate-900 block">Comercio 100% Local</span>
                  <span className="text-[11px] text-slate-600">Impulsamos la economía de las familias del valle</span>
                </div>
              </div>
            </div>
          </div>

          {/* Right Column: Value Prop Points */}
          <div className="lg:col-span-7 space-y-6">
            <div className="space-y-2">
              <span className="text-xs font-black text-amber-600 uppercase tracking-wider">
                ECOSISTEMA REGIONAL CONECTADO
              </span>
              <h2 className="text-2xl sm:text-4xl font-extrabold text-slate-900 tracking-tight leading-tight">
                Obtén la mejor experiencia comercial y de servicios con Sierras Chicas Digital.
              </h2>
            </div>

            <p className="text-sm text-slate-600 leading-relaxed">
              Diseñado exclusivamente para conectar vecinos y turistas con los comercios de barrio, artesanos, cabañas y profesionales del corredor.
            </p>

            <ul className="space-y-3 text-xs sm:text-sm text-slate-700">
              <li className="flex items-start gap-2.5">
                <CheckCircle2 className="w-5 h-5 text-emerald-600 shrink-0 mt-0.5" />
                <span><strong>Trato y pedidos directos por WhatsApp</strong>: Hablá en tiempo real con el dueño del local sin intermediarios.</span>
              </li>
              <li className="flex items-start gap-2.5">
                <CheckCircle2 className="w-5 h-5 text-emerald-600 shrink-0 mt-0.5" />
                <span><strong>Filtros por localidad del valle</strong>: Localizá opciones exactas en Río Ceballos, Unquillo, Mendiolaza, Villa Allende y más.</span>
              </li>
              <li className="flex items-start gap-2.5">
                <CheckCircle2 className="w-5 h-5 text-emerald-600 shrink-0 mt-0.5" />
                <span><strong>Góndola y cartas actualizadas</strong>: Precios y stock sincronizados en vivo.</span>
              </li>
            </ul>

            {/* 3 Metric Counters (Matching reference style) */}
            <div className="grid grid-cols-3 gap-4 pt-4 border-t border-slate-200">
              <div>
                <div className="text-xl sm:text-2xl font-black text-slate-900">24/7</div>
                <div className="text-[11px] text-slate-500 font-medium">Catálogo Online</div>
              </div>
              <div>
                <div className="text-xl sm:text-2xl font-black text-slate-900">100%</div>
                <div className="text-[11px] text-slate-500 font-medium">Directo sin recargo</div>
              </div>
              <div>
                <div className="text-xl sm:text-2xl font-black text-slate-900">0%</div>
                <div className="text-[11px] text-slate-500 font-medium">Comisión por venta</div>
              </div>
            </div>

            <div className="pt-2 flex flex-wrap gap-3">
              <Link
                to="/panel/perfil"
                className="px-6 py-3 rounded-xl bg-slate-900 hover:bg-slate-800 text-white font-extrabold text-xs sm:text-sm flex items-center gap-2 shadow-md transition-all active:scale-95"
              >
                <span>Sumar mi Comercio al Directorio</span>
                <ArrowRight className="w-4 h-4 text-amber-400" />
              </Link>
            </div>

          </div>

        </div>
      </section>

      {/* ======================================================== */}
      {/* 4. FEATURED LISTINGS SECTION (Matching reference "Anuncios destacados") */}
      {/* ======================================================== */}
      <section ref={directorySectionRef} className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10 space-y-6 w-full">
        
        {/* Section Header with Tabs & View Switcher */}
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 pb-4 border-b border-slate-200">
          <div>
            <span className="text-xs font-black text-amber-600 uppercase tracking-wider block">
              CATÁLOGO REGIONAL
            </span>
            <h2 className="text-2xl sm:text-3xl font-extrabold text-slate-900 tracking-tight">
              Anuncios & Comercios Destacados
            </h2>
            <p className="text-xs text-slate-500 mt-0.5">
              Mostrando {filteredBusinesses.length} comercios y prestadores disponibles
            </p>
          </div>

          <div className="flex flex-wrap items-center gap-3">
            {/* Filter Pills */}
            <div className="flex items-center gap-1 bg-slate-200/70 p-1 rounded-xl overflow-x-auto no-scrollbar">
              <button
                type="button"
                onClick={() => { setFilterMode('all'); setSelectedCategory('all'); setSelectedSubcategory('all'); }}
                className={`px-3 py-1.5 rounded-lg text-xs font-bold transition-all ${
                  filterMode === 'all' && selectedCategory === 'all' ? 'bg-white text-slate-900 shadow-xs' : 'text-slate-600 hover:text-slate-900'
                }`}
              >
                Todos
              </button>
              <button
                type="button"
                onClick={() => setFilterMode('tienda')}
                className={`px-3 py-1.5 rounded-lg text-xs font-bold transition-all ${
                  filterMode === 'tienda' ? 'bg-white text-slate-900 shadow-xs' : 'text-slate-600 hover:text-slate-900'
                }`}
              >
                🛍️ Tiendas
              </button>
              <button
                type="button"
                onClick={() => setFilterMode('servicios')}
                className={`px-3 py-1.5 rounded-lg text-xs font-bold transition-all ${
                  filterMode === 'servicios' ? 'bg-white text-slate-900 shadow-xs' : 'text-slate-600 hover:text-slate-900'
                }`}
              >
                🔧 Servicios
              </button>
              <button
                type="button"
                onClick={() => setFilterMode('aviso')}
                className={`px-3 py-1.5 rounded-lg text-xs font-bold transition-all ${
                  filterMode === 'aviso' ? 'bg-white text-slate-900 shadow-xs' : 'text-slate-600 hover:text-slate-900'
                }`}
              >
                📢 Avisos
              </button>
            </div>

            {/* Grid / List Switcher */}
            <div className="flex items-center gap-1 bg-slate-200/70 p-1 rounded-xl">
              <button
                type="button"
                onClick={() => setViewMode('grid')}
                className={`p-1.5 rounded-lg transition-colors ${
                  viewMode === 'grid' ? 'bg-white text-slate-900 shadow-xs' : 'text-slate-500 hover:text-slate-900'
                }`}
                title="Vista Cuadrícula"
              >
                <LayoutGrid className="w-4 h-4" />
              </button>
              <button
                type="button"
                onClick={() => setViewMode('list')}
                className={`p-1.5 rounded-lg transition-colors ${
                  viewMode === 'list' ? 'bg-white text-slate-900 shadow-xs' : 'text-slate-500 hover:text-slate-900'
                }`}
                title="Vista Lista"
              >
                <List className="w-4 h-4" />
              </button>
            </div>
          </div>
        </div>

        {/* Selected Category / Subcategory Active Pills */}
        {(selectedCategory !== 'all' || selectedSubcategory !== 'all' || selectedLocation !== 'all') && (
          <div className="flex flex-wrap items-center gap-2 p-3 bg-amber-50 border border-amber-200 rounded-2xl animate-in fade-in">
            <span className="text-xs font-bold text-amber-900">Filtros activos:</span>
            {selectedCategory !== 'all' && (
              <span className="inline-flex items-center gap-1 px-2.5 py-0.5 rounded-full bg-white text-xs font-semibold text-slate-800 border border-slate-200">
                Rubro: {categories.find(c => c.slug === selectedCategory)?.name}
                <button type="button" onClick={() => setSelectedCategory('all')} className="hover:text-rose-600">×</button>
              </span>
            )}
            {selectedSubcategory !== 'all' && (
              <span className="inline-flex items-center gap-1 px-2.5 py-0.5 rounded-full bg-white text-xs font-semibold text-slate-800 border border-slate-200">
                Subcategoría: {selectedSubcategory}
                <button type="button" onClick={() => setSelectedSubcategory('all')} className="hover:text-rose-600">×</button>
              </span>
            )}
            {selectedLocation !== 'all' && (
              <span className="inline-flex items-center gap-1 px-2.5 py-0.5 rounded-full bg-white text-xs font-semibold text-slate-800 border border-slate-200">
                Localidad: {locations.find(l => l.slug === selectedLocation)?.name}
                <button type="button" onClick={() => setSelectedLocation('all')} className="hover:text-rose-600">×</button>
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

        {/* Listings Render */}
        {filteredBusinesses.length === 0 ? (
          <div className="py-16 text-center bg-white rounded-3xl border border-slate-200 p-8 space-y-3 shadow-sm">
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
          /* 4-Column Responsive Grid (Matching reference 4-card layout) */
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5">
            {filteredBusinesses.map(biz => {
              const isFav = favorites.includes(biz.id);
              const isNotice = biz.businessMode === 'aviso' || biz.businessMode === 'catalogo';
              const isService = biz.businessMode === 'servicios';
              const targetUrl = isNotice ? `/aviso/${biz.slug}` : isService ? `/comercio/${biz.slug}` : `/tienda/${biz.slug}`;
              const ctaLabel = isNotice ? 'Ver Ficha & Contacto' : isService ? 'Pedir Presupuesto' : 'Ver Carta & Pedir';

              return (
                <div
                  key={biz.id}
                  className="group bg-white rounded-2xl border border-slate-200 overflow-hidden shadow-sm hover:shadow-xl transition-all duration-300 flex flex-col justify-between"
                >
                  <div>
                    {/* Cover & Badges */}
                    <div className="relative h-40 w-full overflow-hidden bg-slate-100">
                      <img
                        src={biz.coverUrl || 'https://images.unsplash.com/photo-1555396273-367ea4eb4db5?w=600&auto=format&fit=crop&q=80'}
                        alt={biz.name}
                        className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                      />
                      <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-transparent to-transparent"></div>

                      {/* Favorite Button */}
                      <button
                        type="button"
                        onClick={() => toggleFavorite(biz.id)}
                        className={`absolute top-2.5 right-2.5 w-8 h-8 rounded-full backdrop-blur-md flex items-center justify-center transition-all ${
                          isFav ? 'bg-rose-500 text-white' : 'bg-black/30 text-white hover:bg-black/50'
                        }`}
                        title="Guardar favorito"
                      >
                        <Heart className={`w-3.5 h-3.5 ${isFav ? 'fill-white' : ''}`} />
                      </button>

                      {/* Mode Badge */}
                      <div className="absolute top-2.5 left-2.5">
                        <span className={`px-2 py-0.5 rounded-full text-[9px] font-black uppercase tracking-wider backdrop-blur-md text-white ${
                          isNotice ? 'bg-indigo-700/90' : isService ? 'bg-amber-600/90' : 'bg-teal-700/90'
                        }`}>
                          {isNotice ? 'Aviso' : isService ? 'Servicio' : 'Tienda'}
                        </span>
                      </div>

                      {/* Location in Cover */}
                      <div className="absolute bottom-2.5 left-2.5 text-white flex items-center gap-1 text-[11px] font-semibold drop-shadow">
                        <MapPin className="w-3 h-3 text-emerald-400" />
                        <span>{biz.locationName || biz.location}</span>
                      </div>
                    </div>

                    {/* Card Body */}
                    <div className="p-4 space-y-2">
                      <div className="flex items-center justify-between text-[11px]">
                        <span className="font-bold text-amber-700">{biz.categoryName || biz.category}</span>
                        <div className="flex items-center gap-1 text-amber-500 font-bold">
                          <Star className="w-3 h-3 fill-amber-500" />
                          <span>{biz.rating || 5.0}</span>
                        </div>
                      </div>

                      <h3 className="font-extrabold text-sm text-slate-900 leading-snug group-hover:text-amber-600 transition-colors line-clamp-1">
                        {biz.name}
                      </h3>

                      <p className="text-[11px] text-slate-500 line-clamp-2 leading-relaxed">
                        {biz.tagline || biz.description}
                      </p>

                      {/* Tags */}
                      {biz.tags && biz.tags.length > 0 && (
                        <div className="flex flex-wrap gap-1 pt-1">
                          {biz.tags.slice(0, 2).map((tag, idx) => (
                            <span
                              key={idx}
                              className="px-1.5 py-0.5 rounded bg-slate-100 text-[9px] font-bold text-slate-600 border border-slate-200"
                            >
                              {tag}
                            </span>
                          ))}
                        </div>
                      )}
                    </div>
                  </div>

                  {/* Footer Action */}
                  <div className="p-4 pt-0">
                    <Link
                      to={targetUrl}
                      className="w-full py-2 rounded-xl bg-slate-100 hover:bg-amber-500 hover:text-slate-950 text-slate-800 text-xs font-extrabold flex items-center justify-center gap-1.5 transition-all group-hover:bg-amber-500 group-hover:text-slate-950"
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
                  className="bg-white p-4 rounded-2xl border border-slate-200 shadow-sm hover:border-slate-300 transition-all flex flex-col sm:flex-row sm:items-center justify-between gap-4"
                >
                  <div className="flex items-center gap-3.5">
                    <div className="w-16 h-16 rounded-xl overflow-hidden bg-slate-100 shrink-0 border border-slate-200">
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
                        <span className="text-xs font-semibold text-amber-700">{biz.categoryName || biz.category}</span>
                        <span className="text-slate-300 text-xs">·</span>
                        <span className="text-xs text-slate-500 flex items-center gap-1">
                          <MapPin className="w-3 h-3 text-emerald-600" />
                          {biz.locationName || biz.location}
                        </span>
                      </div>

                      <h3 className="font-extrabold text-sm sm:text-base text-slate-900">
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
                      className="px-4 py-2 rounded-xl bg-slate-900 hover:bg-slate-800 text-white text-xs font-bold flex items-center gap-1.5 shadow-xs transition-all"
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
      {/* 5. MULTI-COLUMN CATEGORY & SUBCATEGORY DIRECTORY */}
      {/* (Matching reference "Elige la categoría del producto que buscas" with 2-column cards & subcategory rows with `>`) */}
      {/* ======================================================== */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 space-y-8 w-full">
        <div className="text-center space-y-2 max-w-2xl mx-auto">
          <span className="text-xs font-black text-amber-600 uppercase tracking-wider">
            EXPLORA LA GUÍA COMERCIAL COMPLETA
          </span>
          <h2 className="text-2xl sm:text-4xl font-extrabold text-slate-900 tracking-tight">
            Elegí la categoría del producto o servicio que buscás
          </h2>
          <p className="text-xs sm:text-sm text-slate-500 leading-relaxed">
            Accedé directamente a las subcategorías especializadas para encontrar exactamente el prestador que necesitás en tu localidad.
          </p>
        </div>

        {/* 2-Column Grid of Categories with Subcategory lists */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {categories.map(cat => (
            <div
              key={cat.id}
              className="bg-white rounded-3xl border border-slate-200 p-6 shadow-sm hover:shadow-md transition-shadow flex flex-col sm:flex-row gap-6"
            >
              {/* Category Main Brand Box */}
              <div className="sm:w-44 flex flex-col justify-between space-y-4 pb-4 sm:pb-0 sm:pr-4 border-b sm:border-b-0 sm:border-r border-slate-100">
                <div className="space-y-2">
                  <div className="w-14 h-14 rounded-2xl bg-amber-50 text-2xl flex items-center justify-center border border-amber-100 shadow-xs">
                    {cat.emoji || '📁'}
                  </div>
                  <h3 className="font-extrabold text-base text-slate-900 leading-tight">
                    {cat.name}
                  </h3>
                  <span className="text-[11px] font-semibold text-slate-400 block">
                    {(cat.subcategories || []).length} especialidades
                  </span>
                </div>

                <button
                  type="button"
                  onClick={() => handleCategoryCardClick(cat.slug)}
                  className="px-4 py-2 rounded-xl bg-slate-100 hover:bg-amber-500 hover:text-slate-950 text-slate-800 text-xs font-extrabold flex items-center justify-center gap-1.5 transition-colors"
                >
                  <span>Ver Rubro</span>
                  <ArrowRight className="w-3.5 h-3.5" />
                </button>
              </div>

              {/* Subcategories Vertical List with Chevron Right arrows (Matching reference layout) */}
              <div className="flex-1 space-y-1 divide-y divide-slate-100">
                {(cat.subcategories || []).map((sub, idx) => (
                  <button
                    key={idx}
                    type="button"
                    onClick={() => handleSubcategoryClick(cat.slug, sub)}
                    className="w-full text-left py-2.5 px-2 rounded-lg hover:bg-slate-50 flex items-center justify-between text-xs text-slate-700 hover:text-slate-950 font-medium transition-colors group"
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
      {/* 6. PUBLIC SAAS PLANS & MERCADO PAGO SECTION (Preserved as requested) */}
      {/* ======================================================== */}
      <section id="planes-saas" className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 space-y-8 w-full border-t border-slate-200">
        <div className="text-center space-y-2 max-w-2xl mx-auto">
          <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-indigo-50 border border-indigo-200 text-indigo-700 text-xs font-extrabold">
            <Zap className="w-3.5 h-3.5 text-indigo-600" />
            <span>Suscripción Mensual SaaS para Comercios</span>
          </span>
          <h2 className="text-2xl sm:text-4xl font-extrabold text-slate-900 tracking-tight">
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
              className={`p-6 sm:p-7 rounded-3xl border flex flex-col justify-between space-y-5 transition-all shadow-sm ${
                plan.isFeatured
                  ? 'bg-gradient-to-b from-slate-900 via-indigo-950 to-slate-900 text-white border-indigo-500 ring-2 ring-indigo-500/40 shadow-xl'
                  : 'bg-white text-slate-900 border-slate-200'
              }`}
            >
              <div className="space-y-4">
                <div className="flex items-center justify-between">
                  <span className={`px-2.5 py-0.5 rounded-full text-[10px] font-extrabold uppercase ${
                    plan.isFeatured ? 'bg-indigo-600 text-white' : 'bg-slate-100 text-slate-600'
                  }`}>
                    {plan.slug}
                  </span>
                  {plan.isFeatured && (
                    <span className="px-2 py-0.5 rounded-full bg-amber-400 text-amber-950 text-[10px] font-black uppercase">
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
                className={`w-full py-3 rounded-2xl font-black text-xs flex items-center justify-center gap-2 transition-all shadow-md active:scale-95 ${
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
      {/* 7. BOTTOM CALL-TO-ACTION NEWSLETTER / COMMERCE BANNER */}
      {/* (Matching reference bottom banner: "Regístrate para recibir las últimas actualizaciones y noticias") */}
      {/* ======================================================== */}
      <section className="relative overflow-hidden bg-gradient-to-r from-slate-900 via-indigo-950 to-slate-900 text-white py-14 px-4 sm:px-6 lg:px-8">
        <div className="max-w-4xl mx-auto text-center space-y-5">
          <h2 className="text-2xl sm:text-4xl font-extrabold text-white tracking-tight">
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
              className="flex-1 px-4 py-3 rounded-xl bg-white text-slate-900 text-xs placeholder:text-slate-400 focus:outline-none font-medium"
            />
            <button
              type="submit"
              className="bg-amber-500 hover:bg-amber-400 text-slate-950 font-black px-6 py-3 rounded-xl text-xs flex items-center justify-center gap-2 shadow-lg transition-transform active:scale-95 shrink-0"
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
