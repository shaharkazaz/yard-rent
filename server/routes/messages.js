const express = require('express');
const router = express.Router();
const {
    getUserMessages,
    getUserNewMessages,
    updateIsOpened,
    updateIsArchived,
    updateReturnProcess
} = require('../controllers/messages');
const checkAuth = require('../middlewares/checkAuth');

router.get('/all/:userId', checkAuth(), getUserMessages);
router.get('/newMessages/:userId', checkAuth(), getUserNewMessages);
router.post('/updateIsOpened/:messageId', checkAuth(), updateIsOpened);
router.post('/updateIsArchived/:messageId', checkAuth(), updateIsArchived);
router.post('/updateReturnProcess', checkAuth(), updateReturnProcess);


module.exports = router;
