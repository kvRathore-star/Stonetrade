'use client';

import React from 'react';
import { SparklesIcon } from '@/components/IconComponents';

interface Lead {
    id: number;
    buyerName: string;
    location: string;
    product: string;
    score: number;
    intent: 'hot' | 'warm' | 'cold';
    timeAgo: string;
}

const AILeadScorer: React.FC = () => {
    const leads: Lead[] = [
        { id: 1, buyerName: 'Sharma Interiors', location: 'Bangalore', product: 'White Statuario', score: 94, intent: 'hot', timeAgo: '5m ago' },
        { id: 2, buyerName: 'Pinnacle Architects', location: 'Mumbai', product: 'Black Galaxy', score: 87, intent: 'hot', timeAgo: '12m ago' },
        { id: 3, buyerName: 'CreateSpace Design', location: 'Delhi', product: 'Kashmir White', score: 72, intent: 'warm', timeAgo: '1h ago' },
        { id: 4, buyerName: 'Urban Living', location: 'Pune', product: 'Makrana White', score: 58, intent: 'warm', timeAgo: '2h ago' },
        { id: 5, buyerName: 'HomeCraft', location: 'Chennai', product: 'Italian Marble', score: 34, intent: 'cold', timeAgo: '5h ago' },
    ];

    const getIntentBadge = (intent: Lead['intent']) => {
        switch (intent) {
            case 'hot': return { bg: 'bg-red-100', text: 'text-red-600', icon: '🔥' };
            case 'warm': return { bg: 'bg-amber-100', text: 'text-amber-600', icon: '⚡' };
            case 'cold': return { bg: 'bg-blue-100', text: 'text-blue-600', icon: '❄️' };
        }
    };

    return (
        <div className="bg-white rounded-3xl border border-amber-200 overflow-hidden">
            {/* Header */}
            <div className="bg-gradient-to-r from-amber-500 to-orange-600 text-white p-5">
                <div className="flex items-center justify-between">
                    <div className="flex items-center gap-3">
                        <div className="w-10 h-10 bg-white/20 rounded-xl flex items-center justify-center">
                            <span className="text-xl">🎯</span>
                        </div>
                        <div>
                            <h3 className="font-bold flex items-center gap-2">
                                AI Lead Scorer
                                <span className="bg-white/20 text-[9px] px-2 py-0.5 rounded-full">GOLD</span>
                            </h3>
                            <p className="text-white/70 text-xs">Prioritize high-conversion leads</p>
                        </div>
                    </div>
                    <div className="text-right">
                        <p className="text-2xl font-black">{leads.filter(l => l.intent === 'hot').length}</p>
                        <p className="text-[10px] text-white/60">Hot Leads</p>
                    </div>
                </div>
            </div>

            <div className="p-5">
                <div className="space-y-3">
                    {leads.map((lead) => {
                        const badge = getIntentBadge(lead.intent);
                        return (
                            <div
                                key={lead.id}
                                className={`p-4 rounded-2xl transition-all cursor-pointer hover:scale-[1.01] ${lead.intent === 'hot' ? 'bg-red-50 border-2 border-red-200' : 'bg-stone-light/50 hover:bg-stone-light'
                                    }`}
                            >
                                <div className="flex items-center justify-between mb-2">
                                    <div className="flex items-center gap-2">
                                        <span className={`text-lg`}>{badge.icon}</span>
                                        <div>
                                            <p className="font-bold text-stone-primary text-sm">{lead.buyerName}</p>
                                            <p className="text-[10px] text-stone-secondary">{lead.location} • {lead.product}</p>
                                        </div>
                                    </div>
                                    <div className="text-right">
                                        <div className={`inline-block px-3 py-1 rounded-full text-sm font-black ${badge.bg} ${badge.text}`}>
                                            {lead.score}%
                                        </div>
                                        <p className="text-[10px] text-stone-secondary mt-1">{lead.timeAgo}</p>
                                    </div>
                                </div>
                                {lead.intent === 'hot' && (
                                    <button className="w-full mt-2 py-2 rounded-xl text-sm font-bold bg-emerald-500 text-white hover:bg-emerald-600 transition-all">
                                        📞 Contact Now
                                    </button>
                                )}
                            </div>
                        );
                    })}
                </div>

                {/* Legend */}
                <div className="mt-4 flex gap-4 justify-center text-xs">
                    <span className="flex items-center gap-1">🔥 Hot (80%+)</span>
                    <span className="flex items-center gap-1">⚡ Warm (50-80%)</span>
                    <span className="flex items-center gap-1">❄️ Cold (&lt;50%)</span>
                </div>
            </div>
        </div>
    );
};

export default AILeadScorer;
