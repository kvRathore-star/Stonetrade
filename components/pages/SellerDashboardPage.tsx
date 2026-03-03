'use client';

import React, { useContext, useState } from 'react';
import { useMockData } from '@/hooks/useMockData';
import { SparklesIcon, ShieldIcon, SearchIcon, StarIcon, VideoIcon, SendIcon, XIcon, ChevronDownIcon, FilterIcon } from '@/components/IconComponents';
import { LanguageContext } from '@/lib/language';
import { translations } from '@/translations';
import { GoogleGenAI } from '@google/genai';
import { StoneType, Finish, PriceUnit, SizeType, UseCase } from '@/types';
import DemandIntelligence from '@/components/DemandIntelligence';
import AIFastListing from '@/components/AIFastListing';
import AILeadScorer from '@/components/AILeadScorer';
import LeadFeed from '@/components/LeadFeed';

const AIListingModule: React.FC<{ onAIResult: (text: string) => void }> = ({ onAIResult }) => {
    const [image, setImage] = useState<string | null>(null);
    const [loading, setLoading] = useState(false);
    const { language } = useContext(LanguageContext);

    const handleFileUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
        const file = e.target.files?.[0];
        if (file) {
            const reader = new FileReader();
            reader.onloadend = () => setImage(reader.result as string);
            reader.readAsDataURL(file);
        }
    };

    const runAIListing = async () => {
        if (!image) return;
        setLoading(true);
        try {
            const ai = new GoogleGenAI({ apiKey: process.env.API_KEY });
            const base64Data = image.split(',')[1];
            const prompt = `Act as an expert stone quality inspector. Analyze this slab image. Provide a detailed architectural product name, a color description (e.g., "milky white base with subtle grey veins"), and a 50-word marketing description for architects. Language: ${language}`;
            const response = await ai.models.generateContent({
                model: 'gemini-3-flash-preview',
                contents: [{ parts: [{ text: prompt }, { inlineData: { data: base64Data, mimeType: 'image/jpeg' } }] }],
            });
            onAIResult(response.text || "");
        } catch (e) {
            alert("AI Analysis failed. Check your API key.");
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="bg-stone-primary text-white p-10 rounded-[3rem] shadow-2xl relative overflow-hidden mb-10">
            <div className="absolute top-0 right-0 p-10 opacity-10 pointer-events-none rotate-12">
                <SparklesIcon className="h-48 w-48" />
            </div>
            <div className="relative z-10 flex flex-col md:flex-row gap-12 items-center">
                <div className="flex-1">
                    <h2 className="text-4xl font-black mb-4 flex items-center gap-4 tracking-tight">
                        <span className="p-3 bg-stone-accent text-stone-primary rounded-2xl shadow-lg">
                            <SparklesIcon className="h-8 w-8" />
                        </span>
                        AI Studio Mode
                    </h2>
                    <p className="text-stone-light/60 text-lg mb-8 leading-relaxed">Let Gemini analyze your slab texture and veining to generate professional technical specifications instantly.</p>
                    <div className="flex flex-wrap gap-4">
                        <label className="bg-white/10 hover:bg-white/20 px-8 py-4 rounded-2xl font-black cursor-pointer border border-white/20 transition-all text-sm uppercase tracking-widest shadow-lg">
                            Select Slab Photo
                            <input type="file" className="hidden" onChange={handleFileUpload} accept="image/*" />
                        </label>
                        <button
                            disabled={!image || loading}
                            onClick={runAIListing}
                            className="bg-stone-accent text-stone-primary px-8 py-4 rounded-2xl font-black shadow-2xl disabled:opacity-30 text-sm uppercase tracking-widest hover:bg-white transition-colors"
                        >
                            {loading ? 'Analyzing Veining...' : 'Generate Technical Spec'}
                        </button>
                    </div>
                </div>
                {image && (
                    <div className="w-64 h-64 rounded-[2.5rem] border-4 border-stone-accent overflow-hidden shadow-[0_30px_60px_rgba(0,0,0,0.5)] shrink-0 group transition-transform hover:scale-105">
                        <img src={image} className="w-full h-full object-cover" alt="Preview" />
                    </div>
                )}
            </div>
        </div>
    );
};

