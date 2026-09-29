import { MenuItem, PromoVoucher } from '../types';
import { Language } from '../context/LanguageContext';

export interface SauceOption {
  id: string;
  name: string;
  nameEn?: string;
  price: number;
  badge?: string;
  badgeEn?: string;
  description: string;
  descriptionEn?: string;
}

/**
 * Calculates number of included gourmet sauce cups based on piece count:
 * Formula: Math.max(1, Math.floor(pieces / 2))
 */
export function calculateSauceCups(pieces: number, isSauceSet: boolean = true): number {
  if (!isSauceSet || pieces <= 0) return 0;
  return Math.max(1, Math.floor(pieces / 2));
}

/**
 * Calculates total chicken set price:
 * Total = (pieces * RM 4.50) + (sauceCups * unitSaucePrice)
 */
export function calculateChickenPrice(pieces: number, unitPiecePrice: number = 4.50, unitSaucePrice: number = 0): number {
  if (pieces <= 0) return 0;
  const sauceCups = unitSaucePrice > 0 ? calculateSauceCups(pieces, true) : 0;
  return (pieces * unitPiecePrice) + (sauceCups * unitSaucePrice);
}

export const GOURMET_SAUCES: SauceOption[] = [
  {
    id: 'sos-cili',
    name: 'Sos Cili Istimewa',
    nameEn: 'Special Chili Sauce',
    price: 0.00,
    badge: 'Percuma',
    badgeEn: 'Free',
    description: 'Sos cili manis pedas signature yang sentiasa PERCUMA dengan setiap hidangan ayam!',
    descriptionEn: 'Signature sweet & spicy chili sauce that is always FREE with every chicken order!',
  },
  {
    id: 'sos-keju',
    name: 'Sos Keju (Cheese)',
    nameEn: 'Molten Cheese Sauce',
    price: 2.00,
    description: 'Campuran keju berkrim premium, lemak masin yang menyelerakan (RM2.00 / cup).',
    descriptionEn: 'Rich molten cheese blend, savory and creamy (RM2.00 / cup).',
  },
  {
    id: 'sos-garlic',
    name: 'Sos Garlic (5-Bintang)',
    nameEn: '5-Star Roasted Garlic Sauce',
    price: 2.00,
    description: 'Resepi Chef Hotel 5-Bintang beraroma bawang putih panggang berkrim (RM2.00 / cup).',
    descriptionEn: '5-Star hotel chef recipe with aromatic roasted garlic and smooth cream (RM2.00 / cup).',
  },
  {
    id: 'sos-korean',
    name: 'Sos Korean Habanero',
    nameEn: 'Korean Habanero Sauce',
    price: 2.00,
    description: 'Cili Habanero segar Cameron Highlands pedas manis menyengat (RM2.00 / cup).',
    descriptionEn: 'Fresh Cameron Highlands Habanero chilies, fiery sweet with tangy zest (RM2.00 / cup).',
  },
  {
    id: 'sos-furikake',
    name: 'Sos Japanese Furikake',
    nameEn: 'Japanese Furikake Dip',
    price: 3.00,
    description: 'Rumpai laut, bijan bakar dan umami tradisi Kumamoto Jepun (RM3.00 / cup).',
    descriptionEn: 'Savory nori seaweed, toasted sesame, and Kumamoto umami seasoning (RM3.00 / cup).',
  },
  {
    id: 'sos-togarashi',
    name: 'Sos Japanese Togarashi',
    nameEn: 'Japanese Togarashi Dip',
    price: 3.00,
    description: 'Campuran 7 rempah tradisi Tokyo dengan lada Shichimi (RM3.00 / cup).',
    descriptionEn: 'Tokyo traditional 7-spice Shichimi blend with fragrant roasted chili (RM3.00 / cup).',
  },
];

