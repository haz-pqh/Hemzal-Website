export interface TimeGreeting {
  greeting: string;
  period: 'pagi' | 'tengah_hari' | 'petang' | 'malam';
  message: string;
  tagline: string;
}

/**
 * Returns a personalized greeting in Malay or English based on the current time of day:
 * - 05:00 - 11:59: 'Selamat Pagi' / 'Good Morning'
 * - 12:00 - 13:59: 'Selamat Tengah Hari' / 'Good Afternoon'
 * - 14:00 - 18:59: 'Selamat Petang' / 'Good Evening'
 * - 19:00 - 04:59: 'Selamat Malam' / 'Good Night'
 */
export function getTimeGreeting(
  date: Date = new Date(),
  lang: 'bm' | 'en' = 'bm'
): TimeGreeting {
  const hour = date.getHours();

  if (hour >= 5 && hour < 12) {
    return {
      greeting: lang === 'en' ? 'Good Morning' : 'Selamat Pagi',
      period: 'pagi',
      message:
        lang === 'en'
          ? 'Start your day with extraordinary fresh crunch!'
          : 'Mulakan hari anda dengan kerangupan luar biasa!',
      tagline: lang === 'en' ? 'Fresh Morning Delights' : 'Sarapan & Hidangan Pagi Segar',
    };
  } else if (hour >= 12 && hour < 14) {
    return {
      greeting: lang === 'en' ? 'Good Afternoon' : 'Selamat Tengah Hari',
      period: 'tengah_hari',
      message:
        lang === 'en'
          ? 'Lunchtime! Enjoy hot and golden crispy chicken combos.'
          : 'Masa makan tengah hari! Jom nikmati kombo ayam rangup panas.',
      tagline: lang === 'en' ? 'Satisfying Lunch Combos' : 'Waktu Makan Tengah Hari Mantap',
    };
  } else if (hour >= 14 && hour < 19) {
    return {
      greeting: lang === 'en' ? 'Good Evening' : 'Selamat Petang',
      period: 'petang',
      message:
        lang === 'en'
          ? 'Teatime crunch with juicy chicken & artisan sauces.'
          : 'Minum petang lebih berselera dengan ayam rangup & berjus.',
      tagline: lang === 'en' ? 'Afternoon Snacks & Relaxing' : 'Snek Petang & Santai Bersama',
    };
  } else {
    return {
      greeting: lang === 'en' ? 'Good Night' : 'Selamat Malam',
      period: 'malam',
      message:
        lang === 'en'
          ? 'End your day with satisfying giant cuts & gourmet dips.'
          : 'Makan malam lebih puas dengan potongan mega & sos istimewa.',
      tagline: lang === 'en' ? 'Delicious Dinner Crunch' : 'Makan Malam Nikmat & Rangup',
    };
  }
}