const ProductListingForm: React.FC<{ onClose: () => void }> = ({ onClose }) => {
    const [aiResult, setAiResult] = useState("");
    const [step, setStep] = useState(1);

    return (
        <div className="fixed inset-0 z-[60] bg-stone-primary/95 backdrop-blur-xl flex items-center justify-center p-4">
            <div className="bg-stone-white w-full max-w-6xl h-[92vh] rounded-[4rem] shadow-2xl overflow-hidden flex flex-col">
                <header className="p-10 border-b border-stone-accent/10 flex justify-between items-center bg-stone-light/30">
                    <div>
                        <h2 className="text-3xl font-black text-stone-primary tracking-tight">New Specification Listing</h2>
                        <p className="text-[10px] text-stone-secondary uppercase tracking-[0.3em] font-black mt-1">Publishing to India's Elite Architectural Network</p>
                    </div>
                    <button onClick={onClose} className="p-4 bg-white rounded-full hover:bg-red-50 hover:text-red-500 transition-all shadow-sm">
                        <XIcon className="h-6 w-6" />
                    </button>
                </header>

                <div className="flex-grow overflow-y-auto p-12 custom-scrollbar">
                    <AIListingModule onAIResult={(res) => { setAiResult(res); setStep(1); }} />

                    <div className="grid grid-cols-1 lg:grid-cols-2 gap-16">
                        {/* Form Inputs */}
                        <div className="space-y-10">
                            <section>
                                <h3 className="text-[10px] font-black uppercase tracking-[0.2em] text-stone-accent mb-6 border-b border-stone-accent/20 pb-2">Primary Details</h3>
                                <div className="space-y-6">
                                    <div className="group">
                                        <label className="text-[10px] font-black uppercase text-stone-secondary ml-1 mb-2 block">Trade Name</label>
                                        <input type="text" placeholder="e.g. Imperial White Statuario" defaultValue={aiResult.split('\n')[0]} className="w-full bg-stone-light/50 border-2 border-transparent focus:border-stone-accent p-5 rounded-2xl font-black transition-all outline-none text-lg" />
                                    </div>
                                    <div className="grid grid-cols-2 gap-6">
                                        <div>
                                            <label className="text-[10px] font-black uppercase text-stone-secondary ml-1 mb-2 block">Stone Type</label>
                                            <select className="w-full bg-stone-light/50 p-5 rounded-2xl border-none font-black outline-none appearance-none">
                                                {Object.values(StoneType).map(t => <option key={t}>{t}</option>)}
                                            </select>
                                        </div>
                                        <div>
                                            <label className="text-[10px] font-black uppercase text-stone-secondary ml-1 mb-2 block">Surface Finish</label>
                                            <select className="w-full bg-stone-light/50 p-5 rounded-2xl border-none font-black outline-none appearance-none">
                                                {Object.values(Finish).map(f => <option key={f}>{f}</option>)}
                                            </select>
                                        </div>
                                    </div>
                                </div>
                            </section>

                            <section>
                                <h3 className="text-[10px] font-black uppercase tracking-[0.2em] text-stone-accent mb-6 border-b border-stone-accent/20 pb-2">Technical Data</h3>
                                <div className="grid grid-cols-2 gap-6">
                                    <input type="text" placeholder="Thickness (e.g. 18mm)" className="bg-stone-light/50 p-5 rounded-2xl border-none outline-none font-black text-center" />
                                    <input type="text" placeholder="Dimensions (e.g. 10x6ft)" className="bg-stone-light/50 p-5 rounded-2xl border-none outline-none font-black text-center" />
                                </div>
                            </section>

                            <section>
                                <h3 className="text-[10px] font-black uppercase tracking-[0.2em] text-stone-accent mb-6 border-b border-stone-accent/20 pb-2">Pricing & Logistics</h3>
                                <div className="grid grid-cols-2 gap-6">
                                    <div className="relative">
                                        <span className="absolute left-6 top-1/2 -translate-y-1/2 font-black text-stone-secondary text-lg">₹</span>
                                        <input type="number" placeholder="Rate" className="w-full bg-stone-light/50 pl-12 p-5 rounded-2xl border-none outline-none font-black" />
                                    </div>
                                    <select className="bg-stone-light/50 p-5 rounded-2xl border-none font-black outline-none">
                                        {Object.values(PriceUnit).map(u => <option key={u}>{u}</option>)}
                                    </select>
                                    <input type="number" placeholder="Min Qty" className="bg-stone-light/50 p-5 rounded-2xl border-none outline-none font-black text-center" />
                                    <input type="number" placeholder="Total Stock" className="bg-stone-light/50 p-5 rounded-2xl border-none outline-none font-black text-center" />
                                </div>
                            </section>
                        </div>

                        {/* Preview & Marketing */}
                        <div className="space-y-10">
                            <section>
                                <h3 className="text-[10px] font-black uppercase tracking-[0.2em] text-stone-accent mb-6 border-b border-stone-accent/20 pb-2">Architectural Description</h3>
                                <textarea
                                    placeholder="Marketing copy for designers..."
                                    className="w-full h-64 bg-stone-light/50 p-8 rounded-[3rem] border-none outline-none font-medium leading-relaxed text-lg italic shadow-inner"
                                    defaultValue={aiResult.includes(':') ? aiResult.split(':').slice(-1)[0] : aiResult}
                                ></textarea>
                            </section>

                            <div className="bg-stone-primary p-12 rounded-[4rem] text-white shadow-2xl relative overflow-hidden group">
                                <div className="absolute inset-0 bg-stone-accent/5 translate-x-1/2 skew-x-12 group-hover:translate-x-0 transition-transform duration-1000"></div>
                                <div className="relative z-10 flex flex-col items-center text-center">
                                    <ShieldIcon className="h-12 w-12 text-stone-accent mb-6" />
                                    <h4 className="text-xl font-black mb-3 tracking-tight">National Search Optimization</h4>
                                    <p className="text-sm text-stone-light/50 mb-10 leading-relaxed">This technical listing will be prioritized for architectural specification searches across India.</p>
                                    <button
                                        onClick={() => { alert("Listing Verified & Published"); onClose(); }}
                                        className="w-full bg-stone-accent text-stone-primary py-6 rounded-[2rem] font-black text-xl shadow-2xl hover:bg-white transition-all transform hover:-translate-y-2"
                                    >
                                        Live Now on Marketplace
                                    </button>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
            <style>{`
                .custom-scrollbar::-webkit-scrollbar { width: 8px; }
                .custom-scrollbar::-webkit-scrollbar-track { background: transparent; }
                .custom-scrollbar::-webkit-scrollbar-thumb { background: rgba(201,169,126,0.3); border-radius: 10px; }
            `}</style>
        </div>
    );
};

