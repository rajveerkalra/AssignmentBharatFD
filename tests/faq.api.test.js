const request = require('supertest');
const app = require('../src/app');
const FAQ = require('../src/models/faq.model');

describe('FAQ API', () => {
    beforeEach(async () => {
        await FAQ.deleteMany({});
    });

    describe('POST /api/faqs', () => {
        it('should create a new FAQ', async () => {
            const res = await request(app)
                .post('/api/faqs')
                .send({
                    question: {
                        en: 'Test question?',
                        hi: 'टेस्ट प्रश्न?'
                    },
                    answer: {
                        en: '<p>Test answer</p>',
                        hi: '<p>टेस्ट उत्तर</p>'
                    },
                    category: 'General'
                });

            expect(res.statusCode).toBe(201);
            expect(res.body.question.en).toBe('Test question?');
        });
    });

    describe('GET /api/faqs', () => {
        it('should return all FAQs', async () => {
            const res = await request(app).get('/api/faqs');
            expect(res.statusCode).toBe(200);
            expect(Array.isArray(res.body)).toBeTruthy();
        });
    });
});