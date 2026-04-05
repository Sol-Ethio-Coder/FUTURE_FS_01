
const nodemailer = require('nodemailer');
require('dotenv').config();

async function testEmail() {
  console.log('📧 Testing email configuration...');
  console.log('Email user:', process.env.EMAIL_USER);
  
  const transporter = nodemailer.createTransport({
    service: 'gmail',
    auth: {
      user: process.env.EMAIL_USER,
      pass: process.env.EMAIL_PASS,
    },
  });
  
  try {
    await transporter.verify();
    console.log('✅ Email configuration is valid!');
    
    // Send a test email
    const info = await transporter.sendMail({
      from: `"Portfolio Test" <${process.env.EMAIL_USER}>`,
      to: process.env.EMAIL_USER,
      subject: 'Test Email',
      text: 'Your email configuration is working!',
    });
    console.log('✅ Test email sent:', info.messageId);
    
  } catch (error) {
    console.error('❌ Email error:', error.message);
    console.log('\n💡 Troubleshooting:');
    console.log('1. Make sure 2FA is enabled on your Gmail');
    console.log('2. Generate an App Password (not your regular password)');
    console.log('3. Check EMAIL_USER and EMAIL_PASS in .env');
  }
}

testEmail();