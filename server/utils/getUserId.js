const jwt = require('jsonwebtoken');

const getUserId = async (req) => {
    const token = req.headers.authorization.split(' ')[1];
    const decodedToken =  jwt.decode(token,'yard-rent');
    return decodedToken.id
};

module.exports = getUserId;
