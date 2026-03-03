'use client';

import React from 'react';
import { NavigationProvider } from '@/lib/navigation';
import { LanguageProvider } from '@/lib/language';
import { AuthProvider } from '@/contexts/AuthContext';
import { SampleOrderProvider } from '@/contexts/SampleOrderContext';
import { ProjectProvider } from '@/contexts/ProjectContext';
import { CreditProvider } from '@/contexts/CreditContext';
import { ToastProvider } from '@/lib/toast';

export default function Providers({ children }: { children: React.ReactNode }) {
    return (
        <AuthProvider>
            <SampleOrderProvider>
                <ProjectProvider>
                    <CreditProvider>
                        <LanguageProvider>
                            <NavigationProvider>
                                <ToastProvider>
                                    {children}
                                </ToastProvider>
                            </NavigationProvider>
                        </LanguageProvider>
                    </CreditProvider>
                </ProjectProvider>
            </SampleOrderProvider>
        </AuthProvider>
    );
}
