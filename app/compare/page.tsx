'use client';

import AppShell from '@/components/AppShell';
import ComparisonPage from '@/components/pages/ComparisonPage';
import { useNavigation } from '@/lib/navigation';

export default function Compare() {
    const { navigateTo } = useNavigation();
    return (
        <AppShell>
            <div className="container mx-auto px-4 py-8">
                <ComparisonPage navigateTo={navigateTo} />
            </div>
        </AppShell>
    );
}
