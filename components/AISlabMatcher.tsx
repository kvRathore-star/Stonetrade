'use client';

import React, { useState, useRef } from 'react';
import { SparklesIcon, XIcon, SearchIcon } from '@/components/IconComponents';
import { Product } from '@/types';
import { useMockData } from '@/hooks/useMockData';

interface SlabMatcherProps {
    isOpen: boolean;
    onClose: () => void;
    onSelectProduct: (product: Product) => void;
}

const AISlabMatcher: React.FC<SlabMatcherProps> = ({ isOpen, onClose, onSelectProduct }) => {
    const { products } = useMockData();
    const [uploadedImage, setUploadedImage] = useState<string | null>(null);
    const [searching, setSearching] = useState(false);
    const [matches, setMatches] = useState<{ product: Product; matchScore: number }[]>([]);
    const fileInputRef = useRef<HTMLInputElement>(null);

    const handleImageUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
        const file = e.target.files?.[0];
        if (!file) return;

        const reader = new FileReader();
        reader.onloadend = async () => {
            setUploadedImage(reader.result as string);
            await findMatches();
        };
        reader.readAsDataURL(file);
    };

    const findMatches = async () => {
        setSearching(true);
        // Simulate AI matching delay
        await new Promise(resolve => setTimeout(resolve, 2000));

        // Mock: Return random products with match scores
        const shuffled = [...products].sort(() => Math.random() - 0.5);
        const results = shuffled.slice(0, 5).map((product, i) => ({
            product,
            matchScore: Math.round(95 - i * 8 + Math.random() * 5),
        }));

        setMatches(results);
        setSearching(false);
    };

    const handleDrop = (e: React.DragEvent) => {
        e.preventDefault();
        const file = e.dataTransfer.files?.[0];
        if (file && file.type.startsWith('image/')) {
            const reader = new FileReader();
            reader.onloadend = async () => {
                setUploadedImage(reader.result as string);
                await findMatches();
            };
            reader.readAsDataURL(file);
        }
    };

    if (!isOpen) return null;

    return (
        <div className="fixed inset-0 z-[70] flex items-center justify-center bg-stone-primary/95 backdrop-blur-sm p-4">
            <div className="bg-white rounded-[3rem] w-full max-w-4xl overflow-hidden shadow-2xl max-h-[90vh] overflow-y-auto">
                {/* Header */}
                <div className="bg-gradient-to-r from-violet-600 to-purple-600 text-white p-8 relative">
                    <button onClick={onClose} className="absolute top-6 right-6 p-2 hover:bg-white/10 rounded-full">
                        <XIcon className="h-6 w-6" />
                    </button>
                    <div className="flex items-center gap-4">
                        <div className="w-16 h-16 bg-white/20 rounded-2xl flex items-center justify-center">
                            <SearchIcon className="h-8 w-8" />
                        </div>
                        <div>
                            <h2 className="text-2xl font-black">AI Slab Matcher</h2>
                            <p className="text-white/70">Upload a design image to find matching stones</p>
                        </div>
                    </div>
                    <div className="absolute top-4 right-20 bg-amber-400 text-stone-primary text-[9px] font-black px-3 py-1 rounded-full">
                        PRO EXCLUSIVE
                    </div>
                </div>

                <div className="p-8">
                    {!uploadedImage ? (
                        <div
                            onDrop={handleDrop}
                            onDragOver={(e) => e.preventDefault()}
                            onClick={() => fileInputRef.current?.click()}
                            className="border-4 border-dashed border-violet-300 rounded-[2rem] p-16 text-center cursor-pointer hover:border-violet-500 hover:bg-violet-50/50 transition-all"
                        >
                            <SparklesIcon className="h-16 w-16 text-violet-500 mx-auto mb-6" />
                            <h3 className="text-2xl font-black text-stone-primary mb-2">Upload Design Reference</h3>
                            <p className="text-stone-secondary mb-4">Pinterest, magazine, or any inspiration image</p>
                            <p className="text-sm text-stone-secondary/60">AI will analyze colors, patterns, and textures to find matching stones</p>
                            <input
                                ref={fileInputRef}
                                type="file"
                                accept="image/*"
                                onChange={handleImageUpload}
                                className="hidden"
                            />
                        </div>
                    ) : (
                        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
                            {/* Uploaded Image */}
                            <div>
                                <p className="text-[10px] font-black text-stone-secondary uppercase tracking-wider mb-3">Your Reference</p>
                                <img src={uploadedImage} alt="Reference" className="w-full aspect-square object-cover rounded-2xl shadow-lg" />
                                <button
                                    onClick={() => { setUploadedImage(null); setMatches([]); }}
                                    className="mt-3 text-sm text-violet-600 hover:underline"
                                >
                                    Upload different image
                                </button>
                            </div>

                            {/* Matches */}
                            <div className="lg:col-span-2">
                                <p className="text-[10px] font-black text-stone-secondary uppercase tracking-wider mb-3">Matching Stones</p>

                                {searching ? (
                                    <div className="h-64 flex flex-col items-center justify-center">
                                        <div className="w-16 h-16 border-4 border-violet-500 border-t-transparent rounded-full animate-spin mb-4"></div>
                                        <p className="text-stone-secondary">Analyzing patterns and textures...</p>
                                    </div>
                                ) : (
                                    <div className="space-y-4">
                                        {matches.map(({ product, matchScore }, i) => (
                                            <div
                                                key={product.id}
                                                onClick={() => onSelectProduct(product)}
                                                className={`flex gap-4 p-4 rounded-2xl cursor-pointer transition-all hover:scale-[1.02] ${i === 0 ? 'bg-gradient-to-r from-violet-50 to-purple-50 border-2 border-violet-300' : 'bg-stone-light/50 hover:bg-violet-50'
                                                    }`}
                                            >
                                                <img src={product.images[0]} alt={product.name} className="w-20 h-20 rounded-xl object-cover" />
                                                <div className="flex-1">
                                                    <div className="flex items-center gap-2 mb-1">
                                                        <p className="font-bold text-stone-primary">{product.name}</p>
                                                        {i === 0 && <span className="text-[9px] bg-violet-500 text-white px-2 py-0.5 rounded-full font-bold">BEST MATCH</span>}
                                                    </div>
                                                    <p className="text-sm text-stone-secondary">{product.stoneType} • {product.origin}</p>
                                                    <p className="text-sm font-bold text-stone-primary mt-1">₹{product.price}/{product.priceUnit}</p>
                                                </div>
                                                <div className="text-right">
                                                    <p className={`text-2xl font-black ${matchScore >= 90 ? 'text-green-600' : matchScore >= 80 ? 'text-amber-600' : 'text-stone-secondary'}`}>
                                                        {matchScore}%
                                                    </p>
                                                    <p className="text-[10px] text-stone-secondary">match</p>
                                                </div>
                                            </div>
                                        ))}
                                    </div>
                                )}
                            </div>
                        </div>
                    )}
                </div>
            </div>
        </div>
    );
};

export default AISlabMatcher;
