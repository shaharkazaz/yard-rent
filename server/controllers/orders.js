const mongoose = require('mongoose');
const Message = require('../model/message');
const Order = require('../model/order');
const User = require('../model/user');
const Product = require('../model/product');
const getUserId = require('../utils/getUserId');
const {removeProductsFromDataSet} = require('../utils/updateDataSet');
const cron = require('node-cron');

// fake messages
/*
cron.schedule('5 * * * * *', async () => {
    const testUser = "5e7f7758eb6b0a4ef05046f7";
    const messageId = new mongoose.Types.ObjectId();
    const message = new Message({
        _id: messageId,
        type: "test"
    });
    await message.save();
    User.findOneAndUpdate({_id: testUser}, {$push: {message: message._id}}).then((result) => {
        console.log(result);
    }).catch(error => {
        //TODO: error handling
    })
});
*/

// orderIsAboutToExpire24H cron job every day at 00:00
cron.schedule('0 0 0 * * *', async () => {
    const now = new Date();
    let flag = false;
    const oneDayInMilliseconds = 86400000;
    const orders = await Order.find({}).populate('user', {_id: 1}).populate({
        path: 'products',
        select: {isDeleted: 0},
        populate: [{path: 'user'}]
    });
    for (let order of orders) {
        if (order.returnDate && (order.returnDate - now > 0) && (order.returnDate - now < oneDayInMilliseconds)) ;
        {
            for (const product of order.products) {
                if (product.isRented === true) {
                    flag = true
                }
                if (flag && order.user != null) {
                    const messageId = new mongoose.Types.ObjectId();
                    const message = new Message({
                        _id: messageId,
                        order: order,
                        type: "orderIsAboutToExpire24H",
                        productToReturn: product,
                        productOwner: product.user,
                        productRenter: order.user
                    });
                    await message.save();
                    User.findOneAndUpdate({_id: order.user._id}, {$push: {message: message._id}}).then(() => {
                    }).catch(error => {
                        //TODO: error handling
                    })
                }
                flag = false;
            }
        }
    }
});

// orderIsAboutToExpire48H cron job every day at 00:00
cron.schedule('0 0 0 * * *', async () => {
    const now = new Date();
    let flag = false;
    const oneDayInMilliseconds = 86400000;
    const twoDaysInMilliseconds = 17800000;
    const orders = await Order.find({}).populate('user', {_id: 1}).populate({
        path: 'products',
        select: {isDeleted: 0},
        populate: [{path: 'user'}]
    });
    for (let order of orders) {
        if (order.returnDate && ((order.returnDate - now) < twoDaysInMilliseconds) && ((order.returnDate - now) > oneDayInMilliseconds)) {
            for (const product of order.products) {
                if (product.isRented === true) {
                    flag = true
                }
                if (flag && order.user != null) {
                    const messageId = new mongoose.Types.ObjectId();
                    const message = new Message({
                        _id: messageId,
                        order: order,
                        type: "orderIsAboutToExpire48H",
                        productToReturn: product,
                        productOwner: product.user,
                        productRenter: order.user
                    });
                    await message.save();
                    User.findOneAndUpdate({_id: order.user._id}, {$push: {message: message._id}}).then(() => {
                    }).catch(error => {
                        //TODO: error handling
                    })
                }
                flag = false;
            }
        }
    }
});

cron.schedule('* * * * *', async () => {
    const now = new Date();
    const fiveDayInMilliseconds = 432000000;
    const sixDaysInMiliseconds = 518400000;
    const orders = await Order.find({}).populate('user', {_id: 1}).populate('products', {isRented: 1});
    let shouldCharge = false;
    for (const order of orders) {
        if (order.returnDate) {
            if (now - order.returnDate > fiveDayInMilliseconds && now - order.returnDate < sixDaysInMiliseconds) {
                for (const product of order.products) {
                    if (product.isRented === true) {
                        shouldCharge = true
                    }
                }
            }
            if (shouldCharge) {
                //TODO: remove deposit or remove 10% of the product rewards
            }
        }

    }
});

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

        await Product.find({_id: {$in: products}}, {user: 1}).then(result => {
            result.forEach(id => {
                if (id._id.toString() === userId) {
                    return res.status(500).json({message: "You cant Rent your own products !"})
                }
            })
        }).catch(error => {
            return res.status(500).json({error})
        });

        await Product.updateMany({_id: {$in: products}}, {$set: {isRented: true}});
        await User.findById(userId).then(async (user) => {
            const orderId = new mongoose.Types.ObjectId();
            const now = new Date();
            const order = new Order({
                _id: orderId,
                user: user._id,
                products,
                rewards,
                returnDate: now
            });
            // Check if user has enough rewards
            if (rewards > user.rewards) {
                return res.status(500).json({message: "You do not have enough Rewards !"})
            }
            await order.save();
            await User.findOneAndUpdate({_id: user._id}, {$push: {orderId: order._id}}).then(async () => {
                // Decrease the rewards from user amount
                const rewardsAsNegative = (-1) * rewards;
                await User.findOneAndUpdate({_id: userId}, {$inc: {rewards: rewardsAsNegative}}).then(async () => {
                    // Increase rewards to all products owners
                    for (let product of products) {
                        await Product.findById(product).then(async product => {
                            let userIdToIncreaseRewards = product.user;
                            let rewardsAmount = product.rewards;
                            await User.findOneAndUpdate({_id: userIdToIncreaseRewards}, {$inc: {rewards: rewardsAmount}}).then(() => {
                            }).catch(error => {
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
            return res.status(500).json({error})
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
