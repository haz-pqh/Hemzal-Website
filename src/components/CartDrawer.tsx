import React, { useState } from 'react';
import { CartItem, PromoVoucher } from '../types';
import { BRANCHES } from '../data/branchData';
import { VOUCHERS } from '../data/menuData';
import { X, Trash2, Plus, Minus, ShoppingBag, ArrowRight, Tag, Check, Sparkles, MapPin, Truck, Store, MessageSquare } from 'lucide-react';
import confetti from 'canvas-confetti';
import { playPopSound, playCrunchSound } from '../utils/sound';

interface CartDrawerProps {
  isOpen: boolean;
  onClose: () => void;
  cart: CartItem[];
  onUpdateQuantity: (cartId: string, delta: number) => void;
  onRemoveItem: (cartId: string) => void;
  onClearCart: () => void;
}

export const CartDrawer: React.FC<CartDrawerProps> = ({
  isOpen,
  onClose,
  cart,
  onUpdateQuantity,
  onRemoveItem,
  onClearCart,
}) => {
  if (!isOpen) return null;

  const [orderType, setOrderType] = useState<'delivery' | 'pickup'>('delivery');
  const [selectedBranchId, setSelectedBranchId] = useState<string>(BRANCHES[0].id);
  const [deliveryAddress, setDeliveryAddress] = useState<string>('');
  const [customerName, setCustomerName] = useState<string>('');
  const [customerPhone, setCustomerPhone] = useState<string>('');
  const [voucherCodeInput, setVoucherCodeInput] = useState<string>('');
  const [appliedVoucher, setAppliedVoucher] = useState<PromoVoucher | null>(null);
  const [voucherError, setVoucherError] = useState<string>('');

  // Financial calculations
  const rawSubtotal = cart.reduce((sum, item) => sum + item.totalPrice, 0);

  let discount = 0;
  if (appliedVoucher) {
    if (rawSubtotal >= appliedVoucher.minSpend) {
      if (appliedVoucher.discountPercent) {
        discount = (rawSubtotal * appliedVoucher.discountPercent) / 100;
      } else if (appliedVoucher.discountAmount) {
        discount = Math.min(appliedVoucher.discountAmount, rawSubtotal);
      }
    }
  }

  const deliveryFee = orderType === 'delivery' ? (rawSubtotal >= 40 ? 0 : 5.00) : 0;
  const grandTotal = Math.max(0, rawSubtotal - discount + deliveryFee);

  const handleApplyVoucher = () => {
    setVoucherError('');
    const code = voucherCodeInput.trim().toUpperCase();
    const found = VOUCHERS.find((v) => v.code === code);
    if (!found) {
      setVoucherError('Kod baucar tidak sah.');
      return;
    }
    if (rawSubtotal < found.minSpend) {
      setVoucherError(`Minimum perbelanjaan untuk ${code} adalah RM ${found.minSpend.toFixed(2)}.`);
      return;
    }
    setAppliedVoucher(found);
    playPopSound();
    confetti({ particleCount: 50, spread: 45 });
  };

  const handleCheckoutWhatsApp = () => {
    if (cart.length === 0) return;
    playCrunchSound();
    confetti({ particleCount: 100, spread: 70, origin: { y: 0.6 } });

    const selectedBranch = BRANCHES.find((b) => b.id === selectedBranchId) || BRANCHES[0];

    // Format rich WhatsApp message text
    let msg = `🍗 *PESANAN HEMZAL CRISPY CHICKEN*\n`;
    msg += `----------------------------------------\n`;
    msg += `👤 *Nama Pelanggan:* ${customerName.trim() || 'Pelanggan Walk-In/Online'}\n`;
    msg += `📞 *Telefon:* ${customerPhone.trim() || 'N/A'}\n`;
    msg += `📌 *Jenis Pesanan:* ${orderType === 'delivery' ? 'Penghantaran (Delivery)' : `Ambil Sendiri di Outlet (${selectedBranch.name})`}\n`;
    
    if (orderType === 'delivery') {
      msg += `🏠 *Alamat Hantar:* ${deliveryAddress.trim() || 'Sila tanya lokasi GPS'}\n`;
    }

    msg += `----------------------------------------\n`;
    msg += `🛒 *SENARAI ITEM DIPESAN:*\n`;

    cart.forEach((item, index) => {
      const portionText = item.selectedPortion ? ` (${item.selectedPortion.label})` : '';
      msg += `\n*${index + 1}. ${item.item.name}${portionText}* (x${item.quantity})\n`;
      if (item.selectedDip) msg += `   • Sos Celup: ${item.selectedDip}\n`;
      if (item.selectedAddons.length > 0) {
        msg += `   • Tambahan: ${item.selectedAddons.map(a => `${a.name} (+RM${a.price.toFixed(2)})`).join(', ')}\n`;
      }
      if (item.specialInstructions) {
        msg += `   • Nota: "${item.specialInstructions}"\n`;
      }
      msg += `   • Subtotal Item: RM ${item.totalPrice.toFixed(2)}\n`;
    });

    msg += `\n----------------------------------------\n`;
    msg += `💵 *Subtotal Makanan:* RM ${rawSubtotal.toFixed(2)}\n`;
    if (discount > 0) {
      msg += `🏷️ *Diskaun Baucar (${appliedVoucher?.code}):* -RM ${discount.toFixed(2)}\n`;
    }
    if (orderType === 'delivery') {
      msg += `🚚 *Caj Penghantaran:* ${deliveryFee === 0 ? 'PERCUMA (Atas RM40)' : `RM ${deliveryFee.toFixed(2)}`}\n`;
    }
    msg += `🔥 *JUMLAH KESELURUHAN:* *RM ${grandTotal.toFixed(2)}*\n`;
    msg += `----------------------------------------\n`;
    msg += `Mohon sahkan pesanan dan sediakan hidangan panas. Terima kasih! 🙏`;

    const targetPhone = selectedBranch.whatsapp || '60123456789';
    const waUrl = `https://wa.me/${targetPhone}?text=${encodeURIComponent(msg)}`;
    window.open(waUrl, '_blank');
  };

  return (
    <div className="fixed inset-0 z-50 flex justify-end bg-black/80 backdrop-blur-sm animate-in fade-in duration-200">
      
      {/* Drawer Panel */}
      <div className="relative w-full max-w-md sm:max-w-lg bg-[#121216] border-l border-white/15 h-full flex flex-col shadow-2xl text-white">
        
        {/* Header */}
        <div className="p-5 border-b border-white/10 bg-[#16161c] flex items-center justify-between">
          <div className="flex items-center gap-2.5">
            <div className="w-9 h-9 rounded-xl bg-[#E31E24]/20 text-[#E31E24] flex items-center justify-center">
              <ShoppingBag className="w-5 h-5" />
            </div>
            <div>
              <h3 className="font-black text-lg text-white leading-tight">Troli Pesanan</h3>
              <p className="text-[11px] text-neutral-400">{cart.length} item dipilih</p>
            </div>
          </div>

          <div className="flex items-center gap-2">
            {cart.length > 0 && (
              <button
                onClick={onClearCart}
                className="text-xs text-neutral-400 hover:text-rose-400 font-bold px-2 py-1 transition-colors cursor-pointer"
                title="Kosongkan Troli"
              >
                Kosongkan
              </button>
            )}
            <button
              onClick={onClose}
              className="w-8 h-8 rounded-full bg-white/10 hover:bg-white/20 flex items-center justify-center text-white cursor-pointer"
              aria-label="Tutup troli"
            >
              <X className="w-4 h-4" />
            </button>
          </div>
        </div>

        {/* Body Content */}
        <div data-lenis-prevent className="p-5 overflow-y-auto flex-1 space-y-5 text-sm custom-scrollbar">
          
          {/* 1. Order Type Switcher (Delivery vs Pickup) */}
          <div className="bg-[#18181f] p-1 rounded-2xl border border-white/10 grid grid-cols-2 gap-1">
            <button
              type="button"
              onClick={() => {
                playPopSound();
                setOrderType('delivery');
              }}
              className={`py-2.5 px-3 rounded-xl text-xs font-black uppercase tracking-wider flex items-center justify-center gap-2 transition-all cursor-pointer ${
                orderType === 'delivery'
                  ? 'bg-[#E31E24] text-white shadow-md'
                  : 'text-neutral-400 hover:text-white'
              }`}
            >
              <Truck className="w-3.5 h-3.5" />
              <span>Penghantaran</span>
            </button>

            <button
              type="button"
              onClick={() => {
                playPopSound();
                setOrderType('pickup');
              }}
              className={`py-2.5 px-3 rounded-xl text-xs font-black uppercase tracking-wider flex items-center justify-center gap-2 transition-all cursor-pointer ${
                orderType === 'pickup'
                  ? 'bg-[#FDB913] text-black shadow-md'
                  : 'text-neutral-400 hover:text-white'
              }`}
            >
              <Store className="w-3.5 h-3.5" />
              <span>Ambil Sendiri</span>
            </button>
          </div>

          {/* Delivery or Outlet details */}
          {orderType === 'pickup' ? (
            <div className="space-y-1.5 bg-[#18181f] p-3.5 rounded-2xl border border-white/5">
              <label className="text-xs font-bold text-[#FDB913] uppercase flex items-center gap-1.5">
                <MapPin className="w-3.5 h-3.5" /> Pilih Outlet Pengambilan:
              </label>
              <select
                value={selectedBranchId}
                onChange={(e) => setSelectedBranchId(e.target.value)}
                className="w-full px-3 py-2 bg-[#121216] border border-white/10 rounded-xl text-xs text-white focus:outline-none focus:border-[#FDB913]"
              >
                {BRANCHES.map((b) => (
                  <option key={b.id} value={b.id}>
                    {b.name} ({b.city})
                  </option>
                ))}
              </select>
            </div>
          ) : (
            <div className="space-y-1.5 bg-[#18181f] p-3.5 rounded-2xl border border-white/5">
              <label className="text-xs font-bold text-[#FDB913] uppercase flex items-center justify-between">
                <span className="flex items-center gap-1.5">
                  <MapPin className="w-3.5 h-3.5" /> Alamat Penghantaran:
                </span>
                <span className="text-[10px] text-emerald-400 font-normal">
                  {rawSubtotal >= 40 ? '✓ Free Delivery' : 'Free atas RM40'}
                </span>
              </label>
              <input
                type="text"
                value={deliveryAddress}
                onChange={(e) => setDeliveryAddress(e.target.value)}
                placeholder="No rumah, jalan, taman, poskod..."
                className="w-full px-3 py-2 bg-[#121216] border border-white/10 rounded-xl text-xs text-white placeholder:text-neutral-500 focus:outline-none focus:border-[#FDB913]"
              />
            </div>
          )}

          {/* Customer Name & Phone */}
          <div className="grid grid-cols-2 gap-2">
            <input
              type="text"
              value={customerName}
              onChange={(e) => setCustomerName(e.target.value)}
              placeholder="Nama anda..."
              className="px-3 py-2 bg-[#18181f] border border-white/10 rounded-xl text-xs text-white placeholder:text-neutral-500 focus:outline-none focus:border-[#FDB913]"
            />
            <input
              type="tel"
              value={customerPhone}
              onChange={(e) => setCustomerPhone(e.target.value)}
              placeholder="No telefon (cth: 012...)"
              className="px-3 py-2 bg-[#18181f] border border-white/10 rounded-xl text-xs text-white placeholder:text-neutral-500 focus:outline-none focus:border-[#FDB913]"
            />
          </div>

          {/* Cart Item List */}
          {cart.length === 0 ? (
            <div className="text-center py-12 space-y-3 bg-[#18181f] rounded-3xl border border-white/5">
              <ShoppingBag className="w-12 h-12 text-neutral-600 mx-auto" />
              <h4 className="font-bold text-white text-base">Troli Anda Masih Kosong</h4>
              <p className="text-xs text-neutral-400 max-w-xs mx-auto">
                Pilih mana-mana hidangan kegemaran anda dari menu untuk mula memesan.
              </p>
            </div>
          ) : (
            <div className="space-y-3">
              <h4 className="text-xs font-bold text-neutral-400 uppercase tracking-wider">
                Senarai Makanan ({cart.length})
              </h4>

              {cart.map((cartItem) => (
                <div
                  key={cartItem.cartId}
                  className="bg-[#18181f] p-3.5 rounded-2xl border border-white/5 flex gap-3 items-start"
                >
                  <img
                    src={cartItem.item.image}
                    alt={cartItem.item.name}
                    className="w-16 h-16 rounded-xl object-cover shrink-0 border border-white/10"
                  />

                  <div className="flex-1 min-w-0 space-y-1">
                    <div className="flex items-start justify-between gap-1">
                      <h5 className="font-black text-xs text-white leading-tight truncate">
                        {cartItem.item.name}
                        {cartItem.selectedPortion && (
                          <span className="text-[#FDB913] font-bold ml-1">
                            ({cartItem.selectedPortion.label})
                          </span>
                        )}
                      </h5>
                      <button
                        onClick={() => onRemoveItem(cartItem.cartId)}
                        className="text-neutral-500 hover:text-rose-400 p-0.5 cursor-pointer"
                        title="Padam item"
                      >
                        <Trash2 className="w-3.5 h-3.5" />
                      </button>
                    </div>

                    {cartItem.selectedDip && (
                      <p className="text-[11px] text-[#FDB913] font-medium truncate">
                        Sos: {cartItem.selectedDip}
                      </p>
                    )}

                    {cartItem.selectedAddons.length > 0 && (
                      <p className="text-[10px] text-neutral-400 truncate">
                        + {cartItem.selectedAddons.map((a) => a.name).join(', ')}
                      </p>
                    )}

                    {cartItem.specialInstructions && (
                      <p className="text-[10px] text-neutral-400 italic">
                        "{cartItem.specialInstructions}"
                      </p>
                    )}

                    <div className="flex items-center justify-between pt-1">
                      <span className="font-black text-xs text-[#FDB913]">
                        RM {cartItem.totalPrice.toFixed(2)}
                      </span>

                      {/* Quantity buttons */}
                      <div className="flex items-center gap-1 bg-[#121216] rounded-lg border border-white/10 p-0.5">
                        <button
                          onClick={() => onUpdateQuantity(cartItem.cartId, -1)}
                          className="w-6 h-6 rounded flex items-center justify-center text-neutral-300 hover:bg-white/10 cursor-pointer"
                        >
                          <Minus className="w-3 h-3" />
                        </button>
                        <span className="w-5 text-center text-xs font-bold text-white">
                          {cartItem.quantity}
                        </span>
                        <button
                          onClick={() => onUpdateQuantity(cartItem.cartId, 1)}
                          className="w-6 h-6 rounded flex items-center justify-center text-neutral-300 hover:bg-white/10 cursor-pointer"
                        >
                          <Plus className="w-3 h-3" />
                        </button>
                      </div>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          )}

          {/* Voucher Promo Input */}
          {cart.length > 0 && (
            <div className="bg-[#18181f] p-3.5 rounded-2xl border border-white/5 space-y-2">
              <label className="text-xs font-bold text-neutral-300 uppercase flex items-center gap-1.5">
                <Tag className="w-3.5 h-3.5 text-[#FDB913]" /> Kod Baucar Diskaun
              </label>

              {appliedVoucher ? (
                <div className="flex items-center justify-between bg-emerald-500/15 border border-emerald-500/30 p-2.5 rounded-xl text-xs text-emerald-300">
                  <div className="flex items-center gap-2">
                    <Check className="w-4 h-4" />
                    <span>
                      Kod <strong>{appliedVoucher.code}</strong> digunakan!
                    </span>
                  </div>
                  <button
                    onClick={() => setAppliedVoucher(null)}
                    className="text-neutral-400 hover:text-white font-bold text-[11px]"
                  >
                    Padam
                  </button>
                </div>
              ) : (
                <div className="flex gap-2">
                  <input
                    type="text"
                    value={voucherCodeInput}
                    onChange={(e) => setVoucherCodeInput(e.target.value)}
                    placeholder="Masukkan kod (cth: HEMZALFIRST)"
                    className="flex-1 px-3 py-2 bg-[#121216] border border-white/10 rounded-xl text-xs text-white uppercase placeholder:normal-case placeholder:text-neutral-500 focus:outline-none focus:border-[#FDB913]"
                  />
                  <button
                    type="button"
                    onClick={handleApplyVoucher}
                    className="px-4 py-2 bg-[#FDB913] hover:bg-[#e69800] text-black font-black text-xs uppercase rounded-xl transition-all cursor-pointer"
                  >
                    Tebus
                  </button>
                </div>
              )}

              {voucherError && (
                <p className="text-[11px] text-rose-400">{voucherError}</p>
              )}
            </div>
          )}

        </div>

        {/* Footer Checkout Summary */}
        {cart.length > 0 && (
          <div className="p-5 border-t border-white/10 bg-[#16161c] space-y-3">
            
            {/* Breakdown */}
            <div className="space-y-1.5 text-xs text-neutral-300">
              <div className="flex justify-between">
                <span>Subtotal Makanan</span>
                <span className="font-bold text-white">RM {rawSubtotal.toFixed(2)}</span>
              </div>

              {discount > 0 && (
                <div className="flex justify-between text-emerald-400">
                  <span>Diskaun Baucar ({appliedVoucher?.code})</span>
                  <span>- RM {discount.toFixed(2)}</span>
                </div>
              )}

              {orderType === 'delivery' && (
                <div className="flex justify-between">
                  <span>Caj Penghantaran</span>
                  <span>
                    {deliveryFee === 0 ? (
                      <span className="text-emerald-400 font-bold">PERCUMA</span>
                    ) : (
                      `RM ${deliveryFee.toFixed(2)}`
                    )}
                  </span>
                </div>
              )}

              <div className="flex justify-between text-sm font-black text-white pt-2 border-t border-white/10">
                <span>Jumlah Keseluruhan</span>
                <span className="text-lg text-[#FDB913]">RM {grandTotal.toFixed(2)}</span>
              </div>
            </div>

            {/* WhatsApp Checkout Button */}
            <button
              onClick={handleCheckoutWhatsApp}
              className="w-full py-4 rounded-2xl bg-gradient-to-r from-[#25D366] via-[#20BA5A] to-[#128C7E] hover:from-[#2bf376] hover:to-[#16a594] text-black font-black text-sm uppercase tracking-wider flex items-center justify-center gap-2 shadow-xl shadow-[#25D366]/20 transition-all cursor-pointer"
            >
              <MessageSquare className="w-5 h-5 fill-black" />
              <span>Hantar Pesanan ke WhatsApp • RM {grandTotal.toFixed(2)}</span>
            </button>

            <p className="text-[10px] text-center text-neutral-400">
              Pesanan anda akan dihantar terus kepada staf dapur outlet untuk persediaan pantas.
            </p>

          </div>
        )}

      </div>
    </div>
  );
};
