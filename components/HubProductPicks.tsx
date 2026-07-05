import Link from 'next/link';
import { getProducts } from '@/lib/data';
import { HUB_PRODUCT_PICKS } from '@/lib/seo/sku-keyword-map';

type Props = {
  hub: keyof typeof HUB_PRODUCT_PICKS;
  title?: string;
};

export default async function HubProductPicks({
  hub,
  title = 'Shop by product — niche fitment SKUs',
}: Props) {
  const picks = HUB_PRODUCT_PICKS[hub];
  if (!picks?.length) return null;

  const products = await getProducts();
  const bySlug = new Map(products.map((p: { slug: string }) => [p.slug, p]));

  return (
    <section aria-label={title} className="mb-16 glass-card p-8">
      <h2 className="text-2xl font-heading font-black uppercase italic text-white mb-2">{title}</h2>
      <p className="text-white/50 text-sm mb-6 max-w-2xl">
        Tier-3 product terms map to these catalog SKUs — confirm fitment on the guide above before ordering.
      </p>
      <ul className="grid grid-cols-1 sm:grid-cols-2 gap-4">
        {picks.map((pick) => {
          const product = bySlug.get(pick.slug) as { name?: string; price?: number; sku?: string } | undefined;
          if (!product) return null;
          return (
            <li key={pick.slug}>
              <Link
                href={`/products/${pick.slug}`}
                className="flex flex-col rounded-xl border border-white/10 bg-white/5 p-5 transition hover:border-brand-gold/40 hover:bg-white/10 h-full"
              >
                <span className="text-[10px] font-mono uppercase tracking-wider text-brand-gold/80">
                  {product.sku ?? pick.slug}
                </span>
                <span className="mt-2 text-sm font-bold text-white">{pick.label}</span>
                <span className="mt-1 text-xs text-white/40">{pick.keyword}</span>
                {product.price != null && (
                  <span className="mt-3 text-brand-gold text-sm font-bold">${product.price.toFixed(2)}</span>
                )}
              </Link>
            </li>
          );
        })}
      </ul>
    </section>
  );
}
