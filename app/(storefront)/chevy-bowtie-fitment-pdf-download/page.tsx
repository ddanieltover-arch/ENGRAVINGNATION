import type { Metadata } from 'next';
import Link from 'next/link';

export const metadata: Metadata = {
  title: 'Chevy Bowtie Size and Fitment PDF Download',
  description:
    'Download the Chevy Bowtie Size and Fitment reference sheet. Includes measurement checklist, model-year fitment pointers, and install prep steps.',
  alternates: {
    canonical: 'https://engravingnation.store/chevy-bowtie-fitment-pdf-download',
  },
  openGraph: {
    title: 'Chevy Bowtie Size and Fitment PDF Download',
    description:
      'Printable fitment sheet with measurement checklist and install prep workflow for Chevrolet bowtie upgrades.',
    url: 'https://engravingnation.store/chevy-bowtie-fitment-pdf-download',
    images: [
      {
        url: 'https://engravingnation.store/images/seo/chevy-bowtie-fitment-og.svg',
        width: 1200,
        height: 630,
        alt: 'Chevy Bowtie Size and Fitment PDF share image.',
      },
    ],
    type: 'website',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Chevy Bowtie Size and Fitment PDF Download',
    description: 'Download the printable Chevy bowtie fitment reference guide.',
    images: ['https://engravingnation.store/images/seo/chevy-bowtie-fitment-og.svg'],
  },
};

export default function ChevyBowtiePdfDownloadPage() {
  const faqSchema = {
    '@context': 'https://schema.org',
    '@type': 'FAQPage',
    mainEntity: [
      {
        '@type': 'Question',
        name: 'What is included in the Chevy bowtie fitment PDF?',
        acceptedAnswer: {
          '@type': 'Answer',
          text: 'The guide includes fitment verification steps, measurement checklist, and install prep workflow for common Chevrolet platforms.',
        },
      },
      {
        '@type': 'Question',
        name: 'Is this PDF useful before buying an emblem?',
        acceptedAnswer: {
          '@type': 'Answer',
          text: 'Yes. It helps you verify year and mount style before ordering, reducing fitment mistakes and returns.',
        },
      },
    ],
  };

  const itemListSchema = {
    '@context': 'https://schema.org',
    '@type': 'ItemList',
    name: 'Chevy Fitment Resources',
    itemListElement: [
      { '@type': 'ListItem', position: 1, url: 'https://engravingnation.store/chevy-emblem', name: 'Chevy Emblem Guide' },
      { '@type': 'ListItem', position: 2, url: 'https://engravingnation.store/chevy-bowtie', name: 'Chevy Bowtie Guide' },
      { '@type': 'ListItem', position: 3, url: 'https://engravingnation.store/corvette-emblem', name: 'Corvette Emblem Guide' },
    ],
  };

  return (
    <div className="pt-32 pb-24 bg-brand-bg min-h-screen">
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(faqSchema) }} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(itemListSchema) }} />
      <div className="container mx-auto px-4 max-w-4xl">
        <h1 className="text-4xl md:text-6xl font-heading font-black uppercase italic text-white mb-6">
          Chevy Bowtie Size and Fitment PDF
        </h1>
        <section className="glass-card p-8 border border-brand-gold/20 mb-8">
          <p className="text-white/80 text-lg leading-relaxed">
            <strong className="text-brand-gold">Quick Answer:</strong> Download this printable fitment sheet to verify bowtie
            dimensions, mounting style, and install prep before purchasing or replacing your Chevrolet emblem.
          </p>
        </section>

        <section className="glass-card p-8 mb-8">
          <h2 className="text-2xl font-heading font-black uppercase italic text-white mb-4">Download</h2>
          <p className="text-white/70 mb-5">
            Use this resource during inspection so you can confirm generation, mount method, and measurement points in one pass.
          </p>
          <a href="/downloads/chevy-bowtie-fitment-guide.pdf" className="btn-primary inline-flex">
            Download Chevy Bowtie Fitment PDF
          </a>
          <p className="text-white/50 text-sm mt-4">
            This file is maintained as a live downloadable asset and can be used during fitment checks in the garage.
          </p>
        </section>

        <section className="glass-card p-8 mb-8">
          <h2 className="text-2xl font-heading font-black uppercase italic text-white mb-4">How to Use It</h2>
          <ol className="list-decimal ml-6 text-white/70 space-y-2">
            <li>Identify exact model year and trim.</li>
            <li>Measure current emblem width, height, and mounting spacing.</li>
            <li>Match your mount style (clip, stud, or adhesive).</li>
            <li>Use the linked guide pages for install and finish planning.</li>
          </ol>
        </section>

        <section className="glass-card p-8">
          <h2 className="text-2xl font-heading font-black uppercase italic text-white mb-4">Related Guides</h2>
          <div className="flex flex-wrap gap-4">
            <Link href="/chevy-emblem" className="btn-secondary">Chevy Emblem Guide</Link>
            <Link href="/chevy-bowtie" className="btn-secondary">Chevy Bowtie Guide</Link>
            <Link href="/corvette-emblem" className="btn-secondary">Corvette Emblem Guide</Link>
          </div>
        </section>
      </div>
    </div>
  );
}
