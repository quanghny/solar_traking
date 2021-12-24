const express = require('express');
const router = express.Router();
const SolarController = require('../app/controllers/SolarController');

router.post('/date', SolarController.getDate);
router.post('/hour', SolarController.getHour);
router.post('/month', SolarController.getMonth);
router.get('/current-time', SolarController.currentTime);
router.post('/', SolarController.send);

//-------------------- {Dev}
router.get('/time', SolarController.receive);
router.delete('/delete/date', SolarController.deleteDate);
router.delete('/delete', SolarController.delete);

module.exports = router;