export const MENU_ITEMS: MenuItem[] = [
  // 1. HEMZAL ORIGINAL SET
  {
    id: 'hemzal-original',
    name: 'Hemzal ORIGINAL SET',
    nameEn: 'Hemzal ORIGINAL CRISPY SET',
    tagline: 'Ayam Segar Diperap Rempah-Ratus Istimewa (RM4.50/Pcs)',
    taglineEn: 'Fresh Chicken Marinated in 18 Signature Spices (RM4.50/Pc)',
    description: 'Ayam segar yang diperap dengan rempah-ratus istimewa! Rangup di luar, juicy di dalam. Dihidang bersama pek sos cili percuma sentiasa.',
    descriptionEn: 'Fresh local poultry marinated for 24 hours in 18 botanical spices! Crispy outside, juicy inside. Served with complimentary chili sauce packs.',
    price: 9.00,
    category: 'signature',
    image: '/original.png',
    isBestSeller: true,
    spiceLevel: 1,
    calories: 420,
    servings: 'Kustom sebarang ketul (RM4.50 / Ketul)',
    servingsEn: 'Customize any pieces (RM4.50 / Pc)',
    pieces: 2,
    pieceUnitPrice: 4.50,
    defaultSauce: 'Sos Cili Istimewa',
    defaultSauceEn: 'Special Chili Sauce',
    saucePrice: 0.00,
    sauceInfo: 'Sos Cili Sentiasa PERCUMA',
    sauceInfoEn: 'Chili Sauce Always FREE',
    availableDips: [
      'Sos Cili (Percuma)',
      'Sos Keju (+RM2.00)',
      'Sos Garlic (+RM2.00)',
      'Sos Korean Habanero (+RM2.00)',
      'Sos Japanese Furikake (+RM3.00)',
      'Sos Japanese Togarashi (+RM3.00)',
    ],
    availableDipsEn: [
      'Chili Sauce (Free)',
      'Cheese Sauce (+RM2.00)',
      'Garlic Sauce (+RM2.00)',
      'Korean Habanero (+RM2.00)',
      'Japanese Furikake (+RM3.00)',
      'Japanese Togarashi (+RM3.00)',
    ],
    portions: [
      { label: '2 PCS', price: 9.00, pieces: 2 },
      { label: '6 PCS', price: 27.00, pieces: 6, isPopular: true },
      { label: '10 PCS', price: 45.00, pieces: 10 },
    ],
    options: {
      addons: [
        { id: 'add-coleslaw-1', name: 'Add-On Coleslaw (1 Cup 4oz)', price: 3.50 },
        { id: 'add-coleslaw-2', name: 'Add-On Coleslaw (2 Cup 4oz)', price: 6.50 },
        { id: 'add-extra-keju', name: 'Extra 1 Cup Sos Keju', price: 2.00 },
        { id: 'add-extra-garlic', name: 'Extra 1 Cup Sos Garlic', price: 2.00 },
        { id: 'add-extra-korean', name: 'Extra 1 Cup Sos Korean Habanero', price: 2.00 },
        { id: 'add-extra-furikake', name: 'Extra 1 Cup Sos Japanese Furikake', price: 3.00 },
        { id: 'add-extra-togarashi', name: 'Extra 1 Cup Sos Japanese Togarashi', price: 3.00 },
      ]
    }
  },

  // 2. HEMZAL CHEESE SET
  {
    id: 'hemzal-cheese',
    name: 'Hemzal CHEESE SET',
    nameEn: 'Hemzal CHEESE CRISPY SET',
    tagline: 'Campuran Beberapa Jenis Keju Kualiti Premium (2/6/10 Pcs)',
    taglineEn: 'Premium Molten Cheese Sauce Duo (2/6/10 Pcs)',
    description: 'Campuran beberapa jenis keju kualiti premium yang terpilih! Tekstur berkrim kaya dengan rasa keju lemak masin yang menyelerakan. Dihidang bersama sos keju & sos cili percuma.',
    descriptionEn: 'Select blend of premium melted cheeses! Velvety smooth texture packed with savory umami goodness. Served with signature cheese dip & complimentary chili sauce.',
    price: 11.00,
    category: 'signature',
    image: '/cheese.png',
    isBestSeller: true,
    spiceLevel: 1,
    calories: 520,
    servings: '2 / 6 / 10 Ketul Ayam Goreng',
    servingsEn: '2 / 6 / 10 Pcs Fried Chicken',
    pieces: 2,
    pieceUnitPrice: 4.50,
    defaultSauce: 'Sos Keju',
    defaultSauceEn: 'Cheese Sauce',
    saucePrice: 2.00,
    sauceInfo: 'Sos Keju Premium + Sos Cili Percuma',
    sauceInfoEn: 'Premium Cheese Sauce + Free Chili Sauce',
    availableDips: [
      'Sos Keju (+RM2.00)',
      'Sos Cili (Percuma)',
      'Sos Garlic (+RM2.00)',
      'Sos Korean Habanero (+RM2.00)',
      'Sos Japanese Furikake (+RM3.00)',
      'Sos Japanese Togarashi (+RM3.00)',
    ],
    availableDipsEn: [
      'Cheese Sauce (+RM2.00)',
      'Chili Sauce (Free)',
      'Garlic Sauce (+RM2.00)',
      'Korean Habanero (+RM2.00)',
      'Japanese Furikake (+RM3.00)',
      'Japanese Togarashi (+RM3.00)',
    ],
    portions: [
      { label: '2 PCS', price: 11.00, pieces: 2 },
      { label: '6 PCS', price: 33.00, pieces: 6, isPopular: true },
      { label: '10 PCS', price: 55.00, pieces: 10 },
    ],
    options: {
      addons: [
        { id: 'add-coleslaw-1', name: 'Add-On Coleslaw (1 Cup 4oz)', price: 3.50 },
        { id: 'add-coleslaw-2', name: 'Add-On Coleslaw (2 Cup 4oz)', price: 6.50 },
        { id: 'add-extra-keju', name: 'Extra 1 Cup Sos Keju', price: 2.00 },
        { id: 'add-extra-garlic', name: 'Extra 1 Cup Sos Garlic', price: 2.00 },
        { id: 'add-extra-korean', name: 'Extra 1 Cup Sos Korean Habanero', price: 2.00 },
        { id: 'add-extra-furikake', name: 'Extra 1 Cup Sos Japanese Furikake', price: 3.00 },
        { id: 'add-extra-togarashi', name: 'Extra 1 Cup Sos Japanese Togarashi', price: 3.00 },
      ]
    }
  },

  // 3. HEMZAL GARLIC SET
  {
    id: 'hemzal-garlic',
    name: 'Hemzal GARLIC SET',
    nameEn: 'Hemzal ROASTED GARLIC SET',
    tagline: 'Sos Garlic Istimewa Ciptaan Chef Hotel 5 Bintang (2/6/10 Pcs)',
    taglineEn: '5-Star Hotel Chef Roasted Garlic Dip (2/6/10 Pcs)',
    description: 'Sos Garlic istimewa yang dicipta oleh Chef Hotel 5 Bintang! Harum bawang putih panggang diadun lembut berkrim yang menyalut sempurna. Dihidang bersama sos garlic & sos cili percuma.',
    descriptionEn: 'Signature roasted garlic recipe crafted by our 5-star hotel Executive Chef! Fragrant slow-roasted garlic blended with creamy goodness. Served with garlic dip & free chili sauce.',
    price: 11.00,
    category: 'signature',
    image: '/garlic.png',
    isChefSpecial: true,
    spiceLevel: 0,
    calories: 480,
    servings: '2 / 6 / 10 Ketul Ayam Goreng',
    servingsEn: '2 / 6 / 10 Pcs Fried Chicken',
    pieces: 2,
    pieceUnitPrice: 4.50,
    defaultSauce: 'Sos Garlic',
    defaultSauceEn: 'Garlic Sauce',
    saucePrice: 2.00,
    sauceInfo: 'Sos Garlic Chef 5-Bintang + Sos Cili Percuma',
    sauceInfoEn: '5-Star Chef Garlic Sauce + Free Chili Sauce',
    availableDips: [
      'Sos Garlic (+RM2.00)',
      'Sos Cili (Percuma)',
      'Sos Keju (+RM2.00)',
      'Sos Korean Habanero (+RM2.00)',
      'Sos Japanese Furikake (+RM3.00)',
      'Sos Japanese Togarashi (+RM3.00)',
    ],
    availableDipsEn: [
      'Garlic Sauce (+RM2.00)',
      'Chili Sauce (Free)',
      'Cheese Sauce (+RM2.00)',
      'Korean Habanero (+RM2.00)',
      'Japanese Furikake (+RM3.00)',
      'Japanese Togarashi (+RM3.00)',
    ],
    portions: [
      { label: '2 PCS', price: 11.00, pieces: 2 },
      { label: '6 PCS', price: 33.00, pieces: 6, isPopular: true },
      { label: '10 PCS', price: 55.00, pieces: 10 },
    ],
    options: {
      addons: [
        { id: 'add-coleslaw-1', name: 'Add-On Coleslaw (1 Cup 4oz)', price: 3.50 },
        { id: 'add-coleslaw-2', name: 'Add-On Coleslaw (2 Cup 4oz)', price: 6.50 },
        { id: 'add-extra-garlic', name: 'Extra 1 Cup Sos Garlic', price: 2.00 },
        { id: 'add-extra-keju', name: 'Extra 1 Cup Sos Keju', price: 2.00 },
        { id: 'add-extra-korean', name: 'Extra 1 Cup Sos Korean Habanero', price: 2.00 },
        { id: 'add-extra-furikake', name: 'Extra 1 Cup Sos Japanese Furikake', price: 3.00 },
        { id: 'add-extra-togarashi', name: 'Extra 1 Cup Sos Japanese Togarashi', price: 3.00 },
      ]
    }
  },

  // 4. HEMZAL KOREAN HABANERO SET
  {
    id: 'hemzal-habanero',
    name: 'Hemzal HABANERO SET',
    nameEn: 'Hemzal KOREAN HABANERO SET',
    tagline: 'Cili Habanero Segar Cameron Highland (2/6/10 Pcs)',
    taglineEn: 'Fresh Highland Habanero Chili Glaze (2/6/10 Pcs)',
    description: 'Dihasilkan dari cili Habanero yang dipetik segar dari Cameron Highland! Pedas menyengat berapi dengan sentuhan manis dan masam membangkitkan selera. Dihidang bersama sos habanero & sos cili percuma.',
    descriptionEn: 'Made with freshly picked Cameron Highlands Habanero chilies! Intensely spicy and aromatic with sweet-tangy notes that ignite the palate. Served with habanero sauce & free chili sauce.',
    price: 11.00,
    category: 'signature',
    image: '/habanero.png',
    isBestSeller: true,
    spiceLevel: 3,
    calories: 490,
    servings: '2 / 6 / 10 Ketul Ayam Goreng',
    servingsEn: '2 / 6 / 10 Pcs Fried Chicken',
    pieces: 2,
    pieceUnitPrice: 4.50,
    defaultSauce: 'Sos Korean Habanero',
    defaultSauceEn: 'Korean Habanero Sauce',
    saucePrice: 2.00,
    sauceInfo: 'Sos Habanero Cameron Highland + Sos Cili Percuma',
    sauceInfoEn: 'Highland Habanero Sauce + Free Chili Sauce',
    availableDips: [
      'Sos Korean Habanero (+RM2.00)',
      'Sos Cili (Percuma)',
      'Sos Keju (+RM2.00)',
      'Sos Garlic (+RM2.00)',
      'Sos Japanese Furikake (+RM3.00)',
      'Sos Japanese Togarashi (+RM3.00)',
    ],
    availableDipsEn: [
      'Korean Habanero (+RM2.00)',
      'Chili Sauce (Free)',
      'Cheese Sauce (+RM2.00)',
      'Garlic Sauce (+RM2.00)',
      'Japanese Furikake (+RM3.00)',
      'Japanese Togarashi (+RM3.00)',
    ],
    portions: [
      { label: '2 PCS', price: 11.00, pieces: 2 },
      { label: '6 PCS', price: 33.00, pieces: 6, isPopular: true },
      { label: '10 PCS', price: 55.00, pieces: 10 },
    ],
    options: {
      addons: [
        { id: 'add-coleslaw-1', name: 'Add-On Coleslaw (Pereda Pedas)', price: 3.50 },
        { id: 'add-coleslaw-2', name: 'Add-On Coleslaw (2 Cup 4oz)', price: 6.50 },
        { id: 'add-extra-korean', name: 'Extra 1 Cup Sos Korean Habanero', price: 2.00 },
        { id: 'add-extra-keju', name: 'Extra 1 Cup Sos Keju (Pereda Pedas)', price: 2.00 },
        { id: 'add-extra-garlic', name: 'Extra 1 Cup Sos Garlic', price: 2.00 },
        { id: 'add-extra-furikake', name: 'Extra 1 Cup Sos Japanese Furikake', price: 3.00 },
        { id: 'add-extra-togarashi', name: 'Extra 1 Cup Sos Japanese Togarashi', price: 3.00 },
      ]
    }
  },

  // 5. HEMZAL JAPANESE FURIKAKE SET
  {
    id: 'hemzal-furikake',
    name: 'Hemzal FURIKAKE SET',
    nameEn: 'Hemzal JAPANESE FURIKAKE SET',
    tagline: 'Umami Sebenar Asal Dari Kumamoto Jepun (2/6/10 Pcs)',
    taglineEn: 'Authentic Kumamoto Japan Umami Crunch (2/6/10 Pcs)',
    description: 'Gabungan rasa umami sebenar yang berasal dari Kumamoto, Jepun! Keseimbangan rasa rumpai laut, bijan bakar dan perencah tradisi Jepun yang memikat. Dihidang bersama sos furikake & sos cili percuma.',
    descriptionEn: 'Authentic Japanese umami directly inspired by Kumamoto culinary traditions! Savory roasted nori seaweed, toasted sesame seeds, and traditional seasonings. Served with furikake dip & free chili sauce.',
    price: 12.00,
    category: 'signature',
    image: '/furikake.png',
    isChefSpecial: true,
    spiceLevel: 0,
    calories: 470,
    servings: '2 / 6 / 10 Ketul Ayam Goreng',
    servingsEn: '2 / 6 / 10 Pcs Fried Chicken',
    pieces: 2,
    pieceUnitPrice: 4.50,
    defaultSauce: 'Sos Japanese Furikake',
    defaultSauceEn: 'Japanese Furikake Dip',
    saucePrice: 3.00,
    sauceInfo: 'Sos Furikake Kumamoto Jepun + Sos Cili Percuma',
    sauceInfoEn: 'Kumamoto Furikake Sauce + Free Chili Sauce',
    availableDips: [
      'Sos Japanese Furikake (+RM3.00)',
      'Sos Cili (Percuma)',
      'Sos Keju (+RM2.00)',
      'Sos Garlic (+RM2.00)',
      'Sos Korean Habanero (+RM2.00)',
      'Sos Japanese Togarashi (+RM3.00)',
    ],
    availableDipsEn: [
      'Japanese Furikake (+RM3.00)',
      'Chili Sauce (Free)',
      'Cheese Sauce (+RM2.00)',
      'Garlic Sauce (+RM2.00)',
      'Korean Habanero (+RM2.00)',
      'Japanese Togarashi (+RM3.00)',
    ],
    portions: [
      { label: '2 PCS', price: 12.00, pieces: 2 },
      { label: '6 PCS', price: 36.00, pieces: 6, isPopular: true },
      { label: '10 PCS', price: 60.00, pieces: 10 },
    ],
    options: {
      addons: [
        { id: 'add-coleslaw-1', name: 'Add-On Coleslaw (1 Cup 4oz)', price: 3.50 },
        { id: 'add-coleslaw-2', name: 'Add-On Coleslaw (2 Cup 4oz)', price: 6.50 },
        { id: 'add-extra-furikake', name: 'Extra 1 Cup Sos Japanese Furikake', price: 3.00 },
        { id: 'add-extra-keju', name: 'Extra 1 Cup Sos Keju', price: 2.00 },
        { id: 'add-extra-garlic', name: 'Extra 1 Cup Sos Garlic', price: 2.00 },
        { id: 'add-extra-korean', name: 'Extra 1 Cup Sos Korean Habanero', price: 2.00 },
        { id: 'add-extra-togarashi', name: 'Extra 1 Cup Sos Japanese Togarashi', price: 3.00 },
      ]
    }
  },

  // 6. HEMZAL JAPANESE TOGARASHI SET
  {
    id: 'hemzal-togarashi',
    name: 'Hemzal TOGARASHI SET',
    nameEn: 'Hemzal JAPANESE TOGARASHI SET',
    tagline: '7 Rempah-Ratus Tradisi Masyarakat Tokyo (2/6/10 Pcs)',
    taglineEn: 'Traditional Tokyo 7-Spice Blend (2/6/10 Pcs)',
    description: 'Campuran 7 jenis rempah-ratus tradisi masyarakat Tokyo! Menggabungkan lada cili Shichimi, kulit oren kering, bijan dan halia untuk aroma herba pedas unik. Dihidang bersama sos togarashi & sos cili percuma.',
    descriptionEn: 'Tokyo heritage 7-spice formulation! Featuring Shichimi pepper, dried orange peel, toasted sesame, and ginger for a warm fragrant heat. Served with togarashi dip & free chili sauce.',
    price: 12.00,
    category: 'signature',
    image: '/togarashi.png',
    isNew: true,
    spiceLevel: 2,
    calories: 475,
    servings: '2 / 6 / 10 Ketul Ayam Goreng',
    servingsEn: '2 / 6 / 10 Pcs Fried Chicken',
    pieces: 2,
    pieceUnitPrice: 4.50,
    defaultSauce: 'Sos Japanese Togarashi',
    defaultSauceEn: 'Japanese Togarashi Dip',
    saucePrice: 3.00,
    sauceInfo: 'Sos Togarashi Tokyo + Sos Cili Percuma',
    sauceInfoEn: 'Tokyo Togarashi Sauce + Free Chili Sauce',
    availableDips: [
      'Sos Japanese Togarashi (+RM3.00)',
      'Sos Cili (Percuma)',
      'Sos Keju (+RM2.00)',
      'Sos Garlic (+RM2.00)',
      'Sos Korean Habanero (+RM2.00)',
      'Sos Japanese Furikake (+RM3.00)',
    ],
    availableDipsEn: [
      'Japanese Togarashi (+RM3.00)',
      'Chili Sauce (Free)',
      'Cheese Sauce (+RM2.00)',
      'Garlic Sauce (+RM2.00)',
      'Korean Habanero (+RM2.00)',
      'Japanese Furikake (+RM3.00)',
    ],
    portions: [
      { label: '2 PCS', price: 12.00, pieces: 2 },
      { label: '6 PCS', price: 36.00, pieces: 6, isPopular: true },
      { label: '10 PCS', price: 60.00, pieces: 10 },
    ],
    options: {
      addons: [
        { id: 'add-coleslaw-1', name: 'Add-On Coleslaw (1 Cup 4oz)', price: 3.50 },
        { id: 'add-coleslaw-2', name: 'Add-On Coleslaw (2 Cup 4oz)', price: 6.50 },
        { id: 'add-extra-togarashi', name: 'Extra 1 Cup Sos Japanese Togarashi', price: 3.00 },
        { id: 'add-extra-keju', name: 'Extra 1 Cup Sos Keju', price: 2.00 },
        { id: 'add-extra-garlic', name: 'Extra 1 Cup Sos Garlic', price: 2.00 },
        { id: 'add-extra-korean', name: 'Extra 1 Cup Sos Korean Habanero', price: 2.00 },
        { id: 'add-extra-furikake', name: 'Extra 1 Cup Sos Japanese Furikake', price: 3.00 },
      ]
    }
  },

  // 7. HEMZAL SPECIAL BUCKET (FEAST COMBO)
  {
    id: 'hemzal-special-bucket',
    name: 'Hemzal Special Bucket (10-Pcs & 5 Sos)',
    nameEn: 'Hemzal Special Bucket (10-Pcs & 5 Dips)',
    tagline: '10 Pcs Ayam (RM4.50/Pcs) + 10 Sos Cili Percuma + 5 Sos Gourmet Lengkap!',
    taglineEn: '10 Pcs Chicken (RM4.50/Pc) + 10 Free Chili Sauces + All 5 Gourmet Dips!',
    description: 'Pakej terlaris seisi keluarga! Nikmati 10 ketul ayam goreng rangup & berjus (RM45 nilai ayam), 10 pek sos cili PERCUMA, serta LENGKAP dengan SEMUA 5 cawan sos signature (Garlic RM2, Cheese RM2, Korean RM2, Furikake RM3, Togarashi RM3).',
    descriptionEn: 'Best-selling feast combo! Enjoy 10 huge pieces of crispy & juicy chicken (RM45 chicken value), 10 complimentary chili sauce packs, and COMPLETE with ALL 5 signature gourmet sauce cups (Garlic, Cheese, Korean, Furikake, Togarashi).',
    price: 53.90,
    originalPrice: 57.00,
    category: 'combos',
    image: '/bucketSpecial.png',
    isBestSeller: true,
    isChefSpecial: true,
    spiceLevel: 2,
    calories: 2950,
    servings: '3-5 Orang (Pakej Lengkap 10 Pcs)',
    servingsEn: '3-5 Persons (Full 10 Pcs Feast)',
    pieces: 10,
    pieceUnitPrice: 4.50,
    sauceInfo: '10x Sos Cili Percuma + 5x Cup Sos Gourmet Lengkap',
    sauceInfoEn: '10x Free Chili Sauces + 5x Full Gourmet Sauce Cups',
    includedItems: [
      '10 pcs x Ayam Goreng Crispy (Nilai RM45)',
      '10 pcs x Sos Cili Istimewa (PERCUMA)',
      '1 cup x Sos Garlic (5-Bintang)',
      '1 cup x Sos Keju (Cheese)',
      '1 cup x Sos Korean Habanero (Cameron)',
      '1 cup x Sos Japanese Furikake (Kumamoto)',
      '1 cup x Sos Japanese Togarashi (Tokyo)',
    ],
    includedItemsEn: [
      '10 pcs x Golden Crispy Chicken (RM45 value)',
      '10 pcs x Special Chili Sauce (FREE)',
      '1 cup x 5-Star Garlic Sauce',
      '1 cup x Molten Cheese Sauce',
      '1 cup x Korean Habanero Sauce',
      '1 cup x Japanese Furikake Sauce',
      '1 cup x Japanese Togarashi Sauce',
    ],
    availableDips: ['Semua 5 Cawan Sos Gourmet Termasuk Lengkap + Sos Cili'],
    availableDipsEn: ['All 5 Gourmet Sauce Cups Included + Chili Sauce'],
    options: {
      addons: [
        { id: 'add-coleslaw-1', name: 'Tambah 1 Cup Coleslaw 4oz', price: 3.50 },
        { id: 'add-coleslaw-2', name: 'Tambah 2 Cup Coleslaw 4oz (Jimat)', price: 6.50 },
        { id: 'add-extra-keju', name: 'Extra 1 Cup Sos Keju', price: 2.00 },
        { id: 'add-extra-garlic', name: 'Extra 1 Cup Sos Garlic', price: 2.00 },
        { id: 'add-extra-korean', name: 'Extra 1 Cup Sos Korean Habanero', price: 2.00 },
        { id: 'add-extra-furikake', name: 'Extra 1 Cup Sos Japanese Furikake', price: 3.00 },
        { id: 'add-extra-togarashi', name: 'Extra 1 Cup Sos Japanese Togarashi', price: 3.00 },
      ]
    }
  },

  // 8. ADD-ON / SIDES: HEMZAL SPECIAL COLESLAW
  {
    id: 'hemzal-special-coleslaw',
    name: 'Hemzal Special Coleslaw',
    nameEn: 'Hemzal Special Chilled Coleslaw',
    tagline: 'Coleslaw Istimewa Hemzal Segar Harian',
    taglineEn: 'Daily Fresh Chilled Chef Coleslaw',
    description: 'Coleslaw istimewa hemzal dibuat segar setiap hari dengan kubis rangup, lobak merah halus dan dressing mayonis rahsia chef yang masam manis menyegarkan.',
    descriptionEn: 'Daily handcrafted coleslaw made with crisp cabbage, shredded sweet carrots, and our Chef’s secret creamy tangy herb dressing.',
    price: 3.50,
    category: 'sides',
    image: '/coleslaw.png',
    isBestSeller: true,
    spiceLevel: 0,
    calories: 140,
    servings: '1-2 Orang',
    servingsEn: '1-2 Persons',
    portions: [
      { label: '1 CUP 4 ONZ', price: 3.50 },
      { label: '2 CUP 4 ONZ', price: 6.50, isPopular: true },
    ],
  }
];

export function getLocalizedMenuItem(item: MenuItem, lang: Language): MenuItem {
  if (lang === 'en') {
    return {
      ...item,
      name: item.nameEn || item.name,
      tagline: item.taglineEn || item.tagline,
      description: item.descriptionEn || item.description,
      servings: item.servingsEn || item.servings,
      defaultSauce: item.defaultSauceEn || item.defaultSauce,
      sauceInfo: item.sauceInfoEn || item.sauceInfo,
      includedItems: item.includedItemsEn || item.includedItems,
      availableDips: item.availableDipsEn || item.availableDips,
    };
  }
  return item;
}

export function getLocalizedSauce(sauce: SauceOption, lang: Language): SauceOption {
  if (lang === 'en') {
    return {
      ...sauce,
      name: sauce.nameEn || sauce.name,
      badge: sauce.badgeEn || sauce.badge,
      description: sauce.descriptionEn || sauce.description,
    };
  }
  return sauce;
}

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
