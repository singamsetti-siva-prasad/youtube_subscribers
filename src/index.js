const express = require("express");
const app = require("./app.js");
const mongoose = require("mongoose");
const port = 5000;

// Parse JSON bodies (as sent by API clients)
mongoose.set("strictQuery", false);

app.use(express.json());
app.use(express.urlencoded({ extended: false }));

// Connect to DATABASE
const dbUrl = "mongodb://0.0.0.0:27017/subscribers";

mongoose
  .connect(dbUrl, { useNewUrlParser: true, useUnifiedTopology: true })
  .then((result) => {
    console.log("connected to database");
    app.listen(port, () => console.log(`App listening on port ${port}!`));
  })
  .catch((err) => {
    console.log(err);
  });
