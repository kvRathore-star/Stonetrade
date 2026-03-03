import Link from 'next/link';

export default function NotFound() {
    return (
        <div className="min-h-screen bg-stone-light flex items-center justify-center px-4">
            <div className="max-w-md text-center">
                <p className="text-8xl font-black text-stone-accent mb-4">404</p>
                <h2 className="text-3xl font-black text-stone-primary mb-4">Page Not Found</h2>
                <p className="text-stone-secondary mb-8 leading-relaxed">
                    The page you&apos;re looking for doesn&apos;t exist or has been moved.
                </p>
                <div className="flex gap-4 justify-center">
                    <Link
                        href="/"
                        className="bg-stone-primary text-white px-8 py-3 rounded-xl font-bold hover:bg-stone-secondary transition-colors"
                    >
                        Go Home
                    </Link>
                    <Link
                        href="/products"
                        className="bg-stone-accent/20 text-stone-primary px-8 py-3 rounded-xl font-bold hover:bg-stone-accent/30 transition-colors"
                    >
                        Browse Products
                    </Link>
                </div>
            </div>
        </div>
    );
}
