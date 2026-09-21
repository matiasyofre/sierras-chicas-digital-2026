import React, { useState } from 'react';
import { useParams, Link } from 'react-router-dom';
import { useApp } from '../../context/AppContext';
import { 
  ArrowLeft, 
  Share2, 
  Heart, 
  MapPin, 
  Phone, 
  Clock, 
  CheckCircle2, 
  Star, 
  MessageCircle, 
  ShieldCheck, 
  CreditCard, 
  Building2, 
  Camera, 
  Eye, 
  Sparkles,
  Layers,
  ChevronRight,
  Info,
  Check,
  Send,
  Navigation,
  Compass,
  Zap,
  Tag as TagIcon
} from 'lucide-react';

export default function NoticeBusinessView() {
  const { slug } = useParams();
  const { businesses, toggleFavorite, favorites, recordVisit } = useApp();

  const business = businesses.find(b => b.slug === slug) || businesses[0];
  const isFav = favorites.includes(business.id);

  const [activeTab, setActiveTab] = useState('info'); // 'info' | 'catalog'
  const [copied, setCopied] = useState(false);
  const [activePhotoIdx, setActivePhotoIdx] = useState(0);

  // Gallery array
  const galleryPhotos = business.gallery && business.gallery.length > 0 
    ? business.gallery 
    : [
        business.coverUrl || 'https://images.unsplash.com/photo-1581092160607-ee22621dd758?w=1200&auto=format&fit=crop&q=80',
        business.logoUrl || 'https://images.unsplash.com/photo-1554118811-1e0d58224f24?w=800&auto=format&fit=crop&q=80',
        'https://images.unsplash.com/photo-1517248135467-4c7edcad34c4?w=800&auto=format&fit=crop&q=80',
        'https://images.unsplash.com/photo-1555396273-367ea4eb4db5?w=800&auto=format&fit=crop&q=80'
      ];

  // WhatsApp click handler
  const handleWhatsApp = (customMsg) => {
    recordVisit(business.id);
    const text = customMsg || `Hola *${business.name}*, vi tu aviso en el directorio de *Sierras Chicas Digital* y me gustaría hacerte una consulta.`;
    const cleanPhone = (business.whatsapp || business.phone || '5493543123456').replace(/[^0-9]/g, '');
    window.open(`https://wa.me/${cleanPhone}?text=${encodeURIComponent(text)}`, '_blank');
  };

  const handleShare = () => {
    if (navigator.share) {
      navigator.share({
        title: `${business.name} - Sierras Chicas Digital`,
        text: `Mirá la ficha y contacto de ${business.name} en Sierras Chicas:`,
        url: window.location.href
      }).catch(() => {});
    } else {
      navigator.clipboard.writeText(window.location.href);
      setCopied(true);
      setTimeout(() => setCopied(false), 2500);
    }
  };

  const sampleServices = [
    {
      id: 'srv-1',
      title: 'Consultoría y Asesoramiento en el Valle',
      desc: 'Diagnóstico en el lugar, relevamiento y presupuesto directo sin compromiso.',
      price: 'A convenir',
      badge: 'Más solicitado'
    },
    {
      id: 'srv-2',
      title: 'Atención Estándar & Mantenimiento',
      desc: 'Servicio personalizado para particulares, comercios y cabañas del corredor.',
      price: 'Tarifa preferencial',
      badge: 'Recomendado'
    },
    {
      id: 'srv-3',
      title: 'Guardia & Urgencias',
      desc: 'Cobertura rápida en Río Ceballos, Unquillo, Salsipuedes, Mendiolaza y Villa Allende.',
      price: 'Consultar',
      badge: '24hs'
    }
  ];

  return (
    <div className="flex-1 bg-gradient-to-b from-[#f1f5f9] via-[#f8fafc] to-[#f1f5f9] pb-32 md:pb-20 animate-in fade-in min-h-screen text-slate-900">
      
      {/* Floating Top Navigation Header */}
      <div className="sticky top-0 z-30 bg-white/80 backdrop-blur-xl shadow-xs">
        <div className="max-w-5xl mx-auto px-4 py-3 flex items-center justify-between">
          <Link
            to="/"
            className="inline-flex items-center gap-2 px-3.5 py-2 rounded-full bg-slate-100 hover:bg-slate-200 text-xs font-black text-slate-800 transition-all active:scale-95"
          >
            <ArrowLeft className="w-4 h-4 text-slate-700" />
            <span>Volver al Directorio</span>
          </Link>
          
          <div className="flex items-center gap-2">
            <button
              type="button"
              onClick={handleShare}
              className="p-2.5 rounded-full bg-slate-100 hover:bg-slate-200 text-slate-700 transition-transform active:scale-95 relative"
              title="Compartir Ficha"
            >
              {copied ? <Check className="w-4 h-4 text-emerald-600" /> : <Share2 className="w-4 h-4" />}
            </button>
            <button
              type="button"
              onClick={() => toggleFavorite(business.id)}
              className={`p-2.5 rounded-full transition-transform active:scale-95 ${
                isFav 
                  ? 'bg-rose-500 text-white shadow-md shadow-rose-500/30' 
                  : 'bg-slate-100 hover:bg-slate-200 text-slate-700'
              }`}
              title="Guardar en Favoritos"
            >
              <Heart className={`w-4 h-4 ${isFav ? 'fill-white' : ''}`} />
            </button>
          </div>
        </div>
      </div>

      <div className="max-w-5xl mx-auto px-4 sm:px-6 pt-4 space-y-6">
        
        {/* ======================================================== */}
        {/* CINEMATIC PANORAMIC SHOWCASE (Border-free, deep ambient shadows) */}
        {/* ======================================================== */}
        <div className="relative rounded-[2.5rem] overflow-hidden bg-slate-950 shadow-2xl shadow-slate-950/20 group">
          
          {/* Main Active Visual Container */}
          <div className="relative h-64 sm:h-96 w-full overflow-hidden">
            <img 
              src={galleryPhotos[activePhotoIdx]} 
              alt={business.name}
              className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700"
            />
            {/* Ambient vignette gradient */}
            <div className="absolute inset-0 bg-gradient-to-t from-slate-950 via-slate-950/30 to-transparent"></div>
            
            {/* Top Floating Badges */}
            <div className="absolute top-4 left-4 right-4 flex items-center justify-between">
              <div className="flex items-center gap-2">
                <span className="px-3.5 py-1.5 rounded-full bg-slate-900/80 backdrop-blur-md text-amber-400 text-xs font-black tracking-wider uppercase shadow-lg">
                  📢 Aviso Destacado
                </span>
                {business.isVerified && (
                  <span className="inline-flex items-center gap-1 px-3 py-1.5 rounded-full bg-emerald-500 text-slate-950 text-xs font-black shadow-lg">
                    <CheckCircle2 className="w-3.5 h-3.5" />
                    <span>Verificado</span>
                  </span>
                )}
              </div>

              {/* Photo indicator */}
              <span className="px-3 py-1.5 rounded-full bg-black/60 backdrop-blur-md text-white text-xs font-bold font-mono">
                {activePhotoIdx + 1} / {galleryPhotos.length}
              </span>
            </div>

            {/* Bottom Overlay Info on Cover */}
            <div className="absolute bottom-6 left-6 right-6 text-white space-y-2">
              <div className="flex items-center gap-2 text-xs font-semibold text-teal-300">
                <MapPin className="w-4 h-4 text-emerald-400 shrink-0" />
                <span>{business.locationName || business.location} · Sierras Chicas</span>
              </div>
              <h1 className="text-2xl sm:text-4xl font-black tracking-tight text-white drop-shadow-md">
                {business.name}
              </h1>
              <p className="text-xs sm:text-sm text-slate-200 max-w-2xl line-clamp-2 leading-relaxed opacity-90">
                {business.tagline || business.description}
              </p>
            </div>
          </div>

          {/* Interactive Photo Thumbnail Selector Bar (Border-free) */}
          <div className="bg-slate-900/90 backdrop-blur-md p-3 flex items-center gap-2.5 overflow-x-auto no-scrollbar">
            {galleryPhotos.map((imgUrl, idx) => (
              <button
                key={idx}
                type="button"
                onClick={() => setActivePhotoIdx(idx)}
                className={`relative w-16 h-12 sm:w-20 sm:h-14 rounded-xl overflow-hidden shrink-0 transition-all ${
                  activePhotoIdx === idx 
                    ? 'ring-2 ring-amber-400 scale-105 opacity-100 shadow-md' 
                    : 'opacity-50 hover:opacity-80'
                }`}
              >
                <img src={imgUrl} alt={`Foto ${idx + 1}`} className="w-full h-full object-cover" />
              </button>
            ))}
          </div>

        </div>

        {/* ======================================================== */}
        {/* KEY HIGHLIGHTS STRIP (Floating Pill Chips) */}
        {/* ======================================================== */}
        <div className="flex items-center gap-2 overflow-x-auto no-scrollbar py-1">
          <div className="shrink-0 flex items-center gap-1.5 px-4 py-2 rounded-2xl bg-amber-500 text-slate-950 font-black text-xs shadow-sm">
            <Building2 className="w-4 h-4" />
            <span>{business.categoryName || 'Comercio'}</span>
          </div>

          <div className="shrink-0 flex items-center gap-1.5 px-4 py-2 rounded-2xl bg-white text-slate-700 font-bold text-xs shadow-sm">
            <Eye className="w-4 h-4 text-teal-600" />
            <span>{business.visitsCount || 195} Vistas en el Valle</span>
          </div>

          <div className="shrink-0 flex items-center gap-1 px-4 py-2 rounded-2xl bg-white text-slate-800 font-black text-xs shadow-sm">
            <Star className="w-4 h-4 text-amber-500 fill-amber-500" />
            <span>{business.rating || '5.0'}</span>
            <span className="text-slate-400 font-normal">({business.reviewCount || 14} reseñas)</span>
          </div>

          <div className="shrink-0 flex items-center gap-1.5 px-4 py-2 rounded-2xl bg-white text-slate-700 font-bold text-xs shadow-sm">
            <Clock className="w-4 h-4 text-slate-400" />
            <span>{business.openingHours || 'Abierto hoy'}</span>
          </div>
        </div>

        {/* ======================================================== */}
        {/* RICH TAGS & BADGES (Pet Friendly, WiFi 5G, Masa Madre, etc.) */}
        {/* ======================================================== */}
        {business.tags && business.tags.length > 0 && (
          <div className="bg-white p-4 sm:p-5 rounded-3xl shadow-sm space-y-2">
            <div className="flex items-center gap-1.5 text-xs font-black text-slate-400 uppercase tracking-wider">
              <TagIcon className="w-3.5 h-3.5 text-amber-500" />
              <span>Insignias & Características del Establecimiento:</span>
            </div>
            <div className="flex flex-wrap gap-2">
              {business.tags.map((tg, idx) => (
                <span
                  key={idx}
                  className="px-3.5 py-1.5 rounded-full bg-slate-100 hover:bg-amber-100 text-slate-800 text-xs font-black transition-colors"
                >
                  ✨ {tg}
                </span>
              ))}
            </div>
          </div>
        )}

        {/* ======================================================== */}
        {/* MAIN PROFILE BODY (Seamless Editorial Layout) */}
        {/* ======================================================== */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
          
          {/* Left Column: Direct WhatsApp Contact Card & Quick Info */}
          <div className="lg:col-span-5 space-y-5">
            
            {/* WhatsApp Super-CTA Box */}
            <div className="bg-gradient-to-br from-emerald-600 via-emerald-700 to-teal-800 rounded-[2rem] p-6 text-white shadow-xl shadow-emerald-950/20 space-y-5">
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-2">
                  <span className="w-3 h-3 rounded-full bg-emerald-400 animate-ping"></span>
                  <span className="text-xs font-black uppercase tracking-wider text-emerald-200">
                    Atención Directa Online
                  </span>
                </div>
                <span className="px-2.5 py-0.5 rounded-full bg-white/20 text-[10px] font-black uppercase">
                  Sin Intermediarios
                </span>
              </div>

              <div>
                <h3 className="text-xl font-black text-white">¿Tenés alguna consulta?</h3>
                <p className="text-xs text-emerald-100 mt-1 leading-relaxed">
                  Conectate directamente al WhatsApp del titular para presupuestos, pedidos o visitas.
                </p>
              </div>

              <button
                type="button"
                onClick={() => handleWhatsApp()}
                className="w-full py-4 rounded-2xl bg-white hover:bg-emerald-50 text-slate-950 font-black text-sm flex items-center justify-center gap-2.5 shadow-2xl transition-all active:scale-95"
              >
                <MessageCircle className="w-5 h-5 text-emerald-600 fill-emerald-600" />
                <span>Contactar por WhatsApp</span>
              </button>

              <div className="flex items-center justify-between text-xs text-emerald-200 pt-1">
                <span>Número verificado:</span>
                <span className="font-mono font-bold text-white">{business.phone || business.whatsapp || '5493543123456'}</span>
              </div>
            </div>

            {/* Quick Details Card (No rigid borders, clean elevations) */}
            <div className="bg-white rounded-[2rem] p-6 shadow-sm space-y-4">
              <h3 className="text-xs font-black text-slate-400 uppercase tracking-wider">
                Datos de Localización & Horarios
              </h3>

              <div className="space-y-3.5 text-xs text-slate-700">
                <div className="flex items-start gap-3">
                  <div className="p-2 rounded-xl bg-amber-50 text-amber-700 shrink-0">
                    <MapPin className="w-4 h-4" />
                  </div>
                  <div>
                    <span className="font-black text-slate-900 block">Dirección:</span>
                    <span>{business.address || `${business.locationName}, Sierras Chicas, Córdoba`}</span>
                  </div>
                </div>

                <div className="flex items-start gap-3">
                  <div className="p-2 rounded-xl bg-teal-50 text-teal-700 shrink-0">
                    <Clock className="w-4 h-4" />
                  </div>
                  <div>
                    <span className="font-black text-slate-900 block">Horario de Atención:</span>
                    <span>{business.openingHours || 'Lunes a Sábado de 09:00 a 19:00 hs'}</span>
                  </div>
                </div>

                <div className="flex items-start gap-3">
                  <div className="p-2 rounded-xl bg-indigo-50 text-indigo-700 shrink-0">
                    <CreditCard className="w-4 h-4" />
                  </div>
                  <div>
                    <span className="font-black text-slate-900 block">Medios de Pago:</span>
                    <div className="flex flex-wrap gap-1.5 pt-1">
                      {['Efectivo', 'Transferencia / Alias', 'Mercado Pago QR', 'Débito'].map(m => (
                        <span key={m} className="px-2 py-0.5 rounded-md bg-slate-100 text-[10px] font-bold text-slate-700">
                          {m}
                        </span>
                      ))}
                    </div>
                  </div>
                </div>
              </div>
            </div>

          </div>

          {/* Right Column: Description & Service Options */}
          <div className="lg:col-span-7 space-y-5">
            
            {/* Description Card */}
            <div className="bg-white rounded-[2rem] p-6 sm:p-8 shadow-sm space-y-4">
              <div className="flex items-center gap-2">
                <span className="p-2 rounded-xl bg-amber-500 text-slate-950 font-black">
                  <Sparkles className="w-4 h-4" />
                </span>
                <h3 className="text-lg font-black text-slate-900">
                  Sobre {business.name}
                </h3>
              </div>

              <div className="text-sm text-slate-600 leading-relaxed space-y-3 font-normal">
                <p>
                  {business.description || 'Brindamos la mejor atención y calidad en Sierras Chicas. Atendemos a particulares, empresas y cabañas turísticas con la máxima dedicación y trayectoria en el corredor serrano.'}
                </p>
                <p className="text-xs text-slate-500 bg-slate-50 p-4 rounded-2xl leading-relaxed">
                  💡 <strong>Nota del Directorio:</strong> Esta ficha es informativa. El acuerdo comercial, pago y coordinación se realiza de manera 100% libre y directa con el prestador.
                </p>
              </div>
            </div>

            {/* Service Items / Options Box */}
            <div className="bg-white rounded-[2rem] p-6 sm:p-8 shadow-sm space-y-5">
              <div className="flex items-center justify-between">
                <div>
                  <h3 className="text-lg font-black text-slate-900">
                    Servicios & Opciones de Referencia
                  </h3>
                  <p className="text-xs text-slate-500 mt-0.5">Consultá disponibilidad y tarifas exactas</p>
                </div>
                <span className="px-3 py-1 rounded-full bg-slate-100 text-slate-700 text-xs font-black">
                  Guía de Precios
                </span>
              </div>

              <div className="space-y-3">
                {sampleServices.map(srv => (
                  <div
                    key={srv.id}
                    className="p-4 sm:p-5 rounded-2xl bg-slate-50 hover:bg-amber-50/60 transition-colors space-y-2 group"
                  >
                    <div className="flex items-start justify-between gap-3">
                      <div>
                        <span className="px-2 py-0.5 rounded-full bg-amber-500 text-slate-950 text-[9px] font-black uppercase">
                          {srv.badge}
                        </span>
                        <h4 className="text-sm font-black text-slate-900 mt-1">
                          {srv.title}
                        </h4>
                      </div>
                      <span className="text-xs sm:text-sm font-black text-slate-900 shrink-0 font-mono">
                        {srv.price}
                      </span>
                    </div>

                    <p className="text-xs text-slate-500 leading-relaxed">
                      {srv.desc}
                    </p>

                    <div className="pt-2 flex justify-end">
                      <button
                        type="button"
                        onClick={() => handleWhatsApp(`Hola ${business.name}, te consulto por el servicio: "${srv.title}".`)}
                        className="px-3.5 py-1.5 rounded-xl bg-slate-900 hover:bg-emerald-600 text-white text-xs font-extrabold flex items-center gap-1.5 transition-colors"
                      >
                        <MessageCircle className="w-3.5 h-3.5" />
                        <span>Pedir Cotización</span>
                      </button>
                    </div>
                  </div>
                ))}
              </div>
            </div>

          </div>

        </div>

      </div>

      {/* Floating Bottom Sticky Bar on Mobile for Instant WhatsApp */}
      <div className="sm:hidden fixed bottom-0 left-0 right-0 p-3 bg-white/95 backdrop-blur-xl shadow-2xl z-40 border-t border-slate-100">
        <button
          type="button"
          onClick={() => handleWhatsApp()}
          className="w-full py-3.5 rounded-2xl bg-emerald-600 hover:bg-emerald-500 text-white font-black text-xs flex items-center justify-center gap-2 shadow-lg shadow-emerald-950/20 active:scale-95"
        >
          <MessageCircle className="w-4 h-4 fill-white" />
          <span>Escribir por WhatsApp a {business.name}</span>
        </button>
      </div>

    </div>
  );
}
