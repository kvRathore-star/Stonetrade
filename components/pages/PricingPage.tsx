'use client';

import React, { useState } from 'react';
import { ShieldIcon, SparklesIcon } from '@/components/IconComponents';
import type { Page } from '@/lib/navigation';

interface PricingPageProps {
    navigateTo: (page: Page) => void;
}

const PricingPage: React.FC<PricingPageProps> = ({ navigateTo }) => {
    const [activeTab, setActiveTab] = useState<'buyer' | 'seller'>('buyer');
    const [billingCycle, setBillingCycle] = useState<'monthly' | 'yearly'>('monthly');

    const handlePlanSelect = (plan: string) => {
        navigateTo('register');
    };

    const getPrice = (monthly: number) => {
        if (billingCycle === 'yearly') {
            return Math.round(monthly * 12 * 0.8); // 20% off yearly
        }
        return monthly;
    };

    const getPriceLabel = () => billingCycle === 'yearly' ? '/year' : '/month';

    return (
        <div className="max-w-6xl mx-auto py-16 px-4">
            {/* Header */}
            <div className="text-center mb-10">
                <h1 className="text-5xl font-black tracking-tight text-stone-primary mb-3">
                    Pricing Built for India
                </h1>
                <p className="text-lg text-stone-secondary max-w-xl mx-auto">
                    Simple, transparent. No brokerage. Cancel anytime.
                </p>
            </div>

            {/* Billing Toggle */}
            <div className="flex justify-center mb-8">
                <div className="inline-flex bg-stone-light rounded-full p-1 items-center gap-2">
                    <button
                        onClick={() => setBillingCycle('monthly')}
                        className={`px-6 py-2 rounded-full text-sm font-bold transition-all ${billingCycle === 'monthly'
                                ? 'bg-stone-primary text-white shadow'
                                : 'text-stone-secondary'
                            }`}
                    >
                        Monthly
                    </button>
                    <button
                        onClick={() => setBillingCycle('yearly')}
                        className={`px-6 py-2 rounded-full text-sm font-bold transition-all flex items-center gap-2 ${billingCycle === 'yearly'
                                ? 'bg-stone-primary text-white shadow'
                                : 'text-stone-secondary'
                            }`}
                    >
                        Yearly
                        <span className="bg-emerald-500 text-white text-[10px] px-2 py-0.5 rounded-full font-bold">Save 20%</span>
                    </button>
                </div>
            </div>

            {/* Tab Toggle */}
            <div className="flex justify-center mb-10">
                <div className="inline-flex bg-stone-light/50 rounded-2xl p-1.5">
                    <button
                        onClick={() => setActiveTab('buyer')}
                        className={`px-8 py-3 rounded-xl font-bold transition-all ${activeTab === 'buyer'
                                ? 'bg-white text-stone-primary shadow-lg'
                                : 'text-stone-secondary hover:text-stone-primary'
                            }`}
                    >
                        👷 Buyers & Architects
                    </button>
                    <button
                        onClick={() => setActiveTab('seller')}
                        className={`px-8 py-3 rounded-xl font-bold transition-all ${activeTab === 'seller'
                                ? 'bg-white text-stone-primary shadow-lg'
                                : 'text-stone-secondary hover:text-stone-primary'
                            }`}
                    >
                        🏭 Sellers & Factories
                    </button>
                </div>
            </div>

            {/* BUYER PLANS */}
            {activeTab === 'buyer' && (
                <div className="space-y-8">
                    <div className="grid md:grid-cols-3 gap-6">
                        {/* Lite */}
                        <div className="bg-white border border-stone-accent/10 rounded-3xl p-8 flex flex-col">
                            <h3 className="font-bold text-stone-secondary mb-1">Lite</h3>
                            <div className="flex items-baseline mb-4">
                                <span className="text-4xl font-black">₹0</span>
                                <span className="text-stone-secondary ml-2 text-sm">/forever</span>
                            </div>
                            <p className="text-xs text-stone-secondary mb-6 pb-4 border-b">Perfect for exploring the marketplace</p>
                            <ul className="space-y-3 text-sm flex-grow">
                                <li className="flex items-start gap-2">✅ Browse all products</li>
                                <li className="flex items-start gap-2">✅ Save favorites & compare</li>
                                <li className="flex items-start gap-2">✅ Sample ordering <span className="ml-1 text-[10px] bg-red-100 text-red-600 px-2 py-0.5 rounded-full font-bold">8% fee</span></li>
                                <li className="flex items-start gap-2 opacity-40">❌ Contact sellers</li>
                                <li className="flex items-start gap-2 opacity-40">❌ AI features</li>
                            </ul>
                            <button onClick={() => handlePlanSelect('Buyer Lite')} className="w-full mt-8 border-2 border-stone-primary text-stone-primary py-3 rounded-xl font-bold hover:bg-stone-light transition-all">
                                Start Free
                            </button>
                        </div>

                        {/* Pro */}
                        <div className="bg-emerald-50 border-2 border-emerald-500 rounded-3xl p-8 flex flex-col relative">
                            <div className="absolute -top-3 left-1/2 -translate-x-1/2 bg-emerald-500 text-white text-xs font-bold px-4 py-1 rounded-full">BEST VALUE</div>
                            <h3 className="font-bold text-emerald-700 mb-1">Pro</h3>
                            <div className="flex items-baseline mb-4">
                                <span className="text-4xl font-black text-stone-primary">₹{getPrice(499)}</span>
                                <span className="text-stone-secondary ml-2 text-sm">{getPriceLabel()}</span>
                            </div>
                            <p className="text-xs text-emerald-700 mb-6 pb-4 border-b border-emerald-200 font-medium">For architects ordering regularly</p>
                            <ul className="space-y-3 text-sm flex-grow">
                                <li className="flex items-start gap-2">✅ Everything in Lite</li>
                                <li className="flex items-start gap-2 text-emerald-700 font-medium">✅ Sample ordering <span className="ml-1 text-[10px] bg-emerald-200 text-emerald-800 px-2 py-0.5 rounded-full font-bold">5% fee</span></li>
                                <li className="flex items-start gap-2">✅ Unlimited seller contact</li>
                                <li className="flex items-start gap-2">✅ WhatsApp direct access</li>
                                <li className="flex items-start gap-2">✅ 5 audit reports/month</li>
                                <li className="flex items-start gap-2 text-violet-600 font-medium">🤖 AI Stone Matcher</li>
                                <li className="flex items-start gap-2 text-violet-600 font-medium">🤖 AI Price Alerts</li>
                            </ul>
                            <button onClick={() => handlePlanSelect('Buyer Pro')} className="w-full mt-8 bg-emerald-500 text-white py-3.5 rounded-xl font-bold hover:bg-emerald-600 transition-all shadow-lg">
                                Get Pro — ₹{getPrice(499)}{getPriceLabel()}
                            </button>
                        </div>

                        {/* Elite */}
                        <div className="bg-stone-primary text-white rounded-3xl p-8 flex flex-col relative overflow-hidden">
                            <div className="absolute top-0 right-0 w-40 h-40 bg-amber-400/10 rounded-full blur-3xl"></div>
                            <div className="absolute -top-3 left-1/2 -translate-x-1/2 bg-gradient-to-r from-amber-400 to-orange-500 text-stone-primary text-xs font-bold px-4 py-1 rounded-full">ELITE</div>
                            <h3 className="font-bold text-amber-400 mb-1">Elite</h3>
                            <div className="flex items-baseline mb-4">
                                <span className="text-4xl font-black text-amber-400">₹{getPrice(799)}</span>
                                <span className="text-white/50 ml-2 text-sm">{getPriceLabel()}</span>
                            </div>
                            <p className="text-xs text-white/60 mb-6 pb-4 border-b border-white/10">For high-volume buyers & firms</p>
                            <ul className="space-y-3 text-sm text-white/80 flex-grow">
                                <li className="flex items-start gap-2">⭐ Everything in Pro</li>
                                <li className="flex items-start gap-2 text-amber-300 font-medium">⭐ 10 audit reports/month</li>
                                <li className="flex items-start gap-2 text-amber-300 font-medium">⭐ ₹999 Priority Lock (24hr hold)</li>
                                <li className="flex items-start gap-2">⭐ Project cost calculator</li>
                                <li className="flex items-start gap-2">⭐ Architect moodboards</li>
                                <li className="flex items-start gap-2 text-violet-300 font-medium">🤖 AI Stone Matcher</li>
                                <li className="flex items-start gap-2 text-violet-300 font-medium">🤖 AI Price Alerts</li>
                                <li className="flex items-start gap-2 text-violet-300 font-medium">🤖 AI Quote Generator</li>
                            </ul>
                            <button onClick={() => handlePlanSelect('Buyer Elite')} className="w-full mt-8 bg-gradient-to-r from-amber-400 to-orange-500 text-stone-primary py-3.5 rounded-xl font-bold hover:from-amber-500 hover:to-orange-600 transition-all shadow-lg">
                                Go Elite — ₹{getPrice(799)}{getPriceLabel()}
                            </button>
                        </div>
                    </div>

                    {/* AI Features Highlight */}
                    <div className="bg-gradient-to-r from-violet-100 to-purple-100 border border-violet-200 rounded-2xl p-6">
                        <div className="flex items-center gap-3 mb-3">
                            <div className="w-10 h-10 bg-violet-500 rounded-xl flex items-center justify-center">
                                <SparklesIcon className="h-5 w-5 text-white" />
                            </div>
                            <h3 className="font-bold text-violet-800">AI Features Included</h3>
                        </div>
                        <div className="grid md:grid-cols-3 gap-4 text-sm">
                            <div className="bg-white/60 rounded-xl p-4">
                                <p className="font-bold text-violet-700 mb-1">🔍 AI Stone Matcher</p>
                                <p className="text-violet-600 text-xs">Upload a photo, find similar stones instantly from 10K+ listings</p>
                            </div>
                            <div className="bg-white/60 rounded-xl p-4">
                                <p className="font-bold text-violet-700 mb-1">📈 AI Price Alerts</p>
                                <p className="text-violet-600 text-xs">Get notified when prices drop on your watched products</p>
                            </div>
                            <div className="bg-white/60 rounded-xl p-4">
                                <p className="font-bold text-violet-700 mb-1">📝 AI Quote Generator</p>
                                <p className="text-violet-600 text-xs">Auto-generate client quotes with material costs & estimates</p>
                            </div>
                        </div>
                    </div>
                </div>
            )}

            {/* SELLER PLANS */}
            {activeTab === 'seller' && (
                <div className="space-y-8">
                    <div className="grid md:grid-cols-3 gap-6">
                        {/* Basic */}
                        <div className="bg-white border border-stone-accent/10 rounded-3xl p-8 flex flex-col">
                            <h3 className="font-bold text-stone-secondary mb-1">Basic</h3>
                            <div className="flex items-baseline mb-4">
                                <span className="text-4xl font-black">₹0</span>
                                <span className="text-stone-secondary ml-2 text-sm">/forever</span>
                            </div>
                            <p className="text-xs text-stone-secondary mb-6 pb-4 border-b">Test the marketplace with limited listings</p>
                            <ul className="space-y-3 text-sm flex-grow">
                                <li className="flex items-start gap-2">✅ 5 active listings</li>
                                <li className="flex items-start gap-2">✅ Standard visibility</li>
                                <li className="flex items-start gap-2">✅ Basic analytics</li>
                                <li className="flex items-start gap-2">✅ Buyer inquiries</li>
                                <li className="flex items-start gap-2 opacity-40">❌ Verification badge</li>
                                <li className="flex items-start gap-2 opacity-40">❌ AI features</li>
                            </ul>
                            <button onClick={() => handlePlanSelect('Seller Basic')} className="w-full mt-8 border-2 border-stone-primary text-stone-primary py-3 rounded-xl font-bold hover:bg-stone-light transition-all">
                                Start Free
                            </button>
                        </div>

                        {/* Silver */}
                        <div className="bg-slate-50 border-2 border-slate-400 rounded-3xl p-8 flex flex-col relative">
                            <div className="absolute -top-3 left-1/2 -translate-x-1/2 bg-slate-500 text-white text-xs font-bold px-4 py-1 rounded-full">POPULAR</div>
                            <h3 className="font-bold text-slate-700 mb-1">Silver</h3>
                            <div className="flex items-baseline mb-4">
                                <span className="text-4xl font-black text-stone-primary">₹{getPrice(999)}</span>
                                <span className="text-stone-secondary ml-2 text-sm">{getPriceLabel()}</span>
                            </div>
                            <p className="text-xs text-slate-600 mb-6 pb-4 border-b border-slate-200 font-medium">For growing traders & factories</p>
                            <ul className="space-y-3 text-sm flex-grow">
                                <li className="flex items-start gap-2">🥈 30 active listings</li>
                                <li className="flex items-start gap-2 font-medium">🥈 Silver Verified badge</li>
                                <li className="flex items-start gap-2">🥈 Priority search ranking</li>
                                <li className="flex items-start gap-2">🥈 WhatsApp leads</li>
                                <li className="flex items-start gap-2">🥈 Advanced analytics</li>
                                <li className="flex items-start gap-2 text-violet-600 font-medium">🤖 AI Fast Listing</li>
                                <li className="flex items-start gap-2 text-violet-600 font-medium">🤖 AI Photo Enhancer</li>
                            </ul>
                            <button onClick={() => handlePlanSelect('Seller Silver')} className="w-full mt-8 bg-slate-500 text-white py-3.5 rounded-xl font-bold hover:bg-slate-600 transition-all shadow-lg">
                                Go Silver — ₹{getPrice(999)}{getPriceLabel()}
                            </button>
                        </div>

                        {/* Gold */}
                        <div className="bg-stone-primary text-white rounded-3xl p-8 flex flex-col relative overflow-hidden">
                            <div className="absolute top-0 right-0 w-40 h-40 bg-amber-400/20 rounded-full blur-3xl"></div>
                            <div className="absolute -top-3 left-1/2 -translate-x-1/2 bg-gradient-to-r from-amber-400 to-amber-600 text-stone-primary text-xs font-bold px-4 py-1 rounded-full">GOLD VERIFIED™</div>
                            <h3 className="font-bold text-amber-400 mb-1">Gold</h3>
                            <div className="flex items-baseline mb-4">
                                <span className="text-4xl font-black text-amber-400">₹{getPrice(1999)}</span>
                                <span className="text-white/50 ml-2 text-sm">{getPriceLabel()}</span>
                            </div>
                            <p className="text-xs text-white/60 mb-6 pb-4 border-b border-white/10">For established enterprises</p>
                            <ul className="space-y-3 text-sm text-white/80 flex-grow">
                                <li className="flex items-start gap-2">🏆 Unlimited listings</li>
                                <li className="flex items-start gap-2 text-amber-300 font-medium">🏆 Gold Verified™ badge</li>
                                <li className="flex items-start gap-2">🏆 Yard audit included (₹5K value)</li>
                                <li className="flex items-start gap-2">🏆 Featured in Flash Spec</li>
                                <li className="flex items-start gap-2">🏆 Demand intelligence</li>
                                <li className="flex items-start gap-2 text-violet-300 font-medium">🤖 AI Fast Listing</li>
                                <li className="flex items-start gap-2 text-violet-300 font-medium">🤖 AI Photo Enhancer</li>
                                <li className="flex items-start gap-2 text-violet-300 font-medium">🤖 AI Price Optimizer</li>
                                <li className="flex items-start gap-2 text-violet-300 font-medium">🤖 AI Lead Scorer</li>
                            </ul>
                            <button onClick={() => handlePlanSelect('Seller Gold')} className="w-full mt-8 bg-gradient-to-r from-amber-400 to-amber-600 text-stone-primary py-3.5 rounded-xl font-bold hover:from-amber-500 hover:to-amber-700 transition-all shadow-lg">
                                Go Gold — ₹{getPrice(1999)}{getPriceLabel()}
                            </button>
                        </div>
                    </div>

                    {/* AI Features Highlight */}
                    <div className="bg-gradient-to-r from-violet-100 to-purple-100 border border-violet-200 rounded-2xl p-6">
                        <div className="flex items-center gap-3 mb-3">
                            <div className="w-10 h-10 bg-violet-500 rounded-xl flex items-center justify-center">
                                <SparklesIcon className="h-5 w-5 text-white" />
                            </div>
                            <h3 className="font-bold text-violet-800">AI-Powered Selling Tools</h3>
                        </div>
                        <div className="grid md:grid-cols-4 gap-4 text-sm">
                            <div className="bg-white/60 rounded-xl p-4">
                                <p className="font-bold text-violet-700 mb-1">📸 AI Fast Listing</p>
                                <p className="text-violet-600 text-xs">Photo → auto-fill name, type, specs. List 10x faster</p>
                            </div>
                            <div className="bg-white/60 rounded-xl p-4">
                                <p className="font-bold text-violet-700 mb-1">✨ AI Photo Enhancer</p>
                                <p className="text-violet-600 text-xs">Auto-enhance product photos for professional look</p>
                            </div>
                            <div className="bg-white/60 rounded-xl p-4">
                                <p className="font-bold text-violet-700 mb-1">💰 AI Price Optimizer</p>
                                <p className="text-violet-600 text-xs">Competitive pricing suggestions based on market</p>
                            </div>
                            <div className="bg-white/60 rounded-xl p-4">
                                <p className="font-bold text-violet-700 mb-1">🎯 AI Lead Scorer</p>
                                <p className="text-violet-600 text-xs">Prioritize inquiries with highest conversion potential</p>
                            </div>
                        </div>
                    </div>

                    {/* ROI */}
                    <div className="bg-amber-50 border border-amber-200 rounded-2xl p-6 text-center">
                        <p className="text-amber-800 font-medium">
                            💰 <b>Gold sellers get 3x more leads</b> — One deal pays for your entire year!
                        </p>
                    </div>
                </div>
            )}

            {/* Feature Comparison */}
            <div className="mt-16">
                <h2 className="text-2xl font-black text-center text-stone-primary mb-8">Compare All Features</h2>
                <div className="overflow-x-auto">
                    <table className="w-full text-sm">
                        <thead>
                            <tr className="border-b-2 border-stone-accent/20">
                                <th className="text-left py-4 px-4 font-bold text-stone-primary">Feature</th>
                                <th className="text-center py-4 px-4 font-bold text-stone-secondary">Lite</th>
                                <th className="text-center py-4 px-4 font-bold text-emerald-600">Pro</th>
                                <th className="text-center py-4 px-4 font-bold text-amber-600">Elite/Gold</th>
                            </tr>
                        </thead>
                        <tbody className="divide-y divide-stone-accent/10">
                            <tr className="bg-stone-light/30">
                                <td className="py-3 px-4 font-medium" colSpan={4}>📦 Core Features</td>
                            </tr>
                            <tr><td className="py-3 px-4">Browse & Search</td><td className="text-center">✅</td><td className="text-center">✅</td><td className="text-center">✅</td></tr>
                            <tr><td className="py-3 px-4">Sample Ordering</td><td className="text-center">8% fee</td><td className="text-center text-emerald-600 font-bold">5% fee</td><td className="text-center text-emerald-600 font-bold">5% fee</td></tr>
                            <tr><td className="py-3 px-4">Seller Contact</td><td className="text-center">❌</td><td className="text-center">Unlimited</td><td className="text-center">Unlimited + Priority</td></tr>
                            <tr className="bg-stone-light/30">
                                <td className="py-3 px-4 font-medium" colSpan={4}>🤖 AI Features</td>
                            </tr>
                            <tr><td className="py-3 px-4">AI Stone Matcher</td><td className="text-center">❌</td><td className="text-center">✅</td><td className="text-center">✅</td></tr>
                            <tr><td className="py-3 px-4">AI Price Alerts</td><td className="text-center">❌</td><td className="text-center">✅</td><td className="text-center">✅</td></tr>
                            <tr><td className="py-3 px-4">AI Quote Generator</td><td className="text-center">❌</td><td className="text-center">❌</td><td className="text-center">✅</td></tr>
                            <tr className="bg-stone-light/30">
                                <td className="py-3 px-4 font-medium" colSpan={4}>📊 Premium</td>
                            </tr>
                            <tr><td className="py-3 px-4">Audit Reports</td><td className="text-center">❌</td><td className="text-center">5/month</td><td className="text-center font-bold text-amber-600">10/month</td></tr>
                            <tr><td className="py-3 px-4">Priority Lock</td><td className="text-center">❌</td><td className="text-center">❌</td><td className="text-center">✅</td></tr>
                            <tr><td className="py-3 px-4">Project Dashboard</td><td className="text-center">❌</td><td className="text-center">❌</td><td className="text-center">✅</td></tr>
                        </tbody>
                    </table>
                </div>
            </div>

            {/* FAQ */}
            <div className="mt-16 bg-stone-light/50 rounded-3xl p-8">
                <h2 className="text-2xl font-black text-center text-stone-primary mb-8">Common Questions</h2>
                <div className="grid md:grid-cols-2 gap-6 max-w-4xl mx-auto">
                    <div className="bg-white p-5 rounded-2xl">
                        <h4 className="font-bold text-stone-primary mb-2">What's the platform fee?</h4>
                        <p className="text-sm text-stone-secondary">Only on sample orders. Pro/Elite = 5%, Lite = 8%. No fees on direct deals you close off-platform.</p>
                    </div>
                    <div className="bg-white p-5 rounded-2xl">
                        <h4 className="font-bold text-stone-primary mb-2">How does yearly billing work?</h4>
                        <p className="text-sm text-stone-secondary">Pay upfront for 12 months and save 20%. That's 2.4 months free!</p>
                    </div>
                    <div className="bg-white p-5 rounded-2xl">
                        <h4 className="font-bold text-stone-primary mb-2">What's AI Stone Matcher?</h4>
                        <p className="text-sm text-stone-secondary">Upload any photo and our AI finds visually similar stones from 10K+ listings. Works offline too!</p>
                    </div>
                    <div className="bg-white p-5 rounded-2xl">
                        <h4 className="font-bold text-stone-primary mb-2">Can I cancel anytime?</h4>
                        <p className="text-sm text-stone-secondary">Yes! No contracts, no lock-in. Cancel with one click and keep access till period ends.</p>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default PricingPage;
