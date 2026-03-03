'use client';

import React, { useState } from 'react';
import { StoneType, PriceUnit } from '@/types';
import { SendIcon, XIcon, SparklesIcon } from '@/components/IconComponents';

interface RFQModalProps {
    isOpen: boolean;
    onClose: () => void;
}

const RFQModal: React.FC<RFQModalProps> = ({ isOpen, onClose }) => {
    const [step, setStep] = useState(1);
    const [loading, setLoading] = useState(false);

    if (!isOpen) return null;

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        setLoading(true);
        // Simulate API call
        setTimeout(() => {
            setLoading(false);
            setStep(2);
        }, 1500);
    };

    return (
        <div className="fixed inset-0 z-[70] bg-stone-primary/80 backdrop-blur-sm flex items-center justify-center p-4">
            <div className="bg-white w-full max-w-lg rounded-[2rem] shadow-2xl overflow-hidden animate-fade-in-up">
                {step === 1 ? (
                    <div className="p-8">
                        <div className="flex justify-between items-start mb-6">
                            <div>
                                <h2 className="text-2xl font-black text-stone-primary">Post Requirement</h2>
                                <p className="text-stone-secondary text-sm mt-1">Sellers will bid for your order.</p>
                            </div>
                            <button onClick={onClose} className="p-2 hover:bg-stone-light rounded-full">
                                <XIcon className="h-6 w-6 text-stone-secondary" />
                            </button>
                        </div>

                        <form onSubmit={handleSubmit} className="space-y-5">
                            <div>
                                <label className="text-[10px] font-black uppercase text-stone-secondary ml-1 mb-1.5 block">Stone Type</label>
                                <select className="w-full bg-stone-light/50 p-4 rounded-xl border border-stone-accent/10 font-bold outline-none focus:ring-2 focus:ring-stone-accent/50 appearance-none">
                                    {Object.values(StoneType).map(t => <option key={t}>{t}</option>)}
                                </select>
                            </div>

                            <div className="grid grid-cols-2 gap-4">
                                <div>
                                    <label className="text-[10px] font-black uppercase text-stone-secondary ml-1 mb-1.5 block">Quantity</label>
                                    <input type="number" placeholder="5000" required className="w-full bg-stone-light/50 p-4 rounded-xl border border-stone-accent/10 font-bold outline-none focus:ring-2 focus:ring-stone-accent/50" />
                                </div>
                                <div>
                                    <label className="text-[10px] font-black uppercase text-stone-secondary ml-1 mb-1.5 block">Unit</label>
                                    <select className="w-full bg-stone-light/50 p-4 rounded-xl border border-stone-accent/10 font-bold outline-none focus:ring-2 focus:ring-stone-accent/50 appearance-none">
                                        {Object.values(PriceUnit).map(u => <option key={u}>{u}</option>)}
                                    </select>
                                </div>
                            </div>

                            <div>
                                <label className="text-[10px] font-black uppercase text-stone-secondary ml-1 mb-1.5 block">Target Price / Unit</label>
                                <div className="relative">
                                    <span className="absolute left-4 top-1/2 -translate-y-1/2 font-bold text-stone-secondary">₹</span>
                                    <input type="text" placeholder="150 - 200" required className="w-full bg-stone-light/50 pl-8 p-4 rounded-xl border border-stone-accent/10 font-bold outline-none focus:ring-2 focus:ring-stone-accent/50" />
                                </div>
                            </div>

                            <div>
                                <label className="text-[10px] font-black uppercase text-stone-secondary ml-1 mb-1.5 block">Project Location</label>
                                <input type="text" placeholder="e.g. Whitefield, Bangalore" required className="w-full bg-stone-light/50 p-4 rounded-xl border border-stone-accent/10 font-bold outline-none focus:ring-2 focus:ring-stone-accent/50" />
                            </div>

                            <button
                                type="submit"
                                disabled={loading}
                                className="w-full bg-stone-primary text-white py-4 rounded-xl font-black text-sm uppercase tracking-widest hover:bg-stone-secondary transition-all shadow-lg flex items-center justify-center gap-2 mt-4"
                            >
                                {loading ? (
                                    <>
                                        <div className="w-4 h-4 border-2 border-white/30 border-t-white rounded-full animate-spin"></div>
                                        Broadcasting...
                                    </>
                                ) : (
                                    <>
                                        Broadcast Requirement
                                        <SendIcon className="h-4 w-4" />
                                    </>
                                )}
                            </button>
                        </form>
                    </div>
                ) : (
                    <div className="p-10 text-center bg-stone-primary text-white relative overflow-hidden">
                        <div className="absolute top-0 right-0 w-64 h-64 bg-stone-accent/10 rounded-full blur-3xl -translate-y-1/2 translate-x-1/2"></div>
                        <div className="relative z-10">
                            <div className="w-20 h-20 bg-stone-accent text-stone-primary rounded-full flex items-center justify-center mx-auto mb-6 shadow-xl animate-bounce-soft">
                                <SparklesIcon className="h-10 w-10" />
                            </div>
                            <h2 className="text-3xl font-black mb-4">Broadcast Live!</h2>
                            <p className="text-white/70 mb-8 leading-relaxed">
                                Your requirement has been sent to top-rated sellers. Expect bids within 24 hours.
                            </p>
                            <button
                                onClick={onClose}
                                className="bg-white text-stone-primary px-8 py-3 rounded-xl font-bold hover:bg-stone-light transition-colors shadow-lg"
                            >
                                Done
                            </button>
                        </div>
                    </div>
                )}
            </div>
        </div>
    );
};

export default RFQModal;
