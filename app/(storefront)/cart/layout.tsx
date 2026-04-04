import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Shopping Cart | Engraving Nation',
  description: 'Review your custom engraved emblem selections before checkout.',
  robots: {
    index: false,
    follow: false,
  },
};

export default function CartLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return <>{children}</>;
}
