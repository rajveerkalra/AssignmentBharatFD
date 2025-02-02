const Admin = require('../models/admin.model');
const jwt = require('jsonwebtoken');
const { validationResult } = require('express-validator');

const adminController = {
    // Register new admin
    async register(req, res) {
        try {
            const errors = validationResult(req);
            if (!errors.isEmpty()) {
                return res.status(400).json({ errors: errors.array() });
            }

            const { username, password, email, role } = req.body;

            // Check if admin already exists
            const existingAdmin = await Admin.findOne({ 
                $or: [{ email }, { username }] 
            });
            
            if (existingAdmin) {
                return res.status(400).json({ 
                    message: 'Admin already exists' 
                });
            }

            const admin = new Admin({
                username,
                password,
                email,
                role
            });

            await admin.save();

            const token = jwt.sign(
                { id: admin._id }, 
                process.env.JWT_SECRET, 
                { expiresIn: '24h' }
            );

            res.status(201).json({
                message: 'Admin created successfully',
                token
            });
        } catch (error) {
            res.status(500).json({ message: error.message });
        }
    },

    // Login admin
    async login(req, res) {
        try {
            const { username, password } = req.body;

            const admin = await Admin.findOne({ username });
            if (!admin || !admin.isActive) {
                return res.status(401).json({ 
                    message: 'Invalid credentials' 
                });
            }

            const isMatch = await admin.comparePassword(password);
            if (!isMatch) {
                return res.status(401).json({ 
                    message: 'Invalid credentials' 
                });
            }

            const token = jwt.sign(
                { id: admin._id }, 
                process.env.JWT_SECRET, 
                { expiresIn: '24h' }
            );

            res.json({ token });
        } catch (error) {
            res.status(500).json({ message: error.message });
        }
    },

    // Get admin profile
    async getProfile(req, res) {
        try {
            const admin = await Admin.findById(req.admin.id)
                .select('-password');
            res.json(admin);
        } catch (error) {
            res.status(500).json({ message: error.message });
        }
    },

    // Update admin profile
    async updateProfile(req, res) {
        try {
            const updates = Object.keys(req.body);
            const allowedUpdates = ['username', 'email', 'password'];
            const isValidOperation = updates.every(update => 
                allowedUpdates.includes(update)
            );

            if (!isValidOperation) {
                return res.status(400).json({ 
                    message: 'Invalid updates' 
                });
            }

            const admin = await Admin.findById(req.admin.id);
            updates.forEach(update => admin[update] = req.body[update]);
            await admin.save();

            res.json({ message: 'Profile updated successfully' });
        } catch (error) {
            res.status(400).json({ message: error.message });
        }
    }
};

module.exports = adminController;