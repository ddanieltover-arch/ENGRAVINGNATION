import type { Metadata } from 'next';
import { Inter, Outfit } from 'next/font/google';
import './globals.css';
import TawkChat from '@/components/TawkChat';

const inter = Inter({ subsets: ['latin'], variable: '--font-inter' });
const outfit = Outfit({ subsets: ['latin'], variable: '--font-outfit' });

export const metadata: Metadata = {
  title: 'Engraving Nation | Premier Custom Automotive Emblems & Engraving',
  description: 'Elevate your vehicle with custom engraved emblems, mirror caps, and accessories for Chevy, GMC, Ford, and more. Precision hand-crafted quality.',
  keywords: 'custom emblems, automotive engraving, chevy emblems, gmc mirror caps, truck accessories',
  openGraph: {
    title: 'Engraving Nation | Custom Automotive Emblems',
    description: 'Elevate your vehicle with custom engraved emblems and accessories. Precision hand-crafted quality.',
    url: 'https://engravingnation.store',
    siteName: 'Engraving Nation',
    images: [
      {
        url: 'https://engravingnation.store/og-image.jpg',
        width: 1200,
        height: 630,
        alt: 'Engraving Nation Emblems',
      },
    ],
    locale: 'en_US',
    type: 'website',
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" className={`${inter.variable} ${outfit.variable}`}>
      <body className="font-sans min-h-screen flex flex-col antialiased bg-[#0a0a0a] text-white">
        {children}
        <TawkChat />
      </body>
    </html>
  );
}
