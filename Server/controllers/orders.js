const mongoose = require('mongoose');
const Order = require('../model/order');
const User = require('../model/user');

module.exports = {
    getAllOrders: (req, res) => {
        Order.find({}).then((orders) => {
            res.status(200).json({
                orders: orders
            })
        }).catch((error) => {
            res.status(500).json({
                error
            })
        })
    },
    //TODO: cant trow res.status twice check for solution for problem with updating the user (if we want to notify the user and fail the request)
    addOrder: (req, res) => {
        const {email, product} = req.body;
        User.find({email}).then((users) => {
            if (users.length === 0) {
                //401 authorization failure
                return res.status(401).json({
                    message: 'user not found'
                })
            }
            const [user] = users;
            const order = new Order({
                _id: new mongoose.Types.ObjectId(),
                user: email,
                product
            });
            order.save().then(() => {
                res.status(200).json({
                    message: 'new order was added'
                })
            }).catch(error => {
                return res.status(500).json({
                    error
                })
            });
            User.findOneAndUpdate({_id: user._id}, {$push: {orderId: order._id}}).then(() => {
                console.log("user was updated")
            }).catch(error => {
                console.log(error)
            })
        });
    },
    getOrder: (req, res) => {
        const orderId = req.params.orderId;
        Order.findById(orderId).then((order) => {
            res.status(200).json({
                order: order
            })
        }).catch(error => {
            res.status(500).json({
                error
            })
        })
    },
    updateOrder: (req, res) => {
        const orderId = req.params.orderId;
        Order.update({_id: orderId}, req.body).then(() => {
            res.status(200).json({
                message: "order update"
            })
        }).catch(error => {
            res.status(500).json({
                error
            })
        })
    },
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
