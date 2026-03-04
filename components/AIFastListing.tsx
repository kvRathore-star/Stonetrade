'use client';

import React, { useState, useRef } from 'react';
import { SparklesIcon, CameraIcon } from '@/components/IconComponents';

interface ExtractedData {
    name: string;
    stoneType: string;
    color: string;
    finish: string;
    thickness: string;
    origin: string;
    price: number;
}

const AIFastListing: React.FC = () => {
    const [uploadedImage, setUploadedImage] = useState<string | null>(null);
    const [isAnalyzing, setIsAnalyzing] = useState(false);
    const [extractedData, setExtractedData] = useState<ExtractedData | null>(null);
    const fileInputRef = useRef<HTMLInputElement>(null);

    const mockExtracted: ExtractedData = {
        name: 'Premium White Statuario Marble',
        stoneType: 'Italian Marble',
        color: 'White with Grey Veining',
        finish: 'Polished',
        thickness: '18-20mm',
        origin: 'Pan India',
        price: 1850
    };

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
        setTimeout(() => {
            setIsAnalyzing(false);
            setExtractedData(mockExtracted);
        }, 2500);
    };

    const reset = () => {
        setUploadedImage(null);
        setExtractedData(null);
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
                            AI Fast Listing
                            <span className="bg-white/20 text-[9px] px-2 py-0.5 rounded-full">SILVER</span>
                        </h3>
                        <p className="text-white/70 text-xs">Photo → Auto-fill all details in seconds</p>
                    </div>
                </div>
            </div>

            <div className="p-5">
                {!uploadedImage ? (
                    /* Upload Zone */
                    <div>
                        <label className="block cursor-pointer">
                            <div className="border-2 border-dashed border-violet-300 rounded-2xl p-8 text-center hover:border-violet-500 hover:bg-violet-50 transition-all">
                                <CameraIcon className="h-12 w-12 mx-auto text-violet-400 mb-3" />
                                <p className="font-bold text-stone-primary mb-1">Upload Stone Photo</p>
                                <p className="text-xs text-stone-secondary">AI will auto-extract name, type, color, and more</p>
                            </div>
                            <input
                                ref={fileInputRef}
                                type="file"
                                accept="image/*"
                                className="hidden"
                                onChange={handleImageUpload}
                            />
                        </label>
                        <div className="mt-4 grid grid-cols-3 gap-2 text-center">
                            <div className="bg-violet-50 p-3 rounded-xl">
                                <p className="text-xl mb-1">📸</p>
                                <p className="text-[10px] text-violet-600 font-bold">Photo</p>
                            </div>
                            <div className="bg-violet-50 p-3 rounded-xl">
                                <p className="text-xl mb-1">🤖</p>
                                <p className="text-[10px] text-violet-600 font-bold">AI Extracts</p>
                            </div>
                            <div className="bg-emerald-50 p-3 rounded-xl">
                                <p className="text-xl mb-1">✅</p>
                                <p className="text-[10px] text-emerald-600 font-bold">Listed!</p>
                            </div>
                        </div>
                    </div>
                ) : (
                    <div className="space-y-4">
                        {/* Image Preview */}
                        <div className="relative">
                            <img src={uploadedImage} className="w-full h-40 object-cover rounded-2xl" alt="Uploaded" />
                            <button
                                onClick={reset}
                                className="absolute top-2 right-2 bg-white/90 rounded-full p-1.5 text-stone-secondary hover:text-red-500"
                            >
                                ✕
                            </button>
                        </div>

                        {isAnalyzing ? (
                            /* Analyzing */
                            <div className="text-center py-6">
                                <div className="w-12 h-12 border-4 border-violet-500 border-t-transparent rounded-full animate-spin mx-auto mb-3"></div>
                                <p className="font-bold text-violet-600">AI is analyzing...</p>
                                <p className="text-xs text-stone-secondary">Identifying stone type, color, veining pattern</p>
                            </div>
                        ) : extractedData && (
                            /* Extracted Data */
                            <div className="space-y-3">
                                <p className="text-xs font-bold text-emerald-600 uppercase tracking-wider flex items-center gap-2">
                                    <SparklesIcon className="h-3 w-3" /> AI Extracted Details
                                </p>
                                <div className="space-y-2">
                                    {Object.entries(extractedData).map(([key, value]) => (
                                        <div key={key} className="flex items-center gap-3">
                                            <span className="text-[10px] font-bold text-stone-secondary uppercase w-20">{key}</span>
                                            <input
                                                type="text"
                                                defaultValue={typeof value === 'number' ? `₹${value}` : value}
                                                className="flex-1 px-3 py-2 rounded-lg bg-stone-light/50 text-sm border border-stone-accent/10 focus:ring-2 focus:ring-violet-400 focus:outline-none"
                                            />
                                        </div>
                                    ))}
                                </div>
                                <button className="w-full py-4 rounded-xl font-bold bg-gradient-to-r from-emerald-500 to-teal-500 text-white hover:from-emerald-600 hover:to-teal-600 transition-all">
                                    ✅ Publish Listing
                                </button>
                                <button onClick={reset} className="w-full py-2 text-sm text-stone-secondary hover:text-stone-primary">
                                    📸 Try Another Photo
                                </button>
                            </div>
                        )}
                    </div>
                )}
            </div>
        </div>
    );
};

export default AIFastListing;
