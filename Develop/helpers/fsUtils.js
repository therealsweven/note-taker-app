const fs = require("fs");
const util = require("util");

const readFromFile = util.promisify(fs.readFile);

const writeToFile = (destination, content) =>
  fs.writeFile(destination, JSON.stringify(content, null, 4), (err) =>
    err ? console.error(err) : console.info(`\nData written to ${destination}`)
  );

const readAndAppend = (content, file) => {
  fs.readFile(file, "utf8", (err, data) => {
    if (err) {
      console.error(err);
    } else {
      const parsedData = JSON.parse(data);
      parsedData.push(content);
      writeToFile(file, parsedData);
    }
  });
};

const readAndDelete = (content, file) => {
  console.log("delete function running");
  fs.readFile(file, "utf8", (err, data) => {
    if (err) {
      console.error(err);
    } else {
      const parsedData = JSON.parse(data);
      console.log(parsedData);
      for (i = 0; i < parsedData.length; i++) {
        if (parsedData[i].id === content.id) {
          const deleteIndex = i;
          console.log(deleteIndex);
          parsedData.splice(deleteIndex, 1);
          console.log(parsedData);
          writeToFile(file, parsedData);
          return;
        }
      }
    }
  });
};

module.exports = { readFromFile, writeToFile, readAndAppend, readAndDelete };
