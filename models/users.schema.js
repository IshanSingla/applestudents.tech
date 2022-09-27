const mongoose = require("mongoose");

const ServicesSchema = mongoose.Schema({
  name: {
    type: String
  },
  email: {
    type: String,
  },
  picture: {
    type: String,
  },
  rollNo: {
    type: Number,
    default: null,
  },
  phoneNumber: {
    type: Number,
    default: null,
  },
  userType: {
    type: String,
    default: "user",
  },
});

module.exports = mongoose.model("users", ServicesSchema);
