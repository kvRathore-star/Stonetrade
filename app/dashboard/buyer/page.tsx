'use client';

import AppShell from '@/components/AppShell';
import BuyerDashboardPage from '@/components/pages/BuyerDashboardPage';
import { useNavigation } from '@/lib/navigation';

export default function BuyerDashboard() {
    const { navigateTo } = useNavigation();
    return (
        <AppShell>
            <div className="container mx-auto px-4 py-8">
                <BuyerDashboardPage navigateTo={navigateTo} />
            </div>
        </AppShell>
    );
}
