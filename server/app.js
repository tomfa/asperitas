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
const isUsingGoogle = !!config.access.google.clientId;
if (isUsingGoogle) {
  console.log('Using Google JWT for auth');
  passport.use('jwt', googleStrategy);
} else {
  console.log('Using regular JWT for auth');
  passport.use('jwt', jwtStrategy);
}

require('./routes')(app);

module.exports = app;
