const translationService = require('../src/services/translation.service');

describe('Translation Service', () => {
    it('should translate text to target language', async () => {
        const text = 'Hello, how are you?';
        const translated = await translationService.translateText(text, 'hi');
        
        expect(translated).toBeDefined();
        expect(typeof translated).toBe('string');
        expect(translated).not.toBe(text);
    });

    it('should handle empty text gracefully', async () => {
        const text = '';
        const translated = await translationService.translateText(text, 'hi');
        
        expect(translated).toBe('');
    });

    it('should translate FAQ content', async () => {
        const faq = {
            question: { en: 'How do I reset my password?' },
            answer: { en: 'Click on forgot password link.' }
        };

        const translated = await translationService.translateFAQ(faq, 'hi');
        
        expect(translated.question).toBeDefined();
        expect(translated.answer).toBeDefined();
        expect(translated.question).not.toBe(faq.question.en);
        expect(translated.answer).not.toBe(faq.answer.en);
    });
});