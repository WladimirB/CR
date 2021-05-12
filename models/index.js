const { Book } = require('./book');
const { Review } = require('./review');

exports.getBooks = function (cb) {
  Book.aggregate().sample(5).exec(cb);
};

exports.getOneBook = function (idSearch, cb) {
  Book.findById(idSearch).exec(cb);
};

exports.findBooksByTitle = function (title, cb) {
  Book
    .find({ title: { $regex: title, $options: 'i' } }, '_id title author')
    .lean()
    .exec(cb);
};

exports.loadReviews = function (bookId, cb) {
  Review
    .find({ onBook: bookId })
    .populate('author', 'username')
    .populate('onBook', 'title')
    .limit(5)
    .exec(cb);
};

exports.addReview = function (obj, res, next) {
  const template = {
    author: '',
    onBook: '',
    comment: '',
  };
  const review = { ...template, ...obj };
  Review.create(review,
    (err, newReview) => {
      if (err) return next(err);
      Book
        .findById(newReview.onBook)
        .exec((err, book) => {
          if (err) return next(err);
          book.reviews.push(newReview._id);
          book.save();
          return res.send({ message: 'Добавлен отзыв' });
        });
    });
};
