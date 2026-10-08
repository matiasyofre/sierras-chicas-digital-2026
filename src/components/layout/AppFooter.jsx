import React from 'react';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import { MapPin, Phone, Mail, ArrowUpRight, Instagram, Facebook, MessageCircle, Youtube } from 'lucide-react';
import { useApp } from '../../context/AppContext';

export default function AppFooter() {
  const { settings, locations } = useApp();
  const location = useLocation();
  const navigate = useNavigate();

  const supportPhone = settings?.supportWhatsApp || settings?.supportWhatsapp || '5493543000000';
  const cleanPhone = supportPhone.replace(/[^0-9]/g, '');

  const handleNavScroll = (elementId) => {
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

  return (
    <footer className="bg-slate-950 text-slate-300 pt-12 pb-24 md:pb-12 border-t border-slate-800">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 mb-10">
          
          {/* Brand Col & Social Media Buttons */}
          <div className="space-y-4">
            <div className="flex items-center gap-2.5">
              <div className="w-10 h-10 rounded-2xl overflow-hidden bg-slate-900 flex items-center justify-center border border-emerald-500/20 shadow-md">
                <video
                  src="/videos/logo-animado.mp4"
                  autoPlay
                  loop
                  muted
                  playsInline
                  className="w-full h-full object-cover"
                />
              </div>
              <span className="font-black text-lg text-white tracking-tight">Sierras Chicas Digital</span>
            </div>
            <p className="text-xs text-slate-400 leading-relaxed">
              El ecosistema y guía comercial que conecta a vecinos, turistas y comerciantes de todo el corredor de Sierras Chicas, Córdoba.
            </p>

            {/* Social Media Buttons */}
            <div className="pt-2">
              <span className="text-[10px] font-black uppercase tracking-wider text-slate-400 block mb-2">
                Redes Oficiales:
              </span>
              <div className="flex items-center gap-2">
                <a
                  href="https://instagram.com"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="w-9 h-9 rounded-xl bg-slate-900 hover:bg-pink-600 text-slate-300 hover:text-white flex items-center justify-center transition-colors border border-slate-800"
                  title="Instagram Sierras Chicas Digital"
                >
                  <Instagram className="w-4 h-4" />
                </a>
                <a
                  href="https://facebook.com"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="w-9 h-9 rounded-xl bg-slate-900 hover:bg-blue-600 text-slate-300 hover:text-white flex items-center justify-center transition-colors border border-slate-800"
                  title="Facebook Oficial"
                >
                  <Facebook className="w-4 h-4" />
                </a>
                <a
                  href={`https://wa.me/${cleanPhone}`}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="w-9 h-9 rounded-xl bg-slate-900 hover:bg-emerald-600 text-slate-300 hover:text-white flex items-center justify-center transition-colors border border-slate-800"
                  title="WhatsApp Contacto"
                >
                  <MessageCircle className="w-4 h-4" />
                </a>
                <a
                  href="https://youtube.com"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="w-9 h-9 rounded-xl bg-slate-900 hover:bg-rose-600 text-slate-300 hover:text-white flex items-center justify-center transition-colors border border-slate-800"
                  title="YouTube Sierras Chicas"
                >
                  <Youtube className="w-4 h-4" />
                </a>
              </div>
            </div>
          </div>

          {/* Localidades */}
          <div className="space-y-2.5">
            <h4 className="text-xs font-black uppercase tracking-wider text-white">Localidades del Corredor</h4>
            <ul className="text-xs space-y-1.5 text-slate-400">
              {locations.map(loc => (
                <li key={loc.id}>
                  <Link to={`/localidad/${loc.slug}`} className="hover:text-amber-400 transition-colors">
                    📍 {loc.name}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Accesos Rápidos */}
          <div className="space-y-2.5">
            <h4 className="text-xs font-black uppercase tracking-wider text-white">Navegación</h4>
            <ul className="text-xs space-y-2 text-slate-400">
              <li>
                <Link to="/" className="hover:text-white transition-colors">
                  Inicio
                </Link>
              </li>
              <li>
                <Link to="/explorar" className="hover:text-amber-400 font-bold transition-colors">
                  🔍 Explorar Todo el Directorio
                </Link>
              </li>
              <li>
                <button
                  type="button"
                  onClick={() => handleNavScroll('radar-serrano')}
                  className="hover:text-white transition-colors text-left"
                >
                  Radar por Localidad
                </button>
              </li>
              <li>
                <button
                  type="button"
                  onClick={() => handleNavScroll('categorias-guia')}
                  className="hover:text-white transition-colors text-left"
                >
                  Categorías & Rubros
                </button>
              </li>
              <li>
                <button
                  type="button"
                  onClick={() => handleNavScroll('planes-saas')}
                  className="hover:text-white transition-colors text-left"
                >
                  Planes para Comercios
                </button>
              </li>
              <li>
                <button
                  type="button"
                  onClick={() => handleNavScroll('nosotros')}
                  className="hover:text-white transition-colors text-left"
                >
                  Sobre Nosotros
                </button>
              </li>
            </ul>
          </div>

          {/* Contacto & WhatsApp */}
          <div className="space-y-3">
            <h4 className="text-xs font-black uppercase tracking-wider text-white">Contacto Directo</h4>
            <p className="text-xs text-slate-400">
              ¿Querés sumar tu comercio o pautar un banner destacado en tu localidad?
            </p>
            <a
              href={`https://wa.me/${cleanPhone}?text=${encodeURIComponent('Hola Sierras Chicas Digital, quiero más información.')}`}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 px-4 py-2.5 rounded-xl bg-emerald-600 hover:bg-emerald-500 text-white text-xs font-black transition-all shadow-sm shadow-emerald-900/30"
            >
              <MessageCircle className="w-4 h-4" />
              <span>WhatsApp Directo</span>
            </a>
          </div>

        </div>

        <div className="pt-6 border-t border-slate-800/80 flex flex-col sm:flex-row items-center justify-between text-xs text-slate-500 gap-3">
          <p>© 2026 Sierras Chicas Digital. Todos los derechos reservados.</p>
          <p className="text-slate-500">Portal y Guía Comercial de Sierras Chicas, Córdoba.</p>
        </div>
      </div>
    </footer>
  );
}
