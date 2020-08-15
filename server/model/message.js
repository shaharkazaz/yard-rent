
const mongoose = require('mongoose');

// TODO:
const messageSchema = mongoose.Schema({
    _id: mongoose.Schema.Types.ObjectID,
    date: {type: Date, default: Date.now(), required: true},
    order: { type: mongoose.Schema.Types.ObjectID, ref: 'Order', required: false },
    orderDate: {type: Date, required: false},
    orderReturnDate: {type: Date, required: false},
    order: { type: mongoose.Schema.Types.ObjectID, ref: 'Product', required: false },
    productOwner: { type: String, required: false },
    productImage: {type: String, required: false},
    productRenter: { type: String, required: false },
    isOpened: { type: Boolean, default: false },
    isArchived: { type: Boolean, default: false },
    isApproved: { type: Boolean, default: false, required: false },
    linkedMessages: [{ type: mongoose.Schema.Types.ObjectID, ref: 'Message', required: false }],
    type: { type: String, required: false }
    //type: ["orderIsAboutToExpire24H" , "orderIsAboutToExpire48H", "productReturnProcess", "productReturnProcessToOwner", "productReturnProcessToRenter"]
});

module.exports = mongoose.model('Message', messageSchema);
