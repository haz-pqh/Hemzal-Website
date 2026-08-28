import React, { useState, useEffect } from 'react';
import { MenuItem, CartItem, PortionOption } from './types';
import { MENU_ITEMS } from './data/menuData';
import { Navbar } from './components/Navbar';
import { Hero } from './components/Hero';
import { ChefStory } from './components/ChefStory';
import { MenuSection } from './components/MenuSection';
import { BranchLocator } from './components/BranchLocator';
import { Testimonials } from './components/Testimonials';
import { ContactSection } from './components/ContactSection';
import { Footer } from './components/Footer';
import { CartDrawer } from './components/CartDrawer';
import { ItemCustomizerModal } from './components/ItemCustomizerModal';
import { CateringFranchiseModal } from './components/CateringFranchiseModal';
import { ShoppingBag, CheckCircle2, Flame, ArrowUp } from 'lucide-react';
import confetti from 'canvas-confetti';
import { playCrunchSound } from './utils/sound';

export default function App() {
  // Cart state persisted to localStorage
  const [cart, setCart] = useState<CartItem[]>(() => {
    try {
      const saved = localStorage.getItem('hemzal_cart');
      return saved ? JSON.parse(saved) : [];
    } catch {
      return [];
    }
  });

  useEffect(() => {
    try {
      localStorage.setItem('hemzal_cart', JSON.stringify(cart));
    } catch {
      // LocalStorage error fallback
    }
  }, [cart]);

  // Modal states
  const [customizingState, setCustomizingState] = useState<{ item: MenuItem; portion?: PortionOption } | null>(null);
  const [isCartOpen, setIsCartOpen] = useState(false);
  const [isFranchiseModalOpen, setIsFranchiseModalOpen] = useState(false);

  // Toast notification
  const [toastMessage, setToastMessage] = useState<string | null>(null);
  const [showScrollTop, setShowScrollTop] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setShowScrollTop(window.scrollY > 400);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const showToast = (msg: string) => {
    setToastMessage(msg);
    setTimeout(() => {
      setToastMessage((curr) => (curr === msg ? null : curr));
    }, 2800);
  };

  // Add customized item to cart
  const handleAddToCart = (newCartItem: CartItem) => {
    setCart((prev) => {
      const existingIndex = prev.findIndex(
        (ci) =>
          ci.item.id === newCartItem.item.id &&
          ci.selectedPortion?.label === newCartItem.selectedPortion?.label &&
          ci.selectedSpice === newCartItem.selectedSpice &&
          ci.selectedDip === newCartItem.selectedDip &&
          JSON.stringify(ci.selectedAddons) === JSON.stringify(newCartItem.selectedAddons) &&
          ci.specialInstructions === newCartItem.specialInstructions
      );

      if (existingIndex > -1) {
        const updated = [...prev];
        const existing = updated[existingIndex];
        const newQty = existing.quantity + newCartItem.quantity;
        const unitP = existing.totalPrice / existing.quantity;
        updated[existingIndex] = {
          ...existing,
          quantity: newQty,
          totalPrice: unitP * newQty,
        };
        return updated;
      }
      return [...prev, newCartItem];
    });

    const portionLabel = newCartItem.selectedPortion ? ` (${newCartItem.selectedPortion.label})` : '';
    showToast(`✓ "${newCartItem.item.name}${portionLabel}" ditambah ke troli!`);
  };

  // Quick add with defaults
  const handleQuickAdd = (item: MenuItem, initialPortion?: PortionOption) => {
    const selectedPortion = initialPortion || (item.portions && item.portions.length > 0 ? item.portions[0] : undefined);
    const basePrice = selectedPortion ? selectedPortion.price : item.price;

    const newCartItem: CartItem = {
      cartId: `${item.id}-${selectedPortion?.label || 'default'}-${Date.now()}`,
      item,
      quantity: 1,
      selectedPortion,
      selectedSpice: item.spiceLevel === 3 ? 'Extra Berapi 🔥🔥' : 'Pedas Padu (Spicy)',
      selectedDip: item.availableDips?.[0],
      selectedAddons: [],
      totalPrice: basePrice,
    };
    handleAddToCart(newCartItem);
    confetti({ particleCount: 30, spread: 40 });
  };

  // Cart quantity update
  const handleUpdateQuantity = (cartId: string, delta: number) => {
    setCart((prev) =>
      prev
        .map((item) => {
          if (item.cartId === cartId) {
            const newQty = item.quantity + delta;
            if (newQty <= 0) return null;
            const unitP = item.totalPrice / item.quantity;
            return {
              ...item,
              quantity: newQty,
              totalPrice: unitP * newQty,
            };
          }
          return item;
        })
        .filter((item): item is CartItem => item !== null)
    );
  };

  // Cart remove
  const handleRemoveItem = (cartId: string) => {
    setCart((prev) => prev.filter((item) => item.cartId !== cartId));
  };

  const handleClearCart = () => {
    setCart([]);
  };

  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const totalCartCount = cart.reduce((sum, item) => sum + item.quantity, 0);

  return (
    <div className="min-h-screen bg-[#0c0c0e] text-neutral-100 selection:bg-[#E31E24] selection:text-white relative w-full max-w-full overflow-x-hidden">
      
      {/* Navbar */}
      <Navbar
        cartCount={totalCartCount}
        onOpenCart={() => setIsCartOpen(true)}
        onOpenFranchise={() => setIsFranchiseModalOpen(true)}
      />

      {/* Main Sections */}
      <main className="w-full max-w-full overflow-x-hidden">
        {/* 1. Hero Section */}
        <Hero
          onExploreMenu={() => {
            const el = document.getElementById('menu');
            el?.scrollIntoView({ behavior: 'smooth' });
          }}
          onFindBranch={() => {
            const el = document.getElementById('cawangan');
            el?.scrollIntoView({ behavior: 'smooth' });
          }}
        />

        {/* 2. Chef Story & 4 Pillars of Taste */}
        <ChefStory />

        {/* 3. Full Menu & Price List */}
        <MenuSection
          items={MENU_ITEMS}
          onSelectItem={(item, portion) => setCustomizingState({ item, portion })}
          onQuickAdd={handleQuickAdd}
        />

        {/* 5. Branch Locator & Real-Time Open Check */}
        <BranchLocator />

        {/* 6. Testimonials & Social Proof */}
        <Testimonials />

        {/* 7. Contact & Feedback */}
        <ContactSection />
      </main>

      {/* Footer */}
      <Footer onOpenFranchise={() => setIsFranchiseModalOpen(true)} />

      {/* Slide-out Cart Drawer */}
      <CartDrawer
        isOpen={isCartOpen}
        onClose={() => setIsCartOpen(false)}
        cart={cart}
        onUpdateQuantity={handleUpdateQuantity}
        onRemoveItem={handleRemoveItem}
        onClearCart={handleClearCart}
      />

      {/* Item Customizer Modal */}
      <ItemCustomizerModal
        item={customizingState?.item || null}
        initialPortion={customizingState?.portion}
        onClose={() => setCustomizingState(null)}
        onAddToCart={handleAddToCart}
      />

      {/* Catering & Franchise Modal */}
      <CateringFranchiseModal
        isOpen={isFranchiseModalOpen}
        onClose={() => setIsFranchiseModalOpen(false)}
      />

      {/* Floating Bottom Cart Bubble (Mobile & Quick Access) */}
      {totalCartCount > 0 && !isCartOpen && (
        <button
          onClick={() => {
            playCrunchSound();
            setIsCartOpen(true);
          }}
          className="fixed bottom-6 right-6 z-40 bg-gradient-to-r from-[#E31E24] via-[#cc141a] to-[#FDB913] text-white p-4 rounded-full shadow-2xl shadow-[#E31E24]/50 flex items-center gap-3 border-2 border-white/20 hover:scale-105 transition-transform cursor-pointer"
          aria-label="Lihat Troli"
        >
          <div className="relative">
            <ShoppingBag className="w-6 h-6 text-white" />
            <span className="absolute -top-2 -right-2 bg-black text-[#FDB913] text-xs font-black w-5 h-5 rounded-full flex items-center justify-center border border-[#FDB913]">
              {totalCartCount}
            </span>
          </div>
          <span className="font-black text-xs uppercase tracking-wider hidden sm:inline pr-1">
            Lihat Troli
          </span>
        </button>
      )}

      {/* Floating Scroll To Top Button */}
      {showScrollTop && (
        <button
          onClick={scrollToTop}
          className={`fixed bottom-6 ${totalCartCount > 0 ? 'left-6' : 'right-6'} z-30 w-11 h-11 rounded-full bg-[#18181f]/90 hover:bg-[#22222a] border border-white/15 text-white flex items-center justify-center shadow-xl transition-all cursor-pointer hover:border-[#FDB913]`}
          aria-label="Kembali ke atas"
        >
          <ArrowUp className="w-5 h-5 text-[#FDB913]" />
        </button>
      )}

      {/* Toast Notification Alert */}
      {toastMessage && (
        <div className="fixed top-20 right-4 z-50 bg-[#16161c] text-white px-5 py-3 rounded-2xl border border-[#FDB913]/60 shadow-2xl flex items-center gap-3 animate-in slide-in-from-top duration-300">
          <CheckCircle2 className="w-5 h-5 text-emerald-400 shrink-0" />
          <span className="text-xs font-bold">{toastMessage}</span>
        </div>
      )}

    </div>
  );
}

