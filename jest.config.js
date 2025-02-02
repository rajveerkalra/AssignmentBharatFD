module.exports = {
    testEnvironment: 'node',
    verbose: true,
    setupFilesAfterEnv: ['./jest.setup.js'],
    collectCoverage: true,
    coverageDirectory: 'coverage',
    coverageReporters: ['text', 'lcov', 'clover'],
    coveragePathIgnorePatterns: [
        '/node_modules/',
        '/tests/fixtures/',
        '/dist/'
    ],
    testPathIgnorePatterns: [
        '/node_modules/',
        '/dist/'
    ],
    reporters: [
        'default',
        ['jest-junit', {
            outputDirectory: 'test-results',
            outputName: 'junit.xml',
        }]
    ]
};