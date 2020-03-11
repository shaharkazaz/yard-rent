const mongoose = require('mongoose');

const updateDataSchema = mongoose.Schema({
    _id: mongoose.Schema.Types.ObjectID,
    numOfNewProducts: {type: Number, required: true},
    maxNumOfProductsBeforeUpdate: {type: Number, required: true},
});

module.exports = mongoose.model('UpdateData', updateDataSchema);
