const express = require('express');
const router = express.Router();

const { getTwittsByHashTag, getTwittsByPageName, postTwitt } = require('../controllers/twitter');

router.get('/hashtag', getTwittsByHashTag);
router.get('/name', getTwittsByPageName);
router.post('/', postTwitt);

module.exports = router;