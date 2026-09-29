import React from 'react';
import { useLanguage, Language } from '../context/LanguageContext';
import { Languages } from 'lucide-react';
import { playPopSound } from '../utils/sound';

interface LanguageSwitcherProps {
  className?: string;
  variant?: 'navbar' | 'mobile';
}

export const LanguageSwitcher: React.FC<LanguageSwitcherProps> = ({
  className = '',
  variant = 'navbar',
}) => {
  const { language, setLanguage } = useLanguage();

  const handleSelectLanguage = (newLang: Language) => {
    if (newLang === language) return;
    playPopSound();
    setLanguage(newLang);
  };

  if (variant === 'mobile') {
    return (
      <div className={`flex items-center justify-between p-3 bg-black/10 rounded-2xl border border-amber-600/30 ${className}`}>
        <div className="flex items-center gap-2">
          <Languages className="w-4 h-4 text-neutral-900" />
          <span className="text-xs font-black uppercase text-neutral-900">
            {language === 'bm' ? 'Pilihan Bahasa' : 'Language'}
          </span>
        </div>
        
        <div className="flex items-center bg-black/10 p-1 rounded-xl gap-1">
          <button
            type="button"
            onClick={() => handleSelectLanguage('bm')}
            className={`px-3 py-1.5 rounded-lg text-xs font-black transition-all cursor-pointer ${
              language === 'bm'
                ? 'bg-neutral-900 text-[#FDB913] shadow-xs'
                : 'text-neutral-800 hover:text-black'
            }`}
          >
            🇲🇾 BM
          </button>
          <button
            type="button"
            onClick={() => handleSelectLanguage('en')}
            className={`px-3 py-1.5 rounded-lg text-xs font-black transition-all cursor-pointer ${
              language === 'en'
                ? 'bg-neutral-900 text-[#FDB913] shadow-xs'
                : 'text-neutral-800 hover:text-black'
            }`}
          >
            🇬🇧 EN
          </button>
        </div>
      </div>
    );
  }

  return (
    <div
      className={`relative inline-flex items-center bg-black/10 hover:bg-black/15 p-1 rounded-2xl border border-neutral-900/15 transition-all shadow-2xs ${className}`}
      title={language === 'bm' ? 'Tukar Bahasa / Switch Language' : 'Switch Language / Tukar Bahasa'}
    >
      <div className="flex items-center px-1.5 text-neutral-800 shrink-0">
        <Languages className="w-3.5 h-3.5" />
      </div>

      <div className="flex items-center gap-0.5">
        <button
          type="button"
          onClick={() => handleSelectLanguage('bm')}
          className={`px-2.5 py-1 rounded-xl text-xs font-black tracking-wider transition-all duration-200 cursor-pointer ${
            language === 'bm'
              ? 'bg-neutral-900 text-[#FDB913] shadow-sm'
              : 'text-neutral-800 hover:text-black'
          }`}
          aria-pressed={language === 'bm'}
          aria-label="Bahasa Melayu"
        >
          BM
        </button>
        <button
          type="button"
          onClick={() => handleSelectLanguage('en')}
          className={`px-2.5 py-1 rounded-xl text-xs font-black tracking-wider transition-all duration-200 cursor-pointer ${
            language === 'en'
              ? 'bg-neutral-900 text-[#FDB913] shadow-sm'
              : 'text-neutral-800 hover:text-black'
          }`}
          aria-pressed={language === 'en'}
          aria-label="English"
        >
          EN
        </button>
      </div>
    </div>
  );
};
