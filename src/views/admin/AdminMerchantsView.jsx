import React, { useState } from 'react';
import AdminSidebar from '../../components/admin/AdminSidebar';
import { useApp } from '../../context/AppContext';
import { 
  Store, 
  Search, 
  Plus, 
  CheckCircle2, 
  XCircle, 
  Trash2, 
  MapPin, 
  Star,
  ExternalLink,
  ShieldAlert,
  Layers,
  Phone
} from 'lucide-react';

export default function AdminMerchantsView() {
  const { businesses, updateBusiness, addNewBusiness, deleteBusiness, categories, locations, plans } = useApp();
  const [searchTerm, setSearchTerm] = useState('');
  const [statusFilter, setStatusFilter] = useState('all');
  const [newBizModal, setNewBizModal] = useState(false);

  // New business form
  const [name, setName] = useState('');
  const [tagline, setTagline] = useState('');
  const [categoryId, setCategoryId] = useState('cat-1');
  const [categoryName, setCategoryName] = useState('Gastronomía');
  const [locationName, setLocationName] = useState('Río Ceballos');
  const [whatsapp, setWhatsapp] = useState('');
  const [businessMode, setBusinessMode] = useState('tienda');
  const [planId, setPlanId] = useState('plan-2');

  const filtered = businesses.filter(b => {
    if (statusFilter !== 'all' && b.status !== statusFilter) return false;
    if (searchTerm.trim()) {
      const q = searchTerm.toLowerCase();
      if (!b.name.toLowerCase().includes(q) && !b.locationName.toLowerCase().includes(q) && !b.categoryName?.toLowerCase().includes(q)) return false;
    }
    return true;
  });

  const toggleStatus = (biz) => {
    const nextStatus = biz.status === 'active' ? 'suspended' : 'active';
    updateBusiness({ ...biz, status: nextStatus });
  };

  const handleDeleteBiz = (bizId, bizName) => {
    if (window.confirm(`¿Estás seguro de que deseas eliminar permanentemente a "${bizName}" de la plataforma? Esta acción borrará su ficha y productos.`)) {
      deleteBusiness(bizId);
    }
  };

  const handleCreateBiz = (e) => {
    e.preventDefault();
    if (!name.trim() || !whatsapp.trim()) return;

    const selectedPlan = plans.find(p => p.id === planId) || plans[1];
    const selectedCat = categories.find(c => c.id === categoryId);

    const newBiz = {
      name: name.trim(),
      slug: name.toLowerCase().replace(/[^a-z0-9]+/g, '-'),
      tagline: tagline.trim() || 'Comercio adherido a Sierras Chicas Digital',
      description: tagline.trim(),
      categoryId: selectedCat ? selectedCat.id : 'cat-1',
      categoryName: selectedCat ? selectedCat.name : categoryName,
      locationName,
      whatsapp: whatsapp.trim(),
      phone: whatsapp.trim(),
      address: `Centro, ${locationName}`,
      openingHours: 'Lun a Sáb 09:00 - 20:00',
      businessMode, // 'aviso', 'tienda', 'servicios'
      logoUrl: 'https://images.unsplash.com/photo-1554118811-1e0d58224f24?w=200&auto=format&fit=crop&q=80',
      coverUrl: 'https://images.unsplash.com/photo-1501339847302-ac426a4a7cbb?w=1200&auto=format&fit=crop&q=80',
      gallery: [],
      tags: [],
      planId: selectedPlan.id,
      planName: selectedPlan.name,
      priceArs: selectedPlan.priceArs
    };

    addNewBusiness(newBiz);
    setNewBizModal(false);
    setName('');
    setTagline('');
    setWhatsapp('');
  };

  return (
    <div className="flex-1 bg-surface flex flex-col lg:flex-row min-h-screen animate-in fade-in">
      <AdminSidebar />

      <main className="flex-1 p-4 sm:p-6 lg:p-8 space-y-6 overflow-y-auto">
        
        {/* Header Bar */}
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-4 border-b border-surface-container-high">
          <div>
            <h1 className="text-xl sm:text-2xl font-extrabold text-on-surface tracking-tight">
              Gestión Integral de Comercios del Valle
            </h1>
            <p className="text-xs text-on-surface-variant mt-0.5">
              Alta, validación, suspensión, eliminación y asignación de planes comerciales
            </p>
          </div>

          <button
            type="button"
            onClick={() => setNewBizModal(true)}
            className="px-4 py-2.5 rounded-xl bg-indigo-600 hover:bg-indigo-500 text-white font-extrabold text-xs flex items-center gap-1.5 shadow-md shadow-indigo-900/20 self-start sm:self-auto active:scale-95 transition-all"
          >
            <Plus className="w-4 h-4" />
            <span>Dar de Alta Nuevo Comercio</span>
          </button>
        </div>

        {/* Filter Controls */}
        <div className="flex flex-col sm:flex-row items-center justify-between gap-3 bg-surface-container-lowest p-3 rounded-2xl border border-surface-container-high">
          <div className="flex items-center gap-2 w-full sm:w-80 bg-surface px-3 py-2 rounded-xl border border-surface-container-high">
            <Search className="w-4 h-4 text-outline shrink-0" />
            <input
              type="text"
              value={searchTerm}
              onChange={e => setSearchTerm(e.target.value)}
              placeholder="Buscar por nombre, rubro o localidad..."
              className="w-full bg-transparent text-xs text-on-surface placeholder:text-outline focus:outline-none"
            />
          </div>

          <div className="flex items-center gap-2 self-start sm:self-auto">
            <span className="text-xs font-bold text-outline uppercase tracking-wider">Estado:</span>
            <select
              value={statusFilter}
              onChange={e => setStatusFilter(e.target.value)}
              className="px-3 py-1.5 rounded-xl bg-surface border border-surface-container-high text-xs text-on-surface font-semibold focus:outline-none"
            >
              <option value="all">Todos los estados ({businesses.length})</option>
              <option value="active">Activos</option>
              <option value="suspended">Suspendidos</option>
            </select>
          </div>
        </div>

        {/* Merchants Table */}
        <div className="bg-surface-container-lowest rounded-3xl border border-surface-container-high overflow-hidden shadow-subtle">
          <div className="overflow-x-auto">
            <table className="w-full text-left text-xs text-on-surface">
              <thead className="bg-surface border-b border-surface-container-high font-extrabold uppercase tracking-wider text-outline text-[11px]">
                <tr>
                  <th className="p-4">Comercio</th>
                  <th className="p-4">Localidad</th>
                  <th className="p-4">Modalidad</th>
                  <th className="p-4">Plan Actual</th>
                  <th className="p-4">Visitas</th>
                  <th className="p-4 text-center">Estado</th>
                  <th className="p-4 text-right">Acciones</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-surface-container-high">
                {filtered.map(biz => (
                  <tr key={biz.id} className="hover:bg-surface/50 transition-colors">
                    <td className="p-4">
                      <div className="flex items-center gap-3">
                        <img
                          src={biz.logoUrl || 'https://images.unsplash.com/photo-1554118811-1e0d58224f24?w=100&auto=format&fit=crop&q=80'}
                          alt={biz.name}
                          className="w-10 h-10 rounded-xl object-cover border border-surface-container-high shrink-0"
                        />
                        <div>
                          <div className="flex items-center gap-1.5">
                            <span className="font-extrabold text-on-surface">{biz.name}</span>
                            {biz.isVerified && (
                              <CheckCircle2 className="w-3.5 h-3.5 text-emerald-600" />
                            )}
                          </div>
                          <span className="text-[11px] text-on-surface-variant block">{biz.categoryName}</span>
                        </div>
                      </div>
                    </td>

                    <td className="p-4 font-semibold text-on-surface-variant">
                      <div className="flex items-center gap-1">
                        <MapPin className="w-3.5 h-3.5 text-primary" />
                        <span>{biz.locationName}</span>
                      </div>
                    </td>

                    <td className="p-4">
                      <span className={`px-2.5 py-1 rounded-full text-[10px] font-extrabold uppercase tracking-wider ${
                        biz.businessMode === 'aviso' || biz.businessMode === 'catalogo'
                          ? 'bg-indigo-100 text-indigo-900'
                          : biz.businessMode === 'servicios'
                          ? 'bg-amber-100 text-amber-900'
                          : 'bg-teal-100 text-teal-900'
                      }`}>
                        {biz.businessMode === 'aviso' || biz.businessMode === 'catalogo'
                          ? '📢 Aviso'
                          : biz.businessMode === 'servicios'
                          ? '🔧 Servicios'
                          : '🛍️ Tienda'}
                      </span>
                    </td>

                    <td className="p-4">
                      <span className="font-bold text-on-surface block">{biz.planName || 'Comercio Básico'}</span>
                      <span className="text-[11px] text-emerald-700 font-mono font-bold">
                        ${(biz.priceArs || 9900).toLocaleString('es-AR')}/mes
                      </span>
                    </td>

                    <td className="p-4 font-mono font-bold text-on-surface-variant">
                      {biz.visitsCount || 0}
                    </td>

                    <td className="p-4 text-center">
                      <span className={`px-2.5 py-1 rounded-full text-[11px] font-bold ${
                        biz.status === 'active'
                          ? 'bg-emerald-100 text-emerald-800'
                          : 'bg-rose-100 text-rose-800'
                      }`}>
                        {biz.status === 'active' ? 'Activo' : 'Suspendido'}
                      </span>
                    </td>

                    <td className="p-4 text-right">
                      <div className="flex items-center justify-end gap-2">
                        <button
                          type="button"
                          onClick={() => toggleStatus(biz)}
                          className={`px-3 py-1.5 rounded-xl font-bold text-xs transition-colors ${
                            biz.status === 'active'
                              ? 'bg-amber-50 text-amber-800 hover:bg-amber-100'
                              : 'bg-emerald-50 text-emerald-800 hover:bg-emerald-100'
                          }`}
                        >
                          {biz.status === 'active' ? 'Suspender' : 'Activar'}
                        </button>
                        <button
                          type="button"
                          onClick={() => handleDeleteBiz(biz.id, biz.name)}
                          className="p-1.5 rounded-xl bg-rose-50 text-rose-700 hover:bg-rose-100 hover:text-rose-800 transition-colors"
                          title="Eliminar comercio definitivamente"
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
        </div>

      </main>

      {/* New Merchant Modal (SC-11) */}
      {newBizModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-inverse-surface/60 backdrop-blur-sm animate-in fade-in">
          <div className="bg-surface-container-lowest rounded-3xl shadow-modal border border-surface-container-high w-full max-w-lg p-5 sm:p-6 space-y-4 max-h-[90vh] overflow-y-auto">
            <div className="flex items-center justify-between border-b border-surface-container-high pb-3">
              <div className="flex items-center gap-2">
                <Store className="w-5 h-5 text-indigo-600" />
                <h3 className="font-extrabold text-sm sm:text-base text-on-surface">
                  Alta de Comercio en Sierras Chicas
                </h3>
              </div>
              <button onClick={() => setNewBizModal(false)} className="text-outline hover:text-on-surface">
                ✕
              </button>
            </div>

            <form onSubmit={handleCreateBiz} className="space-y-3.5 text-xs">
              <div>
                <label className="font-bold text-on-surface block mb-1">Nombre Comercial *</label>
                <input
                  type="text"
                  required
                  placeholder="Ej: Cervecería El Hongo"
                  value={name}
                  onChange={e => setName(e.target.value)}
                  className="w-full px-3 py-2 rounded-xl bg-surface border border-surface-container-high text-on-surface focus:outline-none focus:border-indigo-600"
                />
              </div>

              <div>
                <label className="font-bold text-on-surface block mb-1">Lema o Subtítulo *</label>
                <input
                  type="text"
                  required
                  placeholder="Ej: Cerveza artesanal serrana y hamburguesas"
                  value={tagline}
                  onChange={e => setTagline(e.target.value)}
                  className="w-full px-3 py-2 rounded-xl bg-surface border border-surface-container-high text-on-surface focus:outline-none focus:border-indigo-600"
                />
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                <div>
                  <label className="font-bold text-on-surface block mb-1">Rubro / Categoría *</label>
                  <select
                    value={categoryId}
                    onChange={e => {
                      setCategoryId(e.target.value);
                      const selectedCat = categories.find(c => c.id === e.target.value);
                      if (selectedCat) setCategoryName(selectedCat.name);
                    }}
                    className="w-full px-3 py-2 rounded-xl bg-surface border border-surface-container-high text-on-surface focus:outline-none"
                  >
                    {categories.map(cat => (
                      <option key={cat.id} value={cat.id}>
                        {cat.emoji} {cat.name}
                      </option>
                    ))}
                  </select>
                </div>

                <div>
                  <label className="font-bold text-on-surface block mb-1">Localidad *</label>
                  <select
                    value={locationName}
                    onChange={e => setLocationName(e.target.value)}
                    className="w-full px-3 py-2 rounded-xl bg-surface border border-surface-container-high text-on-surface focus:outline-none"
                  >
                    {locations.map(loc => (
                      <option key={loc.id} value={loc.name}>{loc.name}</option>
                    ))}
                  </select>
                </div>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                <div>
                  <label className="font-bold text-on-surface block mb-1">Modalidad del Negocio</label>
                  <select
                    value={businessMode}
                    onChange={e => setBusinessMode(e.target.value)}
                    className="w-full px-3 py-2 rounded-xl bg-surface border border-surface-container-high text-on-surface focus:outline-none"
                  >
                    <option value="tienda">🛍️ Tienda Virtual & Carrito</option>
                    <option value="servicios">🔧 Servicios & Presupuesto</option>
                    <option value="aviso">📢 Aviso Publicitario</option>
                  </select>
                </div>

                <div>
                  <label className="font-bold text-on-surface block mb-1">Plan Asignado</label>
                  <select
                    value={planId}
                    onChange={e => setPlanId(e.target.value)}
                    className="w-full px-3 py-2 rounded-xl bg-surface border border-surface-container-high text-on-surface focus:outline-none"
                  >
                    {plans.map(p => (
                      <option key={p.id} value={p.id}>{p.name} (${p.priceArs.toLocaleString('es-AR')})</option>
                    ))}
                  </select>
                </div>
              </div>

              <div>
                <label className="font-bold text-on-surface block mb-1">WhatsApp de Contacto / Pedidos *</label>
                <input
                  type="text"
                  required
                  placeholder="5493543123456"
                  value={whatsapp}
                  onChange={e => setWhatsapp(e.target.value)}
                  className="w-full px-3 py-2 rounded-xl bg-surface border border-surface-container-high text-on-surface focus:outline-none focus:border-indigo-600 font-mono"
                />
              </div>

              <div className="pt-2 flex items-center justify-end gap-2 border-t border-surface-container-high">
                <button
                  type="button"
                  onClick={() => setNewBizModal(false)}
                  className="px-4 py-2 rounded-xl text-on-surface-variant hover:bg-surface-container font-semibold"
                >
                  Cancelar
                </button>
                <button
                  type="submit"
                  className="px-5 py-2.5 rounded-xl bg-indigo-600 hover:bg-indigo-500 text-white font-extrabold shadow-md active:scale-95 transition-all"
                >
                  Confirmar Alta de Comercio
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

    </div>
  );
}
