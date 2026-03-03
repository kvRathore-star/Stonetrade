'use client';

import React, { createContext, useContext, useState, useEffect, ReactNode } from 'react';

interface CreditContextType {
    credits: number;
    addCredits: (amount: number) => void;
    useCredit: () => boolean;
    unlockedContacts: string[]; // seller IDs that have been unlocked
    isUnlocked: (sellerId: string) => boolean;
    unlockContact: (sellerId: string) => boolean;
}

const CreditContext = createContext<CreditContextType | undefined>(undefined);

export const CreditProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
    const [credits, setCredits] = useState(0);
    const [unlockedContacts, setUnlockedContacts] = useState<string[]>([]);

    // Load from localStorage
    useEffect(() => {
        const savedCredits = localStorage.getItem('stonetrade_credits');
        const savedUnlocks = localStorage.getItem('stonetrade_unlocked');
        if (savedCredits) setCredits(parseInt(savedCredits, 10));
        if (savedUnlocks) setUnlockedContacts(JSON.parse(savedUnlocks));
    }, []);

    // Save to localStorage
    useEffect(() => {
        localStorage.setItem('stonetrade_credits', credits.toString());
        localStorage.setItem('stonetrade_unlocked', JSON.stringify(unlockedContacts));
    }, [credits, unlockedContacts]);

    const addCredits = (amount: number) => {
        setCredits(prev => prev + amount);
    };

    const useCredit = (): boolean => {
        if (credits > 0) {
            setCredits(prev => prev - 1);
            return true;
        }
        return false;
    };

    const isUnlocked = (sellerId: string): boolean => {
        return unlockedContacts.includes(sellerId);
    };

    const unlockContact = (sellerId: string): boolean => {
        if (isUnlocked(sellerId)) return true; // Already unlocked
        if (credits > 0) {
            setCredits(prev => prev - 1);
            setUnlockedContacts(prev => [...prev, sellerId]);
            return true;
        }
        return false;
    };

    return (
        <CreditContext.Provider value={{
            credits,
            addCredits,
            useCredit,
            unlockedContacts,
            isUnlocked,
            unlockContact,
        }}>
            {children}
        </CreditContext.Provider>
    );
};

export const useCredits = (): CreditContextType => {
    const context = useContext(CreditContext);
    if (!context) {
        throw new Error('useCredits must be used within CreditProvider');
    }
    return context;
};

// Credit packages for purchase
export const CREDIT_PACKAGES = [
    { id: 'starter', credits: 5, price: 499, perCredit: 100, badge: 'STARTER' },
    { id: 'pro', credits: 15, price: 999, perCredit: 67, badge: 'BEST VALUE', highlight: true },
    { id: 'enterprise', credits: 50, price: 2499, perCredit: 50, badge: 'ENTERPRISE' },
];

export default CreditContext;
