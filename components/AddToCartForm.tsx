'use client';

import { useEffect, useRef, useState } from 'react';
import { useCart } from '@/components/CartProvider';

interface AddToCartFormProps {
  product: {
    slug: string;
    name: string;
    price: number;
    images?: string[];
  };
}

export default function AddToCartForm({ product }: AddToCartFormProps) {
  const { addToCart } = useCart();
  const [finishType, setFinishType] = useState('Gloss Black');
  const [customText, setCustomText] = useState('');
  const [added, setAdded] = useState(false);
  const hasTrackedViewRef = useRef(false);

  useEffect(() => {
    if (hasTrackedViewRef.current || typeof window === 'undefined') return;
    const fireViewItem = () => {
      if (hasTrackedViewRef.current || !(window as any).gtag) return;
      (window as any).gtag('event', 'view_item', {
        currency: 'USD',
        value: product.price,
        items: [
          {
            item_id: product.slug,
            item_name: product.name,
            price: product.price,
            item_variant: finishType,
            quantity: 1,
          },
        ],
      });
      hasTrackedViewRef.current = true;
    };
    fireViewItem();
    const retry = window.setTimeout(fireViewItem, 1500);
    return () => window.clearTimeout(retry);
  }, [finishType, product.name, product.price, product.slug]);

  const handleAddToCart = () => {
    // GA4 Tracking
    if (typeof window !== 'undefined' && (window as any).gtag) {
      (window as any).gtag('event', 'add_to_cart', {
        currency: 'USD',
        value: product.price,
        items: [{
          item_id: product.slug,
          item_name: product.name,
          price: product.price,
          item_variant: finishType,
          quantity: 1
        }]
      });
    }

    addToCart({
      slug: product.slug,
      name: product.name,
      price: product.price,
      image: product.images?.[0] || '',
      quantity: 1,
      finishType,
      customText
    });
    setAdded(true);
    setTimeout(() => setAdded(false), 2000);
  };

  return (
    <div className="space-y-6 mb-8">
      <h3 className="text-xl font-heading font-semibold border-b border-card-border pb-2">Options</h3>
      
      <div>
        <label className="block text-sm font-medium text-text-secondary tracking-wider mb-2">
          FINISH TYPE
        </label>
        <div className="grid grid-cols-2 gap-4">
          <button 
            onClick={() => setFinishType('Gloss Black')}
            className={`rounded-lg py-3 font-medium transition-colors ${finishType === 'Gloss Black' ? 'border-2 border-amber-500 bg-amber-500/10 text-amber-500' : 'border border-card-border hover:border-text-secondary text-text-secondary'}`}
          >
            Gloss Black
          </button>
          <button 
            onClick={() => setFinishType('Chrome')}
            className={`rounded-lg py-3 font-medium transition-colors ${finishType === 'Chrome' ? 'border-2 border-amber-500 bg-amber-500/10 text-amber-500' : 'border border-card-border hover:border-text-secondary text-text-secondary'}`}
          >
            Chrome
          </button>
        </div>
      </div>

      <div>
        <label className="block text-sm font-medium text-text-secondary tracking-wider mb-2 mt-4">
          CUSTOM TEXT (OPTIONAL)
        </label>
        <input 
          type="text" 
          placeholder="Enter text to be engraved..." 
          value={customText}
          onChange={(e) => setCustomText(e.target.value)}
          className="w-full bg-[#1a1a1a] border border-card-border rounded-lg p-3 text-white focus:outline-none focus:border-amber-500 transition-colors"
        />
      </div>

      <button 
        onClick={handleAddToCart} 
        disabled={added}
        className={`btn-primary w-full h-[60px] text-lg mt-8 flex items-center justify-center gap-2 transition-all ${added ? 'bg-emerald-600 border-emerald-600' : ''}`}
      >
        {added ? '✓ Added to Cart' : 'Add to Cart'}
      </button>
    </div>
  );
}
