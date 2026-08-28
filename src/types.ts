export type Region = 'all' | 'kv' | 'ns' | 'perak' | 'johor' | 'penang';

export type SpiceLevel = 'Biasa (Mild)' | 'Pedas Padu (Spicy)' | 'Extra Berapi 🔥🔥' | 'Tanpa Pedas (Zero Spice)';

export interface CustomizationOption {
  id: string;
  name: string;
  price: number;
}

export interface PortionOption {
  label: string; // e.g. "2 PCS", "6 PCS", "10 PCS", "1 CUP 4 ONZ", "2 CUP 4 ONZ"
  price: number;
  pieces?: number;
  originalPrice?: number;
  isPopular?: boolean;
}

export interface MenuItem {
  id: string;
  name: string;
  tagline: string;
  description: string;
  price: number;
  originalPrice?: number;
  category: 'signature' | 'combos' | 'sides' | 'drinks';
  image: string;
  isBestSeller?: boolean;
  isChefSpecial?: boolean;
  isNew?: boolean;
  spiceLevel: 0 | 1 | 2 | 3;
  calories?: number;
  servings?: string;
  pieces?: number;
  availableDips?: string[];
  sauceInfo?: string;
  includedItems?: string[];
  portions?: PortionOption[];
  options?: {
    addons?: CustomizationOption[];
  };
}

export interface CartItem {
  cartId: string;
  item: MenuItem;
  quantity: number;
  selectedPortion?: PortionOption;
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

