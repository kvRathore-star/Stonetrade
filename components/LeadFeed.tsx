'use client';

import React from 'react';
import { RFQ, StoneType, PriceUnit } from '@/types';
import { SparklesIcon, SendIcon } from '@/components/IconComponents';

const LeadFeed: React.FC = () => {
    // Mock leads data
    const leads: RFQ[] = [
        {
            id: 'Lead-8821',
            buyerName: 'Architect Rahul S.',
            stoneType: StoneType.MARBLE,
            quantity: 4500,
            unit: PriceUnit.SQ_FT,
            budget: '₹250-300',
            location: 'Jubilee Hills, Hyderabad',
            status: 'active',
            postedAt: new Date(Date.now() - 1000 * 60 * 30) // 30 mins ago
        },
        {
            id: 'Lead-8822',
            buyerName: 'Oberoi Builders',
            stoneType: StoneType.GRANITE,
            quantity: 12000,
            unit: PriceUnit.SQ_FT,
            budget: '₹120-140',
            location: 'Whitefield, Bangalore',
            status: 'active',
            postedAt: new Date(Date.now() - 1000 * 60 * 60 * 2) // 2 hours ago
        },
        {
            id: 'Lead-8823',
            buyerName: 'Studio Design Co.',
            stoneType: StoneType.SANDSTONE,
            quantity: 800,
            unit: PriceUnit.SQ_FT,
            budget: '₹80-100',
            location: 'Jaipur',
            status: 'active',
            postedAt: new Date(Date.now() - 1000 * 60 * 60 * 5) // 5 hours ago
        }
    ];

    return (
        <div className="bg-stone-primary text-white p-8 md:p-10 rounded-[3rem] shadow-2xl relative overflow-hidden mb-12">
            <div className="absolute top-0 right-0 w-[400px] h-[400px] bg-stone-accent/10 rounded-full blur-3xl -translate-y-1/2 translate-x-1/2 pointer-events-none"></div>

            <div className="flex flex-col md:flex-row justify-between items-start md:items-end mb-8 relative z-10 gap-4">
                <div>
                    <div className="flex items-center gap-3 mb-2">
                        <span className="p-2 bg-stone-accent text-stone-primary rounded-lg">
                            <SparklesIcon className="h-5 w-5" />
                        </span>
                        <h2 className="text-2xl md:text-3xl font-black tracking-tight">Live Market Leads</h2>
                    </div>
                    <p className="text-stone-light/60 text-sm md:text-base max-w-xl">
                        High-intent buyers looking for stock right now. Unlock and quote instantly.
                    </p>
                </div>
                <button className="bg-stone-accent/10 hover:bg-stone-accent/20 text-stone-accent border border-stone-accent/30 px-6 py-3 rounded-xl font-bold text-xs uppercase tracking-widest transition-all">
                    View All Request
                </button>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 relative z-10">
                {leads.map((lead) => (
                    <div key={lead.id} className="bg-white/5 border border-white/10 p-6 rounded-3xl hover:bg-white/10 transition-all group">
                        <div className="flex justify-between items-start mb-4">
                            <span className="text-[10px] font-black bg-emerald-500/20 text-emerald-300 px-2 py-1 rounded-md uppercase tracking-wider">
                                Active Now
                            </span>
                            <span className="text-[10px] text-white/40 font-bold">
                                {Math.floor((Date.now() - lead.postedAt.getTime()) / (1000 * 60))}m ago
                            </span>
                        </div>

                        <h3 className="text-xl font-black mb-1">{lead.stoneType}</h3>
                        <p className="text-stone-accent font-bold mb-4">{lead.quantity.toLocaleString()} {lead.unit} • {lead.budget}</p>

                        <div className="space-y-2 mb-6 text-sm text-white/60">
                            <p className="flex items-center gap-2">
                                <span className="w-1.5 h-1.5 rounded-full bg-stone-accent"></span>
                                {lead.buyerName}
                            </p>
                            <p className="flex items-center gap-2">
                                <span className="w-1.5 h-1.5 rounded-full bg-stone-accent"></span>
                                {lead.location}
                            </p>
                        </div>

                        <button className="w-full bg-white text-stone-primary py-3 rounded-xl font-black text-xs uppercase tracking-widest hover:bg-stone-accent transition-colors flex items-center justify-center gap-2 group-hover:shadow-lg">
                            Unlock Contact <SendIcon className="h-3 w-3" />
                        </button>
                    </div>
                ))}
            </div>
        </div>
    );
};

export default LeadFeed;
