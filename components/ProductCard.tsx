'use client';

import React, { useContext, useState } from 'react';
import { Product } from '@/types';
import { StarIcon, VerifiedIcon, HeartIcon, ShieldIcon } from '@/components/IconComponents';
import type { Page } from '@/lib/navigation';
import { useFavorites } from '../hooks/useFavorites';
import { useCompare } from '../hooks/useCompare';
import { LanguageContext } from '@/lib/language';
import { translations } from '@/translations';


interface ProductCardProps {
  product: Product;
  navigateTo: (page: Page, productId: number) => void;
}

const ProductCard: React.FC<ProductCardProps> = ({ product, navigateTo }) => {
  const { favorites, toggleFavorite } = useFavorites();
  const { compareList, toggleCompare } = useCompare();
  const { language } = useContext(LanguageContext);
  const t = translations[language];

  const isFavorite = favorites.includes(product.id);
  const isInCompare = compareList.includes(product.id);
  const [sampleRequested, setSampleRequested] = useState(false);

  const handleFavoriteClick = (e: React.MouseEvent) => {
    e.stopPropagation();
    toggleFavorite(product.id);
  };

  const handleCompareClick = (e: React.MouseEvent) => {
    e.stopPropagation();
    toggleCompare(product.id);
  };

  const handleSampleRequest = (e: React.MouseEvent) => {
    e.stopPropagation();
    setSampleRequested(true);
    setTimeout(() => setSampleRequested(false), 2000);
  };

  return (
    <div 
      className="bg-stone-white rounded-[2rem] shadow-sm overflow-hidden group transform hover:-translate-y-2 transition-all duration-500 flex flex-col h-full border border-stone-accent/10"
    >
      <div onClick={() => navigateTo('productDetail', product.id)} className="cursor-pointer flex-grow flex flex-col">
        <div className="relative aspect-[1/1] overflow-hidden bg-stone-light">
          <img
            src={product.images[0]}
            alt={product.name}
            className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-1000"
          />
          
          {/* Floating Badges - Positioned carefully to avoid clashing with text below */}
          <div className="absolute top-3 left-3 flex flex-col gap-1.5 pointer-events-none">
            <div className="bg-stone-primary/95 backdrop-blur-sm text-stone-accent text-[9px] font-black uppercase tracking-widest px-2.5 py-1 rounded-md shadow-lg border border-stone-accent/20">
                {product.stoneType}
            </div>
            {product.seller.verificationLevel === 'Gold' && (
                <div className="bg-stone-accent text-stone-primary text-[8px] font-black uppercase tracking-widest px-2.5 py-1 rounded-md shadow-sm flex items-center gap-1 border border-stone-primary/10">
                   <ShieldIcon className="h-2.5 w-2.5" /> VERIFIED
                </div>
            )}
          </div>

          <button 
            onClick={handleFavoriteClick}
            className="absolute top-3 right-3 bg-white/90 backdrop-blur-md p-2 rounded-full text-stone-primary hover:text-red-500 hover:bg-white transition-all shadow-xl z-10"
          >
            <HeartIcon className="h-5 w-5" solid={isFavorite} />
          </button>
          
          {/* Bottom Overlays */}
          <div className="absolute bottom-0 left-0 right-0 p-3 bg-gradient-to-t from-stone-primary/70 via-stone-primary/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300">
             <div className="flex gap-1.5">
                <span className="text-[9px] font-black text-white uppercase bg-white/10 backdrop-blur-md px-2 py-1 rounded">{product.thickness}</span>
                <span className="text-[9px] font-black text-white uppercase bg-white/10 backdrop-blur-md px-2 py-1 rounded">{product.finish}</span>
             </div>
          </div>
        </div>
        
        <div className="p-5 flex flex-col flex-grow">
          <div className="mb-3">
             <h3 className="text-lg font-black text-stone-primary leading-tight line-clamp-2 group-hover:text-stone-accent transition-colors">
                {product.name}
             </h3>
          </div>
          
          <div className="mt-auto">
              <div className="flex justify-between items-end mb-2">
                 <div className="flex flex-col">
                    <p className="text-xl font-black text-stone-primary tracking-tighter">
                        ₹{product.price}
                    </p>
                    <span className="text-[10px] text-stone-secondary uppercase font-bold tracking-widest">per {product.priceUnit}</span>
                 </div>
                 <div className="flex items-center text-[10px] text-stone-secondary font-bold gap-1 bg-stone-light px-2 py-1 rounded-lg">
                    {product.seller.name.split(' ')[0]}...
                    {product.seller.isVerified && <VerifiedIcon className="h-3 w-3 text-blue-500" />}
                 </div>
              </div>
          </div>
        </div>
      </div>
      
      <div className="px-5 pb-5 flex flex-col gap-2">
         <button 
            onClick={handleSampleRequest} 
            className={`w-full text-center text-[11px] font-black uppercase py-3.5 rounded-xl transition-all shadow-md ${sampleRequested ? 'bg-green-600 text-white' : 'bg-stone-primary text-white hover:bg-stone-accent hover:text-stone-primary'}`}
          >
           {sampleRequested ? '✓ Intent Verified' : t.requestSample}
          </button>
      </div>
    </div>
  );
};

export default ProductCard;
