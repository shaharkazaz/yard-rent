
const mongoose = require('mongoose');

const notificationSchema = mongoose.Schema({
    _id: mongoose.Schema.Types.ObjectID,
    order: { type: mongoose.Schema.Types.ObjectID, ref: 'Order', required: false },
    type: ["orderIsAboutToExpire24H" , "orderIsAboutToExpire48H"]
});

module.exports = mongoose.model('Notification', notificationSchema);