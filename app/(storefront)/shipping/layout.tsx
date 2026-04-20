import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Shipping Policy & Delivery Timelines',
  description: 'Everything you need to know about shipping custom engraved Silverado, GMC, and Ford emblems. Worldwide delivery, meticulous handling.',
  alternates: {
    canonical: 'https://engravingnation.store/shipping',
  },
  openGraph: {
    title: 'Shipping & Delivery | Engraving Nation',
    description: 'Detailed information on domestic and international shipping rates for custom engraved vehicle parts.',
    url: 'https://engravingnation.store/shipping',
  },
};

export default function ShippingLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return <>{children}</>;
}
