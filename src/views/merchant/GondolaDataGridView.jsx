import React, { useState } from 'react';
import MerchantNav from '../../components/merchant/MerchantNav';
import { useApp } from '../../context/AppContext';
import { 
  Search, 
  Plus, 
  Trash2, 
  Save, 
  Check, 
  AlertCircle, 
  TrendingUp, 
  Package, 
  CheckCircle2,
  Filter,
  DollarSign
} from 'lucide-react';

export default function GondolaDataGridView() {
  const { products, updateProduct, addProduct, deleteProduct } = useApp();
  
  // Filter by Cafe de las Sierras or show all products for demo
  const [localProducts, setLocalProducts] = useState(products);
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedCat, setSelectedCat] = useState('all');
  const [saveSuccess, setSaveSuccess] = useState(false);
  
  // New Product Modal
  const [newModalOpen, setNewModalOpen] = useState(false);
  const [newName, setNewName] = useState('');
  const [newCategory, setNewCategory] = useState('Cafetería de Especialidad');
  const [newPrice, setNewPrice] = useState('');
  const [newStock, setNewStock] = useState('50');
  const [newDesc, setNewDesc] = useState('');

  const categories = Array.from(new Set(products.map(p => p.categoryName || 'General')));

  const handleInlineChange = (id, field, value) => {
    setLocalProducts(prev => prev.map(p => {
      if (p.id === id) {
        return { ...p, [field]: value };
      }
      return p;
    }));
  };

  const handleSaveAll = () => {
    localProducts.forEach(prod => {
      updateProduct(prod);
    });
    setSaveSuccess(true);
    setTimeout(() => setSaveSuccess(false), 3000);
  };

  const handleCreateProduct = (e) => {
    e.preventDefault();
    if (!newName.trim() || !newPrice) return;

    const created = {
      businessId: 'biz-1',
      name: newName,
      categoryName: newCategory,
      price: parseFloat(newPrice) || 0,
      stock: parseInt(newStock) || 0,
      description: newDesc,
      inStock: true,
      imageUrl: 'https://images.unsplash.com/photo-1509785307050-d4066910ec1e?w=400&auto=format&fit=crop&q=80'
    };

    addProduct(created);
    setLocalProducts(prev => [created, ...prev]);
    setNewModalOpen(false);
    setNewName('');
    setNewPrice('');
    setNewDesc('');
  };

  const handleDelete = (id) => {
    if (window.confirm('¿Seguro que deseas eliminar este producto del catálogo?')) {
      deleteProduct(id);
      setLocalProducts(prev => prev.filter(p => p.id !== id));
    }
  };

  const filtered = localProducts.filter(p => {
    if (selectedCat !== 'all' && p.categoryName !== selectedCat) return false;
    if (searchTerm.trim() && !p.name.toLowerCase().includes(searchTerm.toLowerCase())) return false;
    return true;
  });

  return (
    <div className="flex-1 bg-surface pb-20 md:pb-12 animate-in fade-in">
      <MerchantNav />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-6 space-y-6">
        
        {/* Top Summary Bar */}
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 bg-surface-container-lowest p-5 rounded-3xl border border-surface-container-high shadow-subtle">
          <div>
            <div className="flex items-center gap-2">
              <span className="px-2.5 py-0.5 rounded-full bg-amber-100 text-amber-900 text-xs font-extrabold uppercase">
                Edición en Vivo
              </span>
              <h1 className="text-lg sm:text-xl font-extrabold text-on-surface">
                Góndola Digital & Actualización Rápida de Precios
              </h1>
            </div>
            <p className="text-xs text-on-surface-variant mt-1">
              Modificá precios y stock directamente en las celdas. Los cambios se reflejan al instante en tu tienda PWA.
            </p>
          </div>

          <div className="flex items-center gap-2 self-start md:self-auto">
            <button
              type="button"
              onClick={() => setNewModalOpen(true)}
              className="px-4 py-2.5 rounded-xl bg-surface-container hover:bg-surface-container-high text-on-surface text-xs font-bold flex items-center gap-1.5 transition-all shadow-xs"
            >
              <Plus className="w-4 h-4 text-amber-700" />
              <span>Nuevo Producto</span>
            </button>

            <button
              type="button"
              onClick={handleSaveAll}
              className={`px-5 py-2.5 rounded-xl text-xs font-extrabold flex items-center gap-1.5 transition-all shadow-md active:scale-95 ${
                saveSuccess
                  ? 'bg-emerald-600 text-white'
                  : 'bg-amber-600 hover:bg-amber-500 text-white shadow-amber-900/20'
              }`}
            >
              {saveSuccess ? <Check className="w-4 h-4" /> : <Save className="w-4 h-4" />}
              <span>{saveSuccess ? '¡Cambios Guardados!' : 'Guardar Todo'}</span>
            </button>
          </div>
        </div>

        {/* Filter Controls */}
        <div className="flex flex-col sm:flex-row items-center justify-between gap-3 bg-surface-container-lowest p-3 rounded-2xl border border-surface-container-high">
          <div className="flex items-center gap-2 w-full sm:w-80 bg-surface px-3 py-2 rounded-xl border border-surface-container-high">
            <Search className="w-4 h-4 text-outline shrink-0" />
            <input
              type="text"
              value={searchTerm}
              onChange={e => setSearchTerm(e.target.value)}
              placeholder="Buscar por nombre de producto..."
              className="w-full bg-transparent text-xs text-on-surface placeholder:text-outline focus:outline-none"
            />
          </div>

          <div className="flex items-center gap-2 w-full sm:w-auto overflow-x-auto no-scrollbar">
            <span className="text-xs font-bold text-outline uppercase tracking-wider shrink-0">Categoría:</span>
            <select
              value={selectedCat}
              onChange={e => setSelectedCat(e.target.value)}
              className="px-3 py-2 rounded-xl bg-surface border border-surface-container-high text-xs text-on-surface font-semibold focus:outline-none"
            >
              <option value="all">Todas las categorías</option>
              {categories.map(cat => (
                <option key={cat} value={cat}>{cat}</option>
              ))}
            </select>
          </div>
        </div>

        {/* Responsive Data-Grid Table (Desktop / Tablet table, Mobile cards) */}
        <div className="bg-surface-container-lowest rounded-3xl border border-surface-container-high overflow-hidden shadow-subtle">
          
          {/* Desktop & Tablet Table */}
          <div className="hidden sm:block overflow-x-auto">
            <table className="w-full text-left text-xs text-on-surface">
              <thead className="bg-surface border-b border-surface-container-high font-extrabold uppercase tracking-wider text-outline text-[11px]">
                <tr>
                  <th className="p-4">Producto & Detalle</th>
                  <th className="p-4">Categoría</th>
                  <th className="p-4">Precio Lista ($ ARS)</th>
                  <th className="p-4">Stock</th>
                  <th className="p-4 text-center">Estado</th>
                  <th className="p-4 text-right">Acciones</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-surface-container-high">
                {filtered.map(prod => (
                  <tr key={prod.id} className="hover:bg-surface/60 transition-colors">
                    <td className="p-4">
                      <div className="flex items-center gap-3">
                        <img
                          src={prod.imageUrl || 'https://images.unsplash.com/photo-1555507036-ab1f4038808a?w=100&auto=format&fit=crop&q=80'}
                          alt={prod.name}
                          className="w-10 h-10 rounded-xl object-cover border border-surface-container-high shrink-0"
                        />
                        <div>
                          <input
                            type="text"
                            value={prod.name}
                            onChange={e => handleInlineChange(prod.id, 'name', e.target.value)}
                            className="font-bold text-xs text-on-surface bg-transparent border-b border-transparent hover:border-outline focus:border-primary focus:bg-white px-1 py-0.5 rounded transition-all w-full max-w-xs"
                          />
                          <p className="text-[11px] text-on-surface-variant truncate max-w-xs px-1">
                            {prod.description}
                          </p>
                        </div>
                      </div>
                    </td>

                    <td className="p-4">
                      <span className="px-2.5 py-1 rounded-lg bg-surface-container text-[11px] font-bold text-on-surface-variant">
                        {prod.categoryName}
                      </span>
                    </td>

                    <td className="p-4">
                      <div className="relative flex items-center w-32">
                        <span className="absolute left-2.5 text-xs font-bold text-primary">$</span>
                        <input
                          type="number"
                          value={prod.price}
                          onChange={e => handleInlineChange(prod.id, 'price', parseFloat(e.target.value) || 0)}
                          className="w-full pl-6 pr-2 py-1.5 rounded-xl bg-surface border border-surface-container-high text-xs font-extrabold text-primary focus:outline-none focus:border-primary text-right"
                        />
                      </div>
                    </td>

                    <td className="p-4">
                      <input
                        type="number"
                        value={prod.stock || 0}
                        onChange={e => handleInlineChange(prod.id, 'stock', parseInt(e.target.value) || 0)}
                        className="w-20 px-2.5 py-1.5 rounded-xl bg-surface border border-surface-container-high text-xs font-bold text-on-surface focus:outline-none focus:border-primary text-center"
                      />
                    </td>

                    <td className="p-4 text-center">
                      <button
                        type="button"
                        onClick={() => handleInlineChange(prod.id, 'inStock', !prod.inStock)}
                        className={`px-3 py-1 rounded-full text-[11px] font-extrabold transition-colors ${
                          prod.inStock
                            ? 'bg-emerald-100 text-emerald-800'
                            : 'bg-rose-100 text-rose-800'
                        }`}
                      >
                        {prod.inStock ? 'En Stock' : 'Agotado'}
                      </button>
                    </td>

                    <td className="p-4 text-right">
                      <button
                        type="button"
                        onClick={() => handleDelete(prod.id)}
                        className="p-1.5 rounded-lg text-outline hover:text-rose-600 hover:bg-rose-50 transition-colors"
                        title="Eliminar producto"
                      >
                        <Trash2 className="w-4 h-4" />
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>

          {/* Mobile Card Grid View */}
          <div className="sm:hidden divide-y divide-surface-container-high">
            {filtered.map(prod => (
              <div key={prod.id} className="p-4 space-y-3">
                <div className="flex items-center gap-3">
                  <img
                    src={prod.imageUrl || 'https://images.unsplash.com/photo-1555507036-ab1f4038808a?w=100&auto=format&fit=crop&q=80'}
                    alt={prod.name}
                    className="w-12 h-12 rounded-xl object-cover border border-surface-container-high shrink-0"
                  />
                  <div className="flex-1 min-w-0">
                    <input
                      type="text"
                      value={prod.name}
                      onChange={e => handleInlineChange(prod.id, 'name', e.target.value)}
                      className="font-bold text-xs text-on-surface bg-surface px-2 py-1 rounded-lg border border-surface-container-high w-full"
                    />
                    <span className="text-[10px] font-bold text-outline mt-0.5 block">
                      {prod.categoryName}
                    </span>
                  </div>
                </div>

                <div className="grid grid-cols-2 gap-2 pt-1">
                  <div>
                    <label className="text-[10px] font-bold text-outline block mb-1">Precio ($ ARS)</label>
                    <input
                      type="number"
                      value={prod.price}
                      onChange={e => handleInlineChange(prod.id, 'price', parseFloat(e.target.value) || 0)}
                      className="w-full px-2.5 py-1.5 rounded-xl bg-surface border border-surface-container-high text-xs font-extrabold text-primary"
                    />
                  </div>
                  <div>
                    <label className="text-[10px] font-bold text-outline block mb-1">Stock</label>
                    <input
                      type="number"
                      value={prod.stock || 0}
                      onChange={e => handleInlineChange(prod.id, 'stock', parseInt(e.target.value) || 0)}
                      className="w-full px-2.5 py-1.5 rounded-xl bg-surface border border-surface-container-high text-xs font-bold text-center"
                    />
                  </div>
                </div>

                <div className="flex items-center justify-between pt-1">
                  <button
                    type="button"
                    onClick={() => handleInlineChange(prod.id, 'inStock', !prod.inStock)}
                    className={`px-3 py-1 rounded-full text-[11px] font-extrabold ${
                      prod.inStock ? 'bg-emerald-100 text-emerald-800' : 'bg-rose-100 text-rose-800'
                    }`}
                  >
                    {prod.inStock ? '✓ En Stock' : '✕ Agotado'}
                  </button>

                  <button
                    type="button"
                    onClick={() => handleDelete(prod.id)}
                    className="p-1.5 text-rose-600 font-bold text-xs flex items-center gap-1"
                  >
                    <Trash2 className="w-3.5 h-3.5" />
                    <span>Eliminar</span>
                  </button>
                </div>
              </div>
            ))}
          </div>

        </div>

      </div>

      {/* New Product Modal */}
      {newModalOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-inverse-surface/60 backdrop-blur-sm animate-in fade-in">
          <div className="bg-surface-container-lowest rounded-3xl shadow-modal border border-surface-container-high w-full max-w-md p-5 sm:p-6 space-y-4">
            <div className="flex items-center justify-between border-b border-surface-container-high pb-3">
              <h3 className="font-extrabold text-sm sm:text-base text-on-surface">
                Agregar Nuevo Producto a la Góndola
              </h3>
              <button onClick={() => setNewModalOpen(false)} className="text-outline hover:text-on-surface">
                ✕
              </button>
            </div>

            <form onSubmit={handleCreateProduct} className="space-y-3 text-xs">
              <div>
                <label className="font-bold text-on-surface block mb-1">Nombre del Producto *</label>
                <input
                  type="text"
                  required
                  placeholder="Ej: Medialuna de Manteca con DDL"
                  value={newName}
                  onChange={e => setNewName(e.target.value)}
                  className="w-full px-3 py-2 rounded-xl bg-surface border border-surface-container-high text-on-surface focus:outline-none focus:border-primary"
                />
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="font-bold text-on-surface block mb-1">Categoría</label>
                  <select
                    value={newCategory}
                    onChange={e => setNewCategory(e.target.value)}
                    className="w-full px-3 py-2 rounded-xl bg-surface border border-surface-container-high text-on-surface focus:outline-none focus:border-primary"
                  >
                    <option value="Cafetería de Especialidad">Cafetería</option>
                    <option value="Pastelería Artesanal">Pastelería</option>
                    <option value="Brunch & Salado">Brunch & Salado</option>
                    <option value="Bebidas Frías">Bebidas Frías</option>
                  </select>
                </div>

                <div>
                  <label className="font-bold text-on-surface block mb-1">Precio ($ ARS) *</label>
                  <input
                    type="number"
                    required
                    placeholder="3500"
                    value={newPrice}
                    onChange={e => setNewPrice(e.target.value)}
                    className="w-full px-3 py-2 rounded-xl bg-surface border border-surface-container-high text-on-surface focus:outline-none focus:border-primary"
                  />
                </div>
              </div>

              <div>
                <label className="font-bold text-on-surface block mb-1">Descripción corta</label>
                <textarea
                  rows={2}
                  placeholder="Detalle de ingredientes o preparación..."
                  value={newDesc}
                  onChange={e => setNewDesc(e.target.value)}
                  className="w-full px-3 py-2 rounded-xl bg-surface border border-surface-container-high text-on-surface focus:outline-none focus:border-primary"
                />
              </div>

              <div className="pt-2 flex items-center justify-end gap-2">
                <button
                  type="button"
                  onClick={() => setNewModalOpen(false)}
                  className="px-4 py-2 rounded-xl text-on-surface-variant hover:bg-surface-container font-semibold"
                >
                  Cancelar
                </button>
                <button
                  type="submit"
                  className="px-5 py-2.5 rounded-xl bg-amber-600 hover:bg-amber-500 text-white font-extrabold shadow-md"
                >
                  Agregar a Góndola
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

    </div>
  );
}
