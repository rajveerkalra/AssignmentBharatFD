const mongoose = require('mongoose');
const FAQ = require('../src/models/faq.model');

describe('FAQ Model Test', () => {
    beforeAll(async () => {
        await mongoose.connect(global.__MONGO_URI__, {
            useNewUrlParser: true,
            useUnifiedTopology: true,
        });
    });

    afterAll(async () => {
        await mongoose.connection.close();
    });

    it('should create & save FAQ successfully', async () => {
        const validFAQ = new FAQ({
            question: {
                en: 'Test question?',
                hi: 'टेस्ट प्रश्न?'
            },
            answer: {
                en: 'Test answer',
                hi: 'टेस्ट उत्तर'
            },
            category: 'General'
        });
        const savedFAQ = await validFAQ.save();
        
        expect(savedFAQ._id).toBeDefined();
        expect(savedFAQ.question.en).toBe('Test question?');
        expect(savedFAQ.isActive).toBe(true);
    });
});