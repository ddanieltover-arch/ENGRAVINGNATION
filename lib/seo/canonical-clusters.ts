/**
 * One canonical URL per keyword cluster — prevents /products from competing with hub pages.
 * Commercial intent → make-filtered shop URLs; informational → dedicated guides.
 */

export type HubLink = {
  href: string;
  title: string;
  anchor: string;
  cluster: 'emblem' | 'bowtie' | 'fitment' | 'shop';
};

export const CHEVY_HUB_LINKS: HubLink[] = [
  {
    href: '/chevy-emblem',
    title: 'Chevy Emblem Fitment Guide',
    anchor: 'Chevy emblem buyer fitment guide',
    cluster: 'emblem',
  },
  {
    href: '/chevy-bowtie',
    title: 'Chevy Bowtie Size Guide',
    anchor: 'Chevy bowtie size by platform',
    cluster: 'bowtie',
  },
  {
    href: '/fitment',
    title: 'Silverado Emblem Size Database',
    anchor: 'Chevy Silverado emblem size guide',
    cluster: 'fitment',
  },
];

export const SHOP_CHEVY: HubLink = {
  href: '/products?make=Chevrolet',
  title: 'Shop Custom Chevy Emblems',
  anchor: 'Shop custom Chevy emblems',
  cluster: 'shop',
};

type FitmentEntry = { make?: string; model?: string };

type ProductLike = {
  name?: string;
  categories?: string[];
  vehicle_fitment?: FitmentEntry[];
};

function textBlob(product: ProductLike): string {
  const parts = [
    product.name ?? '',
    ...(product.categories ?? []),
    ...(product.vehicle_fitment ?? []).flatMap((f) => [f.make ?? '', f.model ?? '']),
  ];
  return parts.join(' ').toLowerCase();
}

/** Hub guides to surface on a product detail page (informational, not shop). */
export function getProductCanonicalHubs(product: ProductLike): HubLink[] {
  const blob = textBlob(product);
  const isChevy =
    blob.includes('chevy') || blob.includes('chevrolet') || blob.includes('silverado') || blob.includes('corvette');
  if (!isChevy) return [];

  const hubs: HubLink[] = [];
  const isBowtie = blob.includes('bowtie') || blob.includes('bow tie');
  const isSilverado = blob.includes('silverado');

  if (isBowtie) {
    hubs.push(CHEVY_HUB_LINKS[1]);
  } else {
    hubs.push(CHEVY_HUB_LINKS[0]);
  }
  if (isSilverado || blob.includes('1500') || blob.includes('2500') || blob.includes('3500')) {
    hubs.push(CHEVY_HUB_LINKS[2]);
  }
  if (!isBowtie && !hubs.some((h) => h.cluster === 'bowtie') && blob.includes('bowtie')) {
    hubs.push(CHEVY_HUB_LINKS[1]);
  }

  const seen = new Set<string>();
  return hubs.filter((h) => {
    if (seen.has(h.href)) return false;
    seen.add(h.href);
    return true;
  });
}
