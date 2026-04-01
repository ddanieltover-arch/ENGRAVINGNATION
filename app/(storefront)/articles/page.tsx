import type { Metadata } from 'next';
import Image from 'next/image';
import Link from 'next/link';
import { getArticles } from '@/lib/data';

export const metadata: Metadata = {
  title: 'The Journal | Custom Automotive Guides & Inspiration | Engraving Nation',
  description: 'Deep dives into automotive craftsmanship, installation guides, and custom build inspiration for Chevy, GMC, and Ford enthusiasts.',
};

export default async function ArticlesPage() {
  const articles = await getArticles();

  return (
    <div className="pt-32 pb-24 min-h-screen bg-brand-bg">
      <div className="container mx-auto px-4">
        <header className="text-center mb-24 max-w-3xl mx-auto">
          <div className="inline-block px-3 py-1 rounded-full bg-brand-gold/10 border border-brand-gold/20 text-brand-gold text-[10px] font-bold uppercase tracking-widest mb-6">
            The Journal
          </div>
          <h1 className="text-4xl md:text-7xl font-heading font-black tracking-tighter uppercase italic leading-none mb-8 text-white">
            Engraved <span className="text-brand-gold">Insights</span>
          </h1>
          <p className="text-white/40 text-lg md:text-xl font-light leading-relaxed italic">
            Expert guides, craft stories, and technical deep-dives for the modern automotive enthusiast.
          </p>
        </header>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {articles.map((article: any) => (
            <Link 
              key={article.slug} 
              href={`/articles/${article.slug}`}
              className="group flex flex-col h-full glass-card overflow-hidden transition-all duration-500 hover:border-brand-gold/30 hover:shadow-[0_0_30px_rgba(212,175,55,0.1)]"
            >
              <div className="relative aspect-[16/10] overflow-hidden">
                <div className="absolute inset-0 bg-brand-gold/5 z-10 opacity-0 group-hover:opacity-100 transition-opacity duration-700"></div>
                <Image 
                  src={article.image || '/images/hero-bg.jpg'} 
                  alt={article.title}
                  fill
                  className="object-cover transition-transform duration-1000 group-hover:scale-110"
                />
                <div className="absolute top-4 left-4 z-20">
                  <span className="px-3 py-1 bg-black/80 backdrop-blur-md border border-white/10 rounded-full text-[8px] font-black uppercase tracking-widest text-brand-gold italic">
                    {article.category}
                  </span>
                </div>
              </div>

              <div className="p-8 flex flex-col flex-grow">
                <div className="text-[9px] text-white/30 uppercase tracking-[0.2em] mb-4 flex items-center gap-4">
                  <span>{new Date(article.published_at || article.publishedAt).toLocaleDateString('en-US', { month: 'long', day: 'numeric', year: 'numeric' })}</span>
                  <span className="w-1 h-1 rounded-full bg-brand-gold/40"></span>
                  <span>{article.author || 'Engraving Nation'}</span>
                </div>
                <h2 className="text-2xl font-heading font-black uppercase italic text-white leading-tight mb-4 group-hover:text-brand-gold transition-colors">
                  {article.title}
                </h2>
                <p className="text-white/40 font-light leading-relaxed line-clamp-3 mb-8">
                  {article.excerpt}
                </p>
                <div className="mt-auto flex items-center justify-between">
                  <span className="text-[10px] font-black uppercase tracking-widest text-brand-gold italic border-b border-brand-gold/20 pb-1 group-hover:border-brand-gold transition-all">
                    Read Article
                  </span>
                  <div className="w-8 h-px bg-white/10 group-hover:w-12 group-hover:bg-brand-gold/40 transition-all duration-500"></div>
                </div>
              </div>
            </Link>
          ))}
        </div>

        {articles.length === 0 && (
          <div className="text-center py-32 glass-card border-dashed">
            <p className="text-white/20 italic font-light">New insights coming soon to the Journal.</p>
          </div>
        )}
      </div>
    </div>
  );
}
