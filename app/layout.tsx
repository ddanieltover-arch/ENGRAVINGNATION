import type { Metadata } from 'next';
import { Inter, Outfit } from 'next/font/google';
import './globals.css';
import Script from 'next/script';
import { Analytics } from '@vercel/analytics/react';

const inter = Inter({ subsets: ['latin'], variable: '--font-inter', display: 'swap' });
const outfit = Outfit({ subsets: ['latin'], variable: '--font-outfit', display: 'swap' });

import LazyChatConcierge from '@/components/LazyChatConcierge';

export const metadata: Metadata = {
  metadataBase: new URL('https://engravingnation.store'),
  title: {
    default: 'Engraving Nation | Premier Custom Automotive Emblems & Engraving',
    template: '%s | Engraving Nation',
  },
  description: 'Elevate your vehicle with custom engraved emblems, mirror caps, and accessories for Chevy, GMC, Ford, and more. Precision hand-crafted quality.',
  keywords: ['custom emblems', 'automotive engraving', 'chevy emblems', 'silverado emblem', 'silverado badges', 'engraved chevy emblem', 'chevrolet truck emblems', 'custom chevy badges', 'chevy silverado emblem', 'chevy silverado badges', 'engraved chevy logo', 'chevy truck badges', 'silverado logos', 'engraved car parts', 'gmc mirror caps', 'truck accessories', 'custom car emblem engraving', 'engraved mirror caps', 'oem silverado emblems', 'engraving services near me', 'custom forged chevy emblem'],
  authors: [{ name: 'Engraving Nation' }],
  creator: 'Engraving Nation',
  publisher: 'Engraving Nation',
  formatDetection: {
    email: false,
    address: false,
    telephone: false,
  },
  openGraph: {
    title: 'Engraving Nation | Custom Automotive Emblems',
    description: 'Elevate your vehicle with custom engraved emblems and accessories. Precision hand-crafted quality.',
    url: 'https://engravingnation.store',
    siteName: 'Engraving Nation',
    images: [
      {
        url: '/images/products/candy_red_gmc.png',
        width: 1200,
        height: 630,
        alt: 'Engraving Nation Custom Emblems',
      },
    ],
    locale: 'en_US',
    type: 'website',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Engraving Nation | Custom Automotive Emblems',
    description: 'Elevate your vehicle with custom engraved emblems and accessories.',
    images: ['/images/products/candy_red_gmc.png'],
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      'max-video-preview': -1,
      'max-image-preview': 'large',
      'max-snippet': -1,
    },
  },
  alternates: {
    canonical: 'https://engravingnation.store',
  },
  icons: {
    apple: '/icon.png',
  },
  verification: {
    google: 'AZZ1u6u8rhM5vzOBwxamuspwz-B5KebW0Kz2Cp6quHs',
  },
  manifest: '/manifest.json',
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const jsonLd = {
    '@context': 'https://schema.org',
    '@type': 'Organization',
    name: 'Engraving Nation',
    url: 'https://engravingnation.store',
    logo: 'https://engravingnation.store/logo.png',
    address: {
      '@type': 'PostalAddress',
      streetAddress: '111 SMITHTOWN BYP STE 228',
      addressLocality: 'HAUPPAUGE',
      addressRegion: 'NY',
      postalCode: '11788-2531',
      addressCountry: 'US',
    },
    contactPoint: {
      '@type': 'ContactPoint',
      telephone: '+1-332-256-6110',
      contactType: 'customer service',
      email: 'info@engravingnation.store',
    },
    sameAs: [
      'https://www.tiktok.com/@engraving_nation',
    ],
  };

  const localBusinessJsonLd = {
    '@context': 'https://schema.org',
    '@type': 'LocalBusiness',
    name: 'Engraving Nation',
    description: 'Premier provider of custom hand-engraved automotive emblems, mirror caps, and accessories for Chevy, Ford, GMC, and RAM trucks.',
    image: 'https://engravingnation.store/images/products/candy_red_gmc.png',
    '@id': 'https://engravingnation.store',
    url: 'https://engravingnation.store',
    telephone: '+1-332-256-6110',
    priceRange: '$$$',
    address: {
      '@type': 'PostalAddress',
      streetAddress: '111 SMITHTOWN BYP STE 228',
      addressLocality: 'HAUPPAUGE',
      addressRegion: 'NY',
      postalCode: '11788-2531',
      addressCountry: 'US',
    },
    geo: {
      '@type': 'GeoCoordinates',
      latitude: 40.8122,
      longitude: -73.2201,
    },
    openingHoursSpecification: {
      '@type': 'OpeningHoursSpecification',
      dayOfWeek: [
        'Monday',
        'Tuesday',
        'Wednesday',
        'Thursday',
        'Friday'
      ],
      opens: '09:00',
      closes: '18:00'
    },
    areaServed: [
      { '@type': 'Country', name: 'United States' },
      { '@type': 'AdministrativeArea', name: 'New York' },
    ],
  };

  const websiteJsonLd = {
    '@context': 'https://schema.org',
    '@type': 'WebSite',
    'name': 'Engraving Nation',
    'url': 'https://engravingnation.store',
    'potentialAction': {
      '@type': 'SearchAction',
      'target': {
        '@type': 'EntryPoint',
        'urlTemplate': 'https://engravingnation.store/products?search={search_term_string}'
      },
      'query-input': 'required name=search_term_string'
    }
  };

  return (
    <html lang="en" className={`${inter.variable} ${outfit.variable}`}>
      <head>
        {/* Preconnect hints for Core Web Vitals */}
        <link rel="preload" href="/hero.png" as="image" type="image/png" fetchPriority="high" />
        <link rel="preconnect" href="https://www.googletagmanager.com" />
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
        <link rel="dns-prefetch" href="https://www.google-analytics.com" />

        <Script
          strategy="lazyOnload"
          src={`https://www.googletagmanager.com/gtag/js?id=G-WHN37054LG`}
        />
        <Script
          id="google-analytics"
          strategy="lazyOnload"
          dangerouslySetInnerHTML={{
            __html: `
              window.dataLayer = window.dataLayer || [];
              function gtag(){dataLayer.push(arguments);}
              gtag('js', new Date());
              gtag('config', 'G-WHN37054LG', {
                send_page_view: true,
                allow_google_signals: true,
                allow_ad_personalization_signals: false
              });
            `,
          }}
        />
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
        />
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(localBusinessJsonLd) }}
        />
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(websiteJsonLd) }}
        />
      </head>
      <body className="font-sans min-h-screen flex flex-col antialiased bg-[#0a0a0a] text-white">
        {children}
        <LazyChatConcierge />
        <Analytics />
      </body>
    </html>
  );
}
