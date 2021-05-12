const jwt = require('jsonwebtoken');
const config = require('../config');

module.exports = function (req, res, next) {
  if (req.cookies.access_token
    && req.cookies.access_token.split(' ')[0] === 'Bearer') {
    jwt.verify(req.cookies.access_token.split(' ')[1],
      config.get('secret'), (err, decode) => {
        if (err) req.user = undefined;
        req.user = decode._id;
        next();
      });
  } else {
    req.user = undefined;
    next();
  }
};
