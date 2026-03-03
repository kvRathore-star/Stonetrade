'use client';

import AppShell from '@/components/AppShell';
import AdminDashboardPage from '@/components/pages/AdminDashboardPage';

export default function AdminDashboard() {
    return (
        <AppShell>
            <div className="container mx-auto px-4 py-8">
                <AdminDashboardPage />
            </div>
        </AppShell>
    );
}
