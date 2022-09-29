var nodemailer = require("nodemailer");
var dotenv = require("dotenv").config();

var smtpTransporter = nodemailer.createTransport({
  port: 465,
  service: "gmail",
  host: "smtp.gmail.com",
  secure: true,
  auth: {
    user: "ishan0648.be21@chitkara.edu.in",
    pass: "nmksjmldsmoceepi",
  },
  debug: true,
});

const mailInitiator = (mailOptions) => {
  smtpTransporter.sendMail(mailOptions, (error, info) => {
    if (error) {
      console.log(error);
    } else {
      console.log("Message sent: " + info.response);
    }
  });
};

module.exports = { mailInitiator };
