const express = require('express');
const path = require('path');

const router = express.Router();

router.use('*', (req, res, next) => {
  const indexFile = path.resolve(__dirname, '../public/index.html');
  res.sendFile(indexFile);
});
/* GET home page. */
router.get('/', (req, res, next) => {
  res.render('index', { title: 'Express' });
});

module.exports = router;
