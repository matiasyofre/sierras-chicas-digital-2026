import React, { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { useApp } from '../../context/AppContext';
import { ShieldCheck, Lock, Mail, ArrowLeft, KeyRound, Sparkles } from 'lucide-react';

export default function AdminLoginView() {
  const { loginWithDemo, loginWithEmail } = useApp();
  const navigate = useNavigate();

  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [loading, setLoading] = useState(false);
  const [errorMsg, setErrorMsg] = useState('');

  const handleAdminDemo = () => {
    const acc = loginWithDemo('admin');
    if (acc) {
      navigate('/admin', { replace: true });
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!email.trim() || !password) return;

    setLoading(true);
    setErrorMsg('');
    try {
      const res = await loginWithEmail(email, password);
      if (res.success && res.user.role === 'admin') {
        navigate('/admin', { replace: true });
      } else {
        setErrorMsg('Acceso denegado. Esta cuenta no posee permisos de SuperAdministrador.');
      }
    } catch (err) {
      setErrorMsg('Credenciales inválidas.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="flex-1 bg-slate-950 text-white py-12 px-4 sm:px-6 lg:px-8 flex items-center justify-center min-h-screen animate-in fade-in">
      <div className="w-full max-w-md space-y-6">
        
        {/* Back Link */}
        <div className="flex justify-start">
          <Link
            to="/"
            className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-xl bg-slate-900 border border-slate-800 text-xs font-bold text-slate-300 hover:text-white hover:bg-slate-800 transition-colors shadow-xs"
          >
            <ArrowLeft className="w-3.5 h-3.5" />
            <span>Volver al Portal</span>
          </Link>
        </div>

        {/* Security Shield Header */}
        <div className="text-center space-y-2">
          <div className="w-14 h-14 rounded-2xl bg-indigo-600/20 border border-indigo-500/40 text-indigo-400 flex items-center justify-center mx-auto shadow-xl shadow-indigo-950">
            <ShieldCheck className="w-8 h-8 text-indigo-400" />
          </div>
          <h1 className="text-2xl font-extrabold tracking-tight text-white">
            SuperAdmin Console
          </h1>
          <p className="text-xs text-slate-400 max-w-sm mx-auto">
            Acceso restringido y autenticación central para la dirección de Sierras Chicas Digital.
          </p>
        </div>

        {/* 1-Click Demo for Testing */}
        <div className="bg-slate-900/90 p-4 rounded-3xl border border-indigo-900/50 space-y-2">
          <button
            type="button"
            onClick={handleAdminDemo}
            className="w-full p-3.5 rounded-2xl bg-indigo-950/80 hover:bg-indigo-900 border border-indigo-800/60 text-left transition-all flex items-center justify-between group"
          >
            <div className="flex items-center gap-2.5">
              <Sparkles className="w-4 h-4 text-indigo-400" />
              <div>
                <span className="text-xs font-extrabold text-white block">Acceso Directo SuperAdmin (Dev)</span>
                <span className="text-[11px] text-indigo-300 font-mono">admin@sierraschicasdigital.com</span>
              </div>
            </div>
            <span className="text-[10px] bg-indigo-500 text-white font-extrabold px-2 py-0.5 rounded-full">ENTRAR</span>
          </button>
        </div>

        {/* Form */}
        <form onSubmit={handleSubmit} className="bg-slate-900/90 p-6 rounded-3xl border border-slate-800 shadow-2xl space-y-4">
          {errorMsg && (
            <div className="p-3 rounded-xl bg-rose-950/50 border border-rose-800 text-rose-300 text-xs font-semibold">
              {errorMsg}
            </div>
          )}

          <div className="space-y-1.5">
            <label className="text-xs font-bold text-slate-300 block">Correo Administrador</label>
            <div className="flex items-center gap-2 bg-slate-950 px-3.5 py-2.5 rounded-xl border border-slate-800 focus-within:border-indigo-500 transition-colors">
              <Mail className="w-4 h-4 text-slate-500 shrink-0" />
              <input
                type="email"
                required
                value={email}
                onChange={e => setEmail(e.target.value)}
                placeholder="admin@sierraschicasdigital.com"
                className="w-full bg-transparent text-xs text-white placeholder:text-slate-600 focus:outline-none"
              />
            </div>
          </div>

          <div className="space-y-1.5">
            <label className="text-xs font-bold text-slate-300 block">Contraseña de Seguridad</label>
            <div className="flex items-center gap-2 bg-slate-950 px-3.5 py-2.5 rounded-xl border border-slate-800 focus-within:border-indigo-500 transition-colors">
              <Lock className="w-4 h-4 text-slate-500 shrink-0" />
              <input
                type="password"
                required
                value={password}
                onChange={e => setPassword(e.target.value)}
                placeholder="••••••••••••"
                className="w-full bg-transparent text-xs text-white placeholder:text-slate-600 focus:outline-none"
              />
            </div>
          </div>

          <button
            type="submit"
            disabled={loading}
            className="w-full py-3 rounded-xl bg-indigo-600 hover:bg-indigo-500 text-white font-extrabold text-xs flex items-center justify-center gap-2 shadow-lg shadow-indigo-950 transition-all active:scale-95 disabled:opacity-50"
          >
            <KeyRound className="w-4 h-4" />
            <span>{loading ? 'Verificando...' : 'Iniciar Sesión SuperAdmin'}</span>
          </button>
        </form>

      </div>
    </div>
  );
}
