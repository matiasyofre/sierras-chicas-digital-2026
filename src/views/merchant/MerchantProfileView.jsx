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
  Image as ImageIcon, 
  Sparkles, 
  Layers,
  CheckCircle2,
  Upload,
  Plus,
  Trash2,
  Tag,
  ShieldCheck
} from 'lucide-react';

export default function MerchantProfileView() {
  const { businesses, updateBusiness, categories, locations, plans, tags } = useApp();
  const currentBiz = businesses[0] || {}; // Default to first business

  const currentPlan = plans.find(p => p.id === currentBiz.planId || p.slug === currentBiz.planName) || plans[1];
  const maxPhotosAllowed = currentPlan?.maxPhotos || 10;

  const [formData, setFormData] = useState({
    name: currentBiz.name || '',
    tagline: currentBiz.tagline || '',
    description: currentBiz.description || '',
    categoryId: currentBiz.categoryId || 'cat-1',
    categoryName: currentBiz.categoryName || 'Gastronomía',
    subcategory: currentBiz.subcategory || '',
    locationId: currentBiz.locationId || 'loc-1',
    locationName: currentBiz.locationName || 'Río Ceballos',
    address: currentBiz.address || '',
    phone: currentBiz.phone || '',
    whatsapp: currentBiz.whatsapp || '',
    email: currentBiz.email || '',
    instagram: currentBiz.instagram || '',
    openingHours: currentBiz.openingHours || '',
    businessMode: currentBiz.businessMode || 'tienda', // aviso, tienda, servicios
    logoUrl: currentBiz.logoUrl || '',
    coverUrl: currentBiz.coverUrl || '',
    gallery: currentBiz.gallery || [],
    tags: currentBiz.tags || []
  });

  const [saved, setSaved] = useState(false);
  const [newGalleryUrl, setNewGalleryUrl] = useState('');

  const handleFileUpload = (e, targetField) => {
    const file = e.target.files?.[0];
    if (!file) return;

    const reader = new FileReader();
    reader.onload = () => {
      if (targetField === 'gallery') {
        if (formData.gallery.length >= maxPhotosAllowed) {
          alert(`Tu plan actual (${currentPlan.name}) permite un máximo de ${maxPhotosAllowed} fotos. Mejorá tu plan para subir más.`);
          return;
        }
        setFormData(prev => ({ ...prev, gallery: [...prev.gallery, reader.result] }));
      } else {
        setFormData(prev => ({ ...prev, [targetField]: reader.result }));
      }
    };
    reader.readAsDataURL(file);
  };

  const handleAddGalleryUrl = () => {
    if (!newGalleryUrl.trim()) return;
    if (formData.gallery.length >= maxPhotosAllowed) {
      alert(`Tu plan actual (${currentPlan.name}) permite un máximo de ${maxPhotosAllowed} fotos.`);
      return;
    }
    setFormData(prev => ({ ...prev, gallery: [...prev.gallery, newGalleryUrl.trim()] }));
    setNewGalleryUrl('');
  };

  const handleRemoveGalleryPhoto = (index) => {
    setFormData(prev => ({ ...prev, gallery: prev.gallery.filter((_, i) => i !== index) }));
  };

  const toggleBusinessTag = (tagLabel) => {
    setFormData(prev => ({
      ...prev,
      tags: prev.tags.includes(tagLabel)
        ? prev.tags.filter(t => t !== tagLabel)
        : [...prev.tags, tagLabel]
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    updateBusiness({ ...currentBiz, ...formData });
    setSaved(true);
    setTimeout(() => setSaved(false), 3000);
  };

  const currentCategoryObj = categories.find(c => c.id === formData.categoryId || c.name === formData.categoryName);
  const subcategoriesList = currentCategoryObj?.subcategories || [];

  return (
    <div className="flex-1 bg-surface pb-24 md:pb-16 animate-in fade-in">
      <MerchantNav />

      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 pt-6 space-y-6">
        
        {/* Header Summary */}
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 bg-surface-container-lowest p-5 rounded-3xl border border-surface-container-high shadow-subtle">
          <div>
            <div className="flex items-center gap-2">
              <span className="px-2.5 py-0.5 rounded-full bg-amber-100 text-amber-900 text-xs font-extrabold uppercase">
                Configuración de Perfil
              </span>
              <span className="px-2.5 py-0.5 rounded-full bg-indigo-100 text-indigo-900 text-xs font-bold">
                Plan: {currentPlan?.name || 'Pro'}
              </span>
            </div>
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

            {/* Category, Subcategory & Location */}
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
              <div>
                <label className="font-bold text-on-surface block mb-1">Rubro / Categoría *</label>
                <select
                  value={formData.categoryId}
                  onChange={e => {
                    const selectedCat = categories.find(c => c.id === e.target.value);
                    setFormData({
                      ...formData,
                      categoryId: e.target.value,
                      categoryName: selectedCat ? selectedCat.name : formData.categoryName,
                      subcategory: ''
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
                <label className="font-bold text-on-surface block mb-1">Subcategoría Específica</label>
                <select
                  value={formData.subcategory}
                  onChange={e => setFormData({ ...formData, subcategory: e.target.value })}
                  className="w-full px-3 py-2 rounded-xl bg-surface border border-surface-container-high text-on-surface focus:outline-none focus:border-primary font-medium"
                >
                  <option value="">Seleccionar subcategoría...</option>
                  {subcategoriesList.map(sub => (
                    <option key={sub} value={sub}>{sub}</option>
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

          {/* Business Tags / Badges (SC-13) */}
          <div className="bg-surface-container-lowest p-5 sm:p-6 rounded-3xl border border-surface-container-high space-y-4 shadow-subtle text-xs">
            <div className="flex items-center gap-2">
              <Tag className="w-5 h-5 text-amber-600" />
              <h3 className="text-sm font-extrabold text-on-surface uppercase tracking-wider">
                Etiquetas & Distintivos Destacados
              </h3>
            </div>
            <p className="text-on-surface-variant">Seleccioná los distintivos que caracterizan a tu local o servicio:</p>

            <div className="flex flex-wrap gap-2 pt-1">
              {tags.map(tg => {
                const isSelected = formData.tags.includes(tg.label);
                return (
                  <button
                    key={tg.id}
                    type="button"
                    onClick={() => toggleBusinessTag(tg.label)}
                    className={`px-3 py-1.5 rounded-xl text-xs font-bold transition-all flex items-center gap-1.5 ${
                      isSelected
                        ? 'bg-amber-600 text-white shadow-xs'
                        : 'bg-surface border border-surface-container-high text-on-surface hover:bg-surface-container'
                    }`}
                  >
                    <span>{tg.emoji}</span>
                    <span>{tg.label}</span>
                    {isSelected && <Check className="w-3.5 h-3.5 ml-0.5" />}
                  </button>
                );
              })}
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
                  className="w-full px-3 py-2 rounded-xl bg-surface border border-surface-container-high text-on-surface focus:outline-none focus:border-primary font-mono"
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

          {/* Visual Assets & Photo Upload (SC-19) */}
          <div className="bg-surface-container-lowest p-5 sm:p-6 rounded-3xl border border-surface-container-high space-y-4 shadow-subtle text-xs">
            <div className="flex items-center justify-between">
              <div>
                <h3 className="text-sm font-extrabold text-on-surface uppercase tracking-wider">
                  Imágenes, Portada & Galería Multimedia
                </h3>
                <p className="text-on-surface-variant mt-0.5">
                  Podés subir imágenes directamente desde tu dispositivo o pegar enlaces web.
                </p>
              </div>
              <span className="px-2.5 py-1 rounded-full bg-amber-50 text-amber-900 border border-amber-200 text-[11px] font-bold">
                Límite de tu plan: {maxPhotosAllowed} fotos
              </span>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 pt-2">
              {/* Logo / Avatar Upload */}
              <div className="p-4 rounded-2xl bg-surface border border-surface-container-high space-y-3">
                <label className="font-bold text-on-surface block">Logo o Foto de Perfil (Avatar)</label>
                {formData.logoUrl && (
                  <div className="w-16 h-16 rounded-2xl overflow-hidden border border-surface-container-high shadow-xs">
                    <img src={formData.logoUrl} alt="Logo" className="w-full h-full object-cover" />
                  </div>
                )}
                <div className="flex items-center gap-2">
                  <label className="px-3 py-2 rounded-xl bg-surface-container hover:bg-surface-container-high text-on-surface font-bold text-xs cursor-pointer flex items-center gap-1.5 transition-colors">
                    <Upload className="w-3.5 h-3.5" />
                    <span>Subir desde dispositivo</span>
                    <input type="file" accept="image/*" className="hidden" onChange={e => handleFileUpload(e, 'logoUrl')} />
                  </label>
                </div>
                <input
                  type="text"
                  value={formData.logoUrl}
                  onChange={e => setFormData({ ...formData, logoUrl: e.target.value })}
                  placeholder="O pegar URL del logo..."
                  className="w-full px-3 py-1.5 rounded-xl bg-surface-container-lowest border border-surface-container-high text-[11px]"
                />
              </div>

              {/* Cover Photo Upload */}
              <div className="p-4 rounded-2xl bg-surface border border-surface-container-high space-y-3">
                <label className="font-bold text-on-surface block">Foto de Portada Principal</label>
                {formData.coverUrl && (
                  <div className="h-16 w-full rounded-xl overflow-hidden border border-surface-container-high shadow-xs">
                    <img src={formData.coverUrl} alt="Portada" className="w-full h-full object-cover" />
                  </div>
                )}
                <div className="flex items-center gap-2">
                  <label className="px-3 py-2 rounded-xl bg-surface-container hover:bg-surface-container-high text-on-surface font-bold text-xs cursor-pointer flex items-center gap-1.5 transition-colors">
                    <Upload className="w-3.5 h-3.5" />
                    <span>Subir desde dispositivo</span>
                    <input type="file" accept="image/*" className="hidden" onChange={e => handleFileUpload(e, 'coverUrl')} />
                  </label>
                </div>
                <input
                  type="text"
                  value={formData.coverUrl}
                  onChange={e => setFormData({ ...formData, coverUrl: e.target.value })}
                  placeholder="O pegar URL de la portada..."
                  className="w-full px-3 py-1.5 rounded-xl bg-surface-container-lowest border border-surface-container-high text-[11px]"
                />
              </div>
            </div>

            {/* Gallery Photos List */}
            <div className="p-4 rounded-2xl bg-surface border border-surface-container-high space-y-3 pt-3">
              <div className="flex items-center justify-between">
                <label className="font-bold text-on-surface block">
                  Galería de Fotos ({formData.gallery.length} / {maxPhotosAllowed})
                </label>
                <label className="px-3 py-1.5 rounded-xl bg-amber-50 hover:bg-amber-100 text-amber-900 border border-amber-300 font-bold text-xs cursor-pointer flex items-center gap-1.5 transition-colors">
                  <Plus className="w-3.5 h-3.5" />
                  <span>Subir foto a galería</span>
                  <input type="file" accept="image/*" className="hidden" onChange={e => handleFileUpload(e, 'gallery')} />
                </label>
              </div>

              <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 pt-1">
                {formData.gallery.map((photoUrl, idx) => (
                  <div key={idx} className="relative group h-24 rounded-2xl overflow-hidden border border-surface-container-high bg-slate-900">
                    <img src={photoUrl} alt={`Foto ${idx + 1}`} className="w-full h-full object-cover" />
                    <button
                      type="button"
                      onClick={() => handleRemoveGalleryPhoto(idx)}
                      className="absolute top-1.5 right-1.5 p-1 rounded-full bg-rose-600 text-white opacity-0 group-hover:opacity-100 transition-opacity shadow-sm"
                      title="Eliminar foto"
                    >
                      <Trash2 className="w-3 h-3" />
                    </button>
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* Bottom Save Button (SC-4) */}
          <div className="flex justify-end pt-2">
            <button
              type="submit"
              className={`px-8 py-3.5 rounded-2xl text-xs sm:text-sm font-extrabold flex items-center gap-2 transition-all shadow-md active:scale-95 ${
                saved 
                  ? 'bg-emerald-600 text-white shadow-emerald-900/20' 
                  : 'bg-amber-600 hover:bg-amber-500 text-white shadow-amber-900/20'
              }`}
            >
              {saved ? <Check className="w-5 h-5" /> : <Save className="w-5 h-5" />}
              <span>{saved ? '¡Configuración Guardada con Éxito!' : 'Guardar Configuración'}</span>
            </button>
          </div>

        </form>

      </div>
    </div>
  );
}
