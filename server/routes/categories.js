const express = require('express');
const router = express.Router();

const { getAllCategories,getAllSubCategoriesOfCategoryId, addCategory, deleteCategory} = require('../controllers/categories');
const checkAuth = require('../middlewares/checkAuth');

router.get('/', checkAuth, getAllCategories);
router.post('/', checkAuth, addCategory);
router.get('/:categoryId', checkAuth, getAllSubCategoriesOfCategoryId);
router.delete('/:categoryId', checkAuth, deleteCategory);


module.exports = router;