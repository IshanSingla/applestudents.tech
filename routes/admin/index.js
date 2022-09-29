const axios = require("axios");
const router = require("express").Router();
const mongoose = require("mongoose");
const events = require("../../models/events.schema");
const User = require("../../models/users.schema");
const registration = require("../../models/registration.schema");
const { dashbord, eventsregestration } = require("../../utils/admin");

// home route
router.get("/", async (req, res) => {
  let data=await dashbord()
    res.status(200).render("admin", {data});
});
router.get("/event/:id", async (req, res) => {
  let data= await eventsregestration(req.params.id)
    res.status(200).render("admin", {data});
});

module.exports = router;