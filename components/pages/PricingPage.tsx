'use client';

import React, { useState } from 'react';
import { ShieldIcon, SparklesIcon } from '@/components/IconComponents';
import type { Page } from '@/lib/navigation';

interface PricingPageProps {
    navigateTo: (page: Page) => void;
}

const PricingPage: React.FC<PricingPageProps> = ({ navigateTo }) => {
    const [billingPeriod, setBillingPeriod] = useState<'monthly' | 'annual'>('annual');

    const getPrice = (monthly: number) => {
        if (billingPeriod === 'annual') return Math.round(monthly * 0.8);
        return monthly;
    };

    const plans = [
        {
            name: 'Starter',
            tagline: 'For new sellers testing the market',
            price: 0,
            priceLabel: 'Free Forever',
            commission: '5%',
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
                { text: 'Dedicated account manager', included: false },
            ],
        },
        {
            name: 'Pro',
            tagline: 'For growing sellers & factories',
            price: getPrice(4999),
            priceLabel: `₹${getPrice(4999).toLocaleString('en-IN')}/mo`,
            commission: '3%',
            highlight: true,
            badge: 'Most Popular',
            features: [
                { text: 'Unlimited product listings', included: true },
                { text: 'Verified seller badge', included: true },
                { text: 'Sample + bulk order processing', included: true },
                { text: 'WhatsApp + in-app messaging', included: true },
                { text: 'GST invoice support', included: true },
                { text: 'RFQ marketplace access', included: true },
                { text: 'Priority listing placement', included: true },
                { text: 'Advanced analytics dashboard', included: true },
                { text: 'Dedicated account manager', included: false },
            ],
        },
        {
            name: 'Enterprise',
            tagline: 'For large quarries & manufacturers',
            price: getPrice(14999),
            priceLabel: `₹${getPrice(14999).toLocaleString('en-IN')}/mo`,
            commission: '1.5%',
            highlight: false,
            features: [
                { text: 'Unlimited product listings', included: true },
                { text: 'Quarry-Direct verification badge', included: true },
                { text: 'All order types + escrow support', included: true },
                { text: 'Omnichannel messaging', included: true },
                { text: 'GST + custom invoicing', included: true },
                { text: 'Priority RFQ access (first to quote)', included: true },
                { text: 'Homepage featured placement', included: true },
                { text: 'Real-time analytics + reports', included: true },
                { text: 'Dedicated account manager', included: true },
            ],
        },
    ];

    return (
        <div className="py-12 lg:py-20">
            <div className="container mx-auto px-4 max-w-6xl">
                {/* Header */}
                <div className="text-center mb-12">
                    <div className="inline-flex items-center gap-2 bg-stone-accent/10 px-4 py-1.5 rounded-full text-xs font-black uppercase tracking-widest text-stone-accent mb-6">
                        Seller Plans
                    </div>
                    <h1 className="text-4xl lg:text-5xl font-black text-stone-primary mb-4">
                        Sell More, Pay Less
                    </h1>
                    <p className="text-stone-secondary text-lg max-w-2xl mx-auto">
                        Start free. Upgrade when you grow. Lowest commission rates in the industry.
                    </p>
                </div>

                {/* Billing toggle */}
                <div className="flex items-center justify-center gap-4 mb-12">
                    <span className={`text-sm font-bold ${billingPeriod === 'monthly' ? 'text-stone-primary' : 'text-stone-secondary'}`}>Monthly</span>
                    <button
                        onClick={() => setBillingPeriod(prev => prev === 'monthly' ? 'annual' : 'monthly')}
                        className={`relative w-14 h-7 rounded-full transition-colors ${billingPeriod === 'annual' ? 'bg-emerald-500' : 'bg-stone-secondary/30'}`}
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
                    {plans.map((plan) => (
                        <div
                            key={plan.name}
                            className={`relative rounded-3xl p-8 transition-all ${plan.highlight
                                    ? 'bg-stone-primary text-white shadow-2xl scale-[1.02] ring-2 ring-stone-accent'
                                    : 'bg-white border border-stone-accent/10 shadow-sm'
                                }`}
                        >
                            {plan.badge && (
                                <span className="absolute -top-3 left-1/2 -translate-x-1/2 bg-stone-accent text-stone-primary text-xs font-black px-4 py-1 rounded-full">
                                    {plan.badge}
                                </span>
                            )}

                            <h3 className="text-xl font-black mb-1">{plan.name}</h3>
                            <p className={`text-sm mb-6 ${plan.highlight ? 'text-white/60' : 'text-stone-secondary'}`}>{plan.tagline}</p>

                            <div className="mb-2">
                                <span className="text-4xl font-black">{plan.price === 0 ? 'Free' : plan.priceLabel}</span>
                            </div>
                            <p className={`text-sm mb-8 ${plan.highlight ? 'text-stone-accent' : 'text-stone-accent font-bold'}`}>
                                {plan.commission} commission on orders
                            </p>

                            <button
                                onClick={() => navigateTo('register')}
                                className={`w-full py-4 rounded-2xl font-bold text-lg transition-all mb-8 ${plan.highlight
                                        ? 'bg-stone-accent text-stone-primary hover:bg-white'
                                        : 'bg-stone-primary text-white hover:bg-stone-secondary'
                                    }`}
                            >
                                {plan.price === 0 ? 'Start Free' : 'Start 14-Day Trial'}
                            </button>

                            <ul className="space-y-3">
                                {plan.features.map((feature) => (
                                    <li key={feature.text} className="flex items-start gap-3 text-sm">
                                        <span className={`mt-0.5 flex-shrink-0 ${feature.included ? 'text-emerald-400' : (plan.highlight ? 'text-white/20' : 'text-stone-secondary/30')}`}>
                                            {feature.included ? '✓' : '—'}
                                        </span>
                                        <span className={feature.included ? '' : (plan.highlight ? 'text-white/30' : 'text-stone-secondary/40')}>
                                            {feature.text}
                                        </span>
                                    </li>
                                ))}
                            </ul>
                        </div>
                    ))}
                </div>

                {/* Buyer section */}
                <div className="mt-16 bg-stone-light rounded-3xl p-8 lg:p-12 text-center">
                    <h2 className="text-3xl font-black text-stone-primary mb-4">For Buyers: It&apos;s Always Free</h2>
                    <p className="text-stone-secondary max-w-2xl mx-auto mb-8">
                        Browse products, order samples, submit RFQs, compare prices, and chat with sellers — all at zero cost. We only charge sellers.
                    </p>
                    <div className="grid grid-cols-2 md:grid-cols-4 gap-4 max-w-3xl mx-auto">
                        {[
                            { icon: '🔍', text: 'Unlimited Browsing' },
                            { icon: '📦', text: 'Sample Orders' },
                            { icon: '📝', text: 'Submit RFQs' },
                            { icon: '💬', text: 'WhatsApp Support' },
                        ].map(item => (
                            <div key={item.text} className="bg-white p-4 rounded-2xl text-center">
                                <span className="text-2xl mb-2 block">{item.icon}</span>
                                <span className="text-xs font-bold text-stone-primary">{item.text}</span>
                            </div>
                        ))}
                    </div>
                </div>

                {/* Revenue Model Transparency */}
                <div className="mt-16">
                    <h2 className="text-3xl font-black text-center text-stone-primary mb-10">How We Make Money</h2>
                    <div className="grid md:grid-cols-3 gap-6">
                        <div className="bg-white p-6 rounded-2xl border border-stone-accent/5 text-center">
                            <div className="w-12 h-12 bg-stone-accent/20 rounded-xl flex items-center justify-center mx-auto mb-4">
                                <ShieldIcon className="h-6 w-6 text-stone-accent" />
                            </div>
                            <h3 className="font-bold mb-2">Seller Subscriptions</h3>
                            <p className="text-stone-secondary text-sm">Pro & Enterprise sellers pay a monthly fee for premium features and lower commission rates.</p>
                        </div>
                        <div className="bg-white p-6 rounded-2xl border border-stone-accent/5 text-center">
                            <div className="w-12 h-12 bg-emerald-100 rounded-xl flex items-center justify-center mx-auto mb-4">
                                <span className="text-xl">💰</span>
                            </div>
                            <h3 className="font-bold mb-2">Transaction Commission</h3>
                            <p className="text-stone-secondary text-sm">A small 1.5-5% commission on orders processed through StoneTrade. Lower rate for higher plans.</p>
                        </div>
                        <div className="bg-white p-6 rounded-2xl border border-stone-accent/5 text-center">
                            <div className="w-12 h-12 bg-blue-100 rounded-xl flex items-center justify-center mx-auto mb-4">
                                <SparklesIcon className="h-6 w-6 text-blue-600" />
                            </div>
                            <h3 className="font-bold mb-2">Promoted Listings</h3>
                            <p className="text-stone-secondary text-sm">Sellers can boost their products to appear at the top of search results and homepage features.</p>
                        </div>
                    </div>
                </div>

                {/* FAQ */}
                <div className="mt-16 max-w-3xl mx-auto">
                    <h2 className="text-3xl font-black text-center text-stone-primary mb-10">Common Questions</h2>
                    <div className="space-y-4">
                        {[
                            { q: 'Can I start selling without paying anything?', a: 'Yes! The Starter plan is free forever. List up to 10 products, process sample orders, and receive WhatsApp enquiries — all at zero cost.' },
                            { q: 'When should I upgrade to Pro?', a: 'When you need unlimited listings, RFQ marketplace access, or want priority placement. Most sellers upgrade after their first 5 orders on the platform.' },
                            { q: 'What is the commission on? Sample or bulk?', a: 'Commission only applies on orders processed through StoneTrade payment gateway. Deals you close directly via WhatsApp or offline don\'t incur any commission.' },
                            { q: 'Do buyers pay anything?', a: 'Never. Browsing, comparing, submitting RFQs, and messaging sellers is 100% free for buyers.' },
                            { q: 'Can I cancel my subscription?', a: 'Yes, cancel anytime. Your existing listings stay active until the end of your paid period. You can always downgrade to the free Starter plan.' },
                        ].map(faq => (
                            <details key={faq.q} className="bg-white rounded-2xl border border-stone-accent/5 group">
                                <summary className="p-5 font-bold cursor-pointer hover:text-stone-accent transition-colors list-none flex items-center justify-between">
                                    {faq.q}
                                    <span className="text-stone-accent group-open:rotate-45 transition-transform text-xl">+</span>
                                </summary>
                                <p className="px-5 pb-5 text-stone-secondary text-sm leading-relaxed">{faq.a}</p>
                            </details>
                        ))}
                    </div>
                </div>
            </div>
        </div>
    );
};

export default PricingPage;
