const express = require('express');

const router = express.Router();
const addTo = require('../controllers/propertyController').addUserProperty;
const authorization = require('../middleware/autorization');
const validationItem = require('../middleware/validationItem');
const loginRequired = require('../middleware/loginRequired');

router.use('/add', validationItem);
router.use('/add', authorization);
router.post('/add', loginRequired, addTo);

module.exports = router;
