const mongoose = require('mongoose');

const productSchema = mongoose.Schema({
    _id: mongoose.Schema.Types.ObjectID,
    name: {type: String, required: true},
    user: { type: mongoose.Schema.Types.ObjectID, ref: 'User', required: true },
    category: {type: mongoose.Schema.Types.ObjectID, ref: 'Category', required: true},
    subCategory: {type: mongoose.Schema.Types.ObjectID, ref: 'SubCategory', required: true},
    rewards: {type: Number, required: true},
    address: {type: String, required: true}, // write in the UI if its a different address if not we will take the address of the user
    deposit: {type: Number, required: false},
    durationInDays: {type: Date, required: true},
    image: {type: String, required: true}
});

module.exports = mongoose.model('Product', productSchema);