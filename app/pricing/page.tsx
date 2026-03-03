'use client';

import AppShell from '@/components/AppShell';
import PricingPage from '@/components/pages/PricingPage';
import { useNavigation } from '@/lib/navigation';

export default function Pricing() {
    const { navigateTo } = useNavigation();
    return (
        <AppShell>
            <PricingPage navigateTo={navigateTo} />
        </AppShell>
    );
}
