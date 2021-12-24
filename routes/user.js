const express = require('express');
const UserController = require('../app/controllers/UserController');
const router = express.Router();

router.get('/', UserController.index);
router.get('/day', UserController.day);
router.get('/month', UserController.month);
router.get('/hour', UserController.hour);

module.exports = router;
