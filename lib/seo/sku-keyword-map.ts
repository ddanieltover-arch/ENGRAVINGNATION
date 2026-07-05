/**
 * Tier 3 — niche / product-intent keywords mapped to catalog SKUs.
 * Product pages use these for title, description, and on-page H2 blocks.
 */

export type SkuKeywordEntry = {
  slug: string;
  sku: string;
  primaryKeyword: string;
  secondaryKeywords: string[];
  seoTitle: string;
  seoDescription: string;
  nicheHeading: string;
  nicheCopy: string;
};

export const SKU_KEYWORD_MAP: Record<string, SkuKeywordEntry> = {
  'black-ford-emblem': {
    slug: 'black-ford-emblem',
    sku: 'EN-G5CL9U',
    primaryKeyword: 'black and white ford emblem',
    secondaryKeywords: ['black ford emblem', 'ford oval emblem', 'custom ford emblem'],
    seoTitle: 'Black and White Ford Emblem | Hand-Engraved | EN-G5CL9U',
    seoDescription:
      'Black and white Ford emblem with hand-engraved scroll detail. OEM-style fit for F-150, Super Duty, and Ford SUVs. SKU EN-G5CL9U.',
    nicheHeading: 'Black and White Ford Emblem — Hand-Engraved Oval',
    nicheCopy:
      'This SKU (EN-G5CL9U) targets black and white Ford emblem searches — a premium black-coated oval with engraved contrast for F-150 and Super Duty grilles. Select size at checkout to match your factory mount.',
  },
  'chevy-emblem-fully-engraved': {
    slug: 'chevy-emblem-fully-engraved',
    sku: 'EN-GRMUD9',
    primaryKeyword: 'custom chevy emblem',
    secondaryKeywords: ['engraved chevy badge', 'chevy badge', 'engraved chevy emblem'],
    seoTitle: 'Custom Chevy Emblem — Fully Engraved | EN-GRMUD9',
    seoDescription:
      'Custom chevy emblem with full hand-engraved depth. Permanent etched badge — not vinyl. SKU EN-GRMUD9. Confirm fitment before order.',
    nicheHeading: 'Custom Chevy Emblem & Engraved Chevy Badge',
    nicheCopy:
      'SKU EN-GRMUD9 is our fully engraved chevy emblem for owners searching custom chevy emblem, engraved chevy badge, or chevy badge upgrades. Deep-cut texture replaces factory flat badges with permanent detail.',
  },
  'chevy-silverado-for-all-models-and-years-front-and-back': {
    slug: 'chevy-silverado-for-all-models-and-years-front-and-back',
    sku: 'EN-YW655Y',
    primaryKeyword: 'silverado emblem',
    secondaryKeywords: ['chevy silverado emblem', 'silverado emblems', 'chevy silverado emblems'],
    seoTitle: 'Silverado Emblem Front & Back Set | EN-YW655Y',
    seoDescription:
      'Silverado emblem front and rear set — hand-engraved chevy silverado emblems with fitment notes by generation. SKU EN-YW655Y.',
    nicheHeading: 'Silverado Emblem & Chevy Silverado Emblem Set',
    nicheCopy:
      'This front-and-back set (SKU EN-YW655Y) maps to silverado emblem and chevy silverado emblem intent. Confirm generation fitment in our database before ordering — year alone is not enough on T1XX trucks.',
  },
  'ss-badge-emblem-billet': {
    slug: 'ss-badge-emblem-billet',
    sku: 'EN-U4R1FW',
    primaryKeyword: 'silverado ss emblems',
    secondaryKeywords: ['ss badge emblem', 'billet ss badge', 'chevy ss emblem'],
    seoTitle: 'Silverado SS Emblems — Billet SS Badge | EN-U4R1FW',
    seoDescription:
      'Silverado SS emblems in precision billet aluminum. Bold SS badge for grille or fender upgrade. SKU EN-U4R1FW.',
    nicheHeading: 'Silverado SS Emblems — Billet Badge',
    nicheCopy:
      'SKU EN-U4R1FW serves silverado ss emblems searches — a billet SS badge with machined depth for show and daily builds. Auxiliary badge; not a center bowtie replacement.',
  },
  'gmc-engraved-front-emblem': {
    slug: 'gmc-engraved-front-emblem',
    sku: 'EN-XY3C3W',
    primaryKeyword: 'engraved gmc emblem',
    secondaryKeywords: ['high country badges', 'high country badge', 'gmc sierra emblem'],
    seoTitle: 'Engraved GMC Emblem | Sierra & Yukon | EN-XY3C3W',
    seoDescription:
      'Engraved GMC emblem for Sierra, Yukon, and Denali/High Country builds. Hand-etched front badge. SKU EN-XY3C3W.',
    nicheHeading: 'Engraved GMC Emblem & High Country Badge Upgrades',
    nicheCopy:
      'SKU EN-XY3C3W maps to engraved gmc emblem and high country badges intent — a hand-engraved front GMC badge popular on Sierra and Yukon builds including High Country trims. Select year at checkout.',
  },
  'set-front-and-back-chevy-fully-engraved': {
    slug: 'set-front-and-back-chevy-fully-engraved',
    sku: 'EN-13JV2V',
    primaryKeyword: 'chevy badges and emblems',
    secondaryKeywords: ['chevy emblems for sale', 'custom chevrolet emblems', 'chevrolet emblems for sale'],
    seoTitle: 'Chevy Badges and Emblems Set | Front & Back | EN-13JV2V',
    seoDescription:
      'Chevy badges and emblems — matched front and rear engraved set. Chevy emblems for sale with OEM-style mount. SKU EN-13JV2V.',
    nicheHeading: 'Chevy Badges and Emblems — Matched Front & Rear',
    nicheCopy:
      'SKU EN-13JV2V covers chevy badges and emblems and chevy emblems for sale queries — a complete front-and-back engraved set for cohesive truck branding.',
  },
  'black-set-of-2-emblems-for-front-and-back': {
    slug: 'black-set-of-2-emblems-for-front-and-back',
    sku: 'EN-21J1UI',
    primaryKeyword: 'engraved chevy badge',
    secondaryKeywords: ['black chevy emblem set', 'front and back chevy emblems'],
    seoTitle: 'Engraved Chevy Badge Set — Front & Back | EN-21J1UI',
    seoDescription:
      'Engraved chevy badge set in blackout finish. Front and rear matched pair. SKU EN-21J1UI.',
    nicheHeading: 'Engraved Chevy Badge — Blackout Pair',
    nicheCopy:
      'SKU EN-21J1UI targets engraved chevy badge searches with a matched blackout front-and-rear pair — ideal for stealth grille and tailgate builds.',
  },
  'black-front-emblem-fully-engraved': {
    slug: 'black-front-emblem-fully-engraved',
    sku: 'EN-O3NL2V',
    primaryKeyword: 'custom chevrolet emblems',
    secondaryKeywords: ['black chevy emblem', 'engraved front emblem'],
    seoTitle: 'Custom Chevrolet Emblems — Black Front Engraved | EN-O3NL2V',
    seoDescription:
      'Custom chevrolet emblems in blackout engraved finish. Single front badge upgrade. SKU EN-O3NL2V.',
    nicheHeading: 'Custom Chevrolet Emblems — Blackout Front',
    nicheCopy:
      'SKU EN-O3NL2V maps custom chevrolet emblems and blackout front badge intent to a single fully engraved grille emblem.',
  },
};

