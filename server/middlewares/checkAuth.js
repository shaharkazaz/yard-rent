const jwt = require('jsonwebtoken');
const { roles } = require('../utils/role');


const checkAuth = (role) => {
        // TODO:when changing the user role need to delete the token or relogin
    return [
        (req, res, next) => {
            const token = req.headers.authorization.split(' ')[1];
            jwt.verify(token, 'yard-rent', (err, decodedToken)=> {
                if (err) {
                    return res.status(401).json({
                        message: 'Auth failed'
                    })
                }
                if(role){
                    const userRole = decodedToken.role;
                    if (roles.indexOf(userRole) < roles.indexOf(role)) {
                        return res.status(401).json({ message: 'Unauthorized'});
                    }
                }
                next()
            });

        }
    ];
};

module.exports = checkAuth;