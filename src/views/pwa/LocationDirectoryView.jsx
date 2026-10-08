import React, { useState, useMemo } from 'react';
import { useParams, Link } from 'react-router-dom';
import { useApp } from '../../context/AppContext';
import { 
  MapPin, 
  Search, 
  Store, 
  ShoppingBag, 
  Sparkles, 
  Star, 
  ArrowRight, 
  LayoutGrid, 
  List, 
  CheckCircle2, 
  Compass, 
  Tag, 
  ExternalLink,
  ChevronRight,
  Phone,
  MessageCircle
} from 'lucide-react';

export default function LocationDirectoryView() {
  const { slug } = useParams();
  const { locations, businesses, categories, favorites, toggleFavorite, settings } = useApp();

  const [searchTerm, setSearchTerm] = useState('');
  const [selectedCat, setSelectedCat] = useState('all');
  const [filterMode, setFilterMode] = useState('all');
  const [viewMode, setViewMode] = useState('grid');

  // Find location object
  const locationObj = locations.find(l => l.slug === slug) || {
    id: 'unknown',
    name: slug ? slug.charAt(0).toUpperCase() + slug.slice(1).replace('-', ' ') : 'Localidad',
    slug: slug || 'general'
  };

  // Filter businesses strictly for this location
  const locationBusinesses = useMemo(() => {
    return businesses.filter(b => {
      const matchLocId = b.locationId === locationObj.id || b.locationId === slug;
      const matchLocName = (b.locationName || b.location)?.toLowerCase() === locationObj.name.toLowerCase();
      return matchLocId || matchLocName;
    });
  }, [businesses, locationObj, slug]);

  // Filter with local search & category filters
  const filteredBusinesses = useMemo(() => {
    return locationBusinesses.filter(biz => {
      if (searchTerm.trim()) {
        const q = searchTerm.toLowerCase();
        const matchName = biz.name?.toLowerCase().includes(q);
        const matchDesc = biz.description?.toLowerCase().includes(q);
        const matchCat = (biz.categoryName || biz.category)?.toLowerCase().includes(q);
        const matchSub = (biz.subcategory || '')?.toLowerCase().includes(q);
        if (!matchName && !matchDesc && !matchCat && !matchSub) return false;
      }

      if (selectedCat !== 'all') {
        const catObj = categories.find(c => c.slug === selectedCat);
        if (biz.categoryId !== selectedCat && (biz.categoryName || biz.category)?.toLowerCase() !== catObj?.name.toLowerCase()) {
          return false;
        }
      }

      if (filterMode !== 'all') {
        if (biz.businessMode !== filterMode) return false;
      }

      return true;
    });
  }, [locationBusinesses, searchTerm, selectedCat, filterMode, categories]);

  const whatsappPhone = settings?.contactWhatsapp || '5493543000000';
  const sponsorAdUrl = `https://wa.me/${whatsappPhone.replace(/[^0-9]/g, '')}?text=${encodeURIComponent(`Hola, quiero consultar para pautar en el espacio publicitario exclusivo de ${locationObj.name} en Sierras Chicas Digital.`)}`;

  return (
    <main className="min-h-screen bg-surface py-6 sm:py-10">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-7">
        
        {/* Breadcrumb */}
        <div className="flex items-center gap-2 text-xs font-bold text-slate-500">
          <Link to="/" className="hover:text-emerald-700">Inicio</Link>
          <ChevronRight className="w-3.5 h-3.5" />
          <Link to="/explorar" className="hover:text-emerald-700">Localidades</Link>
          <ChevronRight className="w-3.5 h-3.5" />
          <span className="text-slate-900 font-extrabold">{locationObj.name}</span>
        </div>

        {/* Locality Hero Header */}
        <div className="bg-gradient-to-br from-slate-900 via-[#0e172a] to-slate-950 rounded-[2.5rem] p-6 sm:p-10 text-white shadow-xl relative overflow-hidden border border-slate-800">
          <div className="absolute inset-0 bg-[radial-gradient(#38bdf8_1px,transparent_1px)] [background-size:24px_24px] opacity-10 pointer-events-none"></div>

          <div className="relative z-10 flex flex-col md:flex-row items-start md:items-center justify-between gap-6">
            <div className="space-y-3 max-w-2xl">
              <div className="inline-flex items-center gap-2 px-3.5 py-1 rounded-full bg-emerald-500/20 text-emerald-300 text-xs font-black border border-emerald-400/30">
                <MapPin className="w-3.5 h-3.5 text-emerald-400" />
                <span>GUÍA & COMERCIO LOCAL</span>
              </div>
              <h1 className="text-3xl sm:text-5xl font-black tracking-tight text-white">
                {locationObj.name}
              </h1>
              <p className="text-xs sm:text-sm text-slate-300 font-medium leading-relaxed">
                Descubrí todos los comercios, prestadores de servicios, cabañas y propuestas gastronómicas de {locationObj.name}.
              </p>
            </div>

            <div className="flex items-center gap-3 bg-white/10 backdrop-blur-md px-5 py-3.5 rounded-2xl border border-white/10 shrink-0">
              <div className="text-center">
                <span className="text-2xl font-black text-amber-400 block">{locationBusinesses.length}</span>
                <span className="text-[10px] text-slate-300 uppercase font-black">Comercios Activos</span>
              </div>
            </div>
          </div>
        </div>

        {/* Dedicated Local Advertising Banner (Monetizable Space) */}
        <section className="relative rounded-3xl overflow-hidden bg-gradient-to-r from-amber-600 via-amber-500 to-amber-600 p-6 sm:p-8 text-slate-950 shadow-xl border border-amber-300">
          <div className="flex flex-col md:flex-row items-center justify-between gap-6 relative z-10">
            <div className="space-y-2 text-center md:text-left">
              <span className="text-[10px] font-black uppercase tracking-widest bg-slate-950 text-amber-300 px-3 py-1 rounded-full">
                ⭐ ESPACIO PUBLICITARIO EXCLUSIVO · {locationObj.name.toUpperCase()}
              </span>
              <h2 className="text-xl sm:text-2xl font-black text-slate-950">
                ¿Tenés un comercio o servicio en {locationObj.name}?
              </h2>
              <p className="text-xs sm:text-sm text-slate-900 font-bold max-w-xl">
                Destacá tu marca en la portada de {locationObj.name} y llegá a miles de vecinos y turistas de la zona.
              </p>
            </div>

            <div className="flex items-center gap-3 shrink-0">
              <a
                href={sponsorAdUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="px-6 py-3.5 rounded-2xl bg-slate-950 hover:bg-slate-900 text-amber-300 font-black text-xs sm:text-sm shadow-xl flex items-center gap-2 transition-all transform hover:scale-105 active:scale-95"
              >
                <MessageCircle className="w-4 h-4" />
                <span>Pautar este Espacio</span>
              </a>
            </div>
          </div>
        </section>

        {/* Local Search & Filtering Controls */}
        <div className="bg-white rounded-3xl p-4 sm:p-6 shadow-sm border border-slate-200 space-y-4">
          <div className="flex flex-col sm:flex-row items-center gap-3">
            <div className="flex items-center gap-3 w-full bg-slate-50 border border-slate-200 rounded-2xl px-4 py-2.5 focus-within:border-emerald-500 focus-within:bg-white transition-all">
              <Search className="w-4 h-4 text-slate-400 shrink-0" />
              <input
                type="text"
                value={searchTerm}
                onChange={e => setSearchTerm(e.target.value)}
                placeholder={`Buscar en ${locationObj.name}...`}
                className="w-full bg-transparent text-xs sm:text-sm text-slate-900 font-bold focus:outline-none"
              />
            </div>

            <div className="w-full sm:w-60 shrink-0">
              <select
                value={selectedCat}
                onChange={e => setSelectedCat(e.target.value)}
                className="w-full bg-slate-50 border border-slate-200 rounded-2xl px-3 py-2.5 text-xs sm:text-sm font-bold text-slate-800 focus:outline-none cursor-pointer"
              >
                <option value="all">📁 Todos los Rubros</option>
                {categories.map(cat => (
                  <option key={cat.id} value={cat.slug}>{cat.emoji} {cat.name}</option>
                ))}
              </select>
            </div>
          </div>

          {/* Mode Tabs */}
          <div className="flex items-center justify-between gap-3 pt-2 border-t border-slate-100">
            <div className="flex items-center gap-1.5 overflow-x-auto no-scrollbar">
              <button
                type="button"
                onClick={() => setFilterMode('all')}
                className={`px-3 py-1.5 rounded-xl text-xs font-bold transition-all ${
                  filterMode === 'all' ? 'bg-slate-900 text-white' : 'bg-slate-100 text-slate-600 hover:text-slate-900'
                }`}
              >
                Todos ({locationBusinesses.length})
              </button>
              <button
                type="button"
                onClick={() => setFilterMode('tienda')}
                className={`px-3 py-1.5 rounded-xl text-xs font-bold transition-all ${
                  filterMode === 'tienda' ? 'bg-amber-500 text-slate-950 font-black' : 'bg-slate-100 text-slate-600 hover:text-slate-900'
                }`}
              >
                🛍️ Tiendas
              </button>
              <button
                type="button"
                onClick={() => setFilterMode('servicios')}
                className={`px-3 py-1.5 rounded-xl text-xs font-bold transition-all ${
                  filterMode === 'servicios' ? 'bg-amber-500 text-slate-950 font-black' : 'bg-slate-100 text-slate-600 hover:text-slate-900'
                }`}
              >
                🔧 Servicios
              </button>
              <button
                type="button"
                onClick={() => setFilterMode('aviso')}
                className={`px-3 py-1.5 rounded-xl text-xs font-bold transition-all ${
                  filterMode === 'aviso' ? 'bg-amber-500 text-slate-950 font-black' : 'bg-slate-100 text-slate-600 hover:text-slate-900'
                }`}
              >
                📢 Avisos
              </button>
            </div>

            <div className="flex items-center gap-1 bg-slate-100 p-1 rounded-xl">
              <button
                type="button"
                onClick={() => setViewMode('grid')}
                className={`p-1.5 rounded-lg ${viewMode === 'grid' ? 'bg-white shadow-xs text-slate-900' : 'text-slate-400'}`}
              >
                <LayoutGrid className="w-3.5 h-3.5" />
              </button>
              <button
                type="button"
                onClick={() => setViewMode('list')}
                className={`p-1.5 rounded-lg ${viewMode === 'list' ? 'bg-white shadow-xs text-slate-900' : 'text-slate-400'}`}
              >
                <List className="w-3.5 h-3.5" />
              </button>
            </div>
          </div>
        </div>

        {/* Businesses Grid */}
        {filteredBusinesses.length === 0 ? (
          <div className="py-16 text-center bg-white rounded-3xl p-8 space-y-3 border border-slate-200">
            <Store className="w-12 h-12 text-slate-300 mx-auto" />
            <h3 className="font-extrabold text-base text-slate-900">No hay comercios registrados con ese criterio en {locationObj.name}</h3>
            <p className="text-xs text-slate-500 max-w-sm mx-auto font-medium">
              Podés registrar tu comercio para ser el primero en aparecer en esta localidad.
            </p>
            <Link
              to="/login"
              className="inline-block px-5 py-2.5 rounded-xl bg-slate-900 text-white text-xs font-bold hover:bg-slate-800"
            >
              Publicar mi Comercio en {locationObj.name}
            </Link>
          </div>
        ) : (
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
                  </div>

                  <div className="p-4 sm:p-5 flex-1 flex flex-col justify-between space-y-3">
                    <div className="space-y-1">
                      <div className="flex items-center justify-between">
                        <span className="text-[10px] font-black uppercase tracking-wider text-emerald-800 bg-emerald-50 px-2 py-0.5 rounded-md">
                          {biz.categoryName || biz.category}
                        </span>
                        {biz.isVerified && (
                          <span className="text-[10px] font-bold text-teal-700 flex items-center gap-0.5">
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

                    <div className="pt-2 border-t border-slate-100">
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
        )}

      </div>
    </main>
  );
}
