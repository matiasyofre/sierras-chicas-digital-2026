import React from 'react';
import { Sparkles, MapPin, Compass } from 'lucide-react';

export default function App() {
  const cities = ['Villa Allende', 'Mendiolaza', 'Unquillo', 'Río Ceballos', 'Salsipuedes', 'El Manzano', 'Agua de Oro', 'La Granja', 'La Calera'];

  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-slate-950 text-white px-4 relative overflow-hidden font-sans">
      {/* Ambient background glows */}
      <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-amber-500/10 rounded-full blur-3xl pointer-events-none"></div>
      <div className="absolute bottom-1/4 right-1/4 w-96 h-96 bg-teal-500/10 rounded-full blur-3xl pointer-events-none"></div>

      <div className="relative z-10 max-w-xl text-center space-y-6">
        <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-slate-900/80 border border-slate-800 text-amber-400 text-xs font-bold uppercase tracking-wider shadow-lg">
          <Compass className="w-4 h-4 text-amber-400" />
          <span>Sierras Chicas Digital · 2026</span>
        </div>

        <h1 className="text-3xl sm:text-5xl font-black text-white tracking-tight leading-tight">
          Próximamente en <span className="bg-gradient-to-r from-amber-400 to-amber-200 bg-clip-text text-transparent">Sierras Chicas</span>
        </h1>

        <p className="text-sm sm:text-base text-slate-400 leading-relaxed max-w-md mx-auto">
          Estamos preparando la nueva plataforma digital de comercios, turismo, gastronomía y servicios para todo el corredor.
        </p>

        <div className="pt-4 flex flex-wrap justify-center gap-2 max-w-md mx-auto">
          {cities.map((city, idx) => (
            <span key={idx} className="px-3 py-1 rounded-full bg-slate-900 border border-slate-800 text-xs text-slate-300 font-medium flex items-center gap-1">
              <MapPin className="w-3 h-3 text-amber-500" />
              {city}
            </span>
          ))}
        </div>

        <div className="pt-8 border-t border-slate-900 text-xs text-slate-500">
          Entorno en preparación · Red Regional Sierras Chicas
        </div>
      </div>
    </div>
  );
}
