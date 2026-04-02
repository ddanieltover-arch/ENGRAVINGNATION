'use client';

import { ShieldCheck, Crosshair, Lock } from 'lucide-react';

export default function TrustSeals() {
  const seals = [
    {
      icon: <Crosshair className="w-5 h-5 text-brand-gold" />,
      title: "Fitment Guarantee",
      desc: "Precision Verified for Your Build"
    },
    {
      icon: <ShieldCheck className="w-5 h-5 text-brand-gold" />,
      title: "Hand-Etched Quality",
      desc: "Permanent Artisanal Craftsmanship"
    },
    {
      icon: <Lock className="w-5 h-5 text-brand-gold" />,
      title: "Secure Checkout",
      desc: "256-bit Encrypted Payments"
    }
  ];

  return (
    <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mt-8 py-6 border-y border-white/5 bg-white/5 rounded-2xl px-6">
      {seals.map((seal, i) => (
        <div key={i} className="flex items-start gap-4 group">
          <div className="shrink-0 w-10 h-10 rounded-xl bg-brand-gold/10 border border-brand-gold/20 flex items-center justify-center group-hover:scale-110 group-hover:bg-brand-gold/20 transition-all duration-300">
            {seal.icon}
          </div>
          <div>
            <h4 className="text-[10px] font-black uppercase tracking-widest text-white/90 mb-0.5">
              {seal.title}
            </h4>
            <p className="text-[9px] text-white/40 uppercase tracking-wider font-medium">
              {seal.desc}
            </p>
          </div>
        </div>
      ))}
    </div>
  );
}
