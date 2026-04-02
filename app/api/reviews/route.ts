import { NextResponse } from 'next/server';
import { createClient } from "@supabase/supabase-js";

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL!;
const supabaseServiceRoleKey = process.env.SUPABASE_SERVICE_ROLE_KEY!;

const supabaseAdmin = createClient(supabaseUrl, supabaseServiceRoleKey);

export async function POST(request: Request) {
  try {
    const { productId, productSlug, author, rating, comment, images } = await request.json();

    if (!(productId || productSlug) || !author || !rating || !comment) {
      return NextResponse.json({ error: 'Missing required fields' }, { status: 400 });
    }

    // 1. Fetch current reviews and product name for SEO
    const query = productId 
      ? supabaseAdmin.from('products').select('id, name, reviews').eq('id', productId)
      : supabaseAdmin.from('products').select('id, name, reviews').eq('slug', productSlug);

    const { data: product, error: fetchError } = await query.single();

    if (fetchError || !product) {
      return NextResponse.json({ error: 'Product not found' }, { status: 404 });
    }

    const currentReviews = Array.isArray(product.reviews) ? product.reviews : [];

    // 2. Format new review
    const newReview = {
      id: `rev_${Date.now()}`,
      author,
      rating,
      comment,
      images: images || [],
      date: new Date().toLocaleDateString('en-US', { month: 'long', day: 'numeric', year: 'numeric' }),
      // SEO Alt Tags based on context
      imageAlts: images?.map(() => `Custom ${product.name || 'Engraving Nation'} emblem review photo by ${author}`) || []
    };

    // 3. Update the JSONB column
    const { error: updateError } = await supabaseAdmin
      .from('products')
      .update({
        reviews: [newReview, ...currentReviews]
      })
      .eq('id', product.id);

    if (updateError) {
      return NextResponse.json({ error: 'Failed to update reviews' }, { status: 500 });
    }

    return NextResponse.json({ success: true, review: newReview });
  } catch (error: any) {
    console.error('API Error:', error);
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}
