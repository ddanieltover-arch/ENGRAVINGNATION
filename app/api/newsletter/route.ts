import { NextResponse } from 'next/server';
import { sendEmail, ADMIN_EMAIL } from '@/lib/email';
import { newsletterWelcomeTemplate, contactAdminAlertTemplate } from '@/lib/email-templates';
import { getJsonData, saveJsonData } from '@/lib/data';

const SUBSCRIBERS_FILE = 'data/subscribers.json';

export async function POST(req: Request) {
  try {
    const { email } = await req.json();

    if (!email || !email.includes('@')) {
      return NextResponse.json({ success: false, error: 'Invalid email address' }, { status: 400 });
    }

    // 1. Save to subscribers.json
    const subscribers = getJsonData(SUBSCRIBERS_FILE) || [];
    if (!subscribers.find((s: any) => s.email === email)) {
      subscribers.push({
        email,
        created_at: new Date().toISOString()
      });
      saveJsonData(SUBSCRIBERS_FILE, subscribers);
    }

    // 2. Send Welcome Email to Subscriber
    await sendEmail({
      to: email,
      subject: 'Welcome to the Nation - Engraving Nation',
      html: newsletterWelcomeTemplate(email),
    });

    // 3. Notify Admin
    await sendEmail({
      to: ADMIN_EMAIL,
      subject: 'New Newsletter Subscriber',
      html: contactAdminAlertTemplate({
        name: 'New Subscriber',
        email: email,
        subject: 'Newsletter Subscription',
        message: `A new user has subscribed to the newsletter: ${email}`
      }),
    });

    return NextResponse.json({ success: true });
  } catch (error: any) {
    console.error('Newsletter error:', error);
    return NextResponse.json({ success: false, error: error.message }, { status: 500 });
  }
}
