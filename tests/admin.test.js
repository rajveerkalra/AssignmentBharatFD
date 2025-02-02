const request = require('supertest');
const mongoose = require('mongoose');
const { MongoMemoryServer } = require('mongodb-memory-server');
const app = require('../src/app');
const Admin = require('../src/models/admin.model');

describe('Admin API', () => {
    let mongoServer;
    let token;

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
        await Admin.deleteMany({});
    });

    it('should register a new admin', async () => {
        const response = await request(app)
            .post('/api/admin/register')
            .send({
                username: 'testadmin',
                password: 'password123',
                email: 'test@admin.com',
                role: 'admin'
            });

        expect(response.statusCode).toBe(201);
        expect(response.body.token).toBeDefined();
    });

    it('should login admin', async () => {
        // First create an admin
        await request(app)
            .post('/api/admin/register')
            .send({
                username: 'testadmin',
                password: 'password123',
                email: 'test@admin.com'
            });

        // Then try to login
        const response = await request(app)
            .post('/api/admin/login')
            .send({
                username: 'testadmin',
                password: 'password123'
            });

        expect(response.statusCode).toBe(200);
        expect(response.body.token).toBeDefined();
    });
});