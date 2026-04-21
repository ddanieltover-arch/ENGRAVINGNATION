import type { Metadata } from 'next';
import Link from 'next/link';
import { Ruler, AlertTriangle, ArrowRight, Pickaxe, CheckCircle2 } from 'lucide-react';

export const metadata: Metadata = {
  title: 'Chevy Silverado Emblem Size & Fitment Guide | Dimensions Database',
  description: 'The ultimate database for Chevrolet Silverado emblems. Find the right dimensions, mounting styles, and fitment for your custom silverado badge across GMT800, GMT900, K2XX, and T1XX generations.',
  alternates: {
    canonical: 'https://engravingnation.store/fitment',
  },
  openGraph: {
    title: 'Silverado Emblem Size Database | Engraving Nation',
    description: 'Stop guessing your emblem size. Our technical fitment guide helps you measure your Chevrolet Silverado emblems before you buy.',
    url: 'https://engravingnation.store/fitment',
  },
};

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
      <div className="container mx-auto px-4 max-w-5xl">
        <header className="text-center mb-16">
          <div className="inline-block px-3 py-1 rounded-full bg-brand-gold/10 border border-brand-gold/20 text-brand-gold text-[10px] font-bold uppercase tracking-widest mb-6">
            Technical Resources
          </div>
          <h1 className="text-4xl md:text-5xl lg:text-6xl font-heading font-black tracking-tighter uppercase italic leading-tight mb-6 text-white">
            <span className="text-brand-gold">Silverado Emblem</span> Size Database
          </h1>
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

        {/* The Database */}
        <h2 className="text-2xl font-heading font-black uppercase italic text-white mb-6">Generational Reference Guide</h2>
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

        {/* CTA */}
        <div className="mt-16 text-center">
          <p className="text-white/60 mb-6">Got your measurements? It's time to upgrade your factory plastic to deep-etched aluminum.</p>
          <Link href="/products?make=Chevrolet" className="btn-primary inline-flex items-center gap-2 font-black italic">
            Shop Custom Chevy Bowties <ArrowRight size={18} />
          </Link>
        </div>
      </div>
    </div>
  );
}
