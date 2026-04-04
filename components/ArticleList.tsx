'use client';

import { useState, useMemo } from 'react';
import Image from 'next/image';
import Link from 'next/link';

interface ArticleListProps {
  initialArticles: any[];
}

type SortOrder = 'newest' | 'oldest' | 'alphabetical';

export default function ArticleList({ initialArticles }: ArticleListProps) {
  const [activeCategory, setActiveCategory] = useState('All');
  const [sortOrder, setSortOrder] = useState<SortOrder>('newest');

  // Extract unique categories and add 'All'
  const categories = useMemo(() => {
    return ['All', ...Array.from(new Set(initialArticles.map(a => a.category))).filter(Boolean)];
  }, [initialArticles]);

  // Combined Filtering and Sorting Logic
  const processedArticles = useMemo(() => {
    let result = activeCategory === 'All' 
      ? [...initialArticles] 
      : initialArticles.filter(a => a.category === activeCategory);

    // Apply Sorting
    result.sort((a, b) => {
      if (sortOrder === 'newest') {
        return new Date(b.published_at || b.publishedAt).getTime() - new Date(a.published_at || a.publishedAt).getTime();
      }
      if (sortOrder === 'oldest') {
        return new Date(a.published_at || a.publishedAt).getTime() - new Date(b.published_at || b.publishedAt).getTime();
      }
      return a.title.localeCompare(b.title);
    });

    return result;
  }, [initialArticles, activeCategory, sortOrder]);

  return (
    <div>
      {/* Controls: Sort above Tabs */}
      <div className="flex flex-col items-center gap-8 mb-16">
        {/* Sort Dropdown */}
        <div className="relative group min-w-[220px]">
          <div className="absolute -top-6 left-1/2 -translate-x-1/2 text-[9px] font-black uppercase tracking-[0.2em] text-white/20 whitespace-nowrap">
            Sort Journals By
          </div>
          <select
            value={sortOrder}
            onChange={(e) => setSortOrder(e.target.value as SortOrder)}
            className="w-full bg-white/5 backdrop-blur-xl border border-white/10 rounded-full px-8 py-4 text-[10px] font-black uppercase tracking-widest italic text-white appearance-none cursor-pointer focus:outline-none focus:border-brand-gold/40 transition-all text-center"
          >
            <option value="newest" className="bg-brand-bg text-white">Newest First</option>
            <option value="oldest" className="bg-brand-bg text-white">Oldest First</option>
            <option value="alphabetical" className="bg-brand-bg text-white">Name (A-Z)</option>
          </select>
          <div className="absolute right-6 top-1/2 -translate-y-1/2 pointer-events-none text-brand-gold">
            <svg className="w-3 h-3 fill-current" viewBox="0 0 20 20">
              <path d="M5.293 7.293a1 1 0 011.414 0L10 10.586l3.293-3.293a1 1 0 111.414 1.414l-4 4a1 1 0 01-1.414 0l-4-4a1 1 0 010-1.414z" />
            </svg>
          </div>
        </div>

        {/* Horizontal Tabs */}
        <div className="flex items-center gap-2 p-1.5 bg-white/5 backdrop-blur-xl border border-white/10 rounded-full overflow-x-auto no-scrollbar max-w-full">
          {categories.map((category) => (
            <button
              key={category}
              onClick={() => setActiveCategory(category)}
              className={`px-6 py-2.5 rounded-full text-[10px] font-black uppercase tracking-widest italic transition-all duration-500 whitespace-nowrap ${
                activeCategory === category
                  ? 'bg-brand-gold text-black shadow-[0_0_20px_rgba(212,175,55,0.3)]'
                  : 'text-white/40 hover:text-white hover:bg-white/5'
              }`}
            >
              {category}
            </button>
          ))}
        </div>
      </div>

      {/* Articles Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
        {processedArticles.map((article: any) => (
          <Link 
            key={article.slug} 
            href={`/articles/${article.slug}`}
            className="group flex flex-col h-full glass-card overflow-hidden transition-all duration-700 hover:border-brand-gold/30 hover:shadow-[0_0_30px_rgba(212,175,55,0.1)] animate-in fade-in slide-in-from-bottom-4"
          >
            <div className="relative aspect-16/10 overflow-hidden">
              <div className="absolute inset-0 bg-brand-gold/5 z-10 opacity-0 group-hover:opacity-100 transition-opacity duration-700"></div>
              <Image 
                src={article.image || '/images/hero-bg.jpg'} 
                alt={article.imageAlt || article.title}
                fill
                className="object-cover transition-transform duration-1000 group-hover:scale-110"
              />
              <div className="absolute top-4 left-4 z-20">
                <span className="px-3 py-1 bg-black/80 backdrop-blur-md border border-white/10 rounded-full text-[8px] font-black uppercase tracking-widest text-brand-gold italic">
                  {article.category}
                </span>
              </div>
            </div>

            <div className="p-8 flex flex-col grow">
              <div className="text-[9px] text-white/30 uppercase tracking-[0.2em] mb-4 flex items-center gap-4">
                <span>{new Date(article.published_at || article.publishedAt).toLocaleDateString('en-US', { month: 'long', day: 'numeric', year: 'numeric' })}</span>
                <span className="w-1 h-1 rounded-full bg-brand-gold/40"></span>
                <span>{article.author || 'Engraving Nation Team'}</span>
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

      {processedArticles.length === 0 && (
        <div className="text-center py-32 glass-card border-dashed">
          <p className="text-white/20 italic font-light">New insights coming soon to this category.</p>
        </div>
      )}
    </div>
  );
}
