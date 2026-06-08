// ========== ENV VALIDATION — must be first, before anything else ==========
require('dotenv').config();

const REQUIRED_ENV = ['MONGODB_URI', 'JWT_SECRET', 'FRONTEND_URL'];
const missing = REQUIRED_ENV.filter((k) => !process.env[k]);
if (missing.length) {
  console.error(`FATAL: Missing required environment variables: ${missing.join(', ')}`);
  console.error('App will not start. Set them in your .env file or deployment dashboard.');
  process.exit(1);
}

// ========== Imports ==========
const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const helmet = require('helmet');
const compression = require('compression');
const morgan = require('morgan');
const rateLimit = require('express-rate-limit');

const app = express();

// ========== Rate Limiter — global ==========
const globalLimiter = rateLimit({
  windowMs: 15 * 60 * 1000, // 15 minutes
  max: 100,
  message: { error: 'Too many requests, please try again later.' },
  standardHeaders: true,
  legacyHeaders: false,
});

// ========== CORS — multi-origin support, no wildcard ==========
const ALLOWED_ORIGINS = (process.env.FRONTEND_URL || 'http://localhost:5173')
  .split(',')
  .map((o) => o.trim());

const corsOptions = {
  origin: (origin, cb) => {
    // Allow requests with no origin (mobile apps, curl, Postman)
    if (!origin || ALLOWED_ORIGINS.includes(origin)) return cb(null, true);
    cb(new Error(`CORS: origin ${origin} not allowed`));
  },
  credentials: true,
};

// ========== Middleware ==========
app.use(compression());
app.use(helmet());
app.use(cors(corsOptions));
app.use(morgan(process.env.NODE_ENV === 'production' ? 'combined' : 'dev'));
app.use(express.json({ limit: '10kb' }));
app.use(express.urlencoded({ extended: true, limit: '10kb' }));

// ========== Global rate limiter — applied to all /api routes ==========
app.use('/api/', globalLimiter);

// ========== Routes ==========
const subjectRoutes = require('./routes/subjects');
const branchRoutes = require('./routes/branches');
const adminRoutes = require('./routes/admin');

app.use('/api/subjects', subjectRoutes);
app.use('/api/branches', branchRoutes);
app.use('/api/admin', adminRoutes);

// ========== Health Check ==========
app.get('/api/health', (req, res) => {
  res.json({ status: 'OK', message: 'AKTU Buddy API is running' });
});

app.get('/', (req, res) => {
  res.json({ name: 'AKTU Buddy API', version: '1.0.0', status: 'Running' });
});

// ========== 404 handler ==========
app.use((req, res) => {
  res.status(404).json({ error: 'Route not found' });
});

// ========== Global Error Handler ==========
// FIXED: never leak internal error details in production
app.use((err, req, res, next) => {
  console.error(`[${new Date().toISOString()}] ERROR:`, err.stack);

  const isDev = process.env.NODE_ENV === 'development';

  // Handle CORS errors specifically
  if (err.message && err.message.startsWith('CORS:')) {
    return res.status(403).json({ error: 'Not allowed by CORS' });
  }

  res.status(err.status || 500).json({
    error: isDev ? err.message : 'Internal server error',
  });
});

// ========== MongoDB Connection ==========
const connectDB = async () => {
  try {
    await mongoose.connect(process.env.MONGODB_URI, {
      maxPoolSize: 10,
    });
    console.log('MongoDB Connected Successfully');
  } catch (error) {
    console.error('MongoDB Connection Error:', error.message);
    process.exit(1);
  }
};

// ========== Start Server ==========
const PORT = process.env.PORT || 5001;

const startServer = async () => {
  await connectDB();
  app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
    console.log(`Environment: ${process.env.NODE_ENV || 'development'}`);
    console.log(`Allowed origins: ${ALLOWED_ORIGINS.join(', ')}`);
  });
};

// ========== Process Error Handlers ==========
process.on('unhandledRejection', (err) => {
  console.error('Unhandled Rejection:', err.message);
  process.exit(1);
});

process.on('uncaughtException', (err) => {
  console.error('Uncaught Exception:', err.message);
  process.exit(1);
});

startServer();