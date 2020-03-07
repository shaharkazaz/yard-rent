const express = require('express');
const router = express.Router();

const {getAllOrders, addOrder, getOrder, updateOrder, deleteOrder} = require('../controllers/orders');
const checkAuth = require('../middlewares/checkAuth');

router.get('/', getAllOrders);
router.get('/:orderId', getOrder);
router.post('/', checkAuth(), addOrder);
router.patch('/:orderId', checkAuth(), updateOrder);
router.delete('/:orderId', checkAuth(), deleteOrder);


module.exports = router;