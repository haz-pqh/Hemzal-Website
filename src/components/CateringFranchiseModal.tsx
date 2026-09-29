import React, { useState } from 'react';
import { X, Users, Utensils, MessageSquare, Check, Sparkles, Building2 } from 'lucide-react';
import confetti from 'canvas-confetti';
import { playPopSound } from '../utils/sound';
import { useLanguage } from '../context/LanguageContext';

interface CateringFranchiseModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export const CateringFranchiseModal: React.FC<CateringFranchiseModalProps> = ({
  isOpen,
  onClose,
}) => {
  const { language, t } = useLanguage();
  const [activeTab, setActiveTab] = useState<'catering' | 'franchise'>('catering');
  const [paxCount, setPaxCount] = useState<number>(50);
  const [packageType, setPackageType] = useState<'standard' | 'premium' | 'royale'>('premium');

  if (!isOpen) return null;

  // Catering price calculations strictly based on Hemzal Menu
  const packages = {
    standard: {
      name: language === 'en' ? '2-Piece Crispy Set' : 'Pakej 2 Ketul Crispy',
      price: 9.00,
      description: language === 'en' ? '2x Crispy Chicken Pieces + Free Chili Sauce' : '2x Ketul Ayam Goreng Crispy + Sos Cili Percuma',
      items: language === 'en' 
        ? ['2x Crispy Chicken Pieces (RM4.50/pc)', 'Special Chili Sauce (Free)', 'Clean Meal Box & Cutlery']
        : ['2x Ketul Ayam Crispy (RM4.50/ketul)', 'Sos Cili Istimewa (Percuma)', 'Pek Kotak Bersih & Tisu'],
    },
    premium: {
      name: language === 'en' ? '2-Piece Combo + Coleslaw + Dip' : 'Pakej Combo 2 Ketul + Coleslaw + Sos',
      price: 14.50,
      description: language === 'en' ? '2x Chicken + 1x Coleslaw 4oz + 1x Gourmet Dip + Free Chili Sauce' : '2x Ayam + 1x Coleslaw 4oz + 1x Sos Gourmet + Sos Cili Percuma',
      items: language === 'en'
        ? ['2x Crispy Chicken Pieces', '1x Fresh Chilled Coleslaw (4oz)', '1x Gourmet Dip (Cheese/Garlic/Korean)', 'Special Chili Sauce (Free)']
        : ['2x Ketul Ayam Crispy', '1x Hemzal Coleslaw Segar (4oz)', '1x Sos Gourmet (Keju/Garlic/Korean)', 'Sos Cili Istimewa (Percuma)'],
    },
    royale: {
      name: language === 'en' ? 'Feast 3-Piece + Coleslaw + 2 Dips' : 'Pakej Feast 3 Ketul + Coleslaw + 2 Sos',
      price: 20.00,
      description: language === 'en' ? '3x Chicken + 1x Coleslaw 4oz + 2x Gourmet Dips + Free Chili Sauce' : '3x Ayam + 1x Coleslaw 4oz + 2x Sos Gourmet + Sos Cili Percuma',
      items: language === 'en'
        ? ['3x Crispy Chicken Pieces', '1x Fresh Chilled Coleslaw (4oz)', '2x Choice of Gourmet Dips', 'Special Chili Sauce (Free)']
        : ['3x Ketul Ayam Crispy', '1x Hemzal Coleslaw Segar (4oz)', '2x Sos Gourmet Pilihan (Keju/Garlic/Korean/Furikake/Togarashi)', 'Sos Cili Istimewa (Percuma)'],
    },
  };

  const currentPackage = packages[packageType];
  const estimatedTotal = paxCount * currentPackage.price;

  const handleSendWhatsApp = () => {
    playPopSound();
    confetti({ particleCount: 70, spread: 50 });
    if (activeTab === 'catering') {
      const text = language === 'en'
        ? `Hi Hemzal Catering! I would like to book catering for ${paxCount} Pax (${currentPackage.name}). Estimated budget RM ${estimatedTotal.toFixed(2)}. Package includes: ${currentPackage.description}. Can you assist me?`
        : `Hai Hemzal Catering! Saya ingin tempah katering untuk ${paxCount} Pax (${currentPackage.name}). Anggaran RM ${estimatedTotal.toFixed(2)}. Kandungan: ${currentPackage.description}. Boleh bantu saya?`;
      window.open(`https://wa.me/601121992135?text=${encodeURIComponent(text)}`, '_blank');
    } else {
      const text = language === 'en'
        ? `Hi Hemzal HQ! I am interested in applying for a Hemzal Crispy Chicken branch franchise / business partnership. Please send more details.`
        : `Hai Hemzal HQ! Saya berminat untuk memohon peluang perkongsian Francais Cawangan Hemzal Crispy Chicken. Mohon maklumat lanjut.`;
      window.open(`https://wa.me/60122742334?text=${encodeURIComponent(text)}`, '_blank');
    }
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/40 backdrop-blur-xs overflow-y-auto animate-in fade-in duration-200">
      
      {/* Light Theme Modal Card */}
      <div className="relative w-full max-w-2xl bg-white border border-neutral-200 rounded-3xl shadow-2xl overflow-hidden text-neutral-900 my-8 max-h-[90vh] flex flex-col">
        
        {/* Header with #FDB913 Light Theme */}
        <div className="p-5 sm:p-6 border-b border-amber-500/20 bg-[#FDB913] flex items-center justify-between">
          <div className="flex items-center gap-2">
            <button
              type="button"
              onClick={() => {
                playPopSound();
                setActiveTab('catering');
              }}
              className={`px-3.5 py-2 rounded-xl text-xs font-black uppercase tracking-wider transition-all cursor-pointer flex items-center gap-1.5 ${
                activeTab === 'catering'
                  ? 'bg-neutral-900 text-[#FDB913] shadow-md'
                  : 'bg-black/10 text-neutral-900 hover:bg-black/20'
              }`}
            >
              <Utensils className="w-3.5 h-3.5" />
              <span>{t('catering.tabCatering')}</span>
            </button>
            <button
              type="button"
              onClick={() => {
                playPopSound();
                setActiveTab('franchise');
              }}
              className={`px-3.5 py-2 rounded-xl text-xs font-black uppercase tracking-wider transition-all cursor-pointer flex items-center gap-1.5 ${
                activeTab === 'franchise'
                  ? 'bg-neutral-900 text-[#FDB913] shadow-md'
                  : 'bg-black/10 text-neutral-900 hover:bg-black/20'
              }`}
            >
              <Building2 className="w-3.5 h-3.5" />
              <span>{t('catering.tabFranchise')}</span>
            </button>
          </div>

          <button
            onClick={onClose}
            className="w-8 h-8 rounded-full bg-black/10 hover:bg-black/20 flex items-center justify-center text-neutral-900 font-black cursor-pointer transition-colors"
            aria-label={t('common.close')}
          >
            <X className="w-4 h-4" />
          </button>
        </div>

        {/* Modal Content - Light Theme */}
        <div data-lenis-prevent className="p-5 sm:p-6 overflow-y-auto space-y-6 flex-1 text-sm custom-scrollbar bg-neutral-50/50">
          
          {activeTab === 'catering' ? (
            <div className="space-y-6">
              <div className="space-y-1">
                <h3 className="text-xl font-black text-neutral-900">
                  {language === 'en' ? 'Catering & Corporate Event Calculator' : 'Kalkulator Katering & Majlis Korporat'}
                </h3>
                <p className="text-xs text-neutral-600">
                  {language === 'en' 
                    ? 'Perfect for Office Parties, Birthday Bashes, Weddings & Sports Days.' 
                    : 'Sesuai untuk Jamuan Pejabat, Sambutan Hari Lahir, Kenduri Kahwin & Sukan Sekolah.'}
                </p>
              </div>

              {/* Pax Slider */}
              <div className="bg-white p-5 rounded-2xl border border-neutral-200/80 shadow-xs space-y-3">
                <div className="flex items-center justify-between">
                  <label className="text-xs font-black text-neutral-800 uppercase flex items-center gap-2">
                    <Users className="w-4 h-4 text-[#B45309]" /> {t('catering.paxLabel')}
                  </label>
                  <span className="text-xl font-black text-[#B45309]">{paxCount} {language === 'en' ? 'Pax' : 'Orang'}</span>
                </div>
                <input
                  type="range"
                  min="20"
                  max="500"
                  step="10"
                  value={paxCount}
                  onChange={(e) => setPaxCount(Number(e.target.value))}
                  className="w-full accent-[#FDB913] cursor-pointer"
                />
                <div className="flex justify-between text-[10px] text-neutral-500 font-bold">
                  <span>Min: 20 Pax</span>
                  <span>100 Pax</span>
                  <span>250 Pax</span>
                  <span>Max: 500 Pax</span>
                </div>
              </div>

              {/* Package Selector */}
              <div className="space-y-2.5">
                <div className="flex items-center justify-between">
                  <label className="text-xs font-black text-neutral-800 uppercase">{t('catering.selectPackage')}</label>
                  <span className="text-[10px] text-[#B45309] font-bold bg-amber-500/10 px-2 py-0.5 rounded-full border border-amber-500/20">
                    {language === 'en' ? '100% Official Menu Recipes' : '100% Mengikut Menu Rasmi'}
                  </span>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
                  <button
                    type="button"
                    onClick={() => {
                      playPopSound();
                      setPackageType('standard');
                    }}
                    className={`p-3.5 rounded-2xl border text-left transition-all cursor-pointer flex flex-col justify-between ${
                      packageType === 'standard'
                        ? 'bg-amber-500/10 border-[#FDB913] text-neutral-900 shadow-sm ring-2 ring-[#FDB913]'
                        : 'bg-white border-neutral-200 text-neutral-600 hover:border-neutral-300 hover:bg-neutral-50'
                    }`}
                  >
                    <div>
                      <span className="text-xs font-black block text-neutral-900">{packages.standard.name}</span>
                      <span className="text-xs text-[#B45309] font-black">RM 9.00 / pax</span>
                    </div>
                    <p className="text-[10px] text-neutral-500 mt-1.5 leading-snug">
                      {packages.standard.description}
                    </p>
                  </button>

                  <button
                    type="button"
                    onClick={() => {
                      playPopSound();
                      setPackageType('premium');
                    }}
                    className={`p-3.5 rounded-2xl border text-left transition-all cursor-pointer relative flex flex-col justify-between ${
                      packageType === 'premium'
                        ? 'bg-amber-500/10 border-[#FDB913] text-neutral-900 shadow-sm ring-2 ring-[#FDB913]'
                        : 'bg-white border-neutral-200 text-neutral-600 hover:border-neutral-300 hover:bg-neutral-50'
                    }`}
                  >
                    <span className="absolute -top-2 right-3 bg-[#FDB913] text-neutral-900 text-[8px] font-black px-2 py-0.5 rounded-full uppercase shadow-xs">
                      {t('common.popular')}
                    </span>
                    <div>
                      <span className="text-xs font-black block text-neutral-900">{packages.premium.name}</span>
                      <span className="text-xs text-[#B45309] font-black">RM 14.50 / pax</span>
                    </div>
                    <p className="text-[10px] text-neutral-600 mt-1.5 leading-snug">
                      {packages.premium.description}
                    </p>
                  </button>

                  <button
                    type="button"
                    onClick={() => {
                      playPopSound();
                      setPackageType('royale');
                    }}
                    className={`p-3.5 rounded-2xl border text-left transition-all cursor-pointer flex flex-col justify-between ${
                      packageType === 'royale'
                        ? 'bg-amber-500/10 border-[#FDB913] text-neutral-900 shadow-sm ring-2 ring-[#FDB913]'
                        : 'bg-white border-neutral-200 text-neutral-600 hover:border-neutral-300 hover:bg-neutral-50'
                    }`}
                  >
                    <div>
                      <span className="text-xs font-black block text-neutral-900">{packages.royale.name}</span>
                      <span className="text-xs text-[#B45309] font-black">RM 20.00 / pax</span>
                    </div>
                    <p className="text-[10px] text-neutral-500 mt-1.5 leading-snug">
                      {packages.royale.description}
                    </p>
                  </button>
                </div>

                {/* Package Breakdown Card */}
                <div className="bg-white p-4 rounded-2xl border border-neutral-200/80 shadow-xs space-y-2">
                  <span className="text-[11px] font-black uppercase text-[#B45309] flex items-center gap-1.5">
                    <Sparkles className="w-3.5 h-3.5 text-[#D97706]" /> {language === 'en' ? `Included per Pax (${currentPackage.name}):` : `Kandungan Setiap Pax (${currentPackage.name}):`}
                  </span>
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-1.5 text-[11px] text-neutral-700">
                    {currentPackage.items.map((item, idx) => (
                      <div key={idx} className="flex items-center gap-1.5">
                        <Check className="w-3.5 h-3.5 text-emerald-600 shrink-0" />
                        <span className="font-medium">{item}</span>
                      </div>
                    ))}
                  </div>
                </div>
              </div>

              {/* Estimate Summary */}
              <div className="p-4 rounded-2xl bg-gradient-to-r from-amber-50 to-amber-100/60 border border-amber-200/80 flex items-center justify-between shadow-xs">
                <div>
                  <span className="text-[10px] text-neutral-600 uppercase font-black">{t('catering.estimatedTotal')}</span>
                  <p className="text-2xl font-black text-[#B45309]">RM {estimatedTotal.toFixed(2)}</p>
                  <p className="text-[10px] text-neutral-500">
                    {language === 'en' ? 'Includes hot box meal packaging' : 'Termasuk pek kotak bungkusan panas'}
                  </p>
                </div>
                <div className="text-right">
                  <span className="text-xs bg-emerald-100 text-emerald-800 border border-emerald-300 px-3 py-1 rounded-full font-bold">
                    {language === 'en' ? 'Corporate Discount Included' : 'Diskaun Korporat Termasuk'}
                  </span>
                </div>
              </div>

            </div>
          ) : (
            <div className="space-y-4">
              <div className="space-y-1">
                <h3 className="text-xl font-black text-neutral-900">{t('catering.franchiseTitle')}</h3>
                <p className="text-xs text-neutral-600">
                  {t('catering.franchiseDesc')}
                </p>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                <div className="p-4 rounded-2xl bg-white border border-neutral-200/80 shadow-xs space-y-1">
                  <span className="text-[10px] text-[#B45309] font-black uppercase">
                    {language === 'en' ? 'Kiosk & Shop Formats' : 'Format Kiosk & Lot Kedai'}
                  </span>
                  <h4 className="font-bold text-sm text-neutral-900">
                    {language === 'en' ? 'Flexible Investment' : 'Pelaburan Fleksibel'}
                  </h4>
                  <p className="text-xs text-neutral-600">
                    {language === 'en' ? 'Mall kiosk models, standard shoplots, or drive-thru hubs.' : 'Pilihan model Kiosk Mall, Shoplot Standard, atau Drive-Thru Hub.'}
                  </p>
                </div>
                <div className="p-4 rounded-2xl bg-white border border-neutral-200/80 shadow-xs space-y-1">
                  <span className="text-[10px] text-[#B45309] font-black uppercase">
                    {language === 'en' ? 'Central Kitchen Supply' : 'Bekalan Dapur Pusat'}
                  </span>
                  <h4 className="font-bold text-sm text-neutral-900">
                    {language === 'en' ? 'Streamlined Standard SOP' : 'SOP Mudah & Standard'}
                  </h4>
                  <p className="text-xs text-neutral-600">
                    {language === 'en' ? 'Pre-marinated poultry shipped fresh; no expert chef required.' : 'Ayam diperap siap dari Central Kitchen, tidak perlu chef berpengalaman.'}
                  </p>
                </div>
              </div>

              <div className="p-4 rounded-2xl bg-white border border-neutral-200/80 shadow-xs space-y-2 text-xs text-neutral-700">
                <div className="flex items-center gap-2">
                  <Check className="w-4 h-4 text-emerald-600 shrink-0" />
                  <span>{language === 'en' ? 'Full social media marketing and branch signage guidance.' : 'Bimbingan pemasaran media sosial dan papan tanda cawangan.'}</span>
                </div>
                <div className="flex items-center gap-2">
                  <Check className="w-4 h-4 text-emerald-600 shrink-0" />
                  <span>{language === 'en' ? 'Intensive kitchen operations training and integrated POS system.' : 'Latihan intensif operasi dapur dan sistem POS bersepadu.'}</span>
                </div>
                <div className="flex items-center gap-2">
                  <Check className="w-4 h-4 text-emerald-600 shrink-0" />
                  <span>{language === 'en' ? 'Projected ROI within 12 - 18 months of continuous operation.' : 'ROI anggaran dalam masa 12 - 18 bulan operasi.'}</span>
                </div>
              </div>
            </div>
          )}

          {/* Action Button in #FDB913 Light Theme */}
          <div className="pt-2">
            <button
              onClick={handleSendWhatsApp}
              className="w-full py-4 rounded-2xl bg-[#FDB913] hover:bg-[#e0a410] text-neutral-900 font-black text-sm uppercase tracking-wider flex items-center justify-center gap-2 shadow-lg shadow-[#FDB913]/30 transition-all cursor-pointer"
            >
              <MessageSquare className="w-5 h-5 fill-neutral-900" />
              <span>
                {activeTab === 'catering'
                  ? (language === 'en' ? `Get WhatsApp Quotation (${paxCount} Pax)` : `Dapatkan Sebut Harga WhatsApp (${paxCount} Pax)`)
                  : (language === 'en' ? 'Request Franchise Details via WhatsApp' : 'Mohon Info Francais Melalui WhatsApp')}
              </span>
            </button>
          </div>

        </div>

      </div>
    </div>
  );
};
