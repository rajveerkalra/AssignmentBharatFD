const mongoose = require('mongoose');
const { MongoMemoryServer } = require('mongodb-memory-server');
const FAQ = require('../src/models/faq.model');

describe('FAQ Model Test', () => {
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