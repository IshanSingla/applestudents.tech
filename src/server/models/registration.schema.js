const mongoose = require("mongoose");

const registrationSchema = mongoose.Schema(
  {
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
  },
  {
    timestamps: true,
  }
);

module.exports = mongoose.models["registration"] || mongoose.model("registration", registrationSchema);
