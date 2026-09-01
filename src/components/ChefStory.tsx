import React, { useState } from 'react';
import { Award, Flame, Sparkles, Shield, CheckCircle2, ChevronRight, Quote } from 'lucide-react';
import { playCrunchSound } from '../utils/sound';
import chefPic from '/chef.png';

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
      {/* Background Ambience */}
      <div className="absolute top-0 right-0 w-80 h-80 bg-[#E31E24]/10 rounded-full blur-[100px] pointer-events-none" />
      <div className="absolute bottom-0 left-0 w-80 h-80 bg-[#F0B012]/10 rounded-full blur-[100px] pointer-events-none" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto mb-12 space-y-4">
          <div className="inline-flex items-center gap-2 bg-[#1d1d22] border border-[#F0B012]/30 px-4 py-1.5 rounded-full">
            <Award className="w-4 h-4 text-[#F0B012]" />
            <span className="text-xs font-bold uppercase tracking-widest text-[#F0B012]">
              Sentuhan Pakar Kulinari Antarabangsa
            </span>
          </div>
          
          <h2 className="text-3xl sm:text-5xl font-black text-white uppercase tracking-tight">
            RAHSIA DI SEBALIK KEHEBATAN <span className="text-[#F0B012]">HEMZAL</span>
          </h2>
        </div>

        {/* Chef Spotlight & Profile Section */}
        <div className="mb-16 bg-gradient-to-r from-[#17171c] to-[#1d1d24] border border-white/10 rounded-3xl p-6 sm:p-10 relative overflow-hidden shadow-2xl">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
            
            {/* Chef Image Container */}
            <div className="lg:col-span-5 relative group">
              <div className="absolute -inset-1 bg-gradient-to-r from-[#E31E24] to-[#F0B012] rounded-2xl blur opacity-30 group-hover:opacity-75 transition duration-500" />
              <div className="relative aspect-[4/5] sm:aspect-square lg:aspect-[4/5] rounded-2xl overflow-hidden border border-white/10 bg-[#F0B012]">
                <img
                  src={chefPic}
                  alt="Chef Mohammad Helmi"
                  className="w-full h-full object-cover object-center group-hover:scale-105 transition-transform duration-700 relative z-10"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-transparent z-20" />
                
                {/* Image Overlay Badge */}
                <div className="absolute bottom-4 left-4 right-4 bg-black/60 backdrop-blur-md p-3 rounded-xl border border-white/10 z-30">
                  <p className="text-white font-black text-sm">Chef Mohammad Helmi</p>
                  <p className="text-[#F0B012] text-xs font-medium">Pengasas & Master Recipe Creator</p>
                </div>
              </div>
            </div>

            {/* Chef Bio & Philosophy */}
            <div className="lg:col-span-7 space-y-6">
              <div className="space-y-2">
                <span className="text-xs font-bold uppercase tracking-wider text-[#E31E24] bg-[#E31E24]/10 px-3 py-1 rounded-md border border-[#E31E24]/20">
                  15+ Tahun Pengalaman Hotel 5-Bintang
                </span>
                <h3 className="text-2xl sm:text-4xl font-black text-white leading-tight">
                  "Misi Kami: Kualiti Gourmet 5-Star Untuk Semua."
                </h3>
              </div>

              <div className="relative pl-6 border-l-2 border-[#F0B012]/60 italic text-neutral-300 text-sm sm:text-base leading-relaxed">
                <Quote className="w-8 h-8 text-[#F0B012]/20 absolute -top-3 -left-3 pointer-events-none" />
                <p>
                  "Saya memindahkan teknik perapan rahsia, kawalan suhu kulinari tepat, dan adunan rempah segar yang dipelajari di dapur profesional antarabangsa terus ke dalam setiap ketulan ayam goreng Hemzal."
                </p>
              </div>

              <p className="text-neutral-400 text-sm leading-relaxed">
                Setiap resepi yang dihidangkan menjalani beratus-ratus jam ujian rasa bagi memastikan keseimbangan kerangupan luaran dan kelembutan isi yang jus di bahagian dalam.
              </p>

              {/* Quick Stats Grid */}
              <div className="grid grid-cols-3 gap-4 pt-4 border-t border-white/10">
                <div>
                  <div className="text-xl sm:text-2xl font-black text-[#F0B012]">18</div>
                  <div className="text-[11px] text-neutral-400 font-medium uppercase tracking-wider">Rempah Botani</div>
                </div>
                <div>
                  <div className="text-xl sm:text-2xl font-black text-[#F0B012]">24 Jam</div>
                  <div className="text-[11px] text-neutral-400 font-medium uppercase tracking-wider">Proses Perapan</div>
                </div>
                <div>
                  <div className="text-xl sm:text-2xl font-black text-[#F0B012]">100%</div>
                  <div className="text-[11px] text-neutral-400 font-medium uppercase tracking-wider">Halal Tempatan</div>
                </div>
              </div>
            </div>

          </div>
        </div>

        {/* 4 Pillars Interactive Layout */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
          
          {/* Left: Pillar Selection List */}
          <div className="lg:col-span-6 space-y-3">
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
                      ? 'bg-white border-2 border-[#F0B012] shadow-xl shadow-black/20 translate-x-2'
                      : 'bg-white/90 hover:bg-white border-neutral-200 shadow-xs'
                  }`}
                >
                  <div
                    className={`w-12 h-12 rounded-xl flex items-center justify-center shrink-0 shadow-md transition-all ${
                      isSelected
                        ? 'bg-gradient-to-br from-[#E31E24] to-[#F0B012] text-white'
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

          {/* Right: Active Pillar Showcase Card */}
          <div className="lg:col-span-6">
            <div className="relative rounded-3xl p-8 sm:p-10 bg-white border border-neutral-200/90 shadow-2xl shadow-black/30 overflow-hidden">
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
