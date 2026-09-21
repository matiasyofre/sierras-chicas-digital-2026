import React from 'react';
import { Navigate, useLocation } from 'react-router-dom';
import { useApp } from '../../context/AppContext';

export default function ProtectedRoute({ children, allowedRoles = [] }) {
  const { currentUser, userRole } = useApp();
  const location = useLocation();

  if (!currentUser) {
    // Redirect unauthenticated user to login with redirect path
    return <Navigate to="/login" state={{ from: location }} replace />;
  }

  if (allowedRoles.length > 0 && !allowedRoles.includes(userRole)) {
    // If user has wrong role (e.g. 'user' trying to access /admin or /panel)
    return (
      <div className="flex-1 bg-surface flex items-center justify-center p-6 min-h-[70vh]">
        <div className="bg-surface-container-lowest p-8 rounded-3xl border border-surface-container-high shadow-modal max-w-md text-center space-y-4">
          <div className="w-16 h-16 rounded-full bg-rose-100 text-rose-600 flex items-center justify-center mx-auto text-2xl font-bold">
            🚫
          </div>
          <h2 className="text-lg font-extrabold text-on-surface">Acceso Restringido</h2>
          <p className="text-xs text-on-surface-variant leading-relaxed">
            Tu cuenta actual tiene rol de <strong className="uppercase text-primary">{userRole}</strong> y no posee permisos para acceder a esta sección privada.
          </p>
          <div className="pt-2 flex flex-col gap-2">
            <Navigate to="/" replace />
          </div>
        </div>
      </div>
    );
  }

  return children;
}
