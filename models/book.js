const paginate = require('mongoose-paginate-v2');
const mongoose = require('../database/mongoose');

const { Schema } = mongoose;

const bookSchema = new Schema({
  title: {
    type: String,
    unique: true,
    required: true,
  },
  description: {
    type: String,
    default: 'No description',
  },
  image: {
    type: String,
    default: undefined,
  },
  releaseDate: {
    type: Date,
    required: true,
  },
  price: {
    type: Number,
    required: true,
  },
  authors: {
    type: String,
    required: true,
  },
  reviews: [{ type: mongoose.Schema.Types.ObjectId, ref: 'Review' }],
  rating: {
    type: Number,
    default: 0,
  },
});

bookSchema.virtual('votes')
  .get(function () {
    return this.votes == this.reviews.length;
  });

bookSchema.plugin(paginate);

exports.Book = mongoose.model('Book', bookSchema);
