const express = require('express');
const router = express.Router();
const checkAuth = require('../middlewares/checkAuth');


const { getTwittsByHashTag, getTwittsByPageName, postTwitt } = require('../controllers/twitter');

router.get('/hashtag', getTwittsByHashTag);
router.get('/name', getTwittsByPageName);
router.post('/', checkAuth() ,postTwitt);

module.exports = router;