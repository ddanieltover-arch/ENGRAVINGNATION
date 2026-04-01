'use client';

import { useState } from 'react';
import Image from 'next/image';

interface ProductGalleryProps {
  images: string[];
  name: string;
}

export default function ProductGallery({ images, name }: ProductGalleryProps) {
  const [activeImage, setActiveImage] = useState(images[0] || '');

  if (!images || images.length === 0) {
    return (
      <div className="glass-card overflow-hidden bg-white/2 p-8 aspect-square relative flex items-center justify-center rounded-3xl group">
        <div className="text-white/10 italic shrink-0">No Image Available</div>
      </div>
    );
  }

  return (
    <div className="space-y-6 animate-slide-up">
      {/* Main Image Display */}
      <div className="glass-card overflow-hidden bg-white/2 p-8 aspect-square relative flex items-center justify-center rounded-3xl group">
        <div className="absolute inset-0 bg-linear-to-tr from-brand-gold/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-700"></div>
        <div className="relative w-full h-full">
          <Image 
            src={activeImage} 
            alt={`Custom Engraved ${name} - Engraving Nation Product Detail`}
            fill
            className="object-contain p-4 sm:p-8 transition-transform duration-700 group-hover:scale-105"
            sizes="(max-width: 1024px) 100vw, 50vw"
            priority
          />
        </div>
      </div>
      
      {/* Thumbnail Strip */}
      <div className="grid grid-cols-5 gap-3">
        {images.map((img, idx) => (
          <button
            key={idx}
            onClick={() => setActiveImage(img)}
            className={`aspect-square rounded-xl overflow-hidden bg-white/2 border transition-all relative group ${
              activeImage === img 
                ? 'border-brand-gold ring-1 ring-brand-gold/30 shadow-[0_0_15px_rgba(212,160,23,0.3)]' 
                : 'border-white/5 hover:border-white/20'
            }`}
          >
            <Image 
              src={img} 
              alt={`Custom Engraved ${name} Thumb ${idx + 1}`}
              fill
              className={`object-cover p-1 transition-transform duration-500 ${activeImage === img ? 'scale-105' : 'group-hover:scale-110 opacity-60 group-hover:opacity-100'}`}
              sizes="100px"
            />
            <div className={`absolute inset-0 transition-opacity duration-500 ${activeImage === img ? 'bg-brand-gold/5' : 'bg-transparent'}`}></div>
          </button>
        ))}
        
        {/* Fill remaining slots with placeholders if less than 5 images to maintain grid alignment (optional) */}
        {images.length < 5 && Array.from({ length: 5 - images.length }).map((_, i) => (
          <div key={`empty-${i}`} className="aspect-square rounded-xl bg-white/5 border border-white/5 opacity-30"></div>
        ))}
      </div>
    </div>
  );
}
