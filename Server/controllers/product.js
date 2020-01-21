const mongoose = require('mongoose');
const Product = require('../model/product');
const User = require('../model/user');

module.exports = {
    getAllProducts: (req, res) => {
        Product.find({}).then((products) => {
            res.status(200).json({
                products: products
            })
        }).catch((error) => {
            res.status(500).json({
                error
            })
        })
    },
    //TODO: cant trow res.status twice check for solution for problem with updating the user (if we want to notify the user and fail the request)
    addProduct: (req, res) => {
        const {name, email, category, subCategory, reward, address, deposit, durationInDays} = req.body;
        User.find({email}).then((users) => {
            if (users.length === 0) {
                //401 authorization failure
                return res.status(401).json({
                    message: 'user not found'
                })
            }
            const [user] = users;
            const product = new Product({
                _id: new mongoose.Types.ObjectId(),
                name,
                user: email,
                category,
                subCategory,
                reward,
                address, //check it address is empty put user.address
                deposit,
                durationInDays
            });
            product.save().then(() => {
                res.status(200).json({
                    message: 'new product was added'
                })
            }).catch(error => {
                return res.status(500).json({
                    error
                })
            });
            User.findOneAndUpdate({_id: user._id}, {$push: {productId: product._id}}).then(() => {
                console.log("user was updated")
            }).catch(error => {
                console.log(error)
            })
        });
    },
    getProduct: (req, res) => {
        const productId = req.params.productId;
        Product.findById(productId).then((product) => {
            res.status(200).json({
                product: product
            })
        }).catch(error => {
            res.status(500).json({
                error
            })
        })
    },
    updateProduct: (req, res) => {
        const productId = req.params.productId;
        Product.update({_id: productId}, req.body).then(() => {
            res.status(200).json({
                message: "product update"
            })
        }).catch(error => {
            res.status(500).json({
                error
            })
        })
    },
    deleteProduct: (req, res) => {
        const productId = req.params.productId;
        Product.remove({_id: productId}).then(() => {
            res.status(200).json({
                message: "the product was removed"
            })
        }).catch(error => {
            res.status(500).json({
                error
            })
        })
    }
};
