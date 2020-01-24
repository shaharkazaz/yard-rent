const mongoose = require('mongoose');
const {category} = require('../utils/category');

const productSchema = mongoose.Schema({
    _id: mongoose.Schema.Types.ObjectID,
    name: {type: String, required: true},
    user: {type: String, required: true}, //I add not sure
    category: {type: String, required: true},
    subCategory: {type: String, required: true},
    rewards: {type: Number, required: true},
    address: {type: String, required: true}, // write in the UI if its a different address if not we will take the address of the user
    deposit: {type: Number, required: false},
    durationInDays: {type: Date, required: true}
});

module.exports = mongoose.model('Product', productSchema);