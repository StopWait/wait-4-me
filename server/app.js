const express = require('express')

const app = express()
require('./config/express')(app)

const index = require('./routes/index')
app.use('/', index)

require('./config/error-handler')(app)
module.exports = app
