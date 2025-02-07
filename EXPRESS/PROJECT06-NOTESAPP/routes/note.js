const express = require('express');
const bodyparser = require('body-parser');
const Note = require('../models/note');
const router = express.Router();

router.use(bodyparser.json());
router.use(bodyparser.urlencoded({ extended: true }));

// Get all notes
router.get('/notes', async (req, res) => {
    try {
        const notes = await Note.find().sort({ date: -1 });
        res.status(200).json(notes);
    } catch (error) {
        res.status(400).json({ message: error.message });
    }
});

// Add a new note
router.post('/notes', async (req, res) => {
    const note = new Note({
        title: req.body.title,
        content: req.body.content,
    });

    try {
        const newNote = await note.save();
        res.status(201).json(newNote);
    } catch (error) {
        res.status(400).json({ message: error.message });


    } 
});

// Update a note
router.put('/notes/:id', async (req, res) => {
    try {
        const updatedNote = await Note.findByIdAndUpdate(req.params.id, req.body, { new: true });
        res.json(updatedNote);
    } catch (error) {
        res.status(400).json({ message: error.message });
    }
});

// Delete a note
router.delete('/notes/:id', async (req, res) => {
    try {
        await Note.findByIdAndDelete(req.params.id);
        res.json({ message: 'Note deleted successfully' });
    } catch (error) {
        res.status(400).json({ message: error.message });
    }
});

module.exports = router;
