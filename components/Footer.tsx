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
            <h3 className="font-bold text-stone-white mb-6 uppercase tracking-widest text-xs">StoneTrade</h3>
            <ul className="space-y-4">
              <li><a href="#" onClick={(e) => handleNavClick(e, 'about')} className="hover:text-stone-kesariya transition-colors text-sm opacity-70">Our Legacy & Process</a></li>
              <li><a href="#" onClick={(e) => handleNavClick(e, 'pricing')} className="hover:text-stone-kesariya transition-colors text-sm opacity-70">Pro Membership</a></li>
              <li><a href="#" onClick={(e) => handleNavClick(e, 'products')} className="hover:text-stone-kesariya transition-colors text-sm opacity-70">Live Marketplace</a></li>
              <li><a href="#" onClick={(e) => handleNavClick(e, 'contact')} className="hover:text-stone-kesariya transition-colors text-sm opacity-70">Contact</a></li>
            </ul>
          </div>
          <div>
            <h3 className="font-bold text-stone-white mb-6 uppercase tracking-widest text-xs">B2B Support</h3>
            <ul className="space-y-4">
              <li><a href="#" onClick={(e) => handleNavClick(e, 'register')} className="hover:text-stone-kesariya transition-colors text-sm opacity-70">Sell on StoneTrade</a></li>
              <li><a href="#" onClick={(e) => handleNavClick(e, 'rfq')} className="hover:text-stone-kesariya transition-colors text-sm opacity-70">Post RFQ</a></li>
              <li><a href="#" onClick={(e) => handleNavClick(e, 'sellerDashboard')} className="hover:text-stone-kesariya transition-colors text-sm opacity-70">Seller Dashboard</a></li>
              <li><a href="#" className="hover:text-stone-kesariya transition-colors text-sm opacity-70">Marketing Reach</a></li>
            </ul>
          </div>
          <div>
            <h3 className="font-bold text-stone-white mb-6 uppercase tracking-widest text-xs">Legal & Trust</h3>
            <ul className="space-y-4">
              <li><a href="/terms" className="hover:text-stone-kesariya transition-colors text-sm opacity-70">Terms of Service</a></li>
              <li><a href="/privacy" className="hover:text-stone-kesariya transition-colors text-sm opacity-70">Privacy Policy</a></li>
              <li><a href="/refund-policy" className="hover:text-stone-kesariya transition-colors text-sm opacity-70">Refund & Returns</a></li>
              <li><a href="/shipping-policy" className="hover:text-stone-kesariya transition-colors text-sm opacity-70">Shipping Logistics</a></li>
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
