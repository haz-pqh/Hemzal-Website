import React, { useState } from 'react';
import { Award, Flame, Sparkles, Shield, CheckCircle2, ChevronRight, Quote } from 'lucide-react';
import { playCrunchSound } from '../utils/sound';

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
    <section id="resepi" className="py-20 bg-neutral-50/80 relative overflow-hidden border-t border-b border-neutral-200">
      {/* Soft Background Accent Glows */}
      <div className="absolute top-0 right-0 w-96 h-96 bg-[#E31E24]/5 rounded-full blur-[100px] pointer-events-none" />
      <div className="absolute bottom-0 left-0 w-96 h-96 bg-[#FDB913]/10 rounded-full blur-[100px] pointer-events-none" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto mb-12 space-y-4">
          <div className="inline-flex items-center gap-2 bg-amber-100/80 border border-amber-300 px-4 py-1.5 rounded-full">
            <Award className="w-4 h-4 text-[#B45309]" />
            <span className="text-xs font-bold uppercase tracking-widest text-[#B45309]">
              Sentuhan Pakar Kulinari Antarabangsa
            </span>
          </div>
          
          <h2 className="text-3xl sm:text-5xl font-black text-neutral-900 uppercase tracking-tight">
            RAHSIA DI SEBALIK KEHEBATAN <span className="text-[#E31E24]">HEMZAL</span>
          </h2>
        </div>

        {/* Chef Spotlight Section */}
        <div className="mb-16 bg-white border border-neutral-200/80 rounded-3xl p-6 sm:p-10 relative overflow-hidden shadow-xl shadow-neutral-200/50">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
            
            {/* Chef Image Container */}
            <div className="lg:col-span-5 relative group">
              <div className="absolute -inset-1 bg-gradient-to-r from-[#E31E24]/20 to-[#FDB913]/30 rounded-2xl blur opacity-60 group-hover:opacity-100 transition duration-500" />
              <div className="relative aspect-[4/5] sm:aspect-square lg:aspect-[4/5] rounded-2xl overflow-hidden border border-neutral-200 bg-neutral-100 shadow-md">
                <img
                  src="https://images.unsplash.com/photo-1577219491135-ce391730fb2c?auto=format&fit=crop&q=80&w=800"
                  alt="Chef Mohammad Helmi"
                  className="w-full h-full object-cover object-center group-hover:scale-105 transition-transform duration-700"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/20 to-transparent" />
                
                {/* Floating Image Badge */}
                <div className="absolute bottom-4 left-4 right-4 bg-white/95 backdrop-blur-md p-3.5 rounded-xl border border-white/60 shadow-lg">
                  <p className="text-neutral-900 font-black text-sm">Chef Mohammad Helmi</p>
                  <p className="text-[#B45309] text-xs font-bold">Pengasas & Master Recipe Creator</p>
                </div>
              </div>
            </div>

            {/* Chef Bio & Quote */}
            <div className="lg:col-span-7 space-y-6">
              <div className="space-y-3">
                <span className="text-xs font-bold uppercase tracking-wider text-[#E31E24] bg-[#E31E24]/10 px-3 py-1 rounded-md border border-[#E31E24]/20">
                  15+ Tahun Pengalaman Hotel 5-Bintang
                </span>
                <h3 className="text-2xl sm:text-4xl font-black text-neutral-900 leading-tight">
                  "Misi Kami: Kualiti Gourmet 5-Star Untuk Semua."
                </h3>
              </div>

              <div className="relative pl-5 border-l-4 border-[#FDB913] italic text-neutral-700 text-sm sm:text-base leading-relaxed bg-amber-50/50 py-3 pr-4 rounded-r-xl">
                <Quote className="w-8 h-8 text-[#FDB913]/20 absolute top-2 right-2 pointer-events-none" />
                <p>
                  "Saya memindahkan teknik perapan rahsia, kawalan suhu kulinari tepat, dan adunan rempah segar yang dipelajari di dapur profesional antarabangsa terus ke dalam setiap ketulan ayam goreng Hemzal."
                </p>
              </div>

              <p className="text-neutral-600 text-sm leading-relaxed">
                Setiap resepi yang dihidangkan menjalani beratus-ratus jam ujian rasa bagi memastikan keseimbangan kerangupan luaran dan kelembutan isi yang jus di bahagian dalam.
              </p>

              {/* Stats Bar */}
              <div className="grid grid-cols-3 gap-3 sm:gap-4 pt-4 border-t border-neutral-100">
                <div className="bg-neutral-50 p-3 rounded-xl border border-neutral-100 text-center sm:text-left">
                  <div className="text-xl sm:text-2xl font-black text-[#E31E24]">18</div>
                  <div className="text-[11px] text-neutral-500 font-bold uppercase tracking-wider">Rempah Botani</div>
                </div>
                <div className="bg-neutral-50 p-3 rounded-xl border border-neutral-100 text-center sm:text-left">
                  <div className="text-xl sm:text-2xl font-black text-[#E31E24]">24 Jam</div>
                  <div className="text-[11px] text-neutral-500 font-bold uppercase tracking-wider">Proses Perapan</div>
                </div>
                <div className="bg-neutral-50 p-3 rounded-xl border border-neutral-100 text-center sm:text-left">
                  <div className="text-xl sm:text-2xl font-black text-[#E31E24]">100%</div>
                  <div className="text-[11px] text-neutral-500 font-bold uppercase tracking-wider">Halal Tempatan</div>
                </div>
              </div>
            </div>

          </div>
        </div>

        {/* 4 Pillars Interactive Layout */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
          
          {/* Pillar Selector List */}
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
                      ? 'bg-white border-2 border-[#FDB913] shadow-lg shadow-neutral-200 translate-x-2'
                      : 'bg-white/80 hover:bg-white border-neutral-200/80 shadow-xs'
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

          {/* Active Pillar Details Card */}
          <div className="lg:col-span-6">
            <div className="relative rounded-3xl p-8 sm:p-10 bg-white border border-neutral-200/90 shadow-xl shadow-neutral-200/60 overflow-hidden">
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
