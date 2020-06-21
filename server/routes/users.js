const express = require('express');
const router = express.Router();

const {signup, login, getAllUsers, getUserByToken, getUserByNameEmailAddress, deleteUsers, getAllProductsOfUser, getAllOrdersOfUser,updateUser,getUserById,getUserFavorites,getUserMessages, getUserNewMessages, updateMessageStatus} = require('../controllers/users');
const checkAuth = require('../middlewares/checkAuth');

router.get('/getAll', checkAuth(), getAllUsers);
router.post('/login', login);
router.post('/signup', signup);
router.get('/getuser', getUserByToken);
router.get('/search', getUserByNameEmailAddress);
router.post('/delete', deleteUsers);
router.get('/productsList', checkAuth(), getAllProductsOfUser);
router.get('/ordersList', checkAuth(), getAllOrdersOfUser);
router.patch('/update/:userId', checkAuth(), updateUser);
router.get('/getUserById/:userId', checkAuth(), getUserById);
router.get('/messages/:userId', checkAuth(), getUserMessages);
router.get('/newMessages/:userId', checkAuth(), getUserNewMessages);
router.get('/updateMessageStatus/:messageId/:flag', checkAuth(), updateMessageStatus);
router.get('/getUserFavorites', checkAuth(), getUserFavorites);

module.exports = router;
