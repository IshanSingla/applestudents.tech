const mongoose = require("mongoose");

exports.main = mongoose
  .connect(process.env.MONGO_ATLAS, {
    dbName: "main",
  })
  .then(() => {
    console.log("Successfully connected to mongo.");
  })
  .catch((err) => {
    console.log("Error connecting to mongo.", err);
  });