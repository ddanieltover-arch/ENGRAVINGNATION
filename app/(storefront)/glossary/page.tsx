import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Automotive Engraving Glossary | Engraving Nation',
  description: 'Understand the terms behind our premium automotive engravings. From precision etching to OEM fitment, learn the vocabulary of custom vehicle styling.',
  alternates: {
    canonical: 'https://engravingnation.store/glossary',
  },
};

const glossaryTerms = [
  {
    term: 'Precision Engraving',
    definition: 'A process that uses high-accuracy tools to etch detailed designs into automotive-grade plastics or metals, creating a permanent 3D texture that far exceeds the quality of vinyl overlays.'
  },
  {
    term: 'OEM Fitment',
    definition: 'Short for Original Equipment Manufacturer fitment. This ensures that the custom engraved part uses the exact same mounting points, clips, and dimensions as the original factory part for a seamless, bolt-on installation.'
  },
  {
    term: 'Hand-Etched',
    definition: 'A craftsmanship-focused technique where final details or specific designs are finished by hand, ensuring that every emblem or accessory has a unique, artisan quality.'
  },
  {
    term: 'Mirror Caps',
    definition: 'The outer shell of a vehicle’s side-view mirror. Engraving Nation provides custom-engraved replacement caps for trucks and SUVs, primarily focusing on the Silverado and Sierra models.'
  },
  {
    term: 'Tailgate Emblem',
    definition: 'The decorative badge located on the rear of a vehicle. Our custom engraved tailgate emblems are built to withstand road spray and debris while maintaining their intricate design detail.'
  },
  {
    term: 'Grille Emblem',
    definition: 'The primary brand badge located on the front grille. Because these are exposed to direct impact from air and debris, our engraved versions are designed for maximum aerodynamic durability.'
  },
  {
    term: 'Custom Finish',
    definition: 'The final coating applied to an engraved part, which can range from high-gloss black to satin or chrome. The finish protects the engraving while defining the final aesthetic of the vehicle.'
  }
];

export default function GlossaryPage() {
  const jsonLd = {
    '@context': 'https://schema.org',
    '@type': 'WebPage',
    name: 'Automotive Engraving Glossary',
    description: 'A comprehensive guide to terms used in custom automotive engraving.',
    mainEntity: {
      '@type': 'ItemList',
      itemListElement: glossaryTerms.map((t, i) => ({
        '@type': 'ListItem',
        position: i + 1,
        name: t.term,
        description: t.definition
      }))
    }
  };

  return (
    <div className="min-h-screen bg-brand-bg text-white/90 pt-32 pb-24">
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />
      <div className="container mx-auto px-4">
        <div className="max-w-4xl mx-auto">
          <header className="mb-16">
            <h1 className="text-4xl md:text-6xl font-heading font-black tracking-tighter uppercase italic leading-tight mb-6">
              Automotive <span className="text-brand-gold">Glossary</span>
            </h1>
            <div className="w-24 h-1 bg-brand-gold mb-8"></div>
            <p className="text-white/50 text-xl font-light leading-relaxed">
              Master the vocabulary of premium vehicle customization. Our glossary defines the technical terms and craftsmanship techniques behind every Engraving Nation product.
            </p>
          </header>

          <div className="space-y-12">
            {glossaryTerms.map((item) => (
              <section key={item.term} className="group p-8 rounded-3xl bg-white/[0.03] border border-white/5 hover:border-brand-gold/20 transition-all duration-500">
                <h2 className="text-2xl font-heading font-black uppercase italic tracking-tight text-white mb-4 group-hover:text-brand-gold transition-colors">
                  {item.term}
                </h2>
                <p className="text-white/60 text-lg font-light leading-relaxed">
                  {item.definition}
                </p>
              </section>
            ))}
          </div>
          
          <footer className="mt-24 p-12 rounded-3xl bg-brand-gold/5 border border-brand-gold/10 text-center">
            <h3 className="text-xl font-heading font-black uppercase italic mb-4">Ready to see these terms in action?</h3>
            <p className="text-white/50 mb-8 max-w-2xl mx-auto">Explore our full inventory of custom engraved emblems and mirror caps for your truck.</p>
            <a href="/products" className="inline-block px-10 py-4 rounded-full bg-brand-gold text-black font-black uppercase tracking-widest italic hover:shadow-[0_0_30px_rgba(212,160,23,0.3)] transition-all">
              Shop the Collection
            </a>
          </footer>
        </div>
      </div>
    </div>
  );
}
