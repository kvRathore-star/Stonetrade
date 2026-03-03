'use client';

import React, { useState } from 'react';
import { useMockData } from '@/hooks/useMockData';

interface QuoteResult {
    stone: string;
    pricePerSqFt: number;
    totalArea: number;
    wastage: number;
    totalMaterial: number;
    estimatedCost: number;
}

interface QuoteCalculatorProps {
    isOpen: boolean;
    onClose: () => void;
}

const QuoteCalculator: React.FC<QuoteCalculatorProps> = ({ isOpen, onClose }) => {
    const { products } = useMockData();
    const [length, setLength] = useState('');
    const [width, setWidth] = useState('');
    const [roomType, setRoomType] = useState('living');
    const [results, setResults] = useState<QuoteResult[]>([]);

    const roomTypes = [
        { id: 'living', name: 'Living Room', wastage: 10 },
        { id: 'bathroom', name: 'Bathroom', wastage: 15 },
        { id: 'kitchen', name: 'Kitchen', wastage: 12 },
        { id: 'exterior', name: 'Exterior', wastage: 20 },
    ];

    const calculateQuote = () => {
        const area = parseFloat(length) * parseFloat(width);
        if (isNaN(area) || area <= 0) return;

        const wastagePercent = roomTypes.find(r => r.id === roomType)?.wastage || 10;
        const totalWithWastage = area * (1 + wastagePercent / 100);

        // Get top 5 products and calculate costs
        const quotes: QuoteResult[] = products.slice(0, 5).map(product => ({
            stone: product.name,
            pricePerSqFt: product.price,
            totalArea: area,
            wastage: wastagePercent,
            totalMaterial: Math.ceil(totalWithWastage),
            estimatedCost: Math.round(totalWithWastage * product.price),
        }));

        setResults(quotes.sort((a, b) => a.estimatedCost - b.estimatedCost));
    };

    if (!isOpen) return null;

    return (
        <div className="fixed inset-0 z-[60] flex items-center justify-center bg-stone-primary/90 backdrop-blur-sm p-4">
            <div className="bg-white rounded-[3rem] w-full max-w-2xl overflow-hidden shadow-2xl">
                {/* Header */}
                <div className="bg-gradient-to-r from-amber-500 to-orange-500 text-white p-8">
                    <h2 className="text-2xl font-black">Quick Quote Calculator</h2>
                    <p className="text-white/70">Estimate material and cost for your project</p>
                </div>

                <div className="p-8">
                    {/* Input Form */}
                    <div className="grid grid-cols-2 gap-6 mb-8">
                        <div>
                            <label className="text-[10px] font-black text-stone-secondary uppercase tracking-wider block mb-2">Length (ft)</label>
                            <input
                                type="number"
                                value={length}
                                onChange={(e) => setLength(e.target.value)}
                                placeholder="e.g. 20"
                                className="w-full bg-stone-light/50 p-4 rounded-xl text-lg font-bold outline-none focus:ring-2 focus:ring-amber-500"
                            />
                        </div>
                        <div>
                            <label className="text-[10px] font-black text-stone-secondary uppercase tracking-wider block mb-2">Width (ft)</label>
                            <input
                                type="number"
                                value={width}
                                onChange={(e) => setWidth(e.target.value)}
                                placeholder="e.g. 15"
                                className="w-full bg-stone-light/50 p-4 rounded-xl text-lg font-bold outline-none focus:ring-2 focus:ring-amber-500"
                            />
                        </div>
                        <div className="col-span-2">
                            <label className="text-[10px] font-black text-stone-secondary uppercase tracking-wider block mb-2">Room Type</label>
                            <div className="flex gap-3">
                                {roomTypes.map(room => (
                                    <button
                                        key={room.id}
                                        onClick={() => setRoomType(room.id)}
                                        className={`flex-1 py-3 rounded-xl font-bold text-sm transition-all ${roomType === room.id
                                                ? 'bg-amber-500 text-white'
                                                : 'bg-stone-light text-stone-secondary hover:bg-amber-100'
                                            }`}
                                    >
                                        {room.name}
                                        <span className="block text-[10px] opacity-70">+{room.wastage}% wastage</span>
                                    </button>
                                ))}
                            </div>
                        </div>
                    </div>

                    <button
                        onClick={calculateQuote}
                        className="w-full bg-stone-primary text-white py-4 rounded-2xl font-black hover:bg-stone-secondary transition-colors mb-8"
                    >
                        Calculate Estimates
                    </button>

                    {/* Results */}
                    {results.length > 0 && (
                        <div className="space-y-4">
                            <div className="flex justify-between items-center mb-4">
                                <h3 className="font-black text-lg">Estimated Costs</h3>
                                <p className="text-sm text-stone-secondary">
                                    Area: {parseFloat(length) * parseFloat(width)} sq ft → {results[0]?.totalMaterial} sq ft (with wastage)
                                </p>
                            </div>
                            {results.map((result, i) => (
                                <div key={i} className={`p-4 rounded-2xl border-2 ${i === 0 ? 'border-amber-400 bg-amber-50' : 'border-stone-accent/10 bg-white'}`}>
                                    <div className="flex justify-between items-center">
                                        <div>
                                            <p className="font-bold text-stone-primary">{result.stone}</p>
                                            <p className="text-sm text-stone-secondary">₹{result.pricePerSqFt}/sq ft × {result.totalMaterial} sq ft</p>
                                        </div>
                                        <div className="text-right">
                                            <p className="text-2xl font-black text-stone-primary">₹{result.estimatedCost.toLocaleString()}</p>
                                            {i === 0 && <span className="text-[10px] bg-amber-500 text-white px-2 py-0.5 rounded-full font-bold">BEST VALUE</span>}
                                        </div>
                                    </div>
                                </div>
                            ))}
                        </div>
                    )}

                    <button
                        onClick={onClose}
                        className="w-full mt-6 border-2 border-stone-primary text-stone-primary py-3 rounded-2xl font-bold hover:bg-stone-light transition-colors"
                    >
                        Close
                    </button>
                </div>
            </div>
        </div>
    );
};

export default QuoteCalculator;
