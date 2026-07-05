import Link from 'next/link';
import type { SkuKeywordEntry } from '@/lib/seo/sku-keyword-map';

type Props = {
  entry: SkuKeywordEntry;
};

function fitmentLinks(slug: string) {
  if (slug.includes('ford')) {
    return (
      <Link href="/products?make=Ford" className="text-brand-gold hover:underline">
        Shop Ford emblems
      </Link>
    );
  }
  if (slug.includes('gmc')) {
    return (
      <>
        <Link href="/products?make=GMC" className="text-brand-gold hover:underline">
          GMC collection
        </Link>
        {' · '}
        <Link href="/fitment" className="text-brand-gold hover:underline">
          Fitment guide
        </Link>
      </>
    );
  }
  return (
    <>
      <Link href="/chevy-emblem" className="text-brand-gold hover:underline">
        Chevy emblem hub
      </Link>
      {' · '}
      <Link href="/fitment" className="text-brand-gold hover:underline">
        Silverado sizes
      </Link>
    </>
  );
}

export default function ProductSkuKeywordBlock({ entry }: Props) {
  return (
    <aside
      aria-label={entry.nicheHeading}
      className="mb-12 max-w-4xl rounded-xl border border-brand-gold/25 bg-brand-gold/5 p-6"
    >
      <p className="text-[10px] font-black uppercase tracking-[0.2em] text-brand-gold mb-2">
        SKU {entry.sku}
      </p>
      <h2 className="text-xl font-heading font-black uppercase italic text-white mb-3">
        {entry.nicheHeading}
      </h2>
      <p className="text-white/70 text-sm leading-relaxed mb-4">{entry.nicheCopy}</p>
      {entry.secondaryKeywords.length > 0 && (
        <p className="text-white/40 text-xs">
          Also relevant: {entry.secondaryKeywords.join(', ')}
        </p>
      )}
      <p className="mt-4 text-white/50 text-sm">
        Need fitment first? {fitmentLinks(entry.slug)}
      </p>
    </aside>
  );
}
