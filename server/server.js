// server/server.js
const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const dotenv = require('dotenv');

// Load environment variables from .env file
dotenv.config();

const app = express();

// --- CORS Configuration (The Fix) ---
// Allow requests from your specific frontend origin.
// We use an array to be explicit and secure.
const allowedOrigins = [
  process.env.CLIENT_URL, // Loads 'https://solomon-ashagre.netlify.app'
  'http://localhost:5173', // For local development
];

app.use(cors({
  origin: function (origin, callback) {
    // Allow requests with no origin (like mobile apps or curl)
    if (!origin) return callback(null, true);
    if (allowedOrigins.indexOf(origin) === -1) {
      const msg = `The CORS policy for this site does not allow access from the specified Origin: ${origin}`;
      return callback(new Error(msg), false);
    }
    return callback(null, true);
  },
  credentials: true, // Allow cookies if you ever need them
  methods: ['GET', 'POST', 'OPTIONS'],
  allowedHeaders: ['Content-Type', 'Authorization']
}));

// Handle preflight requests (OPTIONS method) automatically
app.options('*', cors()); 
// --- End of CORS Configuration ---

app.use(express.json());

// --- MongoDB Connection ---
mongoose.connect(process.env.MONGODB_URI)
  .then(() => console.log('✅ MongoDB connected successfully'))
  .catch(err => {
    console.error('❌ MongoDB connection error:', err.message);
    // Don't let the app exit, but log the error. The server can still run.
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
app.get('/api/health', (req, res) => {
  res.json({ status: 'OK', message: 'Server is running' });
});

app.post('/api/contact', async (req, res) => {
  console.log('📨 Received a request to /api/contact');
  console.log('Request body:', req.body);
  
  const { name, email, subject, message } = req.body;

  if (!name || !email || !subject || !message) {
    return res.status(400).json({ error: 'All fields (name, email, subject, message) are required.' });
  }

  try {
    const newMessage = new Message({ name, email, subject, message });
    await newMessage.save();
    console.log('✅ Message saved to MongoDB');
    res.status(201).json({ success: true, message: 'Your message has been sent successfully!' });
  } catch (error) {
    console.error('❌ Database error:', error);
    res.status(500).json({ error: 'Failed to save message due to a server error.' });
  }
});

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`🚀 Server is now running on port ${PORT}`);
});