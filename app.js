var express = require("express");
require("dotenv").config();
var helmet =require('helmet');

var app = express();
app.use(helmet());
app.use(
  helmet.contentSecurityPolicy({
    useDefaults: true,
    directives: {
      "script-src": ["'self'", "securecoding.com"],
      "style-src": null,
    },
  })
 );
 app.use(
  helmet.dnsPrefetchControl({
    allow: true,
  })
 );
 app.use(
  helmet.referrerPolicy({
    policy: ["origin", "unsafe-url"],
  })
 );
 app.use(
  helmet.expectCt({
    maxAge: 96400,
    enforce: true,
    reportUri: "https://securecoding.com/report",
  })
 );
 app.use(
  helmet.frameguard({
    action: "deny",
  })
 );
 app.use(helmet.hidePoweredBy());
 app.use(
  helmet.hsts({
    maxAge: 123456,
    includeSubDomains: false,
  })
 );
 app.use(helmet.ieNoOpen());
 app.use(helmet.noSniff());
 app.use(helmet.xssFilter());

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
  const data = await Links.findOne(req.params).exec();
  if (!data) {
    res.status(404).send("404 event Not Found");
  } else {
    if (data.isRegistrationOpen) {
      if (req.headers["user-agent"].includes("Android")) {
        res.redirect(
          "https://play.google.com/store/apps/details?id=tech.developerdhairya.ieee_chitkara"
        );
      } else {
        var Name = "Unknown OS";
        if (req.headers["user-agent"].includes("Win")) Name = 
          "Windows OS";
        if (req.headers["user-agent"].includes("Mac")) Name = 
          "Macintosh";
        if (req.headers["user-agent"].includes("Linux")) Name = 
          "Linux OS";
        if (req.headers["user-agent"].includes("Android")) Name = 
          "Android OS";
        if (req.headers["user-agent"].includes("like Mac")) Name = 
          "iOS";
        res.status(200).render('eventStatus',{Status: true,OsName:Name,evntdata:data});
      }
    } else {
      res.status(200).render('eventStatus',{Status:false,data});
    }
  }
});

// Event Form Dynamic Page
app.get("/event/:route/form", async (req, res) => {
  data = await Links.findOne(req.params).exec();
  if (!data) {
    res.status(404).send("404 event not foundNot Found");
  } else {
    if (data.isRegistrationOpen) {
      res.status(200).render('form',{data});
    } else {
      res.status(200).render('eventStatus',{Status:false});
    }
  }
});

app.listen(Number(process.env.PORT), () => {
  console.log("Listening on port: " + process.env.PORT);
});
