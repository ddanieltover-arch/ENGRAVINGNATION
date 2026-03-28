import nodemailer from 'nodemailer';
import dotenv from 'dotenv';

dotenv.config({ path: '.env.local' });

/**
 * Configure SMTP Transport
 * To enable real email delivery, add these to your .env.local:
 * SMTP_HOST, SMTP_PORT, SMTP_USER, SMTP_PASS, SMTP_FROM
 */
const transporter = nodemailer.createTransport({
  host: process.env.SMTP_HOST || 'smtp.gmail.com',
  port: parseInt(process.env.SMTP_PORT || '465'),
  secure: true, // true for 465, false for other ports
  auth: {
    user: process.env.SMTP_USER,
    pass: process.env.SMTP_PASS,
  },
});

export const ADMIN_EMAIL = 'info@engravingnation.store';

interface SendEmailParams {
  to: string;
  subject: string;
  html: string;
  replyTo?: string;
}

export async function sendEmail({ to, subject, html, replyTo }: SendEmailParams) {
  // If no SMTP user is provided, simulate delivery in development console
  if (!process.env.SMTP_USER) {
    console.log('--- [EMAIL SIMULATION] ---');
    console.log(`To: ${to}`);
    console.log(`Subject: ${subject}`);
    console.log(`Reply-To: ${replyTo || 'N/A'}`);
    console.log('Content (HTML):' + html.substring(0, 200) + '...');
    console.log('--- [END SIMULATION] ---');
    return { success: true, simulated: true };
  }

  try {
    const info = await transporter.sendMail({
      from: process.env.SMTP_FROM || `"Engraving Nation" <${process.env.SMTP_USER}>`,
      to,
      subject,
      html,
      replyTo,
    });
    console.log('Message sent: %s', info.messageId);
    return { success: true, messageId: info.messageId };
  } catch (error) {
    console.error('Error sending email:', error);
    return { success: false, error };
  }
}
