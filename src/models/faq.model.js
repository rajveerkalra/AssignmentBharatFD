const mongoose = require('mongoose');

const translationSchema = new mongoose.Schema({
    en: { type: String, required: true },
    hi: { type: String },
    bn: { type: String }
});

const faqSchema = new mongoose.Schema({
    question: {
        type: translationSchema,
        required: true
    },
    answer: {
        type: translationSchema,
        required: true
    },
    isActive: {
        type: Boolean,
        default: true
    },
    category: {
        type: String,
        required: true
    },
    order: {
        type: Number,
        default: 0
    }
}, {
    timestamps: true
});

// Method to get translated content
faqSchema.methods.getTranslated = function(language = 'en') {
    return {
        id: this._id,
        question: this.question[language] || this.question.en,
        answer: this.answer[language] || this.answer.en,
        category: this.category,
        isActive: this.isActive,
        createdAt: this.createdAt,
        updatedAt: this.updatedAt
    };
};

const FAQ = mongoose.model('FAQ', faqSchema);

module.exports = FAQ;