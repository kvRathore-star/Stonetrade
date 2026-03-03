'use client';

import React from 'react';
import Header from '@/components/Header';
import Footer from '@/components/Footer';
import BottomNav from '@/components/BottomNav';
import { useNavigation } from '@/lib/navigation';
import { SparklesIcon } from '@/components/IconComponents';

interface AppShellProps {
    children: React.ReactNode;
    showConcierge?: boolean;
}

export default function AppShell({ children, showConcierge = true }: AppShellProps) {
    const { navigateTo } = useNavigation();
    const [showAIConcierge, setShowAIConcierge] = React.useState(false);

    // Dynamically import AIConcierge to reduce initial bundle
    const AIConcierge = React.lazy(() => import('@/components/AIConcierge'));

    return (
        <div className="flex flex-col min-h-screen font-sans bg-stone-light bg-stone-texture text-stone-primary">
            <Header navigateTo={navigateTo} />
            <main className="flex-grow pb-20 lg:pb-0">
                {children}
            </main>
            <div className="hidden lg:block">
                <Footer navigateTo={navigateTo} />
            </div>

            {/* Mobile Bottom Navigation */}
            <BottomNav />

            {/* AI Concierge FAB — above bottom nav on mobile */}
            {showConcierge && (
                <>
                    <button
                        onClick={() => setShowAIConcierge(!showAIConcierge)}
                        className="fixed bottom-24 lg:bottom-6 right-4 lg:right-6 z-40 w-12 h-12 lg:w-14 lg:h-14 bg-gradient-to-r from-emerald-500 to-teal-500 text-white rounded-full shadow-xl flex items-center justify-center hover:scale-110 active:scale-95 transition-transform"
                        title="AI Concierge"
                        aria-label="Open AI Concierge"
                    >
                        <SparklesIcon className="h-5 w-5 lg:h-6 lg:w-6" />
                    </button>
                    {showAIConcierge && (
                        <React.Suspense fallback={null}>
                            <AIConcierge isOpen={showAIConcierge} onClose={() => setShowAIConcierge(false)} />
                        </React.Suspense>
                    )}
                </>
            )}
        </div>
    );
}
