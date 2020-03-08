const express = require('express');
const router = express.Router();
const checkAuth = require('../middlewares/checkAuth');
const { role } = require('../utils/role');
const { graf1, graf2 } = require('../controllers/statistics')


router.get('/graf1', checkAuth(role.Admin), graf1);
router.get('/graf2', checkAuth(role.Admin), graf2);


module.exports = router;
