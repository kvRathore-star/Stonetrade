'use client';

import React, { useState, useMemo } from 'react';
import ProductCard from '@/components/ProductCard';
import FilterSidebar from '@/components/FilterSidebar';
import ComparisonTray from '@/components/ComparisonTray';
import { useMockData } from '@/hooks/useMockData';
import { FilterIcon, XIcon } from '@/components/IconComponents';
import type { Page } from '@/lib/navigation';
import { StoneType, Origin, Finish, UseCase } from '@/types';

interface ProductsPageProps {
  navigateTo: (page: Page, productId?: number) => void;
}

const ProductsPage: React.FC<ProductsPageProps> = ({ navigateTo }) => {
  const { products } = useMockData();
  const [isFilterSidebarOpen, setIsFilterSidebarOpen] = useState(false);
  
  const [filters, setFilters] = useState({
    stoneType: [] as StoneType[],
    origin: [] as Origin[],
    finish: [] as Finish[],
    useCases: [] as UseCase[],
    priceRange: 5000,
  });

  const handleFilterChange = (newFilters: any) => {
    setFilters(newFilters);
  };
  
  const filteredProducts = useMemo(() => {
    return products.filter(product => {
        const { stoneType, origin, finish, priceRange, useCases } = filters;
        if (stoneType.length > 0 && !stoneType.includes(product.stoneType)) return false;
        if (origin.length > 0 && !origin.includes(product.origin)) return false;
        if (finish.length > 0 && !finish.includes(product.finish)) return false;
        if (product.price > priceRange) return false;
        if (useCases.length > 0 && !useCases.some(uc => product.useCases.includes(uc))) return false;
        return true;
    });
  }, [products, filters]);


  return (
    <div className="pb-24">
      <div className="text-center mb-8">
        <h1 className="text-4xl font-bold">Stone Marketplace</h1>
        <p className="text-stone-secondary mt-2">Browse thousands of high-quality stone products from verified sellers.</p>
      </div>

      <div className="flex flex-col lg:flex-row gap-8">
        {/* Mobile Filter Button */}
        <div className="lg:hidden flex justify-end">
            <button 
                onClick={() => setIsFilterSidebarOpen(true)} 
                className="flex items-center bg-stone-primary text-white px-4 py-2 rounded-lg"
            >
                <FilterIcon className="h-5 w-5 mr-2" />
                Filters
            </button>
        </div>

        {/* Filter Sidebar for mobile (modal) */}
        {isFilterSidebarOpen && (
            <div className="fixed inset-0 bg-black/50 z-50 lg:hidden" onClick={() => setIsFilterSidebarOpen(false)}>
                <div className="fixed top-0 left-0 h-full w-4/5 max-w-sm bg-stone-light p-4 overflow-y-auto" onClick={(e) => e.stopPropagation()}>
                    <div className="flex justify-between items-center mb-4">
                      <h2 className="text-xl font-bold">Filters</h2>
                      <button onClick={() => setIsFilterSidebarOpen(false)}>
                          <XIcon className="h-6 w-6"/>
                      </button>
                    </div>
                    <FilterSidebar onFilterChange={handleFilterChange} currentFilters={filters} />
                </div>
            </div>
        )}
        
        {/* Filter Sidebar for desktop */}
        <aside className="hidden lg:block lg:flex-shrink-0">
          <FilterSidebar onFilterChange={handleFilterChange} currentFilters={filters} />
        </aside>

        {/* Products Grid */}
        <div className="flex-grow">
          <div className="mb-4 text-sm text-stone-secondary">
            Showing {filteredProducts.length} of {products.length} products
          </div>
          {filteredProducts.length > 0 ? (
            <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-3 gap-6">
              {filteredProducts.map(product => (
                <ProductCard key={product.id} product={product} navigateTo={navigateTo} />
              ))}
            </div>
          ) : (
            <div className="text-center py-16 bg-stone-white rounded-lg">
                <h3 className="text-xl font-semibold">No products found</h3>
                <p className="text-stone-secondary mt-2">Try adjusting your filters to find what you're looking for.</p>
            </div>
          )}
        </div>
      </div>
      <ComparisonTray navigateTo={navigateTo} />
    </div>
  );
};

export default ProductsPage;
