'use client';

import { useState } from 'react';
import { login } from './actions';
import { Lock, ArrowRight, Loader2 } from 'lucide-react';
import Link from 'next/link';

export default function LoginPage() {
  const [error, setError] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);

  async function handleSubmit(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault();
    setLoading(true);
    setError(null);

    const formData = new FormData(event.currentTarget);
    const result = await login(formData);

    if (result?.error) {
      setError(result.error);
      setLoading(false);
    }
  }

  return (
    <div className="min-h-screen bg-[#0a0a0a] flex items-center justify-center p-4 font-sans antialiased">
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div className="absolute top-[20%] left-[10%] w-[40rem] h-[40rem] bg-brand-gold/5 rounded-full blur-[120px] animate-pulse-slow" />
        <div className="absolute bottom-[20%] right-[10%] w-[35rem] h-[35rem] bg-brand-gold/5 rounded-full blur-[100px] animate-pulse-slow-reverse" />
      </div>

      <div className="w-full max-w-md relative z-10 animate-fade-in">
        <div className="text-center mb-12">
          <Link href="/" className="inline-block mb-8">
             {/* Logo Placeholder */}
             <div className="text-2xl font-heading font-black tracking-[0.2em] italic uppercase">
                ENGRAVING<span className="text-brand-gold">NATION</span>
             </div>
          </Link>
          <h1 className="text-3xl font-heading font-black tracking-tight uppercase italic text-white mb-2">
            Admin <span className="text-brand-gold">Access</span>
          </h1>
          <p className="text-white/40 font-light tracking-wide uppercase text-[10px]">Secure portal login required</p>
        </div>

        <div className="bg-white/[0.03] backdrop-blur-xl border border-white/10 rounded-3xl p-8 md:p-10 shadow-2xl relative overflow-hidden group">
          <div className="absolute top-0 left-0 w-full h-[2px] bg-linear-to-r from-transparent via-brand-gold/50 to-transparent" />
          
          <form onSubmit={handleSubmit} className="space-y-6">
            <div className="space-y-2">
              <label className="text-[10px] font-black uppercase tracking-[0.2em] text-white/40 block ml-1">
                Security Key
              </label>
              <div className="relative group/input">
                <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none text-white/20 group-focus-within/input:text-brand-gold transition-colors">
                  <Lock size={18} />
                </div>
                <input
                  type="password"
                  name="password"
                  required
                  autoFocus
                  className="w-full bg-white/[0.02] border border-white/5 rounded-2xl py-4 pl-12 pr-4 text-white placeholder:text-white/10 focus:outline-none focus:border-brand-gold/30 focus:bg-white/[0.04] transition-all duration-300"
                  placeholder="••••••••••••"
                />
              </div>
            </div>

            {error && (
              <div className="bg-red-500/10 border border-red-500/20 text-red-400 text-xs py-3 px-4 rounded-xl animate-shake">
                {error}
              </div>
            )}

            <button
              type="submit"
              disabled={loading}
              className="w-full group/btn relative overflow-hidden bg-white text-black font-black uppercase tracking-widest text-sm py-4 rounded-2xl hover:bg-brand-gold transition-all duration-500 disabled:opacity-50 flex items-center justify-center gap-3 italic"
            >
              {loading ? (
                <Loader2 className="animate-spin" size={20} />
              ) : (
                <>
                  <span>Unlock System</span>
                  <ArrowRight size={18} className="translate-x-0 group-hover/btn:translate-x-1 transition-transform" />
                </>
              )}
            </button>
          </form>
        </div>

        <p className="text-center mt-8 text-white/20 text-[10px] uppercase tracking-widest font-black">
          Authorized personnel only &copy; {new Date().getFullYear()}
        </p>
      </div>
    </div>
  );
}
