import type { Metadata } from 'next';
import Link from 'next/link';
import Image from 'next/image';
import { getProducts } from '@/lib/data';
import { buildPageMetadata } from '@/lib/seo/metadata';
import RelatedGuideLinks from '@/components/RelatedGuideLinks';

type LandingProduct = {
  slug: string;
  name: string;
};

export const metadata: Metadata = buildPageMetadata({
  title: 'Engraved Chevy Bowtie Size & Fitment Guide',
  description:
    'Engraved chevy bowtie and bowtie fitment by platform. Match engraved bowtie chevy sizes, custom chevrolet bowtie emblems, and chevy bowtie emblems for sale.',
  path: '/chevy-bowtie',
  keywords: [
    'engraved chevy bowtie',
    'engraved bowtie chevy',
    'chevy bowtie',
    'custom chevrolet bowtie emblem',
    'chevy bowtie emblems for sale',
    'engraved chevy logo',
    'custom chevy bowtie',
  ],
});

const bowtieFaqs = [
  {
    question: 'What is an engraved chevy bowtie?',
    answer:
      'An engraved chevy bowtie is a Chevrolet grille badge with design detail cut directly into the material rather than applied as vinyl or paint. The result is permanent texture that survives washes, UV exposure, and road debris.',
  },
  {
    question: 'Is an engraved bowtie chevy the same as a custom chevrolet bowtie emblem?',
    answer:
      'Yes — these terms describe the same upgrade category: a replacement bowtie with custom etched detail. Fitment still depends on your generation, trim, and front vs rear position.',
  },
  {
    question: 'Are all Chevy bowties the same size?',
    answer: 'No. Chevy bowtie dimensions and mounting points vary by generation, trim, and emblem position.',
  },
  {
    question: 'Can I replace only the front bowtie?',
    answer: 'Yes, but many owners install a matched front and rear set for visual consistency across the build.',
  },
  {
    question: 'How do I avoid damaging grille clips?',
    answer: 'Use plastic trim tools, work in warm conditions, and access retention tabs from behind the grille when possible.',
  },
  {
    question: 'Is an engraved chevy logo the same as an engraved chevy bowtie?',
    answer:
      'Yes for most truck searches — engraved chevy logo refers to the front bowtie grille badge. Rear tailgate logos use different widths and adhesive mounts. Measure front and rear separately.',
  },
  {
    question: 'Where can I find chevy bowtie emblems for sale with verified fitment?',
    answer:
      'After confirming platform and size on this guide, shop the Chevrolet collection for hand-etched bowtie replacements with fitment notes on each product page.',
  },
];

