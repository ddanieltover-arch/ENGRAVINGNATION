import { getProducts } from '@/lib/data';
import type { Metadata } from 'next';

import VehicleSelector from '@/components/VehicleSelector';
import ProductCard from '@/components/ProductCard';

export async function generateMetadata({
  searchParams,
}: {
  searchParams: Promise<{ [key: string]: string | string[] | undefined }>;
}): Promise<Metadata> {
  const params = await searchParams;
  const hasFilterParams = ['category', 'make', 'model', 'year', 'search'].some(
    (key) => !!params[key]
  );

  return {
    title: 'Shop Custom Chevy Emblems & Silverado Badges',
    description:
      'Shop engraved Chevy emblems, custom Silverado badges, and Chevrolet truck emblems. Premium Chevy Silverado emblem replacements, custom chevy badges, and engraved chevy logos for GMC, Ford, and RAM.',
    alternates: {
      canonical: 'https://engravingnation.store/products',
    },
    robots: hasFilterParams
      ? {
          index: false,
          follow: true,
        }
      : {
          index: true,
          follow: true,
        },
    keywords: [
      'silverado emblem',
      'silverado badges',
      'engraved chevy emblem',
      'chevrolet truck emblems',
      'custom chevy badges',
      'chevy silverado emblem',
      'chevy silverado badges',
      'engraved chevy logo',
      'chevy truck badges',
      'custom silverado badges',
      'chevy emblem custom',
      'silverado logos',
      'chevy badges and emblems',
      'engraved car parts',
    ],
    openGraph: {
      title: 'Engraved Chevy Emblems & Custom Logos',
      description:
        'Browse premium hand-engraved Silverado emblems, Chevrolet truck badges, and custom logos for Chevy, GMC, Ford, and RAM.',
      url: 'https://engravingnation.store/products',
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

  const itemListJsonLd = {
    '@context': 'https://schema.org',
    '@type': 'ItemList',
    name: 'Custom Engraved Automotive Emblems',
    description: 'Hand-engraved emblems and mirror caps for Chevy, GMC, Ford, and RAM trucks.',
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
              ) : makeFilter ? (
                <>Looking for Custom <span className="text-brand-gold">{makeFilter} Emblems?</span></>
              ) : (
                <>What Custom Emblem Are You <span className="text-brand-gold">Looking For?</span></>
              )}
            </h1>
            <div className="w-32 h-1 bg-brand-gold mb-8"></div>
            <p className="text-white max-w-2xl text-xl font-light leading-relaxed">
              Browse our full catalog of precision hand-engraved emblems, badges, and mirror caps for Chevy, GMC, Ford, and RAM trucks.
            </p>
          </div>
        </div>
      </div>

      <div className="container mx-auto px-4">
        <div className="mb-20 animate-slide-up">
          <VehicleSelector />
        </div>
        
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
