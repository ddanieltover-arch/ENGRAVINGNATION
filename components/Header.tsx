'use client';

import { useState } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { useRouter } from 'next/navigation';
import { ShoppingCart, Menu, X, Search } from 'lucide-react';
import { useCart } from '@/components/CartProvider';
import LiveSearch from './LiveSearch';

const navLinks = [
  { 
    href: '/products', 
    label: 'Shop',
    dropdown: [
      { href: '/products', label: 'All Products' },
      { href: '/products?make=Chevrolet', label: 'Shop Chevy' },
      { href: '/products?make=GMC', label: 'GMC' },
      { href: '/products?make=Ford', label: 'Ford' },
      { href: '/products?make=Ram', label: 'Ram' },
      { href: '/chevy-emblem', label: 'Chevy Emblem Guide' },
      { href: '/chevy-bowtie', label: 'Chevy Bowtie Guide' },
      { href: '/fitment', label: 'Silverado Fitment' },
    ]
  },
  { href: '/articles', label: 'The Journal' },
  { href: '/gallery', label: 'Gallery' },
  { href: '/services', label: 'Services' },
  { 
    href: '/about', 
    label: 'Our Story',
    dropdown: [
      { href: '/about', label: 'About Us' },
      { href: '/shipping', label: 'Shipping Info' },
      { href: '/refund-and-returns', label: 'Returns Policy' },
    ]
  },
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
          {navLinks.map((link: any) => (
            <div key={link.href} className="relative group/nav">
              <Link
                href={link.href}
                className="text-[10px] font-black tracking-[0.2em] text-white/70 hover:text-brand-gold transition-all duration-300 uppercase italic flex items-center gap-1"
              >
                {link.label}
                {link.dropdown && <span className="text-[8px] transition-transform group-hover/nav:rotate-180">▼</span>}
              </Link>
              
              {link.dropdown && (
                <div className="absolute top-full left-0 pt-4 opacity-0 translate-y-2 pointer-events-none group-hover/nav:opacity-100 group-hover/nav:translate-y-0 group-hover/nav:pointer-events-auto transition-all duration-300">
                  <div className="bg-brand-bg border border-white/5 rounded-xl p-4 min-w-[200px] shadow-2xl backdrop-blur-xl">
                    {link.dropdown.map((sub: any) => (
                      <Link
                        key={sub.href}
                        href={sub.href}
                        className="block py-2 px-4 text-[10px] font-black tracking-[0.2em] text-white/40 hover:text-brand-gold transition-colors uppercase italic border-l border-transparent hover:border-brand-gold/30"
                      >
                        {sub.label}
                      </Link>
                    ))}
                  </div>
                </div>
              )}
            </div>
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

          <div className="hidden md:block">
             <LiveSearch />
          </div>

          <a 
            href="https://www.tiktok.com/@engraving_nation" 
            target="_blank" 
            rel="noopener noreferrer"
            className="p-2 text-white/70 hover:text-[#ff0050] transition-colors relative group"
            title="Follow us on TikTok"
          >
            <svg className="w-5 h-5 group-hover:scale-110 transition-transform" fill="currentColor" viewBox="0 0 24 24">
              <path d="M12.525.02c1.31-.02 2.61-.01 3.91-.02.08 1.53.63 3.09 1.75 4.17 1.12 1.11 2.7 1.62 4.24 1.79v4.03c-1.44-.05-2.89-.35-4.2-.97-.57-.26-1.1-.59-1.62-.93-.01 2.92.01 5.84-.02 8.75-.03 1.4-.54 2.79-1.35 3.94-1.31 1.92-3.58 3.17-5.91 3.21-1.43.08-2.86-.31-4.08-1.03-2.02-1.19-3.44-3.37-3.65-5.71-.02-.5-.03-1-.01-1.49.18-1.9 1.12-3.72 2.58-4.96 1.66-1.44 3.98-2.13 6.15-1.72.02 1.48-.04 2.96-.04 4.44-.9-.32-1.98-.23-2.81.3a2.91 2.91 0 00-1.25 1.7 2.872 2.872 0 00.31 2.03c.4 1.05 1.34 1.91 2.44 2.11 1.03.22 2.17-.04 2.92-.81.67-.62.9-1.55.93-2.43.01-4.63-.01-9.25.01-13.88l-.01.03z"/>
            </svg>
          </a>

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
            <div className="container mx-auto px-4 py-6 flex flex-col gap-2 max-h-[70vh] overflow-y-auto">
              {navLinks.map((link: any) => (
                <div key={link.href} className="flex flex-col">
                  <Link
                    href={link.href}
                    className="py-3 px-4 text-sm font-bold tracking-widest text-white/80 hover:text-brand-gold hover:bg-white/5 rounded-lg transition-all uppercase flex items-center justify-between"
                    onClick={() => !link.dropdown && setMobileMenuOpen(false)}
                  >
                    {link.label}
                  </Link>
                  {link.dropdown && (
                    <div className="pl-8 mb-2 flex flex-col gap-1 border-l-2 border-brand-gold/10 ml-4">
                      {link.dropdown.map((sub: any) => (
                        <Link
                          key={sub.href}
                          href={sub.href}
                          className="py-2 px-4 text-xs font-bold tracking-wider text-white/50 hover:text-brand-gold transition-colors uppercase italic"
                          onClick={() => setMobileMenuOpen(false)}
                        >
                          {sub.label}
                        </Link>
                      ))}
                    </div>
                  )}
                </div>
              ))}
            </div>
          </nav>
        </>
      )}
    </header>
  );
}