const AnalyticsCard: React.FC<{ title: string; value: string; subtitle: string; icon?: React.ReactNode }> = ({ title, value, subtitle, icon }) => (
    <div className="bg-white p-10 rounded-[3rem] shadow-sm border border-stone-accent/5 hover:shadow-2xl transition-all group">
        <div className="flex justify-between items-start mb-8">
            <h4 className="text-[10px] font-black text-stone-secondary uppercase tracking-[0.3em]">{title}</h4>
            <div className="p-4 bg-stone-light rounded-2xl group-hover:bg-stone-accent group-hover:text-stone-primary transition-all shadow-sm">{icon}</div>
        </div>
        <p className="text-5xl font-black text-stone-primary tracking-tighter mb-4">{value}</p>
        <p className="text-sm text-stone-secondary font-bold opacity-60">{subtitle}</p>
    </div>
);

const SellerDashboardPage: React.FC = () => {
    const { products } = useMockData();
    const sellerProducts = products.filter(p => p.seller.id === 1 || p.seller.id === 2);
    const [isListingOpen, setIsListingOpen] = useState(false);

    const silverLimit = 25;
    const currentListings = sellerProducts.length;

    return (
        <div className="space-y-16 pb-24">
            <header className="flex flex-col xl:flex-row justify-between items-start xl:items-center gap-10">
                <div>
                    <h1 className="text-6xl font-black tracking-tighter mb-4 text-stone-primary">Seller Success</h1>
                    <div className="flex flex-wrap items-center gap-4">
                        <div className="bg-stone-primary text-stone-accent text-[10px] font-black px-5 py-2 rounded-full flex items-center shadow-xl uppercase tracking-[0.2em] border border-stone-accent/20">
                            <ShieldIcon className="h-4 w-4 mr-2" /> Silver Trademark Member
                        </div>
                        <div className="flex items-center text-stone-secondary font-black text-xs gap-1">
                            <StarIcon className="h-4 w-4 text-amber-500" /> 4.8 Portfolio Excellence
                        </div>
                    </div>
                </div>
                <div className="flex gap-4 w-full xl:w-auto">
                    <button
                        onClick={() => setIsListingOpen(true)}
                        className="flex-1 xl:flex-none bg-stone-primary text-white px-10 py-6 rounded-[2rem] font-black shadow-[0_20px_50px_rgba(0,0,0,0.15)] hover:bg-stone-secondary transition-all transform hover:-translate-y-1 text-lg"
                    >
                        New Specification
                    </button>
                    <button className="flex-1 xl:flex-none bg-stone-accent text-stone-primary px-10 py-6 rounded-[2rem] font-black shadow-[0_20px_40px_rgba(201,169,126,0.3)] hover:scale-105 transition-transform text-lg">
                        Go Gold Verified
                    </button>
                </div>
            </header>

            {isListingOpen && <ProductListingForm onClose={() => setIsListingOpen(false)} />}

            {/* Live Leads Feed - High Priority */}
            <LeadFeed />

            {/* Demand Intelligence Heatmap - Gold Feature */}
            <DemandIntelligence />

            {/* AI Tools Grid */}
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
                <AIFastListing />
                <AILeadScorer />
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-3 gap-10">
                <div className="bg-stone-primary text-white p-12 rounded-[4rem] shadow-2xl relative overflow-hidden flex flex-col justify-between min-h-[350px]">
                    <div className="absolute top-0 right-0 w-64 h-64 bg-stone-accent/10 -translate-y-1/2 translate-x-1/2 rounded-full blur-[100px]"></div>
                    <div>
                        <h3 className="text-[10px] font-black uppercase tracking-[0.3em] text-stone-accent mb-8">Capacity Utilization</h3>
                        <p className="text-7xl font-black tracking-tighter mb-6">{currentListings} <span className="text-2xl font-normal opacity-30">/ {silverLimit}</span></p>
                        <div className="h-4 w-full bg-white/5 rounded-full overflow-hidden mb-8 border border-white/5 shadow-inner">
                            <div className="h-full bg-stone-accent transition-all duration-1000" style={{ width: `${(currentListings / silverLimit) * 100}%` }}></div>
                        </div>
                    </div>
                    <p className="text-[10px] opacity-40 uppercase font-black tracking-[0.2em] leading-relaxed max-w-[200px]">Strategic growth: Gold unlocks unmetered inventory reach.</p>
                </div>

                <AnalyticsCard
                    title="Verified Leads"
                    value="18"
                    subtitle="Direct architectural intent"
                    icon={<SendIcon className="h-8 w-8" />}
                />

                <AnalyticsCard
                    title="Search Reach"
                    value="4.2k"
                    subtitle="Specification impressions"
                    icon={<SearchIcon className="h-8 w-8" />}
                />
            </div>

            <section className="bg-white p-12 rounded-[4rem] shadow-sm border border-stone-accent/5">
                <div className="flex justify-between items-end mb-12">
                    <div>
                        <h2 className="text-4xl font-black tracking-tight text-stone-primary">Active Portfolio</h2>
                        <p className="text-stone-secondary font-medium mt-2">Live inventory being specified by architects.</p>
                    </div>
                    <div className="flex items-center gap-3 text-stone-secondary text-xs font-black uppercase tracking-widest bg-stone-light px-6 py-3 rounded-2xl">
                        <FilterIcon className="h-4 w-4" /> Latest Specs
                    </div>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-10">
                    {sellerProducts.map(product => (
                        <div key={product.id} className="group cursor-pointer flex flex-col h-full">
                            <div className="relative aspect-square rounded-[2.5rem] overflow-hidden mb-6 shadow-xl group-hover:shadow-[0_40px_80px_rgba(0,0,0,0.1)] transition-all duration-700">
                                <img src={product.images[0]} className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-1000" alt={product.name} />
                                <div className="absolute inset-0 bg-stone-primary/40 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center backdrop-blur-sm">
                                    <div className="flex flex-col gap-3 scale-90 group-hover:scale-100 transition-transform">
                                        <button className="bg-white text-stone-primary text-[10px] font-black px-6 py-3 rounded-2xl uppercase tracking-widest shadow-2xl">Edit Technicals</button>
                                        <button className="bg-stone-accent text-stone-primary text-[10px] font-black px-6 py-3 rounded-2xl uppercase tracking-widest shadow-2xl">Manage Stock</button>
                                    </div>
                                </div>
                            </div>
                            <div className="px-2 flex flex-col flex-grow">
                                <h4 className="font-black text-xl mb-2 text-stone-primary group-hover:text-stone-accent transition-colors leading-tight line-clamp-1">{product.name}</h4>
                                <div className="flex justify-between items-baseline mt-auto">
                                    <span className="text-[10px] font-black text-stone-secondary uppercase tracking-[0.2em]">{product.stoneType} &bull; {product.thickness}</span>
                                    <span className="text-lg font-black text-stone-primary tracking-tighter">₹{product.price}</span>
                                </div>
                            </div>
                        </div>
                    ))}
                </div>
            </section>
        </div>
    );
};

export default SellerDashboardPage;
