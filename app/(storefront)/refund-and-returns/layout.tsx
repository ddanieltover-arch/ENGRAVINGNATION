import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Refund & Returns Policy | Engraving Nation',
  description: 'Learn about our custom order refund and returns policy. Professional craftsmanship and quality guarantee for every engraved piece.',
};

export default function RefundReturnsLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return <>{children}</>;
}
