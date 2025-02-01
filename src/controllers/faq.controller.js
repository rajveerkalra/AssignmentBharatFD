const FAQ = require('../models/faq.model');
const cacheService = require('../services/cache.service');

const faqController = {
    // Create new FAQ
    async create(req, res) {
        try {
            const { question, answer, category, order } = req.body;
            
            const faq = new FAQ({
                question,
                answer,
                category,
                order: order || 0
            });

            const savedFAQ = await faq.save();
            await cacheService.invalidateCache();
            res.status(201).json(savedFAQ);
        } catch (error) {
            res.status(400).json({ message: error.message });
        }
    },

    // Get all FAQs with language support
    async getAll(req, res) {
        try {
            const { lang = 'en', category } = req.query;
            const query = category ? { category, isActive: true } : { isActive: true };
            
            const faqs = await FAQ.find(query).sort({ order: 1 });
            const translatedFaqs = faqs.map(faq => faq.getTranslated(lang));
            
            res.json(translatedFaqs);
        } catch (error) {
            res.status(500).json({ message: error.message });
        }
    },

    // Update FAQ
    async update(req, res) {
        try {
            const updatedFaq = await FAQ.findByIdAndUpdate(
                req.params.id,
                req.body,
                { new: true, runValidators: true }
            );

            if (!updatedFaq) {
                return res.status(404).json({ message: 'FAQ not found' });
            }

            await cacheService.invalidateCache();
            res.json(updatedFaq);
        } catch (error) {
            res.status(400).json({ message: error.message });
        }
    },

    // Delete FAQ
    async delete(req, res) {
        try {
            const faq = await FAQ.findByIdAndDelete(req.params.id);
            
            if (!faq) {
                return res.status(404).json({ message: 'FAQ not found' });
            }

            await cacheService.invalidateCache();
            res.json({ message: 'FAQ deleted successfully' });
        } catch (error) {
            res.status(500).json({ message: error.message });
        }
    }
};

module.exports = faqController;