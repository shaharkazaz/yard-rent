const express = require('express');
const router = express.Router();
const checkAuth = require('../middlewares/checkAuth');
const { role } = require('../utils/role');
const { weeklyData, ordersPerCategory } = require('../controllers/statistics');

router.get('/weekly-data', checkAuth(role.Admin), weeklyData);
router.get('/orders-per-category', checkAuth(role.Admin), ordersPerCategory);


module.exports = router;
