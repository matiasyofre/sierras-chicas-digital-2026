/**
 * Sierras Chicas Digital - Floating Ecosystem Quick Navigator
 * Permite saltar al instante entre las 11 vistas y volver al Hub Central
 */
(function() {
  // Evitar duplicados
  if (document.getElementById('sc-ecosystem-hub')) return;

  const pages = [
    {
      group: "📱 PWA · Experiencia Vecino / Turista",
      items: [
        { file: "code6.html", title: "Directorio & Home PWA", desc: "Búsqueda, rubros y comercios destacados", icon: "home", id: "code6" },
        { file: "code4.html", title: "Ficha Servicios Profesionales", desc: "Electricista / Modo Publicitario", icon: "badge", id: "code4" },
        { file: "code11.html", title: "Ficha Tienda & Gastronomía", desc: "Café, Carrito & WhatsApp Checkout", icon: "shopping_cart", id: "code11" }
      ]
    },
    {
      group: "🏪 Autogestión del Comercio (Merchant)",
      items: [
        { file: "code8.html", title: "Panel Comercio & Perfil", desc: "Configuración de ficha y tipo de negocio", icon: "store", id: "code8" },
        { file: "code1.html", title: "Góndola Digital / Data Grid", desc: "Actualización de catálogo y precios", icon: "table_chart", id: "code1" },
        { file: "code9.html", title: "POS Mostrador / Comandas", desc: "Gestión de pedidos Kanban & Factura AFIP", icon: "point_of_sale", id: "code9" }
      ]
    },
    {
      group: "🛡️ Consola Súper Administrador (SaaS)",
      items: [
        { file: "code7.html", title: "Dashboard Central SaaS", desc: "Métricas generales y control de plataforma", icon: "dashboard", id: "code7" },
        { file: "code5.html", title: "Gestión de Comercios", desc: "Alta, validación y control de cuentas", icon: "storefront", id: "code5" },
        { file: "code10.html", title: "Suscripciones & Facturación", desc: "Control de ingresos recurrentes MRR", icon: "receipt_long", id: "code10" },
        { file: "code2.html", title: "Categorías & Rubros", desc: "Taxonomía comercial del corredor", icon: "category", id: "code2" },
        { file: "code3.html", title: "Configuración General", desc: "SEO PWA, WhatsApp Cloud & Parámetros", icon: "tune", id: "code3" }
      ]
    }
  ];

  // Identificar página actual
  const currentPath = window.location.pathname.split('/').pop() || 'index.html';

  // Crear contenedor
  const container = document.createElement('div');
  container.id = 'sc-ecosystem-hub';
  container.className = 'sc-hub-wrapper';

  // CSS inyectado
  const style = document.createElement('style');
  style.textContent = `
    .sc-hub-wrapper {
      position: fixed;
      bottom: 24px;
      right: 24px;
      z-index: 99999;
      font-family: 'Plus Jakarta Sans', system-ui, -apple-system, sans-serif;
      user-select: none;
    }
    .sc-hub-btn {
      display: flex;
      align-items: center;
      gap: 8px;
      background: linear-gradient(135deg, #00685f 0%, #004d46 100%);
      color: #ffffff;
      padding: 10px 16px;
      border-radius: 9999px;
      font-size: 13px;
      font-weight: 700;
      letter-spacing: 0.2px;
      border: 1px solid rgba(255,255,255,0.25);
      box-shadow: 0 10px 25px -5px rgba(0, 104, 95, 0.45), 0 8px 10px -6px rgba(0,0,0,0.1);
      cursor: pointer;
      transition: all 0.25s cubic-bezier(0.16, 1, 0.3, 1);
    }
    .sc-hub-btn:hover {
      transform: translateY(-2px) scale(1.02);
      box-shadow: 0 14px 30px -5px rgba(0, 104, 95, 0.55);
      background: linear-gradient(135deg, #008378 0%, #005a52 100%);
    }
    .sc-hub-btn .sc-badge {
      background: #89f5e7;
      color: #00201d;
      font-size: 11px;
      padding: 2px 7px;
      border-radius: 9999px;
      font-weight: 800;
    }
    .sc-hub-panel {
      position: absolute;
      bottom: calc(100% + 14px);
      right: 0;
      width: 380px;
      max-width: calc(100vw - 32px);
      max-height: 80vh;
      background: #ffffff;
      border-radius: 20px;
      box-shadow: 0 25px 50px -12px rgba(11, 28, 48, 0.25), 0 0 0 1px rgba(11, 28, 48, 0.08);
      overflow-y: auto;
      display: none;
      flex-direction: column;
      animation: scHubFade 0.2s cubic-bezier(0.16, 1, 0.3, 1);
      backdrop-filter: blur(16px);
    }
    .sc-hub-panel.open {
      display: flex;
    }
    @keyframes scHubFade {
      from { opacity: 0; transform: translateY(12px) scale(0.96); }
      to { opacity: 1; transform: translateY(0) scale(1); }
    }
    .sc-hub-header {
      padding: 16px 20px;
      background: linear-gradient(135deg, #0b1c30 0%, #172d47 100%);
      color: #ffffff;
      border-top-left-radius: 20px;
      border-top-right-radius: 20px;
      display: flex;
      align-items: center;
      justify-content: space-between;
    }
    .sc-hub-body {
      padding: 14px;
      display: flex;
      flex-direction: column;
      gap: 14px;
    }
    .sc-hub-group-title {
      font-size: 11px;
      font-weight: 800;
      text-transform: uppercase;
      letter-spacing: 0.6px;
      color: #6d7a77;
      margin-bottom: 6px;
      padding-left: 6px;
    }
    .sc-hub-item {
      display: flex;
      align-items: center;
      gap: 12px;
      padding: 8px 10px;
      border-radius: 12px;
      text-decoration: none;
      color: #0b1c30;
      background: #f8f9ff;
      border: 1px solid #e5eeff;
      transition: all 0.15s ease;
      margin-bottom: 5px;
    }
    .sc-hub-item:hover {
      background: #e5eeff;
      border-color: #bcc9c6;
      transform: translateX(3px);
    }
    .sc-hub-item.active {
      background: #00685f;
      color: #ffffff;
      border-color: #005049;
    }
    .sc-hub-item.active .sc-item-icon {
      background: rgba(255,255,255,0.2);
      color: #ffffff;
    }
    .sc-hub-item.active .sc-item-desc {
      color: #89f5e7;
    }
    .sc-hub-item.active .sc-item-code {
      background: rgba(255,255,255,0.25);
      color: #ffffff;
    }
    .sc-item-icon {
      width: 32px;
      height: 32px;
      border-radius: 8px;
      background: #e5eeff;
      color: #00685f;
      display: flex;
      align-items: center;
      justify-content: center;
      flex-shrink: 0;
    }
    .sc-item-content {
      flex: 1;
      min-width: 0;
    }
    .sc-item-title {
      font-size: 13px;
      font-weight: 700;
      line-height: 1.2;
    }
    .sc-item-desc {
      font-size: 11px;
      color: #6d7a77;
      line-height: 1.2;
      margin-top: 2px;
      white-space: nowrap;
      overflow: hidden;
      text-overflow: ellipsis;
    }
    .sc-item-code {
      font-size: 10px;
      font-family: monospace;
      font-weight: 700;
      padding: 2px 6px;
      border-radius: 6px;
      background: #e5eeff;
      color: #00685f;
      flex-shrink: 0;
    }
    .sc-hub-footer {
      padding: 10px 16px;
      background: #eff4ff;
      border-bottom-left-radius: 20px;
      border-bottom-right-radius: 20px;
      display: flex;
      align-items: center;
      justify-content: space-between;
      border-top: 1px solid #e5eeff;
    }
  `;
  document.head.appendChild(style);

  // Construir HTML del menú
  let itemsHtml = '';
  pages.forEach(group => {
    itemsHtml += `<div><div class="sc-hub-group-title">${group.group}</div>`;
    group.items.forEach(it => {
      const isActive = currentPath === it.file;
      itemsHtml += `
        <a href="${it.file}" class="sc-hub-item ${isActive ? 'active' : ''}">
          <div class="sc-item-icon">
            <span class="material-symbols-outlined" style="font-size: 18px;">${it.icon}</span>
          </div>
          <div class="sc-item-content">
            <div class="sc-item-title">${it.title}</div>
            <div class="sc-item-desc">${it.desc}</div>
          </div>
          <div class="sc-item-code">${it.id}</div>
        </a>
      `;
    });
    itemsHtml += `</div>`;
  });

  container.innerHTML = `
    <div class="sc-hub-panel" id="scHubPanel">
      <div class="sc-hub-header">
        <div>
          <div style="font-size: 14px; font-weight: 800; display: flex; items-center; gap: 6px;">
            <span>Sierras Chicas Digital</span>
            <span style="background: #008378; padding: 2px 8px; border-radius: 9999px; font-size: 10px;">11 Módulos</span>
          </div>
          <div style="font-size: 11px; opacity: 0.8; margin-top: 2px;">Navegación Interactiva de la Plataforma</div>
        </div>
        <button id="scHubClose" style="background: none; border: none; color: #fff; cursor: pointer; padding: 4px; display: flex;">
          <span class="material-symbols-outlined" style="font-size: 20px;">close</span>
        </button>
      </div>
      <div class="sc-hub-body">
        ${itemsHtml}
      </div>
      <div class="sc-hub-footer">
        <a href="index.html" style="font-size: 12px; font-weight: 700; color: #00685f; text-decoration: none; display: flex; align-items: center; gap: 4px;">
          <span class="material-symbols-outlined" style="font-size: 16px;">hub</span>
          <span>Ver Hub & Simulador Central</span>
        </a>
        <span style="font-size: 11px; color: #6d7a77;">v2.4 Integrada</span>
      </div>
    </div>
    <button class="sc-hub-btn" id="scHubToggle" title="Abrir Navegador de Módulos">
      <span class="material-symbols-outlined" style="font-size: 20px;">apps</span>
      <span>Vistas del Sitio</span>
      <span class="sc-badge">11/11</span>
    </button>
  `;

  document.body.appendChild(container);

  // Event Listeners
  const toggleBtn = document.getElementById('scHubToggle');
  const closeBtn = document.getElementById('scHubClose');
  const panel = document.getElementById('scHubPanel');

  toggleBtn.addEventListener('click', (e) => {
    e.stopPropagation();
    panel.classList.toggle('open');
  });

  closeBtn.addEventListener('click', (e) => {
    e.stopPropagation();
    panel.classList.remove('open');
  });

  document.addEventListener('click', (e) => {
    if (!container.contains(e.target)) {
      panel.classList.remove('open');
    }
  });
})();
