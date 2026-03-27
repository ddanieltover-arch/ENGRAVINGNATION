import { NextResponse } from "next/server";
import { getJsonData, saveJsonData, ORDERS_FILE } from "@/lib/data";


export async function POST(req: Request) {
  try {
    const data = await req.json();
    const orders = getJsonData(ORDERS_FILE);

    const orderId = 'ORD-' + Math.floor(100000 + Math.random() * 900000); // 6 digit random
    const newOrder = {
      id: orderId,
      created_at: new Date().toISOString(),
      status: 'pending_payment',
      ...data,
      total_amount: data.grandTotal
    };

    orders.unshift(newOrder); // Add to beginning
    saveJsonData(ORDERS_FILE, orders);

    return NextResponse.json({ success: true, id: orderId });
  } catch (error: any) {
    return NextResponse.json({ success: false, error: error.message }, { status: 500 });
  }
}
