import type { Metadata } from 'next';
import Link from 'next/link';
import Image from 'next/image';
import { getProducts } from '@/lib/data';
import { buildPageMetadata } from '@/lib/seo/metadata';
import RelatedGuideLinks from '@/components/RelatedGuideLinks';
import HubProductPicks from '@/components/HubProductPicks';

type VehicleFitment = { make?: string };
type LandingProduct = {
  slug: string;
  name: string;
  categories?: string[];
  vehicle_fitment?: VehicleFitment[];
};

export const metadata: Metadata = buildPageMetadata({
  title: 'Chevy Emblem Guide — Chevrolet Symbol & Badge Fitment',
  description:
    'Chevy emblem, chevy symbol, and chevrolet emblem fitment by year and platform. Chevrolet emblems, chevy grille emblems, custom chevy symbol sizes, and engraved upgrade paths.',
  path: '/chevy-emblem',
  keywords: [
    'chevy emblem',
    'chevrolet emblem',
    'chevy symbol',
    'chevrolet emblems',
    'chevy grille emblems',
    'custom chevy symbol',
    'chevrolet badges',
    'camo chevy emblem',
    'engraved chevy emblem',
    'chevy silverado emblems',
  ],
});

const emblemFaqs = [
  {
    question: 'What is the difference between a Chevy symbol and a Chevrolet emblem?',
    answer:
      'The Chevy symbol (bowtie) is the iconic front-grille badge shape, while a Chevrolet emblem can refer to any branded badge on the grille, tailgate, fenders, or steering wheel. Sizes and mount styles differ by year and trim — always measure before ordering a replacement.',
  },
  {
    question: 'How do I choose the correct Chevy emblem size?',
    answer:
      'Match your model year, trim, and emblem mounting style first. Then verify width, height, and clip or adhesive layout before ordering.',
  },
  {
    question: 'Are engraved Chevy emblems better than vinyl overlays?',
    answer:
      'Yes. Engraved Chevy emblems are permanently etched into the material, so they will not peel, fade, or bubble like vinyl overlays. They provide deeper texture and hold up to car washes and road debris.',
  },
  {
    question: 'Can I get a personalized Chevy emblem?',
    answer:
      'Engraving Nation offers custom finishes and hand-etched designs on OEM-style Chevy emblem replacements. Contact us for bespoke personalization on supported platforms.',
  },
  {
    question: 'What is an engraved chevy emblem?',
    answer:
      'An engraved chevy emblem has design detail physically etched into the badge material — not printed or stuck on. The texture is permanent and holds up to washes, heat, and road debris better than vinyl overlays.',
  },
  {
    question: 'Is a custom chevy logo the same as a custom chevy emblem?',
    answer:
      'In search terms, custom chevy logo often means the bowtie or front badge; custom chevy emblem can include tailgate and fender badges too. Measure your exact position before ordering — logos and emblems are not always interchangeable sizes.',
  },
  {
    question: 'What are chevy badges vs chevy silverado emblems?',
    answer:
      'Chevy badges is a broad term for any branded truck badge (Z71, tailgate scripts, bowties). Chevy silverado emblems usually means the center bowtie or tailgate badge on a Silverado. Use our fitment database to match generation and mount type.',
  },
  {
    question: 'Can I install a Chevy emblem myself?',
    answer:
      'Yes. Most installs are DIY-friendly with trim tools, heat for adhesive-backed badges, and careful alignment before final pressure.',
  },
  {
    question: 'What is a chevy emblem vs a chevy symbol?',
    answer:
      'Chevy emblem is the broad category for any Chevrolet badge on the vehicle. Chevy symbol usually means the bowtie shape on the grille. Fitment rules are the same — match position, year, and mount type before ordering.',
  },
  {
    question: 'What size chevy grille emblems fit my Silverado?',
    answer:
      'Grille bowtie width varies by generation from roughly 9.5 to 11.5 inches. T1XX (2019+) trim level changes the grille shell — measure your factory badge and use our fitment database before buying chevy grille emblems.',
  },
  {
    question: 'Can I get a custom chevy symbol with engraved detail?',
    answer:
      'Yes. Custom chevy symbol upgrades typically replace the factory bowtie or tailgate badge with a hand-etched equivalent. Confirm OEM clip or adhesive mount compatibility on your platform first.',
  },
];

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
    mainEntity: emblemFaqs.map((faq) => ({
      '@type': 'Question',
      name: faq.question,
      acceptedAnswer: { '@type': 'Answer', text: faq.answer },
    })),
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
            Chevy Emblem Fitment &amp; Style Guide
          </h1>
          <section id="answer" aria-label="Quick Answer" className="glass-card p-8 border border-brand-gold/20">
            <p className="text-white/80 text-lg leading-relaxed">
              <strong className="text-brand-gold">Quick Answer:</strong> A{' '}
              <strong className="text-white">chevy emblem</strong> (or{' '}
              <strong className="text-white">chevrolet emblem</strong>) must match your exact year, trim, and mounting
              type — grille bowtie, tailgate badge, or fender script. The{' '}
              <strong className="text-white">chevy symbol</strong> on your grille is the most visible badge, but{' '}
              <strong className="text-white">chevrolet emblems</strong> on tailgates and doors use different sizes.
              Measure first, then choose an engraved finish.
            </p>
          </section>
        </header>

        <section id="chevy-emblem-overview" className="mb-16 glass-card p-8">
          <h2 className="text-2xl font-heading font-black uppercase italic text-white mb-4">
            Chevy Emblem — Types, Sizes &amp; Upgrade Paths
          </h2>
          <p className="text-white/70 leading-relaxed mb-4">
            The head term <strong className="text-white">chevy emblem</strong> covers every branded badge Chevrolet
            mounts on a truck — not just the front bowtie. Owners searching at volume usually want one of three outcomes:
            confirm OEM size before replacement, compare engraved vs overlay upgrades, or shop custom finishes. This hub
            is the live fitment reference; for a full purchase walkthrough see our{' '}
            <Link href="/articles/chevy-emblem-buying-guide" className="text-brand-gold hover:underline">
              Chevy emblem buyer&apos;s guide
            </Link>.
          </p>
          <ul className="list-disc pl-6 text-white/60 space-y-2">
            <li>Grille bowties and <strong className="text-white/80">chevy grille emblems</strong> — clip or stud mount</li>
            <li>Tailgate center badges — often adhesive, narrower than front</li>
            <li>Trim scripts (Z71, High Country) — auxiliary chevrolet badges</li>
          </ul>
        </section>

        <section id="chevy-symbol-vs-emblem" className="mb-16 glass-card p-8">
          <h2 className="text-2xl font-heading font-black uppercase italic text-white mb-4">
            Chevy Symbol vs Chevrolet Emblem — What Is the Difference?
          </h2>
          <p className="text-white/70 leading-relaxed mb-4">
            Google groups <strong className="text-white">chevy symbol</strong>,{' '}
            <strong className="text-white">chevrolet emblem</strong>, and{' '}
            <strong className="text-white">chevrolet emblems</strong> with{' '}
            <strong className="text-white">chevy emblem</strong> — but fitment is position-specific. The bowtie on your
            grille is the most visible Chevrolet symbol; tailgate and fender badges are emblems with different dimensions
            and clip layouts. A <strong className="text-white">custom chevy symbol</strong> request usually means a
            bowtie upgrade; confirm front vs rear before checkout.
          </p>
          <p className="text-white/60 leading-relaxed">
            Deep dive:{' '}
            <Link href="/articles/chevrolet-emblem-style-fitment-guide" className="text-brand-gold hover:underline">
              Chevrolet emblem style guide
            </Link>
            . Bowtie sizing:{' '}
            <Link href="/chevy-bowtie" className="text-brand-gold hover:underline">Chevy bowtie fitment guide</Link>.
            Silverado tables:{' '}
            <Link href="/fitment" className="text-brand-gold hover:underline">Silverado emblem size database</Link>.
          </p>
        </section>

        <section id="chevy-grille-emblems" className="mb-16 glass-card p-8">
          <h2 className="text-2xl font-heading font-black uppercase italic text-white mb-4">
            Chevy Grille Emblems — Measure Before You Order
          </h2>
          <p className="text-white/70 leading-relaxed mb-4">
            <strong className="text-white">Chevy grille emblems</strong> take the most road debris and clip stress during
            removal. T1XX Silverados have multiple grille shells — RST, Trail Boss, and High Country use different center
            openings. Never assume one grille emblem SKU fits all 2019+ trucks.
          </p>
          <p className="text-white/60 leading-relaxed">
            Install walkthrough:{' '}
            <Link href="/articles/chevrolet-grille-emblem-size-install-guide" className="text-brand-gold hover:underline">
              Chevrolet grille emblem install guide
            </Link>.
          </p>
        </section>

        <section id="chevrolet-badges" className="mb-16 glass-card p-8">
          <h2 className="text-2xl font-heading font-black uppercase italic text-white mb-4">
            Chevrolet Badges &amp; Trim Scripts
          </h2>
          <p className="text-white/70 leading-relaxed">
            <strong className="text-white">Chevrolet badges</strong> on doors and fenders (LTZ, Z71, High Country) use
            different footprints than center bowties. When comparing listings, confirm whether the seller means auxiliary
            trim badges or the main <strong className="text-white">chevy silverado logo</strong> on the tailgate.
          </p>
        </section>

        <section id="personalized-engraved-emblems" className="mb-16 glass-card p-8">
          <h2 className="text-2xl font-heading font-black uppercase italic text-white mb-4">
            Personalized Chevy Emblem &amp; Engraved Chevy Emblem Upgrades
          </h2>
          <p className="text-white/70 leading-relaxed mb-4">
            A <strong className="text-white">personalized chevy emblem</strong> adds custom pattern, finish, or contrast
            to an OEM-style replacement badge while keeping factory clip geometry. An{' '}
            <strong className="text-white">engraved chevy emblem</strong> goes further — detail is cut into the material
            so it cannot peel like vinyl. Both require the same fitment first step: match year, trim, and mount position.
          </p>
          <p className="text-white/60 leading-relaxed">
            Compare durability:{' '}
            <Link href="/articles/engraving-vs-vinyl-overlays-durability-comparison" className="text-brand-gold hover:underline">
              engraving vs vinyl overlays
            </Link>
            . Ready to buy after sizing?{' '}
            <Link href="/products?make=Chevrolet" className="text-brand-gold hover:underline">Shop custom Chevy emblems</Link>.
          </p>
        </section>

        <section id="custom-chevy-logos" className="mb-16 glass-card p-8">
          <h2 className="text-2xl font-heading font-black uppercase italic text-white mb-4">
            Custom Chevy Logo &amp; Custom Chevy Logos — Sizing Notes
          </h2>
          <p className="text-white/70 leading-relaxed mb-4">
            Searchers use <strong className="text-white">custom chevy logo</strong> and{' '}
            <strong className="text-white">custom chevy logos</strong> when they mean the front bowtie or a matched
            front-and-rear set. Logos on the grille are not the same width as tailgate badges on most Silverado generations.
            For bowtie-only dimensions, use the{' '}
            <Link href="/chevy-bowtie" className="text-brand-gold hover:underline">engraved chevy bowtie guide</Link>.
          </p>
        </section>

        <section id="chevy-badges-silverado" className="mb-16 glass-card p-8">
          <h2 className="text-2xl font-heading font-black uppercase italic text-white mb-4">
            Chevy Badges &amp; Chevy Silverado Emblems
          </h2>
          <p className="text-white/70 leading-relaxed mb-4">
            <strong className="text-white">Chevy badges</strong> includes auxiliary trim badges (Z71, ZR2, fender scripts)
            and center emblems. <strong className="text-white">Chevy silverado emblems</strong> typically refers to the
            grille bowtie or tailgate center badge on Silverado platforms. Start with generation fitment, then choose
            engraved finish.
          </p>
          <p className="text-white/60 leading-relaxed">
            Dimension tables:{' '}
            <Link href="/fitment" className="text-brand-gold hover:underline">Silverado badges size database</Link>.
          </p>
        </section>

        <section id="color-finish-emblems" className="mb-16 glass-card p-8">
          <h2 className="text-2xl font-heading font-black uppercase italic text-white mb-4">
            White Chevy Emblem, Purple Chevy Symbol &amp; Custom Finishes
          </h2>
          <p className="text-white/70 leading-relaxed mb-4">
            Color-specific searches like <strong className="text-white">white chevy emblem</strong>,{' '}
            <strong className="text-white">purple chevy symbol</strong>, and{' '}
            <strong className="text-white">camo chevy emblem</strong> describe finish intent — not a different mount
            type. Fitment still comes first; finish selection comes second. Engraved bases expose metal texture that
            reads differently under paint, anodize, or Cerakote-style coatings.
          </p>
          <p className="text-white/60 leading-relaxed">
            Read our{' '}
            <Link href="/articles/black-chevy-emblem-finish-guide" className="text-brand-gold hover:underline">
              black Chevy emblem finish guide
            </Link>{' '}
            for blackout, white, purple, and camo build paths.
          </p>
        </section>

        <section id="grille-vs-tailgate" className="mb-16 glass-card p-8">
          <h2 className="text-2xl font-heading font-black uppercase italic text-white mb-4">
            Chevy Grille Emblems vs Tailgate Badges
          </h2>
          <p className="text-white/70 leading-relaxed mb-4">
            <strong className="text-white">Chevy grille emblems</strong> and tailgate badges use different widths and
            retention systems on most Silverado generations. A <strong className="text-white">chevy silverado logo</strong>{' '}
            on the tailgate is often adhesive-backed and narrower than the front bowtie. Never assume front and rear
            share one SKU.
          </p>
          <p className="text-white/60 leading-relaxed">
            Install steps and grille-specific sizing:{' '}
            <Link href="/articles/chevrolet-grille-emblem-size-install-guide" className="text-brand-gold hover:underline">
              Chevrolet grille emblem install guide
            </Link>.
          </p>
        </section>

        <HubProductPicks hub="chevy-emblem" title="Shop Chevy Emblem SKUs by Search Term" />

        <RelatedGuideLinks
          guides={[
            {
              href: '/articles/chevy-emblem-buying-guide',
              title: 'Chevy Emblem Buyer\'s Guide (2026)',
              description: 'Pillar guide for chevy emblem shoppers — types, fitment, and engraved upgrades.',
            },
            {
              href: '/articles/chevrolet-emblem-style-fitment-guide',
              title: 'Chevrolet Emblem Style & Fitment Guide',
              description: 'Chevy symbol vs Chevrolet emblem — positions, styles, and engraved upgrade paths.',
            },
            {
              href: '/articles/silverado-emblem-buying-guide-2026',
              title: 'Silverado Emblem Buying Guide (2026)',
              description: 'Generation fitment and trim traps before you order silverado emblems.',
            },
            {
              href: '/articles/black-chevy-emblem-finish-guide',
              title: 'Black Chevy Emblem Finish Guide',
              description: 'Blackout, white, purple, and camo finish options for custom badges.',
            },
            {
              href: '/articles/chevrolet-grille-emblem-size-install-guide',
              title: 'Grille Emblem Size & Install Guide',
              description: 'Measure and replace chevy grille emblems without breaking clips.',
            },
          ]}
        />

        <section id="faq" className="mb-16 space-y-4">
          <h2 className="text-2xl font-heading font-black uppercase italic text-white mb-6">Chevy Emblem FAQs</h2>
          {emblemFaqs.map((faq) => (
            <details key={faq.question} className="glass-card p-6 group">
              <summary className="cursor-pointer text-white font-bold group-open:text-brand-gold">{faq.question}</summary>
              <p className="mt-4 text-white/60 leading-relaxed">{faq.answer}</p>
            </details>
          ))}
        </section>

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
            <Link href="/products?make=Chevrolet" className="btn-primary">Shop Custom Chevy Emblems</Link>
            <Link href="/chevy-bowtie" className="btn-secondary">Chevy Bowtie Size Guide</Link>
            <Link href="/fitment" className="btn-secondary">Silverado Emblem Sizes</Link>
          </div>
        </section>
      </div>
    </div>
  );
}
