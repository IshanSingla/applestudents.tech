const mongoose = require("mongoose");

const eventSchema = mongoose.Schema(
  {
    _id: mongoose.Schema.Types.ObjectId,
    route: {
      type: String,
      required: true,
    },
    eventName: {
      type: String,
      required: true,
    },
    eventDescription: {
      type: String,
      required: true,
    },
    isEventOpen: {
      type: Boolean,
      default: false,
    },
    eventDate: {
      type: Date,
      required: true,
    },
    eventCategory: {
      type: String,
      required: true,
    },
    eventAutoVerify: {
      type: Boolean,
      default: false,
    },
  },
  {
    timestamps: true,
  }
);

module.exports =  mongoose.models["event"] || mongoose.model("event", eventSchema);
