const validateFAQ = (req, res, next) => {
    const { question, answer, category } = req.body;

    if (!question || !question.en) {
        return res.status(400).json({ 
            message: 'Question in English is required' 
        });
    }

    if (!answer || !answer.en) {
        return res.status(400).json({ 
            message: 'Answer in English is required' 
        });
    }

    if (!category) {
        return res.status(400).json({ 
            message: 'Category is required' 
        });
    }

    next();
};

module.exports = {
    validateFAQ
};