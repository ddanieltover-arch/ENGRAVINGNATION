'use client';

import Image from 'next/image';
import Link from 'next/link';
import { ShoppingCart, Check } from 'lucide-react';
import { useCart } from '@/components/CartProvider';
import { useState } from 'react';

interface ProductCardProps {
  product: {
    slug: string;
    name: string;
    price: number;
    images: string[];
  };
}

export default function ProductCard({ product }: ProductCardProps) {
  const { addToCart } = useCart();
  const [added, setAdded] = useState(false);

  const handleQuickAdd = (e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();
    addToCart({
      slug: product.slug,
      name: product.name,
      price: product.price,
      image: product.images?.[0] || '',
      quantity: 1,
      finishType: 'Gloss Black',
      customText: ''
    });
    setAdded(true);
    setTimeout(() => setAdded(false), 2000);
  };

  return (
    <div className="glass-card group relative overflow-hidden h-full flex flex-col">
      <Link href={`/products/${product.slug}`} className="block grow">
        <div className="relative aspect-square w-full overflow-hidden bg-black/60">
          {product.images?.[0] ? (
            <Image
              src={product.images[0]}
              alt={`Premium Custom Engraved ${product.name} - Hand-Etched Automotive Art`}
              fill
              className="object-cover transition-transform duration-700 group-hover:scale-110"
              sizes="(max-width: 640px) 50vw, (max-width: 1024px) 33vw, 25vw"
            />
          ) : (
            <div className="flex h-full w-full items-center justify-center text-white/20 italic font-light">
              Image Coming Soon
            </div>
          )}
          
          {/* Quick Add Overlay */}
          <div className="absolute inset-0 bg-brand-bg/60 opacity-0 transition-opacity duration-500 group-hover:opacity-100 flex items-center justify-center backdrop-blur-[2px]">
            <span className="btn-primary transform translate-y-8 opacity-0 transition-all duration-500 group-hover:translate-y-0 group-hover:opacity-100 uppercase tracking-widest text-xs">
              View Product
            </span>
          </div>
        </div>
        
        <div className="p-3 sm:p-6 flex flex-col gap-2 sm:gap-3">
          <h3 className="text-sm font-heading font-medium text-white/90 line-clamp-2 min-h-10 group-hover:text-brand-gold transition-colors tracking-wide">
            {product.name}
          </h3>
          <div className="flex items-center justify-between mt-auto pt-4 border-t border-brand-border/50">
            <div className="flex flex-col">
              <span className="text-base sm:text-lg font-heading font-bold text-brand-gold">
                ${product.price.toFixed(2)}
              </span>
              <span className="hidden sm:block text-[10px] text-white/40 uppercase tracking-widest">Custom Engraved</span>
            </div>
            
            <button 
              onClick={handleQuickAdd}
              disabled={added}
              className={`p-2 sm:p-3 rounded-full border transition-all duration-300 group/btn ${
                added 
                  ? 'bg-emerald-500 border-emerald-500 text-black' 
                  : 'bg-brand-gold/10 border-brand-gold/30 text-brand-gold hover:bg-brand-gold hover:text-black'
              }`}
              title={added ? "Added!" : "Quick Add to Cart"}
            >
              {added ? (
                <Check className="w-4 h-4 sm:w-5 sm:h-5" />
              ) : (
                <ShoppingCart className="w-4 h-4 sm:w-5 sm:h-5 group-hover/btn:scale-110" />
              )}
            </button>
          </div>
        </div>
      </Link>
    </div>
  );
}
