const express = require('express');
const router = express.Router();

const {getRecommendation} = require('../controllers/recommendations');
const checkAuth = require('../middlewares/checkAuth');

router.get('/', checkAuth(), getRecommendation);

module.exports = router;