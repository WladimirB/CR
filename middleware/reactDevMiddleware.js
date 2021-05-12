const webpack = require('webpack');
const config = require('../webpack.config');

const compiler = webpack(config);

const webpackDevMiddleware = require('webpack-dev-middleware');
const webpackHotMiddleware = require('webpack-hot-middleware');

exports.webpackDev = webpackDevMiddleware(compiler, {
  publicPath: config.output.publicPath,
});

exports.webpackHot = webpackHotMiddleware(compiler);
