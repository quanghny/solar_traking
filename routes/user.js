const express = require('express');
const UserController = require('../app/controllers/UserController');
const verifyToken = require('../app/middleware/auth');
const router = express.Router();

router.get('/', verifyToken, UserController.index);
router.get('/day', UserController.day);
router.get('/month', UserController.month);
router.get('/hour', UserController.hour);
router.get('/setting', UserController.setting);
router.get('/login', UserController.login);
router.post('/login', UserController.confirm);
router.get('/logout', UserController.logout);

module.exports = router;
