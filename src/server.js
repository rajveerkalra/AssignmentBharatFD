const app = require('./app');
const logger = require('./config/logger');

const port = process.env.PORT || 3000;

const server = app.listen(port, () => {
    logger.info(`Server running on port ${port}`);
});

// Handle server errors
server.on('error', (error) => {
    logger.error('Server error:', error);
});