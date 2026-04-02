'use client';

import { useState } from 'react';
import { Mail, CheckCircle2, Loader2, Sparkles } from 'lucide-react';

export default function VIPNewsletter() {
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
      setMessage('Failed to join the nation');
    }
  };

  return (
    <section className="relative py-24 overflow-hidden">
      {/* Background elements */}
      <div className="absolute inset-0 z-0">
        <div className="absolute inset-0 bg-brand-bg/95"></div>
        <div className="absolute inset-0 bg-[url('/grain.png')] opacity-10 mix-blend-overlay"></div>
        <div className="absolute top-0 left-1/4 w-96 h-96 bg-brand-gold/5 blur-[120px] rounded-full"></div>
        <div className="absolute bottom-0 right-1/4 w-96 h-96 bg-brand-gold/5 blur-[120px] rounded-full"></div>
      </div>

      <div className="container mx-auto px-4 relative z-10">
        <div className="max-w-4xl mx-auto glass-card p-10 md:p-20 text-center border-brand-gold/10 hover:border-brand-gold/20 transition-all duration-700">
          <div className="inline-flex items-center gap-2 px-4 py-1 rounded-full bg-brand-gold/10 border border-brand-gold/20 text-brand-gold text-[10px] font-black uppercase tracking-[0.4em] mb-8 animate-pulse">
            <Sparkles size={12} /> Live the Lifestyle
          </div>
          
          <h2 className="text-4xl md:text-6xl font-heading font-black tracking-tighter uppercase italic leading-none mb-6">
            Join the <span className="text-brand-gold">Elite</span>
          </h2>
          
          <p className="text-lg md:text-xl text-white/50 max-w-2xl mx-auto leading-relaxed font-light mb-12">
            Transform your build into a masterpiece. Sign up for first access to <span className="text-white font-bold">new custom drops</span>, exclusive <span className="text-brand-gold font-bold italic">VIP offers</span>, and elite project inspiration.
          </p>

          {status === 'success' ? (
            <div className="animate-in fade-in zoom-in duration-500 flex flex-col items-center">
              <div className="w-20 h-20 rounded-full bg-brand-gold/20 flex items-center justify-center mb-6 border border-brand-gold/30">
                <CheckCircle2 size={40} className="text-brand-gold" />
              </div>
              <h3 className="text-2xl font-bold text-white mb-2 uppercase italic tracking-widest">{message}</h3>
              <p className="text-white/40 text-sm uppercase tracking-[0.2em] font-medium">Check your inbox for your first drop.</p>
            </div>
          ) : (
            <form onSubmit={handleSubmit} className="max-w-lg mx-auto w-full relative group">
              <div className="flex flex-col md:flex-row gap-4">
                <div className="relative flex-1">
                  <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none text-white/20 group-focus-within:text-brand-gold/50 transition-colors">
                    <Mail size={18} />
                  </div>
                  <input
                    required
                    type="email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    placeholder="Enter your email"
                    className="w-full bg-white/5 border border-white/10 rounded-xl pl-12 pr-4 py-4 text-white focus:outline-none focus:border-brand-gold/50 focus:bg-white/[0.08] transition-all text-base placeholder:text-white/20"
                  />
                </div>
                <button
                  disabled={status === 'loading'}
                  type="submit"
                  className="btn-primary py-4 px-10 text-sm uppercase font-black italic tracking-[0.2em] flex items-center justify-center gap-2 group-hover:scale-105 transition-all w-full md:w-auto"
                >
                  {status === 'loading' ? (
                    <>
                      <Loader2 className="animate-spin" size={18} />
                      Joining...
                    </>
                  ) : (
                    'Join the Nation'
                  )}
                </button>
              </div>
              {status === 'error' && (
                <p className="absolute -bottom-8 left-0 right-0 text-red-500 text-[10px] uppercase font-bold tracking-widest animate-shake">
                  {message}
                </p>
              )}
            </form>
          )}

          <div className="mt-16 flex items-center justify-center gap-8 opacity-30 grayscale hover:opacity-100 hover:grayscale-0 transition-all duration-500">
             <div className="text-[10px] uppercase tracking-[0.3em] font-black italic text-white flex flex-col items-center gap-2">
                <span className="text-brand-gold text-sm font-black">5,000+</span>
                Enthusiasts
             </div>
             <div className="w-px h-8 bg-white/20"></div>
             <div className="text-[10px] uppercase tracking-[0.3em] font-black italic text-white flex flex-col items-center gap-2">
                <span className="text-brand-gold text-sm font-black">Daily</span>
                Custom Drops
             </div>
          </div>
        </div>
      </div>
    </section>
  );
}
