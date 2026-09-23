import React, { useState, useRef } from 'react';
import { 
  Search, 
  MapPin, 
  Sparkles, 
  ShieldCheck, 
  MessageCircle, 
  Star, 
  X, 
  Play, 
  Pause, 
  Volume2, 
  VolumeX, 
  Compass,
  ArrowRight,
  TrendingUp
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
    <section className="relative min-h-[85vh] lg:min-h-[90vh] flex flex-col justify-center items-center overflow-hidden bg-slate-950 text-white pt-16 sm:pt-20 pb-24 px-4 sm:px-6 lg:px-8">
      
      {/* ======================================================== */}
      {/* 1. FULL-SCREEN VIDEO / CINEMATIC BACKGROUND (HERO 9)     */}
      {/* ======================================================== */}
      <div className="absolute inset-0 z-0 overflow-hidden">
        {/* Background Video */}
        <video
          ref={videoRef}
          autoPlay
          loop
          muted
          playsInline
          onLoadedData={() => setVideoLoaded(true)}
          poster="https://images.unsplash.com/photo-1506744038136-46273834b3fb?q=80&w=2070&auto=format&fit=crop"
          className={`w-full h-full object-cover object-center transition-opacity duration-1000 scale-105 ${
            videoLoaded ? 'opacity-40' : 'opacity-25'
          }`}
        >
          {/* Scenic aerial mountain landscape (Sierras Chicas mood) */}
          <source 
            src="https://assets.mixkit.co/videos/preview/mixkit-drone-flying-over-a-green-mountain-forest-42360-large.mp4" 
            type="video/mp4" 
          />
          <source 
            src="https://assets.mixkit.co/videos/preview/mixkit-aerial-view-of-green-mountain-slopes-42358-large.mp4" 
            type="video/mp4" 
          />
        </video>

        {/* Multi-tier Gradient & Glass Overlays for High Contrast Readability */}
        <div className="absolute inset-0 bg-gradient-to-t from-slate-950 via-slate-950/70 to-slate-950/40 pointer-events-none" />
        <div className="absolute inset-0 bg-gradient-to-r from-slate-950/90 via-slate-950/40 to-slate-950/90 pointer-events-none" />
        
        {/* Ambient Glow Orbs */}
        <div className="absolute -top-24 left-1/2 -translate-x-1/2 w-[48rem] h-[48rem] rounded-full bg-emerald-500/10 blur-[160px] pointer-events-none hf-glow-pulse" />
        <div className="absolute top-1/3 -right-20 w-[32rem] h-[32rem] rounded-full bg-amber-500/15 blur-[140px] pointer-events-none" />
        <div className="absolute bottom-10 -left-20 w-96 h-96 rounded-full bg-teal-500/15 blur-[120px] pointer-events-none" />

        {/* Subtle Mountain Topography SVG */}
        <svg 
          className="absolute bottom-0 left-0 right-0 w-full h-28 sm:h-44 opacity-25 text-emerald-500 pointer-events-none" 
          viewBox="0 0 1440 320" 
          fill="none" 
          xmlns="http://www.w3.org/2000/svg"
        >
          <path 
            fill="currentColor" 
            d="M0,224L48,208C96,192,192,160,288,165.3C384,171,480,213,576,218.7C672,224,768,192,864,165.3C960,139,1056,117,1152,122.7C1248,128,1344,160,1392,176L1440,192L1440,320L1392,320C1344,320,1248,320,1152,320C1056,320,960,320,864,320C768,320,672,320,576,320C480,320,384,320,288,320C192,320,96,320,48,320L0,320Z"
          />
        </svg>

        {/* Video Controls Toggle (Bottom Right Corner) */}
        <div className="absolute bottom-4 right-4 z-30 flex items-center gap-2 bg-black/40 backdrop-blur-md px-3 py-1.5 rounded-full border border-white/10 text-slate-300 text-xs shadow-lg">
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
      {/* 2. FLOATING KINETIC BADGES (HERO 9 ACCENTS)              */}
      {/* ======================================================== */}
      <div className="hidden xl:block absolute inset-0 pointer-events-none max-w-7xl mx-auto z-10">
        
        {/* Floating Badge 1: Direct WhatsApp Chat */}
        <div className="absolute top-28 left-8 hf-float-slow bg-slate-900/80 backdrop-blur-xl border border-white/15 p-4 rounded-3xl shadow-2xl max-w-xs text-left">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-2xl bg-emerald-500 text-white flex items-center justify-center shadow-lg shadow-emerald-500/30 shrink-0">
              <MessageCircle className="w-5 h-5" />
            </div>
            <div>
              <div className="flex items-center gap-1.5 text-xs font-black text-white">
                <span>Trato Directo 1 a 1</span>
                <span className="w-2 h-2 rounded-full bg-emerald-400 animate-ping"></span>
              </div>
              <p className="text-[11px] text-slate-300 font-medium">WhatsApp directo al comercio o profesional</p>
            </div>
          </div>
        </div>

        {/* Floating Badge 2: Verified Local Providers */}
        <div className="absolute top-40 right-10 hf-float-reverse bg-slate-900/80 backdrop-blur-xl border border-white/15 p-4 rounded-3xl shadow-2xl max-w-xs text-left">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-2xl bg-amber-500 text-slate-950 flex items-center justify-center shadow-lg shadow-amber-500/30 shrink-0">
              <ShieldCheck className="w-5 h-5" />
            </div>
            <div>
              <div className="text-xs font-black text-white">Prestadores Verificados</div>
              <div className="flex items-center gap-1 text-[11px] text-amber-300 font-bold">
                <Star className="w-3.5 h-3.5 fill-amber-300" />
                <span>4.9 / 5.0 en el corredor serrano</span>
              </div>
            </div>
          </div>
        </div>

      </div>

      {/* ======================================================== */}
      {/* 3. HERO CONTENT & BLUR TEXT REVEAL                       */}
      {/* ======================================================== */}
      <div className="relative z-20 max-w-4xl mx-auto space-y-7 text-center">
        
        {/* Live Regional Beacon Pill */}
        <div className="inline-flex items-center gap-2.5 px-5 py-2 rounded-full bg-white/10 hover:bg-white/15 text-emerald-300 border border-emerald-500/30 text-xs font-black backdrop-blur-md transition-all shadow-inner hf-badge-glow">
          <span className="flex h-2.5 w-2.5 relative">
            <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75"></span>
            <span className="relative inline-flex rounded-full h-2.5 w-2.5 bg-emerald-500"></span>
          </span>
          <span className="tracking-wider uppercase">🌿 PORTAL & GUÍA REGIONAL DE SIERRAS CHICAS 2026</span>
        </div>

        {/* High-Impact Headline with React Bits Blur Text Reveal */}
        <div className="space-y-4">
          <h1 className="text-3xl sm:text-5xl lg:text-6xl font-black tracking-tight leading-[1.12] text-white">
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
              wordClassName="text-transparent bg-clip-text bg-gradient-to-r from-emerald-300 via-amber-300 to-amber-400 drop-shadow-lg"
            />
          </h1>

          <p className="text-sm sm:text-base md:text-lg text-slate-200 max-w-2xl mx-auto leading-relaxed font-medium drop-shadow">
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
