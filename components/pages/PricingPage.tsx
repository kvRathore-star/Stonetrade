'use client';

import React, { useState } from 'react';
import { ShieldIcon, SparklesIcon } from '@/components/IconComponents';
import type { Page } from '@/lib/navigation';

interface PricingPageProps {
    navigateTo: (page: Page) => void;
}

const PricingPage: React.FC<PricingPageProps> = ({ navigateTo }) => {
    const [activeTab, setActiveTab] = useState<'buyer' | 'seller'>('buyer');
    const [billingPeriod, setBillingPeriod] = useState<'annual' | 'monthly'>('annual');

    const getPrice = (monthly: number) => {
        if (billingPeriod === 'annual') return Math.round(monthly * 0.8);
        return monthly;
    };

    type PlanFeature = { text: string; included: boolean; suffix?: string; isKey?: boolean; };
    type Plan = {
        name: string;
        tagline: string;
        price: number;
        priceLabel: string;
        badge?: string;
        highlight: boolean;
        features: PlanFeature[];
        cta: string;
    };

    const buyerPlans: Plan[] = [
        {
            name: 'Lite',
            tagline: 'Perfect for exploring the marketplace',
            price: 0,
            priceLabel: 'Free Forever',
            badge: '',
            highlight: false,
            features: [
                { text: 'Browse & Compare 10,000+ Listings', included: true },
                { text: 'Order physical samples', included: true },
                { text: 'Post bulk RFQs', included: true },
                { text: 'View Verified Sellers', included: true },
                { text: 'Direct Seller Contact', included: false },
                { text: 'WhatsApp direct access', included: false },
                { text: 'Warehouse Audit Reports', included: false },
                { text: 'AI Price Alerts', included: false },
            ],
            cta: 'Start Free'
        },
        {
            name: 'Pro',
            tagline: 'For professionals ordering regularly',
            price: getPrice(299),
            priceLabel: `₹${getPrice(299).toLocaleString('en-IN')}/mo`,
            badge: 'Most Popular',
            highlight: true,
            features: [
                { text: 'Browse & Compare 10,000+ Listings', included: true },
                { text: 'Order physical samples', included: true },
                { text: 'Post bulk RFQs', included: true },
                { text: 'View Verified Sellers', included: true },
                { text: '100 Seller Contacts / mo', included: true, isKey: true },
                { text: 'WhatsApp direct access', included: true, isKey: true },
                { text: '5 Warehouse Audit Reports/mo', included: true },
                { text: 'AI Price Alerts', included: true },
            ],
            cta: 'Unlock Pro Contacts'
        },
        {
            name: 'Elite',
            tagline: 'For high-volume buyers & firms',
            price: getPrice(499),
            priceLabel: `₹${getPrice(499).toLocaleString('en-IN')}/mo`,
            badge: '',
            highlight: false,
            features: [
                { text: 'Browse & Compare 10,000+ Listings', included: true },
                { text: 'Order physical samples', included: true },
                { text: 'Post bulk RFQs', included: true },
                { text: 'View Verified Sellers', included: true },
                { text: 'Unlimited Seller Contact (Priority)', included: true },
                { text: 'WhatsApp direct access', included: true },
                { text: '10 Warehouse Audit Reports/mo', included: true },
                { text: 'AI Project Cost Calculator', included: true },
            ],
            cta: 'Go Elite'
        },
    ];

    const sellerPlans: Plan[] = [
        {
            name: 'Starter',
            tagline: 'For new sellers testing the market',
            price: 0,
            priceLabel: 'Free Forever',
            badge: '',
            highlight: false,
            features: [
                { text: 'Up to 10 product listings', included: true },
                { text: 'Basic seller profile', included: true },
                { text: 'Sample order processing', included: true },
                { text: 'WhatsApp buyer enquiries', included: true },
                { text: 'GST invoice support', included: true },
                { text: 'RFQ marketplace access', included: false },
                { text: 'Priority listing placement', included: false },
                { text: 'Advanced analytics', included: false },
            ],
            cta: 'Start Selling Free'
        },
        {
            name: 'Pro',
            tagline: 'For growing sellers & factories',
            price: getPrice(999),
            priceLabel: `₹${getPrice(999).toLocaleString('en-IN')}/mo`,
            badge: 'Best Value',
            highlight: true,
            features: [
                { text: 'Up to 30 product listings', included: true },
                { text: 'Verified seller badge', included: true },
                { text: 'Sample + bulk order processing', included: true },
                { text: 'WhatsApp + in-app messaging', included: true },
                { text: 'GST invoice support', included: true },
                { text: 'AI Assisted Product Listings', included: true, isKey: true },
                { text: 'RFQ marketplace access', included: true, isKey: true },
                { text: 'Priority listing placement', included: true },
                { text: 'Advanced analytics dashboard', included: true },
            ],
            cta: 'Start 14-Day Trial'
        },
        {
            name: 'Enterprise',
            tagline: 'For large quarries & manufacturers',
            price: getPrice(2999),
            priceLabel: `₹${getPrice(2999).toLocaleString('en-IN')}/mo`,
            badge: '',
            highlight: false,
            features: [
                { text: 'Unlimited product listings', included: true },
                { text: 'Quarry-Direct verification badge', included: true },
                { text: 'All order types + escrow support', included: true },
                { text: 'Omnichannel messaging', included: true },
                { text: 'GST + custom invoicing', included: true },
                { text: 'AI Assisted Product Listings', included: true },
                { text: 'Priority RFQ access (first to quote)', included: true },
                { text: 'Homepage featured placement', included: true },
                { text: 'Real-time analytics + reports', included: true },
            ],
            cta: 'Contact Sales'
        },
    ];

    const activePlans = activeTab === 'buyer' ? buyerPlans : sellerPlans;

    return (
        <div className="py-12 lg:py-20">
            <div className="container mx-auto px-4 max-w-6xl">
                {/* Header */}
                <div className="text-center mb-10">
                    <h1 className="text-4xl lg:text-5xl font-black tracking-tight text-stone-primary mb-3">
                        Pricing Built for India
                    </h1>
                    <p className="text-lg text-stone-secondary max-w-xl mx-auto">
                        Simple, transparent. Choose how you want to use StoneTrade.
                    </p>
                </div>

                {/* Tab Toggle */}
                <div className="flex justify-center mb-8">
                    <div className="inline-flex bg-stone-light/50 rounded-2xl p-1.5 shadow-inner">
                        <button
                            onClick={() => setActiveTab('buyer')}
                            className={`px-8 py-3 rounded-xl font-bold transition-all ${activeTab === 'buyer'
                                ? 'bg-white text-stone-primary shadow-lg ring-1 ring-stone-accent/10'
                                : 'text-stone-secondary hover:text-stone-primary'
                                }`}
                        >
                            👷 Buyers & Architects
                        </button>
                        <button
                            onClick={() => setActiveTab('seller')}
                            className={`px-8 py-3 rounded-xl font-bold transition-all ${activeTab === 'seller'
                                ? 'bg-white text-stone-primary shadow-lg ring-1 ring-emerald-500/10'
                                : 'text-stone-secondary hover:text-stone-primary'
                                }`}
                        >
                            🏭 Sellers & Factories
                        </button>
                    </div>
                </div>

                {/* Billing toggle */}
                <div className="flex items-center justify-center gap-4 mb-12">
                    <span className={`text-sm font-bold ${billingPeriod === 'monthly' ? 'text-stone-primary' : 'text-stone-secondary'}`}>Monthly</span>
                    <button
                        onClick={() => setBillingPeriod(prev => prev === 'monthly' ? 'annual' : 'monthly')}
                        className={`relative w-14 h-7 rounded-full transition-colors ${billingPeriod === 'annual' ? (activeTab === 'buyer' ? 'bg-stone-accent' : 'bg-emerald-500') : 'bg-stone-secondary/30'}`}
                        aria-label="Toggle billing period"
                    >
                        <span className={`absolute top-0.5 w-6 h-6 bg-white rounded-full shadow-md transition-transform ${billingPeriod === 'annual' ? 'translate-x-7' : 'translate-x-0.5'}`} />
                    </button>
                    <span className={`text-sm font-bold ${billingPeriod === 'annual' ? 'text-stone-primary' : 'text-stone-secondary'}`}>
                        Annual <span className="text-emerald-600 text-xs">(Save 20%)</span>
                    </span>
                </div>

                {/* Plans */}
                <div className="grid md:grid-cols-3 gap-6 lg:gap-8">
                    {activePlans.map((plan) => (
                        <div
                            key={plan.name}
                            className={`relative rounded-3xl p-8 transition-all flex flex-col ${plan.highlight
                                ? `bg-stone-primary text-white shadow-2xl scale-[1.02] ring-2 ${activeTab === 'seller' ? 'ring-emerald-500' : 'ring-stone-accent'}`
                                : 'bg-white border border-stone-accent/10 shadow-sm'
                                }`}
                        >
                            {plan.badge && (
                                <span className={`absolute -top-3 left-1/2 -translate-x-1/2 text-xs font-black px-4 py-1 rounded-full ${activeTab === 'seller' ? 'bg-emerald-500 text-white' : 'bg-stone-accent text-stone-primary'}`}>
                                    {plan.badge}
                                </span>
                            )}

                            <h3 className="text-xl font-black mb-1">{plan.name}</h3>
                            <p className={`text-sm mb-6 pb-6 border-b ${plan.highlight ? 'text-white/60 border-white/10' : 'text-stone-secondary border-stone-accent/10'}`}>{plan.tagline}</p>

                            <div className="mb-6">
                                <span className="text-4xl font-black">{plan.price === 0 ? 'Free' : plan.priceLabel}</span>
                            </div>

                            <ul className="space-y-4 flex-grow mb-8">
                                {plan.features.map((feature, idx) => (
                                    <li key={idx} className="flex items-start gap-3 text-sm">
                                        <span className={`mt-0.5 flex-shrink-0 ${feature.included ? (activeTab === 'seller' && plan.highlight ? 'text-emerald-400' : 'text-emerald-500') : (plan.highlight ? 'text-white/20' : 'text-stone-secondary/30')}`}>
                                            {feature.included ? '✓' : '—'}
                                        </span>
                                        <span className={`flex-1 ${feature.included ? (feature.isKey ? 'font-bold' : '') : (plan.highlight ? 'text-white/30' : 'text-stone-secondary/40')}`}>
                                            {feature.text}
                                            {feature.suffix && (
                                                <span className={`ml-2 text-[10px] px-2 py-0.5 rounded-full font-bold ${plan.highlight ? 'bg-white/20 text-white' : 'bg-stone-accent/20 text-stone-secondary'}`}>
                                                    {feature.suffix}
                                                </span>
                                            )}
                                        </span>
                                    </li>
                                ))}
                            </ul>

                            <button
                                onClick={() => navigateTo('register')}
                                className={`w-full py-4 rounded-2xl font-bold text-lg transition-all ${plan.highlight
                                    ? (activeTab === 'seller' ? 'bg-emerald-500 text-white hover:bg-emerald-600' : 'bg-stone-accent text-stone-primary hover:bg-white')
                                    : 'bg-stone-primary text-white hover:bg-stone-secondary'
                                    }`}
                            >
                                {plan.cta}
                            </button>
                        </div>
                    ))}
                </div>

                {/* Feature Comparison */}
                <div className="mt-20">
                    <h2 className="text-3xl font-black text-center text-stone-primary mb-10">Compare {activeTab === 'buyer' ? 'Buyer' : 'Seller'} Plans</h2>
                    <div className="overflow-x-auto bg-white rounded-3xl shadow-sm border border-stone-accent/10">
                        <table className="w-full text-sm">
                            <thead>
                                <tr className="border-b-2 border-stone-accent/20">
                                    <th className="text-left py-6 px-6 font-bold text-stone-primary text-base">Key Capabilities</th>
                                    {activePlans.map(plan => (
                                        <th key={plan.name} className={`text-center py-6 px-6 font-bold text-base ${plan.highlight ? (activeTab === 'seller' ? 'text-emerald-600' : 'text-stone-accent') : 'text-stone-primary'}`}>
                                            {plan.name}
                                        </th>
                                    ))}
                                </tr>
                            </thead>
                            <tbody className="divide-y divide-stone-accent/10">
                                {activeTab === 'buyer' ? (
                                    <>
                                        <tr className="bg-stone-light/30"><td colSpan={4} className="py-3 px-6 font-bold text-stone-primary">Marketplace Access</td></tr>
                                        <tr><td className="py-4 px-6">Browse 10K+ Listings</td><td className="text-center font-bold">Yes</td><td className="text-center font-bold">Yes</td><td className="text-center font-bold">Yes</td></tr>
                                        <tr><td className="py-4 px-6">Sample Orders</td><td className="text-center font-bold">Yes</td><td className="text-center font-bold text-emerald-600">Yes</td><td className="text-center font-bold text-emerald-600">Yes</td></tr>
                                        <tr><td className="py-4 px-6">Post RFQs</td><td className="text-center font-bold">Yes</td><td className="text-center font-bold">Yes</td><td className="text-center font-bold">Yes</td></tr>

                                        <tr className="bg-stone-light/30"><td colSpan={4} className="py-3 px-6 font-bold text-stone-primary">Seller Contact & Trust</td></tr>
                                        <tr><td className="py-4 px-6">Direct Seller Contact</td><td className="text-center text-stone-secondary">❌</td><td className="text-center font-bold text-emerald-600">100 / month</td><td className="text-center font-bold text-amber-600">Priority + Unlimited</td></tr>
                                        <tr><td className="py-4 px-6">Warehouse Audit Reports</td><td className="text-center text-stone-secondary">❌</td><td className="text-center font-bold text-emerald-600">5 / month</td><td className="text-center font-bold text-amber-600">10 / month</td></tr>
                                        <tr><td className="py-4 px-6">AI Price Alerts</td><td className="text-center text-stone-secondary">❌</td><td className="text-center font-bold">Yes</td><td className="text-center font-bold">Yes</td></tr>
                                    </>
                                ) : (
                                    <>
                                        <tr className="bg-stone-light/30"><td colSpan={4} className="py-3 px-6 font-bold text-stone-primary">Selling & Orders</td></tr>
                                        <tr><td className="py-4 px-6">Active Listings</td><td className="text-center font-bold">Up to 10</td><td className="text-center font-bold text-emerald-600">Up to 30</td><td className="text-center font-bold text-emerald-600">Unlimited</td></tr>
                                        <tr><td className="py-4 px-6">WhatsApp Inquiries</td><td className="text-center font-bold">Yes</td><td className="text-center font-bold">Yes</td><td className="text-center font-bold">Yes</td></tr>

                                        <tr className="bg-stone-light/30"><td colSpan={4} className="py-3 px-6 font-bold text-stone-primary">Premium Features</td></tr>
                                        <tr><td className="py-4 px-6">Bulk RFQ Market Access</td><td className="text-center text-stone-secondary">❌</td><td className="text-center font-bold text-emerald-600">Unlimited</td><td className="text-center font-bold text-emerald-600">Priority (First to quote)</td></tr>
                                        <tr><td className="py-4 px-6">Priority Search Placement</td><td className="text-center text-stone-secondary">❌</td><td className="text-center font-bold">Yes</td><td className="text-center font-bold">Featured</td></tr>
                                        <tr><td className="py-4 px-6">Quarry-Direct Badge</td><td className="text-center text-stone-secondary">❌</td><td className="text-center text-stone-secondary">❌</td><td className="text-center font-bold">Yes</td></tr>
                                    </>
                                )}
                            </tbody>
                        </table>
                    </div>
                </div>

                {/* FAQ */}
                <div className="mt-20 max-w-3xl mx-auto">
                    <h2 className="text-3xl font-black text-center text-stone-primary mb-10">Common Questions</h2>
                    <div className="space-y-4">
                        {[
                            { q: 'Why do buyers have to pay for seller contact?', a: 'By gating seller contacts to Pro buyers, we ensure our sellers only deal with serious, genuine inquiries. This eliminates spam and saves time for both parties. You can always order samples on the free plan!' },
                            { q: activeTab === 'seller' ? 'Can I start selling without paying anything?' : 'Can I use StoneTrade for free?', a: activeTab === 'seller' ? 'Yes! The Starter plan is free forever. List up to 10 products, process sample orders, and receive WhatsApp enquiries — all at zero cost.' : 'Absolutely. The Lite plan is free forever. You can browse all listings, submit bulk RFQs, and order physical samples.' },
                            { q: 'What is the limit on listings?', a: 'Sellers on Starter can list up to 10 products. Pro sellers can list up to 30 products. Enterprise sellers get unlimited listings and a dedicated Account Manager.' },
                            { q: 'Do you offer a free trial?', a: 'Yes, ALL Pro and Enterprise seller plans come with a 14-day free trial. You won\'t be billed if you cancel within the trial period.' },
                            { q: 'Can I cancel my subscription?', a: 'Yes, cancel anytime. Your existing listings stay active until the end of your paid period. You can always downgrade to the free Starter plan.' },
                        ].map(faq => (
                            <details key={faq.q} className="bg-white rounded-2xl border border-stone-accent/5 shadow-sm group">
                                <summary className="p-6 font-bold cursor-pointer hover:text-stone-accent transition-colors list-none flex items-center justify-between">
                                    {faq.q}
                                    <span className="text-stone-accent group-open:rotate-45 transition-transform text-2xl font-light leading-none">+</span>
                                </summary>
                                <p className="px-6 pb-6 text-stone-secondary text-sm leading-relaxed">{faq.a}</p>
                            </details>
                        ))}
                    </div>
                </div>
            </div>
        </div>
    );
};

export default PricingPage;
