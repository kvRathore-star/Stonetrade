import type { Metadata, Viewport } from 'next';
import './globals.css';
import Providers from './providers';

export const metadata: Metadata = {
  title: 'StoneTrade – India\'s Premier Marble & Stone Marketplace',
  description: 'Connect with 500+ verified stone manufacturers. Browse marble, granite, sandstone & more. AI-powered matching for architects & builders across India.',
  keywords: ['marble', 'granite', 'stone marketplace', 'India', 'B2B', 'natural stone', 'architect', 'builder'],
  openGraph: {
    title: 'StoneTrade – Marble & Stone Marketplace',
    description: 'India\'s premier B2B stone network connecting 500+ factories with architects & builders.',
    type: 'website',
    locale: 'en_IN',
    siteName: 'StoneTrade',
  },
  manifest: '/manifest.json',
  appleWebApp: {
    capable: true,
    statusBarStyle: 'black-translucent',
    title: 'StoneTrade',
  },
};

export const viewport: Viewport = {
  width: 'device-width',
  initialScale: 1,
  maximumScale: 1,
  userScalable: false,
  themeColor: '#2d2d2d',
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <head>
        <link rel="stylesheet" href="https://rsms.me/inter/inter.css" />
        <link rel="apple-touch-icon" href="/apple-touch-icon.png" />
      </head>
      <body className="bg-stone-light font-sans">
        <Providers>
          {children}
        </Providers>
      </body>
    </html>
  );
}
