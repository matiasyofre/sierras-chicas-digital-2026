import React, { useState } from 'react';
import { useNavigate, useLocation, Link } from 'react-router-dom';
import { useApp } from '../../context/AppContext';
import { 
  LogIn, 
  Store, 
  ShieldCheck, 
  Sparkles, 
  ArrowLeft, 
  Lock, 
  Mail, 
  CheckCircle2
} from 'lucide-react';

export default function LoginView() {
  const { loginWithDemo, loginWithEmail, currentUser } = useApp();
  const navigate = useNavigate();
  const location = useLocation();

  const [loginEmail, setLoginEmail] = useState('');
  const [loginPassword, setLoginPassword] = useState('');
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

  return (
    <div className="flex-1 bg-surface py-8 px-4 sm:px-6 lg:px-8 flex items-center justify-center min-h-[85vh] animate-in fade-in">
      <div className="w-full max-w-md space-y-6">
        
        {/* Back to public directory */}
        <div className="flex justify-start">
          <Link
            to="/"
            className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-xl bg-surface-container-lowest border border-surface-container-high text-xs font-bold text-on-surface hover:bg-surface-container transition-colors shadow-xs"
          >
            <ArrowLeft className="w-3.5 h-3.5" />
            <span>Volver al Directorio de Vecinos</span>
          </Link>
        </div>

        {/* Brand Header */}
        <div className="text-center space-y-2">
          <div className="w-12 h-12 rounded-2xl bg-primary text-white flex items-center justify-center mx-auto shadow-md shadow-primary/25">
            <span className="material-symbols-outlined text-[28px]">landscape</span>
          </div>
          <h1 className="text-xl sm:text-2xl font-extrabold text-on-surface tracking-tight">
            Portal de Gestión & Autogestión
          </h1>
          <p className="text-xs text-on-surface-variant max-w-sm mx-auto">
            Acceso exclusivo para Dueños de Comercios y Administradores de Sierras Chicas Digital.
          </p>
        </div>        {/* 1-Click Demo Account for Merchant */}
        <div className="bg-surface-container-lowest p-5 rounded-3xl border border-surface-container-high shadow-subtle space-y-3">
          <div className="flex items-center gap-1.5">
            <Sparkles className="w-4 h-4 text-amber-500" />
            <span className="text-xs font-extrabold uppercase tracking-wider text-on-surface">
              Acceso Rápido Comercio Demo
            </span>
          </div>

          <div>
            {/* Demo Comercio */}
            <button
              type="button"
              onClick={() => handleDemoLogin('comercio')}
              className="w-full p-4 rounded-2xl bg-amber-50/70 border border-amber-200 hover:bg-amber-100 hover:border-amber-400 text-left transition-all space-y-1.5 group active:scale-95"
            >
              <div className="flex items-center justify-between">
                <span className="text-xs font-extrabold text-amber-950 flex items-center gap-1.5">
                  <Store className="w-4 h-4 text-amber-700" />
                  <span>Dueño de Comercio (Café de las Sierras)</span>
                </span>
                <span className="text-[10px] bg-amber-200 text-amber-900 px-2 py-0.5 rounded-full font-mono font-bold">1-CLIC</span>
              </div>
              <p className="text-xs text-amber-800 leading-tight">
                Entrar a la Góndola de precios, POS Comandas Kanban y configuración del local.
              </p>
            </button>
          </div>
        </div>  </div>

        {/* Traditional Login Form */}
        <div className="bg-surface-container-lowest p-6 rounded-3xl border border-surface-container-high shadow-card space-y-4">
          <h3 className="text-xs font-bold text-outline uppercase tracking-wider">
            O ingresá con tus credenciales
          </h3>

          {errorMsg && (
            <div className="p-3 rounded-xl bg-rose-50 border border-rose-200 text-rose-700 text-xs font-semibold">
              {errorMsg}
            </div>
          )}

          <form onSubmit={handleLoginSubmit} className="space-y-4 text-xs">
            <div>
              <label className="font-bold text-on-surface block mb-1">Correo Electrónico</label>
              <div className="relative flex items-center">
                <Mail className="w-4 h-4 text-outline absolute left-3" />
                <input
                  type="email"
                  required
                  placeholder="comercio@tunegocio.com"
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

        </div>

        <p className="text-[11px] text-center text-on-surface-variant">
          ¿Sos vecino o turista? No necesitás registrarte para explorar el directorio y hacer pedidos.
        </p>

      </div>
    </div>
  );
}
