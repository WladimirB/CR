const { User } = require('../models/user');

exports.addUserProperty = function (req, res) {
  const currentUser = req.user;
  if (!currentUser) return console.error('Unautorized');
  const item = req.body.itemId;
  if (!item) return res.status(400).send('Плохой запрос, операция не выполнена');
  const { property } = req.body;
  let resMessage = '';
  User
    .findById(currentUser)
    .exec((err, result) => {
      if (err) {
        return console.error(err);
      }
      switch (property) {
        case 'favorites':
          if (result.favorites.includes(item)) {
            res.status(403).send('Книга уже добавлена');
            return;
          }
          result.favorites.push(item);
          resMessage = 'Вы добавили книгу в избранное';

          break;
        case 'basket':
          result.basket.push(item);
          resMessage = 'Вы добавили книгу в корзину';
          break;
        default:
          resMessage = 'Операция не возможнана';
          break;
      }

      result.save();
      res.status(200).send(resMessage);
    });
};
