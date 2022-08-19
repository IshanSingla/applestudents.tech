const express = require("express");
const { Server } = require("socket.io");
const http = require("http");
require("dotenv").config();
const path = require("path");
const { connectDatabase } = require("./config/database.config");

const app = express();
const server = http.createServer(app);
const io = new Server(server);

// webapp setups
app
  .set("view engine", "ejs")
  .use(express.static("public"))
  .use(express.json())
  .use(express.urlencoded({ extended: false }))
  .set("views", path.join(__dirname, "views"))
  .set("public", path.join(__dirname, "public"))
  .use("/", require("./routes/event.routes")); // ALL Events page

// database update call sockit
require("./models/events.schema")
  .watch()
  .on("change", (data) => {
    io.emit("chat", { message: "ishan", userName: "ishasingla" });
  });

// heroku awake way
setInterval(() => {
  http.get("http://ieeewebapp.herokuapp.com");
}, 300000); // every 5 minutes (300000)

server.listen(Number(process.env.PORT) || 5000, async () => {
  await connectDatabase();
});
