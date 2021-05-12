const mongoose = require('../database/mongoose');

const { Schema } = mongoose;

const reviewSchema = new Schema({
  author: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    required: true,
  },
  onBook: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Book',
    required: true,
  },
  comment: {
    type: String,
    required: true,
  },
});

exports.Review = mongoose.model('Review', reviewSchema);
