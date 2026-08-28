import React, { useState, useEffect } from 'react';
import { ShoppingBag, MapPin, Phone, Menu, X, Flame, Sparkles, Tag } from 'lucide-react';
import { playPopSound } from '../utils/sound';

interface NavbarProps {
  cartCount: number;
  onOpenCart: () => void;
  onOpenFranchise: () => void;
}

export const Navbar: React.FC<NavbarProps> = ({
  cartCount,
  onOpenCart,
  onOpenFranchise,
}) => {
  const [isScrolled, setIsScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [promoCopied, setPromoCopied] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 20);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const handleCopyPromo = () => {
    navigator.clipboard.writeText('HEMZALFIRST');
    setPromoCopied(true);
    playPopSound();
    setTimeout(() => setPromoCopied(false), 2500);
  };

  return (
    <header className="fixed top-0 left-0 w-full z-40 select-none">
      {/* Top Banner Ribbon */}
      <div className="bg-gradient-to-r from-[#E31E24] via-[#B80F14] to-[#E31E24] text-white py-1.5 px-3 sm:px-4 text-[11px] sm:text-xs font-semibold tracking-wide text-center relative z-50 flex items-center justify-center gap-1.5 sm:gap-2 shadow-md">
        <span className="flex items-center flex-wrap justify-center gap-1 sm:gap-1.5">
          <Flame className="w-3.5 h-3.5 text-[#FDB913] animate-pulse shrink-0" />
          <span className="hidden sm:inline">PROMOSI PEMBUKAAN:</span>
          <span>Gunakan Kod</span>
          <button
            id="copy-promo-btn"
            onClick={handleCopyPromo}
            className="inline-flex items-center gap-1 bg-black/50 hover:bg-black/70 px-2 py-0.5 rounded border border-[#FDB913]/60 text-[#FDB913] font-bold tracking-wider transition-all cursor-pointer text-[10px] sm:text-xs"
            title="Klik untuk salin kod"
          >
            <Tag className="w-3 h-3 shrink-0" />
            <span>HEMZALFIRST</span>
            <span className="text-[9px] sm:text-[10px] text-white/90 font-normal">({promoCopied ? 'Disalin! ✓' : 'Salin'})</span>
          </button>
          <span>untuk 15% OFF!</span>
        </span>
        <span className="hidden md:inline-block text-white/60">|</span>
        <span className="hidden md:inline-flex items-center gap-1 text-[#FDB913]">
          <Sparkles className="w-3 h-3 shrink-0" /> 100% Halal Diiktiraf & Ayam Segar Harian
        </span>
      </div>

      {/* Main Sticky Navbar */}
      <nav
        id="main-navbar"
        className={`w-full transition-all duration-300 ${
          isScrolled
            ? 'bg-[#0c0c0e]/95 backdrop-blur-md py-2.5 sm:py-3 shadow-2xl border-b border-white/10'
            : 'bg-gradient-to-b from-[#0c0c0e]/95 via-[#0c0c0e]/80 to-[#0c0c0e]/40 backdrop-blur-sm py-3 sm:py-4 border-b border-white/5'
        }`}
      >
        <div className="max-w-7xl mx-auto px-3 sm:px-6 lg:px-8 flex items-center justify-between gap-2">
          {/* Brand Logo */}
          <a
            href="#home"
            className="flex items-center gap-2 group cursor-pointer focus:outline-none shrink-0"
          >
            <div className="w-9 h-9 sm:w-10 sm:h-10 rounded-xl bg-gradient-to-br from-[#E31E24] to-[#990D11] flex items-center justify-center shadow-lg shadow-[#E31E24]/30 border border-[#FDB913]/40 group-hover:scale-105 transition-transform shrink-0">
              <Flame className="w-5 h-5 sm:w-6 sm:h-6 text-[#FDB913] fill-[#FDB913]" />
            </div>
            <div className="flex flex-col">
              <span className="font-black text-xl sm:text-2xl tracking-wider text-white flex items-center">
                HEMZAL<span className="text-[#FDB913]">.</span>
              </span>
              <span className="text-[8px] sm:text-[9px] tracking-[0.22em] text-[#FDB913] font-bold uppercase -mt-1">
                CRISPY CHICKEN
              </span>
            </div>
          </a>

          {/* Desktop Nav Links */}
          <div className="hidden lg:flex items-center gap-7 xl:gap-8 text-sm font-bold tracking-wider uppercase text-neutral-200">
            <a
              href="#home"
              className="hover:text-[#FDB913] transition-colors relative py-1 after:absolute after:bottom-0 after:left-0 after:w-0 after:h-0.5 after:bg-[#E31E24] hover:after:w-full after:transition-all"
            >
              Utama
            </a>
            <a
              href="#resepi"
              className="hover:text-[#FDB913] transition-colors relative py-1 after:absolute after:bottom-0 after:left-0 after:w-0 after:h-0.5 after:bg-[#E31E24] hover:after:w-full after:transition-all"
            >
              Rahsia Chef
            </a>
            <a
              href="#menu"
              className="hover:text-[#FDB913] transition-colors relative py-1 after:absolute after:bottom-0 after:left-0 after:w-0 after:h-0.5 after:bg-[#E31E24] hover:after:w-full after:transition-all"
            >
              Menu & Harga
            </a>
            <a
              href="#cawangan"
              className="hover:text-[#FDB913] transition-colors relative py-1 after:absolute after:bottom-0 after:left-0 after:w-0 after:h-0.5 after:bg-[#E31E24] hover:after:w-full after:transition-all flex items-center gap-1"
            >
              <MapPin className="w-3.5 h-3.5 text-[#FDB913]" />
              Cawangan
            </a>
            <a
              href="#testimoni"
              className="hover:text-[#FDB913] transition-colors relative py-1 after:absolute after:bottom-0 after:left-0 after:w-0 after:h-0.5 after:bg-[#E31E24] hover:after:w-full after:transition-all"
            >
              Review
            </a>
            <a
              href="#hubungi"
              className="hover:text-[#FDB913] transition-colors relative py-1 after:absolute after:bottom-0 after:left-0 after:w-0 after:h-0.5 after:bg-[#E31E24] hover:after:w-full after:transition-all"
            >
              Hubungi
            </a>
          </div>

          {/* Action Buttons & Mobile Controls */}
          <div className="flex items-center gap-2 sm:gap-3 shrink-0">
            {/* Catering / Franchise Quick Trigger */}
            <button
              id="catering-btn"
              onClick={onOpenFranchise}
              className="hidden md:inline-flex items-center gap-1.5 text-xs font-bold text-neutral-300 hover:text-white px-3 py-2 rounded-lg border border-white/15 hover:border-[#FDB913]/50 transition-all bg-white/5 cursor-pointer"
            >
              <span>Katering / Francais</span>
            </button>

            {/* Cart Button */}
            <button
              id="cart-trigger-btn"
              onClick={() => {
                playPopSound();
                onOpenCart();
              }}
              className="relative flex items-center justify-center gap-1.5 sm:gap-2 bg-[#1b1b1e] hover:bg-[#25252a] text-white p-2.5 sm:px-3.5 sm:py-2.5 rounded-xl border border-white/15 hover:border-[#FDB913]/50 transition-all shadow-md cursor-pointer group shrink-0"
              aria-label="Buka Troli Pesanan"
            >
              <ShoppingBag className="w-5 h-5 text-[#FDB913] group-hover:scale-110 transition-transform shrink-0" />
              <span className="text-xs font-bold hidden sm:inline">Troli</span>
              {cartCount > 0 && (
                <span className="absolute -top-1.5 -right-1.5 sm:static sm:top-auto sm:right-auto bg-[#E31E24] text-white text-[10px] sm:text-[11px] font-black min-w-[18px] sm:w-5 h-[18px] sm:h-5 px-1 rounded-full flex items-center justify-center shadow-lg shadow-[#E31E24]/60 animate-bounce border sm:border-0 border-black">
                  {cartCount}
                </span>
              )}
            </button>

            {/* Order Now CTA (Desktop & Tablet) */}
            <a
              href="#menu"
              className="hidden sm:inline-flex items-center justify-center bg-gradient-to-r from-[#E31E24] to-[#C1121F] hover:from-[#FDB913] hover:to-[#E39600] text-white hover:text-neutral-950 font-black text-xs tracking-wider uppercase px-4 sm:px-5 py-2.5 rounded-xl shadow-lg shadow-[#E31E24]/30 hover:shadow-[#FDB913]/30 transition-all transform hover:-translate-y-0.5 cursor-pointer shrink-0"
            >
              Pesan
            </a>

            {/* Mobile Hamburger Toggle Button - ALWAYS visible on mobile & tablet */}
            <button
              id="mobile-menu-toggle"
              onClick={() => {
                playPopSound();
                setMobileMenuOpen(!mobileMenuOpen)}
              }
              className="lg:hidden flex items-center justify-center w-10 h-10 rounded-xl bg-[#1b1b1e] hover:bg-[#25252a] active:bg-[#2e2e35] text-white border border-white/15 hover:border-[#FDB913]/50 transition-all shadow-md cursor-pointer shrink-0"
              aria-label={mobileMenuOpen ? 'Tutup menu navigasi' : 'Buka menu navigasi'}
              aria-expanded={mobileMenuOpen}
            >
              {mobileMenuOpen ? (
                <X className="w-5 h-5 text-[#FDB913]" />
              ) : (
                <Menu className="w-5 h-5 text-neutral-200" />
              )}
            </button>
          </div>
        </div>

        {/* Mobile Dropdown Menu Drawer */}
        {mobileMenuOpen && (
          <div className="lg:hidden bg-[#121215]/98 backdrop-blur-xl border-b border-white/10 px-5 py-5 space-y-4 shadow-2xl animate-in slide-in-from-top-3 duration-200 max-h-[calc(100vh-100px)] overflow-y-auto">
            <div className="flex flex-col space-y-1 font-bold text-sm uppercase">
              <a
                href="#home"
                onClick={() => setMobileMenuOpen(false)}
                className="text-neutral-200 hover:text-[#FDB913] py-2.5 px-3 rounded-lg hover:bg-white/5 transition-colors flex items-center justify-between"
              >
                <span>Laman Utama</span>
              </a>
              <a
                href="#resepi"
                onClick={() => setMobileMenuOpen(false)}
                className="text-neutral-200 hover:text-[#FDB913] py-2.5 px-3 rounded-lg hover:bg-white/5 transition-colors flex items-center justify-between"
              >
                <span>Rahsia & Resepi Chef</span>
              </a>
              <a
                href="#menu"
                onClick={() => setMobileMenuOpen(false)}
                className="text-neutral-200 hover:text-[#FDB913] py-2.5 px-3 rounded-lg hover:bg-white/5 transition-colors flex items-center justify-between"
              >
                <span>Menu & Senarai Harga</span>
                <span className="text-[10px] text-white bg-[#E31E24] px-2 py-0.5 rounded-full font-black">Panas!</span>
              </a>
              <a
                href="#cawangan"
                onClick={() => setMobileMenuOpen(false)}
                className="text-neutral-200 hover:text-[#FDB913] py-2.5 px-3 rounded-lg hover:bg-white/5 transition-colors flex items-center justify-between"
              >
                <span className="flex items-center gap-1.5">
                  <MapPin className="w-4 h-4 text-[#FDB913]" /> Cawangan Outlet
                </span>
                <span className="text-[11px] text-[#FDB913] bg-[#FDB913]/10 px-2 py-0.5 rounded-md font-bold">15 Outlet</span>
              </a>
              <a
                href="#testimoni"
                onClick={() => setMobileMenuOpen(false)}
                className="text-neutral-200 hover:text-[#FDB913] py-2.5 px-3 rounded-lg hover:bg-white/5 transition-colors flex items-center justify-between"
              >
                <span>Review & Testimoni</span>
              </a>
              <a
                href="#hubungi"
                onClick={() => setMobileMenuOpen(false)}
                className="text-neutral-200 hover:text-[#FDB913] py-2.5 px-3 rounded-lg hover:bg-white/5 transition-colors flex items-center justify-between"
              >
                <span>Hubungi Kami</span>
              </a>
            </div>

            <div className="pt-3 border-t border-white/10 flex flex-col gap-2.5">
              <a
                href="#menu"
                onClick={() => setMobileMenuOpen(false)}
                className="w-full text-center py-3 rounded-xl bg-gradient-to-r from-[#E31E24] to-[#C1121F] text-white font-black text-xs uppercase tracking-wider shadow-lg shadow-[#E31E24]/30"
              >
                🍗 Pesan Menu Sekarang
              </a>
              <button
                onClick={() => {
                  setMobileMenuOpen(false);
                  onOpenFranchise();
                }}
                className="w-full text-center py-2.5 rounded-xl border border-white/20 hover:border-[#FDB913]/50 text-neutral-200 font-bold text-xs bg-white/5"
              >
                🤝 Katering Kenduri & Francais
              </button>
              <a
                href="tel:+60123456789"
                className="w-full flex items-center justify-center gap-2 py-2.5 rounded-xl bg-emerald-500/15 border border-emerald-500/30 text-emerald-300 font-bold text-xs"
              >
                <Phone className="w-4 h-4 text-emerald-400" /> Hotline Dapur: +60 12-345 6789
              </a>
            </div>
          </div>
        )}
      </nav>
    </header>
  );
};
