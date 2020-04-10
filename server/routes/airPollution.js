const express = require('express');
const router = express.Router();
const { getAirPollution } = require('../controllers/airPollution');

router.get('/', getAirPollution);

module.exports = router;
