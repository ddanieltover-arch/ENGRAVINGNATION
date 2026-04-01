'use client';

import { useState } from 'react';
import { Star } from 'lucide-react';
import ProductCard from '@/components/ProductCard';

interface Review {
  id?: number | string;
  author: string;
  rating: number;
  date: string;
  comment?: string;
  text?: string;
}

const mockReviews: Review[] = [
  {
    id: 1,
    author: "James T.",
    rating: 5,
    date: "March 15, 2024",
    comment: "Absolutely stunning work! The engraving detail on my GMC emblem is far better than I expected. Worth every penny."
  },
  {
    id: 2,
    author: "Sarah M.",
    rating: 5,
    date: "February 28, 2024",
    comment: "The finish is perfect. I went with Gloss Black and it looks incredible on my Silverado. Fast shipping too!"
  },
  {
    id: 3,
    author: "Robert L.",
    rating: 4,
    date: "January 12, 2024",
    comment: "Great quality. The custom text was exactly as requested. Only reason for 4 stars is I wish there were more finish options, but the black is sleek."
  }
];

interface ProductTabsProps {
  description: string;
  reviews?: Review[];
  relatedProducts?: any[];
}

export default function ProductTabs({ description, reviews, relatedProducts = [] }: ProductTabsProps) {
  const [activeTab, setActiveTab] = useState<'description' | 'reviews' | 'related'>('description');
  
  const displayReviews = reviews && reviews.length > 0 ? reviews : mockReviews;
  
  // Calculate average rating if we have reviews
  const averageRating = displayReviews.length > 0 
    ? (displayReviews.reduce((sum, r) => sum + r.rating, 0) / displayReviews.length).toFixed(1)
    : "5.0";

  const formatDescription = (text: string) => {
    if (!text) return <p className="text-white/70 leading-relaxed text-lg font-light">No description available for this product.</p>;
    
    // First, reconstruct broken paragraphs
    const rawLines = text.split('\n').map(l => l.trim()).filter(l => l);
    const mergedLines: string[] = [];

    for (let i = 0; i < rawLines.length; i++) {
      let current = rawLines[i];
      if (current === 'Description' && i === 0) continue;

      while (i + 1 < rawLines.length) {
        const nextLine = rawLines[i + 1];
        const currentEndsWithPunc = /[.:!?]$/.test(current);
        const startsWithEmoji = /^[\u{1F300}-\u{1F9FF}\u{2600}-\u{26FF}\u{2700}-\u{27BF}]/u.test(current);
        
        // Stop merging if current line is a complete sentence or an emoji heading
        if (currentEndsWithPunc || startsWithEmoji) {
          break;
        }

        // Stop merging if current line seems like a valid short title
        if (current.length < 80) {
            const nextStartsWithLower = /^[a-z]/.test(nextLine);
            const endsWithConnector = ['and', 'the', 'or', 'with', 'a', 'an', 'of', 'in', 'to', 'for'].includes(current.split(' ').pop()?.toLowerCase() || '');
            
            if (!nextStartsWithLower && !endsWithConnector) {
                break;
            }
        }
        
        current += ' ' + nextLine;
        i++;
      }
      mergedLines.push(current);
    }

    return mergedLines.map((line, idx) => {
      // 1. Emoji Headings
      const startsWithEmoji = /^[\u{1F300}-\u{1F9FF}\u{2600}-\u{26FF}\u{2700}-\u{27BF}]/u.test(line);
      if (startsWithEmoji) {
        return <h4 key={idx} className="text-brand-gold text-xl font-heading font-black tracking-wide uppercase mt-8 mb-4 border-b border-white/10 pb-2">{line}</h4>;
      }
      
      // 2. Text Headings (Short, Title Cased, No punctuation)
      const isHeadingLike = line.length < 80 && !/[.:!?]$/.test(line) && line.split(' ').filter(w => w.length > 3).every(w => /^[A-Z]/.test(w));
      if (isHeadingLike) {
        return <h4 key={idx} className="text-white text-lg font-heading font-bold uppercase mt-6 mb-2">{line}</h4>;
      }
      
      // 3. Subheading labels (Ends with colon)
      if (line.endsWith(':') && line.length < 80) {
        return <h5 key={idx} className="block text-white font-bold mt-4 mb-2 text-sm tracking-wider uppercase">{line}</h5>;
      }

      // 4. Default Paragraph
      return <p key={idx} className="text-white/70 leading-relaxed text-base font-light mb-4">{line}</p>;
    });
  };

  return (
    <div className="w-full mt-24 animate-slide-up">
      {/* Tab Headers */}
      <div className="flex border-b border-brand-border/30 mb-8 overflow-x-auto scrollbar-hide">
        <button
          onClick={() => setActiveTab('description')}
          className={`pb-4 px-8 text-sm font-heading font-bold uppercase tracking-[0.2em] transition-all relative border-b-2 whitespace-nowrap ${
            activeTab === 'description' 
              ? 'text-brand-gold border-brand-gold' 
              : 'text-white/30 border-transparent hover:text-white/60'
          }`}
        >
          Description
        </button>
        <button
          onClick={() => setActiveTab('reviews')}
          className={`pb-4 px-8 text-sm font-heading font-bold uppercase tracking-[0.2em] transition-all relative border-b-2 whitespace-nowrap ${
            activeTab === 'reviews' 
              ? 'text-brand-gold border-brand-gold' 
              : 'text-white/30 border-transparent hover:text-white/60'
          }`}
        >
          Reviews ({displayReviews.length})
        </button>
        {relatedProducts.length > 0 && (
          <button
            onClick={() => setActiveTab('related')}
            className={`pb-4 px-8 text-sm font-heading font-bold uppercase tracking-[0.2em] transition-all relative border-b-2 whitespace-nowrap ${
              activeTab === 'related' 
                ? 'text-brand-gold border-brand-gold' 
                : 'text-white/30 border-transparent hover:text-white/60'
            }`}
          >
            Recommended
          </button>
        )}
      </div>

      {/* Tab Content */}
      <div className="min-h-[300px]">
        {activeTab === 'description' && (
          <div className="glass-card p-8 md:p-12 space-y-6">
            <h3 className="text-xl font-heading font-black tracking-tighter uppercase italic text-brand-gold mb-8">
              Product <span className="text-white">Specifications</span>
            </h3>
            <div className="prose prose-invert max-w-none">
              <div className="description-formatted">
                {formatDescription(description)}
              </div>
              <ul className="grid grid-cols-1 md:grid-cols-2 gap-4 mt-12 list-none p-0">
                <li className="flex items-center gap-3 text-sm text-white/50 bg-white/5 p-4 rounded-xl border border-white/5">
                  <div className="w-2 h-2 rounded-full bg-brand-gold"></div>
                  <span>High-grade automotive material</span>
                </li>
                <li className="flex items-center gap-3 text-sm text-white/50 bg-white/5 p-4 rounded-xl border border-white/5">
                  <div className="w-2 h-2 rounded-full bg-brand-gold"></div>
                  <span>Weather & heat resistant finish</span>
                </li>
                <li className="flex items-center gap-3 text-sm text-white/50 bg-white/5 p-4 rounded-xl border border-white/5">
                  <div className="w-2 h-2 rounded-full bg-brand-gold"></div>
                  <span>Precision hand-etched engraving</span>
                </li>
                <li className="flex items-center gap-3 text-sm text-white/50 bg-white/5 p-4 rounded-xl border border-white/5">
                  <div className="w-2 h-2 rounded-full bg-brand-gold"></div>
                  <span>Direct replacement for OEM parts</span>
                </li>
              </ul>
              <div className="mt-12 pt-8 border-t border-white/5 flex flex-wrap gap-x-8 gap-y-4">
                <div className="flex flex-col gap-1">
                  <span className="text-[10px] text-white/20 uppercase tracking-widest font-bold">Purchase Protection</span>
                  <a href="/refund-and-returns" className="text-sm text-brand-gold/70 hover:text-brand-gold underline underline-offset-4 transition-colors">Refund & Returns Policy</a>
                </div>
                <div className="flex flex-col gap-1">
                  <span className="text-[10px] text-white/20 uppercase tracking-widest font-bold">Logistics</span>
                  <a href="/shipping" className="text-sm text-brand-gold/70 hover:text-brand-gold underline underline-offset-4 transition-colors">Shipping Information</a>
                </div>
              </div>
            </div>
          </div>
        )}
        
        {activeTab === 'reviews' && (
          <div className="space-y-6">
            <div className="flex items-center justify-between mb-8 px-4">
              <div>
                <div className="text-4xl font-heading font-black text-white leading-none mb-2">{averageRating}</div>
                <div className="flex gap-1 text-brand-gold mb-1">
                  {[1, 2, 3, 4, 5].map((i) => <Star key={i} size={16} fill={i <= Math.round(Number(averageRating)) ? "currentColor" : "none"} />)}
                </div>
                <div className="text-[10px] text-white/30 uppercase tracking-widest">Based on {displayReviews.length} reviews</div>
              </div>
              <button className="btn-primary py-2 px-6 text-[10px]">Write a Review</button>
            </div>
            
            <div className="grid grid-cols-1 gap-6">
              {displayReviews.map((review, idx) => (
                <div key={review.id || idx} className="glass-card p-6 md:p-8">
                  <div className="flex justify-between items-start mb-4">
                    <div>
                      <h4 className="font-bold text-white mb-1">{review.author}</h4>
                      <div className="flex gap-0.5 text-brand-gold">
                        {[1, 2, 3, 4, 5].map((i) => (
                          <Star key={i} size={12} fill={i <= review.rating ? "currentColor" : "none"} />
                        ))}
                      </div>
                    </div>
                    <span className="text-[10px] text-white/20 uppercase tracking-widest">{review.date}</span>
                  </div>
                  {(review.comment || review.text) && (
                    <p className="text-white/60 font-light leading-relaxed italic">"{review.comment || review.text}"</p>
                  )}
                </div>
              ))}
            </div>
          </div>
        )}

        {activeTab === 'related' && (
          <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-8 mt-12 animate-slide-up">
            {relatedProducts.map((p: any) => (
              <ProductCard key={p.slug} product={p} />
            ))}
          </div>
        )}
      </div>
    </div>
  );
}
