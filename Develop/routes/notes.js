const notes = require("express").Router();
const {
  readFromFile,
  readAndAppend,
  readAndDelete,
} = require("../helpers/fsUtils");
const { v4: uuidv4 } = require("uuid");
const notesData = require("../db/db.json");

// GET Route to retrieve notes
notes.get("/", (req, res) => {
  readFromFile("./db/db.json").then((data) => res.json(JSON.parse(data)));
});

// POST Route to save a new note
notes.post("/", (req, res) => {
  console.log(req.body);

  const { title, text } = req.body;

  if (req.body) {
    const newNote = {
      title,
      text,
      id: uuidv4(),
    };

    readAndAppend(newNote, "./db/db.json");
    res.json(`Note added successfully 🚀`);
  } else {
    res.error("Error in adding note");
  }
});

// DELETE Route for deleting a note
notes.delete("/:id", (req, res) => {
  console.info(`${req.method} request received to delete note`);
  console.log(req.params);
  if (req.params.id) {
    const requestedNote = req.params.id;
    for (i = 0; i < notesData.length; i++) {
      if (requestedNote === notesData[i].id) {
        console.log(notesData[i]);
        const noteToDelete = notesData[i];
        return noteToDelete;
      }
    }

    readAndDelete(noteToDelete, "./db/db.json");
    res.json(`Note deleted successfully 🚀`);
  } else {
    res.error("Error in deleting note");
  }
});

module.exports = notes;
