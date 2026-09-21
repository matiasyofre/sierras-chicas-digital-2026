import React, { useState } from 'react';
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
  Phone,
  Clock,
  Filter,
  LayoutGrid,
  List,
  Tag,
  ExternalLink,
  ShieldCheck,
  Zap,
  TrendingUp,
  CreditCard
} from 'lucide-react';

export default function HomeDirectoryView() {
  const { 
    businesses, 
    categories, 
    locations, 
    plans,
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

  // Current active category object
  const activeCategoryObj = categories.find(c => c.slug === selectedCategory);
  const currentSubcategories = activeCategoryObj?.subcategories || [];

  // Filter businesses
  const filteredBusinesses = businesses.filter(biz => {
    // Search query
    if (searchQuery.trim()) {
      const q = searchQuery.toLowerCase();
      const matchName = biz.name?.toLowerCase().includes(q);
      const matchDesc = biz.description?.toLowerCase().includes(q);
      const matchTag = biz.tagline?.toLowerCase().includes(q);
      const matchLoc = (biz.locationName || biz.location)?.toLowerCase().includes(q);
      const matchCat = (biz.categoryName || biz.category)?.toLowerCase().includes(q);
      const matchSub = (biz.subcategory || '')?.toLowerCase().includes(q);
      const matchTags = (biz.tags || []).some(t => t.toLowerCase().includes(q));
      if (!matchName && !matchDesc && !matchTag && !matchLoc && !matchCat && !matchSub && !matchTags) return false;
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

  return (
    <div className="flex-1 flex flex-col w-full pb-24 md:pb-16 animate-in fade-in">
      
      {/* Hero Section with Animated Illustration & Dynamic Gradients */}
      <section className="relative overflow-hidden bg-gradient-to-b from-teal-950 via-slate-900 to-slate-950 text-white pt-8 sm:pt-12 pb-12 px-4 sm:px-6 lg:px-8 border-b border-teal-900/40">
        
        {/* Animated Background Lights & Mountain Contours */}
        <div className="absolute inset-0 pointer-events-none overflow-hidden">
          <div className="absolute -top-24 left-1/4 w-96 h-96 rounded-full bg-emerald-500/15 blur-3xl animate-pulse"></div>
          <div className="absolute top-1/2 -right-20 w-80 h-80 rounded-full bg-teal-400/10 blur-3xl"></div>
          
          {/* Decorative Vector Mountains */}
          <svg 
            className="absolute bottom-0 left-0 right-0 w-full h-24 sm:h-36 opacity-25 text-teal-800 preserve-3d" 
            viewBox="0 0 1440 320" 
            fill="none" 
            xmlns="http://www.w3.org/2000/svg"
          >
            <path 
              fill="currentColor" 
              d="M0,224L48,208C96,192,192,160,288,165.3C384,171,480,213,576,218.7C672,224,768,192,864,165.3C960,139,1056,117,1152,122.7C1248,128,1344,160,1392,176L1440,192L1440,320L1392,320C1344,320,1248,320,1152,320C1056,320,960,320,864,320C768,320,672,320,576,320C480,320,384,320,288,320C192,320,96,320,48,320L0,320Z"
            />
            <path 
              fill="#0f766e" 
              opacity="0.4"
              d="M0,128L40,149.3C80,171,160,213,240,208C320,203,400,149,480,138.7C560,128,640,160,720,186.7C800,213,880,235,960,224C1040,213,1120,171,1200,165.3C1280,160,1360,192,1400,208L1440,224L1440,320L1400,320C1360,320,1280,320,1200,320C1120,320,1040,320,960,320C880,320,800,320,720,320C640,320,560,320,480,320C400,320,320,320,240,320C160,320,80,320,40,320L0,320Z"
            />
          </svg>
        </div>

        <div className="relative z-10 max-w-5xl mx-auto space-y-5">
          
          {/* Badge & Regional Tag */}
          <div className="flex flex-wrap items-center gap-2">
            <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-teal-500/20 text-teal-300 border border-teal-400/30 text-xs font-black shadow-inner backdrop-blur-md">
              <Sparkles className="w-3.5 h-3.5 text-teal-300 animate-spin" style={{ animationDuration: '6s' }} />
              <span>Plataforma Oficial Sierras Chicas 2026</span>
            </span>
            <span className="text-xs font-semibold text-teal-200/80 hidden sm:inline">
              Río Ceballos · Unquillo · Mendiolaza · Villa Allende · Salsipuedes
            </span>
          </div>

          {/* Hero Titles */}
          <div className="space-y-2">
            <h1 className="text-2xl sm:text-4xl lg:text-5xl font-black tracking-tight leading-tight">
              Encontrá lo que <span className="text-transparent bg-clip-text bg-gradient-to-r from-teal-300 via-emerald-300 to-cyan-300">buscás</span> cerca tuyo.
            </h1>
            <p className="text-xs sm:text-base text-slate-300 max-w-2xl leading-relaxed">
              Comercios, gastronomía, prestadores profesionales y turismo en todo el corredor serrano. Comprá directo, rápido y sin comisiones abusivas.
            </p>
          </div>

          {/* Search Bar */}
          <div className="bg-surface-container-lowest/95 backdrop-blur-md p-2 rounded-2xl shadow-2xl border border-white/20 flex items-center gap-2 max-w-3xl">
            <Search className="w-5 h-5 text-outline ml-2 shrink-0" />
            <input
              type="text"
              value={searchQuery}
              onChange={e => setSearchQuery(e.target.value)}
              placeholder="¿Qué estás buscando? (Ej: Panadería, Electricista, Cabaña, Cerveza artesanal...)"
              className="w-full bg-transparent text-xs sm:text-sm text-slate-900 placeholder:text-slate-400 focus:outline-none py-1.5 font-medium"
            />
            {searchQuery && (
              <button
                type="button"
                onClick={() => setSearchQuery('')}
                className="text-xs text-outline hover:text-on-surface px-2"
              >
                Limpiar
              </button>
            )}
            <button
              type="button"
              className="bg-teal-600 hover:bg-teal-500 text-white px-5 sm:px-7 py-2.5 rounded-xl text-xs sm:text-sm font-bold shrink-0 shadow-lg shadow-teal-950/40 transition-transform active:scale-95"
            >
              Buscar
            </button>
          </div>

        </div>
      </section>

      {/* Main Content Area */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-6 sm:pt-8 space-y-8 w-full">
        
        {/* Banner Registrá tu Negocio */}
        <section className="relative overflow-hidden rounded-3xl bg-gradient-to-r from-slate-900 via-indigo-950 to-slate-900 text-white p-5 sm:p-8 shadow-card border border-indigo-500/30">
          <div className="absolute -right-8 -bottom-8 w-48 h-48 rounded-full bg-indigo-500/20 blur-3xl pointer-events-none"></div>
          <div className="relative z-10 flex flex-col md:flex-row items-start md:items-center justify-between gap-6">
            <div className="space-y-2 max-w-xl">
              <span className="px-2.5 py-0.5 rounded-full bg-indigo-600 text-white text-[10px] font-extrabold uppercase tracking-wider">
                Para Comercios & Profesionales
              </span>
              <h2 className="text-lg sm:text-2xl font-extrabold text-white leading-snug">
                ¿Tenés un negocio o prestás servicios en Sierras Chicas?
              </h2>
              <p className="text-xs sm:text-sm text-slate-300 leading-relaxed">
                Publicá tu ficha comercial, catálogo de productos con góndola rápida y recibí pedidos directos a tu WhatsApp con ID único.
              </p>
            </div>
            <div className="flex flex-col sm:flex-row gap-3 shrink-0">
              <a
                href="#planes-saas"
                className="px-5 py-3 rounded-xl bg-surface-container-lowest text-on-surface hover:bg-surface text-xs sm:text-sm font-extrabold shadow-md flex items-center justify-center gap-2 transition-all active:scale-95"
              >
                <span>Ver Planes y Precios</span>
                <ArrowRight className="w-4 h-4 text-indigo-600" />
              </a>
              <Link
                to="/panel/perfil"
                className="px-5 py-3 rounded-xl bg-indigo-600 hover:bg-indigo-500 text-white text-xs sm:text-sm font-extrabold shadow-md flex items-center justify-center gap-2 transition-all active:scale-95"
              >
                <span>Acceder a mi Panel</span>
              </Link>
            </div>
          </div>
        </section>

        {/* Categories Strip */}
        <section className="space-y-3">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-2">
              <span className="material-symbols-outlined text-primary text-[20px]">category</span>
              <h3 className="text-xs sm:text-sm font-extrabold uppercase tracking-wider text-on-surface">
                Explorar por Rubros
              </h3>
            </div>
            {selectedCategory !== 'all' && (
              <button
                type="button"
                onClick={() => { setSelectedCategory('all'); setSelectedSubcategory('all'); }}
                className="text-xs text-primary font-bold hover:underline"
              >
                Ver todos los rubros
              </button>
            )}
          </div>

          <div className="flex items-center gap-2 overflow-x-auto no-scrollbar pb-2 pt-1 -mx-4 px-4 sm:mx-0 sm:px-0">
            <button
              type="button"
              onClick={() => { setSelectedCategory('all'); setSelectedSubcategory('all'); }}
              className={`shrink-0 flex items-center gap-2 px-4 py-2.5 rounded-2xl text-xs font-bold transition-all shadow-xs ${
                selectedCategory === 'all'
                  ? 'bg-primary text-white shadow-primary/20'
                  : 'bg-surface-container-lowest text-on-surface hover:bg-surface-container border border-surface-container-high'
              }`}
            >
              <span>✨</span>
              <span>Todos los Rubros</span>
            </button>

            {categories.map(cat => (
              <button
                key={cat.id}
                type="button"
                onClick={() => { setSelectedCategory(cat.slug); setSelectedSubcategory('all'); }}
                className={`shrink-0 flex items-center gap-2 px-4 py-2.5 rounded-2xl text-xs font-bold transition-all shadow-xs ${
                  selectedCategory === cat.slug
                    ? 'bg-primary text-white shadow-primary/20'
                    : 'bg-surface-container-lowest text-on-surface hover:bg-surface-container border border-surface-container-high'
                }`}
              >
                <span>{cat.emoji}</span>
                <span>{cat.name}</span>
              </button>
            ))}
          </div>

          {/* Subcategories Pills Strip (if category has subcategories) */}
          {currentSubcategories.length > 0 && (
            <div className="flex items-center gap-2 overflow-x-auto no-scrollbar pt-1 pb-1 animate-in fade-in">
              <span className="text-[11px] font-bold text-outline uppercase tracking-wider shrink-0 flex items-center gap-1">
                <Tag className="w-3.5 h-3.5 text-primary" />
                Subcategorías:
              </span>
              <button
                type="button"
                onClick={() => setSelectedSubcategory('all')}
                className={`shrink-0 px-3 py-1 rounded-xl text-xs font-semibold transition-colors ${
                  selectedSubcategory === 'all'
                    ? 'bg-secondary text-white font-bold'
                    : 'bg-surface-container text-on-surface-variant hover:bg-surface-container-high'
                }`}
              >
                Todas
              </button>
              {currentSubcategories.map((sub, idx) => (
                <button
                  key={idx}
                  type="button"
                  onClick={() => setSelectedSubcategory(sub)}
                  className={`shrink-0 px-3 py-1 rounded-xl text-xs font-semibold transition-colors ${
                    selectedSubcategory === sub
                      ? 'bg-secondary text-white font-bold'
                      : 'bg-surface-container text-on-surface-variant hover:bg-surface-container-high'
                  }`}
                >
                  {sub}
                </button>
              ))}
            </div>
          )}
        </section>

        {/* Localities Strip Filter */}
        <section className="space-y-3">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-2">
              <MapPin className="w-4 h-4 text-primary" />
              <h3 className="text-xs sm:text-sm font-extrabold uppercase tracking-wider text-on-surface">
                Filtrar por Localidad
              </h3>
            </div>
            {selectedLocation !== 'all' && (
              <button
                type="button"
                onClick={() => setSelectedLocation('all')}
                className="text-xs text-primary font-bold hover:underline"
              >
                Ver todo el valle
              </button>
            )}
          </div>

          <div className="flex items-center gap-1.5 overflow-x-auto no-scrollbar pb-2 -mx-4 px-4 sm:mx-0 sm:px-0">
            <button
              type="button"
              onClick={() => setSelectedLocation('all')}
              className={`shrink-0 px-3 py-1.5 rounded-xl text-xs font-bold transition-all ${
                selectedLocation === 'all'
                  ? 'bg-secondary text-white'
                  : 'bg-surface-container text-on-surface-variant hover:text-on-surface'
              }`}
            >
              Todo Sierras Chicas
            </button>
            {locations.map(loc => (
              <button
                key={loc.id}
                type="button"
                onClick={() => setSelectedLocation(loc.slug)}
                className={`shrink-0 px-3 py-1.5 rounded-xl text-xs font-bold transition-all ${
                  selectedLocation === loc.slug
                    ? 'bg-secondary text-white'
                    : 'bg-surface-container text-on-surface-variant hover:text-on-surface'
                }`}
              >
                {loc.name}
              </button>
            ))}
          </div>
        </section>

        {/* Directory Listing Section with View Switcher (Grid vs List) */}
        <section className="space-y-4">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 pb-2 border-b border-surface-container-high">
            <div>
              <h2 className="text-lg sm:text-xl font-extrabold text-on-surface">
                Comercios y Prestadores Destacados
              </h2>
              <p className="text-xs text-on-surface-variant">
                Mostrando {filteredBusinesses.length} resultados disponibles
              </p>
            </div>

            <div className="flex items-center gap-2 self-start sm:self-auto">
              {/* Mode Pills */}
              <div className="flex items-center gap-1 bg-surface-container-low p-1 rounded-xl border border-surface-container-high overflow-x-auto no-scrollbar">
                <button
                  type="button"
                  onClick={() => setFilterMode('all')}
                  className={`px-2.5 py-1 rounded-lg text-xs font-semibold whitespace-nowrap transition-all ${
                    filterMode === 'all' ? 'bg-surface-container-lowest text-on-surface font-bold shadow-xs' : 'text-on-surface-variant hover:text-on-surface'
                  }`}
                >
                  Todos
                </button>
                <button
                  type="button"
                  onClick={() => setFilterMode('aviso')}
                  className={`px-2.5 py-1 rounded-lg text-xs font-semibold whitespace-nowrap transition-all ${
                    filterMode === 'aviso' ? 'bg-surface-container-lowest text-on-surface font-bold shadow-xs' : 'text-on-surface-variant hover:text-on-surface'
                  }`}
                >
                  📢 Avisos
                </button>
                <button
                  type="button"
                  onClick={() => setFilterMode('tienda')}
                  className={`px-2.5 py-1 rounded-lg text-xs font-semibold whitespace-nowrap transition-all ${
                    filterMode === 'tienda' ? 'bg-surface-container-lowest text-on-surface font-bold shadow-xs' : 'text-on-surface-variant hover:text-on-surface'
                  }`}
                >
                  🛍️ Tiendas
                </button>
                <button
                  type="button"
                  onClick={() => setFilterMode('servicios')}
                  className={`px-2.5 py-1 rounded-lg text-xs font-semibold whitespace-nowrap transition-all ${
                    filterMode === 'servicios' ? 'bg-surface-container-lowest text-on-surface font-bold shadow-xs' : 'text-on-surface-variant hover:text-on-surface'
                  }`}
                >
                  🔧 Servicios
                </button>
              </div>

              {/* Grid / List Switcher (SC-14) */}
              <div className="flex items-center gap-1 bg-surface-container-low p-1 rounded-xl border border-surface-container-high">
                <button
                  type="button"
                  onClick={() => setViewMode('grid')}
                  className={`p-1.5 rounded-lg transition-colors ${
                    viewMode === 'grid' ? 'bg-surface-container-lowest text-primary shadow-xs' : 'text-outline hover:text-on-surface'
                  }`}
                  title="Vista Cuadrícula"
                >
                  <LayoutGrid className="w-4 h-4" />
                </button>
                <button
                  type="button"
                  onClick={() => setViewMode('list')}
                  className={`p-1.5 rounded-lg transition-colors ${
                    viewMode === 'list' ? 'bg-surface-container-lowest text-primary shadow-xs' : 'text-outline hover:text-on-surface'
                  }`}
                  title="Vista Lista Compacta"
                >
                  <List className="w-4 h-4" />
                </button>
              </div>
            </div>
          </div>

          {/* Business Listing Render */}
          {filteredBusinesses.length === 0 ? (
            <div className="py-16 text-center bg-surface-container-lowest rounded-3xl border border-surface-container-high p-8 space-y-3">
              <Store className="w-12 h-12 text-outline mx-auto stroke-1" />
              <h4 className="font-extrabold text-base text-on-surface">No se encontraron comercios</h4>
              <p className="text-xs text-on-surface-variant max-w-sm mx-auto">
                Probá cambiando los términos de búsqueda o eliminando los filtros de localidad y categoría.
              </p>
              <button
                type="button"
                onClick={() => { setSearchQuery(''); setSelectedCategory('all'); setSelectedLocation('all'); setSelectedSubcategory('all'); setFilterMode('all'); }}
                className="px-4 py-2 rounded-xl bg-primary text-white text-xs font-bold shadow-sm"
              >
                Restablecer todos los filtros
              </button>
            </div>
          ) : viewMode === 'grid' ? (
            /* GRID VIEW */
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
              {filteredBusinesses.map(biz => {
                const isFav = favorites.includes(biz.id);
                const isNotice = biz.businessMode === 'aviso' || biz.businessMode === 'catalogo';
                const isService = biz.businessMode === 'servicios';
                const targetUrl = isNotice ? `/aviso/${biz.slug}` : isService ? `/comercio/${biz.slug}` : `/tienda/${biz.slug}`;
                
                // CTA Label (SC-1)
                const ctaLabel = isNotice 
                  ? 'Ver Ficha & Contacto' 
                  : isService 
                  ? 'Pedir Presupuesto' 
                  : 'Ver Carta & Pedir';

                return (
                  <div
                    key={biz.id}
                    className="group bg-surface-container-lowest rounded-3xl border border-surface-container-high overflow-hidden shadow-subtle hover:shadow-card transition-all duration-300 flex flex-col"
                  >
                    {/* Cover & Badges */}
                    <div className="relative h-44 w-full overflow-hidden bg-slate-100">
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
                        className={`absolute top-3 right-3 w-9 h-9 rounded-full backdrop-blur-md flex items-center justify-center transition-all ${
                          isFav ? 'bg-rose-500 text-white' : 'bg-black/30 text-white hover:bg-black/50'
                        }`}
                        title="Guardar favorito"
                      >
                        <Heart className={`w-4 h-4 ${isFav ? 'fill-white' : ''}`} />
                      </button>

                      {/* Mode Badge */}
                      <div className="absolute top-3 left-3 flex flex-wrap gap-1.5">
                        <span className={`px-2.5 py-1 rounded-full text-[10px] font-extrabold uppercase tracking-wider backdrop-blur-md text-white ${
                          isNotice 
                            ? 'bg-indigo-700/90' 
                            : isService 
                            ? 'bg-amber-600/90' 
                            : 'bg-teal-700/90'
                        }`}>
                          {isNotice ? '📢 Aviso Publicitario' : isService ? '🔧 Servicios Pro' : '🛍️ Tienda / Pedidos'}
                        </span>
                        {biz.isFeatured && (
                          <span className="px-2 py-0.5 rounded-full text-[10px] font-bold bg-amber-400 text-amber-950 flex items-center gap-1 shadow-xs">
                            <Star className="w-3 h-3 fill-amber-950" />
                            <span>Destacado</span>
                          </span>
                        )}
                      </div>

                      {/* Location in Cover */}
                      <div className="absolute bottom-3 left-3 text-white flex items-center gap-1.5 text-xs font-semibold drop-shadow">
                        <MapPin className="w-3.5 h-3.5 text-emerald-400" />
                        <span>{biz.locationName || biz.location}</span>
                      </div>
                    </div>

                    {/* Card Body */}
                    <div className="p-4 sm:p-5 flex-1 flex flex-col justify-between space-y-4">
                      <div className="space-y-2">
                        <div className="flex items-center justify-between text-xs">
                          <span className="font-bold text-primary">{biz.categoryName || biz.category}</span>
                          <div className="flex items-center gap-1 text-amber-500 font-bold">
                            <Star className="w-3.5 h-3.5 fill-amber-500" />
                            <span>{biz.rating || 5.0}</span>
                            <span className="text-outline font-normal">({biz.reviewCount || 1})</span>
                          </div>
                        </div>

                        <h3 className="font-extrabold text-base sm:text-lg text-on-surface leading-tight group-hover:text-primary transition-colors">
                          {biz.name}
                        </h3>

                        <p className="text-xs text-on-surface-variant line-clamp-2 leading-relaxed">
                          {biz.tagline || biz.description}
                        </p>

                        {/* Rich Badges / Tags (SC-13) */}
                        {biz.tags && biz.tags.length > 0 && (
                          <div className="flex flex-wrap gap-1 pt-1">
                            {biz.tags.slice(0, 3).map((tag, idx) => (
                              <span
                                key={idx}
                                className="px-2 py-0.5 rounded-md bg-surface-container text-[10px] font-bold text-on-surface-variant border border-surface-container-high"
                              >
                                {tag}
                              </span>
                            ))}
                          </div>
                        )}
                      </div>

                      {/* Footer Actions (SC-1) */}
                      <div className="pt-3 border-t border-surface-container-high flex items-center justify-between gap-2">
                        <div className="flex items-center gap-1 text-[11px] text-on-surface-variant">
                          <Clock className="w-3.5 h-3.5 text-outline" />
                          <span className="truncate max-w-[110px]">{biz.openingHours || 'Abierto hoy'}</span>
                        </div>

                        <Link
                          to={targetUrl}
                          className="px-3.5 py-2 rounded-xl bg-surface-container-low hover:bg-primary hover:text-white text-on-surface text-xs font-bold flex items-center gap-1 transition-all group-hover:bg-primary group-hover:text-white"
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
          ) : (
            /* COMPACT LIST VIEW (SC-14) */
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
                    className="bg-surface-container-lowest p-3.5 sm:p-4 rounded-2xl border border-surface-container-high shadow-subtle hover:border-primary/50 transition-all flex flex-col sm:flex-row sm:items-center justify-between gap-4"
                  >
                    <div className="flex items-center gap-3.5">
                      <div className="w-16 h-16 sm:w-20 sm:h-20 rounded-xl overflow-hidden bg-slate-100 shrink-0 border border-surface-container-high">
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
                          <span className="text-xs font-semibold text-primary">{biz.categoryName || biz.category}</span>
                          <span className="text-outline text-xs">·</span>
                          <span className="text-xs text-on-surface-variant flex items-center gap-1">
                            <MapPin className="w-3 h-3 text-emerald-600" />
                            {biz.locationName || biz.location}
                          </span>
                        </div>

                        <h3 className="font-extrabold text-sm sm:text-base text-on-surface">
                          {biz.name}
                        </h3>

                        <p className="text-xs text-on-surface-variant line-clamp-1">
                          {biz.tagline || biz.description}
                        </p>

                        {biz.tags && biz.tags.length > 0 && (
                          <div className="flex flex-wrap gap-1 pt-0.5">
                            {biz.tags.slice(0, 2).map((tag, idx) => (
                              <span key={idx} className="px-1.5 py-0.5 rounded bg-surface-container text-[9px] font-semibold text-on-surface-variant">
                                {tag}
                              </span>
                            ))}
                          </div>
                        )}
                      </div>
                    </div>

                    <div className="flex items-center justify-between sm:justify-end gap-3 pt-2 sm:pt-0 border-t sm:border-t-0 border-surface-container-high shrink-0">
                      <div className="flex items-center gap-1 text-amber-500 font-bold text-xs">
                        <Star className="w-3.5 h-3.5 fill-amber-500" />
                        <span>{biz.rating || 5.0}</span>
                      </div>

                      <Link
                        to={targetUrl}
                        className="px-4 py-2 rounded-xl bg-primary text-white hover:bg-primary-container text-xs font-bold flex items-center gap-1.5 shadow-xs transition-all"
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

        {/* Public SaaS Plans & Mercado Pago Checkout Section (SC-7) */}
        <section id="planes-saas" className="py-8 space-y-6">
          <div className="text-center space-y-2 max-w-2xl mx-auto">
            <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-indigo-50 border border-indigo-200 text-indigo-700 text-xs font-extrabold">
              <Zap className="w-3.5 h-3.5 text-indigo-600" />
              <span>Suscripción Mensual SaaS Directa</span>
            </span>
            <h2 className="text-xl sm:text-3xl font-extrabold text-on-surface tracking-tight">
              Planes Comerciales para el Valle de Sierras Chicas
            </h2>
            <p className="text-xs sm:text-sm text-on-surface-variant leading-relaxed">
              Elegí el plan adecuado para tu negocio. Activación inmediata con suscripción segura por Mercado Pago.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 max-w-6xl mx-auto">
            {plans.map(plan => (
              <div
                key={plan.id}
                className={`p-6 rounded-3xl border flex flex-col justify-between space-y-5 transition-all shadow-subtle ${
                  plan.isFeatured
                    ? 'bg-gradient-to-b from-indigo-950 via-slate-900 to-slate-950 text-white border-indigo-500 ring-2 ring-indigo-500/40 shadow-xl'
                    : 'bg-surface-container-lowest text-on-surface border-surface-container-high'
                }`}
              >
                <div className="space-y-4">
                  <div className="flex items-center justify-between">
                    <span className={`px-2.5 py-0.5 rounded-full text-[10px] font-extrabold uppercase ${
                      plan.isFeatured ? 'bg-indigo-600 text-white' : 'bg-surface-container text-outline'
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

                  <div className="pt-3 border-t border-surface-container-high/40">
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
                      ? 'bg-indigo-600 hover:bg-indigo-500 text-white shadow-indigo-950/40'
                      : 'bg-primary hover:bg-primary-container text-white'
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

      </div>
    </div>
  );
}
