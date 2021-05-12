const express = require('express');

const router = express.Router();
const userController = require('../controllers/userController');
const autorize = require('../middleware/autorization');
const loginRequired = require('../middleware/loginRequired');

router.use('/tasks', autorize);
router.post('/tasks', loginRequired, userController.profile);
router.post('/auth/register', userController.checkUserBeforeRegister, userController.register);
router.post('/auth/sign_in', userController.sign_in);
router.post('/logout', userController.logout);

module.exports = router;
