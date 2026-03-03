'use client';

import React, { createContext, useContext, useCallback } from 'react';
import { useRouter } from 'next/navigation';

export type Page = 'home' | 'products' | 'productDetail' | 'sellerDashboard' | 'buyerDashboard' | 'checkout' | 'sampleCheckout' | 'pricing' | 'register' | 'compare' | 'about' | 'contact' | 'adminDashboard' | 'rfq';

// Map old page names to Next.js routes
const PAGE_ROUTES: Record<Page, string> = {
    home: '/',
    products: '/products',
    productDetail: '/products', // needs /products/[id]
    sellerDashboard: '/dashboard/seller',
    buyerDashboard: '/dashboard/buyer',
    adminDashboard: '/dashboard/admin',
    checkout: '/checkout',
    sampleCheckout: '/checkout/samples',
    pricing: '/pricing',
    register: '/auth/register',
    compare: '/compare',
    about: '/about',
    contact: '/contact',
    rfq: '/rfq',
};

interface NavigationContextType {
    navigateTo: (page: Page, productId?: number | null) => void;
}

const NavigationContext = createContext<NavigationContextType>({
    navigateTo: () => { },
});

export const NavigationProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
    const router = useRouter();

    const navigateTo = useCallback((page: Page, productId?: number | null) => {
        let route = PAGE_ROUTES[page] || '/';

        if (page === 'productDetail' && productId) {
            route = `/products/${productId}`;
        }
        if (page === 'checkout' && productId) {
            route = `/checkout?product=${productId}`;
        }

        router.push(route);
        window.scrollTo(0, 0);
    }, [router]);

    return (
        <NavigationContext.Provider value={{ navigateTo }}>
            {children}
        </NavigationContext.Provider>
    );
};

export const useNavigation = () => useContext(NavigationContext);

// Re-export for backward compatibility — components that import from '../App'
// can now import from '@/lib/navigation' instead
export default NavigationContext;
