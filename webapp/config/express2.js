const param = require('express');
const session = require('express-session');
const mongoose = require('mongoose');
const config = require('./config');
module.exports = function(param){
  mongoose.connect(config.db);
  param.use((req, res, next) => {
    res.locals.user = req.user;
    next();
  });
};
