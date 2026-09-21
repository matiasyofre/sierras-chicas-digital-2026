import React, { useState } from 'react';
import MerchantNav from '../../components/merchant/MerchantNav';
import { useApp } from '../../context/AppContext';
import { 
  Clock, 
  CheckCircle2, 
  AlertCircle, 
  ChefHat, 
  Bike, 
  Store, 
  Plus, 
  ArrowRight, 
  Phone, 
  MapPin, 
  ShoppingBag,
  DollarSign
} from 'lucide-react';

export default function PosKanbanView() {
  const { orders, updateOrderStatus, addOrder } = useApp();

  const [activeTab, setActiveTab] = useState('all'); // 'all', 'pending', 'preparing', 'ready', 'delivered'
  const [manualModalOpen, setManualModalOpen] = useState(false);
  const [selectedOrderDetails, setSelectedOrderDetails] = useState(null);

  // Manual order form
  const [custName, setCustName] = useState('');
  const [custAddress, setCustAddress] = useState('Mesa 1 (Salón)');
  const [custItems, setCustItems] = useState('2x Flat White, 1x Croissant');
  const [custTotal, setCustTotal] = useState('10300');
  const [delMethod, setDelMethod] = useState('dine_in');

  const handleCreateManualOrder = (e) => {
    e.preventDefault();
    if (!custName.trim() || !custTotal) return;

    addOrder({
      businessId: 'biz-1',
      customerName: custName,
      customerPhone: '+5493543112233',
      customerAddress: custAddress,
      customerNotes: 'Pedido cargado desde mostrador POS',
      deliveryMethod: delMethod,
      paymentMethod: 'Efectivo',
      items: [{ name: custItems, qty: 1, price: parseFloat(custTotal) || 0 }],
      subtotal: parseFloat(custTotal) || 0,
      deliveryFee: 0,
      total: parseFloat(custTotal) || 0
    });

    setManualModalOpen(false);
    setCustName('');
    setCustTotal('');
  };

  const notifyCustomerWhatsApp = (ord) => {
    const cleanPhone = (ord.customerPhone || '5493543123456').replace(/[^0-9]/g, '');
    const msg = `¡Hola *${ord.customerName}*! Tu pedido *${ord.orderNumber || '#PED-' + ord.id.slice(-4)}* en *Sierras Chicas Digital* ya está *LISTO* para retirar / enviar. 🛵 ¡Muchas gracias!`;
    window.open(`https://wa.me/${cleanPhone}?text=${encodeURIComponent(msg)}`, '_blank');
  };

  const columns = [
    { id: 'pending', title: 'Pendientes / Nuevos', color: 'bg-amber-500 text-amber-950', border: 'border-amber-400', icon: Clock },
    { id: 'preparing', title: 'En Preparación', color: 'bg-indigo-600 text-white', border: 'border-indigo-400', icon: ChefHat },
    { id: 'ready', title: 'Listos para Entrega / Retiro', color: 'bg-teal-600 text-white', border: 'border-teal-400', icon: Bike },
    { id: 'delivered', title: 'Entregados / Completados', color: 'bg-emerald-700 text-white', border: 'border-emerald-500', icon: CheckCircle2 }
  ];

  return (
    <div className="flex-1 bg-surface pb-20 md:pb-12 animate-in fade-in">
      <MerchantNav />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-6 space-y-6">
        
        {/* Header Bar */}
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 bg-surface-container-lowest p-5 rounded-3xl border border-surface-container-high shadow-subtle sticky top-20 z-20 bg-surface-container-lowest/95 backdrop-blur-md">
          <div>
            <div className="flex items-center gap-2">
              <span className="w-2.5 h-2.5 rounded-full bg-emerald-500 animate-ping"></span>
              <h1 className="text-lg sm:text-xl font-extrabold text-on-surface">
                POS Mostrador & Comandas en Vivo
              </h1>
            </div>
            <p className="text-xs text-on-surface-variant mt-1">
              Tablero unificado para preparación, mostrador y envíos. Arrastrá o tocá para avanzar el estado del pedido.
            </p>
          </div>

          <div className="flex items-center gap-2">
            <button
              type="button"
              onClick={() => setManualModalOpen(true)}
              className="px-4 py-2.5 rounded-xl bg-amber-500 hover:bg-amber-400 text-amber-950 font-extrabold text-xs flex items-center gap-1.5 shadow-sm transition-all active:scale-95"
            >
              <Plus className="w-4 h-4" />
              <span>Cargar Comanda Manual</span>
            </button>
          </div>
        </div>

        {/* Mobile Filter Tabs */}
        <div className="lg:hidden flex items-center gap-1.5 overflow-x-auto no-scrollbar pb-1">
          <button
            type="button"
            onClick={() => setActiveTab('all')}
            className={`px-3 py-1.5 rounded-xl text-xs font-bold shrink-0 ${
              activeTab === 'all' ? 'bg-amber-500 text-amber-950' : 'bg-surface-container-lowest text-on-surface-variant'
            }`}
          >
            Todas las Columnas
          </button>
          {columns.map(col => {
            const count = orders.filter(o => o.status === col.id).length;
            return (
              <button
                key={col.id}
                type="button"
                onClick={() => setActiveTab(col.id)}
                className={`px-3 py-1.5 rounded-xl text-xs font-bold shrink-0 flex items-center gap-1 ${
                  activeTab === col.id ? 'bg-amber-500 text-amber-950' : 'bg-surface-container-lowest text-on-surface-variant'
                }`}
              >
                <span>{col.title.split('/')[0]}</span>
                <span className="px-1.5 py-0.2 rounded-full bg-surface-container text-[10px]">{count}</span>
              </button>
            );
          })}
        </div>

        {/* 4-Column Kanban Board */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-5">
          {columns.map(col => {
            const colOrders = orders.filter(o => o.status === col.id);
            const Icon = col.icon;
            const isHiddenMobile = activeTab !== 'all' && activeTab !== col.id;

            return (
              <div
                key={col.id}
                className={`bg-surface-container-low/60 rounded-3xl p-4 flex flex-col space-y-3 border border-surface-container-high ${
                  isHiddenMobile ? 'hidden lg:flex' : 'flex'
                }`}
              >
                {/* Column Header */}
                <div className="flex items-center justify-between p-2 rounded-2xl bg-surface-container-lowest border border-surface-container-high">
                  <div className="flex items-center gap-2">
                    <div className={`p-1.5 rounded-lg ${col.color}`}>
                      <Icon className="w-3.5 h-3.5" />
                    </div>
                    <span className="text-xs font-extrabold text-on-surface truncate">
                      {col.title}
                    </span>
                  </div>
                  <span className="px-2 py-0.5 rounded-full bg-surface-container text-xs font-mono font-bold text-on-surface">
                    {colOrders.length}
                  </span>
                </div>

                {/* Orders in column */}
                <div className="space-y-3 flex-1 overflow-y-auto max-h-[70vh] pr-1">
                  {colOrders.length === 0 ? (
                    <div className="py-12 text-center text-xs text-outline font-medium border-2 border-dashed border-surface-container-high rounded-2xl">
                      Sin comandas en esta etapa
                    </div>
                  ) : (
                    colOrders.map(ord => (
                      <div
                        key={ord.id}
                        className="bg-surface-container-lowest p-4 rounded-2xl border border-surface-container-high shadow-subtle hover:shadow-card transition-all space-y-3"
                      >
                        {/* Order Header */}
                        <div className="flex items-center justify-between">
                          <span className="text-xs font-mono font-extrabold text-primary bg-primary-fixed/50 px-2 py-0.5 rounded-md">
                            {ord.orderNumber}
                          </span>
                          <span className="text-[11px] text-outline flex items-center gap-1 font-semibold">
                            <Clock className="w-3 h-3" />
                            <span>{ord.timeAgo}</span>
                          </span>
                        </div>

                        {/* Customer & Delivery */}
                        <div>
                          <h4 className="text-xs font-bold text-on-surface">{ord.customerName}</h4>
                          <div className="flex items-center gap-1 text-[11px] text-on-surface-variant mt-0.5">
                            {ord.deliveryMethod === 'delivery' ? (
                              <Bike className="w-3.5 h-3.5 text-teal-600 shrink-0" />
                            ) : ord.deliveryMethod === 'dine_in' ? (
                              <Store className="w-3.5 h-3.5 text-amber-600 shrink-0" />
                            ) : (
                              <ShoppingBag className="w-3.5 h-3.5 text-indigo-600 shrink-0" />
                            )}
                            <span className="truncate">{ord.customerAddress}</span>
                          </div>
                        </div>

                        {/* Items Preview */}
                        <div className="p-2 rounded-xl bg-surface text-xs space-y-1">
                          {ord.items.map((it, idx) => (
                            <div key={idx} className="flex justify-between text-on-surface-variant">
                              <span className="font-semibold">{it.qty}x {it.name}</span>
                              <span>${(it.price * it.qty).toLocaleString('es-AR')}</span>
                            </div>
                          ))}
                          <div className="pt-1.5 border-t border-surface-container-high flex justify-between font-extrabold text-on-surface">
                            <span>Total</span>
                            <span className="text-primary">${ord.total.toLocaleString('es-AR')}</span>
                          </div>
                        </div>

                        {/* Actions to Advance Kanban */}
                        <div className="pt-1 space-y-2">
                          {col.id === 'pending' && (
                            <button
                              type="button"
                              onClick={() => updateOrderStatus(ord.id, 'preparing')}
                              className="w-full py-2 rounded-xl bg-indigo-600 hover:bg-indigo-500 text-white font-bold text-xs flex items-center justify-center gap-1 shadow-xs transition-all"
                            >
                              <ChefHat className="w-3.5 h-3.5" />
                              <span>Pasar a Preparación</span>
                            </button>
                          )}

                          {col.id === 'preparing' && (
                            <button
                              type="button"
                              onClick={() => updateOrderStatus(ord.id, 'ready')}
                              className="w-full py-2 rounded-xl bg-teal-600 hover:bg-teal-500 text-white font-bold text-xs flex items-center justify-center gap-1 shadow-xs transition-all"
                            >
                              <Bike className="w-3.5 h-3.5" />
                              <span>Listo para Despacho / Retiro</span>
                            </button>
                          )}

                          {col.id === 'ready' && (
                            <div className="space-y-1.5">
                              <button
                                type="button"
                                onClick={() => notifyCustomerWhatsApp(ord)}
                                className="w-full py-1.5 rounded-xl bg-emerald-50 hover:bg-emerald-100 text-emerald-800 border border-emerald-300 font-bold text-xs flex items-center justify-center gap-1 transition-all"
                                title="Avisar al cliente por WhatsApp"
                              >
                                <Phone className="w-3.5 h-3.5 text-emerald-600" />
                                <span>Avisar WhatsApp ({ord.orderNumber})</span>
                              </button>
                              <button
                                type="button"
                                onClick={() => updateOrderStatus(ord.id, 'delivered')}
                                className="w-full py-2 rounded-xl bg-emerald-600 hover:bg-emerald-500 text-white font-bold text-xs flex items-center justify-center gap-1 shadow-xs transition-all"
                              >
                                <CheckCircle2 className="w-3.5 h-3.5" />
                                <span>Marcar Entregado</span>
                              </button>
                            </div>
                          )}

                          {col.id === 'delivered' && (
                            <div className="space-y-1.5">
                              <div className="w-full text-center py-1 text-[11px] font-bold text-emerald-700 bg-emerald-50 rounded-lg border border-emerald-200">
                                ✓ Entregado con éxito
                              </div>
                              <button
                                type="button"
                                onClick={() => notifyCustomerWhatsApp(ord)}
                                className="w-full py-1 rounded-lg text-[10px] text-on-surface-variant hover:text-emerald-700 flex items-center justify-center gap-1"
                              >
                                <span>Reenviar ticket WhatsApp</span>
                              </button>
                            </div>
                          )}
                        </div>

                      </div>
                    ))
                  )}
                </div>

              </div>
            );
          })}
        </div>

      </div>

      {/* Manual Order Modal */}
      {manualModalOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-inverse-surface/60 backdrop-blur-sm animate-in fade-in">
          <div className="bg-surface-container-lowest rounded-3xl shadow-modal border border-surface-container-high w-full max-w-md p-5 sm:p-6 space-y-4">
            <div className="flex items-center justify-between border-b border-surface-container-high pb-3">
              <h3 className="font-extrabold text-sm sm:text-base text-on-surface">
                Cargar Comanda Manual de Mostrador
              </h3>
              <button onClick={() => setManualModalOpen(false)} className="text-outline hover:text-on-surface">
                ✕
              </button>
            </div>

            <form onSubmit={handleCreateManualOrder} className="space-y-3 text-xs">
              <div>
                <label className="font-bold text-on-surface block mb-1">Nombre / Identificador de Mesa *</label>
                <input
                  type="text"
                  required
                  placeholder="Ej: Mesa 6 o Juan Pérez"
                  value={custName}
                  onChange={e => setCustName(e.target.value)}
                  className="w-full px-3 py-2 rounded-xl bg-surface border border-surface-container-high text-on-surface focus:outline-none focus:border-primary"
                />
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="font-bold text-on-surface block mb-1">Tipo de Atención</label>
                  <select
                    value={delMethod}
                    onChange={e => setDelMethod(e.target.value)}
                    className="w-full px-3 py-2 rounded-xl bg-surface border border-surface-container-high text-on-surface focus:outline-none focus:border-primary"
                  >
                    <option value="dine_in">Salón / Mesa</option>
                    <option value="takeaway">Take Away / Mostrador</option>
                    <option value="delivery">Delivery Telefónico</option>
                  </select>
                </div>

                <div>
                  <label className="font-bold text-on-surface block mb-1">Total ($ ARS) *</label>
                  <input
                    type="number"
                    required
                    placeholder="8500"
                    value={custTotal}
                    onChange={e => setCustTotal(e.target.value)}
                    className="w-full px-3 py-2 rounded-xl bg-surface border border-surface-container-high text-on-surface focus:outline-none focus:border-primary"
                  />
                </div>
              </div>

              <div>
                <label className="font-bold text-on-surface block mb-1">Detalle de Ítems / Platos *</label>
                <textarea
                  rows={2}
                  required
                  placeholder="Ej: 2x Flat White, 1x Tostón Avocado..."
                  value={custItems}
                  onChange={e => setCustItems(e.target.value)}
                  className="w-full px-3 py-2 rounded-xl bg-surface border border-surface-container-high text-on-surface focus:outline-none focus:border-primary"
                />
              </div>

              <div className="pt-2 flex items-center justify-end gap-2">
                <button
                  type="button"
                  onClick={() => setManualModalOpen(false)}
                  className="px-4 py-2 rounded-xl text-on-surface-variant hover:bg-surface-container font-semibold"
                >
                  Cancelar
                </button>
                <button
                  type="submit"
                  className="px-5 py-2.5 rounded-xl bg-amber-600 hover:bg-amber-500 text-white font-extrabold shadow-md"
                >
                  Ingresar a Cocina
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

    </div>
  );
}
