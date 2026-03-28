const nodemailer = require('nodemailer');
require('dotenv').config({ path: '.env.local' });

async function testSMTP() {
  console.log('Testing SMTP connection with:');
  console.log('Host:', process.env.SMTP_HOST);
  console.log('Port:', process.env.SMTP_PORT);
  console.log('User:', process.env.SMTP_USER);

  const transporter = nodemailer.createTransport({
    host: process.env.SMTP_HOST,
    port: parseInt(process.env.SMTP_PORT),
    secure: true,
    auth: {
      user: process.env.SMTP_USER,
      pass: process.env.SMTP_PASS,
    },
  });

  try {
    const info = await transporter.verify();
    console.log('✅ Connection successful!');
    
    const mailOptions = {
      from: process.env.SMTP_FROM,
      to: 'info@engravingnation.store',
      subject: 'SMTP Test - Engraving Nation',
      text: 'Test email from Engraving Nation system verification.',
      html: '<b>Test email</b> from Engraving Nation system verification.'
    };

    const result = await transporter.sendMail(mailOptions);
    console.log('✅ Test email sent: %s', result.messageId);
  } catch (error) {
    console.error('❌ Connection failed!');
    console.error(error);
  }
}

testSMTP();
