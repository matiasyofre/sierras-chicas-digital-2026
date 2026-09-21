import React, { useState } from 'react';
import { useParams, Link } from 'react-router-dom';
import { useApp } from '../../context/AppContext';
import { 
  ArrowLeft, 
  MapPin, 
  Phone, 
  Star, 
  ShieldCheck, 
  Clock, 
  Send, 
  CheckCircle2, 
  Share2, 
  Heart,
  Wrench,
  FileText
} from 'lucide-react';

export default function ProfessionalProfileView() {
  const { slug } = useParams();
  const { businesses, products, favorites, toggleFavorite } = useApp();

  const business = businesses.find(b => b.slug === slug) || businesses[1]; // default to Electro Sierras
  const bizProducts = products.filter(p => p.businessId === business?.id);
  const isFav = favorites.includes(business?.id);

  const [quoteModalOpen, setQuoteModalOpen] = useState(false);
  const [clientName, setClientName] = useState('');
  const [clientPhone, setClientPhone] = useState('');
  const [clientLocation, setClientLocation] = useState('Río Ceballos');
  const [serviceType, setServiceType] = useState('Instalación Eléctrica');
  const [quoteMessage, setQuoteMessage] = useState('');

  const handleSendQuote = (e) => {
    e.preventDefault();
    if (!clientName.trim() || !quoteMessage.trim()) {
      alert('Por favor completá tu nombre y el detalle del trabajo requerido.');
      return;
    }

    let waText = `🛠️ *SOLICITUD DE PRESUPUESTO / CONSULTA TÉCNICA*\n`;
    waText += `👤 *Cliente:* ${clientName}\n`;
    waText += `📍 *Localidad:* ${clientLocation}\n`;
    waText += `🔧 *Servicio:* ${serviceType}\n`;
    waText += `📝 *Detalle del trabajo:* ${quoteMessage}\n\n`;
    waText += `_Consulta enviada desde Sierras Chicas Digital PWA_`;

    const cleanPhone = business?.whatsapp?.replace(/[^0-9]/g, '') || '5493517654321';
    window.open(`https://wa.me/${cleanPhone}?text=${encodeURIComponent(waText)}`, '_blank');
    setQuoteModalOpen(false);
  };

  const handleShare = () => {
    if (navigator.share) {
      navigator.share({
        title: business.name,
        text: business.tagline,
        url: window.location.href
      });
    } else {
      navigator.clipboard.writeText(window.location.href);
      alert('¡Enlace de la ficha copiado al portapapeles!');
    }
  };

  return (
    <div className="flex-1 bg-surface pb-20 md:pb-12 animate-in fade-in">
      
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
            className="p-2 rounded-xl bg-surface-container-lowest border border-surface-container-high text-on-surface hover:bg-surface-container transition-colors"
            title="Compartir"
          >
            <Share2 className="w-4 h-4" />
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

      <div className="max-w-4xl mx-auto px-4 sm:px-6 space-y-6 pt-2">
        
        {/* Header Hero Card */}
        <div className="bg-surface-container-lowest rounded-3xl border border-surface-container-high overflow-hidden shadow-card">
          <div className="relative h-48 sm:h-64 w-full bg-slate-900">
            <img
              src={business.coverUrl}
              alt={business.name}
              className="w-full h-full object-cover opacity-80"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-inverse-surface via-inverse-surface/40 to-transparent"></div>
            
            {/* Badges in Cover */}
            <div className="absolute top-4 left-4 flex flex-wrap gap-2">
              <span className="px-3 py-1 rounded-full bg-amber-500 text-amber-950 text-xs font-extrabold flex items-center gap-1 shadow-md">
                <ShieldCheck className="w-4 h-4" />
                <span>Matriculado Oficial</span>
              </span>
              <span className="px-3 py-1 rounded-full bg-black/40 backdrop-blur-md text-white text-xs font-bold">
                Urgencias 24hs
              </span>
            </div>
          </div>

          <div className="p-5 sm:p-7 relative">
            {/* Logo Avatar */}
            <div className="absolute -top-12 left-6 w-20 h-20 rounded-2xl bg-surface-container-lowest p-1 shadow-card border-2 border-white overflow-hidden">
              <img src={business.logoUrl} alt={business.name} className="w-full h-full object-cover rounded-xl" />
            </div>

            <div className="pt-8 space-y-3">
              <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3">
                <div>
                  <h1 className="text-xl sm:text-2xl font-extrabold text-on-surface tracking-tight">
                    {business.name}
                  </h1>
                  <div className="flex flex-wrap items-center gap-3 text-xs text-on-surface-variant mt-1 font-medium">
                    <span className="flex items-center gap-1 text-primary font-bold">
                      <MapPin className="w-3.5 h-3.5" />
                      <span>{business.locationName} · Sierras Chicas</span>
                    </span>
                    <span className="flex items-center gap-1 text-amber-600 font-bold">
                      <Star className="w-3.5 h-3.5 fill-amber-500" />
                      <span>{business.rating} ({business.reviewCount} reseñas)</span>
                    </span>
                  </div>
                </div>

                {/* Primary CTA Button */}
                <button
                  type="button"
                  onClick={() => setQuoteModalOpen(true)}
                  className="px-5 py-3 rounded-2xl bg-primary hover:bg-primary-container text-white font-extrabold text-xs sm:text-sm shadow-md shadow-primary/25 flex items-center justify-center gap-2 transition-all active:scale-95 shrink-0"
                >
                  <Send className="w-4 h-4" />
                  <span>Solicitar Presupuesto Directo</span>
                </button>
              </div>

              <p className="text-xs sm:text-sm text-on-surface-variant leading-relaxed pt-2">
                {business.description}
              </p>

              {/* Quick Info Strip */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 pt-3">
                <div className="flex items-center gap-2 p-2.5 rounded-xl bg-surface border border-surface-container-high text-xs text-on-surface font-semibold">
                  <Clock className="w-4 h-4 text-primary shrink-0" />
                  <span>{business.openingHours}</span>
                </div>
                <div className="flex items-center gap-2 p-2.5 rounded-xl bg-surface border border-surface-container-high text-xs text-on-surface font-semibold">
                  <MapPin className="w-4 h-4 text-primary shrink-0" />
                  <span>{business.address}</span>
                </div>
              </div>

            </div>
          </div>
        </div>

        {/* Services & Rates List */}
        <div className="space-y-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-2">
              <Wrench className="w-5 h-5 text-primary" />
              <h2 className="text-base sm:text-lg font-extrabold text-on-surface">
                Servicios & Tarifas Estimadas
              </h2>
            </div>
            <span className="text-xs text-on-surface-variant font-medium">Precios de referencia</span>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            {bizProducts.map(prod => (
              <div
                key={prod.id}
                className="bg-surface-container-lowest rounded-2xl border border-surface-container-high p-4 flex flex-col justify-between space-y-3 shadow-subtle hover:border-primary transition-colors"
              >
                <div className="space-y-1">
                  <span className="text-[10px] font-extrabold px-2 py-0.5 rounded-full bg-surface-container text-on-surface-variant uppercase">
                    {prod.categoryName}
                  </span>
                  <h3 className="text-sm font-bold text-on-surface pt-1">{prod.name}</h3>
                  <p className="text-xs text-on-surface-variant leading-relaxed">{prod.description}</p>
                </div>

                <div className="flex items-center justify-between pt-2 border-t border-surface-container-high">
                  <div>
                    <span className="text-[10px] text-outline block">Tarifa desde</span>
                    <span className="text-base font-extrabold text-primary">
                      ${prod.price.toLocaleString('es-AR')}
                    </span>
                  </div>
                  <button
                    type="button"
                    onClick={() => {
                      setServiceType(prod.name);
                      setQuoteModalOpen(true);
                    }}
                    className="px-3 py-1.5 rounded-xl bg-primary-fixed text-on-primary-fixed font-bold text-xs hover:bg-primary hover:text-white transition-all"
                  >
                    Consultar
                  </button>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Credentials & Trust Signals */}
        <div className="bg-surface-container-lowest rounded-3xl border border-surface-container-high p-5 sm:p-6 space-y-3 shadow-subtle">
          <h3 className="text-sm font-extrabold text-on-surface uppercase tracking-wider">
            Garantías y Cobertura
          </h3>
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 text-xs text-on-surface-variant">
            <div className="flex items-center gap-2 p-2 rounded-xl bg-surface">
              <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0" />
              <span>Garantía escrita en todos los trabajos</span>
            </div>
            <div className="flex items-center gap-2 p-2 rounded-xl bg-surface">
              <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0" />
              <span>Cobertura en todo Sierras Chicas</span>
            </div>
            <div className="flex items-center gap-2 p-2 rounded-xl bg-surface">
              <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0" />
              <span>Matrícula y seguros vigentes</span>
            </div>
          </div>
        </div>

      </div>

      {/* Interactive Quotation Modal */}
      {quoteModalOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-inverse-surface/60 backdrop-blur-sm animate-in fade-in">
          <div className="bg-surface-container-lowest rounded-3xl shadow-modal border border-surface-container-high w-full max-w-lg p-5 sm:p-7 space-y-4">
            
            <div className="flex items-center justify-between border-b border-surface-container-high pb-3">
              <div className="flex items-center gap-2">
                <div className="w-8 h-8 rounded-lg bg-primary-fixed text-on-primary-fixed flex items-center justify-center">
                  <FileText className="w-4 h-4 text-primary" />
                </div>
                <h3 className="font-extrabold text-sm sm:text-base text-on-surface">
                  Pedir Presupuesto a {business.name}
                </h3>
              </div>
              <button
                type="button"
                onClick={() => setQuoteModalOpen(false)}
                className="p-1.5 rounded-lg text-outline hover:text-on-surface hover:bg-surface-container"
              >
                ✕
              </button>
            </div>

            <form onSubmit={handleSendQuote} className="space-y-3 text-xs">
              <div>
                <label className="font-bold text-on-surface block mb-1">Tu Nombre Completo *</label>
                <input
                  type="text"
                  required
                  placeholder="Ej: Marcelo Fernández"
                  value={clientName}
                  onChange={e => setClientName(e.target.value)}
                  className="w-full px-3 py-2 rounded-xl bg-surface border border-surface-container-high text-on-surface focus:outline-none focus:border-primary"
                />
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                <div>
                  <label className="font-bold text-on-surface block mb-1">Localidad de Sierras Chicas *</label>
                  <select
                    value={clientLocation}
                    onChange={e => setClientLocation(e.target.value)}
                    className="w-full px-3 py-2 rounded-xl bg-surface border border-surface-container-high text-on-surface focus:outline-none focus:border-primary"
                  >
                    <option value="Río Ceballos">Río Ceballos</option>
                    <option value="Unquillo">Unquillo</option>
                    <option value="Mendiolaza">Mendiolaza</option>
                    <option value="Villa Allende">Villa Allende</option>
                    <option value="Salsipuedes">Salsipuedes</option>
                    <option value="La Granja / Agua de Oro">La Granja / Agua de Oro</option>
                    <option value="La Calera">La Calera</option>
                  </select>
                </div>

                <div>
                  <label className="font-bold text-on-surface block mb-1">Tipo de Servicio *</label>
                  <input
                    type="text"
                    required
                    value={serviceType}
                    onChange={e => setServiceType(e.target.value)}
                    placeholder="Ej: Certificación ERSeP"
                    className="w-full px-3 py-2 rounded-xl bg-surface border border-surface-container-high text-on-surface focus:outline-none focus:border-primary"
                  />
                </div>
              </div>

              <div>
                <label className="font-bold text-on-surface block mb-1">Detalle del trabajo / Urgencia *</label>
                <textarea
                  rows={3}
                  required
                  placeholder="Explicá brevemente qué trabajo necesitás realizar, ubicación aproximada y si es urgente..."
                  value={quoteMessage}
                  onChange={e => setQuoteMessage(e.target.value)}
                  className="w-full px-3 py-2 rounded-xl bg-surface border border-surface-container-high text-on-surface focus:outline-none focus:border-primary"
                />
              </div>

              <div className="pt-2 flex items-center justify-end gap-2">
                <button
                  type="button"
                  onClick={() => setQuoteModalOpen(false)}
                  className="px-4 py-2 rounded-xl text-on-surface-variant hover:bg-surface-container font-semibold"
                >
                  Cancelar
                </button>
                <button
                  type="submit"
                  className="px-5 py-2.5 rounded-xl bg-emerald-600 hover:bg-emerald-500 text-white font-extrabold flex items-center gap-1.5 shadow-md shadow-emerald-900/20"
                >
                  <Send className="w-3.5 h-3.5" />
                  <span>Enviar Consulta por WhatsApp</span>
                </button>
              </div>
            </form>

          </div>
        </div>
      )}

    </div>
  );
}
