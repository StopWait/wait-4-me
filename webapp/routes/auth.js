const express = require("express");
const authRoutes = express.Router();
const passport = require("passport");
const bcrypt = require("bcrypt");
const bcryptSalt = 10;
const ensureLogin = require("connect-ensure-login");
const User = require("../models/User");


authRoutes.get("/signup", (req, res, next) => {
  res.render('signup', {message:'Hi!! Signup & DONT WAIT ANYMORE!!'});
});

authRoutes.post('/signup', passport.authenticate('local-signup', {
  successRedirect : '/campaign',
  failureRedirect : '/auth/signup'
}));


authRoutes.get('/login',ensureLogin.ensureLoggedOut('/'), (req, res) => {
    res.render('login', { message: "Mensaje Login" });
});


authRoutes.post('/login', passport.authenticate('local-login', {
  successRedirect : `/campaign`,
  failureRedirect : '/auth/login'
}));

authRoutes.get('/logout', function(req, res) {
  req.logout();
  res.render('index', {
    user: res.locals.user
  });
});

authRoutes.get("/auth/facebook", passport.authenticate("facebook"));
authRoutes.get("/auth/facebook/callback", passport.authenticate("facebook", {
  successRedirect: "/campaign",
  failureRedirect: "/"
}));

module.exports = authRoutes;
