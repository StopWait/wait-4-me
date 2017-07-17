const express = require("express");
const passport = require("passport");

const authRoutes = express.Router();

authRoutes.get("/facebook", passport.authenticate("facebook"));
authRoutes.get("/facebook/callback", passport.authenticate("facebook", {
  successRedirect: "/my-trips",
  failureRedirect: "/"
}));

module.exports = authRoutes;
