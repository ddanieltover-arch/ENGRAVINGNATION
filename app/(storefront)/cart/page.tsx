'use client';

import { useCart } from '@/components/CartProvider';
import Image from 'next/image';
import Link from 'next/link';
import { Trash2 } from 'lucide-react';

export default function CartPage() {
  const { items, removeFromCart, updateQuantity, cartTotal } = useCart();

  if (items.length === 0) {
    return (
      <div className="min-h-[70vh] flex flex-col items-center justify-center px-4">
        <h1 className="text-4xl font-heading font-bold mb-4">Your Cart is Empty</h1>
        <p className="text-text-secondary mb-8 text-center">Looks like you haven't added any premium engravings yet.</p>
        <Link href="/products" className="btn-primary">
          Start Shopping
        </Link>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-brand-bg text-white/90 pt-32 pb-24">
      <div className="container mx-auto px-4 max-w-6xl">
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 mb-16">
          <div>
            <h1 className="text-5xl md:text-7xl font-heading font-black tracking-tighter uppercase italic leading-none mb-4">
              Your <span className="text-brand-gold">Cart</span>
            </h1>
            <div className="w-24 h-1 bg-brand-gold"></div>
          </div>
          <Link href="/products" className="text-[10px] font-bold uppercase tracking-[0.2em] text-white/40 hover:text-brand-gold transition-colors flex items-center gap-2 mb-2">
            <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M10 19l-7-7m0 0l7-7m-7 7h18"></path></svg>
            Continue Shopping
          </Link>
        </div>
        
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-16">
          {/* Cart Items */}
          <div className="lg:col-span-2 space-y-8">
            {items.map((item, idx) => (
              <div key={`${item.slug}-${idx}`} className="glass-card p-8 flex flex-col sm:flex-row gap-8 relative group overflow-hidden">
                <div className="absolute top-0 left-0 w-1 h-full bg-brand-gold/0 group-hover:bg-brand-gold/40 transition-colors"></div>
                
                <button 
                  onClick={() => removeFromCart(item.slug)}
                  className="absolute top-6 right-6 text-white/20 hover:text-red-500 transition-colors p-2"
                >
                  <Trash2 className="w-5 h-5" />
                </button>
                
                <div className="w-full sm:w-32 h-32 bg-white/2 rounded-2xl relative overflow-hidden shrink-0 border border-white/5">
                  {item.image && (
                    <Image src={item.image} alt={item.name} fill className="object-cover transition-transform duration-700 group-hover:scale-110" />
                  )}
                </div>
                
                <div className="flex flex-col grow justify-between py-2">
                  <div>
                    <Link href={`/products/${item.slug}`} className="text-2xl font-heading font-black tracking-tight uppercase italic hover:text-brand-gold transition-colors pr-12 line-clamp-1">
                      {item.name}
                    </Link>
                    <div className="flex flex-wrap gap-4 mt-3">
                      {item.finishType && (
                        <span className="text-[10px] font-bold uppercase tracking-widest text-white/30 bg-white/5 px-2 py-1 rounded">
                          Finish: <span className="text-white/60">{item.finishType}</span>
                        </span>
                      )}
                      {item.customText && (
                        <span className="text-[10px] font-bold uppercase tracking-widest text-white/30 bg-white/5 px-2 py-1 rounded">
                          Text: <span className="text-brand-gold italic">"{item.customText}"</span>
                        </span>
                      )}
                    </div>
                  </div>
                  
                  <div className="flex items-center justify-between mt-8">
                    <div className="flex items-center gap-4 bg-white/5 rounded-xl border border-white/10 p-1">
                      <button 
                        onClick={() => updateQuantity(item.slug, item.quantity - 1)}
                        className="w-10 h-10 flex items-center justify-center hover:bg-white/10 rounded-lg transition-colors text-white/40 hover:text-white"
                        disabled={item.quantity <= 1}
                      >
                        <span className="text-lg">−</span>
                      </button>
                      <span className="w-6 text-center text-sm font-black italic">{item.quantity}</span>
                      <button 
                        onClick={() => updateQuantity(item.slug, item.quantity + 1)}
                        className="w-10 h-10 flex items-center justify-center hover:bg-white/10 rounded-lg transition-colors text-white/40 hover:text-white"
                      >
                        <span className="text-lg">+</span>
                      </button>
                    </div>
                    <div className="text-right">
                      <div className="text-[10px] font-bold uppercase tracking-widest text-white/20 mb-1">Subtotal</div>
                      <span className="text-2xl font-heading font-black text-brand-gold italic">
                        ${(item.price * item.quantity).toFixed(2)}
                      </span>
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>

          {/* Order Summary */}
          <div className="lg:col-span-1">
            <div className="glass-card p-10 lg:sticky lg:top-32 relative overflow-hidden">
              <div className="absolute top-0 right-0 w-32 h-32 bg-brand-gold/5 blur-3xl rounded-full -mr-16 -mt-16"></div>
              
              <h2 className="text-2xl font-heading font-black tracking-tighter uppercase italic mb-10 border-b border-white/10 pb-6">Payment Details</h2>
              
              <div className="space-y-6 text-xs uppercase tracking-[0.2em] font-bold mb-8">
                <div className="flex justify-between">
                  <span className="text-white/30">Merchandise</span>
                  <span className="text-white/80">${cartTotal.toFixed(2)}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-white/30">Shipping</span>
                  <span className="text-emerald-500">Free</span>
                </div>
                <div className="flex justify-between italic">
                  <span className="text-white/30">Tax</span>
                  <span className="text-white/80">$0.00</span>
                </div>
              </div>


              
              <div className="border-t border-brand-border/30 pt-8 mb-12 flex justify-between items-end">
                <div className="text-xs font-bold uppercase tracking-widest text-white/20 mb-2">Grand Total</div>
                <span className="text-4xl font-heading font-black text-brand-gold italic">${cartTotal.toFixed(2)}</span>
              </div>
              
              <Link href="/checkout" className="btn-primary w-full h-[70px] flex items-center justify-center text-lg uppercase tracking-[0.3em] font-black italic group underline-none decoration-transparent">
                Checkout
                <svg className="w-5 h-5 ml-2 transform group-hover:translate-x-1 transition-transform" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="3" d="M14 5l7 7m0 0l-7 7m7-7H3"></path></svg>
              </Link>
              
              <p className="mt-8 text-[10px] text-center text-white/30 uppercase tracking-widest font-medium"> Secure Offline Payment Flow</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
