const mongoose = require('mongoose');

const categorySchema = mongoose.Schema({
    _id: mongoose.Schema.Types.ObjectID,
    name: {type: String, required: true}
});

module.exports = mongoose.model('Category', categorySchema);