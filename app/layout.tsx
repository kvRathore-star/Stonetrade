import type { Metadata, Viewport } from 'next';
import Script from 'next/script';
import './globals.css';
import Providers from './providers';
import Link from 'next/link';

export const metadata: Metadata = {
  title: 'StoneTrade | India\'s Premium B2B Stone Marketplace',
  description: 'India\'s most trusted stone marketplace. Buy marble, granite, sandstone & natural stone with Royal craftsmanship. 28 States Covered, GST Invoiced, and Quality Guaranteed.',
  keywords: ['marble', 'granite', 'natural stone', 'buy stone online', 'stone marketplace India', 'quarry direct', 'sandstone', 'Italian marble', 'Rajasthan marble', 'Makrana marble', 'stone dealer India'],
  openGraph: {
    title: 'StoneTrade | Premium Natural Stone',
    description: 'Buy premium marble, granite & stone from verified quarries. 28 States Covered. GST Invoiced.',
    url: 'https://stonetrade.in',
    siteName: 'StoneTrade',
    images: [
      {
        url: 'https://stonetrade.in/og.png',
        width: 1200,
        height: 630,
        alt: 'StoneTrade Premium Indian Marble & Granite',
      }
    ],
    locale: 'en_IN',
    type: 'website',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'StoneTrade | Original Indian Stone',
    description: 'Buy premium marble, granite & stone. 28 States Covered. GST Invoiced.',
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
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify({
              "@context": "https://schema.org",
              "@type": "Organization",
              "name": "StoneTrade",
              "url": "https://stonetrade.in",
              "logo": "https://stonetrade.in/logo.png",
              "description": "India's most trusted B2B stone marketplace. Buy premium marble, granite, and sandstone directly from verified quarries across 28 states.",
              "areaServed": {
                "@type": "Country",
                "name": "India"
              }
            })
          }}
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
