'use client';

import { useParams } from 'next/navigation';
import AppShell from '@/components/AppShell';
import ProductDetailPage from '@/components/pages/ProductDetailPage';
import { useNavigation } from '@/lib/navigation';
import { useMockData } from '@/hooks/useMockData';
import Script from 'next/script';

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

    // JSON-LD Structured Data for Google Rich Results
    const jsonLd = {
        '@context': 'https://schema.org',
        '@type': 'Product',
        name: product.name,
        description: product.description,
        image: product.images[0],
        brand: {
            '@type': 'Brand',
            name: product.seller.name,
        },
        offers: {
            '@type': 'Offer',
            price: product.price,
            priceCurrency: 'INR',
            priceValidUntil: new Date(Date.now() + 30 * 24 * 60 * 60 * 1000).toISOString().split('T')[0],
            availability: product.stock > 0 ? 'https://schema.org/InStock' : 'https://schema.org/OutOfStock',
            seller: {
                '@type': 'Organization',
                name: product.seller.name,
            },
            itemCondition: 'https://schema.org/NewCondition',
        },
        aggregateRating: product.seller.rating ? {
            '@type': 'AggregateRating',
            ratingValue: product.seller.rating,
            reviewCount: product.seller.reviews,
            bestRating: 5,
        } : undefined,
        material: product.stoneType,
        color: product.color,
        additionalProperty: [
            { '@type': 'PropertyValue', name: 'Stone Type', value: product.stoneType },
            { '@type': 'PropertyValue', name: 'Origin', value: product.origin },
            { '@type': 'PropertyValue', name: 'Finish', value: product.finish },
            { '@type': 'PropertyValue', name: 'Thickness', value: product.thickness },
        ],
    };

    return (
        <AppShell>
            <Script
                id="product-jsonld"
                type="application/ld+json"
                dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
            />
            <ProductDetailPage product={product} navigateTo={navigateTo} />
        </AppShell>
    );
}
