import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Contact Support & Inquiries | Engraving Nation',
  description: 'Have questions about custom Silverado emblems or an existing order? Contact our support team for specialized automotive engraving assistance.',
};

export default function ContactLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return <>{children}</>;
}
