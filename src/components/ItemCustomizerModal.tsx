import React, { useState, useMemo } from 'react';
import { MenuItem, SpiceLevel, CustomizationOption, CartItem } from '../types';
import { X, Plus, Minus, Flame, Check, Sparkles, MessageSquare, ShoppingBag } from 'lucide-react';
import { playPopSound, playCrunchSound } from '../utils/sound';

interface ItemCustomizerModalProps {
  item: MenuItem | null;
  onClose: () => void;
  onAddToCart: (cartItem: CartItem) => void;
}

export const ItemCustomizerModal: React.FC<ItemCustomizerModalProps> = ({
  item,
  onClose,
  onAddToCart,
}) => {
  if (!item) return null;

  const spiceOptions: SpiceLevel[] = [
    'Biasa (Mild)',
    'Pedas Padu (Spicy)',
    'Extra Berapi 🔥🔥',
    'Tanpa Pedas (Zero Spice)',
  ];

  const defaultDip = item.availableDips?.[0] || 'Sos Keju Lava';
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

  const unitPrice = useMemo(() => {
    const addonsTotal = selectedAddons.reduce((sum, a) => sum + a.price, 0);
    return item.price + addonsTotal;
  }, [item.price, selectedAddons]);

  const totalPrice = useMemo(() => {
    return unitPrice * quantity;
  }, [unitPrice, quantity]);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    playCrunchSound();
    const newCartItem: CartItem = {
      cartId: `${item.id}-${Date.now()}`,
      item,
      quantity,
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
              Kustomisasi Hidangan
            </span>
            <h3 className="text-xl font-black text-white">{item.name}</h3>
            <p className="text-xs text-neutral-300 font-medium">Asas: RM {item.price.toFixed(2)}</p>
          </div>
        </div>

        {/* Scrollable Form Body */}
        <form onSubmit={handleSubmit} className="p-5 overflow-y-auto space-y-6 flex-1 text-sm">
          
          {/* Item Description */}
          <p className="text-xs text-neutral-300 leading-relaxed bg-white/5 p-3 rounded-xl border border-white/5">
            {item.description}
          </p>

          {/* 1. Pilih Tahap Kepedasan */}
          <div className="space-y-2.5">
            <label className="text-xs font-black uppercase tracking-wider text-neutral-300 flex items-center justify-between">
              <span className="flex items-center gap-1.5">
                <Flame className="w-4 h-4 text-[#E31E24]" /> 1. Tahap Kepedasan
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

          {/* 2. Pilihan Sos Celup Percuma */}
          {item.availableDips && item.availableDips.length > 0 && (
            <div className="space-y-2.5">
              <label className="text-xs font-black uppercase tracking-wider text-neutral-300 flex items-center justify-between">
                <span className="flex items-center gap-1.5">
                  <Sparkles className="w-4 h-4 text-[#FDB913]" /> 2. Sos Celup Utama
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

          {/* 3. Tambahan Pilihan (Add-ons) */}
          {item.options?.addons && item.options.addons.length > 0 && (
            <div className="space-y-2.5">
              <label className="text-xs font-black uppercase tracking-wider text-neutral-300 flex items-center justify-between">
                <span>3. Tambahan Pilihan (Add-ons)</span>
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
                      <span className="text-[#FDB913]">+RM {addon.price.toFixed(2)}</span>
                    </button>
                  );
                })}
              </div>
            </div>
          )}

          {/* 4. Nota Khas / Arahan */}
          <div className="space-y-1.5">
            <label className="text-xs font-bold text-neutral-400 flex items-center gap-1.5">
              <MessageSquare className="w-3.5 h-3.5" /> Nota Khas untuk Dapur (Pilihan)
            </label>
            <input
              type="text"
              value={specialInstructions}
              onChange={(e) => setSpecialInstructions(e.target.value)}
              placeholder="Cth: Sos asingkan, nak drumstick, dsb."
              className="w-full px-3 py-2 bg-[#1a1a20] border border-white/10 rounded-xl text-xs text-white placeholder:text-neutral-500 focus:outline-none focus:border-[#FDB913]"
            />
          </div>

          {/* Quantity & Submit Sticky Area */}
          <div className="pt-4 border-t border-white/10 flex items-center justify-between gap-4">
            
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
              <span>Tambah ke Troli • RM {totalPrice.toFixed(2)}</span>
            </button>

          </div>

        </form>

      </div>

    </div>
  );
};
