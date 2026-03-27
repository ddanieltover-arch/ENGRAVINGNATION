'use client';

import Link from 'next/link';

export default function RefundReturnsPage() {
  return (
    <div className="min-h-screen bg-brand-bg text-white/90 pt-24 pb-12">
      <div className="border-b border-brand-border/30 bg-white/1 py-20 mb-12">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl">
            <h1 className="text-5xl md:text-7xl font-heading font-black tracking-tighter uppercase italic leading-none mb-6 text-brand-gold">
              Refund <span className="text-white">& Returns</span>
            </h1>
            <div className="w-32 h-1 bg-brand-gold mb-8"></div>
            <p className="text-white/50 max-w-2xl text-xl font-light leading-relaxed">
              Our policy on custom orders, defects, and satisfaction.
            </p>
          </div>
        </div>
      </div>

      <div className="container mx-auto px-4">
        <div className="max-w-4xl space-y-16 pb-20">
          <section className="animate-slide-up" style={{ animationDelay: '0.1s' }}>
            <h2 className="text-3xl font-heading font-bold mb-6 text-white uppercase italic tracking-tight flex items-center gap-4">
              <span className="w-8 h-8 rounded-full bg-brand-gold/20 flex items-center justify-center text-brand-gold text-lg font-black">01</span>
              Custom Order Policy
            </h2>
            <div className="prose prose-invert prose-lg max-w-none text-white/70 leading-relaxed pl-11">
              <p>
                At Engraving Nation, all of our engraved products are custom-made to order. For this reason, **all sales are final**. We do not accept returns for buyer's remorse or because of incorrect vehicle fitment if the order was placed for the wrong model.
              </p>
              <p className="mt-4 italic text-white/50">
                Please double-check your vehicle specifications before finalizing your purchase.
              </p>
            </div>
          </section>

          <section className="animate-slide-up" style={{ animationDelay: '0.2s' }}>
            <h2 className="text-3xl font-heading font-bold mb-6 text-white uppercase italic tracking-tight flex items-center gap-4">
              <span className="w-8 h-8 rounded-full bg-brand-gold/20 flex items-center justify-center text-brand-gold text-lg font-black">02</span>
              Defects and Damage
            </h2>
            <div className="prose prose-invert prose-lg max-w-none text-white/70 leading-relaxed pl-11 space-y-4">
              <p>
                While custom items are final sale, your satisfaction is our priority. If your item arrives **defective or damaged during shipping**, we will provide a replacement or a refund.
              </p>
              <div className="p-6 rounded-xl bg-white/3 border border-white/10 mt-6">
                <h3 className="text-lg font-bold mb-3 text-white">Reporting Issues:</h3>
                <ul className="list-disc pl-5 space-y-2 text-white/60">
                  <li>Issues must be reported within **7 days of delivery**.</li>
                  <li>Include your **order number** in the subject line.</li>
                  <li>Provide **clear photographs** of the damaged items and the original packaging.</li>
                  <li>Send reports to: <a href="mailto:info@engravingnation.store" className="text-brand-gold hover:underline">info@engravingnation.store</a></li>
                </ul>
              </div>
            </div>
          </section>

          <section className="animate-slide-up" style={{ animationDelay: '0.3s' }}>
            <h2 className="text-3xl font-heading font-bold mb-6 text-white uppercase italic tracking-tight flex items-center gap-4">
              <span className="w-8 h-8 rounded-full bg-brand-gold/20 flex items-center justify-center text-brand-gold text-lg font-black">03</span>
              Refund Process
            </h2>
            <div className="prose prose-invert prose-lg max-w-none text-white/70 leading-relaxed pl-11">
              <p>
                Once your refund request is approved, it will be processed within **5-7 business days**. The credit will be applied to your original method of payment.
              </p>
            </div>
          </section>

          <section className="animate-slide-up pt-8 border-t border-white/10" style={{ animationDelay: '0.4s' }}>
            <h2 className="text-2xl font-heading font-bold mb-4 text-white uppercase italic tracking-tight">
              Customer <span className="text-brand-gold">Support</span>
            </h2>
            <p className="text-white/40 leading-relaxed max-w-2xl">
              We stand by the quality of our craftsmanship. If you have any questions or concerns about your order, our team is always ready to assist you in ensuring a smooth experience from checkout to installation.
            </p>
          </section>
        </div>
      </div>
    </div>
  );
}
