'use client';

import { useEffect } from 'react';

export default function Error({
    error,
    reset,
}: {
    error: Error & { digest?: string };
    reset: () => void;
}) {
    useEffect(() => {
        console.error('App error:', error);
    }, [error]);

    return (
        <div className="min-h-screen bg-stone-light flex items-center justify-center px-4">
            <div className="max-w-md text-center">
                <div className="w-24 h-24 bg-red-100 rounded-3xl flex items-center justify-center mx-auto mb-8">
                    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-12 h-12 text-red-500">
                        <path strokeLinecap="round" strokeLinejoin="round" d="M12 9v3.75m9-.75a9 9 0 11-18 0 9 9 0 0118 0zm-9 3.75h.008v.008H12v-.008z" />
                    </svg>
                </div>
                <h2 className="text-3xl font-black text-stone-primary mb-4">Something went wrong</h2>
                <p className="text-stone-secondary mb-8 leading-relaxed">
                    We apologize for the inconvenience. Our team has been notified and is working on a fix.
                </p>
                <div className="flex gap-4 justify-center">
                    <button
                        onClick={reset}
                        className="bg-stone-primary text-white px-8 py-3 rounded-xl font-bold hover:bg-stone-secondary transition-colors"
                    >
                        Try Again
                    </button>
                    <a
                        href="/"
                        className="bg-stone-accent/20 text-stone-primary px-8 py-3 rounded-xl font-bold hover:bg-stone-accent/30 transition-colors"
                    >
                        Go Home
                    </a>
                </div>
            </div>
        </div>
    );
}
