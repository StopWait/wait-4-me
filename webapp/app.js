const app = require('express')();
const passport = require('passport');

require('dotenv').load();
require('./config/passport')();
require('./config/express')(app);
require('./config/expresscontroller')(app);

const index = require('./routes/index');
const auth = require('./routes/auth');
const campaign = require('./routes/campaign');
const review = require('./routes/review');
const user = require('./routes/user');

app.use('/', index);
app.use('/auth', auth);
app.use('/campaign', campaign);
app.use('/review', review);
app.use('/user', user);

require('./config/error-handler')(app);
module.exports = app;
