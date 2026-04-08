'use client';

import { useEffect } from 'react';
import Image from 'next/image';

export default function TikTokFeed() {
  useEffect(() => {
    // Load TikTok embed script
    const script = document.createElement('script');
    script.src = 'https://www.tiktok.com/embed.js';
    script.async = true;
    document.body.appendChild(script);

    return () => {
      document.body.removeChild(script);
    };
  }, []);

  return (
    <section className="py-24 bg-brand-bg relative overflow-hidden">
      <div className="absolute top-0 left-0 w-full h-full bg-[radial-gradient(circle_at_center,_var(--tw-gradient-stops))] from-brand-gold/5 via-transparent to-transparent opacity-50"></div>
      
      <div className="container mx-auto px-4 relative z-10">
        <div className="flex flex-col items-center text-center mb-16">
          <div className="inline-flex items-center gap-3 px-4 py-2 rounded-full bg-[#ff0050]/10 border border-[#ff0050]/20 mb-6 group hover:bg-[#ff0050]/20 transition-all duration-300">
            <svg className="w-5 h-5 text-[#ff0050]" fill="currentColor" viewBox="0 0 24 24">
              <path d="M12.525.02c1.31-.02 2.61-.01 3.91-.02.08 1.53.63 3.09 1.75 4.17 1.12 1.11 2.7 1.62 4.24 1.79v4.03c-1.44-.05-2.89-.35-4.2-.97-.57-.26-1.1-.59-1.62-.93-.01 2.92.01 5.84-.02 8.75-.03 1.4-.54 2.79-1.35 3.94-1.31 1.92-3.58 3.17-5.91 3.21-1.43.08-2.86-.31-4.08-1.03-2.02-1.19-3.44-3.37-3.65-5.71-.02-.5-.03-1-.01-1.49.18-1.9 1.12-3.72 2.58-4.96 1.66-1.44 3.98-2.13 6.15-1.72.02 1.48-.04 2.96-.04 4.44-.9-.32-1.98-.23-2.81.3a2.91 2.91 0 00-1.25 1.7 2.872 2.872 0 00.31 2.03c.4 1.05 1.34 1.91 2.44 2.11 1.03.22 2.17-.04 2.92-.81.67-.62.9-1.55.93-2.43.01-4.63-.01-9.25.01-13.88l-.01.03z"/>
            </svg>
            <span className="text-[10px] font-black uppercase tracking-[0.3em] text-[#ff0050]">Live from the Nation</span>
          </div>
          
          <h2 className="text-4xl md:text-6xl font-heading font-black tracking-tighter uppercase italic leading-none mb-6">
            TikTok <span className="text-brand-gold">Feed</span>
          </h2>
          <p className="text-white/40 uppercase tracking-[0.3em] text-[10px] font-bold mb-12">Follow @engraving_nation for the latest drops and behind the scenes</p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {/* TikTok Embed Profile */}
          <div className="lg:col-span-1 glass-card p-4 flex flex-col items-center justify-center min-h-[500px] border-white/5 hover:border-brand-gold/30 transition-all duration-500">
             <blockquote 
                className="tiktok-embed" 
                cite="https://www.tiktok.com/@engraving_nation" 
                data-unique-id="engraving_nation" 
                data-embed-type="creator" 
                style={{ maxWidth: '780px', minWidth: '288px' }}
              >
              <section>
                <a target="_blank" href="https://www.tiktok.com/@engraving_nation?refer=creator_embed">@engraving_nation</a>
              </section>
            </blockquote>
          </div>

          {/* Featured Video 1 */}
          <div className="glass-card p-4 border-white/5 hover:border-brand-gold/30 transition-all duration-500 flex flex-col items-center justify-center min-h-[500px]">
            <blockquote 
              className="tiktok-embed" 
              cite="https://www.tiktok.com/@engraving_nation" 
              data-unique-id="engraving_nation" 
              data-embed-type="video" 
              style={{ maxWidth: '605px', minWidth: '325px' }}
            >
              <section>
                <a target="_blank" title="@engraving_nation" href="https://www.tiktok.com/@engraving_nation">@engraving_nation</a>
              </section>
            </blockquote>
          </div>

          {/* Call to action card */}
          <div className="glass-card p-10 border-white/5 bg-linear-to-br from-white/[0.02] to-white/[0.05] flex flex-col items-center justify-center text-center relative overflow-hidden group min-h-[500px]">
             <div className="absolute top-0 right-0 w-64 h-64 bg-brand-gold/5 blur-[80px] rounded-full -mr-32 -mt-32"></div>
             <div className="absolute bottom-0 left-0 w-64 h-64 bg-[#ff0050]/5 blur-[80px] rounded-full -ml-32 -mb-32"></div>
             
             <div className="relative z-10">
               <div className="w-24 h-24 mx-auto mb-8 rounded-full bg-white/5 border border-white/10 flex items-center justify-center group-hover:scale-110 transition-transform duration-500">
                  <svg className="w-12 h-12 text-white/80" fill="currentColor" viewBox="0 0 24 24">
                    <path d="M12.525.02c1.31-.02 2.61-.01 3.91-.02.08 1.53.63 3.09 1.75 4.17 1.12 1.11 2.7 1.62 4.24 1.79v4.03c-1.44-.05-2.89-.35-4.2-.97-.57-.26-1.1-.59-1.62-.93-.01 2.92.01 5.84-.02 8.75-.03 1.4-.54 2.79-1.35 3.94-1.31 1.92-3.58 3.17-5.91 3.21-1.43.08-2.86-.31-4.08-1.03-2.02-1.19-3.44-3.37-3.65-5.71-.02-.5-.03-1-.01-1.49.18-1.9 1.12-3.72 2.58-4.96 1.66-1.44 3.98-2.13 6.15-1.72.02 1.48-.04 2.96-.04 4.44-.9-.32-1.98-.23-2.81.3a2.91 2.91 0 00-1.25 1.7 2.872 2.872 0 00.31 2.03c.4 1.05 1.34 1.91 2.44 2.11 1.03.22 2.17-.04 2.92-.81.67-.62.9-1.55.93-2.43.01-4.63-.01-9.25.01-13.88l-.01.03z"/>
                  </svg>
               </div>
               
               <h3 className="text-3xl font-heading font-black uppercase italic italic mb-6">Join the <span className="text-brand-gold">Movement</span></h3>
               <p className="text-white/40 text-sm leading-relaxed mb-10 max-w-xs mx-auto font-light">
                 Witness the artistry in motion. Our TikTok feed captures the raw process of hand-etched perfection.
               </p>
               
               <a 
                 href="https://www.tiktok.com/@engraving_nation" 
                 target="_blank" 
                 rel="noopener noreferrer"
                 className="inline-block px-10 py-4 rounded-full bg-white text-black font-black uppercase tracking-widest text-[10px] italic hover:scale-105 transition-all shadow-2xl"
               >
                 Follow @engraving_nation
               </a>
             </div>
          </div>
        </div>
      </div>
    </section>
  );
}
