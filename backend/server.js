const express = require('express');
const cors = require('cors');
const dotenv = require('dotenv');
const multer = require('multer');
const path = require('path');

dotenv.config();

const app = express();
const port = process.env.PORT || 5000;

// Middleware
app.use(cors());
app.use(express.json());

// Initialize JSON Database
const db = require('./jsonDb');


// Set up Multer for DICOM/image uploads
const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, 'uploads/');
  },
  filename: function (req, file, cb) {
    cb(null, Date.now() + '-' + file.originalname);
  }
});

const upload = multer({ storage: storage });

// Import routes
const authRoutes = require('./routes/auth');
const orderRoutes = require('./routes/orders');

// Mount routes
app.use('/api/auth', authRoutes);
app.use('/api/orders', orderRoutes);

// Products API — from database
app.get('/api/products', (req, res) => {
  try {
    const products = db.products.find();
    res.json(products);
  } catch (err) {
    res.status(500).json({ error: 'Failed to fetch products' });
  }
});

// Get all users (public profiles)
app.get('/api/users', (req, res) => {
  try {
    const users = db.users.find({}).map(u => db.users.toProfile(u));
    res.json(users);
  } catch (err) {
    res.status(500).json({ error: 'Failed to fetch users' });
  }
});

// AI Analysis endpoint
app.post('/api/analyze', upload.single('xray'), (req, res) => {
  if (!req.file && !req.body.demo) {
    return res.status(400).json({ error: 'Please upload a file or use demo' });
  }
  
  // Simulate AI analysis delay
  setTimeout(() => {
    res.json({
      success: true,
      results: {
        accuracy: '98.2%',
        findings: [
          { tooth: '26', issue: 'Caries detected — mesial surface (Stage II)', confidence: 0.95 },
          { tooth: '36', issue: 'Periapical radiolucency suspected', confidence: 0.88 },
          { tooth: '48', issue: 'Impacted third molar', confidence: 0.99 }
        ],
        normal: [
          'Bone levels within normal limits — Lower anterior',
          'No additional impacted teeth detected',
          'Sinus cavities clear and healthy'
        ],
        treatment: [
          { step: 1, action: 'RCT Tooth 36', priority: 'Emergency' },
          { step: 2, action: 'Composite restoration Tooth 26', priority: 'Urgent' },
          { step: 3, action: 'Periodontal therapy Q1', priority: 'Routine' },
          { step: 4, action: '3-month recall panoramic X-ray', priority: 'Follow-up' }
        ],
        recommendations: 'Follow up with clinical examination for teeth 26, 36, and consider extraction for 48.'
      }
    });
  }, 2500);
});

// Health check
app.get('/api/health', (req, res) => {
  res.json({ 
    status: 'OK', 
    db: 'JSON Storage Connected',
    timestamp: new Date().toISOString()
  });
});

app.listen(port, () => {
  console.log(`🦈 DentalShark API running on port ${port}`);
});
