import React from 'react';
import { Link } from 'react-router-dom';
import { MapPin, Phone, Mail, Heart, ArrowUpRight } from 'lucide-react';

export default function AppFooter() {
  return (
    <footer className="bg-inverse-surface text-surface-variant pt-12 pb-24 md:pb-12 border-t border-slate-800">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 mb-10">
          
          {/* Brand Col */}
          <div className="space-y-3">
            <div className="flex items-center gap-2.5">
              <div className="w-9 h-9 rounded-xl bg-primary text-white flex items-center justify-center">
                <span className="material-symbols-outlined text-[20px]">landscape</span>
              </div>
              <span className="font-extrabold text-lg text-white tracking-tight">Sierras Chicas Digital</span>
            </div>
            <p className="text-xs text-slate-400 leading-relaxed">
              El ecosistema digital que conecta a vecinos, turistas y comerciantes de todo el corredor de Sierras Chicas, Córdoba.
            </p>
            <div className="flex items-center gap-2 text-xs text-teal-400 font-semibold">
              <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse"></span>
              <span>Plataforma Activa · Red Córdoba</span>
            </div>
          </div>

          {/* Localidades */}
          <div className="space-y-2.5">
            <h4 className="text-xs font-bold uppercase tracking-wider text-white">Localidades</h4>
            <ul className="text-xs space-y-1.5 text-slate-400">
              <li>Río Ceballos · Dique La Quebrada</li>
              <li>Unquillo · Ciudad de los Artistas</li>
              <li>Mendiolaza · El Talar & Centro</li>
              <li>Villa Allende · Golf & Gastronomía</li>
              <li>Salsipuedes · Naturaleza & Cabañas</li>
              <li>La Granja & Agua de Oro</li>
            </ul>
          </div>

          {/* Accesos Rápidos */}
          <div className="space-y-2.5">
            <h4 className="text-xs font-bold uppercase tracking-wider text-white">Secciones</h4>
            <ul className="text-xs space-y-2 text-slate-400">
              <li>
                <Link to="/" className="hover:text-white transition-colors flex items-center gap-1">
                  <span>Directorio Regional</span>
                </Link>
              </li>
              <li>
                <Link to="/panel/perfil" className="hover:text-white transition-colors flex items-center gap-1">
                  <span>Registrar Mi Comercio</span>
                  <ArrowUpRight className="w-3 h-3 text-amber-400" />
                </Link>
              </li>
              <li>
                <Link to="/panel/gondola" className="hover:text-white transition-colors flex items-center gap-1">
                  <span>Góndola Digital de Precios</span>
                </Link>
              </li>
              <li>
                <Link to="/panel/pos" className="hover:text-white transition-colors flex items-center gap-1">
                  <span>POS & Comandas en Vivo</span>
                </Link>
              </li>
              <li>
                <Link to="/admin" className="hover:text-white transition-colors flex items-center gap-1">
                  <span>SuperAdmin Central</span>
                </Link>
              </li>
            </ul>
          </div>

          {/* Contacto & WhatsApp */}
          <div className="space-y-2.5">
            <h4 className="text-xs font-bold uppercase tracking-wider text-white">Contacto Central</h4>
            <p className="text-xs text-slate-400">
              ¿Tenés dudas o querés sumar tu municipio o cámara comercial?
            </p>
            <a
              href="https://wa.me/5493512345678?text=Hola%20Sierras%20Chicas%20Digital,%20quiero%20más%20información."
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 px-3.5 py-2 rounded-xl bg-teal-800/80 hover:bg-teal-700 text-teal-200 text-xs font-bold transition-all border border-teal-600/40"
            >
              <Phone className="w-3.5 h-3.5" />
              <span>WhatsApp Soporte</span>
            </a>
          </div>

        </div>

        <div className="pt-6 border-t border-slate-800 flex flex-col sm:flex-row items-center justify-between text-xs text-slate-500 gap-3">
          <p>© 2026 Sierras Chicas Digital. Todos los derechos reservados.</p>
          <p className="flex items-center gap-1">
            Hecho con <Heart className="w-3 h-3 text-rose-500 fill-rose-500" /> para Sierras Chicas
          </p>
        </div>
      </div>
    </footer>
  );
}
