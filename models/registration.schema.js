const mongoose = require("mongoose");

const ServicesSchema = mongoose.Schema({
  _id: mongoose.Schema.Types.ObjectId,
  user: mongoose.Schema.Types.ObjectId,
  event: mongoose.Schema.Types.ObjectId,
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