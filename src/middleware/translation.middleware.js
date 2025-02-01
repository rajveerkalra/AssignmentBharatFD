const translationService = require('../services/translation.service');

const translateMiddleware = async (req, res, next) => {
    const originalJson = res.json;
    
    res.json = async function(data) {
        try {
            const { lang } = req.query;
            
            // Skip translation if language is English or not specified
            if (!lang || lang === 'en') {
                return originalJson.call(this, data);
            }

            // Handle array of FAQs
            if (Array.isArray(data)) {
                const translatedData = await Promise.all(
                    data.map(async (faq) => {
                        // Check if translation already exists
                        if (faq.question[lang] && faq.answer[lang]) {
                            return {
                                ...faq,
                                question: faq.question[lang],
                                answer: faq.answer[lang]
                            };
                        }
                        
                        // Translate if not exists
                        const translated = await translationService.translateFAQ(faq, lang);
                        return {
                            ...faq,
                            question: translated.question,
                            answer: translated.answer
                        };
                    })
                );
                return originalJson.call(this, translatedData);
            }

            // Handle single FAQ
            if (data.question && data.answer) {
                const translated = await translationService.translateFAQ(data, lang);
                data.question = translated.question;
                data.answer = translated.answer;
            }

            return originalJson.call(this, data);
        } catch (error) {
            console.error('Translation middleware error:', error);
            return originalJson.call(this, data);
        }
    };

    next();
};

module.exports = translateMiddleware;