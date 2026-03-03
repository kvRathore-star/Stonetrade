'use client';

import React, { createContext, useContext, useState, useEffect, ReactNode } from 'react';

// User Types
export type UserRole = 'buyer' | 'seller' | 'admin';
export type SellerTier = 'basic' | 'silver' | 'gold';
export type BuyerTier = 'lite' | 'pro';

export interface User {
    id: string;
    name: string;
    email: string;
    phone: string;
    role: UserRole;
    avatar?: string;
    createdAt: Date;

    // Seller specific
    sellerTier?: SellerTier;
    businessName?: string;
    gstNumber?: string;
    yardAddress?: string;
    isVerified?: boolean;

    // Buyer specific
    buyerTier?: BuyerTier;
    companyName?: string;
    profession?: 'architect' | 'builder' | 'contractor' | 'interior_designer' | 'other';
}

export interface AuthContextType {
    user: User | null;
    isAuthenticated: boolean;
    isLoading: boolean;
    login: (email: string, password: string) => Promise<boolean>;
    register: (userData: Partial<User>, password: string) => Promise<boolean>;
    logout: () => void;
    updateUser: (updates: Partial<User>) => void;
    upgradeTier: (tier: SellerTier | BuyerTier) => void;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

// Pricing Constants
export const PRICING = {
    seller: {
        basic: { price: 0, listings: 5, name: 'Basic', hasAIListing: false },
        silver: { price: 999, listings: 50, name: 'Silver', hasAIListing: true },
        gold: { price: 1999, listings: -1, name: 'Gold', hasAIListing: true }, // -1 = unlimited
    },
    buyer: {
        lite: { price: 0, name: 'Lite' },
        pro: { price: 299, name: 'Pro' },
    },
    commission: {
        guest: 0.08, // 8% for guests
        lite: 0.08,  // 8% for Lite buyers
        pro: 0.05,   // 5% for Pro buyers
    },
    goldYearlyFeatures: ['StoneTrade Verified™', 'Yard Audit Badge'],
};

export const AuthProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
    const [user, setUser] = useState<User | null>(null);
    const [isLoading, setIsLoading] = useState(true);

    // Load user from localStorage on mount
    useEffect(() => {
        const savedUser = localStorage.getItem('stonetrade_user');
        if (savedUser) {
            try {
                const parsed = JSON.parse(savedUser);
                setUser({ ...parsed, createdAt: new Date(parsed.createdAt) });
            } catch (e) {
                localStorage.removeItem('stonetrade_user');
            }
        }
        setIsLoading(false);
    }, []);

    // Save user to localStorage on changes
    useEffect(() => {
        if (user) {
            localStorage.setItem('stonetrade_user', JSON.stringify(user));
        }
    }, [user]);

    const login = async (email: string, password: string): Promise<boolean> => {
        // Mock login - in production, call your API
        setIsLoading(true);

        // Simulate API delay
        await new Promise(resolve => setTimeout(resolve, 500));

        // Mock users for demo
        const mockUsers: Record<string, User> = {
            'seller@demo.com': {
                id: 'seller-1',
                name: 'Rajesh Marble Traders',
                email: 'seller@demo.com',
                phone: '+91 98765 43210',
                role: 'seller',
                sellerTier: 'gold',
                businessName: 'Rajesh Marble Traders',
                gstNumber: '08AABCU9603R1ZM',
                yardAddress: 'Kishangarh, Rajasthan',
                isVerified: true,
                createdAt: new Date(),
            },
            'buyer@demo.com': {
                id: 'buyer-1',
                name: 'Architect Priya',
                email: 'buyer@demo.com',
                phone: '+91 98765 43211',
                role: 'buyer',
                buyerTier: 'pro',
                companyName: 'Priya Interiors',
                profession: 'architect',
                createdAt: new Date(),
            },
        };

        const foundUser = mockUsers[email];
        if (foundUser) {
            setUser(foundUser);
            setIsLoading(false);
            return true;
        }

        setIsLoading(false);
        return false;
    };

    const register = async (userData: Partial<User>, password: string): Promise<boolean> => {
        setIsLoading(true);
        await new Promise(resolve => setTimeout(resolve, 500));

        const newUser: User = {
            id: `user-${Date.now()}`,
            name: userData.name || '',
            email: userData.email || '',
            phone: userData.phone || '',
            role: userData.role || 'buyer',
            createdAt: new Date(),
            ...(userData.role === 'seller' ? {
                sellerTier: 'basic' as SellerTier,
                businessName: userData.businessName,
                gstNumber: userData.gstNumber,
                yardAddress: userData.yardAddress,
                isVerified: false,
            } : {
                buyerTier: 'lite' as BuyerTier,
                companyName: userData.companyName,
                profession: userData.profession,
            }),
        };

        setUser(newUser);
        setIsLoading(false);
        return true;
    };

    const logout = () => {
        setUser(null);
        localStorage.removeItem('stonetrade_user');
    };

    const updateUser = (updates: Partial<User>) => {
        if (user) {
            setUser({ ...user, ...updates });
        }
    };

    const upgradeTier = (tier: SellerTier | BuyerTier) => {
        if (!user) return;

        if (user.role === 'seller') {
            setUser({ ...user, sellerTier: tier as SellerTier });
        } else {
            setUser({ ...user, buyerTier: tier as BuyerTier });
        }
    };

    return (
        <AuthContext.Provider value={{
            user,
            isAuthenticated: !!user,
            isLoading,
            login,
            register,
            logout,
            updateUser,
            upgradeTier,
        }}>
            {children}
        </AuthContext.Provider>
    );
};

export const useAuth = (): AuthContextType => {
    const context = useContext(AuthContext);
    if (!context) {
        throw new Error('useAuth must be used within AuthProvider');
    }
    return context;
};

export default AuthContext;
