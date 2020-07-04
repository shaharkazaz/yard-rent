const mongoose = require('mongoose');
const Products = require('../model/product');
const User = require('../model/user');
const getUserId = require('../utils/getUserId');
const uploadToGCP = require('../utils/uploadToGCP');
const {addProductInDataSet, removeProductsFromDataSet, updateProductInDataSet,clearDataSet} = require('../utils/updateDataSet');

module.exports = {
    addProduct: async (req, res) => {
        const {name, category, subCategory, rewards, address, description} = req.body;
        const userId = await getUserId(req);
        const imageUrl = await uploadToGCP(req, res);
        const product = new Products({
            _id: new mongoose.Types.ObjectId(),
            name,
            user: userId,
            category,
            subCategory,
            rewards,
            address: 'ssss', //check it address is empty put user.address
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
    //User.findByIdAndUpdate(product.user, {$pull: {product: productId}}).then(() => {
    //TODO: return a populated product and decide on the filter
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

        Products.aggregate(pipeline).then(products => {
            res.status(200).json(products)
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
        const {products} = req.body;
        const objectIdProducts = products.map(product => mongoose.Types.ObjectId(product));
        Products.updateMany({_id: {$in: objectIdProducts}}, {$set: {isRented: false}}).then(() => {
            clearDataSet();
            res.status(200).json();
        }).catch(error => {
            res.status(500).json({
                error
            })
        });
    },
    getIds: (req,res) => {
        Products.find({isDeleted: false, isRented: false},{_id: 1}).then((products) => {
            res.status(200).json(products);
        }).catch(error => {
            res.status(500).json({
                error
            })
        })
    }
};
