const router = require("express").Router();
const mongoose = require("mongoose");
const Links = require("../models/events.schema");

// All Events page
router.get("/", async (req, res) => {
  res.status(200).redirect("https://ieee.chitkara.edu.in");
});

// 404 page
router.get("/404", async (req, res) => {
  res
    .status(404)
    .render("status", {
      spam: "404",
      description: "The page you are looking for was not found.",
    });
  // res.status(404).render("404Error")
});

// for future use
// router.post("/create", async (req, res) => {
//   const {route, eventDescription, eventName, eventPosterURL, eventRegistrationURL, isRegistrationOpen, eventCategory, eventCreationTimestamp } = req.body;
//   new Links({
//     _id: new mongoose.Types.ObjectId(),
//     route,
//     eventDescription,
//     eventName,
//     eventPosterURL,
//     eventRegistrationURL,
//     isRegistrationOpen,
//     eventCategory,
//     eventCreationTimestamp,
//   }).save();
//   res.send("events save sucessfully");
// });

// Event Dynamic Page /event/:route
router.get("/:route", async (req, res) => {
  const data = await Links.findOne(req.params).exec();
  if (data) {
    res.render("event", { data });
  } else {
    res.status(404).redirect("/404");
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
      res
        .status(200)
        .render("status", { spam: "Form Closed", description: "Thanku, Registrations are closed. Come back later" });
    }
  } else {
    res.status(404).redirect("/404");
  }
});

router.get("*", async (req, res) => {
  res.status(404).redirect("/404");
});

module.exports = router;
