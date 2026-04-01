import type { Metadata } from 'next';
import Image from 'next/image';
import Link from 'next/link';
import { notFound } from 'next/navigation';
import { getArticleBySlug, getArticles } from '@/lib/data';
import { ChevronLeft, Calendar, User, Tag, Clock } from 'lucide-react';

interface Props {
  params: Promise<{ slug: string }>;
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = await params;
  const article = await getArticleBySlug(slug);
  
  if (!article) return { title: 'Article Not Found' };
  
  return {
    title: article.seoMetadata?.title || article.title,
    description: article.seoMetadata?.description || article.excerpt,
    openGraph: {
      title: article.title,
      description: article.excerpt,
      images: [article.image || '/images/hero-bg.jpg'],
      type: 'article',
      publishedTime: article.published_at || article.publishedAt,
    },
  };
}

export default async function ArticleDetailPage({ params }: Props) {
  const { slug } = await params;
  const article = await getArticleBySlug(slug);
  const otherArticles = (await getArticles()).filter(a => a.slug !== slug).slice(0, 3);

  if (!article) notFound();

  const publishDate = new Date(article.published_at || article.publishedAt);

  return (
    <article className="min-h-screen bg-brand-bg pb-24">
      {/* Article Schema */}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify({
            "@context": "https://schema.org",
            "@type": "Article",
            "headline": article.title,
            "description": article.excerpt,
            "image": article.image || "/images/hero-bg.jpg",
            "datePublished": article.published_at || article.publishedAt,
            "author": {
              "@type": "Organization",
              "name": "Engraving Nation"
            }
          })
        }}
      />

      {/* Parallax Hero Header */}
      <div className="relative h-[60vh] md:h-[80vh] w-full overflow-hidden">
        <Image 
          src={article.image || '/images/hero-bg.jpg'} 
          alt={article.title}
          fill
          className="object-cover scale-105"
          priority
        />
        <div className="absolute inset-0 bg-linear-to-b from-black/20 via-black/40 to-brand-bg"></div>
        
        <div className="absolute inset-0 flex items-center justify-center">
          <div className="container mx-auto px-4 text-center max-w-4xl">
            <Link 
              href="/articles" 
              className="inline-flex items-center gap-2 text-brand-gold font-black uppercase italic text-[10px] tracking-widest mb-8 hover:translate-x-[-10px] transition-transform"
            >
              <ChevronLeft size={16} />
              Return to Journal
            </Link>
            <div className="inline-block px-4 py-1.5 bg-brand-gold/20 backdrop-blur-md border border-brand-gold/30 rounded-full text-brand-gold text-[9px] font-black uppercase tracking-widest italic mb-6">
              {article.category}
            </div>
            <h1 className="text-4xl md:text-7xl font-heading font-black tracking-tighter uppercase italic leading-none mb-8 text-white balance">
              {article.title}
            </h1>
            
            <div className="flex flex-wrap items-center justify-center gap-6 text-white/40 text-[10px] font-black uppercase tracking-widest italic">
              <span className="flex items-center gap-2"><Calendar size={12} className="text-brand-gold/50" /> {publishDate.toLocaleDateString('en-US', { month: 'long', day: 'numeric', year: 'numeric' })}</span>
              <span className="flex items-center gap-2"><User size={12} className="text-brand-gold/50" /> {article.author || 'Engraving Nation'}</span>
              <span className="flex items-center gap-2"><Clock size={12} className="text-brand-gold/50" /> 12 Min Read</span>
            </div>
          </div>
        </div>
      </div>

      <div className="container mx-auto px-4 -mt-20 relative z-10">
        <div className="max-w-4xl mx-auto">
          {/* Article Main Content */}
          <div className="glass-card p-10 md:p-16 mb-16 shadow-2xl relative overflow-hidden">
            {/* Artistic pattern overlay */}
            <div className="absolute top-0 right-0 w-96 h-96 bg-brand-gold/5 rounded-full blur-3xl -mr-48 -mt-48 opacity-50 pointer-events-none"></div>
            
            <div 
              className="prose prose-invert prose-brand max-w-none 
                prose-h2:font-heading prose-h2:font-black prose-h2:uppercase prose-h2:italic prose-h2:text-3xl prose-h2:tracking-tight prose-h2:mb-8 prose-h2:mt-16
                prose-h3:font-heading prose-h3:font-black prose-h3:uppercase prose-h3:italic prose-h3:text-xl prose-h3:text-brand-gold prose-h3:mb-6 prose-h3:mt-10
                prose-p:text-white/70 prose-p:text-lg prose-p:font-light prose-p:leading-relaxed prose-p:mb-8
                prose-a:text-brand-gold prose-a:no-underline prose-a:font-bold hover:prose-a:underline
                prose-strong:text-white prose-strong:font-bold
                prose-ul:text-white/60 prose-ul:font-light prose-ul:mb-10
                prose-li:mb-2
              "
              dangerouslySetInnerHTML={{ __html: article.content }}
            />
          </div>

          {/* Share & Sidebar (Horizontal for blog) */}
          <div className="flex flex-col md:flex-row justify-between items-center py-12 border-y border-white/5 mb-24 gap-8">
            <div>
              <h4 className="text-brand-gold font-black uppercase italic text-xs tracking-widest mb-2">Engraving Nation Journals</h4>
              <p className="text-white/30 text-sm font-light">Crafting the future of automotive identity.</p>
            </div>
            <div className="flex gap-4">
              <Link href="/products" className="btn-secondary px-8 py-4 text-[10px] uppercase tracking-widest">
                Browse Collection
              </Link>
              <Link href="/gallery" className="btn-primary px-8 py-4 text-[10px] uppercase tracking-widest italic font-black">
                View Gallery
              </Link>
            </div>
          </div>

          {/* Related Articles */}
          {otherArticles.length > 0 && (
            <section>
              <h2 className="text-2xl font-heading font-black uppercase italic text-white mb-12 flex items-center gap-4">
                Recommended <span className="text-brand-gold">Reads</span>
                <div className="h-px bg-brand-gold/20 flex-grow"></div>
              </h2>
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                {otherArticles.map((item: any) => (
                  <Link 
                    key={item.slug} 
                    href={`/articles/${item.slug}`}
                    className="group glass-card p-6 block hover:border-brand-gold/30 transition-all"
                  >
                    <div className="text-brand-gold text-[8px] font-black uppercase italic mb-3 opacity-60">{item.category}</div>
                    <h3 className="text-white font-heading font-black uppercase italic text-lg leading-tight group-hover:text-brand-gold transition-colors line-clamp-2">
                      {item.title}
                    </h3>
                  </Link>
                ))}
              </div>
            </section>
          )}
        </div>
      </div>
    </article>
  );
}
