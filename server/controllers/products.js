
const mongoose = require('mongoose');
const Products = require('../model/product');
const User = require('../model/user');
const Order = require('../model/order');
const Message = require('../model/message');
const getUserId = require('../utils/getUserId');
const uploadToGCP = require('../utils/uploadToGCP');
const {addProductInDataSet, removeProductsFromDataSet, updateProductInDataSet, clearDataSet} = require('../utils/updateDataSet');

const shuffle = async (array) => array.sort(() => Math.random() - 0.5)

module.exports = {
    addProduct: async (req, res) => {
        const {name, category, subCategory, rewards, description} = req.body;
        const userId = await getUserId(req);
        const { address }  = await User.findById(userId)
        const imageUrl = await uploadToGCP(req, res);
        const product = new Products({
            _id: new mongoose.Types.ObjectId(),
            name,
            user: userId,
            category,
            subCategory,
            rewards,
            address,
            description,
            image: imageUrl
        });
        product.save().then(() => {
            User.findByIdAndUpdate({_id: userId}, {$push: {product: product._id}}).then(() => {
                Products.findById({_id: product._id}, {isDeleted: 0, isRented: 0}).populate('user', {
                    name: 1,
                    _id: 0
                }).populate('category', {
                    name: 1,
                    _id: 0
                }).populate('subCategory', {name: 1, _id: 0}).then((product) => {
                    res.status(200).json(product);
                    addProductInDataSet(product._id);
                }).catch(error => {
                    res.status(500).json({
                        error
                    })
                });
            }).catch(error => {
                return res.status(500).json({
                    message: "failed to update the user's products " + error
                })
            })
        }).catch(error => {
            return res.status(500).json({
                message: 'save product failed ' + error
            })
        });
    },
    getProduct: (req, res) => {
        const productId = req.params.productId;
        Products.findOne({_id: productId, isDeleted: false}, {isDeleted: 0}).populate('user', {
            name: 1,
            _id: 0
        }).populate('category', {
            name: 1,
            _id: 0
        }).populate('subCategory', {name: 1, _id: 0}).then((product) => {
            res.status(200).json(product);
        }).catch(error => {
            res.status(500).json({
                error
            })
        })
    },
    //TODO: do we need to validate that the updated product isn't isDeleted:true or we are sure shahar wont send us this product
    updateProduct: (req, res) => {
        const productId = req.params.productId;
        Products.updateOne({_id: productId}, req.body).then(() => {
            Products.findById({_id: productId}, {isDeleted: 0, isRented: 0}).populate('user', {
                name: 1,
                _id: 0
            }).populate('category', {
                name: 1,
                _id: 0
            }).populate('subCategory', {name: 1, _id: 0}).then((product) => {
                res.status(200).json(product);
                updateProductInDataSet(productId);
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
    deleteProduct: (req, res) => {
        const {products} = req.body;
        const objectIdProducts = products.map(product => mongoose.Types.ObjectId(product));
        Products.updateMany({_id: {$in: objectIdProducts}}, {$set: {isDeleted: true}}).then(() => {
            res.status(200).json();
            removeProductsFromDataSet(objectIdProducts);
        }).catch(error => {
            res.status(500).json({
                error
            })
        });
    },
    getProducts: (req, res) => {
        let {text = "", minRewards = 1, maxRewards = Number.MAX_SAFE_INTEGER, category, subCategory} = req.body;
        const pipeline = [
            {
                $lookup: {
                    from: "categories",
                    localField: "category",
                    foreignField: "_id",
                    as: "category"
                }

            },
            {$unwind: "$category"},
            {
                $lookup: {
                    from: "subcategories",
                    localField: "subCategory",
                    foreignField: "_id",
                    as: "subCategory"
                }
            },
            {$unwind: "$subCategory"},
            {
                $lookup: {
                    from: "users",
                    localField: "user",
                    foreignField: "_id",
                    as: "user"
                }
            },
            {$unwind: "$user"},
            {
                $match: {
                    $or: [{name: {"$regex": text, "$options": "i"}},
                        {description: {"$regex": text, "$options": "i"}},
                        {'category.name': {"$regex": text, "$options": "i"}},
                        {'subCategory.name': {"$regex": text, "$options": "i"}}]
                }
            },
            {$match: {rewards: {$gt: minRewards, $lt: maxRewards}}},
            {$match: {isDeleted: false}},
            {$match: {isRented: false}},
            {
                $project: {
                    'subCategory.name': 1,
                    'category.name': 1,
                    'user.name': 1,
                    name: 1,
                    rewards: 1,
                    address: 1,
                    description: 1,
                    image: 1
                }
            },
        ];
        if (typeof category !== 'undefined') {
            pipeline.push({$match: {'category.name': category}},);
        }
        if (typeof subCategory !== 'undefined') {
            pipeline.push({$match: {'subCategory.name': subCategory}},);
        }

        Products.aggregate(pipeline).then(async products => {
            const shuffledProducts = await shuffle(products)
            res.status(200).json(shuffledProducts)
        }).catch(error => {
            return res.status(500).json({
                error
            })
        })
    },
    releaseRentedProducts: (req, res) => {
        Products.updateMany({isRented: true}, {$set: {isRented: false}}).then(() => {
            clearDataSet();
            res.status(200).json();
        }).catch(error => {
            res.status(500).json({
                error
            })
        });
    },
    releaseDeletedProducts: (req, res) => {
        Products.updateMany({isDeleted: true}, {$set: {isDeleted: false}}).then(() => {
            clearDataSet();
            res.status(200).json();
        }).catch(error => {
            res.status(500).json({
                error
            })
        });
    },
    addProductDataSet: async (req, res) => {
        const {name, category, subCategory, rewards, description, image} = req.body;
        const userId = await getUserId(req);
        User.findById(userId).then((user) => {
            const address = user.address;
            const product = new Products({
                _id: new mongoose.Types.ObjectId(),
                name,
                user: userId,
                category,
                subCategory,
                rewards,
                address,
                description,
                image
            });
            product.save().then(() => {
                User.findByIdAndUpdate({_id: userId}, {$push: {product: product._id}}).then(() => {
                    Products.findById({_id: product._id}, {isDeleted: 0, isRented: 0}).populate('user', {
                        name: 1,
                        _id: 0
                    }).populate('category', {
                        name: 1,
                        _id: 0
                    }).populate('subCategory', {name: 1, _id: 0}).then((product) => {
                        res.status(200).json(product);
                        addProductInDataSet(product._id);
                    }).catch(error => {
                        res.status(500).json({
                            error
                        })
                    });
                }).catch(error => {
                    return res.status(500).json({
                        message: "failed to update the user's products " + error
                    })
                })
            }).catch(error => {
                return res.status(500).json({
                    message: 'save product failed ' + error
                })
            });
        })
    },
    releaseRentedProductsByUSer: (req, res) => {
        // TODO: on each product released -> send message to product owner to verify if product returned
        // add new route - message action
        // under messages - reply to message
/*        const {products} = req.body;
        const objectIdProducts = products.map(product => mongoose.Types.ObjectId(product));
        Order.find({products: {$in: objectIdProducts}}).populate('products', {isRented: 1}).then(orders => {
            orders.forEach(order => {
                let orderProducts = order.products
                orderProducts.forEach(product => {
                    const found =
                    if()
                })

            })
        }).catch()*/


        const {products} = req.body;
        const objectIdProducts = products.map(product => mongoose.Types.ObjectId(product));
        Products.find({_id: {$in: objectIdProducts}},{_id: 1, user: 1}).then(productsList => {
            productsList.forEach(product => {
                Products.findOneAndUpdate({_id: product.id},{$set: {isRented: false}}).then(() => {
                    Order.find({ "products._id" : mongoose.Types.ObjectId(product.id)},{_id: 1, user: 1}).then(order => {
                        console.log(order);
                        const messageId = new mongoose.Types.ObjectId();
                        const message = new Message({
                            _id: messageId,
                            productToReturn: product,
                            productOwner: product.user,
                            productRenter: order.user,
                            order: order,
                            type: "productReturned"
                    });
                        message.save().then(messageId => {
                            User.findOneAndUpdate({_id: product.user}, {$push: {message: messageId}}).then(() => {
                            }).catch(error => {
                                //TODO: error handling
                            })
                        }).catch(error => {
                            res.status(500).json(error);
                        });
                    }).catch(error => {
                        res.status(500).json(error);
                    })
                }).catch(error => {
                    res.status(500).json(error);
            })
            res.status(200).json();
        })
    })
    },
    getIds: (req, res) => {
        Products.find({isDeleted: false, isRented: false}, {_id: 1}).then((products) => {
            res.status(200).json(products);
        }).catch(error => {
            res.status(500).json({
                error
            })
        })
    },
    addToFavorites: async (req, res) => {
        const {products} = req.body;
        const userId = await getUserId(req);
        const objectIdProducts = (Array.isArray(products) ? products : [products]).map(product => mongoose.Types.ObjectId(product));
        User.findByIdAndUpdate({_id: userId}, {$push: {favorites: objectIdProducts}}).then(() => {
            res.status(200).json();
        }).catch(error => {
            res.status(500).json({
                error
            });
        })
    },
    removeFromFavorites: async (req, res) => {
        const {products} = req.body;
        const userId = await getUserId(req);
        const objectIdProducts = products.map(product => mongoose.Types.ObjectId(product));
        User.findByIdAndUpdate({_id: userId}, {$pullAll: {favorites: objectIdProducts}}).then(() => {
            res.status(200).json();
        }).catch(error => {
            res.status(500).json({
                error
            });
        })
    }
};
