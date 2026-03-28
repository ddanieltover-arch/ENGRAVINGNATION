import { NextResponse } from "next/server";
import { createOrder } from "@/lib/data";
import { sendEmail, ADMIN_EMAIL } from "@/lib/email";
import { orderConfirmationTemplate } from "@/lib/email-templates";


export async function POST(req: Request) {
  try {
    const data = await req.json();

    const orderId = 'ORD-' + Math.floor(100000 + Math.random() * 900000); // 6 digit random
    const newOrder = {
      id: orderId,
      created_at: new Date().toISOString(),
      status: 'pending_payment',
      customer_name: data.customer_name,
      email: data.email,
      address: data.address,
      city: data.city,
      zip: data.zip,
      total_amount: data.grandTotal,
      items: data.items,
      payment_method: data.payment_method || 'Direct Bank Transfer',
      payment_status: 'pending'
    };

    // 1. Save to Supabase
    await createOrder(newOrder);

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
