import type { Metadata } from 'next';
import { Shield, Zap, Hammer, Award, Wrench } from 'lucide-react';

export const metadata: Metadata = {
  title: 'Custom Automotive Engraving Services | Engraving Nation',
  description: 'Precision laser engraving for Chevrolet, Silverado, GMC, and Ford. Deep, durable emblems and mirror caps crafted for performance builds.',
};

export default function ServicesPage() {
  const services = [
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
      <div className="container mx-auto px-4 max-w-5xl">
        <header className="text-center mb-16">
          <div className="inline-block px-3 py-1 rounded-full bg-brand-gold/10 border border-brand-gold/20 text-brand-gold text-[10px] font-bold uppercase tracking-widest mb-6">
            Capabilities
          </div>
          <h1 className="text-4xl md:text-6xl font-heading font-black tracking-tighter uppercase italic leading-none mb-6 text-white">
            Our <span className="text-brand-gold">Services</span>
          </h1>
          <p className="text-white/40 text-lg font-light max-w-2xl mx-auto">
            High-quality, custom automotive engravings designed for durability and precision.
          </p>
        </header>

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

        <div className="mt-16 glass-card p-12 text-center relative overflow-hidden">
          <div className="absolute top-0 right-0 w-96 h-96 bg-brand-gold/5 rounded-full blur-3xl -mr-48 -mt-48"></div>
          <div className="relative z-10">
            <h2 className="text-2xl font-heading font-black uppercase italic mb-6 text-white">Our <span className="text-brand-gold">Commitment</span></h2>
            <p className="text-white/50 font-light leading-relaxed max-w-3xl mx-auto">
              What sets Engraving Nation apart is our commitment to craftsmanship. Our engraving process is engineered to produce deep, clean lines that won’t fade, peel, or lose definition over time. Every design is carefully optimized to maintain proper proportions, mounting compatibility, and long-term durability. We don’t believe in one-size-fits-all—every product is made with vehicle-specific accuracy in mind.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
