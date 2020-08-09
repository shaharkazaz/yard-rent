
const mongoose = require('mongoose');

const messageSchema = mongoose.Schema({
    _id: mongoose.Schema.Types.ObjectID,
    date: {type: Date, default: Date.now(), required: true},
    order: { type: mongoose.Schema.Types.ObjectID, ref: 'Order', required: false },
    orderDate: {type: Date, required: false},
    orderReturnDate: {type: Date, required: false},
    productToReturn: { type: String, required: false },
    productOwner: { type: String, required: false },
    productImage: {type: String, required: false},
    productRenter: { type: String, required: false },
    isOpened: { type: Boolean, default: false },
    isArchived: { type: Boolean, default: false },
    type: ["orderIsAboutToExpire24H" , "orderIsAboutToExpire48H", "productReturnProcess", "test"]
});

module.exports = mongoose.model('Message', messageSchema);
