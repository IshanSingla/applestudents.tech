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
  "/error",
  (req, res)=>{
    res.status(404).render("status", {
      spam: "We are sorry",
      description: "You can login only with your college email id.",
      custom: ""
    });

  }
);

router.get(
  "/callback",
  passport.authenticate("google", {
    failureRedirect: "/login/error",
  }), (req, res) => {
    res.cookie("token", req.user);
    res.redirect("/BienvenvueApple/Register");
  }
);

module.exports = router;
