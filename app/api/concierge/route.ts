import { NextResponse } from 'next/server';
import { supabase } from '@/lib/supabase';

// Keywords to look for in user queries
const VEHICLES = ['bronco', 'silverado', 'f150', 'f-150', 'ram', 'gmc', 'sierra', 'chevy', 'chevrolet'];
const PARTS = ['hitch', 'mirror', 'tailgate', 'grille', 'badge', 'emblem', 'handles', 'door'];

export async function POST(req: Request) {
  try {
    const { message } = await req.json();
    if (!message) {
      return NextResponse.json({ reply: "I didn't quite catch that. What vehicle are you building?", products: [] }, { status: 200 });
    }

    const lowerMsg = message.toLowerCase();
    
    // Extract intent
    const foundVehicles = VEHICLES.filter(v => lowerMsg.includes(v));
    const foundParts = PARTS.filter(p => lowerMsg.includes(p));

    let queryTerms = [...foundVehicles, ...foundParts];

    if (queryTerms.length === 0) {
      // Generic fallback
      return NextResponse.json({ 
        reply: "I'm the Engraving Nation Concierge! I can help you find custom hand-engraved parts for your specific build. Are you driving a Chevy, Ford, or Ram?",
        products: []
      }, { status: 200 });
    }

    // Build Supabase search query: we'll search products matching ANY of the key terms
    // We can do an OR query
    const orQuery = queryTerms.map(term => `name.ilike.%${term}%,description.ilike.%${term}%`).join(',');

    const { data, error } = await supabase
      .from('products')
      .select('id, name, slug, price, product_images(url)')
      .or(orQuery)
      .neq('slug', 'sys_settings')
      .limit(3);

    if (error) {
      console.error("Concierge DB Error:", error);
      return NextResponse.json({ reply: "I'm having a little trouble checking the inventory right now. Please try again.", products: [] }, { status: 500 });
    }

    const products = data.map(p => ({
      ...p,
      price: Number(p.price),
      images: p.product_images?.map((img: any) => img.url) || []
    }));

    let reply = "Here are some stunning hand-engraved pieces that might be perfect for your build:";
    if (products.length === 0) {
      reply = `I couldn't find any exact matches right now, but we are always adding new inventory! Check back soon or contact us for a custom request.`;
    } else if (foundVehicles.length > 0) {
      reply = `Excellent choice! The ${foundVehicles[0]} looks incredible with custom engraving. Check out these pieces from our vault:`;
    }

    return NextResponse.json({ reply, products }, { status: 200 });
    
  } catch (error) {
    console.error("Concierge API Error:", error);
    return NextResponse.json({ reply: "I'm having a little trouble checking the inventory right now.", products: [] }, { status: 500 });
  }
}
