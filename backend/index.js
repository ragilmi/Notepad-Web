const express = require('express');
const cors = require('cors');
const app = express();
const port = 3000;

app.use(cors());
app.use(express.json());

let notes = [];

app.get('/notes', (req, res) => {
    res.json(notes);
});

app.post('/notes', (req, res) => {
    const { content } = req.body;
    if (content) {
        const note = { id: Date.now(), content };
        notes.push(note);
        res.status(201).json({ message: 'Note added', note });
    } else {
        res.status(400).json({ message: 'Content is required' });
    }
});

app.listen(port, () => {
    console.log(`Backend running on http://localhost:${port}`);
});
