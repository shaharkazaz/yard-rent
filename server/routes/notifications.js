const express = require('express');
const router = express.Router();

const { getOrderNotifications } = require('../controllers/notifications');
const checkAuth = require('../middlewares/checkAuth');

router.get('/getOrderNotifications', checkAuth(), getOrderNotifications);


module.exports = router;
