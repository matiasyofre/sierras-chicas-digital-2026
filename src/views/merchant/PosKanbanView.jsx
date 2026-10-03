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
  DollarSign,
  Link as LinkIcon,
  ExternalLink,
  Edit3,
  Check,
  CreditCard,
  Wallet,
  Send,
  RefreshCw,
  X,
  MessageCircle,
  HelpCircle
} from 'lucide-react';

export default function PosKanbanView() {
  const { orders, updateOrderStatus, updateOrder, generateOrderPaymentLink, addOrder } = useApp();

  const [activeTab, setActiveTab] = useState('all'); // 'all', 'pending', 'preparing', 'ready', 'delivered'
  const [manualModalOpen, setManualModalOpen] = useState(false);
  const [selectedOrderId, setSelectedOrderId] = useState(null);

  // Manual order form
  const [custName, setCustName] = useState('');
  const [custAddress, setCustAddress] = useState('Retira por local');
  const [custItems, setCustItems] = useState('2x Café con leche, 2x Medialunas');
  const [custSubtotal, setCustSubtotal] = useState('8000');
  const [custDeliveryFee, setCustDeliveryFee] = useState('0');
  const [delMethod, setDelMethod] = useState('takeaway');
  const [manualPayMethod, setManualPayMethod] = useState('Efectivo');

  // Selected order for detail modal
  const selectedOrder = orders.find(o => o.id === selectedOrderId) || null;

  const handleCreateManualOrder = (e) => {
    e.preventDefault();
    if (!custName.trim() || !custSubtotal) return;

    const sub = parseFloat(custSubtotal) || 0;
    const fee = parseFloat(custDeliveryFee) || 0;

    addOrder({
      businessId: 'biz-1',
      customerName: custName,
      customerPhone: '+5493543112233',
      customerAddress: custAddress,
      customerNotes: 'Pedido cargado desde mostrador POS',
      deliveryMethod: delMethod,
      paymentMethod: manualPayMethod,
      paymentStatus: manualPayMethod === 'Efectivo' ? 'cash_on_delivery' : 'pending',
      paymentLink: null,
      items: [{ name: custItems, qty: 1, price: sub }],
      subtotal: sub,
      deliveryFee: fee,
      total: sub + fee
    });

    setManualModalOpen(false);
    setCustName('');
    setCustSubtotal('');
    setCustDeliveryFee('0');
  };

  const notifyCustomerWhatsApp = (ord, customType = 'ready') => {
    const cleanPhone = (ord.customerPhone || '5493543123456').replace(/[^0-9]/g, '');
    let msg = '';
    
    if (customType === 'ready') {
      if (ord.deliveryMethod === 'delivery') {
        msg = `¡Hola *${ord.customerName}*! Tu pedido *${ord.orderNumber}* de *Sierras Chicas Digital* ya está *EN CAMINO* con la moto 🛵. Total a abonar: $${ord.total.toLocaleString('es-AR')}. ¡Muchas gracias!`;
      } else {
        msg = `¡Hola *${ord.customerName}*! Tu pedido *${ord.orderNumber}* de *Sierras Chicas Digital* ya está *LISTO para retirar* en el local 🛍️. ¡Te esperamos!`;
      }
    } else if (customType === 'preparing') {
      msg = `¡Hola *${ord.customerName}*! Confirmamos tu pedido *${ord.orderNumber}*. Ya lo estamos preparando / empaquetando 📦. Te avisaremos cuando salga.`;
    }

    window.open(`https://wa.me/${cleanPhone}?text=${encodeURIComponent(msg)}`, '_blank');
  };

  const sendPaymentLinkWhatsApp = (ord) => {
    const cleanPhone = (ord.customerPhone || '5493543123456').replace(/[^0-9]/g, '');
    const link = ord.paymentLink || generateOrderPaymentLink(ord.id);
    const msg = `¡Hola *${ord.customerName}*! Confirmamos tu pedido *${ord.orderNumber}* en *Sierras Chicas Digital*.\n\n` +
      `▪️ Subtotal productos: $${ord.subtotal.toLocaleString('es-AR')}\n` +
      `▪️ Envío acordado: $${ord.deliveryFee.toLocaleString('es-AR')}\n` +
      `*TOTAL FINAL:* $${ord.total.toLocaleString('es-AR')}\n\n` +
      `💳 Podés abonarlo con tarjeta o dinero en cuenta en este link seguro de Mercado Pago:\n` +
      `${link}\n\n` +
      `_Apenas se acredite el pago comenzamos a empaquetarlo / despacharlo._`;

    window.open(`https://wa.me/${cleanPhone}?text=${encodeURIComponent(msg)}`, '_blank');
  };

  const columns = [
    { 
      id: 'pending', 
      title: 'Pendientes / Nuevos', 
      subtitle: 'Por acordar flete o cobrar',
      color: 'bg-amber-500 text-amber-950', 
      border: 'border-amber-400', 
      icon: Clock 
    },
    { 
      id: 'preparing', 
      title: 'En Preparación', 
      subtitle: 'Empaquetado o cocina',
      color: 'bg-indigo-600 text-white', 
      border: 'border-indigo-400', 
      icon: ChefHat 
    },
    { 
      id: 'ready', 
      title: 'Listos / En Camino', 
      subtitle: 'Por despachar o retirar',
      color: 'bg-teal-600 text-white', 
      border: 'border-teal-400', 
      icon: Bike 
    },
    { 
      id: 'delivered', 
      title: 'Entregados', 
      subtitle: 'Completados con éxito',
      color: 'bg-emerald-700 text-white', 
      border: 'border-emerald-500', 
      icon: CheckCircle2 
    }
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
                Centro de Pedidos & Mostrador
              </h1>
            </div>
            <p className="text-xs text-on-surface-variant mt-1">
              Gestioná fletes acordados por WhatsApp, cobros en efectivo o links de pago, y avanzá el estado de cada comanda.
            </p>
          </div>

          <div className="flex items-center gap-2">
            <button
              type="button"
              onClick={() => setManualModalOpen(true)}
              className="px-4 py-2.5 rounded-xl bg-amber-500 hover:bg-amber-400 text-amber-950 font-extrabold text-xs flex items-center gap-1.5 shadow-sm transition-all active:scale-95"
            >
              <Plus className="w-4 h-4" />
              <span>Cargar Pedido Manual</span>
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
                <div className="flex items-center justify-between p-2.5 rounded-2xl bg-surface-container-lowest border border-surface-container-high">
                  <div className="flex items-center gap-2">
                    <div className={`p-1.5 rounded-lg ${col.color}`}>
                      <Icon className="w-3.5 h-3.5" />
                    </div>
                    <div>
                      <span className="text-xs font-extrabold text-on-surface block leading-tight">
                        {col.title}
                      </span>
                      <span className="text-[10px] text-on-surface-variant block">
                        {col.subtitle}
                      </span>
                    </div>
                  </div>
                  <span className="px-2 py-0.5 rounded-full bg-surface-container text-xs font-mono font-bold text-on-surface">
                    {colOrders.length}
                  </span>
                </div>

                {/* Orders in column */}
                <div className="space-y-3 flex-1 overflow-y-auto max-h-[72vh] pr-1">
                  {colOrders.length === 0 ? (
                    <div className="py-12 text-center text-xs text-outline font-medium border-2 border-dashed border-surface-container-high rounded-2xl">
                      Sin pedidos en esta etapa
                    </div>
                  ) : (
                    colOrders.map(ord => {
                      const isPaid = ord.paymentStatus === 'paid' || ord.paymentStatus === 'transfer_verified';
                      const isCash = ord.paymentStatus === 'cash_on_delivery' || ord.paymentMethod === 'Efectivo';
                      const isLinkSent = ord.paymentStatus === 'link_sent';

                      return (
                        <div
                          key={ord.id}
                          className="bg-surface-container-lowest p-4 rounded-2xl border border-surface-container-high shadow-subtle hover:shadow-card transition-all space-y-3 relative group"
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

                          {/* Customer & Location */}
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

                          {/* Payment & Delivery Fee Badges */}
                          <div className="flex flex-wrap gap-1.5 pt-0.5">
                            {/* Payment Badge */}
                            {isPaid ? (
                              <span className="px-2 py-0.5 rounded-full bg-emerald-50 text-emerald-700 border border-emerald-200 text-[10px] font-bold flex items-center gap-1">
                                <CheckCircle2 className="w-3 h-3" />
                                <span>Pagado</span>
                              </span>
                            ) : isCash ? (
                              <span className="px-2 py-0.5 rounded-full bg-amber-50 text-amber-800 border border-amber-200 text-[10px] font-bold flex items-center gap-1">
                                <Wallet className="w-3 h-3 text-amber-600" />
                                <span>Cobrar Efectivo: ${ord.total.toLocaleString('es-AR')}</span>
                              </span>
                            ) : isLinkSent ? (
                              <span className="px-2 py-0.5 rounded-full bg-indigo-50 text-indigo-700 border border-indigo-200 text-[10px] font-bold flex items-center gap-1">
                                <LinkIcon className="w-3 h-3" />
                                <span>Link Enviado</span>
                              </span>
                            ) : (
                              <span className="px-2 py-0.5 rounded-full bg-slate-100 text-slate-700 border border-slate-200 text-[10px] font-semibold flex items-center gap-1">
                                <span>Pendiente Cobro</span>
                              </span>
                            )}

                            {/* Delivery Fee Badge */}
                            {ord.deliveryMethod === 'delivery' && (
                              <span className="px-2 py-0.5 rounded-full bg-teal-50 text-teal-800 border border-teal-200 text-[10px] font-semibold">
                                {ord.deliveryFee > 0 ? `Envío: $${ord.deliveryFee.toLocaleString('es-AR')}` : 'Envío por acordar'}
                              </span>
                            )}
                          </div>

                          {/* Items Preview */}
                          <div className="p-2 rounded-xl bg-surface text-xs space-y-1">
                            {ord.items.map((it, idx) => (
                              <div key={idx} className="flex justify-between text-on-surface-variant text-[11px]">
                                <span className="font-semibold truncate max-w-[140px]">{it.qty}x {it.name}</span>
                                <span>${(it.price * it.qty).toLocaleString('es-AR')}</span>
                              </div>
                            ))}
                            <div className="pt-1.5 border-t border-surface-container-high flex justify-between font-extrabold text-on-surface text-xs">
                              <span>Total ({ord.deliveryFee > 0 ? 'c/envío' : 's/envío'})</span>
                              <span className="text-primary font-mono">${ord.total.toLocaleString('es-AR')}</span>
                            </div>
                          </div>

                          {/* Open Details & Action Button */}
                          <div className="pt-1 space-y-2">
                            <button
                              type="button"
                              onClick={() => setSelectedOrderId(ord.id)}
                              className="w-full py-1.5 rounded-xl bg-surface-container-low hover:bg-surface-container border border-surface-container-high text-on-surface text-xs font-bold flex items-center justify-center gap-1 transition-all"
                            >
                              <Edit3 className="w-3.5 h-3.5 text-primary" />
                              <span>Gestionar Cobro & Envío</span>
                            </button>

                            {/* Advance & Rollback Kanban Column Buttons */}
                            {col.id === 'pending' && (
                              <button
                                type="button"
                                onClick={() => updateOrderStatus(ord.id, 'preparing')}
                                className="w-full py-2 rounded-xl bg-indigo-600 hover:bg-indigo-500 text-white font-bold text-xs flex items-center justify-center gap-1 shadow-xs transition-all"
                              >
                                <ChefHat className="w-3.5 h-3.5" />
                                <span>Pasar a Preparación / Empaque →</span>
                              </button>
                            )}

                            {col.id === 'preparing' && (
                              <div className="space-y-1.5">
                                <button
                                  type="button"
                                  onClick={() => updateOrderStatus(ord.id, 'ready')}
                                  className="w-full py-2 rounded-xl bg-teal-600 hover:bg-teal-500 text-white font-bold text-xs flex items-center justify-center gap-1 shadow-xs transition-all"
                                >
                                  <Bike className="w-3.5 h-3.5" />
                                  <span>Listo para Despacho / Retiro →</span>
                                </button>
                                <button
                                  type="button"
                                  onClick={() => updateOrderStatus(ord.id, 'pending')}
                                  className="w-full py-1.5 rounded-xl bg-surface hover:bg-surface-container border border-surface-container-high text-outline hover:text-amber-800 text-[11px] font-bold flex items-center justify-center gap-1 transition-colors"
                                  title="Volver a Pendiente si no está pagado o hubo un error"
                                >
                                  <span>← Volver a Pendiente</span>
                                </button>
                              </div>
                            )}

                            {col.id === 'ready' && (
                              <div className="space-y-1.5">
                                <button
                                  type="button"
                                  onClick={() => notifyCustomerWhatsApp(ord, 'ready')}
                                  className="w-full py-1.5 rounded-xl bg-emerald-50 hover:bg-emerald-100 text-emerald-800 border border-emerald-300 font-bold text-xs flex items-center justify-center gap-1 transition-all"
                                  title="Avisar al cliente por WhatsApp"
                                >
                                  <Phone className="w-3.5 h-3.5 text-emerald-600" />
                                  <span>Avisar al Cliente (WhatsApp)</span>
                                </button>
                                <button
                                  type="button"
                                  onClick={() => updateOrderStatus(ord.id, 'delivered')}
                                  className="w-full py-2 rounded-xl bg-emerald-600 hover:bg-emerald-500 text-white font-bold text-xs flex items-center justify-center gap-1 shadow-xs transition-all"
                                >
                                  <CheckCircle2 className="w-3.5 h-3.5" />
                                  <span>Marcar Entregado ✓</span>
                                </button>
                                <button
                                  type="button"
                                  onClick={() => updateOrderStatus(ord.id, 'preparing')}
                                  className="w-full py-1 rounded-xl bg-surface hover:bg-surface-container border border-surface-container-high text-outline hover:text-indigo-800 text-[11px] font-bold flex items-center justify-center gap-1 transition-colors"
                                  title="Volver a etapa de preparación"
                                >
                                  <span>← Volver a Preparación</span>
                                </button>
                              </div>
                            )}

                            {col.id === 'delivered' && (
                              <div className="space-y-1.5">
                                <div className="w-full text-center py-1 text-[11px] font-bold text-emerald-700 bg-emerald-50 rounded-lg border border-emerald-200">
                                  ✓ Pedido Completado
                                </div>
                                <button
                                  type="button"
                                  onClick={() => updateOrderStatus(ord.id, 'ready')}
                                  className="w-full py-1 rounded-xl bg-surface hover:bg-surface-container border border-surface-container-high text-outline hover:text-rose-700 text-[11px] font-bold flex items-center justify-center gap-1 transition-colors"
                                  title="Reabrir pedido si se marcó entregado por error"
                                >
                                  <span>← Reabrir / Volver a Listo</span>
                                </button>
                              </div>
                            )}
                          </div>


                        </div>
                      );
                    })
                  )}
                </div>

              </div>
            );
          })}
        </div>

      </div>

      {/* Interactive Order Details & Payment Reconciliation Modal */}
      {selectedOrder && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-inverse-surface/60 backdrop-blur-sm animate-in fade-in overflow-y-auto">
          <div className="bg-surface-container-lowest rounded-3xl shadow-modal border border-surface-container-high w-full max-w-xl p-5 sm:p-6 space-y-5 my-8">
            
            {/* Modal Header */}
            <div className="flex items-center justify-between border-b border-surface-container-high pb-4">
              <div className="flex items-center gap-2.5">
                <span className="font-mono text-sm font-extrabold px-2.5 py-1 rounded-lg bg-primary-fixed text-on-primary-fixed">
                  {selectedOrder.orderNumber}
                </span>
                <div>
                  <h3 className="font-extrabold text-base text-on-surface">
                    {selectedOrder.customerName}
                  </h3>
                  <p className="text-xs text-on-surface-variant flex items-center gap-1">
                    <Clock className="w-3 h-3 text-outline" />
                    <span>{selectedOrder.timeAgo}</span>
                  </p>
                </div>
              </div>

              <button 
                type="button"
                onClick={() => setSelectedOrderId(null)} 
                className="p-1.5 rounded-xl hover:bg-surface-container text-outline hover:text-on-surface transition-colors"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            {/* Delivery Info & Quick WhatsApp Contact */}
            <div className="bg-surface-container-low p-3.5 rounded-2xl flex flex-col sm:flex-row sm:items-center justify-between gap-3 text-xs">
              <div className="space-y-1">
                <div className="flex items-center gap-1.5 font-bold text-on-surface">
                  <MapPin className="w-4 h-4 text-primary shrink-0" />
                  <span>{selectedOrder.customerAddress || 'Retiro en local'}</span>
                </div>
                {selectedOrder.customerNotes && (
                  <p className="text-[11px] text-on-surface-variant italic pl-5.5">
                    "{selectedOrder.customerNotes}"
                  </p>
                )}
              </div>

              <button
                type="button"
                onClick={() => {
                  const cleanPhone = (selectedOrder.customerPhone || '5493543123456').replace(/[^0-9]/g, '');
                  window.open(`https://wa.me/${cleanPhone}`, '_blank');
                }}
                className="px-3 py-1.5 rounded-xl bg-emerald-600 hover:bg-emerald-500 text-white font-bold flex items-center gap-1.5 shrink-0 self-start sm:self-auto shadow-xs"
              >
                <MessageCircle className="w-3.5 h-3.5" />
                <span>Abrir Chat WhatsApp</span>
              </button>
            </div>

            {/* Items Summary */}
            <div className="space-y-2">
              <h4 className="font-bold text-xs text-on-surface uppercase tracking-wider">
                Productos del Pedido
              </h4>
              <div className="border border-surface-container-high rounded-2xl overflow-hidden divide-y divide-surface-container-high text-xs">
                {selectedOrder.items.map((it, idx) => (
                  <div key={idx} className="p-3 flex items-center justify-between bg-surface-container-lowest">
                    <span className="font-semibold text-on-surface">
                      <span className="text-primary font-bold mr-1.5">{it.qty}x</span>
                      {it.name}
                    </span>
                    <span className="font-mono text-on-surface font-semibold">
                      ${(it.price * it.qty).toLocaleString('es-AR')}
                    </span>
                  </div>
                ))}
              </div>
            </div>

            {/* SECTION 1: Agreed Delivery Fee (Editable) */}
            <div className="p-4 rounded-2xl bg-amber-500/10 border border-amber-500/20 space-y-3">
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-1.5">
                  <Bike className="w-4 h-4 text-amber-700" />
                  <label className="text-xs font-extrabold text-amber-950">
                    Costo de Envío Acordado por WhatsApp
                  </label>
                </div>
                <span className="text-[11px] text-amber-800 font-medium">
                  Ajustable según zona
                </span>
              </div>

              <div className="flex flex-col sm:flex-row sm:items-center gap-2">
                <div className="relative flex-1">
                  <span className="absolute left-3 top-2.5 text-xs font-bold text-on-surface-variant pointer-events-none">
                    $ ARS:
                  </span>
                  <input
                    type="number"
                    value={selectedOrder.deliveryFee}
                    onChange={(e) => {
                      const newFee = Math.max(0, parseFloat(e.target.value) || 0);
                      updateOrder(selectedOrder.id, { deliveryFee: newFee });
                    }}
                    placeholder="0"
                    className="w-full pl-16 pr-3 py-2 rounded-xl bg-surface-container-lowest border border-amber-300 text-xs font-bold font-mono text-on-surface focus:outline-none focus:ring-2 focus:ring-amber-500"
                  />
                </div>

                {/* Quick preset buttons */}
                <div className="flex items-center gap-1 overflow-x-auto">
                  {[0, 1000, 1500, 2000].map(fee => (
                    <button
                      key={fee}
                      type="button"
                      onClick={() => updateOrder(selectedOrder.id, { deliveryFee: fee })}
                      className={`px-2.5 py-1.5 rounded-lg text-[11px] font-bold border transition-colors ${
                        selectedOrder.deliveryFee === fee
                          ? 'bg-amber-500 text-amber-950 border-amber-600'
                          : 'bg-surface-container-lowest text-amber-950 border-amber-200 hover:bg-amber-100'
                      }`}
                    >
                      {fee === 0 ? 'Sin Envío' : `+$${fee}`}
                    </button>
                  ))}
                </div>
              </div>

              {/* Total Calculation Display */}
              <div className="pt-2 border-t border-amber-500/20 flex items-center justify-between text-xs">
                <span className="text-on-surface-variant font-medium">
                  Subtotal: <strong className="font-mono text-on-surface">${selectedOrder.subtotal.toLocaleString('es-AR')}</strong> + Envío: <strong className="font-mono text-on-surface">${selectedOrder.deliveryFee.toLocaleString('es-AR')}</strong>
                </span>
                <span className="text-sm font-extrabold text-primary font-mono">
                  TOTAL: ${selectedOrder.total.toLocaleString('es-AR')}
                </span>
              </div>
            </div>

            {/* SECTION 2: Payment Method & Reconciliation */}
            <div className="space-y-3">
              <h4 className="font-bold text-xs text-on-surface uppercase tracking-wider flex items-center gap-1.5">
                <CreditCard className="w-4 h-4 text-primary" />
                <span>Forma y Estado de Pago Acordado</span>
              </h4>

              {/* Payment Method Selector Tabs */}
              <div className="grid grid-cols-3 gap-2">
                <button
                  type="button"
                  onClick={() => updateOrder(selectedOrder.id, { paymentMethod: 'Efectivo', paymentStatus: 'cash_on_delivery' })}
                  className={`p-2.5 rounded-2xl border text-xs font-bold flex flex-col items-center gap-1 text-center transition-all ${
                    selectedOrder.paymentMethod === 'Efectivo'
                      ? 'bg-amber-50 border-amber-400 text-amber-950 ring-2 ring-amber-400/30'
                      : 'bg-surface-container-lowest border-surface-container-high text-on-surface-variant hover:bg-surface-container-low'
                  }`}
                >
                  <Wallet className="w-4 h-4 text-amber-600" />
                  <span>Efectivo en mano</span>
                </button>

                <button
                  type="button"
                  onClick={() => updateOrder(selectedOrder.id, { paymentMethod: 'Transferencia' })}
                  className={`p-2.5 rounded-2xl border text-xs font-bold flex flex-col items-center gap-1 text-center transition-all ${
                    selectedOrder.paymentMethod === 'Transferencia'
                      ? 'bg-teal-50 border-teal-400 text-teal-950 ring-2 ring-teal-400/30'
                      : 'bg-surface-container-lowest border-surface-container-high text-on-surface-variant hover:bg-surface-container-low'
                  }`}
                >
                  <Store className="w-4 h-4 text-teal-600" />
                  <span>Transferencia Alias</span>
                </button>

                <button
                  type="button"
                  onClick={() => updateOrder(selectedOrder.id, { paymentMethod: 'Mercado Pago' })}
                  className={`p-2.5 rounded-2xl border text-xs font-bold flex flex-col items-center gap-1 text-center transition-all ${
                    selectedOrder.paymentMethod === 'Mercado Pago'
                      ? 'bg-indigo-50 border-indigo-400 text-indigo-950 ring-2 ring-indigo-400/30'
                      : 'bg-surface-container-lowest border-surface-container-high text-on-surface-variant hover:bg-surface-container-low'
                  }`}
                >
                  <LinkIcon className="w-4 h-4 text-indigo-600" />
                  <span>Link Mercado Pago</span>
                </button>
              </div>

              {/* Dynamic Action Sub-Panel according to selected method */}
              <div className="p-4 rounded-2xl bg-surface-container-low border border-surface-container-high space-y-3">
                
                {/* CASE A: EFECTIVO */}
                {selectedOrder.paymentMethod === 'Efectivo' && (
                  <div className="space-y-2 text-xs">
                    <div className="flex items-center gap-2 text-amber-900 font-bold">
                      <Wallet className="w-4 h-4 text-amber-600" />
                      <span>Pago en Efectivo contra entrega / en mostrador</span>
                    </div>
                    <p className="text-[11px] text-on-surface-variant">
                      El cadete o el personal de mostrador debe cobrar <strong className="text-on-surface font-mono">${selectedOrder.total.toLocaleString('es-AR')}</strong> al entregar el pedido.
                    </p>
                    <div className="pt-2 flex items-center gap-2">
                      <button
                        type="button"
                        onClick={() => {
                          updateOrder(selectedOrder.id, { paymentStatus: 'paid' });
                        }}
                        className={`px-3 py-1.5 rounded-xl text-xs font-bold flex items-center gap-1 border ${
                          selectedOrder.paymentStatus === 'paid'
                            ? 'bg-emerald-600 text-white border-emerald-700'
                            : 'bg-surface-container-lowest text-emerald-800 border-emerald-300 hover:bg-emerald-100'
                        }`}
                      >
                        <Check className="w-3.5 h-3.5" />
                        <span>{selectedOrder.paymentStatus === 'paid' ? 'Efectivo Ya Cobrado ✓' : 'Marcar como Cobrado en Efectivo'}</span>
                      </button>
                    </div>
                  </div>
                )}

                {/* CASE B: TRANSFERENCIA ALIAS */}
                {selectedOrder.paymentMethod === 'Transferencia' && (
                  <div className="space-y-2 text-xs">
                    <div className="flex items-center justify-between">
                      <span className="font-bold text-on-surface">Datos para Transferir al Local:</span>
                      <span className="font-mono text-primary font-bold">Alias: cafesierras.mp</span>
                    </div>
                    <p className="text-[11px] text-on-surface-variant">
                      Si el cliente te mandó la captura de transferencia por WhatsApp, cotejá el importe (${selectedOrder.total.toLocaleString('es-AR')}) y aprobalo acá:
                    </p>
                    <div className="pt-2">
                      <button
                        type="button"
                        onClick={() => updateOrder(selectedOrder.id, { paymentStatus: 'paid' })}
                        className={`w-full py-2 rounded-xl text-xs font-bold flex items-center justify-center gap-1.5 transition-all shadow-xs ${
                          selectedOrder.paymentStatus === 'paid'
                            ? 'bg-emerald-600 text-white'
                            : 'bg-teal-600 hover:bg-teal-500 text-white'
                        }`}
                      >
                        <CheckCircle2 className="w-4 h-4" />
                        <span>
                          {selectedOrder.paymentStatus === 'paid' ? '✓ Transferencia Verificada & Acreditada' : 'Verificar Transferencia y Aprobar Pago'}
                        </span>
                      </button>
                    </div>
                  </div>
                )}

                {/* CASE C: LINK MERCADO PAGO CON CONCILIACIÓN */}
                {selectedOrder.paymentMethod === 'Mercado Pago' && (
                  <div className="space-y-3 text-xs">
                    <div className="flex items-center justify-between">
                      <span className="font-bold text-on-surface">Link Oficial de Cobro (Mercado Pago):</span>
                      <span className={`text-[10px] font-bold px-2 py-0.5 rounded-full ${
                        selectedOrder.paymentStatus === 'paid'
                          ? 'bg-emerald-100 text-emerald-800'
                          : 'bg-amber-100 text-amber-800'
                      }`}>
                        {selectedOrder.paymentStatus === 'paid' ? 'Acreditado 100%' : 'Esperando Pago del Cliente'}
                      </span>
                    </div>

                    {!selectedOrder.paymentLink ? (
                      <button
                        type="button"
                        onClick={() => generateOrderPaymentLink(selectedOrder.id)}
                        className="w-full py-2.5 rounded-xl bg-indigo-600 hover:bg-indigo-500 text-white font-extrabold flex items-center justify-center gap-1.5 shadow-sm"
                      >
                        <LinkIcon className="w-4 h-4" />
                        <span>Generar Link de Pago por ${selectedOrder.total.toLocaleString('es-AR')}</span>
                      </button>
                    ) : (
                      <div className="space-y-2">
                        <div className="p-2.5 rounded-xl bg-surface-container-lowest border border-surface-container-high flex items-center justify-between">
                          <span className="font-mono text-[11px] text-indigo-700 truncate max-w-[280px]">
                            {selectedOrder.paymentLink}
                          </span>
                          <button
                            type="button"
                            onClick={() => {
                              navigator.clipboard.writeText(selectedOrder.paymentLink);
                              alert('Link de pago copiado al portapapeles!');
                            }}
                            className="text-xs font-bold text-primary hover:underline ml-2"
                          >
                            Copiar
                          </button>
                        </div>

                        <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 pt-1">
                          <button
                            type="button"
                            onClick={() => sendPaymentLinkWhatsApp(selectedOrder)}
                            className="w-full py-2 rounded-xl bg-emerald-600 hover:bg-emerald-500 text-white font-bold flex items-center justify-center gap-1.5 shadow-xs"
                          >
                            <Send className="w-3.5 h-3.5" />
                            <span>Enviar por WhatsApp</span>
                          </button>

                          <button
                            type="button"
                            onClick={() => {
                              updateOrder(selectedOrder.id, { paymentStatus: 'paid' });
                            }}
                            className={`w-full py-2 rounded-xl font-bold flex items-center justify-center gap-1.5 border transition-all ${
                              selectedOrder.paymentStatus === 'paid'
                                ? 'bg-emerald-50 text-emerald-800 border-emerald-300'
                                : 'bg-surface-container-lowest hover:bg-indigo-50 text-indigo-700 border-indigo-300'
                            }`}
                          >
                            <RefreshCw className="w-3.5 h-3.5" />
                            <span>{selectedOrder.paymentStatus === 'paid' ? '✓ Cobro Acreditado' : 'Simular Conciliación Webhook'}</span>
                          </button>
                        </div>
                      </div>
                    )}
                  </div>
                )}

              </div>
            </div>

            {/* Advance Order Status Footer */}
            <div className="pt-2 border-t border-surface-container-high flex flex-col sm:flex-row items-center justify-between gap-3">
              <div className="text-xs text-on-surface-variant">
                Estado actual: <strong className="uppercase text-on-surface font-extrabold">{selectedOrder.status}</strong>
              </div>

              <div className="flex flex-wrap items-center gap-2 w-full sm:w-auto">
                <button
                  type="button"
                  onClick={() => setSelectedOrderId(null)}
                  className="px-4 py-2 rounded-xl text-xs font-semibold text-on-surface-variant hover:bg-surface-container"
                >
                  Cerrar
                </button>

                {/* Rollback Buttons */}
                {selectedOrder.status === 'preparing' && (
                  <button
                    type="button"
                    onClick={() => {
                      updateOrderStatus(selectedOrder.id, 'pending');
                      setSelectedOrderId(null);
                    }}
                    className="px-3.5 py-2.5 rounded-xl border border-surface-container-high bg-surface-container-low hover:bg-surface-container text-on-surface-variant font-bold text-xs flex items-center justify-center gap-1"
                    title="Devolver a pendientes"
                  >
                    <span>← A Pendiente</span>
                  </button>
                )}

                {selectedOrder.status === 'ready' && (
                  <button
                    type="button"
                    onClick={() => {
                      updateOrderStatus(selectedOrder.id, 'preparing');
                      setSelectedOrderId(null);
                    }}
                    className="px-3.5 py-2.5 rounded-xl border border-surface-container-high bg-surface-container-low hover:bg-surface-container text-on-surface-variant font-bold text-xs flex items-center justify-center gap-1"
                    title="Devolver a preparación"
                  >
                    <span>← A Preparación</span>
                  </button>
                )}

                {selectedOrder.status === 'delivered' && (
                  <button
                    type="button"
                    onClick={() => {
                      updateOrderStatus(selectedOrder.id, 'ready');
                      setSelectedOrderId(null);
                    }}
                    className="px-3.5 py-2.5 rounded-xl border border-surface-container-high bg-surface-container-low hover:bg-surface-container text-on-surface-variant font-bold text-xs flex items-center justify-center gap-1"
                    title="Reabrir pedido a listo para despacho"
                  >
                    <span>← Reabrir a Listo</span>
                  </button>
                )}

                {/* Advance Buttons */}
                {selectedOrder.status === 'pending' && (
                  <button
                    type="button"
                    onClick={() => {
                      updateOrderStatus(selectedOrder.id, 'preparing');
                      setSelectedOrderId(null);
                    }}
                    className="px-5 py-2.5 rounded-xl bg-indigo-600 hover:bg-indigo-500 text-white font-extrabold text-xs shadow-md flex items-center justify-center gap-1"
                  >
                    <ChefHat className="w-4 h-4" />
                    <span>Avanzar a Preparación</span>
                  </button>
                )}

                {selectedOrder.status === 'preparing' && (
                  <button
                    type="button"
                    onClick={() => {
                      updateOrderStatus(selectedOrder.id, 'ready');
                      setSelectedOrderId(null);
                    }}
                    className="px-5 py-2.5 rounded-xl bg-teal-600 hover:bg-teal-500 text-white font-extrabold text-xs shadow-md flex items-center justify-center gap-1"
                  >
                    <Bike className="w-4 h-4" />
                    <span>Listo para Despacho</span>
                  </button>
                )}

                {selectedOrder.status === 'ready' && (
                  <button
                    type="button"
                    onClick={() => {
                      updateOrderStatus(selectedOrder.id, 'delivered');
                      setSelectedOrderId(null);
                    }}
                    className="px-5 py-2.5 rounded-xl bg-emerald-600 hover:bg-emerald-500 text-white font-extrabold text-xs shadow-md flex items-center justify-center gap-1"
                  >
                    <CheckCircle2 className="w-4 h-4" />
                    <span>Marcar Entregado ✓</span>
                  </button>
                )}
              </div>
            </div>

          </div>
        </div>
      )}

      {/* Manual Order Modal */}
      {manualModalOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-inverse-surface/60 backdrop-blur-sm animate-in fade-in">
          <div className="bg-surface-container-lowest rounded-3xl shadow-modal border border-surface-container-high w-full max-w-md p-5 sm:p-6 space-y-4">
            <div className="flex items-center justify-between border-b border-surface-container-high pb-3">
              <h3 className="font-extrabold text-sm sm:text-base text-on-surface">
                Cargar Pedido Manual de Mostrador
              </h3>
              <button onClick={() => setManualModalOpen(false)} className="text-outline hover:text-on-surface">
                ✕
              </button>
            </div>

            <form onSubmit={handleCreateManualOrder} className="space-y-3 text-xs">
              <div>
                <label className="font-bold text-on-surface block mb-1">Nombre del Cliente *</label>
                <input
                  type="text"
                  required
                  placeholder="Ej: Juan Pérez"
                  value={custName}
                  onChange={e => setCustName(e.target.value)}
                  className="w-full px-3 py-2 rounded-xl bg-surface border border-surface-container-high text-on-surface focus:outline-none focus:border-primary"
                />
              </div>

              <div>
                <label className="font-bold text-on-surface block mb-1">Dirección / Modalidad</label>
                <input
                  type="text"
                  placeholder="Ej: Retira en local o Av. San Martín 1200"
                  value={custAddress}
                  onChange={e => setCustAddress(e.target.value)}
                  className="w-full px-3 py-2 rounded-xl bg-surface border border-surface-container-high text-on-surface focus:outline-none focus:border-primary"
                />
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="font-bold text-on-surface block mb-1">Tipo de Entrega</label>
                  <select
                    value={delMethod}
                    onChange={e => setDelMethod(e.target.value)}
                    className="w-full px-3 py-2 rounded-xl bg-surface border border-surface-container-high text-on-surface focus:outline-none focus:border-primary"
                  >
                    <option value="takeaway">Retiro por Local</option>
                    <option value="delivery">Envío a Domicilio</option>
                    <option value="dine_in">Consumo en Local</option>
                  </select>
                </div>

                <div>
                  <label className="font-bold text-on-surface block mb-1">Forma de Pago</label>
                  <select
                    value={manualPayMethod}
                    onChange={e => setManualPayMethod(e.target.value)}
                    className="w-full px-3 py-2 rounded-xl bg-surface border border-surface-container-high text-on-surface focus:outline-none focus:border-primary"
                  >
                    <option value="Efectivo">Efectivo</option>
                    <option value="Transferencia">Transferencia</option>
                    <option value="Mercado Pago">Mercado Pago</option>
                  </select>
                </div>
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="font-bold text-on-surface block mb-1">Subtotal Productos ($) *</label>
                  <input
                    type="number"
                    required
                    placeholder="8000"
                    value={custSubtotal}
                    onChange={e => setCustSubtotal(e.target.value)}
                    className="w-full px-3 py-2 rounded-xl bg-surface border border-surface-container-high text-on-surface focus:outline-none focus:border-primary"
                  />
                </div>

                <div>
                  <label className="font-bold text-on-surface block mb-1">Costo Envío Acordado ($)</label>
                  <input
                    type="number"
                    placeholder="0"
                    value={custDeliveryFee}
                    onChange={e => setCustDeliveryFee(e.target.value)}
                    className="w-full px-3 py-2 rounded-xl bg-surface border border-surface-container-high text-on-surface focus:outline-none focus:border-primary"
                  />
                </div>
              </div>

              <div>
                <label className="font-bold text-on-surface block mb-1">Detalle de Ítems / Productos *</label>
                <textarea
                  rows={2}
                  required
                  placeholder="Ej: 1x Buzo Oversize Talle L, 1x Remera..."
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
                  Ingresar Pedido
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

    </div>
  );
}
