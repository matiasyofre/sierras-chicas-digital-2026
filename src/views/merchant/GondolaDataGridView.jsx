import React, { useState } from 'react';
import MerchantNav from '../../components/merchant/MerchantNav';
import { useApp } from '../../context/AppContext';
import { 
  Search, 
  Plus, 
  Trash2, 
  Edit3, 
  Save, 
  Check, 
  AlertCircle, 
  TrendingUp, 
  Package, 
  CheckCircle2,
  Filter,
  DollarSign,
  Tag,
  Infinity as InfinityIcon,
  Layers,
  X
} from 'lucide-react';

export default function GondolaDataGridView() {
  const { products, updateProduct, addProduct, deleteProduct, tags, categories: adminCategories } = useApp();
  
  const [localProducts, setLocalProducts] = useState(products);
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedCat, setSelectedCat] = useState('all');
  const [saveSuccess, setSaveSuccess] = useState(false);
  
  // Available categories & subcategories from admin taxonomy
  const availableCategoriesList = adminCategories.flatMap(c => [
    c.name,
    ...(c.subcategories || [])
  ]);
  const defaultCategory = availableCategoriesList[0] || 'Gastronomía';

  // New / Edit Product Modal
  const [modalMode, setModalMode] = useState(null); // 'create' | 'edit' | null
  const [editingId, setEditingId] = useState(null);
  const [formName, setFormName] = useState('');
  const [formCategory, setFormCategory] = useState(defaultCategory);
  const [formPrice, setFormPrice] = useState('');
  const [formComparePrice, setFormComparePrice] = useState('');
  const [formStock, setFormStock] = useState('50');
  const [formUnlimitedStock, setFormUnlimitedStock] = useState(false);
  const [formDesc, setFormDesc] = useState('');
  const [formImage, setFormImage] = useState('');
  const [formTags, setFormTags] = useState([]);

  // Sync with AppContext products
  React.useEffect(() => {
    setLocalProducts(products);
  }, [products]);

  const existingProductCategories = Array.from(new Set(localProducts.map(p => p.categoryName || defaultCategory)));

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

  const openCreateModal = () => {
    setModalMode('create');
    setEditingId(null);
    setFormName('');
    setFormCategory(defaultCategory);
    setFormPrice('');
    setFormComparePrice('');
    setFormStock('50');
    setFormUnlimitedStock(false);
    setFormDesc('');
    setFormImage('https://images.unsplash.com/photo-1509785307050-d4066910ec1e?w=400&auto=format&fit=crop&q=80');
    setFormTags([]);
  };

  const openEditModal = (prod) => {
    setModalMode('edit');
    setEditingId(prod.id);
    setFormName(prod.name);
    setFormCategory(prod.categoryName || defaultCategory);
    setFormPrice(prod.price.toString());
    setFormComparePrice(prod.compareAtPrice ? prod.compareAtPrice.toString() : '');
    setFormStock((prod.stock || 0).toString());
    setFormUnlimitedStock(!!prod.hasUnlimitedStock);
    setFormDesc(prod.description || '');
    setFormImage(prod.imageUrl || '');
    setFormTags(prod.tags || []);
  };

  const toggleTagSelection = (tagLabel) => {
    setFormTags(prev => 
      prev.includes(tagLabel) 
        ? prev.filter(t => t !== tagLabel)
        : [...prev, tagLabel]
    );
  };

  const handleSaveModal = (e) => {
    e.preventDefault();
    if (!formName.trim() || !formPrice) return;

    const prodData = {
      businessId: 'biz-1',
      name: formName.trim(),
      categoryName: formCategory,
      price: parseFloat(formPrice) || 0,
      compareAtPrice: formComparePrice ? parseFloat(formComparePrice) : null,
      stock: formUnlimitedStock ? 9999 : (parseInt(formStock) || 0),
      hasUnlimitedStock: formUnlimitedStock,
      description: formDesc.trim(),
      inStock: formUnlimitedStock || (parseInt(formStock) > 0),
      imageUrl: formImage || 'https://images.unsplash.com/photo-1509785307050-d4066910ec1e?w=400&auto=format&fit=crop&q=80',
      tags: formTags
    };

    if (modalMode === 'create') {
      const created = addProduct(prodData);
      setLocalProducts(prev => [created, ...prev]);
    } else if (modalMode === 'edit' && editingId) {
      const updated = { ...prodData, id: editingId };
      updateProduct(updated);
      setLocalProducts(prev => prev.map(p => p.id === editingId ? updated : p));
    }

    setModalMode(null);
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
              Modificá precios, stock y etiquetas directamente en la tabla o usá el editor avanzado.
            </p>
          </div>

          <div className="flex items-center gap-2 self-start md:self-auto">
            <button
              type="button"
              onClick={openCreateModal}
              className="px-4 py-2.5 rounded-xl bg-surface-container hover:bg-surface-container-high text-on-surface text-xs font-bold flex items-center gap-1.5 transition-all shadow-xs active:scale-95"
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
              placeholder="Buscar por nombre o descripción..."
              className="w-full bg-transparent text-xs text-on-surface placeholder:text-outline focus:outline-none"
            />
          </div>

          <div className="flex items-center gap-2 self-start sm:self-auto">
            <Filter className="w-3.5 h-3.5 text-outline" />
            <span className="text-xs font-bold text-outline uppercase tracking-wider">Categoría:</span>
            <select
              value={selectedCat}
              onChange={e => setSelectedCat(e.target.value)}
              className="px-3 py-1.5 rounded-xl bg-surface border border-surface-container-high text-xs text-on-surface font-semibold focus:outline-none"
            >
              <option value="all">Todas ({localProducts.length})</option>
              {existingProductCategories.map(cat => (
                <option key={cat} value={cat}>
                  {cat} ({localProducts.filter(p => p.categoryName === cat).length})
                </option>
              ))}
            </select>
          </div>
        </div>

        {/* Products Table (Desktop & Tablet) */}
        <div className="bg-surface-container-lowest rounded-3xl border border-surface-container-high overflow-hidden shadow-subtle">
          <div className="overflow-x-auto hidden sm:block">
            <table className="w-full text-left text-xs text-on-surface">
              <thead className="bg-surface border-b border-surface-container-high font-extrabold uppercase tracking-wider text-outline text-[11px]">
                <tr>
                  <th className="p-4">Producto & Etiquetas</th>
                  <th className="p-4">Categoría Oficial</th>
                  <th className="p-4">Precio Lista</th>
                  <th className="p-4">Stock</th>
                  <th className="p-4 text-center">Estado</th>
                  <th className="p-4 text-right">Acciones</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-surface-container-high">
                {filtered.map(prod => (
                  <tr key={prod.id} className="hover:bg-surface/50 transition-colors">
                    <td className="p-4">
                      <div className="flex items-center gap-3">
                        <img
                          src={prod.imageUrl || 'https://images.unsplash.com/photo-1555507036-ab1f4038808a?w=100&auto=format&fit=crop&q=80'}
                          alt={prod.name}
                          className="w-11 h-11 rounded-xl object-cover border border-surface-container-high shrink-0"
                        />
                        <div className="min-w-0">
                          <input
                            type="text"
                            value={prod.name}
                            onChange={e => handleInlineChange(prod.id, 'name', e.target.value)}
                            className="font-bold text-xs text-on-surface bg-transparent hover:bg-surface px-1.5 py-0.5 rounded border border-transparent hover:border-surface-container-high focus:bg-surface focus:border-primary focus:outline-none w-64 truncate"
                          />
                          {/* Tags badges */}
                          <div className="flex flex-wrap gap-1 mt-1">
                            {prod.tags && prod.tags.map((tg, idx) => (
                              <span key={idx} className="px-2 py-0.2 rounded-md bg-amber-50 text-amber-900 border border-amber-200 text-[10px] font-bold">
                                {tg}
                              </span>
                            ))}
                          </div>
                        </div>
                      </div>
                    </td>

                    <td className="p-4">
                      <select
                        value={prod.categoryName || defaultCategory}
                        onChange={e => handleInlineChange(prod.id, 'categoryName', e.target.value)}
                        className="px-2.5 py-1 rounded-xl bg-surface border border-surface-container-high text-[11px] font-semibold text-on-surface focus:outline-none focus:border-primary"
                      >
                        {adminCategories.map(cat => (
                          <optgroup key={cat.id} label={`${cat.emoji || '📁'} ${cat.name}`}>
                            <option value={cat.name}>{cat.name}</option>
                            {(cat.subcategories || []).map((sub, idx) => (
                              <option key={idx} value={sub}>↳ {sub}</option>
                            ))}
                          </optgroup>
                        ))}
                      </select>
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
                      {prod.hasUnlimitedStock ? (
                        <span className="inline-flex items-center gap-1 px-2.5 py-1 rounded-lg bg-indigo-50 text-indigo-700 text-[11px] font-bold border border-indigo-200">
                          <InfinityIcon className="w-3.5 h-3.5" />
                          <span>Ilimitado</span>
                        </span>
                      ) : (
                        <input
                          type="number"
                          value={prod.stock || 0}
                          onChange={e => handleInlineChange(prod.id, 'stock', parseInt(e.target.value) || 0)}
                          className="w-20 px-2.5 py-1.5 rounded-xl bg-surface border border-surface-container-high text-xs font-bold text-on-surface focus:outline-none focus:border-primary text-center"
                        />
                      )}
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
                      <div className="flex items-center justify-end gap-1.5">
                        <button
                          type="button"
                          onClick={() => openEditModal(prod)}
                          className="p-1.5 rounded-lg text-outline hover:text-primary hover:bg-surface-container transition-colors"
                          title="Editar producto completo y etiquetas"
                        >
                          <Edit3 className="w-4 h-4" />
                        </button>
                        <button
                          type="button"
                          onClick={() => handleDelete(prod.id)}
                          className="p-1.5 rounded-lg text-outline hover:text-rose-600 hover:bg-rose-50 transition-colors"
                          title="Eliminar producto"
                        >
                          <Trash2 className="w-4 h-4" />
                        </button>
                      </div>
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
                    <span className="font-bold text-xs text-on-surface block truncate">{prod.name}</span>
                    <span className="text-[10px] font-bold text-outline mt-0.5 block">
                      {prod.categoryName}
                    </span>
                    {prod.tags && prod.tags.length > 0 && (
                      <div className="flex flex-wrap gap-1 mt-1">
                        {prod.tags.map((tg, idx) => (
                          <span key={idx} className="px-1.5 py-0.2 rounded bg-amber-50 text-amber-900 border border-amber-200 text-[9px] font-bold">
                            {tg}
                          </span>
                        ))}
                      </div>
                    )}
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
                    {prod.hasUnlimitedStock ? (
                      <div className="w-full px-2.5 py-1.5 rounded-xl bg-indigo-50 border border-indigo-200 text-xs font-bold text-indigo-700 text-center">
                        Ilimitado
                      </div>
                    ) : (
                      <input
                        type="number"
                        value={prod.stock || 0}
                        onChange={e => handleInlineChange(prod.id, 'stock', parseInt(e.target.value) || 0)}
                        className="w-full px-2.5 py-1.5 rounded-xl bg-surface border border-surface-container-high text-xs font-bold text-center"
                      />
                    )}
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

                  <div className="flex items-center gap-2">
                    <button
                      type="button"
                      onClick={() => openEditModal(prod)}
                      className="p-1.5 text-primary font-bold text-xs flex items-center gap-1"
                    >
                      <Edit3 className="w-3.5 h-3.5" />
                      <span>Editar</span>
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
              </div>
            ))}
          </div>

        </div>

      </div>

      {/* Product Create / Edit Modal (Categories are strictly chosen from admin taxonomy) */}
      {modalMode && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-inverse-surface/60 backdrop-blur-sm animate-in fade-in">
          <div className="bg-surface-container-lowest rounded-3xl shadow-modal border border-surface-container-high w-full max-w-lg p-5 sm:p-6 space-y-4 max-h-[90vh] overflow-y-auto">
            <div className="flex items-center justify-between border-b border-surface-container-high pb-3">
              <div className="flex items-center gap-2">
                <Package className="w-5 h-5 text-amber-600" />
                <h3 className="font-extrabold text-sm sm:text-base text-on-surface">
                  {modalMode === 'create' ? 'Agregar Nuevo Producto' : 'Editar Producto & Categoría'}
                </h3>
              </div>
              <button 
                type="button"
                onClick={() => setModalMode(null)} 
                className="text-outline hover:text-on-surface p-1 rounded-full hover:bg-surface-container"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            <form onSubmit={handleSaveModal} className="space-y-4 text-xs">
              <div>
                <label className="font-bold text-on-surface block mb-1">Nombre del Producto / Ítem *</label>
                <input
                  type="text"
                  required
                  value={formName}
                  onChange={e => setFormName(e.target.value)}
                  placeholder="Ej: Flat White Doble Shot, Pizza Especial, Servicio Técnico..."
                  className="w-full px-3 py-2 rounded-xl bg-surface border border-surface-container-high text-on-surface focus:outline-none focus:border-primary"
                />
              </div>

              {/* Category selection (Strictly from Admin taxonomy) */}
              <div>
                <label className="font-bold text-on-surface block mb-1">Categoría / Rubro Oficial *</label>
                <select
                  value={formCategory}
                  onChange={e => setFormCategory(e.target.value)}
                  className="w-full px-3 py-2 rounded-xl bg-surface border border-surface-container-high text-on-surface focus:outline-none focus:border-primary font-semibold"
                >
                  {adminCategories.map(cat => (
                    <optgroup key={cat.id} label={`${cat.emoji || '📁'} ${cat.name}`}>
                      <option value={cat.name}>{cat.name} (Principal)</option>
                      {(cat.subcategories || []).map((sub, idx) => (
                        <option key={idx} value={sub}>↳ {sub}</option>
                      ))}
                    </optgroup>
                  ))}
                </select>
                <p className="text-[10px] text-outline mt-1">
                  * La taxonomía de categorías es administrada por la plataforma. Solo podés seleccionar una existente.
                </p>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                <div>
                  <label className="font-bold text-on-surface block mb-1">Precio de Venta ($ ARS) *</label>
                  <input
                    type="number"
                    required
                    value={formPrice}
                    onChange={e => setFormPrice(e.target.value)}
                    placeholder="3200"
                    className="w-full px-3 py-2 rounded-xl bg-surface border border-surface-container-high text-on-surface font-extrabold text-primary focus:outline-none focus:border-primary"
                  />
                </div>

                <div>
                  <label className="font-bold text-on-surface block mb-1">Precio Anterior / Tachado ($)</label>
                  <input
                    type="number"
                    value={formComparePrice}
                    onChange={e => setFormComparePrice(e.target.value)}
                    placeholder="3500"
                    className="w-full px-3 py-2 rounded-xl bg-surface border border-surface-container-high text-on-surface focus:outline-none focus:border-primary"
                  />
                </div>
              </div>

              {/* Stock Management Option (SC-20) */}
              <div className="p-3.5 rounded-2xl bg-surface border border-surface-container-high space-y-2.5">
                <div className="flex items-center justify-between">
                  <span className="font-bold text-on-surface">Tipo de Stock</span>
                  <label className="flex items-center gap-2 cursor-pointer">
                    <input
                      type="checkbox"
                      checked={formUnlimitedStock}
                      onChange={e => setFormUnlimitedStock(e.target.checked)}
                      className="w-4 h-4 text-primary rounded"
                    />
                    <span className="text-xs font-semibold text-on-surface">Stock Ilimitado / A Pedido</span>
                  </label>
                </div>

                {!formUnlimitedStock && (
                  <div>
                    <label className="font-bold text-on-surface-variant block mb-1">Cantidad en Stock Disponible</label>
                    <input
                      type="number"
                      value={formStock}
                      onChange={e => setFormStock(e.target.value)}
                      className="w-32 px-3 py-1.5 rounded-xl bg-surface-container-lowest border border-surface-container-high text-xs font-bold"
                    />
                  </div>
                )}
              </div>

              {/* Tags / Badges Selection */}
              <div className="space-y-1.5">
                <label className="font-bold text-on-surface block">Etiquetas del Producto (Opcionales)</label>
                <div className="flex flex-wrap gap-1.5 p-2.5 rounded-2xl bg-surface border border-surface-container-high">
                  {tags.map(tg => {
                    const isSelected = formTags.includes(tg.label);
                    return (
                      <button
                        key={tg.id}
                        type="button"
                        onClick={() => toggleTagSelection(tg.label)}
                        className={`px-2.5 py-1 rounded-xl text-xs font-bold transition-all flex items-center gap-1 ${
                          isSelected
                            ? 'bg-amber-600 text-white shadow-xs'
                            : 'bg-surface-container-lowest text-on-surface hover:bg-surface-container border border-surface-container-high'
                        }`}
                      >
                        <span>{tg.emoji}</span>
                        <span>{tg.label}</span>
                      </button>
                    );
                  })}
                </div>
              </div>

              <div>
                <label className="font-bold text-on-surface block mb-1">Descripción Corta</label>
                <textarea
                  rows={2}
                  value={formDesc}
                  onChange={e => setFormDesc(e.target.value)}
                  placeholder="Ingredientes, elaboración, especificaciones..."
                  className="w-full px-3 py-2 rounded-xl bg-surface border border-surface-container-high text-on-surface focus:outline-none focus:border-primary"
                />
              </div>

              <div>
                <label className="font-bold text-on-surface block mb-1">URL de la Imagen</label>
                <input
                  type="text"
                  value={formImage}
                  onChange={e => setFormImage(e.target.value)}
                  placeholder="https://images.unsplash.com/..."
                  className="w-full px-3 py-2 rounded-xl bg-surface border border-surface-container-high text-on-surface focus:outline-none focus:border-primary"
                />
              </div>

              <div className="flex justify-end gap-2 pt-2 border-t border-surface-container-high">
                <button
                  type="button"
                  onClick={() => setModalMode(null)}
                  className="px-4 py-2.5 rounded-xl text-xs font-bold text-on-surface hover:bg-surface-container"
                >
                  Cancelar
                </button>
                <button
                  type="submit"
                  className="px-5 py-2.5 rounded-xl bg-amber-600 hover:bg-amber-500 text-white text-xs font-extrabold shadow-sm active:scale-95"
                >
                  {modalMode === 'create' ? 'Crear Producto' : 'Guardar Cambios'}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

    </div>
  );
}
