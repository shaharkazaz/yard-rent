const mongoose = require('mongoose');
const Products = require('../model/product');
const User = require('../model/user');
const getUserId = require('../utils/getUserId');
const uploadToGCP = require('../utils/uploadToGCP');
const {updateDataSetCollections,clearDataSet} = require('../utils/updateDataSet');

module.exports = {
    getAllProducts: (req, res) => {
        Products.find({isDeleted: false}, {_id: 0}).populate('user', {name: 1, _id: 0}).populate('category', {
            name: 1,
            _id: 0
        }).populate('subCategory', {subCategoryName: 1, _id: 0}).then((products) => {
            res.status(200).json(products)
        }).catch((error) => {
            res.status(500).json({
                error
            })
        })
    },
    addProduct: async (req, res) => {
        const {name, category, subCategory, rewards, address, deposit, durationInDays, description, realValue} = req.body;
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
            deposit,
            durationInDays,
            description,
            image: imageUrl
        });
        product.save().then(() => {
            User.findByIdAndUpdate({_id: userId}, {$push: {product: product._id}}).then(() => {
                updateDataSetCollections()
                res.status(200).json({
                    message: 'new product was added'
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
    },
    getProduct: (req, res) => {
        const productId = req.params.productId;
        Products.findById({_id: productId, isDeleted: false}, {_id: 0}).populate('user', {
            name: 1,
            _id: 0
        }).populate('category', {
            name: 1,
            _id: 0
        }).populate('subCategory', {subCategoryName: 1, _id: 0}).then((product) => {
            res.status(200).json(product)
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
            Products.findById({_id: productId}, {_id: 0}).populate('user', {name: 1, _id: 0}).populate('category', {
                name: 1,
                _id: 0
            }).populate('subCategory', {subCategoryName: 1, _id: 0}).then((product) => {
                res.status(200).json(product)
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
    // TODO: didnt remove the product from the user list very
    deleteProduct: (req, res) => {
        const {products} = req.body;
        const objectIdProducts = products.map(product => mongoose.Types.ObjectId(product));
        Products.updateMany({_id: {$in: objectIdProducts}}, {$set: {isDeleted: true}}).then(() => {
            clearDataSet();
            res.status(200).json({
                message: "the product was removed"
            })
        }).catch(error => {
            res.status(500).json({
                error
            })
        })
    },
    //User.findByIdAndUpdate(product.user, {$pull: {product: productId}}).then(() => {
    //TODO: return a populated product and decide on the filter
    getProductByQuery: (req, res) => {
        const query = req.params.query;
        Products.aggregate([
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
            {$match: {name: {"$regex": query, "$options": "i"}}},
        ]).then(products => {
            res.status(200).json(products)
        }).catch(error => {
            return res.status(500).json({
                error
            })
        })
    }
};
