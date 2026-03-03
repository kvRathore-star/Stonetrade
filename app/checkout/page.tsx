'use client';

import { Suspense } from 'react';
import { useSearchParams } from 'next/navigation';
import AppShell from '@/components/AppShell';
import CheckoutPage from '@/components/pages/CheckoutPage';
import { useNavigation } from '@/lib/navigation';
import { useMockData } from '@/hooks/useMockData';

function CheckoutContent() {
    const { navigateTo } = useNavigation();
    const searchParams = useSearchParams();
    const { products } = useMockData();

    const productId = searchParams.get('product');
    const product = productId ? products.find(p => p.id === Number(productId)) : null;

    return (
        <div className="container mx-auto px-4 py-8">
            <CheckoutPage product={product || null} navigateTo={navigateTo} />
        </div>
    );
}

export default function Checkout() {
    return (
        <AppShell>
            <Suspense fallback={<div className="container mx-auto px-4 py-20 text-center"><div className="skeleton h-64 w-full max-w-2xl mx-auto" /></div>}>
                <CheckoutContent />
            </Suspense>
        </AppShell>
    );
}
