import React, { useState } from 'react';
import AdminSidebar from '../../components/admin/AdminSidebar';
import { useApp } from '../../context/AppContext';
import { Tags, Plus, Trash2, ChevronDown, ChevronRight, Tag, Layers, CheckCircle2 } from 'lucide-react';

export default function AdminTaxonomyView() {
  const { categories, addCategory, deleteCategory, addSubcategory, deleteSubcategory } = useApp();
  const [newCatName, setNewCatName] = useState('');
  const [newEmoji, setNewEmoji] = useState('🌟');
  const [expandedCatId, setExpandedCatId] = useState(null);
  const [newSubcatName, setNewSubcatName] = useState({});

  const handleAddCategory = (e) => {
    e.preventDefault();
    if (!newCatName.trim()) return;

    addCategory({
      name: newCatName.trim(),
      emoji: newEmoji.trim() || '🌟',
      color: '#00685f',
      subcategories: []
    });
    setNewCatName('');
    setNewEmoji('🌟');
  };

  const handleDeleteCategory = (catId, catName) => {
    if (window.confirm(`¿Eliminar la categoría "${catName}" y todas sus subcategorías?`)) {
      deleteCategory(catId);
    }
  };

  const handleAddSubcategory = (catId, e) => {
    e.preventDefault();
    const val = newSubcatName[catId];
    if (!val || !val.trim()) return;

    addSubcategory(catId, val.trim());
    setNewSubcatName(prev => ({ ...prev, [catId]: '' }));
  };

  const toggleExpand = (catId) => {
    setExpandedCatId(prev => (prev === catId ? null : catId));
  };

  return (
    <div className="flex-1 bg-surface flex flex-col lg:flex-row min-h-screen animate-in fade-in">
      <AdminSidebar />

      <main className="flex-1 p-4 sm:p-6 lg:p-8 space-y-6 overflow-y-auto max-w-7xl">
        
        {/* Header Bar */}
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-4 border-b border-surface-container-high">
          <div>
            <div className="flex items-center gap-2 text-indigo-600 mb-1">
              <Layers className="w-5 h-5" />
              <span className="text-xs font-black uppercase tracking-wider">Gestión de Taxonomía Regional</span>
            </div>
            <h1 className="text-xl sm:text-2xl font-extrabold text-on-surface tracking-tight">
              Rubros, Categorías & Subcategorías
            </h1>
            <p className="text-xs text-on-surface-variant mt-0.5">
              Organiza la estructura de filtros y descubrimiento para comercios y vecinos de Sierras Chicas
            </p>
          </div>
          <div className="flex items-center gap-2">
            <span className="px-3 py-1.5 rounded-full bg-indigo-50 border border-indigo-200 text-indigo-700 text-xs font-bold">
              {categories.length} Categorías activas
            </span>
          </div>
        </div>

        {/* Add Category Card */}
        <div className="bg-surface-container-lowest p-5 rounded-3xl border border-surface-container-high shadow-subtle space-y-4">
          <div className="flex items-center gap-2">
            <span className="p-1.5 rounded-lg bg-indigo-50 text-indigo-600">
              <Plus className="w-4 h-4" />
            </span>
            <h3 className="text-xs font-extrabold text-on-surface uppercase tracking-wider">
              Agregar Nueva Categoría / Rubro Principal
            </h3>
          </div>

          <form onSubmit={handleAddCategory} className="flex flex-col sm:flex-row gap-3">
            <input
              type="text"
              placeholder="Emoji (☕, 🏕️, 🚲)"
              value={newEmoji}
              onChange={e => setNewEmoji(e.target.value)}
              className="w-full sm:w-28 px-3 py-2.5 rounded-xl bg-surface border border-surface-container-high text-sm text-center focus:outline-none focus:border-indigo-600"
            />
            <input
              type="text"
              required
              placeholder="Nombre de la categoría (Ej: Cervecerías & Bares, Mascotas & Vet)"
              value={newCatName}
              onChange={e => setNewCatName(e.target.value)}
              className="flex-1 px-3.5 py-2.5 rounded-xl bg-surface border border-surface-container-high text-xs text-on-surface focus:outline-none focus:border-indigo-600 font-medium"
            />
            <button
              type="submit"
              className="px-6 py-2.5 rounded-xl bg-indigo-600 hover:bg-indigo-500 text-white font-bold text-xs flex items-center justify-center gap-2 shadow-md shadow-indigo-900/20 transition-transform active:scale-95"
            >
              <Plus className="w-4 h-4" />
              <span>Crear Categoría</span>
            </button>
          </form>
        </div>

        {/* Categories List with Subcategories Accordion */}
        <div className="space-y-4">
          <h3 className="text-xs font-extrabold text-outline uppercase tracking-wider">
            Estructura Jerárquica Actual (Rubro ➔ Subcategorías)
          </h3>

          <div className="grid grid-cols-1 gap-3.5">
            {categories.map(cat => {
              const isExpanded = expandedCatId === cat.id;
              const subcats = cat.subcategories || [];

              return (
                <div
                  key={cat.id}
                  className={`bg-surface-container-lowest rounded-2xl border transition-all shadow-subtle ${
                    isExpanded ? 'border-indigo-500 shadow-md ring-1 ring-indigo-500/20' : 'border-surface-container-high hover:border-surface-variant'
                  }`}
                >
                  {/* Category Header */}
                  <div className="p-4 flex items-center justify-between gap-3">
                    <div 
                      onClick={() => toggleExpand(cat.id)}
                      className="flex items-center gap-3.5 cursor-pointer flex-1 select-none"
                    >
                      <span className="text-2xl p-2.5 rounded-2xl bg-surface border border-surface-container-high shadow-xs">
                        {cat.emoji || '📌'}
                      </span>
                      <div>
                        <div className="flex items-center gap-2">
                          <h4 className="text-sm font-bold text-on-surface">{cat.name}</h4>
                          <span className="text-[10px] font-bold px-2 py-0.5 rounded-full bg-surface-container-high text-on-surface-variant">
                            {subcats.length} {subcats.length === 1 ? 'subcategoría' : 'subcategorías'}
                          </span>
                        </div>
                        <span className="text-[11px] font-mono text-outline">Slug: {cat.slug || cat.id}</span>
                      </div>
                    </div>

                    <div className="flex items-center gap-2">
                      <button
                        type="button"
                        onClick={() => toggleExpand(cat.id)}
                        className="px-3 py-1.5 rounded-xl bg-surface border border-surface-container-high hover:bg-surface-container text-xs font-semibold text-on-surface flex items-center gap-1.5 transition-colors"
                      >
                        <span>Subcategorías</span>
                        {isExpanded ? <ChevronDown className="w-3.5 h-3.5 text-indigo-600" /> : <ChevronRight className="w-3.5 h-3.5 text-outline" />}
                      </button>

                      <button
                        type="button"
                        onClick={() => handleDeleteCategory(cat.id, cat.name)}
                        className="p-2 text-outline hover:text-rose-600 hover:bg-rose-50 rounded-xl transition-colors"
                        title="Eliminar categoría"
                      >
                        <Trash2 className="w-4 h-4" />
                      </button>
                    </div>
                  </div>

                  {/* Subcategories Drawer */}
                  {isExpanded && (
                    <div className="px-4 pb-4 pt-2 border-t border-surface-container-high bg-surface-container-low/50 rounded-b-2xl space-y-3 animate-in fade-in">
                      <div className="flex items-center justify-between">
                        <span className="text-[11px] font-bold text-on-surface-variant uppercase tracking-wider flex items-center gap-1.5">
                          <Tag className="w-3.5 h-3.5 text-indigo-600" />
                          Subcategorías de {cat.name}:
                        </span>
                      </div>

                      {/* Subcategories Badges */}
                      <div className="flex flex-wrap gap-2">
                        {subcats.length === 0 ? (
                          <p className="text-xs text-outline italic py-1">No hay subcategorías definidas para este rubro.</p>
                        ) : (
                          subcats.map((sub, idx) => (
                            <span
                              key={idx}
                              className="inline-flex items-center gap-1.5 pl-3 pr-1.5 py-1 rounded-xl bg-surface border border-surface-container-high text-xs font-semibold text-on-surface shadow-xs group"
                            >
                              <span>{sub}</span>
                              <button
                                type="button"
                                onClick={() => deleteSubcategory(cat.id, sub)}
                                className="p-0.5 rounded-md hover:bg-rose-100 hover:text-rose-600 text-outline transition-colors"
                                title={`Eliminar subcategoría ${sub}`}
                              >
                                <Trash2 className="w-3 h-3" />
                              </button>
                            </span>
                          ))
                        )}
                      </div>

                      {/* Add Subcategory Inline Form */}
                      <form 
                        onSubmit={(e) => handleAddSubcategory(cat.id, e)}
                        className="flex gap-2 pt-2"
                      >
                        <input
                          type="text"
                          placeholder={`Nueva subcategoría para ${cat.name} (Ej: Especialidad, Vegana, Alquiler)`}
                          value={newSubcatName[cat.id] || ''}
                          onChange={e => setNewSubcatName(prev => ({ ...prev, [cat.id]: e.target.value }))}
                          className="flex-1 px-3 py-1.5 rounded-xl bg-surface border border-surface-container-high text-xs text-on-surface focus:outline-none focus:border-indigo-600 font-medium"
                        />
                        <button
                          type="submit"
                          className="px-4 py-1.5 rounded-xl bg-indigo-600 hover:bg-indigo-500 text-white font-bold text-xs flex items-center gap-1 shadow-xs transition-colors"
                        >
                          <Plus className="w-3.5 h-3.5" />
                          <span>Agregar</span>
                        </button>
                      </form>
                    </div>
                  )}
                </div>
              );
            })}
          </div>
        </div>

      </main>
    </div>
  );
}
