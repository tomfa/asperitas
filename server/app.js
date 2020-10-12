const express = require('express');
const morgan = require('morgan');
const cors = require('cors');
const expressValidator = require('express-validator');
const passport = require('passport');
const localStrategy = require('./auth/local');
const jwtStrategy = require('./auth/jwt');
const googleStrategy = require('./auth/google');
const config = require('./config')

const app = express();

app.use(cors());
app.use(express.json());
app.use(expressValidator());
app.use(morgan('common'));
app.use(passport.initialize());

passport.use(localStrategy);
if (config.access.google.clientId) {
  passport.use('jwt', googleStrategy);
} else {
  passport.use('jwt', jwtStrategy);
}

require('./routes')(app);

module.exports = app;
