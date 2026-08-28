import React, { useState, useMemo } from 'react';
import { MenuItem, SpiceLevel, CustomizationOption, CartItem, PortionOption } from '../types';
import { X, Plus, Minus, Flame, Check, Sparkles, MessageSquare, ShoppingBag, Layers, Info } from 'lucide-react';
import { playPopSound, playCrunchSound } from '../utils/sound';

interface ItemCustomizerModalProps {
  item: MenuItem | null;
  onClose: () => void;
  onAddToCart: (cartItem: CartItem) => void;
  initialPortion?: PortionOption;
}

export const ItemCustomizerModal: React.FC<ItemCustomizerModalProps> = ({
  item,
  onClose,
  onAddToCart,
  initialPortion,
}) => {
  if (!item) return null;

  const spiceOptions: SpiceLevel[] = [
    'Biasa (Mild)',
    'Pedas Padu (Spicy)',
    'Extra Berapi 🔥🔥',
    'Tanpa Pedas (Zero Spice)',
  ];

  const defaultPortion = initialPortion || (item.portions && item.portions.length > 0 ? item.portions[0] : undefined);
  const [selectedPortion, setSelectedPortion] = useState<PortionOption | undefined>(defaultPortion);

  const defaultDip = item.availableDips?.[0] || 'Sos Cili';
  const [selectedSpice, setSelectedSpice] = useState<SpiceLevel>(
    item.spiceLevel === 3
      ? 'Extra Berapi 🔥🔥'
      : item.spiceLevel === 0
      ? 'Tanpa Pedas (Zero Spice)'
      : 'Pedas Padu (Spicy)'
  );
  const [selectedDip, setSelectedDip] = useState<string>(defaultDip);
  const [selectedAddons, setSelectedAddons] = useState<CustomizationOption[]>([]);
  const [specialInstructions, setSpecialInstructions] = useState<string>('');
  const [quantity, setQuantity] = useState<number>(1);

  const toggleAddon = (addon: CustomizationOption) => {
    playPopSound();
    if (selectedAddons.some((a) => a.id === addon.id)) {
      setSelectedAddons(selectedAddons.filter((a) => a.id !== addon.id));
    } else {
      setSelectedAddons([...selectedAddons, addon]);
    }
  };

  const basePrice = selectedPortion ? selectedPortion.price : item.price;

  const unitPrice = useMemo(() => {
    const addonsTotal = selectedAddons.reduce((sum, a) => sum + a.price, 0);
    return basePrice + addonsTotal;
  }, [basePrice, selectedAddons]);

  const totalPrice = useMemo(() => {
    return unitPrice * quantity;
  }, [unitPrice, quantity]);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    playCrunchSound();
    const newCartItem: CartItem = {
      cartId: `${item.id}-${selectedPortion?.label || 'default'}-${Date.now()}`,
      item,
      quantity,
      selectedPortion,
      selectedSpice,
      selectedDip,
      selectedAddons,
      specialInstructions: specialInstructions.trim() || undefined,
      totalPrice,
    };
    onAddToCart(newCartItem);
    onClose();
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-sm overflow-y-auto animate-in fade-in duration-200">
      
      {/* Modal Container */}
      <div className="relative w-full max-w-lg bg-[#141418] border border-white/15 rounded-3xl shadow-2xl overflow-hidden text-white my-8 flex flex-col max-h-[90vh]">
        
        {/* Header with Image */}
        <div className="relative h-48 w-full bg-[#1c1c22] shrink-0">
          <img
            src={item.image}
            alt={item.name}
            className="w-full h-full object-cover"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-[#141418] via-transparent to-black/50" />

          {/* Close Button */}
          <button
            onClick={onClose}
            className="absolute top-3.5 right-3.5 w-9 h-9 rounded-full bg-black/60 hover:bg-black text-white flex items-center justify-center border border-white/20 transition-all cursor-pointer"
            aria-label="Tutup modal"
          >
            <X className="w-5 h-5" />
          </button>

          {/* Title on bottom of image */}
          <div className="absolute bottom-3 left-4 right-4">
            <span className="text-[10px] text-[#FDB913] font-bold uppercase tracking-wider">
              Pilihan Pakej & Kustomisasi
            </span>
            <h3 className="text-xl font-black text-white">{item.name}</h3>
            <p className="text-xs text-neutral-300 font-medium">
              Harga: <span className="text-[#FDB913] font-bold">RM {basePrice.toFixed(2)}</span>
              {selectedPortion && <span className="ml-1 text-white/80">({selectedPortion.label})</span>}
            </p>
          </div>
        </div>

        {/* Scrollable Form Body */}
        <form onSubmit={handleSubmit} className="p-5 overflow-y-auto space-y-5 flex-1 text-sm">
          
          {/* Item Description & Included details */}
          <div className="bg-white/5 p-3.5 rounded-2xl border border-white/5 space-y-1.5">
            <p className="text-xs text-neutral-300 leading-relaxed">
              {item.description}
            </p>
            {item.sauceInfo && (
              <p className="text-[11px] text-[#FDB913] font-semibold flex items-center gap-1.5">
                <Sparkles className="w-3.5 h-3.5" /> Termasuk: {item.sauceInfo}
              </p>
            )}
          </div>

          {/* Special Bucket Included Items Checklist (if applicable) */}
          {item.includedItems && item.includedItems.length > 0 && (
            <div className="bg-[#1c1c24] p-3.5 rounded-2xl border border-[#FDB913]/30 space-y-2">
              <span className="text-xs font-black uppercase text-[#FDB913] flex items-center gap-1.5">
                <Sparkles className="w-3.5 h-3.5" /> Kandungan Pakej Lengkap:
              </span>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-1.5 text-xs text-neutral-200">
                {item.includedItems.map((inc, i) => (
                  <div key={i} className="flex items-center gap-1.5 bg-black/40 px-2.5 py-1.5 rounded-lg">
                    <Check className="w-3.5 h-3.5 text-emerald-400 shrink-0" />
                    <span className="text-[11px]">{inc}</span>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* 1. Pilih Saiz Bahagian / Portion (2 PCS / 6 PCS / 10 PCS) */}
          {item.portions && item.portions.length > 0 && (
            <div className="space-y-2.5">
              <label className="text-xs font-black uppercase tracking-wider text-neutral-300 flex items-center justify-between">
                <span className="flex items-center gap-1.5">
                  <Layers className="w-4 h-4 text-[#FDB913]" /> 1. Pilih Kuantiti Ketul (PCS)
                </span>
                <span className="text-[11px] text-[#FDB913] font-normal">Wajib</span>
              </label>
              <div className="grid grid-cols-3 gap-2">
                {item.portions.map((portion) => {
                  const isSelected = selectedPortion?.label === portion.label;
                  return (
                    <button
                      type="button"
                      key={portion.label}
                      onClick={() => {
                        playPopSound();
                        setSelectedPortion(portion);
                      }}
                      className={`p-3 rounded-2xl border text-center transition-all cursor-pointer relative flex flex-col justify-between ${
                        isSelected
                          ? 'bg-gradient-to-b from-[#E31E24]/30 to-[#E31E24]/10 border-[#E31E24] text-white shadow-md'
                          : 'bg-[#1a1a20] border-white/10 text-neutral-300 hover:border-white/30'
                      }`}
                    >
                      {portion.isPopular && (
                        <span className="absolute -top-2 left-1/2 -translate-x-1/2 bg-[#FDB913] text-black text-[9px] font-black px-1.5 py-0.2 rounded-full uppercase leading-none">
                          Popular
                        </span>
                      )}
                      <span className="text-sm font-black tracking-wide block">{portion.label}</span>
                      <span className="text-xs font-bold text-[#FDB913] mt-1">RM {portion.price.toFixed(2)}</span>
                    </button>
                  );
                })}
              </div>
            </div>
          )}

          {/* 2. Pilih Tahap Kepedasan */}
          <div className="space-y-2.5">
            <label className="text-xs font-black uppercase tracking-wider text-neutral-300 flex items-center justify-between">
              <span className="flex items-center gap-1.5">
                <Flame className="w-4 h-4 text-[#E31E24]" /> 2. Tahap Kepedasan Ayam
              </span>
              <span className="text-[11px] text-[#FDB913] font-normal">Wajib</span>
            </label>
            <div className="grid grid-cols-2 gap-2">
              {spiceOptions.map((spice) => {
                const isSelected = selectedSpice === spice;
                return (
                  <button
                    type="button"
                    key={spice}
                    onClick={() => {
                      playPopSound();
                      setSelectedSpice(spice);
                    }}
                    className={`p-2.5 rounded-xl border text-xs font-bold text-left transition-all cursor-pointer flex items-center justify-between ${
                      isSelected
                        ? 'bg-[#E31E24]/20 border-[#E31E24] text-white'
                        : 'bg-[#1a1a20] border-white/5 text-neutral-400 hover:border-white/20'
                    }`}
                  >
                    <span>{spice}</span>
                    {isSelected && <Check className="w-3.5 h-3.5 text-[#E31E24]" />}
                  </button>
                );
              })}
            </div>
          </div>

          {/* 3. Pilihan Sos Celup */}
          {item.availableDips && item.availableDips.length > 0 && (
            <div className="space-y-2.5">
              <label className="text-xs font-black uppercase tracking-wider text-neutral-300 flex items-center justify-between">
                <span className="flex items-center gap-1.5">
                  <Sparkles className="w-4 h-4 text-[#FDB913]" /> 3. Sos Celup Utama
                </span>
                <span className="text-[11px] text-[#FDB913] font-normal">Percuma Termasuk</span>
              </label>
              <div className="grid grid-cols-2 gap-2">
                {item.availableDips.map((dip) => {
                  const isSelected = selectedDip === dip;
                  return (
                    <button
                      type="button"
                      key={dip}
                      onClick={() => {
                        playPopSound();
                        setSelectedDip(dip);
                      }}
                      className={`p-2.5 rounded-xl border text-xs font-bold text-left transition-all cursor-pointer flex items-center justify-between ${
                        isSelected
                          ? 'bg-[#FDB913]/20 border-[#FDB913] text-white'
                          : 'bg-[#1a1a20] border-white/5 text-neutral-400 hover:border-white/20'
                      }`}
                    >
                      <span>{dip}</span>
                      {isSelected && <Check className="w-3.5 h-3.5 text-[#FDB913]" />}
                    </button>
                  );
                })}
              </div>
            </div>
          )}

          {/* 4. Tambahan Pilihan (Add-ons seperti Coleslaw Hemzal Special) */}
          {item.options?.addons && item.options.addons.length > 0 && (
            <div className="space-y-2.5">
              <label className="text-xs font-black uppercase tracking-wider text-neutral-300 flex items-center justify-between">
                <span>4. Tambahan Add-On (Coleslaw / Sos)</span>
                <span className="text-[11px] text-neutral-400">Pilihan Bebas</span>
              </label>
              <div className="space-y-2">
                {item.options.addons.map((addon) => {
                  const isChecked = selectedAddons.some((a) => a.id === addon.id);
                  return (
                    <button
                      type="button"
                      key={addon.id}
                      onClick={() => toggleAddon(addon)}
                      className={`w-full p-2.5 rounded-xl border text-xs font-bold text-left transition-all cursor-pointer flex items-center justify-between ${
                        isChecked
                          ? 'bg-white/10 border-white/40 text-white'
                          : 'bg-[#1a1a20] border-white/5 text-neutral-400 hover:border-white/20'
                      }`}
                    >
                      <span className="flex items-center gap-2">
                        <div
                          className={`w-4 h-4 rounded flex items-center justify-center border ${
                            isChecked ? 'bg-[#FDB913] border-[#FDB913] text-black' : 'border-neutral-600'
                          }`}
                        >
                          {isChecked && <Check className="w-3 h-3 stroke-[3]" />}
                        </div>
                        <span>{addon.name}</span>
                      </span>
                      <span className="text-[#FDB913] font-bold">+RM {addon.price.toFixed(2)}</span>
                    </button>
                  );
                })}
              </div>
            </div>
          )}

          {/* 5. Nota Khas / Arahan */}
          <div className="space-y-1.5">
            <label className="text-xs font-bold text-neutral-400 flex items-center gap-1.5">
              <MessageSquare className="w-3.5 h-3.5" /> Nota Khas untuk Dapur (Pilihan)
            </label>
            <input
              type="text"
              value={specialInstructions}
              onChange={(e) => setSpecialInstructions(e.target.value)}
              placeholder="Cth: Nak bahagian drumstick, sos asingkan, dsb."
              className="w-full px-3.5 py-2.5 bg-[#1a1a20] border border-white/10 rounded-xl text-xs text-white placeholder:text-neutral-500 focus:outline-none focus:border-[#FDB913]"
            />
          </div>

          {/* Quantity & Submit Area */}
          <div className="pt-4 border-t border-white/10 flex items-center justify-between gap-3">
            
            {/* Quantity Selector */}
            <div className="flex items-center bg-[#1a1a20] rounded-xl border border-white/10 p-1">
              <button
                type="button"
                onClick={() => {
                  playPopSound();
                  setQuantity(Math.max(1, quantity - 1));
                }}
                className="w-8 h-8 rounded-lg bg-white/5 hover:bg-white/15 flex items-center justify-center text-white cursor-pointer"
                disabled={quantity <= 1}
              >
                <Minus className="w-3.5 h-3.5" />
              </button>
              <span className="w-8 text-center font-black text-sm text-white">
                {quantity}
              </span>
              <button
                type="button"
                onClick={() => {
                  playPopSound();
                  setQuantity(quantity + 1);
                }}
                className="w-8 h-8 rounded-lg bg-white/5 hover:bg-white/15 flex items-center justify-center text-white cursor-pointer"
              >
                <Plus className="w-3.5 h-3.5" />
              </button>
            </div>

            {/* Add to Cart Submit */}
            <button
              type="submit"
              className="flex-1 py-3.5 px-4 rounded-xl bg-gradient-to-r from-[#E31E24] to-[#C1121F] hover:from-[#FDB913] hover:to-[#e39600] text-white hover:text-black font-black text-xs sm:text-sm uppercase tracking-wider flex items-center justify-center gap-2 shadow-lg shadow-[#E31E24]/30 transition-all cursor-pointer"
            >
              <ShoppingBag className="w-4 h-4" />
              <span>Tambah • RM {totalPrice.toFixed(2)}</span>
            </button>

          </div>

        </form>

      </div>

    </div>
  );
};
