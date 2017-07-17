const LocalStrategy = require('passport-local').Strategy;
const User = require('../models/User');
const bcrypt = require("bcrypt");
const FbStrategy = require('passport-facebook').Strategy;

module.exports = function(passport) {

  passport.use(new LocalStrategy((username, password, next) => {
    User.findOne({
      username
    }, (err, user) => {
      if (err) {
        return next(err);
      }

      if (!user) {
        return next(null, false, {
          message: "Incorrect username"
        });
      }

      if (!bcrypt.compareSync(password, user.password)) {
        return next(null, false, {
          message: "Incorrect password"
        });
      }

      return next(null, user);
    });
  }));

  passport.serializeUser((user, cb) => {
    cb(null, user.id);
  });

  passport.deserializeUser((id, cb) => {
    User.findOne({
      "_id": id
    }, (err, user) => {
      if (err) {
        return cb(err);
      }
      cb(null, user);
    });
  });

  passport.use(new FbStrategy({
    clientID: "486848658326786",
    clientSecret: "d0c3c8bcdf809f2cf6fc72bf800c41b6",
    callbackURL: "/auth/facebook/callback",
    profileFields: ['id', 'first_name', 'last_name', 'cover', 'email']
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
};
