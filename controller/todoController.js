const bodyPaser = require("body-parser");
const mongoose = require("mongoose");
const dotenv = require("dotenv");
const _ = require("lodash");

// set middleware
const urlencodedparser = bodyPaser.urlencoded({ extended: false });

// init dot env
dotenv.config();

// connect and create database
mongoose
  .connect(process.env.BACKEND_API)
  .then(function () {
    console.log("Connection Secured!");
  })
  .catch((err) => {
    console.log("Connection Failed!");
    console.log(err);
  });

// create new Item Schema
const itemsSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
  },
});

// create Item Model
const Item = mongoose.model("Item", itemsSchema);

const item1 = new Item({
  name: "Welcome to Stroge-list.",
});

const item2 = new Item({
  name: "Hit the + button to add a new item.",
});

const item3 = new Item({
  name: "<--- Hit this to delete an item.",
});

// create list schema
const listSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
  },
  items: [itemsSchema],
});

// create list model
const List = mongoose.model("List", listSchema);

/* Fire Controller */
const fireTodoAppController = function (app) {
  //TODO => START SCRIPT

  app.get("/", function (req, res) {
    // const day = date.day.getDate();
    Item.find().then(function (data) {
      if (data.length === 0) {
        Item.insertMany([item1, item2, item3]).then(function () {
          console.log("Items Inserted Successfully!");
        });
        res.redirect("/");
      } else {
        res.render("todo", { listTitle: "Today", todoLists: data });
      }
    });
  });

  // handle post request
  app.post("/", urlencodedparser, function (req, res) {
    /* get user new todo value */
    const item = req.body.newItem;
    const listName = req.body.list;
    //

    // add it to the items collection
    const newItem = new Item({
      name: item,
    });
    if (listName === "Today") {
      newItem.save();

      // redirect to the home route
      res.redirect("/");
    } else {
      List.findOne({ name: listName }).then((data) => {
        data.items.push(newItem);
        data.save();
        res.redirect(`/${listName}`);
      });
    }
  });

  app.post("/delete", urlencodedparser, function (req, res) {
    let itemId = req.body.checkbox;
    let listName = req.body.listName;

    if (listName === "Today") {
      // delete item from database
      Item.findByIdAndRemove({ _id: `${itemId}` }).then(function () {
        // redirect to the home route
        res.redirect("/");
      });
    } else {
      List.findOneAndUpdate(
        { name: listName },
        { $pull: { items: { _id: itemId } } }
      ).then(function () {
        res.redirect(`/${listName}`);
      });
    }
  });

  app.get("/:id", function (req, res) {
    const customeListName = _.capitalize(req.params.id);

    List.findOne({ name: customeListName })
      .then(function (data) {
        if (!data) {
          // create a new list
          const list = new List({
            name: customeListName,
            items: [item1, item2, item3],
          });

          list.save();
          res.redirect(`/${customeListName}`);
        } else {
          res.render("todo", { listTitle: data.name, todoLists: data.items });
        }
      })
      .catch((err) => {
        console.log(err);
      });
  });

  // ==========|404|==========
  // get all unhandled routes => direct them to error page!
  app.get("/*", function (req, res) {
    res.render("404");
  });

  //TODO => END SCRIPT
};

module.exports = fireTodoAppController;
