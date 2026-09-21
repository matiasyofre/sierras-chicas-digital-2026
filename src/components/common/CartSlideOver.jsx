import React, { useState } from 'react';
import { useApp } from '../../context/AppContext';
import { 
  X, 
  Trash2, 
  Plus, 
  Minus, 
  ShoppingBag, 
  Send, 
  Truck, 
  Store as StoreIcon, 
  CheckCircle,
  MapPin
} from 'lucide-react';

export default function CartSlideOver() {
  const { 
    cart, 
    cartBusiness, 
    isCartOpen, 
    setIsCartOpen, 
    updateCartQty, 
    removeFromCart, 
    clearCart, 
    cartSubtotal, 
    addOrder 
  } = useApp();

  const [deliveryMethod, setDeliveryMethod] = useState('delivery'); // 'delivery', 'takeaway'
  const [customerName, setCustomerName] = useState('');
  const [customerAddress, setCustomerAddress] = useState('');
  const [customerNotes, setCustomerNotes] = useState('');
  const [paymentMethod, setPaymentMethod] = useState('Mercado Pago');
  const [orderSent, setOrderSent] = useState(false);

  if (!isCartOpen) return null;

  const deliveryFee = deliveryMethod === 'delivery' ? 1200 : 0;
  const total = cartSubtotal + deliveryFee;

  const handleCheckoutWhatsApp = () => {
    if (!customerName.trim()) {
      alert('Por favor ingresá tu nombre para el pedido.');
      return;
    }

    if (deliveryMethod === 'delivery' && !customerAddress.trim()) {
      alert('Por favor ingresá la dirección de entrega.');
      return;
    }

    const orderNumber = '#PED-' + Math.floor(1000 + Math.random() * 9000);

    // Format WhatsApp message
    let message = `🛒 *NUEVO PEDIDO ${orderNumber} - SIERRAS CHICAS DIGITAL*\n`;
    message += `🏪 *Comercio:* ${cartBusiness?.name || 'Local'}\n`;
    message += `🔢 *ID de Pedido:* ${orderNumber}\n\n`;
    message += `👤 *Cliente:* ${customerName}\n`;
    message += `📍 *Entrega:* ${deliveryMethod === 'delivery' ? `Envío a domicilio (${customerAddress})` : 'Retiro por mostrador / local'}\n`;
    message += `💳 *Forma de Pago:* ${paymentMethod}\n`;
    if (customerNotes) message += `📝 *Aclaraciones:* ${customerNotes}\n`;
    message += `\n📋 *DETALLE DEL PEDIDO:*\n`;

    cart.forEach(item => {
      message += `▪️ ${item.qty}x ${item.name} - $${(item.price * item.qty).toLocaleString('es-AR')}\n`;
    });

    message += `\n*Subtotal:* $${cartSubtotal.toLocaleString('es-AR')}\n`;
    if (deliveryFee > 0) message += `*Costo de Envío:* $${deliveryFee.toLocaleString('es-AR')}\n`;
    message += `*TOTAL FINAL:* $${total.toLocaleString('es-AR')}\n\n`;
    message += `_Pedido generado desde Sierras Chicas Digital PWA_`;

    // Save order in POS / Kanban local DB
    addOrder({
      orderNumber,
      businessId: cartBusiness?.id || 'biz-1',
      customerName,
      customerPhone: '',
      customerAddress: deliveryMethod === 'delivery' ? customerAddress : 'Retira por local',
      customerNotes,
      deliveryMethod,
      paymentMethod,
      items: cart.map(i => ({ name: i.name, qty: i.qty, price: i.price })),
      subtotal: cartSubtotal,
      deliveryFee,
      total
    });

    setOrderSent(true);

    const cleanPhone = cartBusiness?.whatsapp?.replace(/[^0-9]/g, '') || '5493543123456';
    const waUrl = `https://wa.me/${cleanPhone}?text=${encodeURIComponent(message)}`;
    
    // Open WhatsApp
    window.open(waUrl, '_blank');
  };

  return (
    <div className="fixed inset-0 z-50 overflow-hidden animate-in fade-in duration-200">
      {/* Backdrop */}
      <div 
        className="absolute inset-0 bg-inverse-surface/60 backdrop-blur-sm transition-opacity" 
        onClick={() => setIsCartOpen(false)}
      />

      <div className="fixed inset-y-0 right-0 max-w-full flex pl-10">
        <div className="w-screen max-w-md bg-surface-container-lowest shadow-modal flex flex-col">
          
          {/* Header */}
          <div className="p-4 sm:p-5 bg-surface border-b border-surface-container-high flex items-center justify-between">
            <div className="flex items-center gap-2.5">
              <div className="w-9 h-9 rounded-xl bg-primary-fixed text-on-primary-fixed flex items-center justify-center">
                <ShoppingBag className="w-5 h-5 text-primary" />
              </div>
              <div>
                <h3 className="font-extrabold text-sm sm:text-base text-on-surface">Mi Carrito de Compras</h3>
                {cartBusiness && (
                  <p className="text-xs text-on-surface-variant truncate max-w-[200px]">
                    {cartBusiness.name}
                  </p>
                )}
              </div>
            </div>
            <button
              type="button"
              onClick={() => setIsCartOpen(false)}
              className="p-2 rounded-xl text-on-surface-variant hover:bg-surface-container transition-colors"
            >
              <X className="w-5 h-5" />
            </button>
          </div>

          {/* Body */}
          <div className="flex-1 overflow-y-auto p-4 sm:p-5 space-y-5">
            {orderSent ? (
              <div className="py-10 text-center space-y-4">
                <div className="w-16 h-16 rounded-full bg-emerald-100 text-emerald-600 flex items-center justify-center mx-auto">
                  <CheckCircle className="w-9 h-9" />
                </div>
                <h4 className="font-extrabold text-lg text-on-surface">¡Pedido Enviado a WhatsApp!</h4>
                <p className="text-xs text-on-surface-variant max-w-xs mx-auto">
                  Hemos abierto WhatsApp para que confirmes tu pedido con el comercio. También fue registrado en el POS del negocio.
                </p>
                <button
                  type="button"
                  onClick={() => {
                    setOrderSent(false);
                    clearCart();
                    setIsCartOpen(false);
                  }}
                  className="px-5 py-2.5 rounded-xl bg-primary text-white font-bold text-xs shadow-md"
                >
                  Entendido / Volver
                </button>
              </div>
            ) : cart.length === 0 ? (
              <div className="py-16 text-center space-y-3">
                <ShoppingBag className="w-12 h-12 text-outline mx-auto stroke-1" />
                <h4 className="font-bold text-sm text-on-surface">Tu carrito está vacío</h4>
                <p className="text-xs text-on-surface-variant max-w-xs mx-auto">
                  Explorá los comercios de Sierras Chicas y agregá deliciosos productos o servicios.
                </p>
              </div>
            ) : (
              <>
                {/* List of Cart Items */}
                <div className="space-y-3">
                  <div className="flex items-center justify-between text-xs font-bold text-outline uppercase tracking-wider">
                    <span>Productos ({cart.length})</span>
                    <button
                      type="button"
                      onClick={clearCart}
                      className="text-rose-600 hover:underline flex items-center gap-1 font-semibold normal-case text-xs"
                    >
                      <Trash2 className="w-3.5 h-3.5" />
                      <span>Vaciar</span>
                    </button>
                  </div>

                  {cart.map(item => (
                    <div 
                      key={item.id} 
                      className="flex items-center justify-between p-3 rounded-2xl bg-surface border border-surface-container-high gap-3"
                    >
                      <div className="flex-1 min-w-0">
                        <h4 className="text-xs font-bold text-on-surface truncate">{item.name}</h4>
                        <p className="text-xs font-extrabold text-primary mt-0.5">
                          ${(item.price * item.qty).toLocaleString('es-AR')}
                        </p>
                      </div>

                      {/* Quantity Controls */}
                      <div className="flex items-center gap-2 bg-surface-container-lowest px-2 py-1 rounded-xl border border-surface-container-high">
                        <button
                          type="button"
                          onClick={() => updateCartQty(item.id, item.qty - 1)}
                          className="p-1 rounded-lg text-on-surface-variant hover:bg-surface-container"
                        >
                          <Minus className="w-3.5 h-3.5" />
                        </button>
                        <span className="text-xs font-extrabold text-on-surface w-4 text-center">
                          {item.qty}
                        </span>
                        <button
                          type="button"
                          onClick={() => updateCartQty(item.id, item.qty + 1)}
                          className="p-1 rounded-lg text-on-surface-variant hover:bg-surface-container"
                        >
                          <Plus className="w-3.5 h-3.5" />
                        </button>
                      </div>
                    </div>
                  ))}
                </div>

                {/* Delivery Method */}
                <div className="space-y-2 pt-2 border-t border-surface-container-high">
                  <label className="text-xs font-bold text-on-surface">Modalidad de Entrega</label>
                  <div className="grid grid-cols-2 gap-2">
                    <button
                      type="button"
                      onClick={() => setDeliveryMethod('delivery')}
                      className={`p-2.5 rounded-xl border text-xs font-bold flex items-center justify-center gap-2 transition-all ${
                        deliveryMethod === 'delivery'
                          ? 'bg-primary-fixed border-primary text-on-primary-fixed shadow-sm'
                          : 'bg-surface border-surface-container-high text-on-surface-variant'
                      }`}
                    >
                      <Truck className="w-4 h-4" />
                      <span>Envío ($1.200)</span>
                    </button>
                    <button
                      type="button"
                      onClick={() => setDeliveryMethod('takeaway')}
                      className={`p-2.5 rounded-xl border text-xs font-bold flex items-center justify-center gap-2 transition-all ${
                        deliveryMethod === 'takeaway'
                          ? 'bg-primary-fixed border-primary text-on-primary-fixed shadow-sm'
                          : 'bg-surface border-surface-container-high text-on-surface-variant'
                      }`}
                    >
                      <StoreIcon className="w-4 h-4" />
                      <span>Retiro en Local</span>
                    </button>
                  </div>
                </div>

                {/* Customer Details Form */}
                <div className="space-y-2.5 pt-2">
                  <div>
                    <label className="text-xs font-bold text-on-surface block mb-1">Tu Nombre *</label>
                    <input
                      type="text"
                      placeholder="Ej: Laura Gómez"
                      value={customerName}
                      onChange={e => setCustomerName(e.target.value)}
                      className="w-full px-3 py-2 rounded-xl bg-surface border border-surface-container-high text-xs text-on-surface focus:outline-none focus:border-primary"
                    />
                  </div>

                  {deliveryMethod === 'delivery' && (
                    <div>
                      <label className="text-xs font-bold text-on-surface block mb-1">Dirección de Entrega *</label>
                      <input
                        type="text"
                        placeholder="Ej: Los Aromos 240, Río Ceballos"
                        value={customerAddress}
                        onChange={e => setCustomerAddress(e.target.value)}
                        className="w-full px-3 py-2 rounded-xl bg-surface border border-surface-container-high text-xs text-on-surface focus:outline-none focus:border-primary"
                      />
                    </div>
                  )}

                  <div>
                    <label className="text-xs font-bold text-on-surface block mb-1">Medio de Pago</label>
                    <select
                      value={paymentMethod}
                      onChange={e => setPaymentMethod(e.target.value)}
                      className="w-full px-3 py-2 rounded-xl bg-surface border border-surface-container-high text-xs text-on-surface focus:outline-none focus:border-primary"
                    >
                      <option value="Mercado Pago">Mercado Pago / Transferencia</option>
                      <option value="Efectivo contra entrega">Efectivo contra entrega</option>
                      <option value="Tarjeta Débito/Crédito">Tarjeta en mostrador</option>
                    </select>
                  </div>

                  <div>
                    <label className="text-xs font-bold text-on-surface block mb-1">Notas / Aclaraciones</label>
                    <textarea
                      rows={2}
                      placeholder="Ej: Timbre blanco, sin cebolla, etc."
                      value={customerNotes}
                      onChange={e => setCustomerNotes(e.target.value)}
                      className="w-full px-3 py-2 rounded-xl bg-surface border border-surface-container-high text-xs text-on-surface focus:outline-none focus:border-primary"
                    />
                  </div>
                </div>
              </>
            )}
          </div>

          {/* Footer Totals & Checkout Button */}
          {cart.length > 0 && !orderSent && (
            <div className="p-4 sm:p-5 bg-surface border-t border-surface-container-high space-y-3">
              <div className="space-y-1.5 text-xs">
                <div className="flex justify-between text-on-surface-variant">
                  <span>Subtotal productos</span>
                  <span>${cartSubtotal.toLocaleString('es-AR')}</span>
                </div>
                {deliveryFee > 0 && (
                  <div className="flex justify-between text-on-surface-variant">
                    <span>Costo de envío estimado</span>
                    <span>${deliveryFee.toLocaleString('es-AR')}</span>
                  </div>
                )}
                <div className="flex justify-between font-extrabold text-sm sm:text-base text-on-surface pt-1.5 border-t border-surface-container-high">
                  <span>Total</span>
                  <span className="text-primary">${total.toLocaleString('es-AR')}</span>
                </div>
              </div>

              <button
                type="button"
                onClick={handleCheckoutWhatsApp}
                className="w-full py-3 px-4 rounded-xl bg-emerald-600 hover:bg-emerald-500 text-white font-extrabold text-sm shadow-md shadow-emerald-900/30 flex items-center justify-center gap-2 transition-all active:scale-[0.98]"
              >
                <Send className="w-4 h-4" />
                <span>Pedir por WhatsApp (wa.me)</span>
              </button>
            </div>
          )}

        </div>
      </div>
    </div>
  );
}
