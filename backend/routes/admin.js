const express = require('express');
const router = express.Router();
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const Admin = require('../models/Admin');
const auth = require('../middleware/auth');
const { loginLimiter } = require('../middleware/rateLimiter');

// ========== POST /api/admin/login ==========
// FIXED: loginLimiter — max 5 attempts per 15 min per IP
// FIXED: JWT expiry reduced from 7d to 8h
// FIXED: response no longer sends role (it's in the token already)
router.post('/login', loginLimiter, async (req, res, next) => {
  try {
    const { email, password } = req.body;

    // Basic presence check
    if (!email || !password) {
      return res.status(400).json({ error: 'Email and password are required' });
    }

    const admin = await Admin.findOne({ email: email.toLowerCase().trim() });

    // Use the same error message for missing user and wrong password
    // This prevents user enumeration (attacker can't tell which is wrong)
    if (!admin) {
      return res.status(401).json({ error: 'Invalid credentials' });
    }

    const isMatch = await bcrypt.compare(password, admin.password);
    if (!isMatch) {
      return res.status(401).json({ error: 'Invalid credentials' });
    }

    // FIXED: 8h expiry instead of 7d
    const token = jwt.sign(
      { id: admin._id, email: admin.email, role: admin.role },
      process.env.JWT_SECRET,
      { expiresIn: '8h' }
    );

    // FIXED: don't send role in body — it's inside the JWT
    res.json({
      token,
      admin: {
        id: admin._id,
        email: admin.email,
      },
    });
  } catch (error) {
    // Error handler in server.js will sanitize the message in production
    const err = new Error(error.message);
    err.status = 500;
    next(err);
  }
});

// ========== GET /api/admin/me — verify token + get current admin info ==========
router.get('/me', auth, async (req, res, next) => {
  try {
    const admin = await Admin.findById(req.admin.id).select('-password');
    if (!admin) return res.status(404).json({ error: 'Admin not found' });
    res.json(admin);
  } catch (error) {
    next(error);
  }
});

module.exports = router;