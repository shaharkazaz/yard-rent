const mongoose = require('mongoose');


const shopSchema = mongoose.Schema({
    _id: mongoose.Schema.Types.ObjectID,
    address: { type: String, required: true, unique: true }
});

module.exports = mongoose.model('Shop', shopSchema);