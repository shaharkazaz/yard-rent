const express = require('express');
const router = express.Router();
const checkAuth = require('../middlewares/checkAuth');

const isAlive = require('../middlewares/isAlive');

router.get('/', checkAuth(), isAlive);


module.exports = router;
