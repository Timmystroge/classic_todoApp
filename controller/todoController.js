const bodyPaser = require("body-parser");

// set middleware
const urlencodedparser = bodyPaser.urlencoded({ extended: false });

/* Fire Controller */
const fireTodoAppController = function (app) {
  //TODO => START SCRIPT

  app.get("/", function (req, res) {
    res.render("index");
  });

  app.get("/todo", function (req, res) {
    res.render("todo");
  });

  // handle post request
  app.post("/url", urlencodedparser, function (req, res) {
    res.send("seen!");
  });

  // ==========|404|==========
  // get all unhandled routes => direct them to error page!
  app.get("/*", function (req, res) {
    res.render("404");
  });

  //TODO => END SCRIPT
};

module.exports = fireTodoAppController;