/** Keyword → primary product slug (first match wins for hub pick lists). */
export const KEYWORD_TO_SKU_SLUG: Record<string, string> = {
  'black and white ford emblem': 'black-ford-emblem',
  'silverado emblem': 'chevy-silverado-for-all-models-and-years-front-and-back',
  'chevy silverado emblem': 'chevy-silverado-for-all-models-and-years-front-and-back',
  'custom chevy emblem': 'chevy-emblem-fully-engraved',
  'chevy badge': 'chevy-emblem-fully-engraved',
  'engraved chevy badge': 'black-set-of-2-emblems-for-front-and-back',
  'silverado ss emblems': 'ss-badge-emblem-billet',
  'engraved gmc emblem': 'gmc-engraved-front-emblem',
  'high country badges': 'gmc-engraved-front-emblem',
  'high country badge': 'gmc-engraved-front-emblem',
  'chevy badges and emblems': 'set-front-and-back-chevy-fully-engraved',
  'chevy emblems for sale': 'set-front-and-back-chevy-fully-engraved',
  'custom chevrolet emblems': 'black-front-emblem-fully-engraved',
};

export function getSkuKeywordEntry(slug: string): SkuKeywordEntry | null {
  return SKU_KEYWORD_MAP[slug] ?? null;
}

export function getSkuSeoOverrides(slug: string): Pick<SkuKeywordEntry, 'seoTitle' | 'seoDescription'> | null {
  const entry = getSkuKeywordEntry(slug);
  if (!entry) return null;
  return { seoTitle: entry.seoTitle, seoDescription: entry.seoDescription };
}

/** Product pick lists for hub pages (slug + label). */
export const HUB_PRODUCT_PICKS: Record<string, { slug: string; label: string; keyword: string }[]> = {
  'chevy-emblem': [
    { slug: 'chevy-emblem-fully-engraved', label: 'Custom Chevy Emblem', keyword: 'custom chevy emblem' },
    { slug: 'chevy-silverado-for-all-models-and-years-front-and-back', label: 'Silverado Emblem Set', keyword: 'chevy silverado emblem' },
    { slug: 'set-front-and-back-chevy-fully-engraved', label: 'Chevy Badges & Emblems Set', keyword: 'chevy badges and emblems' },
    { slug: 'black-set-of-2-emblems-for-front-and-back', label: 'Engraved Chevy Badge Pair', keyword: 'engraved chevy badge' },
  ],
  fitment: [
    { slug: 'chevy-silverado-for-all-models-and-years-front-and-back', label: 'Silverado Emblem Set', keyword: 'silverado emblem' },
    { slug: 'ss-badge-emblem-billet', label: 'Silverado SS Emblem', keyword: 'silverado ss emblems' },
    { slug: 'set-front-and-back-chevy-fully-engraved', label: 'Front & Back Chevy Set', keyword: 'chevy silverado emblem' },
  ],
  'products-gmc': [
    { slug: 'gmc-engraved-front-emblem', label: 'Engraved GMC Emblem', keyword: 'engraved gmc emblem' },
    { slug: 'candy-red-gmc-front-emblem', label: 'GMC Front Emblem — Candy Red', keyword: 'gmc sierra emblem' },
  ],
  ford: [
    { slug: 'black-ford-emblem', label: 'Black & White Ford Emblem', keyword: 'black and white ford emblem' },
    { slug: 'ford-engraved-oval-filigree-grille-emblem', label: 'Ford Grille Emblem', keyword: 'ford custom emblem' },
  ],
};
