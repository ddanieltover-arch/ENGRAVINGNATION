'use client';

import { useState } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import PolicyModal from './PolicyModal';

export default function Footer() {
  const [isPrivacyOpen, setIsPrivacyOpen] = useState(false);
  const [isTermsOpen, setIsTermsOpen] = useState(false);
  return (
    <footer className="bg-brand-bg border-t border-white/5 mt-auto">
      <div className="container mx-auto px-4 py-12 md:py-16">
        <div className="grid grid-cols-1 md:grid-cols-5 gap-8 mb-12">
          <div className="md:col-span-1">
            <Link href="/" className="inline-block mb-4">
              <Image 
                src="/logo.png" 
                alt="Engraving Nation" 
                width={180} 
                height={40} 
                className="h-8 w-auto object-contain" 
              />
            </Link>
            <p className="text-xs text-white/40 leading-relaxed max-w-[200px]">
              Premium custom-engraved automotive art. Handcrafted for GMC, Chevy, Ford & Ram.
            </p>
          </div>
          
          <div>
            <h4 className="text-[10px] font-black tracking-[0.2em] uppercase text-brand-gold mb-6">Specialties</h4>
            <ul className="space-y-3">
              <li><Link href="/products?make=Chevrolet" className="text-sm text-white/40 hover:text-brand-gold transition-colors">Chevy Emblems</Link></li>
              <li><Link href="/products?make=GMC" className="text-sm text-white/40 hover:text-brand-gold transition-colors">GMC Emblems</Link></li>
              <li><Link href="/products?make=Ford" className="text-sm text-white/40 hover:text-brand-gold transition-colors">Ford Emblems</Link></li>
              <li><Link href="/products?make=Ram" className="text-sm text-white/40 hover:text-brand-gold transition-colors">Ram Emblems</Link></li>
              <li><Link href="/gallery" className="text-sm text-white/40 hover:text-brand-gold transition-colors">Build Gallery</Link></li>
            </ul>
          </div>
          <div>
            <h4 className="text-[10px] font-black tracking-[0.2em] uppercase text-brand-gold mb-6">Support</h4>
            <ul className="space-y-4">
              <li><Link href="/about" className="text-sm text-white/40 hover:text-brand-gold transition-colors">Our Story</Link></li>
              <li><Link href="/services" className="text-sm text-white/40 hover:text-brand-gold transition-colors">Services</Link></li>
              <li><Link href="/contact" className="text-sm text-white/40 hover:text-brand-gold transition-colors">Contact Us</Link></li>
              <li><Link href="/shipping" className="text-sm text-white/40 hover:text-brand-gold transition-colors">Shipping Policy</Link></li>
            </ul>
          </div>

          <div>
            <h4 className="text-[10px] font-black tracking-[0.2em] uppercase text-brand-gold mb-6">Legal</h4>
            <ul className="space-y-4">
              <li><Link href="/refund-and-returns" className="text-sm text-white/40 hover:text-brand-gold transition-colors">Returns & Refunds</Link></li>
              <li><Link href="/payment" className="text-sm text-white/40 hover:text-brand-gold transition-colors">Payment Options</Link></li>
              <li><button onClick={() => setIsPrivacyOpen(true)} className="text-sm text-white/40 hover:text-brand-gold transition-colors cursor-pointer text-left">Privacy Policy</button></li>
              <li><button onClick={() => setIsTermsOpen(true)} className="text-sm text-white/40 hover:text-brand-gold transition-colors cursor-pointer text-left">Terms of Service</button></li>
            </ul>
          </div>

          <div>
            <h4 className="text-[10px] font-black tracking-[0.2em] uppercase text-brand-gold mb-6">Newsletter</h4>
            <p className="text-sm text-white/40 mb-6 font-light">Subscribe for updates on new designs and exclusive offers.</p>
            <NewsletterForm />
          </div>
        </div>
        
        <div className="border-t border-white/5 pt-8 flex flex-col md:flex-row items-center justify-between text-[10px] text-white/20 uppercase tracking-widest">
          <p>&copy; {new Date().getFullYear()} Engraving Nation. All rights reserved.</p>
          <div className="flex gap-8 mt-4 md:mt-0 font-bold">
            <button onClick={() => setIsPrivacyOpen(true)} className="hover:text-brand-gold transition-colors italic uppercase cursor-pointer">Privacy Policy</button>
            <button onClick={() => setIsTermsOpen(true)} className="hover:text-brand-gold transition-colors italic uppercase cursor-pointer">Terms of Service</button>
          </div>
        </div>
      </div>

      {/* Policy Modals */}
      <PolicyModal 
        isOpen={isPrivacyOpen} 
        onClose={() => setIsPrivacyOpen(false)} 
        title="Privacy Policy"
        content={
          <div className="space-y-6 text-white/70 font-light leading-relaxed">
            <p>At Engraving Nation, your privacy is our priority. This policy outlines how we handle your personal information.</p>
            <section className="space-y-4">
              <h3 className="text-white font-bold uppercase text-sm tracking-widest">1. Data Collection</h3>
              <p>We collect essential information to fulfill your custom orders, including your name, email address, shipping address, and vehicle specifications.</p>
            </section>
            <section className="space-y-4">
              <h3 className="text-white font-bold uppercase text-sm tracking-widest">2. Information Usage</h3>
              <p>Your data is used solely for order processing, shipping logistics, and providing updates on your manual craftsmanship build.</p>
            </section>
            <section className="space-y-4">
              <h3 className="text-white font-bold uppercase text-sm tracking-widest">3. Transaction Security</h3>
              <p>By utilizing direct offline payment methods, we minimize the digital footprint of your financial data on our servers. Your transfer information is used only for payment verification.</p>
            </section>
            <section className="space-y-4">
              <h3 className="text-white font-bold uppercase text-sm tracking-widest">4. Third Parties</h3>
              <p>We do not sell your information. Data is only shared with logistics partners (FedEx, UPS, DHL) to ensure delivery of your products.</p>
            </section>
          </div>
        }
      />

      <PolicyModal 
        isOpen={isTermsOpen} 
        onClose={() => setIsTermsOpen(false)} 
        title="Terms of Service"
        content={
          <div className="space-y-6 text-white/70 font-light leading-relaxed">
            <p>By accessing and using Engraving Nation, you agree to the following terms and conditions.</p>
            <section className="space-y-4">
              <h3 className="text-white font-bold uppercase text-sm tracking-widest">1. Custom Goods Policy</h3>
              <p>Every Engraving Nation product is custom-made to order. Once production has initiated (typically within 24 hours of payment verification), orders cannot be cancelled or altered.</p>
            </section>
            <section className="space-y-4">
              <h3 className="text-white font-bold uppercase text-sm tracking-widest">2. Fitment Responsibility</h3>
              <p>Customers are responsible for selecting the correct vehicle make, model, and year during the ordering process. Engraving Nation is not liable for fitment issues resulting from incorrect user selection.</p>
            </section>
            <section className="space-y-4">
              <h3 className="text-white font-bold uppercase text-sm tracking-widest">3. Payment Terms</h3>
              <p>Orders are only processed after successful manual verify of the offline transfer. All quoted prices are in USD.</p>
            </section>
            <section className="space-y-4">
              <h3 className="text-white font-bold uppercase text-sm tracking-widest">4. Intellectual Property</h3>
              <p>All engraving designs, patterns, and visual branding are the exclusive property of Engraving Nation and may not be reproduced without written consent.</p>
            </section>
          </div>
        }
      />
    </footer>
  );
}

