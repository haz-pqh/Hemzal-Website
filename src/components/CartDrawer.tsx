import React, { useState, useEffect } from 'react';
import { CartItem, PromoVoucher } from '../types';
import { BRANCHES } from '../data/branchData';
import { VOUCHERS } from '../data/menuData';
import { 
  X, 
  Trash2, 
  Plus, 
  Minus, 
  ShoppingBag, 
  Tag, 
  Check, 
  MapPin, 
  Truck, 
  Store, 
  ExternalLink, 
  AlertCircle,
  Sparkles,
  ArrowRight,
  User,
  Phone
} from 'lucide-react';
import confetti from 'canvas-confetti';
import { OrderProcessingAnimation } from './OrderProcessingAnimation';
import { playPopSound, playCrunchSound } from '../utils/sound';
import { useLanguage } from '../context/LanguageContext';

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
  const { language, t } = useLanguage();
  const [orderType, setOrderType] = useState<'delivery' | 'pickup'>('delivery');
  const [selectedBranchId, setSelectedBranchId] = useState<string>(BRANCHES[0].id);
  const [deliveryAddress, setDeliveryAddress] = useState<string>('');
  const [customerName, setCustomerName] = useState<string>('');
  const [customerPhone, setCustomerPhone] = useState<string>('');
  const [voucherCodeInput, setVoucherCodeInput] = useState<string>('');
  const [appliedVoucher, setAppliedVoucher] = useState<PromoVoucher | null>(null);
  const [voucherError, setVoucherError] = useState<string>('');
  const [formError, setFormError] = useState<string>('');

  // Lottie checkout loading state
  const [isCheckingOut, setIsCheckingOut] = useState<boolean>(false);
  const [checkoutStep, setCheckoutStep] = useState<number>(1);
  const [checkoutProgress, setCheckoutProgress] = useState<number>(0);
  const [generatedWaUrl, setGeneratedWaUrl] = useState<string>('');

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

  const foodTotal = Math.max(0, rawSubtotal - discount);

  const handleApplyVoucher = () => {
    setVoucherError('');
    const code = voucherCodeInput.trim().toUpperCase();
    const found = VOUCHERS.find((v) => v.code === code);
    if (!found) {
      setVoucherError(t('cart.voucherInvalid'));
      return;
    }
    if (rawSubtotal < found.minSpend) {
      setVoucherError(`${t('cart.voucherMinSpend')} ${code} RM ${found.minSpend.toFixed(2)}.`);
      return;
    }
    setAppliedVoucher(found);
    playPopSound();
    confetti({ particleCount: 50, spread: 45 });
  };

  const handleCheckoutWhatsApp = () => {
    if (cart.length === 0) return;
    setFormError('');

    // Validation rules
    if (!customerName.trim()) {
      setFormError(t('cart.validationName'));
      return;
    }

    if (!customerPhone.trim()) {
      setFormError(t('cart.validationPhone'));
      return;
    }

    if (orderType === 'delivery' && !deliveryAddress.trim()) {
      setFormError(t('cart.validationAddress'));
      return;
    }

    playCrunchSound();
    confetti({ particleCount: 100, spread: 70, origin: { y: 0.6 } });

    const selectedBranch = BRANCHES.find((b) => b.id === selectedBranchId) || BRANCHES[0];

    let msg = '';
    if (language === 'en') {
      msg += `🍗 *HEMZAL CRISPY CHICKEN OFFICIAL ORDER*\n`;
      msg += `----------------------------------------\n`;
      msg += `👤 *Customer Name:* ${customerName.trim()}\n`;
      msg += `📞 *Phone Number:* ${customerPhone.trim()}\n`;
      msg += `📌 *Order Type:* ${orderType === 'delivery' ? 'Delivery (Grab Express / Lalamove)' : `Self Pickup at Outlet (${selectedBranch.name})`}\n`;
      
      if (orderType === 'delivery') {
        msg += `🏠 *Delivery Address:* ${deliveryAddress.trim()}\n`;
        msg += `🛵 *Delivery Method:* Grab Express / Lalamove (Real-time rates)\n`;
      }

      msg += `----------------------------------------\n`;
      msg += `🛒 *ORDERED ITEMS:*\n`;

      cart.forEach((item, index) => {
        const portionText = item.selectedPortion ? ` (${item.selectedPortion.label})` : '';
        const itemName = item.item.nameEn || item.item.name;
        msg += `\n*${index + 1}. ${itemName}${portionText}* (x${item.quantity})\n`;
        if (item.selectedDip) msg += `   • Sauce / Dip: ${item.selectedDip}\n`;
        if (item.selectedAddons.length > 0) {
          msg += `   • Add-Ons: ${item.selectedAddons.map(a => `${a.name} (+RM${a.price.toFixed(2)})`).join(', ')}\n`;
        }
        if (item.specialInstructions) {
          msg += `   • Note: "${item.specialInstructions}"\n`;
        }
        msg += `   • Item Subtotal: RM ${item.totalPrice.toFixed(2)}\n`;
      });

      msg += `\n----------------------------------------\n`;
      msg += `💵 *Food Subtotal:* RM ${rawSubtotal.toFixed(2)}\n`;
      if (discount > 0) {
        msg += `🏷️ *Voucher Discount (${appliedVoucher?.code}):* -RM ${discount.toFixed(2)}\n`;
      }
      if (orderType === 'delivery') {
        msg += `🛵 *Delivery Fee:* Based on Grab / Lalamove live distance\n`;
        msg += `🔥 *TOTAL FOOD:* *RM ${foodTotal.toFixed(2)}* (+ Rider Fare)\n`;
      } else {
        msg += `🔥 *TOTAL PAYABLE:* *RM ${foodTotal.toFixed(2)}*\n`;
      }
      msg += `----------------------------------------\n`;
      msg += `Please confirm my order and prepare it fresh. Thank you! 🙏`;
    } else {
      msg += `🍗 *PESANAN HEMZAL CRISPY CHICKEN*\n`;
      msg += `----------------------------------------\n`;
      msg += `👤 *Nama Pelanggan:* ${customerName.trim()}\n`;
      msg += `📞 *Telefon:* ${customerPhone.trim()}\n`;
      msg += `📌 *Jenis Pesanan:* ${orderType === 'delivery' ? 'Penghantaran (Grab / Lalamove Delivery)' : `Ambil Sendiri di Outlet (${selectedBranch.name})`}\n`;
      
      if (orderType === 'delivery') {
        msg += `🏠 *Alamat Hantar:* ${deliveryAddress.trim()}\n`;
        msg += `🛵 *Kaedah Penghantaran:* Grab Express / Lalamove (Kadar Semasa)\n`;
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
        msg += `🛵 *Caj Penghantaran:* Mengikut caj sebenar Grab / Lalamove (disemak mengikut jarak)\n`;
        msg += `🔥 *JUMLAH MAKANAN:* *RM ${foodTotal.toFixed(2)}* (+ Caj Grab/Lalamove)\n`;
      } else {
        msg += `🔥 *JUMLAH KESELURUHAN:* *RM ${foodTotal.toFixed(2)}*\n`;
      }
      msg += `----------------------------------------\n`;
      msg += `Mohon sahkan pesanan dan sediakan hidangan panas. Terima kasih! 🙏`;
    }

    const targetPhone = '601121992135';
    const waUrl = `https://wa.me/${targetPhone}?text=${encodeURIComponent(msg)}`;
    setGeneratedWaUrl(waUrl);

    setIsCheckingOut(true);
    setCheckoutStep(1);
    setCheckoutProgress(15);
  };

  useEffect(() => {
    if (!isCheckingOut) return;

    const timer1 = setTimeout(() => {
      setCheckoutStep(2);
      setCheckoutProgress(55);
    }, 600);

    const timer2 = setTimeout(() => {
      setCheckoutStep(3);
      setCheckoutProgress(90);
    }, 1200);

    const timer3 = setTimeout(() => {
      setCheckoutProgress(100);
      if (generatedWaUrl) {
        window.open(generatedWaUrl, '_blank');
      }
    }, 1800);

    return () => {
      clearTimeout(timer1);
      clearTimeout(timer2);
      clearTimeout(timer3);
    };
  }, [isCheckingOut, generatedWaUrl]);

  if (!isOpen) return null;

  const totalItemsCount = cart.reduce((sum, item) => sum + item.quantity, 0);

  return (
    <div className="fixed inset-0 z-50 flex justify-end bg-black/50 backdrop-blur-xs animate-in fade-in duration-200">
      
      {/* Drawer Container with proper flex column layout */}
      <div className="relative w-full max-w-md bg-white border-l border-neutral-200 text-neutral-900 h-full flex flex-col shadow-2xl overflow-hidden">
        
        {/* Compact Header (Signature #FDB913) */}
        <div className="px-5 py-4 border-b border-amber-500/20 bg-[#FDB913] flex items-center justify-between shrink-0">
          <div className="flex items-center gap-2.5">
            <div className="w-8 h-8 rounded-xl bg-neutral-900 flex items-center justify-center text-[#FDB913] shadow-sm">
              <ShoppingBag className="w-4 h-4" />
            </div>
            <div>
              <h3 className="font-black text-sm uppercase tracking-wide text-neutral-900">
                {t('cart.title')}
              </h3>
              <p className="text-[11px] text-neutral-800 font-bold">
                {totalItemsCount} {t('cart.itemsCount')}
              </p>
            </div>
          </div>

          <div className="flex items-center gap-1">
            {cart.length > 0 && (
              <button
                type="button"
                onClick={() => {
                  playPopSound();
                  onClearCart();
                }}
                className="px-2.5 py-1.5 text-xs text-neutral-800 hover:text-red-700 font-bold rounded-lg hover:bg-black/10 transition-colors flex items-center gap-1 cursor-pointer"
                title={t('common.clear')}
              >
                <Trash2 className="w-3.5 h-3.5" />
                <span className="hidden sm:inline">{t('common.clear')}</span>
              </button>
            )}
            <button
              type="button"
              onClick={onClose}
              className="p-2 text-neutral-800 hover:text-black rounded-lg hover:bg-black/10 transition-colors cursor-pointer"
              aria-label={t('common.close')}
            >
              <X className="w-5 h-5" />
            </button>
          </div>
        </div>

        {/* Scrollable Body: Cart Items FIRST, followed by Order Info & Voucher */}
        <div
          data-lenis-prevent
          className="flex-1 min-h-0 overflow-y-auto p-4 sm:p-5 space-y-5 custom-scrollbar bg-neutral-50/70"
        >
          {cart.length === 0 ? (
            <div className="py-20 flex flex-col items-center justify-center text-center p-6 space-y-4">
              <div className="w-16 h-16 rounded-full bg-amber-500/15 flex items-center justify-center text-[#D97706] shadow-sm">
                <ShoppingBag className="w-8 h-8" />
              </div>
              <div className="space-y-1">
                <h4 className="font-black text-base text-neutral-900">{t('cart.emptyTitle')}</h4>
                <p className="text-xs text-neutral-600 max-w-xs leading-relaxed">
                  {t('cart.emptySubtitle')}
                </p>
              </div>
              <button
                type="button"
                onClick={onClose}
                className="px-5 py-2.5 rounded-xl bg-[#E31E24] hover:bg-[#FDB913] text-white hover:text-black font-black text-xs uppercase tracking-wider transition-all cursor-pointer shadow-md"
              >
                {language === 'en' ? 'Explore Menu' : 'Pilih Menu Sekarang'}
              </button>
            </div>
          ) : (
            <>
              {/* 1. ORDER TYPE & RECIPIENT DETAILS (KAEDAH & MAKLUMAT PENGHANTARAN) */}
              <div className="bg-white p-4 sm:p-5 rounded-2xl border border-neutral-200 shadow-sm space-y-4">
                <div className="flex items-center justify-between">
                  <span className="text-xs font-black uppercase tracking-wider text-neutral-800 flex items-center gap-1.5">
                    <Truck className="w-3.5 h-3.5 text-[#E31E24]" />
                    {language === 'en' ? 'Fulfillment & Delivery Details' : 'Kaedah & Maklumat Penghantaran'}
                  </span>
                  <span className="text-[10px] font-bold text-amber-800 bg-amber-500/15 px-2 py-0.5 rounded-full border border-amber-500/30">
                    {orderType === 'delivery' 
                      ? (language === 'en' ? 'Rider Delivery' : 'Penghantaran Rider') 
                      : (language === 'en' ? 'Self Pickup' : 'Ambil di Cawangan')}
                  </span>
                </div>

                {/* Delivery vs Pickup Selector */}
                <div className="grid grid-cols-2 gap-2 p-1 bg-neutral-100 rounded-2xl border border-neutral-200/80">
                  <button
                    type="button"
                    onClick={() => {
                      playPopSound();
                      setOrderType('delivery');
                      if (formError) setFormError('');
                    }}
                    className={`py-2.5 px-3 rounded-xl text-xs font-black uppercase tracking-wider flex items-center justify-center gap-2 transition-all cursor-pointer ${
                      orderType === 'delivery'
                        ? 'bg-[#FDB913] text-neutral-900 shadow-sm border border-amber-500/40'
                        : 'text-neutral-600 hover:text-neutral-900 hover:bg-neutral-200/60'
                    }`}
                  >
                    <Truck className="w-3.5 h-3.5" />
                    <span>{t('cart.deliveryTab')}</span>
                  </button>

                  <button
                    type="button"
                    onClick={() => {
                      playPopSound();
                      setOrderType('pickup');
                      if (formError) setFormError('');
                    }}
                    className={`py-2.5 px-3 rounded-xl text-xs font-black uppercase tracking-wider flex items-center justify-center gap-2 transition-all cursor-pointer ${
                      orderType === 'pickup'
                        ? 'bg-[#FDB913] text-neutral-900 shadow-sm border border-amber-500/40'
                        : 'text-neutral-600 hover:text-neutral-900 hover:bg-neutral-200/60'
                    }`}
                  >
                    <Store className="w-3.5 h-3.5" />
                    <span>{t('cart.pickupTab')}</span>
                  </button>
                </div>

                {/* Branch Selection */}
                <div className="space-y-1">
                  <label className="text-[11px] font-black uppercase tracking-wider text-neutral-600 flex items-center gap-1">
                    <MapPin className="w-3 h-3 text-[#D97706]" /> {t('cart.selectBranch')}
                  </label>
                  <select
                    value={selectedBranchId}
                    onChange={(e) => setSelectedBranchId(e.target.value)}
                    className="w-full bg-neutral-50 border border-neutral-300 rounded-xl px-3 py-2 text-xs font-bold text-neutral-800 focus:outline-none focus:border-[#D97706] focus:bg-white shadow-2xs"
                  >
                    {BRANCHES.map((b) => (
                      <option key={b.id} value={b.id}>
                        {b.name} ({b.city})
                      </option>
                    ))}
                  </select>
                </div>

                {/* Delivery Address Field */}
                {orderType === 'delivery' && (
                  <div className="space-y-1 animate-in fade-in duration-200">
                    <label className="text-[11px] font-black uppercase tracking-wider text-neutral-600 flex items-center gap-1">
                      <Truck className="w-3 h-3 text-[#E31E24]" /> {t('cart.deliveryAddress')} <span className="text-[#E31E24]">*</span>
                    </label>
                    <textarea
                      rows={2}
                      value={deliveryAddress}
                      onChange={(e) => {
                        setDeliveryAddress(e.target.value);
                        if (formError) setFormError('');
                      }}
                      placeholder={t('cart.deliveryAddressPlaceholder')}
                      className="w-full bg-neutral-50 border border-neutral-300 rounded-xl px-3 py-2 text-xs text-neutral-800 placeholder:text-neutral-400 focus:outline-none focus:border-[#D97706] focus:bg-white resize-none shadow-2xs"
                    />
                  </div>
                )}

                {/* Customer Contact Info */}
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-2.5 pt-1 border-t border-neutral-100">
                  <div className="space-y-1">
                    <label className="text-[10px] font-black uppercase tracking-wider text-neutral-600 flex items-center gap-1">
                      <User className="w-3 h-3 text-[#D97706]" /> {t('contact.formName')} <span className="text-[#E31E24]">*</span>
                    </label>
                    <input
                      type="text"
                      required
                      value={customerName}
                      onChange={(e) => {
                        setCustomerName(e.target.value);
                        if (formError) setFormError('');
                      }}
                      placeholder={t('cart.namePlaceholder')}
                      className="w-full bg-neutral-50 border border-neutral-300 rounded-xl px-3 py-2 text-xs text-neutral-800 placeholder:text-neutral-400 focus:outline-none focus:border-[#D97706] focus:bg-white shadow-2xs"
                    />
                  </div>

                  <div className="space-y-1">
                    <label className="text-[10px] font-black uppercase tracking-wider text-neutral-600 flex items-center gap-1">
                      <Phone className="w-3 h-3 text-[#D97706]" /> {t('contact.formPhone')} <span className="text-[#E31E24]">*</span>
                    </label>
                    <input
                      type="tel"
                      required
                      value={customerPhone}
                      onChange={(e) => {
                        setCustomerPhone(e.target.value);
                        if (formError) setFormError('');
                      }}
                      placeholder={t('cart.phonePlaceholder')}
                      className="w-full bg-neutral-50 border border-neutral-300 rounded-xl px-3 py-2 text-xs text-neutral-800 placeholder:text-neutral-400 focus:outline-none focus:border-[#D97706] focus:bg-white shadow-2xs"
                    />
                  </div>
                </div>

                {/* Preparation Time Notice */}
                <div className="text-[10px] text-neutral-500 bg-neutral-50 px-2.5 py-1.5 rounded-lg border border-neutral-200/60 flex items-center justify-between">
                  <span>🕒 {language === 'en' ? 'Estimated Kitchen Prep Time:' : 'Anggaran Masa Penyediaan Dapur:'}</span>
                  <span className="font-bold text-neutral-800">15 – 25 {language === 'en' ? 'Mins' : 'Minit'}</span>
                </div>
              </div>

              {/* 2. CART ITEMS SECTION (PLACED UNDER KAEDAH & MAKLUMAT PENGHANTARAN) */}
              <div className="space-y-3">
                <div className="flex items-center justify-between px-0.5">
                  <span className="text-xs font-black uppercase tracking-wider text-neutral-700 flex items-center gap-1.5">
                    <Sparkles className="w-3.5 h-3.5 text-[#D97706]" />
                    {language === 'en' ? 'Your Ordered Items' : 'Item Pesanan Anda'}
                  </span>
                  <span className="text-[11px] font-bold text-[#B45309] bg-amber-500/10 px-2 py-0.5 rounded-full border border-amber-500/20">
                    {totalItemsCount} {language === 'en' ? 'Pcs / Sets' : 'Set'}
                  </span>
                </div>

                <div className="space-y-2.5">
                  {cart.map((cartItem) => {
                    const itemName = (language === 'en' && cartItem.item.nameEn) ? cartItem.item.nameEn : cartItem.item.name;
                    return (
                      <div
                        key={cartItem.cartId}
                        className="bg-white p-3.5 sm:p-4 rounded-2xl border border-neutral-200/90 hover:border-amber-400/50 shadow-sm space-y-3 transition-all"
                      >
                        <div className="flex items-start gap-3">
                          <img
                            src={cartItem.item.image}
                            alt={itemName}
                            className="w-16 h-16 rounded-xl object-cover shrink-0 bg-neutral-100 border border-neutral-200 shadow-2xs"
                          />
                          <div className="flex-1 min-w-0 pr-2">
                            <h4 className="font-black text-sm text-neutral-900 leading-snug">
                              {itemName}
                            </h4>
                            
                            <div className="text-xs text-[#B45309] font-bold flex items-center gap-1.5 mt-0.5">
                              {cartItem.selectedPortion && (
                                <span className="bg-amber-500/15 text-[#B45309] px-2 py-0.5 rounded font-black text-[10px]">
                                  {cartItem.selectedPortion.label}
                                </span>
                              )}
                              <span>RM {(cartItem.totalPrice / cartItem.quantity).toFixed(2)}</span>
                            </div>

                            {/* Dip info */}
                            {cartItem.selectedDip && (
                              <p className="text-[11px] text-neutral-600 mt-1 flex items-center gap-1 font-medium">
                                <span className="w-1.5 h-1.5 rounded-full bg-[#FDB913] shrink-0" />
                                <span className="truncate">{cartItem.selectedDip}</span>
                              </p>
                            )}

                            {/* Addons info */}
                            {cartItem.selectedAddons.length > 0 && (
                              <p className="text-[11px] text-neutral-500 mt-0.5 truncate">
                                + {cartItem.selectedAddons.map((a) => a.name).join(', ')}
                              </p>
                            )}

                            {/* Special Note */}
                            {cartItem.specialInstructions && (
                              <p className="text-[10px] text-neutral-500 italic mt-0.5 truncate">
                                ✍️ "{cartItem.specialInstructions}"
                              </p>
                            )}
                          </div>

                          <button
                            type="button"
                            onClick={() => onRemoveItem(cartItem.cartId)}
                            className="text-neutral-400 hover:text-red-600 transition-colors p-1.5 rounded-lg hover:bg-red-50"
                            title={t('common.clear')}
                          >
                            <Trash2 className="w-4 h-4" />
                          </button>
                        </div>

                        {/* Quantity and Line Total */}
                        <div className="flex items-center justify-between pt-2.5 border-t border-neutral-100">
                          <div className="flex items-center bg-neutral-100 rounded-xl border border-neutral-200/80 p-0.5">
                            <button
                              type="button"
                              onClick={() => onUpdateQuantity(cartItem.cartId, -1)}
                              className="w-7 h-7 rounded-lg flex items-center justify-center text-neutral-700 hover:bg-white hover:text-black cursor-pointer transition-colors shadow-2xs"
                              aria-label="Decrease"
                            >
                              <Minus className="w-3.5 h-3.5" />
                            </button>
                            <span className="w-8 text-center font-black text-xs text-neutral-900">
                              {cartItem.quantity}
                            </span>
                            <button
                              type="button"
                              onClick={() => onUpdateQuantity(cartItem.cartId, 1)}
                              className="w-7 h-7 rounded-lg flex items-center justify-center text-neutral-700 hover:bg-white hover:text-black cursor-pointer transition-colors shadow-2xs"
                              aria-label="Increase"
                            >
                              <Plus className="w-3.5 h-3.5" />
                            </button>
                          </div>

                          <strong className="text-base font-black text-[#D97706]">
                            RM {cartItem.totalPrice.toFixed(2)}
                          </strong>
                        </div>
                      </div>
                    );
                  })}
                </div>
              </div>

              {/* 3. PROMO VOUCHER SECTION */}
              <div className="bg-white p-4 rounded-2xl border border-neutral-200 shadow-sm space-y-2.5">
                <label className="text-xs font-black text-neutral-700 uppercase flex items-center gap-1.5">
                  <Tag className="w-3.5 h-3.5 text-[#D97706]" /> {t('cart.voucherTitle')}
                </label>

                {appliedVoucher ? (
                  <div className="flex items-center justify-between bg-emerald-500/15 border border-emerald-500/30 px-3.5 py-2.5 rounded-xl text-xs text-emerald-800 font-bold">
                    <div className="flex items-center gap-2">
                      <Check className="w-4 h-4 text-emerald-600" />
                      <span>{appliedVoucher.code} ({t('cart.voucherApplied')})</span>
                    </div>
                    <button
                      type="button"
                      onClick={() => setAppliedVoucher(null)}
                      className="text-neutral-500 hover:text-neutral-900 font-black text-xs underline cursor-pointer"
                    >
                      {t('common.clear')}
                    </button>
                  </div>
                ) : (
                  <div className="flex gap-2">
                    <input
                      type="text"
                      value={voucherCodeInput}
                      onChange={(e) => setVoucherCodeInput(e.target.value)}
                      placeholder={t('cart.voucherPlaceholder')}
                      className="flex-1 px-3 py-2 bg-neutral-50 border border-neutral-300 rounded-xl text-xs text-neutral-900 uppercase placeholder:text-neutral-400 focus:outline-none focus:border-[#D97706] focus:bg-white shadow-2xs"
                    />
                    <button
                      type="button"
                      onClick={handleApplyVoucher}
                      className="px-4 py-2 bg-[#FDB913] hover:bg-yellow-400 text-neutral-900 font-black text-xs rounded-xl transition-colors cursor-pointer shadow-xs"
                    >
                      {t('cart.applyVoucher')}
                    </button>
                  </div>
                )}

                {voucherError && (
                  <p className="text-[11px] text-red-500 font-bold">{voucherError}</p>
                )}
              </div>

              {/* 4. PRICE BREAKDOWN */}
              <div className="bg-white p-4 rounded-2xl border border-neutral-200/80 shadow-2xs space-y-2 text-xs text-neutral-600">
                <div className="flex justify-between">
                  <span>{t('cart.subtotal')}</span>
                  <span className="font-bold text-neutral-900">RM {rawSubtotal.toFixed(2)}</span>
                </div>

                {discount > 0 && (
                  <div className="flex justify-between text-emerald-700 font-black">
                    <span>{t('cart.discount')} ({appliedVoucher?.code})</span>
                    <span>- RM {discount.toFixed(2)}</span>
                  </div>
                )}

                <div className="pt-2 border-t border-neutral-100 flex justify-between text-neutral-500 text-[11px] leading-relaxed">
                  <span>{orderType === 'delivery' ? 'Penghantaran / Delivery' : 'Pengambilan / Pickup'}</span>
                  <span className="font-medium text-neutral-700">
                    {orderType === 'delivery' ? 'Grab / Lalamove (Kadar Semasa)' : 'Percuma di Outlet'}
                  </span>
                </div>
              </div>
            </>
          )}
        </div>

        {/* Sticky Bottom Bar (Clean, Compact & Spacious) */}
        {cart.length > 0 && (
          <div className="p-4 sm:p-5 border-t border-neutral-200 bg-white space-y-3 shadow-xl shrink-0">
            
            {/* Total Row */}
            <div className="flex justify-between items-baseline">
              <div>
                <span className="text-[11px] font-black uppercase text-neutral-500 tracking-wider block">
                  {t('cart.totalPayable')}
                </span>
                <span className="text-[10px] text-neutral-400">
                  {orderType === 'delivery' ? '+ Tambang rider semasa' : 'Termasuk cukai & perapan'}
                </span>
              </div>
              <div className="text-right">
                <span className="text-2xl font-black text-[#D97706]">
                  RM {foodTotal.toFixed(2)}
                </span>
              </div>
            </div>

            {/* Validation Notice Banner */}
            {formError && (
              <div className="p-2.5 bg-red-500/15 border border-red-500/30 rounded-xl flex items-center gap-2 text-xs text-red-600 font-bold animate-in fade-in duration-200">
                <AlertCircle className="w-4 h-4 shrink-0 text-red-600" />
                <span>{formError}</span>
              </div>
            )}

            {/* Direct WhatsApp Checkout Button */}
            <button
              type="button"
              onClick={handleCheckoutWhatsApp}
              className="w-full py-3.5 px-5 rounded-2xl bg-gradient-to-r from-[#25D366] to-[#128C7E] hover:from-[#20ba5a] hover:to-[#0f7a6c] active:scale-[0.99] text-white font-black text-xs sm:text-sm uppercase tracking-wider flex items-center justify-center gap-2.5 shadow-lg shadow-[#25D366]/30 transition-all cursor-pointer"
            >
              <ExternalLink className="w-4 h-4" />
              <span>{t('cart.checkoutWhatsApp')}</span>
            </button>
          </div>
        )}

      </div>

      {/* Lottie-Based Checkout Loading Overlay */}
      {isCheckingOut && (
        <div className="fixed inset-0 z-[60] bg-black/50 backdrop-blur-xs flex items-center justify-center p-4 animate-in fade-in zoom-in-95 duration-200">
          <div className="bg-white border border-neutral-200 rounded-3xl p-6 sm:p-8 max-w-sm w-full text-center space-y-4 shadow-2xl relative">
            
            {/* Lottie Animation Canvas */}
            <OrderProcessingAnimation step={checkoutStep} />

            <div className="space-y-1">
              <h4 className="font-black text-lg text-neutral-900 uppercase tracking-tight">
                {checkoutStep === 1 && t('cart.checkoutStep1')}
                {checkoutStep === 2 && t('cart.checkoutStep2')}
                {checkoutStep === 3 && t('cart.checkoutStep3')}
              </h4>
              <p className="text-xs text-neutral-500">
                {checkoutStep === 1 && 'Sila tunggu sebentar...'}
                {checkoutStep === 2 && 'Membina pautan mesej terperinci...'}
                {checkoutStep === 3 && 'WhatsApp web / aplikasi sedang dimuatkan...'}
              </p>
            </div>

            {/* Progress bar */}
            <div className="w-full bg-neutral-200 h-2 rounded-full overflow-hidden">
              <div
                className="h-full bg-[#FDB913] rounded-full transition-all duration-300 ease-out"
                style={{ width: `${checkoutProgress}%` }}
              />
            </div>

            {/* Direct fallback button */}
            {generatedWaUrl && (
              <a
                href={generatedWaUrl}
                target="_blank"
                rel="noopener noreferrer"
                onClick={() => {
                  setIsCheckingOut(false);
                }}
                className="w-full py-3 px-4 rounded-xl bg-[#FDB913] hover:bg-yellow-400 text-neutral-900 font-black text-xs uppercase tracking-wider flex items-center justify-center gap-2 shadow-md transition-all cursor-pointer"
              >
                <ExternalLink className="w-4 h-4" />
                <span>{t('cart.openWhatsAppNow')}</span>
              </a>
            )}

            <button
              type="button"
              onClick={() => setIsCheckingOut(false)}
              className="text-xs text-neutral-500 hover:text-neutral-900 font-bold block mx-auto pt-1 cursor-pointer"
            >
              {t('common.close')}
            </button>
          </div>
        </div>
      )}

    </div>
  );
};
