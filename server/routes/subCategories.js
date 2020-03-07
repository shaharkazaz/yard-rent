const express = require('express');
const router = express.Router();

const { getAllSubCategories, addSubCategory, deleteSubCategory} = require('../controllers/subCategories');
const checkAuth = require('../middlewares/checkAuth');

router.get('/', checkAuth(), getAllSubCategories);
router.post('/', checkAuth(), addSubCategory);
router.delete('/:subCategoryId', checkAuth(), deleteSubCategory);


module.exports = router;