function NewsletterForm() {
  const [email, setEmail] = useState('');
  const [status, setStatus] = useState<'idle' | 'loading' | 'success' | 'error'>('idle');
  const [message, setMessage] = useState('');

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!email) return;

    setStatus('loading');
    try {
      const res = await fetch('/api/newsletter', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email }),
      });

      const data = await res.json();
      if (data.success) {
        setStatus('success');
        setEmail('');
        setMessage('Welcome to the Nation!');
      } else {
        setStatus('error');
        setMessage(data.error || 'Something went wrong');
      }
    } catch (err) {
      setStatus('error');
      setMessage('Failed to subscribe');
    }
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-3">
      <div className="relative">
        <input 
          type="email" 
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          placeholder="Your email" 
          disabled={status === 'loading' || status === 'success'}
          className="bg-white/5 border border-white/10 rounded-lg px-4 py-3 text-sm text-white w-full focus:outline-none focus:border-brand-gold transition-colors disabled:opacity-50"
          required
        />
      </div>
      <button 
        type="submit" 
        disabled={status === 'loading' || status === 'success'}
        className={`btn-primary w-full py-3 text-[10px] transition-all duration-300 ${status === 'success' ? 'bg-green-600 border-green-600 text-white' : ''}`}
      >
        {status === 'loading' ? 'Joining...' : status === 'success' ? 'Subscribed!' : 'Join the Nation'}
      </button>
      {message && (
        <p className={`text-[10px] uppercase tracking-widest text-center mt-2 ${status === 'error' ? 'text-red-500' : 'text-brand-gold font-bold italic animate-pulse'}`}>
          {message}
        </p>
      )}
    </form>
  );
}
