const mongoose = require("mongoose");

const ServicesSchema = mongoose.Schema({
  _id: mongoose.Schema.Types.ObjectId,
  user: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "users",
  },
  event: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "events",
  },
  verified: {
    type: Boolean,
    default: true,
  },
  entryVerified: {
    type: Boolean,
    default: false,
  },
});
// ara same rakhna ki try ki ha

module.exports = mongoose.model("registration", ServicesSchema);
