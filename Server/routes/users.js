const express = require('express');
const router = express.Router();

const { signup, login } = require('../controllers/users')
//users /*
//router.get('/', getAllUsers);
router.post('/login', login);
router.post('/signup', signup);
// router.patch('/:shopId', updateShop);
// router.delete('/:shopId', deleteShop);

module.exports = router;
