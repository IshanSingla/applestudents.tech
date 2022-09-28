const axios = require("axios");
const router = require("express").Router();
const mongoose = require("mongoose");
const events = require("../../models/events.schema");
const User = require("../../models/users.schema");
const registration = require("../../models/registration.schema");

// home route
router.get("/", (req, res) => {
  res.status(200).send("Hello World");
});

// webhook route get for verification
router.get("/webhook", (req, res) => {
  let mode = req.query["hub.mode"];
  let challange = req.query["hub.challenge"];
  let token = req.query["hub.verify_token"];
  if (mode && token == "applestudents.tech") {
    res.status(200).send(challange);
  } else {
    res.sendStatus(403);
  }
});

const sending = async (phon_no_id, from) => {
  let datas = await registration.find().exec();
  datas.forEach(async (data) => {
    try {
      let userdata = await User.findById(data.user).exec();
      await axios({
        method: "POST",
        url: `https://graph.facebook.com/v13.0/${phon_no_id}/messages?access_token=${process.env.ACCESS_TOKEN}`,
        data: {
          messaging_product: "whatsapp",
          to: from,
          text: {
            body: `Name: ${userdata.name}\nEmail: ${userdata.email}\nEntered: ${data.entryVerified}`,
          },
        },
        headers: {
          "Content-Type": "application/json",
        },
      });
    } catch (err) {}
  });
};

// webhook route post for get messages
router.post("/webhook", async (req, res) => {
  try {
    if (req.body.entry) {
      // perameters from send messages
      let phon_no_id =
        req.body.entry[0].changes[0].value.metadata.phone_number_id;
      let from = req.body.entry[0].changes[0].value.messages[0].from;
    //   let name = req.body.entry[0].changes[0].value.contacts[0].profile.name;
    //   let msg_body = req.body.entry[0].changes[0].value.messages[0].text.body;
      await axios({
        method: "POST",
        url: `https://graph.facebook.com/v13.0/${phon_no_id}/messages?access_token=${process.env.ACCESS_TOKEN}`,
        data: {
          messaging_product: "whatsapp",
          to: from,
          text: {
            body: `Hello \nEvent: ${msg_body}`,
          },
        },
        headers: {
          "Content-Type": "application/json",
        },
      });
      sending(phon_no_id, from);
      res.sendStatus(200);
    } else {
      res.sendStatus(404);
    }
  } catch (err) {
    res.sendStatus(404);
  }
});
module.exports = router;
