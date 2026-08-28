import { MenuItem, PromoVoucher } from '../types';

export const MENU_ITEMS: MenuItem[] = [
  // SIGNATURE CHICKEN
  {
    id: 'hemzal-original',
    name: 'Hemzal Original Gold',
    tagline: 'Klasik, Berempah & Golden Crispy',
    description: 'Ayam goreng potongan mega diperap 24 jam dengan 18 rempah rahsia Chef Helmi, disalut tepung keemasan rangup dan berjus di dalam.',
    price: 9.90,
    originalPrice: 11.50,
    category: 'signature',
    image: 'https://images.unsplash.com/photo-1562967914-608f82629710?auto=format&fit=crop&w=900&q=80',
    isBestSeller: true,
    isChefSpecial: true,
    spiceLevel: 1,
    calories: 420,
    servings: '1-2 Orang (Potongan Mega)',
    pieces: 1,
    availableDips: ['Sos Keju Lava', 'Bawang Putih Aioli', 'Sambal Hijau Meletup', 'Smoky BBQ'],
    options: {
      addons: [
        { id: 'add-cheese', name: 'Limpahan Cheese Lava', price: 3.00 },
        { id: 'add-coleslaw', name: 'Coleslaw Rangup Segar', price: 2.50 },
        { id: 'add-fries', name: 'Waffle Fries Kerinting', price: 4.50 },
      ]
    }
  },
  {
    id: 'hemzal-cheese-lava',
    name: 'Hemzal Molten Cheese Lava',
    tagline: 'Limpahan Keju Cheddar & Mozzarella Panas',
    description: 'Ayam goreng rangup disiram sos keju lava berkrim pekat bertaraf premium dengan taburan herba Itali harum dan paprika.',
    price: 12.50,
    originalPrice: 14.00,
    category: 'signature',
    image: 'https://images.unsplash.com/photo-1527477396000-e27163b481c2?auto=format&fit=crop&w=900&q=80',
    isBestSeller: true,
    spiceLevel: 1,
    calories: 580,
    servings: '1-2 Orang (Mega Size)',
    pieces: 1,
    availableDips: ['Extra Cheese Melt', 'Garlic Aioli', 'Smoky BBQ'],
    options: {
      addons: [
        { id: 'add-cheese-shot', name: 'Extra Double Cheese Shot', price: 3.50 },
        { id: 'add-jalapeno', name: 'Jalapeno Slices', price: 2.00 },
      ]
    }
  },
  {
    id: 'korean-habanero-berapi',
    name: 'Korean Fiery Habanero',
    tagline: 'Pedas Menyengat, Manis & Mengancam',
    description: 'Ayam krispi digaul mesra sos Habanero Korea pekat buatan sendiri dengan bijan bakar dan daun bawang segar. Pedas padu terangkat!',
    price: 12.90,
    category: 'signature',
    image: 'https://images.unsplash.com/photo-1626645738196-c2a7c87a8f58?auto=format&fit=crop&w=900&q=80',
    isBestSeller: true,
    spiceLevel: 3,
    calories: 510,
    servings: '1-2 Orang',
    pieces: 1,
    availableDips: ['Ranch Cooler', 'Sweet Corn Mayo', 'Extra Habanero Lava'],
    options: {
      addons: [
        { id: 'add-ranch', name: 'Ranch Dip Cooler', price: 2.50 },
        { id: 'add-cheese', name: 'Cheese Topping', price: 3.00 },
      ]
    }
  },
  {
    id: 'garlic-soy-crunch',
    name: 'Garlic Soy Crunch Royale',
    tagline: 'Glaze Bawang Putih Karamel Manis Gurih',
    description: 'Kombinasi kicap premium Jepun, madu liar tempatan dan bawang putih goreng rangup yang menaikkan aroma ayam ke tahap tertinggi.',
    price: 11.90,
    category: 'signature',
    image: 'https://images.unsplash.com/photo-1626082927389-6cd097cdc6ec?auto=format&fit=crop&w=900&q=80',
    isChefSpecial: true,
    spiceLevel: 0,
    calories: 460,
    servings: '1-2 Orang',
    pieces: 1,
    availableDips: ['Garlic Crisp Sauce', 'Wasabi Mayo'],
    options: {
      addons: [
        { id: 'add-garlic-chips', name: 'Extra Crispy Fried Garlic Chips', price: 2.00 },
        { id: 'add-fries', name: 'Waffle Fries', price: 4.50 },
      ]
    }
  },
  {
    id: 'smoky-bbq-glaze',
    name: 'Texas Smoky Hickory BBQ',
    tagline: 'Aroma Asap Kayu Hickory Asli',
    description: 'Salutan sos barbeku pekat beraroma asap semula jadi dengan sedikit kemanisan gula perang dan rempah lada hitam Sarawak.',
    price: 11.50,
    category: 'signature',
    image: 'https://images.unsplash.com/photo-1567620832903-9fc6debc209f?auto=format&fit=crop&w=900&q=80',
    spiceLevel: 1,
    calories: 490,
    servings: '1 Orang',
    pieces: 1,
    availableDips: ['Smoky BBQ Shot', 'Cheese Melt'],
  },

  // COMBOS & FEASTS
  {
    id: 'kombo-bujang-mantap',
    name: 'Kombo Bujang Mantap 1-Pax',
    tagline: '1x Ayam Mega + Waffle Fries + Coleslaw + Air',
    description: 'Set lengkap paling digemari! 1 ketul ayam mega pilihan perisa anda, kentang bergelombang rangup, coleslaw sejuk segar dan minuman bergas.',
    price: 16.90,
    originalPrice: 19.50,
    category: 'combos',
    image: 'https://images.unsplash.com/photo-1513639776629-7b61b0ac49cb?auto=format&fit=crop&w=900&q=80',
    isBestSeller: true,
    spiceLevel: 1,
    calories: 780,
    servings: '1 Orang',
    pieces: 1,
    availableDips: ['Sos Keju Lava Percuma', 'Garlic Aioli'],
    options: {
      addons: [
        { id: 'upgrade-large-drink', name: 'Upgrade Minuman Besar (Large)', price: 1.50 },
        { id: 'add-extra-piece', name: 'Tambah 1 Ketul Ayam Mega', price: 7.90 },
      ]
    }
  },
  {
    id: 'kombo-duo-fiesta',
    name: 'Kombo Duo Fiesta 2-Pax',
    tagline: '2x Ayam Mega + 1x Monster Burger + 2x Air',
    description: 'Pilihan sempurna untuk berdua! 2 ketul ayam signature, 1 Monster Burger Crispy, Cheesy Wedges bersaiz besar dan 2 minuman pilihan.',
    price: 33.90,
    originalPrice: 38.00,
    category: 'combos',
    image: 'https://images.unsplash.com/photo-1610057099443-fde8c4d50f91?auto=format&fit=crop&w=900&q=80',
    isBestSeller: true,
    spiceLevel: 2,
    calories: 1450,
    servings: '2-3 Orang',
    pieces: 2,
    availableDips: ['Sos Keju Lava', 'Habanero Dip'],
    options: {
      addons: [
        { id: 'add-extra-wedges', name: 'Tambah Extra Loaded Wedges', price: 5.90 },
      ]
    }
  },
  {
    id: 'family-mega-bucket',
    name: 'Family Mega Bucket Royale (9-Pcs)',
    tagline: '9x Ketul Ayam Mega + 2x Wedges + 2x Coleslaw + Botol Air 1.5L',
    description: 'Pesta hidangan sekeluarga! 9 ketul ayam goreng mega pelbagai perisa (Original, Cheese, Habanero), 2 Cheesy Wedges saiz L, 2 Coleslaw dan 1 botol minuman 1.5L.',
    price: 69.90,
    originalPrice: 79.00,
    category: 'combos',
    image: 'https://images.unsplash.com/photo-1585325701165-351af916e581?auto=format&fit=crop&w=900&q=80',
    isChefSpecial: true,
    spiceLevel: 2,
    calories: 3200,
    servings: '4-6 Orang',
    pieces: 9,
    availableDips: ['3x Pilihan Sos Celup Bebas'],
    options: {
      addons: [
        { id: 'add-monster-burger', name: 'Tambah Monster Burger', price: 11.90 },
        { id: 'add-poppers', name: 'Tambah 12pcs Chicken Poppers', price: 9.90 },
      ]
    }
  },

  // BURGERS & WRAPS
  {
    id: 'monster-crispy-burger',
    name: 'The Monster Crispy Burger',
    tagline: 'Paha Ayam Rangup Tebal + Roti Brioche Mentega',
    description: 'Kepingan paha ayam tanpa tulang digoreng rangup emas, disalut sos istimewa Hemzal, salad romaine segar, keju cheddar cair dan roti brioche bakar.',
    price: 14.90,
    originalPrice: 16.50,
    category: 'burgers',
    image: 'https://images.unsplash.com/photo-1568901346375-23c9450c58cd?auto=format&fit=crop&w=900&q=80',
    isBestSeller: true,
    spiceLevel: 1,
    calories: 650,
    servings: '1 Orang',
    availableDips: ['Garlic Mayo', 'Cheese Lava'],
    options: {
      addons: [
        { id: 'double-patty', name: 'Jadikan Double Crispy Patty', price: 6.50 },
        { id: 'add-egg', name: 'Telur Mata Goyang', price: 2.00 },
        { id: 'add-extra-cheese', name: 'Extra Cheddar Slice', price: 2.00 },
      ]
    }
  },
  {
    id: 'cheesy-habanero-burger',
    name: 'Cheesy Habanero Crunch Burger',
    tagline: 'Burger Pedas Berapi dengan Limpahan Keju',
    description: 'Untuk peminat pedas sejati! Daging ayam rangup dicelup sos Habanero berapi, dilapisi jalapeno pedas, keju mozzarella bakar dan sos keju leleh.',
    price: 16.50,
    category: 'burgers',
    image: 'https://images.unsplash.com/photo-1550547660-d9450f859349?auto=format&fit=crop&w=900&q=80',
    isChefSpecial: true,
    spiceLevel: 3,
    calories: 720,
    servings: '1 Orang',
    options: {
      addons: [
        { id: 'add-bacon-beef', name: 'Crispy Beef Strips', price: 3.50 },
        { id: 'upgrade-set', name: 'Set (Fries + Air)', price: 4.90 },
      ]
    }
  },
  {
    id: 'crispy-wrap-royale',
    name: 'Crispy Chicken Wrap Royale',
    tagline: 'Tortilla Panggang dengan Ayam Rangup & Ranch',
    description: 'Kepingan ayam rangup dibalut kemas dalam tortilla panggang panas bersama timun Jepun, tomato, daun salad dan sos buttermilk ranch berkrim.',
    price: 12.90,
    category: 'burgers',
    image: 'https://images.unsplash.com/photo-1626700051175-6818013e1d4f?auto=format&fit=crop&w=900&q=80',
    spiceLevel: 1,
    calories: 520,
    servings: '1 Orang',
  },

  // SIDES & DIPS
  {
    id: 'cheesy-wedges-melimpah',
    name: 'Cheesy Wedges Melimpah',
    tagline: 'Kentang Segi Tebal dengan Sos Keju & Mayonis',
    description: 'Kentang wedges digoreng panas keemasan, diselaputi sos keju pekat panas dan mayonis Jepun berkrim. Kegemaran ramai rakyat Malaysia.',
    price: 8.50,
    category: 'sides',
    image: 'https://images.unsplash.com/photo-1576107232684-1279f3908594?auto=format&fit=crop&w=900&q=80',
    isBestSeller: true,
    spiceLevel: 0,
    calories: 390,
    servings: '1-2 Orang',
  },
  {
    id: 'loaded-chicken-poppers',
    name: 'Loaded Crispy Chicken Poppers',
    tagline: 'Bebola Ayam Rangup Bersaiz Gigitan',
    description: 'Bebola isi ayam pejal rangup 100% tanpa tulang, ditabur serbuk perencah rempah dan keju parmesan. Sangat sedap dimakan begitu sahaja.',
    price: 9.90,
    category: 'sides',
    image: 'https://images.unsplash.com/photo-1562967916-eb82221dfb92?auto=format&fit=crop&w=900&q=80',
    spiceLevel: 1,
    calories: 410,
    servings: '1-2 Orang',
  },
  {
    id: 'waffle-fries-crisp',
    name: 'Waffle Fries Kerinting Gold',
    tagline: 'Kentang Waffle Bertekstur Rangup Maksima',
    description: 'Potongan corak waffle yang memberi tekstur paling rangup dan mengekalkan kehangatan lebih lama.',
    price: 6.90,
    category: 'sides',
    image: 'https://images.unsplash.com/photo-1585109649139-366815a0d713?auto=format&fit=crop&w=900&q=80',
    spiceLevel: 0,
    calories: 320,
  },
  {
    id: 'signature-dip-trio',
    name: 'Trio Signature Dip Sauces',
    tagline: '3x Sos Istimewa: Cheese Lava, Garlic Aioli & Sambal Meletup',
    description: 'Pek 3 sos celup eksklusif Chef Helmi untuk kepuasan mencelup tanpa had.',
    price: 5.50,
    category: 'sides',
    image: 'https://images.unsplash.com/photo-1472476443507-c7a5948772fc?auto=format&fit=crop&w=900&q=80',
    spiceLevel: 2,
    calories: 180,
  },

  // DRINKS & REFRESHERS
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
    isChefSpecial: true,
    spiceLevel: 0,
    calories: 160,
  },
  {
    id: 'iced-lemon-tea-fizz',
    name: 'Iced Lemon Tea Refresh Fizz',
    tagline: 'Perahan Lemon Asli & Daun Pudina',
    description: 'Teh lemon sejuk segar dengan hirisan lemon asli untuk menyegarkan tekak selepas menikmati ayam pedas.',
    price: 4.90,
    category: 'drinks',
    image: 'https://images.unsplash.com/photo-1556679343-c7306c1976bc?auto=format&fit=crop&w=900&q=80',
    spiceLevel: 0,
    calories: 90,
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
    description: 'Potongan RM5 tunai untuk semua hidangan kombo & burger!'
  },
  {
    code: 'FAMILYFEAST',
    discountAmount: 10.00,
    minSpend: 60.00,
    description: 'Diskaun RM10 untuk pesanan Family Mega Bucket!'
  }
];
