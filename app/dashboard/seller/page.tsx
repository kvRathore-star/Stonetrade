'use client';

import AppShell from '@/components/AppShell';
import SellerDashboardPage from '@/components/pages/SellerDashboardPage';

export default function SellerDashboard() {
    return (
        <AppShell>
            <div className="container mx-auto px-4 py-8">
                <SellerDashboardPage />
            </div>
        </AppShell>
    );
}
