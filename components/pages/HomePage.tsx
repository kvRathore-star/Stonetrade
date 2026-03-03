'use client';

import React, { useContext } from 'react';
import ProductCard from '@/components/ProductCard';
import FlashSpecBanner from '@/components/FlashSpecBanner';
import MarketPulseTicker from '@/components/MarketPulseTicker';
import { useMockData } from '@/hooks/useMockData';
import { StoneType } from '@/types';
import type { Page } from '@/lib/navigation';
import { ShieldIcon, SparklesIcon } from '@/components/IconComponents';
import { LanguageContext } from '@/lib/language';
import { translations } from '@/translations';

interface HomePageProps {
    navigateTo: (page: Page, productId?: number) => void;
}

const HomePage: React.FC<HomePageProps> = ({ navigateTo }) => {
    const { products } = useMockData();
    const { language } = useContext(LanguageContext);
    const t = translations[language];
    const featuredProducts = products.filter(p => p.stoneType !== StoneType.HANDICRAFT && p.stoneType !== StoneType.DECORATION).slice(0, 8);

    return (
        <div className="space-y-0">
            {/* Hero - Premium Gradient */}
            <section className="relative overflow-hidden bg-stone-primary text-white py-24 lg:py-32">
                {/* Background Glow */}
                <div className="absolute top-0 left-1/2 -translate-x-1/2 w-full h-full max-w-7xl">
                    <div className="absolute top-0 right-0 w-96 h-96 bg-stone-accent/20 rounded-full blur-[100px] translate-x-1/2 -translate-y-1/2"></div>
                    <div className="absolute bottom-0 left-0 w-96 h-96 bg-stone-accent/10 rounded-full blur-[100px] -translate-x-1/2 translate-y-1/2"></div>
                </div>

                <div className="container mx-auto px-6 text-center max-w-5xl relative z-10">
                    <div className="inline-flex items-center gap-2 bg-white/5 backdrop-blur-md border border-white/10 px-6 py-2 rounded-full text-xs font-black uppercase tracking-widest mb-10 shadow-lg animate-fade-in-up">
                        <ShieldIcon className="h-4 w-4 text-stone-accent" />
                        <span className="bg-gradient-to-r from-stone-light to-white bg-clip-text text-transparent">India's #1 B2B Stone Network</span>
                    </div>

                    <h1 className="text-6xl lg:text-8xl font-black tracking-tight mb-8 leading-[1] text-stone-white drop-shadow-sm animate-fade-in-up" style={{ animationDelay: '0.1s' }}>
                        {t.heroTitle}
                    </h1>

                    <p className="text-xl lg:text-2xl text-stone-light/80 mb-12 max-w-3xl mx-auto leading-relaxed font-light animate-fade-in-up" style={{ animationDelay: '0.2s' }}>
                        {t.heroSubtitle}
                    </p>

                    <div className="flex flex-col sm:flex-row gap-6 justify-center animate-fade-in-up" style={{ animationDelay: '0.3s' }}>
                        <button
                            onClick={() => navigateTo('products')}
                            className="bg-stone-accent text-stone-primary font-black py-5 px-12 rounded-2xl text-lg hover:bg-white hover:scale-105 transition-all shadow-[0_20px_40px_-12px_rgba(201,169,126,0.3)]"
                        >
                            {t.exploreInventory}
                        </button>
                        <button
                            onClick={() => navigateTo('pricing')}
                            className="bg-white/5 backdrop-blur-md text-white border border-white/10 font-bold py-5 px-12 rounded-2xl text-lg hover:bg-white/10 hover:border-white/30 transition-all"
                        >
                            View Pricing
                        </button>
                    </div>

                    {/* Quick Stats */}
                    <div className="mt-20 grid grid-cols-3 gap-8 text-center border-t border-white/5 pt-12 max-w-4xl mx-auto animate-fade-in-up" style={{ animationDelay: '0.4s' }}>
                        <div className="space-y-1">
                            <p className="text-4xl lg:text-5xl font-black text-stone-accent">500+</p>
                            <p className="text-[10px] lg:text-xs uppercase tracking-widest font-bold opacity-60">Verified Sellers</p>
                        </div>
                        <div className="space-y-1">
                            <p className="text-4xl lg:text-5xl font-black text-stone-accent">10K+</p>
                            <p className="text-[10px] lg:text-xs uppercase tracking-widest font-bold opacity-60">Live Listings</p>
                        </div>
                        <div className="space-y-1">
                            <p className="text-4xl lg:text-5xl font-black text-stone-accent">0%</p>
                            <p className="text-[10px] lg:text-xs uppercase tracking-widest font-bold opacity-60">Brokerage Fee</p>
                        </div>
                    </div>
                </div>
            </section>

            {/* Main Content */}
            <div className="container mx-auto px-4 py-16">
                {/* Live Activity - Simplified */}
                <MarketPulseTicker />

                {/* Flash Deals */}
                <FlashSpecBanner
                    products={products}
                    onProductClick={(productId) => navigateTo('productDetail', productId)}
                />

                {/* Featured Products */}
                <section>
                    <div className="flex justify-between items-end mb-8">
                        <div>
                            <h2 className="text-4xl font-black tracking-tight text-stone-primary">Featured Inventory</h2>
                            <p className="text-stone-secondary mt-1">Verified stock from trusted manufacturers</p>
                        </div>
                        <button
                            onClick={() => navigateTo('products')}
                            className="text-stone-primary font-bold hover:text-stone-accent transition-colors"
                        >
                            View All →
                        </button>
                    </div>
                    <div className="grid grid-cols-2 lg:grid-cols-4 gap-6">
                        {featuredProducts.map(product => (
                            <ProductCard key={product.id} product={product} navigateTo={navigateTo} />
                        ))}
                    </div>
                </section>

                {/* Value Props - Simple */}
                <section className="mt-20 grid md:grid-cols-3 gap-8">
                    <div className="bg-stone-light/50 p-8 rounded-3xl text-center">
                        <div className="w-14 h-14 bg-stone-accent/20 rounded-2xl flex items-center justify-center mx-auto mb-4">
                            <ShieldIcon className="h-7 w-7 text-stone-accent" />
                        </div>
                        <h3 className="font-bold text-lg mb-2">Verified Sellers</h3>
                        <p className="text-stone-secondary text-sm">Gold sellers are background-verified with yard audits</p>
                    </div>
                    <div className="bg-stone-light/50 p-8 rounded-3xl text-center">
                        <div className="w-14 h-14 bg-emerald-100 rounded-2xl flex items-center justify-center mx-auto mb-4">
                            <SparklesIcon className="h-7 w-7 text-emerald-600" />
                        </div>
                        <h3 className="font-bold text-lg mb-2">AI-Powered</h3>
                        <p className="text-stone-secondary text-sm">Smart matching for architects & buyers</p>
                    </div>
                    <div className="bg-stone-light/50 p-8 rounded-3xl text-center">
                        <div className="w-14 h-14 bg-amber-100 rounded-2xl flex items-center justify-center mx-auto mb-4">
                            <span className="text-2xl">🇮🇳</span>
                        </div>
                        <h3 className="font-bold text-lg mb-2">Made for India</h3>
                        <p className="text-stone-secondary text-sm">11 languages, WhatsApp support, local payments</p>
                    </div>
                </section>
            </div>
        </div>
    );
};

export default HomePage;
