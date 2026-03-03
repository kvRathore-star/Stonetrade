'use client';

import { useParams } from 'next/navigation';
import AppShell from '@/components/AppShell';
import ProductDetailPage from '@/components/pages/ProductDetailPage';
import { useNavigation } from '@/lib/navigation';
import { useMockData } from '@/hooks/useMockData';

export default function ProductDetail() {
    const params = useParams();
    const { navigateTo } = useNavigation();
    const { products } = useMockData();

    const productId = Number(params.id);
    const product = products.find(p => p.id === productId);

    if (!product) {
        return (
            <AppShell>
                <div className="container mx-auto px-4 py-20 text-center">
                    <h1 className="text-3xl font-black text-stone-primary mb-4">Product Not Found</h1>
                    <p className="text-stone-secondary mb-8">This product may have been removed or is no longer available.</p>
                    <button onClick={() => navigateTo('products')} className="bg-stone-primary text-white px-8 py-3 rounded-xl font-bold hover:bg-stone-secondary transition-colors">
                        Browse All Products
                    </button>
                </div>
            </AppShell>
        );
    }

    return (
        <AppShell>
            <ProductDetailPage product={product} navigateTo={navigateTo} />
        </AppShell>
    );
}
