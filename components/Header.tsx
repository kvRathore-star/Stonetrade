'use client';

import React, { useState, useContext } from 'react';
import { SearchIcon, TruckIcon } from '@/components/IconComponents';
import type { Page } from '@/lib/navigation';
import { LanguageContext } from '@/lib/language';
import { translations, Language, LANGUAGE_NAMES } from '@/translations';
import { useSampleOrder } from '@/contexts/SampleOrderContext';

import RFQModal from '@/components/RFQModal';

interface HeaderProps {
  navigateTo: (page: Page) => void;
}

const Header: React.FC<HeaderProps> = ({ navigateTo }) => {
  const [menuOpen, setMenuOpen] = useState(false);
  const [showRFQ, setShowRFQ] = useState(false);
  const [langMenuOpen, setLangMenuOpen] = useState(false);
  const { language, setLanguage } = useContext(LanguageContext);
  const t = translations[language];
  const { cart } = useSampleOrder();
  const cartCount = cart.length;

  return (
    <>
      <header className="sticky top-0 z-50 bg-white/80 backdrop-blur-md border-b border-stone-accent/10 transition-all duration-300">
        <div className="container mx-auto px-4">
          <div className="flex items-center justify-between h-20">
            {/* Logo */}
            <div className="flex items-center gap-2">
              <h1
                onClick={() => navigateTo('home')}
                className="text-2xl lg:text-3xl font-black text-stone-primary cursor-pointer tracking-tight flex items-center gap-1"
              >
                Stone<span className="text-stone-accent">Trade</span>
                <span className="w-1.5 h-1.5 rounded-full bg-stone-accent mt-3 animate-pulse-soft"></span>
              </h1>
            </div>

            {/* Desktop Nav */}
            <div className="hidden lg:flex items-center gap-8">
              {/* Search - Refined */}
              <div className="relative w-72 group">
                <input
                  type="text"
                  placeholder={t.searchPlaceholder}
                  className="w-full pl-10 pr-4 py-2.5 bg-stone-light/50 border border-stone-accent/10 rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-stone-accent/30 transition-all group-hover:bg-white"
                />
                <SearchIcon className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-stone-secondary group-hover:text-stone-primary transition-colors" />
              </div>

              <nav className="flex items-center gap-4">
                <button
                  onClick={() => setShowRFQ(true)}
                  className="px-5 py-2.5 text-xs font-black uppercase tracking-wider text-stone-primary bg-stone-accent/10 hover:bg-stone-accent/20 rounded-xl transition-all border border-stone-accent/30 flex items-center gap-2"
                >
                  + Post Request
                </button>
                <button onClick={() => navigateTo('products')} className="text-sm font-bold text-stone-secondary hover:text-stone-primary transition-colors">Marketplace</button>
                <button onClick={() => navigateTo('pricing')} className="text-sm font-bold text-stone-secondary hover:text-stone-primary transition-colors">Pricing</button>

                {/* Cart */}
                <button
                  onClick={() => navigateTo('sampleCheckout')}
                  className="relative p-2 text-stone-secondary hover:text-stone-primary transition-colors"
                >
                  <TruckIcon className="h-5 w-5" />
                  {cartCount > 0 && (
                    <span className="absolute -top-1 -right-1 bg-stone-accent text-stone-primary text-[9px] font-black w-4 h-4 rounded-full flex items-center justify-center shadow-sm">
                      {cartCount}
                    </span>
                  )}
                </button>

                {/* Language Dropdown - Replacing Layout */}
                <div className="relative">
                  <button
                    onClick={() => setLangMenuOpen(!langMenuOpen)}
                    className="flex items-center gap-2 px-3 py-1.5 rounded-lg hover:bg-stone-light transition-colors"
                  >
                    <span className="text-lg">🌐</span>
                    <span className="text-xs font-bold uppercase">{language}</span>
                  </button>

                  {langMenuOpen && (
                    <div className="absolute top-full right-0 mt-2 w-48 bg-white rounded-xl shadow-xl border border-stone-accent/10 p-2 max-h-64 overflow-y-auto z-50 animate-fade-in-up">
                      {(Object.keys(translations) as Language[]).map((lang) => (
                        <button
                          key={lang}
                          onClick={() => { setLanguage(lang); setLangMenuOpen(false); }}
                          className={`w-full text-left px-3 py-2 rounded-lg text-sm font-medium transition-colors ${language === lang ? 'bg-stone-light text-stone-primary font-bold' : 'text-stone-secondary hover:bg-stone-light/50'
                            }`}
                        >
                          {LANGUAGE_NAMES[lang]}
                        </button>
                      ))}
                    </div>
                  )}
                </div>

                <button
                  onClick={() => navigateTo('register')}
                  className="bg-stone-primary text-white p-2.5 rounded-xl hover:bg-stone-secondary transition-colors shadow-lg"
                  title={t.loginRegister}
                >
                  <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={2} stroke="currentColor" className="w-5 h-5">
                    <path strokeLinecap="round" strokeLinejoin="round" d="M15.75 6a3.75 3.75 0 11-7.5 0 3.75 3.75 0 017.5 0zM4.501 20.118a7.5 7.5 0 0114.998 0A17.933 17.933 0 0112 21.75c-2.676 0-5.216-.584-7.499-1.632z" />
                  </svg>
                </button>
              </nav>
            </div>

            {/* Mobile Menu Toggle */}
            <button
              onClick={() => setMenuOpen(!menuOpen)}
              className="lg:hidden p-2 text-stone-primary"
            >
              <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d={menuOpen ? "M6 18L18 6M6 6l12 12" : "M4 6h16M4 12h16m-7 6h7"} />
              </svg>
            </button>
          </div>

          {/* Mobile Menu */}
          {menuOpen && (
            <div className="lg:hidden py-4 border-t border-stone-accent/10 animate-slide-up">
              <div className="grid grid-cols-2 gap-2 mb-4">
                <button onClick={() => { setShowRFQ(true); setMenuOpen(false); }} className="col-span-2 text-center py-3 bg-stone-accent/10 border border-stone-accent/30 text-stone-primary font-black uppercase text-xs rounded-xl tracking-wider">
                  + Post Requirement
                </button>
                {(Object.keys(translations) as Language[]).slice(0, 4).map((lang) => (
                  <button
                    key={lang}
                    onClick={() => { setLanguage(lang); setMenuOpen(false); }}
                    className={`py-2 rounded-lg text-xs font-bold border border-stone-accent/10 ${language === lang ? 'bg-stone-primary text-white' : 'bg-white text-stone-secondary'
                      }`}
                  >
                    {LANGUAGE_NAMES[lang]}
                  </button>
                ))}
              </div>
              <nav className="flex flex-col gap-1">
                <button onClick={() => { navigateTo('products'); setMenuOpen(false); }} className="text-left px-4 py-3 text-stone-primary font-medium hover:bg-stone-light rounded-xl">Marketplace</button>
                <button onClick={() => { navigateTo('pricing'); setMenuOpen(false); }} className="text-left px-4 py-3 text-stone-primary font-medium hover:bg-stone-light rounded-xl">Pricing</button>
                <button onClick={() => { navigateTo('sellerDashboard'); setMenuOpen(false); }} className="text-left px-4 py-3 text-stone-primary font-medium hover:bg-stone-light rounded-xl">Dashboard</button>
                <button onClick={() => { navigateTo('register'); setMenuOpen(false); }} className="mt-2 bg-stone-primary text-white py-3 rounded-xl font-bold flex items-center justify-center gap-2">
                  {t.loginRegister}
                </button>
              </nav>
            </div>
          )}
        </div>
      </header>
      <RFQModal isOpen={showRFQ} onClose={() => setShowRFQ(false)} />
    </>
  );
};

export default Header;
