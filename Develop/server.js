// import express library
const express = require("express");
//import routes/index.js
const api = require("./routes/index");

// assign value to declared PORT variable
const PORT = 3002;
const path = require("path");

// import notes data
const db = require("./db/db.json");

// variable declaration calling express function
const app = express();

// Implement middleware for the parsing of JSON data
app.use(express.json());
// Implement middleware for parsing of URL encoded data
app.use(express.urlencoded({ extended: true }));
// Implement middleware to route the API requests
app.use("/api", api);

app.use(express.static("public"));

// get route for notes.html
app.get("/notes", (req, res) => {
  // Log request to the terminal
  console.info(`${req.method} request received to get notes`);
  return res.status(200).sendFile(path.join(__dirname, "./public/notes.html"));
});

//wildcard route sends you to index.html
app.get("/*", (req, res) => {
  console.info(`${req.method} wildcard request received to get index.html`);
  return res.status(200).sendFile(path.join(__dirname, "./public/index.html"));
});

// initialize server on PORT
app.listen(PORT, () =>
  console.log(`Express server listening on port ${PORT}!`)
);
