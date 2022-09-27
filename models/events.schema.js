const mongoose = require("mongoose");

const ServicesSchema = mongoose.Schema({
  _id: mongoose.Schema.Types.ObjectId,
  route: String,
  eventName: String,
  eventDescription: String,
  isRegistrationOpen: Boolean,
  eventCategory: String,
  eventCreationTimestamp: Date,
});
// ara same rakhna ki try ki ha

module.exports = mongoose.model("events", ServicesSchema);
