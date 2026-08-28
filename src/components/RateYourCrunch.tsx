import React, { useState, useEffect } from 'react';
import { Star, Flame, Sparkles, CheckCircle2, MessageSquare, MapPin, Heart, Send, RotateCcw, ThumbsUp, Award } from 'lucide-react';
import confetti from 'canvas-confetti';
import { playPopSound, playCrunchSound } from '../utils/sound';

interface CrunchReview {
  id: string;
  name: string;
  rating: number;
  item: string;
  branch: string;
  reviewText: string;
  tags: string[];
  date: string;
  verified: boolean;
}

const DEFAULT_ITEMS = [
  'Hemzal Original Set',
  'Hemzal Cheese Set',
  'Hemzal Garlic Set',
  'Korean Habanero Set',
  'Hemzal Special Bucket',
  'Japanese Furikake',
  'Japanese Togarashi',
  'Coleslaw & Snek',
];

const DEFAULT_BRANCHES = [
  'Bangi Gateway (HQ)',
  'Shah Alam Seksyen 7',
  'Wangsa Maju KL',
  'Cyberjaya Dpulze',
  'Johor Bahru City',
  'Kota Bharu Mall',
  'Penang Georgetown',
  'Pesanan Online / Penghantaran',
];

const QUICK_TAGS = [
  'Kulit Super Rangup 🍗',
  'Isi Berjus Padu 💦',
  'Sos Garlic 5-Bintang 🧄',
  'Keju Meleleh Mantap 🧀',
  'Pedas Menyengat 🔥',
  'Coleslaw Segar 🥗',
  'Ayam Masih Panas ♨️',
  'Servis Pantas ⚡',
];

const INITIAL_COMMUNITY_REVIEWS: CrunchReview[] = [
  {
    id: 'rev-1',
    name: 'Hakim R.',
    rating: 5,
    item: 'Hemzal Garlic Set',
    branch: 'Bangi Gateway (HQ)',
    reviewText: 'Sos garlic dia memang level hotel 5-bintang betul! Kulit luar maintain rangup walaupun tapau balik rumah 20 minit.',
    tags: ['Kulit Super Rangup 🍗', 'Sos Garlic 5-Bintang 🧄'],
    date: 'Hari ini',
    verified: true,
  },
  {
    id: 'rev-2',
    name: 'Nurul Ain',
    rating: 5,
    item: 'Hemzal Special Bucket',
    branch: 'Shah Alam Seksyen 7',
    reviewText: 'Pakej 10 ketul complete 5 sos ni memang jimat gila makan sekeluarga. Semua sos sedap tapi Korean Habanero paling kick!',
    tags: ['Pedas Menyengat 🔥', 'Ayam Masih Panas ♨️'],
    date: 'Semalam',
    verified: true,
  },
  {
    id: 'rev-3',
    name: 'Danial Faiz',
    rating: 5,
    item: 'Hemzal Cheese Set',
    branch: 'Cyberjaya Dpulze',
    reviewText: 'Cheese dia lemak masin berkualiti bukan jenis murahan. Ayam besar dan berjus gila!',
    tags: ['Keju Meleleh Mantap 🧀', 'Isi Berjus Padu 💦'],
    date: '2 hari lalu',
    verified: true,
  },
];

