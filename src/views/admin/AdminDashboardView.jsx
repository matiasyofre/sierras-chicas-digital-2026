import React from 'react';
import AdminSidebar from '../../components/admin/AdminSidebar';
import { useApp } from '../../context/AppContext';
import { 
  TrendingUp, 
  Store, 
  Users, 
  ShoppingBag, 
  DollarSign, 
  ArrowUpRight, 
  MapPin, 
  CheckCircle2,
  Clock
} from 'lucide-react';

export default function AdminDashboardView() {
  const { businesses, orders, plans, settings } = useApp();

  const activeBusinesses = businesses.filter(b => b.status === 'active');
  const activeBusinessesCount = activeBusinesses.length;
  
  // Dynamic MRR calculation from actual businesses and their assigned plans
  const totalMRR = activeBusinesses.reduce((sum, b) => {
    if (b.priceArs) return sum + b.priceArs;
    const plan = plans.find(p => p.id === b.planId || p.name === b.planName);
    return sum + (plan ? plan.priceArs : 9900);
  }, 0);

  const totalSiteVisits = (settings?.totalSiteVisits || 14250) + businesses.reduce((acc, b) => acc + (b.visitsCount || 0), 0);
  const totalOrdersCount = orders.length + 3480; // Baseline + live orders

  return (
    <div className="flex-1 bg-surface flex flex-col lg:flex-row min-h-screen animate-in fade-in">
      <AdminSidebar />

      <main className="flex-1 p-4 sm:p-6 lg:p-8 space-y-6 overflow-y-auto">
        
        {/* Header */}
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 pb-4 border-b border-surface-container-high">
          <div>
            <h1 className="text-xl sm:text-2xl font-extrabold text-on-surface tracking-tight">
              Dashboard Central & Métricas SaaS
            </h1>
            <p className="text-xs text-on-surface-variant mt-0.5">
              Monitoreo en tiempo real del ecosistema comercial de Sierras Chicas
            </p>
          </div>

          <div className="flex items-center gap-2">
            <span className="px-3 py-1 rounded-xl bg-indigo-50 border border-indigo-200 text-indigo-700 text-xs font-bold flex items-center gap-1.5">
              <span className="w-2 h-2 rounded-full bg-indigo-600 animate-pulse"></span>
              <span>Sierras Chicas Live</span>
            </span>
          </div>
        </div>

        {/* 4 KPIs Cards */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
          
          <div className="bg-surface-container-lowest p-5 rounded-3xl border border-surface-container-high shadow-subtle space-y-2">
            <div className="flex items-center justify-between">
              <span className="text-xs font-bold text-outline uppercase tracking-wider">MRR Mensual</span>
              <div className="p-2 rounded-xl bg-emerald-50 text-emerald-600">
                <DollarSign className="w-4 h-4" />
              </div>
            </div>
            <div className="flex items-baseline gap-2">
              <span className="text-2xl font-extrabold text-on-surface font-mono">
                ${totalMRR.toLocaleString('es-AR')}
              </span>
              <span className="text-xs text-emerald-600 font-bold flex items-center">
                <TrendingUp className="w-3 h-3 mr-0.5" />
                +14%
              </span>
            </div>
            <p className="text-[11px] text-on-surface-variant">Ingreso mensual por suscripciones</p>
          </div>

          <div className="bg-surface-container-lowest p-5 rounded-3xl border border-surface-container-high shadow-subtle space-y-2">
            <div className="flex items-center justify-between">
              <span className="text-xs font-bold text-outline uppercase tracking-wider">Comercios Activos</span>
              <div className="p-2 rounded-xl bg-amber-50 text-amber-600">
                <Store className="w-4 h-4" />
              </div>
            </div>
            <div className="flex items-baseline gap-2">
              <span className="text-2xl font-extrabold text-on-surface font-mono">
                {activeBusinessesCount}
              </span>
              <span className="text-xs text-emerald-600 font-bold flex items-center">
                <TrendingUp className="w-3 h-3 mr-0.5" />
                +{activeBusinessesCount} en total
              </span>
            </div>
            <p className="text-[11px] text-on-surface-variant">Distribuidos en el corredor serrano</p>
          </div>

          <div className="bg-surface-container-lowest p-5 rounded-3xl border border-surface-container-high shadow-subtle space-y-2">
            <div className="flex items-center justify-between">
              <span className="text-xs font-bold text-outline uppercase tracking-wider">Pedidos Generados</span>
              <div className="p-2 rounded-xl bg-teal-50 text-teal-600">
                <ShoppingBag className="w-4 h-4" />
              </div>
            </div>
            <div className="flex items-baseline gap-2">
              <span className="text-2xl font-extrabold text-on-surface font-mono">
                {totalOrdersCount.toLocaleString('es-AR')}
              </span>
              <span className="text-xs text-emerald-600 font-bold flex items-center">
                <TrendingUp className="w-3 h-3 mr-0.5" />
                +22%
              </span>
            </div>
            <p className="text-[11px] text-on-surface-variant">Vía WhatsApp wa.me y POS</p>
          </div>

          <div className="bg-surface-container-lowest p-5 rounded-3xl border border-surface-container-high shadow-subtle space-y-2">
            <div className="flex items-center justify-between">
              <span className="text-xs font-bold text-outline uppercase tracking-wider">Visitas al Portal</span>
              <div className="p-2 rounded-xl bg-indigo-50 text-indigo-600">
                <Users className="w-4 h-4" />
              </div>
            </div>
            <div className="flex items-baseline gap-2">
              <span className="text-2xl font-extrabold text-on-surface font-mono">
                {totalSiteVisits.toLocaleString('es-AR')}
              </span>
              <span className="text-xs text-emerald-600 font-bold flex items-center">
                <TrendingUp className="w-3 h-3 mr-0.5" />
                +1.2k
              </span>
            </div>
            <p className="text-[11px] text-on-surface-variant">Vecinos y turistas activos</p>
          </div>

        </div>

        {/* Breakdown by City & Activity Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          
          {/* Localities Performance */}
          <div className="bg-surface-container-lowest p-5 sm:p-6 rounded-3xl border border-surface-container-high shadow-subtle space-y-4">
            <div className="flex items-center justify-between">
              <h3 className="text-sm font-extrabold text-on-surface uppercase tracking-wider">
                Distribución por Localidad
              </h3>
              <span className="text-xs text-outline font-semibold">Comercios Activos</span>
            </div>

            <div className="space-y-3 text-xs">
              {[
                { name: 'Río Ceballos', count: 48, percentage: 85, color: 'bg-teal-600' },
                { name: 'Unquillo', count: 36, percentage: 65, color: 'bg-indigo-600' },
                { name: 'Villa Allende', count: 32, percentage: 58, color: 'bg-amber-600' },
                { name: 'Mendiolaza', count: 20, percentage: 40, color: 'bg-rose-600' },
                { name: 'Salsipuedes', count: 18, percentage: 35, color: 'bg-emerald-600' }
              ].map((loc, i) => (
                <div key={i} className="space-y-1">
                  <div className="flex justify-between font-bold text-on-surface">
                    <span className="flex items-center gap-1.5">
                      <MapPin className="w-3.5 h-3.5 text-outline" />
                      <span>{loc.name}</span>
                    </span>
                    <span>{loc.count} locales</span>
                  </div>
                  <div className="w-full h-2 rounded-full bg-surface-container overflow-hidden">
                    <div className={`h-full ${loc.color} rounded-full`} style={{ width: `${loc.percentage}%` }}></div>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Recent Orders in Platform */}
          <div className="bg-surface-container-lowest p-5 sm:p-6 rounded-3xl border border-surface-container-high shadow-subtle space-y-4">
            <div className="flex items-center justify-between">
              <h3 className="text-sm font-extrabold text-on-surface uppercase tracking-wider">
                Últimos Movimientos del Ecosistema
              </h3>
              <span className="text-xs text-primary font-bold">Tiempo Real</span>
            </div>

            <div className="space-y-3">
              {orders.slice(0, 4).map(ord => (
                <div key={ord.id} className="flex items-center justify-between p-3 rounded-2xl bg-surface border border-surface-container-high text-xs">
                  <div className="flex items-center gap-3">
                    <div className="w-8 h-8 rounded-xl bg-primary-fixed text-on-primary-fixed flex items-center justify-center font-bold">
                      <ShoppingBag className="w-4 h-4 text-primary" />
                    </div>
                    <div>
                      <h4 className="font-bold text-on-surface">{ord.customerName}</h4>
                      <span className="text-[11px] text-on-surface-variant">Pedido {ord.orderNumber}</span>
                    </div>
                  </div>
                  <div className="text-right">
                    <span className="font-extrabold text-primary block">${ord.total.toLocaleString('es-AR')}</span>
                    <span className="text-[10px] text-outline">{ord.timeAgo}</span>
                  </div>
                </div>
              ))}
            </div>
          </div>

        </div>

      </main>
    </div>
  );
}
