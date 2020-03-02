const mongoose = require('mongoose');

const orderSchema = mongoose.Schema({
    _id: mongoose.Schema.Types.ObjectID,
    date: {type: Date, default: Date.now(), required: true},
    user: {type: String, required: true},
    product: [{ type: mongoose.Schema.Types.ObjectID, ref: 'Product', required: true }]

});

module.exports = mongoose.model('Order', orderSchema);