const app = require('express')()

require('./config/express')(app)

const index = require('./routes/index')
app.use('/', index)

require('./config/error-handler')(app)
module.exports = app
