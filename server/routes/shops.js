const express = require('express');
const router = express.Router();

const { getAllShops, addShop, getShop, updateShop, deleteShop } = require('../controllers/shops');
const checkAuth = require('../middlewares/checkAuth');

router.get('/', getAllShops);
router.get('/:shopId', getShop);
router.post('/', checkAuth, addShop);
router.patch('/:shopId', checkAuth, updateShop);
router.delete('/:shopId', checkAuth, deleteShop);


module.exports = router;