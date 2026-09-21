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
  Check
} from 'lucide-react';

export default function NoticeBusinessView() {
  const { slug } = useParams();
  const { businesses, toggleFavorite, favorites } = useApp();

  const business = businesses.find(b => b.slug === slug) || businesses[0];
  const isFav = favorites.includes(business.id);

  const [activeTab, setActiveTab] = useState('info'); // 'info' | 'catalog'
  const [copied, setCopied] = useState(false);

  // WhatsApp click handler
  const handleWhatsApp = () => {
    const text = `Hola *${business.name}*, vi tu aviso en el directorio de *Sierras Chicas Digital* y me gustaría hacerte una consulta.`;
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

  // Sample items or services if available
  const sampleServices = [
    {
      id: 'srv-1',
      title: 'Consultoría y Asesoramiento Técnico',
      desc: 'Diagnóstico en el lugar, relevamiento de infraestructura y presupuesto sin cargo.',
      price: 'A convenir',
      badge: 'Más solicitado'
    },
    {
      id: 'srv-2',
      title: 'Servicio Estándar & Mantenimiento',
      desc: 'Atención personalizada para particulares, comercios y cabañas turísticas del valle.',
      price: '$ 15.000',
      badge: 'Tarifa referencia'
    },
    {
      id: 'srv-3',
      title: 'Urgencias y Asistencia Inmediata',
      desc: 'Cobertura rápida en Río Ceballos, Unquillo, Salsipuedes y Mendiolaza.',
      price: 'Consultar guardia',
      badge: 'Guardia activa'
    }
  ];

  return (
    <div className="flex-1 bg-surface pb-28 md:pb-16 animate-in fade-in">
      
      {/* Top Navigation Bar */}
      <div className="max-w-4xl mx-auto px-4 pt-4 pb-2 flex items-center justify-between">
        <Link
          to="/"
          className="inline-flex items-center gap-1.5 px-3 py-2 rounded-xl bg-surface-container-lowest border border-surface-container-high text-xs font-bold text-on-surface hover:bg-surface-container transition-colors shadow-xs"
        >
          <ArrowLeft className="w-4 h-4" />
          <span>Volver al Directorio</span>
        </Link>
        
        <div className="flex items-center gap-2">
          <button
            type="button"
            onClick={handleShare}
            className="p-2 rounded-xl bg-surface-container-lowest border border-surface-container-high text-on-surface hover:bg-surface-container transition-colors relative"
            title="Compartir"
          >
            {copied ? <Check className="w-4 h-4 text-emerald-600" /> : <Share2 className="w-4 h-4" />}
          </button>
          <button
            type="button"
            onClick={() => toggleFavorite(business.id)}
            className={`p-2 rounded-xl border transition-colors ${
              isFav 
                ? 'bg-rose-50 border-rose-200 text-rose-600' 
                : 'bg-surface-container-lowest border-surface-container-high text-on-surface hover:bg-surface-container'
            }`}
            title="Guardar favorito"
          >
            <Heart className={`w-4 h-4 ${isFav ? 'fill-rose-600' : ''}`} />
          </button>
        </div>
      </div>

      <div className="max-w-4xl mx-auto px-4 sm:px-6 space-y-5 pt-2">
        
        {/* Breadcrumb & Institutional Pill */}
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-1.5 text-xs text-on-surface-variant font-semibold">
            <span className="text-primary">Sierras Chicas</span>
            <ChevronRight className="w-3.5 h-3.5 text-outline" />
            <span>{business.locationName}</span>
          </div>
          <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-secondary-container/40 text-on-secondary-container text-[11px] font-bold">
            <ShieldCheck className="w-3.5 h-3.5 text-secondary" />
            <span>FICHA INSTITUCIONAL</span>
          </div>
        </div>

        {/* Photo Gallery Mosaic (Mockup code4.html inspired) */}
        <div className="grid grid-cols-12 gap-2 rounded-3xl overflow-hidden bg-surface-container-lowest p-2 border border-surface-container-high shadow-subtle">
          {/* Main Large Photo */}
          <div className="col-span-8 sm:col-span-8 h-48 sm:h-64 relative rounded-2xl overflow-hidden bg-slate-900 group">
            <img 
              src={business.coverUrl || 'https://images.unsplash.com/photo-1581092160607-ee22621dd758?w=1200&auto=format&fit=crop&q=80'} 
              alt={business.name}
              className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
            />
            <div className="absolute top-2.5 left-2.5 px-2.5 py-1 rounded-full bg-surface-container-lowest/90 backdrop-blur-md text-on-surface text-[11px] font-bold flex items-center gap-1 shadow-sm">
              <Camera className="w-3 h-3 text-amber-600" />
              <span>1 / 4 fotos</span>
            </div>
          </div>

          {/* Sub Grid 2 Slots */}
          <div className="col-span-4 sm:col-span-4 grid grid-cols-1 gap-2">
            <div className="h-[92px] sm:h-[124px] rounded-2xl bg-surface-container-low overflow-hidden relative group">
              <img 
                src={business.logoUrl || 'https://images.unsplash.com/photo-1554118811-1e0d58224f24?w=400&auto=format&fit=crop&q=80'} 
                alt="Detalle" 
                className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
              />
              <span className="absolute inset-0 bg-black/20"></span>
            </div>
            <div className="h-[92px] sm:h-[124px] rounded-2xl bg-surface-container-low border border-dashed border-surface-container-highest flex flex-col items-center justify-center text-outline gap-1 hover:bg-surface-container transition-colors cursor-pointer">
              <Camera className="w-5 h-5 text-outline" />
              <span className="text-[10px] font-extrabold uppercase tracking-wider text-on-surface-variant/80">Ver galería</span>
            </div>
          </div>
        </div>

        {/* Meta Badges Strip (Horizontal Scroll) */}
        <div className="flex items-center gap-2 overflow-x-auto no-scrollbar pb-1">
          <div className="shrink-0 flex items-center gap-1.5 px-3 py-1.5 rounded-full bg-primary-fixed text-on-primary-fixed text-xs font-bold">
            <Building2 className="w-3.5 h-3.5" />
            <span>{business.categoryName}</span>
          </div>
          <div className="shrink-0 flex items-center gap-1.5 px-3 py-1.5 rounded-full bg-surface-container-lowest border border-surface-container-high text-on-surface-variant text-xs font-medium">
            <Clock className="w-3.5 h-3.5 text-primary" />
            <span>Actualizado esta semana</span>
          </div>
          <div className="shrink-0 flex items-center gap-1.5 px-3 py-1.5 rounded-full bg-surface-container-lowest border border-surface-container-high text-on-surface-variant text-xs font-medium">
            <Eye className="w-3.5 h-3.5 text-secondary" />
            <span>184 Vistas</span>
          </div>
          <div className="shrink-0 flex items-center gap-1 px-3 py-1.5 rounded-full bg-amber-50 border border-amber-200 text-amber-900 text-xs font-bold">
            <Star className="w-3.5 h-3.5 text-amber-500 fill-amber-500" />
            <span>{business.rating || '4.9'}</span>
            <span className="text-amber-700/80 font-normal">({business.reviewCount || 12} valoraciones)</span>
          </div>
        </div>

        {/* Header Title & Direct Connection Card */}
        <div className="bg-surface-container-lowest rounded-3xl p-5 sm:p-6 border border-surface-container-high shadow-subtle space-y-4">
          <div className="flex items-start justify-between gap-3">
            <div className="space-y-1">
              <h1 className="text-xl sm:text-2xl font-extrabold text-on-surface leading-tight tracking-tight">
                {business.name}
              </h1>
              <div className="flex items-center gap-1.5 text-primary text-xs sm:text-sm font-semibold">
                <MapPin className="w-4 h-4 shrink-0" />
                <span>{business.address || `${business.locationName}, Sierras Chicas, Córdoba`}</span>
              </div>
            </div>
            {business.isVerified && (
              <span className="inline-flex items-center gap-1 px-2.5 py-1 rounded-full bg-emerald-50 text-emerald-700 border border-emerald-200 text-[11px] font-bold shrink-0">
                <CheckCircle2 className="w-3.5 h-3.5" />
                <span>Verificado</span>
              </span>
            )}
          </div>

          {/* Banner: Perfil Publicitario Directo */}
          <div className="p-3.5 rounded-2xl bg-surface-container-low border border-surface-container-high flex items-start gap-3">
            <div className="w-8 h-8 rounded-xl bg-primary/10 flex items-center justify-center text-primary shrink-0">
              <Sparkles className="w-4 h-4" />
            </div>
            <div className="text-xs">
              <p className="font-extrabold text-on-surface">Perfil Publicitario Directo</p>
              <p className="text-on-surface-variant mt-0.5 leading-relaxed">
                Conexión libre y directa entre vecinos, turistas y comercios del valle sin comisiones ni intermediarios.
              </p>
            </div>
          </div>
        </div>

        {/* Interactive Dual Tab Switcher */}
        <div className="bg-surface-container p-1 rounded-2xl flex gap-1 border border-surface-container-high">
          <button 
            type="button"
            onClick={() => setActiveTab('info')}
            className={`flex-1 py-2.5 rounded-xl text-xs font-extrabold text-center transition-all flex items-center justify-center gap-1.5 ${
              activeTab === 'info'
                ? 'bg-surface-container-lowest text-primary shadow-sm'
                : 'text-on-surface-variant hover:text-on-surface'
            }`}
          >
            <Info className="w-4 h-4" />
            <span>Ficha & Contacto</span>
          </button>
          
          <button 
            type="button"
            onClick={() => setActiveTab('catalog')}
            className={`flex-1 py-2.5 rounded-xl text-xs font-extrabold text-center transition-all flex items-center justify-center gap-1.5 ${
              activeTab === 'catalog'
                ? 'bg-surface-container-lowest text-primary shadow-sm'
                : 'text-on-surface-variant hover:text-on-surface'
            }`}
          >
            <Layers className="w-4 h-4" />
            <span>Servicios & Opciones</span>
          </button>
        </div>

        {/* TAB 1: FICHA & CONTACTO */}
        {activeTab === 'info' && (
          <div className="space-y-4 animate-in fade-in">
            {/* Card: Datos del Comercio / Vendedor */}
            <div className="bg-surface-container-lowest rounded-3xl p-5 sm:p-6 border border-surface-container-high shadow-subtle space-y-4">
              <div className="flex items-center justify-between">
                <span className="text-[11px] font-extrabold text-outline uppercase tracking-wider">
                  Datos del Establecimiento
                </span>
                <span className="text-xs text-emerald-600 font-bold flex items-center gap-1">
                  <span className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse"></span>
                  Atención Activa
                </span>
              </div>

              <div className="flex items-center gap-3.5">
                <div className="w-14 h-14 rounded-2xl bg-surface-container-high flex items-center justify-center text-primary font-extrabold text-base overflow-hidden border border-surface-container-high">
                  {business.logoUrl ? (
                    <img src={business.logoUrl} alt={business.name} className="w-full h-full object-cover" />
                  ) : (
                    <span>{business.name.substring(0, 2).toUpperCase()}</span>
                  )}
                </div>
                <div className="min-w-0 flex-1">
                  <h3 className="text-sm sm:text-base font-extrabold text-on-surface truncate">
                    {business.name}
                  </h3>
                  <p className="text-xs text-on-surface-variant truncate">
                    {business.tagline || 'Comercio adherido a Sierras Chicas Digital'}
                  </p>
                </div>
              </div>

              {/* Information list */}
              <div className="space-y-2.5 pt-2 text-xs text-on-surface-variant border-t border-surface-container-high">
                <div className="flex items-center gap-2.5">
                  <MapPin className="w-4 h-4 text-primary shrink-0" />
                  <span>{business.address || `${business.locationName}, Sierras Chicas`}</span>
                </div>
                <div className="flex items-center gap-2.5">
                  <Clock className="w-4 h-4 text-secondary shrink-0" />
                  <span>{business.openingHours || 'Lunes a Sábado: 09:00 a 19:00 hs'}</span>
                </div>
                <div className="flex items-center gap-2.5">
                  <Phone className="w-4 h-4 text-emerald-600 shrink-0" />
                  <span className="font-mono text-on-surface font-bold">{business.phone || business.whatsapp}</span>
                </div>
              </div>

              {/* High-Impact WhatsApp CTA Button */}
              <div className="pt-2 space-y-2">
                <button
                  type="button"
                  onClick={handleWhatsApp}
                  className="w-full py-3.5 px-4 rounded-2xl bg-emerald-600 hover:bg-emerald-500 text-white font-extrabold text-xs sm:text-sm flex items-center justify-center gap-2 shadow-lg shadow-emerald-900/20 active:scale-[0.98] transition-all"
                >
                  <MessageCircle className="w-5 h-5 fill-white" />
                  <span>Contactar por WhatsApp Directo</span>
                </button>
                
                <button
                  type="button"
                  onClick={handleShare}
                  className="w-full py-2.5 px-4 rounded-xl bg-surface-container-low hover:bg-surface-container text-on-surface text-xs font-bold flex items-center justify-center gap-1.5 transition-colors border border-surface-container-high"
                >
                  <Share2 className="w-4 h-4" />
                  <span>Compartir ficha del negocio</span>
                </button>
              </div>
            </div>

            {/* Card: Detalle de la Ficha & Medios de Pago */}
            <div className="bg-surface-container-lowest rounded-3xl p-5 sm:p-6 border border-surface-container-high shadow-subtle space-y-4">
              <h3 className="text-sm font-extrabold text-on-surface">Detalle & Presentación</h3>
              <p className="text-xs sm:text-sm text-on-surface-variant leading-relaxed">
                {business.description || 'Brindamos atención personalizada en todo el corredor de Sierras Chicas. Consultanos por presupuestos, disponibilidades o visitas a domicilio sin compromiso.'}
              </p>

              {/* Medios de Pago */}
              <div className="p-4 rounded-2xl bg-surface-container-low border border-surface-container-high space-y-2.5">
                <div className="flex items-center gap-2 text-secondary font-bold text-xs">
                  <CreditCard className="w-4 h-4" />
                  <span>Medios de Pago Aceptados</span>
                </div>
                <div className="flex flex-wrap gap-2 pt-0.5">
                  {['Efectivo', 'Transferencia / Alias', 'Mercado Pago / QR', 'Tarjetas de Débito'].map(pm => (
                    <span 
                      key={pm}
                      className="px-2.5 py-1 rounded-lg bg-surface-container-lowest border border-surface-container-high text-on-surface text-[11px] font-semibold shadow-2xs"
                    >
                      {pm}
                    </span>
                  ))}
                </div>
              </div>
            </div>
          </div>
        )}

        {/* TAB 2: SERVICIOS & OPCIONES */}
        {activeTab === 'catalog' && (
          <div className="space-y-4 animate-in fade-in">
            <div className="bg-surface-container-lowest rounded-3xl p-5 sm:p-6 border border-surface-container-high shadow-subtle space-y-4">
              <div className="flex items-center justify-between">
                <div>
                  <h3 className="text-sm font-extrabold text-on-surface">Servicios & Opciones Informativas</h3>
                  <p className="text-xs text-on-surface-variant mt-0.5">Valores y alcances de referencia sin cobro automático</p>
                </div>
                <span className="px-2.5 py-1 rounded-full bg-amber-50 text-amber-900 border border-amber-200 text-[10px] font-extrabold uppercase">
                  Informativo
                </span>
              </div>

              <div className="space-y-3 pt-2">
                {sampleServices.map(srv => (
                  <div 
                    key={srv.id}
                    className="p-4 rounded-2xl bg-surface-container-low border border-surface-container-high space-y-2 hover:border-primary transition-all"
                  >
                    <div className="flex items-start justify-between gap-2">
                      <div>
                        <span className="px-2 py-0.5 rounded-md bg-primary/10 text-primary text-[10px] font-bold">
                          {srv.badge}
                        </span>
                        <h4 className="text-xs sm:text-sm font-extrabold text-on-surface mt-1.5">
                          {srv.title}
                        </h4>
                      </div>
                      <span className="text-xs sm:text-sm font-extrabold text-primary font-mono shrink-0">
                        {srv.price}
                      </span>
                    </div>
                    <p className="text-xs text-on-surface-variant">
                      {srv.desc}
                    </p>
                    <div className="pt-2 flex justify-end">
                      <button
                        type="button"
                        onClick={handleWhatsApp}
                        className="px-3 py-1.5 rounded-xl bg-emerald-600 hover:bg-emerald-500 text-white text-xs font-bold flex items-center gap-1 transition-all"
                      >
                        <MessageCircle className="w-3.5 h-3.5" />
                        <span>Consultar por este ítem</span>
                      </button>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        )}

      </div>
    </div>
  );
}
