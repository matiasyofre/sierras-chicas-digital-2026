import React from 'react';
import { Routes, Route, useLocation } from 'react-router-dom';
import AppNavbar from './components/layout/AppNavbar';
import BottomNavigation from './components/layout/BottomNavigation';
import AppFooter from './components/layout/AppFooter';
import CartSlideOver from './components/common/CartSlideOver';
import PwaInstallPrompt from './components/common/PwaInstallPrompt';

// Views
import HomeDirectoryView from './views/pwa/HomeDirectoryView';
import ProfessionalProfileView from './views/pwa/ProfessionalProfileView';
import StoreCartCheckoutView from './views/pwa/StoreCartCheckoutView';
import FavoritesView from './views/pwa/FavoritesView';

// Merchant Views
import GondolaDataGridView from './views/merchant/GondolaDataGridView';
import PosKanbanView from './views/merchant/PosKanbanView';
import MerchantProfileView from './views/merchant/MerchantProfileView';

// Admin Views
import AdminDashboardView from './views/admin/AdminDashboardView';
import AdminMerchantsView from './views/admin/AdminMerchantsView';
import AdminSubscriptionsView from './views/admin/AdminSubscriptionsView';
import AdminTaxonomyView from './views/admin/AdminTaxonomyView';
import AdminSettingsView from './views/admin/AdminSettingsView';

export default function App() {
  const location = useLocation();
  const isAdmin = location.pathname.startsWith('/admin');

  return (
    <div className="min-h-screen flex flex-col bg-surface text-on-surface">
      {/* Top Navbar */}
      <AppNavbar />

      {/* Main Routes */}
      <div className="flex-1 flex flex-col">
        <Routes>
          {/* Vecino / Turista PWA Routes */}
          <Route path="/" element={<HomeDirectoryView />} />
          <Route path="/comercio/:slug" element={<ProfessionalProfileView />} />
          <Route path="/tienda/:slug" element={<StoreCartCheckoutView />} />
          <Route path="/favoritos" element={<FavoritesView />} />

          {/* Merchant Routes */}
          <Route path="/panel/gondola" element={<GondolaDataGridView />} />
          <Route path="/panel/pos" element={<PosKanbanView />} />
          <Route path="/panel/perfil" element={<MerchantProfileView />} />

          {/* Admin Routes */}
          <Route path="/admin" element={<AdminDashboardView />} />
          <Route path="/admin/comercios" element={<AdminMerchantsView />} />
          <Route path="/admin/suscripciones" element={<AdminSubscriptionsView />} />
          <Route path="/admin/categorias" element={<AdminTaxonomyView />} />
          <Route path="/admin/configuracion" element={<AdminSettingsView />} />
        </Routes>
      </div>

      {/* Global Interactive Cart Drawer */}
      <CartSlideOver />

      {/* PWA Install Prompt */}
      <PwaInstallPrompt />

      {/* Footer (Not on admin pages) */}
      {!isAdmin && <AppFooter />}

      {/* Mobile Bottom Navigation */}
      <BottomNavigation />
    </div>
  );
}
