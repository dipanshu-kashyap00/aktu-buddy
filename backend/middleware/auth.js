const jwt = require('jsonwebtoken');

const auth = (req, res, next) => {
  const authHeader = req.header('Authorization');

  if (!authHeader || !authHeader.startsWith('Bearer ')) {
    return res.status(401).json({ error: 'No token, access denied' });
  }

  const token = authHeader.replace('Bearer ', '').trim();

  if (!token) {
    return res.status(401).json({ error: 'No token, access denied' });
  }

  try {
    // JWT_SECRET is guaranteed to exist — server.js crashes on startup if missing
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    req.admin = decoded;
    next();
  } catch (err) {
    // Distinguish expired vs invalid — helpful for frontend to know
    if (err.name === 'TokenExpiredError') {
      return res.status(401).json({ error: 'Token expired, please log in again' });
    }
    return res.status(401).json({ error: 'Invalid token' });
  }
};

module.exports = auth;