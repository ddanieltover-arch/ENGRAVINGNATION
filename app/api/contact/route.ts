import { NextResponse } from 'next/server';
import { sendEmail, ADMIN_EMAIL } from '@/lib/email';
import { contactAutoReplyTemplate, contactAdminAlertTemplate } from '@/lib/email-templates';

export async function POST(req: Request) {
  try {
    const { firstName, lastName, email, subject, message } = await req.json();

    if (!email || !message) {
      return NextResponse.json({ success: false, error: 'Email and Message are required' }, { status: 400 });
    }

    const name = `${firstName} ${lastName}`.trim() || 'Valued Customer';

    // 1. Notify Admin Alert Template
    await sendEmail({
      to: ADMIN_EMAIL,
      subject: `[CONTACT FORM] ${subject}`,
      html: contactAdminAlertTemplate({
        name,
        email,
        subject,
        message,
      }),
      replyTo: email,
    });

    // 2. Send Auto-Reply to User
    await sendEmail({
      to: email,
      subject: 'Message Received - Engraving Nation',
      html: contactAutoReplyTemplate(name),
    });

    return NextResponse.json({ success: true });
  } catch (error: any) {
    console.error('Contact error:', error);
    return NextResponse.json({ success: false, error: error.message }, { status: 500 });
  }
}
