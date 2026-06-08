require('dotenv').config();
const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const helmet = require('helmet');
const compression = require('compression');
const morgan = require('morgan');
const rateLimit = require('express-rate-limit');

const app = express();

// ========== Rate Limiter ==========
const limiter = rateLimit({
  windowMs: 15 * 60 * 1000,
  max: 100,
  message: { error: 'Too many requests, please try again later.' }
});

// ========== OPTIMIZATIONS ==========
app.use(compression());
app.use(helmet());
app.use(cors({
    origin: process.env.FRONTEND_URL || 'http://localhost:5173',
    credentials: true
}));
app.use(morgan('dev'));
app.use(express.json({ limit: '10kb' }));
app.use(express.urlencoded({ extended: true, limit: '10kb' }));

// ========== Rate Limiter — routes se pehle ==========
app.use('/api/', limiter);

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
    res.json({ name: 'AKTU Buddy API', version: '1.0.0', status: '🚀 Running' });
});

// ========== Error Handler ==========
app.use((err, req, res, next) => {
    console.error(err.stack);
    res.status(500).json({ error: err.message || 'Internal Server Error' });
});

// ========== MongoDB Connection ==========
const connectDB = async () => {
    try {
        await mongoose.connect(process.env.MONGODB_URI, {
            maxPoolSize: 10,
        });
        console.log('✅ MongoDB Connected Successfully');
    } catch (error) {
        console.error('❌ MongoDB Connection Error:', error.message);
        process.exit(1);
    }
};

// ========== Start Server ==========
const PORT = process.env.PORT || 5001;

const startServer = async () => {
    await connectDB();
    app.listen(PORT, () => {
        console.log(`🚀 Server running on port ${PORT}`);
        console.log(`📍 http://localhost:${PORT}`);
    });
};

process.on('unhandledRejection', (err) => {
  console.error('Unhandled Rejection:', err.message);
  process.exit(1);
});

process.on('uncaughtException', (err) => {
  console.error('Uncaught Exception:', err.message);
  process.exit(1);
});

startServer();