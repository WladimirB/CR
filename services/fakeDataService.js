const faker = require('faker');

function createFakeBook(title = null, authors = null) {
  this.title = title ?? faker.random.words(randomInteger(1, 6));
  this.authors = authors ?? faker.name.findName();
  this.image = this.title.split(/\s/).slice(0, 3).join('_').toLowerCase();
  return {
    title: this.title,
    description: faker.random.words(randomInteger(30, 90)),
    image: `/book/photo/${this.image}.jpeg`,
    releaseDate: faker.date.between(2001, 2020),
    price: faker.commerce.price(),
    authors: this.authors,
    reviews: [],
    rating: randomInteger(1, 5),
  };
}

function getFakeUser() {
  return {
    username: faker.name.findName(),
    email: faker.internet.email(),
    password: faker.internet.password(),
  };
}

function randomInteger(min, max) {
  const rand = min + Math.random() * (max + 1 - min);
  return Math.floor(rand);
}

exports.createFakeBook = createFakeBook;
exports.getFakeUser = getFakeUser;

exports.getFakesCount = function (stringWhat, number = 1) {
  const arr = [];
  let callback;
  switch (stringWhat) {
    case 'Book':
      callback = createFakeBook;
      break;
    case 'User':
      callback = getFakeUser;
      break;
    default:
      callback = null;
      break;
  }

  if (!callback) return;

  for (let i = 0; i < number; i++) {
    arr.push(callback());
  }

  return arr;
};

function createFakeUserWithName(fakeUserName) {
  return {
    username: fakeUserName,
    email: `${fakeUserName}@mail.com`,
    password: fakeUserName,
  };
}

exports.createFakeUserWithName = createFakeUserWithName;

function createFakeReview(bookId, userId, comment = null) {
  this.comment = comment ?? faker.random.words(randomInteger(5, 20));
  return {
    author: userId,
    onBook: bookId,
    comment: this.comment,
  };
}

exports.createFakeReview = createFakeReview;

exports.getFakesArray = function (stringWhat, arr) {
  const fakedata = [];
  let callback;

  switch (stringWhat) {
    case 'Book':
      callback = createFakeBook;
      break;
    case 'User':
      callback = createFakeUserWithName;
      break;
    case 'Review':
      callback = createFakeReview;
      break;
    default:
      callback = null;
      break;
  }

  if (!arr && !callback) return null;

  arr.map((item) => {
    if (Array.isArray(item)) {
      fakedata.push(callback(...item));
    } else {
      fakedata.push(callback(item));
    }
  });

  return fakedata;
};
