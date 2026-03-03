'use client';

import React, { useState } from 'react';
import { Product } from '@/types';
import type { Page } from '@/lib/navigation';
import { ShieldIcon, TruckIcon, StarIcon, VerifiedIcon } from '@/components/IconComponents';

interface CheckoutPageProps {
    product: Product | null;
    navigateTo: (page: Page) => void;
}

const CheckoutPage: React.FC<CheckoutPageProps> = ({ product, navigateTo }) => {
    const [isProcessing, setIsProcessing] = useState(false);
    const isSubscription = !product;

    const handlePayment = (e: React.FormEvent) => {
        e.preventDefault();
        setIsProcessing(true);
        // Integrate Stripe.js here
        setTimeout(() => {
            setIsProcessing(false);
            alert(isSubscription ? "Subscription Activated!" : "Procurement Success!");
            navigateTo('buyerDashboard');
        }, 2000);
    };

    return (
        <div className="max-w-6xl mx-auto py-8 lg:py-16">
            <h1 className="text-4xl md:text-5xl font-black text-center mb-12 tracking-tighter">
                {isSubscription ? 'Activate Premium Access' : 'Secure Procurement'}
            </h1>
            
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-12">
                <div className="lg:col-span-5 space-y-6 order-2 lg:order-1">
                    <div className="bg-white p-10 rounded-[3rem] shadow-sm border border-stone-accent/10">
                        <h2 className="text-xl font-black mb-8 uppercase tracking-widest text-stone-accent">
                            {isSubscription ? 'Plan Summary' : 'Order Specification'}
                        </h2>
                        
                        {product ? (
                            <div className="flex gap-6 items-center mb-8 pb-8 border-b border-stone-light">
                                <img src={product.images[0]} alt={product.name} className="w-24 h-24 rounded-3xl object-cover shadow-xl" />
                                <div>
                                    <h3 className="font-black text-xl leading-tight">{product.name}</h3>
                                    <p className="text-stone-secondary text-sm font-bold uppercase tracking-widest mt-1">{product.stoneType}</p>
                                </div>
                            </div>
                        ) : (
                            <div className="flex gap-6 items-center mb-8 pb-8 border-b border-stone-light">
                                <div className="w-20 h-20 bg-stone-primary rounded-3xl flex items-center justify-center text-stone-accent">
                                    <StarIcon className="h-10 w-10" />
                                </div>
                                <div>
                                    <h3 className="font-black text-xl leading-tight">Buyer Pro Plan</h3>
                                    <p className="text-stone-secondary text-[10px] font-black uppercase tracking-widest mt-1">Monthly Billing</p>
                                </div>
                            </div>
                        )}
                        
                        <div className="space-y-4">
                            <div className="flex justify-between text-sm font-medium">
                                <span className="text-stone-secondary">{isSubscription ? 'Base Rate' : 'Material Rate'}</span>
                                <span className="font-black text-stone-primary">₹{isSubscription ? '499' : product?.price.toLocaleString()}</span>
                            </div>
                            {!isSubscription && (
                                <div className="flex justify-between text-sm font-medium">
                                    <span className="text-stone-secondary">Factory Loading Fee</span>
                                    <span className="font-black text-stone-primary">₹450</span>
                                </div>
                            )}
                            <div className="flex justify-between text-sm font-medium">
                                <span className="text-stone-secondary">Digital Platform Fee (18% GST)</span>
                                <span className="font-black text-stone-primary">₹{isSubscription ? '89' : ((product?.price || 0) * 0.18).toFixed(0)}</span>
                            </div>
                            <div className="pt-6 border-t border-stone-light flex justify-between items-center">
                                <span className="text-xl font-black">Total Amount</span>
                                <span className="text-3xl font-black text-stone-primary tracking-tighter">
                                    ₹{isSubscription ? '588' : ((product?.price || 0) * 1.18 + 450).toLocaleString()}
                                </span>
                            </div>
                        </div>
                    </div>

                    <div className="bg-stone-primary text-white p-8 rounded-[3rem] shadow-2xl">
                        <div className="flex gap-4 items-center">
                            <ShieldIcon className="h-10 w-10 text-stone-accent" />
                            <div>
                                <h4 className="font-bold text-sm">{isSubscription ? 'Buyer Protection' : 'Escrow Protected'}</h4>
                                <p className="text-[10px] text-stone-light/40 uppercase font-black tracking-widest mt-1">
                                    {isSubscription ? 'Cancel anytime via Dashboard.' : 'Funds held until material inspection.'}
                                </p>
                            </div>
                        </div>
                    </div>
                </div>

                <div className="lg:col-span-7 order-1 lg:order-2">
                    <div className="bg-white p-10 rounded-[4rem] shadow-sm border border-stone-accent/10">
                        <form onSubmit={handlePayment} className="space-y-8">
                            <div>
                                <h3 className="text-lg font-black mb-6">Account Details</h3>
                                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                                    <input required type="text" placeholder="Full Name" className="w-full bg-stone-light p-4 rounded-2xl border-none font-bold text-sm focus:ring-2 focus:ring-stone-accent outline-none" />
                                    <input required type="tel" placeholder="Mobile Number" className="w-full bg-stone-light p-4 rounded-2xl border-none font-bold text-sm focus:ring-2 focus:ring-stone-accent outline-none" />
                                </div>
                            </div>

                            <div>
                                <h3 className="text-lg font-black mb-6">Stripe Secure Payment</h3>
                                <div className="p-8 bg-stone-light rounded-3xl border border-stone-accent/10">
                                    <div className="flex items-center justify-between mb-6">
                                        <div className="flex items-center gap-3">
                                            <div className="w-12 h-8 bg-stone-primary rounded-md flex items-center justify-center font-bold text-[8px] text-white">VISA</div>
                                            <div className="w-12 h-8 bg-stone-primary rounded-md flex items-center justify-center font-bold text-[8px] text-white">M/C</div>
                                            <span className="font-black text-xs uppercase tracking-widest">Credit / Debit Card</span>
                                        </div>
                                        <VerifiedIcon className="h-6 w-6 text-blue-600" />
                                    </div>
                                    <div className="space-y-4">
                                        <input required type="text" placeholder="Card Number" className="w-full bg-white p-4 rounded-xl border border-stone-accent/10 outline-none" />
                                        <div className="grid grid-cols-2 gap-4">
                                            <input required type="text" placeholder="MM/YY" className="bg-white p-4 rounded-xl border border-stone-accent/10 outline-none" />
                                            <input required type="text" placeholder="CVV" className="bg-white p-4 rounded-xl border border-stone-accent/10 outline-none" />
                                        </div>
                                    </div>
                                </div>
                            </div>

                            <button 
                                type="submit" 
                                disabled={isProcessing}
                                className={`w-full py-6 rounded-2xl font-black text-xl shadow-2xl transition-all transform hover:-translate-y-1 ${isProcessing ? 'bg-stone-secondary cursor-not-allowed' : 'bg-stone-primary text-white hover:bg-stone-accent hover:text-stone-primary'}`}
                            >
                                {isProcessing ? 'Authenticating...' : isSubscription ? 'Confirm Subscription' : 'Finalize Procurement'}
                            </button>
                        </form>
                    </div>
                </div>
            </div>
             <div className="text-center mt-12">
                <button onClick={() => navigateTo('home')} className="text-xs font-black uppercase tracking-[0.2em] text-stone-secondary hover:text-stone-accent transition-colors">
                    &larr; Return to Workspace
                </button>
            </div>
        </div>
    );
};

export default CheckoutPage;
