const jwt = require('jsonwebtoken');

const checkAuth = (req, res, next) => {
    try{
        // when changing the user role need to delete the token or relogin
        const token = req.headers.authorization.split(' ')[1];
        jwt.verify(token, 'yard-rent', (err, decodedToken)=>{
            if(err){
                res.status(401).json({
                    message: 'Auth failed'
                })
            }
            else{
                let role = decodedToken.role
                next()

            }
        });
    } catch (error) {
        res.status(401).json({
            message: 'Auth failed'
        })
    }
};

module.exports = checkAuth;