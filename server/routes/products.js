const express = require('express');
const router = express.Router();

const {getAllProducts, addProduct, getProduct, updateProduct, deleteProduct} = require('../controllers/products');
const checkAuth = require('../middlewares/checkAuth');

router.get('/', getAllProducts);
router.get('/:productId', getProduct);
router.post('/', checkAuth, addProduct);
router.patch('/:productId', checkAuth, updateProduct);
router.delete('/:productId', checkAuth, deleteProduct);


module.exports = router;