const GoogleTokenStrategy = require('passport-google-id-token');
const config = require('../config');
const User = require('../models/user');

const { clientId } = config.access.google;

const googleJwtStrategy = new GoogleTokenStrategy(
  {
    clientID: clientId
  },
  function(parsedToken, googleId, done) {
    if (!googleId)
      return done(null, false, { message: 'Not using google token' });
    // TODO: Optionally use parsedToken.payload.hd to verify domain
    const { email, name } = parsedToken.payload;
    // TODO: Create at a separate endpoint. Then we don't need to find here either, just verify.
    User.find({ googleId: googleId }, function(err, user) {
      if (user && user.length > 0) {
        return done(err, user);
      }
      User.create({ googleId: googleId, username: name, email }, done);
    });
  }
);

module.exports = googleJwtStrategy;
