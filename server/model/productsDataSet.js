const mongoose = require('mongoose');

const productsDataSetSchema = mongoose.Schema({
    _id: mongoose.Schema.Types.ObjectID,
    data: [{id: {type: String} ,content: {type: String} }]
});

module.exports = mongoose.model('ProductsDataSet', productsDataSetSchema);
//data: [{id: {type: mongoose.Types.ObjectId, ref: 'Product'} ,content: {type: String} }]