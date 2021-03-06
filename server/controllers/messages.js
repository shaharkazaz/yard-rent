const mongoose = require('mongoose');
const Message = require('../model/message');
const User = require('../model/user');
const {sendDeclineMail} = require('../utils/mailer');
const Products = require('../model/product');


module.exports = {
    getUserMessages: (req, res) => {
        const userId = req.params.userId;
        User.findOne({_id: userId, isDeleted: false}, {_id: 0, message: 1}).populate(
            {
                path: 'message',
                options: {sort: {'date': -1}},
                populate: [
                    {path: 'linkedMessages'},
                    {path: 'productOwner', select: {name: 1, email: 1, phone: 1}},
                    {path: 'productRenter', select: {name: 1, email: 1, phone: 1}},
                    {path: 'order', select: {_id: 1, date: 1, returnDate: 1}},
                    {
                        path: 'productToReturn',
                        select: {_id: 1, name: 1, orderDate: 1, orderReturnDate: 1, address: 1, image: 1}
                    }
                ]
            }
        ).then((user) => {
            res.status(200).json(user.message)
        }).catch((error) => {
            res.status(500).json({
                error
            })
        })
    },
    getUserNewMessages: (req, res) => {
        const userId = req.params.userId;
        User.findOne({_id: userId, isDeleted: false}).sort({date: 'desc'}).populate(
            {
                path: 'message',
                match: {isOpened: false, isArchived: false},
                populate: [
                    {path: 'linkedMessages'},
                    {path: 'productOwner', select: {name: 1, email: 1, phone: 1}},
                    {path: 'productRenter', select: {name: 1, email: 1, phone: 1}},
                    {path: 'order', select: {_id: 1, date: 1, returnDate: 1}},
                    {
                        path: 'productToReturn',
                        select: {_id: 1, name: 1, orderDate: 1, orderReturnDate: 1, address: 1, image: 1}
                    }
                ]
            }).then((user) => {
            res.status(200).json(user.message)
        }).catch((error) => {
            res.status(500).json({
                error
            })
        })
    },
    updateIsOpened: (req, res) => {
        const {isOpened} = req.body;
        Message.findByIdAndUpdate({_id: req.params.messageId}, {$set: {isOpened: isOpened}}).then((user) => {
            res.status(200).json(user.message)
        }).catch((error) => {
            res.status(500).json({
                error
            })
        })
    },
    updateIsArchived: (req, res) => {
        const {isArchived} = req.body;
        Message.findByIdAndUpdate({_id: req.params.messageId}, {$set: {isArchived: isArchived}}).then((user) => {
            res.status(200).json(user.message)
        }).catch((error) => {
            res.status(500).json({
                error
            })
        })
    },
    updateReturnProcess: async (req, res) => {
        const {message, product, isApproved} = req.body;
        const productId = mongoose.Types.ObjectId(product);
        const messageId = mongoose.Types.ObjectId(message);

        Products.findOne({_id: productId}).then(data => {
            if (data.isRented && data.isInReturnProcess) {
                Message.findOneAndUpdate({_id: messageId}, {$set: {isApproved: isApproved}}).then(() => {
                    if (isApproved) {
                        // Release product back to marketplace
                        Products.findOneAndUpdate({_id: productId}, {
                            $set: {
                                isRented: false,
                                isInReturnProcess: false,
                                order: null,
                                orderDate: null,
                                orderReturnDate: null,
                            }
                        }).then(async () => {
                                const message = await Message.findById({_id: messageId}).populate({path: 'linkedMessages'}).populate({
                                    path: 'productOwner',
                                    select: {name: 1, email: 1, phone: 1}
                                }).populate({
                                    path: 'productRenter',
                                    select: {name: 1, email: 1, phone: 1}
                                }).populate({path: 'order', select: {_id: 1, date: 1, returnDate: 1}}).populate({
                                    path: 'productToReturn',
                                    select: {
                                        _id: 1,
                                        name: 1,
                                        orderDate: 1,
                                        orderReturnDate: 1,
                                        address: 1,
                                        image: 1
                                    }
                                });
                                res.status(200).json(message)
                            }
                        ).catch((error) => {
                            res.status(500).json({
                                error
                            })
                        })
                    } else {
                        // Message both renter and owner about return process
                        Products.findOne({_id: productId}).populate({
                            path: 'user'
                        }).populate({
                            path: 'order',
                            populate: [{path: 'user'}]
                        }).then(async product => {
                            // Message to product owner in order YardRent support will contact product renter to solve or settle down
                            const messageToProductOwnerId = new mongoose.Types.ObjectId();
                            const messageToProductOwner = new Message({
                                _id: messageToProductOwnerId,
                                type: "InformProductOwner",
                                productToReturn: product.id,
                                productOwner: product.user,
                                productRenter: product.order.user,
                            });
                            await messageToProductOwner.save();
                            // push to linkedMessages - should we push as well to user messages or leave reference in linkedMessages
                            Message.findOneAndUpdate({_id: messageId}, {$push: {linkedMessages: messageToProductOwnerId}}).then(async () => {
                                const message = await Message.findById({_id: messageId}).populate({path: 'linkedMessages'}).populate({
                                    path: 'productOwner',
                                    select: {name: 1, email: 1, phone: 1}
                                }).populate({
                                    path: 'productRenter',
                                    select: {name: 1, email: 1, phone: 1}
                                }).populate({path: 'order', select: {_id: 1, date: 1, returnDate: 1}}).populate({
                                    path: 'productToReturn',
                                    select: {
                                        _id: 1,
                                        name: 1,
                                        orderDate: 1,
                                        orderReturnDate: 1,
                                        address: 1,
                                        image: 1
                                    }
                                });
                                res.status(200).json(message);
                            }).catch(error => {
                                return res.status(500).json({error})
                            });
                            await sendDeclineMail(product.order.user.email, product.name, product.rewards, product.user.name, product.orderDate);
                        }).catch(error => {
                            return res.status(500).json(error)
                        })
                    }
                }).catch(error => {
                    res.status(500).json({
                        error
                    })
                })
            } else {
                res.status(500).json("Something went wrong")
            }
        }).catch(error => {
            res.status(500).json(error)
        })

    }
};
