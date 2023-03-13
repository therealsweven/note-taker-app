// import necessary helper functions and data
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
  console.info(`${req.method} request received to save note`);
  //   console.log(req.body);

  //object destructuring
  const { title, text } = req.body;

  if (req.body) {
    //create new note with unique ID
    const newNote = {
      title,
      text,
      id: uuidv4(),
    };

    // save new note to db file
    readAndAppend(newNote, "./db/db.json");
    res.json(`Note added successfully 🚀`);
  } else {
    res.error("Error in adding note");
  }
});

// DELETE Route for deleting a note using route parameter as the unique ID
notes.delete("/:id", (req, res) => {
  console.info(`${req.method} request received to delete note`);
  //   console.log(req.params);
  if (req.params.id) {
    const requestedNote = req.params.id;
    for (i = 0; i < notesData.length; i++) {
      //check for index of requested note to be deleted
      if (requestedNote === notesData[i].id) {
        // console.log(notesData[i]);
        const noteToDelete = notesData[i];
        // console.log(noteToDelete);
        // delete note from json file
        readAndDelete(noteToDelete, "./db/db.json");
        res.json(`Note deleted successfully 🚀`);
        return;
      }
    }
  } else {
    res.error("Error in deleting note");
  }
});

module.exports = notes;
