const jwt = require("jsonwebtoken");
const JWT_SECRET = process.env.JWT_SECRET;
const User = require("../models/users.schema");

const verifyToken = async (token) => {
  try {
    const verify = jwt.verify(token, JWT_SECRET);
    if (verify._id) {
      let users=await User.findById(verify._id);
      if (users) {
        return true;
      }
    }
    return false;
  } catch (error) {
    return false;
  }
};

module.exports.isLoggedIn = async (req, res, next) => {
  try {
    const { token } = req.cookies;
    if (await verifyToken(token)) {

      return next();
    } else {
      return res.redirect("/login");
    }
  } catch (error) {
    return res.redirect("/login");
  }
};
