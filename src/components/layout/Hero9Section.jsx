import React, { useState, useRef } from 'react';
import { 
  Search, 
  MapPin, 
  Sparkles, 
  X, 
  Play, 
  Pause, 
  Volume2, 
  VolumeX 
} from 'lucide-react';
import BlurTextReveal from '../common/BlurTextReveal';

/**
 * Hero9Section - React Bits Pro "Hero 9" Block
 * Adapted for Sierras Chicas Digital (Córdoba, Argentina)
 * Features:
 * - Full-screen cinematic video background of Sierras Chicas mountains & nature
 * - Staggered Blur Text Reveal animation
 * - Integrated Live Regional Search & City Selector
 * - Glassmorphic floating badges & micro-interactions
 */
export default function Hero9Section({
  searchQuery,
  setSearchQuery,
  selectedLocation,
  setSelectedLocation,
  locations = [],
  scrollToDirectory,
  matchingTaxonomy = [],
  isSearchFocused,
  setIsSearchFocused,
  handleSelectTaxonomyItem,
  searchContainerRef,
  onCategoryQuickSelect
}) {
  const [isPlaying, setIsPlaying] = useState(true);
  const [isMuted, setIsMuted] = useState(true);
  const [videoLoaded, setVideoLoaded] = useState(false);
  const videoRef = useRef(null);

  const togglePlay = () => {
    if (videoRef.current) {
      if (isPlaying) {
        videoRef.current.pause();
      } else {
        videoRef.current.play();
      }
      setIsPlaying(!isPlaying);
    }
  };

  const toggleMute = () => {
    if (videoRef.current) {
      videoRef.current.muted = !isMuted;
      setIsMuted(!isMuted);
    }
  };

  const quickBadges = [
    { label: '🏡 Cabañas & Turismo', cat: 'turismo-alojamiento' },
    { label: '🍕 Gastronomía Serrana', cat: 'gastronomia' },
    { label: '⚡ Electricistas & Gasistas', cat: 'construccion-hogar' },
    { label: '🐾 Veterinarias & Salud', cat: 'salud-bienestar' },
  ];

  return (
    <section className="relative min-h-[85vh] lg:min-h-[90vh] flex flex-col justify-center items-center overflow-hidden text-white pt-16 sm:pt-20 pb-24 px-4 sm:px-6 lg:px-8">
      
      {/* ======================================================== */}
      {/* 1. FULL-SCREEN VIDEO / CINEMATIC BACKGROUND (HERO 9)     */}
      {/* ======================================================== */}
      <div className="absolute inset-0 z-0 overflow-hidden">
        {/* Background Video Layer - 100% Brightness & Visible */}
        <video
          ref={videoRef}
          autoPlay
          loop
          muted
          playsInline
          preload="auto"
          className="w-full h-full object-cover object-center"
        >
          {/* Real drone footage of Sierras Chicas */}
          <source 
            src="/videos/hero-drone-sierras-chicas.mp4" 
            type="video/mp4" 
          />
        </video>

        {/* Video Controls Toggle (Bottom Right Corner) */}
        <div className="absolute bottom-4 right-4 z-30 flex items-center gap-2 bg-black/60 backdrop-blur-md px-3 py-1.5 rounded-full border border-white/20 text-slate-200 text-xs shadow-xl">
          <button
            type="button"
            onClick={togglePlay}
            className="hover:text-white transition-colors p-1"
            title={isPlaying ? 'Pausar video' : 'Reproducir video'}
          >
            {isPlaying ? <Pause className="w-3.5 h-3.5" /> : <Play className="w-3.5 h-3.5" />}
          </button>
          <div className="w-px h-3 bg-white/20" />
          <button
            type="button"
            onClick={toggleMute}
            className="hover:text-white transition-colors p-1"
            title={isMuted ? 'Activar sonido' : 'Silenciar'}
          >
            {isMuted ? <VolumeX className="w-3.5 h-3.5" /> : <Volume2 className="w-3.5 h-3.5" />}
          </button>
        </div>
      </div>

      {/* ======================================================== */}
      {/* 2. HERO CONTENT & BLUR TEXT REVEAL                       */}
      {/* ======================================================== */}
      <div className="relative z-20 max-w-4xl mx-auto space-y-7 text-center">
        
        {/* High-Impact Headline with Soft Diffuse Glassmorphic Card */}
        <div className="space-y-4 bg-slate-950/40 backdrop-blur-xl border border-white/10 p-6 sm:p-10 rounded-[2.5rem] shadow-[0_0_40px_rgba(0,0,0,0.6)] shadow-black/70 max-w-3xl mx-auto">
          <h1 className="text-3xl sm:text-5xl lg:text-6xl font-black tracking-tight leading-[1.15] text-white">
            <BlurTextReveal 
              text="Descubrí el latido de"
              delay={60}
              initialDelay={100}
              className="text-white drop-shadow-md"
            />
            <br />
            <BlurTextReveal 
              text="Sierras Chicas Digital"
              delay={80}
              initialDelay={350}
              wordClassName="text-emerald-400 drop-shadow-lg"
            />
          </h1>

          <p className="text-sm sm:text-base md:text-lg text-slate-100 max-w-2xl mx-auto leading-relaxed font-medium drop-shadow">
            Conectamos a vecinos y turistas con comercios de cercanía, cabañas, gastronomía y servicios matriculados en todo el corredor serrano.
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

        {/* Quick Access Badges for Instant Exploration */}
        <div className="flex flex-wrap items-center justify-center gap-2 pt-2">
          <span className="text-xs text-slate-300 font-semibold flex items-center gap-1 mr-1">
            <Sparkles className="w-3.5 h-3.5 text-amber-400" />
            Acceso Rápido:
          </span>
          {quickBadges.map((badge, idx) => (
            <button
              key={idx}
              type="button"
              onClick={() => onCategoryQuickSelect?.(badge.cat)}
              className="text-xs font-semibold px-3 py-1.5 rounded-full bg-white/10 hover:bg-white/20 border border-white/15 text-slate-200 hover:text-white backdrop-blur-md transition-all active:scale-95"
            >
              {badge.label}
            </button>
          ))}
        </div>

      </div>

    </section>
  );
}
