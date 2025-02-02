const express = require('express');
const router = express.Router();
const adminController = require('../controllers/admin.controller');
const auth = require('../middleware/auth.middleware');
const { body } = require('express-validator');

// Validation middleware
const validateRegistration = [
    body('username').trim().isLength({ min: 3 }),
    body('email').isEmail(),
    body('password').isLength({ min: 6 })
];

// Admin routes
router.post('/register', validateRegistration, adminController.register);
router.post('/login', adminController.login);
router.get('/profile', auth, adminController.getProfile);
router.patch('/profile', auth, adminController.updateProfile);

module.exports = router;