const express = require("express");
require("dotenv").config();
const path = require("path");
const session = require("express-session");
const passport = require("passport");
var cookieParser = require("cookie-parser");
const { connectDatabase } = require("./config/database.config");

const app = express();

// webapp setups
app
  .set("view engine", "ejs")
  .use(express.static("public"))
  .use(express.json())
  .use(express.urlencoded({ extended: false }))
  .set("views", path.join(__dirname, "views"))
  .set("public", path.join(__dirname, "public"))
  .use(cookieParser())
  .use(
    session({
      resave: false,
      saveUninitialized: true,
      secret: "SECRET",
    })
  )
  .use(passport.initialize())
  .use(passport.session())
  .use(function (err, req, res, next) {
    // error handler
    res.status(err.status || 500);
    res.render("error", {
      error: {
        status: err.status,
        Description: err,
      },
    });
  })
  .use("/", require("./routes/event.routes"));
// ALL Events page

// // heroku awake way
// setInterval(() => {
//   http.get("http://ieeewebapp.herokuapp.com");
// }, 300000); // every 5 minutes (300000)

const PORT = Number(process.env.PORT) || 5000;

connectDatabase()
  .then(() => {
    app.listen(PORT, () => {
      console.log("Listening on port: " + PORT);
    });
  })
  .catch((err) => {
    console.log("Error at Connecting Database ", err);
  });
