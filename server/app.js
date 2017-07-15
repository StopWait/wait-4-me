const app = require('express')()
const passport = require('passport')

require('dotenv').load()
require('./config/passport')(passport)
require('./config/express')(app)

const index = require('./routes/index')
app.use('/', index)

require('./config/error-handler')(app)
module.exports = app
