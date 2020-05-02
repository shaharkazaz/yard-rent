const express = require('express');
const router = express.Router();

const {getRecommendation,resetDataSet} = require('../controllers/recommendations');

router.get('/:productId', getRecommendation);
router.post('/resetData', resetDataSet);

module.exports = router;