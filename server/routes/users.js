const express = require('express');
const router = express.Router();

const {signup, login, getAllUsers, getUserByToken} = require('../controllers/users');
const checkAuth = require('../middlewares/checkAuth');

router.get('/getAll', checkAuth(), getAllUsers);
router.post('/login', login);
router.post('/signup', signup);
router.get('/getuser', getUserByToken);

module.exports = router;
