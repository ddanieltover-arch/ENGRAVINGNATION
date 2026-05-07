import type { Metadata } from 'next';
import Link from 'next/link';
import Image from 'next/image';
import { getProducts } from '@/lib/data';

type LandingProduct = {
  slug: string;
  name: string;
};

export const metadata: Metadata = {
  title: 'Chevy Bowtie Size and Fitment Guide',
  description:
    'Use this Chevy bowtie guide to match size, year, and mounting style. Includes fitment table, install videos, and downloadable resources.',
  alternates: {
    canonical: 'https://engravingnation.store/chevy-bowtie',
  },
};

export default async function ChevyBowtiePage() {
  const products = (await getProducts()) as LandingProduct[];
  const featured = products
    .filter((p) => p.name.toLowerCase().includes('chevy') || p.name.toLowerCase().includes('bowtie'))
    .slice(0, 6);

  const faqSchema = {
    '@context': 'https://schema.org',
    '@type': 'FAQPage',
    mainEntity: [
      {
        '@type': 'Question',
        name: 'Are all Chevy bowties the same size?',
        acceptedAnswer: {
          '@type': 'Answer',
          text: 'No. Chevy bowtie dimensions and mounting points vary by generation, trim, and emblem position.',
        },
      },
      {
        '@type': 'Question',
        name: 'Can I replace only the front bowtie?',
        acceptedAnswer: {
          '@type': 'Answer',
          text: 'Yes, but many owners install a matched front and rear set for visual consistency across the build.',
        },
      },
      {
        '@type': 'Question',
        name: 'How do I avoid damaging grille clips?',
        acceptedAnswer: {
          '@type': 'Answer',
          text: 'Use plastic trim tools, work in warm conditions, and access retention tabs from behind the grille when possible.',
        },
      },
    ],
  };

  const itemListSchema = {
    '@context': 'https://schema.org',
    '@type': 'ItemList',
    name: 'Chevy Bowtie Products',
    itemListElement: featured.map((product, index: number) => ({
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
            Chevy Bowtie Size and Fitment
          </h1>
          <section id="answer" aria-label="Quick Answer" className="glass-card p-8 border border-brand-gold/20">
            <p className="text-white/80 text-lg leading-relaxed">
              <strong className="text-brand-gold">Quick Answer:</strong> Chevy bowtie replacement starts with correct
              measurements and platform matching. Verify generation-specific mount style (clip or adhesive), compare
              front and rear dimensions, and use a fitment table before ordering to avoid install errors.
            </p>
          </section>
        </header>

        <section className="mb-16 overflow-x-auto">
          <h2 className="text-2xl font-heading font-black uppercase italic text-white mb-6">Bowtie Fitment by Platform</h2>
          <table className="w-full text-left border-collapse text-white/80 min-w-[780px]">
            <thead>
              <tr className="border-b border-white/15">
                <th className="py-3 pr-4">Platform</th>
                <th className="py-3 pr-4">Typical Year Range</th>
                <th className="py-3 pr-4">Front Mount</th>
                <th className="py-3 pr-4">Rear Mount</th>
              </tr>
            </thead>
            <tbody>
              <tr className="border-b border-white/10">
                <td className="py-3 pr-4">GMT800</td>
                <td className="py-3 pr-4">1999-2006</td>
                <td className="py-3 pr-4">Stud/clip mix</td>
                <td className="py-3 pr-4">Adhesive</td>
              </tr>
              <tr className="border-b border-white/10">
                <td className="py-3 pr-4">GMT900</td>
                <td className="py-3 pr-4">2007-2013</td>
                <td className="py-3 pr-4">Clip-in</td>
                <td className="py-3 pr-4">Adhesive/clip</td>
              </tr>
              <tr className="border-b border-white/10">
                <td className="py-3 pr-4">K2XX</td>
                <td className="py-3 pr-4">2014-2018</td>
                <td className="py-3 pr-4">Clip + grille access tabs</td>
                <td className="py-3 pr-4">Adhesive</td>
              </tr>
              <tr>
                <td className="py-3 pr-4">T1XX</td>
                <td className="py-3 pr-4">2019+</td>
                <td className="py-3 pr-4">Trim-specific clip/adhesive</td>
                <td className="py-3 pr-4">Adhesive / stamped-tailgate options</td>
              </tr>
            </tbody>
          </table>
        </section>

        <section className="mb-16">
          <h2 className="text-2xl font-heading font-black uppercase italic text-white mb-6">Bowtie Style Gallery</h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <figure className="glass-card p-4">
              <Image src="/og-image.jpg" alt="Chevy bowtie emblem with deep engraved pattern and metallic highlights." width={1200} height={630} className="w-full h-auto rounded-xl" />
              <figcaption className="text-white/60 text-sm mt-3">Deep-etched bowtie texture for premium builds.</figcaption>
            </figure>
            <figure className="glass-card p-4">
              <Image src="/images/products/cluster_gauge.png" alt="Custom black Chevrolet bowtie emblem style for modern truck front grilles." width={900} height={900} className="w-full h-auto rounded-xl" />
              <figcaption className="text-white/60 text-sm mt-3">Blackout-friendly bowtie finish profile.</figcaption>
            </figure>
            <figure className="glass-card p-4">
              <Image src="/images/products/san_judas.png" alt="Hand-engraved Chevy emblem demonstrating high-contrast cuts and layered depth." width={900} height={900} className="w-full h-auto rounded-xl" />
              <figcaption className="text-white/60 text-sm mt-3">High-contrast detail for show-level appearance.</figcaption>
            </figure>
          </div>
        </section>

        <section className="mb-16">
          <h2 className="text-2xl font-heading font-black uppercase italic text-white mb-6">Fitment and Install Videos</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="aspect-video glass-card overflow-hidden">
              <iframe
                title="Chevy bowtie removal and install steps"
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
                title="Chevy bowtie fitment measurement tutorial"
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
          <h2 className="text-2xl font-heading font-black uppercase italic text-white mb-4">Download and Next Step</h2>
          <p className="text-white/70 mb-6">Need a printable checklist? Use our download page and confirm fitment before ordering.</p>
          <div className="flex flex-wrap gap-4">
            <Link href="/chevy-bowtie-fitment-pdf-download" className="btn-primary">Open PDF Download Page</Link>
            <Link href="/products?make=Chevrolet" className="btn-secondary">Shop Chevy Bowties</Link>
          </div>
        </section>
      </div>
    </div>
  );
}
