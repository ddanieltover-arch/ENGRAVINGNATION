import type { Metadata } from 'next';
import { getArticles } from '@/lib/data';
import ArticleList from '@/components/ArticleList';

export const metadata: Metadata = {
  title: 'The Journal | Automotive Guides & Inspiration',
  description: 'Deep dives into automotive craftsmanship, installation guides, and custom build inspiration for Chevy, GMC, and Ford enthusiasts.',
  alternates: {
    canonical: 'https://engravingnation.store/articles',
  },
};

export default async function ArticlesPage() {
  const articles = await getArticles();

  const breadcrumbJsonLd = {
    '@context': 'https://schema.org',
    '@type': 'BreadcrumbList',
    itemListElement: [
      {
        '@type': 'ListItem',
        position: 1,
        name: 'Home',
        item: 'https://engravingnation.store',
      },
      {
        '@type': 'ListItem',
        position: 2,
        name: 'The Journal',
        item: 'https://engravingnation.store/articles',
      },
    ],
  };

  const itemListJsonLd = {
    '@context': 'https://schema.org',
    '@type': 'ItemList',
    name: 'Engraving Nation Journal Articles',
    description: 'Expert guides, craft stories, and technical deep-dives for the modern automotive enthusiast.',
    numberOfItems: articles.length,
    itemListElement: articles.map((article: any, index: number) => ({
      '@type': 'ListItem',
      position: index + 1,
      url: `https://engravingnation.store/articles/${article.slug}`,
      name: article.title,
    })),
  };

  return (
    <div className="pt-32 pb-24 min-h-screen bg-brand-bg">
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbJsonLd) }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(itemListJsonLd) }}
      />
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

        {/* GEO Answer Capsule */}
        <section id="answer" aria-label="Expert Insights Overview" className="max-w-4xl mx-auto mb-24">
          <div className="p-8 rounded-3xl bg-brand-gold/[0.03] border border-brand-gold/20 backdrop-blur-sm">
            <p className="text-white/80 text-lg leading-relaxed text-center">
              <strong className="text-brand-gold uppercase tracking-widest text-xs block mb-2">Engraved Knowledge:</strong>
              The Engraving Nation Journal is a definitive resource for <strong>custom automotive styling</strong>. We provide technical installation guides, craftsmanship deep-dives, and vehicle-specific reviews for high-end emblems and accessories, helping you master the art of precision vehicle customization.
            </p>
          </div>
        </section>

        <ArticleList initialArticles={articles} />
      </div>
    </div>
  );
}
