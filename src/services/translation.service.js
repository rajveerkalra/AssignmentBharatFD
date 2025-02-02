class TranslationService {
    async translateText(text, targetLang) {
        // Simulate translation
        return `${text} (in ${targetLang})`;
    }

    async translateFAQ(faq, targetLang) {
        const translated = { ...faq };
        if (faq.question) {
            translated.question = await this.translateText(faq.question, targetLang);
        }
        if (faq.answer) {
            translated.answer = await this.translateText(faq.answer, targetLang);
        }
        return translated;
    }
}

module.exports = new TranslationService();