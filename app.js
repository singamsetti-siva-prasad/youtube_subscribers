const express = require("express");
const Subscriber = require("./src/models/subscriber");

//invoking express function
const app = express();

//register view engine
app.set("views", "./src/views");
app.set("view engine", "ejs");

//middleware & static files
app.use(express.static("public"));
app.use(express.urlencoded({ extended: true }));

//routes
app.get("/", (req, res) => {
  res.render("index.ejs");
});

//get all subscribers
app.get("/subscribers", async (req, res, next) => {
  try {
    let subscribers = await Subscriber.find();
    res.status(200).json(subscribers);
  } catch (error) {
    res.status(500);
    next(error);
  }
});

//get all subscibers name and subscribed channel
app.get("/subscribers/names", async (req, res) => {
  try {
    let subscribers = await Subscriber.find(
      {},
      { name: 1, subscribedChannel: 1, _id: 0 }
    );
    res.status(200).json(subscribers);
  } catch (error) {
    res.status(500);
    next(error);
  }
});

//get the subscriber by id and handle 400
app.get("/subscribers/:id", async (req, res) => {
  try {
    let id = req.params.id;
    let subscriber = await Subscriber.findById(id);
    res.status(200).json(subscriber);
  } catch {
    res.status(400).json("{message: error.message}");
  }
});

module.exports = app;
