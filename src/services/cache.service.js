const { delAsync } = require('../config/redis');

const cacheService = {
    async invalidateCache() {
        try {
            const pattern = 'faqs:*';
            const keys = await new Promise((resolve, reject) => {
                redisClient.keys(pattern, (err, keys) => {
                    if (err) reject(err);
                    resolve(keys);
                });
            });

            if (keys.length > 0) {
                await Promise.all(keys.map(key => delAsync(key)));
                console.log('Cache invalidated');
            }
        } catch (error) {
            console.error('Cache invalidation error:', error);
        }
    }
};

module.exports = cacheService;