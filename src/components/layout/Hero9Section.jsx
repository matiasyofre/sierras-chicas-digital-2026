import React, { useRef } from 'react';
import { 
  Search, 
  MapPin, 
  Sparkles, 
  X
} from 'lucide-react';

/**
 * Hero9Section - Cinematic Drone Hero with Dynamic Quick Badges & Calibrated Contrast Overlay
 * Features:
 * - Autoplay loop muted drone footage of Sierras Chicas
 * - Soft desaturating / clarifying overlay for eye comfort and maximum sharpness
 * - Dynamic fast-access category capsules (only categories with active merchants)
 * - Live auto-completing search bar & city selector
 */
export default function Hero9Section({
  searchQuery,
  setSearchQuery,
  selectedLocation,
  setSelectedLocation,
  locations = [],
  categories = [],
  businesses = [],
  scrollToDirectory,
  matchingTaxonomy = [],
  isSearchFocused,
  setIsSearchFocused,
  handleSelectTaxonomyItem,
  searchContainerRef,
  onCategoryQuickSelect
}) {
  const videoRef = useRef(null);

  // Compute dynamic fast-access category capsules based on categories with active merchants
  const dynamicQuickBadges = categories
    .filter(cat => {
      if (!businesses || businesses.length === 0) return true;
      return businesses.some(b => b.categoryId === cat.id || b.categoryName === cat.name || b.category === cat.slug);
    })
    .slice(0, 5)
    .map(cat => ({
      label: `${cat.emoji || '✨'} ${cat.name}`,
      cat: cat.slug
    }));

  return (
    <section className="relative min-h-[85vh] lg:min-h-[90vh] flex flex-col justify-center items-center overflow-hidden text-white pt-16 sm:pt-20 pb-24 px-4 sm:px-6 lg:px-8">
      
      {/* ======================================================== */}
      {/* 1. CINEMATIC VIDEO BACKGROUND WITH CLARIFYING OVERLAY     */}
      {/* ======================================================== */}
      <div className="absolute inset-0 z-0 overflow-hidden pointer-events-none select-none">
        {/* Real drone footage of Sierras Chicas - AutoPlay, Loop, Muted, No visible controls */}
        <video
          ref={videoRef}
          autoPlay
          loop
          muted
          playsInline
          preload="auto"
          className="w-full h-full object-cover object-center scale-105 filter contrast-105"
        >
          <source 
            src="/videos/hero-drone-sierras-chicas.mp4" 
            type="video/mp4" 
          />
        </video>

        {/* Softening & clarifying overlay: reduces harsh saturation while preserving 100% sharpness */}
        <div className="absolute inset-0 bg-gradient-to-b from-slate-950/40 via-slate-900/35 to-slate-950/60 backdrop-brightness-95 backdrop-saturate-90"></div>
      </div>

      {/* ======================================================== */}
      {/* 2. HERO CONTENT & HEADLINE                               */}
      {/* ======================================================== */}
      <div className="relative z-20 max-w-4xl mx-auto space-y-7 text-center">
        
        {/* High-Impact Headline with Glassmorphic Card */}
        <div className="space-y-4 bg-slate-950/45 backdrop-blur-md border border-white/15 p-7 sm:p-10 rounded-[2.5rem] shadow-2xl shadow-black/80 max-w-3xl mx-auto">
          <div className="inline-flex items-center gap-2 px-3.5 py-1 rounded-full bg-emerald-500/20 text-emerald-300 text-xs font-black border border-emerald-400/30 uppercase tracking-widest">
            <Sparkles className="w-3.5 h-3.5 text-amber-400" />
            <span>Guía Digital del Corredor</span>
          </div>

          <h1 className="text-3xl sm:text-5xl lg:text-6xl font-black tracking-tight leading-[1.12] text-white drop-shadow-[0_4px_16px_rgba(0,0,0,0.9)]">
            <span>El Portal Digital de</span>
            <br />
            <span className="text-emerald-400">Sierras Chicas</span>
          </h1>

          <p className="text-sm sm:text-base md:text-lg text-white/95 max-w-2xl mx-auto leading-relaxed font-semibold drop-shadow-[0_2px_8px_rgba(0,0,0,0.9)]">
            Conectamos a vecinos y turistas con comercios de cercanía, cabañas, gastronomía y servicios matriculados en todo el corredor de Sierras Chicas.
          </p>
        </div>

        {/* Dual Search Floating Capsule with Shimmer Accent */}
        <div ref={searchContainerRef} className="relative max-w-3xl mx-auto pt-2">
          <div className="bg-white/95 backdrop-blur-2xl rounded-[2.2rem] p-2.5 shadow-2xl shadow-black/80 flex flex-col sm:flex-row items-center gap-2 border border-white/60 ring-4 ring-white/10 transition-all focus-within:ring-amber-400/50">
            
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
                placeholder="¿Qué estás buscando? (Ej: Cabaña con pileta, Electricista, Pizzería...)"
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

            {/* Action Button: Explorar Todo el Directorio */}
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
                        <span className="font-bold text-slate-900 group-hover:text-amber-800">
                          {item.label}
                        </span>
                        {item.parentName && (
                          <span className="text-[10px] text-slate-400 ml-2 font-medium">
                            en {item.parentName}
                          </span>
                        )}
                      </div>
                    </div>
                    <span className="text-[10px] font-bold px-2 py-0.5 rounded-full bg-slate-100 text-slate-500 group-hover:bg-amber-200 group-hover:text-amber-900 uppercase">
                      {item.type}
                    </span>
                  </button>
                ))}
              </div>
            </div>
          )}
        </div>

        {/* Dynamic Fast-Access Category Badges */}
        {dynamicQuickBadges.length > 0 && (
          <div className="flex flex-wrap items-center justify-center gap-2 pt-2">
            <span className="text-xs text-slate-300 font-semibold flex items-center gap-1 mr-1">
              <Sparkles className="w-3.5 h-3.5 text-amber-400" />
              Rubros Activos:
            </span>
            {dynamicQuickBadges.map((badge, idx) => (
              <button
                key={idx}
                type="button"
                onClick={() => onCategoryQuickSelect?.(badge.cat)}
                className="text-xs font-semibold px-3.5 py-1.5 rounded-full bg-white/10 hover:bg-white/20 border border-white/15 text-slate-200 hover:text-white backdrop-blur-md transition-all active:scale-95"
              >
                {badge.label}
              </button>
            ))}
          </div>
        )}

      </div>

    </section>
  );
}