export const RateYourCrunch: React.FC = () => {
  const [rating, setRating] = useState<number>(5);
  const [hoverRating, setHoverRating] = useState<number>(0);
  const [selectedItem, setSelectedItem] = useState<string>(DEFAULT_ITEMS[0]);
  const [selectedBranch, setSelectedBranch] = useState<string>(DEFAULT_BRANCHES[0]);
  const [name, setName] = useState<string>('');
  const [reviewText, setReviewText] = useState<string>('');
  const [selectedTags, setSelectedTags] = useState<string[]>(['Kulit Super Rangup 🍗']);
  const [submittedReview, setSubmittedReview] = useState<CrunchReview | null>(null);
  const [communityReviews, setCommunityReviews] = useState<CrunchReview[]>(INITIAL_COMMUNITY_REVIEWS);
  const [showRecentReviews, setShowRecentReviews] = useState<boolean>(false);

  // Load any local reviews from localStorage
  useEffect(() => {
    try {
      const saved = localStorage.getItem('hemzal_user_crunch_reviews');
      if (saved) {
        const parsed = JSON.parse(saved);
        if (Array.isArray(parsed) && parsed.length > 0) {
          setCommunityReviews([...parsed, ...INITIAL_COMMUNITY_REVIEWS]);
        }
      }
    } catch {
      // ignore
    }
  }, []);

  const ratingDescriptions: Record<number, { title: string; color: string }> = {
    1: { title: 'Kurang Memuaskan / Perlu Dibaiki', color: 'text-rose-400' },
    2: { title: 'Boleh Tahan, Sederhana', color: 'text-amber-400' },
    3: { title: 'Sedap & Cukup Rasa', color: 'text-yellow-400' },
    4: { title: 'Sangat Rangup & Berjus!', color: 'text-lime-400' },
    5: { title: '🔥 10/10 Masterpiece! Super Crunch Padu!', color: 'text-[#FDB913]' },
  };

  const currentDisplayRating = hoverRating || rating;

  const toggleTag = (tag: string) => {
    playPopSound();
    if (selectedTags.includes(tag)) {
      setSelectedTags(selectedTags.filter((t) => t !== tag));
    } else {
      setSelectedTags([...selectedTags, tag]);
    }
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (rating === 0) return;

    playCrunchSound();
    confetti({
      particleCount: 70,
      spread: 70,
      origin: { y: 0.85 },
      colors: ['#E31E24', '#FDB913', '#FFFFFF', '#10B981'],
    });

    const newReview: CrunchReview = {
      id: `crunch-${Date.now()}`,
      name: name.trim() || 'Foodie Hemzal',
      rating,
      item: selectedItem,
      branch: selectedBranch,
      reviewText: reviewText.trim() || 'Ayam rangup di luar, juicy di dalam! Memang puas hati.',
      tags: selectedTags,
      date: 'Sebentar tadi',
      verified: true,
    };

    setSubmittedReview(newReview);
    const updatedReviews = [newReview, ...communityReviews];
    setCommunityReviews(updatedReviews);

    try {
      localStorage.setItem('hemzal_user_crunch_reviews', JSON.stringify([newReview]));
    } catch {
      // ignore
    }
  };

  const handleReset = () => {
    playPopSound();
    setSubmittedReview(null);
    setReviewText('');
    setName('');
    setRating(5);
    setSelectedTags(['Kulit Super Rangup 🍗']);
  };

  return (
    <div id="rate-your-crunch" className="bg-[#121216] border border-white/15 rounded-3xl p-6 sm:p-8 shadow-2xl relative overflow-hidden">
      {/* Glow highlight */}
      <div className="absolute top-0 right-0 w-96 h-96 bg-[radial-gradient(ellipse_at_top_right,rgba(253,185,19,0.08),transparent_70%)] pointer-events-none" />
      <div className="absolute bottom-0 left-0 w-80 h-80 bg-[radial-gradient(ellipse_at_bottom_left,rgba(227,30,36,0.08),transparent_70%)] pointer-events-none" />

      <div className="relative z-10 space-y-6">
        
        {/* Header Title with Badge */}
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-4 border-b border-white/10">
          <div className="space-y-1">
            <div className="inline-flex items-center gap-1.5 bg-[#1b1b22] border border-[#FDB913]/40 px-3 py-0.5 rounded-full text-[11px] font-black uppercase tracking-wider text-[#FDB913]">
              <Flame className="w-3 h-3 fill-[#FDB913]" />
              <span>Rate Your Last Crunch</span>
            </div>
            <h3 className="text-xl sm:text-2xl font-black text-white uppercase tracking-tight flex items-center gap-2">
              <span>NILAI GIGITAN AYAM TERAKHIR ANDA!</span>
            </h3>
            <p className="text-xs text-neutral-300">
              Kongsi penilaian bintang & ulasan rasa hidangan baru anda. Maklum balas anda membantu Chef kami mengekalkan kerangupan 5-bintang!
            </p>
          </div>

          {/* Quick Stat Badge */}
          <div className="bg-[#18181f] border border-white/10 px-4 py-2.5 rounded-2xl flex items-center gap-3 shrink-0 self-start sm:self-auto">
            <div className="w-9 h-9 rounded-xl bg-[#FDB913]/10 border border-[#FDB913]/30 flex items-center justify-center">
              <Award className="w-5 h-5 text-[#FDB913]" />
            </div>
            <div>
              <div className="flex items-center gap-1">
                <span className="text-sm font-black text-white">4.9 / 5.0</span>
                <div className="flex text-[#FDB913]">
                  {[...Array(5)].map((_, i) => (
                    <Star key={i} className="w-3 h-3 fill-[#FDB913]" />
                  ))}
                </div>
              </div>
              <span className="text-[10px] text-neutral-400">2,840+ Penilaian Rangup</span>
            </div>
          </div>
        </div>

        {/* Conditional Content: Form or Submitted Success View */}
        {submittedReview ? (
          <div className="bg-gradient-to-r from-[#171720] via-[#1b1b26] to-[#171720] border border-emerald-500/40 rounded-2xl p-6 text-white space-y-4 animate-in fade-in zoom-in-95 duration-300">
            <div className="flex items-start justify-between gap-4">
              <div className="flex items-center gap-3">
                <div className="w-12 h-12 rounded-2xl bg-emerald-500/20 border border-emerald-500/40 flex items-center justify-center text-emerald-400">
                  <CheckCircle2 className="w-7 h-7" />
                </div>
                <div>
                  <span className="text-[11px] uppercase tracking-wider font-bold text-emerald-400">
                    Maklum Balas Diterima
                  </span>
                  <h4 className="text-lg font-black text-white">
                    Terima Kasih, {submittedReview.name}!
                  </h4>
                  <p className="text-xs text-neutral-300">
                    Ulasan gigitan anda untuk <strong className="text-[#FDB913]">{submittedReview.item}</strong> telah direkodkan.
                  </p>
                </div>
              </div>

              <button
                onClick={handleReset}
                className="px-3 py-1.5 bg-white/10 hover:bg-white/20 text-xs font-bold rounded-xl transition-colors cursor-pointer flex items-center gap-1.5 text-neutral-200"
              >
                <RotateCcw className="w-3.5 h-3.5" />
                <span>Nilai Pesanan Lain</span>
              </button>
            </div>

            {/* Submitted Review Card Preview */}
            <div className="bg-black/40 border border-white/10 p-4 rounded-xl space-y-2.5">
              <div className="flex flex-wrap items-center justify-between gap-2">
                <div className="flex items-center gap-1.5">
                  <div className="flex text-[#FDB913]">
                    {[1, 2, 3, 4, 5].map((star) => (
                      <Star
                        key={star}
                        className={`w-4 h-4 ${star <= submittedReview.rating ? 'fill-[#FDB913] text-[#FDB913]' : 'text-neutral-600'}`}
                      />
                    ))}
                  </div>
                  <span className="text-xs font-bold text-white">
                    ({submittedReview.rating}/5)
                  </span>
                </div>
                <span className="text-[11px] text-neutral-400 flex items-center gap-1">
                  <MapPin className="w-3 h-3 text-[#FDB913]" /> {submittedReview.branch}
                </span>
              </div>

              <p className="text-xs text-neutral-200 italic">
                "{submittedReview.reviewText}"
              </p>

              {submittedReview.tags.length > 0 && (
                <div className="flex flex-wrap gap-1.5 pt-1">
                  {submittedReview.tags.map((t, idx) => (
                    <span key={idx} className="text-[10px] bg-white/5 border border-white/10 px-2.5 py-0.5 rounded-full text-neutral-300">
                      {t}
                    </span>
                  ))}
                </div>
              )}
            </div>

            {/* Loyalty Thank-You Perk */}
            <div className="bg-gradient-to-r from-[#E31E24]/20 to-[#FDB913]/20 border border-[#FDB913]/40 p-3.5 rounded-xl flex flex-col sm:flex-row items-center justify-between gap-3 text-xs">
              <div className="flex items-center gap-2">
                <Sparkles className="w-4 h-4 text-[#FDB913] shrink-0" />
                <span className="text-neutral-200">
                  Ganjaran Review Anda: Gunakan kod promo <strong className="text-[#FDB913] font-mono tracking-wider bg-black/50 px-2 py-0.5 rounded border border-[#FDB913]/30">CRUNCH5</strong> untuk potongan RM5 pesanan seterusnya!
                </span>
              </div>
            </div>
          </div>
        ) : (
          /* The Interactive Submission Form */
          <form onSubmit={handleSubmit} className="space-y-5">
            
            {/* 1. Star Rating Selector */}
            <div className="space-y-2 bg-[#18181f] p-4 rounded-2xl border border-white/5">
              <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-1">
                <label className="text-xs font-black uppercase tracking-wider text-neutral-300 flex items-center gap-1.5">
                  <Star className="w-4 h-4 text-[#FDB913] fill-[#FDB913]" />
                  <span>1. Berapa Bintang Kerangupan & Rasa?</span>
                </label>
                <span className={`text-xs font-bold ${ratingDescriptions[currentDisplayRating]?.color || 'text-white'}`}>
                  {ratingDescriptions[currentDisplayRating]?.title}
                </span>
              </div>

              <div className="flex items-center gap-2 pt-1">
                {[1, 2, 3, 4, 5].map((star) => {
                  const isFilled = (hoverRating || rating) >= star;
                  return (
                    <button
                      key={star}
                      type="button"
                      onClick={() => {
                        playPopSound();
                        setRating(star);
                      }}
                      onMouseEnter={() => setHoverRating(star)}
                      onMouseLeave={() => setHoverRating(0)}
                      className="p-1.5 transition-all transform hover:scale-125 focus:outline-none cursor-pointer"
                      aria-label={`Beri ${star} bintang`}
                    >
                      <Star
                        className={`w-7 h-7 sm:w-8 sm:h-8 transition-colors ${
                          isFilled
                            ? 'text-[#FDB913] fill-[#FDB913] drop-shadow-[0_0_8px_rgba(253,185,19,0.5)]'
                            : 'text-neutral-600 hover:text-neutral-400'
                        }`}
                      />
                    </button>
                  );
                })}
                <span className="ml-2 text-xs font-mono font-bold text-neutral-400">
                  {rating} / 5 Bintang
                </span>
              </div>
            </div>

            {/* 2. Item & Branch Selectors */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3.5">
              <div className="space-y-1.5">
                <label className="text-xs font-bold text-neutral-300 flex items-center gap-1">
                  <Flame className="w-3.5 h-3.5 text-[#E31E24]" /> Menu yang Anda Nikmati:
                </label>
                <select
                  value={selectedItem}
                  onChange={(e) => setSelectedItem(e.target.value)}
                  className="w-full px-3.5 py-2.5 bg-[#18181f] border border-white/10 rounded-xl text-xs text-white focus:outline-none focus:border-[#FDB913] cursor-pointer"
                >
                  {DEFAULT_ITEMS.map((item) => (
                    <option key={item} value={item} className="bg-[#18181f] text-white">
                      {item}
                    </option>
                  ))}
                </select>
              </div>

              <div className="space-y-1.5">
                <label className="text-xs font-bold text-neutral-300 flex items-center gap-1">
                  <MapPin className="w-3.5 h-3.5 text-[#FDB913]" /> Cawangan / Saluran:
                </label>
                <select
                  value={selectedBranch}
                  onChange={(e) => setSelectedBranch(e.target.value)}
                  className="w-full px-3.5 py-2.5 bg-[#18181f] border border-white/10 rounded-xl text-xs text-white focus:outline-none focus:border-[#FDB913] cursor-pointer"
                >
                  {DEFAULT_BRANCHES.map((branch) => (
                    <option key={branch} value={branch} className="bg-[#18181f] text-white">
                      {branch}
                    </option>
                  ))}
                </select>
              </div>
            </div>

            {/* 3. Quick Tag Chips */}
            <div className="space-y-1.5">
              <label className="text-xs font-bold text-neutral-300">
                Pilih Reaksi Pantas (Pilihan):
              </label>
              <div className="flex flex-wrap gap-1.5">
                {QUICK_TAGS.map((tag) => {
                  const isSelected = selectedTags.includes(tag);
                  return (
                    <button
                      key={tag}
                      type="button"
                      onClick={() => toggleTag(tag)}
                      className={`text-[11px] px-3 py-1.5 rounded-full border transition-all cursor-pointer ${
                        isSelected
                          ? 'bg-[#E31E24]/20 border-[#E31E24] text-white font-bold'
                          : 'bg-[#18181f] border-white/10 text-neutral-400 hover:text-white hover:border-white/30'
                      }`}
                    >
                      {tag}
                    </button>
                  );
                })}
              </div>
            </div>

            {/* 4. Short Review Input & Name */}
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-3.5">
              <div className="sm:col-span-1 space-y-1.5">
                <label className="text-xs font-bold text-neutral-300">
                  Nama / Nama Panggilan:
                </label>
                <input
                  type="text"
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  placeholder="Cth: Amir / Kak Lina"
                  className="w-full px-3.5 py-2.5 bg-[#18181f] border border-white/10 rounded-xl text-xs text-white placeholder:text-neutral-500 focus:outline-none focus:border-[#FDB913]"
                />
              </div>

              <div className="sm:col-span-2 space-y-1.5">
                <label className="text-xs font-bold text-neutral-300 flex items-center justify-between">
                  <span>Ulasan Singkat Pengalaman:</span>
                  <span className="text-[10px] text-neutral-400">Pilihan</span>
                </label>
                <input
                  type="text"
                  value={reviewText}
                  onChange={(e) => setReviewText(e.target.value)}
                  placeholder="Cth: Kulit sangat rangup, rempah menyerap sampai ke tulang!"
                  className="w-full px-3.5 py-2.5 bg-[#18181f] border border-white/10 rounded-xl text-xs text-white placeholder:text-neutral-500 focus:outline-none focus:border-[#FDB913]"
                />
              </div>
            </div>

            {/* Submit Button */}
            <div className="flex flex-col sm:flex-row items-center justify-between gap-3 pt-2">
              <span className="text-[11px] text-neutral-400">
                ✨ Setiap ulasan menerima kod diskaun istimewa RM5 serta-merta.
              </span>

              <button
                type="submit"
                className="w-full sm:w-auto px-6 py-3 bg-gradient-to-r from-[#E31E24] to-[#C1121F] hover:from-[#FDB913] hover:to-[#e39600] text-white hover:text-black font-black text-xs uppercase tracking-wider rounded-xl shadow-lg shadow-[#E31E24]/30 flex items-center justify-center gap-2 transition-all cursor-pointer"
              >
                <Send className="w-3.5 h-3.5" />
                <span>Hantar Penilaian Crunch</span>
              </button>
            </div>

          </form>
        )}

        {/* Toggle Recent Community Reviews */}
        <div className="pt-2 border-t border-white/10">
          <button
            type="button"
            onClick={() => {
              playPopSound();
              setShowRecentReviews(!showRecentReviews);
            }}
            className="text-xs text-neutral-400 hover:text-[#FDB913] font-bold flex items-center gap-1.5 transition-colors cursor-pointer"
          >
            <MessageSquare className="w-3.5 h-3.5" />
            <span>{showRecentReviews ? 'Sembunyikan' : 'Lihat'} Penilaian Komuniti Terkini ({communityReviews.length})</span>
          </button>

          {showRecentReviews && (
            <div className="mt-4 grid grid-cols-1 md:grid-cols-3 gap-3 animate-in fade-in duration-200">
              {communityReviews.slice(0, 3).map((item) => (
                <div key={item.id} className="bg-[#18181f] border border-white/5 p-3.5 rounded-xl space-y-2">
                  <div className="flex items-center justify-between">
                    <span className="text-xs font-bold text-white flex items-center gap-1">
                      {item.name}
                      {item.verified && <CheckCircle2 className="w-3 h-3 text-emerald-400 inline" />}
                    </span>
                    <div className="flex text-[#FDB913]">
                      {[...Array(item.rating)].map((_, i) => (
                        <Star key={i} className="w-2.5 h-2.5 fill-[#FDB913]" />
                      ))}
                    </div>
                  </div>
                  <p className="text-[11px] text-neutral-300 line-clamp-2">
                    "{item.reviewText}"
                  </p>
                  <div className="flex items-center justify-between text-[10px] text-neutral-500 pt-1 border-t border-white/5">
                    <span className="text-[#FDB913] font-semibold">{item.item}</span>
                    <span>{item.date}</span>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>

      </div>
    </div>
  );
};
