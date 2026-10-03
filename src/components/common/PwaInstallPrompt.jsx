import React, { useState, useEffect } from 'react';
import { Download, X, Smartphone, CheckCircle, Apple, Monitor } from 'lucide-react';
import { useApp } from '../../context/AppContext';

export default function PwaInstallPrompt() {
  const { isPwaModalOpen, setIsPwaModalOpen } = useApp();
  const [deferredPrompt, setDeferredPrompt] = useState(null);
  const [showPrompt, setShowPrompt] = useState(false);

  useEffect(() => {
    const handleBeforeInstallPrompt = (e) => {
      e.preventDefault();
      setDeferredPrompt(e);
      const dismissed = localStorage.getItem('scd_pwa_dismissed');
      if (!dismissed) {
        setShowPrompt(true);
      }
    };

    window.addEventListener('beforeinstallprompt', handleBeforeInstallPrompt);

    return () => {
      window.removeEventListener('beforeinstallprompt', handleBeforeInstallPrompt);
    };
  }, []);

  const handleInstallClick = async () => {
    if (!deferredPrompt) {
      setIsPwaModalOpen(true);
      return;
    }
    deferredPrompt.prompt();
    const { outcome } = await deferredPrompt.userChoice;
    if (outcome === 'accepted') {
      setShowPrompt(false);
      setIsPwaModalOpen(false);
    }
    setDeferredPrompt(null);
  };

  const handleDismiss = () => {
    setShowPrompt(false);
    localStorage.setItem('scd_pwa_dismissed', 'true');
  };

  return (
    <>
      {/* Full Explanatory Modal when clicking 'Instalar App' in navbar */}
      {isPwaModalOpen && (
        <div className="fixed inset-0 z-50 bg-slate-950/70 backdrop-blur-sm flex items-center justify-center p-4 animate-in fade-in">
          <div className="bg-white rounded-3xl border border-slate-200 shadow-2xl max-w-md w-full p-6 space-y-5 animate-in zoom-in-95">
            <div className="flex items-center justify-between border-b border-slate-100 pb-3">
              <div className="flex items-center gap-2.5">
                <div className="w-10 h-10 rounded-2xl bg-emerald-700 text-white flex items-center justify-center">
                  <Smartphone className="w-5 h-5" />
                </div>
                <div>
                  <h3 className="text-base font-black text-slate-900">Instalar App PWA</h3>
                  <p className="text-xs text-slate-500 font-medium">Sierras Chicas Digital sin conexión</p>
                </div>
              </div>
              <button 
                type="button" 
                onClick={() => setIsPwaModalOpen(false)}
                className="p-1 rounded-full text-slate-400 hover:text-slate-700 hover:bg-slate-100"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            <div className="space-y-3.5 text-xs text-slate-600">
              <p className="font-semibold text-slate-800">
                Llevá la guía y directorio de comercios del valle siempre en tu pantalla de inicio:
              </p>

              {/* Android instructions */}
              <div className="p-3.5 rounded-2xl bg-slate-50 border border-slate-200 space-y-1.5">
                <div className="flex items-center gap-2 font-black text-slate-900 text-xs">
                  <span>🤖 En Android (Chrome / Brave / Edge)</span>
                </div>
                <p className="text-[11px] text-slate-600">
                  Tocá el botón <strong>"Instalar Ahora"</strong> abajo o en el menú de tres puntos (⋮) elegí <strong>"Instalar aplicación"</strong> o "Agregar a pantalla principal".
                </p>
              </div>

              {/* iPhone / iPad instructions */}
              <div className="p-3.5 rounded-2xl bg-slate-50 border border-slate-200 space-y-1.5">
                <div className="flex items-center gap-2 font-black text-slate-900 text-xs">
                  <Apple className="w-3.5 h-3.5 text-slate-900" />
                  <span>En iPhone / iPad (Safari)</span>
                </div>
                <p className="text-[11px] text-slate-600">
                  Tocá el botón de <strong>Compartir</strong> (icono cuadrado con flecha arriba <span className="font-bold">⎋</span>) y seleccioná <strong>"Agregar a Inicio"</strong> (+).
                </p>
              </div>

              {/* Desktop / PC */}
              <div className="p-3.5 rounded-2xl bg-slate-50 border border-slate-200 space-y-1.5">
                <div className="flex items-center gap-2 font-black text-slate-900 text-xs">
                  <Monitor className="w-3.5 h-3.5 text-slate-900" />
                  <span>En Computadora (PC / Mac)</span>
                </div>
                <p className="text-[11px] text-slate-600">
                  Hacé clic en el icono de instalación en la barra de direcciones del navegador.
                </p>
              </div>
            </div>

            <div className="pt-2 flex items-center justify-end gap-2 border-t border-slate-100">
              <button
                type="button"
                onClick={() => setIsPwaModalOpen(false)}
                className="px-4 py-2 rounded-xl text-xs font-bold text-slate-600 hover:bg-slate-100"
              >
                Cerrar
              </button>
              {deferredPrompt && (
                <button
                  type="button"
                  onClick={handleInstallClick}
                  className="px-5 py-2.5 rounded-xl bg-emerald-700 hover:bg-emerald-600 text-white font-black text-xs shadow-md shadow-emerald-900/20 flex items-center gap-1.5"
                >
                  <Download className="w-3.5 h-3.5" />
                  <span>Instalar Ahora</span>
                </button>
              )}
            </div>
          </div>
        </div>
      )}

      {/* Floating Bottom Toast Prompt */}
      {showPrompt && !isPwaModalOpen && (
        <div className="fixed bottom-20 md:bottom-6 right-4 left-4 md:left-auto md:w-96 z-40 bg-slate-900 text-white p-4 rounded-2xl shadow-2xl border border-slate-700 animate-in slide-in-from-bottom-5">
          <div className="flex items-start gap-3">
            <div className="w-10 h-10 rounded-xl bg-emerald-600 text-white flex items-center justify-center shrink-0">
              <Smartphone className="w-5 h-5" />
            </div>
            <div className="flex-1 min-w-0">
              <div className="flex items-center justify-between">
                <h4 className="font-bold text-xs text-white">Instalá Sierras Chicas PWA</h4>
                <button onClick={handleDismiss} className="text-slate-400 hover:text-white p-0.5">
                  <X className="w-4 h-4" />
                </button>
              </div>
              <p className="text-[11px] text-slate-300 mt-0.5 leading-snug">
                Acceso rápido desde tu inicio, carga offline y notificaciones directas.
              </p>
              <div className="mt-2.5 flex items-center gap-2">
                <button
                  type="button"
                  onClick={handleInstallClick}
                  className="px-3 py-1.5 rounded-lg bg-emerald-600 hover:bg-emerald-500 text-white text-xs font-bold flex items-center gap-1 shadow-sm"
                >
                  <Download className="w-3.5 h-3.5" />
                  <span>Instalar Gratis</span>
                </button>
                <button
                  type="button"
                  onClick={handleDismiss}
                  className="px-2.5 py-1.5 rounded-lg text-[11px] text-slate-400 hover:text-white"
                >
                  Ahora no
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </>
  );
}

