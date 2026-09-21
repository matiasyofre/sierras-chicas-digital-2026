import React, { useState } from 'react';
import AdminSidebar from '../../components/admin/AdminSidebar';
import { Sliders, Save, Check, Globe, Smartphone, ShieldCheck, Phone } from 'lucide-react';

export default function AdminSettingsView() {
  const [platformName, setPlatformName] = useState('Sierras Chicas Digital');
  const [tagline, setTagline] = useState('El directorio y marketplace del valle de Sierras Chicas, Córdoba');
  const [supportWhatsApp, setSupportWhatsApp] = useState('5493512345678');
  const [pwaTitle, setPwaTitle] = useState('Sierras Chicas PWA');
  const [metaDesc, setMetaDesc] = useState('Encontrá los mejores comercios, alojamientos, servicios y gastronomía en toda la región de Sierras Chicas.');
  const [saved, setSaved] = useState(false);

  const handleSave = (e) => {
    e.preventDefault();
    setSaved(true);
    setTimeout(() => setSaved(false), 3000);
  };

  return (
    <div className="flex-1 bg-surface flex flex-col lg:flex-row min-h-screen animate-in fade-in">
      <AdminSidebar />

      <main className="flex-1 p-4 sm:p-6 lg:p-8 space-y-6 overflow-y-auto">
        
        {/* Header Bar */}
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-4 border-b border-surface-container-high">
          <div>
            <h1 className="text-xl sm:text-2xl font-extrabold text-on-surface tracking-tight">
              Configuración General de Plataforma & PWA
            </h1>
            <p className="text-xs text-on-surface-variant mt-0.5">
              Parámetros globales, metadatos SEO, WhatsApp Cloud y ajustes PWA
            </p>
          </div>

          <button
            type="button"
            onClick={handleSave}
            className={`px-5 py-2.5 rounded-xl text-xs font-extrabold flex items-center gap-1.5 transition-all shadow-md ${
              saved ? 'bg-emerald-600 text-white' : 'bg-indigo-600 hover:bg-indigo-500 text-white'
            }`}
          >
            {saved ? <Check className="w-4 h-4" /> : <Save className="w-4 h-4" />}
            <span>{saved ? '¡Ajustes Guardados!' : 'Guardar Configuración'}</span>
          </button>
        </div>

        <form onSubmit={handleSave} className="space-y-6 text-xs max-w-3xl">
          
          {/* Identity & SEO */}
          <div className="bg-surface-container-lowest p-5 sm:p-6 rounded-3xl border border-surface-container-high shadow-subtle space-y-4">
            <div className="flex items-center gap-2">
              <Globe className="w-4 h-4 text-indigo-600" />
              <h3 className="text-sm font-extrabold text-on-surface uppercase tracking-wider">
                Identidad & SEO Regional
              </h3>
            </div>

            <div className="space-y-3">
              <div>
                <label className="font-bold text-on-surface block mb-1">Nombre de la Plataforma *</label>
                <input
                  type="text"
                  value={platformName}
                  onChange={e => setPlatformName(e.target.value)}
                  className="w-full px-3 py-2 rounded-xl bg-surface border border-surface-container-high text-on-surface focus:outline-none focus:border-indigo-600"
                />
              </div>

              <div>
                <label className="font-bold text-on-surface block mb-1">Lema / Subtítulo Institucional</label>
                <input
                  type="text"
                  value={tagline}
                  onChange={e => setTagline(e.target.value)}
                  className="w-full px-3 py-2 rounded-xl bg-surface border border-surface-container-high text-on-surface focus:outline-none focus:border-indigo-600"
                />
              </div>

              <div>
                <label className="font-bold text-on-surface block mb-1">Descripción Meta para Motores de Búsqueda (SEO)</label>
                <textarea
                  rows={3}
                  value={metaDesc}
                  onChange={e => setMetaDesc(e.target.value)}
                  className="w-full px-3 py-2 rounded-xl bg-surface border border-surface-container-high text-on-surface focus:outline-none focus:border-indigo-600"
                />
              </div>
            </div>
          </div>

          {/* PWA & Mobile App Settings */}
          <div className="bg-surface-container-lowest p-5 sm:p-6 rounded-3xl border border-surface-container-high shadow-subtle space-y-4">
            <div className="flex items-center gap-2">
              <Smartphone className="w-4 h-4 text-indigo-600" />
              <h3 className="text-sm font-extrabold text-on-surface uppercase tracking-wider">
                Parámetros de Aplicación PWA
              </h3>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div>
                <label className="font-bold text-on-surface block mb-1">Título Corto PWA (HomeScreen)</label>
                <input
                  type="text"
                  value={pwaTitle}
                  onChange={e => setPwaTitle(e.target.value)}
                  className="w-full px-3 py-2 rounded-xl bg-surface border border-surface-container-high text-on-surface focus:outline-none focus:border-indigo-600"
                />
              </div>

              <div>
                <label className="font-bold text-on-surface block mb-1">Color de Tema (Theme Color)</label>
                <input
                  type="text"
                  value="#00685f"
                  readOnly
                  className="w-full px-3 py-2 rounded-xl bg-surface border border-surface-container-high text-on-surface font-mono"
                />
              </div>
            </div>
          </div>

          {/* WhatsApp Support */}
          <div className="bg-surface-container-lowest p-5 sm:p-6 rounded-3xl border border-surface-container-high shadow-subtle space-y-4">
            <div className="flex items-center gap-2">
              <Phone className="w-4 h-4 text-emerald-600" />
              <h3 className="text-sm font-extrabold text-on-surface uppercase tracking-wider">
                Canal Central de WhatsApp
              </h3>
            </div>

            <div>
              <label className="font-bold text-on-surface block mb-1">Número de Soporte y Consultas Centrales</label>
              <input
                type="text"
                value={supportWhatsApp}
                onChange={e => setSupportWhatsApp(e.target.value)}
                className="w-full px-3 py-2 rounded-xl bg-surface border border-surface-container-high text-on-surface focus:outline-none focus:border-indigo-600 font-mono"
              />
            </div>
          </div>

        </form>

      </main>
    </div>
  );
}
