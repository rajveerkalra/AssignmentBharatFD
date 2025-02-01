const createDOMPurify = require('dompurify');
const { JSDOM } = require('jsdom');

const window = new JSDOM('').window;
const DOMPurify = createDOMPurify(window);

// Allowed tags and attributes for WYSIWYG content
const ALLOWED_TAGS = [
    'p', 'br', 'b', 'i', 'em', 'strong', 'u', 'h1', 'h2', 'h3', 'h4', 'h5', 'h6',
    'ul', 'ol', 'li', 'a', 'img', 'blockquote', 'code', 'pre', 'hr'
];

const ALLOWED_ATTR = ['href', 'src', 'alt', 'title', 'class'];

const sanitizeHtml = (content) => {
    if (!content) return '';
    
    return DOMPurify.sanitize(content, {
        ALLOWED_TAGS,
        ALLOWED_ATTR
    });
};

module.exports = {
    sanitizeHtml
};