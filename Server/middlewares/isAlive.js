const jwt = require('jsonwebtoken');

const isAlive = (req, res) => {
    try{
        const token = req.headers.authorization.split(' ')[1];
        jwt.verify(token, 'yard-rent');
        res.status(200).json({
            message:  'Token Is Valid'
        })
    } catch (error) {
        res.status(401).json({
            message: 'Auth failed'
        })
    }
};

module.exports = isAlive;