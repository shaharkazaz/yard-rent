const express = require('express');
const router = express.Router();
const {
    signup, login, getAllUsers,
    getUserByToken, getUserByNameEmailAddress,
    deleteUsers, getAllProductsOfUser, getAllOrdersOfUser,
    updateUser, getUserById, getUserFavorites, sendEmailVerification, verifyCode,getAllRentedProductsOfUser
} = require('../controllers/users');
const checkAuth = require('../middlewares/checkAuth');

router.get('/getAll', checkAuth(), getAllUsers);
router.post('/sendVerification', sendEmailVerification);
router.post('/verifyCode', verifyCode);
router.post('/login', login);
router.post('/signup', signup);
router.get('/getuser', getUserByToken);
router.get('/search', getUserByNameEmailAddress);
router.post('/delete', deleteUsers);
router.get('/productsList', checkAuth(), getAllProductsOfUser);
router.get('/rentedProductsList', checkAuth(), getAllRentedProductsOfUser);
router.get('/ordersList', checkAuth(), getAllOrdersOfUser);
router.patch('/update/:userId', checkAuth(), updateUser);
router.get('/getUserById/:userId', checkAuth(), getUserById);
router.get('/getUserFavorites', checkAuth(), getUserFavorites);

module.exports = router;
