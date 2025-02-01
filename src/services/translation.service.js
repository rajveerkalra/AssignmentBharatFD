const { Translate } = require('@google-cloud/translate').v2;

class TranslationService {
    constructor() {
        this.translate = new Translate({
            projectId: process.env.GOOGLE_PROJECT_ID,
            credentials: JSON.parse(process.env.GOOGLE_CREDENTIALS)
        });
    }

    async translateText(text, targetLang) {
        try {
            if (!text) return '';
            
            const [translation] = await this.translate.translate(text, targetLang);
            return translation;
        } catch (error) {
            console.error('Translation error:', error);
            return text; // Return original text as fallback
        }
    }

    async translateFAQ(faq, targetLang) {
        try {
            const [translatedQuestion, translatedAnswer] = await Promise.all([
                this.translateText(faq.question.en, targetLang),
                this.translateText(faq.answer.en, targetLang)
            ]);

            return {
                question: translatedQuestion,
                answer: translatedAnswer
            };
        } catch (error) {
            console.error('FAQ translation error:', error);
            return {
                question: faq.question.en,
                answer: faq.answer.en
            };
        }
    }
}

module.exports = new TranslationService();