const { getAsync, setAsync, DEFAULT_EXPIRATION } = require('../config/redis');

const cacheMiddleware = async (req, res, next) => {
    try {
        const { lang = 'en', category } = req.query;
        const cacheKey = `faqs:${lang}:${category || 'all'}`;

        // Try to get data from cache
        const cachedData = await getAsync(cacheKey);
        
        if (cachedData) {
            console.log('Cache hit');
            return res.json(JSON.parse(cachedData));
        }

        // Add response.sendResponse method to store the response in cache
        res.sendResponse = res.json;
        res.json = async (data) => {
            await setAsync(cacheKey, JSON.stringify(data), 'EX', DEFAULT_EXPIRATION);
            res.sendResponse(data);
        };

        next();
    } catch (error) {
        console.error('Cache Error:', error);
        next();
    }
};

module.exports = cacheMiddleware;