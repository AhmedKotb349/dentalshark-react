const express = require('express');
const jwt = require('jsonwebtoken');
const db = require('../jsonDb');
const router = express.Router();

// Validate email format
function isValidEmail(email) {
  const re = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
  return re.test(email);
}

// Validate password strength
function isStrongPassword(password) {
  const errors = [];
  if (password.length < 8) errors.push('at least 8 characters');
  if (!/[A-Z]/.test(password)) errors.push('an uppercase letter');
  if (!/[a-z]/.test(password)) errors.push('a lowercase letter');
  if (!/[0-9]/.test(password)) errors.push('a number');
  if (!/[!@#$%^&*()_+\-=\[\]{};':"\\|,.<>\/?]/.test(password)) errors.push('a special character (!@#$%^&*)');
  return { valid: errors.length === 0, errors };
}

// Generate JWT token
function generateToken(user) {
  return jwt.sign(
    { id: user._id, uid: user.uid, email: user.email, role: user.role },
    process.env.JWT_SECRET,
    { expiresIn: '24h' }
  );
}

// POST /api/auth/login
router.post('/login', async (req, res) => {
  try {
    const { email, password, guest } = req.body;

    // Guest login — no auth needed
    if (guest) {
      const guestUser = db.users.findOne({ uid: 'guest' });
      if (!guestUser) return res.status(404).json({ error: 'Guest account not found' });
      const token = generateToken(guestUser);
      return res.json({ success: true, token, user: db.users.toProfile(guestUser) });
    }

    // Validate inputs
    if (!email || !password) {
      return res.status(400).json({ error: 'Email and password are required' });
    }

    if (!isValidEmail(email)) {
      return res.status(400).json({ error: 'Please enter a valid email address (must contain @)' });
    }

    // Find user by email
    const user = db.users.findOne({ email: email.toLowerCase().trim() });
    if (!user) {
      return res.status(401).json({ error: 'No account found with this email' });
    }

    // Verify password
    const isMatch = await db.users.comparePassword(password, user.password);
    if (!isMatch) {
      return res.status(401).json({ error: 'Incorrect password' });
    }

    // Generate token
    const token = generateToken(user);
    res.json({ success: true, token, user: db.users.toProfile(user) });
  } catch (err) {
    console.error('Login error:', err);
    res.status(500).json({ error: 'Server error during authentication' });
  }
});

// POST /api/auth/register
router.post('/register', async (req, res) => {
  try {
    const { name, email, password, role, phone } = req.body;

    if (!name || !email || !password) {
      return res.status(400).json({ error: 'Name, email, and password are required' });
    }

    if (!isValidEmail(email)) {
      return res.status(400).json({ error: 'Please enter a valid email address' });
    }

    const pwCheck = isStrongPassword(password);
    if (!pwCheck.valid) {
      return res.status(400).json({ error: 'Password must contain: ' + pwCheck.errors.join(', ') });
    }

    // Check if email already exists
    const existing = db.users.findOne({ email: email.toLowerCase().trim() });
    if (existing) {
      return res.status(409).json({ error: 'An account with this email already exists' });
    }

    // Create user
    const initials = name.split(' ').map(w => w[0]).join('').toUpperCase().slice(0, 2);
    const colors = [
      'linear-gradient(135deg,#1d4ed8,#3b82f6)',
      'linear-gradient(135deg,#7c3aed,#a855f7)',
      'linear-gradient(135deg,#059669,#10b981)',
      'linear-gradient(135deg,#d97706,#f59e0b)',
      'linear-gradient(135deg,#db2777,#f472b6)',
      'linear-gradient(135deg,#0891b2,#22d3ee)',
    ];
    const color = colors[Math.floor(Math.random() * colors.length)];

    const userObj = {
      uid: 'u_' + Date.now(),
      name,
      email: email.toLowerCase().trim(),
      password,
      role: role || 'Doctor',
      dept: role === 'Vendor' ? 'Supply Partner' : role === 'Student' ? 'Dental Student' : 'Dental Professional',
      phone: phone || '—',
      initials,
      color,
      joined: new Date().toLocaleDateString('en-US', { month: 'short', year: 'numeric' }),
      orders: 0,
      sharkPts: 0,
      spent: '—'
    };

    const user = await db.users.insert(userObj);
    const token = generateToken(user);
    res.status(201).json({ success: true, token, user: db.users.toProfile(user) });
  } catch (err) {
    console.error('Register error:', err);
    res.status(500).json({ error: 'Server error during registration' });
  }
});

// GET /api/auth/me (protected)
router.get('/me', async (req, res) => {
  try {
    const authHeader = req.headers.authorization;
    if (!authHeader || !authHeader.startsWith('Bearer ')) {
      return res.status(401).json({ error: 'Not authenticated' });
    }
    const token = authHeader.split(' ')[1];
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    const user = db.users.findById(decoded.id);
    if (!user) return res.status(404).json({ error: 'User not found' });
    res.json({ user: db.users.toProfile(user) });
  } catch (err) {
    res.status(401).json({ error: 'Invalid or expired token' });
  }
});

module.exports = router;
