
const mongoose = require('mongoose');

const messageSchema = mongoose.Schema({
    _id: mongoose.Schema.Types.ObjectID,
    date: {type: Date, default: Date.now(), required: true},
    order: { type: mongoose.Schema.Types.ObjectID, ref: 'Order', required: false },
    isOpened: { type: Boolean, default: false },
    type: ["orderIsAboutToExpire24H" , "orderIsAboutToExpire48H"]
});

module.exports = mongoose.model('Message', messageSchema);
