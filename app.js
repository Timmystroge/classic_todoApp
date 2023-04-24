const express = require("express");
const todoController = require("./controller/todoController");

// initialize express
const app = express();

// set view engine to ejs
app.set("view engine", "ejs"); /* Embedded Javascript Templating */

// handle static request
app.use(express.static("./public"));

todoController(app);

// start Server

app.listen(3000 || 3000, function () {
  console.log("Server started Successfully! Happy Coding Stroge");
});

module.exports = app;
