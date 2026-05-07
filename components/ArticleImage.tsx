'use client';

import { useState } from 'react';
import Image from 'next/image';

const FALLBACK_ARTICLE_IMAGE = '/images/products/san_judas.png';

interface ArticleImageProps {
  src?: string | null;
  alt: string;
  className?: string;
}

export default function ArticleImage({ src, alt, className }: ArticleImageProps) {
  const [currentSrc, setCurrentSrc] = useState(src || FALLBACK_ARTICLE_IMAGE);

  return (
    <Image
      src={currentSrc}
      alt={alt}
      fill
      className={className}
      onError={() => {
        if (currentSrc !== FALLBACK_ARTICLE_IMAGE) {
          setCurrentSrc(FALLBACK_ARTICLE_IMAGE);
        }
      }}
    />
  );
}
