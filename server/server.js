const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const dotenv = require('dotenv');

// Load environment variables from .env file
dotenv.config();

const app = express();

// --- CORS Configuration (FIXED - No app.options with '*') ---
// Allow requests from your specific frontend origin.
const allowedOrigins = [
  process.env.CLIENT_URL || 'https://solomon-ashagre.netlify.app',
  'http://localhost:5173',
  'http://localhost:5000',
  'https://portfolio-backend-143v.onrender.com'
];

// Simplified CORS - This handles both regular and preflight requests
app.use(cors({
  origin: function (origin, callback) {
    // Allow requests with no origin (like mobile apps or curl)
    if (!origin) return callback(null, true);
    if (allowedOrigins.indexOf(origin) !== -1) {
      callback(null, true);
    } else {
      callback(new Error(`CORS policy does not allow access from origin: ${origin}`));
    }
  },
  credentials: true,
  methods: ['GET', 'POST', 'PUT', 'DELETE', 'OPTIONS'],
  allowedHeaders: ['Content-Type', 'Authorization', 'X-Requested-With']
}));

// DO NOT add app.options('*', cors()) - that causes the error

app.use(express.json());

// --- MongoDB Connection ---
const MONGODB_URI = process.env.MONGODB_URI || 'mongodb://localhost:27017/portfolio';
mongoose.connect(MONGODB_URI)
  .then(() => console.log('✅ MongoDB connected successfully'))
  .catch(err => {
    console.error('❌ MongoDB connection error:', err.message);
  });

// --- Mongoose Schema & Model ---
const messageSchema = new mongoose.Schema({
  name: { type: String, required: true },
  email: { type: String, required: true },
  subject: { type: String, required: true },
  message: { type: String, required: true },
  createdAt: { type: Date, default: Date.now }
});

const Message = mongoose.model('Message', messageSchema);

// --- API Routes ---

// Root route
app.get('/', (req, res) => {
  res.json({ message: 'Backend server is running!' });
});

// Health check endpoint
app.get('/api/health', (req, res) => {
  res.json({ 
    status: 'OK', 
    message: 'Server is running',
    mongodb: mongoose.connection.readyState === 1 ? 'connected' : 'disconnected'
  });
});

// Contact form endpoint
app.post('/api/contact', async (req, res) => {
  console.log('📨 Received request to /api/contact');
  console.log('Request body:', req.body);
  
  const { name, email, subject, message } = req.body;

  // Validation
  if (!name || !email || !subject || !message) {
    console.log('❌ Missing fields:', { name, email, subject, message });
    return res.status(400).json({ error: 'All fields (name, email, subject, message) are required.' });
  }

  try {
    // Save to MongoDB
    const newMessage = new Message({ name, email, subject, message });
    await newMessage.save();
    console.log('✅ Message saved to MongoDB');
    
    res.status(201).json({ 
      success: true, 
      message: 'Your message has been sent successfully!' 
    });
  } catch (error) {
    console.error('❌ Database error:', error);
    res.status(500).json({ error: 'Failed to save message due to a server error.' });
  }
});

// Get all messages (for testing/development only)
app.get('/api/messages', async (req, res) => {
  try {
    const messages = await Message.find().sort({ createdAt: -1 });
    res.json(messages);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`🚀 Server is now running on port ${PORT}`);
  console.log(`✅ CORS enabled for origins:`, allowedOrigins);
});