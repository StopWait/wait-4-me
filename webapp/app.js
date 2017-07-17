const app = require('express')();
const passport = require('passport');


require('dotenv').load();
require('./config/passport')(passport);
require('./config/express')(app);
require('./config/express')(app);

const index = require('./routes/index');
const auth = require('./routes/auth');
const campaign = require('./routes/campaign');

app.use('/', index);
app.use('/auth', auth);
app.use('/campaign', campaign);

require('./config/error-handler')(app);
module.exports = app;
