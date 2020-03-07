const express = require('express');
const router = express.Router();

const {signup, login, getAllUsers, getUserByToken} = require('../controllers/users');
const checkAuth = require('../middlewares/checkAuth');

router.get('/', checkAuth(), getAllUsers);
router.post('/login', login);
router.post('/signup', signup);
router.post('/getuser', getUserByToken);

module.exports = router;
