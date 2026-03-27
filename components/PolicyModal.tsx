'use client';

import { X } from 'lucide-react';
import { useEffect } from 'react';

interface PolicyModalProps {
  isOpen: boolean;
  onClose: () => void;
  title: string;
  content: React.ReactNode;
}

export default function PolicyModal({ isOpen, onClose, title, content }: PolicyModalProps) {
  // Prevent scrolling when modal is open
  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = 'unset';
    }
    return () => {
      document.body.style.overflow = 'unset';
    };
  }, [isOpen]);

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-100 flex items-center justify-center p-4 sm:p-6 md:p-10">
      {/* Backdrop */}
      <div 
        className="absolute inset-0 bg-black/80 backdrop-blur-sm transition-opacity duration-300"
        onClick={onClose}
      />
      
      {/* Modal Content */}
      <div className="relative w-full max-w-4xl max-h-full glass-card bg-brand-bg border border-white/10 rounded-3xl shadow-2xl overflow-hidden flex flex-col animate-in fade-in zoom-in duration-300">
        {/* Header */}
        <div className="flex items-center justify-between p-6 md:p-8 border-b border-white/5 bg-white/2">
          <h2 className="text-2xl md:text-3xl font-heading font-black tracking-tighter uppercase italic text-brand-gold">
            {title}
          </h2>
          <button 
            onClick={onClose}
            className="p-2 rounded-full hover:bg-white/10 text-white/40 hover:text-white transition-all group"
          >
            <X className="w-6 h-6 group-hover:rotate-90 transition-transform duration-300" />
          </button>
        </div>
        
        {/* Body */}
        <div className="p-8 md:p-12 overflow-y-auto custom-scrollbar grow">
          <div className="prose prose-invert prose-brand max-w-none">
            {content}
          </div>
        </div>
        
        {/* Footer */}
        <div className="p-6 md:p-8 border-t border-white/5 bg-white/1 flex justify-end">
          <button 
            onClick={onClose}
            className="btn-secondary px-8 py-3 text-sm uppercase tracking-widest font-bold italic"
          >
            Close
          </button>
        </div>
      </div>
    </div>
  );
}
