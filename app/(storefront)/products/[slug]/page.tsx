import { getProductBySlug, getProducts } from '@/lib/data';

import Image from 'next/image';
import Link from 'next/link';
import { notFound } from 'next/navigation';
import AddToCartForm from '@/components/AddToCartForm';
import ProductCard from '@/components/ProductCard';
import ProductTabs from '@/components/ProductTabs';
import ProductGallery from '@/components/ProductGallery';
import type { Metadata, ResolvingMetadata } from 'next';

export async function generateMetadata(
  { params }: { params: Promise<{ slug: string }> },
  parent: ResolvingMetadata
): Promise<Metadata> {
  const { slug } = await params;
  const product = await getProductBySlug(slug);

  if (!product) {
    return {
      title: 'Product Not Found | Engraving Nation',
    };
  }

  const previousImages = (await parent).openGraph?.images || [];

  return {
    title: `${product.name} | Custom Engraved Automotive Emblems`,
    description: `Shop ${product.name}. Hand-etched precision custom ${product.categories?.join(', ') || 'automotive part'} for your vehicle. Premium quality, built to last.`,
    alternates: {
      canonical: `https://engravingnation.store/products/${slug}`,
    },
    openGraph: {
      title: `${product.name} | Engraving Nation`,
      description: product.description?.substring(0, 160),
      url: `https://engravingnation.store/products/${slug}`,
      siteName: 'Engraving Nation',
      images: [
        ...(product.images?.[0] ? [product.images[0]] : []),
        ...previousImages,
      ],
      type: 'article',
    },
    twitter: {
      card: 'summary_large_image',
      title: product.name,
      description: product.description?.substring(0, 160),
      images: [product.images?.[0] || ''],
    },
  };
}

export const revalidate = 0;

export default async function ProductDetailPage({ 
  params 
}: { 
  params: Promise<{ slug: string }> 
}) {
  const { slug } = await params;
  const product = await getProductBySlug(slug);
  const allProducts = await getProducts();
  const relatedProducts = allProducts.filter((p: any) => p.slug !== slug).slice(0, 4);

  if (!product) {
    notFound();
  }

  const productJsonLd = {
    '@context': 'https://schema.org',
    '@type': 'Product',
    name: product.name,
    image: product.images,
    description: product.description,
    sku: product.sku,
    brand: {
      '@type': 'Brand',
      name: 'Engraving Nation',
    },
    offers: {
      '@type': 'Offer',
      url: `https://engravingnation.store/products/${slug}`,
      priceCurrency: 'USD',
      price: product.price,
      itemCondition: 'https://schema.org/NewCondition',
      availability: 'https://schema.org/InStock',
      seller: {
        '@type': 'Organization',
        name: 'Engraving Nation',
      },
    },
  };

  const breadcrumbJsonLd = {
    '@context': 'https://schema.org',
    '@type': 'BreadcrumbList',
    itemListElement: [
      {
        '@type': 'ListItem',
        position: 1,
        name: 'Home',
        item: 'https://engravingnation.store',
      },
      {
        '@type': 'ListItem',
        position: 2,
        name: 'Inventory',
        item: 'https://engravingnation.store/products',
      },
      {
        '@type': 'ListItem',
        position: 3,
        name: product.name,
        item: `https://engravingnation.store/products/${slug}`,
      },
    ],
  };

  const faqJsonLd = {
    '@context': 'https://schema.org',
    '@type': 'FAQPage',
    mainEntity: [
      {
        '@type': 'Question',
        name: 'How long does the custom engraving process take?',
        acceptedAnswer: {
          '@type': 'Answer',
          text: 'Our precision engraving process typically takes 7-10 business days. Each piece is hand-finished and inspected for quality before shipment to ensure a premium result.',
        },
      },
      {
        '@type': 'Question',
        name: 'Will the engraving fade or peel over time?',
        acceptedAnswer: {
          '@type': 'Answer',
          text: 'No. Unlike vinyl overlays or stickers, our engravings are permanently etched into the material. This ensures they can withstand harsh weather, car washes, and road debris without losing definition.',
        },
      },
      {
        '@type': 'Question',
        name: 'Do you offer custom designs for specific vehicles?',
        acceptedAnswer: {
          '@type': 'Answer',
          text: 'Yes! While we offer a wide range of standard designs for Chevy, GMC, Ford, and Ram, we also accept custom project inquiries. Contact our support team with your design ideas for a bespoke quote.',
        },
      },
    ],
  };

  return (
    <div className="min-h-screen bg-brand-bg text-white/90 pt-32 pb-24">
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(productJsonLd) }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbJsonLd) }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(faqJsonLd) }}
      />
      <div className="container mx-auto px-4">
        {/* Breadcrumb */}
        <div className="flex items-center gap-3 text-[10px] uppercase tracking-[0.2em] font-bold text-white/30 mb-12">
          <Link href="/" className="hover:text-brand-gold transition-colors">Home</Link>
          <span className="text-white/10">/</span>
          <Link href="/products" className="hover:text-brand-gold transition-colors">Inventory</Link>
          <span className="text-white/10">/</span>
          <span className="text-white/60 truncate max-w-[200px]">{product.name}</span>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 mb-32">
          {/* Gallery Area */}
          <ProductGallery images={product.images || []} name={product.name} />

          {/* Details & Form */}
          <div className="flex flex-col justify-center">
            <div className="flex flex-wrap gap-3 mb-6">
              <div className="inline-block px-3 py-1 rounded-full bg-brand-gold/10 border border-brand-gold/20 text-brand-gold text-[10px] font-bold uppercase tracking-widest w-fit">
                Custom Engraved
              </div>
              {product.sku && (
                <div className="inline-block px-3 py-1 rounded-full bg-white/5 border border-white/10 text-white/50 text-[10px] font-mono uppercase tracking-widest w-fit">
                  SKU: {product.sku}
                </div>
              )}
            </div>
            
            <h1 className="text-2xl md:text-4xl font-heading font-black tracking-tighter uppercase italic leading-tight mb-4">
              {product.name}
            </h1>
            
            <div className="flex items-baseline gap-4 mb-8">
              <div className="text-3xl font-heading font-black text-brand-gold">
                ${product.price.toFixed(2)}
              </div>
              {product.regular_price > product.price && (
                <div className="text-xl text-white/20 line-through font-light">
                  ${product.regular_price.toFixed(2)}
                </div>
              )}
            </div>

            {/* Form */}
            <div className="mb-10">
              <AddToCartForm product={{ slug: product.slug, name: product.name, price: product.price, images: product.images }} />
            </div>
            
            <div className="flex items-center gap-6 pt-6 border-t border-brand-border/20">
              <div className="flex items-center gap-2">
                <div className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse"></div>
                <span className="text-[10px] text-white/40 uppercase tracking-widest font-bold">In Stock</span>
              </div>
              <div className="flex items-center gap-2">
                <svg className="w-4 h-4 text-brand-gold" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7"></path></svg>
                <span className="text-[10px] text-white/40 uppercase tracking-widest font-bold">Fast Shipping</span>
              </div>
            </div>
          </div>
        </div>

        {/* Product Details Tabs */}
        <ProductTabs 
          productId={product.id.toString()} 
          productName={product.name} 
          description={product.description} 
          reviews={product.reviews} 
          relatedProducts={relatedProducts} 
        />

      </div>
    </div>
  );
}
