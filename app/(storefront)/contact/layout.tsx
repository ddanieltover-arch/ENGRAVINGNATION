import type { Metadata } from 'next';
import JsonLd from '@/components/JsonLd';
import { breadcrumbJsonLd, contactPageJsonLd } from '@/lib/seo/json-ld';
import { buildPageMetadata } from '@/lib/seo/metadata';

export const metadata: Metadata = buildPageMetadata({
  title: 'Contact Us | Custom Inquiries & Support',
  description:
    'Get in touch for custom engraving inquiries, order support, and wholesale requests. Located in Hauppauge, NY. Call +1 (262) 686-5628 or email us today.',
  path: '/contact',
});

export default function ContactLayout({ children }: { children: React.ReactNode }) {
  return (
    <>
      <JsonLd
        data={[
          breadcrumbJsonLd([
            { name: 'Home', path: '/' },
            { name: 'Contact', path: '/contact' },
          ]),
          contactPageJsonLd(),
        ]}
      />
      {children}
    </>
  );
}
