'use client';

import React, { useContext, useState } from 'react';
import { useMockData } from '@/hooks/useMockData';
import { useFavorites } from '@/hooks/useFavorites';
import { Product } from '@/types';
import type { Page } from '@/lib/navigation';
import { LanguageContext } from '@/lib/language';
import { translations } from '@/translations';
import { ShieldIcon, SearchIcon, StarIcon, VideoIcon, SendIcon, XIcon, TruckIcon, HeartIcon, SparklesIcon } from '@/components/IconComponents';

interface BuyerDashboardPageProps {
    navigateTo: (page: Page, productId?: number) => void;
}

const BuyerDashboardPage: React.FC<BuyerDashboardPageProps> = ({ navigateTo }) => {
    const { products } = useMockData();
    const { favorites } = useFavorites();
    const { language } = useContext(LanguageContext);
    const t = translations[language];

    const [activeProjectTab, setActiveProjectTab] = useState('Villa Sourcing');
    const favoriteProducts = products.filter(p => favorites.includes(p.id));

    // Mock data for project tracking
    const activeUnlocks = 3;
    const totalCredits = 5;

    return (
        <div className="max-w-7xl mx-auto pb-24 px-4 space-y-12">
            <header className="flex flex-col md:flex-row justify-between items-start md:items-end gap-6 pt-10">
                <div>
                    <h1 className="text-6xl font-black tracking-tighter text-stone-primary">Procurement Desk</h1>
                    <p className="text-stone-secondary text-lg font-medium mt-2">Welcome back, Architect Rahul.</p>
                </div>
                <div className="flex items-center gap-4">
                    <div className="bg-stone-primary text-white px-8 py-4 rounded-[2rem] shadow-xl flex items-center gap-4 border border-white/10">
                        <div className="flex flex-col">
                            <span className="text-[10px] font-black uppercase text-stone-accent tracking-widest">Sourcing Credits</span>
                            <span className="text-2xl font-black leading-none">{activeUnlocks} / {totalCredits} <span className="text-xs font-normal opacity-40 ml-1">Left</span></span>
                        </div>
                        <button onClick={() => navigateTo('pricing')} className="bg-stone-accent text-stone-primary p-2 rounded-full hover:bg-white transition-colors">
                            <SendIcon className="h-4 w-4" />
                        </button>
                    </div>
                    <div className="bg-stone-accent text-stone-primary px-6 py-4 rounded-[2rem] font-black text-xs uppercase tracking-widest shadow-xl border border-stone-primary/10">
                        Buyer Pro Member
                    </div>
                </div>
            </header>

            {/* Main Grid */}
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-10">

                {/* Left Col: active projects & moodboards (8 cols) */}
                <div className="lg:col-span-8 space-y-10">
                    <section className="bg-white rounded-[3.5rem] p-10 shadow-sm border border-stone-accent/5 overflow-hidden relative">
                        <div className="flex justify-between items-center mb-10">
                            <h2 className="text-3xl font-black tracking-tight">Active Projects</h2>
                            <div className="flex gap-2">
                                {['Villa Sourcing', 'Skyline Commercial', 'Penthouse'].map(p => (
                                    <button
                                        key={p}
                                        onClick={() => setActiveProjectTab(p)}
                                        className={`px-5 py-2 rounded-full text-[10px] font-black uppercase tracking-widest transition-all ${activeProjectTab === p ? 'bg-stone-primary text-white shadow-lg' : 'bg-stone-light text-stone-secondary'}`}
                                    >
                                        {p}
                                    </button>
                                ))}
                            </div>
                        </div>

                        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                            {favoriteProducts.slice(0, 4).map((p, idx) => (
                                <div key={p.id} className="group bg-stone-light/50 p-6 rounded-[2.5rem] border border-stone-accent/5 hover:bg-white hover:shadow-xl transition-all cursor-pointer">
                                    <div className="flex gap-4 items-center mb-4">
                                        <img src={p.images[0]} className="w-16 h-16 rounded-2xl object-cover shadow-md" />
                                        <div>
                                            <h4 className="font-bold text-lg leading-tight">{p.name}</h4>
                                            <p className="text-[10px] font-black text-stone-accent uppercase tracking-widest">{p.stoneType}</p>
                                        </div>
                                    </div>
                                    <div className="flex justify-between items-center mt-6">
                                        <div className="flex flex-col">
                                            <span className="text-[9px] font-black text-stone-secondary uppercase">Spec Phase</span>
                                            <span className="text-xs font-bold text-green-600">Sample Dispatched</span>
                                        </div>
                                        <button onClick={() => navigateTo('productDetail', p.id)} className="bg-white p-3 rounded-full shadow-sm hover:bg-stone-primary hover:text-white transition-colors">
                                            <SearchIcon className="h-4 w-4" />
                                        </button>
                                    </div>
                                </div>
                            ))}
                            {favoriteProducts.length === 0 && (
                                <div className="col-span-2 text-center py-20 bg-stone-light/30 rounded-[3rem] italic text-stone-secondary">
                                    No slabs added to project yet. Start browsing to curate your moodboard.
                                </div>
                            )}
                        </div>
                    </section>

                    <section className="bg-stone-primary text-white rounded-[3.5rem] p-12 shadow-2xl relative overflow-hidden">
                        <div className="absolute top-0 right-0 p-12 opacity-10 rotate-12 pointer-events-none">
                            <TruckIcon className="h-48 w-48" />
                        </div>
                        <div className="relative z-10">
                            <h2 className="text-3xl font-black mb-8">Supply Chain Tracking</h2>
                            <div className="space-y-6">
                                <div className="flex items-center gap-6 bg-white/5 p-6 rounded-3xl border border-white/10">
                                    <div className="h-12 w-12 bg-stone-accent rounded-xl flex items-center justify-center shrink-0">
                                        <TruckIcon className="h-6 w-6 text-stone-primary" />
                                    </div>
                                    <div className="flex-grow">
                                        <div className="flex justify-between items-baseline mb-2">
                                            <h5 className="font-bold">Italian Statuario (L-02)</h5>
                                            <span className="text-[10px] font-black text-stone-accent uppercase">Transit</span>
                                        </div>
                                        <div className="h-1.5 w-full bg-white/5 rounded-full overflow-hidden">
                                            <div className="h-full bg-stone-accent w-2/3"></div>
                                        </div>
                                        <p className="text-[10px] mt-3 opacity-40 uppercase font-bold tracking-widest">ETA: 48 Hours to Jaipur Site</p>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </section>
                </div>

                {/* Right Col: Verified contacts & Elite features (4 cols) */}
                <div className="lg:col-span-4 space-y-10">
                    <div className="bg-white p-10 rounded-[3rem] shadow-sm border border-stone-accent/5">
                        <h3 className="text-xl font-black mb-6 tracking-tight">Verified Unlocks</h3>
                        <div className="space-y-4">
                            {activeUnlocks > 0 ? (
                                <>
                                    <div className="p-5 bg-stone-light/50 rounded-2xl flex items-center justify-between group hover:bg-stone-accent/10 transition-colors">
                                        <div>
                                            <p className="font-bold text-sm">Rajasthan Marble Emp.</p>
                                            <p className="text-[10px] font-medium text-stone-secondary">WhatsApp: +91 98XXX-XXXXX</p>
                                        </div>
                                        <button className="p-3 bg-white rounded-full shadow-sm text-stone-primary group-hover:bg-stone-primary group-hover:text-white transition-all">
                                            <SendIcon className="h-4 w-4" />
                                        </button>
                                    </div>
                                    <div className="p-5 bg-stone-light/50 rounded-2xl flex items-center justify-between group hover:bg-stone-accent/10 transition-colors">
                                        <div>
                                            <p className="font-bold text-sm">Global Stone & Craft</p>
                                            <p className="text-[10px] font-medium text-stone-secondary">Email: sales@global...</p>
                                        </div>
                                        <button className="p-3 bg-white rounded-full shadow-sm text-stone-primary group-hover:bg-stone-primary group-hover:text-white transition-all">
                                            <SendIcon className="h-4 w-4" />
                                        </button>
                                    </div>
                                </>
                            ) : (
                                <p className="text-sm italic text-stone-secondary">No factory connections unlocked this month.</p>
                            )}
                        </div>
                        <button className="w-full mt-8 text-[10px] font-black uppercase text-stone-accent tracking-widest hover:underline">View All Active Connections &rarr;</button>
                    </div>

                    <div className="bg-stone-accent p-10 rounded-[3rem] text-stone-primary shadow-xl relative overflow-hidden group">
                        <SparklesIcon className="absolute top-0 right-0 h-32 w-32 opacity-20 translate-x-10 -translate-y-10 group-hover:scale-110 transition-transform" />
                        <h3 className="text-xl font-black mb-4 leading-tight">Elite <br />Sourcing AI</h3>
                        <p className="text-sm font-medium mb-8 leading-relaxed opacity-70">Need a specific vein pattern? Our Elite AI matches moodboards to live factory stock. Skip the yard search.</p>
                        <button className="bg-stone-primary text-white w-full py-4 rounded-2xl font-black text-xs uppercase tracking-widest shadow-2xl hover:bg-stone-secondary transition-all">
                            Unlock Elite AI
                        </button>
                    </div>

                    <div className="bg-white p-10 rounded-[3rem] shadow-sm border border-stone-accent/5">
                        <h3 className="text-xl font-black mb-4">Inspection Desk</h3>
                        <p className="text-xs font-medium text-stone-secondary leading-relaxed mb-6">Pro members get priority yard audits. Need a live video call with a slab inspector?</p>
                        <div className="space-y-4">
                            <button className="w-full bg-stone-light text-stone-primary py-4 rounded-xl font-black text-[10px] uppercase tracking-widest border border-stone-accent/10 hover:bg-stone-accent transition-colors">
                                Request Yard Audit
                            </button>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default BuyerDashboardPage;
