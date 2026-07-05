import type { Metadata } from 'next';
import Link from 'next/link';
import { Shield, Zap, Hammer, Award, Wrench, Car } from 'lucide-react';
import { buildPageMetadata } from '@/lib/seo/metadata';

export const metadata: Metadata = buildPageMetadata({
  title: 'Custom Car Engraving & Automotive Emblem Services',
  description:
    'Professional car engraving for Chevy, GMC, Ford, and RAM — custom emblem engraving, mirror caps, and hand-etched automotive badges with OEM-style fitment.',
  path: '/services',
  keywords: [
    'car engraving',
    'automotive engraving',
    'custom emblem engraving',
    'truck badge engraving',
    'hand engraved emblems',
  ],
});

export default function ServicesPage() {
  const breadcrumbJsonLd = {
    '@context': 'https://schema.org',
    '@type': 'BreadcrumbList',
    itemListElement: [
      { '@type': 'ListItem', position: 1, name: 'Home', item: 'https://engravingnation.store' },
      { '@type': 'ListItem', position: 2, name: 'Services', item: 'https://engravingnation.store/services' },
    ],
  };

  const services = [
    {
      title: "Custom Car Engraving",
      desc: "Precision hand and laser engraving on emblems, mirror caps, and trim pieces — permanent car engraving that outlasts vinyl overlays.",
      icon: Car
    },
    {
      title: "Custom Automotive Engraving",
      desc: "Precision laser engraving on various vehicle components to elevate aesthetics and personalization.",
      icon: Hammer
    },
    {
      title: "Chevy Emblem Services",
      desc: "Specialized engraving for Chevrolet bowties. We offer front and rear options for Silverado, Tahoe, Suburban, and more.",
      icon: Award
    },
    {
      title: "GMC Emblem Services",
      desc: "Custom designs for Sierra, Yukon, and Denali lineups. Elevate your professional grade appearance.",
      icon: Shield
    },
    {
      title: "Ford Emblem Engraving",
      desc: "Precision work for the F-150 and Super Duty series. Bold, deep engravings that withstand any terrain.",
      icon: Zap
    },
    {
      title: "Handcrafted Mirror Caps",
      desc: "Custom-engraved mirror caps designed to add a premium touch to your vehicle's exterior.",
      icon: Wrench
    },
    {
      title: "Continuous Innovation",
      desc: "We stay ahead of the curve by constantly refining our techniques and exploring new materials for superior depth.",
      icon: Zap
    }
  ];

  return (
    <div className="pt-32 pb-24">
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbJsonLd) }}
      />
      <div className="container mx-auto px-4 max-w-5xl">
        <header className="text-center mb-16">
          <div className="inline-block px-3 py-1 rounded-full bg-brand-gold/10 border border-brand-gold/20 text-brand-gold text-[10px] font-bold uppercase tracking-widest mb-6">
            Capabilities
          </div>
          <h1 className="text-4xl md:text-6xl font-heading font-black tracking-tighter uppercase italic leading-none mb-6 text-white">
            What Engraving Services Do We <span className="text-brand-gold">Offer?</span>
          </h1>
          <p className="text-white/40 text-lg font-light max-w-2xl mx-auto">
            From custom Chevy emblems to precision mirror caps, explore the full range of hand-engraved automotive services we provide.
          </p>
        </header>

        {/* GEO Answer Capsule */}
        <section id="answer" aria-label="Services Overview" className="max-w-4xl mx-auto mb-16">
          <div className="p-8 rounded-3xl bg-brand-gold/[0.03] border border-brand-gold/20 backdrop-blur-sm">
            <p className="text-white/80 text-lg leading-relaxed text-center">
              <strong className="text-brand-gold uppercase tracking-widest text-xs block mb-2">Quick Answer:</strong>
              Engraving Nation offers <strong>precision car engraving</strong> and laser-etched detail for Chevrolet, GMC, Ford, and RAM vehicles. Our services include custom emblem engraving, hand-finished mirror caps, and bespoke automotive accessories—all designed for OEM-level fitment and permanent, weather-resistant durability.
            </p>
          </div>
        </section>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {services.map((service, index) => (
            <div key={index} className="glass-card p-8 group hover:bg-brand-gold/5 transition-all duration-500">
              <div className="w-12 h-12 rounded-xl bg-brand-gold/10 flex items-center justify-center text-brand-gold mb-6 group-hover:bg-brand-gold group-hover:text-black transition-all">
                <service.icon size={24} />
              </div>
              <h3 className="text-xl font-heading font-black uppercase italic text-white mb-3 leading-tight">{service.title}</h3>
              <p className="text-white/50 font-light leading-relaxed text-sm">
                {service.desc}
              </p>
            </div>
          ))}
        </div>

        <section id="car-engraving" aria-label="Car engraving services" className="mt-16 glass-card p-10">
          <h2 className="text-2xl md:text-3xl font-heading font-black uppercase italic text-white mb-4">
            What Is <span className="text-brand-gold">Car Engraving?</span>
          </h2>
          <p className="text-white/60 leading-relaxed mb-6 max-w-3xl">
            <strong className="text-white/80">Car engraving</strong> permanently cuts design detail into emblem, badge,
            or mirror-cap material instead of applying stickers or paint on top. Searchers looking for automotive
            engraving usually want durability — etched lines that survive car washes, road salt, and UV exposure without
            peeling. We specialize in truck platforms where factory badges are replaced with hand-finished engraved
            equivalents.
          </p>
          <ul className="grid grid-cols-1 md:grid-cols-2 gap-4 text-white/50 text-sm mb-8">
            <li className="rounded-xl border border-white/10 bg-white/5 p-4">
              <strong className="text-white block mb-1">Emblem engraving</strong>
              Bowties, tailgate badges, and grille scripts for Chevy and GMC builds.
            </li>
            <li className="rounded-xl border border-white/10 bg-white/5 p-4">
              <strong className="text-white block mb-1">Mirror cap engraving</strong>
              Paired caps with matched pattern depth and finish families.
            </li>
            <li className="rounded-xl border border-white/10 bg-white/5 p-4">
              <strong className="text-white block mb-1">Custom requests</strong>
              Contact us for one-off patterns on supported OEM-style bases.
            </li>
            <li className="rounded-xl border border-white/10 bg-white/5 p-4">
              <strong className="text-white block mb-1">Fitment support</strong>
              We route sizing questions to our guides before production.
            </li>
          </ul>
          <div className="flex flex-wrap gap-4">
            <Link href="/contact" className="btn-primary font-black italic">Request Custom Engraving</Link>
            <Link href="/articles/hand-engraved-vs-machine-etched-emblems-durability" className="btn-secondary font-black italic">
              Hand vs Machine Etching
            </Link>
            <Link href="/chevy-emblem" className="btn-secondary font-black italic">Chevy Emblem Guide</Link>
          </div>
        </section>

        <div className="mt-16 glass-card p-12 text-center relative overflow-hidden">
          <div className="absolute top-0 right-0 w-96 h-96 bg-brand-gold/5 rounded-full blur-3xl -mr-48 -mt-48"></div>
          <div className="relative z-10">
            <h2 className="text-2xl font-heading font-black uppercase italic mb-6 text-white">What Sets Engraving Nation <span className="text-brand-gold">Apart?</span></h2>
            <p className="text-white/50 font-light leading-relaxed max-w-3xl mx-auto">
              What sets Engraving Nation apart is our commitment to craftsmanship. Our engraving process is engineered to produce deep, clean lines that won’t fade, peel, or lose definition over time. Every design is carefully optimized to maintain proper proportions, mounting compatibility, and long-term durability. We don’t believe in one-size-fits-all—every product is made with vehicle-specific accuracy in mind.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
