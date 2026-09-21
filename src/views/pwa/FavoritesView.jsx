import React from 'react';
import { Link } from 'react-router-dom';
import { useApp } from '../../context/AppContext';
import { Heart, ArrowRight, Store, MapPin, Star, Clock } from 'lucide-react';

export default function FavoritesView() {
  const { businesses, favorites, toggleFavorite } = useApp();
  const favBusinesses = businesses.filter(b => favorites.includes(b.id));

  return (
    <div className="flex-1 bg-surface pb-20 md:pb-12 px-4 sm:px-6 lg:px-8 max-w-5xl mx-auto w-full pt-6 animate-in fade-in">
      <div className="flex items-center justify-between pb-6 border-b border-surface-container-high">
        <div>
          <h1 className="text-xl sm:text-2xl font-extrabold text-on-surface">
            Mis Comercios Guardados
          </h1>
          <p className="text-xs text-on-surface-variant mt-0.5">
            Tus favoritos de Sierras Chicas para acceder rápidamente
          </p>
        </div>
        <span className="px-3 py-1 rounded-full bg-rose-50 text-rose-600 border border-rose-200 text-xs font-bold">
          {favBusinesses.length} Guardados
        </span>
      </div>

      {favBusinesses.length === 0 ? (
        <div className="py-20 text-center space-y-4">
          <div className="w-16 h-16 rounded-full bg-rose-50 text-rose-500 flex items-center justify-center mx-auto">
            <Heart className="w-8 h-8" />
          </div>
          <h3 className="text-base font-bold text-on-surface">No tenés comercios en favoritos</h3>
          <p className="text-xs text-on-surface-variant max-w-xs mx-auto">
            Tocá el corazón en cualquier comercio o servicio del directorio para guardarlo acá.
          </p>
          <Link
            to="/"
            className="inline-flex items-center gap-1.5 px-4 py-2 rounded-xl bg-primary text-white text-xs font-bold shadow-sm"
          >
            <span>Explorar Directorio</span>
            <ArrowRight className="w-4 h-4" />
          </Link>
        </div>
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5 pt-6">
          {favBusinesses.map(biz => {
            const targetUrl = biz.businessMode === 'servicios' ? `/comercio/${biz.slug}` : `/tienda/${biz.slug}`;
            return (
              <div
                key={biz.id}
                className="group bg-surface-container-lowest rounded-3xl border border-surface-container-high overflow-hidden shadow-subtle hover:shadow-card transition-all flex flex-col justify-between"
              >
                <div className="relative h-40 w-full overflow-hidden">
                  <img src={biz.coverUrl} alt={biz.name} className="w-full h-full object-cover group-hover:scale-105 transition-transform" />
                  <button
                    onClick={() => toggleFavorite(biz.id)}
                    className="absolute top-3 right-3 w-8 h-8 rounded-full bg-rose-500 text-white flex items-center justify-center shadow-md"
                  >
                    <Heart className="w-4 h-4 fill-white" />
                  </button>
                  <div className="absolute bottom-2 left-3 text-white text-xs font-semibold drop-shadow flex items-center gap-1">
                    <MapPin className="w-3.5 h-3.5 text-emerald-400" />
                    <span>{biz.locationName}</span>
                  </div>
                </div>

                <div className="p-4 space-y-3">
                  <div>
                    <span className="text-[10px] font-bold text-primary uppercase">{biz.categoryName}</span>
                    <h3 className="text-sm font-bold text-on-surface truncate">{biz.name}</h3>
                    <p className="text-xs text-on-surface-variant line-clamp-2 mt-1">{biz.tagline}</p>
                  </div>

                  <Link
                    to={targetUrl}
                    className="w-full py-2 rounded-xl bg-primary text-white hover:bg-primary-container text-xs font-bold flex items-center justify-center gap-1 shadow-sm transition-all"
                  >
                    <span>{biz.businessMode === 'servicios' ? 'Ver Ficha' : 'Ver Carta'}</span>
                    <ArrowRight className="w-3.5 h-3.5" />
                  </Link>
                </div>
              </div>
            );
          })}
        </div>
      )}
    </div>
  );
}
