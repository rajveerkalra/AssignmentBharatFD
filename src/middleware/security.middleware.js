const jwt = require('jsonwebtoken');
const { AuthenticationError } = require('../utils/errors');
const logger = require('../config/logger');

const validateToken = (token) => {
    try {
        return jwt.verify(token, process.env.JWT_SECRET);
    } catch (error) {
        throw new AuthenticationError('Invalid token');
    }
};

const checkAuth = async (req, res, next) => {
    try {
        const token = req.headers.authorization?.replace('Bearer ', '');
        
        if (!token) {
            throw new AuthenticationError('No token provided');
        }

        const decoded = validateToken(token);
        req.user = decoded;
        
        next();
    } catch (error) {
        next(error);
    }
};

const checkRole = (roles) => {
    return (req, res, next) => {
        if (!roles.includes(req.user.role)) {
            logger.warn('Unauthorized access attempt', {
                userId: req.user.id,
                requiredRoles: roles,
                userRole: req.user.role
            });
            next(new AuthenticationError('Insufficient permissions'));
            return;
        }
        next();
    };
};

module.exports = {
    checkAuth,
    checkRole
};