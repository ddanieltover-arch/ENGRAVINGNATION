import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Refund & Returns Policy | Engraving Nation',
  description: 'Review our custom order refund and returns policy. Professional craftsmanship and quality guarantee for every engraved piece.',
  alternates: {
    canonical: 'https://engravingnation.store/refund-and-returns',
  },
  openGraph: {
    title: 'Refund & Returns Policy | Engraving Nation',
    description: 'Learn about our policy on custom engraved orders and our commitment to quality.',
    url: 'https://engravingnation.store/refund-and-returns',
  },
};

export default function RefundReturnsLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return <>{children}</>;
}
