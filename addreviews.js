const async = require('async');
const fakeDataService = require('./services/fakeDataService');
const { Book } = require('./models/book');
const { User } = require('./models/user');
const { Review } = require('./models/review');

async.waterfall([
  function (callback) {
    User.find({}, (err, result) => {
      if (err) return callback(null, null);
      const usersId = [];
      result.map((item) => {
        usersId.push(item._id);
      });
      return callback(null, usersId);
    });
  },
  function (usersId, callback) {
    Book.find({}, (err, result) => {
      if (err) return callback(null, null);
      const reviewData = [];
      result.map((item) => {
        const onBook = item._id;
        usersId.map((id) => {
          reviewData.push([onBook, id]);
        });
      });
      return callback(null, reviewData);
    });
  },
  function (reviewData, callback) {
    const reviews = fakeDataService.getFakesArray('Review', reviewData);
    Review.insertMany(reviews, (err, result) => {
      if (err) return callback(null, null);
      return callback(null, result);
    });
  },
  function (result, callback) {
    Book.find({}, (err, books) => {
      if (err) return callback(null, null);
      books.map((book) => {
        const part = [];
        result.filter((post) => {
          if (book._id.equals(post.onBook)) part.push(post._id);
        });
        book.reviews = part;
        book.save();
      });
      return callback(null, 'add reviews');
    });
  },
], (err, res) => {
  if (!err) {
    console.log(res);
    return true;
  }
  return err;
});
