const express = require('express');
const router = express.Router();

const {getProducts, addProduct, getProduct, updateProduct, deleteProduct, releaseRentedProducts, releaseDeletedProducts,addProductDataSet,releaseRentedProductsByUSer} = require('../controllers/products');
const checkAuth = require('../middlewares/checkAuth');

router.get('/', getProducts);
router.get('/:productId', getProduct);
router.post('/', checkAuth(), addProduct);
router.patch('/:productId', checkAuth(), updateProduct);
router.post('/delete', checkAuth(), deleteProduct);
router.post('/returnProducts', checkAuth(), releaseRentedProductsByUSer);
// TODO remove
router.post('/_releaseRented', checkAuth(), releaseRentedProducts);
router.post('/_releaseDeleted', checkAuth(), releaseDeletedProducts);
router.post('/_addProduct', checkAuth(), addProductDataSet);


module.exports = router;
