const express = require("express");
require("dotenv").config();
const path = require("path");
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
  .use("/", require("./routes/event.routes")); // ALL Events page

// // heroku awake way
// setInterval(() => {
//   http.get("http://ieeewebapp.herokuapp.com");
// }, 300000); // every 5 minutes (300000)

const PORT = Number(process.env.PORT)|| 4000;

connectDatabase().then(()=>{
  app.listen(PORT, () => { console.log("Listening on port: " + PORT); });
}).catch((err)=>{console.log("Error at Connecting Database ",err)})
