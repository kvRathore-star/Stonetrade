'use client';

import React, { useState, useEffect } from 'react';

interface TickerItem {
    id: string;
    type: 'sample' | 'lock' | 'view' | 'deal';
    product: string;
    city: string;
    time: string;
}

const MarketPulseTicker: React.FC = () => {
    const [items, setItems] = useState<TickerItem[]>([]);

    useEffect(() => {
        // Generate mock real-time activity
        const cities = ['Mumbai', 'Bangalore', 'Delhi', 'Pune', 'Hyderabad', 'Chennai', 'Ahmedabad', 'Kolkata', 'Jaipur', 'Kochi'];
        const products = ['Statuario Marble', 'Makrana White', 'Black Galaxy', 'Carrara', 'Bruno Marble', 'Kashmir White', 'Calacatta'];
        const types: TickerItem['type'][] = ['sample', 'lock', 'view', 'deal'];

        const generateItem = (): TickerItem => ({
            id: Date.now().toString() + Math.random(),
            type: types[Math.floor(Math.random() * types.length)],
            product: products[Math.floor(Math.random() * products.length)],
            city: cities[Math.floor(Math.random() * cities.length)],
            time: 'Just now',
        });

        // Initial items
        setItems([generateItem(), generateItem(), generateItem(), generateItem()]);

        // Add new item every 3 seconds
        const interval = setInterval(() => {
            setItems(prev => [generateItem(), ...prev.slice(0, 5)]);
        }, 3000);

        return () => clearInterval(interval);
    }, []);

    const getIcon = (type: TickerItem['type']) => {
        switch (type) {
            case 'sample': return '📦';
            case 'lock': return '🔒';
            case 'view': return '👁️';
            case 'deal': return '🤝';
        }
    };

    const getMessage = (item: TickerItem) => {
        switch (item.type) {
            case 'sample': return `Sample ordered in ${item.city}`;
            case 'lock': return `Lot locked by architect in ${item.city}`;
            case 'view': return `Trending in ${item.city}`;
            case 'deal': return `Deal closed in ${item.city}`;
        }
    };

    const getColor = (type: TickerItem['type']) => {
        switch (type) {
            case 'sample': return 'text-blue-400';
            case 'lock': return 'text-amber-400';
            case 'view': return 'text-green-400';
            case 'deal': return 'text-purple-400';
        }
    };

    return (
        <div className="bg-stone-primary/95 backdrop-blur-sm py-3 px-4 rounded-2xl mb-6 overflow-hidden">
            <div className="flex items-center gap-4">
                <div className="flex-shrink-0 flex items-center gap-2">
                    <span className="relative flex h-3 w-3">
                        <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-green-400 opacity-75"></span>
                        <span className="relative inline-flex rounded-full h-3 w-3 bg-green-500"></span>
                    </span>
                    <span className="text-white font-black text-sm whitespace-nowrap">LIVE PULSE</span>
                </div>

                <div className="flex-1 overflow-hidden">
                    <div className="flex gap-6 animate-scroll">
                        {items.map(item => (
                            <div key={item.id} className="flex items-center gap-2 whitespace-nowrap">
                                <span>{getIcon(item.type)}</span>
                                <span className={`text-sm font-medium ${getColor(item.type)}`}>
                                    {item.product}
                                </span>
                                <span className="text-white/50 text-xs">{getMessage(item)}</span>
                            </div>
                        ))}
                    </div>
                </div>
            </div>

            <style>{`
                @keyframes scroll {
                    0% { transform: translateX(0); }
                    100% { transform: translateX(-50%); }
                }
                .animate-scroll {
                    animation: scroll 20s linear infinite;
                }
            `}</style>
        </div>
    );
};

export default MarketPulseTicker;
