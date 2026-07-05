import Link from 'next/link';

export type GuideLink = {
  href: string;
  title: string;
  description: string;
};

type Props = {
  title?: string;
  guides: GuideLink[];
};

export default function RelatedGuideLinks({
  title = 'Related fitment & buying guides',
  guides,
}: Props) {
  if (guides.length === 0) return null;

  return (
    <section aria-label={title} className="mb-16 glass-card p-8">
      <h2 className="text-2xl font-heading font-black uppercase italic text-white mb-6">{title}</h2>
      <ul className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {guides.map((guide) => (
          <li key={guide.href}>
            <Link
              href={guide.href}
              className="block rounded-xl border border-white/10 bg-white/5 p-5 transition hover:border-brand-gold/40 hover:bg-white/10"
            >
              <span className="text-sm font-bold text-brand-gold">{guide.title}</span>
              <p className="mt-2 text-sm text-white/50 leading-relaxed">{guide.description}</p>
            </Link>
          </li>
        ))}
      </ul>
    </section>
  );
}
