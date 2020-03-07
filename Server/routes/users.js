const express = require('express');
const router = express.Router();

const {signup, login, getAllUsers} = require('../controllers/users');
const checkAuth = require('../middlewares/checkAuth');

router.get('/', checkAuth(), getAllUsers);
router.post('/login', login);
router.post('/signup', signup);

module.exports = router;
