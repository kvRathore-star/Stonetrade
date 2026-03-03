'use client';

import React, { useState, useEffect } from 'react';
import { StoneType, Origin, Finish, UseCase } from '@/types';
import { ChevronDownIcon } from '@/components/IconComponents';

interface FilterSidebarProps {
  onFilterChange: (filters: any) => void;
  currentFilters: any;
}

const FilterSection: React.FC<{ title: string; children: React.ReactNode }> = ({ title, children }) => {
    const [isOpen, setIsOpen] = useState(true);
    return (
        <div className="py-4 border-b border-stone-200">
            <button onClick={() => setIsOpen(!isOpen)} className="w-full flex justify-between items-center text-left font-semibold">
                {title}
                <ChevronDownIcon className={`h-5 w-5 transition-transform ${isOpen ? 'rotate-180' : ''}`} />
            </button>
            {isOpen && <div className="mt-3 space-y-2">{children}</div>}
        </div>
    );
};

const FilterSidebar: React.FC<FilterSidebarProps> = ({ onFilterChange, currentFilters }) => {
  
  const handleCheckboxChange = (category: 'stoneType' | 'origin' | 'finish' | 'useCases', value: string) => {
    const currentValues = currentFilters[category] as string[];
    const newValues = currentValues.includes(value)
      ? currentValues.filter(v => v !== value)
      : [...currentValues, value];
    
    onFilterChange({ ...currentFilters, [category]: newValues });
  };

  const handlePriceChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    onFilterChange({ ...currentFilters, priceRange: Number(e.target.value) });
  };

  return (
    <div className="w-full lg:w-64 bg-stone-white p-6 rounded-lg shadow-md">
      <h2 className="text-xl font-bold mb-4">Filters</h2>
      
      <FilterSection title="Use Case">
        {Object.values(UseCase).map(useCase => (
            <label key={useCase} className="flex items-center text-sm text-stone-secondary">
                <input 
                    type="checkbox" 
                    className="h-4 w-4 rounded border-stone-300 text-stone-accent focus:ring-stone-accent/50" 
                    checked={currentFilters.useCases.includes(useCase)}
                    onChange={() => handleCheckboxChange('useCases', useCase)}
                />
                <span className="ml-2">{useCase}</span>
            </label>
        ))}
      </FilterSection>

      <FilterSection title="Stone Type">
        {Object.values(StoneType).map(type => (
          <label key={type} className="flex items-center text-sm text-stone-secondary">
            <input 
              type="checkbox" 
              className="h-4 w-4 rounded border-stone-300 text-stone-accent focus:ring-stone-accent/50" 
              checked={currentFilters.stoneType.includes(type)}
              onChange={() => handleCheckboxChange('stoneType', type)}
            />
            <span className="ml-2">{type}</span>
          </label>
        ))}
      </FilterSection>

      <FilterSection title="Origin">
        {Object.values(Origin).map(origin => (
          <label key={origin} className="flex items-center text-sm text-stone-secondary">
            <input 
              type="checkbox" 
              className="h-4 w-4 rounded border-stone-300 text-stone-accent focus:ring-stone-accent/50" 
              checked={currentFilters.origin.includes(origin)}
              onChange={() => handleCheckboxChange('origin', origin)}
            />
            <span className="ml-2">{origin}</span>
          </label>
        ))}
      </FilterSection>
      
      <FilterSection title="Finish">
        {Object.values(Finish).map(finish => (
          <label key={finish} className="flex items-center text-sm text-stone-secondary">
            <input 
              type="checkbox" 
              className="h-4 w-4 rounded border-stone-300 text-stone-accent focus:ring-stone-accent/50" 
              checked={currentFilters.finish.includes(finish)}
              onChange={() => handleCheckboxChange('finish', finish)}
            />
            <span className="ml-2">{finish}</span>
          </label>
        ))}
      </FilterSection>
      
      <FilterSection title="Price Range">
        <div>
          <input 
            type="range" 
            min="50" 
            max="5000" 
            value={currentFilters.priceRange} 
            onChange={handlePriceChange}
            className="w-full h-2 bg-stone-200 rounded-lg appearance-none cursor-pointer accent-stone-accent" 
          />
          <div className="flex justify-between text-sm text-stone-secondary mt-2">
            <span>₹50</span>
            <span>₹{currentFilters.priceRange}</span>
            <span>₹5000+</span>
          </div>
        </div>
      </FilterSection>

    </div>
  );
};

export default FilterSidebar;
