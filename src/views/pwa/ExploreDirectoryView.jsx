import React, { useState, useMemo } from 'react';
import { Link, useSearchParams } from 'react-router-dom';
import { useApp } from '../../context/AppContext';
import { 
  Search, 
  MapPin, 
  Store, 
  ShoppingBag, 
  Sparkles, 
  Star, 
  ArrowRight, 
  LayoutGrid, 
  List, 
  Filter, 
  CheckCircle2, 
  Phone, 
  Instagram, 
  SlidersHorizontal,
  X,
  Compass,
  Zap,
  Tag
} from 'lucide-react';

export default function ExploreDirectoryView() {
  const { 
    businesses, 
    categories, 
    locations, 
    tags, 
    selectedLocation, 
    setSelectedLocation, 
    selectedCategory, 
    setSelectedCategory, 
    favorites, 
    toggleFavorite 
  } = useApp();

  const [searchParams, setSearchParams] = useSearchParams();
  const [searchTerm, setSearchTerm] = useState(searchParams.get('q') || '');
  const [activeLoc, setActiveLoc] = useState(searchParams.get('loc') || selectedLocation || 'all');
  const [activeCat, setActiveCat] = useState(searchParams.get('cat') || selectedCategory || 'all');
  const [activeSubcat, setActiveSubcat] = useState(searchParams.get('sub') || 'all');
  const [filterMode, setFilterMode] = useState('all'); // 'all', 'tienda', 'servicios', 'aviso'
  const [selectedTag, setSelectedTag] = useState('all');
  const [viewMode, setViewMode] = useState('grid'); // 'grid' | 'list'
  const [sortBy, setSortBy] = useState('destacados'); // 'destacados', 'rating', 'recientes', 'nombre'

  // Subcategories for current active category
  const activeCategoryObj = categories.find(c => c.slug === activeCat || c.id === activeCat);
  const availableSubcategories = activeCategoryObj?.subcategories || [];

  // Filtered & Sorted Businesses
  const filteredBusinesses = useMemo(() => {
    let list = [...businesses];

    // Search query
    if (searchTerm.trim()) {
      const q = searchTerm.toLowerCase();
      list = list.filter(biz => {
        const matchName = biz.name?.toLowerCase().includes(q);
        const matchDesc = biz.description?.toLowerCase().includes(q);
        const matchTagline = biz.tagline?.toLowerCase().includes(q);
        const matchLoc = (biz.locationName || biz.location)?.toLowerCase().includes(q);
        const matchCat = (biz.categoryName || biz.category)?.toLowerCase().includes(q);
        const matchSub = (biz.subcategory || '')?.toLowerCase().includes(q);
        const matchTags = (biz.tags || []).some(t => t.toLowerCase().includes(q));
        return matchName || matchDesc || matchTagline || matchLoc || matchCat || matchSub || matchTags;
      });
    }

    // Location Filter
    if (activeLoc !== 'all') {
      const locObj = locations.find(l => l.slug === activeLoc || l.id === activeLoc);
      list = list.filter(biz => 
        biz.locationId === activeLoc || 
        biz.locationId === locObj?.id || 
        (biz.locationName || biz.location)?.toLowerCase() === locObj?.name?.toLowerCase()
      );
    }

    // Category Filter
    if (activeCat !== 'all') {
      list = list.filter(biz => 
        biz.categoryId === activeCat || 
        biz.categoryId === activeCategoryObj?.id || 
        (biz.categoryName || biz.category)?.toLowerCase() === activeCategoryObj?.name?.toLowerCase() ||
        biz.category === activeCat
      );
    }

    // Subcategory Filter
    if (activeSubcat !== 'all') {
      list = list.filter(biz => biz.subcategory === activeSubcat);
    }

    // Mode Filter (Tienda, Servicios, Aviso)
    if (filterMode !== 'all') {
      list = list.filter(biz => biz.businessMode === filterMode);
    }

    // Tag Filter
    if (selectedTag !== 'all') {
      list = list.filter(biz => (biz.tags || []).includes(selectedTag));
    }

    // Sorting
    list.sort((a, b) => {
      if (sortBy === 'destacados') {
        if (a.isFeatured && !b.isFeatured) return -1;
        if (!a.isFeatured && b.isFeatured) return 1;
        return (b.rating || 0) - (a.rating || 0);
      }
      if (sortBy === 'rating') return (b.rating || 0) - (a.rating || 0);
      if (sortBy === 'nombre') return a.name.localeCompare(b.name);
      return 0;
    });

    return list;
  }, [businesses, searchTerm, activeLoc, activeCat, activeSubcat, filterMode, selectedTag, sortBy, locations, activeCategoryObj]);

  const clearAllFilters = () => {
    setSearchTerm('');
    setActiveLoc('all');
    setActiveCat('all');
    setActiveSubcat('all');
    setFilterMode('all');
    setSelectedTag('all');
    setSortBy('destacados');
  };

  return (
    <main className="min-h-screen bg-surface py-6 sm:py-10">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-6">
        
        {/* Header Title & Breadcrumb */}
        <div className="bg-slate-900 rounded-[2.5rem] p-6 sm:p-10 text-white shadow-xl relative overflow-hidden border border-slate-800">
          <div className="absolute inset-0 bg-[radial-gradient(#10b981_1px,transparent_1px)] [background-size:20px_20px] opacity-10 pointer-events-none"></div>
          
          <div className="relative z-10 space-y-3 max-w-3xl">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-emerald-500/10 text-emerald-400 text-xs font-black border border-emerald-500/20">
              <Compass className="w-3.5 h-3.5" />
              <span>EXPLORADOR TOTAL DEL CORREDOR</span>
            </div>
            <h1 className="text-2xl sm:text-4xl font-black text-white tracking-tight">
              Buscador General de Sierras Chicas
            </h1>
            <p className="text-xs sm:text-sm text-slate-300 font-medium leading-relaxed">
              Encontrá el catálogo completo de comercios, tiendas online, profesionales matriculados y avisos en todas las localidades del corredor.
            </p>
          </div>
        </div>

        {/* Live Search & Filter Bar */}
        <div className="bg-white rounded-3xl p-4 sm:p-6 shadow-sm border border-slate-200 space-y-4">
          
          {/* Main Search Input */}
          <div className="flex flex-col md:flex-row items-center gap-3">
            <div className="flex items-center gap-3 w-full bg-slate-50 border border-slate-200 rounded-2xl px-4 py-3 focus-within:border-emerald-500 focus-within:bg-white transition-all">
              <Search className="w-5 h-5 text-slate-400 shrink-0" />
              <input
                type="text"
                value={searchTerm}
                onChange={e => setSearchTerm(e.target.value)}
                placeholder="Buscar por nombre, rubro, servicio, producto o palabra clave..."
                className="w-full bg-transparent text-xs sm:text-sm text-slate-900 font-bold focus:outline-none placeholder:text-slate-400"
              />
              {searchTerm && (
                <button type="button" onClick={() => setSearchTerm('')} className="text-slate-400 hover:text-slate-600">
                  <X className="w-4 h-4" />
                </button>
              )}
            </div>

            {/* Location Select */}
            <div className="w-full md:w-64 shrink-0">
              <div className="flex items-center gap-2 bg-slate-50 border border-slate-200 rounded-2xl px-3 py-3">
                <MapPin className="w-4 h-4 text-emerald-600 shrink-0" />
                <select
                  value={activeLoc}
                  onChange={e => setActiveLoc(e.target.value)}
                  className="w-full bg-transparent text-xs sm:text-sm font-bold text-slate-800 focus:outline-none cursor-pointer"
                >
                  <option value="all">📍 Todas las Localidades</option>
                  {locations.map(loc => (
                    <option key={loc.id} value={loc.slug}>{loc.name}</option>
                  ))}
                </select>
              </div>
            </div>

            {/* Category Select */}
            <div className="w-full md:w-64 shrink-0">
              <div className="flex items-center gap-2 bg-slate-50 border border-slate-200 rounded-2xl px-3 py-3">
                <Tag className="w-4 h-4 text-amber-600 shrink-0" />
                <select
                  value={activeCat}
                  onChange={e => { setActiveCat(e.target.value); setActiveSubcat('all'); }}
                  className="w-full bg-transparent text-xs sm:text-sm font-bold text-slate-800 focus:outline-none cursor-pointer"
                >
                  <option value="all">📁 Todos los Rubros</option>
                  {categories.map(cat => (
                    <option key={cat.id} value={cat.slug}>{cat.emoji} {cat.name}</option>
                  ))}
                </select>
              </div>
            </div>
          </div>

          {/* Subcategories Pills if Category Selected */}
          {availableSubcategories.length > 0 && (
            <div className="flex items-center gap-1.5 overflow-x-auto no-scrollbar pt-1 pb-1">
              <span className="text-[11px] font-black text-slate-400 uppercase shrink-0 mr-1">Subcategorías:</span>
              <button
                type="button"
                onClick={() => setActiveSubcat('all')}
                className={`px-3 py-1 rounded-xl text-xs font-bold shrink-0 transition-all ${
                  activeSubcat === 'all' ? 'bg-slate-900 text-white' : 'bg-slate-100 hover:bg-slate-200 text-slate-700'
                }`}
              >
                Todas
              </button>
              {availableSubcategories.map((sub, idx) => (
                <button
                  key={idx}
                  type="button"
                  onClick={() => setActiveSubcat(sub)}
                  className={`px-3 py-1 rounded-xl text-xs font-bold shrink-0 transition-all ${
                    activeSubcat === sub ? 'bg-emerald-700 text-white' : 'bg-slate-100 hover:bg-slate-200 text-slate-700'
                  }`}
                >
                  {sub}
                </button>
              ))}
            </div>
          )}

          {/* Mode & Sort Toolbar */}
          <div className="flex flex-col sm:flex-row items-center justify-between gap-3 pt-3 border-t border-slate-100">
            
            {/* Business Mode Pills */}
            <div className="flex items-center gap-1.5 overflow-x-auto no-scrollbar w-full sm:w-auto">
              <button
                type="button"
                onClick={() => setFilterMode('all')}
                className={`px-3 py-1.5 rounded-xl text-xs font-bold transition-all ${
                  filterMode === 'all' ? 'bg-amber-500 text-slate-950 shadow-sm' : 'bg-slate-100 text-slate-600 hover:text-slate-900'
                }`}
              >
                Todos ({businesses.length})
              </button>
              <button
                type="button"
                onClick={() => setFilterMode('tienda')}
                className={`px-3 py-1.5 rounded-xl text-xs font-bold transition-all ${
                  filterMode === 'tienda' ? 'bg-amber-500 text-slate-950 shadow-sm' : 'bg-slate-100 text-slate-600 hover:text-slate-900'
                }`}
              >
                🛍️ Tiendas con Carrito
              </button>
              <button
                type="button"
                onClick={() => setFilterMode('servicios')}
                className={`px-3 py-1.5 rounded-xl text-xs font-bold transition-all ${
                  filterMode === 'servicios' ? 'bg-amber-500 text-slate-950 shadow-sm' : 'bg-slate-100 text-slate-600 hover:text-slate-900'
                }`}
              >
                🔧 Servicios & Presupuesto
              </button>
              <button
                type="button"
                onClick={() => setFilterMode('aviso')}
                className={`px-3 py-1.5 rounded-xl text-xs font-bold transition-all ${
                  filterMode === 'aviso' ? 'bg-amber-500 text-slate-950 shadow-sm' : 'bg-slate-100 text-slate-600 hover:text-slate-900'
                }`}
              >
                📢 Avisos Clasificados
              </button>
            </div>

            {/* View Mode & Sorting */}
            <div className="flex items-center gap-2 w-full sm:w-auto justify-end">
              <select
                value={sortBy}
                onChange={e => setSortBy(e.target.value)}
                className="text-xs font-bold text-slate-700 bg-slate-100 hover:bg-slate-200 border border-slate-200 rounded-xl px-2.5 py-1.5 cursor-pointer focus:outline-none"
              >
                <option value="destacados">⭐ Prioridad Destacados</option>
                <option value="rating">🌟 Mejor Valorados</option>
                <option value="nombre">🔤 Orden Alfabético</option>
              </select>

              <div className="flex items-center gap-1 bg-slate-100 p-1 rounded-xl border border-slate-200">
                <button
                  type="button"
                  onClick={() => setViewMode('grid')}
                  className={`p-1.5 rounded-lg transition-colors ${viewMode === 'grid' ? 'bg-white text-slate-900 shadow-xs' : 'text-slate-400'}`}
                >
                  <LayoutGrid className="w-3.5 h-3.5" />
                </button>
                <button
                  type="button"
                  onClick={() => setViewMode('list')}
                  className={`p-1.5 rounded-lg transition-colors ${viewMode === 'list' ? 'bg-white text-slate-900 shadow-xs' : 'text-slate-400'}`}
                >
                  <List className="w-3.5 h-3.5" />
                </button>
              </div>
            </div>

          </div>

          {/* Active Filters Summary */}
          {(searchTerm || activeLoc !== 'all' || activeCat !== 'all' || activeSubcat !== 'all' || filterMode !== 'all' || selectedTag !== 'all') && (
            <div className="flex flex-wrap items-center gap-2 pt-2 text-xs">
              <span className="font-bold text-slate-500">Filtros aplicados:</span>
              {searchTerm && <span className="bg-amber-100 text-amber-900 px-2.5 py-0.5 rounded-full font-bold">"{searchTerm}"</span>}
              {activeLoc !== 'all' && <span className="bg-emerald-100 text-emerald-900 px-2.5 py-0.5 rounded-full font-bold">Localidad: {locations.find(l => l.slug === activeLoc)?.name}</span>}
              {activeCat !== 'all' && <span className="bg-indigo-100 text-indigo-900 px-2.5 py-0.5 rounded-full font-bold">Rubro: {activeCategoryObj?.name}</span>}
              {activeSubcat !== 'all' && <span className="bg-teal-100 text-teal-900 px-2.5 py-0.5 rounded-full font-bold">Subcategoría: {activeSubcat}</span>}
              {filterMode !== 'all' && <span className="bg-purple-100 text-purple-900 px-2.5 py-0.5 rounded-full font-bold">Modo: {filterMode}</span>}
              <button type="button" onClick={clearAllFilters} className="text-rose-600 underline font-black ml-auto">
                Limpiar todo
              </button>
            </div>
          )}

        </div>

        {/* Results Counter */}
        <div className="flex items-center justify-between text-xs font-bold text-slate-500 px-1">
          <span>Mostrando {filteredBusinesses.length} resultados en el corredor</span>
          <span>Actualizado en tiempo real</span>
        </div>

        {/* Results Listings */}
        {filteredBusinesses.length === 0 ? (
          <div className="py-20 text-center bg-white rounded-3xl p-8 space-y-3 shadow-xs border border-slate-200">
            <Store className="w-12 h-12 text-slate-300 mx-auto" />
            <h3 className="font-extrabold text-base text-slate-900">No se encontraron comercios con los filtros elegidos</h3>
            <p className="text-xs text-slate-500 max-w-sm mx-auto font-medium">
              Probá restableciendo los filtros o buscando con otro término más amplio.
            </p>
            <button
              type="button"
              onClick={clearAllFilters}
              className="px-5 py-2.5 rounded-xl bg-slate-900 text-white text-xs font-bold hover:bg-slate-800"
            >
              Ver todos los comercios
            </button>
          </div>
        ) : viewMode === 'grid' ? (
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
                      {biz.tags && biz.tags.length > 0 && (
                        <div className="flex flex-wrap gap-1">
                          {biz.tags.slice(0, 2).map((t, idx) => (
                            <span key={idx} className="text-[9px] font-bold px-1.5 py-0.2 rounded-md bg-slate-100 text-slate-600">
                              #{t}
                            </span>
                          ))}
                        </div>
                      )}

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
        ) : (
          <div className="space-y-3">
            {filteredBusinesses.map(biz => {
              const isFav = favorites.includes(biz.id);
              const isNotice = biz.businessMode === 'aviso' || biz.businessMode === 'catalogo';
              const isService = biz.businessMode === 'servicios';
              const targetUrl = isNotice ? `/aviso/${biz.slug}` : isService ? `/comercio/${biz.slug}` : `/tienda/${biz.slug}`;
              const ctaLabel = isNotice ? 'Ver Ficha' : isService ? 'Presupuesto' : 'Ver Tienda';

              return (
                <div
                  key={biz.id}
                  className={`bg-white rounded-2xl p-4 border flex flex-col sm:flex-row items-center justify-between gap-4 transition-all hover:shadow-md ${
                    biz.isFeatured ? 'border-amber-400 ring-1 ring-amber-400/20' : 'border-slate-200'
                  }`}
                >
                  <div className="flex items-center gap-4 w-full sm:w-auto">
                    <img
                      src={biz.logoUrl || biz.coverUrl}
                      alt={biz.name}
                      className="w-14 h-14 rounded-2xl object-cover border border-slate-100 shrink-0"
                    />
                    <div className="space-y-0.5">
                      <div className="flex items-center gap-2">
                        <h3 className="font-extrabold text-sm text-slate-900">{biz.name}</h3>
                        {biz.isFeatured && <span className="bg-amber-400 text-slate-950 font-black text-[9px] px-1.5 py-0.2 rounded-md uppercase">Destacado</span>}
                      </div>
                      <p className="text-xs text-slate-500 line-clamp-1">{biz.tagline || biz.description}</p>
                      <div className="flex items-center gap-3 text-[11px] text-slate-400 font-bold">
                        <span>📍 {biz.locationName || biz.location}</span>
                        <span>📁 {biz.categoryName || biz.category}</span>
                        <span className="text-amber-600">⭐ {biz.rating}</span>
                      </div>
                    </div>
                  </div>

                  <div className="flex items-center gap-2 w-full sm:w-auto shrink-0 justify-end">
                    <Link
                      to={targetUrl}
                      className="px-4 py-2 rounded-xl bg-slate-900 hover:bg-emerald-700 text-white font-bold text-xs flex items-center gap-1.5 transition-colors"
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

      </div>
    </main>
  );
}
