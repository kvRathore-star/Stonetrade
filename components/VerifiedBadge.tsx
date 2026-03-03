'use client';

import React from 'react';
import { ShieldIcon, StarIcon, VerifiedIcon } from '@/components/IconComponents';

interface VerifiedBadgeProps {
    tier: 'basic' | 'silver' | 'gold';
    size?: 'sm' | 'md' | 'lg';
    showLabel?: boolean;
    className?: string;
}

const VerifiedBadge: React.FC<VerifiedBadgeProps> = ({
    tier,
    size = 'md',
    showLabel = true,
    className = ''
}) => {
    const config = {
        basic: {
            bg: 'bg-stone-light',
            text: 'text-stone-secondary',
            border: 'border-stone-secondary/20',
            icon: null,
            label: 'Basic Seller',
        },
        silver: {
            bg: 'bg-gradient-to-r from-slate-100 to-slate-200',
            text: 'text-slate-700',
            border: 'border-slate-300',
            icon: <VerifiedIcon className={size === 'sm' ? 'h-3 w-3' : size === 'lg' ? 'h-5 w-5' : 'h-4 w-4'} />,
            label: 'Verified Seller',
        },
        gold: {
            bg: 'bg-gradient-to-r from-amber-100 via-yellow-100 to-amber-200',
            text: 'text-amber-800',
            border: 'border-amber-300',
            icon: <ShieldIcon className={size === 'sm' ? 'h-3 w-3' : size === 'lg' ? 'h-5 w-5' : 'h-4 w-4'} />,
            label: 'StoneTrade Verified™',
        },
    };

    const sizeClasses = {
        sm: 'px-2 py-0.5 text-[8px]',
        md: 'px-3 py-1 text-[10px]',
        lg: 'px-4 py-2 text-xs',
    };

    const c = config[tier];

    if (tier === 'basic' && !showLabel) return null;

    return (
        <div
            className={`
        inline-flex items-center gap-1.5 rounded-full font-black uppercase tracking-widest
        ${c.bg} ${c.text} ${sizeClasses[size]} border ${c.border}
        shadow-sm ${className}
      `}
        >
            {c.icon}
            {showLabel && <span>{c.label}</span>}
        </div>
    );
};

// Gold Seller Trust Badges
export const GoldTrustBadges: React.FC<{ className?: string }> = ({ className = '' }) => (
    <div className={`flex flex-wrap gap-2 ${className}`}>
        <div className="inline-flex items-center gap-1.5 bg-amber-50 text-amber-700 px-3 py-1.5 rounded-xl text-[10px] font-bold border border-amber-200">
            <ShieldIcon className="h-4 w-4" />
            Yard Audited
        </div>
        <div className="inline-flex items-center gap-1.5 bg-green-50 text-green-700 px-3 py-1.5 rounded-xl text-[10px] font-bold border border-green-200">
            <StarIcon className="h-4 w-4" />
            Bulk Capacity
        </div>
        <div className="inline-flex items-center gap-1.5 bg-blue-50 text-blue-700 px-3 py-1.5 rounded-xl text-[10px] font-bold border border-blue-200">
            <VerifiedIcon className="h-4 w-4" />
            Priority Search
        </div>
    </div>
);

// Buyer Pro Badge
export const BuyerProBadge: React.FC<{ tier: 'lite' | 'pro'; size?: 'sm' | 'md' }> = ({ tier, size = 'md' }) => {
    if (tier === 'lite') return null;

    return (
        <div className={`
      inline-flex items-center gap-1.5 bg-stone-primary text-stone-accent rounded-full font-black uppercase tracking-widest
      ${size === 'sm' ? 'px-2 py-0.5 text-[8px]' : 'px-3 py-1 text-[10px]'}
    `}>
            <StarIcon className={size === 'sm' ? 'h-3 w-3' : 'h-4 w-4'} />
            Buyer Pro
        </div>
    );
};

export default VerifiedBadge;
