const express = require('express');
const router = express.Router();

const {getRecommendation} = require('../controllers/recommendations');

router.get('/:productId', getRecommendation);

module.exports = router;