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
      status: 'pending_payment',
      customer_name: data.customer_name,
      email: data.email,
      address: `${data.address}|PHONE:${data.phone || ''}`,
      city: data.city,
      zip: data.zip,
      country: data.country || 'US',
      items: data.items,
      cart_total: data.cartTotal || 0,
      discount_amount: data.discountAmount || 0,
      shipping_method: data.shippingMethod || 'unknown',
      shipping_cost: data.currentShippingCost || 0,
      grand_total: data.grandTotal,
      payment_method: data.payment_method || 'Direct Bank Transfer',
      payment_status: 'pending'
    };

    // 1. Save to Supabase
    await createOrder(newOrder);

    // --- Email Notifications ---
    try {
      const emailOrderData = { ...newOrder, state: data.state || '', phone: data.phone || '' };
      
      // Clean up the address for email
      emailOrderData.address = data.address;

      // 1. Send Confirmation to Client
      await sendEmail({
        to: newOrder.email,
        subject: `Order Recieved #${orderId} - Engraving Nation`,
        html: orderConfirmationTemplate(emailOrderData, false),
      });

      // 2. Notify Admin
      await sendEmail({
        to: ADMIN_EMAIL,
        subject: `NEW ORDER ALERT #${orderId}`,
        html: orderConfirmationTemplate(emailOrderData, true),
      });
    } catch (emailError) {
      console.error('Email notification failed but order was saved:', emailError);
    }

    return NextResponse.json({ success: true, id: orderId });
  } catch (error: any) {
    return NextResponse.json({ success: false, error: error.message }, { status: 500 });
  }
}
