import React, { useState, useMemo } from 'react';
import { MenuItem, PortionOption } from '../types';
import { Flame, Star, Search, Plus, Sparkles, ShoppingBag, Eye, Layers, ShieldCheck, Leaf, CheckCircle2 } from 'lucide-react';
import { playPopSound } from '../utils/sound';
import { useLanguage } from '../context/LanguageContext';
import { getLocalizedMenuItem } from '../data/menuData';

interface DietaryBadgeConfig {
  icon: React.ReactNode;
  bgClass: string;
  label: string;
}

const getDietaryBadgeConfig = (diet: string, language: string): DietaryBadgeConfig => {
  const lower = diet.toLowerCase();
  if (lower.includes('halal')) {
    return {
      icon: <ShieldCheck className="w-3 h-3 text-emerald-600 shrink-0" />,
      bgClass: 'bg-emerald-50 text-emerald-800 border-emerald-300/80 hover:bg-emerald-100/80',
      label: '100% Halal',
    };
  }
  if (lower.includes('spicy') && !lower.includes('non')) {
    return {
      icon: <Flame className="w-3 h-3 text-rose-600 fill-rose-600/30 shrink-0" />,
      bgClass: 'bg-rose-50 text-rose-700 border-rose-300/80 hover:bg-rose-100/80',
      label: language === 'en' ? 'Spicy' : 'Pedas',
    };
  }
  if (lower.includes('gluten')) {
    return {
      icon: <Sparkles className="w-3 h-3 text-amber-600 shrink-0" />,
      bgClass: 'bg-amber-50 text-amber-800 border-amber-300/80 hover:bg-amber-100/80',
      label: language === 'en' ? 'Gluten-Free' : 'Bebas Gluten',
    };
  }
  if (lower.includes('veg')) {
    return {
      icon: <Leaf className="w-3 h-3 text-teal-600 shrink-0" />,
      bgClass: 'bg-teal-50 text-teal-800 border-teal-300/80 hover:bg-teal-100/80',
      label: 'Vegetarian',
    };
  }
  if (lower.includes('non-spicy') || lower.includes('tidak pedas')) {
    return {
      icon: <CheckCircle2 className="w-3 h-3 text-sky-600 shrink-0" />,
      bgClass: 'bg-sky-50 text-sky-700 border-sky-300/80 hover:bg-sky-100/80',
      label: language === 'en' ? 'Non-Spicy' : 'Tidak Pedas',
    };
  }
  if (lower.includes('chef')) {
    return {
      icon: <Star className="w-3 h-3 text-amber-600 fill-amber-500/30 shrink-0" />,
      bgClass: 'bg-amber-50 text-amber-800 border-amber-300/80 hover:bg-amber-100/80',
      label: language === 'en' ? "Chef's Special" : 'Pilihan Chef',
    };
  }
  return {
    icon: <Sparkles className="w-3 h-3 text-indigo-600 shrink-0" />,
    bgClass: 'bg-indigo-50 text-indigo-700 border-indigo-200/80 hover:bg-indigo-100/80',
    label: diet,
  };
};

interface MenuSectionProps {
  items: MenuItem[];
  onSelectItem: (item: MenuItem, initialPortion?: PortionOption) => void;
  onQuickAdd: (item: MenuItem, initialPortion?: PortionOption) => void;
}

