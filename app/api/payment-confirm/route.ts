import { NextResponse } from "next/server";

export async function POST(req: Request) {
  // TODO: Admin confirms payment, update order status to processing
  return NextResponse.json({ confirmed: true });
}
