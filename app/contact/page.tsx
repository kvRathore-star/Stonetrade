'use client';

import AppShell from '@/components/AppShell';
import ContactPage from '@/components/pages/ContactPage';

export default function Contact() {
    return (
        <AppShell>
            <div className="container mx-auto px-4 py-8">
                <ContactPage />
            </div>
        </AppShell>
    );
}
