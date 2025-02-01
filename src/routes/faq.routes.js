const express = require('express');
const router = express.Router();
const faqController = require('../controllers/faq.controller');
const { validateFAQ } = require('../middleware/validation.middleware');

// FAQ routes
router.post('/', validateFAQ, faqController.create);
router.get('/', faqController.getAll);
router.get('/:id', faqController.getOne);
router.put('/:id', validateFAQ, faqController.update);
router.delete('/:id', faqController.delete);

module.exports = router;