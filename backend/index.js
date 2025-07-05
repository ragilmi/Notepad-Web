const express = require("express");
const cors = require("cors");
const app = express();
const PORT = 3000;

// Temporary in-memory storage (resets every restart)
let notes = [];

app.use(cors());
app.use(express.json());

// GET all notes
app.get("/notes", (req, res) => {
  res.json(notes);
});

// POST a new note
app.post("/notes", (req, res) => {
  const { content } = req.body;
  if (!content) {
    return res.status(400).json({ error: "Content is required" });
  }

  const newNote = { id: Date.now(), content };
  notes.push(newNote);

  res.status(201).json({ note: newNote });
});

app.put('/notes/:id', (req, res) => {
  const id = parseInt(req.params.id);
  const content = req.body.content;

  const index = notes.findIndex(note => note.id === id);
  if (index !== -1) {
    notes[index].content = content;
    return res.json({ note: notes[index] });
  } else {
    return res.status(404).json({ error: 'Note not found' });
  }
});


app.listen(PORT, () => {
  console.log(`Backend running on http://localhost:${PORT}`);
});
