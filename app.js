const express = require('express');
const path = require('path');
const cookieParser = require('cookie-parser');
const logger = require('morgan');

const indexRouter = require('./routes/index');
const usersRouter = require('./routes/users');
const booksRouter = require('./routes/books');
const propertyRouter = require('./routes/property');

const app = express();

if (process.env.NODE_ENV == 'development') {
  // в режиме разработки подключаем webpack-dev-server как middleware
  const devMiddleware = require('./middleware/reactDevMiddleware');
  app.use(devMiddleware.webpackDev);
  app.use(devMiddleware.webpackHot);
}

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

app.use('/books', booksRouter);
app.use('/users', usersRouter);
app.use('/basket', propertyRouter);
app.use('/favorites', propertyRouter);
app.use('/', indexRouter);

module.exports = app;
