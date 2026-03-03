'use client';

import AppShell from '@/components/AppShell';
import AboutPage from '@/components/pages/AboutPage';

export default function About() {
    return (
        <AppShell>
            <div className="container mx-auto px-4 py-8">
                <AboutPage />
            </div>
        </AppShell>
    );
}
