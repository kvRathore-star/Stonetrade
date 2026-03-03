'use client';

import AppShell from '@/components/AppShell';
import SampleCheckoutPage from '@/components/pages/SampleCheckoutPage';
import { useNavigation } from '@/lib/navigation';

export default function SampleCheckout() {
    const { navigateTo } = useNavigation();
    return (
        <AppShell>
            <div className="container mx-auto px-4 py-8">
                <SampleCheckoutPage navigateTo={navigateTo} />
            </div>
        </AppShell>
    );
}
