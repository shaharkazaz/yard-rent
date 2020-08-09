const Message = require('../model/message');
const User = require('../model/user');
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
    updateReturnProcess: (req, res) => {
        const {product, isReturned} = req.body;
        const productId = mongoose.Types.ObjectId(product)
        if (isReturned) {
            Products.findOneAndUpdate({_id: productId}, {
                $set: {
                    isRented: false,
                    isInReturnProcess: false,
                    orderDate: null,
                    orderReturnDate: null
                }
            }).populate('user').then().catch((error) => {
                res.status(500).json({
                    error
                })
            })
        } else {
            //TODO: Return message to product owner in order YardRent support will contact product renter to solve or settle down
            Products.find({_id: productId}, {_id: 1, isDeleted: 0}).populate({
                path: 'category', select: {
                    name: 1,
                    _id: 0
                }}).populate({
                path: 'user'
            }).then(async result => {
                const messageToProductOwnerId = new mongoose.Types.ObjectId();
                const messageToProductOwner = new Message({
                    _id: messageToProductOwnerId,
                    type: "productReturnProcessToOwner",
                    productToReturn: product.name,
                    productOwner: product.user.name
                });
                await messageToProductOwner.save()

                //TODO: Return message to product renter about returning product to owner immediately
                const messageToProductRenterId = new mongoose.Types.ObjectId();
                const messageToProductRenter = new Message({
                    _id: messageToProductRenterId,
                    type: "productReturnProcessToOwner",
                    productToReturn: product.name,
                    productOwner: product.user.name
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
