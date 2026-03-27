'use client';

import React from 'react';

export default function ShippingPage() {
  return (
    <div className="min-h-screen bg-brand-bg text-white/90 pt-24 pb-12">
      <div className="border-b border-brand-border/30 bg-white/[0.01] py-20 mb-12">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl">
            <h1 className="text-5xl md:text-7xl font-heading font-black tracking-tighter uppercase italic leading-none mb-6 text-brand-gold">
              Shipping <span className="text-white">Policy</span>
            </h1>
            <div className="w-32 h-1 bg-brand-gold mb-8"></div>
            <p className="text-white/50 max-w-2xl text-xl font-light leading-relaxed">
              Everything you need to know about our shipping process, rates, and timelines.
            </p>
          </div>
        </div>
      </div>

      <div className="container mx-auto px-4 max-w-4xl">
        <div className="glass-card p-8 md:p-12 space-y-12 animate-slide-up">
          <section>
            <h2 className="text-3xl font-heading font-bold mb-6 text-brand-gold flex items-center gap-3">
              <span className="w-8 h-8 rounded-full bg-brand-gold/20 flex items-center justify-center text-brand-gold text-lg">01</span>
              Order Processing
            </h2>
            <div className="prose prose-invert prose-lg max-w-none text-white/70 leading-relaxed pl-11">
              <p>
                All orders are shipped only after **full payment confirmation**. Once your payment is verified, our team begins the meticulous process of preparing your custom engraved pieces for shipment.
              </p>
            </div>
          </section>

          <section>
            <h2 className="text-3xl font-heading font-bold mb-6 text-brand-gold flex items-center gap-3">
              <span className="w-8 h-8 rounded-full bg-brand-gold/20 flex items-center justify-center text-brand-gold text-lg">02</span>
              Shipping Rates
            </h2>
            <div className="prose prose-invert prose-lg max-w-none text-white/70 leading-relaxed pl-11 space-y-4">
              <div className="grid md:grid-cols-2 gap-6 mt-8">
                <div className="p-6 rounded-xl bg-white/[0.03] border border-white/10 hover:border-brand-gold/30 transition-colors duration-300">
                  <h3 className="text-xl font-bold mb-2 text-white">Domestic (USA)</h3>
                  <p className="text-brand-gold font-medium mb-1">Free Shipping</p>
                  <p className="text-sm text-white/40">On most orders over $150 USD</p>
                </div>
                <div className="p-6 rounded-xl bg-white/[0.03] border border-white/10 hover:border-brand-gold/30 transition-colors duration-300">
                  <h3 className="text-xl font-bold mb-2 text-white">Standard Shipping</h3>
                  <p className="text-brand-gold font-medium mb-1">Calculated at Checkout</p>
                  <p className="text-sm text-white/40">For all orders under $150 USD</p>
                </div>
              </div>
            </div>
          </section>

          <section>
            <h2 className="text-3xl font-heading font-bold mb-6 text-brand-gold flex items-center gap-3">
              <span className="w-8 h-8 rounded-full bg-brand-gold/20 flex items-center justify-center text-brand-gold text-lg">03</span>
              Delivery Timeframes
            </h2>
            <div className="prose prose-invert prose-lg max-w-none text-white/70 leading-relaxed pl-11 space-y-6">
              <p>
                While we strive to get your items to you as quickly as possible, custom engraving takes time. Once your item is finished and shipped, typical delivery windows are:
              </p>
              <div className="space-y-4">
                <div className="flex items-start gap-4">
                  <div className="w-1.5 h-1.5 rounded-full bg-brand-gold mt-3"></div>
                  <div>
                    <span className="text-white font-bold">United States:</span>
                    <span className="ml-2">Approximately 3 business days after shipment.</span>
                  </div>
                </div>
                <div className="flex items-start gap-4">
                  <div className="w-1.5 h-1.5 rounded-full bg-brand-gold mt-3"></div>
                  <div>
                    <span className="text-white font-bold">International:</span>
                    <span className="ml-2">Approximately 7 business days (timing varies by destination and customs processing).</span>
                  </div>
                </div>
              </div>
            </div>
          </section>

          <section>
            <h2 className="text-3xl font-heading font-bold mb-6 text-brand-gold flex items-center gap-3">
              <span className="w-8 h-8 rounded-full bg-brand-gold/20 flex items-center justify-center text-brand-gold text-lg">04</span>
              Tracking & Damage
            </h2>
            <div className="prose prose-invert prose-lg max-w-none text-white/70 leading-relaxed pl-11 space-y-4">
              <p>
                A tracking number will be provided via email once the order is shipped.
              </p>
              <div className="p-6 rounded-xl bg-brand-gold/5 border border-brand-gold/20 mt-6">
                <p className="text-white/80 italic m-0">
                  <span className="text-brand-gold font-bold uppercase text-sm tracking-widest block mb-2">Important Notice on Damage</span>
                  Items damaged during shipping must be reported within **7 days of delivery**. Please include clear photographs of the damaged items and the original packaging to facilitate a claim.
                </p>
              </div>
            </div>
          </section>

          <section className="pt-8 border-t border-white/10">
            <h2 className="text-3xl font-heading font-bold mb-6 text-white uppercase italic tracking-tight">
              General <span className="text-brand-gold">Terms</span>
            </h2>
            <div className="prose prose-invert prose-lg max-w-none text-white/40 leading-relaxed space-y-4">
              <p>
                Shipping fees are non-refundable unless items are damaged or defective upon arrival. 
              </p>
              <p>
                Please note that orders cannot be canceled once production has begun, as each piece is precision-crafted to order.
              </p>
            </div>
          </section>
        </div>
      </div>
    </div>
  );
}
