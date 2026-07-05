import type { Metadata } from 'next';
import JsonLd from '@/components/JsonLd';
import { breadcrumbJsonLd } from '@/lib/seo/json-ld';
import { buildPageMetadata } from '@/lib/seo/metadata';

export const metadata: Metadata = buildPageMetadata({
  title: 'Shipping Policy & Delivery Timelines',
  description:
    'Shipping rates and delivery timelines for custom engraved Silverado, GMC, and Ford emblems. Free USA shipping on orders over $300.',
  path: '/shipping',
});

export default function ShippingLayout({ children }: { children: React.ReactNode }) {
  return (
    <>
      <JsonLd
        data={breadcrumbJsonLd([
          { name: 'Home', path: '/' },
          { name: 'Shipping', path: '/shipping' },
        ])}
      />
      {children}
    </>
  );
}
