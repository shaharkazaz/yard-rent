const express = require('express');
const router = express.Router();
const {role} = require('../utils/role');

const {getAllOrders, addOrder, getOrder, updateOrder, deleteOrder} = require('../controllers/orders');
const checkAuth = require('../middlewares/checkAuth');

router.get('/', checkAuth(role.Admin), getAllOrders);
router.get('/:orderId', checkAuth(), getOrder);
router.post('/', checkAuth(), addOrder);
router.patch('/:orderId', checkAuth(role.Admin), updateOrder);
router.delete('/:orderId', checkAuth(role.Admin), deleteOrder);


module.exports = router;