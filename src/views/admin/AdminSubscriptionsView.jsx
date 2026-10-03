import React, { useState } from 'react';
import AdminSidebar from '../../components/admin/AdminSidebar';
import { useApp } from '../../context/AppContext';
import { 
  Receipt, 
  CheckCircle2, 
  TrendingUp, 
  DollarSign, 
  Sparkles, 
  Clock,
  ArrowUpRight,
  Edit2,
  X,
  ExternalLink,
  ShieldCheck,
  Image as ImageIcon,
  Sliders,
  Plus,
  Trash2,
  Video,
  ShoppingBag,
  Radio,
  Tag,
  MapPin,
  Flame
} from 'lucide-react';

export default function AdminSubscriptionsView() {
  const { 
    plans, 
    updatePlan, 
    businesses, 
    settings, 
    updateSettings, 
    sponsoredBanners, 
    updateSponsoredBanners,
    addSponsoredBanner,
    deleteSponsoredBanner
  } = useApp();

  const [activeTab, setActiveTab] = useState('plans'); // 'plans' | 'simulator' | 'banners'
  const [editingPlan, setEditingPlan] = useState(null);
  
  // Edit plan form state
  const [editFormData, setEditFormData] = useState({
    name: '',
    slug: '',
    priceArs: 0,
    description: '',
    maxProducts: 20,
    maxPhotos: 5,
    maxVideos: 1,
    allowFeatured: false,
    allowTags: true,
    allowGondolaLive: false,
    allowBannerAds: false,
    allowDeliveryZones: false,
    allowInstagram: true,
    allowVerifiedBadge: true,
    allowQuoteRequests: true,
    allowStoreCart: false,
    allowPosKanban: false,
    allowPaymentLinks: false,
    mpCheckoutUrl: '',
    featuresText: ''
  });

  // Simulator levels state
  const [simulatorLevelsData, setSimulatorLevelsData] = useState(() => 
    settings?.simulatorLevels || [
      {
        id: 'inicial',
        levelTag: 'NIVEL 1: PRESENCIA BÁSICA',
        title: 'Profesionales & Avisos',
        description: 'Aparición en el directorio, SEO local y botón directo a WhatsApp.',
        planRef: 'plan-1'
      },
      {
        id: 'pro',
        levelTag: 'NIVEL 2: COMERCIO ACTIVO (RECOMENDADO)',
        title: 'Góndola & Pedidos Online',
        description: 'Carta/catálogo digital con carrito de compras, comandas POS y pedidos por WhatsApp.',
        planRef: 'plan-2'
      },
      {
        id: 'full',
        levelTag: 'NIVEL 3: MÁXIMA TRACCIÓN',
        title: 'Multi-Sucursal & Banner Destacado',
        description: 'Posicionamiento VIP prioritario en búsquedas, pauta en carrusel y asesoría.',
        planRef: 'plan-3'
      }
    ]
  );
  const [simSaved, setSimSaved] = useState(false);

  // New Banner state
  const [newBanner, setNewBanner] = useState({
    title: '',
    subtitle: '',
    badge: 'Pauta Destacada',
    tag: 'Gastronomía',
    imageUrl: 'https://images.unsplash.com/photo-1501339847302-ac426a4a7cbb?w=1200&auto=format&fit=crop&q=80',
    link: '/',
    ctaText: 'Ver Comercio',
    location: 'Río Ceballos'
  });
  const [showAddBannerModal, setShowAddBannerModal] = useState(false);

  // Calculate MRR
  const totalMRR = businesses.reduce((acc, biz) => {
    const bizPlan = plans.find(p => p.id === biz.planId || p.name.toLowerCase().includes((biz.planName || '').toLowerCase()));
    return acc + (bizPlan ? bizPlan.priceArs : 19900);
  }, 0);

  const handleOpenEdit = (plan) => {
    setEditingPlan(plan);
    setEditFormData({
      name: plan.name || '',
      slug: plan.slug || '',
      priceArs: plan.priceArs || 0,
      description: plan.description || '',
      maxProducts: plan.maxProducts || 20,
      maxPhotos: plan.maxPhotos || 5,
      maxVideos: plan.maxVideos || 1,
      allowFeatured: !!plan.allowFeatured,
      allowTags: plan.allowTags !== undefined ? plan.allowTags : true,
      allowGondolaLive: !!plan.allowGondolaLive,
      allowBannerAds: !!plan.allowBannerAds,
      allowDeliveryZones: !!plan.allowDeliveryZones,
      allowInstagram: plan.allowInstagram !== undefined ? plan.allowInstagram : true,
      allowVerifiedBadge: plan.allowVerifiedBadge !== undefined ? plan.allowVerifiedBadge : true,
      allowQuoteRequests: plan.allowQuoteRequests !== undefined ? plan.allowQuoteRequests : true,
      allowStoreCart: !!plan.allowStoreCart,
      allowPosKanban: !!plan.allowPosKanban,
      allowPaymentLinks: !!plan.allowPaymentLinks,
      mpCheckoutUrl: plan.mpCheckoutUrl || plan.checkoutUrl || 'https://mpago.la/sierras-chicas-saas',
      featuresText: (plan.features || []).join('\n')
    });
  };

  const handleSavePlan = (e) => {
    e.preventDefault();
    if (!editingPlan) return;

    const updatedFeatures = editFormData.featuresText
      .split('\n')
      .map(f => f.trim())
      .filter(Boolean);

    updatePlan({
      ...editingPlan,
      name: editFormData.name,
      slug: editFormData.slug,
      priceArs: Number(editFormData.priceArs) || 0,
      description: editFormData.description,
      maxProducts: Number(editFormData.maxProducts) || 20,
      maxPhotos: Number(editFormData.maxPhotos) || 5,
      maxVideos: Number(editFormData.maxVideos) || 1,
      allowFeatured: editFormData.allowFeatured,
      allowTags: editFormData.allowTags,
      allowGondolaLive: editFormData.allowGondolaLive,
      allowBannerAds: editFormData.allowBannerAds,
      allowDeliveryZones: editFormData.allowDeliveryZones,
      allowInstagram: editFormData.allowInstagram,
      allowVerifiedBadge: editFormData.allowVerifiedBadge,
      allowQuoteRequests: editFormData.allowQuoteRequests,
      allowStoreCart: editFormData.allowStoreCart,
      allowPosKanban: editFormData.allowPosKanban,
      allowPaymentLinks: editFormData.allowPaymentLinks,
      mpCheckoutUrl: editFormData.mpCheckoutUrl.trim(),
      checkoutUrl: editFormData.mpCheckoutUrl.trim(),
      features: updatedFeatures
    });

    setEditingPlan(null);
  };

  const handleSaveSimulatorLevels = (e) => {
    e.preventDefault();
    updateSettings({ simulatorLevels: simulatorLevelsData });
    setSimSaved(true);
    setTimeout(() => setSimSaved(false), 3000);
  };

  const handleCreateBanner = (e) => {
    e.preventDefault();
    if (!newBanner.title.trim()) return;
    addSponsoredBanner(newBanner);
    setShowAddBannerModal(false);
    setNewBanner({
      title: '',
      subtitle: '',
      badge: 'Pauta Destacada',
      tag: 'Gastronomía',
      imageUrl: 'https://images.unsplash.com/photo-1501339847302-ac426a4a7cbb?w=1200&auto=format&fit=crop&q=80',
      link: '/',
      ctaText: 'Ver Comercio',
      location: 'Río Ceballos'
    });
  };

  return (
    <div className="flex-1 bg-surface flex flex-col lg:flex-row min-h-screen animate-in fade-in">
      <AdminSidebar />

      <main className="flex-1 p-4 sm:p-6 lg:p-8 space-y-6 overflow-y-auto max-w-7xl">
        
        {/* Header Bar */}
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-4 border-b border-surface-container-high">
          <div>
            <div className="flex items-center gap-2 text-indigo-600 mb-1">
              <Receipt className="w-5 h-5" />
              <span className="text-xs font-black uppercase tracking-wider">Gestión de Planes & Facturación SaaS</span>
            </div>
            <h1 className="text-xl sm:text-2xl font-extrabold text-on-surface tracking-tight">
              Suscripciones, Funcionalidades & Pauta
            </h1>
            <p className="text-xs text-on-surface-variant mt-0.5">
              Administrá los planes comerciales, límites técnicos, niveles del simulador y carrusel de pauta
            </p>
          </div>

          <div className="flex items-center gap-3">
            <div className="px-4 py-2 rounded-2xl bg-emerald-50 border border-emerald-200 text-emerald-800 text-xs font-extrabold flex items-center gap-2 shadow-xs">
              <TrendingUp className="w-4 h-4 text-emerald-600" />
              <span>MRR Real: ${totalMRR.toLocaleString('es-AR')} / mes</span>
            </div>
          </div>
        </div>

        {/* View Switcher Tabs */}
        <div className="flex items-center gap-2 border-b border-surface-container-high pb-2">
          <button
            type="button"
            onClick={() => setActiveTab('plans')}
            className={`px-4 py-2 rounded-xl text-xs font-extrabold transition-colors ${
              activeTab === 'plans'
                ? 'bg-indigo-600 text-white shadow-sm'
                : 'bg-surface-container-low text-on-surface hover:bg-surface-container'
            }`}
          >
            📋 Planes Comerciales ({plans.length})
          </button>
          <button
            type="button"
            onClick={() => setActiveTab('simulator')}
            className={`px-4 py-2 rounded-xl text-xs font-extrabold transition-colors ${
              activeTab === 'simulator'
                ? 'bg-indigo-600 text-white shadow-sm'
                : 'bg-surface-container-low text-on-surface hover:bg-surface-container'
            }`}
          >
            🚀 Niveles del Simulador de Crecimiento
          </button>
          <button
            type="button"
            onClick={() => setActiveTab('banners')}
            className={`px-4 py-2 rounded-xl text-xs font-extrabold transition-colors ${
              activeTab === 'banners'
                ? 'bg-indigo-600 text-white shadow-sm'
                : 'bg-surface-container-low text-on-surface hover:bg-surface-container'
            }`}
          >
            ⭐ Carrusel de Pauta Publicitaria ({sponsoredBanners?.length || 0})
          </button>
        </div>

        {/* TAB 1: PLANS MANAGEMENT */}
        {activeTab === 'plans' && (
          <div className="space-y-6">
            {/* 3 SaaS Plans Cards */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-5">
              {plans.map(plan => (
                <div
                  key={plan.id}
                  className={`p-5 sm:p-6 rounded-3xl border flex flex-col justify-between space-y-4 shadow-subtle transition-all ${
                    plan.isFeatured
                      ? 'bg-gradient-to-b from-indigo-950 via-slate-900 to-slate-950 text-white border-indigo-500 ring-2 ring-indigo-500/30'
                      : 'bg-surface-container-lowest text-on-surface border-surface-container-high'
                  }`}
                >
                  <div className="space-y-3">
                    <div className="flex items-center justify-between">
                      <span className={`px-2.5 py-0.5 rounded-full text-[10px] font-extrabold uppercase ${
                        plan.isFeatured ? 'bg-indigo-600 text-white' : 'bg-surface-container text-outline'
                      }`}>
                        {plan.slug}
                      </span>
                      <span className="text-xs font-bold opacity-80">{plan.activeMerchants || businesses.length} comercios</span>
                    </div>

                    <div>
                      <h3 className="text-lg font-extrabold">{plan.name}</h3>
                      <div className="grid grid-cols-2 gap-1 text-[11px] opacity-80 mt-1">
                        <span>📸 Fotos: {plan.maxPhotos || 5}</span>
                        <span>📦 Productos: {plan.maxProducts || 20}</span>
                        <span>🎥 Videos: {plan.maxVideos || 1}</span>
                        <span>⭐ Destacado: {plan.allowFeatured ? 'Sí' : 'No'}</span>
                        <span>🛵 Delivery: {plan.allowDeliveryZones ? 'Zonas' : 'Básico'}</span>
                        <span>📢 Carrusel: {plan.allowBannerAds ? 'Incluye' : 'No'}</span>
                      </div>
                    </div>

                    <div className="flex items-baseline gap-1 py-1">
                      <span className="text-2xl sm:text-3xl font-black tracking-tight">
                        ${plan.priceArs.toLocaleString('es-AR')}
                      </span>
                      <span className="text-xs opacity-70">/ mes</span>
                    </div>

                    <div className="pt-2 border-t border-surface-container-high/40">
                      <span className="text-[10px] font-extrabold uppercase tracking-wider opacity-60">Funcionalidades activas:</span>
                      <ul className="space-y-1.5 text-xs pt-2">
                        {plan.features.slice(0, 5).map((feat, i) => (
                          <li key={i} className="flex items-start gap-2">
                            <CheckCircle2 className={`w-3.5 h-3.5 shrink-0 mt-0.5 ${plan.isFeatured ? 'text-indigo-400' : 'text-emerald-600'}`} />
                            <span className="leading-tight">{feat}</span>
                          </li>
                        ))}
                      </ul>
                    </div>

                    {plan.mpCheckoutUrl && (
                      <div className="pt-2">
                        <a
                          href={plan.mpCheckoutUrl}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="text-[11px] text-indigo-400 hover:text-indigo-300 flex items-center gap-1 font-semibold truncate"
                        >
                          <ExternalLink className="w-3 h-3 shrink-0" />
                          <span className="truncate">Link MP: {plan.mpCheckoutUrl}</span>
                        </a>
                      </div>
                    )}
                  </div>

                  <button
                    type="button"
                    onClick={() => handleOpenEdit(plan)}
                    className={`w-full py-2.5 rounded-xl font-bold text-xs flex items-center justify-center gap-1.5 transition-all shadow-xs ${
                      plan.isFeatured
                        ? 'bg-indigo-600 hover:bg-indigo-500 text-white shadow-indigo-900/30'
                        : 'bg-surface hover:bg-surface-container text-on-surface border border-surface-container-high'
                    }`}
                  >
                    <Edit2 className="w-3.5 h-3.5" />
                    <span>Configurar Funciones & Precios</span>
                  </button>
                </div>
              ))}
            </div>

            {/* Subscriptions Table */}
            <div className="bg-surface-container-lowest rounded-3xl border border-surface-container-high overflow-hidden shadow-subtle space-y-3 p-4 sm:p-6">
              <div className="flex items-center justify-between">
                <h3 className="text-sm font-extrabold text-on-surface uppercase tracking-wider flex items-center gap-2">
                  <ShieldCheck className="w-4 h-4 text-emerald-600" />
                  <span>Padrón de Facturación & Cobros Activos</span>
                </h3>
                <span className="text-xs text-outline">{businesses.length} suscripciones</span>
              </div>

              <div className="overflow-x-auto">
                <table className="w-full text-left text-xs text-on-surface">
                  <thead className="bg-surface border-b border-surface-container-high font-extrabold uppercase tracking-wider text-outline text-[11px]">
                    <tr>
                      <th className="p-3">Comercio</th>
                      <th className="p-3">Localidad</th>
                      <th className="p-3">Plan Asignado</th>
                      <th className="p-3">Monto Recurrente</th>
                      <th className="p-3">Próximo Vencimiento</th>
                      <th className="p-3 text-center">Estado de Cobro</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-surface-container-high">
                    {businesses.map((biz) => {
                      const p = plans.find(pl => pl.id === biz.planId) || plans[1] || plans[0];
                      return (
                        <tr key={biz.id} className="hover:bg-surface/60 transition-colors">
                          <td className="p-3 font-bold text-on-surface">{biz.name}</td>
                          <td className="p-3 text-outline">{biz.location || 'Sierras Chicas'}</td>
                          <td className="p-3">
                            <span className="px-2 py-0.5 rounded-lg bg-indigo-50 text-indigo-700 font-bold text-[11px]">
                              {p?.name || 'Plan Pro'}
                            </span>
                          </td>
                          <td className="p-3 font-extrabold text-on-surface">${(p?.priceArs || 19900).toLocaleString('es-AR')}</td>
                          <td className="p-3 text-outline">28 de Octubre 2026</td>
                          <td className="p-3 text-center">
                            <span className="px-2.5 py-0.5 rounded-full bg-emerald-100 text-emerald-800 text-[10px] font-extrabold inline-flex items-center gap-1">
                              ✓ Al Día
                            </span>
                          </td>
                        </tr>
                      );
                    })}
                  </tbody>
                </table>
              </div>
            </div>
          </div>
        )}

        {/* TAB 2: SIMULATOR LEVELS CONFIGURATION */}
        {activeTab === 'simulator' && (
          <form onSubmit={handleSaveSimulatorLevels} className="space-y-6">
            <div className="bg-surface-container-lowest p-6 rounded-3xl border border-surface-container-high space-y-6 shadow-subtle">
              <div className="flex items-center justify-between">
                <div>
                  <h3 className="text-sm font-extrabold text-on-surface uppercase tracking-wider">
                    Configuración de Niveles del Simulador (Landing Page)
                  </h3>
                  <p className="text-xs text-on-surface-variant mt-0.5">
                    Personalizá los títulos, subtítulos y descripciones de los 3 niveles de crecimiento comercial
                  </p>
                </div>
                <button
                  type="submit"
                  className="px-5 py-2 rounded-xl bg-indigo-600 hover:bg-indigo-500 text-white text-xs font-black shadow-md"
                >
                  {simSaved ? '✓ ¡Niveles Guardados!' : 'Guardar Niveles'}
                </button>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                {simulatorLevelsData.map((lvl, index) => (
                  <div key={lvl.id} className="p-4 rounded-2xl bg-surface border border-surface-container-high space-y-3">
                    <span className="px-2 py-0.5 rounded-md bg-indigo-100 text-indigo-900 text-[10px] font-black uppercase">
                      Paso {index + 1}: {lvl.id}
                    </span>

                    <div>
                      <label className="text-[11px] font-bold text-on-surface-variant block mb-1">Etiqueta Superior</label>
                      <input
                        type="text"
                        value={lvl.levelTag}
                        onChange={e => {
                          const updated = [...simulatorLevelsData];
                          updated[index].levelTag = e.target.value;
                          setSimulatorLevelsData(updated);
                        }}
                        className="w-full px-3 py-1.5 rounded-xl bg-surface-container-lowest border border-surface-container-high text-xs font-bold"
                      />
                    </div>

                    <div>
                      <label className="text-[11px] font-bold text-on-surface-variant block mb-1">Título del Nivel</label>
                      <input
                        type="text"
                        value={lvl.title}
                        onChange={e => {
                          const updated = [...simulatorLevelsData];
                          updated[index].title = e.target.value;
                          setSimulatorLevelsData(updated);
                        }}
                        className="w-full px-3 py-1.5 rounded-xl bg-surface-container-lowest border border-surface-container-high text-xs font-extrabold"
                      />
                    </div>

                    <div>
                      <label className="text-[11px] font-bold text-on-surface-variant block mb-1">Descripción / Beneficios</label>
                      <textarea
                        rows={3}
                        value={lvl.description}
                        onChange={e => {
                          const updated = [...simulatorLevelsData];
                          updated[index].description = e.target.value;
                          setSimulatorLevelsData(updated);
                        }}
                        className="w-full px-3 py-1.5 rounded-xl bg-surface-container-lowest border border-surface-container-high text-xs font-medium"
                      />
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </form>
        )}

        {/* TAB 3: SPONSORED CAROUSEL BANNERS MANAGEMENT */}
        {activeTab === 'banners' && (
          <div className="space-y-6">
            <div className="flex items-center justify-between">
              <div>
                <h3 className="text-sm font-extrabold text-on-surface uppercase tracking-wider">
                  Banners Activos en el Carrusel de Landing
                </h3>
                <p className="text-xs text-on-surface-variant">
                  Publicidad y pauta destacada rotativa para comercios y marcas
                </p>
              </div>
              <button
                type="button"
                onClick={() => setShowAddBannerModal(true)}
                className="px-4 py-2 rounded-xl bg-indigo-600 hover:bg-indigo-500 text-white font-black text-xs flex items-center gap-1.5 shadow-md"
              >
                <Plus className="w-4 h-4" />
                <span>Agregar Nuevo Banner</span>
              </button>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
              {sponsoredBanners?.map(ban => (
                <div
                  key={ban.id}
                  className="bg-surface-container-lowest rounded-2xl border border-surface-container-high overflow-hidden shadow-subtle flex flex-col justify-between"
                >
                  <div className="relative h-36 w-full bg-slate-900">
                    <img src={ban.imageUrl} alt={ban.title} className="w-full h-full object-cover opacity-80" />
                    <span className="absolute top-2 left-2 px-2 py-0.5 rounded-md bg-amber-500 text-slate-950 font-black text-[10px]">
                      {ban.badge}
                    </span>
                    <button
                      type="button"
                      onClick={() => deleteSponsoredBanner(ban.id)}
                      className="absolute top-2 right-2 p-1 rounded-full bg-rose-600 text-white shadow-sm hover:bg-rose-500"
                      title="Eliminar banner"
                    >
                      <Trash2 className="w-3.5 h-3.5" />
                    </button>
                  </div>

                  <div className="p-4 space-y-2">
                    <span className="text-[10px] font-bold text-amber-600 block">{ban.tag} · {ban.location}</span>
                    <h4 className="font-extrabold text-xs text-on-surface">{ban.title}</h4>
                    <p className="text-[11px] text-on-surface-variant line-clamp-2">{ban.subtitle}</p>
                    <div className="pt-2 border-t border-surface-container-high flex items-center justify-between text-[11px]">
                      <span className="font-mono text-outline">{ban.link}</span>
                      <span className="font-bold text-indigo-600">{ban.ctaText} →</span>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* Modal Editar Plan Completo con TODAS las Funcionalidades */}
        {editingPlan && (
          <div className="fixed inset-0 z-50 bg-black/60 backdrop-blur-sm flex items-center justify-center p-4 animate-in fade-in overflow-y-auto">
            <div className="bg-surface-container-lowest w-full max-w-2xl rounded-3xl border border-surface-container-high shadow-2xl overflow-hidden animate-in zoom-in-95 my-8">
              <div className="p-5 border-b border-surface-container-high flex items-center justify-between bg-surface">
                <div className="flex items-center gap-2">
                  <Edit2 className="w-5 h-5 text-indigo-600" />
                  <h3 className="text-base font-extrabold text-on-surface">
                    Configurar Plan: {editingPlan.name}
                  </h3>
                </div>
                <button
                  type="button"
                  onClick={() => setEditingPlan(null)}
                  className="p-1 rounded-xl text-outline hover:text-on-surface hover:bg-surface-container transition-colors"
                >
                  <X className="w-5 h-5" />
                </button>
              </div>

              <form onSubmit={handleSavePlan} className="p-5 space-y-4 max-h-[80vh] overflow-y-auto text-xs">
                
                {/* General Info */}
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                  <div>
                    <label className="block font-bold text-on-surface-variant uppercase tracking-wider mb-1">
                      Nombre del Plan *
                    </label>
                    <input
                      type="text"
                      required
                      value={editFormData.name}
                      onChange={e => setEditFormData(prev => ({ ...prev, name: e.target.value }))}
                      className="w-full px-3.5 py-2 rounded-xl bg-surface border border-surface-container-high text-xs text-on-surface font-semibold"
                    />
                  </div>

                  <div>
                    <label className="block font-bold text-on-surface-variant uppercase tracking-wider mb-1">
                      Precio Mensual ($ ARS) *
                    </label>
                    <input
                      type="number"
                      required
                      min="0"
                      value={editFormData.priceArs}
                      onChange={e => setEditFormData(prev => ({ ...prev, priceArs: e.target.value }))}
                      className="w-full px-3.5 py-2 rounded-xl bg-surface border border-surface-container-high text-xs text-on-surface font-extrabold text-primary"
                    />
                  </div>
                </div>

                <div>
                  <label className="block font-bold text-on-surface-variant uppercase tracking-wider mb-1">
                    Descripción Corta
                  </label>
                  <input
                    type="text"
                    value={editFormData.description}
                    onChange={e => setEditFormData(prev => ({ ...prev, description: e.target.value }))}
                    className="w-full px-3.5 py-2 rounded-xl bg-surface border border-surface-container-high text-xs text-on-surface font-medium"
                  />
                </div>

                {/* Technical Limits (Photos, Videos, Products) */}
                <div className="p-4 rounded-2xl bg-surface border border-surface-container-high space-y-3">
                  <span className="font-extrabold text-on-surface uppercase tracking-wider block">
                    Límites Técnicos del Plan
                  </span>
                  <div className="grid grid-cols-3 gap-3">
                    <div>
                      <label className="block font-bold text-outline text-[11px] mb-1">Máx. Productos</label>
                      <input
                        type="number"
                        min="1"
                        max="5000"
                        value={editFormData.maxProducts}
                        onChange={e => setEditFormData(prev => ({ ...prev, maxProducts: e.target.value }))}
                        className="w-full px-3 py-1.5 rounded-xl bg-surface-container-lowest border border-surface-container-high text-xs font-bold"
                      />
                    </div>
                    <div>
                      <label className="block font-bold text-outline text-[11px] mb-1">Máx. Fotos Galería</label>
                      <input
                        type="number"
                        min="1"
                        max="100"
                        value={editFormData.maxPhotos}
                        onChange={e => setEditFormData(prev => ({ ...prev, maxPhotos: e.target.value }))}
                        className="w-full px-3 py-1.5 rounded-xl bg-surface-container-lowest border border-surface-container-high text-xs font-bold"
                      />
                    </div>
                    <div>
                      <label className="block font-bold text-outline text-[11px] mb-1">Máx. Videos</label>
                      <input
                        type="number"
                        min="0"
                        max="20"
                        value={editFormData.maxVideos}
                        onChange={e => setEditFormData(prev => ({ ...prev, maxVideos: e.target.value }))}
                        className="w-full px-3 py-1.5 rounded-xl bg-surface-container-lowest border border-surface-container-high text-xs font-bold"
                      />
                    </div>
                  </div>
                </div>

                {/* Functionalities Checkbox Grid (Required by Page 5 & 6) */}
                <div className="p-4 rounded-2xl bg-surface border border-surface-container-high space-y-3">
                  <span className="font-extrabold text-on-surface uppercase tracking-wider block">
                    Funciones Incluidas en el Plan
                  </span>
                  
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-2.5">
                    <label className="flex items-center gap-2 cursor-pointer p-2 rounded-xl bg-surface-container-lowest border border-surface-container-high">
                      <input
                        type="checkbox"
                        checked={editFormData.allowFeatured}
                        onChange={e => setEditFormData(prev => ({ ...prev, allowFeatured: e.target.checked }))}
                        className="rounded text-indigo-600 w-4 h-4"
                      />
                      <span className="font-semibold text-on-surface text-xs">Anuncio / Comercio Destacado</span>
                    </label>

                    <label className="flex items-center gap-2 cursor-pointer p-2 rounded-xl bg-surface-container-lowest border border-surface-container-high">
                      <input
                        type="checkbox"
                        checked={editFormData.allowGondolaLive}
                        onChange={e => setEditFormData(prev => ({ ...prev, allowGondolaLive: e.target.checked }))}
                        className="rounded text-indigo-600 w-4 h-4"
                      />
                      <span className="font-semibold text-on-surface text-xs">Banner Góndola en Vivo</span>
                    </label>

                    <label className="flex items-center gap-2 cursor-pointer p-2 rounded-xl bg-surface-container-lowest border border-surface-container-high">
                      <input
                        type="checkbox"
                        checked={editFormData.allowBannerAds}
                        onChange={e => setEditFormData(prev => ({ ...prev, allowBannerAds: e.target.checked }))}
                        className="rounded text-indigo-600 w-4 h-4"
                      />
                      <span className="font-semibold text-on-surface text-xs">Banner Publicitario en Carrusel</span>
                    </label>

                    <label className="flex items-center gap-2 cursor-pointer p-2 rounded-xl bg-surface-container-lowest border border-surface-container-high">
                      <input
                        type="checkbox"
                        checked={editFormData.allowStoreCart}
                        onChange={e => setEditFormData(prev => ({ ...prev, allowStoreCart: e.target.checked }))}
                        className="rounded text-indigo-600 w-4 h-4"
                      />
                      <span className="font-semibold text-on-surface text-xs">Tienda Virtual con Carrito</span>
                    </label>

                    <label className="flex items-center gap-2 cursor-pointer p-2 rounded-xl bg-surface-container-lowest border border-surface-container-high">
                      <input
                        type="checkbox"
                        checked={editFormData.allowPosKanban}
                        onChange={e => setEditFormData(prev => ({ ...prev, allowPosKanban: e.target.checked }))}
                        className="rounded text-indigo-600 w-4 h-4"
                      />
                      <span className="font-semibold text-on-surface text-xs">Módulo POS / Comandas en Vivo</span>
                    </label>

                    <label className="flex items-center gap-2 cursor-pointer p-2 rounded-xl bg-surface-container-lowest border border-surface-container-high">
                      <input
                        type="checkbox"
                        checked={editFormData.allowDeliveryZones}
                        onChange={e => setEditFormData(prev => ({ ...prev, allowDeliveryZones: e.target.checked }))}
                        className="rounded text-indigo-600 w-4 h-4"
                      />
                      <span className="font-semibold text-on-surface text-xs">Configuración Zonas de Delivery</span>
                    </label>

                    <label className="flex items-center gap-2 cursor-pointer p-2 rounded-xl bg-surface-container-lowest border border-surface-container-high">
                      <input
                        type="checkbox"
                        checked={editFormData.allowPaymentLinks}
                        onChange={e => setEditFormData(prev => ({ ...prev, allowPaymentLinks: e.target.checked }))}
                        className="rounded text-indigo-600 w-4 h-4"
                      />
                      <span className="font-semibold text-on-surface text-xs">Links de Pago Mercado Pago</span>
                    </label>

                    <label className="flex items-center gap-2 cursor-pointer p-2 rounded-xl bg-surface-container-lowest border border-surface-container-high">
                      <input
                        type="checkbox"
                        checked={editFormData.allowVerifiedBadge}
                        onChange={e => setEditFormData(prev => ({ ...prev, allowVerifiedBadge: e.target.checked }))}
                        className="rounded text-indigo-600 w-4 h-4"
                      />
                      <span className="font-semibold text-on-surface text-xs">Sello / Badge Verificado</span>
                    </label>
                  </div>
                </div>

                <div>
                  <label className="block font-bold text-on-surface-variant uppercase tracking-wider mb-1">
                    Link de Checkout Mercado Pago
                  </label>
                  <input
                    type="url"
                    required
                    placeholder="https://mpago.la/..."
                    value={editFormData.mpCheckoutUrl}
                    onChange={e => setEditFormData(prev => ({ ...prev, mpCheckoutUrl: e.target.value }))}
                    className="w-full px-3.5 py-2 rounded-xl bg-surface border border-surface-container-high text-xs text-on-surface font-mono"
                  />
                </div>

                <div>
                  <label className="block font-bold text-on-surface-variant uppercase tracking-wider mb-1">
                    Beneficios a Renderizar en la Landing (Uno por línea)
                  </label>
                  <textarea
                    rows={4}
                    value={editFormData.featuresText}
                    onChange={e => setEditFormData(prev => ({ ...prev, featuresText: e.target.value }))}
                    className="w-full px-3.5 py-2 rounded-xl bg-surface border border-surface-container-high text-xs text-on-surface leading-relaxed"
                  />
                </div>

                <div className="pt-3 border-t border-surface-container-high flex justify-end gap-2">
                  <button
                    type="button"
                    onClick={() => setEditingPlan(null)}
                    className="px-4 py-2 rounded-xl bg-surface border border-surface-container-high text-xs font-bold text-on-surface hover:bg-surface-container"
                  >
                    Cancelar
                  </button>
                  <button
                    type="submit"
                    className="px-5 py-2 rounded-xl bg-indigo-600 hover:bg-indigo-500 text-white font-bold text-xs shadow-md shadow-indigo-900/20"
                  >
                    Guardar Configuración del Plan
                  </button>
                </div>
              </form>
            </div>
          </div>
        )}

        {/* Modal Agregar Banner al Carrusel */}
        {showAddBannerModal && (
          <div className="fixed inset-0 z-50 bg-black/60 backdrop-blur-sm flex items-center justify-center p-4 animate-in fade-in">
            <div className="bg-surface-container-lowest w-full max-w-lg rounded-3xl border border-surface-container-high shadow-2xl overflow-hidden animate-in zoom-in-95">
              <div className="p-5 border-b border-surface-container-high flex items-center justify-between bg-surface">
                <h3 className="text-base font-extrabold text-on-surface">
                  Agregar Banner al Carrusel de Landing
                </h3>
                <button
                  type="button"
                  onClick={() => setShowAddBannerModal(false)}
                  className="p-1 rounded-xl text-outline hover:text-on-surface"
                >
                  <X className="w-5 h-5" />
                </button>
              </div>

              <form onSubmit={handleCreateBanner} className="p-5 space-y-3 text-xs">
                <div>
                  <label className="font-bold text-on-surface block mb-1">Título del Banner *</label>
                  <input
                    type="text"
                    required
                    value={newBanner.title}
                    onChange={e => setNewBanner(prev => ({ ...prev, title: e.target.value }))}
                    placeholder="Ej: Gran Parrillada Serrana"
                    className="w-full px-3 py-2 rounded-xl bg-surface border border-surface-container-high"
                  />
                </div>

                <div>
                  <label className="font-bold text-on-surface block mb-1">Subtítulo / Promo</label>
                  <input
                    type="text"
                    value={newBanner.subtitle}
                    onChange={e => setNewBanner(prev => ({ ...prev, subtitle: e.target.value }))}
                    placeholder="Ej: 20% de descuento abonando en efectivo"
                    className="w-full px-3 py-2 rounded-xl bg-surface border border-surface-container-high"
                  />
                </div>

                <div className="grid grid-cols-2 gap-2">
                  <div>
                    <label className="font-bold text-on-surface block mb-1">Badge</label>
                    <input
                      type="text"
                      value={newBanner.badge}
                      onChange={e => setNewBanner(prev => ({ ...prev, badge: e.target.value }))}
                      className="w-full px-3 py-2 rounded-xl bg-surface border border-surface-container-high"
                    />
                  </div>
                  <div>
                    <label className="font-bold text-on-surface block mb-1">Localidad</label>
                    <input
                      type="text"
                      value={newBanner.location}
                      onChange={e => setNewBanner(prev => ({ ...prev, location: e.target.value }))}
                      className="w-full px-3 py-2 rounded-xl bg-surface border border-surface-container-high"
                    />
                  </div>
                </div>

                <div>
                  <label className="font-bold text-on-surface block mb-1">URL Imagen de Fondo</label>
                  <input
                    type="text"
                    value={newBanner.imageUrl}
                    onChange={e => setNewBanner(prev => ({ ...prev, imageUrl: e.target.value }))}
                    className="w-full px-3 py-2 rounded-xl bg-surface border border-surface-container-high"
                  />
                </div>

                <div className="grid grid-cols-2 gap-2">
                  <div>
                    <label className="font-bold text-on-surface block mb-1">Enlace de Destino</label>
                    <input
                      type="text"
                      value={newBanner.link}
                      onChange={e => setNewBanner(prev => ({ ...prev, link: e.target.value }))}
                      placeholder="/tienda/slug o https://..."
                      className="w-full px-3 py-2 rounded-xl bg-surface border border-surface-container-high"
                    />
                  </div>
                  <div>
                    <label className="font-bold text-on-surface block mb-1">Texto del Botón CTA</label>
                    <input
                      type="text"
                      value={newBanner.ctaText}
                      onChange={e => setNewBanner(prev => ({ ...prev, ctaText: e.target.value }))}
                      className="w-full px-3 py-2 rounded-xl bg-surface border border-surface-container-high"
                    />
                  </div>
                </div>

                <div className="pt-2 flex justify-end gap-2 border-t border-surface-container-high">
                  <button
                    type="button"
                    onClick={() => setShowAddBannerModal(false)}
                    className="px-4 py-2 rounded-xl bg-surface text-on-surface"
                  >
                    Cancelar
                  </button>
                  <button
                    type="submit"
                    className="px-5 py-2 rounded-xl bg-indigo-600 text-white font-bold"
                  >
                    Crear Banner
                  </button>
                </div>
              </form>
            </div>
          </div>
        )}

      </main>
    </div>
  );
}
