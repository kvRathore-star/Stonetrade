'use client';

import React from 'react';
import { ShieldIcon, ClockIcon, CheckIcon, XIcon } from '@/components/IconComponents';

export interface VerificationStatus {
    tier: 'basic' | 'silver' | 'gold';
    isVerified: boolean;
    auditDate?: Date;
    expiryDate?: Date;
    yardAuditComplete: boolean;
    sellerId: string;
    companyName: string;
}

interface VerificationBadgeProps {
    verification: VerificationStatus;
    showDetails?: boolean;
    canViewAudit?: boolean; // Only Pro buyers can see audit details
}

const VerificationBadge: React.FC<VerificationBadgeProps> = ({
    verification,
    showDetails = false,
    canViewAudit = false
}) => {
    const isExpired = verification.expiryDate ? new Date() > new Date(verification.expiryDate) : false;
    const daysUntilExpiry = verification.expiryDate
        ? Math.ceil((new Date(verification.expiryDate).getTime() - new Date().getTime()) / (1000 * 60 * 60 * 24))
        : null;

    const getBadgeStyle = () => {
        if (isExpired) return 'bg-gray-100 text-gray-500 border-gray-300';
        switch (verification.tier) {
            case 'gold': return 'bg-gradient-to-r from-amber-400 to-yellow-500 text-stone-primary border-amber-500';
            case 'silver': return 'bg-gradient-to-r from-slate-300 to-slate-400 text-stone-primary border-slate-400';
            default: return 'bg-stone-light text-stone-secondary border-stone-accent/30';
        }
    };

    const getBadgeLabel = () => {
        if (isExpired) return 'Expired';
        switch (verification.tier) {
            case 'gold': return 'Gold Verified™';
            case 'silver': return 'Silver Verified';
            default: return 'Basic';
        }
    };

    if (!showDetails) {
        return (
            <span className={`inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-bold border ${getBadgeStyle()}`}>
                <ShieldIcon className="h-3 w-3" />
                {getBadgeLabel()}
                {verification.tier === 'gold' && verification.yardAuditComplete && !isExpired && (
                    <span className="text-[8px] bg-white/30 px-1 rounded">YARD AUDIT ✓</span>
                )}
            </span>
        );
    }

    return (
        <div className={`p-4 rounded-2xl border-2 ${isExpired ? 'border-gray-300 bg-gray-50' : 'border-amber-400 bg-amber-50'}`}>
            <div className="flex items-center justify-between mb-3">
                <div className="flex items-center gap-2">
                    <ShieldIcon className={`h-6 w-6 ${isExpired ? 'text-gray-400' : 'text-amber-500'}`} />
                    <div>
                        <p className="font-black text-stone-primary">{getBadgeLabel()}</p>
                        <p className="text-xs text-stone-secondary">{verification.companyName}</p>
                    </div>
                </div>
                {verification.tier === 'gold' && (
                    <span className={`px-2 py-1 rounded-lg text-[10px] font-bold ${isExpired ? 'bg-red-100 text-red-600' : 'bg-green-100 text-green-600'
                        }`}>
                        {isExpired ? 'EXPIRED' : 'ACTIVE'}
                    </span>
                )}
            </div>

            {verification.tier === 'gold' && (
                <>
                    <div className="grid grid-cols-2 gap-3 mb-3">
                        <div className="bg-white p-3 rounded-xl">
                            <p className="text-[10px] text-stone-secondary font-bold uppercase">Audit Date</p>
                            <p className="font-bold text-sm">
                                {verification.auditDate
                                    ? new Date(verification.auditDate).toLocaleDateString('en-IN')
                                    : 'N/A'}
                            </p>
                        </div>
                        <div className="bg-white p-3 rounded-xl">
                            <p className="text-[10px] text-stone-secondary font-bold uppercase">Expires</p>
                            <p className={`font-bold text-sm ${isExpired ? 'text-red-600' : daysUntilExpiry && daysUntilExpiry < 30 ? 'text-amber-600' : ''}`}>
                                {verification.expiryDate
                                    ? new Date(verification.expiryDate).toLocaleDateString('en-IN')
                                    : 'N/A'}
                            </p>
                        </div>
                    </div>

                    {canViewAudit ? (
                        <div className="space-y-2">
                            <div className="flex items-center gap-2 text-sm">
                                {verification.yardAuditComplete ? (
                                    <CheckIcon className="h-4 w-4 text-green-500" />
                                ) : (
                                    <XIcon className="h-4 w-4 text-red-500" />
                                )}
                                <span>Physical Yard Audit</span>
                            </div>
                            <div className="flex items-center gap-2 text-sm">
                                <CheckIcon className="h-4 w-4 text-green-500" />
                                <span>Inventory Verified</span>
                            </div>
                            <div className="flex items-center gap-2 text-sm">
                                <CheckIcon className="h-4 w-4 text-green-500" />
                                <span>Production Capacity Confirmed</span>
                            </div>
                            {daysUntilExpiry !== null && !isExpired && daysUntilExpiry < 60 && (
                                <div className="mt-3 p-2 bg-amber-100 rounded-xl text-xs text-amber-700 flex items-center gap-2">
                                    <ClockIcon className="h-4 w-4" />
                                    Re-audit required in {daysUntilExpiry} days
                                </div>
                            )}
                        </div>
                    ) : (
                        <div className="bg-stone-light p-3 rounded-xl text-center">
                            <p className="text-xs text-stone-secondary">
                                🔒 Upgrade to <b>Buyer Pro</b> to view full audit details
                            </p>
                        </div>
                    )}
                </>
            )}
        </div>
    );
};

export default VerificationBadge;
