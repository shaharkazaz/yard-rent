const express = require('express');
const router = express.Router();
const checkAuth = require('../middlewares/checkAuth');
const { role } = require('../utils/role');
const { weeklyData, ordersPerCategory } = require('../controllers/statistics')

router.get('/graph-1', checkAuth(role.Admin), weeklyData);
router.get('/graph-2', checkAuth(role.Admin), ordersPerCategory);


module.exports = router;
