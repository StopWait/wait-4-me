const passport = require('passport');
const FbStrategy = require('passport-facebook').Strategy;
const User =  require('../models/User');

passport.use(new FbStrategy({
  clientID: "486848658326786",
  clientSecret: "d0c3c8bcdf809f2cf6fc72bf800c41b6",
  callbackURL: "/auth/facebook/callback"
}, (accessToken, refreshToken, profile, done) => {
  User.findOne({ facebookID: profile.id }, (err, user) => {
    if (err) {
      return done(err);
    }
    if (user) {
      return done(null, user);
    }

    const newUser = new User({
      facebookID: profile.id
    });

    newUser.save((err) => {
      if (err) {
        return done(err);
      }
      done(null, newUser);
    });
  });

}));
