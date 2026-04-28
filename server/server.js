const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const dotenv = require('dotenv');
const nodemailer = require('nodemailer');

dotenv.config();

const app = express();

// CORS - Allow all origins for testing
app.use(cors({
  origin: '*',
  methods: ['GET', 'POST', 'OPTIONS'],
  allowedHeaders: ['Content-Type']
}));

app.use(express.json());

// MongoDB Connection
mongoose.connect(process.env.MONGODB_URI)
  .then(() => console.log('✅ MongoDB connected'))
  .catch(err => console.log('❌ MongoDB error:', err.message));

// Message Schema
const messageSchema = new mongoose.Schema({
  name: { type: String, required: true },
  email: { type: String, required: true },
  subject: { type: String, required: true },
  message: { type: String, required: true },
  createdAt: { type: Date, default: Date.now }
});

const Message = mongoose.model('Message', messageSchema);

// Email transporter configuration
const transporter = nodemailer.createTransport({
  service: 'gmail',
  auth: {
    user: process.env.EMAIL_USER,
    pass: process.env.EMAIL_PASS,
  },
});

// Verify email configuration on startup
transporter.verify((error, success) => {
  if (error) {
    console.error('❌ Email configuration error:', error);
  } else {
    console.log('✅ Email server is ready to send messages');
  }
});

// Health check
app.get('/api/health', (req, res) => {
  res.json({ status: 'OK', message: 'Server is running' });
});

// Contact form endpoint with email notifications
app.post('/api/contact', async (req, res) => {
  console.log('📨 Contact form received:', req.body);
  
  const { name, email, subject, message } = req.body;

  if (!name || !email || !subject || !message) {
    return res.status(400).json({ error: 'All fields are required' });
  }

  try {
    // Save to MongoDB
    const newMessage = new Message({ name, email, subject, message });
    await newMessage.save();
    console.log('📝 Message saved to MongoDB');

    // Send email notification to admin
    const mailOptions = {
      from: `"Portfolio Contact" <${process.env.EMAIL_USER}>`,
      to: process.env.EMAIL_USER,
      subject: `New Portfolio Message: ${subject}`,
      html: `
        <!DOCTYPE html>
        <html>
        <head>
          <style>
            body { font-family: Arial, sans-serif; line-height: 1.6; }
            .container { max-width: 600px; margin: 0 auto; padding: 20px; }
            .header { background: #667eea; color: white; padding: 20px; text-align: center; }
            .content { padding: 20px; background: #f9f9f9; }
            .field { margin-bottom: 15px; }
            .label { font-weight: bold; color: #333; }
          </style>
        </head>
        <body>
          <div class="container">
            <div class="header">
              <h2>New Contact Form Submission</h2>
            </div>
            <div class="content">
              <div class="field">
                <div class="label">Name:</div>
                <div>${name}</div>
              </div>
              <div class="field">
                <div class="label">Email:</div>
                <div>${email}</div>
              </div>
              <div class="field">
                <div class="label">Subject:</div>
                <div>${subject}</div>
              </div>
              <div class="field">
                <div class="label">Message:</div>
                <div>${message}</div>
              </div>
            </div>
          </div>
        </body>
        </html>
      `,
    };

    await transporter.sendMail(mailOptions);
    console.log('📧 Email notification sent to admin');

    // Send auto-reply to user
    const autoReplyOptions = {
      from: `"Solomon Ashagre" <${process.env.EMAIL_USER}>`,
      to: email,
      subject: 'Thank you for contacting me!',
      html: `
        <!DOCTYPE html>
        <html>
        <head>
          <style>
            body { font-family: Arial, sans-serif; line-height: 1.6; }
            .container { max-width: 600px; margin: 0 auto; padding: 20px; }
            .header { background: #667eea; color: white; padding: 20px; text-align: center; }
            .content { padding: 20px; background: #f9f9f9; }
            .footer { text-align: center; padding: 20px; color: #666; }
          </style>
        </head>
        <body>
          <div class="container">
            <div class="header">
              <h2>Hello ${name}!</h2>
            </div>
            <div class="content">
              <p>Thank you for reaching out to me. I've received your message and will get back to you within 24-48 hours.</p>
              <p>Here's a copy of your message:</p>
              <hr/>
              <p><strong>Subject:</strong> ${subject}</p>
              <p><strong>Message:</strong></p>
              <p>${message}</p>
              <hr/>
              <p>Best regards,<br/>Solomon Ashagre</p>
            </div>
            <div class="footer">
              <p>This is an automated response. Please do not reply to this email.</p>
            </div>
          </div>
        </body>
        </html>
      `,
    };

    await transporter.sendMail(autoReplyOptions);
    console.log('📧 Auto-reply sent to user');

    res.json({ success: true, message: 'Message sent successfully! Check your email for confirmation.' });
  } catch (error) {
    console.error('Error:', error);
    res.status(500).json({ error: 'Failed to send message. Please try again later.' });
  }
});

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`🚀 Server running on port ${PORT}`);
});