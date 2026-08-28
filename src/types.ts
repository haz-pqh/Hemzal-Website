export type Region = 'all' | 'kv' | 'ns' | 'perak' | 'johor' | 'penang';

export type SpiceLevel = 'Biasa (Mild)' | 'Pedas Padu (Spicy)' | 'Extra Berapi 🔥🔥' | 'Tanpa Pedas (Zero Spice)';

export interface CustomizationOption {
  id: string;
  name: string;
  price: number;
}

export interface MenuItem {
  id: string;
  name: string;
  tagline: string;
  description: string;
  price: number;
  originalPrice?: number;
  category: 'signature' | 'combos' | 'burgers' | 'sides' | 'drinks';
  image: string;
  isBestSeller?: boolean;
  isChefSpecial?: boolean;
  isNew?: boolean;
  spiceLevel: 0 | 1 | 2 | 3;
  calories?: number;
  servings?: string;
  pieces?: number;
  availableDips?: string[];
  options?: {
    sizes?: { name: string; priceMultiplier: number }[];
    addons?: CustomizationOption[];
  };
}

export interface CartItem {
  cartId: string;
  item: MenuItem;
  quantity: number;
  selectedSpice: SpiceLevel;
  selectedDip?: string;
  selectedAddons: CustomizationOption[];
  specialInstructions?: string;
  totalPrice: number;
}

export interface Branch {
  id: string;
  name: string;
  region: 'kv' | 'ns' | 'perak' | 'johor' | 'penang';
  regionLabel: string;
  address: string;
  city: string;
  state: string;
  phone: string;
  whatsapp: string;
  openingHours: string;
  openHour: number; // 24hr format
  closeHour: number;
  features: ('Dine-in' | 'Takeaway' | 'Drive-thru' | 'Delivery' | 'Surau Available' | 'Parking Luas')[];
  wazeUrl: string;
  googleMapsUrl: string;
  isHQ?: boolean;
}

export interface Review {
  id: string;
  name: string;
  handle: string;
  location: string;
  avatar: string;
  rating: number;
  date: string;
  comment: string;
  favoriteItem: string;
  verified: boolean;
}

export interface PromoVoucher {
  code: string;
  discountPercent?: number;
  discountAmount?: number;
  minSpend: number;
  description: string;
}
