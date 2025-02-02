const mongoose = require('mongoose');
const jwt = require('jsonwebtoken');
const Admin = require('../../src/models/admin.model');
const FAQ = require('../../src/models/faq.model');

const adminOneId = new mongoose.Types.ObjectId();
const adminOne = {
    _id: adminOneId,
    username: 'testadmin',
    email: 'admin@test.com',
    password: 'testpass123',
    role: 'admin'
};

const adminOneToken = jwt.sign({ id: adminOneId }, process.env.JWT_SECRET);

const faqOne = {
    question: {
        en: 'Test Question One?',
        hi: 'टेस्ट प्रश्न एक?'
    },
    answer: {
        en: 'Test Answer One',
        hi: 'टेस्ट उत्तर एक'
    },
    category: 'General'
};

const setupDatabase = async () => {
    await Admin.deleteMany();
    await FAQ.deleteMany();
    await new Admin(adminOne).save();
    await new FAQ(faqOne).save();
};

module.exports = {
    adminOneId,
    adminOne,
    adminOneToken,
    faqOne,
    setupDatabase
};