var express = require("express");
require("dotenv").config();

var app = express();

//setting view engine to ejs
app.set("view engine", "ejs");

const Links = require("./req/schema.js");
const database = require("./req/config");

// Landing page
app.get("/", async (req, res) => {
  res.status(200).render("index");
});

// All Events page
app.get("/event", async (req, res) => {
  const data = await Links.find().exec();
  res.status(200).send("Events Page" + JSON.stringify(data));
});

// Event Dynamic Page
app.get("/event/:route", async (req, res) => {
  const data = await Links.findOne(req.params).exec();
  if (data) {
    res.status(404).send("404 event not foundNot Found");
  } else {
    res.status(200).send("event page with button" + JSON.stringify(data));
  }
});

app.get("/event/:route/app", async (req, res) => {
  const data = await Links.findOne(req.params).exec();
  if (data) {
    res.status(404).send("404 event not foundNot Found");
  } else {
    if (data.isRegistrationOpen) {
      if (req.headers["user-agent"].includes("Android")) {
        res.redirect(
          "https://play.google.com/store/apps/details?id=tech.developerdhairya.ieee_chitkara"
        );
      } else {
        res.status(200).send("App is not ready for youre platform");
      }
    } else {
      res.status(200).send("form has been closed ");
    }
  }
});

// Event Form Dynamic Page
app.get("/event/:route/form", async (req, res) => {
  const data = await Links.findOne(req.params).exec();
  if (data) {
    res.status(404).send("404 event not foundNot Found");
  } else {
    if (data.isRegistrationOpen) {
      res.status(200).send("form page for data: " + JSON.stringify(data));
    } else {
      res.status(200).send("form has been closed ");
    }
  }
});

app.listen(Number(process.env.PORT), () => {
  console.log("Listening on port: " + process.env.PORT);
});
