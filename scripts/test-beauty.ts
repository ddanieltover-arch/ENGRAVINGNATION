import dotenv from 'dotenv';
dotenv.config({ path: '.env.local' });
import { sendEmail } from '../lib/email';
import { newsletterWelcomeTemplate } from '../lib/email-templates';

async function testBeautifulEmail() {
  console.log('Sending a beautiful template email for verification...');
  
  const result = await sendEmail({
    to: 'info@engravingnation.store',
    subject: 'Welcome to the Nation - Beauty Test',
    html: newsletterWelcomeTemplate('info@engravingnation.store')
  });

  if (result.success) {
    console.log('✅ Beautiful email sent! ID:', result.messageId);
  } else {
    console.error('❌ Failed to send beautiful email:', result.error);
  }
}

testBeautifulEmail();
