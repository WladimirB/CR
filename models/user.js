const bcrypt = require('bcrypt');
const mongoose = require('../database/mongoose');
const { Notification } = require('./notification');

const { Schema } = mongoose;

const userSchema = new Schema({
  username: {
    type: String,
    unique: true,
    required: true,
  },
  email: {
    type: String,
    required: true,
    unique: true,
    match: /^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-zA-Z0-9-]+(?:\.[a-zA-Z0-9-]+)*$/,
  },
  pHash: {
    type: String,
    required: true,
  },
  salt: {
    type: String,
    required: true,
  },
  created: {
    type: Date,
    default: Date.now(),
  },
  basket: {
    type: [{ type: mongoose.Schema.Types.ObjectId, ref: 'Book' }],
    default: [],
  },
  favorites: {
    type: [{ type: mongoose.Schema.Types.ObjectId, ref: 'Book' }],
    default: [],
  },
  information: {
    type: [Notification],
    default: undefined,
  },
});

userSchema.methods.hashPassword = function (password) {
  const hashedPassword = bcrypt.hashSync(password, this.salt);
  return hashedPassword;
};

userSchema.virtual('password')
  .set(function (password) {
    this._plainPassword = password;
    this.salt = bcrypt.genSaltSync(10);
    this.pHash = this.hashPassword(password);
  })
  .get(function () {
    return this._plainPassword;
  });

userSchema.methods.checkPassword = function (password) {
  return bcrypt.compareSync(password, this.pHash);
};

exports.User = mongoose.model('User', userSchema);
