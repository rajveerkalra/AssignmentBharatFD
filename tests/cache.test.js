const request = require('supertest');
const app = require('../src/app');
const { redisClient } = require('../src/config/redis');

describe('Cache Middleware', () => {
    afterAll(async () => {
        await new Promise(resolve => redisClient.quit(() => resolve()));
    });

    it('should cache FAQ results', async () => {
        // First request - should hit database
        const res1 = await request(app).get('/api/faqs');
        expect(res1.status).toBe(200);

        // Second request - should hit cache
        const res2 = await request(app).get('/api/faqs');
        expect(res2.status).toBe(200);
        expect(res2.body).toEqual(res1.body);
    });
});