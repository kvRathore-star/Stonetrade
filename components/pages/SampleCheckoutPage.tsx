'use client';

import React, { useState } from 'react';
import { useSampleOrder } from '@/contexts/SampleOrderContext';
import { useAuth, PRICING } from '@/contexts/AuthContext';
import { ShieldIcon, TruckIcon, XIcon, StarIcon } from '@/components/IconComponents';
import type { Page } from '@/lib/navigation';

interface SampleCheckoutPageProps {
    navigateTo: (page: Page) => void;
}

const SampleCheckoutPage: React.FC<SampleCheckoutPageProps> = ({ navigateTo }) => {
    const { cart, removeFromCart, getCartTotal, placeOrder } = useSampleOrder();
    const { user } = useAuth();
    const [step, setStep] = useState<'cart' | 'address' | 'confirm'>('cart');

    const buyerTier = user?.buyerTier || null;
    const isPro = buyerTier === 'pro';

    const [address, setAddress] = useState({
        name: user?.name || '',
        phone: user?.phone || '',
        email: user?.email || '',
        address: '',
        city: '',
        state: '',
        pincode: '',
    });

    const totals = getCartTotal(buyerTier);
    const displayFeePercent = Math.round(totals.feePercent * 100);

    const handlePlaceOrder = () => {
        const buyerId = user?.id || 'guest';
        const order = placeOrder(address, buyerId, buyerTier);
        alert(`Order ${order.id} placed successfully! Total: ₹${order.total}`);
        if (user) {
            navigateTo('buyerDashboard');
        } else {
            navigateTo('home');
        }
    };

    if (cart.length === 0) {
        return (
            <div className="max-w-4xl mx-auto py-20 text-center">
                <div className="bg-stone-light rounded-[3rem] p-16">
                    <TruckIcon className="h-16 w-16 text-stone-accent mx-auto mb-6" />
                    <h2 className="text-3xl font-black text-stone-primary mb-4">Your Sample Cart is Empty</h2>
                    <p className="text-stone-secondary mb-8">Browse products and order samples to inspect quality.</p>
                    <button
                        onClick={() => navigateTo('products')}
                        className="bg-stone-primary text-white px-8 py-4 rounded-2xl font-bold hover:bg-stone-accent hover:text-stone-primary transition-colors"
                    >
                        Browse Products
                    </button>
                </div>
            </div>
        );
    }

    return (
        <div className="max-w-5xl mx-auto pb-24">
            <h1 className="text-5xl font-black text-stone-primary mb-2 tracking-tight">Sample Checkout</h1>
            <p className="text-stone-secondary mb-6">Order samples to verify quality before bulk purchase</p>

            {/* Pro Upgrade Banner for non-Pro users */}
            {!isPro && (
                <div className="bg-gradient-to-r from-amber-50 to-orange-50 border border-amber-200 rounded-2xl p-4 mb-8 flex items-center justify-between">
                    <div className="flex items-center gap-3">
                        <StarIcon className="h-6 w-6 text-amber-500" />
                        <div>
                            <p className="font-bold text-stone-primary">Upgrade to Buyer Pro for only 5% fee!</p>
                            <p className="text-sm text-stone-secondary">You're paying {displayFeePercent}%. Pro members save 3% on every order.</p>
                        </div>
                    </div>
                    <button
                        onClick={() => navigateTo('pricing')}
                        className="bg-amber-500 text-white px-4 py-2 rounded-xl font-bold text-sm hover:bg-amber-600 transition-colors whitespace-nowrap"
                    >
                        Get Pro @ ₹299/mo
                    </button>
                </div>
            )}

            {/* Progress Steps */}
            <div className="flex items-center gap-4 mb-12">
                {['cart', 'address', 'confirm'].map((s, i) => (
                    <React.Fragment key={s}>
                        <button
                            onClick={() => setStep(s as any)}
                            className={`flex items-center gap-2 px-6 py-3 rounded-xl font-bold text-sm transition-colors ${step === s ? 'bg-stone-primary text-white' : 'bg-stone-light text-stone-secondary'}`}
                        >
                            <span className="w-6 h-6 rounded-full bg-current/20 flex items-center justify-center text-xs">
                                {i + 1}
                            </span>
                            {s.charAt(0).toUpperCase() + s.slice(1)}
                        </button>
                        {i < 2 && <div className="flex-1 h-0.5 bg-stone-light" />}
                    </React.Fragment>
                ))}
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-3 gap-10">
                {/* Main Content */}
                <div className="lg:col-span-2">
                    {step === 'cart' && (
                        <div className="bg-white rounded-[2.5rem] p-8 shadow-sm border border-stone-accent/10">
                            <h2 className="text-2xl font-black mb-6">Sample Items</h2>
                            <div className="space-y-6">
                                {cart.map(item => (
                                    <div key={item.product.id} className="flex gap-6 p-4 bg-stone-light/30 rounded-2xl">
                                        <img src={item.product.images[0]} alt={item.product.name} className="w-24 h-24 rounded-xl object-cover" />
                                        <div className="flex-1">
                                            <h3 className="font-bold text-lg">{item.product.name}</h3>
                                            <p className="text-stone-secondary text-sm">{item.product.stoneType} • {item.product.origin}</p>
                                            <p className="text-stone-accent font-bold mt-2">Sample: ₹{item.samplePrice}</p>
                                        </div>
                                        <button onClick={() => removeFromCart(item.product.id)} className="p-2 text-red-500 hover:bg-red-50 rounded-full self-start">
                                            <XIcon className="h-5 w-5" />
                                        </button>
                                    </div>
                                ))}
                            </div>
                            <button onClick={() => setStep('address')} className="w-full mt-8 bg-stone-primary text-white py-4 rounded-2xl font-bold hover:bg-stone-accent hover:text-stone-primary transition-colors">
                                Continue to Address
                            </button>
                        </div>
                    )}

                    {step === 'address' && (
                        <div className="bg-white rounded-[2.5rem] p-8 shadow-sm border border-stone-accent/10">
                            <h2 className="text-2xl font-black mb-6">
                                {user ? 'Delivery Address' : 'Guest Checkout'}
                            </h2>
                            {!user && (
                                <p className="text-stone-secondary text-sm mb-4">
                                    No account needed! Enter your details below.
                                </p>
                            )}
                            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                                <input type="text" placeholder="Full Name *" value={address.name} onChange={(e) => setAddress({ ...address, name: e.target.value })} className="bg-stone-light/50 p-4 rounded-xl border-none outline-none font-medium" required />
                                <input type="tel" placeholder="Phone Number *" value={address.phone} onChange={(e) => setAddress({ ...address, phone: e.target.value })} className="bg-stone-light/50 p-4 rounded-xl border-none outline-none font-medium" required />
                                {!user && (
                                    <input type="email" placeholder="Email Address *" value={address.email} onChange={(e) => setAddress({ ...address, email: e.target.value })} className="md:col-span-2 bg-stone-light/50 p-4 rounded-xl border-none outline-none font-medium" required />
                                )}
                                <textarea placeholder="Full Address *" value={address.address} onChange={(e) => setAddress({ ...address, address: e.target.value })} className="md:col-span-2 bg-stone-light/50 p-4 rounded-xl border-none outline-none font-medium h-24 resize-none" required />
                                <input type="text" placeholder="City *" value={address.city} onChange={(e) => setAddress({ ...address, city: e.target.value })} className="bg-stone-light/50 p-4 rounded-xl border-none outline-none font-medium" required />
                                <input type="text" placeholder="State *" value={address.state} onChange={(e) => setAddress({ ...address, state: e.target.value })} className="bg-stone-light/50 p-4 rounded-xl border-none outline-none font-medium" required />
                                <input type="text" placeholder="Pincode *" value={address.pincode} onChange={(e) => setAddress({ ...address, pincode: e.target.value })} className="bg-stone-light/50 p-4 rounded-xl border-none outline-none font-medium" required />
                            </div>
                            <div className="flex gap-4 mt-8">
                                <button onClick={() => setStep('cart')} className="flex-1 border-2 border-stone-primary text-stone-primary py-4 rounded-2xl font-bold hover:bg-stone-light transition-colors">Back</button>
                                <button onClick={() => setStep('confirm')} className="flex-1 bg-stone-primary text-white py-4 rounded-2xl font-bold hover:bg-stone-accent hover:text-stone-primary transition-colors">Review Order</button>
                            </div>
                        </div>
                    )}

                    {step === 'confirm' && (
                        <div className="bg-white rounded-[2.5rem] p-8 shadow-sm border border-stone-accent/10">
                            <h2 className="text-2xl font-black mb-6">Confirm Order</h2>
                            <div className="bg-stone-light/30 p-6 rounded-2xl mb-6">
                                <h3 className="font-bold text-sm text-stone-secondary mb-2">DELIVERY ADDRESS</h3>
                                <p className="font-bold">{address.name}</p>
                                <p className="text-sm text-stone-secondary">{address.phone} {address.email && `• ${address.email}`}</p>
                                <p className="text-sm">{address.address}, {address.city}, {address.state} - {address.pincode}</p>
                            </div>
                            <div className="space-y-3 mb-6">
                                {cart.map(item => (
                                    <div key={item.product.id} className="flex justify-between items-center text-sm">
                                        <span>{item.product.name}</span>
                                        <span className="font-bold">₹{item.samplePrice}</span>
                                    </div>
                                ))}
                            </div>
                            <button onClick={handlePlaceOrder} className="w-full bg-stone-accent text-stone-primary py-5 rounded-2xl font-black text-lg hover:bg-stone-primary hover:text-white transition-colors">
                                Place Order • ₹{totals.total}
                            </button>
                        </div>
                    )}
                </div>

                {/* Order Summary */}
                <div className="lg:col-span-1">
                    <div className="bg-stone-primary text-white rounded-[2.5rem] p-8 sticky top-24">
                        <h3 className="text-lg font-bold mb-6">Order Summary</h3>
                        <div className="space-y-4 text-sm">
                            <div className="flex justify-between">
                                <span className="opacity-60">Sample Subtotal</span>
                                <span className="font-bold">₹{totals.subtotal}</span>
                            </div>
                            <div className="flex justify-between items-center">
                                <span className="opacity-60 flex items-center gap-1">
                                    Platform Fee ({displayFeePercent}%)
                                    {!isPro && <span className="text-[9px] bg-amber-400/30 text-amber-300 px-1.5 py-0.5 rounded">Pro: 5%</span>}
                                </span>
                                <span className="font-bold text-stone-accent">₹{totals.platformFee}</span>
                            </div>
                            <div className="flex justify-between">
                                <span className="opacity-60">Shipping (Est.)</span>
                                <span className="font-bold">₹{totals.shipping}</span>
                            </div>
                            <div className="border-t border-white/20 pt-4 mt-4">
                                <div className="flex justify-between text-xl">
                                    <span className="font-bold">Total</span>
                                    <span className="font-black text-stone-accent">₹{totals.total}</span>
                                </div>
                            </div>
                        </div>
                        <div className="mt-8 p-4 bg-white/5 rounded-2xl border border-white/10">
                            <div className="flex items-center gap-2 text-stone-accent text-[10px] font-bold uppercase tracking-wider mb-2">
                                <ShieldIcon className="h-4 w-4" />
                                Platform Guarantee
                            </div>
                            <p className="text-[11px] text-white/60 leading-relaxed">
                                Sample quality verified. Full support if sample doesn't match listing.
                            </p>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default SampleCheckoutPage;
