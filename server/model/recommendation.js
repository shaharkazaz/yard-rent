const mongoose = require('mongoose');

const recommendationSchema = mongoose.Schema({
    _id: {type: mongoose.Schema.Types.ObjectID, ref: 'Product', required: true},
    recommendedProducts: [{ type: mongoose.Schema.Types.ObjectID, ref: 'Product', required: true }]
});

module.exports = mongoose.model('Recommendation', recommendationSchema);