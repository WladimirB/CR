const async = require('async');
const fakeDataService = require('./services/fakeDataService');
const mongoose = require('./database/mongoose');
const { User } = require('./models/user');
const { Book } = require('./models/book');

const users = fakeDataService.getFakesArray('User', [
  'testUser',
  'finalUser',
  'anotherUser',
  'userReviewer',
]);

const books = fakeDataService.getFakesArray('Book', [
  ['Book user1', 'testUser'],
  ['Final book', 'finalUser'],
  ['Another Best book', 'anotheruser'],
  ['Reviewer', 'userReviewer'],
]);

async.series([
  open,
  dropDB,
  requireModels,
  createBooks,
  createUsers,
], cbResult());

function open(callback) {
  mongoose.connection.on('open', callback);
}

function dropDB(callback) {
  const { db } = mongoose.connection;
  db.dropDatabase(callback);
}

function createUsers(callback) {
  User.insertMany(users, callback);
}

function createBooks(callback) {
  Book.insertMany(books, callback);
  Book.insertMany(fakeDataService.getFakesCount('Book', 15));
}

function requireModels(callback) {
  async.each(Object.keys(mongoose.models), (modelName, callback) => {
    mongoose.models[modelName].ensureIndexes(callback);
  }, callback);
}

function cbResult() {
  return function (err, result) {
    if (err) return console.error(err);
    console.log(result);
    console.log('add fake data to db');
    mongoose.disconnect();
  };
}
