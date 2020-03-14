const mongoose = require('mongoose');
const Order = require('../model/order');
const User = require('../model/user');
const getUserId = require('../utils/getUserId');

module.exports = {
    getAllOrders: (req, res) => {
        Order.find({},{_id:0}).populate('products',{_id:0,name:1,rewards:1,image:1}).then((orders) => {
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
        const { products, rewards } = req.body;
        const userId = await getUserId(req);

        User.findById(userId).then((user) => {
            const order = new Order({
                _id: new mongoose.Types.ObjectId(),
                user: user._id,
                products,
                rewards
            });
            order.save().then(() => {
                User.findOneAndUpdate({_id: user._id}, {$push: {orderId: order._id}}).then(() => {
                    res.status(200).json({
                        message: 'new order was added'
                    })
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
        }).catch(error => {
            return res.status(500).json({
                error
            })
        });
    },
    getOrder: (req, res) => {
        const orderId = req.params.orderId;
        Order.findById({orderId},{_id:0}).populate('products',{_id:0,name:1,rewards:1,image:1}).then((order) => {
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
        User.findById({userId},{_id:0}).populate('products',{_id:0,name:1,rewards:1,image:1}).then((order) => {
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
            Order.findById({_id:orderId},{_id:0}).populate('products',{_id:0,name:1,rewards:1,image:1}).then((order)=>{
                res.status(200).json({
                    order
                })
            }).catch(error=>{
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
