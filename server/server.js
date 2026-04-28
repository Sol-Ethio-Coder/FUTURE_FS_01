const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const dotenv = require('dotenv');
const nodemailer = require('nodemailer');

dotenv.config();

const app = express();

// CORS
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

// Email transporter
let transporter = null;
if (process.env.EMAIL_USER && process.env.EMAIL_PASS && process.env.EMAIL_USER !== 'solash5156@gmail.com') {
  transporter = nodemailer.createTransport({
    service: 'gmail',
    auth: {
      user: process.env.EMAIL_USER,
      pass: process.env.EMAIL_PASS,
    },
  });
  
  transporter.verify((error, success) => {
    if (error) {
      console.error('❌ Email configuration error:', error.message);
    } else {
      console.log('✅ Email server ready');
    }
  });
} else {
  console.log('⚠️ Email not configured - skipping email notifications');
}

// Health check
app.get('/api/health', (req, res) => {
  res.json({ status: 'OK', message: 'Server is running' });
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

    // Send emails if transporter is configured
    if (transporter) {
      try {
        // Send admin notification
        await transporter.sendMail({
          from: `"Portfolio Contact" <${process.env.EMAIL_USER}>`,
          to: process.env.EMAIL_USER,
          subject: `New Portfolio Message: ${subject}`,
          html: `<h3>New message from ${name}</h3><p><strong>Email:</strong> ${email}</p><p><strong>Message:</strong> ${message}</p>`,
        });
        
        // Send auto-reply
        await transporter.sendMail({
          from: `"Solomon Ashagre" <${process.env.EMAIL_USER}>`,
          to: email,
          subject: 'Thank you for contacting me!',
          html: `<h3>Hello ${name},</h3><p>Thank you for your message. I'll get back to you within 24-48 hours.</p><p>Best regards,<br/>Solomon Ashagre</p>`,
        });
        console.log('📧 Emails sent successfully');
      } catch (emailError) {
        console.error('Email error:', emailError.message);
      }
    }

    res.json({ success: true, message: 'Message sent successfully!' });
  } catch (error) {
    console.error('Error:', error);
    res.status(500).json({ error: 'Failed to send message. Please try again later.' });
  }
});

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`🚀 Server running on port ${PORT}`);
});