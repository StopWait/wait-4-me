const express = require('express')
const bodyParser = require('body-parser')
const cookieParser = require('cookie-parser')
const logger = require('morgan')
const path = require('path')
const config = require('./config')

module.exports = function(app){

  app.set('views', config.rootPath+'views')
  app.set('view engine', 'jade')
  app.use(logger('dev'))
  app.use(bodyParser.json())
  app.use(bodyParser.urlencoded({ extended: false }))
  app.use(cookieParser())
  app.use(express.static(config.rootPath+'public'))

}
