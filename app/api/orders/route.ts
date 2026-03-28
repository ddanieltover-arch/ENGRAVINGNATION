import { NextResponse } from "next/server";
import { getJsonData, saveJsonData, ORDERS_FILE } from "@/lib/data";
import { sendEmail, ADMIN_EMAIL } from "@/lib/email";
import { orderConfirmationTemplate } from "@/lib/email-templates";


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

    // --- Email Notifications ---
    try {
      // 1. Send Confirmation to Client
      await sendEmail({
        to: newOrder.email,
        subject: `Order Recieved #${orderId} - Engraving Nation`,
        html: orderConfirmationTemplate(newOrder, false),
      });

      // 2. Notify Admin
      await sendEmail({
        to: ADMIN_EMAIL,
        subject: `NEW ORDER ALERT #${orderId}`,
        html: orderConfirmationTemplate(newOrder, true),
      });
    } catch (emailError) {
      console.error('Email notification failed but order was saved:', emailError);
    }

    return NextResponse.json({ success: true, id: orderId });
  } catch (error: any) {
    return NextResponse.json({ success: false, error: error.message }, { status: 500 });
  }
}
