const mongoose = require('mongoose');

const subCategorySchema = mongoose.Schema({
    _id: mongoose.Schema.Types.ObjectID,
    parentCategoryId: { type: mongoose.Schema.Types.ObjectID, ref: 'Category', required: true },
    subCategoryName: {type: String, required: true}
});

module.exports = mongoose.model('SubCategory', subCategorySchema);