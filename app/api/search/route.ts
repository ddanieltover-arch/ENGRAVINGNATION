import { NextResponse } from 'next/server';
import { searchProducts } from '@/lib/data';

export async function GET(req: Request) {
  try {
    const { searchParams } = new URL(req.url);
    const query = searchParams.get('q');

    if (!query || query.length < 2) {
      return NextResponse.json({ success: true, results: [] });
    }

    const results = await searchProducts(query);
    return NextResponse.json({ success: true, results });
  } catch (error: any) {
    console.error('Search API error:', error);
    return NextResponse.json({ success: false, error: error.message }, { status: 500 });
  }
}
