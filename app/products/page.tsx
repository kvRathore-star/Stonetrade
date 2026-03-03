'use client';

import AppShell from '@/components/AppShell';
import ProductsPage from '@/components/pages/ProductsPage';
import { useNavigation } from '@/lib/navigation';

export default function Products() {
    const { navigateTo } = useNavigation();
    return (
        <AppShell>
            <ProductsPage navigateTo={navigateTo} />
        </AppShell>
    );
}
