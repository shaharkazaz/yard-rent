const mongoose = require('mongoose');

const orderSchema = mongoose.Schema({
    _id: mongoose.Schema.Types.ObjectID,
    date: {type: Date, default: Date.now(), required: true},
    user: { type: mongoose.Schema.Types.ObjectID, ref: 'User', required: true },
    products: [{ type: mongoose.Schema.Types.ObjectID, ref: 'Product', required: true }],
    rewards: {type: Number, required: true}
});

module.exports = mongoose.model('Order', orderSchema);