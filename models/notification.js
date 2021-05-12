const mongoose = require('../database/mongoose');
const Schema = mongoose.Schema;

const notificationSchema = new Schema({
  message: {
    type: String,
    required: true,
  },
  author: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    required: true,
  },
  subject: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Book',
    required: true,
  },
});

exports.Notification = notificationSchema;
