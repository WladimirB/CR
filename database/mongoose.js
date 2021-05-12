const mongoose = require('mongoose');
const config = require('../config');

mongoose.connect(config.get('mongoose:uri'), config.get('mongoose:options'));
mongoose.connection.on('error', function (err) {
  console.error('Could not connectd to Db');
});

module.exports = mongoose;
