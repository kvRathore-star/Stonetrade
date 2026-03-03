'use client';

import React from 'react';
import { SparklesIcon } from '@/components/IconComponents';

interface DemandData {
    city: string;
    searches: number;
    topProducts: string[];
    trend: 'up' | 'down' | 'stable';
    opportunity: number;
}

const DemandIntelligence: React.FC = () => {
    // Mock demand data - positive framing
    const demandData: DemandData[] = [
        { city: 'South Bangalore', searches: 78, topProducts: ['White Statuario', 'Carrara'], trend: 'up', opportunity: 245000 },
        { city: 'Navi Mumbai', searches: 56, topProducts: ['Black Galaxy', 'Makrana'], trend: 'up', opportunity: 189000 },
        { city: 'Gurgaon', searches: 42, topProducts: ['Italian Marble', 'Onyx'], trend: 'stable', opportunity: 156000 },
        { city: 'Pune', searches: 38, topProducts: ['Kashmir White', 'Bruno'], trend: 'up', opportunity: 98000 },
        { city: 'Hyderabad', searches: 35, topProducts: ['Statuario', 'Calacatta'], trend: 'up', opportunity: 134000 },
    ];

    const totalOpportunity = demandData.reduce((sum, d) => sum + d.opportunity, 0);
    const totalSearches = demandData.reduce((sum, d) => sum + d.searches, 0);

    const getTrendIcon = (trend: DemandData['trend']) => {
        switch (trend) {
            case 'up': return '🔥';
            case 'down': return '📉';
            default: return '➡️';
        }
    };

    const getTrendColor = (trend: DemandData['trend']) => {
        switch (trend) {
            case 'up': return 'text-emerald-500';
            case 'down': return 'text-amber-500';
            default: return 'text-stone-secondary';
        }
    };

    return (
        <div className="bg-white rounded-3xl shadow-sm border border-stone-accent/10 overflow-hidden">
            {/* Header */}
            <div className="bg-gradient-to-r from-violet-600 to-purple-700 text-white p-6">
                <div className="flex items-center justify-between">
                    <div>
                        <h2 className="text-xl font-black flex items-center gap-2">
                            <SparklesIcon className="h-5 w-5" />
                            AI Demand Intelligence
                            <span className="bg-white/20 text-[10px] px-2 py-1 rounded-full">GOLD</span>
                        </h2>
                        <p className="text-white/70 text-sm">Real-time architect search activity</p>
                    </div>
                    <div className="text-right">
                        <p className="text-[10px] text-white/60 uppercase tracking-wider">Live Searches</p>
                        <p className="text-3xl font-black">{totalSearches}</p>
                    </div>
                </div>
            </div>

            {/* Opportunity Banner - Positive framing */}
            <div className="bg-emerald-50 border-b border-emerald-100 p-4">
                <div className="flex items-center justify-between">
                    <div className="flex items-center gap-3">
                        <span className="text-2xl">💰</span>
                        <div>
                            <p className="font-bold text-emerald-700">Market Opportunity</p>
                            <p className="text-sm text-emerald-600">Architects actively searching for your products</p>
                        </div>
                    </div>
                    <div className="text-right">
                        <p className="text-2xl font-black text-emerald-600">₹{(totalOpportunity / 100000).toFixed(1)}L</p>
                        <p className="text-[10px] text-emerald-500 uppercase">Potential GMV</p>
                    </div>
                </div>
            </div>

            {/* City Heatmap */}
            <div className="p-6">
                <p className="text-[10px] font-black text-stone-secondary uppercase tracking-wider mb-4">🗺️ City-wise Demand Heatmap</p>

                <div className="space-y-3">
                    {demandData.map((city, i) => (
                        <div key={city.city} className="group">
                            <div className={`flex items-center justify-between p-4 rounded-2xl transition-all cursor-pointer hover:scale-[1.01] ${i === 0 ? 'bg-gradient-to-r from-violet-100 to-purple-100 border-2 border-violet-300' : 'bg-stone-light/50 hover:bg-violet-50'
                                }`}>
                                <div className="flex items-center gap-4">
                                    <div className={`w-10 h-10 rounded-xl flex items-center justify-center font-black text-white ${i === 0 ? 'bg-violet-500' : 'bg-stone-secondary'
                                        }`}>
                                        {i + 1}
                                    </div>
                                    <div>
                                        <p className="font-bold text-stone-primary flex items-center gap-2">
                                            {city.city}
                                            <span className={getTrendColor(city.trend)}>{getTrendIcon(city.trend)}</span>
                                        </p>
                                        <p className="text-xs text-stone-secondary">
                                            Top: {city.topProducts.join(', ')}
                                        </p>
                                    </div>
                                </div>
                                <div className="text-right">
                                    <p className="font-black text-violet-600 text-lg">{city.searches}</p>
                                    <p className="text-[10px] text-stone-secondary">architects</p>
                                </div>
                            </div>
                        </div>
                    ))}
                </div>
            </div>

            {/* AI Recommendations */}
            <div className="p-6 pt-0">
                <p className="text-[10px] font-black text-stone-secondary uppercase tracking-wider mb-3">🤖 AI Recommendations</p>
                <div className="grid grid-cols-2 gap-3">
                    <div className="bg-violet-50 p-4 rounded-xl">
                        <p className="text-xs font-bold text-violet-700">📸 Add Photos</p>
                        <p className="text-[10px] text-violet-600">Products with 5+ photos get 3x more views</p>
                    </div>
                    <div className="bg-emerald-50 p-4 rounded-xl">
                        <p className="text-xs font-bold text-emerald-700">💰 Price Match</p>
                        <p className="text-[10px] text-emerald-600">Your Statuario is 8% above market avg</p>
                    </div>
                </div>
            </div>

            {/* CTA */}
            <div className="p-6 bg-gradient-to-r from-violet-50 to-purple-50 border-t border-violet-100">
                <button className="w-full bg-gradient-to-r from-violet-600 to-purple-600 text-white py-4 rounded-2xl font-black hover:from-violet-700 hover:to-purple-700 transition-colors">
                    📦 Add Inventory to Capture Demand
                </button>
            </div>
        </div>
    );
};

export default DemandIntelligence;
