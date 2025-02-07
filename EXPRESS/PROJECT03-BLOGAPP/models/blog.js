const mongoose = require('mongoose');


const blog_schema = new mongoose.Schema({
    title: { type: String, required: true },
    imgUrl: { type: String, required: true },
    content: { type: String, required: true },
    date: { type: Date, default: Date.now }
});

module.exports = mongoose.model('Blog', blog_schema);


