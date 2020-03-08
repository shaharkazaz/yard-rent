const express = require('express');
const router = express.Router();
const { role } = require('../utils/role');

const { getAllCategories,getAllSubCategoriesOfCategoryId, addCategory, deleteCategory} = require('../controllers/categories');
const checkAuth = require('../middlewares/checkAuth');

router.get('/', getAllCategories);
router.post('/', checkAuth(role.Admin), addCategory);
router.get('/:categoryId', getAllSubCategoriesOfCategoryId);
router.delete('/:categoryId', checkAuth(role.Admin), deleteCategory);


module.exports = router;