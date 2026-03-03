'use client';

import React, { useState, useContext } from 'react';
import { Product } from '@/types';
import { StarIcon, VerifiedIcon, HeartIcon, SparklesIcon, ChatBubbleIcon, ShieldIcon, XIcon, UserIcon, SendIcon, TruckIcon } from '@/components/IconComponents';
import type { Page } from '@/lib/navigation';
import { useFavorites } from '@/hooks/useFavorites';
import { LanguageContext } from '@/lib/language';
import { translations } from '@/translations';
import { useAuth, PRICING } from '@/contexts/AuthContext';
import { useSampleOrder } from '@/contexts/SampleOrderContext';
import VerifiedBadge from '@/components/VerifiedBadge';
import ChatWindow, { ChatTrigger } from '@/components/ChatWindow';
import ContactModal from '@/components/ContactModal';
import IntentLockModal from '@/components/IntentLockModal';
import WhatsAppButton from '@/components/WhatsAppButton';
import { useNavigation } from '@/lib/navigation';

interface ProductDetailPageProps {
  product: Product;
  navigateTo: (page: Page, productId?: number) => void;
}

const ProductDetailPage: React.FC<ProductDetailPageProps> = ({ product, navigateTo }) => {
  const [selectedImage, setSelectedImage] = useState(product.images[0]);
  const { favorites, toggleFavorite } = useFavorites();
  const { language } = useContext(LanguageContext);
  const t = translations[language];
  const { user } = useAuth();
  const { addToCart, cart } = useSampleOrder();

  const isFavorite = favorites.includes(product.id);
  const [showChat, setShowChat] = useState(false);
  const [showContact, setShowContact] = useState(false);
  const [showIntentLock, setShowIntentLock] = useState(false);
  const [isLocked, setIsLocked] = useState(false);

  const isPro = user?.buyerTier === 'pro';
  const isInCart = cart.some(item => item.product.id === product.id);
  const buyerTier = user?.buyerTier || null;

  // Sample pricing with tiered platform fee (8% non-Pro, 5% Pro)
  const sampleBasePrice = Math.round(product.price * 0.5);
  const minSamplePrice = 499;
  const actualSamplePrice = Math.max(sampleBasePrice, minSamplePrice);

  // Show fee based on user tier
  const feePercent = isPro ? PRICING.commission.pro : PRICING.commission.lite;
  const platformFee = Math.round(actualSamplePrice * feePercent);
  const totalSamplePrice = actualSamplePrice + platformFee;

  const handleAddToCart = () => {
    addToCart(product, actualSamplePrice);
  };

  return (
    <div className="max-w-7xl mx-auto pb-24 px-4">
      {/* Breadcrumbs */}
      <nav className="flex justify-between items-center py-6 mb-4">
        <div className="flex items-center gap-2 text-[10px] font-black uppercase tracking-widest text-stone-secondary">
          <button onClick={() => navigateTo('home')} className="hover:text-stone-accent">Home</button>
          <span>/</span>
          <button onClick={() => navigateTo('products')} className="hover:text-stone-accent">{product.stoneType}</button>
          <span>/</span>
          <span className="text-stone-primary">{product.origin.split(',')[0]}</span>
        </div>
        <div className="flex gap-4">
          <button
            onClick={() => toggleFavorite(product.id)}
            className={`p-3 rounded-full border transition-all shadow-sm ${isFavorite ? 'bg-red-50 border-red-200 text-red-500' : 'bg-white text-stone-secondary hover:text-red-500'}`}
          >
            <HeartIcon className="h-5 w-5" solid={isFavorite} />
          </button>
        </div>
      </nav>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-16">
        {/* Left: Image Gallery */}
        <div className="lg:col-span-7 space-y-6">
          <div className="aspect-[4/3] rounded-[2.5rem] overflow-hidden shadow-2xl bg-stone-light relative group">
            <img
              src={selectedImage}
              alt={product.name}
              className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700"
            />
            <div className="absolute top-8 left-8 flex flex-col gap-3">
              <div className="bg-white/95 backdrop-blur-md text-stone-primary px-4 py-2 rounded-2xl text-[10px] font-black flex items-center shadow-2xl uppercase tracking-[0.2em] border border-stone-accent/10">
                <ShieldIcon className="h-4 w-4 mr-2 text-stone-accent" /> Verified Stock
              </div>
              {product.seller.verificationLevel === 'Gold' && (
                <div className="bg-amber-400/95 backdrop-blur-md text-stone-primary px-4 py-2 rounded-2xl text-[10px] font-black flex items-center shadow-2xl uppercase tracking-[0.2em]">
                  <SparklesIcon className="h-4 w-4 mr-2" /> StoneTrade Verified™
                </div>
              )}
            </div>
          </div>

          <div className="grid grid-cols-4 gap-4">
            {product.images.map((img, idx) => (
              <button
                key={idx}
                onClick={() => setSelectedImage(img)}
                className={`rounded-2xl overflow-hidden aspect-[4/3] border-4 transition-all ${selectedImage === img ? 'border-stone-accent scale-95 shadow-xl' : 'border-transparent opacity-60 hover:opacity-100'}`}
              >
                <img src={img} alt={`${product.name} thumbnail`} className="w-full h-full object-cover" />
              </button>
            ))}
          </div>
        </div>

        {/* Right: Product Info & Actions */}
        <div className="lg:col-span-5 flex flex-col justify-start space-y-8">
          <div>
            <h1 className="text-4xl md:text-5xl font-black text-stone-primary mb-4 leading-[0.95] tracking-tight">
              {product.name}
            </h1>
            <div className="flex flex-wrap items-center gap-4 mb-4">
              <VerifiedBadge tier={product.seller.verificationLevel === 'Gold' ? 'gold' : product.seller.verificationLevel === 'Quarry-Direct' ? 'gold' : 'silver'} size="sm" />
              <div className="flex items-center bg-amber-50 text-amber-600 px-3 py-1 rounded-full font-bold text-xs border border-amber-100">
                <StarIcon className="h-4 w-4 mr-1" /> {product.seller.rating}
              </div>
              <span className="text-stone-secondary text-xs">{product.seller.reviews} queries</span>
            </div>
            <p className="text-lg text-stone-secondary leading-relaxed font-medium">
              {product.description}
            </p>
          </div>

          {/* Technical Specs */}
          <div className="grid grid-cols-2 gap-px bg-stone-accent/20 rounded-2xl overflow-hidden border border-stone-accent/20">
            <div className="bg-white p-5">
              <p className="text-[10px] font-black text-stone-accent uppercase tracking-widest mb-1">Thickness</p>
              <p className="text-lg font-bold text-stone-primary">{product.thickness}</p>
            </div>
            <div className="bg-white p-5">
              <p className="text-[10px] font-black text-stone-accent uppercase tracking-widest mb-1">Finish</p>
              <p className="text-lg font-bold text-stone-primary">{product.finish}</p>
            </div>
            <div className="bg-white p-5">
              <p className="text-[10px] font-black text-stone-accent uppercase tracking-widest mb-1">Origin</p>
              <p className="text-lg font-bold text-stone-primary">{product.origin.split(',')[0]}</p>
            </div>
            <div className="bg-white p-5">
              <p className="text-[10px] font-black text-stone-accent uppercase tracking-widest mb-1">Available</p>
              <p className="text-lg font-bold text-stone-primary">{product.stock.toLocaleString()} {product.priceUnit}</p>
            </div>
          </div>

          {/* Bulk Pricing with Intent Lock */}
          <div className={`p-6 rounded-2xl relative overflow-hidden transition-all ${isLocked ? 'bg-gradient-to-r from-amber-100 to-orange-100 border-2 border-amber-400' : 'bg-stone-light'}`}>
            {isLocked && (
              <div className="absolute top-3 right-3 bg-amber-500 text-white text-[9px] font-black px-3 py-1 rounded-full flex items-center gap-1">
                🔒 LOCKED FOR 24H
              </div>
            )}
            <div className="flex items-baseline gap-2 mb-2">
              <span className="text-4xl font-black text-stone-primary">₹{product.price}</span>
              <span className="text-stone-secondary font-bold">/ {product.priceUnit}</span>
            </div>
            <p className="text-xs text-stone-secondary mb-4">Min. order: {product.minOrderQty} {product.priceUnit}</p>

            {!isLocked && product.hasInspectionReport && (
              <button
                onClick={() => setShowIntentLock(true)}
                className="w-full bg-gradient-to-r from-amber-500 to-orange-500 text-white py-3 rounded-xl font-black text-sm hover:from-amber-600 hover:to-orange-600 transition-all flex items-center justify-center gap-2"
              >
                🔒 Priority Lock — ₹999 (24h Hold)
              </button>
            )}
          </div>

          {/* Sample Order Card */}
          <div className="bg-stone-primary p-8 rounded-[2rem] text-white shadow-2xl relative overflow-hidden">
            <div className="absolute top-0 right-0 p-8 opacity-10">
              <TruckIcon className="h-24 w-24" />
            </div>
            <div className="relative z-10">
              <h3 className="text-lg font-black mb-4 flex items-center gap-2">
                <TruckIcon className="h-5 w-5 text-stone-accent" />
                Order Sample
              </h3>

              <div className="space-y-2 text-sm mb-6">
                <div className="flex justify-between">
                  <span className="opacity-60">Sample Material</span>
                  <span className="font-bold">₹{actualSamplePrice}</span>
                </div>
                <div className="flex justify-between">
                  <span className="opacity-60 flex items-center gap-1">
                    Platform Fee ({Math.round(feePercent * 100)}%)
                    {!isPro && <span className="text-[8px] bg-green-500/30 text-green-300 px-1.5 py-0.5 rounded">Pro: 5%</span>}
                  </span>
                  <span className="font-bold text-stone-accent">₹{platformFee}</span>
                </div>
                <div className="border-t border-white/20 pt-2 flex justify-between">
                  <span className="font-bold">Total</span>
                  <span className="text-xl font-black text-stone-accent">₹{totalSamplePrice}</span>
                </div>
              </div>

              {isInCart ? (
                <button
                  onClick={() => navigateTo('sampleCheckout')}
                  className="w-full bg-green-500 text-white py-4 rounded-xl font-black text-sm hover:bg-green-600 transition-colors"
                >
                  ✓ In Cart - Checkout Now
                </button>
              ) : (
                <button
                  onClick={handleAddToCart}
                  className="w-full bg-stone-accent text-stone-primary py-4 rounded-xl font-black text-sm hover:bg-white transition-colors"
                >
                  {isPro ? 'Add Sample to Cart' : 'Get Pro to Order Samples'}
                </button>
              )}
            </div>
          </div>

          {/* Contact Seller */}
          <div className="space-y-3">
            <WhatsAppButton
              sellerName={product.seller.name}
              sellerPhone={product.seller.contact?.whatsapp}
              productName={product.name}
              productPrice={product.price}
              className="w-full justify-center"
            />
            <div className="flex gap-3">
              <ChatTrigger onClick={() => setShowChat(true)} isPro={isPro} />
              <button
                onClick={() => setShowContact(true)}
                className={`flex-1 flex items-center justify-center gap-2 px-6 py-3 rounded-xl font-bold text-sm transition-all ${isPro
                  ? 'bg-stone-primary text-white hover:bg-stone-secondary'
                  : 'bg-stone-light text-stone-secondary border border-stone-accent/20'
                  }`}
              >
                <SendIcon className="h-5 w-5" />
                {isPro ? 'Call Seller' : 'Contact (Pro)'}
              </button>
            </div>
            <button
              onClick={() => navigateTo('rfq')}
              className="w-full bg-stone-light text-stone-primary py-3.5 rounded-xl font-bold text-sm hover:bg-stone-accent/20 transition-colors border border-stone-accent/10 flex items-center justify-center gap-2"
            >
              📝 Need Bulk? Get Multiple Quotes
            </button>
          </div>

          {/* Seller Info */}
          <div className="flex items-center gap-4 p-4 bg-white rounded-2xl border border-stone-accent/10">
            <div className="w-12 h-12 rounded-full bg-stone-accent flex items-center justify-center text-stone-primary font-bold text-lg">
              {product.seller.name.charAt(0)}
            </div>
            <div className="flex-1">
              <h4 className="font-bold">{product.seller.name}</h4>
              <p className="text-xs text-stone-secondary">{product.seller.location}</p>
            </div>
            {product.seller.isVerified && (
              <VerifiedIcon className="h-6 w-6 text-stone-accent" />
            )}
          </div>
        </div>
      </div>

      {/* Chat Window */}
      <ChatWindow
        sellerId={product.seller.id}
        sellerName={product.seller.name}
        isOpen={showChat}
        onClose={() => setShowChat(false)}
      />

      {/* Contact Modal */}
      <ContactModal
        seller={product.seller}
        isOpen={showContact}
        onClose={() => setShowContact(false)}
      />

      {/* Intent Lock Modal */}
      <IntentLockModal
        product={product}
        isOpen={showIntentLock}
        onClose={() => setShowIntentLock(false)}
        onLock={() => setIsLocked(true)}
      />
    </div>
  );
};

export default ProductDetailPage;
