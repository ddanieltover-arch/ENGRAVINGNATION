import type { Metadata } from 'next';
import { Inter, Outfit } from 'next/font/google';
import './globals.css';
import TawkChat from '@/components/TawkChat';
import WhatsAppChat from '@/components/WhatsAppChat';
import Script from 'next/script';

const inter = Inter({ subsets: ['latin'], variable: '--font-inter' });
const outfit = Outfit({ subsets: ['latin'], variable: '--font-outfit' });

export const metadata: Metadata = {
  metadataBase: new URL('https://engravingnation.store'),
  title: {
    default: 'Engraving Nation | Premier Custom Automotive Emblems & Engraving',
    template: '%s | Engraving Nation',
  },
  description: 'Elevate your vehicle with custom engraved emblems, mirror caps, and accessories for Chevy, GMC, Ford, and more. Precision hand-crafted quality.',
  keywords: ['custom emblems', 'automotive engraving', 'chevy emblems', 'gmc mirror caps', 'truck accessories', 'engraved car parts'],
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
        url: '/og-image.jpg',
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
    images: ['/og-image.jpg'],
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
  icons: {
    icon: '/icon.png',
    shortcut: '/icon.png',
    apple: '/icon.png',
  },
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
      'https://www.instagram.com/engraving_nation',
    ],
  };

  const localBusinessJsonLd = {
    '@context': 'https://schema.org',
    '@type': 'LocalBusiness',
    name: 'Engraving Nation',
    image: 'https://engravingnation.store/og-image.jpg',
    '@id': 'https://engravingnation.store',
    url: 'https://engravingnation.store',
    telephone: '+1-332-256-6110',
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
    }
  };

  return (
    <html lang="en" className={`${inter.variable} ${outfit.variable}`}>
      <head>
        <Script
          strategy="afterInteractive"
          src={`https://www.googletagmanager.com/gtag/js?id=G-WHN37054LG`}
        />
        <Script
          id="google-analytics"
          strategy="afterInteractive"
          dangerouslySetInnerHTML={{
            __html: `
              window.dataLayer = window.dataLayer || [];
              function gtag(){dataLayer.push(arguments);}
              gtag('js', new Date());
              gtag('config', 'G-WHN37054LG');
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
      </head>
      <body className="font-sans min-h-screen flex flex-col antialiased bg-[#0a0a0a] text-white">
        {children}
        <WhatsAppChat />
        <TawkChat />
      </body>
    </html>
  );
}
