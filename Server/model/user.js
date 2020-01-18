const mongoose = require('mongoose');
const { role } = require('../utils/role');

const userSchema = mongoose.Schema({
    _id: mongoose.Schema.Types.ObjectID,
    name: { type: String, required: true },
    email: {
        type: String,
        required: true,
        unique: true,
        match: /[a-z0-9!#$%&'*+/=?^_`{|}~-]+(?:\.[a-z0-9!#$%&'*+/=?^_`{|}~-]+)*@(?:[a-z0-9](?:[a-z0-9-]*[a-z0-9])?\.)+[a-z0-9](?:[a-z0-9-]*[a-z0-9])?/
    },
    password: { type: String, required: true },
    role: { type: String, required: true },
    address: { type: String, required: true },
    rewards: { type: Number, required: true },
    product: { type: [], required: false },
    orderId: [{ type: mongoose.Schema.Types.ObjectID, ref: 'Order', required: false }]
});

module.exports = mongoose.model('User', userSchema);