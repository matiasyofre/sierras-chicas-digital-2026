import React from 'react';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import { MapPin, Phone, Mail, ArrowUpRight } from 'lucide-react';
import { useApp } from '../../context/AppContext';

export default function AppFooter() {
  const { settings, locations, setSelectedLocation } = useApp();
  const location = useLocation();
  const navigate = useNavigate();

  const supportPhone = settings?.supportWhatsApp || settings?.supportWhatsapp || '5493543123456';
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
          
          {/* Brand Col */}
          <div className="space-y-3">
            <div className="flex items-center gap-2.5">
              <div className="w-9 h-9 rounded-xl bg-gradient-to-tr from-emerald-800 to-teal-600 text-white flex items-center justify-center">
                <span className="material-symbols-outlined text-[20px]">landscape</span>
              </div>
              <span className="font-black text-lg text-white tracking-tight">Sierras Chicas Digital</span>
            </div>
            <p className="text-xs text-slate-400 leading-relaxed">
              El ecosistema digital que conecta a vecinos, turistas y comerciantes de todo el corredor de Sierras Chicas, Córdoba.
            </p>
          </div>

          {/* Localidades */}
          <div className="space-y-2.5">
            <h4 className="text-xs font-black uppercase tracking-wider text-white">Localidades</h4>
            <ul className="text-xs space-y-1.5 text-slate-400">
              <li>Río Ceballos · Dique La Quebrada</li>
              <li>Unquillo · Ciudad de los Artistas</li>
              <li>Mendiolaza · El Talar & Centro</li>
              <li>Villa Allende · Golf & Gastronomía</li>
              <li>Salsipuedes · Naturaleza & Cabañas</li>
              <li>La Granja & Agua de Oro</li>
              <li>La Calera · Portal Serrano</li>
            </ul>
          </div>

          {/* Accesos Rápidos a cada Sección de la Landing */}
          <div className="space-y-2.5">
            <h4 className="text-xs font-black uppercase tracking-wider text-white">Secciones</h4>
            <ul className="text-xs space-y-2 text-slate-400">
              <li>
                <button
                  type="button"
                  onClick={() => {
                    if (location.pathname !== '/') navigate('/');
                    else window.scrollTo({ top: 0, behavior: 'smooth' });
                  }}
                  className="hover:text-white transition-colors text-left"
                >
                  Inicio
                </button>
              </li>
              <li>
                <button
                  type="button"
                  onClick={() => handleNavScroll('tiendas-destacadas')}
                  className="hover:text-white transition-colors text-left"
                >
                  Tiendas & Góndola Online
                </button>
              </li>
              <li>
                <button
                  type="button"
                  onClick={() => handleNavScroll('radar-serrano')}
                  className="hover:text-white transition-colors text-left"
                >
                  Radar Serrano por Ciudad
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
              <li>
                <button
                  type="button"
                  onClick={() => handleNavScroll('preguntas')}
                  className="hover:text-white transition-colors text-left"
                >
                  Preguntas Frecuentes
                </button>
              </li>
            </ul>
          </div>

          {/* Contacto & WhatsApp */}
          <div className="space-y-2.5">
            <h4 className="text-xs font-black uppercase tracking-wider text-white">Contacto</h4>
            <p className="text-xs text-slate-400">
              ¿Tenés dudas, consultas o querés sumar tu comercio al portal regional?
            </p>
            <a
              href={`https://wa.me/${cleanPhone}?text=${encodeURIComponent('Hola Sierras Chicas Digital, quiero más información.')}`}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 px-4 py-2.5 rounded-xl bg-emerald-800 hover:bg-emerald-700 text-emerald-100 text-xs font-black transition-all border border-emerald-600/40 shadow-sm"
            >
              <Phone className="w-3.5 h-3.5" />
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

