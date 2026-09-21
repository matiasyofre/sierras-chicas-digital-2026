import React, { useState } from 'react';
import { useNavigate, useLocation, Link } from 'react-router-dom';
import { useApp } from '../../context/AppContext';
import { 
  LogIn, 
  UserPlus, 
  Store, 
  ShieldCheck, 
  User, 
  Sparkles, 
  ArrowRight, 
  Lock, 
  Mail, 
  MapPin,
  CheckCircle2
} from 'lucide-react';

export default function LoginView() {
  const { loginWithDemo, loginWithEmail, registerWithEmail, currentUser } = useApp();
  const navigate = useNavigate();
  const location = useLocation();

  const [activeTab, setActiveTab] = useState('login'); // 'login', 'register'
  
  // Login Form
  const [loginEmail, setLoginEmail] = useState('');
  const [loginPassword, setLoginPassword] = useState('');
  
  // Register Form
  const [regFullName, setRegFullName] = useState('');
  const [regEmail, setRegEmail] = useState('');
  const [regPassword, setRegPassword] = useState('');
  const [regRole, setRegRole] = useState('user'); // 'user', 'merchant'
  const [regBizName, setRegBizName] = useState('');
  const [regLocation, setRegLocation] = useState('Río Ceballos');

  const [loading, setLoading] = useState(false);
  const [errorMsg, setErrorMsg] = useState('');

  const redirectAfterLogin = (role) => {
    const from = location.state?.from?.pathname;
    if (from) {
      navigate(from, { replace: true });
      return;
    }

    if (role === 'admin') {
      navigate('/admin', { replace: true });
    } else if (role === 'merchant') {
      navigate('/panel/gondola', { replace: true });
    } else {
      navigate('/', { replace: true });
    }
  };

  const handleDemoLogin = (demoKey) => {
    const account = loginWithDemo(demoKey);
    if (account) {
      redirectAfterLogin(account.role);
    }
  };

  const handleLoginSubmit = async (e) => {
    e.preventDefault();
    if (!loginEmail.trim() || !loginPassword) return;

    setLoading(true);
    setErrorMsg('');
    try {
      const res = await loginWithEmail(loginEmail, loginPassword);
      if (res.success) {
        redirectAfterLogin(res.user.role);
      }
    } catch (err) {
      setErrorMsg('Credenciales inválidas. Intente nuevamente.');
    } finally {
      setLoading(false);
    }
  };

  const handleRegisterSubmit = async (e) => {
    e.preventDefault();
    if (!regEmail.trim() || !regPassword) return;

    setLoading(true);
    setErrorMsg('');
    try {
      const res = await registerWithEmail({
        email: regEmail,
        password: regPassword,
        fullName: regFullName,
        role: regRole,
        businessName: regBizName,
        location: regLocation
      });
      if (res.success) {
        redirectAfterLogin(res.user.role);
      }
    } catch (err) {
      setErrorMsg('Error al registrar usuario.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="flex-1 bg-surface py-8 px-4 sm:px-6 lg:px-8 flex items-center justify-center min-h-[85vh] animate-in fade-in">
      <div className="w-full max-w-xl space-y-6">
        
        {/* Brand Header */}
        <div className="text-center space-y-2">
          <div className="w-12 h-12 rounded-2xl bg-primary text-white flex items-center justify-center mx-auto shadow-md shadow-primary/25">
            <span className="material-symbols-outlined text-[28px]">landscape</span>
          </div>
          <h1 className="text-xl sm:text-2xl font-extrabold text-on-surface tracking-tight">
            Acceso a Sierras Chicas Digital
          </h1>
          <p className="text-xs text-on-surface-variant max-w-md mx-auto">
            Ingresá a tu cuenta según tu rol o probá el sistema con los accesos demo directos.
          </p>
        </div>

        {/* 1-Click Demo Accounts Selector */}
        <div className="bg-surface-container-lowest p-5 rounded-3xl border border-surface-container-high shadow-subtle space-y-3">
          <div className="flex items-center gap-1.5">
            <Sparkles className="w-4 h-4 text-amber-500" />
            <span className="text-xs font-extrabold uppercase tracking-wider text-on-surface">
              Acceso Rápido por Rol (1 Clic)
            </span>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
            
            {/* Demo Vecino */}
            <button
              type="button"
              onClick={() => handleDemoLogin('vecino')}
              className="p-3.5 rounded-2xl bg-teal-50/70 border border-teal-200 hover:bg-teal-100 hover:border-teal-400 text-left transition-all space-y-1.5 group active:scale-95"
            >
              <div className="flex items-center justify-between">
                <span className="text-xs font-extrabold text-teal-950 flex items-center gap-1">
                  <User className="w-3.5 h-3.5 text-teal-700" />
                  <span>1. Vecino</span>
                </span>
                <span className="text-[10px] bg-teal-200 text-teal-900 px-1.5 py-0.2 rounded font-mono font-bold">PWA</span>
              </div>
              <p className="text-[11px] text-teal-800 leading-tight">
                Directorio, compras, favoritos y pedidos wa.me
              </p>
            </button>

            {/* Demo Comercio */}
            <button
              type="button"
              onClick={() => handleDemoLogin('comercio')}
              className="p-3.5 rounded-2xl bg-amber-50/70 border border-amber-200 hover:bg-amber-100 hover:border-amber-400 text-left transition-all space-y-1.5 group active:scale-95"
            >
              <div className="flex items-center justify-between">
                <span className="text-xs font-extrabold text-amber-950 flex items-center gap-1">
                  <Store className="w-3.5 h-3.5 text-amber-700" />
                  <span>2. Comercio</span>
                </span>
                <span className="text-[10px] bg-amber-200 text-amber-900 px-1.5 py-0.2 rounded font-mono font-bold">PRO</span>
              </div>
              <p className="text-[11px] text-amber-800 leading-tight">
                Góndola de precios rápida y POS Comandas Kanban
              </p>
            </button>

            {/* Demo Admin */}
            <button
              type="button"
              onClick={() => handleDemoLogin('admin')}
              className="p-3.5 rounded-2xl bg-indigo-50/70 border border-indigo-200 hover:bg-indigo-100 hover:border-indigo-400 text-left transition-all space-y-1.5 group active:scale-95"
            >
              <div className="flex items-center justify-between">
                <span className="text-xs font-extrabold text-indigo-950 flex items-center gap-1">
                  <ShieldCheck className="w-3.5 h-3.5 text-indigo-700" />
                  <span>3. SuperAdmin</span>
                </span>
                <span className="text-[10px] bg-indigo-200 text-indigo-900 px-1.5 py-0.2 rounded font-mono font-bold">SaaS</span>
              </div>
              <p className="text-[11px] text-indigo-800 leading-tight">
                Métricas MRR, comercios, suscripciones del valle
              </p>
            </button>

          </div>
        </div>

        {/* Traditional Form Card */}
        <div className="bg-surface-container-lowest p-6 sm:p-7 rounded-3xl border border-surface-container-high shadow-card space-y-5">
          
          {/* Tabs */}
          <div className="flex bg-surface p-1 rounded-2xl border border-surface-container-high">
            <button
              type="button"
              onClick={() => setActiveTab('login')}
              className={`flex-1 py-2 rounded-xl text-xs font-bold transition-all ${
                activeTab === 'login'
                  ? 'bg-surface-container-lowest text-on-surface shadow-sm'
                  : 'text-on-surface-variant hover:text-on-surface'
              }`}
            >
              Iniciar Sesión
            </button>
            <button
              type="button"
              onClick={() => setActiveTab('register')}
              className={`flex-1 py-2 rounded-xl text-xs font-bold transition-all ${
                activeTab === 'register'
                  ? 'bg-surface-container-lowest text-on-surface shadow-sm'
                  : 'text-on-surface-variant hover:text-on-surface'
              }`}
            >
              Crear Cuenta
            </button>
          </div>

          {errorMsg && (
            <div className="p-3 rounded-xl bg-rose-50 border border-rose-200 text-rose-700 text-xs font-semibold">
              {errorMsg}
            </div>
          )}

          {activeTab === 'login' ? (
            /* Login Form */
            <form onSubmit={handleLoginSubmit} className="space-y-4 text-xs">
              <div>
                <label className="font-bold text-on-surface block mb-1">Correo Electrónico</label>
                <div className="relative flex items-center">
                  <Mail className="w-4 h-4 text-outline absolute left-3" />
                  <input
                    type="email"
                    required
                    placeholder="tu@email.com"
                    value={loginEmail}
                    onChange={e => setLoginEmail(e.target.value)}
                    className="w-full pl-9 pr-3 py-2.5 rounded-xl bg-surface border border-surface-container-high text-on-surface focus:outline-none focus:border-primary"
                  />
                </div>
              </div>

              <div>
                <label className="font-bold text-on-surface block mb-1">Contraseña</label>
                <div className="relative flex items-center">
                  <Lock className="w-4 h-4 text-outline absolute left-3" />
                  <input
                    type="password"
                    required
                    placeholder="••••••••"
                    value={loginPassword}
                    onChange={e => setLoginPassword(e.target.value)}
                    className="w-full pl-9 pr-3 py-2.5 rounded-xl bg-surface border border-surface-container-high text-on-surface focus:outline-none focus:border-primary"
                  />
                </div>
              </div>

              <button
                type="submit"
                disabled={loading}
                className="w-full py-3 rounded-xl bg-primary hover:bg-primary-container text-white font-extrabold text-xs sm:text-sm shadow-md shadow-primary/25 flex items-center justify-center gap-2 transition-all active:scale-[0.99]"
              >
                <LogIn className="w-4 h-4" />
                <span>{loading ? 'Ingresando...' : 'Iniciar Sesión'}</span>
              </button>
            </form>
          ) : (
            /* Register Form */
            <form onSubmit={handleRegisterSubmit} className="space-y-4 text-xs">
              <div>
                <label className="font-bold text-on-surface block mb-1">Tipo de Cuenta</label>
                <div className="grid grid-cols-2 gap-2">
                  <button
                    type="button"
                    onClick={() => setRegRole('user')}
                    className={`py-2 px-3 rounded-xl border font-bold text-xs flex items-center justify-center gap-1.5 transition-all ${
                      regRole === 'user'
                        ? 'bg-primary text-white border-primary shadow-sm'
                        : 'bg-surface border-surface-container-high text-on-surface-variant'
                    }`}
                  >
                    <User className="w-3.5 h-3.5" />
                    <span>Vecino / Turista</span>
                  </button>
                  <button
                    type="button"
                    onClick={() => setRegRole('merchant')}
                    className={`py-2 px-3 rounded-xl border font-bold text-xs flex items-center justify-center gap-1.5 transition-all ${
                      regRole === 'merchant'
                        ? 'bg-amber-600 text-white border-amber-600 shadow-sm'
                        : 'bg-surface border-surface-container-high text-on-surface-variant'
                    }`}
                  >
                    <Store className="w-3.5 h-3.5" />
                    <span>Dueño de Comercio</span>
                  </button>
                </div>
              </div>

              <div>
                <label className="font-bold text-on-surface block mb-1">Nombre Completo</label>
                <input
                  type="text"
                  required
                  placeholder="Ej: Marcelo Torres"
                  value={regFullName}
                  onChange={e => setRegFullName(e.target.value)}
                  className="w-full px-3 py-2.5 rounded-xl bg-surface border border-surface-container-high text-on-surface focus:outline-none focus:border-primary"
                />
              </div>

              {regRole === 'merchant' && (
                <div>
                  <label className="font-bold text-on-surface block mb-1">Nombre del Comercio / Emprendimiento</label>
                  <input
                    type="text"
                    required
                    placeholder="Ej: Rotisería El Ombú"
                    value={regBizName}
                    onChange={e => setRegBizName(e.target.value)}
                    className="w-full px-3 py-2.5 rounded-xl bg-surface border border-surface-container-high text-on-surface focus:outline-none focus:border-primary"
                  />
                </div>
              )}

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                <div>
                  <label className="font-bold text-on-surface block mb-1">Correo Electrónico</label>
                  <input
                    type="email"
                    required
                    placeholder="tu@email.com"
                    value={regEmail}
                    onChange={e => setRegEmail(e.target.value)}
                    className="w-full px-3 py-2.5 rounded-xl bg-surface border border-surface-container-high text-on-surface focus:outline-none focus:border-primary"
                  />
                </div>

                <div>
                  <label className="font-bold text-on-surface block mb-1">Localidad de Sierras Chicas</label>
                  <select
                    value={regLocation}
                    onChange={e => setRegLocation(e.target.value)}
                    className="w-full px-3 py-2.5 rounded-xl bg-surface border border-surface-container-high text-on-surface focus:outline-none focus:border-primary"
                  >
                    <option value="Río Ceballos">Río Ceballos</option>
                    <option value="Unquillo">Unquillo</option>
                    <option value="Mendiolaza">Mendiolaza</option>
                    <option value="Villa Allende">Villa Allende</option>
                    <option value="Salsipuedes">Salsipuedes</option>
                    <option value="La Calera">La Calera</option>
                  </select>
                </div>
              </div>

              <div>
                <label className="font-bold text-on-surface block mb-1">Crear Contraseña</label>
                <input
                  type="password"
                  required
                  placeholder="Mínimo 6 caracteres"
                  value={regPassword}
                  onChange={e => setRegPassword(e.target.value)}
                  className="w-full px-3 py-2.5 rounded-xl bg-surface border border-surface-container-high text-on-surface focus:outline-none focus:border-primary"
                />
              </div>

              <button
                type="submit"
                disabled={loading}
                className="w-full py-3 rounded-xl bg-primary hover:bg-primary-container text-white font-extrabold text-xs sm:text-sm shadow-md shadow-primary/25 flex items-center justify-center gap-2 transition-all active:scale-[0.99]"
              >
                <UserPlus className="w-4 h-4" />
                <span>{loading ? 'Creando cuenta...' : 'Crear Cuenta'}</span>
              </button>
            </form>
          )}

        </div>

      </div>
    </div>
  );
}
