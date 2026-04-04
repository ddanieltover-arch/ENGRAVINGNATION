import type { Metadata } from 'next';
import { getArticles } from '@/lib/data';
import ArticleList from '@/components/ArticleList';

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

        <ArticleList initialArticles={articles} />
      </div>
    </div>
  );
}
