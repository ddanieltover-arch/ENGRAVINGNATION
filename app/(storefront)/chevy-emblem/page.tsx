import type { Metadata } from 'next';
import Link from 'next/link';
import Image from 'next/image';
import { getProducts } from '@/lib/data';

type VehicleFitment = { make?: string };
type LandingProduct = {
  slug: string;
  name: string;
  categories?: string[];
  vehicle_fitment?: VehicleFitment[];
};

export const metadata: Metadata = {
  title: 'Chevy Emblem Guide: Fitment, Styles, and Install',
  description:
    'Find the right Chevy emblem by year and platform. Compare finishes, view fitment tables, and install with confidence using our step-by-step guidance.',
  alternates: {
    canonical: 'https://engravingnation.store/chevy-emblem',
  },
};

export default async function ChevyEmblemPage() {
  const products = (await getProducts()) as LandingProduct[];
  const chevyProducts = products
    .filter(
      (p) =>
        (p.categories || []).some((c: string) => c.toLowerCase().includes('chev')) ||
        (p.vehicle_fitment || []).some((f) => (f?.make || '').toLowerCase().includes('chevrolet'))
    )
    .slice(0, 8);

  const faqSchema = {
    '@context': 'https://schema.org',
    '@type': 'FAQPage',
    mainEntity: [
      {
        '@type': 'Question',
        name: 'How do I choose the correct Chevy emblem size?',
        acceptedAnswer: {
          '@type': 'Answer',
          text: 'Match your model year, trim, and emblem mounting style first. Then verify width, height, and clip or adhesive layout before ordering.',
        },
      },
      {
        '@type': 'Question',
        name: 'Are engraved emblems better than overlays?',
        acceptedAnswer: {
          '@type': 'Answer',
          text: 'Engraved emblems are generally more durable because the detail is cut into the material instead of applied on top like a vinyl overlay.',
        },
      },
      {
        '@type': 'Question',
        name: 'Can I install a Chevy emblem myself?',
        acceptedAnswer: {
          '@type': 'Answer',
          text: 'Yes. Most installs are DIY-friendly with trim tools, heat for adhesive-backed badges, and careful alignment before final pressure.',
        },
      },
    ],
  };

  const itemListSchema = {
    '@context': 'https://schema.org',
    '@type': 'ItemList',
    name: 'Chevy Emblem Collection',
    itemListElement: chevyProducts.map((product, index: number) => ({
      '@type': 'ListItem',
      position: index + 1,
      url: `https://engravingnation.store/products/${product.slug}`,
      name: product.name,
    })),
  };

  return (
    <div className="pt-32 pb-24 bg-brand-bg min-h-screen">
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(faqSchema) }} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(itemListSchema) }} />

      <div className="container mx-auto px-4 max-w-6xl">
        <header className="mb-14">
          <h1 className="text-4xl md:text-6xl font-heading font-black uppercase italic text-white mb-6">
            Chevy Emblem Fitment and Style Guide
          </h1>
          <section id="answer" aria-label="Quick Answer" className="glass-card p-8 border border-brand-gold/20">
            <p className="text-white/80 text-lg leading-relaxed">
              <strong className="text-brand-gold">Quick Answer:</strong> The right Chevy emblem depends on your exact
              year, trim, and mounting type. Confirm measurements first, choose a finish that matches your build, and
              use a fitment-first install process for factory-level alignment and long-term durability.
            </p>
          </section>
        </header>

        <section className="mb-16 overflow-x-auto">
          <h2 className="text-2xl font-heading font-black uppercase italic text-white mb-6">Chevy Fitment Table</h2>
          <table className="w-full text-left border-collapse text-white/80 min-w-[780px]">
            <thead>
              <tr className="border-b border-white/15">
                <th className="py-3 pr-4">Platform</th>
                <th className="py-3 pr-4">Years</th>
                <th className="py-3 pr-4">Typical Mount Style</th>
                <th className="py-3 pr-4">Common Emblem Zone</th>
              </tr>
            </thead>
            <tbody>
              <tr className="border-b border-white/10">
                <td className="py-3 pr-4">GMT800</td>
                <td className="py-3 pr-4">1999-2006</td>
                <td className="py-3 pr-4">Adhesive + studs</td>
                <td className="py-3 pr-4">Tailgate + grille</td>
              </tr>
              <tr className="border-b border-white/10">
                <td className="py-3 pr-4">GMT900</td>
                <td className="py-3 pr-4">2007-2013</td>
                <td className="py-3 pr-4">Clip-in / mixed</td>
                <td className="py-3 pr-4">Front grille</td>
              </tr>
              <tr className="border-b border-white/10">
                <td className="py-3 pr-4">K2XX</td>
                <td className="py-3 pr-4">2014-2018</td>
                <td className="py-3 pr-4">Mechanical clips + adhesive</td>
                <td className="py-3 pr-4">Grille + tailgate</td>
              </tr>
              <tr>
                <td className="py-3 pr-4">T1XX</td>
                <td className="py-3 pr-4">2019+</td>
                <td className="py-3 pr-4">Platform/trim dependent</td>
                <td className="py-3 pr-4">Front, rear, side applications</td>
              </tr>
            </tbody>
          </table>
        </section>

        <section className="mb-16">
          <h2 className="text-2xl font-heading font-black uppercase italic text-white mb-6">Finish and Build Gallery</h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <figure className="glass-card p-4">
              <Image src="/og-image.jpg" alt="Custom engraved Chevy emblem close-up in polished finish." width={1200} height={630} className="w-full h-auto rounded-xl" />
              <figcaption className="text-white/60 text-sm mt-3">Polished engraved finish for classic chrome builds.</figcaption>
            </figure>
            <figure className="glass-card p-4">
              <Image src="/images/products/candy_red_gmc.png" alt="Deep engraved emblem with dark contrast and premium detail." width={900} height={900} className="w-full h-auto rounded-xl" />
              <figcaption className="text-white/60 text-sm mt-3">High-contrast engraving for blackout setups.</figcaption>
            </figure>
            <figure className="glass-card p-4">
              <Image src="/images/products/san_judas.png" alt="Hand-engraved Chevy emblem showing dimensional texture and reflective cuts." width={900} height={900} className="w-full h-auto rounded-xl" />
              <figcaption className="text-white/60 text-sm mt-3">Deep-cut texture built for long-term durability.</figcaption>
            </figure>
          </div>
        </section>

        <section className="mb-16">
          <h2 className="text-2xl font-heading font-black uppercase italic text-white mb-6">Install and Fitment Videos</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="aspect-video glass-card overflow-hidden">
              <iframe
                title="Chevy emblem installation walkthrough"
                src="https://www.youtube.com/embed/mSvnuOvIbx0"
                className="w-full h-full"
                loading="lazy"
                allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
                referrerPolicy="strict-origin-when-cross-origin"
                allowFullScreen
              />
            </div>
            <div className="aspect-video glass-card overflow-hidden">
              <iframe
                title="How to remove and replace emblems without paint damage"
                src="https://www.youtube.com/embed/QuDKAdsv3Pg"
                className="w-full h-full"
                loading="lazy"
                allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
                referrerPolicy="strict-origin-when-cross-origin"
                allowFullScreen
              />
            </div>
          </div>
        </section>

        <section className="glass-card p-8">
          <h2 className="text-2xl font-heading font-black uppercase italic text-white mb-4">Next Steps</h2>
          <p className="text-white/70 mb-6">
            Ready to upgrade? Start with fitment confirmation, then select your finish and install path.
          </p>
          <div className="flex flex-wrap gap-4">
            <Link href="/products?make=Chevrolet" className="btn-primary">Shop Chevy Emblems</Link>
            <Link href="/fitment" className="btn-secondary">Open Fitment Guide</Link>
          </div>
        </section>
      </div>
    </div>
  );
}
