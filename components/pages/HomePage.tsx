'use client';

import React, { useContext } from 'react';
import ProductCard from '@/components/ProductCard';
import FlashSpecBanner from '@/components/FlashSpecBanner';
import MarketPulseTicker from '@/components/MarketPulseTicker';
import { useMockData } from '@/hooks/useMockData';
import { StoneType } from '@/types';
import type { Page } from '@/lib/navigation';
import { ShieldIcon, SparklesIcon, TruckIcon } from '@/components/IconComponents';
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
            {/* Hero - Premium National */}
            <section className="relative overflow-hidden bg-stone-primary text-white py-20 lg:py-28">
                <div className="absolute top-0 left-1/2 -translate-x-1/2 w-full h-full max-w-7xl">
                    <div className="absolute top-0 right-0 w-96 h-96 bg-stone-accent/20 rounded-full blur-[100px] translate-x-1/2 -translate-y-1/2" />
                    <div className="absolute bottom-0 left-0 w-96 h-96 bg-stone-accent/10 rounded-full blur-[100px] -translate-x-1/2 translate-y-1/2" />
                </div>

                <div className="container mx-auto px-6 text-center max-w-5xl relative z-10">
                    <div className="inline-flex items-center gap-2 bg-white/5 backdrop-blur-md border border-white/10 px-6 py-2.5 rounded-full text-xs font-black uppercase tracking-widest mb-8 shadow-lg animate-fade-in-up">
                        <span className="text-base">🇮🇳</span>
                        <span className="bg-gradient-to-r from-stone-accent to-amber-300 bg-clip-text text-transparent">Bharat&apos;s Own Stone Platform</span>
                    </div>

                    <h1 className="text-5xl lg:text-7xl font-black tracking-tight mb-6 leading-[1.05] text-stone-white animate-fade-in-up" style={{ animationDelay: '0.1s' }}>
                        Buy Natural Stone<br />Directly from Quarries
                    </h1>

                    <p className="text-lg lg:text-xl text-stone-light/70 mb-10 max-w-2xl mx-auto leading-relaxed font-light animate-fade-in-up" style={{ animationDelay: '0.2s' }}>
                        India&apos;s trusted marketplace for marble, granite &amp; sandstone. Order samples, compare prices, and buy from verified manufacturers — no middlemen.
                    </p>

                    <div className="flex flex-col sm:flex-row gap-4 justify-center animate-fade-in-up" style={{ animationDelay: '0.3s' }}>
                        <button
                            onClick={() => navigateTo('products')}
                            className="bg-stone-accent text-stone-primary font-black py-4 px-10 rounded-2xl text-lg hover:bg-white hover:scale-105 transition-all shadow-[0_20px_40px_-12px_rgba(201,169,126,0.3)]"
                        >
                            Browse Stone →
                        </button>
                        <button
                            onClick={() => navigateTo('register')}
                            className="bg-white/5 backdrop-blur-md text-white border border-white/10 font-bold py-4 px-10 rounded-2xl text-lg hover:bg-white/10 hover:border-white/30 transition-all"
                        >
                            Register Free
                        </button>
                    </div>

                    {/* Stats */}
                    <div className="mt-16 grid grid-cols-2 sm:grid-cols-4 gap-6 text-center border-t border-white/5 pt-10 max-w-4xl mx-auto animate-fade-in-up" style={{ animationDelay: '0.4s' }}>
                        <div className="space-y-1">
                            <p className="text-3xl lg:text-4xl font-black text-stone-accent">500+</p>
                            <p className="text-[10px] lg:text-xs uppercase tracking-widest font-bold opacity-60">Verified Sellers</p>
                        </div>
                        <div className="space-y-1">
                            <p className="text-3xl lg:text-4xl font-black text-stone-accent">28</p>
                            <p className="text-[10px] lg:text-xs uppercase tracking-widest font-bold opacity-60">States Covered</p>
                        </div>
                        <div className="space-y-1">
                            <p className="text-3xl lg:text-4xl font-black text-stone-accent">₹0</p>
                            <p className="text-[10px] lg:text-xs uppercase tracking-widest font-bold opacity-60">Brokerage Fee</p>
                        </div>
                        <div className="space-y-1">
                            <p className="text-3xl lg:text-4xl font-black text-stone-accent">24hr</p>
                            <p className="text-[10px] lg:text-xs uppercase tracking-widest font-bold opacity-60">Sample Delivery</p>
                        </div>
                    </div>
                </div>
            </section>

            {/* Trust Bar */}
            <section className="bg-white border-b border-stone-accent/10">
                <div className="container mx-auto px-4 py-4">
                    <div className="flex flex-wrap justify-center gap-x-8 gap-y-2 text-xs font-bold text-stone-secondary uppercase tracking-wider">
                        <span className="flex items-center gap-2"><span className="text-emerald-500">✓</span> GST Invoiced</span>
                        <span className="flex items-center gap-2"><span className="text-emerald-500">✓</span> Quality Guarantee</span>
                        <span className="flex items-center gap-2"><span className="text-emerald-500">✓</span> Pan India Delivery</span>
                        <span className="flex items-center gap-2"><span className="text-emerald-500">✓</span> Easy Returns</span>
                        <span className="flex items-center gap-2"><span className="text-emerald-500">✓</span> WhatsApp Support</span>
                    </div>
                </div>
            </section>

            {/* Main Content */}
            <div className="container mx-auto px-4 py-12 lg:py-16">
                {/* Live Activity */}
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
                            <h2 className="text-3xl lg:text-4xl font-black tracking-tight text-stone-primary">Top Picks</h2>
                            <p className="text-stone-secondary mt-1">Verified stock from leading quarries across India</p>
                        </div>
                        <button
                            onClick={() => navigateTo('products')}
                            className="text-stone-primary font-bold hover:text-stone-accent transition-colors"
                        >
                            View All →
                        </button>
                    </div>
                    <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 lg:gap-6">
                        {featuredProducts.map(product => (
                            <ProductCard key={product.id} product={product} navigateTo={navigateTo} />
                        ))}
                    </div>
                </section>

                {/* Who Uses StoneTrade */}
                <section className="mt-16 lg:mt-20">
                    <h2 className="text-3xl font-black text-center mb-3">For Every Stone Buyer</h2>
                    <p className="text-stone-secondary text-center mb-10 max-w-xl mx-auto">Whether you&apos;re building a home, designing a hotel, or supplying a project — find your stone here.</p>
                    <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
                        {[
                            { emoji: '🏠', title: 'Homeowners', desc: 'Premium marble & granite for your dream home' },
                            { emoji: '🏗️', title: 'Contractors', desc: 'Bulk orders at factory prices, GST billed' },
                            { emoji: '🎨', title: 'Interior Designers', desc: 'Curated collections with sample delivery' },
                            { emoji: '🏢', title: 'Dealers & Distributors', desc: 'Direct quarry rates, recurring supply' },
                        ].map((item) => (
                            <div key={item.title} className="bg-white p-6 rounded-2xl text-center hover:shadow-lg transition-shadow border border-stone-accent/5">
                                <span className="text-3xl mb-3 block">{item.emoji}</span>
                                <h3 className="font-bold text-sm mb-1">{item.title}</h3>
                                <p className="text-stone-secondary text-xs leading-relaxed">{item.desc}</p>
                            </div>
                        ))}
                    </div>
                </section>

                {/* How It Works */}
                <section className="mt-16 lg:mt-20">
                    <h2 className="text-3xl font-black text-center mb-10">How It Works</h2>
                    <div className="grid md:grid-cols-4 gap-6">
                        {[
                            { step: '01', title: 'Browse & Compare', desc: 'Filter by stone type, origin, price. Compare up to 4 products side-by-side.' },
                            { step: '02', title: 'Order Sample', desc: 'Get a physical sample delivered to your doorstep within 24 hours for ₹99.' },
                            { step: '03', title: 'Place Bulk Order', desc: 'Buy directly from the manufacturer. GST invoiced, no brokerage.' },
                            { step: '04', title: 'Track & Receive', desc: 'Real-time tracking. Quality checked before dispatch. Easy returns if unsatisfied.' },
                        ].map((item) => (
                            <div key={item.step} className="relative bg-stone-light/50 p-6 rounded-2xl">
                                <span className="text-5xl font-black text-stone-accent/15 absolute top-4 right-4">{item.step}</span>
                                <h3 className="font-bold text-base mb-2 mt-2">{item.title}</h3>
                                <p className="text-stone-secondary text-sm leading-relaxed">{item.desc}</p>
                            </div>
                        ))}
                    </div>
                </section>

                {/* Trust Signals */}
                <section className="mt-16 lg:mt-20 grid md:grid-cols-3 gap-6">
                    <div className="bg-white p-8 rounded-3xl text-center border border-stone-accent/5">
                        <div className="w-14 h-14 bg-stone-accent/20 rounded-2xl flex items-center justify-center mx-auto mb-4">
                            <ShieldIcon className="h-7 w-7 text-stone-accent" />
                        </div>
                        <h3 className="font-bold text-lg mb-2">StoneTrade Verified™</h3>
                        <p className="text-stone-secondary text-sm">Every seller is GST-verified with factory audits. Fake listings are removed within 24 hours.</p>
                    </div>
                    <div className="bg-white p-8 rounded-3xl text-center border border-stone-accent/5">
                        <div className="w-14 h-14 bg-emerald-100 rounded-2xl flex items-center justify-center mx-auto mb-4">
                            <SparklesIcon className="h-7 w-7 text-emerald-600" />
                        </div>
                        <h3 className="font-bold text-lg mb-2">AI Stone Expert</h3>
                        <p className="text-stone-secondary text-sm">Upload a photo or describe your project — our AI finds the perfect stone match in seconds.</p>
                    </div>
                    <div className="bg-white p-8 rounded-3xl text-center border border-stone-accent/5">
                        <div className="w-14 h-14 bg-blue-100 rounded-2xl flex items-center justify-center mx-auto mb-4">
                            <TruckIcon className="h-7 w-7 text-blue-600" />
                        </div>
                        <h3 className="font-bold text-lg mb-2">Pan India Delivery</h3>
                        <p className="text-stone-secondary text-sm">Shipping to all 28 states. Full-load trucks at best rates. Insured transit with real-time tracking.</p>
                    </div>
                </section>

                {/* CTA Banner */}
                <section className="mt-16 lg:mt-20 bg-gradient-to-r from-stone-primary to-stone-primary/90 text-white rounded-3xl p-8 lg:p-12 text-center relative overflow-hidden">
                    <div className="absolute top-0 right-0 w-64 h-64 bg-stone-accent/10 rounded-full blur-[80px] translate-x-1/2 -translate-y-1/2" />
                    <div className="relative z-10">
                        <h2 className="text-3xl lg:text-4xl font-black mb-4">Start Buying Smarter</h2>
                        <p className="text-stone-light/70 mb-8 max-w-lg mx-auto">Join thousands of buyers across India who save 15-30% by buying stone directly from quarries.</p>
                        <div className="flex flex-col sm:flex-row gap-4 justify-center">
                            <button
                                onClick={() => navigateTo('products')}
                                className="bg-stone-accent text-stone-primary font-black py-4 px-10 rounded-2xl text-lg hover:bg-white transition-all"
                            >
                                Browse Stone
                            </button>
                            <button
                                onClick={() => navigateTo('register')}
                                className="bg-white/10 border border-white/20 text-white font-bold py-4 px-10 rounded-2xl text-lg hover:bg-white/20 transition-all"
                            >
                                Create Free Account
                            </button>
                        </div>
                    </div>
                </section>
            </div>
        </div>
    );
};

export default HomePage;
