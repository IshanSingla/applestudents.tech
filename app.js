var express = require("express");
require("dotenv").config();

var app = express();

//setting view engine to ejs
app.set("view engine", "ejs");

app.use(express.static('public'));

const Links = require("./req/schema.js");
const database = require("./req/config");

// Landing page
app.get("/", async (req, res) => {
  res.status(200).render("index");
});

// All Events page
app.get("/events", async (req, res) => {
  const data = await Links.find().exec();
  res.render("events",{eventData:data});
});

// Event Dynamic Page
app.get("/event/:route", async (req, res) => {
  const data = await Links.findOne(req.params).exec();
  if (!data) {
    res.status(404).send("404 event not foundNot Found");
  } else {
    res.render('event',{data})
  }
});

app.get("/event/:route/app", async (req, res) => {
  console.log(req.headers["user-agent"].split(" ")[1].substring(1));
  const data = await Links.findOne(req.params).exec();
  if (!data) {
    res.status(404).send("404 event not foundNot Found");
  } else {
    if (data.isRegistrationOpen) {
      if (req.headers["user-agent"].includes("Android")) {
        res.redirect(
          "https://play.google.com/store/apps/details?id=tech.developerdhairya.ieee_chitkara"
        );
      } else {
        res.status(200).render('eventStatus',{status:"app not ready for your device"});
      }
    } else {
      res.status(200).render('eventStatus',{status:"form has been closed "});
    }
  }
});

// Event Form Dynamic Page
app.get("/event/:route/form", async (req, res) => {
  const data = await Links.findOne(req.params).exec();
  if (!data) {
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
