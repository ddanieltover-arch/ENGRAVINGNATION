import type { Metadata } from 'next';
import Link from 'next/link';

export const metadata: Metadata = {
  title: 'Our Story & Craftsmanship | Engraving Nation',
  description: 'Learn about Engraving Nation\'s commitment to handmade, precision-etched automotive art. From custom Silverado emblems to unique vehicle styling.',
};

export default function AboutPage() {
  return (
    <div className="pt-32 pb-24">
      <div className="container mx-auto px-4 max-w-4xl">
        <header className="text-center mb-16">
          <div className="inline-block px-3 py-1 rounded-full bg-brand-gold/10 border border-brand-gold/20 text-brand-gold text-[10px] font-bold uppercase tracking-widest mb-6">
            The Story
          </div>
          <h1 className="text-4xl md:text-6xl font-heading font-black tracking-tighter uppercase italic leading-none mb-6 text-white">
            About <span className="text-brand-gold">Engraving Nation</span>
          </h1>
          <p className="text-white/40 text-lg font-light max-w-2xl mx-auto italic">
            Precision Engraved. Built to Stand Out.
          </p>
        </header>

        <div className="space-y-12">
          <section className="glass-card p-8 md:p-12 relative overflow-hidden group">
            <div className="absolute top-0 right-0 w-64 h-64 bg-brand-gold/5 rounded-full blur-3xl -mr-32 -mt-32 transition-colors group-hover:bg-brand-gold/10"></div>
            <div className="relative z-10 space-y-6 text-white/70 font-light leading-relaxed text-lg">
              <p>
                At <strong className="text-brand-gold font-bold">Engraving Nation</strong>, we specialize in precision-crafted, custom automotive engravings designed for drivers who demand more than factory-standard parts. Our mission is simple: to transform everyday vehicle components into bold, personalized statements that reflect power, identity, and pride of ownership.
              </p>
              <p>
                Every product we create is built with attention to detail, durability, and visual impact. From deeply engraved emblems to hand-finished mirror caps, our work is designed to stand up to real-world driving conditions while delivering a clean, aggressive look that sets your vehicle apart.
              </p>
            </div>
          </section>

          <section className="grid grid-cols-1 md:grid-cols-2 gap-8">
            <div className="glass-card p-8 group">
              <h3 className="text-brand-gold font-heading font-black uppercase italic text-xl mb-4 group-hover:translate-x-2 transition-transform">Platform Focus</h3>
              <p className="text-white/50 font-light leading-relaxed">
                We focus heavily on <strong className="text-white/80">Chevy, GMC, and Ford platforms</strong>, offering custom solutions for a wide range of models and years. Whether you’re upgrading a <a href="https://www.chevrolet.com/trucks/silverado" target="_blank" rel="noopener noreferrer" className="text-brand-gold hover:underline">Silverado</a>, <a href="https://www.gmc.com/trucks/sierra/1500" target="_blank" rel="noopener noreferrer" className="text-brand-gold hover:underline">Sierra</a>, or another performance-driven build, our engravings are crafted to fit precisely and enhance the factory lines of your vehicle.
              </p>
            </div>
            <div className="glass-card p-8 group">
              <h3 className="text-brand-gold font-heading font-black uppercase italic text-xl mb-4 group-hover:translate-x-2 transition-transform">Commitment</h3>
              <p className="text-white/50 font-light leading-relaxed">
                What sets Engraving Nation apart is our commitment to craftsmanship. Our engraving process is engineered to produce deep, clean lines that won’t fade, peel, or lose definition over time. We use premium materials and finishes to ensure each product looks just as good years down the road as it does on day one.
              </p>
            </div>
          </section>

          <section className="glass-card p-8 md:p-12 text-center bg-brand-gold/5">
            <h2 className="text-2xl font-heading font-black uppercase italic mb-6 text-white">Built for <span className="text-brand-gold">Enthusiasts</span></h2>
            <p className="text-white/60 font-light leading-relaxed max-w-2xl mx-auto mb-8">
              Engraving Nation was built for truck and car owners who want their vehicles to reflect their personality and passion. Whether your build is bold, aggressive, clean, or minimal, our engraved components are designed to complement your vision and elevate your ride.
            </p>
            <Link href="/products" className="btn-primary inline-flex px-12">
              Explore The Catalog
            </Link>
          </section>
        </div>
      </div>
    </div>
  );
}
