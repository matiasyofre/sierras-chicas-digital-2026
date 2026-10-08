import React from 'react';
import { NavLink, Link } from 'react-router-dom';
import { Table, LayoutDashboard, Settings, Store, Sparkles, ExternalLink, Eye } from 'lucide-react';
import { useApp } from '../../context/AppContext';

export default function MerchantNav() {
  const { currentUser, businesses } = useApp();
  
  const currentBiz = businesses.find(b => b.id === currentUser?.businessId) || businesses[0];
  const targetPreviewUrl = currentBiz.businessMode === 'aviso'
    ? `/aviso/${currentBiz.slug}`
    : currentBiz.businessMode === 'servicios'
    ? `/comercio/${currentBiz.slug}`
    : `/tienda/${currentBiz.slug}`;

  return (
    <div className="bg-white/95 backdrop-blur-md border-b border-slate-200 sticky top-16 sm:top-20 z-40 shadow-xs">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between py-2.5 sm:py-3 gap-3">
          
          <div className="flex items-center justify-between sm:justify-start gap-3">
            <div className="flex items-center gap-2.5">
              <div className="w-8 h-8 rounded-xl bg-amber-500/10 text-amber-600 flex items-center justify-center font-bold shrink-0">
                <Store className="w-4 h-4" />
              </div>
              <div>
                <h2 className="text-xs sm:text-sm font-extrabold text-slate-900 leading-tight">
                  Panel de Autogestión del Comercio
                </h2>
                <span className="text-[11px] text-slate-500 font-bold">
                  {currentBiz.name} · {currentBiz.planName || 'Plan Pro'}
                </span>
              </div>
            </div>

            {/* Quick Public Preview Button for Mobile */}
            <Link
              to={targetPreviewUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="sm:hidden px-2.5 py-1.5 rounded-xl bg-emerald-50 text-emerald-900 text-[11px] font-bold border border-emerald-200 flex items-center gap-1 shrink-0"
              title="Ver cómo lo ve el cliente"
            >
              <Eye className="w-3.5 h-3.5 text-emerald-700" />
              <span>Ver Ficha</span>
            </Link>
          </div>

          {/* Navigation Tabs & Desktop Preview Button */}
          <div className="flex items-center gap-2 overflow-x-auto no-scrollbar pb-1 sm:pb-0">
            <NavLink
              to="/panel/gondola"
              className={({ isActive }) =>
                `px-3.5 py-2 rounded-xl text-xs font-bold flex items-center gap-1.5 transition-all shrink-0 ${
                  isActive
                    ? 'bg-amber-500 text-slate-950 shadow-sm'
                    : 'bg-slate-100 hover:bg-slate-200 text-slate-700'
                }`
              }
            >
              <Table className="w-4 h-4" />
              <span>Góndola & Precios</span>
            </NavLink>

            <NavLink
              to="/panel/pos"
              className={({ isActive }) =>
                `px-3.5 py-2 rounded-xl text-xs font-bold flex items-center gap-1.5 transition-all shrink-0 ${
                  isActive
                    ? 'bg-amber-500 text-slate-950 shadow-sm'
                    : 'bg-slate-100 hover:bg-slate-200 text-slate-700'
                }`
              }
            >
              <LayoutDashboard className="w-4 h-4" />
              <span>POS & Comandas en Vivo</span>
            </NavLink>

            <NavLink
              to="/panel/perfil"
              className={({ isActive }) =>
                `px-3.5 py-2 rounded-xl text-xs font-bold flex items-center gap-1.5 transition-all shrink-0 ${
                  isActive
                    ? 'bg-amber-500 text-slate-950 shadow-sm'
                    : 'bg-slate-100 hover:bg-slate-200 text-slate-700'
                }`
              }
            >
              <Settings className="w-4 h-4" />
              <span>Configuración Ficha</span>
            </NavLink>

            {/* Desktop Preview Button */}
            <Link
              to={targetPreviewUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="hidden sm:inline-flex items-center gap-1.5 px-3 py-2 rounded-xl bg-emerald-50 hover:bg-emerald-100 text-emerald-900 border border-emerald-200 text-xs font-bold transition-all shadow-xs shrink-0"
              title="Ver cómo lo ve el cliente en vivo"
            >
              <Eye className="w-3.5 h-3.5 text-emerald-700" />
              <span>Vista Previa Ficha</span>
              <ExternalLink className="w-3 h-3 text-emerald-600 opacity-70" />
            </Link>
          </div>

        </div>
      </div>
    </div>
  );
}
