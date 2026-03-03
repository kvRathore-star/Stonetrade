import type { Metadata, Viewport } from 'next';
import Script from 'next/script';
import './globals.css';
import Providers from './providers';

export const metadata: Metadata = {
  title: 'StoneTrade – Buy Marble, Granite & Stone Direct from Indian Quarries',
  description: 'India\'s most trusted stone marketplace. Buy marble, granite, sandstone & natural stone directly from 500+ verified manufacturers across 28 states. No middlemen, GST invoiced, pan India delivery.',
  keywords: ['marble', 'granite', 'natural stone', 'buy stone online', 'stone marketplace India', 'quarry direct', 'sandstone', 'Italian marble', 'Rajasthan marble', 'Makrana marble', 'stone dealer India'],
  openGraph: {
    title: 'StoneTrade – Buy Stone Direct from Indian Quarries',
    description: 'India\'s trusted marketplace for marble, granite & natural stone. 500+ verified sellers, pan India delivery, zero brokerage.',
    type: 'website',
    locale: 'en_IN',
    siteName: 'StoneTrade',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'StoneTrade – India\'s Stone Marketplace',
    description: 'Buy marble, granite & stone direct from quarries. No middlemen.',
  },
  manifest: '/manifest.json',
  appleWebApp: {
    capable: true,
    statusBarStyle: 'black-translucent',
    title: 'StoneTrade',
  },
  alternates: {
    canonical: 'https://stonetrade.in',
  },
};

export const viewport: Viewport = {
  width: 'device-width',
  initialScale: 1,
  maximumScale: 5,
  userScalable: true,
  themeColor: '#2d2d2d',
};

// Organization + WebSite JSON-LD for Google Knowledge Panel
const organizationJsonLd = {
  '@context': 'https://schema.org',
  '@type': 'Organization',
  name: 'StoneTrade',
  url: 'https://stonetrade.in',
  logo: 'https://stonetrade.in/logo512.png',
  description: 'India\'s trusted marketplace for marble, granite & natural stone.',
  sameAs: [],
  contactPoint: {
    '@type': 'ContactPoint',
    contactType: 'customer service',
    availableLanguage: ['English', 'Hindi'],
  },
};

const websiteJsonLd = {
  '@context': 'https://schema.org',
  '@type': 'WebSite',
  name: 'StoneTrade',
  url: 'https://stonetrade.in',
  potentialAction: {
    '@type': 'SearchAction',
    target: 'https://stonetrade.in/products?q={search_term_string}',
    'query-input': 'required name=search_term_string',
  },
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <head>
        <link rel="stylesheet" href="https://rsms.me/inter/inter.css" />
        <link rel="apple-touch-icon" href="/apple-touch-icon.png" />
        <link rel="icon" href="/favicon.svg" type="image/svg+xml" />
        <Script
          id="org-jsonld"
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(organizationJsonLd) }}
        />
        <Script
          id="website-jsonld"
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(websiteJsonLd) }}
        />
      </head>
      <body className="bg-stone-light font-sans">
        <Providers>
          {children}
        </Providers>
      </body>
    </html>
  );
}
