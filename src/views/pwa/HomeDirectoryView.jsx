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
  Filter
} from 'lucide-react';

export default function HomeDirectoryView() {
  const { 
    businesses, 
    categories, 
    locations, 
    selectedLocation, 
    setSelectedLocation,
    selectedCategory,
    setSelectedCategory,
    searchQuery,
    setSearchQuery,
    favorites,
    toggleFavorite
  } = useApp();

  const [filterMode, setFilterMode] = useState('all'); // 'all', 'tienda', 'servicios'

  // Filter businesses
  const filteredBusinesses = businesses.filter(biz => {
    // Search query
    if (searchQuery.trim()) {
      const q = searchQuery.toLowerCase();
      const matchName = biz.name.toLowerCase().includes(q);
      const matchDesc = biz.description.toLowerCase().includes(q);
      const matchTag = biz.tagline.toLowerCase().includes(q);
      const matchLoc = biz.locationName.toLowerCase().includes(q);
      const matchCat = biz.categoryName.toLowerCase().includes(q);
      if (!matchName && !matchDesc && !matchTag && !matchLoc && !matchCat) return false;
    }

    // Location filter
    if (selectedLocation !== 'all') {
      const loc = locations.find(l => l.slug === selectedLocation);
      if (loc && biz.locationId !== loc.id && biz.locationName.toLowerCase() !== loc.name.toLowerCase()) {
        return false;
      }
    }

    // Category filter
    if (selectedCategory !== 'all') {
      const cat = categories.find(c => c.slug === selectedCategory);
      if (cat && biz.categoryId !== cat.id && biz.categoryName.toLowerCase() !== cat.name.toLowerCase()) {
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
    <div className="flex-1 flex flex-col w-full pb-20 md:pb-12 animate-in fade-in">
      
      {/* Hero Section */}
      <section className="bg-gradient-to-b from-surface-container-low via-surface to-surface pt-4 sm:pt-8 pb-8 px-4 sm:px-6 lg:px-8 border-b border-surface-container-high">
        <div className="max-w-5xl mx-auto space-y-4 sm:space-y-6">
          
          {/* Badge & Regional Tag */}
          <div className="flex flex-wrap items-center gap-2">
            <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-primary-fixed text-on-primary-fixed text-xs font-bold shadow-sm">
              <Sparkles className="w-3.5 h-3.5 text-primary" />
              <span>Valle de Sierras Chicas · Córdoba</span>
            </span>
            <span className="text-xs font-semibold text-on-surface-variant hidden sm:inline">
              +350 Comercios y Prestadores Activos
            </span>
          </div>

          {/* Hero Titles */}
          <div className="space-y-2">
            <h1 className="text-2xl sm:text-4xl lg:text-5xl font-extrabold text-on-surface tracking-tight leading-tight">
              Encontrá lo que <span className="text-primary italic">buscás</span> cerca tuyo.
            </h1>
            <p className="text-xs sm:text-base text-on-surface-variant max-w-2xl leading-relaxed">
              Comercios, gastronomía, cabañas y servicios profesionales en todo el corredor serrano. Comprá directo, rápido y sin intermediarios.
            </p>
          </div>

          {/* Search Bar */}
          <div className="bg-surface-container-lowest p-2 rounded-2xl shadow-subtle border border-surface-container-high flex items-center gap-2">
            <Search className="w-5 h-5 text-outline ml-2 shrink-0" />
            <input
              type="text"
              value={searchQuery}
              onChange={e => setSearchQuery(e.target.value)}
              placeholder="¿Qué estás buscando? (Ej: Café, Electricista, Cabaña, Pizza...)"
              className="w-full bg-transparent text-xs sm:text-sm text-on-surface placeholder:text-outline focus:outline-none py-1.5"
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
              className="bg-primary hover:bg-primary-container text-white px-4 sm:px-6 py-2.5 rounded-xl text-xs sm:text-sm font-bold shrink-0 shadow-sm transition-all"
            >
              Buscar
            </button>
          </div>

          {/* Regional Panorama Banner Spotlight */}
          <div className="relative w-full h-32 sm:h-44 rounded-2xl overflow-hidden shadow-subtle group">
            <img
              src="https://images.unsplash.com/photo-1506744038136-46273834b3fb?w=1200&auto=format&fit=crop&q=80"
              alt="Valle de Sierras Chicas Córdoba"
              className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-inverse-surface/85 via-inverse-surface/30 to-transparent flex items-end p-4 sm:p-5">
              <div className="flex flex-col sm:flex-row sm:items-center justify-between w-full gap-2">
                <div className="flex items-center gap-2 text-white">
                  <MapPin className="w-4 h-4 text-emerald-400 shrink-0" />
                  <span className="font-extrabold text-xs sm:text-sm drop-shadow">
                    Río Ceballos · Unquillo · Mendiolaza · Villa Allende · Salsipuedes
                  </span>
                </div>
                <span className="bg-white/20 backdrop-blur-md text-white px-2.5 py-1 rounded-full text-[11px] font-bold self-start sm:self-auto">
                  Red Comercial Abierta
                </span>
              </div>
            </div>
          </div>

        </div>
      </section>

      {/* Main Content Area */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-6 sm:pt-8 space-y-8 w-full">
        
        {/* Banner Registrá tu Negocio */}
        <section className="relative overflow-hidden rounded-3xl bg-inverse-surface text-white p-5 sm:p-8 shadow-card border border-slate-800">
          <div className="absolute -right-8 -bottom-8 w-48 h-48 rounded-full bg-teal-500/20 blur-3xl pointer-events-none"></div>
          <div className="relative z-10 flex flex-col md:flex-row items-start md:items-center justify-between gap-6">
            <div className="space-y-2 max-w-xl">
              <span className="px-2.5 py-0.5 rounded-full bg-primary text-white text-[11px] font-extrabold uppercase tracking-wider">
                REGISTRO GRATUITO
              </span>
              <h2 className="text-lg sm:text-2xl font-extrabold text-white leading-snug">
                ¿Tenés un negocio o brindás servicios en Sierras Chicas?
              </h2>
              <p className="text-xs sm:text-sm text-slate-300 leading-relaxed">
                Sumá tu comercio a la red del valle, gestioná tu catálogo con góndola de precios rápida y recibí pedidos directos por WhatsApp.
              </p>
            </div>
            <Link
              to="/panel/perfil"
              className="px-5 py-3 rounded-xl bg-surface-container-lowest text-on-surface hover:bg-surface text-xs sm:text-sm font-extrabold shadow-md flex items-center gap-2 transition-all shrink-0 active:scale-95"
            >
              <span>Publicar mi Negocio</span>
              <ArrowRight className="w-4 h-4 text-primary" />
            </Link>
          </div>
        </section>

        {/* Categories Strip (Horizontal Carousel on Mobile, Grid on Desktop) */}
        <section className="space-y-3">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-2">
              <span className="material-symbols-outlined text-primary text-[20px]">category</span>
              <h3 className="text-xs sm:text-sm font-extrabold uppercase tracking-wider text-on-surface">
                Explorar Rubros
              </h3>
            </div>
            {selectedCategory !== 'all' && (
              <button
                type="button"
                onClick={() => setSelectedCategory('all')}
                className="text-xs text-primary font-bold hover:underline"
              >
                Ver todos
              </button>
            )}
          </div>

          <div className="flex items-center gap-2 overflow-x-auto no-scrollbar pb-2 pt-1 -mx-4 px-4 sm:mx-0 sm:px-0">
            <button
              type="button"
              onClick={() => setSelectedCategory('all')}
              className={`shrink-0 flex items-center gap-2 px-4 py-2.5 rounded-2xl text-xs font-bold transition-all shadow-sm ${
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
                onClick={() => setSelectedCategory(cat.slug)}
                className={`shrink-0 flex items-center gap-2 px-4 py-2.5 rounded-2xl text-xs font-bold transition-all shadow-sm ${
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
                Ver todas
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

        {/* Directory Listing Section */}
        <section className="space-y-4">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2">
            <div>
              <h2 className="text-lg sm:text-xl font-extrabold text-on-surface">
                Comercios y Prestadores Destacados
              </h2>
              <p className="text-xs text-on-surface-variant">
                Mostrando {filteredBusinesses.length} resultados disponibles
              </p>
            </div>

            {/* Mode Pills */}
            <div className="flex items-center gap-1 bg-surface-container-low p-1 rounded-xl border border-surface-container-high overflow-x-auto no-scrollbar self-start sm:self-auto">
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
          </div>

          {/* Grid of Businesses (Mobile: 1 col, Tablet: 2 cols, Desktop: 3 cols) */}
          {filteredBusinesses.length === 0 ? (
            <div className="py-16 text-center bg-surface-container-lowest rounded-3xl border border-surface-container-high p-8 space-y-3">
              <Store className="w-12 h-12 text-outline mx-auto stroke-1" />
              <h4 className="font-extrabold text-base text-on-surface">No se encontraron comercios</h4>
              <p className="text-xs text-on-surface-variant max-w-sm mx-auto">
                Probá cambiando los términos de búsqueda o eliminando los filtros de localidad y categoría.
              </p>
              <button
                type="button"
                onClick={() => { setSearchQuery(''); setSelectedCategory('all'); setSelectedLocation('all'); setFilterMode('all'); }}
                className="px-4 py-2 rounded-xl bg-primary text-white text-xs font-bold shadow-sm"
              >
                Restablecer todos los filtros
              </button>
            </div>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
              {filteredBusinesses.map(biz => {
                const isFav = favorites.includes(biz.id);
                const isNotice = biz.businessMode === 'aviso' || biz.businessMode === 'catalogo';
                const isService = biz.businessMode === 'servicios';
                const targetUrl = isNotice ? `/aviso/${biz.slug}` : isService ? `/comercio/${biz.slug}` : `/tienda/${biz.slug}`;

                return (
                  <div
                    key={biz.id}
                    className="group bg-surface-container-lowest rounded-3xl border border-surface-container-high overflow-hidden shadow-subtle hover:shadow-card transition-all duration-300 flex flex-col"
                  >
                    {/* Cover & Badges */}
                    <div className="relative h-44 w-full overflow-hidden bg-slate-100">
                      <img
                        src={biz.coverUrl}
                        alt={biz.name}
                        className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                      />
                      <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent"></div>

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
                        <span>{biz.locationName}</span>
                      </div>
                    </div>

                    {/* Card Body */}
                    <div className="p-4 sm:p-5 flex-1 flex flex-col justify-between space-y-4">
                      <div className="space-y-2">
                        <div className="flex items-center justify-between text-xs">
                          <span className="font-bold text-primary">{biz.categoryName}</span>
                          <div className="flex items-center gap-1 text-amber-500 font-bold">
                            <Star className="w-3.5 h-3.5 fill-amber-500" />
                            <span>{biz.rating}</span>
                            <span className="text-outline font-normal">({biz.reviewCount})</span>
                          </div>
                        </div>

                        <h3 className="font-extrabold text-base sm:text-lg text-on-surface leading-tight group-hover:text-primary transition-colors">
                          {biz.name}
                        </h3>

                        <p className="text-xs text-on-surface-variant line-clamp-2 leading-relaxed">
                          {biz.tagline || biz.description}
                        </p>
                      </div>

                      {/* Footer Actions */}
                      <div className="pt-3 border-t border-surface-container-high flex items-center justify-between gap-2">
                        <div className="flex items-center gap-1 text-[11px] text-on-surface-variant">
                          <Clock className="w-3.5 h-3.5 text-outline" />
                          <span className="truncate max-w-[120px]">{biz.openingHours}</span>
                        </div>

                        <Link
                          to={targetUrl}
                          className="px-3.5 py-2 rounded-xl bg-surface-container-low hover:bg-primary hover:text-white text-on-surface text-xs font-bold flex items-center gap-1 transition-all group-hover:bg-primary group-hover:text-white"
                        >
                          <span>{isNotice ? 'Ver Ficha' : isService ? 'Cotizar' : 'Ver Carta'}</span>
                          <ArrowRight className="w-3.5 h-3.5" />
                        </Link>
                      </div>
                    </div>
                  </div>
                );
              })}
            </div>
          )}
        </section>

      </div>
    </div>
  );
}
