const swaggerJsdoc = require('swagger-jsdoc');

const options = {
    definition: {
        openapi: '3.0.0',
        info: {
            title: 'Multilingual FAQ API',
            version: '1.0.0',
            description: 'RESTful API for managing multilingual FAQs',
            contact: {
                name: 'API Support',
                email: 'support@example.com'
            }
        },
        servers: [
            {
                url: process.env.API_URL || 'http://localhost:3000',
                description: 'Development server'
            }
        ]
    },
    apis: ['./src/routes/swagger.docs.js']
};

const specs = swaggerJsdoc(options);

module.exports = specs;