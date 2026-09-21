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
  FileText,
  MessageCircle,
  Sparkles,
  Zap,
  Check
} from 'lucide-react';

export default function ProfessionalProfileView() {
  const { slug } = useParams();
  const { businesses, products, favorites, toggleFavorite, recordVisit } = useApp();

  const business = businesses.find(b => b.slug === slug) || businesses[1]; // default to Electro Sierras
  const bizProducts = products.filter(p => p.businessId === business?.id);
  const isFav = favorites.includes(business?.id);

  const [quoteModalOpen, setQuoteModalOpen] = useState(false);
  const [clientName, setClientName] = useState('');
  const [clientPhone, setClientPhone] = useState('');
  const [clientLocation, setClientLocation] = useState('Río Ceballos');
  const [serviceType, setServiceType] = useState('Instalación Eléctrica');
  const [quoteMessage, setQuoteMessage] = useState('');
  const [copied, setCopied] = useState(false);

  const handleSendQuote = (e) => {
    e.preventDefault();
    if (!clientName.trim() || !quoteMessage.trim()) {
      alert('Por favor completá tu nombre y el detalle del trabajo requerido.');
      return;
    }

    recordVisit(business?.id);
    let waText = `🛠️ *SOLICITUD DE PRESUPUESTO / CONSULTA TÉCNICA*\n`;
    waText += `👤 *Cliente:* ${clientName}\n`;
    waText += `📍 *Localidad:* ${clientLocation}\n`;
    waText += `🔧 *Servicio:* ${serviceType}\n`;
    waText += `📝 *Detalle del trabajo:* ${quoteMessage}\n\n`;
    waText += `_Consulta enviada desde Sierras Chicas Digital_`;

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
      setCopied(true);
      setTimeout(() => setCopied(false), 2500);
    }
  };

  return (
    <div className="flex-1 bg-gradient-to-b from-[#f1f5f9] via-[#f8fafc] to-[#f1f5f9] pb-32 md:pb-20 animate-in fade-in min-h-screen text-slate-900">
      
      {/* Floating Top Navigation Bar */}
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
              title="Compartir"
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
              title="Guardar favorito"
            >
              <Heart className={`w-4 h-4 ${isFav ? 'fill-white' : ''}`} />
            </button>
          </div>
        </div>
      </div>

      <div className="max-w-5xl mx-auto px-4 sm:px-6 space-y-6 pt-4">
        
        {/* Header Hero Card (Borderless, deep cinematic cover) */}
        <div className="relative rounded-[2.5rem] overflow-hidden bg-slate-950 shadow-2xl shadow-slate-950/20 text-white">
          <div className="relative h-56 sm:h-80 w-full bg-slate-900">
            <img
              src={business.coverUrl || 'https://images.unsplash.com/photo-1621905251189-08b45d6a269e?w=1200&auto=format&fit=crop&q=80'}
              alt={business.name}
              className="w-full h-full object-cover opacity-75"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-slate-950 via-slate-950/40 to-transparent"></div>
            
            {/* Floating Badges in Cover */}
            <div className="absolute top-4 left-4 flex flex-wrap gap-2">
              <span className="px-3.5 py-1.5 rounded-full bg-amber-500 text-slate-950 text-xs font-black flex items-center gap-1.5 shadow-lg">
                <ShieldCheck className="w-4 h-4" />
                <span>Matriculado Oficial ERSeP</span>
              </span>
              <span className="px-3.5 py-1.5 rounded-full bg-black/60 backdrop-blur-md text-white text-xs font-bold">
                🚨 Urgencias 24hs
              </span>
            </div>

            <div className="absolute bottom-6 left-6 right-6 flex flex-col sm:flex-row sm:items-end justify-between gap-4">
              <div className="space-y-1">
                <div className="flex items-center gap-1.5 text-emerald-400 text-xs font-bold">
                  <MapPin className="w-4 h-4" />
                  <span>{business.locationName} · Sierras Chicas</span>
                </div>
                <h1 className="text-2xl sm:text-4xl font-black text-white tracking-tight">
                  {business.name}
                </h1>
                <p className="text-xs sm:text-sm text-slate-300 max-w-xl line-clamp-2">
                  {business.tagline || business.description}
                </p>
              </div>

              {/* Primary Action Button in Hero */}
              <button
                type="button"
                onClick={() => setQuoteModalOpen(true)}
                className="px-6 py-3.5 rounded-2xl bg-amber-500 hover:bg-amber-400 text-slate-950 font-black text-xs sm:text-sm shadow-xl shadow-amber-500/20 flex items-center justify-center gap-2 transition-all active:scale-95 shrink-0"
              >
                <Send className="w-4 h-4" />
                <span>Pedir Presupuesto</span>
              </button>
            </div>
          </div>
        </div>

        {/* Quick Highlights Bar */}
        <div className="flex items-center gap-2 overflow-x-auto no-scrollbar py-1">
          <div className="shrink-0 flex items-center gap-1.5 px-4 py-2 rounded-2xl bg-white text-slate-800 font-bold text-xs shadow-sm">
            <Clock className="w-4 h-4 text-amber-600" />
            <span>{business.openingHours || 'Guardia Activa'}</span>
          </div>

          <div className="shrink-0 flex items-center gap-1 px-4 py-2 rounded-2xl bg-white text-slate-800 font-black text-xs shadow-sm">
            <Star className="w-4 h-4 text-amber-500 fill-amber-500" />
            <span>{business.rating || 5.0}</span>
            <span className="text-slate-400 font-normal">({business.reviewCount || 10} valoraciones)</span>
          </div>

          <div className="shrink-0 flex items-center gap-1.5 px-4 py-2 rounded-2xl bg-white text-slate-700 font-bold text-xs shadow-sm">
            <MapPin className="w-4 h-4 text-teal-600" />
            <span>{business.address || `${business.locationName}, Sierras Chicas`}</span>
          </div>
        </div>

        {/* Services & Rates List (Borderless, modern tiles) */}
        <div className="space-y-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-2">
              <span className="p-2 rounded-xl bg-amber-500 text-slate-950 font-black">
                <Wrench className="w-4 h-4" />
              </span>
              <h2 className="text-lg sm:text-xl font-black text-slate-900">
                Servicios & Tarifas de Referencia
              </h2>
            </div>
            <span className="text-xs text-slate-400 font-semibold">Presupuestos sin cargo</span>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            {bizProducts.map(prod => (
              <div
                key={prod.id}
                className="bg-white rounded-3xl p-5 flex flex-col justify-between space-y-3 shadow-sm hover:shadow-md transition-shadow"
              >
                <div className="space-y-1.5">
                  <span className="text-[10px] font-black px-2.5 py-0.5 rounded-full bg-slate-100 text-slate-700 uppercase">
                    {prod.categoryName || 'Servicio'}
                  </span>
                  <h3 className="text-sm font-black text-slate-900 pt-1">{prod.name}</h3>
                  <p className="text-xs text-slate-500 leading-relaxed">{prod.description}</p>
                </div>

                <div className="flex items-center justify-between pt-3 border-t border-slate-100">
                  <div>
                    <span className="text-[10px] text-slate-400 block font-semibold">Tarifa base</span>
                    <span className="text-base font-black text-slate-900 font-mono">
                      ${prod.price.toLocaleString('es-AR')}
                    </span>
                  </div>
                  <button
                    type="button"
                    onClick={() => {
                      setServiceType(prod.name);
                      setQuoteModalOpen(true);
                    }}
                    className="px-4 py-2 rounded-xl bg-slate-900 hover:bg-amber-500 hover:text-slate-950 text-white font-bold text-xs transition-colors"
                  >
                    Consultar
                  </button>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Credentials & Trust Strip */}
        <div className="bg-gradient-to-r from-slate-900 to-indigo-950 rounded-3xl p-6 text-white space-y-3 shadow-xl">
          <h3 className="text-xs font-black uppercase tracking-wider text-amber-400">
            Garantías & Cobertura en Sierras Chicas
          </h3>
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 text-xs text-slate-300">
            <div className="flex items-center gap-2 p-3 rounded-2xl bg-white/5">
              <CheckCircle2 className="w-4 h-4 text-emerald-400 shrink-0" />
              <span>Garantía escrita en todos los trabajos</span>
            </div>
            <div className="flex items-center gap-2 p-3 rounded-2xl bg-white/5">
              <CheckCircle2 className="w-4 h-4 text-emerald-400 shrink-0" />
              <span>Cobertura en todo el corredor</span>
            </div>
            <div className="flex items-center gap-2 p-3 rounded-2xl bg-white/5">
              <CheckCircle2 className="w-4 h-4 text-emerald-400 shrink-0" />
              <span>Matrícula y seguros vigentes</span>
            </div>
          </div>
        </div>

      </div>

      {/* Interactive Quotation Modal */}
      {quoteModalOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-950/60 backdrop-blur-sm animate-in fade-in">
          <div className="bg-white rounded-[2rem] shadow-2xl w-full max-w-lg p-6 sm:p-8 space-y-4 text-slate-900">
            
            <div className="flex items-center justify-between pb-3 border-b border-slate-100">
              <div className="flex items-center gap-2">
                <div className="w-10 h-10 rounded-2xl bg-amber-50 text-amber-600 flex items-center justify-center">
                  <FileText className="w-5 h-5" />
                </div>
                <div>
                  <h3 className="font-black text-sm sm:text-base text-slate-900">
                    Pedir Presupuesto a {business.name}
                  </h3>
                  <p className="text-[11px] text-slate-400">Envío directo sin intermediarios</p>
                </div>
              </div>
              <button
                type="button"
                onClick={() => setQuoteModalOpen(false)}
                className="p-1.5 rounded-full text-slate-400 hover:text-slate-900 hover:bg-slate-100"
              >
                ✕
              </button>
            </div>

            <form onSubmit={handleSendQuote} className="space-y-3.5 text-xs">
              <div>
                <label className="font-bold text-slate-700 block mb-1">Tu Nombre Completo *</label>
                <input
                  type="text"
                  required
                  placeholder="Ej: Marcelo Fernández"
                  value={clientName}
                  onChange={e => setClientName(e.target.value)}
                  className="w-full px-4 py-2.5 rounded-xl bg-slate-50 text-slate-900 focus:outline-none focus:ring-2 focus:ring-amber-500 font-medium"
                />
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                <div>
                  <label className="font-bold text-slate-700 block mb-1">Localidad en Sierras Chicas *</label>
                  <select
                    value={clientLocation}
                    onChange={e => setClientLocation(e.target.value)}
                    className="w-full px-4 py-2.5 rounded-xl bg-slate-50 text-slate-900 focus:outline-none focus:ring-2 focus:ring-amber-500 font-semibold cursor-pointer"
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
                  <label className="font-bold text-slate-700 block mb-1">Tipo de Servicio *</label>
                  <input
                    type="text"
                    required
                    value={serviceType}
                    onChange={e => setServiceType(e.target.value)}
                    placeholder="Ej: Certificación ERSeP"
                    className="w-full px-4 py-2.5 rounded-xl bg-slate-50 text-slate-900 focus:outline-none focus:ring-2 focus:ring-amber-500 font-medium"
                  />
                </div>
              </div>

              <div>
                <label className="font-bold text-slate-700 block mb-1">Detalle del trabajo / Urgencia *</label>
                <textarea
                  rows={3}
                  required
                  placeholder="Explicá brevemente qué trabajo necesitás realizar, ubicación aproximada y si es urgente..."
                  value={quoteMessage}
                  onChange={e => setQuoteMessage(e.target.value)}
                  className="w-full px-4 py-2.5 rounded-xl bg-slate-50 text-slate-900 focus:outline-none focus:ring-2 focus:ring-amber-500 font-medium"
                />
              </div>

              <div className="pt-2 flex items-center justify-end gap-2">
                <button
                  type="button"
                  onClick={() => setQuoteModalOpen(false)}
                  className="px-4 py-2.5 rounded-xl text-slate-500 hover:bg-slate-100 font-bold"
                >
                  Cancelar
                </button>
                <button
                  type="submit"
                  className="px-6 py-3 rounded-xl bg-emerald-600 hover:bg-emerald-500 text-white font-black flex items-center gap-2 shadow-lg shadow-emerald-950/20 active:scale-95"
                >
                  <Send className="w-4 h-4" />
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
