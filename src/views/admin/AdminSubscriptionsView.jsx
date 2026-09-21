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
  Image as ImageIcon
} from 'lucide-react';

export default function AdminSubscriptionsView() {
  const { plans, updatePlan, businesses } = useApp();
  const [editingPlan, setEditingPlan] = useState(null);
  const [editFormData, setEditFormData] = useState({
    name: '',
    priceArs: 0,
    maxPhotos: 5,
    mpCheckoutUrl: '',
    featuresText: ''
  });

  // Calculate MRR
  const totalMRR = businesses.reduce((acc, biz) => {
    const bizPlan = plans.find(p => p.id === biz.planId || p.name.toLowerCase().includes((biz.planName || '').toLowerCase()));
    return acc + (bizPlan ? bizPlan.priceArs : 19900);
  }, 0);

  const handleOpenEdit = (plan) => {
    setEditingPlan(plan);
    setEditFormData({
      name: plan.name,
      priceArs: plan.priceArs,
      maxPhotos: plan.maxPhotos || (plan.id === 'plan-inicial' ? 3 : plan.id === 'plan-pro' ? 8 : 20),
      mpCheckoutUrl: plan.mpCheckoutUrl || 'https://mpago.la/sierras-chicas-saas',
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
      priceArs: Number(editFormData.priceArs) || 0,
      maxPhotos: Number(editFormData.maxPhotos) || 5,
      mpCheckoutUrl: editFormData.mpCheckoutUrl.trim(),
      features: updatedFeatures
    });

    setEditingPlan(null);
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
              Suscripciones, Precios & Mercado Pago
            </h1>
            <p className="text-xs text-on-surface-variant mt-0.5">
              Administra los precios mensuales, enlaces de suscripción por Mercado Pago y límites por plan
            </p>
          </div>

          <div className="flex items-center gap-3">
            <div className="px-4 py-2 rounded-2xl bg-emerald-50 border border-emerald-200 text-emerald-800 text-xs font-extrabold flex items-center gap-2 shadow-xs">
              <TrendingUp className="w-4 h-4 text-emerald-600" />
              <span>MRR Real: ${totalMRR.toLocaleString('es-AR')} / mes</span>
            </div>
          </div>
        </div>

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
                  <div className="flex items-center gap-1.5 text-xs opacity-75 mt-0.5">
                    <ImageIcon className="w-3.5 h-3.5" />
                    <span>Límite: {plan.maxPhotos || 5} fotos en galería</span>
                  </div>
                </div>

                <div className="flex items-baseline gap-1 py-1">
                  <span className="text-2xl sm:text-3xl font-black tracking-tight">
                    ${plan.priceArs.toLocaleString('es-AR')}
                  </span>
                  <span className="text-xs opacity-70">/ mes</span>
                </div>

                <div className="pt-2 border-t border-surface-container-high/40">
                  <span className="text-[10px] font-extrabold uppercase tracking-wider opacity-60">Beneficios incluidos:</span>
                  <ul className="space-y-2 text-xs pt-2">
                    {plan.features.map((feat, i) => (
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
                <span>Editar Parámetros & Checkout</span>
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

        {/* Modal Editar Plan */}
        {editingPlan && (
          <div className="fixed inset-0 z-50 bg-black/60 backdrop-blur-sm flex items-center justify-center p-4 animate-in fade-in">
            <div className="bg-surface-container-lowest w-full max-w-lg rounded-3xl border border-surface-container-high shadow-2xl overflow-hidden animate-in zoom-in-95">
              <div className="p-5 border-b border-surface-container-high flex items-center justify-between bg-surface">
                <div className="flex items-center gap-2">
                  <Edit2 className="w-5 h-5 text-indigo-600" />
                  <h3 className="text-base font-extrabold text-on-surface">
                    Editar Parámetros: {editingPlan.name}
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

              <form onSubmit={handleSavePlan} className="p-5 space-y-4">
                <div>
                  <label className="block text-xs font-bold text-on-surface-variant uppercase tracking-wider mb-1">
                    Nombre del Plan
                  </label>
                  <input
                    type="text"
                    required
                    value={editFormData.name}
                    onChange={e => setEditFormData(prev => ({ ...prev, name: e.target.value }))}
                    className="w-full px-3.5 py-2 rounded-xl bg-surface border border-surface-container-high text-xs text-on-surface focus:outline-none focus:border-indigo-600 font-semibold"
                  />
                </div>

                <div className="grid grid-cols-2 gap-3">
                  <div>
                    <label className="block text-xs font-bold text-on-surface-variant uppercase tracking-wider mb-1">
                      Precio Mensual ($ ARS)
                    </label>
                    <input
                      type="number"
                      required
                      min="0"
                      value={editFormData.priceArs}
                      onChange={e => setEditFormData(prev => ({ ...prev, priceArs: e.target.value }))}
                      className="w-full px-3.5 py-2 rounded-xl bg-surface border border-surface-container-high text-xs text-on-surface focus:outline-none focus:border-indigo-600 font-semibold"
                    />
                  </div>

                  <div>
                    <label className="block text-xs font-bold text-on-surface-variant uppercase tracking-wider mb-1">
                      Máx. Fotos de Galería
                    </label>
                    <input
                      type="number"
                      required
                      min="1"
                      max="50"
                      value={editFormData.maxPhotos}
                      onChange={e => setEditFormData(prev => ({ ...prev, maxPhotos: e.target.value }))}
                      className="w-full px-3.5 py-2 rounded-xl bg-surface border border-surface-container-high text-xs text-on-surface focus:outline-none focus:border-indigo-600 font-semibold"
                    />
                  </div>
                </div>

                <div>
                  <label className="block text-xs font-bold text-on-surface-variant uppercase tracking-wider mb-1">
                    Link de Checkout / Suscripción (Mercado Pago)
                  </label>
                  <input
                    type="url"
                    required
                    placeholder="https://mpago.la/..."
                    value={editFormData.mpCheckoutUrl}
                    onChange={e => setEditFormData(prev => ({ ...prev, mpCheckoutUrl: e.target.value }))}
                    className="w-full px-3.5 py-2 rounded-xl bg-surface border border-surface-container-high text-xs text-on-surface focus:outline-none focus:border-indigo-600 font-mono"
                  />
                </div>

                <div>
                  <label className="block text-xs font-bold text-on-surface-variant uppercase tracking-wider mb-1">
                    Características & Beneficios (Una por línea)
                  </label>
                  <textarea
                    rows={4}
                    value={editFormData.featuresText}
                    onChange={e => setEditFormData(prev => ({ ...prev, featuresText: e.target.value }))}
                    className="w-full px-3.5 py-2 rounded-xl bg-surface border border-surface-container-high text-xs text-on-surface focus:outline-none focus:border-indigo-600 leading-relaxed"
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
                    Guardar Cambios
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
