import React from 'react';
import { NavLink } from 'react-router-dom';
import { Home, Store, ShieldCheck, Heart, ShoppingBag } from 'lucide-react';
import { useApp } from '../../context/AppContext';

export default function BottomNavigation() {
  const { cartItemCount, setIsCartOpen } = useApp();

  return (
    <nav className="fixed bottom-0 inset-x-0 z-40 bg-surface-container-lowest/95 backdrop-blur-lg border-t border-surface-container-high md:hidden pb-safe">
      <div className="flex items-center justify-around h-16 px-2">
        
        <NavLink
          to="/"
          className={({ isActive }) =>
            `flex flex-col items-center justify-center w-full h-full gap-1 transition-colors ${
              isActive ? 'text-primary font-bold' : 'text-on-surface-variant hover:text-on-surface'
            }`
          }
        >
          <Home className="w-5 h-5" />
          <span className="text-[10px] tracking-tight">Directorio</span>
        </NavLink>

        <NavLink
          to="/favoritos"
          className={({ isActive }) =>
            `flex flex-col items-center justify-center w-full h-full gap-1 transition-colors ${
              isActive ? 'text-rose-600 font-bold' : 'text-on-surface-variant hover:text-on-surface'
            }`
          }
        >
          <Heart className="w-5 h-5" />
          <span className="text-[10px] tracking-tight">Favoritos</span>
        </NavLink>

        {/* Cart Quick Button in Mobile Bar */}
        <button
          type="button"
          onClick={() => setIsCartOpen(true)}
          className="flex flex-col items-center justify-center w-full h-full gap-1 text-on-surface-variant hover:text-primary transition-colors relative"
        >
          <div className="relative">
            <ShoppingBag className="w-5 h-5" />
            {cartItemCount > 0 && (
              <span className="absolute -top-1.5 -right-2 px-1.5 py-0.2 rounded-full bg-primary text-white text-[9px] font-extrabold">
                {cartItemCount}
              </span>
            )}
          </div>
          <span className="text-[10px] tracking-tight">Carrito</span>
        </button>

        <NavLink
          to="/panel/gondola"
          className={({ isActive }) =>
            `flex flex-col items-center justify-center w-full h-full gap-1 transition-colors ${
              isActive ? 'text-amber-600 font-bold' : 'text-on-surface-variant hover:text-on-surface'
            }`
          }
        >
          <Store className="w-5 h-5" />
          <span className="text-[10px] tracking-tight">Comercio</span>
        </NavLink>

        <NavLink
          to="/admin"
          className={({ isActive }) =>
            `flex flex-col items-center justify-center w-full h-full gap-1 transition-colors ${
              isActive ? 'text-indigo-600 font-bold' : 'text-on-surface-variant hover:text-on-surface'
            }`
          }
        >
          <ShieldCheck className="w-5 h-5" />
          <span className="text-[10px] tracking-tight">Admin</span>
        </NavLink>

      </div>
    </nav>
  );
}
