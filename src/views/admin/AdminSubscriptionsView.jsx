import React from 'react';
import AdminSidebar from '../../components/admin/AdminSidebar';
import { useApp } from '../../context/AppContext';
import { 
  Receipt, 
  CheckCircle2, 
  TrendingUp, 
  DollarSign, 
  Sparkles, 
  Clock,
  ArrowUpRight
} from 'lucide-react';

export default function AdminSubscriptionsView() {
  const { plans, businesses } = useApp();

  return (
    <div className="flex-1 bg-surface flex flex-col lg:flex-row min-h-screen animate-in fade-in">
      <AdminSidebar />

      <main className="flex-1 p-4 sm:p-6 lg:p-8 space-y-6 overflow-y-auto">
        
        {/* Header Bar */}
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-4 border-b border-surface-container-high">
          <div>
            <h1 className="text-xl sm:text-2xl font-extrabold text-on-surface tracking-tight">
              Suscripciones, Planes & Facturación SaaS (MRR)
            </h1>
            <p className="text-xs text-on-surface-variant mt-0.5">
              Gestión de ingresos recurrentes y planes de suscripción de los comercios
            </p>
          </div>

          <div className="flex items-center gap-2">
            <span className="px-3 py-1 rounded-xl bg-emerald-50 border border-emerald-200 text-emerald-700 text-xs font-bold">
              MRR: $1.540.000 / mes
            </span>
          </div>
        </div>

        {/* 3 SaaS Plans Cards */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-5">
          {plans.map(plan => (
            <div
              key={plan.id}
              className={`p-5 sm:p-6 rounded-3xl border flex flex-col justify-between space-y-4 shadow-subtle ${
                plan.isFeatured
                  ? 'bg-gradient-to-b from-indigo-900 to-slate-900 text-white border-indigo-700'
                  : 'bg-surface-container-lowest text-on-surface border-surface-container-high'
              }`}
            >
              <div className="space-y-3">
                <div className="flex items-center justify-between">
                  <span className={`px-2.5 py-0.5 rounded-full text-[10px] font-extrabold uppercase ${
                    plan.isFeatured ? 'bg-indigo-500 text-white' : 'bg-surface-container text-outline'
                  }`}>
                    {plan.slug}
                  </span>
                  <span className="text-xs font-bold opacity-80">{plan.activeMerchants} activos</span>
                </div>

                <h3 className="text-base sm:text-lg font-extrabold">{plan.name}</h3>

                <div className="flex items-baseline gap-1">
                  <span className="text-2xl sm:text-3xl font-extrabold">
                    ${plan.priceArs.toLocaleString('es-AR')}
                  </span>
                  <span className="text-xs opacity-70">/ mes</span>
                </div>

                <ul className="space-y-2 text-xs pt-3 border-t border-white/10">
                  {plan.features.map((feat, i) => (
                    <li key={i} className="flex items-center gap-2">
                      <CheckCircle2 className={`w-3.5 h-3.5 ${plan.isFeatured ? 'text-indigo-400' : 'text-emerald-600'}`} />
                      <span>{feat}</span>
                    </li>
                  ))}
                </ul>
              </div>

              <button
                type="button"
                className={`w-full py-2.5 rounded-xl font-bold text-xs transition-all shadow-xs ${
                  plan.isFeatured
                    ? 'bg-indigo-500 hover:bg-indigo-400 text-white'
                    : 'bg-surface hover:bg-surface-container text-on-surface border border-surface-container-high'
                }`}
              >
                Editar Parámetros del Plan
              </button>
            </div>
          ))}
        </div>

        {/* Subscriptions Table */}
        <div className="bg-surface-container-lowest rounded-3xl border border-surface-container-high overflow-hidden shadow-subtle space-y-3 p-4 sm:p-6">
          <h3 className="text-sm font-extrabold text-on-surface uppercase tracking-wider">
            Últimos Cobros & Renovaciones de Comercios
          </h3>

          <div className="overflow-x-auto">
            <table className="w-full text-left text-xs text-on-surface">
              <thead className="bg-surface border-b border-surface-container-high font-extrabold uppercase tracking-wider text-outline text-[11px]">
                <tr>
                  <th className="p-3">Comercio</th>
                  <th className="p-3">Plan Asignado</th>
                  <th className="p-3">Monto Recurrente</th>
                  <th className="p-3">Próximo Vencimiento</th>
                  <th className="p-3 text-center">Estado de Cobro</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-surface-container-high">
                {businesses.map((biz, idx) => (
                  <tr key={biz.id} className="hover:bg-surface/60 transition-colors">
                    <td className="p-3 font-bold text-on-surface">{biz.name}</td>
                    <td className="p-3 text-indigo-600 font-semibold">{biz.planName || 'Plan Pro'}</td>
                    <td className="p-3 font-extrabold text-on-surface">${(biz.priceArs || 19900).toLocaleString('es-AR')}</td>
                    <td className="p-3 text-outline">28 de Octubre 2026</td>
                    <td className="p-3 text-center">
                      <span className="px-2.5 py-0.5 rounded-full bg-emerald-100 text-emerald-800 text-[10px] font-extrabold">
                        ✓ Al Día
                      </span>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>

      </main>
    </div>
  );
}
