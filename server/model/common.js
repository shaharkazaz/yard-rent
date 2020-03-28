const mongoose = require('mongoose');

const commonSchema = mongoose.Schema({
    _id: mongoose.Schema.Types.ObjectID,
    numOfNewProducts: {type: Number, required: true},
    maxNumOfProductsBeforeUpdate: {type: Number, required: true},
});

module.exports = mongoose.model('Common', commonSchema);
