const mongoose = require('mongoose');

const userSchema = mongoose.Schema({
    _id: mongoose.Schema.Types.ObjectID,
    name: {type: String, required: true},
    email: {
        type: String,
        required: true,
        unique: true,
        match: /[a-z0-9!#$%&'*+/=?^_`{|}~-]+(?:\.[a-z0-9!#$%&'*+/=?^_`{|}~-]+)*@(?:[a-z0-9](?:[a-z0-9-]*[a-z0-9])?\.)+[a-z0-9](?:[a-z0-9-]*[a-z0-9])?/
    },
    password: {type: String, required: true},
    permissions: {type: {}, required: false},
    role: {type: String, required: true},
    address: {type: {}, required: true},
    rewards: {type: Number, required: true},
    product: [{type: mongoose.Schema.Types.ObjectID, ref: 'Product', required: false}],
    orderId: [{type: mongoose.Schema.Types.ObjectID, ref: 'Order', required: false}],
    isDeleted: {type: Boolean, default: false, required: true},
    message: [{type: mongoose.Schema.Types.ObjectID, ref: 'Message', required: false}],
    phone: {type: String, required: true, unique: true, match: /^\d{10}$/},
    image: {type: String, required: false},
    rating: {type: Number, required: false, default: 0, min: 0, max: 5},
    favorites: [{type: mongoose.Schema.Types.ObjectID, ref: 'Product', required: false}]
});

module.exports = mongoose.model('User', userSchema);
