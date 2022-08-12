const mongoose = require("mongoose");

const ServicesSchema = mongoose.Schema({
  _id: mongoose.Schema.Types.ObjectId,
  route: String,
  link: String,
});

module.exports = mongoose.model("links", ServicesSchema);