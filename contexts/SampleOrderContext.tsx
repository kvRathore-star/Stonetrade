'use client';

import React, { createContext, useContext, useState, useEffect, ReactNode } from 'react';
import { Product } from '@/types';
import { PRICING, BuyerTier } from './AuthContext';

export interface SampleOrderItem {
    product: Product;
    quantity: number;
    samplePrice: number;
}

export interface SampleOrder {
    id: string;
    items: SampleOrderItem[];
    subtotal: number;
    platformFee: number;
    platformFeePercent: number;
    shippingEstimate: number;
    total: number;
    status: 'pending' | 'confirmed' | 'shipped' | 'delivered' | 'cancelled';
    buyerId: string; // 'guest' for guest orders
    buyerEmail?: string;
    deliveryAddress?: {
        name: string;
        phone: string;
        email?: string;
        address: string;
        city: string;
        state: string;
        pincode: string;
    };
    createdAt: Date;
}

interface SampleOrderContextType {
    cart: SampleOrderItem[];
    orders: SampleOrder[];
    addToCart: (product: Product, samplePrice: number) => void;
    removeFromCart: (productId: number) => void;
    clearCart: () => void;
    getCartTotal: (buyerTier?: BuyerTier | null) => { subtotal: number; platformFee: number; feePercent: number; shipping: number; total: number };
    placeOrder: (deliveryAddress: SampleOrder['deliveryAddress'], buyerId: string, buyerTier?: BuyerTier | null) => SampleOrder;
}

const SampleOrderContext = createContext<SampleOrderContextType | undefined>(undefined);

// Get commission rate based on buyer tier
const getCommissionRate = (buyerTier?: BuyerTier | null): number => {
    if (!buyerTier) return PRICING.commission.guest; // 8% for guests
    return PRICING.commission[buyerTier] || PRICING.commission.lite; // 8% lite, 5% pro
};

export const SampleOrderProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
    const [cart, setCart] = useState<SampleOrderItem[]>([]);
    const [orders, setOrders] = useState<SampleOrder[]>([]);

    // Load from localStorage
    useEffect(() => {
        const savedCart = localStorage.getItem('stonetrade_cart');
        const savedOrders = localStorage.getItem('stonetrade_orders');
        if (savedCart) setCart(JSON.parse(savedCart));
        if (savedOrders) {
            const parsed = JSON.parse(savedOrders);
            setOrders(parsed.map((o: any) => ({ ...o, createdAt: new Date(o.createdAt) })));
        }
    }, []);

    // Save to localStorage
    useEffect(() => {
        localStorage.setItem('stonetrade_cart', JSON.stringify(cart));
    }, [cart]);

    useEffect(() => {
        localStorage.setItem('stonetrade_orders', JSON.stringify(orders));
    }, [orders]);

    const addToCart = (product: Product, samplePrice: number) => {
        setCart(prev => {
            const existing = prev.find(item => item.product.id === product.id);
            if (existing) return prev;
            return [...prev, { product, quantity: 1, samplePrice }];
        });
    };

    const removeFromCart = (productId: number) => {
        setCart(prev => prev.filter(item => item.product.id !== productId));
    };

    const clearCart = () => setCart([]);

    const getCartTotal = (buyerTier?: BuyerTier | null) => {
        const subtotal = cart.reduce((sum, item) => sum + item.samplePrice * item.quantity, 0);
        const feePercent = getCommissionRate(buyerTier);
        const platformFee = Math.round(subtotal * feePercent);
        const shipping = cart.length > 0 ? 199 : 0;
        return {
            subtotal,
            platformFee,
            feePercent,
            shipping,
            total: subtotal + platformFee + shipping,
        };
    };

    const placeOrder = (deliveryAddress: SampleOrder['deliveryAddress'], buyerId: string, buyerTier?: BuyerTier | null): SampleOrder => {
        const totals = getCartTotal(buyerTier);
        const newOrder: SampleOrder = {
            id: `ORD-${Date.now()}`,
            items: [...cart],
            subtotal: totals.subtotal,
            platformFee: totals.platformFee,
            platformFeePercent: totals.feePercent * 100,
            shippingEstimate: totals.shipping,
            total: totals.total,
            status: 'confirmed',
            buyerId,
            buyerEmail: deliveryAddress?.email,
            deliveryAddress,
            createdAt: new Date(),
        };

        setOrders(prev => [newOrder, ...prev]);
        clearCart();
        return newOrder;
    };

    return (
        <SampleOrderContext.Provider value={{
            cart,
            orders,
            addToCart,
            removeFromCart,
            clearCart,
            getCartTotal,
            placeOrder,
        }}>
            {children}
        </SampleOrderContext.Provider>
    );
};

export const useSampleOrder = (): SampleOrderContextType => {
    const context = useContext(SampleOrderContext);
    if (!context) {
        throw new Error('useSampleOrder must be used within SampleOrderProvider');
    }
    return context;
};

export default SampleOrderContext;
