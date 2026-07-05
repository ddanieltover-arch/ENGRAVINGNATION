export const SITE_URL = 'https://engravingnation.store';
export const SITE_NAME = 'Engraving Nation';
export const GA4_ID = 'G-WHN37054LG';
export const DEFAULT_OG_IMAGE = `${SITE_URL}/og-image.jpg`;

export const ORGANIZATION = {
  name: SITE_NAME,
  url: SITE_URL,
  logo: `${SITE_URL}/logo.png`,
  telephone: '+1-332-256-6110',
  email: 'info@engravingnation.store',
  address: {
    streetAddress: '111 SMITHTOWN BYP STE 228',
    addressLocality: 'HAUPPAUGE',
    addressRegion: 'NY',
    postalCode: '11788-2531',
    addressCountry: 'US',
  },
  geo: { latitude: 40.8122, longitude: -73.2201 },
  sameAs: ['https://www.tiktok.com/@engraving_nation'],
} as const;
