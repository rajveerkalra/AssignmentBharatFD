module.exports = {
    testEnvironment: 'node',
    verbose: true,
    setupFilesAfterEnv: ['<rootDir>/tests/setup.js'],
    moduleFileExtensions: ['js', 'json'],
    testMatch: ['**/tests/**/*.test.js'],
    collectCoverage: false,
    forceExit: true,
    clearMocks: true,
    resetMocks: true,
    restoreMocks: true,
    // Ignore swagger validation
    testPathIgnorePatterns: [
        '/node_modules/',
        '/src/config/swagger.js'
    ],
    // Mock modules that cause issues
    moduleNameMapper: {
        '^swagger-jsdoc$': '<rootDir>/tests/__mocks__/swagger-jsdoc.js'
    }
};