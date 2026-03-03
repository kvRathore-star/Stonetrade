'use client';

import AppShell from '@/components/AppShell';
import RFQForm from '@/components/RFQForm';

export default function RFQPage() {
    return (
        <AppShell>
            <div className="container mx-auto px-4 py-8 lg:py-12">
                <RFQForm />
            </div>
        </AppShell>
    );
}
