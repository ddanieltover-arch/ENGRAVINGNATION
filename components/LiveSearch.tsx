'use client';

import { useState, useEffect, useRef } from 'react';
import { useRouter } from 'next/navigation';
import { Search, Loader2, X, ArrowRight } from 'lucide-react';
import Image from 'next/image';
import { useDebounce } from '@/hooks/useDebounce';

export default function LiveSearch() {
  const router = useRouter();
  const [query, setQuery] = useState('');
  const [results, setResults] = useState<any[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const [isOpen, setIsOpen] = useState(false);
  const [selectedIndex, setSelectedIndex] = useState(-1);
  const containerRef = useRef<HTMLDivElement>(null);
  
  const debouncedQuery = useDebounce(query, 300);

  useEffect(() => {
    const fetchResults = async () => {
      if (debouncedQuery.length < 2) {
        setResults([]);
        return;
      }

      setIsLoading(true);
      try {
        const res = await fetch(`/api/search?q=${encodeURIComponent(debouncedQuery)}`);
        const data = await res.json();
        if (data.success) {
          setResults(data.results);
          setIsOpen(true);
        }
      } catch (err) {
        console.error('Search failed:', err);
      } finally {
        setIsLoading(false);
      }
    };

    fetchResults();
  }, [debouncedQuery]);

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (containerRef.current && !containerRef.current.contains(event.target as Node)) {
        setIsOpen(false);
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === 'ArrowDown') {
      e.preventDefault();
      setSelectedIndex(prev => (prev < results.length - 1 ? prev + 1 : prev));
    } else if (e.key === 'ArrowUp') {
      e.preventDefault();
      setSelectedIndex(prev => (prev > 0 ? prev - 1 : prev));
    } else if (e.key === 'Enter') {
      if (selectedIndex >= 0) {
        e.preventDefault();
        router.push(`/products/${results[selectedIndex].slug}`);
        setIsOpen(false);
        setQuery('');
      } else if (query.trim()) {
        router.push(`/products?search=${encodeURIComponent(query.trim())}`);
        setIsOpen(false);
        setQuery('');
      }
    } else if (e.key === 'Escape') {
      setIsOpen(false);
    }
  };

  const handleSelect = (slug: string) => {
    router.push(`/products/${slug}`);
    setIsOpen(false);
    setQuery('');
  };

  return (
    <div ref={containerRef} className="relative group/search w-full max-w-sm">
      <div className="relative flex items-center">
        <input
          type="text"
          placeholder="Search GMC, Chevy, Ford..."
          value={query}
          onChange={(e) => {
            setQuery(e.target.value);
            setIsOpen(true);
          }}
          onFocus={() => setIsOpen(query.length >= 2)}
          onKeyDown={handleKeyDown}
          className="bg-white/5 border border-white/10 rounded-full py-2.5 pl-10 pr-10 text-xs text-white/80 w-48 focus:outline-none focus:border-brand-gold/40 focus:w-64 focus:bg-white/[0.08] transition-all duration-500 placeholder:text-white/20 shadow-inner"
        />
        <Search className="absolute left-3.5 top-1/2 -translate-y-1/2 w-3.5 h-3.5 text-white/30 group-focus-within/search:text-brand-gold group-focus-within/search:scale-110 transition-all" />
        
        {query && (
          <button 
            onClick={() => { setQuery(''); setResults([]); }}
            className="absolute right-3 top-1/2 -translate-y-1/2 p-1 text-white/20 hover:text-white transition-colors"
          >
            <X size={14} />
          </button>
        )}
        
        {isLoading && (
          <div className="absolute right-10 top-1/2 -translate-y-1/2">
            <Loader2 className="animate-spin text-brand-gold" size={14} />
          </div>
        )}
      </div>

      {/* Search Results Dropdown */}
      {isOpen && (debouncedQuery.length >= 2) && (
        <div className="absolute top-full left-0 right-0 mt-3 p-2 bg-brand-bg/95 backdrop-blur-xl border border-white/10 rounded-2xl shadow-3xl z-[100] animate-in fade-in slide-in-from-top-2 duration-300 w-80 md:w-96">
          {results.length > 0 ? (
            <div className="space-y-1">
              <div className="px-3 py-2 border-b border-white/5 mb-1">
                <span className="text-[9px] uppercase tracking-[0.2em] font-black text-brand-gold/60">Matching Emblems</span>
              </div>
              {results.map((product, index) => (
                <button
                  key={product.id}
                  onClick={() => handleSelect(product.slug)}
                  onMouseEnter={() => setSelectedIndex(index)}
                  className={`w-full flex items-center gap-4 p-3 rounded-xl transition-all text-left group ${
                    selectedIndex === index ? 'bg-white/5 border border-white/10 shadow-lg' : 'border border-transparent'
                  }`}
                >
                  <div className="relative w-12 h-12 rounded-lg overflow-hidden border border-white/5 bg-white/5 shrink-0">
                    <Image 
                      src={product.images[0] || '/placeholder-emblem.png'} 
                      alt={product.name} 
                      fill 
                      className="object-cover group-hover:scale-110 transition-transform duration-500" 
                    />
                  </div>
                  <div className="flex-1 min-w-0">
                    <h4 className="text-[11px] font-bold text-white truncate uppercase italic tracking-wider mb-0.5">
                      {product.name}
                    </h4>
                    <span className="text-[10px] text-brand-gold font-black italic tracking-widest">
                      ${product.price.toFixed(2)}
                    </span>
                  </div>
                  <ArrowRight className={`w-3 h-3 text-brand-gold transition-all ${
                    selectedIndex === index ? 'opacity-100 translate-x-0' : 'opacity-0 -translate-x-2'
                  }`} />
                </button>
              ))}
              
              <button 
                onClick={() => {
                  router.push(`/products?search=${encodeURIComponent(query.trim())}`);
                  setIsOpen(false);
                }}
                className="w-full mt-2 py-3 px-4 text-center border-t border-white/5 hover:text-brand-gold transition-colors"
              >
                 <span className="text-[9px] uppercase font-black tracking-widest text-white/30 hover:text-brand-gold transition-colors">
                   View all results for "{query}"
                 </span>
              </button>
            </div>
          ) : !isLoading ? (
            <div className="p-10 text-center">
              <Search className="mx-auto w-8 h-8 text-white/5 mb-4" />
              <p className="text-white/40 text-[10px] uppercase tracking-widest font-bold">No custom designs match your search.</p>
              <button 
                onClick={() => {
                   setQuery('');
                   setIsOpen(false);
                }}
                className="mt-4 text-[9px] text-brand-gold uppercase font-black italic border-b border-brand-gold/30 hover:border-brand-gold transition-all"
              >
                Clear Search
              </button>
            </div>
          ) : null}
        </div>
      )}
    </div>
  );
}
