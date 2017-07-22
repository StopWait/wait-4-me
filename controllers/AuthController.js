const User = require("../models/User");
const passport = require("passport");

module.exports = {
  signupGet: (req, res, next) => { res.render('auth/signup'); },
  signupPost: passport.authenticate('local-signup', {
      successRedirect: '/campaign',
      failureRedirect: '/auth/signup'
  }),

  loginGet: (req, res, next) => { res.render('auth/login'); },
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
