import { createClient } from "@supabase/supabase-js";

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL!;
const supabaseServiceRoleKey = process.env.SUPABASE_SERVICE_ROLE_KEY!;

// Use service role key for backend updates to bypass RLS for this specific action
const supabaseAdmin = createClient(supabaseUrl, supabaseServiceRoleKey);

export interface ReviewData {
  author: string;
  rating: number;
  comment: string;
  images?: string[];
  date?: string;
}

/**
 * Uploads an image to Supabase storage bucket 'review-photos'
 * and returns the public URL.
 */
export async function uploadReviewPhoto(file: File, productId: string): Promise<string> {
  const fileExt = file.name.split('.').pop();
  const fileName = `${productId}/${Date.now()}-${Math.random().toString(36).substring(7)}.${fileExt}`;
  
  const { data, error } = await supabaseAdmin.storage
    .from('review-photos')
    .upload(fileName, file);

  if (error) {
    console.error('Error uploading photo:', error);
    throw new Error('Failed to upload photo');
  }

  const { data: { publicUrl } } = supabaseAdmin.storage
    .from('review-photos')
    .getPublicUrl(data.path);

  return publicUrl;
}

/**
 * Adds a new review to a product's JSONB reviews column
 */
export async function addReviewToProduct(productId: string, review: ReviewData) {
  // 1. Fetch current reviews
  const { data: product, error: fetchError } = await supabaseAdmin
    .from('products')
    .select('reviews')
    .eq('id', productId)
    .single();

  if (fetchError || !product) {
    console.error('Error fetching product reviews:', fetchError);
    throw new Error('Product not found');
  }

  const currentReviews = Array.isArray(product.reviews) ? product.reviews : [];
  
  // 2. Prepare new review with default date if not provided
  const newReview = {
    ...review,
    id: `rev_${Date.now()}`,
    date: review.date || new Date().toLocaleDateString('en-US', { month: 'long', day: 'numeric', year: 'numeric' }),
    // SEO optimization: generated photo alts based on product context
    imageAlts: review.images?.map(url => `Custom engraving review photo by ${review.author}`) || []
  };

  // 3. Update product with new reviews array
  const { error: updateError } = await supabaseAdmin
    .from('products')
    .update({ 
      reviews: [newReview, ...currentReviews] 
    })
    .eq('id', productId);

  if (updateError) {
    console.error('Error updating product reviews:', updateError);
    throw new Error('Failed to save review');
  }

  return newReview;
}
