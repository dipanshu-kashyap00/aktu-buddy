require('dotenv').config();
const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const helmet = require('helmet');
const compression = require('compression');
const morgan = require('morgan');
const path = require('path');

const app = express();

// ========== OPTIMIZATIONS ==========
app.use(compression());
app.use(helmet());
app.use(cors({
    origin: process.env.FRONTEND_URL || 'http://localhost:5173',
    credentials: true
}));
app.use(morgan('dev'));
// app.use(express.json({ limit: '50mb' }));
// app.use(express.urlencoded({ extended: true, limit: '50mb' }));
app.use(express.json({ limit: '10kb' }));        // regular routes
app.use(express.urlencoded({ extended: true, limit: '10kb' }));


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

// ========== Routes ==========
// ========== Routes ==========
const subjectRoutes = require('./routes/subjects');
const branchRoutes = require('./routes/branches');
const adminRoutes = require('./routes/admin');

app.use('/api/', limiter); 
app.use('/api/subjects', subjectRoutes);
app.use('/api/branches', branchRoutes);
app.use('/api/admin', adminRoutes);

// limiting on API — server can be hammered
const rateLimit = require('express-rate-limit');

const limiter = rateLimit({
  windowMs: 15 * 60 * 1000, // 15 minutes
  max: 100,
  message: { error: 'Too many requests, please try again later.' }
});



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

// ========== Start Server ==========
const PORT = process.env.PORT || 5000;

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