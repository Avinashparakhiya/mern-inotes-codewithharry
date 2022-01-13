const express = require('express');
const router = express.Router();
const auth = require('../middleware/fatchUser');
const Notes = require('../models/Notes');
const { body, validationResult } = require('express-validator');

//get all the notes when user login
router.get('/allnotes', auth, async (req, res) => {
  const notes = await Notes.find({ user: req.user.id });
  res.json(notes);
});

router.post(
  '/addnotes',
  auth,
  [
    body('title', 'Enter a Valid Title').isLength(3),
    body('description', 'Enter a valid description').isLength(10),
    body('tag', 'Enter a valid Tag').isLength(2),
  ],
  async (req, res) => {
    const { title, description, tag } = req.body;
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }
    const note = new Notes({
      title,
      description,
      tag,
      user: req.user.id,
    });
    const saveNotes = await note.save();
    res.json(saveNotes);
  }
);

module.exports = router;
