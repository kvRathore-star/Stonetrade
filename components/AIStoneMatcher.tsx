'use client';

import React, { useState } from 'react';
import { SparklesIcon, CameraIcon, SearchIcon } from '@/components/IconComponents';

interface MatchResult {
    id: number;
    name: string;
    similarity: number;
    price: number;
    image: string;
}

const AIStoneMatcher: React.FC<{ onProductClick?: (id: number) => void }> = ({ onProductClick }) => {
    const [uploadedImage, setUploadedImage] = useState<string | null>(null);
    const [isAnalyzing, setIsAnalyzing] = useState(false);
    const [results, setResults] = useState<MatchResult[]>([]);
    const [showResults, setShowResults] = useState(false);

    // Mock results
    const mockResults: MatchResult[] = [
        { id: 1, name: 'White Statuario Premium', similarity: 96, price: 1850, image: 'https://images.unsplash.com/photo-1558618666-fcd25c85cd64?w=200' },
        { id: 2, name: 'Carrara Venato Classic', similarity: 89, price: 1650, image: 'https://images.unsplash.com/photo-1600585152220-90363fe7e115?w=200' },
        { id: 3, name: 'Calacatta Gold Extra', similarity: 84, price: 2200, image: 'https://images.unsplash.com/photo-1615971677499-5467cbab01c0?w=200' },
    ];

    const handleImageUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
        const file = e.target.files?.[0];
        if (file) {
            const reader = new FileReader();
            reader.onloadend = () => {
                setUploadedImage(reader.result as string);
                analyzeImage();
            };
            reader.readAsDataURL(file);
        }
    };

    const analyzeImage = () => {
        setIsAnalyzing(true);
        setShowResults(false);

        // Simulate AI analysis
        setTimeout(() => {
            setIsAnalyzing(false);
            setResults(mockResults);
            setShowResults(true);
        }, 2000);
    };

    const reset = () => {
        setUploadedImage(null);
        setResults([]);
        setShowResults(false);
    };

    return (
        <div className="bg-white rounded-3xl border border-violet-200 overflow-hidden">
            {/* Header */}
            <div className="bg-gradient-to-r from-violet-500 to-purple-600 text-white p-5">
                <div className="flex items-center gap-3">
                    <div className="w-10 h-10 bg-white/20 rounded-xl flex items-center justify-center">
                        <SparklesIcon className="h-5 w-5" />
                    </div>
                    <div>
                        <h3 className="font-bold flex items-center gap-2">
                            AI Stone Matcher
                            <span className="bg-white/20 text-[9px] px-2 py-0.5 rounded-full">PRO</span>
                        </h3>
                        <p className="text-white/70 text-xs">Upload a photo, find similar stones instantly</p>
                    </div>
                </div>
            </div>

            <div className="p-5">
                {!uploadedImage ? (
                    /* Upload Zone */
                    <label className="block cursor-pointer">
                        <div className="border-2 border-dashed border-violet-300 rounded-2xl p-8 text-center hover:border-violet-500 hover:bg-violet-50 transition-all">
                            <CameraIcon className="h-12 w-12 mx-auto text-violet-400 mb-3" />
                            <p className="font-bold text-stone-primary mb-1">Drop an image or click to upload</p>
                            <p className="text-xs text-stone-secondary">JPG, PNG up to 10MB</p>
                        </div>
                        <input type="file" accept="image/*" className="hidden" onChange={handleImageUpload} />
                    </label>
                ) : (
                    <>
                        {/* Uploaded Image */}
                        <div className="relative mb-4">
                            <img src={uploadedImage} className="w-full h-40 object-cover rounded-2xl" alt="Uploaded" />
                            <button
                                onClick={reset}
                                className="absolute top-2 right-2 bg-white/90 rounded-full p-1.5 text-stone-secondary hover:text-red-500"
                            >
                                ✕
                            </button>
                        </div>

                        {/* Analysis State */}
                        {isAnalyzing && (
                            <div className="text-center py-6">
                                <div className="w-12 h-12 border-4 border-violet-500 border-t-transparent rounded-full animate-spin mx-auto mb-3"></div>
                                <p className="font-bold text-violet-600">Analyzing stone pattern...</p>
                                <p className="text-xs text-stone-secondary">Scanning 10,000+ listings</p>
                            </div>
                        )}

                        {/* Results */}
                        {showResults && (
                            <div className="space-y-3">
                                <p className="text-xs font-bold text-stone-secondary uppercase tracking-wider">
                                    🎯 {results.length} Matches Found
                                </p>
                                {results.map((match) => (
                                    <div
                                        key={match.id}
                                        onClick={() => onProductClick?.(match.id)}
                                        className="flex items-center gap-4 p-3 rounded-xl bg-stone-light/50 hover:bg-violet-50 cursor-pointer transition-all"
                                    >
                                        <img src={match.image} className="w-14 h-14 rounded-xl object-cover" alt={match.name} />
                                        <div className="flex-1">
                                            <p className="font-bold text-stone-primary text-sm">{match.name}</p>
                                            <p className="text-xs text-stone-secondary">₹{match.price}/sq.ft</p>
                                        </div>
                                        <div className={`text-sm font-black px-3 py-1 rounded-full ${match.similarity > 90 ? 'bg-emerald-100 text-emerald-700' : 'bg-violet-100 text-violet-700'
                                            }`}>
                                            {match.similarity}%
                                        </div>
                                    </div>
                                ))}
                                <button
                                    onClick={reset}
                                    className="w-full py-3 text-center text-sm font-bold text-violet-600 hover:bg-violet-50 rounded-xl transition-all"
                                >
                                    🔍 Try Another Photo
                                </button>
                            </div>
                        )}
                    </>
                )}
            </div>
        </div>
    );
};

export default AIStoneMatcher;
