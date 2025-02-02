const request = require('supertest');
const app = require('../../src/app');
const FAQ = require('../../src/models/faq.model');
const { adminOneToken, faqOne, setupDatabase } = require('../fixtures');

beforeEach(setupDatabase);

describe('FAQ API Integration Tests', () => {
    describe('GET /api/faqs', () => {
        it('should get all FAQs', async () => {
            const response = await request(app)
                .get('/api/faqs')
                .expect(200);

            expect(response.body).toHaveLength(1);
            expect(response.body[0].question.en).toBe(faqOne.question.en);
        });

        it('should get FAQs in Hindi', async () => {
            const response = await request(app)
                .get('/api/faqs?lang=hi')
                .expect(200);

            expect(response.body[0].question).toBe(faqOne.question.hi);
        });
    });

    describe('POST /api/faqs', () => {
        it('should create new FAQ with authentication', async () => {
            const newFaq = {
                question: {
                    en: 'New Test Question?',
                    hi: 'नया टेस्ट प्रश्न?'
                },
                answer: {
                    en: 'New Test Answer',
                    hi: 'नया टेस्ट उत्तर'
                },
                category: 'Test'
            };

            const response = await request(app)
                .post('/api/faqs')
                .set('Authorization', `Bearer ${adminOneToken}`)
                .send(newFaq)
                .expect(201);

            const faq = await FAQ.findById(response.body._id);
            expect(faq).not.toBeNull();
            expect(faq.question.en).toBe(newFaq.question.en);
        });
    });
});