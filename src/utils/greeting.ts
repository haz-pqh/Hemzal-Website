export interface TimeGreeting {
  greeting: string;
  period: 'pagi' | 'tengah_hari' | 'petang' | 'malam';
  message: string;
  tagline: string;
}

/**
 * Returns a personalized greeting in Malay based on the current time of day:
 * - 05:00 - 11:59: 'Selamat Pagi'
 * - 12:00 - 13:59: 'Selamat Tengah Hari'
 * - 14:00 - 18:59: 'Selamat Petang'
 * - 19:00 - 04:59: 'Selamat Malam'
 */
export function getTimeGreeting(date: Date = new Date()): TimeGreeting {
  const hour = date.getHours();

  if (hour >= 5 && hour < 12) {
    return {
      greeting: 'Selamat Pagi',
      period: 'pagi',
      message: 'Mulakan hari anda dengan kerangupan luar biasa!',
      tagline: 'Sarapan & Hidangan Pagi Segar',
    };
  } else if (hour >= 12 && hour < 14) {
    return {
      greeting: 'Selamat Tengah Hari',
      period: 'tengah_hari',
      message: 'Masa makan tengah hari! Jom nikmati kombo ayam rangup panas.',
      tagline: 'Waktu Makan Tengah Hari Mantap',
    };
  } else if (hour >= 14 && hour < 19) {
    return {
      greeting: 'Selamat Petang',
      period: 'petang',
      message: 'Minum petang lebih berselera dengan ayam rangup & berjus.',
      tagline: 'Snek Petang & Santai Bersama',
    };
  } else {
    return {
      greeting: 'Selamat Malam',
      period: 'malam',
      message: 'Makan malam lebih puas dengan potongan mega & sos istimewa.',
      tagline: 'Makan Malam Nikmat & Rangup',
    };
  }
}
