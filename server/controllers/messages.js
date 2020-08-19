const mongoose = require('mongoose');
const Message = require('../model/message');
const User = require('../model/user');
const Order = require('../model/order');
const Products = require('../model/product');



module.exports = {
    getUserMessages: (req, res) => {
        // TODO: populate Order - Id, Date, return Date
        // TODO: populate User - email,name, phone
        const userId = req.params.userId;
        User.findOne({_id:userId,isDeleted: false}, {_id: 0, message: 1}).populate(
            {
                path: 'message',
                options: { sort: { 'date': -1 } },
                populate: [
                    {path: 'productOwner', select: {name: 1, email: 1, phone: 1}},
                    {path: 'productRenter', select: {name: 1, email: 1, phone: 1}},
                    {path: 'order', select: {_id: 1, date: 1, returnDate: 1}},
                    {path: 'productToReturn', select: {_id: 1, name: 1, orderDate: 1, orderReturnDate: 1, address: 1,image: 1 }}
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
        User.findOne({_id:userId,isDeleted: false}).sort({date: 'desc'}).populate(
            {
                path:'message',
                match: { isOpened: false, isArchived: false },
                populate: [
                    {path: 'productOwner', select: {name: 1, email: 1, phone: 1}},
                    {path: 'productRenter', select: {name: 1, email: 1, phone: 1}},
                    {path: 'order', select: {_id: 1, date: 1, returnDate: 1}},
                    {path: 'productToReturn', select: {_id: 1, name: 1, orderDate: 1, orderReturnDate: 1, address: 1,image: 1 }}
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
        const { isOpened } = req.body;
        Message.findByIdAndUpdate({_id: req.params.messageId}, { $set: { isOpened : isOpened }}).then((user) => {
            res.status(200).json(user.message)
        }).catch((error) => {
            res.status(500).json({
                error
            })
        })
    },
    updateIsArchived: (req, res) => {
        const { isArchived } = req.body;
        Message.findByIdAndUpdate({_id: req.params.messageId}, { $set: { isArchived : isArchived }}).then((user) => {
            res.status(200).json(user.message)
        }).catch((error) => {
            res.status(500).json({
                error
            })
        })
    },
    updateReturnProcess: async (req, res) => {
        const {message, product, isApproved} = req.body;
        const productId = mongoose.Types.ObjectId(product)
        const messageId = mongoose.Types.ObjectId(message)

        Products.findOne({_id: productId}).then(data => {
            if(data.isRented && data.isInReturnProcess)
            {
                Message.findOneAndUpdate({_id: messageId}, {$set: {isApproved: isApproved}}).then(() => {
                    if (isApproved)
                    {
                        // Release product back to marketplace
                        Products.findOneAndUpdate({_id: productId}, {
                            $set: {
                                isRented: false,
                                isInReturnProcess: false,
                                order: null,
                                orderDate: null,
                                orderReturnDate: null,
                            }
                        }).then(
                            res.status(200).json())
                            .catch((error) => {
                                res.status(500).json({
                                    error
                                })
                            })
                    }
                    else
                    {
                        // Message both renter and owner about return process
                        Products.findOne({_id: productId}).populate({
                            path: 'user'
                        }).populate({
                            path: 'order',
                            populate: [{path: 'user'}]
                        }).then(async product => {
                            console.log(product);
                            // Message to product owner in order YardRent support will contact product renter to solve or settle down
                            const messageToProductOwnerId = new mongoose.Types.ObjectId();
                            const messageToProductOwner = new Message({
                                _id: messageToProductOwnerId,
                                type: "InformProductOwner",
                                productToReturn: product.id,
                                productOwner: product.user,
                                productRenter: product.order.user,
                            });
                            await messageToProductOwner.save()
                            // push to linkedMessages - should we push as well to user messages or leave reference in linkedMessages
                            Message.findOneAndUpdate({_id: messageId}, {$push: {linkedMessages: messageToProductOwnerId}}).then().catch(error => {
                                res.status(500).json({
                                    error
                                })
                            })


                            // Message to product renter about returning product to owner immediately
                            const messageToProductRenterId = new mongoose.Types.ObjectId();
                            const messageToProductRenter = new Message({
                                _id: messageToProductRenterId,
                                type: "OwnerDeclinedReturn",
                                productToReturn: product.id,
                                productOwner: product.user,
                                productRenter: product.order.user
                            });
                            await messageToProductRenter.save()
                            User.findOneAndUpdate({_id: product.order.user.name}, {$push: {message: messageToProductRenterId}}).then(() => {
                            }).catch(error => {
                                res.status(500).json({
                                    error
                                })
                            })
                            // and only after return OK 200
                            res.status(200).json();
                        }).catch(error => {
                            res.status(500).json(error)
                        })

                    }
                }).catch(error => {
                    res.status(500).json({
                        error
                    })
                })
            }
            else
            {
                res.status(500).json("Something went wrong")
            }
        }).catch(error => {
            res.status(500).json(error)
        })

    }
};
