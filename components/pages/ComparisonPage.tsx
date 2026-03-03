'use client';

import React from 'react';
import { useCompare } from '@/hooks/useCompare';
import { useMockData } from '@/hooks/useMockData';
import type { Page } from '@/lib/navigation';
import { StarIcon, VerifiedIcon } from '@/components/IconComponents';

interface ComparisonPageProps {
    navigateTo: (page: Page, productId?: number) => void;
}

const ComparisonPage: React.FC<ComparisonPageProps> = ({ navigateTo }) => {
    const { compareList, toggleCompare } = useCompare();
    const { products } = useMockData();
    const compareProducts = products.filter(p => compareList.includes(p.id));

    const specs = [
        { key: 'stoneType', label: 'Stone Type' },
        { key: 'origin', label: 'Origin' },
        { key: 'finish', label: 'Finish' },
        { key: 'color', label: 'Color' },
        { key: 'thickness', label: 'Thickness' },
        { key: 'size', label: 'Size' },
        { key: 'price', label: 'Price' },
        { key: 'seller', label: 'Seller' },
    ];

    if (compareProducts.length === 0) {
        return (
            <div className="text-center py-16">
                <h1 className="text-4xl font-bold mb-4">Compare Products</h1>
                <p className="text-stone-secondary">You have not selected any products to compare.</p>
                <button onClick={() => navigateTo('products')} className="mt-6 bg-stone-primary text-white py-2 px-6 rounded-lg">
                    Back to Marketplace
                </button>
            </div>
        );
    }
    
    return (
        <div>
            <h1 className="text-4xl font-bold text-center mb-8">Compare Products</h1>
            <div className="overflow-x-auto">
                <table className="w-full min-w-[800px] border-collapse">
                    <thead>
                        <tr>
                            <th className="p-4 border-b-2 border-stone-primary text-left font-semibold w-1/5">Feature</th>
                            {compareProducts.map(product => (
                                <th key={product.id} className="p-4 border-b-2 border-stone-primary text-center">
                                    <img src={product.images[0]} alt={product.name} className="w-full h-32 object-cover rounded-lg mb-2" />
                                    <h3 className="font-bold text-stone-primary">{product.name}</h3>
                                    <button onClick={() => toggleCompare(product.id)} className="text-red-500 text-sm hover:underline mt-1">Remove</button>
                                </th>
                            ))}
                        </tr>
                    </thead>
                    <tbody>
                        {specs.map(spec => (
                             <tr key={spec.key} className="hover:bg-stone-white">
                                <td className="p-4 border-b text-left font-semibold">{spec.label}</td>
                                {compareProducts.map(product => (
                                    <td key={product.id} className="p-4 border-b text-center text-sm text-stone-secondary">
                                        {spec.key === 'size' ? `${product.size.type} ${product.size.dimensions || ''}` : 
                                         spec.key === 'price' ? `₹${product.price} / ${product.priceUnit}` :
                                         spec.key === 'seller' ? (
                                             <div className="flex flex-col items-center">
                                                 <span>{product.seller.name}</span>
                                                 {product.seller.isVerified && <VerifiedIcon className="h-4 w-4 text-blue-500 mt-1" />}
                                             </div>
                                         ) :
                                         product[spec.key as keyof typeof product]?.toString()}
                                    </td>
                                ))}
                            </tr>
                        ))}
                         <tr className="hover:bg-stone-white">
                            <td className="p-4 border-b text-left font-semibold">Actions</td>
                            {compareProducts.map(product => (
                                <td key={product.id} className="p-4 border-b text-center">
                                    <button onClick={() => navigateTo('productDetail', product.id)} className="bg-stone-primary text-white text-sm font-semibold py-2 px-4 rounded-lg hover:bg-stone-secondary">
                                        View Product
                                    </button>
                                </td>
                            ))}
                        </tr>
                    </tbody>
                </table>
            </div>
        </div>
    )
};

export default ComparisonPage;
