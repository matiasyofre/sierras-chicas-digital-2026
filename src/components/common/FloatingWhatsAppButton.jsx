import React, { useState } from 'react';
import { MessageCircle, X } from 'lucide-react';
import { useApp } from '../../context/AppContext';

export default function FloatingWhatsAppButton() {
  const { settings } = useApp();
  const [isOpen, setIsOpen] = useState(false);

  const supportPhone = settings?.supportWhatsapp || '5493543123456';
  const cleanPhone = supportPhone.replace(/[^0-9]/g, '');

  const openWhatsApp = (msg) => {
    const text = encodeURIComponent(msg || '¡Hola! Te escribo desde el portal de Sierras Chicas Digital.');
    window.open(`https://wa.me/${cleanPhone}?text=${text}`, '_blank');
    setIsOpen(false);
  };

  return (
    <div className="fixed bottom-20 md:bottom-6 right-4 z-40 flex flex-col items-end">
      {/* Floating Popup Card */}
      {isOpen && (
        <div className="mb-3 w-72 bg-surface-container-lowest rounded-3xl p-4 shadow-2xl border border-surface-container-high animate-in slide-in-from-bottom-5 duration-200">
          <div className="flex items-center justify-between pb-3 border-b border-surface-container-high">
            <div className="flex items-center gap-2">
              <div className="w-8 h-8 rounded-full bg-emerald-500 flex items-center justify-center text-white">
                <MessageCircle className="w-4 h-4" />
              </div>
              <div>
                <h4 className="text-xs font-extrabold text-on-surface">Soporte Sierras Chicas</h4>
                <p className="text-[10px] text-emerald-600 font-bold flex items-center gap-1">
                  <span className="w-1.5 h-1.5 rounded-full bg-emerald-500 animate-pulse"></span>
                  En línea
                </p>
              </div>
            </div>
            <button 
              type="button" 
              onClick={() => setIsOpen(false)}
              className="text-outline hover:text-on-surface p-1 rounded-full hover:bg-surface-container"
            >
              <X className="w-4 h-4" />
            </button>
          </div>

          <div className="py-3 text-xs text-on-surface-variant space-y-2">
            <p>¿Tenés dudas sobre cómo publicar tu comercio, planes o el directorio?</p>
            <div className="space-y-1.5 pt-1">
              <button
                type="button"
                onClick={() => openWhatsApp('Hola, quiero publicar mi negocio en Sierras Chicas Digital.')}
                className="w-full text-left p-2 rounded-xl bg-surface-container-low hover:bg-emerald-50 hover:text-emerald-800 text-[11px] font-semibold transition-colors border border-surface-container-high"
              >
                📢 Quiero publicar mi negocio
              </button>
              <button
                type="button"
                onClick={() => openWhatsApp('Hola, tengo una consulta sobre los planes y formas de pago.')}
                className="w-full text-left p-2 rounded-xl bg-surface-container-low hover:bg-emerald-50 hover:text-emerald-800 text-[11px] font-semibold transition-colors border border-surface-container-high"
              >
                💳 Consultar sobre Planes y Pago
              </button>
              <button
                type="button"
                onClick={() => openWhatsApp('Hola, necesito asistencia técnica con mi cuenta.')}
                className="w-full text-left p-2 rounded-xl bg-surface-container-low hover:bg-emerald-50 hover:text-emerald-800 text-[11px] font-semibold transition-colors border border-surface-container-high"
              >
                🛠️ Soporte técnico general
              </button>
            </div>
          </div>

          <button
            type="button"
            onClick={() => openWhatsApp()}
            className="w-full py-2.5 rounded-xl bg-emerald-600 hover:bg-emerald-500 text-white font-extrabold text-xs flex items-center justify-center gap-1.5 shadow-md shadow-emerald-900/20"
          >
            <MessageCircle className="w-4 h-4 fill-white" />
            <span>Abrir chat de WhatsApp</span>
          </button>
        </div>
      )}

      {/* Trigger Button */}
      <button
        type="button"
        onClick={() => setIsOpen(!isOpen)}
        className="group flex items-center gap-2.5 px-4 py-3 rounded-full bg-emerald-600 hover:bg-emerald-500 text-white shadow-xl shadow-emerald-900/30 hover:shadow-emerald-900/40 active:scale-95 transition-all duration-300"
        title="Contactar Soporte por WhatsApp"
      >
        <MessageCircle className="w-6 h-6 fill-white" />
        <span className="text-xs font-extrabold hidden sm:inline">
          {isOpen ? 'Cerrar' : '¿Ayuda? Escribinos'}
        </span>
      </button>
    </div>
  );
}
