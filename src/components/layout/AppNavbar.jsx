import React, { useState } from 'react';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import { useApp } from '../../context/AppContext';
import { 
  Store, 
  ShoppingBag, 
  MapPin, 
  ShieldCheck, 
  Heart, 
  ChevronDown, 
  Menu, 
  X,
  Smartphone,
  LogIn,
  LogOut,
  User,
  Sparkles
} from 'lucide-react';

export default function AppNavbar() {
  const { 
    locations, 
    selectedLocation, 
    setSelectedLocation, 
    cartItemCount, 
    setIsCartOpen,
    currentUser,
    userRole,
    isAuthenticated,
    isMerchant,
    isAdmin,
    logout,
    favorites
  } = useApp();
  
  const location = useLocation();
  const navigate = useNavigate();
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [locationDropdownOpen, setLocationDropdownOpen] = useState(false);
  const [userDropdownOpen, setUserDropdownOpen] = useState(false);

  const isHome = location.pathname === '/';
  const isMerchantRoute = location.pathname.startsWith('/panel');
  const isAdminRoute = location.pathname.startsWith('/admin');

  const selectedLocObj = locations.find(l => l.slug === selectedLocation);

  const handleLogout = () => {
    logout();
    setUserDropdownOpen(false);
    navigate('/');
  };

  return (
    <header className="sticky top-0 z-40 bg-surface/90 backdrop-blur-xl border-b border-surface-container-high transition-all">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16 sm:h-20 gap-3">
          
          {/* Brand Logo & Name */}
          <Link to="/" className="flex items-center gap-2.5 sm:gap-3 group shrink-0">
            <div className="w-10 h-10 sm:w-11 sm:h-11 rounded-xl bg-primary text-white flex items-center justify-center shadow-md shadow-primary/20 group-hover:scale-105 transition-transform">
              <span className="material-symbols-outlined text-[22px] sm:text-[24px]">landscape</span>
            </div>
            <div className="flex flex-col">
              <div className="flex items-center gap-1.5">
                <span className="font-extrabold text-base sm:text-lg tracking-tight text-on-surface">
                  Sierras Chicas
                </span>
                <span className="font-extrabold text-xs px-1.5 py-0.5 rounded-md bg-primary-fixed text-on-primary-fixed">
                  Digital
                </span>
              </div>
              <span className="text-[11px] text-on-surface-variant hidden sm:inline-block font-medium">
                Directorio & Portal Regional
              </span>
            </div>
          </Link>

          {/* Location Selector (Tablet & Desktop) */}
          <div className="relative hidden md:block">
            <button
              type="button"
              onClick={() => setLocationDropdownOpen(!locationDropdownOpen)}
              className="flex items-center gap-1.5 px-3 py-2 rounded-xl bg-surface-container-low hover:bg-surface-container border border-surface-container-high text-xs font-semibold text-on-surface transition-colors"
            >
              <MapPin className="w-3.5 h-3.5 text-primary shrink-0" />
              <span>{selectedLocation === 'all' ? 'Todo Sierras Chicas' : selectedLocObj?.name}</span>
              <ChevronDown className="w-3.5 h-3.5 text-outline" />
            </button>

            {locationDropdownOpen && (
              <div className="absolute left-0 mt-2 w-56 rounded-2xl bg-surface-container-lowest border border-surface-container-high shadow-card p-1.5 z-50 animate-in fade-in zoom-in-95">
                <button
                  type="button"
                  onClick={() => { setSelectedLocation('all'); setLocationDropdownOpen(false); }}
                  className={`w-full text-left px-3 py-2 rounded-xl text-xs font-medium transition-colors ${
                    selectedLocation === 'all' ? 'bg-primary text-white font-bold' : 'text-on-surface hover:bg-surface-container'
                  }`}
                >
                  ✨ Todo el Valle (Todas las localidades)
                </button>
                {locations.map(loc => (
                  <button
                    key={loc.id}
                    type="button"
                    onClick={() => { setSelectedLocation(loc.slug); setLocationDropdownOpen(false); }}
                    className={`w-full text-left px-3 py-2 rounded-xl text-xs font-medium transition-colors ${
                      selectedLocation === loc.slug ? 'bg-primary text-white font-bold' : 'text-on-surface hover:bg-surface-container'
                    }`}
                  >
                    📍 {loc.name}
                  </button>
                ))}
              </div>
            )}
          </div>

          {/* Role-Specific Desktop Navigation Links */}
          <nav className="hidden lg:flex items-center gap-1 bg-surface-container-low p-1 rounded-2xl border border-surface-container-high">
            <Link
              to="/"
              className={`px-3 py-1.5 rounded-xl text-xs font-bold transition-all flex items-center gap-1.5 ${
                isHome ? 'bg-surface-container-lowest text-primary shadow-sm' : 'text-on-surface-variant hover:text-on-surface'
              }`}
            >
              <Smartphone className="w-4 h-4" />
              <span>Directorio PWA</span>
            </Link>

            {/* Merchant-Only Link */}
            {isMerchant && (
              <Link
                to="/panel/gondola"
                className={`px-3 py-1.5 rounded-xl text-xs font-bold transition-all flex items-center gap-1.5 ${
                  isMerchantRoute ? 'bg-surface-container-lowest text-amber-600 shadow-sm' : 'text-on-surface-variant hover:text-on-surface'
                }`}
              >
                <Store className="w-4 h-4 text-amber-600" />
                <span>Panel Comercio</span>
              </Link>
            )}

            {/* Admin-Only Link */}
            {isAdmin && (
              <Link
                to="/admin"
                className={`px-3 py-1.5 rounded-xl text-xs font-bold transition-all flex items-center gap-1.5 ${
                  isAdminRoute ? 'bg-surface-container-lowest text-indigo-600 shadow-sm' : 'text-on-surface-variant hover:text-on-surface'
                }`}
              >
                <ShieldCheck className="w-4 h-4 text-indigo-600" />
                <span>SuperAdmin SaaS</span>
              </Link>
            )}
          </nav>

          {/* Right Actions: Cart + Favorites + User Menu / Login */}
          <div className="flex items-center gap-2">
            
            {/* Favorites Icon */}
            <Link
              to="/favoritos"
              className="p-2.5 rounded-xl text-on-surface-variant hover:text-rose-600 hover:bg-rose-50 transition-colors relative"
              title="Mis Favoritos"
            >
              <Heart className="w-5 h-5" />
              {favorites.length > 0 && (
                <span className="absolute top-1.5 right-1.5 w-2 h-2 rounded-full bg-rose-600"></span>
              )}
            </Link>

            {/* Cart Trigger Button */}
            <button
              type="button"
              onClick={() => setIsCartOpen(true)}
              className="relative flex items-center gap-2 px-3.5 py-2 rounded-xl bg-primary text-white font-bold text-xs shadow-md shadow-primary/25 hover:bg-primary-container transition-all active:scale-95"
            >
              <ShoppingBag className="w-4 h-4" />
              <span className="hidden sm:inline">Carrito</span>
              {cartItemCount > 0 && (
                <span className="px-1.5 py-0.5 rounded-full bg-primary-fixed text-on-primary-fixed text-[11px] font-extrabold">
                  {cartItemCount}
                </span>
              )}
            </button>

            {/* User Profile / Login Button */}
            {isAuthenticated ? (
              <div className="relative">
                <button
                  type="button"
                  onClick={() => setUserDropdownOpen(!userDropdownOpen)}
                  className="flex items-center gap-2 p-1.5 pr-2.5 rounded-2xl bg-surface-container-low hover:bg-surface-container border border-surface-container-high transition-colors"
                >
                  <img
                    src={currentUser.avatarUrl || 'https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?w=100'}
                    alt={currentUser.fullName}
                    className="w-7 h-7 rounded-xl object-cover ring-2 ring-primary/20"
                  />
                  <div className="hidden sm:flex flex-col text-left">
                    <span className="text-xs font-bold text-on-surface truncate max-w-[100px]">
                      {currentUser.fullName.split(' ')[0]}
                    </span>
                    <span className={`text-[9px] font-extrabold uppercase px-1 rounded-sm w-fit ${
                      userRole === 'admin' ? 'bg-indigo-100 text-indigo-800' : userRole === 'merchant' ? 'bg-amber-100 text-amber-800' : 'bg-teal-100 text-teal-800'
                    }`}>
                      {userRole}
                    </span>
                  </div>
                  <ChevronDown className="w-3.5 h-3.5 text-outline" />
                </button>

                {userDropdownOpen && (
                  <div className="absolute right-0 mt-2 w-56 rounded-2xl bg-surface-container-lowest border border-surface-container-high shadow-modal p-2 z-50 space-y-1 animate-in fade-in zoom-in-95">
                    <div className="p-2 border-b border-surface-container-high">
                      <p className="text-xs font-bold text-on-surface truncate">{currentUser.fullName}</p>
                      <p className="text-[10px] text-on-surface-variant truncate">{currentUser.email}</p>
                      <span className={`inline-block mt-1 text-[9px] font-extrabold uppercase px-1.5 py-0.2 rounded-full ${
                        userRole === 'admin' ? 'bg-indigo-100 text-indigo-800' : userRole === 'merchant' ? 'bg-amber-100 text-amber-800' : 'bg-teal-100 text-teal-800'
                      }`}>
                        Rol: {userRole}
                      </span>
                    </div>

                    {isMerchant && (
                      <Link
                        to="/panel/gondola"
                        onClick={() => setUserDropdownOpen(false)}
                        className="flex items-center gap-2 px-3 py-2 rounded-xl text-xs font-semibold text-on-surface hover:bg-surface-container"
                      >
                        <Store className="w-4 h-4 text-amber-600" />
                        <span>Mi Panel de Comercio</span>
                      </Link>
                    )}

                    {isAdmin && (
                      <Link
                        to="/admin"
                        onClick={() => setUserDropdownOpen(false)}
                        className="flex items-center gap-2 px-3 py-2 rounded-xl text-xs font-semibold text-on-surface hover:bg-surface-container"
                      >
                        <ShieldCheck className="w-4 h-4 text-indigo-600" />
                        <span>Consola SuperAdmin</span>
                      </Link>
                    )}

                    <Link
                      to="/login"
                      onClick={() => setUserDropdownOpen(false)}
                      className="flex items-center gap-2 px-3 py-2 rounded-xl text-xs font-semibold text-on-surface hover:bg-surface-container"
                    >
                      <Sparkles className="w-4 h-4 text-primary" />
                      <span>Cambiar de Cuenta / Rol</span>
                    </Link>

                    <button
                      type="button"
                      onClick={handleLogout}
                      className="w-full flex items-center gap-2 px-3 py-2 rounded-xl text-xs font-bold text-rose-600 hover:bg-rose-50 transition-colors text-left pt-1 border-t border-surface-container-high"
                    >
                      <LogOut className="w-4 h-4" />
                      <span>Cerrar Sesión</span>
                    </button>
                  </div>
                )}
              </div>
            ) : (
              <Link
                to="/login"
                className="px-3.5 py-2 rounded-xl bg-surface-container hover:bg-surface-container-high text-on-surface font-extrabold text-xs flex items-center gap-1.5 transition-all shadow-xs"
              >
                <LogIn className="w-3.5 h-3.5 text-primary" />
                <span>Ingresar</span>
              </Link>
            )}

            {/* Mobile Menu Toggle Button */}
            <button
              type="button"
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="lg:hidden p-2 rounded-xl text-on-surface-variant hover:bg-surface-container transition-colors"
            >
              {mobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
            </button>
          </div>

        </div>
      </div>

      {/* Mobile Menu Drawer */}
      {mobileMenuOpen && (
        <div className="lg:hidden border-t border-surface-container-high bg-surface-container-lowest px-4 pt-3 pb-5 space-y-3 animate-in slide-in-from-top-2">
          
          {/* User Status Bar in Mobile */}
          {isAuthenticated ? (
            <div className="flex items-center justify-between p-3 rounded-2xl bg-surface border border-surface-container-high">
              <div className="flex items-center gap-2.5">
                <img src={currentUser.avatarUrl} alt={currentUser.fullName} className="w-8 h-8 rounded-xl object-cover" />
                <div>
                  <h4 className="text-xs font-bold text-on-surface">{currentUser.fullName}</h4>
                  <span className="text-[10px] text-outline uppercase font-extrabold">Rol: {userRole}</span>
                </div>
              </div>
              <button
                onClick={() => { handleLogout(); setMobileMenuOpen(false); }}
                className="text-xs font-bold text-rose-600 p-1.5 hover:bg-rose-50 rounded-lg"
              >
                Salir
              </button>
            </div>
          ) : (
            <Link
              to="/login"
              onClick={() => setMobileMenuOpen(false)}
              className="w-full py-2.5 rounded-xl bg-primary text-white font-bold text-xs flex items-center justify-center gap-2 shadow-sm"
            >
              <LogIn className="w-4 h-4" />
              <span>Iniciar Sesión / Acceso por Rol</span>
            </Link>
          )}

          <div className="space-y-1">
            <span className="text-[11px] font-bold text-outline uppercase tracking-wider px-2">Vistas Habilitadas</span>
            
            <Link
              to="/"
              onClick={() => setMobileMenuOpen(false)}
              className="flex items-center gap-3 px-3 py-2.5 rounded-xl text-xs font-bold text-on-surface hover:bg-surface-container"
            >
              <Smartphone className="w-4 h-4 text-primary" />
              <span>Directorio Regional Vecinos</span>
            </Link>

            {isMerchant && (
              <Link
                to="/panel/gondola"
                onClick={() => setMobileMenuOpen(false)}
                className="flex items-center gap-3 px-3 py-2.5 rounded-xl text-xs font-bold text-on-surface hover:bg-surface-container"
              >
                <Store className="w-4 h-4 text-amber-600" />
                <span>Panel de Mi Comercio (Góndola & POS)</span>
              </Link>
            )}

            {isAdmin && (
              <Link
                to="/admin"
                onClick={() => setMobileMenuOpen(false)}
                className="flex items-center gap-3 px-3 py-2.5 rounded-xl text-xs font-bold text-on-surface hover:bg-surface-container"
              >
                <ShieldCheck className="w-4 h-4 text-indigo-600" />
                <span>Consola Central SuperAdmin</span>
              </Link>
            )}
          </div>

          <div className="pt-2 border-t border-surface-container-high">
            <span className="text-[11px] font-bold text-outline uppercase tracking-wider px-2">Localidad Activa</span>
            <div className="grid grid-cols-2 gap-1.5 mt-1.5">
              <button
                type="button"
                onClick={() => { setSelectedLocation('all'); setMobileMenuOpen(false); }}
                className={`text-left px-2.5 py-2 rounded-xl text-xs font-semibold ${
                  selectedLocation === 'all' ? 'bg-primary text-white' : 'bg-surface-container text-on-surface'
                }`}
              >
                ✨ Todo el Valle
              </button>
              {locations.map(loc => (
                <button
                  key={loc.id}
                  type="button"
                  onClick={() => { setSelectedLocation(loc.slug); setMobileMenuOpen(false); }}
                  className={`text-left px-2.5 py-2 rounded-xl text-xs font-semibold truncate ${
                    selectedLocation === loc.slug ? 'bg-primary text-white' : 'bg-surface-container text-on-surface'
                  }`}
                >
                  📍 {loc.name}
                </button>
              ))}
            </div>
          </div>
        </div>
      )}
    </header>
  );
}
