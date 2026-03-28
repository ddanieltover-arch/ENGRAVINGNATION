import Link from 'next/link';
import { getJsonData, PRODUCTS_FILE } from '@/lib/data';

import Hero from '@/components/Hero';
import VehicleSelector from '@/components/VehicleSelector';
import ProductCard from '@/components/ProductCard';
import { getProducts } from '@/lib/data';

export const revalidate = 0;

export default async function HomePage() {
  const allProducts = await getProducts();
  const featuredProducts = allProducts.slice(0, 8);


  return (
    <div className="min-h-screen bg-brand-bg text-white/90 font-sans">
      <Hero />
      
      <div className="container mx-auto px-4 py-24">
        <div className="animate-slide-up" style={{ animationDelay: '0.2s' }}>
          <VehicleSelector />
        </div>
        
        <section className="mt-32 animate-slide-up" style={{ animationDelay: '0.4s' }}>
          <div className="flex flex-col md:flex-row justify-between items-end gap-6 mb-16 px-2">
            <div>
              <h2 className="text-4xl md:text-5xl font-heading font-black tracking-tighter uppercase italic leading-none mb-4">
                Featured <span className="text-brand-gold">Collection</span>
              </h2>
              <div className="w-24 h-1 bg-brand-gold mb-6"></div>
              <p className="text-white/50 max-w-2xl text-lg font-light leading-relaxed">
                Our most sought-after custom engraved automotive parts. Precision crafted to define your vehicle's identity.
              </p>
            </div>
          </div>
          
          <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-6">
            {featuredProducts.map((product: any) => (
              <ProductCard key={product.slug} product={product} />
            ))}
          </div>

          <div className="mt-20 text-center">
            <Link 
              href="/products" 
              className="px-12 py-4 rounded-full bg-brand-gold text-black font-black uppercase tracking-widest hover:shadow-[0_0_30px_rgba(212,160,23,0.4)] transition-all duration-300 inline-block italic"
            >
              View All Products
            </Link>
          </div>
        </section>

        {/* Brand Promise Section - Animated Cards */}
        <section className="mt-40 mb-20">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div className="group p-10 rounded-3xl bg-white/3 border border-white/5 hover:border-brand-gold/30 transition-all duration-500 hover:-translate-y-2 hover:shadow-[0_20px_50px_rgba(0,0,0,0.5)] relative overflow-hidden animate-slide-up" style={{ animationDelay: '0.1s' }}>
              <div className="absolute top-0 right-0 w-32 h-32 bg-brand-gold/5 rounded-full blur-3xl -mr-16 -mt-16 group-hover:bg-brand-gold/10 transition-colors"></div>
              <div className="relative z-10">
                <div className="w-14 h-14 rounded-2xl bg-brand-gold/10 flex items-center justify-center text-brand-gold mb-8 group-hover:scale-110 transition-transform">
                  <svg className="w-7 h-7" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 12l2 2 4-4M7.835 4.697a3.42 3.42 0 001.946-.806 3.42 3.42 0 014.438 0 3.42 3.42 0 001.946.806 3.42 3.42 0 013.138 3.138 3.42 3.42 0 00.806 1.946 3.42 3.42 0 010 4.438 3.42 3.42 0 00-.806 1.946 3.42 3.42 0 01-3.138 3.138 3.42 3.42 0 00-1.946.806 3.42 3.42 0 01-4.438 0 3.42 3.42 0 00-1.946-.806 3.42 3.42 0 01-3.138-3.138 3.42 3.42 0 00-.806-1.946 3.42 3.42 0 010-4.438 3.42 3.42 0 00.806-1.946 3.42 3.42 0 013.138-3.138z"></path></svg>
                </div>
                <h3 className="text-xl font-heading font-black uppercase italic tracking-tight text-white mb-4">Quality</h3>
                <p className="text-white/50 text-base font-light leading-relaxed">
                  Hand-etched precision on every single emblem. No shortcuts, just excellence.
                </p>
              </div>
            </div>

            <div className="group p-10 rounded-3xl bg-white/3 border border-white/5 hover:border-brand-gold/30 transition-all duration-500 hover:-translate-y-2 hover:shadow-[0_20px_50px_rgba(0,0,0,0.5)] relative overflow-hidden animate-slide-up" style={{ animationDelay: '0.2s' }}>
              <div className="absolute top-0 right-0 w-32 h-32 bg-brand-gold/5 rounded-full blur-3xl -mr-16 -mt-16 group-hover:bg-brand-gold/10 transition-colors"></div>
              <div className="relative z-10">
                <div className="w-14 h-14 rounded-2xl bg-brand-gold/10 flex items-center justify-center text-brand-gold mb-8 group-hover:scale-110 transition-transform">
                  <svg className="w-7 h-7" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z"></path></svg>
                </div>
                <h3 className="text-xl font-heading font-black uppercase italic tracking-tight text-white mb-4">Custom</h3>
                <p className="text-white/50 text-base font-light leading-relaxed">
                  Bespoke designs tailored to your specific vehicle and personal style.
                </p>
              </div>
            </div>

            <div className="group p-10 rounded-3xl bg-white/3 border border-white/5 hover:border-brand-gold/30 transition-all duration-500 hover:-translate-y-2 hover:shadow-[0_20px_50px_rgba(0,0,0,0.5)] relative overflow-hidden animate-slide-up" style={{ animationDelay: '0.3s' }}>
              <div className="absolute top-0 right-0 w-32 h-32 bg-brand-gold/5 rounded-full blur-3xl -mr-16 -mt-16 group-hover:bg-brand-gold/10 transition-colors"></div>
              <div className="relative z-10">
                <div className="w-14 h-14 rounded-2xl bg-brand-gold/10 flex items-center justify-center text-brand-gold mb-8 group-hover:scale-110 transition-transform">
                  <svg className="w-7 h-7" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z"></path></svg>
                </div>
                <h3 className="text-xl font-heading font-black uppercase italic tracking-tight text-white mb-4">Durability</h3>
                <p className="text-white/50 text-base font-light leading-relaxed">
                  Built to withstand the elements without fading. Show quality that lasts.
                </p>
              </div>
            </div>
          </div>
        </section>

        {/* Ready to Upgrade Section */}
        <section className="mt-40 mb-20 animate-slide-up">
          <div className="p-12 md:p-20 relative overflow-hidden rounded-3xl bg-white/[0.03] border border-white/5">
            <div className="absolute top-0 right-0 w-96 h-96 bg-brand-gold/5 rounded-full blur-3xl -mr-48 -mt-48"></div>
            
            <div className="relative z-10 text-center mb-16">
              <span className="inline-block text-[10px] font-black tracking-[0.3em] uppercase text-brand-gold mb-6 border-b border-brand-gold/30 pb-2">
                VIEW MORE PRODUCTS FROM OUR STORE
              </span>
              <h2 className="text-4xl md:text-6xl font-heading font-black tracking-tighter uppercase italic leading-none mb-8">
                Ready to <span className="text-brand-gold">Upgrade Your Ride?</span>
              </h2>
              <p className="text-white/70 max-w-3xl mx-auto text-lg md:text-xl font-light leading-relaxed">
                At Engraving Nation, we don&apos;t just make parts—we craft precision-engineered, hand-engraved automotive upgrades that turn heads and last a lifetime. Every emblem, mirror cap, and custom piece is built for perfect fit, unmatched durability, and show-stopping style.
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-12 max-w-5xl mx-auto">
              <div className="space-y-8">
                <div className="flex gap-6">
                  <div className="text-3xl shrink-0">💎</div>
                  <div>
                    <h4 className="text-sm font-black uppercase tracking-widest mb-3 text-white">Our Guarantee</h4>
                    <p className="text-white/60 text-sm font-light leading-relaxed">
                      We stand by our products. If your item arrives defective or damaged, we&apos;ll replace it or refund your purchase—no hassle, no compromise. Your satisfaction and confidence are our top priorities.
                    </p>
                  </div>
                </div>
                
                <div className="flex gap-6">
                  <div className="text-3xl shrink-0">🚚</div>
                  <div>
                    <h4 className="text-sm font-black uppercase tracking-widest mb-3 text-white">Fast & Free Shipping</h4>
                    <p className="text-white/60 text-sm font-light leading-relaxed">
                      Orders over $150 ship quickly, straight to your door.
                    </p>
                  </div>
                </div>
              </div>

              <div className="space-y-8">
                <div className="flex gap-6">
                  <div className="text-3xl shrink-0">🤝</div>
                  <div>
                    <h4 className="text-sm font-black uppercase tracking-widest mb-3 text-white">Trusted Support</h4>
                    <p className="text-white/60 text-sm font-light leading-relaxed">
                      Questions or concerns? Our team is always ready to help you choose the perfect upgrade and ensure a smooth experience from checkout to installation.
                    </p>
                  </div>
                </div>

                <div className="bg-white/[0.05] p-6 rounded-2xl border border-white/10">
                  <p className="text-[11px] font-bold uppercase tracking-widest mb-4 italic text-brand-gold">Make Your Vehicle Stand Out. Upgrade with Confidence. Choose Engraving Nation Today.</p>
                  <div className="space-y-2">
                    <p className="text-sm flex items-center gap-3">
                      <span className="font-bold text-[10px] uppercase tracking-widest opacity-40 text-white">Call Us:</span>
                      <a href="tel:+13322566110" className="hover:text-brand-gold transition-colors font-medium text-white">+1 (332) 256-6110</a>
                    </p>
                    <p className="text-sm flex items-center gap-3">
                      <span className="font-bold text-[10px] uppercase tracking-widest opacity-40 text-white">Email:</span>
                      <a href="mailto:info@engravingnation.store" className="hover:text-brand-gold transition-colors font-medium text-white">info@engravingnation.store</a>
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>
      </div>
    </div>
  );
}
