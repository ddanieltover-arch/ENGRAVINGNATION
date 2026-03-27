'use client';

import { useState } from 'react';
import { Menu, X } from 'lucide-react';
import Sidebar from './Sidebar';

export default function MobileAdminMenu() {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <>
      <div className="md:hidden fixed top-0 w-full z-40 bg-[#111111] border-b border-[#333333] p-4 flex justify-between items-center">
        <h1 className="text-lg font-outfit font-black text-transparent bg-clip-text bg-linear-to-r from-brand-gold to-[#e6c25e] uppercase tracking-tighter italic">
          Admin Panel
        </h1>
        <button onClick={() => setIsOpen(!isOpen)} className="text-white p-2">
          {isOpen ? <X size={24} /> : <Menu size={24} />}
        </button>
      </div>
      
      {isOpen && (
        <div className="md:hidden fixed inset-0 z-30 pt-16">
          <div className="absolute inset-0 bg-black/80 backdrop-blur-sm" onClick={() => setIsOpen(false)} />
          <div className="relative h-full w-64 max-w-full" onClick={() => setIsOpen(false)}>
             <Sidebar />
          </div>
        </div>
      )}
    </>
  );
}
