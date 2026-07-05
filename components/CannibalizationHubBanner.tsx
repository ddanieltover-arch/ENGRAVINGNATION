import Link from 'next/link';
import { Ruler, BookOpen, ShoppingBag } from 'lucide-react';
import { CHEVY_HUB_LINKS, type HubLink } from '@/lib/seo/canonical-clusters';

type Props = {
  /** When set, copy emphasizes the matching make cluster. */
  make?: string;
};

const ICONS: Record<HubLink['cluster'], typeof Ruler> = {
  emblem: BookOpen,
  bowtie: BookOpen,
  fitment: Ruler,
  shop: ShoppingBag,
};

export default function CannibalizationHubBanner({ make }: Props) {
  const isChevy = make === 'Chevrolet';
  const links = CHEVY_HUB_LINKS;

  return (
    <aside
      aria-label="Fitment and buying guides"
      className="mb-12 rounded-2xl border border-brand-gold/25 bg-gradient-to-br from-brand-gold/10 via-black/40 to-black/60 p-6 md:p-8"
    >
      <div className="flex flex-col gap-6 md:flex-row md:items-start md:justify-between">
        <div className="max-w-xl">
          <p className="text-[10px] font-black uppercase tracking-[0.25em] text-brand-gold mb-2">
            Not sure on size?
          </p>
          <h2 className="text-xl md:text-2xl font-heading font-black uppercase italic text-white mb-3">
            Use our fitment guides before you buy
          </h2>
          <p className="text-white/60 text-sm leading-relaxed">
            {isChevy
              ? 'Sizing and style questions belong on our dedicated Chevy guides — not this catalog page. Confirm emblem dimensions first, then return here to order.'
              : 'Most ranking confusion happens when catalog pages compete with fitment guides. Start with the guide that matches your question, then shop the collection.'}
          </p>
        </div>
        <Link
          href="/fitment"
          className="inline-flex shrink-0 items-center gap-2 rounded-full bg-brand-gold px-5 py-3 text-[10px] font-black uppercase tracking-[0.2em] text-black transition hover:bg-white"
        >
          <Ruler className="h-4 w-4" aria-hidden />
          Fitment guide
        </Link>
      </div>

      <ul className="mt-8 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
        {links.map((hub) => {
          const Icon = ICONS[hub.cluster];
          return (
            <li key={hub.href}>
              <Link
                href={hub.href}
                className="group flex h-full flex-col rounded-xl border border-white/10 bg-white/5 p-4 transition hover:border-brand-gold/40 hover:bg-white/10"
              >
                <Icon className="mb-3 h-5 w-5 text-brand-gold" aria-hidden />
                <span className="text-sm font-bold text-white group-hover:text-brand-gold transition-colors">
                  {hub.title}
                </span>
                <span className="mt-1 text-xs text-white/40 leading-snug">{hub.anchor}</span>
              </Link>
            </li>
          );
        })}
      </ul>
    </aside>
  );
}
