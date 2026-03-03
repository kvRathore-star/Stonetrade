'use client';

import React, { useContext } from 'react';
import type { Page } from '@/lib/navigation';
import { LanguageContext } from '@/lib/language';
import { translations } from '@/translations';

interface FooterProps {
  navigateTo: (page: Page) => void;
}

const Footer: React.FC<FooterProps> = ({ navigateTo }) => {
  const { language } = useContext(LanguageContext);
  const t = translations[language];

  const handleNavClick = (e: React.MouseEvent<HTMLAnchorElement>, page: Page) => {
    e.preventDefault();
    navigateTo(page);
  };

  return (
    <footer className="bg-stone-primary text-stone-light mt-20">
      <div className="container mx-auto px-4 py-16">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-12">
          <div className="col-span-1 md:col-span-1">
            <h2 className="text-3xl font-black text-stone-white mb-4">
              Stone<span className="text-stone-accent">Trade</span>
            </h2>
            <p className="text-stone-secondary text-sm leading-relaxed max-w-xs">
              India's premier digital infrastructure for natural stone. Connecting manufacturers, traders, and specifiers through trust and technology.
            </p>
          </div>
          <div>
            <h3 className="font-bold text-stone-white mb-6 uppercase tracking-widest text-xs">Marketplace</h3>
            <ul className="space-y-3">
              <li><a href="#" onClick={(e) => handleNavClick(e, 'home')} className="hover:text-stone-accent transition-colors text-sm opacity-70">Home</a></li>
              <li><a href="#" onClick={(e) => handleNavClick(e, 'products')} className="hover:text-stone-accent transition-colors text-sm opacity-70">Browse Stones</a></li>
              <li><a href="#" onClick={(e) => handleNavClick(e, 'about')} className="hover:text-stone-accent transition-colors text-sm opacity-70">Our Vision</a></li>
              <li><a href="#" onClick={(e) => handleNavClick(e, 'contact')} className="hover:text-stone-accent transition-colors text-sm opacity-70">Contact Us</a></li>
            </ul>
          </div>
          <div>
            <h3 className="font-bold text-stone-white mb-6 uppercase tracking-widest text-xs">For Partners</h3>
            <ul className="space-y-3">
              <li><a href="#" onClick={(e) => handleNavClick(e, 'register')} className="hover:text-stone-accent transition-colors text-sm opacity-70">Registration</a></li>
              <li><a href="#" onClick={(e) => handleNavClick(e, 'pricing')} className="hover:text-stone-accent transition-colors text-sm opacity-70">Pricing & Tiers</a></li>
              <li><a href="#" onClick={(e) => handleNavClick(e, 'sellerDashboard')} className="hover:text-stone-accent transition-colors text-sm opacity-70">Partner Hub</a></li>
              <li><a href="#" className="hover:text-stone-accent transition-colors text-sm opacity-70">Marketing Reach</a></li>
            </ul>
          </div>
          <div>
            <h3 className="font-bold text-stone-white mb-6 uppercase tracking-widest text-xs">Policies</h3>
            <ul className="space-y-3">
              <li><a href="#" className="hover:text-stone-accent transition-colors text-sm opacity-70">Terms of Service</a></li>
              <li><a href="#" className="hover:text-stone-accent transition-colors text-sm opacity-70">Privacy Policy</a></li>
              <li><a href="#" className="hover:text-stone-accent transition-colors text-sm opacity-70">Sample Returns</a></li>
              <li><a href="#" className="hover:text-stone-accent transition-colors text-sm opacity-70">Partner Program</a></li>
            </ul>
          </div>
        </div>
        <div className="mt-20 border-t border-white/5 pt-8 flex flex-col md:flex-row justify-between items-center text-[10px] font-black uppercase tracking-widest text-stone-secondary">
          <p>&copy; {new Date().getFullYear()} StoneTrade Marketplace. All Rights Reserved.</p>

        </div>
      </div>
    </footer>
  );
};

export default Footer;
