import React, { useState, useMemo } from 'react';
import { BRANCHES } from '../data/branchData';
import { Branch, Region } from '../types';
import { 
  MapPin, 
  Phone, 
  Clock, 
  Navigation, 
  Search, 
  LocateFixed, 
  Compass, 
  AlertCircle, 
  RefreshCw, 
  Trophy,
  ExternalLink,
  Store,
  Sparkles
} from 'lucide-react';
import { playPopSound } from '../utils/sound';
import { calculateDistance, formatDistance } from '../utils/distance';

export interface BranchWithDistance extends Branch {
  distanceKm?: number;
}

export const BranchLocator: React.FC = () => {
  const [selectedRegion, setSelectedRegion] = useState<Region>('all');
  const [branchSearch, setBranchSearch] = useState<string>('');
  const [onlyOpen, setOnlyOpen] = useState<boolean>(false);

  // GPS Geolocation States
  const [userLocation, setUserLocation] = useState<{ lat: number; lng: number } | null>(null);
  const [geoStatus, setGeoStatus] = useState<'idle' | 'locating' | 'success' | 'error'>('idle');
  const [geoError, setGeoError] = useState<string | null>(null);

  // Current Malaysia time hour helper
  const now = new Date();
  const currentHour = now.getHours() + now.getMinutes() / 60;

  const isBranchOpen = (branch: Branch) => {
    return currentHour >= branch.openHour && currentHour < branch.closeHour;
  };

  const handleRequestLocation = () => {
    playPopSound();
    setGeoError(null);

    if (!navigator.geolocation) {
      setGeoStatus('error');
      setGeoError('Pelayar anda tidak menyokong fungsi pengesanan lokasi GPS.');
      return;
    }

    setGeoStatus('locating');

    navigator.geolocation.getCurrentPosition(
      (position) => {
        setUserLocation({
          lat: position.coords.latitude,
          lng: position.coords.longitude,
        });
        setGeoStatus('success');
      },
      (error) => {
        setGeoStatus('error');
        if (error.code === error.PERMISSION_DENIED) {
          setGeoError('Akses lokasi ditolak. Sila benarkan kebenaran lokasi pada pelayar/telefon anda.');
        } else if (error.code === error.POSITION_UNAVAILABLE) {
          setGeoError('Lokasi GPS tidak dapat diperoleh buat masa ini.');
        } else if (error.code === error.TIMEOUT) {
          setGeoError('Masa mengesan lokasi telah tamat. Sila cuba lagi.');
        } else {
          setGeoError('Gagal mengesan lokasi GPS.');
        }
      },
      {
        enableHighAccuracy: true,
        timeout: 10000,
        maximumAge: 60000,
      }
    );
  };

  const handleResetLocation = () => {
    playPopSound();
    setUserLocation(null);
    setGeoStatus('idle');
    setGeoError(null);
  };

  const regionTabs: { id: Region; label: string }[] = [
    { id: 'all', label: 'Semua Cawangan' },
    { id: 'sl', label: 'Selangor' },
    { id: 'kl', label: 'WP Kuala Lumpur' },
  ];

  const filteredBranches: BranchWithDistance[] = useMemo(() => {
    // Enrich with distance if user location is available
    let list: BranchWithDistance[] = BRANCHES.map((b) => {
      const distanceKm = userLocation
        ? calculateDistance(userLocation.lat, userLocation.lng, b.lat, b.lng)
        : undefined;
      return {
        ...b,
        distanceKm,
      };
    });

    // If user location is active, sort by distance ascending (closest first)
    if (userLocation) {
      list.sort((a, b) => (a.distanceKm ?? Infinity) - (b.distanceKm ?? Infinity));
    }

    return list.filter((branch) => {
      const matchesRegion = selectedRegion === 'all' || branch.region === selectedRegion;
      const matchesSearch =
        branch.name.toLowerCase().includes(branchSearch.toLowerCase()) ||
        branch.address.toLowerCase().includes(branchSearch.toLowerCase()) ||
        branch.city.toLowerCase().includes(branchSearch.toLowerCase()) ||
        branch.state.toLowerCase().includes(branchSearch.toLowerCase());
      const matchesOpen = !onlyOpen || isBranchOpen(branch);
      return matchesRegion && matchesSearch && matchesOpen;
    });
  }, [selectedRegion, branchSearch, onlyOpen, currentHour, userLocation]);

  return (
    <section id="cawangan" className="py-20 bg-[#0e0e11]/10 backdrop-blur-sm relative overflow-hidden border-t border-b border-white/5">
      {/* Background Glows */}
      <div className="absolute top-1/3 left-10 w-96 h-96 bg-[#FDB913]/10 rounded-full blur-[130px] pointer-events-none" />
      <div className="absolute bottom-10 right-10 w-96 h-96 bg-[#E31E24]/10 rounded-full blur-[130px] pointer-events-none" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto mb-10 space-y-3">
          <div className="inline-flex items-center gap-1.5 bg-[#1b1b20] border border-[#FDB913]/30 px-3.5 py-1 rounded-full text-xs font-black uppercase tracking-widest text-[#FDB913]">
            <MapPin className="w-3.5 h-3.5 text-[#FDB913]" />
            <span>Rangkaian Outlet Hemzal</span>
          </div>

          <h2 className="text-3xl sm:text-5xl font-black text-white uppercase tracking-tight">
            SENARAI <span className="text-[#FDB913]">CAWANGAN KAMI</span>
          </h2>

          <p className="text-neutral-300 text-sm sm:text-base">
            Cari restoran Hemzal Crispy Chicken berdekatan anda untuk pesanan bawa pulang atau pandu arah pantas dengan Google Maps & Waze.
          </p>
        </div>

        {/* GPS Geolocation Smart Finder Banner */}
        <div className="bg-white rounded-3xl p-5 sm:p-6 border border-neutral-200/90 shadow-xl mb-10 flex flex-col md:flex-row items-center justify-between gap-5 transition-all">
          <div className="flex items-center gap-4 text-left w-full md:w-auto">
            <div className={`w-12 h-12 rounded-2xl flex items-center justify-center shrink-0 shadow-sm transition-colors ${
              geoStatus === 'success'
                ? 'bg-emerald-100 text-emerald-700 border border-emerald-300'
                : 'bg-amber-100 text-[#B45309] border border-amber-300'
            }`}>
              <LocateFixed className={`w-6 h-6 ${geoStatus === 'locating' ? 'animate-spin' : ''}`} />
            </div>

            <div>
              <div className="flex flex-wrap items-center gap-2">
                <h3 className="font-black text-base sm:text-lg text-neutral-900 leading-snug">
                  Cari Cawangan Paling Dekat Dengan Anda
                </h3>
                {geoStatus === 'success' && (
                  <span className="bg-emerald-100 text-emerald-800 text-[10px] font-black px-2.5 py-0.5 rounded-full border border-emerald-300 shadow-2xs">
                    GPS Aktif & Disusun
                  </span>
                )}
              </div>
              <p className="text-xs text-neutral-600 mt-0.5">
                {geoStatus === 'success'
                  ? 'Cawangan telah disusun bermula dari yang paling dekat dengan lokasi semasa anda.'
                  : 'Aktifkan GPS peranti anda untuk mengira jarak tepat (km) ke setiap outlet Hemzal.'}
              </p>
              {geoError && (
                <p className="text-xs text-[#E31E24] font-bold mt-1.5 flex items-center gap-1.5 animate-shake">
                  <AlertCircle className="w-3.5 h-3.5 shrink-0" />
                  <span>{geoError}</span>
                </p>
              )}
            </div>
          </div>

          <div className="flex items-center gap-2 w-full md:w-auto shrink-0">
            {geoStatus === 'success' ? (
              <button
                onClick={handleResetLocation}
                className="w-full md:w-auto px-5 py-3 rounded-2xl bg-neutral-100 hover:bg-neutral-200 text-neutral-800 font-extrabold text-xs flex items-center justify-center gap-2 border border-neutral-300 transition-all cursor-pointer shadow-xs active:scale-95"
                title="Padam susunan GPS"
              >
                <RefreshCw className="w-3.5 h-3.5" />
                <span>Nyahaktif GPS</span>
              </button>
            ) : (
              <button
                id="gps-find-closest-btn"
                onClick={handleRequestLocation}
                disabled={geoStatus === 'locating'}
                className="w-full md:w-auto px-6 py-3.5 rounded-2xl bg-[#E31E24] hover:bg-[#c1121f] active:scale-95 text-white font-black text-xs uppercase tracking-wider flex items-center justify-center gap-2 shadow-lg shadow-[#E31E24]/25 transition-all cursor-pointer disabled:opacity-70 disabled:cursor-not-allowed"
              >
                <LocateFixed className={`w-4 h-4 text-[#FDB913] ${geoStatus === 'locating' ? 'animate-spin' : ''}`} />
                <span>{geoStatus === 'locating' ? 'Mengesan Lokasi GPS...' : 'Kesan Cawangan Paling Dekat'}</span>
              </button>
            )}
          </div>
        </div>

        {/* Toolbar & Filter Tabs */}
        <div className="space-y-4 mb-8">
          
          {/* Search bar & Open Now toggle */}
          <div className="flex flex-col sm:flex-row items-center justify-between gap-3">
            <div className="relative w-full sm:w-80">
              <Search className="w-4 h-4 text-neutral-400 absolute left-3.5 top-1/2 -translate-y-1/2" />
              <input
                id="branch-search-input"
                type="text"
                value={branchSearch}
                onChange={(e) => setBranchSearch(e.target.value)}
                placeholder="Cari bandar, kawasan atau negeri..."
                className="w-full pl-10 pr-4 py-2.5 bg-[#17171c] border border-white/10 rounded-xl text-sm text-white placeholder:text-neutral-500 focus:outline-none focus:border-[#FDB913] transition-colors"
              />
              {branchSearch && (
                <button
                  onClick={() => setBranchSearch('')}
                  className="absolute right-3 top-1/2 -translate-y-1/2 text-xs text-neutral-400 hover:text-white"
                >
                  Padam
                </button>
              )}
            </div>

            {/* Toggle Open Now */}
            <button
              onClick={() => setOnlyOpen(!onlyOpen)}
              className={`px-4 py-2 rounded-xl text-xs font-bold transition-all flex items-center gap-2 border cursor-pointer ${
                onlyOpen
                  ? 'bg-emerald-500/20 border-emerald-500 text-emerald-300'
                  : 'bg-[#17171c] border-white/10 text-neutral-300 hover:border-white/20'
              }`}
            >
              <span className={`w-2 h-2 rounded-full ${onlyOpen ? 'bg-emerald-400 animate-ping' : 'bg-neutral-500'}`} />
              <span>Tapis: Buka Sekarang Sahaja</span>
            </button>
          </div>

          {/* Region Tabs */}
          <div className="flex items-center gap-2 overflow-x-auto pb-2 scrollbar-thin">
            {regionTabs.map((tab) => {
              const isActive = selectedRegion === tab.id;
              const count = tab.id === 'all' ? BRANCHES.length : BRANCHES.filter(b => b.region === tab.id).length;
              return (
                <button
                  key={tab.id}
                  onClick={() => {
                    playPopSound();
                    setSelectedRegion(tab.id);
                  }}
                  className={`px-5 py-3 rounded-full font-bold text-xs sm:text-sm uppercase tracking-wider whitespace-nowrap transition-all cursor-pointer flex items-center gap-2 ${
                    isActive
                      ? 'bg-[#E31E24] text-white shadow-lg shadow-[#E31E24]/30 border border-[#FDB913]/40'
                      : 'bg-[#18181d] text-neutral-300 hover:text-white hover:bg-[#202026] border border-white/5'
                  }`}
                >
                  <span>{tab.label}</span>
                  <span className={`text-[10px] px-2 py-0.5 rounded-full ${isActive ? 'bg-black/40 text-[#FDB913]' : 'bg-white/10 text-neutral-400'}`}>
                    {count}
                  </span>
                </button>
              );
            })}
          </div>

        </div>

        {/* Branch Cards Grid */}
        {filteredBranches.length === 0 ? (
          <div className="text-center py-16 bg-[#141418] rounded-3xl border border-white/10">
            <MapPin className="w-12 h-12 text-[#FDB913] mx-auto mb-3 opacity-50" />
            <h3 className="text-lg font-bold text-white">Tiada cawangan dijumpai</h3>
            <p className="text-xs text-neutral-400 mt-1">Sila pilih kawasan lain atau semak ejaan carian anda.</p>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-2 gap-6">
            {filteredBranches.map((branch, idx) => {
              const open = isBranchOpen(branch);
              const isClosest = userLocation && idx === 0 && branch.distanceKm !== undefined;

              return (
                <div
                  key={branch.id}
                  className={`bg-white rounded-3xl border transition-all duration-300 p-6 sm:p-7 flex flex-col justify-between shadow-xl space-y-6 relative overflow-hidden group ${
                    isClosest
                      ? 'border-2 border-[#FDB913] shadow-2xl shadow-amber-500/15 ring-2 ring-amber-400/20'
                      : 'border-neutral-200/90 hover:border-neutral-300'
                  }`}
                >
                  {/* Decorative Closest Tag */}
                  {isClosest && (
                    <div className="absolute top-0 right-0 bg-gradient-to-l from-[#FDB913] to-[#e0a410] text-neutral-950 font-black text-[10px] uppercase tracking-wider px-3.5 py-1 rounded-bl-xl shadow-xs flex items-center gap-1.5">
                      <Trophy className="w-3.5 h-3.5 text-neutral-950 fill-neutral-950" />
                      <span>Cawangan Paling Dekat</span>
                    </div>
                  )}

                  {/* Top Bar: Name & Badges */}
                  <div className="space-y-4">
                    <div className="flex items-start justify-between gap-3 pt-1">
                      <div className="flex items-start gap-3">
                        <div className="w-10 h-10 rounded-2xl bg-amber-500/10 border border-amber-500/20 flex items-center justify-center text-[#B45309] shrink-0 group-hover:bg-[#E31E24] group-hover:text-white transition-colors shadow-2xs">
                          <Store className="w-5 h-5" />
                        </div>
                        <div>
                          <div className="flex items-center gap-2">
                            <span className="text-[11px] uppercase font-black text-[#B45309] tracking-wider">
                              {branch.regionLabel}
                            </span>
                            {branch.isHQ && (
                              <span className="bg-[#E31E24] text-white text-[9px] font-black uppercase px-2 py-0.5 rounded-md shadow-xs">
                                HQ Flagship
                              </span>
                            )}
                          </div>
                          <h3 className="font-black text-xl text-neutral-900 leading-snug mt-0.5">
                            {branch.name}
                          </h3>
                        </div>
                      </div>
                    </div>

                    {/* Distance Pill if available */}
                    {branch.distanceKm !== undefined && (
                      <div className="flex items-center gap-2">
                        <div className={`inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-black shadow-xs ${
                          isClosest
                            ? 'bg-amber-100 text-[#B45309] border border-amber-300'
                            : 'bg-neutral-100 text-neutral-800 border border-neutral-300/80'
                        }`}>
                          <Compass className="w-3.5 h-3.5 text-[#D97706]" />
                          <span>{formatDistance(branch.distanceKm)} dari anda</span>
                        </div>
                      </div>
                    )}

                    {/* Status badge & Hours */}
                    <div className="flex flex-wrap items-center gap-2 text-xs">
                      <span
                        className={`inline-flex items-center gap-1.5 px-3 py-1 rounded-full font-black text-[11px] shadow-2xs ${
                          open
                            ? 'bg-emerald-100 text-emerald-800 border border-emerald-300'
                            : 'bg-rose-100 text-rose-800 border border-rose-300'
                        }`}
                      >
                        <span className={`w-1.5 h-1.5 rounded-full ${open ? 'bg-emerald-600 animate-pulse' : 'bg-rose-600'}`} />
                        {open ? 'Dapur Dibuka' : 'Tutup Sementara'}
                      </span>
                      <span className="text-neutral-600 flex items-center gap-1.5 text-xs font-medium bg-neutral-100 px-3 py-1 rounded-full border border-neutral-200">
                        <Clock className="w-3.5 h-3.5 text-neutral-500" /> {branch.openingHours}
                      </span>
                    </div>

                    {/* Full Address */}
                    <div className="bg-neutral-50 p-3.5 rounded-2xl border border-neutral-200/80 text-xs text-neutral-700 leading-relaxed space-y-1">
                      <span className="text-[10px] font-black uppercase text-neutral-500 block">Alamat Outlet:</span>
                      <p className="font-medium text-neutral-900">{branch.address}</p>
                    </div>

                    {/* Features Tags */}
                    <div className="flex flex-wrap gap-1.5">
                      {branch.features.map((feat) => (
                        <span
                          key={feat}
                          className="text-[11px] font-semibold bg-white text-neutral-700 px-2.5 py-1 rounded-lg border border-neutral-200 shadow-2xs"
                        >
                          {feat}
                        </span>
                      ))}
                    </div>
                  </div>

                  {/* Action Buttons: 1-Tap Waze & Google Maps Navigation */}
                  <div className="space-y-2.5 pt-4 border-t border-neutral-200">
                    <span className="text-[10px] font-black uppercase tracking-wider text-neutral-500 block">
                      Aplikasi Panduan Arah (1-Tap Navigasi):
                    </span>
                    
                    <div className="grid grid-cols-2 gap-2.5">
                      {/* 1-Tap Google Maps */}
                      <a
                        href={branch.googleMapsUrl || `https://www.google.com/maps/dir/?api=1&destination=${branch.lat},${branch.lng}`}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="flex items-center justify-center gap-2 bg-[#4285F4]/10 hover:bg-[#4285F4] text-[#1a73e8] hover:text-white border border-[#4285F4]/30 font-black text-xs py-3 rounded-2xl transition-all shadow-xs group/gmaps active:scale-95"
                        title="Buka panduan arah laluan di Google Maps"
                      >
                        <Navigation className="w-4 h-4 text-[#1a73e8] group-hover/gmaps:text-white group-hover/gmaps:rotate-45 transition-transform" />
                        <span>Google Maps</span>
                      </a>

                      {/* 1-Tap Waze */}
                      <a
                        href={branch.wazeUrl || `https://ul.waze.com/ul?ll=${branch.lat}%2C${branch.lng}&navigate=yes`}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="flex items-center justify-center gap-2 bg-[#33ccff]/15 hover:bg-[#33ccff] text-[#0088cc] hover:text-neutral-950 border border-[#33ccff]/40 font-black text-xs py-3 rounded-2xl transition-all shadow-xs group/waze active:scale-95"
                        title="Pandu arah terus dengan Waze"
                      >
                        <Navigation className="w-4 h-4 text-[#0088cc] group-hover/waze:text-neutral-950 group-hover/waze:rotate-45 transition-transform" />
                        <span>Pandu di Waze</span>
                      </a>
                    </div>

                    {/* Direct WhatsApp to Branch */}
                    <a
                      href={`https://wa.me/${branch.whatsapp}?text=Hai%20Hemzal%20${encodeURIComponent(branch.name)},%20saya%20ingin%20membuat%20pesanan%20ayam%20goreng.`}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="w-full flex items-center justify-center gap-2 bg-emerald-50 hover:bg-[#25D366] text-emerald-800 hover:text-neutral-950 font-black text-xs uppercase tracking-wider py-3 rounded-2xl border border-emerald-300 hover:border-[#25D366] transition-all cursor-pointer shadow-xs active:scale-95 group/wa"
                    >
                      <Phone className="w-3.5 h-3.5 text-emerald-600 group-hover/wa:text-neutral-950" />
                      <span>WhatsApp Outlet ({branch.phone})</span>
                    </a>
                  </div>

                </div>
              );
            })}
          </div>
        )}

      </div>
    </section>
  );
};
