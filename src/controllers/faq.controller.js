const FAQ = require('../models/faq.model');
const translationService = require('../services/translation.service');

const faqController = {
    // Create new FAQ
    async create(req, res) {
        try {
            const { question, answer, category, order } = req.body;
            
            // Auto-translate to supported languages if only English is provided
            if (question.en && !question.hi) {
                question.hi = await translationService.translateText(question.en, 'hi');
            }
            if (answer.en && !answer.hi) {
                answer.hi = await translationService.translateText(answer.en, 'hi');
            }

            const faq = new FAQ({
                question,
                answer,
                category,
                order: order || 0
            });

            const savedFAQ = await faq.save();
            res.status(201).json(savedFAQ);
        } catch (error) {
            res.status(400).json({ message: error.message });
        }
    },

    // Get all FAQs
    async getAll(req, res) {
        try {
            const { lang = 'en', category } = req.query;
            const query = category ? { category, isActive: true } : { isActive: true };
            
            const faqs = await FAQ.find(query).sort({ order: 1 });
            
            if (lang === 'en') {
                return res.json(faqs.map(faq => faq.getTranslated('en')));
            }

            // Translate FAQs if needed
            const translatedFaqs = await Promise.all(
                faqs.map(async (faq) => {
                    // If translation exists in database, use it
                    if (faq.question[lang] && faq.answer[lang]) {
                        return faq.getTranslated(lang);
                    }
                    
                    // Otherwise, translate on the fly
                    const translated = await translationService.translateFAQ(faq, lang);
                    return {
                        ...faq.toObject(),
                        question: translated.question,
                        answer: translated.answer
                    };
                })
            );
            
            res.json(translatedFaqs);
        } catch (error) {
            res.status(500).json({ message: error.message });
        }
    },

    // Other methods remain the same...
};

module.exports = faqController;