const jwt = require("jsonwebtoken");
const JWT_SECRET = process.env.JWT_SECRET;
const User = require("../models/users.schema");

const verifyToken = (token) => {
  try {
    const verify = jwt.verify(token, JWT_SECRET);
    if (verify._id) {
      return true;
    } else {
      return false;
    }
  } catch (error) {
    return false;
  }
};

module.exports.isLoggedIn = (req, res, next) => {
  try {
    const { token } = req.cookies;

    if (verifyToken(token)) {
      return next();
    } else {
      return res.redirect("/login");
    }
  } catch (error) {
    console.log("logged error");
    return res.redirect("/login");
  }
};
