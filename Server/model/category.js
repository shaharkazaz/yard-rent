const mongoose = require('mongoose');

const categorySchema = mongoose.Schema({
    _id: mongoose.Schema.Types.ObjectID,
    name: {type: String, required: true},
    subCategories: [{ type: mongoose.Schema.Types.ObjectID, ref: 'SubCategory', required: false }]
});

module.exports = mongoose.model('Category', categorySchema);