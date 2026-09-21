import React, { useState, useEffect } from 'react';
import AdminSidebar from '../../components/admin/AdminSidebar';
import { useApp } from '../../context/AppContext';
import { Sliders, Save, Check, Globe, Smartphone, ShieldCheck, Phone, CheckCircle2 } from 'lucide-react';

export default function AdminSettingsView() {
  const { settings, updateSettings } = useApp();

  const [formData, setFormData] = useState({
    platformName: settings?.platformName || 'Sierras Chicas Digital',
    tagline: settings?.tagline || 'El directorio y marketplace del valle de Sierras Chicas, Córdoba',
    supportWhatsApp: settings?.supportWhatsApp || '5493512345678',
    pwaTitle: settings?.pwaTitle || 'Sierras Chicas PWA',
    metaDesc: settings?.metaDesc || 'Encontrá los mejores comercios, alojamientos, servicios y gastronomía en toda la región de Sierras Chicas.',
    themeColor: settings?.themeColor || '#00685f',
    currency: settings?.currency || 'ARS'
  });

  const [saved, setSaved] = useState(false);

  useEffect(() => {
    if (settings) {
      setFormData(prev => ({
        ...prev,
        ...settings
      }));
    }
  }, [settings]);

  const handleSave = (e) => {
    e.preventDefault();
    updateSettings(formData);
    setSaved(true);
    setTimeout(() => setSaved(false), 3000);
  };

  return (
    <div className="flex-1 bg-surface flex flex-col lg:flex-row min-h-screen animate-in fade-in">
      <AdminSidebar />

      <main className="flex-1 p-4 sm:p-6 lg:p-8 space-y-6 overflow-y-auto max-w-5xl">
        
        {/* Header Bar */}
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-4 border-b border-surface-container-high">
          <div>
            <div className="flex items-center gap-2 text-indigo-600 mb-1">
              <Sliders className="w-5 h-5" />
              <span className="text-xs font-black uppercase tracking-wider">Ajustes Globales de Plataforma</span>
            </div>
            <h1 className="text-xl sm:text-2xl font-extrabold text-on-surface tracking-tight">
              Configuración General & PWA
            </h1>
            <p className="text-xs text-on-surface-variant mt-0.5">
              Parámetros globales, metadatos SEO, número de WhatsApp de soporte y branding regional
            </p>
          </div>

          <button
            type="button"
            onClick={handleSave}
            className={`px-5 py-2.5 rounded-xl text-xs font-extrabold flex items-center gap-2 transition-all shadow-md ${
              saved ? 'bg-emerald-600 text-white shadow-emerald-900/20' : 'bg-indigo-600 hover:bg-indigo-500 text-white shadow-indigo-900/20'
            }`}
          >
            {saved ? <CheckCircle2 className="w-4 h-4" /> : <Save className="w-4 h-4" />}
            <span>{saved ? '¡Configuración Guardada!' : 'Guardar Ajustes'}</span>
          </button>
        </div>

        <form onSubmit={handleSave} className="space-y-6 text-xs">
          
          {/* Identity & SEO */}
          <div className="bg-surface-container-lowest p-5 sm:p-6 rounded-3xl border border-surface-container-high shadow-subtle space-y-4">
            <div className="flex items-center gap-2">
              <span className="p-2 rounded-xl bg-indigo-50 text-indigo-600">
                <Globe className="w-4 h-4" />
              </span>
              <h3 className="text-sm font-extrabold text-on-surface uppercase tracking-wider">
                Identidad & SEO Regional
              </h3>
            </div>

            <div className="space-y-3.5">
              <div>
                <label className="font-bold text-on-surface block mb-1">Nombre de la Plataforma *</label>
                <input
                  type="text"
                  required
                  value={formData.platformName}
                  onChange={e => setFormData(prev => ({ ...prev, platformName: e.target.value }))}
                  className="w-full px-3.5 py-2.5 rounded-xl bg-surface border border-surface-container-high text-on-surface focus:outline-none focus:border-indigo-600 font-semibold"
                />
              </div>

              <div>
                <label className="font-bold text-on-surface block mb-1">Lema / Subtítulo Institucional</label>
                <input
                  type="text"
                  value={formData.tagline}
                  onChange={e => setFormData(prev => ({ ...prev, tagline: e.target.value }))}
                  className="w-full px-3.5 py-2.5 rounded-xl bg-surface border border-surface-container-high text-on-surface focus:outline-none focus:border-indigo-600 font-medium"
                />
              </div>

              <div>
                <label className="font-bold text-on-surface block mb-1">Descripción Meta para Motores de Búsqueda (SEO)</label>
                <textarea
                  rows={3}
                  value={formData.metaDesc}
                  onChange={e => setFormData(prev => ({ ...prev, metaDesc: e.target.value }))}
                  className="w-full px-3.5 py-2.5 rounded-xl bg-surface border border-surface-container-high text-on-surface focus:outline-none focus:border-indigo-600 leading-relaxed font-medium"
                />
              </div>
            </div>
          </div>

          {/* PWA & Mobile App Settings */}
          <div className="bg-surface-container-lowest p-5 sm:p-6 rounded-3xl border border-surface-container-high shadow-subtle space-y-4">
            <div className="flex items-center gap-2">
              <span className="p-2 rounded-xl bg-indigo-50 text-indigo-600">
                <Smartphone className="w-4 h-4" />
              </span>
              <h3 className="text-sm font-extrabold text-on-surface uppercase tracking-wider">
                Parámetros de Aplicación PWA
              </h3>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div>
                <label className="font-bold text-on-surface block mb-1">Título Corto PWA (HomeScreen)</label>
                <input
                  type="text"
                  value={formData.pwaTitle}
                  onChange={e => setFormData(prev => ({ ...prev, pwaTitle: e.target.value }))}
                  className="w-full px-3.5 py-2.5 rounded-xl bg-surface border border-surface-container-high text-on-surface focus:outline-none focus:border-indigo-600 font-semibold"
                />
              </div>

              <div>
                <label className="font-bold text-on-surface block mb-1">Color de Tema (Theme Color Hex)</label>
                <div className="flex items-center gap-2">
                  <span className="w-8 h-8 rounded-lg border border-surface-container-high shrink-0" style={{ backgroundColor: formData.themeColor }}></span>
                  <input
                    type="text"
                    value={formData.themeColor}
                    onChange={e => setFormData(prev => ({ ...prev, themeColor: e.target.value }))}
                    className="w-full px-3.5 py-2.5 rounded-xl bg-surface border border-surface-container-high text-on-surface font-mono text-xs focus:outline-none focus:border-indigo-600"
                  />
                </div>
              </div>
            </div>
          </div>

          {/* WhatsApp Support */}
          <div className="bg-surface-container-lowest p-5 sm:p-6 rounded-3xl border border-surface-container-high shadow-subtle space-y-4">
            <div className="flex items-center gap-2">
              <span className="p-2 rounded-xl bg-emerald-50 text-emerald-600">
                <Phone className="w-4 h-4" />
              </span>
              <h3 className="text-sm font-extrabold text-on-surface uppercase tracking-wider">
                Canal Central de Atención & Soporte WhatsApp
              </h3>
            </div>

            <div>
              <label className="font-bold text-on-surface block mb-1">Número de WhatsApp (con código de país, ej: 5493512345678)</label>
              <input
                type="text"
                required
                value={formData.supportWhatsApp}
                onChange={e => setFormData(prev => ({ ...prev, supportWhatsApp: e.target.value }))}
                className="w-full px-3.5 py-2.5 rounded-xl bg-surface border border-surface-container-high text-on-surface focus:outline-none focus:border-indigo-600 font-mono text-sm"
              />
              <p className="text-[11px] text-outline mt-1.5">
                Este número alimenta el botón flotante de soporte en toda la plataforma y los enlaces de contacto institucional.
              </p>
            </div>
          </div>

          <div className="flex justify-end pt-2">
            <button
              type="submit"
              className="px-6 py-3 rounded-2xl bg-indigo-600 hover:bg-indigo-500 text-white font-extrabold text-xs flex items-center gap-2 shadow-lg shadow-indigo-900/20 transition-transform active:scale-95"
            >
              <Save className="w-4 h-4" />
              <span>Guardar Todos los Cambios</span>
            </button>
          </div>

        </form>

      </main>
    </div>
  );
}
