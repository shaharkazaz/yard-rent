const express = require('express');
const router = express.Router();

const {signup, login, getAllUsers, getUserByToken, getUserByNameEmailAddress, deleteUsers, getAllProductsOfUser} = require('../controllers/users');
const checkAuth = require('../middlewares/checkAuth');

router.get('/getAll', checkAuth(), getAllUsers);
router.post('/login', login);
router.post('/signup', signup);
router.get('/getuser', getUserByToken);
router.get('/search', getUserByNameEmailAddress);
router.post('/delete', deleteUsers);
router.get('/productsList', checkAuth(), getAllProductsOfUser);

module.exports = router;
