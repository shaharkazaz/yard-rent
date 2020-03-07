const express = require('express');
const router = express.Router();

const isAlive = require('../middlewares/isAlive');


router.get('/', isAlive);


module.exports = router;
