import type { Metadata } from 'next';
import Link from 'next/link';
import Image from 'next/image';
import { getProducts } from '@/lib/data';
import { buildPageMetadata } from '@/lib/seo/metadata';

type LandingProduct = {
  slug: string;
  name: string;
};

export const metadata: Metadata = buildPageMetadata({
  title: 'Corvette Emblem Fitment and Upgrade Guide',
  description:
    'Corvette emblem fitment by generation with install tips, finish recommendations, media examples, and buyer FAQs.',
  path: '/corvette-emblem',
  keywords: ['corvette emblem', 'custom corvette badge', 'c8 corvette emblem'],
});

export default async function CorvetteEmblemPage() {
  const products = (await getProducts()) as LandingProduct[];
  const related = products.filter((p) => p.name.toLowerCase().includes('chevy')).slice(0, 6);

  const faqSchema = {
    '@context': 'https://schema.org',
    '@type': 'FAQPage',
    mainEntity: [
      {
        '@type': 'Question',
        name: 'Do Corvette emblems vary by generation?',
        acceptedAnswer: {
          '@type': 'Answer',
          text: 'Yes. C6, C7, and C8 platforms have different emblem dimensions and mounting characteristics.',
        },
      },
      {
        '@type': 'Question',
        name: 'Can I upgrade only one Corvette emblem location?',
        acceptedAnswer: {
          '@type': 'Answer',
          text: 'Yes, but matched sets often produce a cleaner premium look across front and rear body points.',
        },
      },
      {
        '@type': 'Question',
        name: 'What finish is best for a modern Corvette build?',
        acceptedAnswer: {
          '@type': 'Answer',
          text: 'Most owners choose high-contrast black chrome or polished engraved options based on paint color and wheel finish.',
        },
      },
    ],
  };

  const itemListSchema = {
    '@context': 'https://schema.org',
    '@type': 'ItemList',
    name: 'Emblem Upgrade Collection',
    itemListElement: related.map((product, index: number) => ({
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
            Corvette Emblem Fitment and Upgrade Path
          </h1>
          <section id="answer" aria-label="Quick Answer" className="glass-card p-8 border border-brand-gold/20">
            <p className="text-white/80 text-lg leading-relaxed">
              <strong className="text-brand-gold">Quick Answer:</strong> Corvette emblem upgrades must match generation-specific
              dimensions and panel curvature. Verify C6/C7/C8 fitment first, then select a finish that complements your trim
              and wheel package for a clean OEM-plus result.
            </p>
          </section>
        </header>

        <section className="mb-16 overflow-x-auto">
          <h2 className="text-2xl font-heading font-black uppercase italic text-white mb-6">Corvette Fitment Table</h2>
          <table className="w-full text-left border-collapse text-white/80 min-w-[780px]">
            <thead>
              <tr className="border-b border-white/15">
                <th className="py-3 pr-4">Generation</th>
                <th className="py-3 pr-4">Years</th>
                <th className="py-3 pr-4">Typical Emblem Location</th>
                <th className="py-3 pr-4">Fitment Note</th>
              </tr>
            </thead>
            <tbody>
              <tr className="border-b border-white/10">
                <td className="py-3 pr-4">C6</td>
                <td className="py-3 pr-4">2005-2013</td>
                <td className="py-3 pr-4">Front nose + rear deck</td>
                <td className="py-3 pr-4">Curvature differs from truck platforms</td>
              </tr>
              <tr className="border-b border-white/10">
                <td className="py-3 pr-4">C7</td>
                <td className="py-3 pr-4">2014-2019</td>
                <td className="py-3 pr-4">Front emblem + rear badge zones</td>
                <td className="py-3 pr-4">Alignment critical for bodyline symmetry</td>
              </tr>
              <tr>
                <td className="py-3 pr-4">C8</td>
                <td className="py-3 pr-4">2020+</td>
                <td className="py-3 pr-4">Front fascia + rear deck + wheel details</td>
                <td className="py-3 pr-4">Performance trims favor high-contrast finishes</td>
              </tr>
            </tbody>
          </table>
        </section>

        <section className="mb-16">
          <h2 className="text-2xl font-heading font-black uppercase italic text-white mb-6">Corvette Emblem Finish Examples</h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <figure className="glass-card p-4">
              <Image src="/og-image.jpg" alt="Premium engraved emblem sample with polished highlights for Corvette-style builds." width={1200} height={630} className="w-full h-auto rounded-xl" />
              <figcaption className="text-white/60 text-sm mt-3">Polished engraving profile for clean performance styling.</figcaption>
            </figure>
            <figure className="glass-card p-4">
              <Image src="/images/products/cluster_gauge.png" alt="Dark contrast emblem finish suitable for blacked-out Corvette builds." width={900} height={900} className="w-full h-auto rounded-xl" />
              <figcaption className="text-white/60 text-sm mt-3">Dark contrast for stealth-oriented builds.</figcaption>
            </figure>
            <figure className="glass-card p-4">
              <Image src="/images/products/candy_red_gmc.png" alt="High-contrast red and metallic emblem finish concept." width={900} height={900} className="w-full h-auto rounded-xl" />
              <figcaption className="text-white/60 text-sm mt-3">Color-accented finish direction for statement builds.</figcaption>
            </figure>
          </div>
        </section>

        <section className="mb-16">
          <h2 className="text-2xl font-heading font-black uppercase italic text-white mb-6">Install and Fitment Videos</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="aspect-video glass-card overflow-hidden">
              <iframe
                title="Corvette emblem fitment walkthrough"
                src="https://www.youtube.com/embed/QuDKAdsv3Pg"
                className="w-full h-full"
                loading="lazy"
                allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
                referrerPolicy="strict-origin-when-cross-origin"
                allowFullScreen
              />
            </div>
            <div className="aspect-video glass-card overflow-hidden">
              <iframe
                title="Corvette emblem styling and placement"
                src="https://www.youtube.com/embed/mSvnuOvIbx0"
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
          <h2 className="text-2xl font-heading font-black uppercase italic text-white mb-4">Get Started</h2>
          <p className="text-white/70 mb-6">
            Compare fitment, choose a finish, and move into install planning with confidence.
          </p>
          <div className="flex flex-wrap gap-4">
            <Link href="/products" className="btn-primary">Browse Inventory</Link>
            <Link href="/gallery" className="btn-secondary">See Build Showcase</Link>
          </div>
        </section>
      </div>
    </div>
  );
}
