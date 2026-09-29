import React, { useState } from 'react';
import { Award, Flame, Sparkles, Shield, CheckCircle2, ChevronRight, Star, HeartHandshake, ChefHat } from 'lucide-react';
import { playCrunchSound } from '../utils/sound';

const chefPic = '/chef.png';

export const ChefStory: React.FC = () => {
  const [activePillar, setActivePillar] = useState(0);

  const pillars = [
    {
      title: 'Perapan 24-Jam 18 Rempah Botani',
      tag: 'Kekayaan Rasa Menusuk Tulang',
      desc: 'Setiap potongan ayam diperap selama 24 jam penuh dalam adunan rahsia 18 rempah semula jadi tanpa MSG tiruan melampau, menjadikan isi ayam berperisa dari kulit sampai ke tulang.',
      icon: Flame,
      color: 'from-[#E31E24] to-[#ff4a50]',
      highlight: '24H Secret Spice Infusion',
    },
    {
      title: 'Teknik Double-Dredge Golden Crust',
      tag: 'Kerangupan Berlapis Bertaraf Dunia',
      desc: 'Dihasilkan menggunakan teknik salutan tepung dua peringkat dengan kawalan suhu minyak tepat 175°C untuk menghasilkan kerak emas bersisik yang kekal rangup lebih 45 minit.',
      icon: Sparkles,
      color: 'from-[#FDB913] to-[#e69800]',
      highlight: 'Ultra-Crispy 45 Min Retention',
    },
    {
      title: '100% Ayam Segar Gred-A Tempatan',
      tag: 'Bukan Daging Ayam Import Beku',
      desc: 'Kami hanya menggunakan ayam segar tempatan yang dibekalkan setiap pagi dari ladang berstatus Halal JAKIM. Tekstur daging lembut, berserat halus dan tidak berbau hamis.',
      icon: Shield,
      color: 'from-emerald-500 to-emerald-700',
      highlight: 'Fresh Daily Farm Delivery',
    },
    {
      title: 'Sos Gourmet Ciptaan Chef Eksekutif',
      tag: 'Artisan Molten Cheese & Habanero',
      desc: 'Dicipta khas oleh Chef Mohammad Helmi, sos kami dimasak segar setiap hari dengan keju import New Zealand dan cili Habanero segar untuk ledakan rasa yang tiada tandingan.',
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
              Sentuhan Pakar Kulinari Antarabangsa
            </span>
          </div>
          
          <h2 className="text-3xl sm:text-5xl font-black text-white uppercase tracking-tight">
            RAHSIA DI SEBALIK KEHEBATAN <span className="text-[#FDB913]">HEMZAL</span>
          </h2>
          
          <p className="text-neutral-300 text-sm sm:text-base leading-relaxed">
            Dicipta oleh <strong className="text-white">Chef Mohammad Helmi</strong>, bekas Chef Eksekutif rangkaian hotel 5-bintang dengan pengalaman kulinari lebih 15 tahun. Misi kami: membawakan ayam goreng kualiti tertinggi pada harga yang berpatutan untuk semua.
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
                <span>Pengasas & Ketua Kulinari Hemzal</span>
              </div>

              <div className="space-y-2">
                <h3 className="text-2xl sm:text-3xl lg:text-4xl font-black text-neutral-900 leading-tight">
                  "Setiap Gigitan Mesti <span className="text-[#E31E24]">Berbunyi Kerangupan</span> & Mengalirkan Jus."
                </h3>
                <p className="text-xs sm:text-sm font-bold text-[#B45309]">
                  — 15+ Tahun Pengalaman Kulinari Hotel 5-Bintang
                </p>
              </div>

              <p className="text-neutral-600 text-sm sm:text-base leading-relaxed">
                Bermula dari dapur hotel mewah bertaraf 5-bintang, Chef Mohammad Helmi membawa formula rahsia perapan botani 24 jam dan teknik kawalan suhu minyak terperinci ke hidangan harian anda. Tiada jalan pintas — setiap ketul ayam Hemzal disalut dan digoreng panas mengikut piawaian kulinari bertaraf dunia.
              </p>

              {/* 3 Quick Chef Highlights */}
              <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 pt-2">
                <div className="bg-neutral-50 border border-neutral-200 p-3.5 rounded-2xl shadow-2xs">
                  <span className="text-xs font-black text-neutral-900 block">18 Rempah Botani</span>
                  <span className="text-[11px] text-neutral-600">Perapan rahsia tanpa MSG melampau</span>
                </div>
                <div className="bg-neutral-50 border border-neutral-200 p-3.5 rounded-2xl shadow-2xs">
                  <span className="text-xs font-black text-neutral-900 block">Kawalan Minyak 175°C</span>
                  <span className="text-[11px] text-neutral-600">Kekal rangup berjam tanpa berminyak</span>
                </div>
                <div className="bg-neutral-50 border border-neutral-200 p-3.5 rounded-2xl shadow-2xs">
                  <span className="text-xs font-black text-neutral-900 block">Sos Resepi Asli</span>
                  <span className="text-[11px] text-neutral-600">Keju New Zealand & cili segar tempatan</span>
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
              4 Tonggak Utama Kerangupan Hemzal:
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
                        Pillar 0{idx + 1}
                      </span>
                      {isSelected && (
                        <span className="text-[10px] bg-[#E31E24] text-white font-black px-2 py-0.5 rounded-full shadow-xs">
                          AKTIF
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
                    <span>Disediakan segar mengikut piawaian sanitasi gred hotel.</span>
                  </div>
                  <div className="flex items-center gap-3 text-sm text-neutral-700">
                    <CheckCircle2 className="w-5 h-5 text-[#E31E24] shrink-0" />
                    <span>Minyak masak sentiasa dipantau nilai TPM untuk kerangupan selamat.</span>
                  </div>
                  <div className="flex items-center gap-3 text-sm text-neutral-700">
                    <CheckCircle2 className="w-5 h-5 text-[#E31E24] shrink-0" />
                    <span>Dijamin 100% Halal dan suci oleh pembekal tempatan bertauliah.</span>
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
