const translationService = require('../../src/services/translation.service');

describe('Translation Service', () => {
    describe('translateText', () => {
        it('should translate text to target language', async () => {
            const text = 'Hello';
            const translated = await translationService.translateText(text, 'hi');
            expect(typeof translated).toBe('string');
            expect(translated).not.toBe(text);
        });

        it('should return empty string for empty input', async () => {
            const translated = await translationService.translateText('', 'hi');
            expect(translated).toBe('');
        });
    });

    describe('translateFAQ', () => {
        it('should translate FAQ content', async () => {
            const faq = {
                question: { en: 'Test Question?' },
                answer: { en: 'Test Answer' }
            };

            const translated = await translationService.translateFAQ(faq, 'hi');
            expect(translated.question).toBeDefined();
            expect(translated.answer).toBeDefined();
        });
    });
});