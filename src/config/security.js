const rateLimit = require('express-rate-limit');
const helmet = require('helmet');
const mongoSanitize = require('express-mongo-sanitize');
const xss = require('xss-clean');
const hpp = require('hpp');
const cors = require('cors');

// Rate limiting
const limiter = rateLimit({
    windowMs: 15 * 60 * 1000, // 15 minutes
    max: 100, // Limit each IP to 100 requests per windowMs
    message: 'Too many requests from this IP, please try again later.',
    standardHeaders: true,
    legacyHeaders: false
});

// API specific limiter
const apiLimiter = rateLimit({
    windowMs: 15 * 60 * 1000,
    max: 100,
    message: 'Too many API requests from this IP, please try again after 15 minutes'
});

// Login endpoint limiter
const loginLimiter = rateLimit({
    windowMs: 60 * 60 * 1000, // 1 hour window
    max: 5, // start blocking after 5 requests
    message: 'Too many login attempts from this IP, please try again after an hour'
});

// CORS options
const corsOptions = {
    origin: process.env.ALLOWED_ORIGINS ? 
        process.env.ALLOWED_ORIGINS.split(',') : 
        'http://localhost:3000',
    optionsSuccessStatus: 200,
    credentials: true
};

module.exports = {
    limiter,
    apiLimiter,
    loginLimiter,
    corsOptions,
    securityMiddleware: [
        helmet(), // Set security HTTP headers
        mongoSanitize(), // Data sanitization against NoSQL query injection
        xss(), // Data sanitization against XSS
        hpp(), // Prevent HTTP Parameter Pollution
    ]
};