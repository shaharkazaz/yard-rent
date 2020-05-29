const mongoose = require('mongoose');


const shopSchema = mongoose.Schema({
    _id: mongoose.Schema.Types.ObjectID,
    street: { type: String, required: true},
    city: { type: String, required: true},
    country: { type: String, required: true},
    coordinates: {type:{}, required: true,}

});

module.exports = mongoose.model('Shop', shopSchema);