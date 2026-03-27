'use client';

import { useState } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { useRouter } from 'next/navigation';
import { ShoppingCart, Menu, X, Search } from 'lucide-react';
import { useCart } from '@/components/CartProvider';

const navLinks = [
  { href: '/products', label: 'Shop All' },
  { href: '/products?make=Chevrolet', label: 'Chevy' },
  { href: '/products?make=GMC', label: 'GMC' },
  { href: '/products?make=Ford', label: 'Ford' },
  { href: '/products?make=Ram', label: 'Ram' },
  { href: '/services', label: 'Services' },
  { href: '/about', label: 'Our Story' },
];

export default function Header() {
  const router = useRouter();
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');
  const { items } = useCart();
  const itemCount = items.reduce((total, item) => total + item.quantity, 0);

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    if (searchQuery.trim()) {
      router.push(`/products?search=${encodeURIComponent(searchQuery.trim())}`);
      setSearchQuery('');
    }
  };

  return (
    <header className="sticky top-0 z-50 w-full border-b border-white/5 bg-brand-bg/80 backdrop-blur-md">
      <div className="container mx-auto px-4 h-20 flex items-center justify-between">
        {/* Mobile Menu Toggle */}
        <button
          className="xl:hidden relative z-50 p-2 text-white hover:text-brand-gold transition-colors active:scale-95"
          onClick={(e) => {
            e.preventDefault();
            setMobileMenuOpen(!mobileMenuOpen);
          }}
          aria-label="Toggle menu"
          aria-expanded={mobileMenuOpen}
        >
          {mobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
        </button>

        {/* Logo */}
        <Link href="/" className="flex items-center gap-2 group" onClick={() => setMobileMenuOpen(false)}>
          <Image 
            src="/logo.png" 
            alt="Engraving Nation Official Logo" 
            width={200} 
            height={50} 
            className="h-10 w-auto object-contain" 
          />
        </Link>

        {/* Desktop Navigation */}
        <nav className="hidden xl:flex items-center gap-8">
          {navLinks.map((link) => (
            <Link
              key={link.href}
              href={link.href}
              className="text-[10px] font-black tracking-[0.2em] text-white/70 hover:text-brand-gold transition-all duration-300 uppercase italic"
            >
              {link.label}
            </Link>
          ))}
        </nav>

        {/* Header Actions */}
        <div className="flex items-center gap-2 md:gap-4">
          <Link 
            href="/contact" 
            className="hidden lg:flex items-center px-6 py-2 bg-brand-gold hover:bg-white text-black rounded-full text-[10px] font-black tracking-[0.2em] transition-all duration-300 uppercase italic hover:scale-105 active:scale-95 shadow-[0_0_15px_rgba(212,175,55,0.3)] hover:shadow-[0_0_25px_rgba(212,175,55,0.5)]"
          >
            Contact
          </Link>

          <form onSubmit={handleSearch} className="relative hidden md:flex items-center group">
            <input
              type="text"
              placeholder="Search designs..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="bg-white/5 border border-white/10 rounded-full py-2 pl-10 pr-4 text-xs text-white/70 w-48 focus:outline-none focus:border-brand-gold/30 focus:w-64 transition-all duration-500 placeholder:text-white/20"
            />
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-white/30 group-focus-within:text-brand-gold transition-colors" />
          </form>

          <Link href="/cart" className="p-2 text-white/70 hover:text-brand-gold transition-colors relative group" onClick={() => setMobileMenuOpen(false)}>
            <ShoppingCart className="w-5 h-5 group-hover:scale-110 transition-transform" />
            {itemCount > 0 && (
              <span className="absolute -top-1 -right-1 w-5 h-5 rounded-full bg-brand-gold text-[10px] font-bold text-black flex items-center justify-center border-2 border-brand-bg">
                {itemCount}
              </span>
            )}
          </Link>
        </div>
      </div>

      {/* Mobile Navigation Drawer */}
      {mobileMenuOpen && (
        <>
          {/* Overlay to dim background and close on tap */}
          <div 
            className="xl:hidden fixed inset-0 top-20 z-40 bg-black/60 backdrop-blur-sm"
            onClick={() => setMobileMenuOpen(false)}
            aria-hidden="true"
          />
          <nav className="xl:hidden absolute top-20 left-0 w-full z-50 bg-brand-bg border-b border-white/10 shadow-2xl animate-fade-in origin-top">
            <div className="container mx-auto px-4 py-6 flex flex-col gap-2">
              {navLinks.map((link) => (
                <Link
                  key={link.href}
                  href={link.href}
                  className="py-3 px-4 text-sm font-bold tracking-[0.1em] text-white/80 hover:text-brand-gold hover:bg-white/5 rounded-lg transition-all uppercase"
                  onClick={() => setMobileMenuOpen(false)}
                >
                  {link.label}
                </Link>
              ))}
            </div>
          </nav>
        </>
      )}
    </header>
  );
}
