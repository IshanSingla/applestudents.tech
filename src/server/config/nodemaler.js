var nodemailer = require("nodemailer");

var smtpTransporter = nodemailer.createTransport({
  port: 465,
  host: process.env.AWS_HOST,
  secure: true,
  auth: {
    user: process.env.AWS_SES_USER,
    pass: process.env.AWS_SES_PASSWORD,
  },
  debug: true,
});

const mailInitiator = async (
  mailOptions = {},
  callback = (error, info) => {
    if (error) {
      console.log(error);
    } else {
      console.log("Message sent: " + info.response);
    }
  }
) => {
  smtpTransporter.sendMail(mailOptions, callback);
};

module.exports = { mailInitiator };
