'use client';

import Link from 'next/link';
import { Home, Phone, ShoppingBag, ShoppingCart } from 'lucide-react';
import { usePathname } from 'next/navigation';
import { useCart } from '@/components/CartProvider';

export default function MobileNav() {
  const pathname = usePathname();
  const { items } = useCart();
  const itemCount = items.reduce((total, item) => total + item.quantity, 0);

  const navItems = [
    { href: '/', icon: Home, label: 'Home' },
    { href: '/products', icon: ShoppingBag, label: 'Shop' },
    { href: '/contact', icon: Phone, label: 'Contact' },
    { href: '/cart', icon: ShoppingCart, label: 'Cart', badge: itemCount },
  ];

  return (
    <div className="fixed bottom-0 left-0 right-0 z-50 md:hidden bg-brand-bg/90 backdrop-blur-xl border-t border-white/5 pb-safe">
      <div className="flex items-center justify-around h-16">
        {navItems.map((item) => {
          const Icon = item.icon;
          const isActive = pathname === item.href;
          
          return (
            <Link 
              key={item.href} 
              href={item.href}
              className={`flex flex-col items-center justify-center w-full h-full gap-1 transition-colors ${
                isActive ? 'text-brand-gold' : 'text-white/40'
              }`}
            >
              <div className="relative">
                <Icon className={`w-5 h-5 ${isActive ? 'scale-110' : ''} transition-transform`} />
                {item.badge !== undefined && item.badge > 0 && (
                  <span className="absolute -top-2 -right-2 w-4 h-4 rounded-full bg-brand-gold text-[8px] font-black text-black flex items-center justify-center border border-brand-bg">
                    {item.badge}
                  </span>
                )}
              </div>
              <span className="text-[9px] font-bold uppercase tracking-widest">{item.label}</span>
            </Link>
          );
        })}
      </div>
    </div>
  );
}
