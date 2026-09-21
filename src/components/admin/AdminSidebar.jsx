import React from 'react';
import { NavLink } from 'react-router-dom';
import { 
  LayoutDashboard, 
  Store, 
  Receipt, 
  Tags, 
  Sliders, 
  ShieldCheck, 
  Globe,
  TrendingUp
} from 'lucide-react';

export default function AdminSidebar() {
  return (
    <aside className="w-full lg:w-64 bg-surface-container-lowest border-r border-surface-container-high shrink-0 lg:min-h-screen">
      <div className="p-4 sm:p-5 space-y-6">
        
        {/* Admin Header */}
        <div className="flex items-center gap-3 pb-4 border-b border-surface-container-high">
          <div className="w-10 h-10 rounded-xl bg-indigo-600 text-white flex items-center justify-center shadow-md shadow-indigo-900/30">
            <ShieldCheck className="w-5 h-5" />
          </div>
          <div>
            <div className="flex items-center gap-1.5">
              <span className="font-extrabold text-sm text-on-surface">SuperAdmin</span>
              <span className="px-1.5 py-0.2 rounded bg-indigo-100 text-indigo-800 text-[10px] font-mono font-bold">SaaS</span>
            </div>
            <p className="text-[11px] text-on-surface-variant">Control Sierras Chicas</p>
          </div>
        </div>

        {/* Navigation Links */}
        <nav className="flex flex-row lg:flex-col gap-1.5 overflow-x-auto no-scrollbar pb-2 lg:pb-0">
          <NavLink
            to="/admin"
            end
            className={({ isActive }) =>
              `flex items-center gap-2.5 px-3.5 py-2.5 rounded-xl text-xs font-bold transition-all shrink-0 lg:shrink ${
                isActive
                  ? 'bg-indigo-600 text-white shadow-md shadow-indigo-900/20'
                  : 'text-on-surface-variant hover:text-on-surface hover:bg-surface-container'
              }`
            }
          >
            <LayoutDashboard className="w-4 h-4" />
            <span>Dashboard & KPIs</span>
          </NavLink>

          <NavLink
            to="/admin/comercios"
            className={({ isActive }) =>
              `flex items-center gap-2.5 px-3.5 py-2.5 rounded-xl text-xs font-bold transition-all shrink-0 lg:shrink ${
                isActive
                  ? 'bg-indigo-600 text-white shadow-md shadow-indigo-900/20'
                  : 'text-on-surface-variant hover:text-on-surface hover:bg-surface-container'
              }`
            }
          >
            <Store className="w-4 h-4" />
            <span>Gestión Comercios</span>
          </NavLink>

          <NavLink
            to="/admin/suscripciones"
            className={({ isActive }) =>
              `flex items-center gap-2.5 px-3.5 py-2.5 rounded-xl text-xs font-bold transition-all shrink-0 lg:shrink ${
                isActive
                  ? 'bg-indigo-600 text-white shadow-md shadow-indigo-900/20'
                  : 'text-on-surface-variant hover:text-on-surface hover:bg-surface-container'
              }`
            }
          >
            <Receipt className="w-4 h-4" />
            <span>Suscripciones & MRR</span>
          </NavLink>

          <NavLink
            to="/admin/categorias"
            className={({ isActive }) =>
              `flex items-center gap-2.5 px-3.5 py-2.5 rounded-xl text-xs font-bold transition-all shrink-0 lg:shrink ${
                isActive
                  ? 'bg-indigo-600 text-white shadow-md shadow-indigo-900/20'
                  : 'text-on-surface-variant hover:text-on-surface hover:bg-surface-container'
              }`
            }
          >
            <Tags className="w-4 h-4" />
            <span>Categorías & Rubros</span>
          </NavLink>

          <NavLink
            to="/admin/configuracion"
            className={({ isActive }) =>
              `flex items-center gap-2.5 px-3.5 py-2.5 rounded-xl text-xs font-bold transition-all shrink-0 lg:shrink ${
                isActive
                  ? 'bg-indigo-600 text-white shadow-md shadow-indigo-900/20'
                  : 'text-on-surface-variant hover:text-on-surface hover:bg-surface-container'
              }`
            }
          >
            <Sliders className="w-4 h-4" />
            <span>Configuración General</span>
          </NavLink>
        </nav>

        {/* Status Card */}
        <div className="hidden lg:block p-3.5 rounded-2xl bg-surface border border-surface-container-high space-y-2">
          <div className="flex items-center justify-between text-xs font-bold text-on-surface">
            <span>Red Regional</span>
            <span className="flex items-center gap-1 text-emerald-600 text-[10px]">
              <span className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse"></span>
              <span>100% Online</span>
            </span>
          </div>
          <p className="text-[11px] text-on-surface-variant leading-tight">
            Base de datos Supabase activa y sincronizada en tiempo real.
          </p>
        </div>

      </div>
    </aside>
  );
}
