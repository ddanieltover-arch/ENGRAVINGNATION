import Link from 'next/link';
import Image from 'next/image';

export default function Hero() {
  return (
    <section className="relative h-screen flex items-center justify-center overflow-hidden bg-black">
      {/* Background Image / Overlay */}
      <div className="absolute inset-0 z-0">
        <div className="absolute inset-0 bg-black/30 z-10"></div>
        <Image 
          src="/hero.png" 
          alt="Premium custom engraved GMC truck" 
          fill
          className="object-cover object-center opacity-80 scale-105 animate-slow-zoom"
          priority
        />
      </div>

      <div className="container mx-auto px-4 relative z-20 h-full flex flex-col justify-center pt-48">
        <div className="max-w-4xl mx-auto text-center animate-slide-up">
          <div className="inline-block px-4 py-1.5 rounded-full bg-brand-gold/10 border border-brand-gold/20 text-brand-gold text-[10px] font-black uppercase tracking-[0.4em] mb-8">
            Premium Automotive Art
          </div>
          <h1 className="text-6xl md:text-8xl lg:text-9xl font-heading font-extrabold tracking-tighter leading-[0.8] drop-shadow-sm">
            <span className="text-brand-gold block">ENGRAVING</span>
            <span className="text-white block mt-2">NATION</span>
          </h1>
          
          <p className="text-lg md:text-2xl text-white/90 max-w-3xl mx-auto leading-relaxed font-light tracking-wide drop-shadow-sm">
            Elite <span className="text-brand-gold font-black italic">custom engraved Silverado & Chevrolet emblems</span> and accessories. Precision-etched performance art for those who demand excellence.
          </p>
          
          <div className="flex flex-col sm:flex-row gap-6 justify-center items-center pt-8">
            <Link href="/products" className="btn-primary min-w-[220px] text-lg uppercase tracking-widest py-5 italic">
              Shop Collection
            </Link>
            <Link href="/about" className="btn-secondary min-w-[220px] text-lg uppercase tracking-widest py-5 italic">
              Our Story
            </Link>
          </div>

          {/* Scroll Indicator - repositioned beneath buttons */}
          <div className="pt-16 flex flex-col items-center animate-bounce opacity-30 hover:opacity-100 transition-opacity">
            <span className="text-[10px] uppercase tracking-[0.4em] mb-4 font-bold text-white">Scroll</span>
            <div className="w-px h-10 bg-linear-to-b from-brand-gold to-transparent"></div>
          </div>
        </div>
      </div>
    </section>
  );
}
