import { NextResponse } from "next/server";
import { getJsonData, saveJsonData, COUPONS_FILE } from '@/lib/data';


export async function POST(request: Request) {
  try {
    const { code } = await request.json();
    const coupons = getJsonData(COUPONS_FILE);
    if (!coupons || coupons.length === 0) {
      return NextResponse.json({ success: false, error: 'Invalid coupon' });
    }


    const coupon = coupons.find((c: any) => c.code.toUpperCase() === code.toUpperCase());

    if (!coupon) {
      return NextResponse.json({ success: false, error: 'Invalid coupon code' });
    }

    // Increment used count
    coupon.used_count = (coupon.used_count || 0) + 1;
    saveJsonData(COUPONS_FILE, coupons);

    return NextResponse.json({ 
      success: true, 
      type: coupon.type, 
      value: coupon.value 
    });
  } catch (error) {
    return NextResponse.json({ success: false, error: 'Server error' });
  }
}
