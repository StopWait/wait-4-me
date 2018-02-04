const express = require('express');
const bodyParser = require('body-parser');
const cookieParser = require('cookie-parser');
const session = require('express-session');
const MongoStore = require('connect-mongo')(session);
const logger = require('morgan');
const path = require('path');
const passport = require('passport');
const mongoose = require('mongoose');
const config = require('./config');
const expressLayouts = require("express-ejs-layouts");

module.exports = function(app){
  mongoose.Promise = Promise;
  mongoose.connect(config.db)
    .then(res => {
      const db = res.connections[0];
      console.log(`Connected to: ${db.name} in http://${db.host}:${db.port}`)
    }).catch(err => {
      throw err
    })
  app.set('views', config.rootPath+'views');
  app.set("view engine", "ejs");
  app.set('layout', 'layout/main-layout');
  app.use(expressLayouts);
  app.use(logger('dev'));
  app.use(bodyParser.json());
  app.use(bodyParser.urlencoded({ extended: false }));
  app.use(cookieParser());
  app.use(express.static(config.rootPath+'public'));
  app.use('/vendor/jquery', express.static(path.join(__dirname, '../node_modules/jquery/dist')));
  app.use('/vendor/bootstrap', express.static(path.join(__dirname, '../node_modules/bootstrap/dist')));
  app.use(session({
    secret: 'yeah2 ProJecttt v&J',
    resave: false,
    saveUninitialized: true,
    store: new MongoStore( { mongooseConnection: mongoose.connection })
  }));
  app.use(passport.initialize());
  app.use(passport.session());
  app.use((req, res, next) => {
    res.locals.user = req.user;
    next();
  });
};
