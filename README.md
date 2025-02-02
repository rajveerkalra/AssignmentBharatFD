# FAQ Management API 🚀

A comprehensive FAQ management system built with Node.js, Express, and MongoDB, supporting multiple languages and advanced features.

## Table of Contents
- [Features](#features)
- [Tech Stack](#tech-stack)
- [Installation](#installation)
- [API Documentation](#api-documentation)
- [Project Structure](#project-structure)
- [Testing](#testing)
- [Security & Performance](#security--performance)
- [Contributing](#contributing)

## Features

### Core Features 🎯
- Multilingual FAQ management
- Admin dashboard and controls
- Search and filtering
- Category management
- Authentication & Authorization
- API documentation
- Performance optimization

### Technical Features ⚙️
- JWT authentication
- Rate limiting
- Response caching
- Database indexing
- Error handling
- Input validation
- API versioning

## Tech Stack

### Core Technologies 💻
- Node.js
- Express.js
- MongoDB
- Jest (Testing)
- Swagger (API Documentation)

### Additional Tools 🛠️
- JWT for authentication
- Mongoose for MongoDB
- Express-validator for validation
- Morgan for logging
- Compression for response optimization

## Installation

### Prerequisites
- Node.js (v14 or higher)
- MongoDB
- npm/yarn

### Setup Steps

1. Clone the repository:
2. https://github.com/rajveerkalra/AssignmentBharatFD
3. # FAQ Management API 🚀

A comprehensive FAQ management system built with Node.js, Express, and MongoDB, supporting multiple languages and advanced features.

## Table of Contents
- [Features](#features)
- [Tech Stack](#tech-stack)
- [Installation](#installation)
- [API Documentation](#api-documentation)
- [Project Structure](#project-structure)
- [Testing](#testing)
- [Security & Performance](#security--performance)
- [Contributing](#contributing)

## Features

### Core Features 🎯
- Multilingual FAQ management
- Admin dashboard and controls
- Search and filtering
- Category management
- Authentication & Authorization
- API documentation
- Performance optimization

### Technical Features ⚙️
- JWT authentication
- Rate limiting
- Response caching
- Database indexing
- Error handling
- Input validation
- API versioning

## Tech Stack

### Core Technologies 💻
- Node.js
- Express.js
- MongoDB
- Jest (Testing)
- Swagger (API Documentation)

### Additional Tools 🛠️
- JWT for authentication
- Mongoose for MongoDB
- Express-validator for validation
- Morgan for logging
- Compression for response optimization

## Installation

### Prerequisites
- Node.js (v14 or higher)
- MongoDB
- npm/yarn

### Setup Steps

1. Clone the repository:
2. Development
npm run dev
Production
npm start
Testing
npm test
http://localhost:3000/api
GET /api/faqs - Get all FAQs
GET /api/faqs/:id - Get FAQ by ID
POST /api/faqs - Create new FAQ
PUT /api/faqs/:id - Update FAQ
DELETE /api/faqs/:id - Delete FAQ
POST /api/admin/login - Admin login
POST /api/admin/register - Register admin
GET /api/admin/profile - Get admin profile
json
POST /api/faqs
{
"question": {
"en": "How do I reset my password?",
"hi": "मैं अपना पासवर्ड कैसे रीसेट करूं?"
},
"answer": {
"en": "Click on forgot password link",
"hi": "फॉरगॉट पासवर्ड लिंक पर क्लिक करें"
},
"category": "Account",
"isActive": true
}
json
POST /api/admin/login
{
"username": "admin",
"password": "secure_password"
}
src/
├── config/
│ ├── database.js
│ ├── swagger.js
│ └── logger.js
├── controllers/
│ ├── faq.controller.js
│ └── admin.controller.js
├── middleware/
│ ├── auth.middleware.js
│ ├── error.middleware.js
│ └── validation.middleware.js
├── models/
│ ├── faq.model.js
│ └── admin.model.js
├── routes/
│ ├── faq.routes.js
│ └── admin.routes.js
├── services/
│ └── translation.service.js
├── utils/
│ └── helpers.js
└── app.js
tests/
├── integration/
├── unit/
└── setup.js
bash
All tests
npm test
Coverage
npm run test:coverage
Watch mode
npm run test:watch
javascript
describe('FAQ API', () => {
it('should create new FAQ', async () => {
const response = await request(app)
.post('/api/faqs')
.send(testFAQ);
expect(response.status).toBe(201);
});
});

## Security & Performance

### Security Features 🔒
- JWT based authentication
- Request rate limiting
- Input sanitization
- XSS protection
- CORS configuration
- Security headers
- Error handling

### Performance Optimizations ⚡
- Response compression
- Database indexing
- Query optimization
- Caching
- Connection pooling
- Load balancing ready
- Monitoring

## Error Handling

### HTTP Status Codes
- 200: Success
- 201: Created
- 400: Bad Request
- 401: Unauthorized
- 403: Forbidden
- 404: Not Found
- 500: Server Error

### Error Response Format
{
"status": "error",
"message": "Error description",
"code": "ERROR_CODE"
}
## Contributing

1. Fork the repository
2. Create feature branch (`git checkout -b feature/AmazingFeature`)
3. Commit changes (`git commit -m 'Add AmazingFeature'`)
4. Push to branch (`git push origin feature/AmazingFeature`)
5. Open Pull Request

## Scripts
{
"scripts": {
"start": "node src/server.js",
"dev": "nodemon src/server.js",
"test": "jest",
"test:watch": "jest --watch",
"test:coverage": "jest --coverage",
"lint": "eslint .",
"format": "prettier --write ."
}
}

## Environment Variables
env
NODE_ENV=development
PORT=3000
MONGODB_URI=mongodb://localhost:27017/faq_db
JWT_SECRET=your_secret_key
RATE_LIMIT_WINDOW=15
RATE_LIMIT_MAX=100

## License

This project is licensed under the MIT License.

## Author

Rajveer Singh Kalra
- GitHub: [@yourusername](https://github.com/rajveerkalra)
- Email: rajveersinghkalra29@gmail.com

## Support

For support, email rajveersinghkalra29@example.com or create an issue in the repository.

## Acknowledgments

- Node.js community
- Express.js documentation
- MongoDB documentation
- Jest testing framework
