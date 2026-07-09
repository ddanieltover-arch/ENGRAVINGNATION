import { getProducts } from '@/lib/data';
import type { Metadata } from 'next';
import Link from 'next/link';

import VehicleSelector from '@/components/VehicleSelector';
import ProductCard from '@/components/ProductCard';
import CannibalizationHubBanner from '@/components/CannibalizationHubBanner';
import HubProductPicks from '@/components/HubProductPicks';
import { SITE_URL } from '@/lib/seo/constants';

const MAKE_META: Record<string, { title: string; description: string; h1: string; h1Accent: string; intro: string }> = {
  Chevrolet: {
    title: 'Shop Custom Chevy Emblems & Badges for Sale',
    description:
      'Buy custom Chevy emblems and Chevrolet custom badges with verified year-range fitment. Hand-etched replacements for Silverado, Tahoe, and truck builds — order after confirming size in our fitment guides.',
    h1: 'Shop Custom Chevy',
    h1Accent: 'Emblems',
    intro:
      'This is the commercial collection for custom Chevy emblems and Chevrolet custom badges. Every listing is hand-etched—not a vinyl overlay—with fitment notes on each product page. For sizing, styles, and symbol vs emblem questions, use our dedicated guides first; then return here to purchase.',
  },
  GMC: {
    title: 'Engraved GMC Emblems & High Country Badges',
    description:
      'Shop engraved GMC emblems for Sierra, Yukon, and High Country builds. Hand-etched front badges with trim-specific fitment — SKU EN-XY3C3W and more.',
    h1: 'Engraved GMC',
    h1Accent: 'Emblems',
    intro:
      'Commercial home for engraved gmc emblem and high country badges searches. Hand-etched GMC front badges for Sierra and Yukon — confirm year and trim before ordering.',
  },
  Ford: {
    title: 'Custom Ford Emblems & Engraved Badges',
    description:
      'Shop custom Ford emblems and engraved F-150 badges. Hand-etched automotive upgrades with fitment guidance for Ford truck builds.',
    h1: 'Custom Ford',
    h1Accent: 'Emblems',
    intro:
      'Browse engraved Ford emblems and custom badges for F-150 and Ford truck builds. Precision-etched detail, durable finishes, and fitment notes on every product page.',
  },
  RAM: {
    title: 'Custom RAM Emblems & Engraved Truck Badges',
    description:
      'Shop custom RAM emblems and engraved truck badges. Hand-etched upgrades for RAM 1500 and HD builds with durable OEM-style fitment.',
    h1: 'Custom RAM',
    h1Accent: 'Emblems',
    intro:
      'Discover engraved RAM emblems and custom truck badges with hand-etched depth and long-lasting finishes. Built for RAM 1500 and heavy-duty platform upgrades.',
  },
};

function isMakeOnlyFilter(params: Record<string, string | string[] | undefined>) {
  const make = params.make as string | undefined;
  if (!make || !MAKE_META[make]) return false;
  return !['category', 'model', 'year', 'search'].some((key) => !!params[key]);
}

export async function generateMetadata({
  searchParams,
}: {
  searchParams: Promise<{ [key: string]: string | string[] | undefined }>;
}): Promise<Metadata> {
  const params = await searchParams;
  const makeOnly = isMakeOnlyFilter(params);
  const make = params.make as string | undefined;
  const hasOtherFilters = ['category', 'model', 'year', 'search'].some((key) => !!params[key]);

  if (makeOnly && make && MAKE_META[make]) {
    const meta = MAKE_META[make];
    const canonical = `https://engravingnation.store/products?make=${encodeURIComponent(make)}`;
    return {
      title: meta.title,
      description: meta.description,
      alternates: { canonical },
      robots: { index: true, follow: true },
      keywords: [
        'custom chevy emblems',
        'custom chevy badges',
        'chevrolet custom emblems',
        'chevy emblems for sale',
        'chevy truck badges',
        'emblems chevy',
      ],
      openGraph: {
        title: meta.title,
        description: meta.description,
        url: canonical,
      },
    };
  }

  return {
    title: 'Shop Custom Engraved Truck Emblems & Badges',
    description:
      'Browse hand-engraved emblems, badges, and mirror caps for Chevrolet, GMC, Ford, and RAM. Filter by make or confirm fitment in our Chevy and Silverado guides before you buy.',
    alternates: {
      canonical: `${SITE_URL}/products`,
    },
    robots: hasOtherFilters || (params.make && !makeOnly)
      ? { index: false, follow: true }
      : { index: true, follow: true },
    keywords: [
      'custom truck emblems',
      'engraved emblems',
      'automotive badges',
      'custom mirror caps',
      'hand engraved badges',
      'truck emblem shop',
    ],
    openGraph: {
      title: 'Shop Custom Engraved Truck Emblems',
      description:
        'Full catalog of hand-engraved emblems and badges for Chevy, GMC, Ford, and RAM — with fitment guides for sizing help.',
      url: `${SITE_URL}/products`,
    },
  };
}

