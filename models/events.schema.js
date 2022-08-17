const mongoose = require("mongoose");

const ServicesSchema = mongoose.Schema({
  _id: mongoose.Schema.Types.ObjectId,
  route: String,
  eventName: String,
  eventPosterURL: String,
  eventDescription: String,
  eventRegistrationURL: String,
  isRegistrationOpen: Boolean,
  eventCreationTimestamp: Number,

});
// ara same rakhna ki try ki ha


module.exports = mongoose.model("links", ServicesSchema);