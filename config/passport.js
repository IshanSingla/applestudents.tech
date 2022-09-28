var GoogleStrategy = require("passport-google-oauth20").Strategy;
const passport = require("passport");
const User = require("../models/users.schema");
const jwt = require("jsonwebtoken");
const strategy = new GoogleStrategy(
  {
    clientID: process.env.GOOGLE_CLIENT_ID,
    clientSecret: process.env.GOOGLE_CLIENT_SECRET,
    callbackURL: "https://applestudents.tech/login/callback",
  },
  async function (accessToken, refreshToken, profile, done) {
    console.log("profile", profile);
    if (profile._json.hd === "chitkara.edu.in") {
      const { picture, email, name } = profile._json;
      let user = await User.findOne({ email }).exec();
      if (user) {
        const token = jwt.sign({ _id: user._id }, process.env.JWT_SECRET, {
          expiresIn: "7d",
        });

        return done(null, token);
      } else {
        user = await new User({
          name,
          email,
          picture,
        }).save();
        const token = jwt.sign(
          { _id: user._id, type: user.userType },
          process.env.JWT_SECRET,
          {
            expiresIn: "7d",
          }
        );

        return done(null, token);
      }
    } else {
      return done(null, null);
    }
  }
);

passport.use(strategy);

passport.serializeUser((user, done) => {
  done(null, user);
});

passport.deserializeUser((user, done) => {
  done(null, user);
});

exports.passport = passport;
