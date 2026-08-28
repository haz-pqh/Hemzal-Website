import React, { useState } from 'react';
import { MenuItem } from '../types';
import { Flame, Sparkles, Heart, Users, ShieldAlert, ShoppingBag, ArrowRight } from 'lucide-react';
import { playPopSound, playCrunchSound } from '../utils/sound';

interface CrunchLabProps {
  onSelectItem: (item: MenuItem) => void;
  onQuickAdd: (item: MenuItem) => void;
  items: MenuItem[];
}

export const CrunchLab: React.FC<CrunchLabProps> = ({
  onSelectItem,
  onQuickAdd,
  items,
}) => {
  const [selectedCraving, setSelectedCraving] = useState<string>('cheese');

  const cravings = [
    {
      id: 'cheese',
      label: '🧀 Limpahan Keju Leleh',
      subtitle: 'Untuk peminat keju cheddar & mozzarella berkrim tebal',
      itemId: 'hemzal-cheese-lava',
      accentColor: 'border-[#FDB913]',
    },
    {
      id: 'spicy',
      label: '🔥 Pedas Berapi Terangkat',
      subtitle: 'Cili habanero Korea menyengat dengan aroma bijan',
      itemId: 'korean-habanero-berapi',
      accentColor: 'border-[#E31E24]',
    },
    {
      id: 'family',
      label: '👨‍👩‍👧‍👦 Jamuan Sekeluarga (4-6 Pax)',
      subtitle: 'Bucket 9 ketul ayam mega bersama loaded wedges & coleslaw',
      itemId: 'family-mega-bucket',
      accentColor: 'border-purple-500',
    },
    {
      id: 'classic',
      label: '🍗 Kerangupan Emas Klasik',
      subtitle: 'Resepi asli 18 rempah botani Chef Helmi',
      itemId: 'hemzal-original',
      accentColor: 'border-amber-500',
    },
  ];

  const matchedItem = items.find(
    (i) => i.id === cravings.find((c) => c.id === selectedCraving)?.itemId
  ) || items[0];

  return (
    <section className="py-20 bg-[#09090b] relative overflow-hidden">
      {/* Background Decor */}
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,rgba(253,185,19,0.06),transparent_70%)] pointer-events-none" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto mb-12 space-y-3">
          <div className="inline-flex items-center gap-1.5 bg-[#17171c] border border-[#FDB913]/30 px-3.5 py-1 rounded-full text-xs font-black uppercase tracking-widest text-[#FDB913]">
            <Sparkles className="w-3.5 h-3.5 text-[#FDB913]" />
            <span>Hemzal Flavor Pairing Engine</span>
          </div>

          <h2 className="text-3xl sm:text-5xl font-black text-white uppercase tracking-tight">
            APA <span className="text-[#E31E24]">CRAVING</span> ANDA HARI INI?
          </h2>

          <p className="text-neutral-300 text-sm sm:text-base">
            Pilih mood selera anda dan biarkan sistem kulinari kami mencadangkan hidangan paling padu untuk anda nikmati.
          </p>
        </div>

        {/* Cravings Selector Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 mb-10">
          {cravings.map((craving) => {
            const isSelected = selectedCraving === craving.id;
            return (
              <button
                key={craving.id}
                onClick={() => {
                  playCrunchSound();
                  setSelectedCraving(craving.id);
                }}
                className={`p-5 rounded-2xl border text-left transition-all cursor-pointer flex flex-col justify-between ${
                  isSelected
                    ? 'bg-[#1b1b22] border-[#FDB913] shadow-xl shadow-[#FDB913]/10 scale-102 -translate-y-1'
                    : 'bg-[#131317] border-white/10 hover:border-white/20 text-neutral-300 hover:bg-[#18181d]'
                }`}
              >
                <div>
                  <h3 className={`font-black text-base ${isSelected ? 'text-[#FDB913]' : 'text-white'}`}>
                    {craving.label}
                  </h3>
                  <p className="text-xs text-neutral-400 mt-1.5 leading-relaxed">
                    {craving.subtitle}
                  </p>
                </div>
                <div className="mt-4 flex items-center justify-between text-[11px] font-bold">
                  <span className={isSelected ? 'text-white' : 'text-neutral-500'}>
                    {isSelected ? '★ Pilihan Aktif' : 'Pilih Ini'}
                  </span>
                  <ArrowRight className={`w-3.5 h-3.5 ${isSelected ? 'text-[#FDB913] translate-x-1' : 'text-neutral-600'} transition-transform`} />
                </div>
              </button>
            );
          })}
        </div>

        {/* Selected Recommendation Spotlight Box */}
        {matchedItem && (
          <div className="bg-gradient-to-r from-[#17171e] via-[#141419] to-[#17171e] rounded-3xl border border-[#FDB913]/30 p-6 sm:p-10 shadow-2xl">
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
              
              {/* Photo Showcase */}
              <div className="lg:col-span-5 relative rounded-2xl overflow-hidden shadow-2xl h-64 sm:h-80 bg-neutral-900 border border-white/10 group">
                <img
                  src={matchedItem.image}
                  alt={matchedItem.name}
                  className="w-full h-full object-cover group-hover:scale-108 transition-transform duration-500"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-transparent" />
                <div className="absolute bottom-4 left-4 right-4 flex items-center justify-between">
                  <span className="bg-[#E31E24] text-white text-xs font-black px-3 py-1 rounded-md uppercase">
                    Padanan Sempurna
                  </span>
                  <span className="text-xl font-black text-[#FDB913]">
                    RM {matchedItem.price.toFixed(2)}
                  </span>
                </div>
              </div>

              {/* Details & Action */}
              <div className="lg:col-span-7 space-y-5">
                <div className="space-y-2">
                  <span className="text-xs font-bold text-[#FDB913] uppercase tracking-widest">
                    Cadangan Khas Chef Helmi
                  </span>
                  <h3 className="text-2xl sm:text-4xl font-black text-white leading-tight">
                    {matchedItem.name}
                  </h3>
                  <p className="text-sm font-semibold text-[#FDB913]">
                    {matchedItem.tagline}
                  </p>
                  <p className="text-xs sm:text-sm text-neutral-300 leading-relaxed">
                    {matchedItem.description}
                  </p>
                </div>

                {/* Features Pill */}
                <div className="flex flex-wrap gap-2 pt-2">
                  {matchedItem.servings && (
                    <span className="text-xs bg-white/5 border border-white/10 px-3 py-1 rounded-lg text-neutral-200">
                      👥 {matchedItem.servings}
                    </span>
                  )}
                  {matchedItem.calories && (
                    <span className="text-xs bg-white/5 border border-white/10 px-3 py-1 rounded-lg text-neutral-200">
                      🔥 {matchedItem.calories} kcal
                    </span>
                  )}
                  <span className="text-xs bg-white/5 border border-white/10 px-3 py-1 rounded-lg text-neutral-200">
                    🍗 Potongan Mega 100% Segar
                  </span>
                </div>

                {/* Action Buttons */}
                <div className="flex flex-col sm:flex-row items-center gap-3 pt-2">
                  <button
                    onClick={() => {
                      playPopSound();
                      onQuickAdd(matchedItem);
                    }}
                    className="w-full sm:w-auto px-6 py-3.5 bg-gradient-to-r from-[#E31E24] to-[#C1121F] hover:from-[#FDB913] hover:to-[#e39600] text-white hover:text-black font-black text-xs uppercase tracking-wider rounded-xl shadow-lg shadow-[#E31E24]/30 flex items-center justify-center gap-2 transition-all cursor-pointer"
                  >
                    <ShoppingBag className="w-4 h-4" />
                    <span>Tambah Terus ke Troli</span>
                  </button>

                  <button
                    onClick={() => onSelectItem(matchedItem)}
                    className="w-full sm:w-auto px-6 py-3.5 bg-white/10 hover:bg-white/20 text-white font-bold text-xs uppercase tracking-wider rounded-xl border border-white/10 flex items-center justify-center gap-2 transition-colors cursor-pointer"
                  >
                    <span>Kustomisasi Hidangan Ini</span>
                  </button>
                </div>

              </div>

            </div>
          </div>
        )}

      </div>
    </section>
  );
};
