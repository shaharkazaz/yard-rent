const express = require('express');
const router = express.Router();
const checkAuth = require('../middlewares/checkAuth');
const { role } = require('../utils/role');
const { graph1, graph2 } = require('../controllers/statistics')

router.get('/graph-1', checkAuth(role.Admin), graph1);
router.get('/graph-2', checkAuth(role.Admin), graph2);


module.exports = router;
