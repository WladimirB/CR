const jwt = require('jsonwebtoken');
const { User } = require('../models/user');
const config = require('../config');

exports.register = function (req, res) {
  const newUser = req.body;
  User.create(newUser, (err, user) => {
    if (err) return res.status(400).send(err);
    user.pHash = undefined;
    return res.send(`Вы успешно зарегистрировались ${user.username}`);
  });
};

exports.sign_in = function (req, res) {
  User.findOne({ username: req.body.username }, (err, user) => {
    if (err) throw err;
    if (!user || !user.checkPassword(req.body.password)) {
      return res.status(400).json({ message: 'Аутентификация провалилась!' });
    }

    const token = jwt.sign({
      username: user.username,
      _id: user._id,
    }, config.get('secret'));

    return res
      .cookie('access_token', `Bearer ${token}`)
      .send('Вы успешно авторизовались на сайте');
  });
};

exports.profile = function (req, res, next) {
  if (req.user) {
    res.send(req.user);
    next();
  } else {
    return res.status(401).json({ message: 'Invalid token' });
  }
};

exports.checkUserBeforeRegister = function (req, res, next) {
  User
    .findOne({}, 'username email')
    .where('username')
    .equals(req.body.username)
    // eslint-disable-next-line prefer-arrow-callback
    .exec(function (err, result) {
      if (err) return next(err);
      if (!result) return next();
      return res.status(403).send('Пользователь с таким именем существует');
    });
};

exports.logout = function (req, res, next) {
  if (req.headers
    && req.headers.authorization && req.headers.authorization.split(' ')[0] === 'logout') {
    return res.clearCookie('access_token').send('Вы разлогинились');
  }
  return next();
};