// Opt out of caching so URL search params are read fresh if needed
export const dynamic = 'force-dynamic';
export const revalidate = 0;

export default async function ProductsPage({ 
  searchParams 
}: { 
  searchParams: Promise<{ [key: string]: string | string[] | undefined }> 
}) {
  const params = await searchParams;
  const categoryFilter = params.category as string | undefined;
  const makeFilter = params.make as string | undefined;
  const modelFilter = params.model as string | undefined;
  const yearFilter = params.year as string | undefined;
  
  let products = await getProducts();
  const allProducts = [...products]; // keep a copy for the ItemList schema


  // Comprehensive filtering
  if (categoryFilter || makeFilter || modelFilter || yearFilter) {
    products = products.filter((p: any) => {
      let matches = true;
      
      const pCategories = p.categories || [];
      const pFitments = p.vehicle_fitment || [];

      if (categoryFilter) {
        matches = matches && pCategories.some((c: string) => 
          c.toLowerCase().includes((categoryFilter as string).toLowerCase())
        );
      }
      
      // Match on category name (e.g. "chevy emblems") and vehicle_fitment
      if (makeFilter) {
        const makeAliases: Record<string, string[]> = {
          'chevrolet': ['chevy'],
          'chevy': ['chevrolet'],
          'gmc': ['gmc'],
          'ford': ['ford'],
          'ram': ['ram', 'dodge'],
          'dodge': ['dodge', 'ram'],
        };
        const filterLower = (makeFilter as string).toLowerCase();
        const aliases = makeAliases[filterLower] || [];
        const allTerms = [filterLower, ...aliases];

        matches = matches && (
          allTerms.some(term => pCategories.some((c: string) => c.toLowerCase().includes(term))) ||
          pFitments.some((f: any) => f?.make && allTerms.includes(f.make.toLowerCase()))
        );
      }

      if (modelFilter) {
        const modelLower = (modelFilter as string).toLowerCase();
        matches = matches && (
          p.name.toLowerCase().includes(modelLower) ||
          pFitments.some((f: any) => f?.model && f.model.toLowerCase() === modelLower)
        );
      }
      
      return matches;
    });
  }

  const showCannibalizationBanner = !categoryFilter && !modelFilter && !yearFilter;

  const itemListJsonLd = {
    '@context': 'https://schema.org',
    '@type': 'ItemList',
    name: makeFilter === 'Chevrolet' ? 'Custom Chevy Emblems for Sale' : 'Custom Engraved Automotive Emblems',
    description:
      makeFilter === 'Chevrolet'
        ? 'Commercial catalog of custom Chevy emblems and Chevrolet badges. Sizing guides live at /chevy-emblem, /chevy-bowtie, and /fitment.'
        : 'Hand-engraved emblems and mirror caps for Chevy, GMC, Ford, and RAM trucks.',
    numberOfItems: allProducts.length,
    itemListElement: allProducts.slice(0, 20).map((product: any, index: number) => ({
      '@type': 'ListItem',
      position: index + 1,
      url: `https://engravingnation.store/products/${product.slug}`,
      name: product.name,
    })),
  };

  const breadcrumbJsonLd = {
    '@context': 'https://schema.org',
    '@type': 'BreadcrumbList',
    itemListElement: [
      { '@type': 'ListItem', position: 1, name: 'Home', item: 'https://engravingnation.store' },
      { '@type': 'ListItem', position: 2, name: 'Products', item: 'https://engravingnation.store/products' },
    ],
  };

  const makeMeta = makeFilter && MAKE_META[makeFilter] ? MAKE_META[makeFilter] : null;

  return (
    <div className="min-h-screen bg-brand-bg text-black/90 pt-24 pb-12">
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(itemListJsonLd) }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbJsonLd) }}
      />
      {/* Page Header */}
      <div className="border-b border-brand-border/30 bg-black/5 py-20 mb-12">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl">
            <h1 className="text-5xl md:text-7xl font-heading font-black tracking-tighter uppercase italic leading-none mb-6">
              {categoryFilter ? (
                <>{categoryFilter} <span className="text-brand-gold">Collection</span></>
              ) : makeMeta ? (
                <>{makeMeta.h1} <span className="text-brand-gold">{makeMeta.h1Accent}</span></>
              ) : makeFilter ? (
                <>Looking for Custom <span className="text-brand-gold">{makeFilter} Emblems?</span></>
              ) : (
                <>What Custom Emblem Are You <span className="text-brand-gold">Looking For?</span></>
              )}
            </h1>
            <div className="w-32 h-1 bg-brand-gold mb-8"></div>
            {makeMeta ? (
              <div className="max-w-3xl space-y-6">
                <p className="text-white text-xl font-light leading-relaxed">{makeMeta.intro}</p>
                {makeFilter === 'Chevrolet' && (
                  <p className="text-white/60 text-base font-light leading-relaxed">
                    Need fitment help first? Read our{' '}
                    <Link href="/chevy-emblem" className="text-brand-gold hover:underline">Chevy emblem fitment guide</Link>,{' '}
                    <Link href="/chevy-bowtie" className="text-brand-gold hover:underline">Chevy bowtie size chart</Link>, or{' '}
                    <Link href="/fitment" className="text-brand-gold hover:underline">Silverado emblem size database</Link>{' '}
                    before choosing your custom chevy emblems.
                  </p>
                )}
              </div>
            ) : (
              <p className="text-white max-w-2xl text-xl font-light leading-relaxed">
                Browse our full catalog of precision hand-engraved emblems, badges, and mirror caps for Chevy, GMC, Ford, and RAM trucks.{' '}
                <Link href="/fitment" className="text-brand-gold hover:underline">Not sure on emblem size?</Link>{' '}
                Start with the fitment guide, then filter by make below.
              </p>
            )}
          </div>
        </div>
      </div>

      <div className="container mx-auto px-4">
        <div className="mb-20 animate-slide-up">
          <VehicleSelector />
        </div>

        {showCannibalizationBanner && (
          <CannibalizationHubBanner make={makeFilter} />
        )}

        {makeFilter === 'Chevrolet' && !categoryFilter && (
          <section
            id="custom-chevy-emblems-shop"
            aria-label="Custom Chevy emblems and badges"
            className="mb-12 rounded-2xl border border-white/10 bg-white/5 p-8"
          >
            <h2 className="text-2xl font-heading font-black uppercase italic text-white mb-4">
              Custom Chevy Emblems &amp; Chevrolet Custom Emblems
            </h2>
            <p className="text-white/70 leading-relaxed mb-6 max-w-3xl">
              This page is the commercial home for <strong className="text-white">custom chevy emblems</strong> and{' '}
              <strong className="text-white">chevrolet custom emblems</strong> — hand-etched replacements with fitment
              notes on every SKU. Sizing and style questions belong on our guides first:{' '}
              <Link href="/chevy-emblem" className="text-brand-gold hover:underline">Chevy emblem hub</Link>,{' '}
              <Link href="/chevy-bowtie" className="text-brand-gold hover:underline">bowtie guide</Link>,{' '}
              <Link href="/fitment" className="text-brand-gold hover:underline">Silverado fitment</Link>.
            </p>
            <h3 className="text-lg font-heading font-black uppercase italic text-brand-gold mb-3">
              Custom Chevy Badges for Truck Builds
            </h3>
            <p className="text-white/60 leading-relaxed max-w-3xl">
              <strong className="text-white/80">Custom chevy badges</strong> include bowties, tailgate centers, and trim
              scripts. Filter the grid below or use the vehicle selector — then verify generation on the product page
              before checkout.
            </p>
            <h3 className="text-lg font-heading font-black uppercase italic text-brand-gold mb-3 mt-8">
              Chevy Truck Emblems &amp; Chevrolet Emblems for Sale
            </h3>
            <p className="text-white/60 leading-relaxed max-w-3xl mb-4">
              Shopping <strong className="text-white/80">chevy truck emblems</strong>,{' '}
              <strong className="text-white/80">chevrolet truck emblems</strong>, or{' '}
              <strong className="text-white/80">chevrolet emblems for sale</strong>? Every listing here is hand-etched
              with platform fitment notes — not generic marketplace SKUs. Also covers{' '}
              <strong className="text-white/80">emblems chevy</strong> and{' '}
              <strong className="text-white/80">chevy decals emblems</strong> searches when buyers want permanent
              engraving instead of peel-and-stick decals.
            </p>
            <p className="text-white/50 text-sm">
              Style guide:{' '}
              <Link href="/articles/custom-chevy-badges-style-guide" className="text-brand-gold hover:underline">
                Custom Chevy badges style guide
              </Link>
            </p>
          </section>
        )}

        {makeFilter === 'GMC' && !categoryFilter && (
          <HubProductPicks hub="products-gmc" title="Engraved GMC Emblem & High Country Badge SKUs" />
        )}

        {makeFilter === 'Ford' && !categoryFilter && (
          <HubProductPicks hub="ford" title="Ford Emblem SKUs — Product Intent Matches" />
        )}
        
        {products.length === 0 ? (
          <div className="text-center py-32 glass-card">
            <h3 className="text-2xl font-heading font-bold mb-2">No Parts Found</h3>
            <p className="text-black/40">Try adjusting your filters or contact us for custom requests.</p>
          </div>
        ) : (
          <div className="grid grid-cols-2 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4 sm:gap-8">
            {products.map((product: any) => (
              <ProductCard key={product.slug} product={product} />
            ))}
          </div>
        )}
      </div>
    </div>
  );
}
