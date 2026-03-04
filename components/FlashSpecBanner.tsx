'use client';

import React, { useState, useEffect } from 'react';
import { ShieldIcon, ClockIcon, SparklesIcon } from '@/components/IconComponents';
import { Product } from '@/types';

interface FlashSpecBannerProps {
    products: Product[];
    onProductClick: (productId: number) => void;
}

const FlashSpecBanner: React.FC<FlashSpecBannerProps> = ({ products, onProductClick }) => {
    const [timeLeft, setTimeLeft] = useState({ hours: 0, minutes: 0, seconds: 0 });
    const [isActive, setIsActive] = useState(true);

    useEffect(() => {
        // Flash Spec runs 6 hours starting at 10 AM IST daily
        const calculateTimeLeft = () => {
            const now = new Date();
            const hours = now.getHours();

            // Active window: 10 AM - 4 PM IST (simulate with local time)
            const startHour = 10;
            const endHour = 16;

            if (hours >= startHour && hours < endHour) {
                setIsActive(true);
                const endTime = new Date();
                endTime.setHours(endHour, 0, 0, 0);
                const diff = endTime.getTime() - now.getTime();

                const h = Math.floor(diff / (1000 * 60 * 60));
                const m = Math.floor((diff % (1000 * 60 * 60)) / (1000 * 60));
                const s = Math.floor((diff % (1000 * 60)) / 1000);

                setTimeLeft({ hours: h, minutes: m, seconds: s });
            } else {
                setIsActive(false);
                // Calculate time until next window
                const nextStart = new Date();
                if (hours >= endHour) {
                    nextStart.setDate(nextStart.getDate() + 1);
                }
                nextStart.setHours(startHour, 0, 0, 0);
                const diff = nextStart.getTime() - now.getTime();

                const h = Math.floor(diff / (1000 * 60 * 60));
                const m = Math.floor((diff % (1000 * 60 * 60)) / (1000 * 60));
                const s = Math.floor((diff % (1000 * 60)) / 1000);

                setTimeLeft({ hours: h, minutes: m, seconds: s });
            }
        };

        calculateTimeLeft();
        const interval = setInterval(calculateTimeLeft, 1000);
        return () => clearInterval(interval);
    }, []);

    // Get 5 "Flash Spec" products (Gold verified with special pricing)
    const flashProducts = products.filter(p => p.hasInspectionReport).slice(0, 5);
    const discountPercent = 18; // Source-direct discount

    if (!isActive) {
        return (
            <div className="bg-gradient-to-r from-slate-800 to-slate-900 rounded-[2rem] p-6 mb-8 border border-slate-700">
                <div className="flex items-center justify-between">
                    <div className="flex items-center gap-4">
                        <div className="w-12 h-12 bg-amber-500/20 rounded-xl flex items-center justify-center">
                            <ClockIcon className="h-6 w-6 text-amber-400" />
                        </div>
                        <div>
                            <p className="text-white font-black">⚡ FLASH SPEC — Next Window</p>
                            <p className="text-slate-400 text-sm">Source-direct prices</p>
                        </div>
                    </div>
                    <div className="flex gap-2">
                        <div className="bg-slate-700 px-4 py-2 rounded-xl text-center">
                            <p className="text-2xl font-black text-white">{String(timeLeft.hours).padStart(2, '0')}</p>
                            <p className="text-[9px] text-slate-400 uppercase">Hours</p>
                        </div>
                        <div className="bg-slate-700 px-4 py-2 rounded-xl text-center">
                            <p className="text-2xl font-black text-white">{String(timeLeft.minutes).padStart(2, '0')}</p>
                            <p className="text-[9px] text-slate-400 uppercase">Min</p>
                        </div>
                        <div className="bg-slate-700 px-4 py-2 rounded-xl text-center">
                            <p className="text-2xl font-black text-amber-400">{String(timeLeft.seconds).padStart(2, '0')}</p>
                            <p className="text-[9px] text-slate-400 uppercase">Sec</p>
                        </div>
                    </div>
                </div>
            </div>
        );
    }

    return (
        <div className="relative overflow-hidden bg-gradient-to-r from-red-600 via-orange-500 to-amber-500 rounded-[2rem] p-6 mb-8 shadow-2xl">
            {/* Animated background pulse */}
            <div className="absolute inset-0 bg-gradient-to-r from-red-600/50 to-transparent animate-pulse" />

            <div className="relative z-10">
                <div className="flex items-center justify-between mb-4">
                    <div className="flex items-center gap-3">
                        <div className="w-12 h-12 bg-white/20 rounded-xl flex items-center justify-center animate-bounce">
                            <SparklesIcon className="h-6 w-6 text-white" />
                        </div>
                        <div>
                            <div className="flex items-center gap-2">
                                <p className="text-white font-black text-xl">⚡ FLASH SPEC LIVE</p>
                                <span className="bg-white text-red-600 text-[10px] font-black px-2 py-1 rounded-full animate-pulse">
                                    -{discountPercent}% OFF
                                </span>
                            </div>
                            <p className="text-white/80 text-sm">Source-Direct Prices • Gold Verified Only</p>
                        </div>
                    </div>

                    {/* Countdown */}
                    <div className="flex gap-2">
                        <div className="bg-white/20 backdrop-blur-sm px-4 py-2 rounded-xl text-center border border-white/30">
                            <p className="text-3xl font-black text-white">{String(timeLeft.hours).padStart(2, '0')}</p>
                            <p className="text-[9px] text-white/70 uppercase tracking-wider">Hours</p>
                        </div>
                        <div className="bg-white/20 backdrop-blur-sm px-4 py-2 rounded-xl text-center border border-white/30">
                            <p className="text-3xl font-black text-white">{String(timeLeft.minutes).padStart(2, '0')}</p>
                            <p className="text-[9px] text-white/70 uppercase tracking-wider">Min</p>
                        </div>
                        <div className="bg-white/20 backdrop-blur-sm px-4 py-2 rounded-xl text-center border border-white/30">
                            <p className="text-3xl font-black text-yellow-300">{String(timeLeft.seconds).padStart(2, '0')}</p>
                            <p className="text-[9px] text-white/70 uppercase tracking-wider">Sec</p>
                        </div>
                    </div>
                </div>

                {/* Flash Products Row */}
                <div className="flex gap-4 overflow-x-auto pb-2">
                    {flashProducts.map(product => (
                        <div
                            key={product.id}
                            onClick={() => onProductClick(product.id)}
                            className="flex-shrink-0 w-48 bg-white/10 backdrop-blur-sm rounded-2xl p-3 border border-white/20 cursor-pointer hover:bg-white/20 transition-all hover:scale-105"
                        >
                            <img src={product.images[0]} alt={product.name} className="w-full h-24 rounded-xl object-cover mb-2" />
                            <p className="text-white font-bold text-sm truncate">{product.name}</p>
                            <div className="flex items-center gap-2 mt-1">
                                <span className="text-white/50 line-through text-xs">₹{product.price}</span>
                                <span className="text-yellow-300 font-black">₹{Math.round(product.price * (1 - discountPercent / 100))}</span>
                            </div>
                            <div className="flex items-center gap-1 mt-1">
                                <ShieldIcon className="h-3 w-3 text-amber-300" />
                                <span className="text-[10px] text-amber-300 font-bold">GOLD VERIFIED</span>
                            </div>
                        </div>
                    ))}
                </div>
            </div>
        </div>
    );
};

export default FlashSpecBanner;
