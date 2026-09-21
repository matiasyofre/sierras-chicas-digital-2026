import React from 'react';
import { Routes, Route, useLocation } from 'react-router-dom';
import AppNavbar from './components/layout/AppNavbar';
import BottomNavigation from './components/layout/BottomNavigation';
import AppFooter from './components/layout/AppFooter';
import CartSlideOver from './components/common/CartSlideOver';
import PwaInstallPrompt from './components/common/PwaInstallPrompt';
import ProtectedRoute from './components/common/ProtectedRoute';

// Auth View
import LoginView from './views/auth/LoginView';

// Vecino / Turista Views
import HomeDirectoryView from './views/pwa/HomeDirectoryView';
import ProfessionalProfileView from './views/pwa/ProfessionalProfileView';
import StoreCartCheckoutView from './views/pwa/StoreCartCheckoutView';
import NoticeBusinessView from './views/pwa/NoticeBusinessView';
import FavoritesView from './views/pwa/FavoritesView';

// Merchant Views (Protected)
import GondolaDataGridView from './views/merchant/GondolaDataGridView';
import PosKanbanView from './views/merchant/PosKanbanView';
import MerchantProfileView from './views/merchant/MerchantProfileView';

// Admin Views (Protected)
import AdminDashboardView from './views/admin/AdminDashboardView';
import AdminMerchantsView from './views/admin/AdminMerchantsView';
import AdminSubscriptionsView from './views/admin/AdminSubscriptionsView';
import AdminTaxonomyView from './views/admin/AdminTaxonomyView';
import AdminSettingsView from './views/admin/AdminSettingsView';

export default function App() {
  const location = useLocation();
  const isAdmin = location.pathname.startsWith('/admin');
  const isAuthPage = location.pathname === '/login';

  return (
    <div className="min-h-screen flex flex-col bg-surface text-on-surface">
      {/* Top Navbar */}
      <AppNavbar />

      {/* Main Routes with Role-Based Protection */}
      <div className="flex-1 flex flex-col">
        <Routes>
          {/* Public & Vecino / Turista PWA Routes */}
          <Route path="/" element={<HomeDirectoryView />} />
          <Route path="/aviso/:slug" element={<NoticeBusinessView />} />
          <Route path="/comercio/:slug" element={<ProfessionalProfileView />} />
          <Route path="/tienda/:slug" element={<StoreCartCheckoutView />} />
          <Route path="/favoritos" element={<FavoritesView />} />
          <Route path="/login" element={<LoginView />} />

          {/* Merchant Routes (Restricted to 'merchant' and 'admin') */}
          <Route
            path="/panel/gondola"
            element={
              <ProtectedRoute allowedRoles={['merchant', 'admin']}>
                <GondolaDataGridView />
              </ProtectedRoute>
            }
          />
          <Route
            path="/panel/pos"
            element={
              <ProtectedRoute allowedRoles={['merchant', 'admin']}>
                <PosKanbanView />
              </ProtectedRoute>
            }
          />
          <Route
            path="/panel/perfil"
            element={
              <ProtectedRoute allowedRoles={['merchant', 'admin']}>
                <MerchantProfileView />
              </ProtectedRoute>
            }
          />

          {/* SuperAdmin Routes (Restricted strictly to 'admin') */}
          <Route
            path="/admin"
            element={
              <ProtectedRoute allowedRoles={['admin']}>
                <AdminDashboardView />
              </ProtectedRoute>
            }
          />
          <Route
            path="/admin/comercios"
            element={
              <ProtectedRoute allowedRoles={['admin']}>
                <AdminMerchantsView />
              </ProtectedRoute>
            }
          />
          <Route
            path="/admin/suscripciones"
            element={
              <ProtectedRoute allowedRoles={['admin']}>
                <AdminSubscriptionsView />
              </ProtectedRoute>
            }
          />
          <Route
            path="/admin/categorias"
            element={
              <ProtectedRoute allowedRoles={['admin']}>
                <AdminTaxonomyView />
              </ProtectedRoute>
            }
          />
          <Route
            path="/admin/configuracion"
            element={
              <ProtectedRoute allowedRoles={['admin']}>
                <AdminSettingsView />
              </ProtectedRoute>
            }
          />
        </Routes>
      </div>

      {/* Global Interactive Cart Drawer */}
      <CartSlideOver />

      {/* PWA Install Prompt */}
      <PwaInstallPrompt />

      {/* Footer (Not on admin pages or login) */}
      {!isAdmin && !isAuthPage && <AppFooter />}

      {/* Mobile Bottom Navigation */}
      <BottomNavigation />
    </div>
  );
}
