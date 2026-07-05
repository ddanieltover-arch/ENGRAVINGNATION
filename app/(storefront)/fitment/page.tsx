import type { Metadata } from 'next';
import Link from 'next/link';
import { Ruler, AlertTriangle, ArrowRight, Pickaxe, CheckCircle2 } from 'lucide-react';
import JsonLd from '@/components/JsonLd';
import AnswerCapsule from '@/components/AnswerCapsule';
import { breadcrumbJsonLd } from '@/lib/seo/json-ld';
import { buildPageMetadata } from '@/lib/seo/metadata';
import RelatedGuideLinks from '@/components/RelatedGuideLinks';
import HubProductPicks from '@/components/HubProductPicks';

export const metadata: Metadata = buildPageMetadata({
  title: 'Silverado Emblems & Badge Size Guide | Fitment Database',
  description:
    'Silverado emblems, silverado emblem sizes, and chevy silverado badges by generation. GMT800 through T1XX fitment database with measurement steps.',
  path: '/fitment',
  keywords: [
    'silverado emblems',
    'silverado emblem',
    'silverado badges',
    'silverado badge',
    'chevy silverado badges',
    'chevy silverado emblems',
  ],
});

export default function FitmentHubPage() {
  const generations = [
    {
      name: "T1XX Generation (2019 - Present)",
      models: "1500, 2500HD, 3500HD",
      front: 'Varies by trim (LT, RST, High Country). Most common: 10.5" x 3.8" (Snap-in clips)',
      rear: 'Standard Multi-Flex or Solid Tailgate: 10.0" x 3.6" (Adhesive)',
      note: "The T1XX has the most variation due to different grille designs (RST vs High Country). Always measure.",
    },
    {
      name: "K2XX Generation (2014 - 2018)",
      models: "1500 (2014-2018), 2500HD/3500HD (2015-2019)",
      front: 'Standard Grille: 11.25" x 4.0" (Clips / Backing plate)',
      rear: 'Standard Tailgate: 10.0" x 3.5" (Adhesive)',
      note: "2016-2018 models underwent a mid-cycle refresh that changed the front grille mounting angles on some trims.",
    },
    {
      name: "GMT900 Generation (2007 - 2013)",
      models: "Silverado 1500, 2500HD, 3500HD",
      front: 'Standard Grille: 11.5" x 4.25" (Bolt-on or Clips)',
      rear: 'Standard Tailgate: 11.0" x 4.0" (Adhesive)',
      note: "The 2007 'Classic' model retains the older GMT800 styling. Ensure you know if you have a New Body Style (NBS) or Classic.",
    },
    {
      name: "GMT800 Generation (1999 - 2006)",
      models: "Silverado 1500, 2500HD, 3500HD",
      front: 'Standard Grille: 10.25" x 3.75" (Bolt-on or Clips)',
      rear: 'Standard Tailgate: 9.5" x 3.5" (Adhesive)',
      note: "Classic restoration favorite. Mounting often requires accessing the back of the grille shell.",
    }
  ];

  return (
    <div className="pt-32 pb-24">
      <JsonLd data={breadcrumbJsonLd([
        { name: 'Home', path: '/' },
        { name: 'Fitment Guide', path: '/fitment' },
      ])} />
      <JsonLd
        data={{
          '@context': 'https://schema.org',
          '@type': 'HowTo',
          name: 'How to measure a Silverado emblem for replacement',
          description: 'Measure width, height, and mounting style before ordering a custom engraved Silverado emblem.',
          step: [
            { '@type': 'HowToStep', name: 'Measure width', text: 'Measure from the furthest left to furthest right point of the existing bowtie.' },
            { '@type': 'HowToStep', name: 'Measure height', text: 'Measure from top center to bottom center of the emblem face.' },
            { '@type': 'HowToStep', name: 'Check mount type', text: 'Confirm whether the badge uses clips, studs, adhesive, or a backing plate.' },
          ],
        }}
      />
      <div className="container mx-auto px-4 max-w-5xl">
        <header className="text-center mb-16">
          <div className="inline-block px-3 py-1 rounded-full bg-brand-gold/10 border border-brand-gold/20 text-brand-gold text-[10px] font-bold uppercase tracking-widest mb-6">
            Technical Resources
          </div>
          <h1 className="text-4xl md:text-5xl lg:text-6xl font-heading font-black tracking-tighter uppercase italic leading-tight mb-6 text-white">
            <span className="text-brand-gold">Silverado Emblems</span> &amp; Badge Fitment
          </h1>
          <AnswerCapsule className="max-w-3xl mx-auto mb-8 p-8 rounded-3xl bg-brand-gold/[0.03] border border-brand-gold/20 text-left">
            <strong className="text-white">Silverado badges</strong> and{' '}
            <strong className="text-white">silverado emblems</strong> vary by generation — front grille bowties are
            typically 9.5&quot; to 11.5&quot; wide depending on year and trim. Use this database to match your{' '}
            <strong className="text-white">chevy silverado badges</strong> before ordering a custom replacement.
          </AnswerCapsule>
          <p className="text-white/60 text-lg font-light max-w-3xl mx-auto leading-relaxed">
            Finding the correct dimensions for a <strong className="text-white">Silverado badge</strong> can be frustrating. Chevrolet has changed the size, mounting style, and depth of <strong className="text-white">chevrolet silverado emblems</strong> almost every generation. Use our master fitment hub below to identify the standard dimensions for your truck.
          </p>
        </header>

        {/* Disclaimer Alert */}
        <div className="glass-card p-6 border-l-4 border-l-yellow-500 mb-12 flex items-start gap-4">
          <AlertTriangle className="text-yellow-500 shrink-0 mt-1" size={24} />
          <div>
            <h3 className="text-white font-bold text-lg mb-2">Measure Twice, Order Once</h3>
            <p className="text-white/60 text-sm leading-relaxed">
              While we provide these measurements as an industry reference, <strong>we cannot guarantee they are exact for your specific vin/trim</strong>. Dealerships often swapped grilles, and aftermarket grilles change constraints. Before ordering custom <Link href="/products?make=Chevrolet" className="text-brand-gold hover:underline">silverado emblems</Link>, you MUST measure your physical badge width and height.
            </p>
          </div>
        </div>

        {/* How to measure section */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-12">
          <div className="glass-card p-8 text-center group">
            <div className="w-12 h-12 rounded-full bg-brand-gold/10 flex items-center justify-center text-brand-gold mx-auto mb-4 group-hover:bg-brand-gold group-hover:text-black transition-colors">
              <Ruler size={24} />
            </div>
            <h4 className="text-white font-bold mb-2">1. Measure the Width</h4>
            <p className="text-white/40 text-sm">Measure from the furthest left point to the furthest right point of the existing bowtie (not the grille recess).</p>
          </div>
          <div className="glass-card p-8 text-center group">
            <div className="w-12 h-12 rounded-full bg-brand-gold/10 flex items-center justify-center text-brand-gold mx-auto mb-4 group-hover:bg-brand-gold group-hover:text-black transition-colors">
              <Ruler size={24} className="rotate-90" />
            </div>
            <h4 className="text-white font-bold mb-2">2. Measure the Height</h4>
            <p className="text-white/40 text-sm">Measure from the absolute top center point to the absolute bottom center point.</p>
          </div>
          <div className="glass-card p-8 text-center group">
            <div className="w-12 h-12 rounded-full bg-brand-gold/10 flex items-center justify-center text-brand-gold mx-auto mb-4 group-hover:bg-brand-gold group-hover:text-black transition-colors">
              <Pickaxe size={24} />
            </div>
            <h4 className="text-white font-bold mb-2">3. Check the Mount</h4>
            <p className="text-white/40 text-sm">Look behind the grille. Is it held by plastic clips, 10mm nuts, or is it strictly adhesive backing?</p>
          </div>
        </div>

        <section id="silverado-emblems-guide" className="mb-12 glass-card p-8">
          <h2 className="text-2xl font-heading font-black uppercase italic text-white mb-4">
            Silverado Emblems — Complete Fitment Overview
          </h2>
          <p className="text-white/70 leading-relaxed mb-4">
            <strong className="text-white">Silverado emblems</strong> and the singular{' '}
            <strong className="text-white">silverado emblem</strong> search both point here — buyers need generation-level
            dimensions before ordering a custom replacement. This page is the canonical fitment hub; for purchase context
            read the{' '}
            <Link href="/articles/silverado-emblem-buying-guide-2026" className="text-brand-gold hover:underline">
              Silverado emblem buying guide
            </Link>.
          </p>
          <p className="text-white/60 leading-relaxed">
            Emblem types and styles:{' '}
            <Link href="/chevy-emblem" className="text-brand-gold hover:underline">Chevy emblem hub</Link>.
          </p>
        </section>

        <section id="chevy-silverado-badges" className="mb-12 glass-card p-8">
          <h2 className="text-2xl font-heading font-black uppercase italic text-white mb-4">
            Chevy Silverado Badges — Front Grille vs Tailgate
          </h2>
          <p className="text-white/70 leading-relaxed mb-4">
            <strong className="text-white">Chevy silverado badges</strong> on the front grille use different widths and
            clips than rear tailgate badges. A <strong className="text-white">silverado badge</strong> listing online may
            refer to either position — measure both if you want a matched set.
          </p>
          <p className="text-white/60 leading-relaxed">
            Style and emblem types:{' '}
            <Link href="/chevy-emblem" className="text-brand-gold hover:underline">Chevy emblem guide</Link>.
            Bowtie-only sizes:{' '}
            <Link href="/chevy-bowtie" className="text-brand-gold hover:underline">Engraved chevy bowtie hub</Link>.
          </p>
        </section>

        <section id="silverado-badges-emblems" className="mb-12 glass-card p-8">
          <h2 className="text-2xl font-heading font-black uppercase italic text-white mb-4">
            Silverado Badges &amp; Silverado Emblems by Generation
          </h2>
          <p className="text-white/70 leading-relaxed">
            Use the tables below when replacing <strong className="text-white">silverado badges</strong> or{' '}
            <strong className="text-white">silverado emblems</strong>. Reference dimensions are starting points — always
            measure your physical badge before ordering from the{' '}
            <Link href="/products?make=Chevrolet" className="text-brand-gold hover:underline">Chevy shop collection</Link>.
          </p>
        </section>

        <section id="silverado-ss-emblems" className="mb-12 glass-card p-8">
          <h2 className="text-2xl font-heading font-black uppercase italic text-white mb-4">
            Silverado SS Emblems &amp; Decals — Fitment Notes
          </h2>
          <p className="text-white/70 leading-relaxed mb-4">
            <strong className="text-white">Silverado ss emblems</strong> and{' '}
            <strong className="text-white">chevy silverado decals and emblems</strong> often refer to auxiliary badges
            (SS script, Z71, ZR2) rather than the center bowtie. These pieces use different adhesive footprints and
            cannot be inferred from grille bowtie dimensions alone.
          </p>
          <p className="text-white/60 leading-relaxed mb-4">
            SS billet badge SKU:{' '}
            <Link href="/products/ss-badge-emblem-billet" className="text-brand-gold hover:underline">
              EN-U4R1FW — SS Badge emblem billet
            </Link>
            . For ZR2 blackout context see{' '}
            <Link href="/articles/silverado-zr2-blackout-emblem-upgrades-deep-etching" className="text-brand-gold hover:underline">
              ZR2 blackout emblem guide
            </Link>.
          </p>
          <p className="text-white/50 text-sm">
            Searching <strong className="text-white/70">vortec max badge</strong>? Engine-callout badges vary by year and
            bed side —{' '}
            <Link href="/contact" className="text-brand-gold hover:underline">contact us</Link> for custom Vortec Max
            badge engraving (no standard catalog SKU).
          </p>
        </section>

        <RelatedGuideLinks
          guides={[
            {
              href: '/articles/silverado-emblem-buying-guide-2026',
              title: 'Silverado Emblem Buying Guide (2026)',
              description: 'Complete buyer checklist for silverado emblem and badge orders.',
            },
            {
              href: '/articles/chevrolet-emblem-style-fitment-guide',
              title: 'Chevrolet Emblem Style Guide',
              description: 'Emblem types, positions, and style paths for Chevy trucks.',
            },
            {
              href: '/articles/how-to-measure-truck-emblem-size-fitment-guide',
              title: 'How to Measure Your Truck Emblem',
              description: 'Visual measurement steps before you order.',
            },
          ]}
        />

        <HubProductPicks hub="fitment" title="Silverado Emblem SKUs — Map to Catalog" />

        {/* The Database */}
        <h2 className="text-2xl font-heading font-black uppercase italic text-white mb-2">Silverado Badges & Emblems by Generation</h2>
        <p className="text-white/50 mb-6 max-w-3xl">
          Whether you are replacing a <strong className="text-white/70">silverado badge</strong> on the tailgate or a front{' '}
          <strong className="text-white/70">chevy silverado emblem</strong>, start with your platform below. For bowtie-only
          sizing, see our{' '}
          <Link href="/chevy-bowtie" className="text-brand-gold hover:underline">engraved chevy bowtie guide</Link>.
          For style and finish options, visit the{' '}
          <Link href="/chevy-emblem" className="text-brand-gold hover:underline">Chevy emblem fitment hub</Link>.
        </p>
        <h3 className="text-xl font-heading font-black uppercase italic text-white/80 mb-6">Generational Reference Guide</h3>
        <div className="space-y-6">
          {generations.map((gen, index) => (
            <div key={index} className="glass-card p-6 md:p-8">
              <div className="flex flex-col md:flex-row md:items-start justify-between gap-6">
                <div className="flex-1">
                  <h3 className="text-2xl font-bold text-white mb-2">{gen.name}</h3>
                  <p className="text-brand-gold text-sm font-semibold mb-6 tracking-wide uppercase">{gen.models}</p>
                  
                  <div className="space-y-4">
                    <div className="flex items-start gap-3">
                      <CheckCircle2 className="text-white/20 mt-1 shrink-0" size={18} />
                      <div>
                        <strong className="text-white/80 block">Standard Front Grille Fit:</strong>
                        <span className="text-white/50 text-sm">{gen.front}</span>
                      </div>
                    </div>
                    <div className="flex items-start gap-3">
                      <CheckCircle2 className="text-white/20 mt-1 shrink-0" size={18} />
                      <div>
                        <strong className="text-white/80 block">Standard Tailgate Fit:</strong>
                        <span className="text-white/50 text-sm">{gen.rear}</span>
                      </div>
                    </div>
                  </div>
                </div>
                
                <div className="md:w-1/3 bg-black/40 rounded-xl p-5 border border-white/5">
                  <span className="text-brand-gold text-xs font-bold uppercase tracking-wider block mb-2">Fitment Note</span>
                  <p className="text-white/60 text-sm leading-relaxed">{gen.note}</p>
                </div>
              </div>
            </div>
          ))}
        </div>

        <div className="mt-16 text-center space-y-6">
          <p className="text-white/60">Got your measurements? Shop custom engraved Silverado badges or browse the full Chevy collection.</p>
          <div className="flex flex-wrap justify-center gap-4">
            <Link href="/products?make=Chevrolet" className="btn-primary inline-flex items-center gap-2 font-black italic">
              Shop Custom Chevy Emblems <ArrowRight size={18} />
            </Link>
            <Link href="/chevy-emblem" className="btn-secondary inline-flex items-center gap-2 font-black italic">
              Chevy Emblem Guide <ArrowRight size={18} />
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}
