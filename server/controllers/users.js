const User = require('../model/user');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const mongoose = require('mongoose');

module.exports={
    signup: (req, res) => {
        const { name, email, password, address } = req.body;
        User.find({ email }).then((users) => {
            if(users.length >= 1){
                return res.status(409).json({
                    message: 'Email already exists'
                })
            }
            bcrypt.hash(password, 10, (error, hash)=>{
                if(error){
                    return res.status(500).json({
                        error
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

                user.save().then(()=>{
                    res.status(200).json({
                        message: 'Users Created'
                    });
                }).catch(error => {
                    res.status(500).json({
                        error
                    })
                })
            });
        });
    },
    login: (req, res) =>{
        const { email, password } = req.body;

        User.find({ email }).then((users) => {
            if(users.length === 0){
                //401 authorization failure
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
                    const token = jwt.sign({
                        id: user._id,
                        email: user.email,
                        role: user.role // when changing the user role need to delete the token or relogin
                    },'yard-rent',
                        {
                            expiresIn: "24H"
                        });
                    return res.status(200).json({
                        success: true,
                        user,
                        token
                    })
                }
                return res.status(401).json({
                    message: 'Internal error, try again'
                })
            })
        })

    },
    getAllUsers:(req, res) => {
        //User.find({}).populate('orderId','date').then((users) => { #it will show only the date
        User.find({}).populate('orderId').then((users) => {
            res.status(200).json({
                users
            })
        }).catch((error) => {
            res.status(500).json({
                error
            })
        })
    }
};
