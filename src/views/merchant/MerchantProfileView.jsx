import React, { useState } from 'react';
import MerchantNav from '../../components/merchant/MerchantNav';
import { useApp } from '../../context/AppContext';
import { 
  Save, 
  Check, 
  Store, 
  MapPin, 
  Phone, 
  Clock, 
  Image, 
  Sparkles, 
  Layers,
  CheckCircle2
} from 'lucide-react';

export default function MerchantProfileView() {
  const { businesses, updateBusiness, categories, locations } = useApp();
  const currentBiz = businesses[0]; // Cafe de las Sierras

  const [formData, setFormData] = useState({
    name: currentBiz.name,
    tagline: currentBiz.tagline,
    description: currentBiz.description,
    categoryId: currentBiz.categoryId || 'cat-1',
    categoryName: currentBiz.categoryName || 'Gastronomía',
    locationId: currentBiz.locationId || 'loc-1',
    locationName: currentBiz.locationName || 'Río Ceballos',
    address: currentBiz.address,
    phone: currentBiz.phone,
    whatsapp: currentBiz.whatsapp,
    email: currentBiz.email,
    instagram: currentBiz.instagram,
    openingHours: currentBiz.openingHours,
    businessMode: currentBiz.businessMode || 'tienda', // aviso, tienda, servicios
    logoUrl: currentBiz.logoUrl,
    coverUrl: currentBiz.coverUrl
  });

  const [saved, setSaved] = useState(false);

  const handleSubmit = (e) => {
    e.preventDefault();
    updateBusiness({ ...currentBiz, ...formData });
    setSaved(true);
    setTimeout(() => setSaved(false), 3000);
  };

  return (
    <div className="flex-1 bg-surface pb-20 md:pb-12 animate-in fade-in">
      <MerchantNav />

      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 pt-6 space-y-6">
        
        {/* Header Summary */}
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 bg-surface-container-lowest p-5 rounded-3xl border border-surface-container-high shadow-subtle">
          <div>
            <span className="px-2.5 py-0.5 rounded-full bg-amber-100 text-amber-900 text-xs font-extrabold uppercase">
              Configuración de Perfil
            </span>
            <h1 className="text-lg sm:text-xl font-extrabold text-on-surface mt-1">
              Ficha del Negocio & Modalidad de Presencia
            </h1>
            <p className="text-xs text-on-surface-variant mt-0.5">
              Definí cómo interactúan los vecinos y turistas de Sierras Chicas con tu ficha pública.
            </p>
          </div>

          <button
            type="button"
            onClick={handleSubmit}
            className={`px-5 py-2.5 rounded-xl text-xs font-extrabold flex items-center gap-1.5 transition-all shadow-md active:scale-95 ${
              saved ? 'bg-emerald-600 text-white' : 'bg-amber-600 hover:bg-amber-500 text-white shadow-amber-900/20'
            }`}
          >
            {saved ? <Check className="w-4 h-4" /> : <Save className="w-4 h-4" />}
            <span>{saved ? '¡Guardado con Éxito!' : 'Guardar Cambios'}</span>
          </button>
        </div>

        {/* Profile Settings Form */}
        <form onSubmit={handleSubmit} className="space-y-6">
          
          {/* Business Mode Card */}
          <div className="bg-surface-container-lowest p-5 sm:p-6 rounded-3xl border border-surface-container-high space-y-4 shadow-subtle">
            <div className="flex items-center gap-2">
              <Layers className="w-5 h-5 text-amber-600" />
              <h3 className="text-sm font-extrabold text-on-surface uppercase tracking-wider">
                Modalidad del Negocio
              </h3>
            </div>
            
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
              {/* Opción 1: Aviso */}
              <button
                type="button"
                onClick={() => setFormData({ ...formData, businessMode: 'aviso' })}
                className={`p-4 rounded-2xl border text-left space-y-1.5 transition-all ${
                  formData.businessMode === 'aviso' || formData.businessMode === 'catalogo'
                    ? 'bg-amber-50 border-amber-500 shadow-sm ring-2 ring-amber-500/20'
                    : 'bg-surface border-surface-container-high hover:bg-surface-container'
                }`}
              >
                <div className="flex items-center justify-between">
                  <span className="text-xs font-extrabold text-on-surface">📢 Aviso Publicitario</span>
                  {(formData.businessMode === 'aviso' || formData.businessMode === 'catalogo') && (
                    <CheckCircle2 className="w-4 h-4 text-amber-600 shrink-0" />
                  )}
                </div>
                <p className="text-[11px] text-on-surface-variant leading-relaxed">
                  Para quienes solo quieren publicitar: ficha institucional con fotos, datos y WhatsApp directo sin carrito.
                </p>
              </button>

              {/* Opción 2: Tienda */}
              <button
                type="button"
                onClick={() => setFormData({ ...formData, businessMode: 'tienda' })}
                className={`p-4 rounded-2xl border text-left space-y-1.5 transition-all ${
                  formData.businessMode === 'tienda'
                    ? 'bg-amber-50 border-amber-500 shadow-sm ring-2 ring-amber-500/20'
                    : 'bg-surface border-surface-container-high hover:bg-surface-container'
                }`}
              >
                <div className="flex items-center justify-between">
                  <span className="text-xs font-extrabold text-on-surface">🛍️ Tienda Virtual & Carrito</span>
                  {formData.businessMode === 'tienda' && <CheckCircle2 className="w-4 h-4 text-amber-600 shrink-0" />}
                </div>
                <p className="text-[11px] text-on-surface-variant leading-relaxed">
                  Para gastronomía y comercios: catálogo con precios, carrito lateral y checkout automático por WhatsApp.
                </p>
              </button>

              {/* Opción 3: Servicios */}
              <button
                type="button"
                onClick={() => setFormData({ ...formData, businessMode: 'servicios' })}
                className={`p-4 rounded-2xl border text-left space-y-1.5 transition-all ${
                  formData.businessMode === 'servicios'
                    ? 'bg-amber-50 border-amber-500 shadow-sm ring-2 ring-amber-500/20'
                    : 'bg-surface border-surface-container-high hover:bg-surface-container'
                }`}
              >
                <div className="flex items-center justify-between">
                  <span className="text-xs font-extrabold text-on-surface">🔧 Servicios & Presupuesto</span>
                  {formData.businessMode === 'servicios' && <CheckCircle2 className="w-4 h-4 text-amber-600 shrink-0" />}
                </div>
                <p className="text-[11px] text-on-surface-variant leading-relaxed">
                  Para profesionales, técnicos y cabañas: cotizador y generador interactivo de presupuestos por WhatsApp.
                </p>
              </button>
            </div>
          </div>

          {/* General Information */}
          <div className="bg-surface-container-lowest p-5 sm:p-6 rounded-3xl border border-surface-container-high space-y-4 shadow-subtle text-xs">
            <h3 className="text-sm font-extrabold text-on-surface uppercase tracking-wider">
              Datos Generales del Comercio
            </h3>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div>
                <label className="font-bold text-on-surface block mb-1">Nombre Comercial *</label>
                <input
                  type="text"
                  required
                  value={formData.name}
                  onChange={e => setFormData({ ...formData, name: e.target.value })}
                  className="w-full px-3 py-2 rounded-xl bg-surface border border-surface-container-high text-on-surface focus:outline-none focus:border-primary"
                />
              </div>

              <div>
                <label className="font-bold text-on-surface block mb-1">Lema / Subtítulo Corto</label>
                <input
                  type="text"
                  value={formData.tagline}
                  onChange={e => setFormData({ ...formData, tagline: e.target.value })}
                  className="w-full px-3 py-2 rounded-xl bg-surface border border-surface-container-high text-on-surface focus:outline-none focus:border-primary"
                />
              </div>
            </div>

            {/* Category & Location Selectors */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div>
                <label className="font-bold text-on-surface block mb-1">Rubro / Categoría Principal *</label>
                <select
                  value={formData.categoryId}
                  onChange={e => {
                    const selectedCat = categories.find(c => c.id === e.target.value);
                    setFormData({
                      ...formData,
                      categoryId: e.target.value,
                      categoryName: selectedCat ? selectedCat.name : formData.categoryName
                    });
                  }}
                  className="w-full px-3 py-2 rounded-xl bg-surface border border-surface-container-high text-on-surface focus:outline-none focus:border-primary font-medium"
                >
                  {categories.map(cat => (
                    <option key={cat.id} value={cat.id}>
                      {cat.emoji} {cat.name}
                    </option>
                  ))}
                </select>
              </div>

              <div>
                <label className="font-bold text-on-surface block mb-1">Localidad en Sierras Chicas *</label>
                <select
                  value={formData.locationName}
                  onChange={e => {
                    const selectedLoc = locations.find(l => l.name === e.target.value);
                    setFormData({
                      ...formData,
                      locationName: e.target.value,
                      locationId: selectedLoc ? selectedLoc.id : formData.locationId
                    });
                  }}
                  className="w-full px-3 py-2 rounded-xl bg-surface border border-surface-container-high text-on-surface focus:outline-none focus:border-primary font-medium"
                >
                  {locations.map(loc => (
                    <option key={loc.id} value={loc.name}>
                      📍 {loc.name}
                    </option>
                  ))}
                </select>
              </div>
            </div>

            <div>
              <label className="font-bold text-on-surface block mb-1">Descripción Completa</label>
              <textarea
                rows={3}
                value={formData.description}
                onChange={e => setFormData({ ...formData, description: e.target.value })}
                className="w-full px-3 py-2 rounded-xl bg-surface border border-surface-container-high text-on-surface focus:outline-none focus:border-primary"
              />
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div>
                <label className="font-bold text-on-surface block mb-1">Dirección Física</label>
                <input
                  type="text"
                  value={formData.address}
                  onChange={e => setFormData({ ...formData, address: e.target.value })}
                  className="w-full px-3 py-2 rounded-xl bg-surface border border-surface-container-high text-on-surface focus:outline-none focus:border-primary"
                />
              </div>

              <div>
                <label className="font-bold text-on-surface block mb-1">Horarios de Atención</label>
                <input
                  type="text"
                  value={formData.openingHours}
                  onChange={e => setFormData({ ...formData, openingHours: e.target.value })}
                  className="w-full px-3 py-2 rounded-xl bg-surface border border-surface-container-high text-on-surface focus:outline-none focus:border-primary"
                />
              </div>
            </div>
          </div>

          {/* Contact & WhatsApp */}
          <div className="bg-surface-container-lowest p-5 sm:p-6 rounded-3xl border border-surface-container-high space-y-4 shadow-subtle text-xs">
            <h3 className="text-sm font-extrabold text-on-surface uppercase tracking-wider">
              Canales de Contacto & Redes
            </h3>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div>
                <label className="font-bold text-on-surface block mb-1">Número de WhatsApp (para pedidos) *</label>
                <input
                  type="text"
                  required
                  placeholder="5493543123456"
                  value={formData.whatsapp}
                  onChange={e => setFormData({ ...formData, whatsapp: e.target.value })}
                  className="w-full px-3 py-2 rounded-xl bg-surface border border-surface-container-high text-on-surface focus:outline-none focus:border-primary"
                />
              </div>

              <div>
                <label className="font-bold text-on-surface block mb-1">Instagram (@usuario)</label>
                <input
                  type="text"
                  placeholder="@cafesierras.cba"
                  value={formData.instagram}
                  onChange={e => setFormData({ ...formData, instagram: e.target.value })}
                  className="w-full px-3 py-2 rounded-xl bg-surface border border-surface-container-high text-on-surface focus:outline-none focus:border-primary"
                />
              </div>
            </div>
          </div>

          {/* Visual Assets (Logo & Cover URL) */}
          <div className="bg-surface-container-lowest p-5 sm:p-6 rounded-3xl border border-surface-container-high space-y-4 shadow-subtle text-xs">
            <h3 className="text-sm font-extrabold text-on-surface uppercase tracking-wider">
              Imágenes de Portada & Logo
            </h3>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div>
                <label className="font-bold text-on-surface block mb-1">URL Logo (Avatar)</label>
                <input
                  type="text"
                  value={formData.logoUrl}
                  onChange={e => setFormData({ ...formData, logoUrl: e.target.value })}
                  className="w-full px-3 py-2 rounded-xl bg-surface border border-surface-container-high text-on-surface focus:outline-none focus:border-primary"
                />
              </div>

              <div>
                <label className="font-bold text-on-surface block mb-1">URL Foto de Portada (Banner)</label>
                <input
                  type="text"
                  value={formData.coverUrl}
                  onChange={e => setFormData({ ...formData, coverUrl: e.target.value })}
                  className="w-full px-3 py-2 rounded-xl bg-surface border border-surface-container-high text-on-surface focus:outline-none focus:border-primary"
                />
              </div>
            </div>
          </div>

          <div className="flex justify-end">
            <button
              type="submit"
              className="px-6 py-3 rounded-2xl bg-amber-600 hover:bg-amber-500 text-white font-extrabold text-xs sm:text-sm shadow-md flex items-center gap-2"
            >
              <Save className="w-4 h-4" />
              <span>Guardar Configuración</span>
            </button>
          </div>

        </form>

      </div>
    </div>
  );
}
