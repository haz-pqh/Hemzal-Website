import { MenuItem, PromoVoucher } from '../types';

export const MENU_ITEMS: MenuItem[] = [
  // 1. HEMZAL ORIGINAL SET
  {
    id: 'hemzal-original',
    name: 'Hemzal ORIGINAL SET',
    tagline: 'Ayam Segar Diperap Rempah-Ratus Istimewa',
    description: 'Ayam segar yang diperap dengan rempah-ratus istimewa! Rangup di luar, juicy di dalam. Dihidang bersama pek sos cili.',
    price: 9.00,
    category: 'signature',
    image: 'https://images.unsplash.com/photo-1562967914-608f82629710?auto=format&fit=crop&w=900&q=80',
    isBestSeller: true,
    spiceLevel: 1,
    calories: 420,
    servings: 'Pilihan 2, 6, atau 10 PCS',
    pieces: 2,
    sauceInfo: 'Pek Sos Cili Istimewa',
    availableDips: ['Sos Cili', 'Sos Keju Premium', 'Sos Garlic 5-Bintang', 'Sos Korean Habanero'],
    portions: [
      { label: '2 PCS', price: 9.00, pieces: 2 },
      { label: '6 PCS', price: 27.00, pieces: 6, isPopular: true },
      { label: '10 PCS', price: 45.00, pieces: 10 },
    ],
    options: {
      addons: [
        { id: 'add-coleslaw-1', name: 'Add-On Coleslaw (1 Cup 4oz)', price: 3.50 },
        { id: 'add-coleslaw-2', name: 'Add-On Coleslaw (2 Cup 4oz)', price: 6.50 },
        { id: 'add-extra-dip', name: 'Extra 1 Cup Sos Pilihan', price: 2.50 },
      ]
    }
  },

  // 2. HEMZAL CHEESE SET
  {
    id: 'hemzal-cheese',
    name: 'Hemzal CHEESE SET',
    tagline: 'Campuran Keju Premium Berkualiti Terpilih',
    description: 'Campuran beberapa jenis keju kualiti premium yang terpilih! Tekstur berkrim kaya dengan rasa keju lemak masin yang menyelerakan.',
    price: 11.00,
    category: 'signature',
    image: 'https://images.unsplash.com/photo-1527477396000-e27163b481c2?auto=format&fit=crop&w=900&q=80',
    isBestSeller: true,
    spiceLevel: 1,
    calories: 520,
    servings: 'Pilihan 2, 6, atau 10 PCS',
    pieces: 2,
    sauceInfo: '1 Cup Sos Keju Kualiti Premium',
    availableDips: ['Sos Keju Kualiti Premium', 'Sos Garlic', 'Sos Cili'],
    portions: [
      { label: '2 PCS', price: 11.00, pieces: 2 },
      { label: '6 PCS', price: 33.00, pieces: 6, isPopular: true },
      { label: '10 PCS', price: 55.00, pieces: 10 },
    ],
    options: {
      addons: [
        { id: 'add-coleslaw-1', name: 'Add-On Coleslaw (1 Cup 4oz)', price: 3.50 },
        { id: 'add-coleslaw-2', name: 'Add-On Coleslaw (2 Cup 4oz)', price: 6.50 },
        { id: 'add-extra-cheese', name: 'Extra 1 Cup Sos Keju', price: 2.50 },
      ]
    }
  },

  // 3. HEMZAL GARLIC SET
  {
    id: 'hemzal-garlic',
    name: 'Hemzal GARLIC SET',
    tagline: 'Sos Garlic Ciptaan Chef Hotel 5-Bintang',
    description: 'Sos Garlic istimewa yang dicipta oleh Chef Hotel 5 Bintang! Harum bawang putih panggang diadun lembut berkrim yang menyalut sempurna setiap ketulan ayam.',
    price: 11.00,
    category: 'signature',
    image: 'https://images.unsplash.com/photo-1626082927389-6cd097cdc6ec?auto=format&fit=crop&w=900&q=80',
    isChefSpecial: true,
    spiceLevel: 0,
    calories: 480,
    servings: 'Pilihan 2, 6, atau 10 PCS',
    pieces: 2,
    sauceInfo: '1 Cup Sos Garlic Istimewa Chef 5-Bintang',
    availableDips: ['Sos Garlic Istimewa', 'Sos Cili', 'Sos Keju'],
    portions: [
      { label: '2 PCS', price: 11.00, pieces: 2 },
      { label: '6 PCS', price: 33.00, pieces: 6, isPopular: true },
      { label: '10 PCS', price: 55.00, pieces: 10 },
    ],
    options: {
      addons: [
        { id: 'add-coleslaw-1', name: 'Add-On Coleslaw (1 Cup 4oz)', price: 3.50 },
        { id: 'add-coleslaw-2', name: 'Add-On Coleslaw (2 Cup 4oz)', price: 6.50 },
        { id: 'add-extra-garlic', name: 'Extra 1 Cup Sos Garlic', price: 2.50 },
      ]
    }
  },

  // 4. HEMZAL KOREAN HABANERO SET
  {
    id: 'hemzal-habanero',
    name: 'Hemzal KOREAN HABANERO SET',
    tagline: 'Cili Habanero Segar dari Cameron Highland',
    description: 'Dihasilkan dari cili Habanero yang dipetik segar dari Cameron Highland! Pedas menyengat berapi dengan sentuhan manis dan masam yang membangkitkan selera.',
    price: 11.00,
    category: 'signature',
    image: 'https://images.unsplash.com/photo-1626645738196-c2a7c87a8f58?auto=format&fit=crop&w=900&q=80',
    isBestSeller: true,
    spiceLevel: 3,
    calories: 490,
    servings: 'Pilihan 2, 6, atau 10 PCS',
    pieces: 2,
    sauceInfo: '1 Cup Sos Korean Habanero Cameron Highland',
    availableDips: ['Sos Korean Habanero', 'Sos Keju (Pereda Pedas)', 'Sos Garlic'],
    portions: [
      { label: '2 PCS', price: 11.00, pieces: 2 },
      { label: '6 PCS', price: 33.00, pieces: 6, isPopular: true },
      { label: '10 PCS', price: 55.00, pieces: 10 },
    ],
    options: {
      addons: [
        { id: 'add-coleslaw-1', name: 'Add-On Coleslaw (Pereda Pedas)', price: 3.50 },
        { id: 'add-cheese-dip', name: 'Extra Sos Keju (Pereda Pedas)', price: 2.50 },
        { id: 'add-extra-habanero', name: 'Extra 1 Cup Sos Habanero', price: 2.50 },
      ]
    }
  },

  // 5. HEMZAL JAPANESE FURIKAKE SET
  {
    id: 'hemzal-furikake',
    name: 'Hemzal JAPANESE FURIKAKE SET',
    tagline: 'Gabungan Rasa Umami Sebenar Kumamoto, Jepun',
    description: 'Gabungan rasa umami sebenar yang berasal dari Kumamoto, Jepun! Keseimbangan rasa rumpai laut, bijan bakar dan perencah tradisi Jepun yang sungguh memikat.',
    price: 12.00,
    category: 'signature',
    image: 'https://images.unsplash.com/photo-1569058242253-92a9c755a0ec?auto=format&fit=crop&w=900&q=80',
    isChefSpecial: true,
    spiceLevel: 0,
    calories: 470,
    servings: 'Pilihan 2, 6, atau 10 PCS',
    pieces: 2,
    sauceInfo: '1 Cup Sos Japanese Furikake Umami Kumamoto',
    availableDips: ['Sos Japanese Furikake', 'Sos Garlic', 'Sos Keju'],
    portions: [
      { label: '2 PCS', price: 12.00, pieces: 2 },
      { label: '6 PCS', price: 36.00, pieces: 6, isPopular: true },
      { label: '10 PCS', price: 60.00, pieces: 10 },
    ],
    options: {
      addons: [
        { id: 'add-coleslaw-1', name: 'Add-On Coleslaw (1 Cup 4oz)', price: 3.50 },
        { id: 'add-extra-furikake', name: 'Extra 1 Cup Sos Furikake', price: 2.50 },
      ]
    }
  },

  // 6. HEMZAL JAPANESE TOGARASHI SET
  {
    id: 'hemzal-togarashi',
    name: 'Hemzal JAPANESE TOGARASHI SET',
    tagline: 'Campuran 7 Jenis Rempah-Ratus Tradisi Tokyo',
    description: 'Campuran 7 jenis rempah-ratus tradisi masyarakat Tokyo! Menggabungkan lada cili Shichimi, kulit oren kering, bijan dan halia untuk aroma herba pedas yang unik.',
    price: 12.00,
    category: 'signature',
    image: 'https://images.unsplash.com/photo-1567620832903-9fc6debc209f?auto=format&fit=crop&w=900&q=80',
    isNew: true,
    spiceLevel: 2,
    calories: 475,
    servings: 'Pilihan 2, 6, atau 10 PCS',
    pieces: 2,
    sauceInfo: '1 Cup Sos Japanese Togarashi 7-Rempah Tokyo',
    availableDips: ['Sos Japanese Togarashi', 'Sos Keju', 'Sos Garlic'],
    portions: [
      { label: '2 PCS', price: 12.00, pieces: 2 },
      { label: '6 PCS', price: 36.00, pieces: 6, isPopular: true },
      { label: '10 PCS', price: 60.00, pieces: 10 },
    ],
    options: {
      addons: [
        { id: 'add-coleslaw-1', name: 'Add-On Coleslaw (1 Cup 4oz)', price: 3.50 },
        { id: 'add-extra-togarashi', name: 'Extra 1 Cup Sos Togarashi', price: 2.50 },
      ]
    }
  },

  // 7. HEMZAL SPECIAL BUCKET (FEAST COMBO)
  {
    id: 'hemzal-special-bucket',
    name: 'Hemzal Special Bucket (10-Pcs & 5 Sos)',
    tagline: '10 Pcs Ayam + 10 Sos Cili + 5 Cawan Sos Lengkap!',
    description: 'Pakej terlaris seisi keluarga! Nikmati 10 ketul ayam goreng rangup & berjus, 10 pek sos cili, serta LENGKAP dengan SEMUA 5 cawan sos signature (Garlic, Cheese, Korean Habanero, Japanese Furikake, Japanese Togarashi).',
    price: 53.90,
    originalPrice: 57.00,
    category: 'combos',
    image: 'https://images.unsplash.com/photo-1513639776629-7b61b0ac49cb?auto=format&fit=crop&w=900&q=80',
    isBestSeller: true,
    isChefSpecial: true,
    spiceLevel: 2,
    calories: 2950,
    servings: '3-5 Orang (Set Lengkap)',
    pieces: 10,
    sauceInfo: '10x Sos Cili + 5x Cup Sos Gourmet Lengkap',
    includedItems: [
      '10 pcs x Ayam Goreng Crispy',
      '10 pcs x Chili Sauce',
      '1 cup x Garlic Sauce (Sos 5-Bintang)',
      '1 cup x Cheese Sauce (Keju Premium)',
      '1 cup x Korean Habanero (Cili Cameron)',
      '1 cup x Japanese Furikake (Umami Kumamoto)',
      '1 cup x Japanese Togarashi (7 Rempah Tokyo)',
    ],
    availableDips: ['Semua 5 Cawan Sos Termasuk Lengkap'],
    options: {
      addons: [
        { id: 'add-coleslaw-1', name: 'Tambah 1 Cup Coleslaw 4oz', price: 3.50 },
        { id: 'add-coleslaw-2', name: 'Tambah 2 Cup Coleslaw 4oz (Jimat)', price: 6.50 },
        { id: 'add-wedges', name: 'Tambah Cheesy Wedges Melimpah', price: 8.50 },
      ]
    }
  },

  // 8. ADD-ON: HEMZAL SPECIAL COLESLAW
  {
    id: 'hemzal-special-coleslaw',
    name: 'Hemzal Special Coleslaw',
    tagline: 'Coleslaw Istimewa Hemzal Segar Harian',
    description: 'Coleslaw istimewa hemzal dibuat segar setiap hari dengan kubis rangup, lobak merah halus dan dressing mayonis rahsia chef yang masam manis menyegarkan.',
    price: 3.50,
    category: 'sides',
    image: 'https://images.unsplash.com/photo-1625944230945-1b7dd3b949ab?auto=format&fit=crop&w=900&q=80',
    isBestSeller: true,
    spiceLevel: 0,
    calories: 140,
    servings: '1-2 Orang',
    portions: [
      { label: '1 CUP 4 ONZ', price: 3.50 },
      { label: '2 CUP 4 ONZ', price: 6.50, isPopular: true },
    ],
  },

  // 9. CHEESY WEDGES MELIMPAH
  {
    id: 'cheesy-wedges-melimpah',
    name: 'Cheesy Wedges Melimpah',
    tagline: 'Kentang Segi Tebal dengan Sos Keju & Mayonis',
    description: 'Kentang wedges digoreng panas keemasan, diselaputi sos keju pekat panas dan mayonis Jepun berkrim. Kegemaran ramai rakyat Malaysia.',
    price: 8.50,
    category: 'sides',
    image: 'https://images.unsplash.com/photo-1576107232684-1279f3908594?auto=format&fit=crop&w=900&q=80',
    spiceLevel: 0,
    calories: 390,
    servings: '1-2 Orang',
  },

  // 10. LOADED CHICKEN POPPERS
  {
    id: 'loaded-chicken-poppers',
    name: 'Crispy Chicken Poppers',
    tagline: 'Bebola Ayam Rangup Bersaiz Gigitan',
    description: 'Bebola isi ayam pejal rangup 100% tanpa tulang, ditabur serbuk perencah rempah dan keju parmesan.',
    price: 9.90,
    category: 'sides',
    image: 'https://images.unsplash.com/photo-1562967916-eb82221dfb92?auto=format&fit=crop&w=900&q=80',
    spiceLevel: 1,
    calories: 410,
    servings: '1-2 Orang',
  },

  // 11. REFRESHING DRINKS
  {
    id: 'iced-lemon-tea-fizz',
    name: 'Iced Lemon Tea Refresh Fizz',
    tagline: 'Perahan Lemon Asli & Daun Pudina',
    description: 'Teh lemon sejuk segar dengan perahan lemon asli untuk menyegarkan tekak selepas menikmati ayam goreng panas & pedas.',
    price: 4.90,
    category: 'drinks',
    image: 'https://images.unsplash.com/photo-1556679343-c7306c1976bc?auto=format&fit=crop&w=900&q=80',
    spiceLevel: 0,
    calories: 90,
  },
  {
    id: 'teh-tarik-kaw-float',
    name: 'Teh Tarik Kaw Float Signature',
    tagline: 'Teh Tarik Pekat Berkrim dengan Aiskrim Vanila',
    description: 'Teh tarik kaw diadun daripada daun teh terpilih Cameron Highlands, dihiasi aiskrim vanila lembut di atasnya.',
    price: 6.90,
    category: 'drinks',
    image: 'https://images.unsplash.com/photo-1517256064527-09c73fc73e38?auto=format&fit=crop&w=900&q=80',
    isBestSeller: true,
    spiceLevel: 0,
    calories: 240,
  },
  {
    id: 'ribena-lychee-sparkler',
    name: 'Ribena Lychee Fizz Sparkler',
    tagline: 'Buah Laici Manis & Ribena Bergas Sejuk',
    description: 'Minuman pelepas dahaga dan penghilang rasa pedas! Paduan manis buah laici segar, soda berkilau dan jus Ribena asli.',
    price: 6.50,
    category: 'drinks',
    image: 'https://images.unsplash.com/photo-1513558161293-cdaf765ed2fd?auto=format&fit=crop&w=900&q=80',
    spiceLevel: 0,
    calories: 160,
  }
];

export const VOUCHERS: PromoVoucher[] = [
  {
    code: 'HEMZALFIRST',
    discountPercent: 15,
    minSpend: 25.00,
    description: 'Diskaun 15% untuk tempahan pertama anda! (Min belian RM25)'
  },
  {
    code: 'PADU5',
    discountAmount: 5.00,
    minSpend: 30.00,
    description: 'Potongan RM5 tunai untuk mana-mana set hidangan ayam Hemzal!'
  },
  {
    code: 'FAMILYFEAST',
    discountAmount: 10.00,
    minSpend: 60.00,
    description: 'Diskaun RM10 untuk pesanan 2x Hemzal Special Bucket / pembelian melebihi RM60!'
  }
];
