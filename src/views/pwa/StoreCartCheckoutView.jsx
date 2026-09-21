import React, { useState } from 'react';
import { useParams, Link } from 'react-router-dom';
import { useApp } from '../../context/AppContext';
import { 
  ArrowLeft, 
  MapPin, 
  Star, 
  Clock, 
  Plus, 
  ShoppingBag, 
  Share2, 
  Heart,
  Search,
  CheckCircle2,
  Sparkles
} from 'lucide-react';

export default function StoreCartCheckoutView() {
  const { slug } = useParams();
  const { businesses, products, addToCart, favorites, toggleFavorite, setIsCartOpen, cartItemCount } = useApp();

  const business = businesses.find(b => b.slug === slug) || businesses[0]; // default to Café de las Sierras
  const bizProducts = products.filter(p => p.businessId === business?.id);
  const isFav = favorites.includes(business?.id);

  const [selectedCategory, setSelectedCategory] = useState('all');
  const [searchItem, setSearchItem] = useState('');
  const [selectedProductModal, setSelectedProductModal] = useState(null);
  const [modalQty, setModalQty] = useState(1);

  // Extract distinct categories in store
  const storeCategories = Array.from(new Set(bizProducts.map(p => p.categoryName || 'General')));

  const filteredProducts = bizProducts.filter(p => {
    if (selectedCategory !== 'all' && p.categoryName !== selectedCategory) return false;
    if (searchItem.trim() && !p.name.toLowerCase().includes(searchItem.toLowerCase()) && !p.description?.toLowerCase().includes(searchItem.toLowerCase())) return false;
    return true;
  });

  const handleOpenProductModal = (product) => {
    setSelectedProductModal(product);
    setModalQty(1);
  };

  const handleAddToCartFromModal = () => {
    for (let i = 0; i < modalQty; i++) {
      addToCart(selectedProductModal, business);
    }
    setSelectedProductModal(null);
  };

  const handleShare = () => {
    if (navigator.share) {
      navigator.share({
        title: business.name,
        text: business.tagline,
        url: window.location.href
      });
    } else {
      navigator.clipboard.writeText(window.location.href);
      alert('¡Enlace de la tienda copiado al portapapeles!');
    }
  };

  return (
    <div className="flex-1 bg-surface pb-24 md:pb-12 animate-in fade-in">
      
      {/* Top Navigation */}
      <div className="max-w-5xl mx-auto px-4 pt-4 pb-2 flex items-center justify-between">
        <Link
          to="/"
          className="inline-flex items-center gap-1.5 px-3 py-2 rounded-xl bg-surface-container-lowest border border-surface-container-high text-xs font-bold text-on-surface hover:bg-surface-container transition-colors shadow-xs"
        >
          <ArrowLeft className="w-4 h-4" />
          <span>Volver al Directorio</span>
        </Link>
        
        <div className="flex items-center gap-2">
          <button
            type="button"
            onClick={handleShare}
            className="p-2 rounded-xl bg-surface-container-lowest border border-surface-container-high text-on-surface hover:bg-surface-container transition-colors"
            title="Compartir"
          >
            <Share2 className="w-4 h-4" />
          </button>
          <button
            type="button"
            onClick={() => toggleFavorite(business.id)}
            className={`p-2 rounded-xl border transition-colors ${
              isFav 
                ? 'bg-rose-50 border-rose-200 text-rose-600' 
                : 'bg-surface-container-lowest border-surface-container-high text-on-surface hover:bg-surface-container'
            }`}
            title="Guardar favorito"
          >
            <Heart className={`w-4 h-4 ${isFav ? 'fill-rose-600' : ''}`} />
          </button>
        </div>
      </div>

      <div className="max-w-5xl mx-auto px-4 sm:px-6 space-y-6 pt-2">
        
        {/* Header Hero Card */}
        <div className="bg-surface-container-lowest rounded-3xl border border-surface-container-high overflow-hidden shadow-card">
          <div className="relative h-44 sm:h-60 w-full bg-slate-900">
            <img
              src={business.coverUrl}
              alt={business.name}
              className="w-full h-full object-cover opacity-85"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-inverse-surface via-inverse-surface/30 to-transparent"></div>
            
            {/* Badges in Cover */}
            <div className="absolute top-4 left-4 flex flex-wrap gap-2">
              <span className="px-3 py-1 rounded-full bg-emerald-600 text-white text-xs font-extrabold flex items-center gap-1 shadow-md">
                <span className="w-2 h-2 rounded-full bg-white animate-pulse"></span>
                <span>Abierto Ahora</span>
              </span>
              <span className="px-3 py-1 rounded-full bg-black/40 backdrop-blur-md text-white text-xs font-bold">
                Envíos a Domicilio & Take Away
              </span>
            </div>
          </div>

          <div className="p-5 sm:p-7 relative">
            {/* Logo Avatar */}
            <div className="absolute -top-12 left-6 w-20 h-20 rounded-2xl bg-surface-container-lowest p-1 shadow-card border-2 border-white overflow-hidden">
              <img src={business.logoUrl} alt={business.name} className="w-full h-full object-cover rounded-xl" />
            </div>

            <div className="pt-8 space-y-3">
              <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3">
                <div>
                  <h1 className="text-xl sm:text-2xl font-extrabold text-on-surface tracking-tight">
                    {business.name}
                  </h1>
                  <div className="flex flex-wrap items-center gap-3 text-xs text-on-surface-variant mt-1 font-medium">
                    <span className="flex items-center gap-1 text-primary font-bold">
                      <MapPin className="w-3.5 h-3.5" />
                      <span>{business.locationName} · Sierras Chicas</span>
                    </span>
                    <span className="flex items-center gap-1 text-amber-600 font-bold">
                      <Star className="w-3.5 h-3.5 fill-amber-500" />
                      <span>{business.rating} ({business.reviewCount} reseñas)</span>
                    </span>
                  </div>
                </div>

                {/* View Cart Button */}
                <button
                  type="button"
                  onClick={() => setIsCartOpen(true)}
                  className="px-5 py-2.5 rounded-2xl bg-primary text-white font-extrabold text-xs sm:text-sm shadow-md shadow-primary/25 flex items-center justify-center gap-2 hover:bg-primary-container transition-all active:scale-95 shrink-0"
                >
                  <ShoppingBag className="w-4 h-4" />
                  <span>Ver Carrito ({cartItemCount})</span>
                </button>
              </div>

              <p className="text-xs sm:text-sm text-on-surface-variant leading-relaxed pt-1">
                {business.description}
              </p>

              {/* Info Badges */}
              <div className="flex flex-wrap items-center gap-2 pt-2 text-xs text-on-surface font-semibold">
                <span className="flex items-center gap-1.5 px-3 py-1.5 rounded-xl bg-surface border border-surface-container-high">
                  <Clock className="w-3.5 h-3.5 text-primary" />
                  <span>{business.openingHours}</span>
                </span>
                <span className="flex items-center gap-1.5 px-3 py-1.5 rounded-xl bg-surface border border-surface-container-high">
                  <MapPin className="w-3.5 h-3.5 text-primary" />
                  <span>{business.address}</span>
                </span>
              </div>

            </div>
          </div>
        </div>

        {/* Search in Menu & Categories Strip */}
        <div className="space-y-3 sticky top-20 z-30 bg-surface/95 backdrop-blur-md py-2">
          {/* Search */}
          <div className="bg-surface-container-lowest px-3 py-2 rounded-2xl border border-surface-container-high shadow-xs flex items-center gap-2">
            <Search className="w-4 h-4 text-outline shrink-0" />
            <input
              type="text"
              value={searchItem}
              onChange={e => setSearchItem(e.target.value)}
              placeholder="Buscar en la carta (Ej: Flat White, Croissant...)"
              className="w-full bg-transparent text-xs text-on-surface placeholder:text-outline focus:outline-none"
            />
            {searchItem && (
              <button onClick={() => setSearchItem('')} className="text-xs text-outline hover:text-on-surface">
                ✕
              </button>
            )}
          </div>

          {/* Categories Pill Strip */}
          <div className="flex items-center gap-2 overflow-x-auto no-scrollbar pb-1">
            <button
              type="button"
              onClick={() => setSelectedCategory('all')}
              className={`shrink-0 px-3.5 py-1.5 rounded-xl text-xs font-bold transition-all ${
                selectedCategory === 'all'
                  ? 'bg-primary text-white shadow-sm'
                  : 'bg-surface-container-lowest text-on-surface hover:bg-surface-container border border-surface-container-high'
              }`}
            >
              Todos los Ítems
            </button>
            {storeCategories.map(catName => (
              <button
                key={catName}
                type="button"
                onClick={() => setSelectedCategory(catName)}
                className={`shrink-0 px-3.5 py-1.5 rounded-xl text-xs font-bold transition-all ${
                  selectedCategory === catName
                    ? 'bg-primary text-white shadow-sm'
                    : 'bg-surface-container-lowest text-on-surface hover:bg-surface-container border border-surface-container-high'
                }`}
              >
                {catName}
              </button>
            ))}
          </div>
        </div>

        {/* Products Grid (Mobile: 1 col, Tablet: 2 cols, Desktop: 3 cols) */}
        <div className="space-y-4">
          <div className="flex items-center justify-between">
            <h2 className="text-base sm:text-lg font-extrabold text-on-surface">
              Carta & Catálogo Disponible ({filteredProducts.length})
            </h2>
            <span className="text-xs text-on-surface-variant font-medium">Precios actualizados</span>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
            {filteredProducts.map(prod => (
              <div
                key={prod.id}
                className="group bg-surface-container-lowest rounded-2xl border border-surface-container-high overflow-hidden shadow-subtle hover:shadow-card transition-all flex flex-col justify-between"
              >
                {prod.imageUrl && (
                  <div className="h-40 w-full overflow-hidden bg-slate-100 relative">
                    <img
                      src={prod.imageUrl}
                      alt={prod.name}
                      className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                    />
                    <span className="absolute top-2 left-2 px-2 py-0.5 rounded-md bg-black/50 backdrop-blur-md text-white text-[10px] font-bold">
                      {prod.categoryName}
                    </span>
                  </div>
                )}

                <div className="p-4 flex-1 flex flex-col justify-between space-y-3">
                  <div className="space-y-1">
                    <h3 className="text-sm font-bold text-on-surface group-hover:text-primary transition-colors">
                      {prod.name}
                    </h3>
                    <p className="text-xs text-on-surface-variant line-clamp-2 leading-relaxed">
                      {prod.description}
                    </p>
                  </div>

                  <div className="pt-2 border-t border-surface-container-high flex items-center justify-between gap-2">
                    <div>
                      {prod.compareAtPrice && (
                        <span className="text-[10px] text-outline line-through block">
                          ${prod.compareAtPrice.toLocaleString('es-AR')}
                        </span>
                      )}
                      <span className="text-base font-extrabold text-primary">
                        ${prod.price.toLocaleString('es-AR')}
                      </span>
                    </div>

                    <button
                      type="button"
                      onClick={() => handleOpenProductModal(prod)}
                      className="px-3.5 py-2 rounded-xl bg-primary-fixed text-on-primary-fixed hover:bg-primary hover:text-white font-bold text-xs flex items-center gap-1.5 transition-all shadow-xs active:scale-95"
                    >
                      <Plus className="w-3.5 h-3.5" />
                      <span>Agregar</span>
                    </button>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>

      </div>

      {/* Floating Bottom Cart Bar for Mobile */}
      {cartItemCount > 0 && (
        <div className="fixed bottom-16 inset-x-4 md:hidden z-30 animate-in slide-in-from-bottom-3">
          <button
            type="button"
            onClick={() => setIsCartOpen(true)}
            className="w-full py-3 px-4 rounded-2xl bg-primary text-white shadow-modal flex items-center justify-between font-bold text-sm"
          >
            <div className="flex items-center gap-2">
              <ShoppingBag className="w-5 h-5" />
              <span>Ver Carrito ({cartItemCount} ítems)</span>
            </div>
            <span className="bg-primary-fixed text-on-primary-fixed px-2.5 py-1 rounded-xl text-xs font-extrabold">
              Finalizar Pedido →
            </span>
          </button>
        </div>
      )}

      {/* Product Add Modal */}
      {selectedProductModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-inverse-surface/60 backdrop-blur-sm animate-in fade-in">
          <div className="bg-surface-container-lowest rounded-3xl shadow-modal border border-surface-container-high w-full max-w-sm p-5 space-y-4">
            
            <div className="flex items-center justify-between border-b border-surface-container-high pb-3">
              <h3 className="font-extrabold text-sm text-on-surface truncate">
                {selectedProductModal.name}
              </h3>
              <button
                onClick={() => setSelectedProductModal(null)}
                className="p-1 text-outline hover:text-on-surface"
              >
                ✕
              </button>
            </div>

            {selectedProductModal.imageUrl && (
              <div className="h-36 w-full rounded-2xl overflow-hidden">
                <img src={selectedProductModal.imageUrl} alt={selectedProductModal.name} className="w-full h-full object-cover" />
              </div>
            )}

            <p className="text-xs text-on-surface-variant">
              {selectedProductModal.description}
            </p>

            <div className="flex items-center justify-between pt-2">
              <span className="text-xs font-bold text-on-surface">Cantidad:</span>
              <div className="flex items-center gap-3 bg-surface px-3 py-1.5 rounded-xl border border-surface-container-high">
                <button
                  onClick={() => setModalQty(Math.max(1, modalQty - 1))}
                  className="font-bold text-sm px-1 text-on-surface-variant hover:text-primary"
                >
                  -
                </button>
                <span className="font-extrabold text-sm text-on-surface w-4 text-center">
                  {modalQty}
                </span>
                <button
                  onClick={() => setModalQty(modalQty + 1)}
                  className="font-bold text-sm px-1 text-on-surface-variant hover:text-primary"
                >
                  +
                </button>
              </div>
            </div>

            <div className="pt-3 border-t border-surface-container-high flex items-center justify-between">
              <div>
                <span className="text-[10px] text-outline block">Total ítem</span>
                <span className="text-base font-extrabold text-primary">
                  ${(selectedProductModal.price * modalQty).toLocaleString('es-AR')}
                </span>
              </div>
              <button
                type="button"
                onClick={handleAddToCartFromModal}
                className="px-4 py-2.5 rounded-xl bg-primary text-white font-bold text-xs shadow-md"
              >
                Confirmar y Agregar
              </button>
            </div>

          </div>
        </div>
      )}

    </div>
  );
}
