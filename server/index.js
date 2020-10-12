require('dotenv').config({ path: '../.env' })

const mongoose = require('mongoose');

const app = require('./app');
const config = require('./config');

const connect = url => {
  return mongoose.connect(url, config.db.options);
};

app.listen(config.port);
connect(config.db.prod);
mongoose.connection.on('error', console.log);

module.exports = app;