export const MenuSection: React.FC<MenuSectionProps> = ({
  items,
  onSelectItem,
  onQuickAdd,
}) => {
  const { language, t } = useLanguage();
  const [activeCategory, setActiveCategory] = useState<string>('all');
  const [searchQuery, setSearchQuery] = useState<string>('');

  // Track selected portion preview for cards
  const [cardPortions, setCardPortions] = useState<Record<string, PortionOption>>({});

  const localizedItems = useMemo(() => {
    return items.map((it) => getLocalizedMenuItem(it, language));
  }, [items, language]);

  const categories = [
    { id: 'all', label: t('menu.all'), count: localizedItems.length },
    { id: 'signature', label: t('menu.signature'), count: localizedItems.filter(i => i.category === 'signature').length },
    { id: 'combos', label: t('menu.combos'), count: localizedItems.filter(i => i.category === 'combos').length },
    { id: 'sides', label: t('menu.sides'), count: localizedItems.filter(i => i.category === 'sides').length },
  ];

  const filteredItems = useMemo(() => {
    return localizedItems.filter((item) => {
      const matchesCategory = activeCategory === 'all' || item.category === activeCategory;
      const matchesSearch =
        item.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
        item.tagline.toLowerCase().includes(searchQuery.toLowerCase()) ||
        item.description.toLowerCase().includes(searchQuery.toLowerCase());
      return matchesCategory && matchesSearch;
    });
  }, [localizedItems, activeCategory, searchQuery]);

  const specialBucketItem = localizedItems.find((i) => i.id === 'hemzal-special-bucket');

  const handlePortionSelect = (itemId: string, portion: PortionOption) => {
    playPopSound();
    setCardPortions((prev) => ({ ...prev, [itemId]: portion }));
  };

  return (
    <section id="menu" className="py-20 bg-neutral-50 border-b border-neutral-200/80 relative overflow-hidden">
      {/* Ambient Red/Gold Glows */}
      <div className="absolute top-20 left-1/2 -translate-x-1/2 w-full max-w-7xl h-96 bg-[radial-gradient(ellipse_at_center,rgba(227,30,36,0.06),transparent_70%)] pointer-events-none" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto mb-10 space-y-3">
          <div className="inline-flex items-center gap-2 bg-amber-500/10 border border-amber-500/20 px-4 py-1 rounded-full text-xs font-black uppercase tracking-widest text-[#B45309]">
            <Flame className="w-3.5 h-3.5 fill-[#E31E24] text-[#E31E24]" />
            <span>{t('menu.badge')}</span>
          </div>

          <h2 className="text-3xl sm:text-5xl font-black text-neutral-900 uppercase tracking-tight">
            {t('menu.title')}
          </h2>

          <p className="text-neutral-700 text-sm sm:text-base font-medium">
            {t('menu.quote')}
          </p>

          {/* Pricing Structure Highlight Bar */}
          <div className="pt-2 grid grid-cols-2 md:grid-cols-4 gap-2.5 max-w-4xl mx-auto text-left">
            <div className="bg-white border border-neutral-200 p-3 rounded-2xl shadow-sm">
              <span className="text-[10px] text-neutral-500 uppercase font-black block">{t('menu.baseRate')}</span>
              <strong className="text-sm font-black text-[#D97706] block">{t('menu.ratePerPc')}</strong>
              <span className="text-[10px] text-neutral-600">{t('menu.baseRateSub')}</span>
            </div>
            <div className="bg-emerald-500/10 border border-emerald-500/25 p-3 rounded-2xl shadow-sm">
              <span className="text-[10px] text-emerald-800 uppercase font-black block">{t('menu.chiliSauce')}</span>
              <strong className="text-sm font-black text-emerald-700 block">{t('menu.freeNotice')}</strong>
              <span className="text-[10px] text-emerald-800/90 font-medium">{t('menu.chiliSauceSub')}</span>
            </div>
            <div className="bg-white border border-neutral-200 p-3 rounded-2xl shadow-sm">
              <span className="text-[10px] text-neutral-500 uppercase font-black block">{t('menu.cheeseGarlicKorean')}</span>
              <strong className="text-sm font-black text-[#D97706] block">RM 2.00 / Cup</strong>
              <span className="text-[10px] text-neutral-600">{t('menu.signatureSauceSub')}</span>
            </div>
            <div className="bg-white border border-neutral-200 p-3 rounded-2xl shadow-sm">
              <span className="text-[10px] text-neutral-500 uppercase font-black block">{t('menu.japaneseSauces')}</span>
              <strong className="text-sm font-black text-[#D97706] block">RM 3.00 / Cup</strong>
              <span className="text-[10px] text-neutral-600">{t('menu.japaneseSaucesSub')}</span>
            </div>
          </div>
        </div>

        {/* FEATURED PROMO BANNER: HEMZAL SPECIAL BUCKET */}
        {specialBucketItem && (
          <div className="mb-12 bg-gradient-to-r from-[#E31E24] via-[#cc141a] to-[#990D11] rounded-3xl p-6 sm:p-8 border border-[#FDB913]/40 shadow-xl relative overflow-hidden">
            <div className="absolute -right-10 -bottom-10 w-72 h-72 bg-[#FDB913]/20 rounded-full blur-2xl pointer-events-none" />
            
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-center">
              
              {/* Image & Price Ribbon */}
              <div className="lg:col-span-5 relative rounded-2xl overflow-hidden shadow-2xl h-64 sm:h-72 bg-neutral-900 border border-white/30 group">
                <img
                  src={specialBucketItem.image}
                  alt={specialBucketItem.name}
                  className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/85 via-transparent to-black/30" />
                
                {/* Official Slogan Badge */}
                <div className="absolute top-3 left-3 bg-white text-black font-black text-[11px] px-3 py-1 rounded-full shadow-lg flex items-center gap-1">
                  <Flame className="w-3 h-3 text-[#E31E24] fill-[#E31E24]" />
                  <span>{t('menu.slogan')}!</span>
                </div>

                {/* Price Tag Box */}
                <div className="absolute bottom-3 right-3 bg-black/80 backdrop-blur-md border border-[#FDB913]/60 px-3.5 py-1.5 rounded-xl text-right">
                  <span className="text-[10px] text-neutral-300 line-through block leading-none">
                    {t('menu.originalPrice')} RM 57.00
                  </span>
                  <span className="text-xl sm:text-2xl font-black text-[#FDB913] leading-tight">
                    RM 53.90
                  </span>
                  <span className="text-[9px] text-emerald-400 font-bold block">{t('menu.saveAmount')}</span>
                </div>
              </div>

              {/* Offer Details */}
              <div className="lg:col-span-7 space-y-4 text-white">
                <div className="flex flex-wrap items-center gap-2">
                  <span className="bg-[#FDB913] text-black font-black text-xs uppercase px-3 py-1 rounded-full shadow">
                    {t('menu.openingSpecial')}
                  </span>
                  <span className="bg-black/30 backdrop-blur-md text-[#FDB913] font-semibold text-xs px-3 py-1 rounded-full border border-white/20">
                    www.hemzalcrispychicken.com
                  </span>
                  {specialBucketItem.dietaryInfo && specialBucketItem.dietaryInfo.map((diet, idx) => {
                    const badge = getDietaryBadgeConfig(diet, language);
                    return (
                      <span
                        key={idx}
                        className={`inline-flex items-center gap-1 px-2.5 py-0.5 rounded-full text-[10px] font-black uppercase tracking-wide border shadow-xs ${badge.bgClass}`}
                      >
                        {badge.icon}
                        <span>{badge.label}</span>
                      </span>
                    );
                  })}
                </div>

                <div>
                  <h3 className="text-2xl sm:text-3xl font-black uppercase tracking-tight text-white flex items-center gap-2">
                    <span>{specialBucketItem.name}</span>
                  </h3>
                  <p className="text-xs sm:text-sm text-neutral-100 mt-1 leading-relaxed">
                    {t('menu.specialBucketDesc')}
                  </p>
                </div>

                {/* Included 5 gourmet sauce cups breakdown */}
                <div className="grid grid-cols-2 sm:grid-cols-3 gap-2 text-xs">
                  <div className="bg-black/40 backdrop-blur-md border border-white/15 p-2 rounded-xl flex items-center gap-2">
                    <span className="w-2 h-2 rounded-full bg-emerald-400 shrink-0" />
                    <span className="font-semibold text-neutral-100">10 pcs {language === 'en' ? 'Crispy Chicken' : 'Ayam Crispy'}</span>
                  </div>
                  <div className="bg-black/40 backdrop-blur-md border border-white/15 p-2 rounded-xl flex items-center gap-2">
                    <span className="w-2 h-2 rounded-full bg-red-400 shrink-0" />
                    <span className="font-semibold text-neutral-100">10 pcs {language === 'en' ? 'Chili Sauce' : 'Sos Cili'}</span>
                  </div>
                  <div className="bg-black/40 backdrop-blur-md border border-white/15 p-2 rounded-xl flex items-center gap-2">
                    <span className="w-2 h-2 rounded-full bg-[#FDB913] shrink-0" />
                    <span className="font-semibold text-neutral-100">1 cup Garlic Sauce</span>
                  </div>
                  <div className="bg-black/40 backdrop-blur-md border border-white/15 p-2 rounded-xl flex items-center gap-2">
                    <span className="w-2 h-2 rounded-full bg-amber-400 shrink-0" />
                    <span className="font-semibold text-neutral-100">1 cup Cheese Sauce</span>
                  </div>
                  <div className="bg-black/40 backdrop-blur-md border border-white/15 p-2 rounded-xl flex items-center gap-2">
                    <span className="w-2 h-2 rounded-full bg-rose-400 shrink-0" />
                    <span className="font-semibold text-neutral-100">1 cup Korean Habanero</span>
                  </div>
                  <div className="bg-black/40 backdrop-blur-md border border-white/15 p-2 rounded-xl flex items-center gap-2">
                    <span className="w-2 h-2 rounded-full bg-teal-300 shrink-0" />
                    <span className="font-semibold text-neutral-100">1 cup Furikake & Togarashi</span>
                  </div>
                </div>

                {/* Action CTA */}
                <div className="flex flex-wrap items-center gap-3 pt-1">
                  <button
                    onClick={() => {
                      playPopSound();
                      onQuickAdd(specialBucketItem);
                    }}
                    className="px-6 py-3 bg-[#FDB913] hover:bg-yellow-400 text-black font-black text-xs sm:text-sm uppercase tracking-wider rounded-xl shadow-xl flex items-center gap-2 transition-all cursor-pointer"
                  >
                    <ShoppingBag className="w-4 h-4" />
                    <span>{t('menu.orderSpecialBucket')}</span>
                  </button>
                </div>

              </div>

            </div>
          </div>
        )}

        {/* Filters & Search Toolbar */}
        <div className="space-y-4 mb-10">
          
          {/* Search bar & Quality Assurance Badge */}
          <div className="flex flex-col sm:flex-row items-center justify-between gap-3">
            
            {/* Search Input */}
            <div className="relative w-full sm:w-80">
              <Search className="w-4 h-4 text-neutral-400 absolute left-3.5 top-1/2 -translate-y-1/2" />
              <input
                id="menu-search-input"
                type="text"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                placeholder={t('menu.searchPlaceholder')}
                className="w-full pl-10 pr-4 py-2.5 bg-white border border-neutral-300/80 rounded-xl text-sm text-neutral-900 placeholder:text-neutral-400 focus:outline-none focus:border-[#D97706] transition-colors shadow-sm"
              />
              {searchQuery && (
                <button
                  onClick={() => setSearchQuery('')}
                  className="absolute right-3 top-1/2 -translate-y-1/2 text-xs text-neutral-400 hover:text-neutral-700 font-bold"
                >
                  {t('common.clear')}
                </button>
              )}
            </div>

            {/* Original Crispy Recipe Guarantee Pill */}
            <div className="inline-flex items-center gap-2 bg-white border border-[#FDB913]/40 px-3.5 py-1.5 rounded-xl text-xs text-neutral-700 shadow-sm">
              <ShieldCheck className="w-4 h-4 text-[#D97706] shrink-0" />
              <span className="text-neutral-900 font-bold">{t('menu.guarantee')}</span>
              <span className="text-neutral-300">•</span>
              <span className="text-neutral-600 text-[11px]">{t('menu.guaranteeSub')}</span>
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
                      ? 'bg-gradient-to-r from-[#E31E24] to-[#C1121F] text-white shadow-lg shadow-[#E31E24]/20 border border-[#FDB913]/30 scale-102'
                      : 'bg-white text-neutral-700 hover:text-neutral-900 hover:bg-neutral-100 border border-neutral-200 shadow-sm'
                  }`}
                >
                  <span>{cat.label}</span>
                  <span
                    className={`text-[10px] px-1.5 py-0.5 rounded-full ${
                      isActive ? 'bg-black/30 text-[#FDB913]' : 'bg-neutral-100 text-neutral-600 font-bold border border-neutral-200'
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
          <div className="text-center py-16 bg-white rounded-3xl border border-neutral-200 shadow-sm">
            <Flame className="w-12 h-12 text-[#E31E24] mx-auto mb-3 opacity-50" />
            <h3 className="text-lg font-bold text-neutral-900">{t('menu.noItemsFound')}</h3>
            <p className="text-xs text-neutral-600 mt-1">{t('menu.noItemsDesc')}</p>
            <button
              onClick={() => {
                setSearchQuery('');
                setActiveCategory('all');
              }}
              className="mt-4 px-4 py-2 bg-neutral-100 hover:bg-neutral-200 rounded-xl text-xs font-bold text-neutral-800 border border-neutral-300/80 cursor-pointer"
            >
              {t('menu.resetSelection')}
            </button>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {filteredItems.map((item) => {
              const activePortion = cardPortions[item.id] || (item.portions && item.portions.length > 0 ? item.portions[0] : undefined);
              const displayPrice = activePortion ? activePortion.price : item.price;

              return (
                <div
                  key={item.id}
                  className="group bg-white hover:bg-neutral-50/50 rounded-3xl border border-neutral-200/80 hover:border-[#D97706]/40 transition-all duration-300 overflow-hidden flex flex-col shadow-sm hover:shadow-xl"
                >
                  {/* Image & Badges */}
                  <div className="relative h-56 w-full overflow-hidden bg-neutral-900">
                    <img
                      src={item.image}
                      alt={item.name}
                      className="w-full h-full object-cover group-hover:scale-108 transition-transform duration-500"
                      loading="lazy"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-black/20" />

                    {/* Top Badges */}
                    <div className="absolute top-3.5 left-3.5 flex flex-wrap gap-1.5">
                      {item.isBestSeller && (
                        <span className="bg-[#E31E24] text-white text-[10px] font-black uppercase px-2.5 py-1 rounded-md shadow-md flex items-center gap-1">
                          <Flame className="w-3 h-3 fill-white" /> {t('menu.bestSeller')}
                        </span>
                      )}
                      {item.isChefSpecial && (
                        <span className="bg-[#FDB913] text-black text-[10px] font-black uppercase px-2.5 py-1 rounded-md shadow-md flex items-center gap-1">
                          <Star className="w-3 h-3 fill-black" /> {t('menu.chefSpecial')}
                        </span>
                      )}
                      {item.isNew && (
                        <span className="bg-amber-500 text-black text-[10px] font-black uppercase px-2.5 py-1 rounded-md shadow-md">
                          {t('menu.newItem')}
                        </span>
                      )}
                    </div>

                    {/* Original Recipe / Flavor Tag */}
                    <div className="absolute top-3.5 right-3.5 bg-black/75 backdrop-blur-md px-2.5 py-1 rounded-full text-[10px] font-black text-[#FDB913] border border-[#FDB913]/30 flex items-center gap-1">
                      <span>✓ Original Crispy</span>
                    </div>

                    {/* Portions / Slogan footer inside photo */}
                    <div className="absolute bottom-3 left-3.5 right-3.5 text-[11px] text-neutral-300 font-medium flex items-center justify-between">
                      <span className="bg-black/70 px-2 py-0.5 rounded text-[#FDB913] font-bold text-[10px]">
                        {item.sauceInfo ? `✓ ${item.sauceInfo}` : t('menu.slogan')}
                      </span>
                    </div>
                  </div>

                  {/* Content */}
                  <div className="p-5 flex-1 flex flex-col justify-between space-y-4">
                    <div className="space-y-1.5">
                      <h3 className="font-black text-lg text-neutral-900 group-hover:text-[#D97706] transition-colors leading-snug">
                        {item.name}
                      </h3>
                      <p className="text-xs font-bold text-[#B45309]">
                        {item.tagline}
                      </p>

                      {/* Colorful Dietary Info Badges */}
                      {item.dietaryInfo && item.dietaryInfo.length > 0 && (
                        <div className="flex flex-wrap items-center gap-1.5 py-1">
                          {item.dietaryInfo.map((diet, idx) => {
                            const badge = getDietaryBadgeConfig(diet, language);
                            return (
                              <span
                                key={idx}
                                className={`inline-flex items-center gap-1 px-2.5 py-0.5 rounded-full text-[10px] font-black uppercase tracking-wide border shadow-2xs transition-colors ${badge.bgClass}`}
                              >
                                {badge.icon}
                                <span>{badge.label}</span>
                              </span>
                            );
                          })}
                        </div>
                      )}

                      <p className="text-xs text-neutral-600 line-clamp-2 leading-relaxed">
                        {item.description}
                      </p>
                    </div>

                    {/* Portion Tier Selector */}
                    {item.portions && item.portions.length > 0 && (
                      <div className="space-y-1.5 pt-1">
                        <span className="text-[10px] text-neutral-500 uppercase font-bold flex items-center gap-1">
                          <Layers className="w-3 h-3 text-[#D97706]" /> {t('menu.selectSize')}
                        </span>
                        <div className="grid grid-cols-3 gap-1.5">
                          {item.portions.map((portion) => {
                            const isSelected = activePortion?.label === portion.label;
                            return (
                              <button
                                key={portion.label}
                                type="button"
                                onClick={() => handlePortionSelect(item.id, portion)}
                                className={`py-1.5 px-2 rounded-xl text-center border transition-all cursor-pointer ${
                                  isSelected
                                    ? 'bg-[#E31E24] border-[#E31E24] text-white shadow-md font-black'
                                    : 'bg-neutral-100 border-neutral-200 text-neutral-700 hover:text-neutral-900 hover:border-neutral-300 font-medium'
                                }`}
                              >
                                <span className="text-[11px] block">{portion.label}</span>
                                <span className={`text-[10px] font-bold block ${isSelected ? 'text-[#FDB913]' : 'text-[#B45309]'}`}>
                                  RM {portion.price.toFixed(2)}
                                </span>
                              </button>
                            );
                          })}
                        </div>
                      </div>
                    )}

                    {/* Price & Action Buttons */}
                    <div className="pt-3 border-t border-neutral-200/80 flex items-center justify-between gap-2">
                      <div>
                        <span className="text-[10px] text-neutral-500 block uppercase font-bold">
                          {activePortion ? activePortion.label : t('menu.price')}
                        </span>
                        <div className="flex items-baseline gap-1.5">
                          <span className="text-xl font-black text-[#D97706]">
                            RM {displayPrice.toFixed(2)}
                          </span>
                          {item.originalPrice && !activePortion && (
                            <span className="text-xs text-neutral-400 line-through">
                              RM {item.originalPrice.toFixed(2)}
                            </span>
                          )}
                        </div>
                      </div>

                      <div className="flex items-center gap-2">
                        {/* Customize Button */}
                        <button
                          onClick={() => onSelectItem(item, activePortion)}
                          className="px-3 py-2.5 rounded-xl bg-neutral-100 hover:bg-neutral-200 text-neutral-800 border border-neutral-300/80 text-xs font-bold flex items-center gap-1.5 transition-colors cursor-pointer"
                          title="Pilih kepedasan & sos"
                        >
                          <Eye className="w-3.5 h-3.5 text-neutral-700" />
                          <span>{t('menu.customize')}</span>
                        </button>

                        {/* Quick Add Button */}
                        <button
                          onClick={() => {
                            playPopSound();
                            onQuickAdd(item, activePortion);
                          }}
                          className="p-2.5 sm:px-3.5 sm:py-2.5 rounded-xl bg-[#E31E24] hover:bg-[#FDB913] text-white hover:text-black font-black text-xs uppercase tracking-wider flex items-center gap-1.5 transition-all shadow-md shadow-[#E31E24]/20 cursor-pointer"
                          title="Tambah Cepat ke Troli"
                        >
                          <Plus className="w-4 h-4" />
                          <span className="hidden sm:inline">{t('menu.order')}</span>
                        </button>
                      </div>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        )}

      </div>
    </section>
  );
};
