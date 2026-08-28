import React, { useState, useMemo } from 'react';
import { MenuItem } from '../types';
import { Flame, Star, Search, Plus, Sparkles, Filter, Check, ShoppingBag, Eye } from 'lucide-react';
import { playPopSound } from '../utils/sound';

interface MenuSectionProps {
  items: MenuItem[];
  onSelectItem: (item: MenuItem) => void;
  onQuickAdd: (item: MenuItem) => void;
}

export const MenuSection: React.FC<MenuSectionProps> = ({
  items,
  onSelectItem,
  onQuickAdd,
}) => {
  const [activeCategory, setActiveCategory] = useState<string>('all');
  const [searchQuery, setSearchQuery] = useState<string>('');
  const [spiceFilter, setSpiceFilter] = useState<number | null>(null);

  const categories = [
    { id: 'all', label: 'Semua Menu', count: items.length },
    { id: 'signature', label: 'Signature Chicken', count: items.filter(i => i.category === 'signature').length },
    { id: 'combos', label: 'Set Kombo & Bucket', count: items.filter(i => i.category === 'combos').length },
    { id: 'burgers', label: 'Burgers & Wraps', count: items.filter(i => i.category === 'burgers').length },
    { id: 'sides', label: 'Snek & Sos Celup', count: items.filter(i => i.category === 'sides').length },
    { id: 'drinks', label: 'Minuman Segar', count: items.filter(i => i.category === 'drinks').length },
  ];

  const filteredItems = useMemo(() => {
    return items.filter((item) => {
      const matchesCategory = activeCategory === 'all' || item.category === activeCategory;
      const matchesSearch =
        item.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
        item.tagline.toLowerCase().includes(searchQuery.toLowerCase()) ||
        item.description.toLowerCase().includes(searchQuery.toLowerCase());
      const matchesSpice = spiceFilter === null || item.spiceLevel === spiceFilter;
      return matchesCategory && matchesSearch && matchesSpice;
    });
  }, [items, activeCategory, searchQuery, spiceFilter]);

  return (
    <section id="menu" className="py-20 bg-[#0c0c0e] relative overflow-hidden">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto mb-12 space-y-3">
          <div className="inline-flex items-center gap-1.5 bg-[#1a1a1e] border border-[#E31E24]/40 px-3.5 py-1 rounded-full text-xs font-black uppercase tracking-widest text-[#E31E24]">
            <Flame className="w-3.5 h-3.5 fill-[#E31E24]" />
            <span>Pilihan Gourmet Terhebat</span>
          </div>

          <h2 className="text-3xl sm:text-5xl font-black text-white uppercase tracking-tight">
            MENU <span className="text-[#FDB913]">HEMZAL CRISPY</span>
          </h2>

          <p className="text-neutral-300 text-sm sm:text-base">
            Setiap hidangan digoreng panas mengikut tempahan anda. Pilih perisa kegemaran dan sesuaikan tahap kepedasan mengikut citarasa.
          </p>
        </div>

        {/* Filters & Search Toolbar */}
        <div className="space-y-4 mb-10">
          
          {/* Search bar & Spice filter */}
          <div className="flex flex-col sm:flex-row items-center justify-between gap-3">
            
            {/* Search Input */}
            <div className="relative w-full sm:w-80">
              <Search className="w-4 h-4 text-neutral-400 absolute left-3.5 top-1/2 -translate-y-1/2" />
              <input
                id="menu-search-input"
                type="text"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                placeholder="Cari ayam, burger, combo, sos..."
                className="w-full pl-10 pr-4 py-2.5 bg-[#16161a] border border-white/10 rounded-xl text-sm text-white placeholder:text-neutral-500 focus:outline-none focus:border-[#FDB913] transition-colors"
              />
              {searchQuery && (
                <button
                  onClick={() => setSearchQuery('')}
                  className="absolute right-3 top-1/2 -translate-y-1/2 text-xs text-neutral-400 hover:text-white"
                >
                  Padam
                </button>
              )}
            </div>

            {/* Spice Filter Buttons */}
            <div className="flex items-center gap-1.5 overflow-x-auto w-full sm:w-auto pb-1 sm:pb-0">
              <span className="text-xs text-neutral-400 font-bold uppercase shrink-0 mr-1 flex items-center gap-1">
                <Filter className="w-3 h-3" /> Pedas:
              </span>
              <button
                onClick={() => setSpiceFilter(null)}
                className={`px-3 py-1.5 rounded-lg text-xs font-bold transition-all cursor-pointer ${
                  spiceFilter === null
                    ? 'bg-white text-black font-black'
                    : 'bg-[#18181c] text-neutral-300 hover:bg-[#222228] border border-white/10'
                }`}
              >
                Semua
              </button>
              <button
                onClick={() => setSpiceFilter(0)}
                className={`px-3 py-1.5 rounded-lg text-xs font-bold transition-all cursor-pointer ${
                  spiceFilter === 0
                    ? 'bg-emerald-500 text-white font-black'
                    : 'bg-[#18181c] text-neutral-300 hover:bg-[#222228] border border-white/10'
                }`}
              >
                Tanpa Pedas
              </button>
              <button
                onClick={() => setSpiceFilter(1)}
                className={`px-3 py-1.5 rounded-lg text-xs font-bold transition-all cursor-pointer ${
                  spiceFilter === 1
                    ? 'bg-[#FDB913] text-black font-black'
                    : 'bg-[#18181c] text-neutral-300 hover:bg-[#222228] border border-white/10'
                }`}
              >
                🌶️ Biasa
              </button>
              <button
                onClick={() => setSpiceFilter(3)}
                className={`px-3 py-1.5 rounded-lg text-xs font-bold transition-all cursor-pointer ${
                  spiceFilter === 3
                    ? 'bg-[#E31E24] text-white font-black'
                    : 'bg-[#18181c] text-neutral-300 hover:bg-[#222228] border border-white/10'
                }`}
              >
                🔥🔥 Berapi
              </button>
            </div>

          </div>

          {/* Category Tabs */}
          <div className="flex items-center gap-2 overflow-x-auto pb-2 scrollbar-thin">
            {categories.map((cat) => {
              const isActive = activeCategory === cat.id;
              return (
                <button
                  key={cat.id}
                  onClick={() => {
                    playPopSound();
                    setActiveCategory(cat.id);
                  }}
                  className={`px-5 py-3 rounded-xl font-bold text-xs sm:text-sm uppercase tracking-wider whitespace-nowrap transition-all cursor-pointer flex items-center gap-2 ${
                    isActive
                      ? 'bg-gradient-to-r from-[#E31E24] to-[#C1121F] text-white shadow-lg shadow-[#E31E24]/30 border border-[#FDB913]/30 scale-102'
                      : 'bg-[#151518] text-neutral-300 hover:text-white hover:bg-[#1f1f25] border border-white/5'
                  }`}
                >
                  <span>{cat.label}</span>
                  <span
                    className={`text-[10px] px-1.5 py-0.5 rounded-full ${
                      isActive ? 'bg-black/30 text-[#FDB913]' : 'bg-white/10 text-neutral-400'
                    }`}
                  >
                    {cat.count}
                  </span>
                </button>
              );
            })}
          </div>

        </div>

        {/* Menu Items Grid */}
        {filteredItems.length === 0 ? (
          <div className="text-center py-16 bg-[#131317] rounded-3xl border border-white/10">
            <Flame className="w-12 h-12 text-[#E31E24] mx-auto mb-3 opacity-50" />
            <h3 className="text-lg font-bold text-white">Tiada item dijumpai</h3>
            <p className="text-xs text-neutral-400 mt-1">Cuba tukar carian atau pilih kategori lain.</p>
            <button
              onClick={() => {
                setSearchQuery('');
                setActiveCategory('all');
                setSpiceFilter(null);
              }}
              className="mt-4 px-4 py-2 bg-white/10 hover:bg-white/20 rounded-xl text-xs font-bold text-white"
            >
              Reset Pilihan
            </button>
          </div>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {filteredItems.map((item) => (
              <div
                key={item.id}
                className="group bg-[#141418] hover:bg-[#18181f] rounded-3xl border border-white/10 hover:border-[#FDB913]/40 transition-all duration-300 overflow-hidden flex flex-col shadow-xl hover:shadow-2xl hover:shadow-black/50"
              >
                {/* Image & Badges */}
                <div className="relative h-56 w-full overflow-hidden bg-[#1f1f24]">
                  <img
                    src={item.image}
                    alt={item.name}
                    className="w-full h-full object-cover group-hover:scale-108 transition-transform duration-500"
                    loading="lazy"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-[#141418] via-transparent to-black/40" />

                  {/* Top Badges */}
                  <div className="absolute top-3.5 left-3.5 flex flex-wrap gap-1.5">
                    {item.isBestSeller && (
                      <span className="bg-[#E31E24] text-white text-[10px] font-black uppercase px-2.5 py-1 rounded-md shadow-md flex items-center gap-1">
                        <Flame className="w-3 h-3 fill-white" /> Best Seller
                      </span>
                    )}
                    {item.isChefSpecial && (
                      <span className="bg-[#FDB913] text-black text-[10px] font-black uppercase px-2.5 py-1 rounded-md shadow-md flex items-center gap-1">
                        <Star className="w-3 h-3 fill-black" /> Pilihan Chef
                      </span>
                    )}
                  </div>

                  {/* Spice Level Indicator */}
                  <div className="absolute top-3.5 right-3.5 bg-black/70 backdrop-blur-md px-2.5 py-1 rounded-full text-[11px] font-bold text-white border border-white/10 flex items-center gap-1">
                    {item.spiceLevel === 0 && <span className="text-emerald-400 font-normal">Tak Pedas</span>}
                    {item.spiceLevel === 1 && <span className="text-[#FDB913]">🌶️ Biasa</span>}
                    {item.spiceLevel === 2 && <span className="text-orange-500">🌶️🌶️ Pedas</span>}
                    {item.spiceLevel === 3 && <span className="text-[#E31E24] font-black">🔥🔥 Berapi</span>}
                  </div>

                  {/* Portions / Calories footer inside photo */}
                  <div className="absolute bottom-3 left-3.5 text-[11px] text-neutral-300 font-medium flex items-center gap-2">
                    {item.servings && <span className="bg-black/60 px-2 py-0.5 rounded">{item.servings}</span>}
                    {item.calories && <span className="bg-black/60 px-2 py-0.5 rounded">{item.calories} kcal</span>}
                  </div>
                </div>

                {/* Content */}
                <div className="p-5 flex-1 flex flex-col justify-between space-y-4">
                  <div className="space-y-1.5">
                    <h3 className="font-black text-lg text-white group-hover:text-[#FDB913] transition-colors leading-snug">
                      {item.name}
                    </h3>
                    <p className="text-xs font-semibold text-[#FDB913]">
                      {item.tagline}
                    </p>
                    <p className="text-xs text-neutral-400 line-clamp-2 leading-relaxed">
                      {item.description}
                    </p>
                  </div>

                  {/* Price & Action Buttons */}
                  <div className="pt-3 border-t border-white/5 flex items-center justify-between gap-2">
                    <div>
                      <span className="text-[10px] text-neutral-400 block uppercase font-bold">Harga</span>
                      <div className="flex items-baseline gap-1.5">
                        <span className="text-xl font-black text-[#FDB913]">
                          RM {item.price.toFixed(2)}
                        </span>
                        {item.originalPrice && (
                          <span className="text-xs text-neutral-500 line-through">
                            RM {item.originalPrice.toFixed(2)}
                          </span>
                        )}
                      </div>
                    </div>

                    <div className="flex items-center gap-2">
                      {/* Customize Button */}
                      <button
                        onClick={() => onSelectItem(item)}
                        className="px-3 py-2.5 rounded-xl bg-white/10 hover:bg-white/20 text-white text-xs font-bold flex items-center gap-1.5 transition-colors cursor-pointer"
                        title="Pilih kepedasan & sos"
                      >
                        <Eye className="w-3.5 h-3.5" />
                        <span>Kustom</span>
                      </button>

                      {/* Quick Add Button */}
                      <button
                        onClick={() => {
                          playPopSound();
                          onQuickAdd(item);
                        }}
                        className="p-2.5 sm:px-3.5 sm:py-2.5 rounded-xl bg-[#E31E24] hover:bg-[#FDB913] text-white hover:text-black font-black text-xs uppercase tracking-wider flex items-center gap-1.5 transition-all shadow-md shadow-[#E31E24]/30 cursor-pointer"
                        title="Tambah Cepat ke Troli"
                      >
                        <Plus className="w-4 h-4" />
                        <span className="hidden sm:inline">Pesan</span>
                      </button>
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}

      </div>
    </section>
  );
};
