'use client';

import React, { useState } from 'react';
import { ShieldIcon, ClockIcon, XIcon } from '@/components/IconComponents';
import { Product } from '@/types';

interface IntentLockModalProps {
    product: Product;
    isOpen: boolean;
    onClose: () => void;
    onLock: () => void;
}

const IntentLockModal: React.FC<IntentLockModalProps> = ({ product, isOpen, onClose, onLock }) => {
    const [agreed, setAgreed] = useState(false);
    const lockFee = 999;

    const handleLock = () => {
        if (agreed) {
            onLock();
            alert(`✅ Lot Locked! ${product.name} is held for you for 24 hours. Fee: ₹${lockFee}`);
            onClose();
        }
    };

    if (!isOpen) return null;

    return (
        <div className="fixed inset-0 z-[80] flex items-center justify-center bg-stone-primary/95 backdrop-blur-sm p-4">
            <div className="bg-white rounded-[3rem] w-full max-w-lg overflow-hidden shadow-2xl">
                {/* Header with glassmorphism */}
                <div className="bg-gradient-to-r from-amber-500 to-orange-600 p-8 relative overflow-hidden">
                    <div className="absolute inset-0 bg-white/10 backdrop-blur-sm" />
                    <button onClick={onClose} className="absolute top-6 right-6 p-2 hover:bg-white/20 rounded-full z-10">
                        <XIcon className="h-5 w-5 text-white" />
                    </button>
                    <div className="relative z-10 flex items-center gap-4">
                        <div className="w-16 h-16 bg-white/20 rounded-2xl flex items-center justify-center backdrop-blur-sm border border-white/30">
                            <ShieldIcon className="h-8 w-8 text-white" />
                        </div>
                        <div>
                            <h2 className="text-2xl font-black text-white">Priority Lock</h2>
                            <p className="text-white/80">Secure this lot for 24 hours</p>
                        </div>
                    </div>
                </div>

                <div className="p-8">
                    {/* Product Preview */}
                    <div className="flex gap-4 p-4 bg-stone-light/50 rounded-2xl mb-6">
                        <img src={product.images[0]} alt={product.name} className="w-20 h-20 rounded-xl object-cover" />
                        <div>
                            <h3 className="font-bold text-stone-primary">{product.name}</h3>
                            <p className="text-sm text-stone-secondary">{product.stoneType} • {product.origin}</p>
                            <p className="text-lg font-black text-stone-primary mt-1">₹{product.price}/{product.priceUnit}</p>
                        </div>
                    </div>

                    {/* Benefits */}
                    <div className="space-y-3 mb-6">
                        <div className="flex items-center gap-3 text-sm">
                            <span className="w-8 h-8 bg-amber-100 rounded-full flex items-center justify-center text-amber-600">✓</span>
                            <span><b>24-Hour Exclusive Hold</b> — No one else can buy</span>
                        </div>
                        <div className="flex items-center gap-3 text-sm">
                            <span className="w-8 h-8 bg-amber-100 rounded-full flex items-center justify-center text-amber-600">✓</span>
                            <span><b>Price Guaranteed</b> — Lock today's rate</span>
                        </div>
                        <div className="flex items-center gap-3 text-sm">
                            <span className="w-8 h-8 bg-amber-100 rounded-full flex items-center justify-center text-amber-600">✓</span>
                            <span><b>Direct Seller Access</b> — Instant WhatsApp chat</span>
                        </div>
                        <div className="flex items-center gap-3 text-sm">
                            <span className="w-8 h-8 bg-green-100 rounded-full flex items-center justify-center text-green-600">₹</span>
                            <span><b>Fee Adjusted</b> — ₹{lockFee} deducted from final order</span>
                        </div>
                    </div>

                    {/* Intent Fee */}
                    <div className="bg-gradient-to-r from-amber-50 to-orange-50 p-4 rounded-2xl border border-amber-200 mb-6">
                        <div className="flex justify-between items-center">
                            <div>
                                <p className="text-[10px] font-black text-amber-600 uppercase tracking-wider">Intent Lock Fee</p>
                                <p className="text-3xl font-black text-stone-primary">₹{lockFee}</p>
                            </div>
                            <div className="flex items-center gap-2 text-amber-600">
                                <ClockIcon className="h-5 w-5" />
                                <span className="font-bold">24 hrs</span>
                            </div>
                        </div>
                    </div>

                    {/* Agreement */}
                    <label className="flex items-start gap-3 mb-6 cursor-pointer">
                        <input
                            type="checkbox"
                            checked={agreed}
                            onChange={(e) => setAgreed(e.target.checked)}
                            className="mt-1 w-5 h-5 rounded border-stone-accent accent-amber-500"
                        />
                        <span className="text-sm text-stone-secondary">
                            I understand this fee secures the lot and is adjusted against my final order.
                            If I don't proceed within 24 hours, the fee is non-refundable.
                        </span>
                    </label>

                    <button
                        onClick={handleLock}
                        disabled={!agreed}
                        className={`w-full py-5 rounded-2xl font-black text-lg transition-all ${agreed
                                ? 'bg-gradient-to-r from-amber-500 to-orange-500 text-white hover:from-amber-600 hover:to-orange-600 shadow-xl'
                                : 'bg-stone-light text-stone-secondary cursor-not-allowed'
                            }`}
                    >
                        🔒 Pay ₹{lockFee} & Lock This Lot
                    </button>

                    <p className="text-center text-xs text-stone-secondary mt-4">
                        Secured by Razorpay • GST Invoice Provided
                    </p>
                </div>
            </div>
        </div>
    );
};

export default IntentLockModal;
