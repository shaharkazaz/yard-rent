const mongoose = require('mongoose');

const orderSchema = mongoose.Schema({
    _id: mongoose.Schema.Types.ObjectID,
    date: {type: Date, default: Date.now(), required: true},
    user: {type: String, required: true},
    product: {type: [], required: false}

});

module.exports = mongoose.model('Order', orderSchema);