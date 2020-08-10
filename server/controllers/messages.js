const mongoose = require('mongoose');
const Message = require('../model/message');
const User = require('../model/user');
const Order = require('../model/order');
const Products = require('../model/product');



module.exports = {
    getUserMessages: (req, res) => {
        const userId = req.params.userId;
        User.findOne({_id:userId,isDeleted: false}, {_id: 0, message: 1}).populate({path: 'message', options: { sort: { 'date': -1 } } }).then((user) => {
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
                match: { isOpened: false, isArchived: false }
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
        const {product, isReturned} = req.body;
        const productId = mongoose.Types.ObjectId(product)
        if (isReturned)
        {
            // Release product back to marketplace
            Products.findOneAndUpdate({_id: productId}, {
                $set: {
                    isRented: false,
                    isInReturnProcess: false,
                    order: null,
                    orderDate: null,
                    orderReturnDate: null
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
                    type: "productReturnProcessToOwner",
                    productToReturn: product.name,
                    productOwner: product.user.name,
                    productRenter: product.order.user.name
                });
                await messageToProductOwner.save()

                // Message to product renter about returning product to owner immediately
                const messageToProductRenterId = new mongoose.Types.ObjectId();
                const messageToProductRenter = new Message({
                    _id: messageToProductRenterId,
                    type: "productReturnProcessToRenter",
                    productToReturn: product.name,
                    productOwner: product.user.name,
                    productRenter: product.order.user.name
                });
                await messageToProductRenter.save()

                // and only after return OK 200
                res.status(200).json();
            }).catch(error => {
                res.status(500).json(error)
            })

        }

    }
};
