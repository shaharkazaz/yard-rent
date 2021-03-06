const {clearDataSet} = require('../utils/updateDataSet');
const Message = require('../model/message');
const User = require('../model/user');
const Verification = require('../model/verification');
const Products = require('../model/product');
const Order = require('../model/order');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const mongoose = require('mongoose');
const getUserId = require('../utils/getUserId');
const uploadToGCP = require('../utils/uploadToGCP');
const getCoordinatesByAddress = require('../utils/gpsApi');
const {sendMail} = require( '../utils/mailer');

function getToken({_id, role}) {
    return jwt.sign({
            id: _id,
            role: role // when changing the user role need to delete the token or relogin
        }, 'yard-rent',
        {
            expiresIn: "24H"
        });
}

module.exports = {
    signup: (req, res) => {
        const {name, email, password, address, phone} = req.body;
        User.find({email}).then(async (users) => {
            if (users.length >= 1) {
                return res.status(200).json({
                    success: false,
                    message: 'Email already exists'
                })
            }
            const splittedAddress = address.split(",").map(item => item.trim());
            const street = splittedAddress[0];
            const city = splittedAddress[1];
            const country = splittedAddress[2];
            const coordinates = await getCoordinatesByAddress(street, city, country);
            if(!coordinates) {
                return res.status(500).json({
                    success: false,
                    message: 'Please Enter Vaild Address'
                })
            }
            const newAddress = {
                street,
                city,
                country,
                coordinates
            };

            bcrypt.hash(password, 10, (error, hash) => {
                if (error) {
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
                    address: newAddress,
                    role: 'user',
                    rewards: 200,
                    phone
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
    login: (req, res) => {
        const {email, password} = req.body;
        User.find({email: email}).then((users) => {
            if (users.length === 0) {
                return res.status(200).json({
                    success: false,
                    message: 'Username or password are incorrect'
                });
            }
            const [user] = users;
            bcrypt.compare(password, user.password, (error, result) => {
                if (error) {
                    return res.status(401).json({
                        success: false,
                        message: 'Username or password are incorrect'
                    })
                }

                if (result) {
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
    getAllUsers: (req, res) => {
        User.find({isDeleted: false}).populate('orderId').then((users) => {
            res.status(200).json(users)
        }).catch((error) => {
            res.status(500).json({
                error
            })
        })
    },
    getUserById: (req, res) => {
        const userId = req.params.userId;
        User.findOne({_id:userId,isDeleted: false}, {product:0,orderId:0,isDeleted:0,password:0,role:0,rewards:0}).then((user) => {
            res.status(200).json(user)
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
            User.findOne({_id: userId}).then(user => {
                res.status(200).json(user);
            }).catch((error) => {
                res.status(500).json({
                    error
                })
            })

        });
    },
    deleteUsers: (req, res) => {
        const {users} = req.body;
        const objectIdUsers = users.map(user => mongoose.Types.ObjectId(user));
        User.updateMany({_id: {$in: objectIdUsers}}, {$set: {isDeleted: true}}).then(() => {
            User.find({_id: {$in: objectIdUsers}}, {product: 1, _id: 0}).then((products) => {
                Products.updateMany({_id: {$in: products[0]._doc.product}}, {$set: {isDeleted: true}}).then(() => {
                    res.status(200).json();
                    clearDataSet();
                }).catch(error => {
                    res.status(500).json({
                        error
                    })
                })
            })
        }).catch(error => {
            res.status(500).json(error)
        })
    },
    //TODO: need to check if the user isDeleted
    getAllProductsOfUser: async (req, res) => {
        const userId = await getUserId(req);
        User.findById({_id: userId}, {_id: 0, product: 1}).populate({
            path: 'product', match: {isDeleted: false}, select: {
                isDeleted: 0
            }, populate: [{path: 'user', select: {name: 1, _id: 0}}, {
                path: 'category', select: {
                    name: 1,
                    _id: 0
                }
            }, {path: 'subCategory', select: {name: 1, _id: 0}}]
        }).then((product) => {
            res.status(200).json(product ? product.product : []);
        }).catch(error => {
            res.status(500).json(error)
        })
    },
    getAllRentedProductsOfUser: async (req, res) => {
        const userId = await getUserId(req);
        const pipeline = [
            {
                "$unwind": "$products"
            },
            {
                "$match": {
                    "user": mongoose.Types.ObjectId(userId)
                }
            },
            {
                "$project": {
                    "products": 1 , "_id": 0
                }
            }
        ];
        let productIDs = [];

        Order.aggregate(pipeline)
        .then((products) => {
            products.forEach(product => {
                productIDs.push(product.products)
            });
            Products.find({_id: {$in: productIDs}, isRented: true}, {isDeleted: 0}).populate({
                path: 'category', select: {
                    name: 1,
                    _id: 0
                }}).populate({
                path: 'subCategory', select: {name: 1, _id: 0}
            }).populate({
                path: 'user', select: {name: 1, _id: 0}
            }).then(result => {
                let myRentedProducts = [];
                for (let idx in result) myRentedProducts.push({
                    'isInReturnProcess': result[idx].isInReturnProcess,
                    'name': result[idx].name,
                    '_id': result[idx]._id,
                    'image': result[idx].image,
                    'orderReturnDate': result[idx].orderReturnDate,
                    'owner': result[idx].user.name,
                    'description': result[idx].description
                });
                res.status(200).json(myRentedProducts);
                productIDs = []
            }).catch(error => {
                res.status(500).json(error)
            })
        }).catch(error => {
            res.status(500).json(error)
        })
    },
    //TODO: need to check if the user isDeleted
    getUserByNameEmailAddress: (req, res) => {
        let {name, email, address} = req.body;
        if (typeof name === 'undefined'){
            name = "";
        }
        if (typeof email === 'undefined'){
            email = "";
        }
        if (typeof address === 'undefined'){
            address = "";
        }
        User.aggregate([
            {
                $match: {
                    name: {"$regex": name, "$options": "i"}
                }
            },
            {
                $match: {
                    email: {"$regex": email, "$options": "i"}
                }
            },
            {
                $match: {
                    address: {"$regex": address, "$options": "i"}
                }
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
    },
    getAllOrdersOfUser: async (req, res) => {
        const userId = await getUserId(req);
        User.findById({_id:userId}).populate('orderId', {
                _id: 1,
                date: 1,
                products: 1,
                rewards: 1
        }
        ).then((orders) => {
            let newOrders = [];
            for (let idx in orders.orderId) newOrders.push({
                'date': orders.orderId[idx].date,
                'products': orders.orderId[idx].products.length,
                '_id': orders.orderId[idx]._id,
                'user': orders.orderId[idx].user,
                'rewards': orders.orderId[idx].rewards
            });
            res.status(200).json(newOrders ? newOrders : [])
        }).catch(error => {
            res.status(500).json({
                error
            })
        })
    },
    updateUser: async (req, res) => {
        const userId = req.params.userId;
        const uploadedImage = await uploadToGCP(req, res);
        const newUser = req.body;
        const { address } = req.body;
        if(address){
            const splittedAddress = address.split(",").map(item => item.trim());
            const street = splittedAddress[0];
            const city = splittedAddress[1];
            const country = splittedAddress[2];
            const coordinates = await getCoordinatesByAddress(street, city, country);
            if(!coordinates) {
                return res.status(500).json({
                    success: false,
                    message: 'Please Enter Vaild Address'
                })
            }
            const newAddress = {
                street,
                city,
                country,
                coordinates
            };
            newUser.address = newAddress
        }
        if (uploadedImage){
            newUser.image = uploadedImage
        }
        User.updateOne({_id: userId}, newUser).then(() => {
            User.findById({_id: userId}, {isDeleted:0,password:0}).then(async (user)=>{
                await Products.updateMany({_id: {$in: user.product}},{$set:{address: newUser.address}})
                res.status(200).json(user);
                })
        }).catch((error) => {
            res.status(500).json({
                error
            })
        })
    },
    getUserFavorites: async (req, res) => {
        const userId = await getUserId(req);
        User.findById({_id:userId},{favorites:1}).populate({
            path: 'favorites', match: {isDeleted: false}, select: {
                isDeleted: 0
            }, populate: [{path: 'user', select: {name: 1, _id: 0}}, {
                path: 'category', select: {
                    name: 1,
                    _id: 0
                }
            }, {path: 'subCategory', select: {name: 1, _id: 0}}]
        }).then((favorites)=>{
            res.status(200).json(favorites ? favorites.favorites : []);
        }).catch((error) => {
            res.status(500).json({
                error
            })
        })
    },
    sendEmailVerification: async (req, res) => {
        const { email } = req.body;
        const code = Math.floor(100000 + Math.random() * 900000);

        const verification = new Verification({
            _id: new mongoose.Types.ObjectId(),
            email,
            code
        });
        verification.save();
        try {
            await sendMail(email, code);
            res.status(200).json(verification._id)
        } catch (e) {
	    console.log(e)
            return res.status(500).json({error:e})
        }

    },
    verifyCode: async (req, res) => {
        const { code, id } = req.body;
        try {
           const verificationObj = await Verification.findOne({_id:id});
           if(verificationObj && parseInt(code) === verificationObj.code){
               res.status(200).json()
           }
           else {
               res.status(500).json({error: 'code is not valid'})
           }
        } catch (e) {
            return res.status(500).json({error:e})
        }

    }
};
