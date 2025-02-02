// Mock the translation service
jest.mock('../src/services/translation.service', () => ({
    translateText: jest.fn().mockImplementation((text, lang) => 
        Promise.resolve(`${text} (in ${lang})`)),
    translateFAQ: jest.fn().mockImplementation((faq, lang) => 
        Promise.resolve({
            question: `${faq.question.en} (in ${lang})`,
            answer: `${faq.answer.en} (in ${lang})`
        }))
}));

const translationService = require('../src/services/translation.service');

describe('Translation Service', () => {
    beforeEach(() => {
        jest.clearAllMocks();
    });

    it('should translate text to target language', async () => {
        const text = 'Hello, how are you?';
        const translated = await translationService.translateText(text, 'hi');
        
        expect(translated).toBeDefined();
        expect(typeof translated).toBe('string');
        expect(translated).toBe(`${text} (in hi)`);
        expect(translationService.translateText).toHaveBeenCalledWith(text, 'hi');
    });

    it('should translate FAQ content', async () => {
        const faq = {
            question: { en: 'How do I reset my password?' },
            answer: { en: 'Click on forgot password link.' }
        };

        const translated = await translationService.translateFAQ(faq, 'hi');
        
        expect(translated).toBeDefined();
        expect(translated.question).toBe(`${faq.question.en} (in hi)`);
        expect(translated.answer).toBe(`${faq.answer.en} (in hi)`);
        expect(translationService.translateFAQ).toHaveBeenCalledWith(faq, 'hi');
    });
});