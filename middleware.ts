import { NextResponse } from 'next/server';
import type { NextRequest } from 'next/server';

// Simple in-memory rate limiter for API routes
const rateLimitMap = new Map<string, { count: number; lastReset: number }>();
const RATE_LIMIT_WINDOW = 60_000; // 1 minute
const RATE_LIMIT_MAX = 30; // 30 requests per minute

function rateLimit(ip: string): boolean {
    const now = Date.now();
    const entry = rateLimitMap.get(ip);

    if (!entry || now - entry.lastReset > RATE_LIMIT_WINDOW) {
        rateLimitMap.set(ip, { count: 1, lastReset: now });
        return true;
    }

    if (entry.count >= RATE_LIMIT_MAX) {
        return false;
    }

    entry.count++;
    return true;
}

export function middleware(request: NextRequest) {
    const { pathname } = request.nextUrl;

    // Rate limit API routes
    if (pathname.startsWith('/api/')) {
        const ip = request.headers.get('x-forwarded-for')?.split(',')[0]?.trim()
            || request.headers.get('x-real-ip')
            || 'unknown';

        if (!rateLimit(ip)) {
            return NextResponse.json(
                { error: 'Too many requests. Please try again later.' },
                { status: 429, headers: { 'Retry-After': '60' } }
            );
        }
    }

    // Add security headers for all requests
    const response = NextResponse.next();

    // CSRF protection for state-changing API routes
    if (pathname.startsWith('/api/') && ['POST', 'PUT', 'DELETE', 'PATCH'].includes(request.method)) {
        const origin = request.headers.get('origin');
        const host = request.headers.get('host');
        if (origin && host && !origin.includes(host)) {
            return NextResponse.json(
                { error: 'CSRF validation failed' },
                { status: 403 }
            );
        }
    }

    return response;
}

export const config = {
    matcher: [
        // Match all routes except static files and _next
        '/((?!_next/static|_next/image|favicon\\.ico|logo.*\\.png|manifest\\.json|sw\\.js|.*\\.svg).*)',
    ],
};
