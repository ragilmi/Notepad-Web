import React, { useState, useEffect } from "react";

function App() {
  const [notes, setNotes] = useState([]);
  const [newNote, setNewNote] = useState("");
  const [selectedNoteId, setSelectedNoteId] = useState(null);

  useEffect(() => {
    fetch("http://localhost:3000/notes") // Docker internal service name
      .then((res) => res.json())
      .then((data) => setNotes(data));
  }, []);

  const handleAddNote = async () => {
  if (selectedNoteId) {
    // Update existing note
    const res = await fetch(`http://localhost:3000/notes/${selectedNoteId}`, {
      method: "PUT",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ content: newNote }),
    });

    const data = await res.json();
    if (res.ok) {
      setNotes(notes.map(note => note.id === selectedNoteId ? data.note : note));
      setSelectedNoteId(null);
      setNewNote("");
    }
  } else {
    // Add new note
    const res = await fetch("http://localhost:3000/notes", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ content: newNote }),
    });

    const data = await res.json();
    if (res.ok) {
      setNotes([...notes, data.note]);
      setNewNote("");
    }
  }
};

  return (
    <>
    <div className="content">
      <div className="name">
        <h1>Narratica</h1>
      </div>
      <div className="body">
        <div className="canvas">
          <textarea
            name="canvas"
            id="narration"
            className="narration"
            value={newNote}
            onChange={(e) => setNewNote(e.target.value)}
          ></textarea>

          <button onClick={handleAddNote}>Add new draft</button>
        </div>
        <div className="drafts">
          <h2>Submitted Drafts</h2>
          {notes.length === 0 ? (
            <p>No drafts yet</p>
          ) : (
            <ul className="draft-list">
  {notes.map((note) => (
    <li
      key={note.id}
      onClick={() => {
        setSelectedNoteId(note.id);
        setNewNote(note.content);
      }}
    >
      {note.content}
    </li>
  ))}
</ul>
          )}
        </div>
      </div>
      </div>
    </>
  );
}

export default App;
