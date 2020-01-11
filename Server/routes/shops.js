const express = require('express');
const router = express.Router();

const { getAllShops, addShop, getShop } = require('../controllers/shops');
//users /*
router.get('/', getAllShops);
router.post('/', addShop);
router.get('/:shopId', getShop);



module.exports = router;