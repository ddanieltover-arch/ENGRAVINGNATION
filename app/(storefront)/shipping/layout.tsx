import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Shipping Policy | Engraving Nation',
  description: 'Everything you need to know about shipping custom engraved Silverado, GMC, and Ford emblems. Worldwide delivery, meticulous handling.',
};

export default function ShippingLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return <>{children}</>;
}
