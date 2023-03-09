// import express library
const express = require("express");

// assign value to declared PORT variable
const PORT = 3001;

// import notes data
const db = require("./db/db.json");

// variable declaration calling express function
const app = express();

// Implement middleware for the parsing of JSON data
app.use(express.json());
// Implement middleware for parsing of URL encoded data
app.use(express.urlencoded({ extended: true }));
