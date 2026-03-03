'use client';

import React, { useState } from 'react';
import { SparklesIcon } from '@/components/IconComponents';

interface QuoteItem {
    name: string;
    quantity: number;
    unit: string;
    pricePerUnit: number;
    total: number;
}

const AIQuoteGenerator: React.FC = () => {
    const [clientName, setClientName] = useState('');
    const [projectName, setProjectName] = useState('');
    const [showQuote, setShowQuote] = useState(false);

    const [items] = useState<QuoteItem[]>([
        { name: 'White Statuario Premium', quantity: 150, unit: 'sq.ft', pricePerUnit: 1850, total: 277500 },
        { name: 'Kashmir White Granite', quantity: 80, unit: 'sq.ft', pricePerUnit: 750, total: 60000 },
        { name: 'Black Galaxy Counter', quantity: 25, unit: 'sq.ft', pricePerUnit: 950, total: 23750 },
    ]);

    const subtotal = items.reduce((sum, item) => sum + item.total, 0);
    const gst = subtotal * 0.18;
    const total = subtotal + gst;

    const generateQuote = () => {
        if (clientName && projectName) {
            setShowQuote(true);
        }
    };

    return (
        <div className="bg-white rounded-3xl border border-amber-200 overflow-hidden">
            {/* Header */}
            <div className="bg-gradient-to-r from-amber-500 to-orange-600 text-white p-5">
                <div className="flex items-center gap-3">
                    <div className="w-10 h-10 bg-white/20 rounded-xl flex items-center justify-center">
                        <span className="text-xl">📝</span>
                    </div>
                    <div>
                        <h3 className="font-bold flex items-center gap-2">
                            AI Quote Generator
                            <span className="bg-white/20 text-[9px] px-2 py-0.5 rounded-full">ELITE</span>
                        </h3>
                        <p className="text-white/70 text-xs">Auto-generate professional client quotes</p>
                    </div>
                </div>
            </div>

            <div className="p-5">
                {!showQuote ? (
                    <div className="space-y-4">
                        <div>
                            <label className="text-xs font-bold text-stone-secondary uppercase mb-1 block">Client Name</label>
                            <input
                                type="text"
                                value={clientName}
                                onChange={(e) => setClientName(e.target.value)}
                                placeholder="Enter client name"
                                className="w-full px-4 py-3 rounded-xl bg-stone-light/50 border border-stone-accent/10 text-sm focus:outline-none focus:ring-2 focus:ring-amber-400"
                            />
                        </div>
                        <div>
                            <label className="text-xs font-bold text-stone-secondary uppercase mb-1 block">Project Name</label>
                            <input
                                type="text"
                                value={projectName}
                                onChange={(e) => setProjectName(e.target.value)}
                                placeholder="e.g., Villa Interior, Office Lobby"
                                className="w-full px-4 py-3 rounded-xl bg-stone-light/50 border border-stone-accent/10 text-sm focus:outline-none focus:ring-2 focus:ring-amber-400"
                            />
                        </div>
                        <div className="bg-amber-50 p-4 rounded-xl">
                            <p className="text-xs font-bold text-amber-700 mb-2">📦 From your cart ({items.length} items)</p>
                            <div className="space-y-1">
                                {items.map((item, i) => (
                                    <p key={i} className="text-xs text-amber-600">{item.name} - {item.quantity} {item.unit}</p>
                                ))}
                            </div>
                        </div>
                        <button
                            onClick={generateQuote}
                            disabled={!clientName || !projectName}
                            className={`w-full py-4 rounded-xl font-bold transition-all ${clientName && projectName
                                    ? 'bg-gradient-to-r from-amber-500 to-orange-500 text-white hover:from-amber-600 hover:to-orange-600'
                                    : 'bg-stone-light text-stone-secondary cursor-not-allowed'
                                }`}
                        >
                            <SparklesIcon className="h-4 w-4 inline mr-2" />
                            Generate Quote with AI
                        </button>
                    </div>
                ) : (
                    /* Generated Quote Preview */
                    <div className="space-y-4">
                        <div className="bg-stone-light/50 p-4 rounded-xl">
                            <div className="flex justify-between items-start mb-4">
                                <div>
                                    <p className="font-black text-stone-primary text-lg">QUOTATION</p>
                                    <p className="text-xs text-stone-secondary">#{Math.random().toString(36).substr(2, 9).toUpperCase()}</p>
                                </div>
                                <div className="text-right">
                                    <p className="text-xs text-stone-secondary">Client</p>
                                    <p className="font-bold text-stone-primary">{clientName}</p>
                                </div>
                            </div>
                            <p className="text-xs text-stone-secondary mb-3">Project: {projectName}</p>

                            <table className="w-full text-xs">
                                <thead>
                                    <tr className="border-b border-stone-accent/20">
                                        <th className="text-left py-2">Item</th>
                                        <th className="text-right py-2">Qty</th>
                                        <th className="text-right py-2">Rate</th>
                                        <th className="text-right py-2">Total</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    {items.map((item, i) => (
                                        <tr key={i} className="border-b border-stone-accent/10">
                                            <td className="py-2">{item.name}</td>
                                            <td className="text-right">{item.quantity}</td>
                                            <td className="text-right">₹{item.pricePerUnit}</td>
                                            <td className="text-right font-bold">₹{item.total.toLocaleString()}</td>
                                        </tr>
                                    ))}
                                </tbody>
                            </table>

                            <div className="mt-4 pt-4 border-t border-stone-accent/20">
                                <div className="flex justify-between text-xs"><span>Subtotal</span><span>₹{subtotal.toLocaleString()}</span></div>
                                <div className="flex justify-between text-xs text-stone-secondary"><span>GST (18%)</span><span>₹{gst.toLocaleString()}</span></div>
                                <div className="flex justify-between text-sm font-black mt-2"><span>Total</span><span className="text-emerald-600">₹{total.toLocaleString()}</span></div>
                            </div>
                        </div>

                        <div className="flex gap-3">
                            <button className="flex-1 py-3 rounded-xl font-bold bg-emerald-500 text-white hover:bg-emerald-600 transition-all text-sm">
                                📤 Share via WhatsApp
                            </button>
                            <button className="flex-1 py-3 rounded-xl font-bold bg-stone-primary text-white hover:bg-stone-secondary transition-all text-sm">
                                📥 Download PDF
                            </button>
                        </div>
                        <button
                            onClick={() => setShowQuote(false)}
                            className="w-full py-2 text-sm text-stone-secondary hover:text-stone-primary"
                        >
                            ← Generate Another Quote
                        </button>
                    </div>
                )}
            </div>
        </div>
    );
};

export default AIQuoteGenerator;
