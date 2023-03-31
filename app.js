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
const Port = 3000;
app.listen(Port, function () {
  console.log("Server started!, Running on port " + Port);
});

module.exports = app;
