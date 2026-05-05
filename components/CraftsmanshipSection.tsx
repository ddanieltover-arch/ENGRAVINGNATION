import React from 'react';

export default function CraftsmanshipSection() {
  return (
    <section className="mt-40 mb-20 animate-slide-up">
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
        <div className="space-y-8">
          <div>
            <span className="text-brand-gold font-black uppercase tracking-[0.3em] text-[10px] italic border-b border-brand-gold/30 pb-2 mb-6 inline-block">
              Technical Excellence & Mastery
            </span>
            <h2 className="text-4xl md:text-6xl font-heading font-black tracking-tighter uppercase italic leading-none mb-6 text-white">
              How Does Precision <span className="text-brand-gold">Engraving Work?</span>
            </h2>
            <div className="w-24 h-1 bg-brand-gold mb-8"></div>
          </div>
          
          <div className="space-y-6 text-white/60 font-light leading-relaxed text-lg">
            <p>
              At Engraving Nation, we believe your vehicle deserves more than mass-produced plastic. Our specialized engraving process transforms premium materials like <strong className="text-white/90 font-bold">certified billet aluminum</strong> and high-impact automotive polymers into bespoke performance art, including <strong className="text-white/90 font-bold">custom forged chevy emblems</strong> and precision-crafted <strong className="text-white/90 font-bold">engraved mirror caps</strong>. Each piece undergoes a rigorous design phase where we map digital textures to physical 3D surfaces with sub-millimeter precision.
            </p>
            <p>
              Our technique combines the raw power of <strong className="text-white/90 font-bold">CNC precision</strong> with the finesse of hand-etching. This methodology allows us to create deep, multi-layered textures—such as our signature honeycomb and shattered carbon patterns—that catch the light at every angle. Unlike painted or wrap-based modifications, our engravings are permanent, resistant to UV degredation, and built to withstand the harshest road elements without losing definition.
            </p>
            <p>
              We focus on the most popular performance platforms, including the <strong className="text-white/90 font-bold">GMT-T1XX (2019+ Silverado/Sierra)</strong> and heavy-duty series. By understanding the specific geometry of these vehicles, we ensure that every <strong className="text-white/90 font-bold">oem silverado emblem</strong>, mirror cap, and tailgate badge maintains factory mounting integrity while delivering a clean, aggressive aesthetic that defines your build's identity.
            </p>
          </div>

          {/* E-E-A-T Statistics Block */}
          <div className="grid grid-cols-2 gap-4 pt-4">
            <div className="p-5 rounded-2xl bg-white/[0.03] border border-white/5">
              <div className="text-3xl font-heading font-black text-brand-gold mb-1">500+</div>
              <div className="text-[10px] uppercase tracking-widest text-white/40 font-bold">Custom Emblems Produced</div>
            </div>
            <div className="p-5 rounded-2xl bg-white/[0.03] border border-white/5">
              <div className="text-3xl font-heading font-black text-brand-gold mb-1">0.05mm</div>
              <div className="text-[10px] uppercase tracking-widest text-white/40 font-bold">Engraving Tolerance</div>
            </div>
            <div className="p-5 rounded-2xl bg-white/[0.03] border border-white/5">
              <div className="text-3xl font-heading font-black text-brand-gold mb-1">6061-T6</div>
              <div className="text-[10px] uppercase tracking-widest text-white/40 font-bold">Aircraft-Grade Aluminum</div>
            </div>
            <div className="p-5 rounded-2xl bg-white/[0.03] border border-white/5">
              <div className="text-3xl font-heading font-black text-brand-gold mb-1">98%</div>
              <div className="text-[10px] uppercase tracking-widest text-white/40 font-bold">Customer Satisfaction</div>
            </div>
          </div>
        </div>

        <div className="relative">
          <div className="glass-card p-2 rounded-3xl overflow-hidden aspect-square relative group">
            <div className="absolute inset-0 bg-brand-gold/5 z-10 group-hover:bg-brand-gold/10 transition-colors"></div>
            <img 
              src="/hero-specialty.png" 
              alt="Close-up of detailed CNC and hand-etched custom automotive emblem engraving process" 
              className="w-full h-full object-cover rounded-2xl grayscale hover:grayscale-0 transition-all duration-1000 scale-105 group-hover:scale-110"
            />
            
            {/* Overlay Specs */}
            <div className="absolute bottom-10 left-10 z-20 space-y-4">
              <div className="glass-card px-6 py-4 backdrop-blur-xl border-white/10 flex items-center gap-4">
                <div className="w-2 h-2 rounded-full bg-brand-gold animate-pulse"></div>
                <div className="text-[10px] font-black uppercase tracking-widest italic text-white/90">Precision: 0.05mm Tolerance</div>
              </div>
              <div className="glass-card px-6 py-4 backdrop-blur-xl border-white/10 flex items-center gap-4 translate-x-12">
                <div className="w-2 h-2 rounded-full bg-brand-gold"></div>
                <div className="text-[10px] font-black uppercase tracking-widest italic text-white/90">Material: 6061-T6 Aluminum</div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
