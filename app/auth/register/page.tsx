'use client';

import AppShell from '@/components/AppShell';
import RegistrationPage from '@/components/pages/RegistrationPage';
import { useNavigation } from '@/lib/navigation';

export default function Register() {
    const { navigateTo } = useNavigation();
    return (
        <AppShell>
            <div className="container mx-auto px-4 py-8">
                <RegistrationPage navigateTo={navigateTo} />
            </div>
        </AppShell>
    );
}
