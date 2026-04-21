import { getProducts } from '@/lib/data';
import { NextResponse } from 'next/server';

export const revalidate = 3600; // Cache for 1 hour

export async function GET() {
  try {
    const products = await getProducts();
    const domain = process.env.NEXT_PUBLIC_SITE_URL || 'https://engravingnation.store';

    let xml = `<?xml version="1.0" encoding="UTF-8"?>
<rss xmlns:g="http://base.google.com/ns/1.0" version="2.0">
  <channel>
    <title>Engraving Nation - Custom Automotive Emblems</title>
    <link>${domain}</link>
    <description>Premier custom automotive engraving and specialty parts for enthusiasts.</description>
`;

    products.forEach((product: any) => {
      // Skip system settings dummy product
      if (product.slug === 'sys_settings') return;

      const title = escapeXml(product.name);
      const description = escapeXml(
        (product.description || '')
          .replace(/<[^>]*>?/gm, '') // Strip HTML tags
          .substring(0, 5000)
      );
      const link = `${domain}/products/${product.slug}`;
      const imageLink = product.images?.[0]?.startsWith('http') 
        ? product.images[0] 
        : `${domain}${product.images?.[0] || '/icon.png'}`;
      
      const availability = product.stock_status === 'instock' || (product.stock_quantity > 0) || (product.stock_quantity === null)
        ? 'in_stock'
        : 'out_of_stock';
      
      const price = product.regular_price || product.price;
      const salePrice = product.price < price ? product.price : (product.sale_price || null);

      xml += `    <item>
      <g:id>${product.sku || product.slug}</g:id>
      <g:title>${title}</g:title>
      <g:description>${description}</g:description>
      <g:link>${link}</g:link>
      <g:image_link>${imageLink}</g:image_link>
      <g:availability>${availability}</g:availability>
      <g:price>${Number(price).toFixed(2)} USD</g:price>
      ${salePrice ? `<g:sale_price>${Number(salePrice).toFixed(2)} USD</g:sale_price>` : ''}
      <g:brand>Engraving Nation</g:brand>
      <g:condition>new</g:condition>
      <g:google_product_category>6066</g:google_product_category>
      <g:shipping_label>International</g:shipping_label>
    </item>
`;
    });

    xml += `  </channel>
</rss>`;

    return new NextResponse(xml, {
      headers: {
        'Content-Type': 'application/xml',
        'Cache-Control': 'public, s-maxage=3600, stale-while-revalidate=59',
      },
    });
  } catch (error) {
    console.error('Error generating Google Feed:', error);
    return new NextResponse('Error generating feed', { status: 500 });
  }
}

function escapeXml(unsafe: string) {
  return unsafe.replace(/[<>&"']/g, (c) => {
    switch (c) {
      case '<': return '&lt;';
      case '>': return '&gt;';
      case '&': return '&amp;';
      case '"': return '&quot;';
      case "'": return '&apos;';
      default: return c;
    }
  });
}
