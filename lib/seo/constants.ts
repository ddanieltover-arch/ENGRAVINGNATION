export const SITE_URL = 'https://engravingnation.store';
export const SITE_NAME = 'Engraving Nation';
export const GA4_ID = 'G-WHN37054LG';
export const DEFAULT_OG_IMAGE = `${SITE_URL}/images/products/candy_red_gmc.png`;

export const PHONE = {
  e164Digits: '12626865628',
  display: '+1 (262) 686-5628',
  schema: '+1-262-686-5628',
} as const;

export const ORGANIZATION = {
  name: SITE_NAME,
  url: SITE_URL,
  logo: `${SITE_URL}/logo.png`,
  telephone: PHONE.schema,
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
