const express = require('express');
const router = express.Router();
const { role } = require('../utils/role');

const { getAllShops, addShop, getShop, updateShop, deleteShop } = require('../controllers/shops');
const checkAuth = require('../middlewares/checkAuth');

router.get('/', getAllShops);
router.get('/:shopId', getShop);
router.post('/addShop', checkAuth(role.Admin), addShop);
router.patch('/:shopId', checkAuth(role.Admin), updateShop);
router.delete('/:shopId', checkAuth(role.Admin), deleteShop);


module.exports = router;