'use client';

import { useState } from 'react';
import { Phone, Mail, MapPin, Clock, Send, CheckCircle2 } from 'lucide-react';

export default function ContactPage() {
  const [formData, setFormData] = useState({
    firstName: '',
    lastName: '',
    email: '',
    subject: 'Order Status',
    message: ''
  });
  const [status, setStatus] = useState<'idle' | 'loading' | 'success' | 'error'>('idle');
  const [errorHeader, setErrorHeader] = useState('');

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setStatus('loading');
    
    try {
      const res = await fetch('/api/contact', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(formData),
      });
      
      const data = await res.json();
      if (data.success) {
        setStatus('success');
        setFormData({ firstName: '', lastName: '', email: '', subject: 'Order Status', message: '' });
      } else {
        setStatus('error');
        setErrorHeader(data.error || 'Failed to send message');
      }
    } catch (err) {
      setStatus('error');
      setErrorHeader('Network error. Please try again.');
    }
  };

  return (
    <div className="pt-32 pb-24">
      <div className="container mx-auto px-4">
        <div className="max-w-4xl mx-auto">
          {/* ... UI Header stays the same ... */}
          <header className="text-center mb-16 animate-fade-in">
            <div className="inline-block px-3 py-1 rounded-full bg-brand-gold/10 border border-brand-gold/20 text-brand-gold text-[10px] font-bold uppercase tracking-widest mb-6">
              Support Center
            </div>
            <h1 className="text-4xl md:text-6xl font-heading font-black tracking-tighter uppercase italic leading-none mb-6 text-white">
              Contact <span className="text-brand-gold">Engraving Nation</span>
            </h1>
            <p className="text-white/40 text-lg font-light max-w-2xl mx-auto">
              Have questions about a custom project or an existing order? Our team of specialists is here to assist you.
            </p>
          </header>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-16 animate-fade-in">
            {/* ... Contact cards stay the same ... */}
            <div className="glass-card p-8 text-center flex flex-col items-center group">
              <div className="w-12 h-12 rounded-2xl bg-brand-gold/10 flex items-center justify-center text-brand-gold mb-6 group-hover:bg-brand-gold group-hover:text-black transition-all duration-500">
                <Phone size={24} />
              </div>
              <h3 className="text-xs font-black uppercase tracking-widest text-white mb-2 text-[10px]">Call Us</h3>
              <a href="tel:+13322566110" className="text-white/60 hover:text-brand-gold transition-colors font-light text-sm tracking-tight">+1 (332) 256-6110</a>
            </div>

            <div className="glass-card p-8 text-center flex flex-col items-center group">
              <div className="w-12 h-12 rounded-2xl bg-brand-gold/10 flex items-center justify-center text-brand-gold mb-6 group-hover:bg-brand-gold group-hover:text-black transition-all duration-500">
                <Mail size={24} />
              </div>
              <h3 className="text-xs font-black uppercase tracking-widest text-white mb-2 text-[10px]">Email Support</h3>
              <a href="mailto:info@engravingnation.store" className="text-white/60 hover:text-brand-gold transition-colors font-light text-sm tracking-tight">info@engravingnation.store</a>
            </div>

            <div className="glass-card p-8 text-center flex flex-col items-center group">
              <div className="w-12 h-12 rounded-2xl bg-brand-gold/10 flex items-center justify-center text-brand-gold mb-6 group-hover:bg-brand-gold group-hover:text-black transition-all duration-500">
                <Clock size={24} />
              </div>
              <h3 className="text-xs font-black uppercase tracking-widest text-white mb-2 text-[10px]">Business Hours</h3>
              <p className="text-white/60 font-light text-sm tracking-tight">Mon-Fri: 9AM - 6PM EST</p>
            </div>
          </div>

          <div className="glass-card overflow-hidden mb-12 animate-slide-up">
            <div className="p-8 md:p-12">
              <h2 className="text-2xl font-heading font-black uppercase italic mb-8 text-white text-center">Send a <span className="text-brand-gold">Message</span></h2>
              
              {status === 'success' ? (
                <div className="max-w-md mx-auto py-12 text-center space-y-6">
                  <div className="inline-flex items-center justify-center w-20 h-20 rounded-full bg-green-500/10 text-green-500 mb-4 animate-bounce">
                    <CheckCircle2 size={40} />
                  </div>
                  <h3 className="text-2xl font-heading font-black uppercase tracking-tight text-white italic">Message Sent!</h3>
                  <p className="text-white/40 font-light leading-relaxed">
                    Thank you for reaching out. We've received your inquiry and a confirmation has been sent to your email. You'll hear from us shortly.
                  </p>
                  <button 
                    onClick={() => setStatus('idle')}
                    className="btn-primary px-8 py-3 text-[10px]"
                  >
                    Send Another Message
                  </button>
                </div>
              ) : (
                <form onSubmit={handleSubmit} className="space-y-6 max-w-2xl mx-auto">
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div className="space-y-2">
                      <label className="text-[10px] font-bold uppercase tracking-widest text-white/30">First Name</label>
                      <input 
                        required
                        className="w-full bg-white/5 border border-brand-border/20 rounded-xl px-4 py-3 text-white focus:outline-none focus:border-brand-gold transition-colors" 
                        type="text" 
                        placeholder="John"
                        value={formData.firstName}
                        onChange={(e) => setFormData({...formData, firstName: e.target.value})}
                      />
                    </div>
                    <div className="space-y-2">
                      <label className="text-[10px] font-bold uppercase tracking-widest text-white/30">Last Name</label>
                      <input 
                        required
                        className="w-full bg-white/5 border border-brand-border/20 rounded-xl px-4 py-3 text-white focus:outline-none focus:border-brand-gold transition-colors" 
                        type="text" 
                        placeholder="Doe"
                        value={formData.lastName}
                        onChange={(e) => setFormData({...formData, lastName: e.target.value})}
                      />
                    </div>
                  </div>
                  <div className="space-y-2">
                    <label className="text-[10px] font-bold uppercase tracking-widest text-white/30">Email Address</label>
                    <input 
                      required
                      className="w-full bg-white/5 border border-brand-border/20 rounded-xl px-4 py-3 text-white focus:outline-none focus:border-brand-gold transition-colors" 
                      type="email" 
                      placeholder="john@example.com"
                      value={formData.email}
                      onChange={(e) => setFormData({...formData, email: e.target.value})}
                    />
                  </div>
                  <div className="space-y-2">
                    <label className="text-[10px] font-bold uppercase tracking-widest text-white/30">Subject</label>
                    <div className="relative">
                      <select 
                        className="w-full bg-white/5 border border-brand-border/20 rounded-xl px-4 py-3 text-white focus:outline-none focus:border-brand-gold transition-colors appearance-none"
                        value={formData.subject}
                        onChange={(e) => setFormData({...formData, subject: e.target.value})}
                      >
                        <option className="bg-brand-bg">Order Status</option>
                        <option className="bg-brand-bg">Custom Engraving Inquiry</option>
                        <option className="bg-brand-bg">Wholesale/Dealer Inquiry</option>
                        <option className="bg-brand-bg">Other</option>
                      </select>
                      <div className="absolute right-4 top-1/2 -translate-y-1/2 pointer-events-none text-white/20">
                        <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 9l-7 7-7-7"></path></svg>
                      </div>
                    </div>
                  </div>
                  <div className="space-y-2">
                    <label className="text-[10px] font-bold uppercase tracking-widest text-white/30">Message</label>
                    <textarea 
                      required
                      rows={5} 
                      className="w-full bg-white/5 border border-brand-border/20 rounded-xl px-4 py-3 text-white focus:outline-none focus:border-brand-gold transition-colors resize-none" 
                      placeholder="Tell us about your project..."
                      value={formData.message}
                      onChange={(e) => setFormData({...formData, message: e.target.value})}
                    ></textarea>
                  </div>
                  
                  {status === 'error' && (
                    <p className="text-red-500 text-[10px] font-bold uppercase text-center animate-shake">
                      {errorHeader}
                    </p>
                  )}

                  <button 
                    disabled={status === 'loading'}
                    className="btn-primary w-full py-4 text-xs flex items-center justify-center gap-3 group"
                  >
                    {status === 'loading' ? (
                      'Sending Message...'
                    ) : (
                      <>
                        <Send size={16} className="group-hover:translate-x-1 group-hover:-translate-y-1 transition-transform" />
                        Send Message
                      </>
                    )}
                  </button>
                </form>
              )}
            </div>
          </div>

          <div className="glass-card bg-brand-gold/5 p-8 md:p-12 relative overflow-hidden text-center animate-fade-in group">
            <div className="absolute top-0 right-0 w-64 h-64 bg-brand-gold/10 rounded-full blur-3xl -mr-32 -mt-32 group-hover:bg-brand-gold/20 transition-all duration-700"></div>
            <div className="relative z-10 max-w-2xl mx-auto">
              <h3 className="text-xl font-heading font-black uppercase italic mb-6 text-white">Join the <span className="text-brand-gold">Nation</span></h3>
              <p className="text-white/50 font-light leading-relaxed mb-8">
                We are more than just a shop. We are a community of automotive enthusiasts who value craftsmanship and individuality. Follow us for the latest project reveals and behind-the-scenes content.
              </p>
              <div className="flex flex-wrap justify-center gap-8">
                <div className="flex items-center gap-4 text-white/40 group/ig cursor-pointer">
                  <div className="w-8 h-8 rounded-full border border-white/10 flex items-center justify-center group-hover/ig:bg-brand-gold group-hover/ig:text-black transition-all">
                    <span className="text-[10px] font-bold uppercase italic">IG</span>
                  </div>
                  <span className="text-xs font-bold uppercase tracking-widest group-hover/ig:text-brand-gold transition-colors">@engraving_nation</span>
                </div>
                <div className="flex items-center gap-4 text-white/40 group/fb cursor-pointer">
                  <div className="w-8 h-8 rounded-full border border-white/10 flex items-center justify-center group-hover/fb:bg-brand-gold group-hover/fb:text-black transition-all">
                    <span className="text-[10px] font-bold uppercase italic">FB</span>
                  </div>
                  <span className="text-xs font-bold uppercase tracking-widest group-hover/fb:text-brand-gold transition-colors">engravingnation</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
