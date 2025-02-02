const FAQ = require('../models/faq.model');
const { NotFoundError, ValidationError } = require('../utils/errors');
const logger = require('../config/logger');

const faqController = {
    async create(req, res, next) {
        try {
            const faq = new FAQ(req.body);
            const savedFAQ = await faq.save();
            
            logger.info('FAQ created', { id: savedFAQ._id });
            res.status(201).json(savedFAQ);
        } catch (error) {
            next(error);
        }
    },

    async getAll(req, res, next) {
        try {
            const { lang = 'en', category } = req.query;
            const query = category ? { category, isActive: true } : { isActive: true };
            
            const faqs = await FAQ.find(query).sort({ order: 1 });
            const translatedFaqs = faqs.map(faq => faq.getTranslated(lang));
            
            logger.info('FAQs retrieved', { count: faqs.length, lang, category });
            res.json(translatedFaqs);
        } catch (error) {
            next(error);
        }
    },

    async getOne(req, res, next) {
        try {
            const faq = await FAQ.findById(req.params.id);
            if (!faq) {
                throw new NotFoundError('FAQ not found');
            }
            
            logger.info('FAQ retrieved', { id: faq._id });
            res.json(faq);
        } catch (error) {
            next(error);
        }
    },

    async update(req, res, next) {
        try {
            const faq = await FAQ.findByIdAndUpdate(
                req.params.id,
                req.body,
                { new: true, runValidators: true }
            );
            
            if (!faq) {
                throw new NotFoundError('FAQ not found');
            }
            
            logger.info('FAQ updated', { id: faq._id });
            res.json(faq);
        } catch (error) {
            next(error);
        }
    },

    async delete(req, res, next) {
        try {
            const faq = await FAQ.findByIdAndDelete(req.params.id);
            if (!faq) {
                throw new NotFoundError('FAQ not found');
            }
            
            logger.info('FAQ deleted', { id: req.params.id });
            res.json({ message: 'FAQ deleted successfully' });
        } catch (error) {
            next(error);
        }
    }
};

module.exports = faqController;