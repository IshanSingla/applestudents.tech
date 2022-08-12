var express = require("express");
var device = require("express-device");
const mongoose = require("mongoose");
require("dotenv").config();
var app = express();
app.use(device.capture());

const Links = require("./req/schema.js");
const database = require("./req/config");

app.get("/", (req, res) => {
  res.redirect("https://ieee.chitkara.edu.in");
});

app.get("/:route", async (req, res) => {
  const data = await Links.findOne(req.params).exec();
  if (req.device.type == "phone") {
    res.redirect(
      "https://play.google.com/store/apps/details?id=tech.developerdhairya.ieee_chitkara"
    );
  } else {
    res.redirect(data.link);
  }
});

app.listen(Number(process.env.PORT), () => {
  console.log("Listening on port: " + process.env.PORT);
});
