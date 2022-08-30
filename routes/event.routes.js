const router = require("express").Router();
const mongoose = require("mongoose");
const Links = require("../models/events.schema");

// All Events page
router.get("/", async (req, res) => {
  const data = await Links.find(
    {
      $or:
        [
          {eventCategory:"current"},
          {eventCategory:"upcomming"}
        ]
    }
    ).exec();
  res.render("index", { data });
});

router.post("/create", async (req, res) => {
  const {route, eventDescription, eventName, eventPosterURL, eventRegistrationURL, isRegistrationOpen, eventCategory, eventCreationTimestamp } = req.body;
  new Links({
    _id: new mongoose.Types.ObjectId(),
    route,
    eventDescription,
    eventName,
    eventPosterURL,
    eventRegistrationURL,
    isRegistrationOpen,
    eventCategory,
    eventCreationTimestamp,
  }).save();
  res.send("events save sucessfully");
});

// Event Dynamic Page /event/:route
router.get("/:route", async (req, res) => {
  const data = await Links.findOne(req.params).exec();
  if (data) {
    res.render("event", { data });
  }
});

// /:route/Register
router.get("/:route/Register", async (req, res) => {
  const data = await Links.findOne(req.params).exec();
  if (data) {
    if (data.isRegistrationOpen) {
      if (req.headers["user-agent"].includes("Android")) {
        res.redirect(
          "https://play.google.com/store/apps/details?id=tech.developerdhairya.ieee_chitkara"
        );
      } else {
        res.status(200).render("form", { data });
      }
    } else {
      res.status(200).render("eventStatus", { Status: false });
    }
  }
});

// // /event/:route/form
// // Event Form Dynamic Page
// router.get("/:route/form", async (req, res) => {
//   data = await Links.findOne(req.params).exec();
//   if (!data) {
//     res.status(404).render("404Error");
//   } else {
//     if (data.isRegistrationOpen) {
//       res.status(200).render("form", { data });
//     } else {
//       res.status(200).render("eventStatus", { Status: false });
//     }
//   }
// });

router.get("*", async (req, res) => {
  res.status(404).render("404Error");
});

module.exports = router;