export default async function ChevyBowtiePage() {
  const products = (await getProducts()) as LandingProduct[];
  const featured = products
    .filter((p) => p.name.toLowerCase().includes('chevy') || p.name.toLowerCase().includes('bowtie'))
    .slice(0, 6);

  const faqSchema = {
    '@context': 'https://schema.org',
    '@type': 'FAQPage',
    mainEntity: bowtieFaqs.map((faq) => ({
      '@type': 'Question',
      name: faq.question,
      acceptedAnswer: { '@type': 'Answer', text: faq.answer },
    })),
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
              <strong className="text-brand-gold">Quick Answer:</strong> An{' '}
              <strong className="text-white">engraved chevy bowtie</strong> replaces your factory grille badge with
              permanently etched detail. Match platform (GMT800–T1XX), measure front and rear dimensions separately, and
              confirm clip vs adhesive mount before ordering a custom chevrolet bowtie emblem or engraved bowtie chevy
              upgrade.
            </p>
          </section>
        </header>

        <section id="bowtie-terms" className="mb-16 glass-card p-8">
          <h2 className="text-2xl font-heading font-black uppercase italic text-white mb-4">
            Engraved Chevy Bowtie — Common Search Terms
          </h2>
          <dl className="space-y-4 text-white/70">
            <div>
              <dt className="font-bold text-white">Engraved chevy bowtie</dt>
              <dd className="mt-1">Front-grille bowtie with hand-etched pattern cut into the badge face.</dd>
            </div>
            <div>
              <dt className="font-bold text-white">Engraved bowtie chevy</dt>
              <dd className="mt-1">Same product category — word order varies by search intent, not fitment.</dd>
            </div>
            <div>
              <dt className="font-bold text-white">Engraved chevy logo</dt>
              <dd className="mt-1">Often refers to the bowtie grille emblem; verify position before ordering.</dd>
            </div>
            <div>
              <dt className="font-bold text-white">Chevy bowtie emblems for sale</dt>
              <dd className="mt-1">
                Browse our{' '}
                <Link href="/products?make=Chevrolet" className="text-brand-gold hover:underline">custom Chevy emblem collection</Link>{' '}
                or read the{' '}
                <Link href="/chevy-emblem" className="text-brand-gold hover:underline">Chevy emblem fitment guide</Link>{' '}
                for non-bowtie badges.
              </dd>
            </div>
          </dl>
        </section>

        <section id="engraved-chevy-logo" className="mb-16 glass-card p-8">
          <h2 className="text-2xl font-heading font-black uppercase italic text-white mb-4">
            Engraved Chevy Logo — Front Bowtie Fitment
          </h2>
          <p className="text-white/70 leading-relaxed mb-4">
            An <strong className="text-white">engraved chevy logo</strong> on trucks almost always means the grille
            bowtie — the same part category as an <strong className="text-white">engraved chevy bowtie</strong> or{' '}
            <strong className="text-white">engraved bowtie chevy</strong> upgrade. Word order in search does not change
            fitment; generation, trim, and clip layout do.
          </p>
          <p className="text-white/60 leading-relaxed">
            Non-bowtie emblems (tailgate, fender):{' '}
            <Link href="/chevy-emblem" className="text-brand-gold hover:underline">Chevy emblem fitment hub</Link>.
          </p>
        </section>

        <section id="custom-chevrolet-bowtie" className="mb-16 glass-card p-8">
          <h2 className="text-2xl font-heading font-black uppercase italic text-white mb-4">
            Custom Chevrolet Bowtie Emblem — Order Checklist
          </h2>
          <p className="text-white/70 leading-relaxed">
            Before ordering a <strong className="text-white">custom chevrolet bowtie emblem</strong>, confirm platform
            (GMT800–T1XX), measure factory badge width and height, and note clip vs adhesive retention. Custom etching
            replaces the face of the badge — it is not a universal adapter.
          </p>
        </section>

        <section id="bowtie-for-sale" className="mb-16 glass-card p-8">
          <h2 className="text-2xl font-heading font-black uppercase italic text-white mb-4">
            Chevy Bowtie Emblems for Sale
          </h2>
          <p className="text-white/70 leading-relaxed mb-6">
            Once fitment is confirmed, browse hand-etched{' '}
            <strong className="text-white">chevy bowtie emblems for sale</strong> in our Chevrolet shop collection.
            Each listing includes platform notes — do not skip measurement even when year range matches.
          </p>
          <Link href="/products?make=Chevrolet" className="btn-primary inline-block font-black italic">
            Shop Engraved Chevy Bowties
          </Link>
        </section>

        <section id="custom-bowtie-emblems" className="mb-16 glass-card p-8">
          <h2 className="text-2xl font-heading font-black uppercase italic text-white mb-4">
            Custom Chevy Bowtie Emblems &amp; Chevy Custom Bowtie Options
          </h2>
          <p className="text-white/70 leading-relaxed mb-4">
            <strong className="text-white">Custom chevy bowtie emblems</strong> and{' '}
            <strong className="text-white">chevy custom bowtie</strong> upgrades keep factory clip geometry while adding
            hand-etched pattern depth. This is the right cluster if you want an{' '}
            <strong className="text-white">engraved chevy bowtie</strong> that survives daily washes — not a vinyl overlay
            on top of the factory badge.
          </p>
          <p className="text-white/60 leading-relaxed">
            Year-by-year reference:{' '}
            <Link href="/articles/chevy-bowtie-fitment-size-guide" className="text-brand-gold hover:underline">
              Chevy bowtie fitment &amp; size guide
            </Link>.
          </p>
        </section>

        <RelatedGuideLinks
          guides={[
            {
              href: '/articles/chevy-bowtie-fitment-size-guide',
              title: 'Chevy Bowtie Fitment & Size Guide',
              description: 'Platform widths, mount types, and engraved bowtie buying checklist.',
            },
            {
              href: '/articles/chevrolet-grille-emblem-size-install-guide',
              title: 'Grille Emblem Install Guide',
              description: 'Remove and install front chevy grille emblems safely.',
            },
            {
              href: '/fitment',
              title: 'Silverado Emblem Size Database',
              description: 'Generation tables for front and rear badge dimensions.',
            },
          ]}
        />

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

        <section id="faq" className="mb-16 space-y-4">
          <h2 className="text-2xl font-heading font-black uppercase italic text-white mb-6">Chevy Bowtie FAQs</h2>
          {bowtieFaqs.map((faq) => (
            <details key={faq.question} className="glass-card p-6 group">
              <summary className="cursor-pointer text-white font-bold group-open:text-brand-gold">{faq.question}</summary>
              <p className="mt-4 text-white/60 leading-relaxed">{faq.answer}</p>
            </details>
          ))}
        </section>

        <section className="glass-card p-8">
          <h2 className="text-2xl font-heading font-black uppercase italic text-white mb-4">Download and Next Step</h2>
          <p className="text-white/70 mb-6">Need a printable checklist? Use our download page and confirm fitment before ordering.</p>
          <div className="flex flex-wrap gap-4">
            <Link href="/chevy-bowtie-fitment-pdf-download" className="btn-primary">Open PDF Download Page</Link>
            <Link href="/products?make=Chevrolet" className="btn-secondary">Shop Engraved Chevy Bowties</Link>
            <Link href="/fitment" className="btn-secondary">Silverado Emblem Size Guide</Link>
          </div>
        </section>
      </div>
    </div>
  );
}
