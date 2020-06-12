const mongoose = require('mongoose');

const verificationSchema = mongoose.Schema({
    _id: mongoose.Schema.Types.ObjectID,
    email: {type: String, required: true},
    code: {type: Number, required: true},
});

module.exports = mongoose.model('Verification', verificationSchema);
