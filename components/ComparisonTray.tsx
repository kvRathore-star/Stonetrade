'use client';

import React from 'react';
import { useCompare } from '../hooks/useCompare';
import { useMockData } from '@/hooks/useMockData';
import { XIcon } from '@/components/IconComponents';
import type { Page } from '@/lib/navigation';

interface ComparisonTrayProps {
    navigateTo: (page: Page) => void;
}

const ComparisonTray: React.FC<ComparisonTrayProps> = ({ navigateTo }) => {
    const { compareList, toggleCompare, clearCompare } = useCompare();
    const { products } = useMockData();
    
    const compareProducts = products.filter(p => compareList.includes(p.id));

    if (compareList.length === 0) {
        return null;
    }

    return (
        <div className="fixed bottom-0 left-0 right-0 bg-stone-primary text-white shadow-2xl z-40 transform transition-transform duration-300 animate-slide-up">
            <div className="container mx-auto px-4 py-3">
                <div className="flex items-center justify-between">
                    <div className="flex items-center gap-4">
                         <h3 className="font-bold text-lg hidden sm:block">Compare Products ({compareList.length})</h3>
                        <div className="flex items-center gap-2">
                           {compareProducts.slice(0, 4).map(p => (
                               <div key={p.id} className="relative">
                                   <img src={p.images[0]} alt={p.name} className="w-10 h-10 rounded-md object-cover" />
                                   <button onClick={() => toggleCompare(p.id)} className="absolute -top-1 -right-1 bg-red-500 text-white rounded-full h-4 w-4 flex items-center justify-center text-xs">
                                       <XIcon className="h-3 w-3" />
                                   </button>
                               </div>
                           ))}
                           {compareList.length > 4 && <div className="text-sm">+ {compareList.length - 4} more</div>}
                        </div>
                    </div>
                    <div className="flex items-center gap-3">
                         <button onClick={clearCompare} className="text-sm hover:underline text-stone-secondary">Clear</button>
                        <button 
                            onClick={() => navigateTo('compare')}
                            className="bg-stone-accent text-stone-primary font-bold py-2 px-6 rounded-full hover:opacity-90 transition-opacity"
                        >
                            Compare Now
                        </button>
                    </div>
                </div>
            </div>
             <style>{`
                @keyframes slide-up {
                    from { transform: translateY(100%); }
                    to { transform: translateY(0); }
                }
                .animate-slide-up {
                    animation: slide-up 0.3s ease-out;
                }
            `}</style>
        </div>
    );
};

export default ComparisonTray;
