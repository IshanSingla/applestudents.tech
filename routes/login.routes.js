// const GoogleStrategy = require("passport-google-oauth").OAuth2Strategy;
const router = require("express").Router();
const { passport } = require("../config/passport");
router.get(
  "/",
  passport.authenticate("google", {
    scope: ["profile", "email"],
  })
);

router.get(
  "/callback",
  passport.authenticate("google", {
    failureRedirect: "/login",
  }), (req, res) => {
    res.cookie("token", req.user);
    res.redirect("/BienvenvueApple");
  }
);

module.exports = router;
