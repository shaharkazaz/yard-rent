const express = require('express');
const router = express.Router();

const {getAllProducts, addProduct, getProduct, updateProduct, deleteProduct} = require('../controllers/products');
const checkAuth = require('../middlewares/checkAuth');

router.get('/', getAllProducts);
router.get('/:orderId', getProduct);
router.post('/', checkAuth, addProduct);
router.patch('/:orderId', checkAuth, updateProduct);
router.delete('/:orderId', checkAuth, deleteProduct);


module.exports = router;