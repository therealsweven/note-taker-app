//import fs and util

const fs = require("fs");
const util = require("util");

// create promise object for fs.readFile
const readFromFile = util.promisify(fs.readFile);

// function to save data to file
const writeToFile = (file, note) =>
  fs.writeFile(file, JSON.stringify(note, null, 4), (err) =>
    err ? console.error(err) : console.info(`\nNotes data saved to ${file}`)
  );

//function to read data, add note, and rewrite data file
const readAndAppend = (note, file) => {
  fs.readFile(file, "utf8", (err, data) => {
    if (err) {
      console.error(err);
    } else {
      const parsedData = JSON.parse(data);
      parsedData.push(note);
      writeToFile(file, parsedData);
    }
  });
};

// function to read data, delete intended note, and rewrite data file
const readAndDelete = (note, file) => {
  //   console.log("delete function running");
  fs.readFile(file, "utf8", (err, data) => {
    if (err) {
      console.error(err);
    } else {
      const parsedData = JSON.parse(data);
      //   console.log(parsedData);
      for (i = 0; i < parsedData.length; i++) {
        if (parsedData[i].id === note.id) {
          const deleteIndex = i;
          //   console.log(deleteIndex);
          parsedData.splice(deleteIndex, 1);
          //   console.log(parsedData);
          writeToFile(file, parsedData);
          return;
        }
      }
    }
  });
};

// export fs helper functions
module.exports = { readFromFile, writeToFile, readAndAppend, readAndDelete };
