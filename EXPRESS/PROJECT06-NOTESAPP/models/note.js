const mongoose = require('mongoose');


const note_schema = new mongoose.Schema({
    title: { type: String, required: true },
    content: { type: String, required: true },
    date: { type: Date, default: Date.now }
});

module.exports = mongoose.model('Note', note_schema);


