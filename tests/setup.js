jest.mock('mongoose');
jest.mock('../src/services/translation.service', () => ({
    translateText: jest.fn().mockImplementation((text) => {
        return Promise.resolve(text || ''); // Return empty string for empty input
    }),
    translateFAQ: jest.fn().mockImplementation((faq) => {
        return Promise.resolve(faq);
    })
}));

beforeAll(() => {
    process.env.NODE_ENV = 'test';
    process.env.JWT_SECRET = 'test-secret';
});

afterEach(() => {
    jest.clearAllMocks();
});