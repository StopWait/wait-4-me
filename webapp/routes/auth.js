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
  successRedirect : '/auth/profile',
  failureRedirect : '/auth/signup'
}));


authRoutes.get('/login',ensureLogin.ensureLoggedOut('/'), (req, res) => {
    res.render('login', { message: "Mensaje Login" });
});


authRoutes.post('/login', passport.authenticate('local-login', {
  successRedirect : '/auth/profile',
  failureRedirect : '/'
}));

authRoutes.get('/logout', function(req, res) {
  req.logout();
  res.redirect('/');
});

authRoutes.get('/profile', function(req, res) {
  res.render('profile', {
    email: req.body.email,
    user: req.body.username
  });
});

authRoutes.get("/auth/facebook", passport.authenticate("facebook"));
authRoutes.get("/auth/facebook/callback", passport.authenticate("facebook", {
  successRedirect: "/auth/profile",
  failureRedirect: "/"
}));

module.exports = authRoutes;
