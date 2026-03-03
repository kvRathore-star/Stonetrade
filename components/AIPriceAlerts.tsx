'use client';

import React, { useState } from 'react';
import { SparklesIcon } from '@/components/IconComponents';

interface PriceAlert {
    id: number;
    productName: string;
    oldPrice: number;
    newPrice: number;
    drop: number;
    image: string;
    timeAgo: string;
}

const AIPriceAlerts: React.FC<{ onProductClick?: (id: number) => void }> = ({ onProductClick }) => {
    const [alerts] = useState<PriceAlert[]>([
        { id: 1, productName: 'Black Galaxy Granite', oldPrice: 980, newPrice: 850, drop: 13, image: 'https://images.unsplash.com/photo-1600585154340-be6161a56a0c?w=200', timeAgo: '2h ago' },
        { id: 2, productName: 'Makrana White', oldPrice: 1200, newPrice: 1050, drop: 12, image: 'https://images.unsplash.com/photo-1615971677499-5467cbab01c0?w=200', timeAgo: '5h ago' },
        { id: 3, productName: 'Kashmir White', oldPrice: 750, newPrice: 680, drop: 9, image: 'https://images.unsplash.com/photo-1558618666-fcd25c85cd64?w=200', timeAgo: '1d ago' },
    ]);

    const [watchedProducts, setWatchedProducts] = useState(5);

    return (
        <div className="bg-white rounded-3xl border border-emerald-200 overflow-hidden">
            {/* Header */}
            <div className="bg-gradient-to-r from-emerald-500 to-teal-600 text-white p-5">
                <div className="flex items-center justify-between">
                    <div className="flex items-center gap-3">
                        <div className="w-10 h-10 bg-white/20 rounded-xl flex items-center justify-center">
                            <span className="text-xl">📉</span>
                        </div>
                        <div>
                            <h3 className="font-bold flex items-center gap-2">
                                AI Price Alerts
                                <span className="bg-white/20 text-[9px] px-2 py-0.5 rounded-full">PRO</span>
                            </h3>
                            <p className="text-white/70 text-xs">Get notified when prices drop</p>
                        </div>
                    </div>
                    <div className="text-right">
                        <p className="text-2xl font-black">{watchedProducts}</p>
                        <p className="text-[10px] text-white/60">watching</p>
                    </div>
                </div>
            </div>

            <div className="p-5 space-y-4">
                {/* Recent Alerts */}
                <div>
                    <p className="text-xs font-bold text-stone-secondary uppercase tracking-wider mb-3">
                        🔔 Recent Price Drops
                    </p>
                    <div className="space-y-3">
                        {alerts.map((alert) => (
                            <div
                                key={alert.id}
                                onClick={() => onProductClick?.(alert.id)}
                                className="flex items-center gap-4 p-3 rounded-xl bg-emerald-50 hover:bg-emerald-100 cursor-pointer transition-all border border-emerald-100"
                            >
                                <img src={alert.image} className="w-12 h-12 rounded-xl object-cover" alt={alert.productName} />
                                <div className="flex-1">
                                    <p className="font-bold text-stone-primary text-sm">{alert.productName}</p>
                                    <div className="flex items-center gap-2 text-xs">
                                        <span className="line-through text-stone-secondary">₹{alert.oldPrice}</span>
                                        <span className="font-bold text-emerald-600">₹{alert.newPrice}</span>
                                    </div>
                                </div>
                                <div className="text-right">
                                    <p className="text-sm font-black text-emerald-600 bg-emerald-100 px-2 py-0.5 rounded-full">
                                        -{alert.drop}%
                                    </p>
                                    <p className="text-[10px] text-stone-secondary mt-1">{alert.timeAgo}</p>
                                </div>
                            </div>
                        ))}
                    </div>
                </div>

                {/* Add Watch */}
                <div className="bg-stone-light/50 rounded-xl p-4 text-center">
                    <p className="text-sm font-bold text-stone-primary mb-2">💡 Pro Tip</p>
                    <p className="text-xs text-stone-secondary">Add products to your watchlist and we'll alert you instantly when prices drop</p>
                </div>
            </div>
        </div>
    );
};

export default AIPriceAlerts;
