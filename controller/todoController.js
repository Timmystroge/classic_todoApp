const bodyPaser = require("body-parser");
const date = require(__dirname + "/date.js");

// set middleware
const urlencodedparser = bodyPaser.urlencoded({ extended: false });

const items = ["Buy food", "cook food", "eat food", "sleep"];
const workItems = []; /* Items on work page */

/* Fire Controller */
const fireTodoAppController = function (app) {
  //TODO => START SCRIPT

  app.get("/", function (req, res) {
    const day = date.day.getDate();
    res.render("todo", { listTitle: day, todoLists: items });
  });

  // handle post request
  app.post("/", urlencodedparser, function (req, res) {
    /* get user new todo value */
    const item = req.body.newItem;
    //
    if (req.body.list === "Work list") {
      workItems.push(item);

      // redirect to the home route
      res.redirect("/work");
    } else {
      // add it to the items collection
      items.push(item);

      // redirect to the home route
      res.redirect("/");
    }
  });

  app.get("/work", function (req, res) {
    res.render("todo", { listTitle: "Work list", todoLists: workItems });
  });

  app.post("/work", function (req, res) {
    /* get user new todo value */
    const item = req.body.newItem;

    // add it to the items collection
    workItems.push(item);

    // redirect to the home route
    res.redirect("/work");
  });

  // ==========|404|==========
  // get all unhandled routes => direct them to error page!
  app.get("/*", function (req, res) {
    res.render("404");
  });

  //TODO => END SCRIPT
};

module.exports = fireTodoAppController;
