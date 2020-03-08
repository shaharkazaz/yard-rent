const express = require('express');
const router = express.Router();
const { role } = require('../utils/role');

const { getAllSubCategories, addSubCategory, deleteSubCategory} = require('../controllers/subCategories');
const checkAuth = require('../middlewares/checkAuth');

router.get('/', checkAuth(), getAllSubCategories);
router.post('/', checkAuth(role.Admin), addSubCategory);
router.delete('/:subCategoryId', checkAuth(role.Admin), deleteSubCategory);


module.exports = router;