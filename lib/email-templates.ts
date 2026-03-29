/**
 * Email Templates for Engraving Nation
 * Design: Onyx Black (#0a0a0a) and Champagne Gold (#d4a017)
 */

const BRAND_GOLD = '#d4a017';
const BRAND_BG = '#0a0a0a';
const TEXT_WHITE = '#ffffff';
const TEXT_GRAY = '#a0a0a0';

const baseLayout = (content: string, title: string) => `
<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>${title}</title>
</head>
<body style="margin: 0; padding: 0; background-color: ${BRAND_BG}; font-family: 'Outfit', 'Inter', -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Helvetica, Arial, sans-serif; color: ${TEXT_WHITE};">
    <table width="100%" border="0" cellspacing="0" cellpadding="0" style="background-color: ${BRAND_BG}; padding: 40px 0;">
        <tr>
            <td align="center">
                <!-- Main Container -->
                <table width="600" border="0" cellspacing="0" cellpadding="0" style="background-color: #111111; border: 1px solid #222222; border-radius: 16px; overflow: hidden; box-shadow: 0 20px 50px rgba(0,0,0,0.5);">
                    <!-- Header -->
                    <tr>
                        <td align="center" style="padding: 40px 0; background: linear-gradient(180deg, #1a1a1a 0%, #111111 100%);">
                            <img src="https://engravingnation.store/logo.png" alt="Engraving Nation" width="220" style="display: block; width: 220px; height: auto;">
                            <div style="margin-top: 15px; color: ${BRAND_GOLD}; font-size: 10px; font-weight: 900; letter-spacing: 4px; text-transform: uppercase; font-style: italic;">
                                Premier Custom Automotive Art
                            </div>
                        </td>
                    </tr>

                    <!-- Body Content -->
                    <tr>
                        <td style="padding: 40px; line-height: 1.6;">
                            ${content}
                        </td>
                    </tr>

                    <!-- Footer -->
                    <tr>
                        <td style="padding: 30px 40px; background-color: #0d0d0d; border-top: 1px solid #1a1a1a; text-align: center;">
                            <p style="margin: 0; color: ${TEXT_GRAY}; font-size: 11px; text-transform: uppercase; letter-spacing: 2px;">
                                &copy; ${new Date().getFullYear()} Engraving Nation. All rights reserved.
                            </p>
                            <p style="margin: 10px 0 0; color: ${TEXT_GRAY}; font-size: 10px;">
                                13322566110 | info@engravingnation.store
                            </p>
                        </td>
                    </tr>
                </table>
            </td>
        </tr>
    </table>
</body>
</html>
`;

export const newsletterWelcomeTemplate = (email: string) => {
  const content = `
    <h1 style="font-size: 24px; font-weight: 900; margin: 0 0 20px; text-transform: uppercase; font-style: italic; letter-spacing: -1px;">
      Welcome to the <span style="color: ${BRAND_GOLD};">Nation</span>
    </h1>
    <p style="font-size: 16px; font-weight: 300; margin: 0 0 25px; color: ${TEXT_GRAY};">
      Thank you for subscribing to Engraving Nation. You're now part of an exclusive community of automotive enthusiasts who value precision, craftsmanship, and individuality.
    </p>
    <div style="padding: 25px; background-color: #1a1a1a; border-radius: 12px; border: 1px solid #222222; margin-bottom: 25px;">
        <p style="margin: 0; color: ${BRAND_GOLD}; font-size: 12px; font-weight: bold; text-transform: uppercase; letter-spacing: 1px;">Subscription Verified</p>
        <p style="margin: 5px 0 0; font-size: 14px; font-weight: 400;">Email: <span style="color: ${TEXT_WHITE};">${email}</span></p>
    </div>
    <p style="font-size: 15px; color: ${TEXT_GRAY}; margin: 0;">
      Expect to receive updates on our latest custom designs, new material releases, and exclusive member-only project reveals.
    </p>
  `;
  return baseLayout(content, 'Welcome to the Nation');
};

