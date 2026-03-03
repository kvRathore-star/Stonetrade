'use client';

import AppShell from '@/components/AppShell';

export default function OfflinePage() {
    return (
        <AppShell showConcierge={false}>
            <div className="container mx-auto px-4 py-20 text-center">
                <div className="max-w-md mx-auto">
                    <div className="w-24 h-24 bg-stone-accent/20 rounded-3xl flex items-center justify-center mx-auto mb-8">
                        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-12 h-12 text-stone-accent">
                            <path strokeLinecap="round" strokeLinejoin="round" d="M12 9v3.75m-9.303 3.376c-.866 1.5.217 3.374 1.948 3.374h14.71c1.73 0 2.813-1.874 1.948-3.374L13.949 3.378c-.866-1.5-3.032-1.5-3.898 0L2.697 16.126zM12 15.75h.007v.008H12v-.008z" />
                        </svg>
                    </div>
                    <h1 className="text-3xl font-black text-stone-primary mb-4">You&apos;re Offline</h1>
                    <p className="text-stone-secondary mb-8 leading-relaxed">
                        It looks like you&apos;ve lost your internet connection. Please check your network and try again.
                    </p>
                    <button
                        onClick={() => window.location.reload()}
                        className="bg-stone-primary text-white px-10 py-4 rounded-xl font-bold hover:bg-stone-secondary transition-colors"
                    >
                        Try Again
                    </button>
                </div>
            </div>
        </AppShell>
    );
}
