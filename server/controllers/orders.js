const mongoose = require('mongoose');
const Order = require('../model/order');
const User = require('../model/user');
const Product = require('../model/product');
const getUserId = require('../utils/getUserId');
const {removeProductsFromDataSet} = require('../utils/updateDataSet');

module.exports = {
    getAllOrders: (req, res) => {
        Order.find({}, {_id: 0}).populate('products', {_id: 0, name: 1, rewards: 1, image: 1}).then((orders) => {
            res.status(200).json({
                orders
            })
        }).catch((error) => {
            res.status(500).json({
                error
            })
        })
    },
    addOrder: async (req, res) => {
        const {products, rewards} = req.body;
        const userId = await getUserId(req);
        let unfitProducts = {};
        await Product.find({_id: {$in: products}, isRented: true}, {name: 1}).then(async (alreadyRentedProducts) => {
            if (await alreadyRentedProducts.length > 0) {
                unfitProducts.rentedItems = alreadyRentedProducts;
            }
        });
        await Product.find({_id: {$in: products}, isDeleted: true}, {name: 1}).then(async (alreadyDeletedProducts) => {
            if (await alreadyDeletedProducts.length > 0) {
                unfitProducts.missingItems = alreadyDeletedProducts
            }
        });
        if (unfitProducts.rentedItems || unfitProducts.missingItems > 0) {
            return res.status(409).json(unfitProducts);
        }
        Product.updateMany({_id: {$in: products}}, {$set: {isRented: true}}).then(() => {
        });
        User.findById(userId).then((user) => {
            const orderId = new mongoose.Types.ObjectId();
            const order = new Order({
                _id: orderId,
                user: user._id,
                products,
                rewards
            });
            // Check if user has enough rewards
            if(rewards > user.rewards)
            {
                return res.status(500).json({message: "You do not have enough Rewards !"})
            }
            order.save().then(() => {
                User.findOneAndUpdate({_id: user._id}, {$push: {orderId: order._id}}).then(() => {
                    // Decrease the rewards from user amount
                    const rewardsAsNegative = (-1) * rewards;
                    User.findOneAndUpdate({_id: userId}, {$inc: {rewards: rewardsAsNegative}}).then(() => {
                        // Increase rewards to all products owners
                        for(let product of products)
                        {
                            Product.findById(product).then(product => {
                                let userIdToIncreaseRewards = product.user;
                                let rewardsAmount = product.rewards;
                                User.findOneAndUpdate({_id: userIdToIncreaseRewards},{$inc: {rewards: rewardsAmount}}).then(() => {
                                }).catch(error =>{
                                    return res.status(500).json({error})
                                });
                            }).catch(error => {
                                return res.status(500).json({error})
                            });
                        }
                    }).catch(error => {
                        return res.status(500).json({error})
                    })
                }).catch(error => {
                    return res.status(500).json({error})
                });
                res.status(200).json({orderId});
                removeProductsFromDataSet(products);
            }).catch(error => {
                return res.status(500).json({
                    error
                })
            })
        }).catch(error => {
            return res.status(500).json({
                error
            })
        });
    },
    getOrder: (req, res) => {
        const orderId = req.params.orderId;
        Order.findById({orderId}, {_id: 0}).populate('products', {
            _id: 0,
            name: 1,
            rewards: 1,
            image: 1
        }).then((order) => {
            res.status(200).json({
                order
            })
        }).catch(error => {
            res.status(500).json({
                error
            })
        })
    },
    getOrderByUserId: (req, res) => {
        const userId = req.params.userId;
        User.findById({userId}, {_id: 0}).populate('products', {
            _id: 0,
            name: 1,
            rewards: 1,
            image: 1
        }).then((order) => {
            res.status(200).json({
                order
            })
        }).catch(error => {
            res.status(500).json({
                error
            })
        })
    },
    // TODO: remove when finish do we need the option to update an order?
    updateOrder: (req, res) => {
        const orderId = req.params.orderId;
        Order.updateOne({_id: orderId}, req.body).then(() => {
            Order.findById({_id: orderId}, {_id: 0}).populate('products', {
                _id: 0,
                name: 1,
                rewards: 1,
                image: 1
            }).then((order) => {
                res.status(200).json({
                    order
                })
            }).catch(error => {
                res.status(500).json({
                    error
                })
            })
        }).catch(error => {
            res.status(500).json({
                error
            })
        })
    },
    // TODO: because we dont delete the orderID from the user need to be remove internal use for now we have pull func decide
    deleteOrder: (req, res) => {
        const orderId = req.params.orderId;
        Order.remove({_id: orderId}).then(() => {
            res.status(200).json({
                message: "the order was removed"
            })
        }).catch(error => {
            res.status(500).json({
                error
            })
        })
    }
};