export const contactAutoReplyTemplate = (name: string) => {
  const content = `
    <h1 style="font-size: 24px; font-weight: 900; margin: 0 0 20px; text-transform: uppercase; font-style: italic; letter-spacing: -1px;">
      Message <span style="color: ${BRAND_GOLD};">Received</span>
    </h1>
    <p style="font-size: 16px; font-weight: 300; margin: 0 0 20px; color: ${TEXT_GRAY};">
      Hello ${name},
    </p>
    <p style="font-size: 16px; font-weight: 300; margin: 0 0 25px; color: ${TEXT_GRAY};">
      Thank you for reaching out to Engraving Nation. Our team of specialists has received your inquiry and we're already reviewing the details.
    </p>
    <p style="font-size: 14px; color: ${TEXT_GRAY}; margin: 0 0 10px;">
      We aim to respond to all custom project and support inquiries within 24 business hours.
    </p>
  `;
  return baseLayout(content, 'Message Received - Engraving Nation');
};

export const contactAdminAlertTemplate = (data: { name: string, email: string, subject: string, message: string }) => {
  const content = `
    <h1 style="font-size: 22px; font-weight: 900; margin: 0 0 20px; text-transform: uppercase; font-style: italic; color: ${BRAND_GOLD};">
      New Message From Website
    </h1>
    <table width="100%" border="0" cellspacing="0" cellpadding="0" style="margin-bottom: 20px;">
        <tr><td style="padding: 5px 0; font-weight: bold; font-size: 12px; color: ${BRAND_GOLD}; text-transform: uppercase;">From:</td></tr>
        <tr><td style="padding: 0 0 10px; font-size: 15px; border-bottom: 1px solid #222222;">${data.name} (${data.email})</td></tr>
        
        <tr><td style="padding: 15px 0 5px; font-weight: bold; font-size: 12px; color: ${BRAND_GOLD}; text-transform: uppercase;">Subject:</td></tr>
        <tr><td style="padding: 0 0 10px; font-size: 15px; border-bottom: 1px solid #222222;">${data.subject}</td></tr>
        
        <tr><td style="padding: 15px 0 5px; font-weight: bold; font-size: 12px; color: ${BRAND_GOLD}; text-transform: uppercase;">Message:</td></tr>
        <tr><td style="padding: 0 0 20px; font-size: 14px; line-height: 1.6; color: ${TEXT_GRAY};">${data.message}</td></tr>
    </table>
  `;
  return baseLayout(content, 'New Contact Message');
};

