const express = require('express');
const bodyParser = require('body-parser');
const cookieParser = require('cookie-parser');
const logger = require('morgan');
const path = require('path');
const passport = require('passport');
const mongoose = require('mongoose');
const config = require('./config');
const expressLayouts = require("express-ejs-layouts");
const session = require('express-session');
const MongoStore = require('connect-mongo')(session);

module.exports = function(app){

  mongoose.connect(config.db);

  app.use(session({
    secret: 'yeah2 ProJecttt v&J',
    resave: false,
    saveUninitialized: true,
    store: new MongoStore( { mongooseConnection: mongoose.connection })
  }));

  app.use((req,res,next) =>{
    res.locals.user = req.user;
    if (res.locals.user !== undefined) {
    }
    next();
  });

  app.use(passport.initialize());
  app.use(passport.session());

};
