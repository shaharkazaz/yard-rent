const mongoose = require('mongoose');
const Products = require('../model/product');
const User = require('../model/user');
const getUserId = require('../utils/getUserId');
const uploadToGCP = require('../utils/uploadToGCP');
const {addProductInDataSet,removeProductsFromDataSet,updateProductInDataSet} = require('../utils/updateDataSet');

module.exports = {
    getAllProducts: (req, res) => {
        Products.find({isDeleted: false, isRented: false}, {
            isDeleted: 0,
            isRented: 0
        }).populate('user', {name: 1, _id: 0}).populate('category', {
            name: 1,
            _id: 0
        }).populate('subCategory', {name: 1, _id: 0}).then((products) => {
            res.status(200).json(products);
        }).catch((error) => {
            res.status(500).json({
                error
            })
        })
    },
    addProduct: async (req, res) => {
        const {name, category, subCategory, rewards, address, description} = req.body;
        const userId = await getUserId(req);
        const imageUrl = await uploadToGCP(req);
        const product = new Products({
            _id: new mongoose.Types.ObjectId(),
            name,
            user: userId,
            category,
            subCategory,
            rewards,
            address, //check it address is empty put user.address
            description,
            image: imageUrl
        });
        product.save().then(() => {
            User.findByIdAndUpdate({_id: userId}, {$push: {product: product._id}}).then(() => {
                res.status(200).json({
                    message: 'new product was added'
                });
                addProductInDataSet(product._id);
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
    getProduct: (req, res) => {
        const productId = req.params.productId;
        Products.findById({_id: productId, isDeleted: false},{isDeleted:0}).populate('user', {
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
    getProductByQuery: (req, res) => {
        let {name, priceRange, category, subCategory} = req.body;
        if (typeof name === 'undefined') {
            name = "";
        }
        if (typeof priceRange === 'undefined') {
            priceRange = {min: 0, max: Number.MAX_SAFE_INTEGER}
        }
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
            {$match: {name: {"$regex": name, "$options": "i"}}},
            {$match: {rewards: {$gt: priceRange.min, $lt: priceRange.max}}},
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
            res.status(200).json({
                products
            })
        }).catch(error => {
            return res.status(500).json({
                error
            })
        })
    },
    releaseProducts: (req, res) => {
        const {products} = req.body;
        const objectIdProducts = products.map(product => mongoose.Types.ObjectId(product));
        :Products.updateMany({_id: {$in: objectIdProducts}}, {$set: {isRented: false}}).then(() => {
            res.status(200).json();
        }).catch(error => {
            res.status(500).json({
                error
            })
        });
    }
};
