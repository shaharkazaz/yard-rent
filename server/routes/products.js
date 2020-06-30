const express = require('express');
const router = express.Router();

const {getProducts, addProduct, getProduct, updateProduct, deleteProduct, releaseRentedProducts, releaseDeletedProducts,addProductDataSet,releaseRentedProductsByUser,getIds,addToFavorites,removeFromFavorites} = require('../controllers/products');
const checkAuth = require('../middlewares/checkAuth');

router.post('/get', getProducts);
router.get('/:productId', getProduct);
router.post('/', checkAuth(), addProduct);
router.patch('/update/:productId', checkAuth(), updateProduct);
router.post('/delete', checkAuth(), deleteProduct);
router.post('/returnProducts', checkAuth(), releaseRentedProductsByUser);
router.post('/addToFavorites', checkAuth(), addToFavorites);
router.post('/removeFromFavorites', checkAuth(), removeFromFavorites);
// TODO remove
router.post('/_releaseRented', checkAuth(), releaseRentedProducts);
router.post('/_releaseDeleted', checkAuth(), releaseDeletedProducts);
router.post('/_addProduct', checkAuth(), addProductDataSet);
router.post('/only', getIds);


module.exports = router;
