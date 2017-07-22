const User = require("../models/User");
const passport = require("passport");
const GlobalRoutes = require('../config/globalRoutes');

module.exports = {
  signupGet: (req, res, next) => { res.render(GlobalRoutes.Auth.Signup); },
  signupPost: passport.authenticate('local-signup', {
      successRedirect: '/campaign',
      failureRedirect: '/auth/signup'
  }),

  loginGet: (req, res, next) => { res.render(GlobalRoutes.Auth.Login); },
  loginPost: passport.authenticate('local-login', {
    successRedirect : '/campaign',
    failureRedirect : '/auth/login'
  }),

  logout: (req, res, next) => { req.logout(); res.redirect('/../'); },

  facebookGet: passport.authenticate("facebook"),
  facebookCallbackGet: passport.authenticate("facebook", {
    successRedirect: "/campaign",
    failureRedirect: "/"
  })
};
