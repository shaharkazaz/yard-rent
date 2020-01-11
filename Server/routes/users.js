const express = require('express');
const router = express.Router();
const { signup } = require('../controllers/users')
//users /*
router.get('/', (req, res) => {
    res.status(200).json({
        message: 'get'
    })
});

router.post('/', signup);


router.patch('/:userId', (req, res) => {
    const articleId = req.params.userId
    res.status(200).json({
        message: 'get'
    })
});

module.exports = router;