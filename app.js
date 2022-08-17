const express = require("express");
require("dotenv").config();
const path = require("path");
const { connectDatabase } = require("./config/database.config");

const app = express();

// constants
const PORT = Number(process.env.PORT)|| 5000;

app.set('view engine', 'ejs')
app.use(express.static('public'))
app.use(express.json())
app.use(express.urlencoded({ extended: false }))
app.set('views', path.join(__dirname, 'views'));
app.set('public', path.join(__dirname, 'public'));


// Landing page
app.get("/", async (req, res) => {
  res.status(200).render("index");
});

// ALl Event Routes
app.use('/event', require('./routes/event.routes'))


connectDatabase().then(()=>{
  app.listen(PORT, () => { console.log("Listening on port: " + PORT); });

}).catch((err)=>{console.log("Error at Connecting Database ",err)})
