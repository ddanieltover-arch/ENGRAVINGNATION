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
            <p className="text-xs text-white/40 leading-relaxed max-w-[200px] mb-6">
              Premium custom-engraved automotive art. Handcrafted for GMC, Chevy, Ford & Ram.
            </p>
            <div className="flex gap-4">
              <a 
                href="https://www.tiktok.com/@engraving_nation" 
                target="_blank" 
                rel="noopener noreferrer"
                className="w-8 h-8 rounded-lg bg-white/5 border border-white/10 flex items-center justify-center text-white/40 hover:text-[#ff0050] hover:border-[#ff0050]/50 transition-all duration-300"
                title="Follow us on TikTok"
              >
                <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M12.525.02c1.31-.02 2.61-.01 3.91-.02.08 1.53.63 3.09 1.75 4.17 1.12 1.11 2.7 1.62 4.24 1.79v4.03c-1.44-.05-2.89-.35-4.2-.97-.57-.26-1.1-.59-1.62-.93-.01 2.92.01 5.84-.02 8.75-.03 1.4-.54 2.79-1.35 3.94-1.31 1.92-3.58 3.17-5.91 3.21-1.43.08-2.86-.31-4.08-1.03-2.02-1.19-3.44-3.37-3.65-5.71-.02-.5-.03-1-.01-1.49.18-1.9 1.12-3.72 2.58-4.96 1.66-1.44 3.98-2.13 6.15-1.72.02 1.48-.04 2.96-.04 4.44-.9-.32-1.98-.23-2.81.3a2.91 2.91 0 00-1.25 1.7 2.872 2.872 0 00.31 2.03c.4 1.05 1.34 1.91 2.44 2.11 1.03.22 2.17-.04 2.92-.81.67-.62.9-1.55.93-2.43.01-4.63-.01-9.25.01-13.88l-.01.03z"/>
                </svg>
              </a>
            </div>
          </div>
          
          <div>
            <h4 className="text-[10px] font-black tracking-[0.2em] uppercase text-brand-gold mb-6">Specialties</h4>
            <ul className="space-y-3">
              <li><Link href="/chevy-emblem" className="text-sm text-white/40 hover:text-brand-gold transition-colors">Chevy Emblem Guide</Link></li>
              <li><Link href="/chevy-bowtie" className="text-sm text-white/40 hover:text-brand-gold transition-colors">Chevy Bowtie Guide</Link></li>
              <li><Link href="/fitment" className="text-sm text-white/40 hover:text-brand-gold transition-colors">Silverado Fitment</Link></li>
              <li><Link href="/products?make=Chevrolet" className="text-sm text-white/40 hover:text-brand-gold transition-colors">Shop Chevy Emblems</Link></li>
              <li><Link href="/products?make=GMC" className="text-sm text-white/40 hover:text-brand-gold transition-colors">Shop GMC Emblems</Link></li>
              <li><Link href="/products?make=Ford" className="text-sm text-white/40 hover:text-brand-gold transition-colors">Shop Ford Emblems</Link></li>
              <li><Link href="/products?make=Ram" className="text-sm text-white/40 hover:text-brand-gold transition-colors">Shop Ram Emblems</Link></li>
              <li><Link href="/articles" className="text-sm text-white/40 hover:text-brand-gold transition-colors">The Journal</Link></li>
              <li><Link href="/gallery" className="text-sm text-white/40 hover:text-brand-gold transition-colors">Build Gallery</Link></li>
            </ul>
          </div>
          <div>
            <h4 className="text-[10px] font-black tracking-[0.2em] uppercase text-brand-gold mb-6">Support</h4>
            <ul className="space-y-4">
              <li><Link href="/about" className="text-sm text-white/40 hover:text-brand-gold transition-colors">Our Story</Link></li>
              <li><Link href="/services" className="text-sm text-white/40 hover:text-brand-gold transition-colors">Services</Link></li>
              <li><Link href="/contact" className="text-sm text-white/40 hover:text-brand-gold transition-colors">Contact Us</Link></li>
              <li><Link href="/glossary" className="text-sm text-white/40 hover:text-brand-gold transition-colors">Automotive Glossary</Link></li>
              <li><Link href="/faq" className="text-sm text-white/40 hover:text-brand-gold transition-colors">FAQ</Link></li>
              <li><Link href="/fitment" className="text-sm text-white/40 hover:text-brand-gold transition-colors">Fitment Guide</Link></li>
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
      if (res.ok) {
        setStatus('success');
        setEmail('');
        setMessage('Welcome to the Elite.');
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
          placeholder="VIP Email Address" 
          disabled={status === 'loading' || status === 'success'}
          className="bg-white/5 border border-white/10 rounded-lg px-4 py-3 text-sm text-white w-full focus:outline-none focus:border-brand-gold transition-colors disabled:opacity-50 placeholder:text-white/20"
          required
        />
      </div>
      <button 
        type="submit" 
        disabled={status === 'loading' || status === 'success'}
        className={`btn-primary w-full py-3 text-[10px] transition-all duration-300 ${status === 'success' ? 'bg-brand-gold border-brand-gold text-black' : ''}`}
      >
        {status === 'loading' ? 'Joining...' : status === 'success' ? 'Welcome to the Elite' : 'Join the Elite Nation'}
      </button>
      {message && (
        <p className={`text-[10px] uppercase tracking-widest text-center mt-2 ${status === 'error' ? 'text-red-500' : 'text-brand-gold font-bold italic animate-pulse'}`}>
          {message}
        </p>
      )}
    </form>
  );
}
