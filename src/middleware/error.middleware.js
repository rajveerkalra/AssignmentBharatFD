const logger = require('../config/logger');
const { AppError } = require('../utils/errors');

const errorHandler = (err, req, res, next) => {
    err.statusCode = err.statusCode || 500;
    err.status = err.status || 'error';

    // Log error
    logger.error({
        message: err.message,
        stack: err.stack,
        path: req.path,
        method: req.method,
        body: req.body,
        query: req.query,
        params: req.params,
        user: req.user ? req.user.id : null
    });

    if (process.env.NODE_ENV === 'development') {
        return res.status(err.statusCode).json({
            status: err.status,
            error: err,
            message: err.message,
            stack: err.stack
        });
    }

    // Production error response
    if (err.isOperational) {
        return res.status(err.statusCode).json({
            status: err.status,
            message: err.message
        });
    }

    // Programming or unknown errors: don't leak error details
    return res.status(500).json({
        status: 'error',
        message: 'Something went wrong'
    });
};

const notFound = (req, res, next) => {
    next(new AppError(`Can't find ${req.originalUrl} on this server`, 404));
};

module.exports = {
    errorHandler,
    notFound
};