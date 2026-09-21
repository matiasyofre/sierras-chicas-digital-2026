import React, { useState } from 'react';
import AdminSidebar from '../../components/admin/AdminSidebar';
import { useApp } from '../../context/AppContext';
import { Tags, Plus, Trash2, Edit2, CheckCircle2, ArrowRight } from 'lucide-react';

export default function AdminTaxonomyView() {
  const { categories } = useApp();
  const [catList, setCatList] = useState(categories);
  const [newCatName, setNewCatName] = useState('');
  const [newEmoji, setNewEmoji] = useState('🌟');

  const handleAddCategory = (e) => {
    e.preventDefault();
    if (!newCatName.trim()) return;

    const newCat = {
      id: 'cat-' + Date.now(),
      name: newCatName,
      slug: newCatName.toLowerCase().replace(/[^a-z0-9]+/g, '-'),
      emoji: newEmoji,
      color: '#00685f'
    };

    setCatList(prev => [...prev, newCat]);
    setNewCatName('');
  };

  const handleDelete = (id) => {
    if (window.confirm('¿Eliminar esta categoría?')) {
      setCatList(prev => prev.filter(c => c.id !== id));
    }
  };

  return (
    <div className="flex-1 bg-surface flex flex-col lg:flex-row min-h-screen animate-in fade-in">
      <AdminSidebar />

      <main className="flex-1 p-4 sm:p-6 lg:p-8 space-y-6 overflow-y-auto">
        
        {/* Header Bar */}
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-4 border-b border-surface-container-high">
          <div>
            <h1 className="text-xl sm:text-2xl font-extrabold text-on-surface tracking-tight">
              Taxonomía: Categorías & Rubros Comerciales
            </h1>
            <p className="text-xs text-on-surface-variant mt-0.5">
              Administración de la estructura de búsqueda y clasificación regional
            </p>
          </div>
        </div>

        {/* Add Category Card */}
        <div className="bg-surface-container-lowest p-5 rounded-3xl border border-surface-container-high shadow-subtle space-y-4">
          <h3 className="text-xs font-extrabold text-on-surface uppercase tracking-wider">
            Agregar Nuevo Rubro / Categoría
          </h3>

          <form onSubmit={handleAddCategory} className="flex flex-col sm:flex-row gap-3">
            <input
              type="text"
              placeholder="Emoji (Ej: ☕, 🏕️, 🚲)"
              value={newEmoji}
              onChange={e => setNewEmoji(e.target.value)}
              className="w-20 px-3 py-2 rounded-xl bg-surface border border-surface-container-high text-sm text-center focus:outline-none"
            />
            <input
              type="text"
              required
              placeholder="Nombre de la categoría (Ej: Cervecerías & Bares)"
              value={newCatName}
              onChange={e => setNewCatName(e.target.value)}
              className="flex-1 px-3.5 py-2 rounded-xl bg-surface border border-surface-container-high text-xs text-on-surface focus:outline-none focus:border-indigo-600"
            />
            <button
              type="submit"
              className="px-5 py-2.5 rounded-xl bg-indigo-600 hover:bg-indigo-500 text-white font-bold text-xs flex items-center justify-center gap-1.5 shadow-md shadow-indigo-900/20"
            >
              <Plus className="w-4 h-4" />
              <span>Crear Rubro</span>
            </button>
          </form>
        </div>

        {/* Categories Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
          {catList.map(cat => (
            <div
              key={cat.id}
              className="bg-surface-container-lowest p-4 rounded-2xl border border-surface-container-high flex items-center justify-between shadow-subtle hover:border-indigo-400 transition-colors"
            >
              <div className="flex items-center gap-3">
                <span className="text-2xl p-2 rounded-xl bg-surface">{cat.emoji}</span>
                <div>
                  <h4 className="text-xs font-bold text-on-surface">{cat.name}</h4>
                  <span className="text-[10px] font-mono text-outline">{cat.slug}</span>
                </div>
              </div>

              <button
                type="button"
                onClick={() => handleDelete(cat.id)}
                className="p-1.5 text-outline hover:text-rose-600 hover:bg-rose-50 rounded-lg transition-colors"
              >
                <Trash2 className="w-4 h-4" />
              </button>
            </div>
          ))}
        </div>

      </main>
    </div>
  );
}
