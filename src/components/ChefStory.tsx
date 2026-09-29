import React, { useState } from 'react';
import { Award, Flame, Sparkles, Shield, CheckCircle2, ChevronRight, Star, HeartHandshake, ChefHat } from 'lucide-react';
import { playCrunchSound } from '../utils/sound';
import { useLanguage } from '../context/LanguageContext';

const chefPic = '/chef.png';

export const ChefStory: React.FC = () => {
  const { language, t } = useLanguage();
  const [activePillar, setActivePillar] = useState(0);

  const pillars = [
    {
      title: language === 'en' ? '24-Hour 18 Botanical Spices Marinade' : 'Perapan 24-Jam 18 Rempah Botani',
      tag: language === 'en' ? 'Deep Flavor to the Bone' : 'Kekayaan Rasa Menusuk Tulang',
      desc: language === 'en'
        ? 'Every piece of chicken is deeply marinated for 24 hours in a proprietary blend of 18 natural herbs & spices with zero artificial MSG overload, infusing rich flavor from golden skin to the bone.'
        : 'Setiap potongan ayam diperap selama 24 jam penuh dalam adunan rahsia 18 rempah semula jadi tanpa MSG tiruan melampau, menjadikan isi ayam berperisa dari kulit sampai ke tulang.',
      icon: Flame,
      color: 'from-[#E31E24] to-[#ff4a50]',
      highlight: '24H Secret Spice Infusion',
    },
    {
      title: language === 'en' ? 'Double-Dredge Golden Crust Technique' : 'Teknik Double-Dredge Golden Crust',
      tag: language === 'en' ? 'World-Class Multi-Layered Crunch' : 'Kerangupan Berlapis Bertaraf Dunia',
      desc: language === 'en'
        ? 'Crafted using a two-stage flour dredging technique with precise oil temperature control at 175°C to create a flaky, golden crust that stays crispy for over 45 minutes.'
        : 'Dihasilkan menggunakan teknik salutan tepung dua peringkat dengan kawalan suhu minyak tepat 175°C untuk menghasilkan kerak emas bersisik yang kekal rangup lebih 45 minit.',
      icon: Sparkles,
      color: 'from-[#FDB913] to-[#e69800]',
      highlight: 'Ultra-Crispy 45 Min Retention',
    },
    {
      title: language === 'en' ? '100% Fresh Local Grade-A Chicken' : '100% Ayam Segar Gred-A Tempatan',
      tag: language === 'en' ? 'Never Frozen Import Meat' : 'Bukan Daging Ayam Import Beku',
      desc: language === 'en'
        ? 'We strictly use fresh local poultry delivered daily every morning from JAKIM Halal-certified farms. The meat is tender, succulent, and perfectly juicy.'
        : 'Kami hanya menggunakan ayam segar tempatan yang dibekalkan setiap pagi dari ladang berstatus Halal JAKIM. Tekstur daging lembut, berserat halus dan tidak berbau hamis.',
      icon: Shield,
      color: 'from-emerald-500 to-emerald-700',
      highlight: 'Fresh Daily Farm Delivery',
    },
    {
      title: language === 'en' ? 'Executive Chef Artisan Sauces' : 'Sos Gourmet Ciptaan Chef Eksekutif',
      tag: language === 'en' ? 'Artisan Molten Cheese & Habanero' : 'Artisan Molten Cheese & Habanero',
      desc: language === 'en'
        ? 'Created exclusively by Chef Mohammad Helmi, our sauces are simmered fresh daily with New Zealand imported cheese and fresh Highland Habanero chilies for unmatched flavor bursts.'
        : 'Dicipta khas oleh Chef Mohammad Helmi, sos kami dimasak segar setiap hari dengan keju import New Zealand dan cili Habanero segar untuk ledakan rasa yang tiada tandingan.',
      icon: Award,
      color: 'from-purple-500 to-pink-600',
      highlight: 'Artisan Crafted Sauces',
    },
  ];

  return (
    <section id="resepi" className="py-20 bg-[#0f0f12]/10 backdrop-blur-sm relative overflow-hidden border-t border-b border-white/5">
      {/* Background Ambience (Dark Theme Retained) */}
      <div className="absolute top-0 right-0 w-80 h-80 bg-[#E31E24]/10 rounded-full blur-[100px] pointer-events-none" />
      <div className="absolute bottom-0 left-0 w-80 h-80 bg-[#FDB913]/10 rounded-full blur-[100px] pointer-events-none" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto mb-12 space-y-4">
          <div className="inline-flex items-center gap-2 bg-[#1d1d22] border border-[#FDB913]/30 px-4 py-1.5 rounded-full">
            <Award className="w-4 h-4 text-[#FDB913]" />
            <span className="text-xs font-bold uppercase tracking-widest text-[#FDB913]">
              {t('chef.badge')}
            </span>
          </div>
          
          <h2 className="text-3xl sm:text-5xl font-black text-white uppercase tracking-tight">
            {t('chef.title')} <span className="text-[#FDB913]">HEMZAL</span>
          </h2>
          
          <p className="text-neutral-300 text-sm sm:text-base leading-relaxed">
            {t('chef.desc')}
          </p>
        </div>

        {/* Featured Chef Spotlight Card with chef.png */}
        <div className="bg-white rounded-3xl p-6 sm:p-10 border border-neutral-200/90 shadow-2xl mb-14 relative overflow-hidden">
          {/* Ambient Glow behind Chef */}
          <div className="absolute -top-20 -right-20 w-80 h-80 bg-amber-500/10 rounded-full blur-3xl pointer-events-none" />
          <div className="absolute -bottom-20 -left-20 w-80 h-80 bg-red-500/10 rounded-full blur-3xl pointer-events-none" />

          <div className="grid grid-cols-1 md:grid-cols-12 gap-8 items-center relative z-10">
            
            {/* Chef Portrait Image Column */}
            <div className="md:col-span-5 lg:col-span-4 flex justify-center">
              <div className="relative group">
                {/* Glow border ring */}
                <div className="absolute -inset-2 bg-gradient-to-tr from-[#E31E24] via-[#FDB913] to-[#E31E24] rounded-3xl blur-md opacity-30 group-hover:opacity-50 transition duration-500" />
                
                <div className="relative w-56 sm:w-64 h-80 sm:h-96 rounded-2xl bg-[#FDB913] border-2 border-[#FDB913] overflow-hidden flex items-end justify-center shadow-2xl">
                  <img
                    src={chefPic}
                    alt="Chef Mohammad Helmi"
                    className="w-full h-full object-contain object-bottom select-none hover:scale-105 transition-transform duration-300 drop-shadow-2xl"
                  />
                  
                  {/* Subtle Gradient Shade at Bottom */}
                  <div className="absolute inset-0 bg-gradient-to-t from-black/20 via-transparent to-transparent pointer-events-none" />
                  
                  {/* Floating Chef Title Badge */}
                  <div className="absolute bottom-3 left-3 right-3 bg-white/95 backdrop-blur-md border border-neutral-200/90 p-2.5 rounded-xl shadow-lg flex items-center gap-2.5">
                    <div className="w-8 h-8 rounded-lg bg-amber-500/15 flex items-center justify-center text-[#B45309] shrink-0">
                      <Award className="w-4 h-4 text-[#D97706]" />
                    </div>
                    <div>
                      <p className="text-[10px] font-black uppercase text-[#B45309] leading-tight">Master Chef</p>
                      <p className="text-xs font-black text-neutral-900 leading-tight">Chef Mohammad Helmi</p>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            {/* Chef Bio & Culinary Philosophy */}
            <div className="md:col-span-7 lg:col-span-8 space-y-5 text-left">
              <div className="inline-flex items-center gap-2 bg-amber-500/10 border border-amber-500/25 px-3.5 py-1 rounded-full text-xs font-black uppercase tracking-wider text-[#B45309]">
                <Award className="w-3.5 h-3.5 text-[#D97706]" />
                <span>{t('chef.role')}</span>
              </div>

              <div className="space-y-2">
                <h3 className="text-2xl sm:text-3xl lg:text-4xl font-black text-neutral-900 leading-tight">
                  {t('chef.quote')}
                </h3>
                <p className="text-xs sm:text-sm font-bold text-[#B45309]">
                  — {t('chef.experience')}
                </p>
              </div>

              <p className="text-neutral-600 text-sm sm:text-base leading-relaxed">
                {t('chef.quoteSub')}
              </p>

              {/* 3 Quick Chef Highlights */}
              <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 pt-2">
                <div className="bg-neutral-50 border border-neutral-200 p-3.5 rounded-2xl shadow-2xs">
                  <span className="text-xs font-black text-neutral-900 block">{t('chef.highlight1Title')}</span>
                  <span className="text-[11px] text-neutral-600">{t('chef.highlight1Desc')}</span>
                </div>
                <div className="bg-neutral-50 border border-neutral-200 p-3.5 rounded-2xl shadow-2xs">
                  <span className="text-xs font-black text-neutral-900 block">{t('chef.highlight2Title')}</span>
                  <span className="text-[11px] text-neutral-600">{t('chef.highlight2Desc')}</span>
                </div>
                <div className="bg-neutral-50 border border-neutral-200 p-3.5 rounded-2xl shadow-2xs">
                  <span className="text-xs font-black text-neutral-900 block">{t('chef.highlight3Title')}</span>
                  <span className="text-[11px] text-neutral-600">{t('chef.highlight3Desc')}</span>
                </div>
              </div>
            </div>

          </div>
        </div>

        {/* 4 Pillars Interactive Layout - Light Theme Cards Only */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
          
          {/* Left: Pillar Selection List */}
          <div className="lg:col-span-6 space-y-3">
            <h4 className="text-xs font-black uppercase tracking-wider text-[#FDB913] mb-2 px-1">
              {t('chef.pillarsHeading')}
            </h4>
            {pillars.map((pillar, idx) => {
              const Icon = pillar.icon;
              const isSelected = activePillar === idx;
              return (
                <button
                  key={pillar.title}
                  onClick={() => {
                    playCrunchSound();
                    setActivePillar(idx);
                  }}
                  className={`w-full text-left p-5 rounded-2xl border transition-all cursor-pointer flex items-start gap-4 ${
                    isSelected
                      ? 'bg-white border-2 border-[#FDB913] shadow-xl shadow-black/20 translate-x-2'
                      : 'bg-white/90 hover:bg-white border-neutral-200 shadow-xs'
                  }`}
                >
                  <div
                    className={`w-12 h-12 rounded-xl flex items-center justify-center shrink-0 shadow-md transition-all ${
                      isSelected
                        ? 'bg-gradient-to-br from-[#E31E24] to-[#FDB913] text-white'
                        : 'bg-neutral-100 text-neutral-500'
                    }`}
                  >
                    <Icon className="w-6 h-6" />
                  </div>

                  <div className="flex-1">
                    <div className="flex items-center justify-between">
                      <span className="text-[11px] font-bold uppercase tracking-wider text-[#B45309]">
                        {t('chef.pillarTag')} 0{idx + 1}
                      </span>
                      {isSelected && (
                        <span className="text-[10px] bg-[#E31E24] text-white font-black px-2 py-0.5 rounded-full shadow-xs">
                          {t('chef.activeStatus')}
                        </span>
                      )}
                    </div>
                    <h3 className={`font-black text-base sm:text-lg mt-0.5 ${isSelected ? 'text-neutral-900' : 'text-neutral-800'}`}>
                      {pillar.title}
                    </h3>
                    <p className="text-xs text-neutral-600 mt-1 line-clamp-2">
                      {pillar.desc}
                    </p>
                  </div>

                  <ChevronRight className={`w-5 h-5 shrink-0 self-center transition-transform ${isSelected ? 'text-[#B45309] translate-x-1' : 'text-neutral-400'}`} />
                </button>
              );
            })}
          </div>

          {/* Right: Active Pillar Showcase Card (Light Theme) */}
          <div className="lg:col-span-6">
            <div className="relative rounded-3xl p-8 sm:p-10 bg-white border border-neutral-200/90 shadow-2xl shadow-black/30 overflow-hidden">
              {/* Decorative Watermark */}
              <div className="absolute -bottom-10 -right-10 text-neutral-100 font-black text-9xl select-none pointer-events-none">
                0{activePillar + 1}
              </div>

              <div className="relative z-10 space-y-6">
                <div className="inline-flex items-center gap-2 bg-amber-100 text-[#B45309] border border-amber-300/80 px-3.5 py-1 rounded-full text-xs font-black tracking-wider uppercase">
                  {pillars[activePillar].highlight}
                </div>

                <h3 className="text-2xl sm:text-3xl font-black text-neutral-900 leading-tight">
                  {pillars[activePillar].title}
                </h3>

                <p className="text-neutral-600 text-sm sm:text-base leading-relaxed">
                  {pillars[activePillar].desc}
                </p>

                {/* Proof Points List */}
                <div className="space-y-3 pt-4 border-t border-neutral-200">
                  <div className="flex items-center gap-3 text-sm text-neutral-700">
                    <CheckCircle2 className="w-5 h-5 text-[#E31E24] shrink-0" />
                    <span>{t('chef.proofPoint1')}</span>
                  </div>
                  <div className="flex items-center gap-3 text-sm text-neutral-700">
                    <CheckCircle2 className="w-5 h-5 text-[#E31E24] shrink-0" />
                    <span>{t('chef.proofPoint2')}</span>
                  </div>
                  <div className="flex items-center gap-3 text-sm text-neutral-700">
                    <CheckCircle2 className="w-5 h-5 text-[#E31E24] shrink-0" />
                    <span>{t('chef.proofPoint3')}</span>
                  </div>
                </div>
              </div>
            </div>
          </div>

        </div>

      </div>
    </section>
  );
};
