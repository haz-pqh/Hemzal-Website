import React, { useState } from 'react';
import { Mail, Clock, MessageSquare, Send, CheckCircle2, Flame, ChevronDown, HelpCircle, Truck, Utensils, ShieldCheck, ShoppingBag } from 'lucide-react';
import confetti from 'canvas-confetti';
import { motion, AnimatePresence } from 'motion/react';
import { playPopSound } from '../utils/sound';
import { useLanguage } from '../context/LanguageContext';

export const ContactSection: React.FC = () => {
  const { language, t } = useLanguage();
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    subject: 'Pertanyaan Umum',
    message: '',
  });
  const [submitted, setSubmitted] = useState(false);

  // FAQ Accordion State
  const [openFaqIndex, setOpenFaqIndex] = useState<number | null>(0);

  const faqs = [
    {
      id: 'faq-delivery',
      question: language === 'en' 
        ? 'Is food delivery service available?' 
        : 'Adakah perkhidmatan penghantaran (Delivery) disediakan?',
      category: language === 'en' ? 'Delivery' : 'Penghantaran',
      icon: Truck,
      answer: language === 'en'
        ? 'Yes! We deliver directly to your doorstep via GrabFood, Foodpanda, ShopeeFood, as well as direct WhatsApp Delivery within up to 15km radius of our nearest outlets. Online orders on this site connect straight to our official WhatsApp line for live rider fee confirmation and speedy fulfillment.'
        : 'Ya! Kami menyediakan penghantaran ke rumah melalui GrabFood, Foodpanda, ShopeeFood serta pesanan terus melalui WhatsApp Delivery dengan radius sehingga 15km dari cawangan terdekat kami. Pesanan atas talian melalui laman web ini akan terus disambungkan ke WhatsApp rasmi untuk semakan caj penghantaran dan penghantaran pantas.',
    },
    {
      id: 'faq-flavor',
      question: language === 'en'
        ? 'Do the chicken pieces have different spice levels or marinades?'
        : 'Adakah ayam goreng mempunyai pilihan kepedasan yang berbeza?',
      category: language === 'en' ? 'Recipe & Signature Dips' : 'Resepi & Sos Signature',
      icon: Flame,
      answer: language === 'en'
        ? 'All our chicken is freshly fried using our 100% Original Crispy signature recipe that guarantees super crispy skin outside and succulent juiciness inside. Spice levels and flavor adventures are savored through our 5 Signature Artisan Sauces: Special Chili, Korean Habanero (fire-hot from fresh Cameron Highlands chilies), 5-Star Roasted Garlic, Molten Cheese, and Japanese Furikake & Togarashi.'
        : 'Kesemua ayam crispy kami dimasak segar menggunakan 100% Resepi Original Crispy signature kami yang rangup di luar dan berjus di dalam. Pilihan kepedasan dan keenakan perisa dinikmati melalui rangkaian 5 Sos Signature kami seperti Sos Cili Pedas, Korean Habanero (ekstrem pedas menggunakan cili segar Cameron Highland), Garlic 5-Star, Sos Keju Meleleh, serta Furikake & Togarashi 7 Rempah Jepun.',
    },
    {
      id: 'faq-halal',
      question: language === 'en'
        ? 'Is the chicken and all ingredients guaranteed 100% Halal?'
        : 'Adakah ayam dan semua ramuan dijamin 100% Halal?',
      category: language === 'en' ? 'Halal Status' : 'Status Halal',
      icon: ShieldCheck,
      answer: language === 'en'
        ? '100% guaranteed. All poultry is fresh Grade-A local Malaysian chicken slaughtered according to Islamic rites with full JAKIM Halal certification. All signature sauces and secret marinades are prepared in our certified Central Kitchen under strict Halal standards.'
        : 'Semua bekalan ayam kami adalah 100% ayam segar tempatan yang disembelih mengikut syariat Islam dengan sijil Halal JAKIM. Kesemua sos signature dan perapan kami disediakan bersih di Dapur Pusat (Central Kitchen) yang berstatus Halal.',
    },
    {
      id: 'faq-portions',
      question: language === 'en'
        ? 'What are the serving sizes for Hemzal Special Bucket & Chicken Sets?'
        : 'Berapakah saiz hidangan bagi Hemzal Special Bucket & Set Ayam?',
      category: language === 'en' ? 'Portions & Sizing' : 'Saiz Hidangan',
      icon: Utensils,
      answer: language === 'en'
        ? 'Signature sets can be chosen in 2 PCS (individual meal), 6 PCS (sharing 2-3 pax), or 10 PCS (family size). The "Hemzal Special Bucket" features 10 giant pieces of crispy chicken with 10 free chili sauce packs plus ALL 5 gourmet sauce cups (Garlic, Cheese, Habanero, Furikake & Togarashi) — ideal for 3 to 5 people.'
        : 'Setiap set Signature boleh dipilih dalam kuantiti 2 PCS (hidangan individu), 6 PCS (2-3 orang), atau 10 PCS (keluarga). Bagi "Hemzal Special Bucket", ia mengandungi 10 ketul ayam rangup gergasi bersama 10 pek sos cili dan LENGKAP dengan SEMUA 5 cawan sos signature kami (Garlic, Keju, Habanero, Furikake & Togarashi) — sesuai untuk 3 hingga 5 orang.',
    },
    {
      id: 'faq-catering',
      question: language === 'en'
        ? 'Can I place bulk orders or catering for private events?'
        : 'Bolehkah saya membuat tempahan pukal / katering untuk majlis?',
      category: language === 'en' ? 'Catering & Events' : 'Katering & Majlis',
      icon: ShoppingBag,
      answer: language === 'en'
        ? 'Absolutely! We cater for birthday parties, corporate gatherings, school functions, and celebrations. Contact us via the form below or through WhatsApp at least 24 to 48 hours in advance for special volume discounts.'
        : 'Boleh! Kami menerima tempahan katering untuk majlis hari jadi, jamuan pejabat, kenduri, dan acara korporat. Sila hubungi kami melalui borang di bawah atau WhatsApp kami sekurang-kurangnya 24 hingga 48 jam awal untuk pakej diskaun katering khas.',
    },
  ];

  const toggleFaq = (index: number) => {
    playPopSound();
    setOpenFaqIndex(openFaqIndex === index ? null : index);
  };

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
    <section id="hubungi" className="py-20 bg-[#09090c]/10 backdrop-blur-sm relative overflow-hidden border-t border-white/5">
      {/* Glow Background */}
      <div className="absolute top-1/2 right-10 w-96 h-96 bg-[#E31E24]/10 rounded-full blur-[140px] pointer-events-none" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        
        {/* Header */}
        <div className="text-center max-w-3xl mx-auto mb-16 space-y-3">
          <div className="inline-flex items-center gap-1.5 bg-[#16161b] border border-[#FDB913]/30 px-3.5 py-1 rounded-full text-xs font-black uppercase tracking-widest text-[#FDB913]">
            <MessageSquare className="w-3.5 h-3.5" />
            <span>{t('contact.badge')}</span>
          </div>

          <h2 className="text-3xl sm:text-5xl font-black text-white uppercase tracking-tight">
            {t('contact.title')}
          </h2>

          <p className="text-neutral-300 text-sm sm:text-base">
            {t('contact.desc')}
          </p>
        </div>

        {/* Collapsible FAQ Accordion Section */}
        <div className="mb-16 max-w-4xl mx-auto">
          <div className="flex items-center gap-2 mb-6 justify-center sm:justify-start">
            <HelpCircle className="w-5 h-5 text-[#FDB913]" />
            <h3 className="text-xl font-black text-white uppercase tracking-tight">
              {t('contact.faqTitle')}
            </h3>
          </div>

          <div className="space-y-3">
            {faqs.map((faq, index) => {
              const isOpen = openFaqIndex === index;
              const IconComponent = faq.icon;

              return (
                <div
                  key={faq.id}
                  id={faq.id}
                  className={`rounded-2xl border transition-all duration-300 overflow-hidden ${
                    isOpen
                      ? 'bg-[#15151b] border-[#FDB913]/50 shadow-lg shadow-black/40'
                      : 'bg-[#111115] border-white/10 hover:border-white/20 hover:bg-[#141419]'
                  }`}
                >
                  <button
                    type="button"
                    onClick={() => toggleFaq(index)}
                    aria-expanded={isOpen}
                    className="w-full p-5 sm:p-6 text-left flex items-center justify-between gap-4 cursor-pointer"
                  >
                    <div className="flex items-center gap-3.5">
                      <div
                        className={`w-10 h-10 rounded-xl flex items-center justify-center shrink-0 transition-colors ${
                          isOpen
                            ? 'bg-[#FDB913] text-black font-black'
                            : 'bg-white/5 text-[#FDB913] border border-white/10'
                        }`}
                      >
                        <IconComponent className="w-5 h-5" />
                      </div>
                      <div>
                        <span className="text-[10px] text-[#FDB913] uppercase font-bold tracking-wider block">
                          {faq.category}
                        </span>
                        <h4 className="text-sm sm:text-base font-bold text-white leading-snug">
                          {faq.question}
                        </h4>
                      </div>
                    </div>

                    <div
                      className={`w-8 h-8 rounded-full flex items-center justify-center shrink-0 border transition-transform duration-300 ${
                        isOpen
                          ? 'rotate-180 bg-[#E31E24] text-white border-[#E31E24]'
                          : 'bg-white/5 text-neutral-400 border-white/10'
                      }`}
                    >
                      <ChevronDown className="w-4 h-4" />
                    </div>
                  </button>

                  <AnimatePresence initial={false}>
                    {isOpen && (
                      <motion.div
                        initial={{ height: 0, opacity: 0 }}
                        animate={{ height: 'auto', opacity: 1 }}
                        exit={{ height: 0, opacity: 0 }}
                        transition={{ duration: 0.25, ease: 'easeInOut' }}
                      >
                        <div className="px-5 sm:px-6 pb-6 pt-1 border-t border-white/5 text-neutral-300 text-xs sm:text-sm leading-relaxed pl-16 sm:pl-20">
                          {faq.answer}
                        </div>
                      </motion.div>
                    )}
                  </AnimatePresence>
                </div>
              );
            })}
          </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 items-start">
          
          {/* Left Column: Direct Info Boxes */}
          <div className="lg:col-span-5 space-y-4">
            
            {/* WhatsApp Box */}
            <a
              href={`https://wa.me/601121992135?text=${encodeURIComponent(language === 'en' ? 'Hi Hemzal Crispy Chicken, I have an inquiry.' : 'Hai Hemzal Crispy Chicken, saya ada pertanyaan.')}`}
              target="_blank"
              rel="noopener noreferrer"
              className="p-6 rounded-3xl bg-white hover:bg-[#fdb913]/70 border border-neutral-200/90 hover:border-[#fdb913] transition-all duration-300 flex items-center gap-4 group block shadow-xl shadow-black/10"
            >
              <div className="w-14 h-14 rounded-2xl bg-emerald-100/80 border border-emerald-200 flex items-center justify-center text-[#25D366] group-hover:scale-110 transition-transform shrink-0 shadow-xs">
                <MessageSquare className="w-7 h-7" />
              </div>
              <div>
                <span className="text-[10px] uppercase font-bold text-emerald-700 tracking-wider">
                  {t('contact.fastResponse')}
                </span>
                <h4 className="font-black text-base text-neutral-900">+60 11-2199 2135</h4>
                <p className="text-xs text-neutral-500">{t('contact.chatWithAdmin')}</p>
              </div>
            </a>

            {/* Email Box */}
            <div className="p-6 rounded-3xl bg-white border border-neutral-200/90 flex items-center gap-4 shadow-xl shadow-black/10">
              <div className="w-14 h-14 rounded-2xl bg-amber-100/80 border border-amber-200 flex items-center justify-center text-[#B45309] shrink-0 shadow-xs">
                <Mail className="w-7 h-7" />
              </div>
              <div>
                <span className="text-[10px] uppercase font-bold text-[#B45309] tracking-wider">
                  {language === 'en' ? 'Official Email' : 'Email Rasmi'}
                </span>
                <h4 className="font-black text-base text-neutral-900">hello@hemzalcrispychicken.com</h4>
                <p className="text-xs text-neutral-500">{language === 'en' ? 'For media & business inquiries' : 'Untuk pertanyaan media & rasmi'}</p>
              </div>
            </div>

            {/* Operating Hours Box */}
            <div className="p-6 rounded-3xl bg-white border border-neutral-200/90 flex items-center gap-4 shadow-xl shadow-black/10">
              <div className="w-14 h-14 rounded-2xl bg-rose-100/80 border border-rose-200 flex items-center justify-center text-[#E31E24] shrink-0 shadow-xs">
                <Clock className="w-7 h-7" />
              </div>
              <div>
                <span className="text-[10px] uppercase font-bold text-[#E31E24] tracking-wider">
                  {t('contact.operationHoursTitle')}
                </span>
                <h4 className="font-black text-base text-neutral-900">11:00 AM – 6:30 PM</h4>
                <p className="text-xs text-neutral-500">{language === 'en' ? 'Open 7 days a week (Including Public Holidays)' : 'Dibuka 7 hari seminggu (Termasuk Cuti Umum)'}</p>
              </div>
            </div>

            {/* HQ Address Box */}
            <div className="p-6 rounded-3xl bg-white border border-neutral-200/90 space-y-2 shadow-xl shadow-black/10">
              <h4 className="font-black text-sm text-neutral-900 flex items-center gap-2">
                <Flame className="w-4 h-4 text-[#E31E24]" /> {t('contact.centralKitchen')}
              </h4>
              <p className="text-xs text-neutral-600 leading-relaxed">
                Jalan 16A, Taman Dato Ahmad Razali, 68000 Ampang, Selangor
              </p>
            </div>

          </div>

          {/* Right Column: Contact Form */}
          <div className="lg:col-span-7 bg-white border border-neutral-200/90 rounded-3xl p-6 sm:p-10 shadow-2xl shadow-black/20">
            {submitted ? (
              <div className="text-center py-12 space-y-4">
                <div className="w-16 h-16 rounded-full bg-emerald-100 text-emerald-600 flex items-center justify-center mx-auto border border-emerald-300">
                  <CheckCircle2 className="w-8 h-8" />
                </div>
                <h3 className="text-2xl font-black text-neutral-900">{language === 'en' ? 'Message Sent Successfully!' : 'Mesej Anda Berjaya Dihantar!'}</h3>
                <p className="text-sm text-neutral-600 max-w-md mx-auto">
                  {t('contact.formSuccess')}
                </p>
                <button
                  onClick={() => {
                    setSubmitted(false);
                    setFormData({ name: '', email: '', phone: '', subject: 'Pertanyaan Umum', message: '' });
                  }}
                  className="mt-4 px-6 py-2.5 bg-neutral-100 hover:bg-neutral-200 text-neutral-800 rounded-xl text-xs font-bold transition-colors cursor-pointer"
                >
                  {language === 'en' ? 'Send Another Message' : 'Hantar Mesej Lain'}
                </button>
              </div>
            ) : (
              <form onSubmit={handleSubmit} className="space-y-4">
                <div className="space-y-1">
                  <h3 className="text-xl font-black text-neutral-900">
                    {language === 'en' ? 'Quick Contact Form' : 'Borang Mesej Pantas'}
                  </h3>
                  <p className="text-xs text-neutral-500">
                    {language === 'en' ? 'Leave your details and we will reach out promptly.' : 'Isi maklumat anda dan kami akan menghubungi anda segera.'}
                  </p>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div className="space-y-1.5">
                    <label className="text-xs font-bold text-neutral-700 uppercase">
                      {t('contact.formName')} <span className="text-[#E31E24]">*</span>
                    </label>
                    <input
                      type="text"
                      required
                      value={formData.name}
                      onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                      placeholder={language === 'en' ? 'E.g. David Tan' : 'Cth: Ahmad Danial'}
                      className="w-full px-4 py-3 bg-neutral-50 border border-neutral-200 rounded-xl text-sm text-neutral-900 placeholder:text-neutral-400 focus:bg-white focus:outline-none focus:border-[#FDB913] focus:ring-1 focus:ring-[#FDB913]"
                    />
                  </div>

                  <div className="space-y-1.5">
                    <label className="text-xs font-bold text-neutral-700 uppercase">
                      {t('contact.formEmail')} <span className="text-[#E31E24]">*</span>
                    </label>
                    <input
                      type="email"
                      required
                      value={formData.email}
                      onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                      placeholder="hello@example.com"
                      className="w-full px-4 py-3 bg-neutral-50 border border-neutral-200 rounded-xl text-sm text-neutral-900 placeholder:text-neutral-400 focus:bg-white focus:outline-none focus:border-[#FDB913] focus:ring-1 focus:ring-[#FDB913]"
                    />
                  </div>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div className="space-y-1.5">
                    <label className="text-xs font-bold text-neutral-700 uppercase">
                      {t('contact.formPhone')}
                    </label>
                    <input
                      type="tel"
                      value={formData.phone}
                      onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                      placeholder="012-3456789"
                      className="w-full px-4 py-3 bg-neutral-50 border border-neutral-200 rounded-xl text-sm text-neutral-900 placeholder:text-neutral-400 focus:bg-white focus:outline-none focus:border-[#FDB913] focus:ring-1 focus:ring-[#FDB913]"
                    />
                  </div>

                  <div className="space-y-1.5">
                    <label className="text-xs font-bold text-neutral-700 uppercase">
                      {t('contact.formSubject')}
                    </label>
                    <select
                      value={formData.subject}
                      onChange={(e) => setFormData({ ...formData, subject: e.target.value })}
                      className="w-full px-4 py-3 bg-neutral-50 border border-neutral-200 rounded-xl text-sm text-neutral-900 focus:bg-white focus:outline-none focus:border-[#FDB913] focus:ring-1 focus:ring-[#FDB913]"
                    >
                      <option value="Pertanyaan Umum">{language === 'en' ? 'General Inquiry' : 'Pertanyaan Umum'}</option>
                      <option value="Tempahan Katering">{language === 'en' ? 'Catering & Event Booking' : 'Tempahan Katering & Acara'}</option>
                      <option value="Peluang Francais">{language === 'en' ? 'Franchise & Partnership' : 'Peluang Francais / Kerjasama'}</option>
                      <option value="Maklum Balas Makanan">{language === 'en' ? 'Food & Quality Feedback' : 'Maklum Balas Makanan'}</option>
                    </select>
                  </div>
                </div>

                <div className="space-y-1.5">
                  <label className="text-xs font-bold text-neutral-700 uppercase">
                    {t('contact.formMessage')} <span className="text-[#E31E24]">*</span>
                  </label>
                  <textarea
                    rows={4}
                    required
                    value={formData.message}
                    onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                    placeholder={language === 'en' ? 'Write your questions or notes here...' : 'Tuliskan butiran pertanyaan atau mesej anda di sini...'}
                    className="w-full px-4 py-3 bg-neutral-50 border border-neutral-200 rounded-xl text-sm text-neutral-900 placeholder:text-neutral-400 focus:bg-white focus:outline-none focus:border-[#FDB913] focus:ring-1 focus:ring-[#FDB913] resize-none"
                  />
                </div>

                <button
                  type="submit"
                  className="w-full py-4 rounded-xl bg-gradient-to-r from-[#E31E24] to-[#C1121F] hover:from-[#FDB913] hover:to-[#e39600] text-white hover:text-black font-black text-sm uppercase tracking-wider flex items-center justify-center gap-2 shadow-xl shadow-[#E31E24]/20 transition-all cursor-pointer"
                >
                  <Send className="w-4 h-4" />
                  <span>{t('contact.formSend')}</span>
                </button>
              </form>
            )}
          </div>

        </div>

      </div>
    </section>
  );
};
