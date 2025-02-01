const Redis = require('redis');
const { promisify } = require('util');

const redisClient = Redis.createClient(process.env.REDIS_URL);

redisClient.on('error', (error) => {
    console.error('Redis Error:', error);
});

redisClient.on('connect', () => {
    console.log('Redis connected successfully');
});

// Promisify Redis methods
const getAsync = promisify(redisClient.get).bind(redisClient);
const setAsync = promisify(redisClient.set).bind(redisClient);
const delAsync = promisify(redisClient.del).bind(redisClient);

const DEFAULT_EXPIRATION = 3600; // 1 hour in seconds

module.exports = {
    redisClient,
    getAsync,
    setAsync,
    delAsync,
    DEFAULT_EXPIRATION
};