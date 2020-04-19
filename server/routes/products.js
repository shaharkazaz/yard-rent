const express = require('express');
const router = express.Router();

const {getAllProducts, addProduct, getProduct, updateProduct, deleteProduct, getProductByQuery, releaseProducts} = require('../controllers/products');
const checkAuth = require('../middlewares/checkAuth');

router.get('/', getAllProducts);
router.get('/search', getProductByQuery);
router.get('/:productId', getProduct);
router.post('/', checkAuth(), addProduct);
router.patch('/:productId', checkAuth(), updateProduct);
router.post('/delete', checkAuth(), deleteProduct);
router.post('/release', checkAuth(), releaseProducts)


module.exports = router;