import React, { useState, useRef, useEffect } from 'react';
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
  Sparkles,
  Download,
  Info,
  Compass,
  Search
} from 'lucide-react';

export default function AppNavbar() {
  const { 
    locations, 
    selectedLocation, 
    setSelectedLocation, 
    cartItemCount, 
    setIsCartOpen,
    setIsPwaModalOpen,
    currentUser,
    userRole,
    isAuthenticated,
    isMerchant,
    isAdmin,
    logout,
    favorites,
    settings
  } = useApp();
  
  const location = useLocation();
  const navigate = useNavigate();
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [locationDropdownOpen, setLocationDropdownOpen] = useState(false);
  const [userDropdownOpen, setUserDropdownOpen] = useState(false);

  const locationDropdownRef = useRef(null);
  const userDropdownRef = useRef(null);

  const selectedLocObj = locations.find(l => l.slug === selectedLocation);

  // Click outside listener for dropdowns
  useEffect(() => {
    function handleClickOutside(event) {
      if (locationDropdownRef.current && !locationDropdownRef.current.contains(event.target)) {
        setLocationDropdownOpen(false);
      }
      if (userDropdownRef.current && !userDropdownRef.current.contains(event.target)) {
        setUserDropdownOpen(false);
      }
    }
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  const handleLogout = () => {
    logout();
    setUserDropdownOpen(false);
    navigate('/');
  };

  const handleNavScroll = (elementId) => {
    setMobileMenuOpen(false);
    if (location.pathname !== '/') {
      navigate('/#' + elementId);
      setTimeout(() => {
        const el = document.getElementById(elementId);
        if (el) el.scrollIntoView({ behavior: 'smooth' });
      }, 200);
    } else {
      const el = document.getElementById(elementId);
      if (el) {
        el.scrollIntoView({ behavior: 'smooth' });
      }
    }
  };

  const handleSelectLocationNav = (slug) => {
    setSelectedLocation(slug);
    setLocationDropdownOpen(false);
    setMobileMenuOpen(false);
    if (slug === 'all') {
      navigate('/explorar');
    } else {
      navigate(`/localidad/${slug}`);
    }
  };

  const whatsappPhone = settings?.contactWhatsapp || '5493543000000';
  const whatsappUrl = `https://wa.me/${whatsappPhone.replace(/[^0-9]/g, '')}?text=${encodeURIComponent('Hola Sierras Chicas Digital, necesito información o ayuda para pautar mi comercio.')}`;

  return (
    <header className="sticky top-0 z-50 bg-white/95 backdrop-blur-xl border-b border-slate-200/80 shadow-xs transition-all">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16 sm:h-20 gap-3">
          
          {/* Brand Logo & Name with Animated Video Logo */}
          <Link to="/" className="flex items-center gap-2.5 sm:gap-3 group shrink-0">
            <div className="w-10 h-10 sm:w-11 sm:h-11 rounded-2xl overflow-hidden bg-slate-900 flex items-center justify-center shadow-md shadow-emerald-900/20 group-hover:scale-105 transition-transform border border-emerald-500/20">
              <video
                src="/videos/logo-animado.mp4"
                autoPlay
                loop
                muted
                playsInline
                className="w-full h-full object-cover"
              />
            </div>
            <div className="flex flex-col">
              <div className="flex items-center gap-1.5">
                <span className="font-black text-base sm:text-lg tracking-tight text-slate-900">
                  Sierras Chicas
                </span>
                <span className="font-extrabold text-xs px-1.5 py-0.5 rounded-md bg-emerald-100 text-emerald-900">
                  Digital
                </span>
              </div>
              <span className="text-[11px] text-slate-500 hidden sm:inline-block font-bold">
                Directorio & Portal del Corredor
              </span>
            </div>
          </Link>

          {/* Location Selector (Tablet & Desktop with Click-Outside) */}
          <div className="relative hidden md:block" ref={locationDropdownRef}>
            <button
              type="button"
              onClick={() => setLocationDropdownOpen(!locationDropdownOpen)}
              className="flex items-center gap-1.5 px-3 py-2 rounded-xl bg-slate-100 hover:bg-slate-200/80 border border-slate-200 text-xs font-bold text-slate-800 transition-colors"
            >
              <MapPin className="w-3.5 h-3.5 text-emerald-700 shrink-0" />
              <span>{selectedLocation === 'all' ? 'Todo Sierras Chicas' : selectedLocObj?.name}</span>
              <ChevronDown className="w-3.5 h-3.5 text-slate-400" />
            </button>

            {locationDropdownOpen && (
              <div className="absolute left-0 mt-2 w-64 rounded-2xl bg-white border border-slate-200 shadow-2xl p-1.5 z-50 animate-in fade-in zoom-in-95">
                <div className="px-3 py-1.5 border-b border-slate-100">
                  <span className="text-[10px] font-black text-slate-400 uppercase tracking-wider">
                    Elegir Página por Localidad
                  </span>
                </div>
                <button
                  type="button"
                  onClick={() => handleSelectLocationNav('all')}
                  className={`w-full text-left px-3 py-2 rounded-xl text-xs font-semibold transition-colors mt-1 ${
                    selectedLocation === 'all' ? 'bg-emerald-700 text-white font-bold' : 'text-slate-700 hover:bg-slate-100'
                  }`}
                >
                  ✨ Todo el Corredor (Todas las localidades)
                </button>
                {locations.map(loc => (
                  <button
                    key={loc.id}
                    type="button"
                    onClick={() => handleSelectLocationNav(loc.slug)}
                    className={`w-full text-left px-3 py-2 rounded-xl text-xs font-semibold transition-colors flex items-center justify-between ${
                      selectedLocation === loc.slug ? 'bg-emerald-700 text-white font-bold' : 'text-slate-700 hover:bg-slate-100'
                    }`}
                  >
                    <span>📍 {loc.name}</span>
                    <span className="text-[10px] opacity-75 font-normal">Página propia</span>
                  </button>
                ))}
              </div>
            )}
          </div>

          {/* Central Menu Links (Inicio, Explorar, Nosotros, Preguntas, Contacto) */}
          <nav className="hidden lg:flex items-center gap-1 text-xs font-bold text-slate-600">
            <button
              type="button"
              onClick={() => {
                if (location.pathname !== '/') navigate('/');
                else window.scrollTo({ top: 0, behavior: 'smooth' });
              }}
              className="px-3 py-2 rounded-xl hover:text-slate-950 hover:bg-slate-100 transition-colors"
            >
              Inicio
            </button>

            <Link
              to="/explorar"
              className="px-3 py-2 rounded-xl hover:text-emerald-800 hover:bg-emerald-50 text-emerald-900 font-extrabold flex items-center gap-1.5 transition-colors"
            >
              <Search className="w-3.5 h-3.5 text-emerald-700" />
              <span>Explorar Directorio</span>
            </Link>

            <button
              type="button"
              onClick={() => handleNavScroll('nosotros')}
              className="px-3 py-2 rounded-xl hover:text-slate-950 hover:bg-slate-100 transition-colors"
            >
              Nosotros
            </button>

            <button
              type="button"
              onClick={() => handleNavScroll('planes-saas')}
              className="px-3 py-2 rounded-xl hover:text-slate-950 hover:bg-slate-100 transition-colors"
            >
              Planes
            </button>

            <button
              type="button"
              onClick={() => handleNavScroll('preguntas')}
              className="px-3 py-2 rounded-xl hover:text-slate-950 hover:bg-slate-100 transition-colors"
            >
              Preguntas
            </button>
            <button
              type="button"
              onClick={() => handleNavScroll('contacto')}
              className="px-3 py-2 rounded-xl hover:text-slate-950 hover:bg-slate-100 transition-colors"
            >
              Contacto
            </button>
          </nav>

          {/* Right Action Buttons (WhatsApp + PWA Install + Heart + Cart + Panel/User Profile) */}
          <div className="flex items-center gap-2 sm:gap-2.5 ml-auto lg:ml-0">
            
            {/* Direct WhatsApp Help Button */}
            <a
              href={whatsappUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-1.5 px-3 py-2 rounded-xl bg-emerald-500 hover:bg-emerald-600 text-white text-xs font-black transition-all shadow-sm shadow-emerald-500/30 active:scale-95 group"
              title="Atención y Ayuda por WhatsApp Oficial"
            >
              <svg className="w-4 h-4 fill-current shrink-0" viewBox="0 0 24 24">
                <path d="M.057 24l1.687-6.163c-1.041-1.804-1.588-3.849-1.587-5.946.003-6.556 5.338-11.891 11.893-11.891 3.181.001 6.167 1.24 8.413 3.488 2.245 2.248 3.481 5.236 3.48 8.414-.003 6.557-5.338 11.892-11.893 11.892-1.99-.001-3.951-.5-5.688-1.448l-6.305 1.654zm6.597-3.807c1.676.995 3.276 1.591 5.392 1.592 5.448 0 9.886-4.434 9.889-9.885.002-5.462-4.415-9.89-9.881-9.892-5.452 0-9.887 4.434-9.889 9.884-.001 2.225.651 3.891 1.746 5.634l-.999 3.648 3.742-.981zm11.387-5.464c-.074-.124-.272-.198-.57-.347-.297-.149-1.758-.868-2.031-.967-.272-.099-.47-.149-.669.149-.198.297-.768.967-.941 1.165-.173.198-.347.223-.644.074-.297-.149-1.255-.462-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.297-.347.446-.521.151-.172.2-.296.3-.495.099-.198.05-.372-.025-.521-.075-.148-.669-1.611-.916-2.206-.242-.579-.487-.501-.669-.51l-.57-.01c-.198 0-.52.074-.792.372s-1.04 1.016-1.04 2.479 1.065 2.876 1.213 3.074c.149.198 2.095 3.2 5.076 4.487.709.306 1.263.489 1.694.626.712.226 1.36.194 1.872.118.571-.085 1.758-.719 2.006-1.413.248-.695.248-1.29.173-1.414z"/>
              </svg>
              <span className="hidden sm:inline">WhatsApp</span>
            </a>

            {/* Install App CTA Button */}
            <button
              type="button"
              onClick={() => setIsPwaModalOpen(true)}
              className="hidden sm:inline-flex items-center gap-1.5 px-3 py-2 rounded-xl bg-slate-100 hover:bg-emerald-50 hover:text-emerald-900 border border-slate-200 text-slate-800 text-xs font-bold transition-all shadow-2xs group"
              title="Instalar App PWA en tu teléfono o PC"
            >
              <Smartphone className="w-3.5 h-3.5 text-emerald-700 group-hover:scale-110 transition-transform" />
              <span>Instalar</span>
            </button>

            {/* Favorites Icon */}
            <Link
              to="/favoritos"
              className="p-2 rounded-xl text-slate-600 hover:text-rose-600 hover:bg-rose-50 transition-colors relative"
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
              className="relative flex items-center gap-1.5 px-3 py-2 rounded-xl bg-emerald-700 text-white font-black text-xs shadow-md shadow-emerald-900/20 hover:bg-emerald-600 transition-all active:scale-95"
            >
              <ShoppingBag className="w-4 h-4" />
              <span className="hidden sm:inline">Carrito</span>
              {cartItemCount > 0 && (
                <span className="px-1.5 py-0.2 rounded-full bg-amber-400 text-amber-950 text-[10px] font-black">
                  {cartItemCount}
                </span>
              )}
            </button>

            {/* User Dropdown / Login Access */}
            {isAuthenticated ? (
              <div className="relative" ref={userDropdownRef}>
                <button
                  type="button"
                  onClick={() => setUserDropdownOpen(!userDropdownOpen)}
                  className="flex items-center gap-2 p-1.5 pr-2.5 rounded-2xl bg-slate-100 hover:bg-slate-200 border border-slate-200 transition-colors"
                >
                  <img
                    src={currentUser.avatarUrl || 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=100'}
                    alt={currentUser.fullName}
                    className="w-7 h-7 rounded-xl object-cover ring-2 ring-amber-500/30"
                  />
                  <div className="hidden sm:flex flex-col text-left">
                    <span className="text-xs font-bold text-slate-900 truncate max-w-[100px]">
                      {currentUser.fullName.split(' ')[0]}
                    </span>
                    <span className={`text-[9px] font-extrabold uppercase px-1 rounded-sm w-fit ${
                      userRole === 'admin' ? 'bg-indigo-100 text-indigo-800' : 'bg-amber-100 text-amber-800'
                    }`}>
                      {userRole}
                    </span>
                  </div>
                  <ChevronDown className="w-3.5 h-3.5 text-slate-400" />
                </button>

                {userDropdownOpen && (
                  <div className="absolute right-0 mt-2 w-56 rounded-2xl bg-white border border-slate-200 shadow-2xl p-2 z-50 space-y-1 animate-in fade-in zoom-in-95">
                    <div className="p-2 border-b border-slate-100">
                      <p className="text-xs font-bold text-slate-900 truncate">{currentUser.fullName}</p>
                      <p className="text-[10px] text-slate-500 truncate">{currentUser.email}</p>
                      <span className={`inline-block mt-1 text-[9px] font-extrabold uppercase px-1.5 py-0.2 rounded-full ${
                        userRole === 'admin' ? 'bg-indigo-100 text-indigo-800' : 'bg-amber-100 text-amber-800'
                      }`}>
                        Sesión: {userRole === 'admin' ? 'SuperAdmin' : 'Mi Panel Comercio'}
                      </span>
                    </div>

                    {isMerchant && (
                      <Link
                        to="/panel/gondola"
                        onClick={() => setUserDropdownOpen(false)}
                        className="flex items-center gap-2 px-3 py-2 rounded-xl text-xs font-semibold text-slate-800 hover:bg-slate-100"
                      >
                        <Store className="w-4 h-4 text-amber-600" />
                        <span>Mi Panel de Comercio</span>
                      </Link>
                    )}

                    {isAdmin && (
                      <Link
                        to="/admin"
                        onClick={() => setUserDropdownOpen(false)}
                        className="flex items-center gap-2 px-3 py-2 rounded-xl text-xs font-semibold text-slate-800 hover:bg-slate-100"
                      >
                        <ShieldCheck className="w-4 h-4 text-indigo-600" />
                        <span>Consola SuperAdmin SaaS</span>
                      </Link>
                    )}

                    <Link
                      to="/login"
                      onClick={() => setUserDropdownOpen(false)}
                      className="flex items-center gap-2 px-3 py-2 rounded-xl text-xs font-semibold text-slate-800 hover:bg-slate-100"
                    >
                      <Sparkles className="w-4 h-4 text-emerald-600" />
                      <span>Cambiar de Cuenta</span>
                    </Link>

                    <button
                      type="button"
                      onClick={handleLogout}
                      className="w-full flex items-center gap-2 px-3 py-2 rounded-xl text-xs font-bold text-rose-600 hover:bg-rose-50 transition-colors text-left pt-1 border-t border-slate-100"
                    >
                      <LogOut className="w-4 h-4" />
                      <span>Cerrar Sesión</span>
                    </button>
                  </div>
                )}
              </div>
            ) : (
              /* Merchant Access Button */
              <Link
                to="/login"
                className="px-3 py-2 rounded-xl bg-slate-100 hover:bg-slate-200 text-slate-700 hover:text-slate-900 font-bold text-xs flex items-center gap-1.5 transition-all shadow-xs"
                title="Acceso para Comerciantes y Administradores"
              >
                <Store className="w-3.5 h-3.5 text-amber-600" />
                <span className="hidden sm:inline">Mi Panel</span>
              </Link>
            )}

            {/* Mobile Menu Toggle Button */}
            <button
              type="button"
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="lg:hidden p-2 rounded-xl text-slate-700 hover:bg-slate-100 transition-colors"
            >
              {mobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
            </button>
          </div>

        </div>
      </div>

      {/* Mobile Menu Drawer */}
      {mobileMenuOpen && (
        <div className="lg:hidden border-t border-slate-200 bg-white px-4 pt-3 pb-5 space-y-3 animate-in slide-in-from-top-2">
          
          {/* WhatsApp Direct in Mobile */}
          <a
            href={whatsappUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="w-full py-2.5 px-3 rounded-xl bg-emerald-500 text-white font-bold text-xs flex items-center justify-center gap-2 shadow-xs"
          >
            <svg className="w-4 h-4 fill-current" viewBox="0 0 24 24">
              <path d="M.057 24l1.687-6.163c-1.041-1.804-1.588-3.849-1.587-5.946.003-6.556 5.338-11.891 11.893-11.891 3.181.001 6.167 1.24 8.413 3.488 2.245 2.248 3.481 5.236 3.48 8.414-.003 6.557-5.338 11.892-11.893 11.892-1.99-.001-3.951-.5-5.688-1.448l-6.305 1.654zm6.597-3.807c1.676.995 3.276 1.591 5.392 1.592 5.448 0 9.886-4.434 9.889-9.885.002-5.462-4.415-9.89-9.881-9.892-5.452 0-9.887 4.434-9.889 9.884-.001 2.225.651 3.891 1.746 5.634l-.999 3.648 3.742-.981zm11.387-5.464c-.074-.124-.272-.198-.57-.347-.297-.149-1.758-.868-2.031-.967-.272-.099-.47-.149-.669.149-.198.297-.768.967-.941 1.165-.173.198-.347.223-.644.074-.297-.149-1.255-.462-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.297-.347.446-.521.151-.172.2-.296.3-.495.099-.198.05-.372-.025-.521-.075-.148-.669-1.611-.916-2.206-.242-.579-.487-.501-.669-.51l-.57-.01c-.198 0-.52.074-.792.372s-1.04 1.016-1.04 2.479 1.065 2.876 1.213 3.074c.149.198 2.095 3.2 5.076 4.487.709.306 1.263.489 1.694.626.712.226 1.36.194 1.872.118.571-.085 1.758-.719 2.006-1.413.248-.695.248-1.29.173-1.414z"/>
            </svg>
            <span>Contacto Oficial por WhatsApp</span>
          </a>

          {/* Quick Install in Mobile Drawer */}
          <button
            type="button"
            onClick={() => {
              setIsPwaModalOpen(true);
              setMobileMenuOpen(false);
            }}
            className="w-full py-2.5 px-3 rounded-xl bg-emerald-50 text-emerald-900 border border-emerald-200 font-bold text-xs flex items-center justify-center gap-2 shadow-xs"
          >
            <Smartphone className="w-4 h-4 text-emerald-700" />
            <span>Instalar Aplicación PWA</span>
          </button>

          {isAuthenticated ? (
            <div className="flex items-center justify-between p-3 rounded-2xl bg-slate-50 border border-slate-200">
              <div className="flex items-center gap-2.5">
                <img src={currentUser.avatarUrl} alt={currentUser.fullName} className="w-8 h-8 rounded-xl object-cover" />
                <div>
                  <h4 className="text-xs font-bold text-slate-900">{currentUser.fullName}</h4>
                  <span className="text-[10px] text-slate-500 uppercase font-black">Rol: {userRole}</span>
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
              className="w-full py-2.5 px-3 rounded-xl bg-slate-100 hover:bg-slate-200 text-slate-900 font-bold text-xs flex items-center justify-center gap-1.5"
            >
              <Store className="w-3.5 h-3.5 text-amber-600" />
              <span>Acceso para Comercios & Administradores</span>
            </Link>
          )}

          <div className="space-y-1">
            <span className="text-[11px] font-black text-slate-400 uppercase tracking-wider px-2">Menú Principal</span>
            
            <button
              type="button"
              onClick={() => {
                setMobileMenuOpen(false);
                if (location.pathname !== '/') navigate('/');
                else window.scrollTo({ top: 0, behavior: 'smooth' });
              }}
              className="w-full text-left flex items-center gap-3 px-3 py-2.5 rounded-xl text-xs font-bold text-slate-800 hover:bg-slate-100"
            >
              <span>🏡 Inicio</span>
            </button>

            <Link
              to="/explorar"
              onClick={() => setMobileMenuOpen(false)}
              className="w-full text-left flex items-center gap-3 px-3 py-2.5 rounded-xl text-xs font-bold text-emerald-800 bg-emerald-50"
            >
              <span>🔍 Explorar Todo el Directorio</span>
            </Link>

            <button
              type="button"
              onClick={() => handleNavScroll('nosotros')}
              className="w-full text-left flex items-center gap-3 px-3 py-2.5 rounded-xl text-xs font-bold text-slate-800 hover:bg-slate-100"
            >
              <span>🏔️ Nosotros</span>
            </button>

            <button
              type="button"
              onClick={() => handleNavScroll('planes-saas')}
              className="w-full text-left flex items-center gap-3 px-3 py-2.5 rounded-xl text-xs font-bold text-slate-800 hover:bg-slate-100"
            >
              <span>💎 Planes para Comercios</span>
            </button>

            <button
              type="button"
              onClick={() => handleNavScroll('preguntas')}
              className="w-full text-left flex items-center gap-3 px-3 py-2.5 rounded-xl text-xs font-bold text-slate-800 hover:bg-slate-100"
            >
              <span>❓ Preguntas Frecuentes</span>
            </button>

            <button
              type="button"
              onClick={() => handleNavScroll('contacto')}
              className="w-full text-left flex items-center gap-3 px-3 py-2.5 rounded-xl text-xs font-bold text-slate-800 hover:bg-slate-100"
            >
              <span>📞 Contacto</span>
            </button>

            {isMerchant && (
              <Link
                to="/panel/gondola"
                onClick={() => setMobileMenuOpen(false)}
                className="flex items-center gap-3 px-3 py-2.5 rounded-xl text-xs font-bold text-slate-800 hover:bg-slate-100"
              >
                <Store className="w-4 h-4 text-amber-600" />
                <span>Panel de Mi Comercio (Góndola & POS)</span>
              </Link>
            )}

            {isAdmin && (
              <Link
                to="/admin"
                onClick={() => setMobileMenuOpen(false)}
                className="flex items-center gap-3 px-3 py-2.5 rounded-xl text-xs font-bold text-slate-800 hover:bg-slate-100"
              >
                <ShieldCheck className="w-4 h-4 text-indigo-600" />
                <span>Consola Central SuperAdmin</span>
              </Link>
            )}
          </div>

          <div className="pt-2 border-t border-slate-200">
            <span className="text-[11px] font-black text-slate-400 uppercase tracking-wider px-2">Ver Página de Localidad</span>
            <div className="grid grid-cols-2 gap-1.5 mt-1.5">
              <button
                type="button"
                onClick={() => handleSelectLocationNav('all')}
                className={`text-left px-2.5 py-2 rounded-xl text-xs font-semibold ${
                  selectedLocation === 'all' ? 'bg-emerald-700 text-white' : 'bg-slate-100 text-slate-800'
                }`}
              >
                ✨ Todo el Corredor
              </button>
              {locations.map(loc => (
                <button
                  key={loc.id}
                  type="button"
                  onClick={() => handleSelectLocationNav(loc.slug)}
                  className={`text-left px-2.5 py-2 rounded-xl text-xs font-semibold truncate ${
                    selectedLocation === loc.slug ? 'bg-emerald-700 text-white' : 'bg-slate-100 text-slate-800'
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
