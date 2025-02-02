const request = require('supertest');
const mongoose = require('mongoose');
const { MongoMemoryServer } = require('mongodb-memory-server');
const app = require('../src/app');
const FAQ = require('../src/models/faq.model');

describe('FAQ API', () => {
    let mongoServer;

    beforeAll(async () => {
        mongoServer = await MongoMemoryServer.create();
        const mongoUri = await mongoServer.getUri();
        await mongoose.connect(mongoUri);
    });

    afterAll(async () => {
        await mongoose.disconnect();
        await mongoServer.stop();
    });

    beforeEach(async () => {
        await FAQ.deleteMany({});
    });

    it('should create a new FAQ', async () => {
        const response = await request(app)
            .post('/api/faqs')
            .send({
                question: {
                    en: 'Test Question?',
                    hi: 'टेस्ट प्रश्न?'
                },
                answer: {
                    en: 'Test Answer',
                    hi: 'टेस्ट उत्तर'
                },
                category: 'General'
            });

        expect(response.statusCode).toBe(201);
        expect(response.body.question.en).toBe('Test Question?');
    });

    it('should get all FAQs', async () => {
        const response = await request(app).get('/api/faqs');
        expect(response.statusCode).toBe(200);
        expect(Array.isArray(response.body)).toBeTruthy();
    });
});