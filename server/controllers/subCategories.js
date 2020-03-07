const mongoose = require('mongoose');
const SubCategory = require('../model/subCategory');
const Category = require('../model/category');

module.exports = {
    getAllSubCategories: (req, res) => {
        SubCategory.find({}).then((subCategories) => {
            res.status(200).json({
                subCategories: subCategories
            })
        }).catch((error) => {
            res.status(500).json({
                error
            })
        })
    },
    addSubCategory: (req, res) => {
        const { subCategoryName,parentCategoryId } = req.body;

        const subCategory = new SubCategory({
            _id: new mongoose.Types.ObjectId(),
            subCategoryName,
            parentCategoryId
        });
        subCategory.save().then(() => {
            Category.findOneAndUpdate({_id: parentCategoryId}, {$push: {subCategories: subCategory._id}}).then(() => {
                res.status(200).json({
                    message: 'new sub category was added'
                })
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
    deleteSubCategory: (req, res) => {
        const subCategoryId = req.params.subCategoryId;
        SubCategory.findById({subCategoryId}).then((subCategory)=>{
            SubCategory.remove({_id: subCategoryId}).then(() => {
                Category.findOneAndUpdate({_id: subCategory.parentCategoryId}, {$pull: {subCategories: subCategoryId}}).then(() => {
                    res.status(200).json({
                        message: 'the suc category was deleted'
                    })
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
        })
    }
};
