const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const dotenv = require('dotenv');
const nodemailer = require('nodemailer');

// Load environment variables
dotenv.config();

const app = express();

// CORS
app.use(cors({
  origin: '*',
  methods: ['GET', 'POST', 'OPTIONS'],
  allowedHeaders: ['Content-Type']
}));

app.use(express.json());

// Debug logging
console.log('=== SERVER STARTUP ===');
console.log('EMAIL_USER:', process.env.EMAIL_USER || 'NOT SET');
console.log('EMAIL_PASS:', process.env.EMAIL_PASS ? 'SET (length: ' + process.env.EMAIL_PASS.length + ')' : 'NOT SET');
console.log('MONGODB_URI:', process.env.MONGODB_URI ? 'SET' : 'NOT SET');

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

// Email configuration
let transporter = null;
let emailEnabled = false;

// Check if email credentials are properly configured
if (process.env.EMAIL_USER && process.env.EMAIL_PASS && 
    process.env.EMAIL_USER !== 'undefined' && 
    process.env.EMAIL_PASS !== 'undefined' &&
    process.env.EMAIL_USER !== '' && 
    process.env.EMAIL_PASS !== '') {
  
  try {
    transporter = nodemailer.createTransport({
      service: 'gmail',
      auth: {
        user: process.env.EMAIL_USER,
        pass: process.env.EMAIL_PASS,
      },
      tls: {
        rejectUnauthorized: false
      },
      debug: true // Enable debug for more info
    });
    
    emailEnabled = true;
    console.log('✅ Email transporter created');
    
    // Verify connection
    transporter.verify((error, success) => {
      if (error) {
        console.error('❌ Email verification failed:', error.message);
        emailEnabled = false;
      } else {
        console.log('✅ Email server verified and ready');
      }
    });
  } catch (err) {
    console.error('❌ Failed to create email transporter:', err.message);
    emailEnabled = false;
  }
} else {
  console.log('⚠️ Email credentials missing - email notifications disabled');
  console.log('   To enable email, set EMAIL_USER and EMAIL_PASS in Render environment variables');
}

// Health check
app.get('/api/health', (req, res) => {
  res.json({ 
    status: 'OK', 
    message: 'Server is running',
    emailEnabled: emailEnabled,
    mongodb: mongoose.connection.readyState === 1 ? 'connected' : 'disconnected'
  });
});

// Contact form endpoint
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

    // Send emails if enabled
    if (emailEnabled && transporter) {
      try {
        // Send admin notification
        await transporter.sendMail({
          from: `"Solomon Ashagre Portfolio" <${process.env.EMAIL_USER}>`,
          to: process.env.EMAIL_USER,
          subject: `New Portfolio Message: ${subject}`,
          html: `
            <!DOCTYPE html>
            <html>
            <head><style>body{font-family:Arial;padding:20px}</style></head>
            <body>
              <h2>New Contact Form Submission</h2>
              <p><strong>Name:</strong> ${name}</p>
              <p><strong>Email:</strong> ${email}</p>
              <p><strong>Subject:</strong> ${subject}</p>
              <p><strong>Message:</strong></p>
              <p>${message}</p>
              <hr>
              <p>Sent from your portfolio website</p>
            </body>
            </html>
          `,
        });
        console.log('📧 Admin email sent to:', process.env.EMAIL_USER);
        
        // Send auto-reply to user
        await transporter.sendMail({
          from: `"Solomon Ashagre" <${process.env.EMAIL_USER}>`,
          to: email,
          subject: 'Thank you for contacting me!',
          html: `
            <!DOCTYPE html>
            <html>
            <head><style>body{font-family:Arial;padding:20px}</style></head>
            <body>
              <h2>Hello ${name},</h2>
              <p>Thank you for reaching out to me. I've received your message and will get back to you within 24-48 hours.</p>
              <p><strong>Your message:</strong></p>
              <p>"${message}"</p>
              <br>
              <p>Best regards,<br/>Solomon Ashagre</p>
              <hr>
              <p><small>This is an automated response. Please do not reply to this email.</small></p>
            </body>
            </html>
          `,
        });
        console.log('📧 Auto-reply sent to:', email);
        
      } catch (emailError) {
        console.error('❌ Email sending error:', emailError.message);
        // Don't fail the request if email fails - message is already saved
      }
    } else {
      console.log('⚠️ Email notifications skipped (emailEnabled = false)');
    }

    res.json({ 
      success: true, 
      message: emailEnabled ? 'Message sent successfully! Check your email for confirmation.' : 'Message sent successfully!'
    });
    
  } catch (error) {
    console.error('❌ Server error:', error);
    res.status(500).json({ error: 'Failed to send message. Please try again later.' });
  }
});

// Get all messages (admin only - for testing)
app.get('/api/messages', async (req, res) => {
  try {
    const messages = await Message.find().sort({ createdAt: -1 }).limit(10);
    res.json(messages);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`🚀 Server running on port ${PORT}`);
  console.log(`📧 Email notifications: ${emailEnabled ? 'ENABLED' : 'DISABLED'}`);
});