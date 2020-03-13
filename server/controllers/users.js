const User = require('../model/user');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const mongoose = require('mongoose');

function getToken({_id, email, role}) {
    return jwt.sign({
            id: _id,
            email: email,
            role: role // when changing the user role need to delete the token or relogin
        },'yard-rent',
        {
            expiresIn: "24H"
        });
}

module.exports={
    signup: (req, res) => {
        const { name, email, password, address } = req.body;
        User.find({ email }).then((users) => {
            if(users.length >= 1){
                return res.status(200).json({
                    success: false,
                    message: 'Email already exists'
                })
            }
            bcrypt.hash(password, 10, (error, hash)=>{
                if(error){
                    return res.status(500).json({
                        success: false,
                        message: error
                    })
                }
                const user = new User({
                    _id: new mongoose.Types.ObjectId(),
                    name,
                    email,
                    password: hash,
                    address,
                    role: 'user',
                    rewards :0
                });

                user.save().then(() => {
                       res.status(200).json({
                           success: true,
                           message: 'User created',
                           user,
                           token: getToken(user)
                       });
                }).catch(error => {
                    res.status(500).json({
                        success: false,
                        message: error
                    })
                })
            });
        });
    },
    login: (req, res) =>{
        const { email, password } = req.body;
        User.find({ email }).then((users) => {
            if(users.length === 0){
                return res.status(200).json({
                    success: false,
                    message: 'Username or password are incorrect'
                });
            }
            const [ user ] = users;
            bcrypt.compare(password, user.password, (error, result) =>{
                if(error){
                    return res.status(401).json({
                        success: false,
                        message: 'Username or password are incorrect'
                    })
                }

                if(result){
                    return res.status(200).json({
                        success: true,
                        user,
                        token: getToken(user)
                    })
                }
                return res.status(401).json({
                    message: 'Internal error, try again'
                })
            })
        })

    },
    getAllUsers:(req, res) => {
        User.find({}).populate('orderId').then((users) => {
            res.status(200).json(users)
        }).catch((error) => {
            res.status(500).json({
                error
            })
        })
    },
    getUserByToken: (req, res) => {
        const token = req.headers.authorization.split(' ')[1];
        jwt.verify(token, 'yard-rent', (err, decodedToken) => {
            if (err) {
                return res.status(401).json({
                    message: 'Unauthenticated'
                })
            }
            const userId = decodedToken.id;
            User.findOne({_id: userId }).then(user => {
                res.status(200).json(user);
            }).catch((error) => {
                res.status(500).json({
                    error
                })
            })

        });
    },
    getUserByNameEmailAddress: (req,res)=>{
        const { name, email, address } = req.body;
        User.aggregate([
            { $match: {
                    name: { "$regex": name, "$options": "i" }}
            },
            { $match: {
                    email: { "$regex": email, "$options": "i" }}
            },
            { $match: {
                    address: { "$regex": address, "$options": "i" }}
            },
        ]).then(users => {
            res.status(200).json({
                users
            })
        }).catch(error => {
            return res.status(500).json({
                error
            })
        })
    }
};
