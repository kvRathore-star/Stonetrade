'use client';

import React, { useState, useRef } from 'react';
import { SparklesIcon, XIcon } from '@/components/IconComponents';

interface StoneAnalysis {
    stoneType: string;
    color: string;
    veinPattern: string;
    finish: string;
    origin: string;
    suggestedUses: string[];
    marketingCopy: string;
    technicalSpecs: {
        thickness: string;
        density: string;
        waterAbsorption: string;
        compressiveStrength: string;
    };
}

interface AIVisionStudioProps {
    onAnalysisComplete: (analysis: StoneAnalysis, imageUrl: string) => void;
    onClose: () => void;
}

const AIVisionStudio: React.FC<AIVisionStudioProps> = ({ onAnalysisComplete, onClose }) => {
    const [image, setImage] = useState<string | null>(null);
    const [analyzing, setAnalyzing] = useState(false);
    const [analysis, setAnalysis] = useState<StoneAnalysis | null>(null);
    const fileInputRef = useRef<HTMLInputElement>(null);

    const handleImageUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
        const file = e.target.files?.[0];
        if (file) {
            const reader = new FileReader();
            reader.onloadend = () => {
                setImage(reader.result as string);
                analyzeImage(reader.result as string);
            };
            reader.readAsDataURL(file);
        }
    };

    const handleDrop = (e: React.DragEvent) => {
        e.preventDefault();
        const file = e.dataTransfer.files?.[0];
        if (file && file.type.startsWith('image/')) {
            const reader = new FileReader();
            reader.onloadend = () => {
                setImage(reader.result as string);
                analyzeImage(reader.result as string);
            };
            reader.readAsDataURL(file);
        }
    };

    const analyzeImage = async (imageData: string) => {
        setAnalyzing(true);

        // Simulate Gemini API call - In production, this would call your backend
        // which then calls Gemini 2.0 Flash with the image
        await new Promise(resolve => setTimeout(resolve, 2500));

        // Mock AI analysis result
        const mockAnalysis: StoneAnalysis = {
            stoneType: 'Italian Statuario Marble',
            color: 'Pure White with Grey Veining',
            veinPattern: 'Bold, dramatic grey veins with subtle gold undertones',
            finish: 'Polished',
            origin: 'Carrara, Italy',
            suggestedUses: ['Luxury Bathrooms', 'Kitchen Islands', 'Feature Walls', 'Hotel Lobbies'],
            marketingCopy: `Exquisite Italian Statuario Marble, quarried from the legendary hills of Carrara. This premium slab features dramatic grey veining across a pristine white canvas, creating a timeless aesthetic that has graced palaces and luxury homes for centuries. Each piece is a unique work of natural art, perfect for discerning architects seeking uncompromising elegance.`,
            technicalSpecs: {
                thickness: '18-20mm',
                density: '2.71 g/cm³',
                waterAbsorption: '0.20%',
                compressiveStrength: '131 MPa',
            },
        };

        setAnalysis(mockAnalysis);
        setAnalyzing(false);
    };

    const handleConfirm = () => {
        if (analysis && image) {
            onAnalysisComplete(analysis, image);
        }
    };

    return (
        <div className="fixed inset-0 z-[70] flex items-center justify-center bg-stone-primary/95 backdrop-blur-sm p-4 overflow-y-auto">
            <div className="bg-white rounded-[3rem] w-full max-w-4xl overflow-hidden shadow-2xl my-8">
                {/* Header */}
                <div className="bg-gradient-to-r from-purple-600 to-indigo-600 text-white p-8 relative">
                    <button onClick={onClose} className="absolute top-6 right-6 p-2 hover:bg-white/10 rounded-full">
                        <XIcon className="h-6 w-6" />
                    </button>
                    <div className="flex items-center gap-4">
                        <div className="w-16 h-16 bg-white/20 rounded-2xl flex items-center justify-center">
                            <SparklesIcon className="h-8 w-8" />
                        </div>
                        <div>
                            <h2 className="text-2xl font-black">AI Vision Studio</h2>
                            <p className="text-white/70">Powered by Gemini 2.0 Flash</p>
                        </div>
                    </div>
                </div>

                <div className="p-8">
                    {!image ? (
                        /* Upload Zone */
                        <div
                            onDrop={handleDrop}
                            onDragOver={(e) => e.preventDefault()}
                            onClick={() => fileInputRef.current?.click()}
                            className="border-4 border-dashed border-stone-accent/30 rounded-[2rem] p-16 text-center cursor-pointer hover:border-purple-500 hover:bg-purple-50/50 transition-all"
                        >
                            <CameraIcon className="h-16 w-16 text-purple-500 mx-auto mb-6" />
                            <h3 className="text-2xl font-black text-stone-primary mb-2">Upload Slab Photo</h3>
                            <p className="text-stone-secondary mb-6">Drag & drop or click to upload</p>
                            <p className="text-sm text-stone-secondary/60">AI will identify stone type, analyze patterns, and write marketing copy</p>
                            <input
                                ref={fileInputRef}
                                type="file"
                                accept="image/*"
                                onChange={handleImageUpload}
                                className="hidden"
                            />
                        </div>
                    ) : (
                        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
                            {/* Image Preview */}
                            <div>
                                <img src={image} alt="Uploaded slab" className="w-full aspect-square object-cover rounded-2xl shadow-lg" />
                                <button
                                    onClick={() => { setImage(null); setAnalysis(null); }}
                                    className="mt-4 text-sm text-red-500 hover:underline"
                                >
                                    Upload different image
                                </button>
                            </div>

                            {/* Analysis Results */}
                            <div>
                                {analyzing ? (
                                    <div className="h-full flex flex-col items-center justify-center text-center">
                                        <div className="w-20 h-20 border-4 border-purple-500 border-t-transparent rounded-full animate-spin mb-6"></div>
                                        <h3 className="text-xl font-bold text-stone-primary mb-2">Analyzing with Gemini AI...</h3>
                                        <p className="text-stone-secondary text-sm">Identifying stone type, patterns, and generating specs</p>
                                    </div>
                                ) : analysis ? (
                                    <div className="space-y-6">
                                        <div className="bg-gradient-to-r from-purple-50 to-indigo-50 p-4 rounded-2xl border border-purple-200">
                                            <p className="text-[10px] font-black text-purple-600 uppercase tracking-wider mb-1">Identified Stone</p>
                                            <p className="text-xl font-black text-stone-primary">{analysis.stoneType}</p>
                                        </div>

                                        <div className="grid grid-cols-2 gap-4">
                                            <div className="bg-stone-light/50 p-4 rounded-xl">
                                                <p className="text-[10px] font-bold text-stone-secondary uppercase">Color</p>
                                                <p className="font-bold text-stone-primary text-sm">{analysis.color}</p>
                                            </div>
                                            <div className="bg-stone-light/50 p-4 rounded-xl">
                                                <p className="text-[10px] font-bold text-stone-secondary uppercase">Finish</p>
                                                <p className="font-bold text-stone-primary text-sm">{analysis.finish}</p>
                                            </div>
                                            <div className="bg-stone-light/50 p-4 rounded-xl">
                                                <p className="text-[10px] font-bold text-stone-secondary uppercase">Origin</p>
                                                <p className="font-bold text-stone-primary text-sm">{analysis.origin}</p>
                                            </div>
                                            <div className="bg-stone-light/50 p-4 rounded-xl">
                                                <p className="text-[10px] font-bold text-stone-secondary uppercase">Pattern</p>
                                                <p className="font-bold text-stone-primary text-sm truncate">{analysis.veinPattern.split(',')[0]}</p>
                                            </div>
                                        </div>

                                        <div>
                                            <p className="text-[10px] font-black text-stone-secondary uppercase tracking-wider mb-2">Suggested Uses</p>
                                            <div className="flex flex-wrap gap-2">
                                                {analysis.suggestedUses.map((use, i) => (
                                                    <span key={i} className="bg-purple-100 text-purple-700 px-3 py-1 rounded-full text-xs font-bold">{use}</span>
                                                ))}
                                            </div>
                                        </div>

                                        <div className="bg-stone-primary text-white p-4 rounded-2xl">
                                            <p className="text-[10px] font-black text-stone-accent uppercase tracking-wider mb-2">AI Marketing Copy</p>
                                            <p className="text-sm leading-relaxed opacity-90">{analysis.marketingCopy}</p>
                                        </div>

                                        <button
                                            onClick={handleConfirm}
                                            className="w-full bg-gradient-to-r from-purple-600 to-indigo-600 text-white py-4 rounded-2xl font-black hover:from-purple-700 hover:to-indigo-700 transition-all shadow-xl"
                                        >
                                            Use This Analysis → Create Listing
                                        </button>
                                    </div>
                                ) : null}
                            </div>
                        </div>
                    )}
                </div>
            </div>
        </div>
    );
};

// Camera Icon component
const CameraIcon: React.FC<{ className?: string }> = ({ className }) => (
    <svg className={className} fill="none" viewBox="0 0 24 24" stroke="currentColor">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 9a2 2 0 012-2h.93a2 2 0 001.664-.89l.812-1.22A2 2 0 0110.07 4h3.86a2 2 0 011.664.89l.812 1.22A2 2 0 0018.07 7H19a2 2 0 012 2v9a2 2 0 01-2 2H5a2 2 0 01-2-2V9z" />
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 13a3 3 0 11-6 0 3 3 0 016 0z" />
    </svg>
);

export default AIVisionStudio;
