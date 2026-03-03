'use client';

export default function Loading() {
    return (
        <div className="min-h-screen bg-stone-light animate-pulse">
            {/* Hero skeleton */}
            <div className="bg-stone-primary/90 py-24 lg:py-32">
                <div className="container mx-auto px-6 text-center max-w-5xl">
                    <div className="skeleton h-6 w-48 mx-auto mb-10 !bg-white/10 rounded-full" />
                    <div className="skeleton h-16 lg:h-24 w-3/4 mx-auto mb-8 !bg-white/10" />
                    <div className="skeleton h-6 w-2/3 mx-auto mb-12 !bg-white/10" />
                    <div className="flex gap-6 justify-center">
                        <div className="skeleton h-14 w-44 !bg-white/10 rounded-2xl" />
                        <div className="skeleton h-14 w-44 !bg-white/10 rounded-2xl" />
                    </div>
                    <div className="mt-20 grid grid-cols-3 gap-8 max-w-4xl mx-auto pt-12 border-t border-white/5">
                        {[1, 2, 3].map(i => (
                            <div key={i} className="space-y-2">
                                <div className="skeleton h-10 w-20 mx-auto !bg-white/10" />
                                <div className="skeleton h-3 w-24 mx-auto !bg-white/10" />
                            </div>
                        ))}
                    </div>
                </div>
            </div>

            {/* Products skeleton */}
            <div className="container mx-auto px-4 py-16">
                <div className="skeleton h-10 w-64 mb-2" />
                <div className="skeleton h-4 w-80 mb-8" />
                <div className="grid grid-cols-2 lg:grid-cols-4 gap-6">
                    {[1, 2, 3, 4].map(i => (
                        <div key={i} className="rounded-2xl overflow-hidden">
                            <div className="skeleton h-48 lg:h-64 w-full !rounded-b-none" />
                            <div className="p-4 space-y-2 bg-white">
                                <div className="skeleton h-4 w-3/4" />
                                <div className="skeleton h-3 w-1/2" />
                                <div className="skeleton h-6 w-24 mt-3" />
                            </div>
                        </div>
                    ))}
                </div>
            </div>
        </div>
    );
}
