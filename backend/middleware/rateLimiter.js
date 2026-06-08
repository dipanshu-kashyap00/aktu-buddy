const rateLimit = require('express-rate-limit');

// ========== Strict limiter for admin login only ==========
// 5 attempts per 15 min per IP — stops brute force
const loginLimiter = rateLimit({
  windowMs: 15 * 60 * 1000, // 15 minutes
  max: 5,
  message: {
    error: 'Too many login attempts. Please try again in 15 minutes.',
  },
  skipSuccessfulRequests: true, // successful logins don't count toward limit
  standardHeaders: true,
  legacyHeaders: false,
});

// ========== Upload limiter ==========
// Prevent upload spam — 20 uploads per hour per IP
const uploadLimiter = rateLimit({
  windowMs: 60 * 60 * 1000, // 1 hour
  max: 20,
  message: {
    error: 'Too many uploads. Please try again later.',
  },
  standardHeaders: true,
  legacyHeaders: false,
});

module.exports = { loginLimiter, uploadLimiter };