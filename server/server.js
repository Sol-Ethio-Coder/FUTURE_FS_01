// SERVER FILE
const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const dotenv = require('dotenv');
const nodemailer = require('nodemailer');

dotenv.config();

const app = express();

// CORS configuration
const allowedOrigins = [
  'http://localhost:5173',
  'http://localhost:5000',
  'https://solomon-ashagre-portfolio.netlify.app',
  'https://portfolio-backend-143v.onrender.com'
];

app.use(cors({
  origin: function(origin, callback) {
    if (!origin) return callback(null, true);
    if (allowedOrigins.indexOf(origin) === -1) {
      const msg = 'CORS policy does not allow access from this origin.';
      return callback(new Error(msg), false);
    }
    return callback(null, true);
  },
  credentials: true,
  methods: ['GET', 'POST', 'OPTIONS'],
  allowedHeaders: ['Content-Type', 'Authorization']
}));

app.use(express.json());

// MongoDB Connection using Atlas
mongoose.connect(process.env.MONGODB_URI)
  .then(() => console.log('✅ MongoDB Atlas connected successfully'))
  .catch(err => console.log('❌ MongoDB connection error:', err));

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
const transporter = nodemailer.createTransport({
  service: 'gmail',
  auth: {
    user: process.env.EMAIL_USER,
    pass: process.env.EMAIL_PASS,
  },
});

// Health check endpoint
app.get('/api/health', (req, res) => {
  res.json({ 
    status: 'OK', 
    message: 'Server is running',
    mongodb: mongoose.connection.readyState === 1 ? 'connected' : 'disconnected'
  });
});

// Get all messages (Admin only)
app.get('/api/messages', async (req, res) => {
  try {
    const messages = await Message.find().sort({ createdAt: -1 });
    res.json(messages);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// Contact form endpoint
app.post('/api/contact', async (req, res) => {
  console.log('📨 Contact form received:', req.body);
  
  const { name, email, subject, message } = req.body;

  if (!name || !email || !subject || !message) {
    return res.status(400).json({ error: 'All fields are required' });
  }

  try {
    // Save to database
    const newMessage = new Message({ name, email, subject, message });
    await newMessage.save();
    console.log(`📝 Message saved from ${email}`);

    // Send email notification (optional)
    if (process.env.EMAIL_USER && process.env.EMAIL_PASS && process.env.EMAIL_USER !== 'your-email@gmail.com') {
      try {
        const mailOptions = {
          from: `"Portfolio Contact" <${process.env.EMAIL_USER}>`,
          to: process.env.EMAIL_USER,
          subject: `New Portfolio Contact: ${subject}`,
          html: `
            <h3>New Contact Form Submission</h3>
            <p><strong>Name:</strong> ${name}</p>
            <p><strong>Email:</strong> ${email}</p>
            <p><strong>Subject:</strong> ${subject}</p>
            <p><strong>Message:</strong></p>
            <p>${message}</p>
          `,
        };
        await transporter.sendMail(mailOptions);
        console.log(`📧 Email sent to admin`);
        
        // Send auto-reply to user
        const autoReplyOptions = {
          from: `"Solomon Ashagre" <${process.env.EMAIL_USER}>`,
          to: email,
          subject: 'Thank you for contacting me!',
          html: `
            <h3>Hello ${name},</h3>
            <p>Thank you for reaching out to me. I've received your message and will get back to you within 24-48 hours.</p>
            <p>Best regards,<br/>Solomon Ashagre</p>
          `,
        };
        await transporter.sendMail(autoReplyOptions);
        console.log(`📧 Auto-reply sent to ${email}`);
      } catch (emailError) {
        console.error('Email error:', emailError);
      }
    }

    res.json({ success: true, message: 'Message sent successfully!' });
  } catch (error) {
    console.error('Error saving message:', error);
    res.status(500).json({ error: 'Failed to send message' });
  }
});

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`🚀 Server running on port ${PORT}`);
});