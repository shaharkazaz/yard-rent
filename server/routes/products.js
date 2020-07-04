const express = require('express');
const router = express.Router();

const {getProducts, addProduct, getProduct, updateProduct, deleteProduct, releaseRentedProducts, releaseDeletedProducts,addProductDataSet,releaseRentedProductsByUSer,getIds} = require('../controllers/products');
const checkAuth = require('../middlewares/checkAuth');

router.post('/', addProduct);
router.get('/:productId', getProduct);
router.post('/all', checkAuth(), getProducts);
router.patch('/update/:productId', checkAuth(), updateProduct);
router.post('/delete', checkAuth(), deleteProduct);
router.post('/returnProducts', checkAuth(), releaseRentedProductsByUSer);
// TODO remove
router.post('/_releaseRented', checkAuth(), releaseRentedProducts);
router.post('/_releaseDeleted', checkAuth(), releaseDeletedProducts);
router.post('/_addProduct', checkAuth(), addProductDataSet);
router.post('/only', getIds);


module.exports = router;
