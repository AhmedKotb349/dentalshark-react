const express = require('express');
const router = express.Router();
const db = require('../jsonDb');
const jwt = require('jsonwebtoken');

// Auth middleware
function auth(req, res, next) {
  try {
    const authHeader = req.headers.authorization;
    if (!authHeader || !authHeader.startsWith('Bearer ')) {
      return res.status(401).json({ error: 'Not authenticated' });
    }
    const token = authHeader.split(' ')[1];
    req.user = jwt.verify(token, process.env.JWT_SECRET);
    next();
  } catch (err) {
    res.status(401).json({ error: 'Invalid token' });
  }
}

// POST /api/orders — Create order
router.post('/', auth, async (req, res) => {
  try {
    const { items, subtotal, shipping, total, paymentMethod, address } = req.body;
    if (!items || !items.length) return res.status(400).json({ error: 'Cart is empty' });

    const orderId = '#DS-' + String(Math.floor(Math.random() * 90000) + 10000);
    const trackingId = 'TRK-' + Date.now().toString(36).toUpperCase();
    const ptsEarned = items.reduce((a, b) => a + (b.pts || 0) * (b.qty || 1), 0);

    const d1 = new Date(); d1.setDate(d1.getDate() + 3);
    const d2 = new Date(); d2.setDate(d2.getDate() + 5);
    const fmt = dt => dt.toLocaleDateString('en-EG', { month: 'short', day: 'numeric' });
    const estimatedDelivery = fmt(d1) + ' – ' + fmt(d2) + ', ' + d1.getFullYear();

    const user = db.users.findById(req.user.id);

    const orderObj = {
      orderId,
      userId: req.user.id,
      items,
      subtotal: subtotal || items.reduce((a, b) => a + b.price * b.qty, 0),
      shipping: shipping || 150,
      total: total || items.reduce((a, b) => a + b.price * b.qty, 0) + 150,
      paymentMethod: paymentMethod || 'COD',
      trackingId,
      ptsEarned,
      estimatedDelivery,
      address: address || '',
      status: 'Pending',
    };
    
    const order = db.orders.insert(orderObj);

    // Update user's shark points and order count
    if (user) {
      db.users.update(user._id, {
        sharkPts: (user.sharkPts || 0) + ptsEarned,
        orders: (user.orders || 0) + 1
      });
    }

    res.status(201).json({ success: true, order, ptsEarned });
  } catch (err) {
    console.error('Create order error:', err);
    res.status(500).json({ error: 'Failed to create order' });
  }
});

// GET /api/orders — Get user's orders
router.get('/', auth, (req, res) => {
  try {
    const orders = db.orders.find({ userId: req.user.id }).sort((a, b) => new Date(b.createdAt) - new Date(a.createdAt));
    res.json(orders);
  } catch (err) {
    res.status(500).json({ error: 'Failed to fetch orders' });
  }
});

// GET /api/orders/track/:trackingId — Track order by tracking ID (public)
router.get('/track/:trackingId', (req, res) => {
  try {
    const order = db.orders.findOne({ trackingId: req.params.trackingId });
    if (!order) {
      // Also try by orderId
      const orderById = db.orders.findOne({ orderId: req.params.trackingId });
      if (!orderById) return res.status(404).json({ error: 'Order not found. Please check your tracking ID.' });
      return res.json({
        orderId: orderById.orderId,
        trackingId: orderById.trackingId,
        status: orderById.status,
        estimatedDelivery: orderById.estimatedDelivery,
        items: orderById.items.length,
        total: orderById.total,
        paymentMethod: orderById.paymentMethod,
        createdAt: orderById.createdAt,
      });
    }
    res.json({
      orderId: order.orderId,
      trackingId: order.trackingId,
      status: order.status,
      estimatedDelivery: order.estimatedDelivery,
      items: order.items.length,
      total: order.total,
      paymentMethod: order.paymentMethod,
      createdAt: order.createdAt,
    });
  } catch (err) {
    res.status(500).json({ error: 'Failed to track order' });
  }
});

module.exports = router;
