const mongoose = require('mongoose');
const Category = require('../model/category');


module.exports = {
    getAllCategories: (req, res) => {
        Category.find({}).populate('subCategories',{name:1,_id:1}).then((categories) => {
            res.status(200).json(categories)
        }).catch((error) => {
            res.status(500).json({
                error
            })
        })
    },
    getAllSubCategoriesOfCategoryId: (req, res) => {
        const categoryId = req.params.categoryId;
        Category.findById(categoryId).populate('subCategories',{name:1,_id:1}).then((subCategories) => {
            res.status(200).json(subCategories.subCategories)
        }).catch((error) => {
            res.status(500).json({
                error
            })
        })
    },
    addCategory: (req, res) => {
        const { name } = req.body;

        const category = new Category({
            _id: new mongoose.Types.ObjectId(),
            name
        });
        category.save().then(() => {
            Category.findById(category._id).populate('subCategories',{name:1,_id:1}).then((category) => {
                res.status(200).json({
                    category
                })
            });
        }).catch(error => {
            res.status(500).json({
                error
            })
        })
    },
    deleteCategory: (req, res) => {
        const categoryId = req.params.categoryId;
        Category.remove({_id: categoryId}).then(() => {
            res.status(200).json({
                message: "the category was removed"
            })
        }).catch(error => {
            res.status(500).json({
                error
            })
        })
    }
};
