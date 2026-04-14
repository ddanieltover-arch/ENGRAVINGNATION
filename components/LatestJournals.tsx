import Link from 'next/link';
import Image from 'next/image';
import { getArticles } from '@/lib/data';

export default async function LatestJournals() {
  const allArticles = await getArticles();
  const latestArticles = allArticles.slice(0, 3);

  if (latestArticles.length === 0) return null;

  return (
    <section className="mt-40 mb-20">
      <div className="flex flex-col md:flex-row justify-between items-end gap-6 mb-16 px-2">
        <div>
          <h2 className="text-4xl md:text-5xl font-heading font-black tracking-tighter uppercase italic leading-none mb-4">
            The <span className="text-brand-gold">Journal</span>
          </h2>
          <div className="w-24 h-1 bg-brand-gold mb-6"></div>
          <p className="text-white/50 max-w-2xl text-lg font-light leading-relaxed">
            Technical guides, craftsmanship stories, and the latest from the custom automotive world.
          </p>
        </div>
        <Link 
          href="/articles" 
          className="text-brand-gold font-black uppercase tracking-widest text-[10px] italic border-b border-brand-gold/30 pb-2 hover:border-brand-gold transition-all"
        >
          View All Journals
        </Link>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
        {latestArticles.map((article: any) => (
          <Link 
            key={article.slug} 
            href={`/articles/${article.slug}`}
            className="group glass-card overflow-hidden hover:border-brand-gold/30 transition-all duration-500 flex flex-col h-full"
          >
            <div className="relative aspect-16/9">
              <Image 
                src={article.image || '/images/hero-bg.jpg'} 
                alt={article.title}
                fill
                className="object-cover group-hover:scale-105 transition-transform duration-700"
              />
              <div className="absolute top-4 left-4">
                <span className="px-3 py-1 bg-black/80 backdrop-blur-md rounded-full text-[8px] font-black uppercase tracking-widest text-brand-gold italic border border-white/10">
                  {article.category}
                </span>
              </div>
            </div>
            <div className="p-8 flex flex-col flex-grow">
              <span className="text-[10px] text-white/30 uppercase tracking-widest mb-4">
                {new Date(article.published_at || article.publishedAt).toLocaleDateString('en-US', { month: 'long', day: 'numeric', year: 'numeric' })}
              </span>
              <h3 className="text-2xl font-heading font-black uppercase italic text-white leading-tight mb-4 group-hover:text-brand-gold transition-colors">
                {article.title}
              </h3>
              <p className="text-white/40 font-light text-sm line-clamp-3 mb-8 flex-grow">
                {article.excerpt}
              </p>
              <div className="flex items-center justify-between mt-auto">
                <span className="text-[10px] font-black uppercase tracking-widest text-brand-gold italic">Read Article</span>
                <div className="w-8 h-px bg-white/10 group-hover:w-12 group-hover:bg-brand-gold transition-all duration-500"></div>
              </div>
            </div>
          </Link>
        ))}
      </div>
    </section>
  );
}
