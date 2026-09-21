import React from 'react';
import { NavLink } from 'react-router-dom';
import { Table, LayoutDashboard, Settings, Store, Sparkles } from 'lucide-react';

export default function MerchantNav() {
  return (
    <div className="bg-surface-container-lowest border-b border-surface-container-high sticky top-16 sm:top-20 z-30">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between py-3 gap-3">
          
          <div className="flex items-center gap-2.5">
            <div className="w-8 h-8 rounded-xl bg-amber-500/10 text-amber-600 flex items-center justify-center font-bold">
              <Store className="w-4 h-4" />
            </div>
            <div>
              <h2 className="text-xs sm:text-sm font-extrabold text-on-surface">
                Panel de Autogestión del Comercio
              </h2>
              <span className="text-[11px] text-on-surface-variant">
                Café de las Sierras & Bakery · Plan Pro
              </span>
            </div>
          </div>

          {/* Navigation Tabs */}
          <div className="flex items-center gap-1.5 overflow-x-auto no-scrollbar pb-1 sm:pb-0">
            <NavLink
              to="/panel/gondola"
              className={({ isActive }) =>
                `px-3.5 py-2 rounded-xl text-xs font-bold flex items-center gap-1.5 transition-all shrink-0 ${
                  isActive
                    ? 'bg-amber-500 text-amber-950 shadow-sm'
                    : 'bg-surface hover:bg-surface-container text-on-surface-variant'
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
                    ? 'bg-amber-500 text-amber-950 shadow-sm'
                    : 'bg-surface hover:bg-surface-container text-on-surface-variant'
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
                    ? 'bg-amber-500 text-amber-950 shadow-sm'
                    : 'bg-surface hover:bg-surface-container text-on-surface-variant'
                }`
              }
            >
              <Settings className="w-4 h-4" />
              <span>Configuración Ficha</span>
            </NavLink>
          </div>

        </div>
      </div>
    </div>
  );
}
