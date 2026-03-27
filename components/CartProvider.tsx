'use client';

import React, { createContext, useContext, useState, useEffect } from 'react';

export interface CartItem {
  slug: string;
  name: string;
  price: number;
  image: string;
  quantity: number;
  customText?: string;
  finishType?: string;
}

interface CartContextType {
  items: CartItem[];
  addToCart: (item: CartItem) => void;
  removeFromCart: (slug: string) => void;
  updateQuantity: (slug: string, quantity: number) => void;
  clearCart: () => void;
  isDrawerOpen: boolean;
  setIsDrawerOpen: (isOpen: boolean) => void;
  cartTotal: number;
}

const CartContext = createContext<CartContextType | undefined>(undefined);

export function CartProvider({ children }: { children: React.ReactNode }) {
  const [items, setItems] = useState<CartItem[]>([]);
  const [isDrawerOpen, setIsDrawerOpen] = useState(false);
  const [isMounted, setIsMounted] = useState(false);

  useEffect(() => {
    setIsMounted(true);
    const saved = localStorage.getItem('engraving-cart');
    if (saved) {
      try {
        setItems(JSON.parse(saved));
      } catch (e) {
        console.error('Failed to parse cart');
      }
    }
  }, []);

  useEffect(() => {
    if (isMounted) {
      localStorage.setItem('engraving-cart', JSON.stringify(items));
    }
  }, [items, isMounted]);

  const addToCart = (item: CartItem) => {
    setItems(prev => {
      const existing = prev.find(i => i.slug === item.slug && i.finishType === item.finishType && i.customText === item.customText);
      if (existing) {
        return prev.map(i => i === existing ? { ...i, quantity: i.quantity + item.quantity } : i);
      }
      return [...prev, item];
    });
    setIsDrawerOpen(true);
  };

  const removeFromCart = (slug: string) => {
    setItems(prev => prev.filter(i => i.slug !== slug));
  };

  const updateQuantity = (slug: string, quantity: number) => {
    if (quantity < 1) return;
    setItems(prev => prev.map(i => i.slug === slug ? { ...i, quantity } : i));
  };

  const clearCart = () => setItems([]);
  
  const cartTotal = items.reduce((total, item) => total + (item.price * item.quantity), 0);

  return (
    <CartContext.Provider value={{ items, addToCart, removeFromCart, updateQuantity, clearCart, isDrawerOpen, setIsDrawerOpen, cartTotal }}>
      {children}
    </CartContext.Provider>
  );
}

export function useCart() {
  const context = useContext(CartContext);
  if (context === undefined) {
    throw new Error('useCart must be used within a CartProvider');
  }
  return context;
}
