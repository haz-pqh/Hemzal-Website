import React, { useState } from 'react';
import { Phone, Mail, Clock, MessageSquare, Send, CheckCircle2, Flame, Sparkles } from 'lucide-react';
import confetti from 'canvas-confetti';
import { playPopSound } from '../utils/sound';

export const ContactSection: React.FC = () => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    subject: 'Pertanyaan Umum',
    message: '',
  });
  const [submitted, setSubmitted] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    playPopSound();
    confetti({
      particleCount: 80,
      spread: 60,
      origin: { y: 0.8 },
    });
    setSubmitted(true);
  };

  return (
    <section id="hubungi" className="py-20 bg-[#09090c] relative overflow-hidden border-t border-white/5">
      {/* Glow */}
      <div className="absolute top-1/2 right-10 w-96 h-96 bg-[#E31E24]/10 rounded-full blur-[140px] pointer-events-none" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        
        {/* Header */}
        <div className="text-center max-w-3xl mx-auto mb-16 space-y-3">
          <div className="inline-flex items-center gap-1.5 bg-[#16161b] border border-[#FDB913]/30 px-3.5 py-1 rounded-full text-xs font-black uppercase tracking-widest text-[#FDB913]">
            <MessageSquare className="w-3.5 h-3.5" />
            <span>Khidmat Pelanggan & Maklum Balas</span>
          </div>

          <h2 className="text-3xl sm:text-5xl font-black text-white uppercase tracking-tight">
            HUBUNGI <span className="text-[#FDB913]">PASUKAN HEMZAL</span>
          </h2>

          <p className="text-neutral-300 text-sm sm:text-base">
            Ada sebarang cadangan, pertanyaan menu, atau jemputan kolaborasi? Kami sedia melayani anda dengan penuh mesra.
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 items-start">
          
          {/* Left Column: Direct Info Boxes */}
          <div className="lg:col-span-5 space-y-4">
            
            {/* WhatsApp Box */}
            <a
              href="https://wa.me/60123456789?text=Hai%20Hemzal%20Crispy%20Chicken,%20saya%20ada%20pertanyaan."
              target="_blank"
              rel="noopener noreferrer"
              className="p-6 rounded-3xl bg-[#141418] hover:bg-[#191920] border border-white/10 hover:border-[#25D366]/50 transition-all duration-300 flex items-center gap-4 group block shadow-lg"
            >
              <div className="w-14 h-14 rounded-2xl bg-[#25D366]/20 flex items-center justify-center text-[#25D366] group-hover:scale-110 transition-transform shrink-0">
                <MessageSquare className="w-7 h-7" />
              </div>
              <div>
                <span className="text-[10px] uppercase font-bold text-[#25D366] tracking-wider">
                  Respons Pantas (WhatsApp)
                </span>
                <h4 className="font-black text-base text-white">+60 12-345 6789</h4>
                <p className="text-xs text-neutral-400">Tekan untuk sembang terus bersama admin</p>
              </div>
            </a>

            {/* Email Box */}
            <div className="p-6 rounded-3xl bg-[#141418] border border-white/10 flex items-center gap-4 shadow-lg">
              <div className="w-14 h-14 rounded-2xl bg-[#FDB913]/20 flex items-center justify-center text-[#FDB913] shrink-0">
                <Mail className="w-7 h-7" />
              </div>
              <div>
                <span className="text-[10px] uppercase font-bold text-[#FDB913] tracking-wider">
                  Email Rasmi
                </span>
                <h4 className="font-black text-base text-white">hello@hemzalcrispychicken.com</h4>
                <p className="text-xs text-neutral-400">Untuk pertanyaan media & rasmi</p>
              </div>
            </div>

            {/* Operating Hours Box */}
            <div className="p-6 rounded-3xl bg-[#141418] border border-white/10 flex items-center gap-4 shadow-lg">
              <div className="w-14 h-14 rounded-2xl bg-[#E31E24]/20 flex items-center justify-center text-[#E31E24] shrink-0">
                <Clock className="w-7 h-7" />
              </div>
              <div>
                <span className="text-[10px] uppercase font-bold text-[#E31E24] tracking-wider">
                  Waktu Operasi Dapur
                </span>
                <h4 className="font-black text-base text-white">10:30 AM – 11:00 PM</h4>
                <p className="text-xs text-neutral-400">Dibuka 7 hari seminggu (Termasuk Cuti Umum)</p>
              </div>
            </div>

            {/* HQ Address Box */}
            <div className="p-6 rounded-3xl bg-gradient-to-r from-[#17171e] to-[#121216] border border-white/10 space-y-2">
              <h4 className="font-black text-sm text-white flex items-center gap-2">
                <Flame className="w-4 h-4 text-[#FDB913]" /> Ibu Pejabat & Dapur Pusat Hemzal
              </h4>
              <p className="text-xs text-neutral-400 leading-relaxed">
                No. 24G & 26G, Jalan Pandan Indah 4/6, Pandan Indah, 55100 Kuala Lumpur, Wilayah Persekutuan Kuala Lumpur.
              </p>
            </div>

          </div>

          {/* Right Column: Contact Form */}
          <div className="lg:col-span-7 bg-[#141419] border border-white/10 rounded-3xl p-6 sm:p-10 shadow-2xl">
            {submitted ? (
              <div className="text-center py-12 space-y-4">
                <div className="w-16 h-16 rounded-full bg-emerald-500/20 text-emerald-400 flex items-center justify-center mx-auto border border-emerald-500/30">
                  <CheckCircle2 className="w-8 h-8" />
                </div>
                <h3 className="text-2xl font-black text-white">Mesej Anda Berjaya Dihantar!</h3>
                <p className="text-sm text-neutral-300 max-w-md mx-auto">
                  Terima kasih, <strong>{formData.name}</strong>. Pegawai perhubungan pelanggan Hemzal akan membalas emel/telefon anda dalam masa 24 jam.
                </p>
                <button
                  onClick={() => {
                    setSubmitted(false);
                    setFormData({ name: '', email: '', phone: '', subject: 'Pertanyaan Umum', message: '' });
                  }}
                  className="mt-4 px-6 py-2.5 bg-white/10 hover:bg-white/20 text-white rounded-xl text-xs font-bold transition-colors cursor-pointer"
                >
                  Hantar Mesej Lain
                </button>
              </div>
            ) : (
              <form onSubmit={handleSubmit} className="space-y-4">
                <div className="space-y-1">
                  <h3 className="text-xl font-black text-white">Borang Mesej Pantas</h3>
                  <p className="text-xs text-neutral-400">Isi maklumat anda dan kami akan menghubungi anda segera.</p>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div className="space-y-1.5">
                    <label className="text-xs font-bold text-neutral-300 uppercase">
                      Nama Penuh <span className="text-[#E31E24]">*</span>
                    </label>
                    <input
                      type="text"
                      required
                      value={formData.name}
                      onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                      placeholder="Cth: Ahmad Danial"
                      className="w-full px-4 py-3 bg-[#1a1a22] border border-white/10 rounded-xl text-sm text-white placeholder:text-neutral-500 focus:outline-none focus:border-[#FDB913]"
                    />
                  </div>

                  <div className="space-y-1.5">
                    <label className="text-xs font-bold text-neutral-300 uppercase">
                      Alamat Email <span className="text-[#E31E24]">*</span>
                    </label>
                    <input
                      type="email"
                      required
                      value={formData.email}
                      onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                      placeholder="Cth: ahmad@gmail.com"
                      className="w-full px-4 py-3 bg-[#1a1a22] border border-white/10 rounded-xl text-sm text-white placeholder:text-neutral-500 focus:outline-none focus:border-[#FDB913]"
                    />
                  </div>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div className="space-y-1.5">
                    <label className="text-xs font-bold text-neutral-300 uppercase">
                      Nombor Telefon (WhatsApp)
                    </label>
                    <input
                      type="tel"
                      value={formData.phone}
                      onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                      placeholder="Cth: 012-3456789"
                      className="w-full px-4 py-3 bg-[#1a1a22] border border-white/10 rounded-xl text-sm text-white placeholder:text-neutral-500 focus:outline-none focus:border-[#FDB913]"
                    />
                  </div>

                  <div className="space-y-1.5">
                    <label className="text-xs font-bold text-neutral-300 uppercase">
                      Tujuan Mesej
                    </label>
                    <select
                      value={formData.subject}
                      onChange={(e) => setFormData({ ...formData, subject: e.target.value })}
                      className="w-full px-4 py-3 bg-[#1a1a22] border border-white/10 rounded-xl text-sm text-white focus:outline-none focus:border-[#FDB913]"
                    >
                      <option value="Pertanyaan Umum">Pertanyaan Umum</option>
                      <option value="Tempahan Katering">Tempahan Katering & Acara</option>
                      <option value="Peluang Francais">Peluang Francais / Kerjasama</option>
                      <option value="Maklum Balas Makanan">Maklum Balas Makanan</option>
                    </select>
                  </div>
                </div>

                <div className="space-y-1.5">
                  <label className="text-xs font-bold text-neutral-300 uppercase">
                    Mesej Anda <span className="text-[#E31E24]">*</span>
                  </label>
                  <textarea
                    rows={4}
                    required
                    value={formData.message}
                    onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                    placeholder="Tuliskan butiran pertanyaan atau mesej anda di sini..."
                    className="w-full px-4 py-3 bg-[#1a1a22] border border-white/10 rounded-xl text-sm text-white placeholder:text-neutral-500 focus:outline-none focus:border-[#FDB913] resize-none"
                  />
                </div>

                <button
                  type="submit"
                  className="w-full py-4 rounded-xl bg-gradient-to-r from-[#E31E24] to-[#C1121F] hover:from-[#FDB913] hover:to-[#e39600] text-white hover:text-black font-black text-sm uppercase tracking-wider flex items-center justify-center gap-2 shadow-xl shadow-[#E31E24]/30 transition-all cursor-pointer"
                >
                  <Send className="w-4 h-4" />
                  <span>Hantar Mesej Sekarang</span>
                </button>
              </form>
            )}
          </div>

        </div>

      </div>
    </section>
  );
};
