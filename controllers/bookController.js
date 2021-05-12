const modelApi = require('../models');
const { Book } = require('../models/book');

exports.getAll = function (req, res, next) {
  // eslint-disable-next-line prefer-arrow-callback
  modelApi.getBooks(function (err, result) {
    if (err) return next(err);
    res.send(result);
  });
};

exports.getOne = function (req, res, next) {
  // eslint-disable-next-line prefer-arrow-callback
  modelApi.getOneBook(req.params.id, function (err, result) {
    if (err) return next(err);
    res.json(result);
  });
};

exports.searchBook = function (req, res, next) {
  const { title } = req.body;
  if (title === '' || title == null) return res.status(403).send({ message: 'Поле поиска не должно быть пустым' });
  // eslint-disable-next-line prefer-arrow-callback
  modelApi.findBooksByTitle(title, function (err, result) {
    if (err) return next(err);
    if (result.toString() === '') return res.status(404).send({ message: 'Соответствий не найдено' });
    res.send(result);
  });
};

exports.addReview = function (req, res, next) {
  if (req.body.comment === '') return res.status(400).send({ message: 'Поле отзыв не может быть пустым' });
  const obj = {
    author: req.user,
    onBook: req.body.itemId,
    comment: req.body.comment,
  };
  modelApi.addReview(obj, res, next);
};

const getPagination = (page, size) => {
  const limit = size ? +size : 5;
  const offset = page ? page * limit : 0;

  return { limit, offset };
};

exports.findAll = function (req, res) {
  const { page, size, title } = req.params;
  const condition = title
    ? { title: { $regex: new RegExp(title), $options: 'i' } }
    : {};
  const select = '_id title image';

  const { limit, offset } = getPagination(page, size);

  Book.paginate(condition, { select, offset, limit })
    .then((data) => {
      res.send({
        totalItems: data.totalDocs,
        books: data.docs,
        totalPages: data.totalPages,
        currentPage: data.page - 1,
      });
    })
    .catch((err) => {
      res.status(500).send({
        message:
          err.message || 'Some error occurred while retrieving tutorials.',
      });
    });
};
