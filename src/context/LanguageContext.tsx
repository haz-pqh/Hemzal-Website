import React, { createContext, useContext, useState } from 'react';

export type Language = 'bm' | 'en';

export interface Translations {
  [key: string]: {
    bm: string;
    en: string;
  };
}

export const TRANSLATIONS: Translations = {
  // Common / General
  'common.currency': { bm: 'RM', en: 'RM' },
  'common.pcs': { bm: 'Ketul', en: 'PCS' },
  'common.pieces': { bm: 'ketul', en: 'pcs' },
  'common.popular': { bm: 'Popular', en: 'Popular' },
  'common.active': { bm: 'AKTIF', en: 'ACTIVE' },
  'common.free': { bm: 'PERCUMA', en: 'FREE' },
  'common.close': { bm: 'Tutup', en: 'Close' },
  'common.confirm': { bm: 'Sahkan', en: 'Confirm' },
  'common.reset': { bm: 'Set Semula', en: 'Reset' },
  'common.clear': { bm: 'Padam', en: 'Clear' },
  'common.backToTop': { bm: 'Kembali ke atas', en: 'Back to top' },
  'common.toastAdded': { bm: 'ditambah ke troli!', en: 'added to cart!' },
  'common.viewCart': { bm: 'Lihat Troli', en: 'View Cart' },

  // Navigation
  'nav.home': { bm: 'Utama', en: 'Home' },
  'nav.recipe': { bm: 'Resepi', en: 'Recipe' },
  'nav.menu': { bm: 'Menu', en: 'Menu' },
  'nav.locations': { bm: 'Lokasi', en: 'Locations' },
  'nav.reviews': { bm: 'Ulasan', en: 'Reviews' },
  'nav.contact': { bm: 'Hubungi', en: 'Contact' },
  'nav.catering': { bm: 'Katering / Francais', en: 'Catering / Franchise' },
  'nav.orderNow': { bm: 'Pesan Sekarang', en: 'Order Now' },
  'nav.hot': { bm: 'Panas', en: 'Hot' },
  'nav.kitchenHotline': { bm: 'Hotline Dapur', en: 'Kitchen Hotline' },
  'nav.cart': { bm: 'Troli', en: 'Cart' },

  // Hero Section
  'hero.award': { bm: 'Resepi Eksklusif Chef Mohammad Helmi', en: 'Exclusive Recipe by Chef Mohammad Helmi' },
  'hero.headline1': { bm: 'RANGUP DI', en: 'CRISPY ON THE' },
  'hero.headlineOutside': { bm: 'LUAR', en: 'OUTSIDE' },
  'hero.headline2': { bm: 'JUICY DI', en: 'JUICY ON THE' },
  'hero.headlineInside': { bm: 'DALAM.', en: 'INSIDE.' },
  'hero.subheading': {
    bm: 'Nikmati ayam goreng gourmet Malaysia bertaraf hotel 5-bintang. Diperap 24 jam dengan 18 rempah rahsia, disalut tepung keemasan rangup dan dihidang panas bersama sos istimewa.',
    en: 'Experience 5-star hotel grade Malaysian gourmet crispy chicken. Marinated 24 hours in 18 secret herbs & spices, freshly cooked to golden perfection with signature gourmet sauces.',
  },
  'hero.crunchPrompt': { bm: '🔊 Dengar Bunyi Kerangupan', en: '🔊 Hear The Crunch Sound' },
  'hero.crunchActive': { bm: '💥 KRUP KRAP! RANGUP PADU!', en: '💥 CRUNCH! EXTRA CRISPY!' },
  'hero.orderOnline': { bm: 'Pesan Menu Online', en: 'Order Online' },
  'hero.findNearest': { bm: 'Cari Cawangan Terdekat', en: 'Find Nearest Outlet' },
  'hero.halal': { bm: '100% Halal', en: '100% Halal' },
  'hero.halalSub': { bm: 'Diiktiraf JAKIM', en: 'JAKIM Certified' },
  'hero.marinade': { bm: '24 Jam', en: '24 Hours' },
  'hero.marinadeSub': { bm: 'Perapan Rempah', en: 'Spice Marinade' },
  'hero.freshChicken': { bm: 'Ayam Segar', en: 'Fresh Chicken' },
  'hero.freshChickenSub': { bm: 'Bukan Beku', en: 'Never Frozen' },
  'hero.megaSize': { bm: 'Saiz Mega', en: 'Mega Size' },
  'hero.megaSizeSub': { bm: 'Potongan Gergasi', en: 'Giant Cuts' },
  'hero.floatingReviewsCount': { bm: '12,000+ Ulasan', en: '12,000+ Reviews' },
  'hero.floatingMegaCut': { bm: 'Potongan Mega', en: 'Mega Cuts' },
  'hero.floatingMegaCutSub': { bm: 'Extra Rangup & Berjus', en: 'Extra Crispy & Juicy' },

  // Chef Story Section
  'chef.badge': { bm: 'Sentuhan Pakar Kulinari Antarabangsa', en: 'Masterful Culinary Craftsmanship' },
  'chef.title': { bm: 'RAHSIA DI SEBALIK KEHEBATAN', en: 'THE SECRET BEHIND THE TASTE OF' },
  'chef.desc': {
    bm: 'Dicipta oleh Chef Mohammad Helmi, bekas Chef Eksekutif rangkaian hotel 5-bintang dengan pengalaman kulinari lebih 15 tahun. Misi kami: membawakan ayam goreng kualiti tertinggi pada harga yang berpatutan untuk semua.',
    en: 'Crafted by Chef Mohammad Helmi, former 5-star hotel executive chef with over 15 years of culinary expertise. Our mission: bringing world-class gourmet fried chicken at an affordable price for all.',
  },
  'chef.role': { bm: 'Pengasas & Ketua Kulinari Hemzal', en: 'Founder & Head of Culinary at Hemzal' },
  'chef.experience': { bm: '15+ Tahun Pengalaman Kulinari Hotel 5-Bintang', en: '15+ Years 5-Star Hotel Culinary Experience' },
  'chef.quote': {
    bm: '"Setiap Gigitan Mesti Berbunyi Kerangupan & Mengalirkan Jus."',
    en: '"Every Single Bite Must Sound Super Crispy & Flow with Juicy Flavor."',
  },
  'chef.quoteSub': {
    bm: 'Bermula dari dapur hotel mewah bertaraf 5-bintang, Chef Mohammad Helmi membawa formula rahsia perapan botani 24 jam dan teknik kawalan suhu minyak terperinci ke hidangan harian anda. Tiada jalan pintas — setiap ketul ayam Hemzal disalut dan digoreng panas mengikut piawaian kulinari bertaraf dunia.',
    en: 'Originating from luxury 5-star hotel kitchens, Chef Mohammad Helmi brings his 24-hour botanical spice marinade and precise temperature control directly to your plate. No shortcuts — every piece of Hemzal chicken is battered and fried hot to world-class standards.',
  },
  'chef.pillarsHeading': { bm: '4 Tonggak Utama Kerangupan Hemzal:', en: '4 Core Pillars of Hemzal Crunch:' },
  'chef.pillarTag': { bm: 'Tonggak', en: 'Pillar' },
  'chef.activeStatus': { bm: 'AKTIF', en: 'ACTIVE' },
  'chef.highlight1Title': { bm: '18 Rempah Botani', en: '18 Botanical Spices' },
  'chef.highlight1Desc': { bm: 'Perapan rahsia tanpa MSG melampau', en: 'Secret marinade without excess MSG' },
  'chef.highlight2Title': { bm: 'Kawalan Minyak 175°C', en: '175°C Oil Control' },
  'chef.highlight2Desc': { bm: 'Kekal rangup berjam tanpa berminyak', en: 'Stays crispy for hours without feeling greasy' },
  'chef.highlight3Title': { bm: 'Sos Resepi Asli', en: 'Artisan Sauces' },
  'chef.highlight3Desc': { bm: 'Keju New Zealand & cili segar tempatan', en: 'New Zealand cheese & fresh local chilies' },
  'chef.proofPoint1': { bm: 'Disediakan segar mengikut piawaian sanitasi gred hotel.', en: 'Prepared fresh following 5-star hotel sanitation standards.' },
  'chef.proofPoint2': { bm: 'Minyak masak sentiasa dipantau nilai TPM untuk kerangupan selamat.', en: 'Cooking oil TPM values monitored continuously for healthy crunch.' },
  'chef.proofPoint3': { bm: 'Dijamin 100% Halal dan suci oleh pembekal tempatan bertauliah.', en: 'Guaranteed 100% Halal and pristine by certified local suppliers.' },

  // Menu Section
  'menu.badge': { bm: 'Pilihan Gourmet Rasmi Hemzal', en: 'Official Hemzal Gourmet Selection' },
  'menu.title': { bm: 'MENU & SENARAI HARGA', en: 'MENU & PRICE LIST' },
  'menu.quote': {
    bm: '"Rangup di luar, Juicy di dalam!" — Ayam segar diperap harian dengan resepi eksklusif dan dihidang panas mengikut tempahan anda.',
    en: '"Crispy outside, Juicy inside!" — Fresh chicken marinated daily with exclusive recipes and served fresh and hot to order.',
  },
  'menu.baseRate': { bm: 'Kadar Asas Ayam', en: 'Base Chicken Rate' },
  'menu.baseRateSub': { bm: 'Kustom sebarang kuantiti', en: 'Customize any quantity' },
  'menu.ratePerPc': { bm: 'RM 4.50 / Ketul', en: 'RM 4.50 / Pc' },
  'menu.chiliSauce': { bm: 'Sos Cili', en: 'Chili Sauce' },
  'menu.chiliSauceSub': { bm: 'Disertakan setiap set', en: 'Included with every set' },
  'menu.freeNotice': { bm: 'PERCUMA (RM 0.00)', en: 'FREE (RM 0.00)' },
  'menu.cheeseGarlicKorean': { bm: 'Sos Keju / Garlic / Korean', en: 'Cheese / Garlic / Korean Dip' },
  'menu.signatureSauceSub': { bm: 'Sos gourmet signature', en: 'Signature gourmet dips' },
  'menu.japaneseSauces': { bm: 'Sos Furikake / Togarashi', en: 'Furikake / Togarashi Dips' },
  'menu.japaneseSaucesSub': { bm: 'Sos import Jepun eksklusif', en: 'Exclusive Japanese import seasoning' },
  'menu.openingSpecial': { bm: '🔥 Tawaran Istimewa Pembukaan', en: '🔥 Opening Special Offer' },
  'menu.originalPrice': { bm: 'Harga Asal', en: 'Original Price' },
  'menu.saveAmount': { bm: 'Jimat RM 3.10!', en: 'Save RM 3.10!' },
  'menu.specialBucketDesc': {
    bm: 'Pakej hidangan pesta lengkap terlaris! Nikmati 10 ketul ayam rangup berjus bersama 10 pek sos cili serta LENGKAP dengan 5 cawan sos gourmet istimewa:',
    en: 'Best-selling full feast combo! Enjoy 10 pieces of crispy juicy chicken with 10 chili sauce packs plus COMPLETE with 5 special gourmet sauce cups:',
  },
  'menu.orderSpecialBucket': { bm: 'Pesan Special Bucket • RM 53.90', en: 'Order Special Bucket • RM 53.90' },
  'menu.searchPlaceholder': { bm: 'Cari Original, Cheese, Garlic, Habanero...', en: 'Search Original, Cheese, Garlic, Habanero...' },
  'menu.all': { bm: 'Semua Menu', en: 'All Menu' },
  'menu.signature': { bm: 'Set Ayam Crispy', en: 'Crispy Chicken Sets' },
  'menu.combos': { bm: 'Bucket & Kombo Famili', en: 'Bucket & Family Combos' },
  'menu.sides': { bm: 'Sampingan & Sos', en: 'Sides & Dips' },
  'menu.guarantee': { bm: '100% Resepi Original Crispy', en: '100% Original Crispy Recipe' },
  'menu.guaranteeSub': { bm: 'Kepedasan & rasa dipilih melalui sos signature', en: 'Heat & flavors chosen via signature sauces' },
  'menu.noItemsFound': { bm: 'Tiada item dijumpai', en: 'No items found' },
  'menu.noItemsDesc': { bm: 'Cuba tukar carian atau pilih kategori lain.', en: 'Try adjusting your search or select another category.' },
  'menu.resetSelection': { bm: 'Reset Pilihan', en: 'Reset Selection' },
  'menu.bestSeller': { bm: 'Best Seller', en: 'Best Seller' },
  'menu.chefSpecial': { bm: 'Pilihan Chef', en: "Chef's Special" },
  'menu.newItem': { bm: 'Baharu', en: 'New' },
  'menu.selectSize': { bm: 'Pilih Saiz / Kuantiti:', en: 'Select Size / Quantity:' },
  'menu.price': { bm: 'Harga', en: 'Price' },
  'menu.customize': { bm: 'Kustom', en: 'Customize' },
  'menu.order': { bm: 'Pesan', en: 'Order' },
  'menu.slogan': { bm: 'Rangup di luar, juicy di dalam', en: 'Crispy outside, juicy inside' },

  // Customizer Modal
  'customizer.title': { bm: 'Pilihan Kustomisasi & Pakej', en: 'Customization & Package Options' },
  'customizer.rate': { bm: 'Kadar', en: 'Rate' },
  'customizer.chickenPieces': { bm: 'Ketul Ayam', en: 'Chicken Pieces' },
  'customizer.included': { bm: 'Termasuk', en: 'Included' },
  'customizer.includedItemsTitle': { bm: 'Kandungan Pakej Lengkap:', en: 'Complete Package Contents:' },
  'customizer.step1Pieces': { bm: '1. Pilih Kuantiti Ketul (PCS)', en: '1. Select Piece Quantity (PCS)' },
  'customizer.piecePrice': { bm: '1 Ketul = RM 4.50', en: '1 Piece = RM 4.50' },
  'customizer.customPieces': { bm: 'Kustom Sebarang Bilangan Ketul', en: 'Custom Any Number of Pieces' },
  'customizer.includedSauceCups': { bm: 'Termasuk cawan sos gourmet', en: 'Included gourmet sauce cups' },
  'customizer.plusFreeChili': { bm: '+ Sos Cili Percuma', en: '+ Free Chili Sauce' },
  'customizer.step1Portion': { bm: '1. Pilih Saiz Bahagian', en: '1. Select Portion Size' },
  'customizer.required': { bm: 'Wajib', en: 'Required' },
  'customizer.freeChiliBannerTitle': { bm: 'Sos Cili Sentiasa PERCUMA (RM 0.00)!', en: 'Chili Sauce is Always FREE (RM 0.00)!' },
  'customizer.freeChiliBannerDesc': {
    bm: 'Setiap pesanan ayam goreng Hemzal akan dibekalkan dengan Sos Cili secara percuma.',
    en: 'Every Hemzal fried chicken order comes supplied with complimentary Chili Sauce.',
  },
  'customizer.step2Sauce': { bm: '2. Pilihan Sos Utama', en: '2. Select Primary Sauce / Dip' },
  'customizer.chooseOneSauce': { bm: 'Pilih 1 Sos', en: 'Select 1 Sauce' },
  'customizer.step3Addons': { bm: '3. Tambahan Add-On (Coleslaw / Sos)', en: '3. Add-On Options (Coleslaw / Sauce)' },
  'customizer.optional': { bm: 'Pilihan Tambahan', en: 'Optional' },
  'customizer.step4Notes': { bm: '4. Nota Khas untuk Dapur (Pilihan)', en: '4. Special Kitchen Instructions (Optional)' },
  'customizer.notesPlaceholder': { bm: 'Cth: Nak bahagian drumstick, sos asingkan, dsb.', en: 'E.g., Prefer drumsticks, sauce on the side, etc.' },
  'customizer.addToCart': { bm: 'Tambah', en: 'Add to Cart' },

  // Cart Drawer
  'cart.title': { bm: 'Troli Pesanan Anda', en: 'Your Order Cart' },
  'cart.itemsCount': { bm: 'Item', en: 'Items' },
  'cart.deliveryTab': { bm: 'Penghantaran (Delivery)', en: 'Delivery' },
  'cart.pickupTab': { bm: 'Ambil Sendiri (Pickup)', en: 'Self Pickup' },
  'cart.selectBranch': { bm: 'Pilih Cawangan Berdekatan:', en: 'Select Preferred Branch:' },
  'cart.deliveryAddress': { bm: 'Alamat Penghantaran Penuh:', en: 'Full Delivery Address:' },
  'cart.deliveryAddressPlaceholder': { bm: 'No. rumah, nama jalan, poskod, bandar...', en: 'House number, street name, postcode, city...' },
  'cart.recipientInfo': { bm: 'Maklumat Penerima / Pemesan:', en: 'Recipient Contact Info:' },
  'cart.namePlaceholder': { bm: 'Nama Penuh Anda', en: 'Your Full Name' },
  'cart.phonePlaceholder': { bm: 'Nombor Telefon (Cth: 0123456789)', en: 'Phone Number (E.g. 0123456789)' },
  'cart.emptyTitle': { bm: 'Troli Anda Masih Kosong', en: 'Your Cart is Empty' },
  'cart.emptySubtitle': { bm: 'Pilih hidangan ayam crispy panas dan sos gourmet kegemaran anda sekarang!', en: 'Pick your favorite crispy golden chicken and gourmet dips now!' },
  'cart.voucherTitle': { bm: 'Kod Baucar Promosi', en: 'Promo Voucher Code' },
  'cart.voucherPlaceholder': { bm: 'Masukkan kod (cth: HEMZALFIRST)', en: 'Enter code (e.g. HEMZALFIRST)' },
  'cart.applyVoucher': { bm: 'Tebus', en: 'Apply' },
  'cart.voucherApplied': { bm: 'Baucar Berjaya Ditebus', en: 'Voucher Applied' },
  'cart.subtotal': { bm: 'Jumlah Makanan', en: 'Food Subtotal' },
  'cart.discount': { bm: 'Diskaun Baucar', en: 'Voucher Discount' },
  'cart.totalPayable': { bm: 'Jumlah Perlu Dibayar', en: 'Total Payable' },
  'cart.deliveryFeeNotice': {
    bm: 'Caj rider Grab Express / Lalamove akan disemak dan dimaklumkan melalui WhatsApp mengikut alamat anda.',
    en: 'Delivery rider fee (Grab Express / Lalamove) will be confirmed via WhatsApp based on your address.',
  },
  'cart.pickupNotice': {
    bm: 'Pesanan anda akan dihantar terus kepada staf dapur outlet untuk persediaan pantas.',
    en: 'Your order will be sent directly to our outlet kitchen staff for swift preparation.',
  },
  'cart.checkoutWhatsApp': { bm: 'Kirim Pesanan ke WhatsApp', en: 'Send Order via WhatsApp' },
  'cart.checkoutStep1': { bm: 'Menghubungkan ke Dapur Outlet...', en: 'Connecting to Outlet Kitchen...' },
  'cart.checkoutStep2': { bm: 'Menyusun Pesanan WhatsApp Rasmi...', en: 'Formatting Official WhatsApp Order...' },
  'cart.checkoutStep3': { bm: 'Sedia! Membuka WhatsApp...', en: 'Ready! Opening WhatsApp...' },
  'cart.openWhatsAppNow': { bm: 'Buka WhatsApp Sekarang', en: 'Open WhatsApp Now' },
  'cart.validationName': { bm: 'Sila isi Nama Penuh anda.', en: 'Please enter your Full Name.' },
  'cart.validationPhone': { bm: 'Sila isi Nombor Telefon anda.', en: 'Please enter your Phone Number.' },
  'cart.validationAddress': { bm: 'Sila isi Alamat Penghantaran lengkap.', en: 'Please enter your complete Delivery Address.' },
  'cart.voucherInvalid': { bm: 'Kod baucar tidak sah.', en: 'Invalid voucher code.' },
  'cart.voucherMinSpend': { bm: 'Minimum perbelanjaan untuk', en: 'Minimum spend for' },

  // Branch Locator
  'branch.badge': { bm: 'Rangkaian Outlet Hemzal', en: 'Hemzal Outlet Network' },
  'branch.title': { bm: 'SENARAI CAWANGAN KAMI', en: 'OUR OUTLET LOCATIONS' },
  'branch.subtitle': {
    bm: 'Cari restoran Hemzal Crispy Chicken berdekatan anda untuk pesanan bawa pulang atau pandu arah pantas dengan Google Maps & Waze.',
    en: 'Find your nearest Hemzal Crispy Chicken restaurant for takeaway orders or fast navigation with Google Maps & Waze.',
  },
  'branch.tabAll': { bm: 'Semua Cawangan', en: 'All Outlets' },
  'branch.tabSelangor': { bm: 'Selangor', en: 'Selangor' },
  'branch.tabKL': { bm: 'WP Kuala Lumpur', en: 'WP Kuala Lumpur' },
  'branch.searchPlaceholder': { bm: 'Cari nama cawangan, bandar atau jalan...', en: 'Search outlet name, city, or street...' },
  'branch.onlyOpen': { bm: 'Buka Sekarang Sahaja', en: 'Open Now Only' },
  'branch.gpsTitle': { bm: 'Cari Cawangan Paling Dekat Dengan Anda', en: 'Find The Closest Outlet to You' },
  'branch.gpsDesc': {
    bm: 'Aktifkan GPS peranti anda untuk mengira jarak tepat (km) ke setiap outlet Hemzal.',
    en: 'Enable your device GPS to calculate the exact distance (km) to each Hemzal outlet.',
  },
  'branch.gpsActive': {
    bm: 'Cawangan telah disusun bermula dari yang paling dekat dengan lokasi semasa anda.',
    en: 'Outlets are sorted starting from the closest to your current location.',
  },
  'branch.btnDetect': { bm: 'Kesan Cawangan Paling Dekat', en: 'Find Nearest Outlet' },
  'branch.btnDetecting': { bm: 'Mengesan Lokasi GPS...', en: 'Detecting GPS Location...' },
  'branch.btnResetGps': { bm: 'Nyahaktif GPS', en: 'Disable GPS' },
  'branch.closest': { bm: 'Cawangan Paling Dekat', en: 'Closest Outlet' },
  'branch.fromYou': { bm: 'dari anda', en: 'from you' },
  'branch.open': { bm: 'Dapur Dibuka', en: 'Kitchen Open' },
  'branch.closed': { bm: 'Tutup Sementara', en: 'Closed Temporarily' },
  'branch.operatingHours': { bm: 'Waktu Operasi', en: 'Operating Hours' },
  'branch.directCall': { bm: 'Hubungi Hotline Outlet', en: 'Call Outlet Hotline' },
  'branch.waze': { bm: 'Pandu di Waze', en: 'Drive with Waze' },
  'branch.googleMaps': { bm: 'Pandu di Google Maps', en: 'Google Maps' },
  'branch.whatsapp': { bm: 'WhatsApp Outlet', en: 'WhatsApp Outlet' },
  'branch.noBranchFound': { bm: 'Tiada cawangan dijumpai.', en: 'No outlets found.' },
  'branch.tryOtherFilter': { bm: 'Cuba ubah carian anda atau pilih tab wilayah lain.', en: 'Try changing your search or select another region tab.' },

  // Testimonials
  'testimonials.badge': { bm: 'Komen & Maklum Balas Peminat Ayam', en: 'Customer Reviews & Feedback' },
  'testimonials.title': { bm: 'APA KATA FOODIE MALAYSIA?', en: 'WHAT MALAYSIAN FOODIES SAY' },
  'testimonials.desc': {
    bm: 'Lebih 250,000 rakyat Malaysia telah menikmati keenakan ayam goreng Hemzal Crispy Chicken.',
    en: 'Over 250,000 Malaysians have enjoyed the extraordinary crunch of Hemzal Crispy Chicken.',
  },
  'testimonials.favorite': { bm: 'Kegemaran', en: 'Favorite' },
  'testimonials.shareMoment': { bm: 'Kongsikan Detik Kerangupan Anda!', en: 'Share Your Crunch Moments!' },
  'testimonials.socialPrompt': {
    bm: 'Tag kami di TikTok & Instagram dengan hashtag #HemzalCrispyChicken untuk peluang menang baucar RM50 mingguan.',
    en: 'Tag us on TikTok & Instagram with hashtag #HemzalCrispyChicken for a chance to win a weekly RM50 voucher.',
  },
  'testimonials.followInsta': { bm: 'Ikuti Instagram @hemzalcrispychickenhq', en: 'Follow Instagram @hemzalcrispychickenhq' },

  // Contact Section & FAQs
  'contact.badge': { bm: 'Hubungi & Bantuan Pelanggan', en: 'Contact & Customer Help' },
  'contact.title': { bm: 'KAMI SEDIA MEMBANTU ANDA', en: 'WE ARE HERE TO HELP' },
  'contact.desc': {
    bm: 'Sebarang cadangan, maklum balas kualiti, atau soalan berkaitan menu dan francais amat kami alu-alukan.',
    en: 'We warmly welcome any inquiries, feedback, or franchise collaborations.',
  },
  'contact.faqTitle': { bm: 'SOALAN LAZIM (FAQ)', en: 'FREQUENTLY ASKED QUESTIONS' },
  'contact.formName': { bm: 'Nama Anda', en: 'Your Name' },
  'contact.formEmail': { bm: 'Emel Anda', en: 'Your Email' },
  'contact.formPhone': { bm: 'Nombor Telefon', en: 'Phone Number' },
  'contact.formSubject': { bm: 'Tajuk Pertanyaan', en: 'Inquiry Subject' },
  'contact.formMessage': { bm: 'Mesej Anda', en: 'Your Message' },
  'contact.formSend': { bm: 'Hantar Mesej', en: 'Send Message' },
  'contact.formSuccess': {
    bm: 'Terima kasih! Mesej anda telah berjaya dihantar. Pihak kami akan membalas secepat mungkin.',
    en: 'Thank you! Your message has been sent successfully. We will reply as soon as possible.',
  },
  'contact.fastResponse': { bm: 'Respons Pantas (WhatsApp)', en: 'Fast Response (WhatsApp)' },
  'contact.chatWithAdmin': { bm: 'Tekan untuk sembang terus bersama admin', en: 'Tap to chat directly with our team' },
  'contact.operationHoursTitle': { bm: 'Waktu Operasi Dapur', en: 'Kitchen Operating Hours' },
  'contact.centralKitchen': { bm: 'Dapur Pusat & Pejabat Urusan', en: 'Central Kitchen & Headquarters' },

  // Catering & Franchise Modal
  'catering.tabCatering': { bm: 'Tempahan Katering', en: 'Catering Orders' },
  'catering.tabFranchise': { bm: 'Peluang Francais', en: 'Franchise Opportunity' },
  'catering.paxLabel': { bm: 'Kuantiti Pax Tetamu:', en: 'Number of Guests (Pax):' },
  'catering.selectPackage': { bm: 'Pilih Pakej Menu:', en: 'Select Menu Package:' },
  'catering.estimatedTotal': { bm: 'Anggaran Jumlah Katering:', en: 'Estimated Catering Total:' },
  'catering.inquiryWhatsApp': { bm: 'Hantar Pertanyaan Katering ke WhatsApp', en: 'Send Catering Inquiry via WhatsApp' },
  'catering.franchiseTitle': { bm: 'Jadilah Rakan Niaga Cawangan Hemzal', en: 'Become a Hemzal Outlet Business Partner' },
  'catering.franchiseDesc': {
    bm: 'Sertai jenama ayam goreng gourmet tempatan dengan margin keuntungan tinggi, sokongan bekalan ayam segar berpusat, dan modul latihan chef lengkap.',
    en: 'Join the premier local gourmet fried chicken brand with high profit margins, centralized fresh poultry supply, and comprehensive chef training.',
  },
  'catering.applyFranchiseWhatsApp': { bm: 'Mohon Maklumat Francais melalui WhatsApp', en: 'Apply for Franchise Details via WhatsApp' },

  // Footer
  'footer.brandDesc': {
    bm: 'Pengalaman ayam goreng gourmet premium Malaysia. Dihasilkan dengan resepi eksklusif 18 rempah ratus Chef Mohammad Helmi, menjanjikan isi berjus dan kulit keemasan super rangup dalam setiap suapan.',
    en: 'Malaysian premium gourmet fried chicken experience. Crafted with Chef Mohammad Helmi’s exclusive 18-spice recipe, delivering juicy meat and super crispy golden skin in every bite.',
  },
  'footer.halalTitle': { bm: '100% Halal Diiktiraf JAKIM', en: '100% JAKIM Halal Certified' },
  'footer.halalSub': { bm: '100% Milikan Bumiputera & Suci', en: '100% Bumiputera Owned & Pristine' },
  'footer.quickLinks': { bm: 'Pautan Pantas', en: 'Quick Links' },
  'footer.businessLinks': { bm: 'Perniagaan & Acara', en: 'Business & Events' },
  'footer.cateringLink': { bm: 'Katering Kenduri & Jamuan Pejabat', en: 'Feast Catering & Office Parties' },
  'footer.franchiseLink': { bm: 'Peluang Francais & Rakan Niaga', en: 'Franchise Opportunities & Partners' },
  'footer.bulkOrderLink': { bm: 'Pesanan Pukal Korporat', en: 'Corporate Bulk Orders' },
  'footer.voucherTitle': { bm: 'Dapatkan Baucar RM10 Percuma', en: 'Get a Free RM10 Voucher' },
  'footer.voucherDesc': { bm: 'Langgan buletin kami untuk menerima diskaun mingguan dan menu rahsia bermusim.', en: 'Subscribe to our newsletter for weekly discounts and secret seasonal drops.' },
  'footer.emailPlaceholder': { bm: 'Emel anda...', en: 'Your email address...' },
  'footer.subscribedSuccess': { bm: 'Terima kasih! Baucar RM10 telah dihantar ke emel anda.', en: 'Thank you! Your RM10 voucher has been sent to your email.' },
  'footer.copyright': { bm: 'Hak cipta terpelihara.', en: 'All rights reserved.' },
  'footer.privacy': { bm: 'Dasar Privasi', en: 'Privacy Policy' },
  'footer.terms': { bm: 'Terma & Syarat', en: 'Terms & Conditions' },
};

interface LanguageContextType {
  language: Language;
  setLanguage: (lang: Language) => void;
  t: (key: string) => string;
}

const LanguageContext = createContext<LanguageContextType | undefined>(undefined);

export const LanguageProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [language, setLanguageState] = useState<Language>(() => {
    try {
      const saved = localStorage.getItem('hemzal_language');
      return saved === 'en' || saved === 'bm' ? saved : 'bm';
    } catch {
      return 'bm';
    }
  });

  const setLanguage = (lang: Language) => {
    setLanguageState(lang);
    try {
      localStorage.setItem('hemzal_language', lang);
    } catch {
      // LocalStorage access fallback
    }
  };

  const t = (key: string): string => {
    const entry = TRANSLATIONS[key];
    if (!entry) return key;
    return entry[language] || entry.bm || key;
  };

  return (
    <LanguageContext.Provider value={{ language, setLanguage, t }}>
      {children}
    </LanguageContext.Provider>
  );
};

export const useLanguage = (): LanguageContextType => {
  const context = useContext(LanguageContext);
  if (!context) {
    throw new Error('useLanguage must be used within a LanguageProvider');
  }
  return context;
};
