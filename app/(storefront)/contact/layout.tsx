import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Contact Engraving Nation | Custom Emblem Inquiries & Support',
  description: 'Get in touch for custom engraving inquiries, order support, and wholesale requests. Located in Hauppauge, NY. Call +1 (332) 256-6110 or email us today.',
  alternates: {
    canonical: 'https://engravingnation.store/contact',
  },
  openGraph: {
    title: 'Contact Engraving Nation | Support & Custom Orders',
    description: 'Reach our team for custom automotive engraving questions, order status, and wholesale inquiries.',
    url: 'https://engravingnation.store/contact',
  },
};

export default function ContactLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return <>{children}</>;
}
