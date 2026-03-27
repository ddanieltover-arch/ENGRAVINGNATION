'use client';

import { useState } from 'react';
import { Star } from 'lucide-react';

interface Review {
  id: number;
  author: string;
  rating: number;
  date: string;
  comment: string;
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
}

export default function ProductTabs({ description }: ProductTabsProps) {
  const [activeTab, setActiveTab] = useState<'description' | 'reviews'>('description');

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
          Reviews ({mockReviews.length})
        </button>
      </div>

      {/* Tab Content */}
      <div className="min-h-[300px]">
        {activeTab === 'description' ? (
          <div className="glass-card p-8 md:p-12 space-y-6">
            <h3 className="text-xl font-heading font-black tracking-tighter uppercase italic text-brand-gold mb-4">
              Product <span className="text-white">Specifications</span>
            </h3>
            <div className="prose prose-invert max-w-none">
              <p className="text-white/70 leading-relaxed text-lg font-light">
                {description || "No description available for this product."}
              </p>
              <ul className="grid grid-cols-1 md:grid-cols-2 gap-4 mt-8 list-none p-0">
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
            </div>
          </div>
        ) : (
          <div className="space-y-6">
            <div className="flex items-center justify-between mb-8 px-4">
              <div>
                <div className="text-4xl font-heading font-black text-white leading-none mb-2">4.8</div>
                <div className="flex gap-1 text-brand-gold mb-1">
                  {[1, 2, 3, 4, 5].map((i) => <Star key={i} size={16} fill="currentColor" />)}
                </div>
                <div className="text-[10px] text-white/30 uppercase tracking-widest">Based on {mockReviews.length} reviews</div>
              </div>
              <button className="btn-primary py-2 px-6 text-[10px]">Write a Review</button>
            </div>
            
            <div className="grid grid-cols-1 gap-6">
              {mockReviews.map((review) => (
                <div key={review.id} className="glass-card p-6 md:p-8">
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
                  <p className="text-white/60 font-light leading-relaxed italic">"{review.comment}"</p>
                </div>
              ))}
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
