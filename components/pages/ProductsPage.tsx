'use client';

import React, { useState, useMemo } from 'react';
import ProductCard from '@/components/ProductCard';
import FilterSidebar from '@/components/FilterSidebar';
import ComparisonTray from '@/components/ComparisonTray';
import { useMockData } from '@/hooks/useMockData';
import { FilterIcon, XIcon, SearchIcon, ShieldIcon, VerifiedIcon, StarIcon } from '@/components/IconComponents';
import type { Page } from '@/lib/navigation';
import { StoneType, Origin, Finish, UseCase } from '@/types';

interface ProductsPageProps {
  navigateTo: (page: Page, productId?: number) => void;
}

const ProductsPage: React.FC<ProductsPageProps> = ({ navigateTo }) => {
  const { products } = useMockData();
  const [isFilterSidebarOpen, setIsFilterSidebarOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');

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

      if (searchQuery.trim() !== '') {
        const query = searchQuery.toLowerCase();
        return (
          product.name.toLowerCase().includes(query) ||
          product.stoneType.toLowerCase().includes(query) ||
          product.seller.name.toLowerCase().includes(query) ||
          product.origin.toLowerCase().includes(query)
        );
      }

      return true;
    });
  }, [products, filters, searchQuery]);


  return (
    <div className="pb-24 bg-stone-light/30">

      {/* Kesariya Header Section */}
      <div className="bg-stone-primary relative overflow-hidden text-white pt-20 pb-24 mb-12 -mt-4 mx-4 lg:mx-8 rounded-[2.5rem] shadow-2xl">
        <div className="absolute inset-0 opacity-10 bg-[url('https://www.transparenttextures.com/patterns/black-scales.png')]"></div>
        <div className="absolute top-0 right-0 w-96 h-96 bg-stone-kesariya rounded-full mix-blend-screen filter blur-[100px] opacity-20 transform translate-x-1/3 -translate-y-1/3"></div>
        <div className="absolute bottom-0 left-0 w-80 h-80 bg-stone-accent rounded-full mix-blend-screen filter blur-[80px] opacity-10 transform -translate-x-1/2 translate-y-1/2"></div>

        <div className="container mx-auto px-6 max-w-5xl relative z-10 text-center">
          <span className="inline-block px-4 py-1.5 rounded-full bg-stone-kesariya/20 border border-stone-kesariya/30 text-stone-kesariya text-xs font-bold tracking-widest uppercase mb-6 shadow-sm">
            Bharat Native Craftsmanship
          </span>
          <h1 className="text-4xl lg:text-6xl font-black mb-6 tracking-tight leading-tight mix-blend-plus-lighter">
            The <span className="text-transparent bg-clip-text bg-gradient-to-r from-stone-kesariya to-stone-accent">Stone Marketplace</span>
          </h1>
          <p className="text-lg lg:text-xl text-white/70 max-w-2xl mx-auto mb-10 font-medium leading-relaxed">
            Discover thousands of pristine marble, granite, and sandstone blocks sourced directly from India's finest verified quarries.
          </p>

          {/* Search Bar */}
          <div className="max-w-2xl mx-auto flex items-center bg-white/10 backdrop-blur-md rounded-2xl p-2 border border-white/20 shadow-2xl focus-within:border-stone-kesariya focus-within:ring-2 focus-within:ring-stone-kesariya/50 transition-all">
            <div className="pl-4 pr-3 text-white/50">
              <SearchIcon className="h-6 w-6" />
            </div>
            <input
              type="text"
              placeholder="Search by stone name, origin (e.g., Makrana), or seller..."
              className="flex-1 bg-transparent border-none text-white placeholder-white/50 py-3 px-2 outline-none w-full text-base font-medium"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
            />
            <button className="bg-gradient-to-r from-stone-kesariya to-orange-500 hover:opacity-90 transition-opacity text-white px-6 py-3 rounded-xl font-bold text-sm shadow-md whitespace-nowrap">
              Search
            </button>
          </div>

          {/* Trust Badges */}
          <div className="flex flex-wrap items-center justify-center gap-6 lg:gap-12 mt-12 text-white/80 text-sm font-semibold">
            <div className="flex items-center gap-2">
              <ShieldIcon className="h-5 w-5 text-stone-kesariya" />
              100% Quality Inspected
            </div>
            <div className="flex items-center gap-2">
              <VerifiedIcon className="h-5 w-5 text-stone-kesariya" />
              StoneTrade Verified
            </div>
            <div className="flex items-center gap-2">
              <StarIcon className="h-5 w-5 text-stone-kesariya" />
              Quarry Direct Pricing
            </div>
          </div>
        </div>
      </div>

      <div className="container mx-auto px-4 lg:px-8 flex flex-col lg:flex-row gap-8">
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
                  <XIcon className="h-6 w-6" />
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
