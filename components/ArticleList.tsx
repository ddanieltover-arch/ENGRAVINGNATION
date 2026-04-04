'use client';

import { useState } from 'react';
import Image from 'next/image';
import Link from 'next/link';

interface ArticleListProps {
  initialArticles: any[];
}

export default function ArticleList({ initialArticles }: ArticleListProps) {
  const [activeCategory, setActiveCategory] = useState('All');

  // Extract unique categories and add 'All'
  const categories = ['All', ...Array.from(new Set(initialArticles.map(a => a.category))).filter(Boolean)];

  // Filter articles based on active category
  const filteredArticles = activeCategory === 'All' 
    ? initialArticles 
    : initialArticles.filter(a => a.category === activeCategory);

  return (
    <div>
      {/* Horizontal Tabs */}
      <div className="flex justify-center mb-16">
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
        {filteredArticles.map((article: any) => (
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

      {filteredArticles.length === 0 && (
        <div className="text-center py-32 glass-card border-dashed">
          <p className="text-white/20 italic font-light">New insights coming soon to this category.</p>
        </div>
      )}
    </div>
  );
}
