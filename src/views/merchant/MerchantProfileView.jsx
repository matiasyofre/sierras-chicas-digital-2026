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
  ShieldCheck,
  Video,
  Truck,
  DollarSign,
  Info,
  Lock,
  ExternalLink
} from 'lucide-react';

export default function MerchantProfileView() {
  const { businesses, updateBusiness, categories, locations, plans, tags, currentUser } = useApp();
  const currentBiz = businesses.find(b => b.id === currentUser?.businessId) || businesses[0] || {};

  const currentPlan = plans.find(p => p.id === currentBiz.planId || p.slug === currentBiz.planName) || plans[1];
  const maxPhotosAllowed = currentPlan?.maxPhotos || 10;

  // Modality determined by plan
  const planDeterminedMode = currentPlan?.allowStoreCart
    ? 'tienda'
    : currentPlan?.allowServices
    ? 'servicios'
    : 'aviso';

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
    videoUrl: currentBiz.videoUrl || '',
    openingHours: currentBiz.openingHours || 'Lunes a Viernes: 08:30 - 13:00 / 16:30 - 20:30\nSábados: 09:00 - 13:30\nDomingos: Cerrado',
    businessMode: currentBiz.businessMode || planDeterminedMode,
    logoUrl: currentBiz.logoUrl || '',
    coverUrl: currentBiz.coverUrl || '',
    gallery: currentBiz.gallery || [],
    tags: currentBiz.tags || [],
    deliveryZones: currentBiz.deliveryZones || [
      { id: 'z1', name: 'Radio Céntrico (hasta 3km)', price: 1200 },
      { id: 'z2', name: 'Localidades Vecinas (hasta 8km)', price: 2200 }
    ],
    isFeatured: currentPlan?.allowFeatured || currentBiz.isFeatured || false,
    // Banner configuration (for plans with allowBannerAds)
    bannerAdTitle: currentBiz.bannerAdTitle || currentBiz.name || '',
    bannerAdSubtitle: currentBiz.bannerAdSubtitle || currentBiz.tagline || '',
    bannerAdTag: currentBiz.bannerAdTag || 'DESTACADO EN EL CORREDOR',
    bannerAdImage: currentBiz.bannerAdImage || currentBiz.coverUrl || '',
    bannerAdCtaText: currentBiz.bannerAdCtaText || 'Ver Propuesta'
  });

  const [newZoneName, setNewZoneName] = useState('');
  const [newZonePrice, setNewZonePrice] = useState('');

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

  const handleAddZone = () => {
    if (!newZoneName.trim() || !newZonePrice) return;
    const priceNum = parseInt(newZonePrice, 10) || 0;
    const newZone = {
      id: `zone-${Date.now()}`,
      name: newZoneName.trim(),
      price: priceNum
    };
    setFormData(prev => ({
      ...prev,
      deliveryZones: [...(prev.deliveryZones || []), newZone]
    }));
    setNewZoneName('');
    setNewZonePrice('');
  };

  const handleRemoveZone = (zoneId) => {
    setFormData(prev => ({
      ...prev,
      deliveryZones: (prev.deliveryZones || []).filter(z => z.id !== zoneId)
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
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 bg-white p-5 rounded-3xl border border-slate-200 shadow-xs">
          <div>
            <div className="flex items-center gap-2">
              <span className="px-2.5 py-0.5 rounded-full bg-amber-100 text-amber-900 text-xs font-extrabold uppercase">
                Configuración de Perfil
              </span>
              <span className="px-2.5 py-0.5 rounded-full bg-indigo-100 text-indigo-900 text-xs font-bold">
                Plan: {currentPlan?.name || 'Pro'}
              </span>
            </div>
            <h1 className="text-lg sm:text-xl font-extrabold text-slate-900 mt-1">
              Ficha del Negocio & Modalidad de Presencia
            </h1>
            <p className="text-xs text-slate-500 mt-0.5">
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
          
          {/* Business Mode Card (Determined by Plan as per PDF) */}
          <div className="bg-white p-5 sm:p-6 rounded-3xl border border-slate-200 space-y-4 shadow-xs">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-2">
                <Layers className="w-5 h-5 text-amber-600" />
                <h3 className="text-sm font-extrabold text-slate-900 uppercase tracking-wider">
                  Modalidad de Presencia (Definida por tu Plan)
                </h3>
              </div>
              <span className="inline-flex items-center gap-1 px-2.5 py-0.5 rounded-full bg-slate-100 text-slate-600 text-[10px] font-bold">
                <Lock className="w-3 h-3 text-slate-400" />
                Fijada por {currentPlan.name}
              </span>
            </div>
            
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
              {/* Opción 1: Aviso */}
              <div
                className={`p-4 rounded-2xl border text-left space-y-1.5 transition-all ${
                  formData.businessMode === 'aviso' || formData.businessMode === 'catalogo'
                    ? 'bg-amber-50/80 border-amber-500 shadow-sm ring-2 ring-amber-500/20'
                    : 'bg-slate-50 border-slate-200 opacity-60'
                }`}
              >
                <div className="flex items-center justify-between">
                  <span className="text-xs font-extrabold text-slate-900">📢 Aviso Publicitario</span>
                  {(formData.businessMode === 'aviso' || formData.businessMode === 'catalogo') && (
                    <CheckCircle2 className="w-4 h-4 text-amber-600 shrink-0" />
                  )}
                </div>
                <p className="text-[11px] text-slate-500 leading-relaxed">
                  Ficha institucional con fotos, datos y WhatsApp directo sin carrito de compras.
                </p>
              </div>

              {/* Opción 2: Tienda */}
              <div
                className={`p-4 rounded-2xl border text-left space-y-1.5 transition-all ${
                  formData.businessMode === 'tienda'
                    ? 'bg-amber-50/80 border-amber-500 shadow-sm ring-2 ring-amber-500/20'
                    : 'bg-slate-50 border-slate-200 opacity-60'
                }`}
              >
                <div className="flex items-center justify-between">
                  <span className="text-xs font-extrabold text-slate-900">🛍️ Tienda Virtual & Carrito</span>
                  {formData.businessMode === 'tienda' && <CheckCircle2 className="w-4 h-4 text-amber-600 shrink-0" />}
                </div>
                <p className="text-[11px] text-slate-500 leading-relaxed">
                  Catálogo interactivo con precios, stock, carrito lateral y checkout automático por WhatsApp.
                </p>
              </div>

              {/* Opción 3: Servicios */}
              <div
                className={`p-4 rounded-2xl border text-left space-y-1.5 transition-all ${
                  formData.businessMode === 'servicios'
                    ? 'bg-amber-50/80 border-amber-500 shadow-sm ring-2 ring-amber-500/20'
                    : 'bg-slate-50 border-slate-200 opacity-60'
                }`}
              >
                <div className="flex items-center justify-between">
                  <span className="text-xs font-extrabold text-slate-900">🔧 Servicios & Presupuesto</span>
                  {formData.businessMode === 'servicios' && <CheckCircle2 className="w-4 h-4 text-amber-600 shrink-0" />}
                </div>
                <p className="text-[11px] text-slate-500 leading-relaxed">
                  Para profesionales y oficios: cotizador y solicitud directa de presupuestos por WhatsApp.
                </p>
              </div>
            </div>
          </div>

          {/* General Information */}
          <div className="bg-white p-5 sm:p-6 rounded-3xl border border-slate-200 space-y-4 shadow-xs text-xs">
            <h3 className="text-sm font-extrabold text-slate-900 uppercase tracking-wider">
              Datos Generales del Comercio
            </h3>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div>
                <label className="font-bold text-slate-800 block mb-1">Nombre Comercial *</label>
                <input
                  type="text"
                  required
                  value={formData.name}
                  onChange={e => setFormData({ ...formData, name: e.target.value })}
                  className="w-full px-3 py-2 rounded-xl bg-slate-50 border border-slate-200 text-slate-900 focus:outline-none focus:border-emerald-600"
                />
              </div>

              <div>
                <label className="font-bold text-slate-800 block mb-1">Lema / Subtítulo Corto</label>
                <input
                  type="text"
                  value={formData.tagline}
                  onChange={e => setFormData({ ...formData, tagline: e.target.value })}
                  className="w-full px-3 py-2 rounded-xl bg-slate-50 border border-slate-200 text-slate-900 focus:outline-none focus:border-emerald-600"
                />
              </div>
            </div>

            {/* Category, Subcategory & Location */}
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
              <div>
                <label className="font-bold text-slate-800 block mb-1">Rubro / Categoría Principal *</label>
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
                  className="w-full px-3 py-2 rounded-xl bg-slate-50 border border-slate-200 text-slate-900 focus:outline-none focus:border-emerald-600 font-medium"
                >
                  {categories.map(cat => (
                    <option key={cat.id} value={cat.id}>
                      {cat.emoji} {cat.name}
                    </option>
                  ))}
                </select>
              </div>

              <div>
                <label className="font-bold text-slate-800 block mb-1">Subcategoría Específica</label>
                <select
                  value={formData.subcategory}
                  onChange={e => setFormData({ ...formData, subcategory: e.target.value })}
                  className="w-full px-3 py-2 rounded-xl bg-slate-50 border border-slate-200 text-slate-900 focus:outline-none focus:border-emerald-600 font-medium"
                >
                  <option value="">Seleccionar subcategoría...</option>
                  {subcategoriesList.map(sub => (
                    <option key={sub} value={sub}>{sub}</option>
                  ))}
                </select>
              </div>

              <div>
                <label className="font-bold text-slate-800 block mb-1">Localidad en Sierras Chicas *</label>
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
                  className="w-full px-3 py-2 rounded-xl bg-slate-50 border border-slate-200 text-slate-900 focus:outline-none focus:border-emerald-600 font-medium"
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
              <label className="font-bold text-slate-800 block mb-1">Descripción Completa</label>
              <textarea
                rows={3}
                value={formData.description}
                onChange={e => setFormData({ ...formData, description: e.target.value })}
                className="w-full px-3 py-2 rounded-xl bg-slate-50 border border-slate-200 text-slate-900 focus:outline-none focus:border-emerald-600"
              />
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div>
                <label className="font-bold text-slate-800 block mb-1">Dirección Física</label>
                <input
                  type="text"
                  value={formData.address}
                  onChange={e => setFormData({ ...formData, address: e.target.value })}
                  className="w-full px-3 py-2 rounded-xl bg-slate-50 border border-slate-200 text-slate-900 focus:outline-none focus:border-emerald-600"
                />
              </div>

              {/* Multi-line Opening Hours Editor */}
              <div>
                <label className="font-bold text-slate-800 block mb-1">Horarios de Atención (Múltiples franjas y días)</label>
                <textarea
                  rows={3}
                  value={formData.openingHours}
                  onChange={e => setFormData({ ...formData, openingHours: e.target.value })}
                  placeholder="Ej:&#10;Lun a Vie: 09:00 - 13:00 / 17:00 - 21:00&#10;Sábados: 09:00 - 13:30&#10;Domingos: Cerrado"
                  className="w-full px-3 py-2 rounded-xl bg-slate-50 border border-slate-200 text-slate-900 focus:outline-none focus:border-emerald-600 font-mono text-xs leading-relaxed"
                />
                <p className="text-[10px] text-slate-400 mt-0.5">
                  Podés ingresar varios renglones para especificar turnos de mañana, tarde y fines de semana.
                </p>
              </div>
            </div>
          </div>

          {/* Business Tags / Badges */}
          <div className="bg-white p-5 sm:p-6 rounded-3xl border border-slate-200 space-y-4 shadow-xs text-xs">
            <div className="flex items-center gap-2">
              <Tag className="w-5 h-5 text-amber-600" />
              <h3 className="text-sm font-extrabold text-slate-900 uppercase tracking-wider">
                Etiquetas & Distintivos Destacados
              </h3>
            </div>
            <p className="text-slate-500">Seleccioná los distintivos que caracterizan a tu local o servicio:</p>

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
                        : 'bg-slate-50 border border-slate-200 text-slate-800 hover:bg-slate-100'
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
          <div className="bg-white p-5 sm:p-6 rounded-3xl border border-slate-200 space-y-4 shadow-xs text-xs">
            <h3 className="text-sm font-extrabold text-slate-900 uppercase tracking-wider">
              Canales de Contacto & Redes
            </h3>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div>
                <label className="font-bold text-slate-800 block mb-1">Número de WhatsApp (para pedidos) *</label>
                <input
                  type="text"
                  required
                  placeholder="5493543123456"
                  value={formData.whatsapp}
                  onChange={e => setFormData({ ...formData, whatsapp: e.target.value })}
                  className="w-full px-3 py-2 rounded-xl bg-slate-50 border border-slate-200 text-slate-900 focus:outline-none focus:border-emerald-600 font-mono"
                />
              </div>

              <div>
                <label className="font-bold text-slate-800 block mb-1">Instagram (@usuario)</label>
                <input
                  type="text"
                  placeholder="@cafesierras.cba"
                  value={formData.instagram}
                  onChange={e => setFormData({ ...formData, instagram: e.target.value })}
                  className="w-full px-3 py-2 rounded-xl bg-slate-50 border border-slate-200 text-slate-900 focus:outline-none focus:border-emerald-600"
                />
              </div>
            </div>
          </div>

          {/* Visual Assets & Photo Upload */}
          <div className="bg-white p-5 sm:p-6 rounded-3xl border border-slate-200 space-y-4 shadow-xs text-xs">
            <div className="flex items-center justify-between">
              <div>
                <h3 className="text-sm font-extrabold text-slate-900 uppercase tracking-wider">
                  Imágenes, Portada & Galería Multimedia
                </h3>
                <p className="text-slate-500 mt-0.5">
                  Límite según tu plan actual: {maxPhotosAllowed} fotos.
                </p>
              </div>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div>
                <label className="font-bold text-slate-800 block mb-1">Logo / Avatar Comercial (URL)</label>
                <input
                  type="text"
                  value={formData.logoUrl}
                  onChange={e => setFormData({ ...formData, logoUrl: e.target.value })}
                  className="w-full px-3 py-2 rounded-xl bg-slate-50 border border-slate-200 text-slate-900 focus:outline-none focus:border-emerald-600"
                />
              </div>

              <div>
                <label className="font-bold text-slate-800 block mb-1">Foto de Portada Principal (URL)</label>
                <input
                  type="text"
                  value={formData.coverUrl}
                  onChange={e => setFormData({ ...formData, coverUrl: e.target.value })}
                  className="w-full px-3 py-2 rounded-xl bg-slate-50 border border-slate-200 text-slate-900 focus:outline-none focus:border-emerald-600"
                />
              </div>
            </div>

            {/* Gallery list */}
            <div className="space-y-2 pt-2">
              <label className="font-bold text-slate-800 block">Galería de Fotos ({formData.gallery.length} de {maxPhotosAllowed})</label>
              <div className="flex items-center gap-2">
                <input
                  type="text"
                  value={newGalleryUrl}
                  onChange={e => setNewGalleryUrl(e.target.value)}
                  placeholder="Pegar enlace de imagen (https://...)"
                  className="flex-1 px-3 py-2 rounded-xl bg-slate-50 border border-slate-200 text-slate-900 focus:outline-none"
                />
                <button
                  type="button"
                  onClick={handleAddGalleryUrl}
                  className="px-4 py-2 rounded-xl bg-slate-900 text-white font-bold text-xs hover:bg-slate-800"
                >
                  Agregar Foto
                </button>
              </div>

              <div className="grid grid-cols-3 sm:grid-cols-6 gap-2 pt-2">
                {formData.gallery.map((img, idx) => (
                  <div key={idx} className="relative rounded-xl overflow-hidden aspect-square border border-slate-200 group">
                    <img src={img} alt="Galería" className="w-full h-full object-cover" />
                    <button
                      type="button"
                      onClick={() => handleRemoveGalleryPhoto(idx)}
                      className="absolute inset-0 bg-rose-900/80 text-white flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity"
                    >
                      <Trash2 className="w-4 h-4" />
                    </button>
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* Delivery Zones */}
          {currentPlan?.allowDeliveryZones && (
            <div className="bg-white p-5 sm:p-6 rounded-3xl border border-slate-200 space-y-4 shadow-xs text-xs">
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-2">
                  <Truck className="w-5 h-5 text-teal-600" />
                  <h3 className="text-sm font-extrabold text-slate-900 uppercase tracking-wider">
                    Tarifas & Zonas de Delivery
                  </h3>
                </div>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-12 gap-3 items-center">
                <div className="sm:col-span-7">
                  <label className="font-bold text-slate-700 block mb-1">Nombre de la Zona</label>
                  <input
                    type="text"
                    placeholder="Ej: Villa Allende Golf, Mendiolaza Centro..."
                    value={newZoneName}
                    onChange={e => setNewZoneName(e.target.value)}
                    className="w-full px-3 py-2 rounded-xl bg-slate-50 border border-slate-200"
                  />
                </div>
                <div className="sm:col-span-3">
                  <label className="font-bold text-slate-700 block mb-1">Costo Flete ($)</label>
                  <input
                    type="number"
                    placeholder="1500"
                    value={newZonePrice}
                    onChange={e => setNewZonePrice(e.target.value)}
                    className="w-full px-3 py-2 rounded-xl bg-slate-50 border border-slate-200"
                  />
                </div>
                <div className="sm:col-span-2 pt-5">
                  <button
                    type="button"
                    onClick={handleAddZone}
                    className="w-full py-2 rounded-xl bg-teal-600 hover:bg-teal-500 text-white font-bold"
                  >
                    Agregar
                  </button>
                </div>
              </div>

              <div className="space-y-2 pt-1">
                {(formData.deliveryZones || []).map((zone) => (
                  <div
                    key={zone.id}
                    className="flex items-center justify-between p-3 rounded-2xl bg-slate-50 border border-slate-200"
                  >
                    <div>
                      <span className="font-bold text-slate-900 block">{zone.name}</span>
                    </div>
                    <div className="flex items-center gap-3">
                      <span className="font-black text-teal-800">${zone.price.toLocaleString('es-AR')}</span>
                      <button
                        type="button"
                        onClick={() => handleRemoveZone(zone.id)}
                        className="text-rose-600 p-1"
                      >
                        <Trash2 className="w-4 h-4" />
                      </button>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* Conditional Sponsored Banner Carousel Form (Only if contracted in plan) */}
          {currentPlan?.allowBannerAds ? (
            <div className="bg-gradient-to-br from-amber-500/10 via-white to-amber-500/10 p-5 sm:p-6 rounded-3xl border border-amber-300 space-y-4 shadow-sm text-xs">
              <div className="flex items-center gap-2">
                <Sparkles className="w-5 h-5 text-amber-600" />
                <div>
                  <h3 className="text-sm font-extrabold text-slate-900 uppercase tracking-wider">
                    Configuración de Carrusel Publicitario (Pauta Incluida en tu Plan)
                  </h3>
                  <p className="text-slate-500">
                    Completá los datos de tu banner para la vitrina comercial en la portada de Sierras Chicas Digital.
                  </p>
                </div>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 pt-1">
                <div>
                  <label className="font-bold text-slate-800 block mb-1">Título del Banner Publicitario *</label>
                  <input
                    type="text"
                    value={formData.bannerAdTitle}
                    onChange={e => setFormData({ ...formData, bannerAdTitle: e.target.value })}
                    className="w-full px-3 py-2 rounded-xl bg-white border border-slate-300 font-bold"
                  />
                </div>

                <div>
                  <label className="font-bold text-slate-800 block mb-1">Etiqueta Superior (Ej: PROMO SERRANA)</label>
                  <input
                    type="text"
                    value={formData.bannerAdTag}
                    onChange={e => setFormData({ ...formData, bannerAdTag: e.target.value })}
                    className="w-full px-3 py-2 rounded-xl bg-white border border-slate-300 font-bold uppercase"
                  />
                </div>
              </div>

              <div>
                <label className="font-bold text-slate-800 block mb-1">Subtítulo / Bajada Atractiva *</label>
                <input
                  type="text"
                  value={formData.bannerAdSubtitle}
                  onChange={e => setFormData({ ...formData, bannerAdSubtitle: e.target.value })}
                  className="w-full px-3 py-2 rounded-xl bg-white border border-slate-300"
                />
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="font-bold text-slate-800 block mb-1">Foto del Banner (Alta Resolución)</label>
                  <input
                    type="text"
                    value={formData.bannerAdImage}
                    onChange={e => setFormData({ ...formData, bannerAdImage: e.target.value })}
                    className="w-full px-3 py-2 rounded-xl bg-white border border-slate-300"
                  />
                </div>

                <div>
                  <label className="font-bold text-slate-800 block mb-1">Texto del Botón CTA (Ej: Ver Carta)</label>
                  <input
                    type="text"
                    value={formData.bannerAdCtaText}
                    onChange={e => setFormData({ ...formData, bannerAdCtaText: e.target.value })}
                    className="w-full px-3 py-2 rounded-xl bg-white border border-slate-300 font-bold"
                  />
                </div>
              </div>
            </div>
          ) : null}

          {/* Posicionamiento Destacado Benefit Indicator */}
          <div className="bg-white p-5 sm:p-6 rounded-3xl border border-slate-200 space-y-2 shadow-xs text-xs">
            <div className="flex items-center gap-2">
              <Sparkles className="w-5 h-5 text-amber-600" />
              <h3 className="text-sm font-extrabold text-slate-900 uppercase tracking-wider">
                Presencia & Posicionamiento en el Corredor
              </h3>
            </div>
            <div className="flex items-center justify-between p-3.5 rounded-2xl bg-slate-50 border border-slate-200">
              <div>
                <span className="font-bold text-slate-900 text-xs block">
                  Estado de Destacado: {currentPlan?.allowFeatured ? '⭐ Destacado Activo' : '⚪ Estándar'}
                </span>
                <span className="text-[11px] text-slate-500">
                  {currentPlan?.allowFeatured 
                    ? `Incluido en tu plan ${currentPlan.name}. Tu ficha aparece priorizada en búsquedas y radar.`
                    : 'Para aparecer en las primeras posiciones y en el carrusel de novedades, actualizá a un plan superior.'}
                </span>
              </div>
              <span className={`px-2.5 py-1 rounded-xl text-xs font-bold ${
                currentPlan?.allowFeatured ? 'bg-emerald-100 text-emerald-900' : 'bg-slate-200 text-slate-700'
              }`}>
                {currentPlan?.allowFeatured ? 'Activado por Plan' : 'Plan Estándar'}
              </span>
            </div>
          </div>

          {/* Bottom Save Button */}
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
