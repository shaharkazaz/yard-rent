const express = require('express');
const router = express.Router();

const {getAllProducts, addProduct, getProduct, updateProduct, deleteProduct, getProductByQuery, releaseRentedProducts, releaseDeletedProducts} = require('../controllers/products');
const checkAuth = require('../middlewares/checkAuth');

router.get('/', getAllProducts);
router.get('/search', getProductByQuery);
router.get('/:productId', getProduct);
router.post('/', checkAuth(), addProduct);
router.patch('/:productId', checkAuth(), updateProduct);
router.post('/delete', checkAuth(), deleteProduct);
// TODO remove
router.post('/_releaseRented', checkAuth(), releaseRentedProducts);
router.post('/_releaseDeleted', checkAuth(), releaseDeletedProducts);


module.exports = router;