export const orderConfirmationTemplate = (order: any, isAdmin: boolean = false) => {
  const items = Array.isArray(order.items) ? order.items : [];
  const itemsHtml = items.map((item: any) => `
    <tr>
      <td style="padding: 15px 0; border-bottom: 1px solid #222222;">
        <p style="margin: 0; font-weight: bold; font-size: 15px;">${item.name || 'Custom Product'}</p>
        ${item.customText ? `<p style="margin: 5px 0 0; font-size: 12px; color: ${BRAND_GOLD}; font-style: italic;">Engraving: "${item.customText}"</p>` : ''}
      </td>
      <td align="right" style="padding: 15px 0; border-bottom: 1px solid #222222; font-weight: bold;">
        ${item.quantity} x $${(item.price || 0).toFixed(2)}
      </td>
    </tr>
  `).join('');

  const content = `
    <h1 style="font-size: 24px; font-weight: 900; margin: 0 0 10px; text-transform: uppercase; font-style: italic; letter-spacing: -1px;">
      Order <span style="color: ${BRAND_GOLD};">${isAdmin ? 'Notification' : 'Confirmed'}</span>
    </h1>
    <p style="font-size: 14px; color: ${TEXT_GRAY}; margin: 0 0 30px;">
      Order ID: <span style="color: ${TEXT_WHITE}; font-weight: bold;">#${order.id}</span> | Date: ${new Date(order.created_at || Date.now()).toLocaleDateString()}
    </p>

    <table width="100%" border="0" cellspacing="0" cellpadding="0" style="margin-bottom: 30px;">
        ${itemsHtml}
        <tr>
            <td style="padding: 20px 0; font-weight: bold; font-size: 18px; text-transform: uppercase;">Total</td>
            <td align="right" style="padding: 20px 0; color: ${BRAND_GOLD}; font-size: 22px; font-weight: 900;">$${(order.total_amount || order.grand_total || 0).toFixed(2)}</td>
        </tr>
    </table>

    <div style="padding: 25px; background-color: #1a1a1a; border-radius: 12px; border: 1px solid #222222; margin-bottom: 30px;">
        <h3 style="margin: 0 0 15px; color: ${BRAND_GOLD}; font-size: 12px; font-weight: bold; text-transform: uppercase; letter-spacing: 1px;">Shipping Details</h3>
        <p style="margin: 0; font-size: 14px; color: ${TEXT_GRAY}; line-height: 1.5;">
            ${order.customer_name || `${order.firstName} ${order.lastName}`}<br>
            ${order.phone ? `${order.phone}<br>` : ''}
            ${order.address || order.shippingAddress}<br>
            ${order.city || order.shippingCity}, ${order.state || order.shippingState || ''} ${order.zip || order.shippingZip}
        </p>
    </div>

    ${!isAdmin ? `
    <p style="font-size: 14px; color: ${TEXT_GRAY}; line-height: 1.6;">
        We have received your payment information and will begin your manual craftsmanship build once the transfer is verified. You will receive an update as soon as your project moves into production.
    </p>
    ` : `
    <p style="font-size: 14px; color: ${BRAND_GOLD}; font-weight: bold;">
        New order placed. Please verify the offline payment in the admin dashboard.
    </p>
    `}
  `;
  return baseLayout(content, isAdmin ? 'New Order Alert' : 'Order Confirmation - Engraving Nation');
};

export const orderStatusUpdateTemplate = (order: any, status: string) => {
  const statusLabels: Record<string, string> = {
    'processing': 'is now in PRODUCTION',
    'shipped': 'has been SHIPPED',
    'delivered': 'has been DELIVERED',
    'cancelled': 'has been CANCELLED',
  };

  const statusLabel = statusLabels[status] || 'has a new status';
  
  const content = `
    <h1 style="font-size: 24px; font-weight: 900; margin: 0 0 20px; text-transform: uppercase; font-style: italic; letter-spacing: -1px;">
      Status <span style="color: ${BRAND_GOLD};">Updated</span>
    </h1>
    <p style="font-size: 18px; font-weight: bold; margin: 0 0 15px;">
      Hello ${order.customer_name || order.firstName || 'Customer'},
    </p>
    <p style="font-size: 16px; font-weight: 300; margin: 0 0 25px; color: ${TEXT_GRAY}; line-height: 1.6;">
      Your order <span style="color: ${TEXT_WHITE}; font-weight: bold;">#${order.id}</span> ${statusLabel}.
    </p>
    
    <div style="padding: 25px; background-color: #1a1a1a; border-radius: 12px; border: 1px solid #222222; margin-bottom: 30px; text-align: center;">
        <span style="display: inline-block; padding: 10px 20px; background-color: ${BRAND_GOLD}; color: #000; font-weight: 900; text-transform: uppercase; font-size: 12px; border-radius: 4px; letter-spacing: 1px;">
            ${status.replace('_', ' ')}
        </span>
    </div>

    <p style="font-size: 14px; color: ${TEXT_GRAY};">
        You can track your order status on our website or reply to this email if you have any questions about your build.
    </p>
  `;
  return baseLayout(content, 'Order Status Updated - Engraving Nation');
};
