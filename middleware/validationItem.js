const { ObjectId } = require('mongoose').Types.ObjectId;
const { Book } = require('../models/book');

module.exports = function (req, res, next) {
  req.body.itemId = validId(req.body.itemId);
  if (!req.body.itemId) return res.status(400).send('Запрос не может быть обработан');
  Book.findById(req.body.itemId, (err, result) => {
    if (err) return next(err);
    if (!result) return res.status(400).send('Запрос не может быть обработан');
    next();
  });
};

function validId(str) {
  try {
    return ObjectId(str);
  } catch (err) {
    return false;
  }
}
