const express = require('express');

const router = express.Router();
const bookController = require('../controllers/bookController');
const authorization = require('../middleware/autorization');
const validationItem = require('../middleware/validationItem');
const loginRequired = require('../middleware/loginRequired');

router.use('/:id/review', authorization, loginRequired);
router.get('/', bookController.getAll);
router.get('/:id', bookController.getOne);
router.post('/:id/review', validationItem, bookController.addReview);
router.get('/search/:title/:page', bookController.findAll);

module.exports = router;
