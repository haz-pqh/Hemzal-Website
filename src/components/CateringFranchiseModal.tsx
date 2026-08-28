import React, { useState } from 'react';
import { X, Users, Utensils, Award, Calculator, MessageSquare, Check, Sparkles, Building2 } from 'lucide-react';
import confetti from 'canvas-confetti';
import { playPopSound } from '../utils/sound';

interface CateringFranchiseModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export const CateringFranchiseModal: React.FC<CateringFranchiseModalProps> = ({
  isOpen,
  onClose,
}) => {
  if (!isOpen) return null;

  const [activeTab, setActiveTab] = useState<'catering' | 'franchise'>('catering');
  const [paxCount, setPaxCount] = useState<number>(50);
  const [packageType, setPackageType] = useState<'standard' | 'premium' | 'royale'>('premium');

  // Catering price calculations
  const pricePerPax = {
    standard: 14.00, // 1pc Mega Chicken + Rice/Wedges + Teh Ais
    premium: 18.50,  // 2pc Mega Chicken + Wedges + Coleslaw + Drinks + Sos
    royale: 24.00,   // 2pc Mega Chicken + Burger + Wedges + Coleslaw + Dips + Dessert + Free Delivery
  };

  const estimatedTotal = paxCount * pricePerPax[packageType];

  const handleSendWhatsApp = () => {
    playPopSound();
    confetti({ particleCount: 70, spread: 50 });
    const text = activeTab === 'catering'
      ? `Hai Hemzal Catering! Saya ingin tempah katering untuk ${paxCount} Pax (Pakej ${packageType.toUpperCase()}). Anggaran RM ${estimatedTotal.toFixed(2)}. Boleh bantu saya?`
      : `Hai Hemzal HQ! Saya berminat untuk memohon peluang perkongsian Francais Cawangan Hemzal Crispy Chicken. Mohon maklumat lanjut.`;
    
    window.open(`https://wa.me/60123456789?text=${encodeURIComponent(text)}`, '_blank');
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-md overflow-y-auto animate-in fade-in">
      <div className="relative w-full max-w-2xl bg-[#141419] border border-white/15 rounded-3xl shadow-2xl overflow-hidden text-white my-8 max-h-[90vh] flex flex-col">
        
        {/* Header with Tabs */}
        <div className="p-6 border-b border-white/10 bg-[#191922] flex items-center justify-between">
          <div className="flex items-center gap-2">
            <button
              onClick={() => setActiveTab('catering')}
              className={`px-4 py-2 rounded-xl text-xs font-black uppercase tracking-wider transition-all cursor-pointer flex items-center gap-1.5 ${
                activeTab === 'catering'
                  ? 'bg-[#E31E24] text-white shadow-md'
                  : 'bg-white/5 text-neutral-400 hover:text-white'
              }`}
            >
              <Utensils className="w-3.5 h-3.5" />
              <span>Tempahan Katering & Acara</span>
            </button>
            <button
              onClick={() => setActiveTab('franchise')}
              className={`px-4 py-2 rounded-xl text-xs font-black uppercase tracking-wider transition-all cursor-pointer flex items-center gap-1.5 ${
                activeTab === 'franchise'
                  ? 'bg-[#FDB913] text-black shadow-md'
                  : 'bg-white/5 text-neutral-400 hover:text-black'
              }`}
            >
              <Building2 className="w-3.5 h-3.5" />
              <span>Peluang Francais</span>
            </button>
          </div>

          <button
            onClick={onClose}
            className="w-8 h-8 rounded-full bg-white/10 hover:bg-white/20 flex items-center justify-center text-white cursor-pointer"
            aria-label="Tutup"
          >
            <X className="w-4 h-4" />
          </button>
        </div>

        {/* Modal Content */}
        <div data-lenis-prevent className="p-6 overflow-y-auto space-y-6 flex-1 text-sm custom-scrollbar">
          
          {activeTab === 'catering' ? (
            <div className="space-y-6">
              <div className="space-y-1">
                <h3 className="text-xl font-black text-white">Kalkulator Katering & Majlis Korporat</h3>
                <p className="text-xs text-neutral-400">
                  Sesuai untuk Jamuan Pejabat, Sambutan Hari Lahir, Kenduri Kahwin & Sukan Sekolah.
                </p>
              </div>

              {/* Pax Slider */}
              <div className="bg-[#1b1b24] p-5 rounded-2xl border border-white/5 space-y-3">
                <div className="flex items-center justify-between">
                  <label className="text-xs font-bold text-neutral-300 uppercase flex items-center gap-2">
                    <Users className="w-4 h-4 text-[#FDB913]" /> Jumlah Tetamu (Pax)
                  </label>
                  <span className="text-xl font-black text-[#FDB913]">{paxCount} Orang</span>
                </div>
                <input
                  type="range"
                  min="20"
                  max="500"
                  step="10"
                  value={paxCount}
                  onChange={(e) => setPaxCount(Number(e.target.value))}
                  className="w-full accent-[#E31E24] cursor-pointer"
                />
                <div className="flex justify-between text-[10px] text-neutral-500 font-bold">
                  <span>Min: 20 Pax</span>
                  <span>100 Pax</span>
                  <span>250 Pax</span>
                  <span>Maks: 500 Pax</span>
                </div>
              </div>

              {/* Package Selector */}
              <div className="space-y-2">
                <label className="text-xs font-bold text-neutral-300 uppercase">Pilih Pakej Katering</label>
                <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
                  
                  <button
                    type="button"
                    onClick={() => setPackageType('standard')}
                    className={`p-3.5 rounded-xl border text-left transition-all cursor-pointer ${
                      packageType === 'standard'
                        ? 'bg-[#E31E24]/20 border-[#E31E24] text-white'
                        : 'bg-[#1a1a22] border-white/5 text-neutral-400'
                    }`}
                  >
                    <span className="text-xs font-black block text-white">Pakej Standard</span>
                    <span className="text-xs text-[#FDB913] font-bold">RM 14.00 / pax</span>
                    <p className="text-[10px] text-neutral-400 mt-1">1x Ayam Mega, Wedges & Minuman</p>
                  </button>

                  <button
                    type="button"
                    onClick={() => setPackageType('premium')}
                    className={`p-3.5 rounded-xl border text-left transition-all cursor-pointer ${
                      packageType === 'premium'
                        ? 'bg-[#FDB913]/20 border-[#FDB913] text-white'
                        : 'bg-[#1a1a22] border-white/5 text-neutral-400'
                    }`}
                  >
                    <span className="text-xs font-black block text-white">Pakej Premium (Popular)</span>
                    <span className="text-xs text-[#FDB913] font-bold">RM 18.50 / pax</span>
                    <p className="text-[10px] text-neutral-400 mt-1">2x Ayam Mega, Wedges, Coleslaw & Sos</p>
                  </button>

                  <button
                    type="button"
                    onClick={() => setPackageType('royale')}
                    className={`p-3.5 rounded-xl border text-left transition-all cursor-pointer ${
                      packageType === 'royale'
                        ? 'bg-purple-500/20 border-purple-500 text-white'
                        : 'bg-[#1a1a22] border-white/5 text-neutral-400'
                    }`}
                  >
                    <span className="text-xs font-black block text-white">Pakej Royale Feast</span>
                    <span className="text-xs text-[#FDB913] font-bold">RM 24.00 / pax</span>
                    <p className="text-[10px] text-neutral-400 mt-1">2x Ayam + Burger + Wedges + Free Penghantaran</p>
                  </button>

                </div>
              </div>

              {/* Estimate Summary */}
              <div className="p-4 rounded-2xl bg-gradient-to-r from-[#1f1f2a] to-[#171720] border border-white/10 flex items-center justify-between">
                <div>
                  <span className="text-[10px] text-neutral-400 uppercase font-bold">Anggaran Kos Pakej</span>
                  <p className="text-2xl font-black text-[#FDB913]">RM {estimatedTotal.toFixed(2)}</p>
                  <p className="text-[10px] text-neutral-400">Termasuk pek kotak bungkusan panas</p>
                </div>
                <div className="text-right">
                  <span className="text-xs bg-emerald-500/20 text-emerald-300 px-2.5 py-1 rounded-full font-bold">
                    Diskaun Korporat Termasuk
                  </span>
                </div>
              </div>

            </div>
          ) : (
            <div className="space-y-4">
              <div className="space-y-1">
                <h3 className="text-xl font-black text-white">Peluang Rakan Niaga & Francais Hemzal</h3>
                <p className="text-xs text-neutral-400">
                  Sertai jenama ayam goreng paling pantas berkembang di Malaysia dengan margin keuntungan tinggi dan sistem dapur berpusat (Central Kitchen).
                </p>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                <div className="p-4 rounded-2xl bg-[#1b1b24] border border-white/5 space-y-1">
                  <span className="text-[10px] text-[#FDB913] font-bold uppercase">Format Kiosk & Lot Kedai</span>
                  <h4 className="font-bold text-sm text-white">Pelaburan Fleksibel</h4>
                  <p className="text-xs text-neutral-400">Pilihan model Kiosk Mall, Shoplot Standard, atau Drive-Thru Hub.</p>
                </div>
                <div className="p-4 rounded-2xl bg-[#1b1b24] border border-white/5 space-y-1">
                  <span className="text-[10px] text-[#FDB913] font-bold uppercase">Bekalan Dapur Pusat</span>
                  <h4 className="font-bold text-sm text-white">SOP Mudah & Standard</h4>
                  <p className="text-xs text-neutral-400">Ayam diperap siap dari Central Kitchen, tidak perlu chef berpengalaman.</p>
                </div>
              </div>

              <div className="p-4 rounded-2xl bg-white/5 border border-white/5 space-y-2 text-xs text-neutral-300">
                <div className="flex items-center gap-2">
                  <Check className="w-4 h-4 text-emerald-400" />
                  <span>Bimbingan pemasaran media sosial dan papan tanda cawangan.</span>
                </div>
                <div className="flex items-center gap-2">
                  <Check className="w-4 h-4 text-emerald-400" />
                  <span>Latihan intensif operasi dapur dan sistem POS bersepadu.</span>
                </div>
                <div className="flex items-center gap-2">
                  <Check className="w-4 h-4 text-emerald-400" />
                  <span>ROI anggaran dalam masa 12 - 18 bulan operasi.</span>
                </div>
              </div>

            </div>
          )}

          {/* Action Button */}
          <div className="pt-2">
            <button
              onClick={handleSendWhatsApp}
              className="w-full py-4 rounded-2xl bg-gradient-to-r from-[#25D366] to-[#128C7E] hover:from-[#2bf376] hover:to-[#16a594] text-black font-black text-sm uppercase tracking-wider flex items-center justify-center gap-2 shadow-xl shadow-[#25D366]/20 transition-all cursor-pointer"
            >
              <MessageSquare className="w-5 h-5" />
              <span>
                {activeTab === 'catering'
                  ? `Dapatkan Sebut Harga WhatsApp (${paxCount} Pax)`
                  : 'Mohon Info Francais Melalui WhatsApp'}
              </span>
            </button>
          </div>

        </div>

      </div>
    </div>
  );
};
