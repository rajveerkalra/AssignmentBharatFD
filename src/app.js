const express = require('express');
const cors = require('cors');
const bodyParser = require('body-parser');
require('dotenv').config();
const connectDB = require('./config/database');
const faqRoutes = require('./routes/faq.routes');

const app = express();

// Connect to database
connectDB();

// Middleware
app.use(cors());
app.use(bodyParser.json({ limit: '10mb' }));
app.use(bodyParser.urlencoded({ extended: true }));

// Routes
app.use('/api/faqs', faqRoutes);

// Basic route
app.get('/', (req, res) => {
    res.json({ message: 'Welcome to Multilingual FAQ API' });
});

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});

module.exports = app;