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
      setIsScrolled(window.scrollY > 30);
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
    <>
      {/* Top Banner Ribbon */}
      <div className="bg-gradient-to-r from-[#E31E24] via-[#B80F14] to-[#E31E24] text-white py-1.5 px-4 text-xs font-semibold tracking-wide text-center relative z-50 flex items-center justify-center gap-2 shadow-md">
        <span className="flex items-center gap-1">
          <Flame className="w-3.5 h-3.5 text-[#FDB913] animate-pulse" />
          <span className="hidden sm:inline">PROMOSI PEMBUKAAN:</span>
          <span>Gunakan Kod</span>
          <button
            id="copy-promo-btn"
            onClick={handleCopyPromo}
            className="inline-flex items-center gap-1 bg-black/40 hover:bg-black/60 px-2 py-0.5 rounded border border-[#FDB913]/60 text-[#FDB913] font-bold tracking-wider transition-all cursor-pointer"
            title="Klik untuk salin kod"
          >
            <Tag className="w-3 h-3" />
            HEMZALFIRST
            <span className="text-[10px] text-white/90">({promoCopied ? 'Disalin! ✓' : 'Salin'})</span>
          </button>
          <span>untuk 15% OFF!</span>
        </span>
        <span className="hidden md:inline-block text-white/60">|</span>
        <span className="hidden md:inline-flex items-center gap-1 text-[#FDB913]">
          <Sparkles className="w-3 h-3" /> 100% Halal Diiktiraf & Ayam Segar Harian
        </span>
      </div>

      {/* Main Sticky Navbar */}
      <nav
        id="main-navbar"
        className={`fixed top-0 left-0 w-full z-40 transition-all duration-300 ${
          isScrolled
            ? 'bg-[#0c0c0e]/95 backdrop-blur-md py-3 shadow-xl border-b border-white/10'
            : 'bg-gradient-to-b from-[#0c0c0e]/90 via-[#0c0c0e]/60 to-transparent py-5'
        }`}
        style={{ marginTop: isScrolled ? '0' : '28px' }}
      >
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex items-center justify-between">
          {/* Brand Logo */}
          <a
            href="#home"
            className="flex items-center gap-2 group cursor-pointer focus:outline-none"
          >
            <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-[#E31E24] to-[#990D11] flex items-center justify-center shadow-lg shadow-[#E31E24]/30 border border-[#FDB913]/40 group-hover:scale-105 transition-transform">
              <Flame className="w-6 h-6 text-[#FDB913] fill-[#FDB913]" />
            </div>
            <div className="flex flex-col">
              <span className="font-black text-2xl tracking-wider text-white flex items-center gap-1">
                HEMZAL<span className="text-[#FDB913]">.</span>
              </span>
              <span className="text-[9px] tracking-[0.25em] text-[#FDB913] font-bold uppercase -mt-1">
                CRISPY CHICKEN
              </span>
            </div>
          </a>

          {/* Desktop Nav Links */}
          <div className="hidden lg:flex items-center gap-8 text-sm font-bold tracking-wider uppercase text-neutral-200">
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

          {/* Action Buttons */}
          <div className="flex items-center gap-3">
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
              className="relative flex items-center gap-2 bg-[#1b1b1e] hover:bg-[#25252a] text-white px-3.5 py-2.5 rounded-xl border border-white/10 hover:border-[#FDB913]/40 transition-all shadow-md cursor-pointer group"
              aria-label="Buka Troli Pesanan"
            >
              <ShoppingBag className="w-5 h-5 text-[#FDB913] group-hover:scale-110 transition-transform" />
              <span className="text-xs font-bold hidden sm:inline">Troli</span>
              {cartCount > 0 && (
                <span className="bg-[#E31E24] text-white text-[11px] font-black w-5 h-5 rounded-full flex items-center justify-center shadow-lg shadow-[#E31E24]/60 animate-bounce">
                  {cartCount}
                </span>
              )}
            </button>

            {/* Order Now CTA */}
            <a
              href="#menu"
              className="hidden sm:inline-flex items-center justify-center bg-gradient-to-r from-[#E31E24] to-[#C1121F] hover:from-[#FDB913] hover:to-[#E39600] text-white hover:text-neutral-950 font-black text-xs tracking-wider uppercase px-5 py-2.5 rounded-xl shadow-lg shadow-[#E31E24]/30 hover:shadow-[#FDB913]/30 transition-all transform hover:-translate-y-0.5 cursor-pointer"
            >
              Pesan Sekarang
            </a>

            {/* Mobile Hamburger Toggle */}
            <button
              id="mobile-menu-toggle"
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="lg:hidden text-white p-2 rounded-lg bg-white/5 hover:bg-white/10 border border-white/10"
              aria-label="Buka menu"
            >
              {mobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
            </button>
          </div>
        </div>

        {/* Mobile Dropdown Menu */}
        {mobileMenuOpen && (
          <div className="lg:hidden bg-[#121215] border-b border-white/10 px-6 py-5 mt-2 space-y-4 shadow-2xl animate-in slide-in-from-top">
            <div className="flex flex-col space-y-3 font-bold text-sm uppercase">
              <a
                href="#home"
                onClick={() => setMobileMenuOpen(false)}
                className="text-neutral-200 hover:text-[#FDB913] py-1 border-b border-white/5"
              >
                Utama
              </a>
              <a
                href="#resepi"
                onClick={() => setMobileMenuOpen(false)}
                className="text-neutral-200 hover:text-[#FDB913] py-1 border-b border-white/5"
              >
                Rahsia Chef
              </a>
              <a
                href="#menu"
                onClick={() => setMobileMenuOpen(false)}
                className="text-neutral-200 hover:text-[#FDB913] py-1 border-b border-white/5"
              >
                Menu & Harga
              </a>
              <a
                href="#cawangan"
                onClick={() => setMobileMenuOpen(false)}
                className="text-neutral-200 hover:text-[#FDB913] py-1 border-b border-white/5 flex items-center justify-between"
              >
                <span>Cawangan Outlet</span>
                <span className="text-xs text-[#FDB913] bg-[#FDB913]/10 px-2 py-0.5 rounded">15 Outlet</span>
              </a>
              <a
                href="#testimoni"
                onClick={() => setMobileMenuOpen(false)}
                className="text-neutral-200 hover:text-[#FDB913] py-1 border-b border-white/5"
              >
                Review Pelanggan
              </a>
              <a
                href="#hubungi"
                onClick={() => setMobileMenuOpen(false)}
                className="text-neutral-200 hover:text-[#FDB913] py-1 border-b border-white/5"
              >
                Hubungi Kami
              </a>
            </div>

            <div className="pt-2 flex flex-col gap-2">
              <button
                onClick={() => {
                  setMobileMenuOpen(false);
                  onOpenFranchise();
                }}
                className="w-full text-center py-2.5 rounded-xl border border-white/20 text-neutral-300 font-bold text-xs"
              >
                Katering Kenduri & Francais
              </button>
              <a
                href="tel:+60123456789"
                className="w-full flex items-center justify-center gap-2 py-2.5 rounded-xl bg-white/10 text-white font-bold text-xs"
              >
                <Phone className="w-4 h-4 text-[#FDB913]" /> Hotline: +60 12-345 6789
              </a>
            </div>
          </div>
        )}
      </nav>
    </>
  );
};
