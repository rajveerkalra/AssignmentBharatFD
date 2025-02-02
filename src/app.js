const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const swaggerUi = require('swagger-ui-express');
const path = require('path');
require('dotenv').config();

// Import configurations
const swaggerSpecs = require('./config/swagger');
const { 
    securityMiddleware, 
    limiter, 
    corsOptions 
} = require('./config/security');
const logger = require('./config/logger');

// Import middleware
const { errorHandler, notFound } = require('./middleware/error.middleware');
const cacheMiddleware = require('./middleware/cache.middleware');

// Import routes
const faqRoutes = require('./routes/faq.routes');
const adminRoutes = require('./routes/admin.routes');

// Create Express app
const app = express();

// Database connection
mongoose.connect(process.env.MONGODB_URI, {
    useNewUrlParser: true,
    useUnifiedTopology: true
})
.then(() => {
    logger.info('Connected to MongoDB');
})
.catch((error) => {
    logger.error('MongoDB connection error:', error);
    process.exit(1);
});

// Security Middleware
app.use(cors(corsOptions));
app.use(limiter);
securityMiddleware.forEach(middleware => app.use(middleware));

// Body parsing
app.use(express.json({ limit: '10kb' }));
app.use(express.urlencoded({ extended: true, limit: '10kb' }));

// Static files
app.use(express.static(path.join(__dirname, 'public')));

// API Documentation
app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(swaggerSpecs));

// Health check endpoint
app.get('/health', (req, res) => {
    res.status(200).json({
        status: 'success',
        message: 'Server is healthy',
        timestamp: new Date().toISOString()
    });
});

// API Routes
app.use('/api/faqs', cacheMiddleware, faqRoutes);
app.use('/api/admin', adminRoutes);

// Error Handling
app.use(notFound);
app.use(errorHandler);

// Security headers
app.use((req, res, next) => {
    res.setHeader('X-Content-Type-Options', 'nosniff');
    res.setHeader('X-Frame-Options', 'DENY');
    res.setHeader('X-XSS-Protection', '1; mode=block');
    next();
});

// Handle unhandled promise rejections
process.on('unhandledRejection', (err) => {
    logger.error('UNHANDLED REJECTION! 💥 Shutting down...', err);
    // Close server & exit process
    process.exit(1);
});

// Handle uncaught exceptions
process.on('uncaughtException', (err) => {
    logger.error('UNCAUGHT EXCEPTION! 💥 Shutting down...', err);
    // Close server & exit process
    process.exit(1);
});

// Graceful shutdown
process.on('SIGTERM', () => {
    logger.info('👋 SIGTERM RECEIVED. Shutting down gracefully');
    process.exit(0);
});

// Export app for testing
module.exports = app;